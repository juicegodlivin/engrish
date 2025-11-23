/**
 * tRPC initialization and context setup
 * This is where we configure the tRPC instance
 */
import { initTRPC, TRPCError } from '@trpc/server'
import { type NextRequest } from 'next/server'
import superjson from 'superjson'
import { ZodError } from 'zod'
import { jwtVerify } from 'jose'
import { getUserByWalletAddress, supabase, supabaseAdmin } from '../db/client'
import type { SupabaseClient } from '@supabase/supabase-js'
import type { Database } from '~/types/database'

const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'fallback-secret-key-change-in-production')

/**
 * Create context for tRPC requests
 * This runs for every tRPC request
 */
export async function createTRPCContext(opts: { req: NextRequest }) {
  // Get session from JWT cookie
  let session = null

  try {
    const token = opts.req.cookies.get('auth-token')?.value
    
    if (token) {
      const { payload } = await jwtVerify(token, JWT_SECRET)
      const user = await getUserByWalletAddress(payload.walletAddress as string)
      
      if (user) {
        session = {
          user: {
            id: user.id,
            walletAddress: user.wallet_address,
            name: user.name,
            email: user.email,
            image: user.avatar,
          },
        }
      }
    }
  } catch (error) {
    console.error('tRPC context auth error:', error)
  }

  return {
    session,
    supabase: supabase as SupabaseClient<Database> | null,
    supabaseAdmin: supabaseAdmin as SupabaseClient<Database> | null,
    req: opts.req,
  }
}

export type Context = Awaited<ReturnType<typeof createTRPCContext>>

/**
 * Initialize tRPC with context
 */
const t = initTRPC.context<Context>().create({
  transformer: superjson,
  errorFormatter({ shape, error }) {
    return {
      ...shape,
      data: {
        ...shape.data,
        zodError:
          error.cause instanceof ZodError ? error.cause.flatten() : null,
      },
    }
  },
})

/**
 * Export reusable router and procedure helpers
 */
export const createTRPCRouter = t.router
export const publicProcedure = t.procedure

/**
 * Protected procedure - requires authentication
 */
export const protectedProcedure = t.procedure.use(async ({ ctx, next }) => {
  if (!ctx.session || !ctx.session.user) {
    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Not authenticated' })
  }

  return next({
    ctx: {
      ...ctx,
      session: { ...ctx.session, user: ctx.session.user },
    },
  })
})

/**
 * Middleware for rate limiting
 */
import { checkRateLimit, CACHE_KEYS } from '../services/redis'

export const rateLimitProcedure = (max: number, windowMs: number) =>
  protectedProcedure.use(async ({ ctx, next }) => {
    const identifier = ctx.session.user.id

    const rateLimit = await checkRateLimit(identifier, max, windowMs)

    if (!rateLimit.success) {
      throw new TRPCError({
        code: 'TOO_MANY_REQUESTS',
        message: `Rate limit exceeded. Try again in ${Math.ceil((rateLimit.resetAt! - Date.now()) / 1000)} seconds.`,
      })
    }

    return next()
  })

