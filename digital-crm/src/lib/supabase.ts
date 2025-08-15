import { createClient } from '@supabase/supabase-js'

// Direct credentials - no env vars
const supabaseUrl = 'https://glppizdubinvwuncteah.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscHBpemR1Ymludnd1bmN0ZWFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4NTM2MjYsImV4cCI6MjA2ODQyOTYyNn0.DEvmpyv3ABM1NQH7ag_0s_uNxdM7X1rwP9FnB4AzEMU'

// Debug log
console.log('Supabase config:', { url: supabaseUrl, keyLength: supabaseAnonKey?.length })

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

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