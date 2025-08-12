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

    const supabase = createServerSupabaseClient()

    // Authenticate user
    const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (authError || !authData.user) {
      return NextResponse.json(
        { error: 'Email hoặc mật khẩu không đúng' },
        { status: 401 }
      )
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

    // Check team access
    if (userProfile.team !== 'b') {
      await supabase.auth.signOut()
      return NextResponse.json(
        { error: 'Bạn không có quyền truy cập module Digital' },
        { status: 403 }
      )
    }

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