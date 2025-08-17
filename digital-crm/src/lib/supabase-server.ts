import { createServerClient, type CookieOptions } from '@supabase/ssr'
import { cookies as nextCookies } from 'next/headers'

// Server-side Supabase client
export const createServerSupabaseClient = (cookieStore?: ReturnType<typeof nextCookies>) => {
  const cookiesToUse = cookieStore || nextCookies()

  return createServerClient(
    'https://glppizdubinvwuncteah.supabase.co',
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdscHBpemR1Ymludnd1bmN0ZWFoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI4NTM2MjYsImV4cCI6MjA2ODQyOTYyNn0.DEvmpyv3ABM1NQH7ag_0s_uNxdM7X1rwP9FnB4AzEMU',
    {
      cookies: {
        async get(name: string) {
          return (await cookieStore.get(name))?.value
        },
        set(name: string, value: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value, ...options })
          } catch (_error) {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        remove(name: string, options: CookieOptions) {
          try {
            cookieStore.set({ name, value: '', ...options })
          } catch (_error) {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}