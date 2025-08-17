import { NextRequest } from 'next/server'

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
 * Verifies JWT token using Web Crypto API (Edge Runtime compatible)
 * @param token JWT token string
 * @returns Decoded user data or null if invalid
 */
export const verifyTokenEdge = async (token: string): Promise<AuthUser | null> => {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) {
      return null
    }

    const [header, payload, signature] = parts
    
    // Verify signature using Web Crypto API
    const encoder = new TextEncoder()
    const data = encoder.encode(`${header}.${payload}`)
    const key = await crypto.subtle.importKey(
      'raw',
      encoder.encode(JWT_SECRET),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['verify']
    )
    
    const signatureBytes = Uint8Array.from(atob(signature.replace(/-/g, '+').replace(/_/g, '/')), c => c.charCodeAt(0))
    const isValid = await crypto.subtle.verify('HMAC', key, signatureBytes, data)
    
    if (!isValid) {
      return null
    }
    
    // Decode payload
    const decodedPayload = JSON.parse(atob(payload.replace(/-/g, '+').replace(/_/g, '/')))
    
    // Check expiration
    if (decodedPayload.exp && Date.now() >= decodedPayload.exp * 1000) {
      return null
    }
    
    return {
      id: decodedPayload.id,
      email: decodedPayload.email,
      full_name: decodedPayload.full_name,
      team: decodedPayload.team,
      role: decodedPayload.role
    }
  } catch (error) {
    console.error('Token verification error:', error)
    return null
  }
}

/**
 * Gets user data from request cookies (Edge Runtime compatible)
 * @param request Next.js request object
 * @returns User data or null if not authenticated
 */
export const getUserFromRequestEdge = async (request: NextRequest): Promise<AuthUser | null> => {
  try {
    const token = request.cookies.get('authToken')?.value
    
    if (!token) {
      return null
    }
    
    return await verifyTokenEdge(token)
  } catch (error) {
    console.error('Error getting user from request:', error)
    return null
  }
}