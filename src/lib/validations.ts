import { z } from 'zod'
import { IMAGE_GENERATION } from './constants'

/**
 * Validation schemas using Zod
 */

// Image generation
export const imageGenerationSchema = z.object({
  prompt: z
    .string()
    .min(IMAGE_GENERATION.MIN_PROMPT_LENGTH, `Prompt too short ser! Need at least ${IMAGE_GENERATION.MIN_PROMPT_LENGTH} characters`)
    .max(IMAGE_GENERATION.MAX_PROMPT_LENGTH, `Prompt too long ser! Max ${IMAGE_GENERATION.MAX_PROMPT_LENGTH} characters`),
})

export type ImageGenerationInput = z.infer<typeof imageGenerationSchema>

// User profile update
export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name too short').max(50, 'Name too long').optional(),
  bio: z.string().max(500, 'Bio too long').optional(),
  avatar: z.string().url('Invalid avatar URL').optional(),
})

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>

// Twitter linking
export const linkTwitterSchema = z.object({
  username: z
    .string()
    .min(1, 'Username required')
    .max(15, 'Twitter username too long')
    .regex(/^[a-zA-Z0-9_]+$/, 'Invalid Twitter username format'),
})

export type LinkTwitterInput = z.infer<typeof linkTwitterSchema>

// Pagination
export const paginationSchema = z.object({
  limit: z.number().min(1).max(100).default(20),
  cursor: z.string().optional(),
})

export type PaginationInput = z.infer<typeof paginationSchema>

// Wallet address validation
export const walletAddressSchema = z
  .string()
  .min(32, 'Invalid wallet address')
  .max(44, 'Invalid wallet address')
  .regex(/^[1-9A-HJ-NP-Za-km-z]+$/, 'Invalid wallet address format')

// Share to Twitter
export const shareToTwitterSchema = z.object({
  imageId: z.string().uuid('Invalid image ID'),
  text: z.string().max(280, 'Tweet too long').optional(),
})

export type ShareToTwitterInput = z.infer<typeof shareToTwitterSchema>

