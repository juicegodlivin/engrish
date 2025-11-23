import { z } from 'zod'
import { createTRPCRouter, protectedProcedure, publicDatabaseProcedure, rateLimitProcedure } from '../trpc'
import { imageGenerationSchema, paginationSchema } from '~/lib/validations'
import { generateImage } from '~/server/services/replicate'
import { TRPCError } from '@trpc/server'
import type { Database } from '~/types/database'

export const imageRouter = createTRPCRouter({
  /**
   * Generate a new image (rate limited: 5 per minute)
   * 
   * Images are permanently stored:
   * - Replicate API returns permanent CDN URLs
   * - URLs are stored in the database 'generated_images' table
   * - Images persist on Replicate's CDN indefinitely
   * - Users can download images anytime from their dashboard
   */
  generate: rateLimitProcedure(5, 60000)
    .input(imageGenerationSchema)
    .mutation(async ({ ctx, input }) => {
      try {
        // Generate image with Replicate
        const result = await generateImage({ prompt: input.prompt })

        // Save to database
        const { data: image, error } = await ctx.supabaseAdmin
          .from('generated_images')
          // @ts-ignore Supabase type inference limitation
          .insert({
            user_id: ctx.session.user.id,
            prompt: input.prompt,
            image_url: result.imageUrl,
            replicate_id: result.id || null,
            is_public: true,
            shared_to_twitter: false,
          })
          .select()
          .single()

        if (error) throw error

        // Update user stats (don't fail the whole request if this fails)
        try {
          const { data: currentStats } = await ctx.supabaseAdmin
            .from('user_stats')
            .select('images_generated')
            .eq('user_id', ctx.session.user.id)
            .single()

          await ctx.supabaseAdmin
            .from('user_stats')
            // @ts-ignore Supabase type inference limitation
            .upsert({
              user_id: ctx.session.user.id,
              images_generated: (currentStats?.images_generated || 0) + 1,
              updated_at: new Date().toISOString(),
            })
        } catch (statsError) {
          console.error('Stats update failed (non-critical):', statsError)
          // Don't throw - image was generated successfully
        }

        return image
      } catch (error) {
        console.error('Image generation error:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Failed to generate image',
        })
      }
    }),

  /**
   * Get user's generated images
   */
  getUserImages: protectedProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input }) => {
      let query = ctx.supabaseAdmin
        .from('generated_images')
        .select('*')
        .eq('user_id', ctx.session.user.id)
        .order('created_at', { ascending: false })
        .limit(input.limit + 1)

      if (input.cursor) {
        query = query.lt('created_at', input.cursor)
      }

      const { data, error } = await query

      if (error) throw error

      const hasMore = data.length > input.limit
      const items = hasMore ? data.slice(0, -1) : data
      const nextCursor = hasMore ? data[data.length - 2]?.created_at : undefined

      return {
        items,
        nextCursor,
        hasMore,
      }
    }),

  /**
   * Get public gallery images
   */
  getPublicGallery: publicDatabaseProcedure
    .input(paginationSchema)
    .query(async ({ ctx, input }) => {
      let query = ctx.supabaseAdmin
        .from('generated_images')
        .select('*, users!inner(name, avatar, wallet_address)')
        .eq('is_public', true)
        .order('created_at', { ascending: false })
        .limit(input.limit + 1)

      if (input.cursor) {
        query = query.lt('created_at', input.cursor)
      }

      const { data, error } = await query

      if (error) throw error

      const hasMore = data.length > input.limit
      const items = hasMore ? data.slice(0, -1) : data
      const nextCursor = hasMore ? data[data.length - 2]?.created_at : undefined

      return {
        items,
        nextCursor,
        hasMore,
      }
    }),

  /**
   * Delete an image
   */
  deleteImage: protectedProcedure
    .input(z.object({ imageId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabaseAdmin
        .from('generated_images')
        .delete()
        .eq('id', input.imageId)
        .eq('user_id', ctx.session.user.id)

      if (error) throw error

      return { success: true }
    }),

  /**
   * Toggle image visibility
   */
  toggleVisibility: protectedProcedure
    .input(z.object({ imageId: z.string().uuid(), isPublic: z.boolean() }))
    .mutation(async ({ ctx, input }) => {
      const { data, error } = await ctx.supabaseAdmin
        .from('generated_images')
        // @ts-ignore Supabase type inference limitation
        .update({ is_public: input.isPublic })
        .eq('id', input.imageId)
        .eq('user_id', ctx.session.user.id)
        .select()
        .single()

      if (error) throw error

      return data
    }),

  /**
   * Mark image as shared to Twitter
   */
  markShared: protectedProcedure
    .input(z.object({ imageId: z.string().uuid() }))
    .mutation(async ({ ctx, input }) => {
      const { error } = await ctx.supabaseAdmin
        .from('generated_images')
        // @ts-ignore Supabase type inference limitation
        .update({ shared_to_twitter: true })
        .eq('id', input.imageId)
        .eq('user_id', ctx.session.user.id)

      if (error) throw error

      // Update user stats
      await ctx.supabaseAdmin!
        .from('user_stats')
        // @ts-ignore Supabase type inference limitation
        .update({
          images_shared: ctx.supabaseAdmin!.rpc('user_stats.images_shared') + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', ctx.session.user.id)

      return { success: true }
    }),
})

