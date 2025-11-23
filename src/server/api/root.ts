/**
 * Root tRPC router
 * This is the main router that combines all feature routers
 */
import { createTRPCRouter } from './trpc'
import { userRouter } from './routers/user'
import { imageRouter } from './routers/image'
import { twitterRouter } from './routers/twitter'
import { leaderboardRouter } from './routers/leaderboard'

/**
 * This is the primary router for your server.
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  image: imageRouter,
  twitter: twitterRouter,
  leaderboard: leaderboardRouter,
})

// Export type definition of API
export type AppRouter = typeof appRouter

