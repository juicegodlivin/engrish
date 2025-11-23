import { z } from 'zod'
import { createTRPCRouter, publicDatabaseProcedure, protectedProcedure } from '../trpc'
import { buildLeaderboard } from '~/server/services/twitter'
import { getCached, CACHE_KEYS } from '~/server/services/redis'
import { CACHE_TTL } from '~/lib/constants'
import { TRPCError } from '@trpc/server'

export const leaderboardRouter = createTRPCRouter({
  /**
   * Get top mentioners leaderboard (scored by points) with pagination
   */
  getTopMentioners: publicDatabaseProcedure
    .input(z.object({
      page: z.number().min(1).default(1),
      limit: z.number().min(10).max(50).default(50),
    }).optional())
    .query(async ({ ctx, input }) => {
      const page = input?.page || 1
      const limit = input?.limit || 50
      const offset = (page - 1) * limit

      console.log(`🏆 Fetching leaderboard page ${page} (${limit} per page)`)
      
      const { data: mentions, error: queryError } = await ctx.supabaseAdmin
        .from('twitter_mentions')
        .select(`
          twitter_user_id,
          twitter_username,
          score,
          user_id,
          users (
            avatar,
            name
          )
        `)

          if (queryError) {
            console.error('Leaderboard query error:', queryError)
            return []
          }

          // Aggregate scores by user
          const userScores = new Map<string, { 
            username: string
            score: number
            count: number
            avatar?: string
            name?: string
          }>()
          
          // @ts-ignore Supabase type inference limitation
          mentions?.forEach((mention: any) => {
            const existing = userScores.get(mention.twitter_user_id)
            if (existing) {
              existing.score += mention.score || 10
              existing.count += 1
            } else {
              userScores.set(mention.twitter_user_id, {
                username: mention.twitter_username,
                score: mention.score || 10,
                count: 1,
                avatar: mention.users?.avatar,
                name: mention.users?.name,
              })
            }
          })

      // Convert to array and sort by score
      const allEntries = Array.from(userScores.entries())
        .map(([userId, data]) => ({
          userId,
          username: data.username,
          mentionCount: data.count,
          totalScore: data.score,
          avatar: data.avatar,
          name: data.name,
        }))
        .sort((a, b) => b.totalScore - a.totalScore)

      const totalUsers = allEntries.length
      const totalPages = Math.ceil(totalUsers / limit)

      // Add global rank to all entries
      const rankedEntries = allEntries.map((entry, index) => ({
        rank: index + 1,
        ...entry,
      }))

      // Paginate
      const paginatedEntries = rankedEntries.slice(offset, offset + limit)

      console.log(`🏆 Leaderboard: ${totalUsers} total users, page ${page}/${totalPages}`)
      console.log('🏆 Sample entry:', paginatedEntries[0])

      return {
        items: paginatedEntries,
        page,
        totalPages,
        totalUsers,
        hasMore: page < totalPages,
      }
  }),

  /**
   * Get current user's rank (requires Twitter linked)
   */
  getUserRank: protectedProcedure.query(async ({ ctx }) => {
    const { data: user } = await ctx.supabaseAdmin
      .from('users')
      .select('twitter_username, twitter_id')
      .eq('id', ctx.session.user.id)
      .single()

    // @ts-ignore Supabase type inference limitation
    if (!user?.twitter_username) {
      return {
        rank: null,
        mentionCount: 0,
        totalScore: 0,
        message: 'Twitter account not linked',
      }
    }

    // Get user's total score from database
    const { data: userMentions } = await ctx.supabaseAdmin
      .from('twitter_mentions')
      .select('score')
      .eq('user_id', ctx.session.user.id)

    // @ts-ignore Supabase type inference limitation
    const totalScore = userMentions?.reduce((sum, m) => sum + (m.score || 10), 0) || 0
    const mentionCount = userMentions?.length || 0

    if (mentionCount === 0) {
      return {
        rank: null,
        mentionCount: 0,
        totalScore: 0,
        message: 'Not on leaderboard yet. Start mentioning @Engrishcoin!',
      }
    }

    // Get leaderboard to find rank
    const cacheKey = CACHE_KEYS.LEADERBOARD
    const leaderboard = await getCached(
      cacheKey,
      async () => {
        // This will use the new scored leaderboard from getTopMentioners
        const { data: allMentions } = await ctx.supabaseAdmin
          .from('twitter_mentions')
          .select('twitter_user_id, twitter_username, score, user_id')
        
        const userScores = new Map<string, { username: string; score: number; count: number }>()
        
        // @ts-ignore Supabase type inference limitation
        allMentions?.forEach((mention) => {
          // @ts-ignore Supabase type inference limitation
          const existing = userScores.get(mention.twitter_user_id)
          if (existing) {
            // @ts-ignore Supabase type inference limitation
            existing.score += mention.score || 10
            existing.count += 1
          } else {
            // @ts-ignore Supabase type inference limitation
            userScores.set(mention.twitter_user_id, {
              // @ts-ignore Supabase type inference limitation
              username: mention.twitter_username,
              // @ts-ignore Supabase type inference limitation
              score: mention.score || 10,
              count: 1,
            })
          }
        })

        return Array.from(userScores.entries())
          .map(([userId, data]) => ({
            userId,
            username: data.username,
            totalScore: data.score,
            mentionCount: data.count,
          }))
          .sort((a, b) => b.totalScore - a.totalScore)
      },
      CACHE_TTL.LEADERBOARD
    )

    // Find user's rank
    // @ts-ignore Supabase type inference limitation
    const userIndex = leaderboard.findIndex((entry) => entry.userId === user.twitter_id)
    const rank = userIndex >= 0 ? userIndex + 1 : null

    return {
      rank,
      mentionCount,
      totalScore,
      message: null,
    }
  }),

  /**
   * Refresh leaderboard (manually trigger cache refresh)
   */
  refreshLeaderboard: publicProcedure.mutation(async () => {
    const cacheKey = CACHE_KEYS.LEADERBOARD

    // Fetch fresh data
    const leaderboard = await buildLeaderboard()

    // Update cache
    await getCached(cacheKey, async () => leaderboard, CACHE_TTL.LEADERBOARD)

    return { success: true, count: leaderboard.length }
  }),
})

