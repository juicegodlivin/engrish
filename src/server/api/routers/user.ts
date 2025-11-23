import { z } from 'zod'
import { createTRPCRouter, protectedProcedure } from '../trpc'
import { updateProfileSchema } from '~/lib/validations'

export const userRouter = createTRPCRouter({
  /**
   * Get current user profile
   */
  getProfile: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabaseAdmin
      .from('users')
      .select('*')
      .eq('id', ctx.session.user.id)
      .single()

    if (error) throw error
    return data
  }),

  /**
   * Update user profile
   */
  updateProfile: protectedProcedure
    .input(updateProfileSchema)
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabaseAdmin
        .from('users')
        .update({
          ...input,
          updated_at: new Date().toISOString(),
        })
        .eq('id', ctx.session.user.id)
        .select()
        .single()

      if (error) throw error
      return data
    }),

  /**
   * Get user stats
   */
  getUserStats: protectedProcedure.query(async ({ ctx }) => {
    const { data, error } = await ctx.supabaseAdmin
      .from('user_stats')
      .select('*')
      .eq('user_id', ctx.session.user.id)
      .single()

    if (error && error.code !== 'PGRST116') {
      throw error
    }

    // Return default stats if not found
    return data || {
      user_id: ctx.session.user.id,
      images_generated: 0,
      images_shared: 0,
      twitter_mentions: 0,
      leaderboard_rank: null,
      updated_at: new Date().toISOString(),
    }
  }),

  /**
   * Delete user account (optional - use with caution)
   */
  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    // This will cascade delete all related data
    const { error } = await ctx.supabaseAdmin
      .from('users')
      .delete()
      .eq('id', ctx.session.user.id)

    if (error) throw error

    return { success: true }
  }),
})

