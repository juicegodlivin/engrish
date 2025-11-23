/**
 * tRPC client configuration for browser
 */
import { httpBatchLink } from '@trpc/client'
import { createTRPCReact } from '@trpc/react-query'
import type { AppRouter } from '~/server/api/root'
import superjson from 'superjson'

export const trpc = createTRPCReact<AppRouter>()

/**
 * Get the base URL for tRPC requests
 */
function getBaseUrl() {
  if (typeof window !== 'undefined') return '' // browser should use relative url
  if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}` // SSR should use vercel url
  return `http://localhost:${process.env.PORT ?? 3000}` // dev SSR should use localhost
}

/**
 * Create tRPC client with proper configuration
 */
export function createTRPCClient() {
  return trpc.createClient({
    transformer: superjson,
    links: [
      httpBatchLink({
        url: `${getBaseUrl()}/api/trpc`,
        headers() {
          return {
            'content-type': 'application/json',
          }
        },
      }),
    ],
  })
}

