import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

// Sử dụng service role key để có quyền admin
const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Cần thêm vào .env.local
)

export async function POST(request: NextRequest) {
  try {
    const { email, password, full_name, role = 'user' } = await request.json()

    // Validate input
    if (!email || !password || !full_name) {
      return NextResponse.json(
        { error: 'Email, password và full_name là bắt buộc' }, 
        { status: 400 }
      )
    }

    if (!['admin', 'manager', 'user'].includes(role)) {
      return NextResponse.json(
        { error: 'Role phải là admin, manager hoặc user' }, 
        { status: 400 }
      )
    }

    console.log('Creating user:', { email, full_name, role })

    // 1. Tạo user trong Supabase Auth với metadata
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        full_name,
        team: 'CHC', // Mặc định team 'CHC' cho Digital CRM
        role
      },
      email_confirm: true // Tự động confirm email
    })

    if (authError) {
      console.error('Auth error:', authError)
      return NextResponse.json(
        { error: `Lỗi tạo user trong Auth: ${authError.message}` }, 
        { status: 400 }
      )
    }

    console.log('Auth user created:', authUser.user.id)

    // 2. Thêm user vào bảng users
    const { error: dbError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authUser.user.id,
        email,
        full_name,
        team: 'CHC',
        role,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (dbError) {
      console.error('Database error:', dbError)
      
      // Nếu lỗi database, xóa user trong Auth để tránh inconsistency
      await supabaseAdmin.auth.admin.deleteUser(authUser.user.id)
      
      return NextResponse.json(
        { error: `Lỗi thêm user vào database: ${dbError.message}` }, 
        { status: 400 }
      )
    }

    console.log('User added to database successfully')

    return NextResponse.json({ 
      message: 'User được tạo thành công',
      user: {
        id: authUser.user.id,
        email,
        full_name,
        team: 'CHC',
        role
      }
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Lỗi server không xác định' }, 
      { status: 500 }
    )
  }
}

// API để lấy danh sách users (chỉ admin)
export async function GET(_request: NextRequest) {
  try {
    // TODO: Thêm authentication check cho admin
    
    const { data: users, error } = await supabaseAdmin
      .from('users')
      .select('id, email, full_name, team, role, created_at')
      .eq('team', 'CHC')
      .order('created_at', { ascending: false })

    if (error) {
      return NextResponse.json(
        { error: error.message }, 
        { status: 400 }
      )
    }

    return NextResponse.json({ users })

  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Lỗi server không xác định' }, 
      { status: 500 }
    )
  }
}

// API để xóa user (chỉ admin)
export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await request.json()

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID là bắt buộc' }, 
        { status: 400 }
      )
    }

    // TODO: Thêm authentication check cho admin
    // TODO: Không cho phép xóa chính mình

    console.log('Deleting user:', userId)

    // 1. Xóa user khỏi bảng users
    const { error: dbError } = await supabaseAdmin
      .from('users')
      .delete()
      .eq('id', userId)

    if (dbError) {
      console.error('Database delete error:', dbError)
      return NextResponse.json(
        { error: `Lỗi xóa user khỏi database: ${dbError.message}` }, 
        { status: 400 }
      )
    }

    // 2. Xóa user khỏi Supabase Auth
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId)

    if (authError) {
      console.error('Auth delete error:', authError)
      // Không return error vì user đã bị xóa khỏi database
      console.warn('User deleted from database but not from Auth')
    }

    console.log('User deleted successfully')

    return NextResponse.json({ 
      message: 'User đã được xóa thành công' 
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return NextResponse.json(
      { error: 'Lỗi server không xác định' }, 
      { status: 500 }
    )
  }
}