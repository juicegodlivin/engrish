import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicProcedure } from '../trpc'
import { linkTwitterSchema } from '~/lib/validations'
import { getTwitterUser, searchMentions, verifyTwitterUser } from '~/server/services/twitter'
import { getCached, CACHE_KEYS } from '~/server/services/redis'
import { TRPCError } from '@trpc/server'
import { CACHE_TTL, TWITTER_CONFIG } from '~/lib/constants'

export const twitterRouter = createTRPCRouter({
  /**
   * Link Twitter account (manual username entry)
   */
  linkAccount: protectedProcedure
    .input(linkTwitterSchema)
    .mutation(async ({ ctx, input }) => {
      console.log('🔗 Linking Twitter account:', input.username)

      // Verify that the Twitter user exists and get full data
      const twitterUser = await getTwitterUser(input.username)
      
      if (!twitterUser) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: 'Twitter user not found',
        })
      }

      console.log('✅ Twitter user found:', twitterUser.username, 'ID:', twitterUser.id)
      console.log('📸 Profile picture:', twitterUser.profile_image_url)

      // Update user record with full Twitter data INCLUDING profile picture
      const { data: updatedUser, error } = await ctx.supabaseAdmin
        .from('users')
        .update({
          twitter_id: twitterUser.id,
          twitter_username: twitterUser.username,
          avatar: twitterUser.profile_image_url || null, // Set avatar to Twitter pfp
          name: twitterUser.name || `User ${twitterUser.username}`, // Update name to Twitter display name
          twitter_linked_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('id', ctx.session.user.id)
        .select()
        .single()

      if (error) throw error

      console.log('📥 Fetching user mentions from Twitter...')

      // Fetch ALL @Engrishcoin mentions
      let userMentions: any[] = []
      try {
        console.log('📥 Fetching all @Engrishcoin mentions...')
        const allMentions = await searchMentions(TWITTER_CONFIG.searchQuery, 100)
        
        // Filter for tweets from THIS user by matching Twitter ID
        userMentions = allMentions.filter(
          (tweet) => tweet.authorId === twitterUser.id || 
                     tweet.author.username.toLowerCase() === twitterUser.username.toLowerCase()
        )
        
        console.log(`✅ Found ${userMentions.length} mentions from @${twitterUser.username} (out of ${allMentions.length} total)`)
      } catch (error) {
        console.error('⚠️  Could not fetch mentions:', error)
        // Continue anyway - user can sync manually later
      }

      // Save THIS user's mentions to database
      if (userMentions.length > 0) {
        const mentionsData = userMentions.map((tweet) => ({
          user_id: ctx.session.user.id, // Link to our user account
          twitter_user_id: twitterUser.id, // The real Twitter ID
          twitter_username: twitterUser.username,
          tweet_id: tweet.id,
          tweet_text: tweet.text,
          tweet_url: tweet.url,
          has_image: tweet.hasImage || false,
          has_video: tweet.hasVideo || false,
          score: tweet.score || 10,
          created_at: tweet.createdAt,
          indexed_at: new Date().toISOString(),
        }))

        const { error: insertError } = await ctx.supabaseAdmin
          .from('twitter_mentions')
          .upsert(mentionsData, {
            onConflict: 'tweet_id',
          })

        if (insertError) {
          console.error('Error inserting mentions:', insertError)
        } else {
          console.log(`✅ Saved ${userMentions.length} mentions to database`)
        }

        // Update user stats
        const totalScore = userMentions.reduce((sum, m) => sum + (m.score || 10), 0)

        try {
          await ctx.supabaseAdmin
            .from('user_stats')
            .upsert({
              user_id: ctx.session.user.id,
              twitter_mentions: userMentions.length,
              updated_at: new Date().toISOString(),
            })
        } catch (err) {
          console.error('Stats update error:', err)
        }

        console.log(`📊 User stats: ${userMentions.length} mentions = ${totalScore} points`)
      }

      return {
        success: true,
        user: twitterUser,
        mentionsCount: userMentions.length,
        totalScore: userMentions.reduce((sum, m) => sum + (m.score || 10), 0),
      }
    }),

  /**
   * Unlink Twitter account
   */
  unlinkAccount: protectedProcedure.mutation(async ({ ctx }) => {
    const { error } = await ctx.supabaseAdmin
        .from('users')
        .update({
          twitter_id: null,
          twitter_username: null,
          twitter_linked_at: null,
          updated_at: new Date().toISOString(),
        })
        .eq('id', ctx.session.user.id)

    if (error) throw error

    return { success: true }
  }),

  /**
   * Get global Twitter feed (all @Engrishcoin mentions)
   */
  getGlobalFeed: publicProcedure
    .input(z.object({ maxResults: z.number().min(10).max(100).default(50) }))
    .query(async ({ input }) => {
      const cacheKey = CACHE_KEYS.TWITTER_FEED

      return getCached(
        cacheKey,
        async () => {
          const mentions = await searchMentions('@Engrishcoin OR #Engrishcoin OR $ENGRISH', input.maxResults)
          return mentions
        },
        CACHE_TTL.TWITTER_FEED
      )
    }),

  /**
   * Get user's mentions (requires Twitter linked)
   */
  getUserMentions: protectedProcedure.query(async ({ ctx }) => {
    const { data: user } = await ctx.supabaseAdmin
      .from('users')
      .select('twitter_username')
      .eq('id', ctx.session.user.id)
      .single()

    if (!user?.twitter_username) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Twitter account not linked',
      })
    }

    // Search for mentions from this user
    const mentions = await searchMentions(
      `from:${user.twitter_username} (@Engrishcoin OR #Engrishcoin OR $ENGRISH)`,
      50
    )

    return mentions
  }),

  /**
   * Refresh mentions data (manually trigger cache refresh)
   */
  refreshFeed: publicProcedure.mutation(async () => {
    const cacheKey = CACHE_KEYS.TWITTER_FEED

    // Fetch fresh data
    const mentions = await searchMentions('@Engrishcoin OR #Engrishcoin OR $ENGRISH', 50)

    // Update cache
    await getCached(cacheKey, async () => mentions, CACHE_TTL.TWITTER_FEED)

    return { success: true, count: mentions.length }
  }),

  /**
   * Sync user mentions (refresh their mentions and scores)
   */
  syncUserMentions: protectedProcedure.mutation(async ({ ctx }) => {
    // Get user's Twitter info
    const { data: user } = await ctx.supabaseAdmin
      .from('users')
      .select('twitter_id, twitter_username')
      .eq('id', ctx.session.user.id)
      .single()

    if (!user?.twitter_username || !user?.twitter_id) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Twitter account not linked',
      })
    }

    console.log('🔄 Syncing mentions for:', user.twitter_username, 'Twitter ID:', user.twitter_id)

    // Fetch ALL @Engrishcoin mentions
    const allMentions = await searchMentions(TWITTER_CONFIG.searchQuery, 100)
    
    console.log(`📊 All mentions found: ${allMentions.length}`)
    if (allMentions.length > 0) {
      console.log('🔍 First mention author:', {
        authorId: allMentions[0].authorId,
        username: allMentions[0].author.username,
      })
      console.log('🔍 Looking for user:', {
        twitter_id: user.twitter_id,
        twitter_username: user.twitter_username,
      })
    }
    
    // Filter for mentions from THIS user (by Twitter ID - more reliable)
    const mentions = allMentions.filter((tweet) => {
      const idMatch = tweet.authorId === user.twitter_id
      const usernameMatch = tweet.author.username.toLowerCase() === user.twitter_username!.toLowerCase()
      
      if (idMatch || usernameMatch) {
        console.log('✅ Match found!', {
          tweetId: tweet.id,
          authorId: tweet.authorId,
          username: tweet.author.username,
          matchedBy: idMatch ? 'ID' : 'username'
        })
      }
      
      return idMatch || usernameMatch
    })
    
    console.log(`✅ Found ${mentions.length} mentions from @${user.twitter_username} (out of ${allMentions.length} total)`)

    // Save to database
    if (mentions.length > 0) {
      const mentionsData = mentions.map((tweet) => ({
        user_id: ctx.session.user.id,
        twitter_user_id: user.twitter_id!,
        twitter_username: user.twitter_username!,
        tweet_id: tweet.id,
        tweet_text: tweet.text,
        tweet_url: tweet.url,
        has_image: tweet.hasImage || false,
        has_video: tweet.hasVideo || false,
        score: tweet.score || 10,
        created_at: tweet.createdAt,
        indexed_at: new Date().toISOString(),
      }))

      await ctx.supabaseAdmin!
        .from('twitter_mentions')
        .upsert(mentionsData, {
          onConflict: 'tweet_id',
        })
      
      console.log(`✅ Saved ${mentions.length} mentions to database`)
    }

    // Update user stats
    const totalScore = mentions.reduce((sum, m) => sum + (m.score || 10), 0)
    
          await ctx.supabaseAdmin!
            .from('user_stats')
            .upsert({
              user_id: ctx.session.user.id,
              twitter_mentions: mentions.length,
              updated_at: new Date().toISOString(),
            })

    console.log(`✅ Synced ${mentions.length} mentions, ${totalScore} points`)

    return {
      success: true,
      mentionsCount: mentions.length,
      totalScore,
    }
  }),
})

