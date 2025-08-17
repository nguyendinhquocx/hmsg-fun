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
    const { data: initialAuthData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    let authData = initialAuthData

    // If auth fails, check if user exists in database and try auto-signup
    if (authError || !authData.user) {
      // Check if user exists in database
      console.log('Checking database for user:', email)
      const { data: dbUser, error: dbError } = await supabase
        .from('users')
        .select('email, full_name')
        .eq('email', email)
        .single()

      console.log('Database query result:', { dbUser, dbError })

      if (dbError) {
        console.error('Database error finding user:', dbError)
        return NextResponse.json(
          { 
            error: 'Email hoặc mật khẩu không đúng', 
            debug: 'Auto-signup failed',
            signupError: 'Database error finding user',
            dbError: dbError.message || String(dbError)
          },
          { status: 401 }
        )
      }

      if (dbUser) {
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

          // Sign in again to get a proper session
          const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
            email,
            password,
          })

          if (!signInError && signInData.user) {
            authData = signInData
          } else {
            return NextResponse.json(
              { error: 'Email hoặc mật khẩu không đúng' },
              { status: 401 }
            )
          }
        } else {
          console.error('Auto-signup failed:', { 
            signupError: signupError?.message || signupError, 
            signupData,
            email 
          })
          return NextResponse.json(
            { 
              error: 'Email hoặc mật khẩu không đúng', 
              debug: 'Auto-signup failed',
              signupError: signupError?.message || String(signupError)
            },
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
    const { data: initialUserProfile, error: profileError } = await supabase
      .from('users')
      .select('team, role, full_name')
      .eq('id', authData.user.id)
      .single()
    
    let userProfile = initialUserProfile

    // If profile not found by auth ID, try to find by email and sync
    if (profileError || !userProfile) {
      const { data: userByEmail } = await supabase
        .from('users')
        .select('team, role, full_name')
        .eq('email', authData.user.email)
        .single()

      if (userByEmail) {
        // Sync database ID with auth ID
        await supabase
          .from('users')
          .update({ id: authData.user.id })
          .eq('email', authData.user.email)
        
        userProfile = userByEmail
        console.log('Synced user ID:', { email: authData.user.email, newId: authData.user.id })
      } else {
        await supabase.auth.signOut()
        return NextResponse.json(
          { error: 'Không tìm thấy thông tin người dùng' },
          { status: 404 }
        )
      }
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
      { error: 'Đã xảy ra lỗi server', debug: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    )
  }
}