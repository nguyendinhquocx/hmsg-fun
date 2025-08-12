import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    
    // Get authenticated user
    const { data: { user: authUser }, error: authError } = await supabase.auth.getUser()
    
    if (authError || !authUser) {
      return NextResponse.json({ user: null })
    }

    // Get user profile
    const { data: userProfile, error: profileError } = await supabase
      .from('users')
      .select('id, email, full_name, team, role')
      .eq('id', authUser.id)
      .single()

    if (profileError || !userProfile) {
      return NextResponse.json({ user: null })
    }

    return NextResponse.json({ 
      user: userProfile
    })

  } catch (error) {
    console.error('Get user API error:', error)
    return NextResponse.json({ user: null })
  }
}