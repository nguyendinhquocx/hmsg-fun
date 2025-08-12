import { createClient } from '@supabase/supabase-js'
import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side Supabase client
export const createServerSupabaseClient = () => {
  const cookieStore = cookies()

  return createServerClient(
    supabaseUrl,
    supabaseAnonKey,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}

export type Database = {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          full_name: string
          team: string
          role: 'admin' | 'user'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          full_name: string
          team: string
          role?: 'admin' | 'user'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string
          team?: string
          role?: 'admin' | 'user'
          created_at?: string
          updated_at?: string
        }
      }
      companies: {
        Row: {
          id: string
          name: string
          code: string
          sector: string
          contact_person: string
          contact_email: string
          contact_phone: string
          team: string
          status: 'active' | 'inactive' | 'potential'
          notes: string
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          code?: string
          sector: string
          contact_person?: string
          contact_email?: string
          contact_phone?: string
          team: string
          status?: 'active' | 'inactive' | 'potential'
          notes?: string
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          code?: string
          sector?: string
          contact_person?: string
          contact_email?: string
          contact_phone?: string
          team?: string
          status?: 'active' | 'inactive' | 'potential'
          notes?: string
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      email_configs: {
        Row: {
          id: string
          email: string
          name: string
          active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          name: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          name?: string
          active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      sync_logs: {
        Row: {
          id: string
          operation: 'create' | 'update' | 'delete'
          table_name: string
          record_id: string
          status: 'success' | 'failed' | 'pending'
          error_message: string | null
          created_at: string
        }
        Insert: {
          id?: string
          operation: 'create' | 'update' | 'delete'
          table_name: string
          record_id: string
          status?: 'success' | 'failed' | 'pending'
          error_message?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          operation?: 'create' | 'update' | 'delete'
          table_name?: string
          record_id?: string
          status?: 'success' | 'failed' | 'pending'
          error_message?: string | null
          created_at?: string
        }
      }
    }
  }
}