import { cookies } from 'next/headers'
import { NextRequest } from 'next/server'
import jwt from 'jsonwebtoken'

// Secret key for JWT - should match the one in login API
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key-change-this'

// Type for user data stored in JWT
export type AuthUser = {
  id: string
  email: string
  full_name: string
  team: string
  role: string
}

/**
 * Verifies JWT token and returns user data
 * @param token JWT token string
 * @returns Decoded user data or null if invalid
 */
export const verifyToken = (token: string): AuthUser | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AuthUser
    return decoded
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

/**
 * Gets user data from request cookies
 * @param request Next.js request object
 * @returns User data or null if not authenticated
 */
export const getUserFromRequest = async (request: NextRequest): Promise<AuthUser | null> => {
  try {
    // For API routes, we can get cookies directly from request
    const token = request.cookies.get('authToken')?.value
    
    if (!token) {
      return null
    }
    
    return verifyToken(token)
  } catch (error) {
    console.error('Error getting user from request:', error)
    return null
  }
}

/**
 * Gets user data from server-side cookies (for Server Components)
 * @returns User data or null if not authenticated
 */
export const getUserFromCookies = async (): Promise<AuthUser | null> => {
  try {
    const cookieStore = await cookies()
    const token = cookieStore.get('authToken')?.value
    
    if (!token) {
      return null
    }
    
    return verifyToken(token)
  } catch (error) {
    console.error('Error getting user from cookies:', error)
    return null
  }
}

/**
 * Middleware function to protect API routes
 * @param request Next.js request object
 * @returns User data if authenticated, otherwise throws error
 */
export const requireAuth = async (request: NextRequest) => {
  const user = await getUserFromRequest(request)
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  return user
}

/**
 * Middleware function to protect Server Components
 * @returns User data if authenticated, otherwise throws error
 */
export const requireAuthForComponent = async () => {
  const user = await getUserFromCookies()
  
  if (!user) {
    throw new Error('Unauthorized')
  }
  
  return user
}