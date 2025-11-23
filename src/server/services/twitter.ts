/**
 * Twitter API Service using twitterapi.io
 * This service handles all Twitter-related operations
 */
import { getCached, setCache, CACHE_KEYS } from './redis'
import { TWITTER_CONFIG } from '~/lib/constants'
import type { Tweet } from '~/types'

const TWITTER_API_BASE = process.env.TWITTER_API_BASE_URL || ''
const TWITTER_API_KEY = process.env.TWITTER_API_KEY || ''

interface TwitterUser {
  id: string
  username: string
  name: string
  profile_image_url?: string
}

interface TwitterAPIResponse<T> {
  data?: T
  error?: string
}

/**
 * Make a request to twitterapi.io
 */
async function twitterApiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  if (!TWITTER_API_KEY || !TWITTER_API_BASE) {
    throw new Error('Twitter API not configured. Check TWITTER_API_KEY and TWITTER_API_BASE_URL in .env.local')
  }

  const url = `${TWITTER_API_BASE}${endpoint}`
  console.log('🐦 Twitter API request:', url)
  console.log('🔑 Using API key:', TWITTER_API_KEY.substring(0, 10) + '...')

  const response = await fetch(url, {
    ...options,
    headers: {
      'X-API-Key': TWITTER_API_KEY, // twitterapi.io uses X-API-Key header
      'Content-Type': 'application/json',
      ...options.headers,
    },
  })

  console.log('📨 Twitter API response status:', response.status)

  if (!response.ok) {
    const errorText = await response.text()
    console.error('❌ Twitter API error:', response.status)
    console.error('❌ Error body:', errorText)
    throw new Error(`Twitter API ${response.status}: ${errorText || response.statusText}`)
  }

  const data = await response.json()
  console.log('✅ Twitter API data received:', JSON.stringify(data).substring(0, 200) + '...')

  // twitterapi.io returns data directly, not wrapped in {data: ...}
  return data as T
}

/**
 * Get a Twitter user by username
 */
export async function getTwitterUser(username: string): Promise<TwitterUser> {
  // BYPASS CACHE for now to ensure fresh data
  console.log(`🔍 Fetching Twitter user: ${username}`)
  
  // Call the API endpoint exactly as documented
  const data = await twitterApiFetch<any>(`/twitter/user/info?userName=${username}`)
  
  console.log('📦 Raw API response:', JSON.stringify(data, null, 2))
  
  // Parse according to the documented response format
  if (!data.data) {
    throw new Error('No data in response')
  }
  
  const user = data.data
  
  if (!user.id) {
    throw new Error('No Twitter ID in response')
  }
  
  console.log('✅ Successfully fetched Twitter user:')
  console.log('   ID:', user.id)
  console.log('   Username:', user.userName)
  console.log('   Name:', user.name)
  
  return {
    id: user.id.toString(), // The numerical Twitter ID
    username: user.userName || username,
    name: user.name || username,
    profile_image_url: user.profilePicture,
  }
}

/**
 * Verify that a Twitter user exists
 */
export async function verifyTwitterUser(username: string): Promise<boolean> {
  try {
    const user = await getTwitterUser(username)
    // Even if API fails, we create a fallback user, so this is always true
    return !!user
  } catch {
    return false
  }
}

/**
 * Search for tweets mentioning a query with media detection
 */
/**
 * Get all tweets mentioning @Engrishcoin
 * This is the main function for building the leaderboard
 */
export async function searchMentions(
  query: string = '@Engrishcoin OR #Engrishcoin OR $ENGRISH',
  maxResults: number = 100
): Promise<Tweet[]> {
  try {
    console.log('🔍 Fetching mentions of @Engrishcoin')
    
    // Use /twitter/user/mentions to get all tweets mentioning @Engrishcoin
    // Note: This gets mentions OF Engrishcoin (not FROM Engrishcoin)
    const params = new URLSearchParams({
      userName: 'Engrishcoin', // Get tweets that mention this account
    })

    const data = await twitterApiFetch<any>(`/twitter/user/mentions?${params}`)
    
    const tweets = data.tweets || []
    console.log(`✅ Found ${tweets.length} mentions of @Engrishcoin`)
    
    // DEBUG: Log first tweet structure
    if (tweets.length > 0) {
      console.log('🔍 First tweet raw data:', JSON.stringify(tweets[0], null, 2).substring(0, 500))
    }
    
    // Parse and return with scoring
    const parsedTweets = parseTweetsResponse(tweets)
    
    // Limit to maxResults
    return parsedTweets.slice(0, maxResults)
  } catch (error) {
    console.error('❌ Search mentions error:', error)
    return []
  }
}

/**
 * Helper to parse tweet response data
 */
