import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(_request: NextRequest) {
  try {
    console.log('Testing Supabase connection...')
    const supabase = await createServerSupabaseClient()

    // Test connection by listing all tables
    console.log('Testing database connection...')
    
    // Try to query users table
    const { data: users, error: usersError } = await supabase
      .from('users')
      .select('*')
      .limit(5)

    console.log('Users query result:', { users, usersError })

    // Try to query old table if exists
    const { data: oldUsers, error: oldUsersError } = await supabase
      .from('user')
      .select('*')
      .limit(5)

    console.log('Old user table query result:', { oldUsers, oldUsersError })

    return NextResponse.json({
      success: true,
      data: {
        users: {
          data: users,
          error: usersError?.message || null,
          count: users?.length || 0
        },
        oldUser: {
          data: oldUsers,
          error: oldUsersError?.message || null,
          count: oldUsers?.length || 0
        }
      }
    })

  } catch (error) {
    console.error('Test API error:', error)
    return NextResponse.json(
      { 
        error: 'Test failed', 
        details: error instanceof Error ? error.message : String(error) 
      },
      { status: 500 }
    )
  }
}