import { getServerSession } from 'next-auth/next'
import { authOptions } from '~/app/api/auth/[...nextauth]/route'

/**
 * Get the current session on the server
 * Use this in Server Components and API routes
 */
export async function getSession() {
  return await getServerSession(authOptions)
}

/**
 * Require authentication - throws if not authenticated
 * Use this in protected API routes and Server Components
 */
export async function requireAuth() {
  const session = await getSession()
  
  if (!session?.user) {
    throw new Error('Unauthorized')
  }
  
  return session
}

/**
 * Get current user from session
 */
export async function getCurrentUser() {
  const session = await getSession()
  return session?.user
}

