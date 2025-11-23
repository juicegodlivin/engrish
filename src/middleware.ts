import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

/**
 * Middleware to protect routes that require authentication
 */
export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Define protected paths
  const protectedPaths = [
    '/dashboard',
    '/generate',
    '/api/trpc', // Protect tRPC routes (we'll check session in procedures)
  ]

  // Check if the path is protected
  const isProtectedPath = protectedPaths.some(protectedPath =>
    path.startsWith(protectedPath)
  )

  // For now, we'll let NextAuth handle the session checking
  // This middleware is just for future enhancements
  if (isProtectedPath) {
    // You can add additional checks here if needed
    // For example, rate limiting, IP blocking, etc.
  }

  return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}