function parseTweetsResponse(tweets: any[]): Tweet[] {
  if (!tweets || tweets.length === 0) {
    return []
  }

  return tweets.map((tweet: any) => {
    // Extract username from URL if user object is missing
    let username = 'unknown'
    let userId = ''
    
    if (tweet.user) {
      // User object exists
      userId = tweet.user.id || tweet.user.id_str || tweet.user.userId || ''
      username = tweet.user.screen_name || tweet.user.userName || 'unknown'
    } else if (tweet.url || tweet.twitterUrl) {
      // Extract username from URL: https://x.com/USERNAME/status/ID or https://twitter.com/USERNAME/status/ID
      const url = tweet.url || tweet.twitterUrl
      const match = url.match(/(?:twitter\.com|x\.com)\/([^\/]+)\/status/)
      if (match) {
        username = match[1]
      }
    }
    
    // Try to get user ID from other fields
    if (!userId) {
      userId = tweet.userId || tweet.authorId || tweet.author_id || ''
    }

    // Check for media
    const hasImage = tweet.media?.some((m: any) => m.type === 'photo') || false
    const hasVideo = tweet.media?.some((m: any) => m.type === 'video' || m.type === 'animated_gif') || false

    // Calculate score: 10 base + 5 for image + 10 for video
    let score = 10
    if (hasImage) score += 5
    if (hasVideo) score += 10

    return {
      id: tweet.id || tweet.id_str,
      text: tweet.text || tweet.full_text || '',
      authorId: userId,
      author: {
        id: userId,
        username: username,
        name: tweet.user?.name || username,
        profileImageUrl: tweet.user?.profile_image_url || tweet.user?.profilePicture,
      },
      createdAt: tweet.createdAt || tweet.created_at,
      publicMetrics: {
        likeCount: tweet.likeCount || tweet.favorite_count || 0,
        retweetCount: tweet.retweetCount || tweet.retweet_count || 0,
        replyCount: tweet.replyCount || tweet.reply_count || 0,
      },
      url: tweet.url || tweet.twitterUrl || `https://twitter.com/${username}/status/${tweet.id}`,
      hasImage,
      hasVideo,
      score,
    }
  })
}

// Keep the old function signature for backwards compatibility
export async function searchMentionsOld(
  query: string = '@Engrishcoin OR #Engrishcoin OR $ENGRISH',
  maxResults: number = 100
): Promise<Tweet[]> {
  try {
    console.log('🔍 Searching Twitter for:', query)
    
    // twitterapi.io search endpoint: /twitter/search?query=...&count=...
    const params = new URLSearchParams({
      query,
      count: Math.min(maxResults, 100).toString(),
    })

    const data = await twitterApiFetch<any>(`/twitter/search?${params}`)

    // Transform the response to our Tweet type
    const tweets = data.tweets || data.data || []
    
    if (!tweets || tweets.length === 0) {
      console.log('❌ No tweets found')
      return []
    }

    console.log(`✅ Found ${tweets.length} tweets`)

    return tweets.map((tweet: any) => {
      // Check for media
      const hasImage = tweet.media?.some((m: any) => m.type === 'photo') || false
      const hasVideo = tweet.media?.some((m: any) => m.type === 'video' || m.type === 'animated_gif') || false

      // Calculate score: 10 base + 5 for image + 10 for video
      let score = 10
      if (hasImage) score += 5
      if (hasVideo) score += 10

      return {
        id: tweet.id || tweet.id_str,
        text: tweet.text || tweet.full_text || '',
        authorId: tweet.user?.id || tweet.user?.id_str || '',
        author: {
          id: tweet.user?.id || tweet.user?.id_str || '',
          username: tweet.user?.screen_name || tweet.user?.userName || 'unknown',
          name: tweet.user?.name || 'Unknown',
          profileImageUrl: tweet.user?.profile_image_url || tweet.user?.profilePicture,
        },
        createdAt: tweet.created_at,
        publicMetrics: {
          likeCount: tweet.favorite_count || tweet.likeCount || 0,
          retweetCount: tweet.retweet_count || tweet.retweetCount || 0,
          replyCount: tweet.reply_count || tweet.replyCount || 0,
        },
        url: `https://twitter.com/${tweet.user?.screen_name || tweet.user?.userName || 'unknown'}/status/${tweet.id || tweet.id_str}`,
        hasImage,
        hasVideo,
        score,
      }
    })
  } catch (error) {
    console.error('❌ Search mentions error:', error)
    return []
  }
}

/**
 * Get tweets from a specific user
 */
export async function getUserTweets(
  userId: string,
  maxResults: number = 10
): Promise<Tweet[]> {
  try {
    const params = new URLSearchParams({
      max_results: maxResults.toString(),
      'tweet.fields': 'created_at,public_metrics',
    })

    const data = await twitterApiFetch<any>(`/users/${userId}/tweets?${params}`)

    if (!data.data) return []

    return data.data.map((tweet: any) => ({
      id: tweet.id,
      text: tweet.text,
      authorId: userId,
      author: {
        id: userId,
        username: 'user',
        name: 'User',
      },
      createdAt: tweet.created_at,
      publicMetrics: {
        likeCount: tweet.public_metrics?.like_count || 0,
        retweetCount: tweet.public_metrics?.retweet_count || 0,
        replyCount: tweet.public_metrics?.reply_count || 0,
      },
      url: `https://twitter.com/user/status/${tweet.id}`,
    }))
  } catch (error) {
    console.error('Get user tweets error:', error)
    return []
  }
}

/**
 * Build leaderboard from Twitter mentions
 */
export async function buildLeaderboard(): Promise<
  Array<{
    userId: string
    username: string
    mentionCount: number
  }>
> {
  try {
    const mentions = await searchMentions('@Engrishcoin OR #Engrishcoin OR $ENGRISH', 100)

    // Count mentions by user
    const userMentionCounts = new Map<string, { username: string; count: number }>()

    mentions.forEach((tweet) => {
      const existing = userMentionCounts.get(tweet.authorId)
      if (existing) {
        existing.count++
      } else {
        userMentionCounts.set(tweet.authorId, {
          username: tweet.author.username,
          count: 1,
        })
      }
    })

    // Convert to array and sort
    const leaderboard = Array.from(userMentionCounts.entries())
      .map(([userId, data]) => ({
        userId,
        username: data.username,
        mentionCount: data.count,
      }))
      .sort((a, b) => b.mentionCount - a.mentionCount)
      .slice(0, 50) // Top 50

    return leaderboard
  } catch (error) {
    console.error('Build leaderboard error:', error)
    return []
  }
}

