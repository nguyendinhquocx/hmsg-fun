import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  console.log('=== LOGIN API CALLED (using Supabase Auth) ===')
  try {
    // Parse request body with error handling
    let email, password
    try {
      const body = await request.json()
      email = body.email
      password = body.password
      console.log('Parsed email:', email)
      console.log('Parsed password:', password)
    } catch (parseError) {
      console.log('JSON parse error:', parseError)
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      )
    }

    console.log('=== Starting Supabase Auth login for email:', email)

    if (!email || !password) {
      console.log('Missing email or password')
      return NextResponse.json(
        { error: 'Email và mật khẩu là bắt buộc' },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    // Use Supabase Authentication
    console.log('Attempting Supabase Auth login...')
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })

    console.log('Supabase auth result - error:', error?.message || null)
    console.log('Supabase auth result - user:', data.user ? 'Found user' : 'No user')
    console.log('Supabase auth result - session:', data.session ? 'Session created' : 'No session')

    if (error || !data.user) {
      console.log('Authentication failed:', error?.message)
      return NextResponse.json(
        { error: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      )
    }

    // Extract user metadata
    const userMetadata = data.user.user_metadata || {}
    const user = {
      id: data.user.id,
      email: data.user.email,
      full_name: userMetadata.full_name || data.user.email?.split('@')[0],
      team: userMetadata.team || 'Admin',
      role: userMetadata.role || 'user'
    }

    console.log('Login successful for user:', user)

    // Return session info (Supabase handles JWT automatically)
    return NextResponse.json({
      success: true,
      user: user,
      session: data.session
    })

  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi server', debug: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}