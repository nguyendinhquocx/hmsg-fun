import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email và mật khẩu là bắt buộc' },
        { status: 400 }
      )
    }

    const supabase = await createServerSupabaseClient()

    // First, try normal authentication
    let { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    // If auth fails, check if user exists in database and try auto-signup
    if (authError || !authData.user) {
      // Check if user exists in database
      const { data: dbUser, error: dbError } = await supabase
        .from('users')
        .select('email, full_name')
        .eq('email', email)
        .single()

      if (!dbError && dbUser) {
        // User exists in database but not in auth - try auto-signup
        const { data: signupData, error: signupError } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: undefined // Skip email confirmation
          }
        })

        if (!signupError && signupData.user) {
          // Update the database record with the new auth user ID
          await supabase
            .from('users')
            .update({ id: signupData.user.id })
            .eq('email', email)

          // Set authData for continued flow
          authData = signupData
        } else {
          return NextResponse.json(
            { error: 'Email hoặc mật khẩu không đúng' },
            { status: 401 }
          )
        }
      } else {
        return NextResponse.json(
          { error: 'Email hoặc mật khẩu không đúng' },
          { status: 401 }
        )
      }
    }

    // Check user profile
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('team, role, full_name')
      .eq('id', authData.user.id)
      .single()

    if (profileError || !userProfile) {
      await supabase.auth.signOut()
      return NextResponse.json(
        { error: 'Không tìm thấy thông tin người dùng' },
        { status: 404 }
      )
    }

    // All users can login to main dashboard
    // Team-specific access will be handled in UI

    // Success
    return NextResponse.json({
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        full_name: userProfile.full_name,
        team: userProfile.team,
        role: userProfile.role
      }
    })

  } catch (error) {
    console.error('Login API error:', error)
    return NextResponse.json(
      { error: 'Đã xảy ra lỗi server' },
      { status: 500 }
    )
  }
}