'use client'

import { useAuth } from '~/hooks/use-auth'

/**
 * Hidden component that handles wallet authentication
 * This needs to be rendered to trigger the useAuth hook
 */
export function AuthHandler() {
  useAuth() // This triggers the auto-sign-in effect
  return null // Renders nothing, just handles auth logic
}

