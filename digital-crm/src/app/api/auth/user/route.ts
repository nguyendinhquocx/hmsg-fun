import { NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'

export async function GET() {
  try {
    console.log('=== GET USER API CALLED ===')
    
    const supabase = await createServerSupabaseClient()
    
    // Get current user from Supabase Auth
    const { data: { user }, error } = await supabase.auth.getUser()
    
    console.log('Supabase getUser result - error:', error?.message || null)
    console.log('Supabase getUser result - user:', user ? 'Found user' : 'No user')
    
    if (error || !user) {
      console.log('No authenticated user found')
      return NextResponse.json({ user: null })
    }

    // Extract user metadata and format response
    const userMetadata = user.user_metadata || {}
    const formattedUser = {
      id: user.id,
      email: user.email,
      full_name: userMetadata.full_name || user.email?.split('@')[0],
      team: userMetadata.team || 'Admin',
      role: userMetadata.role || 'user'
    }

    console.log('Returning formatted user:', formattedUser)

    return NextResponse.json({ 
      user: formattedUser
    })

  } catch (error) {
    console.error('Get user API error:', error)
    return NextResponse.json({ user: null })
  }
}