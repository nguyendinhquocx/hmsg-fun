import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// Secret key for JWT - should be in environment variables
const JWT_SECRET = process.env.JWT_SECRET || 'your-default-secret-key-change-this'

// Type for user data
type UserData = {
  id: string
  email: string
  full_name: string
  team: string
  role: string
}

export async function POST(request: NextRequest) {
  try {
    const userData: UserData = await request.json()
    
    // Validate required fields
    if (!userData.id || !userData.email || !userData.team || !userData.role) {
      return NextResponse.json(
        { error: 'Missing required user data' },
        { status: 400 }
      )
    }
    
    // Create JWT token
    const token = jwt.sign(
      {
        id: userData.id,
        email: userData.email,
        full_name: userData.full_name,
        team: userData.team,
        role: userData.role
      },
      JWT_SECRET,
      { expiresIn: '7d' } // Token expires in 7 days
    )
    
    // Create response and set cookie
    const response = NextResponse.json({ success: true })
    
    response.cookies.set('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60, // 7 days in seconds
      path: '/'
    })
    
    return response
    
  } catch (error) {
    console.error('Error creating token:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}