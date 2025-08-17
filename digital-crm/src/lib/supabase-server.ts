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
          const cookies = await cookiesToUse
          return cookies.get(name)?.value
        },
        async set(name: string, value: string, options: CookieOptions) {
          try {
            const cookies = await cookiesToUse
            cookies.set({ name, value, ...options })
          } catch {
            // The `set` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
        async remove(name: string, options: CookieOptions) {
          try {
            const cookies = await cookiesToUse
            cookies.set({ name, value: '', ...options })
          } catch {
            // The `delete` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  )
}