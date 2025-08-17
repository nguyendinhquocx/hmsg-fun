import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { verifyTokenEdge } from '@/lib/auth-edge'

// Paths that require authentication
const protectedPaths = ['/dashboard', '/digital', '/settings']

// Paths that are public (no auth required)
const publicPaths = ['/login']

/**
 * Middleware to protect routes
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  
  // Skip middleware for public paths
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }
  
  // Check if path requires authentication
  const isProtectedPath = protectedPaths.some(path => pathname.startsWith(path))
  
  if (isProtectedPath) {
    // Get token from cookies
    const token = request.cookies.get('authToken')?.value
    
    if (!token) {
      // No token, redirect to login
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    
    // Verify token
    const user = await verifyTokenEdge(token)
    
    if (!user) {
      // Invalid token, redirect to login
      const url = request.nextUrl.clone()
      url.pathname = '/login'
      return NextResponse.redirect(url)
    }
    
    // Valid token, allow access
    return NextResponse.next()
  }
  
  // For all other paths, allow access
  return NextResponse.next()
}

// Matcher config to specify which paths to run middleware on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}