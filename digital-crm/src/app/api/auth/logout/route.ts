import { NextRequest, NextResponse } from 'next/server'

export async function POST(_request: NextRequest) {
  try {
    // Create response with success message
    const response = NextResponse.json({ success: true })
    
    // Clear the auth token cookie
    response.cookies.set('authToken', '', { 
      httpOnly: true,
      expires: new Date(0), // Set expiry to past date to delete cookie
      path: '/',
      sameSite: 'strict'
    })
    
    return response

  } catch (error) {
    console.error('Logout API error:', error)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi server' },
      { status: 500 }
    )
  }
}