'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

export default function DebugPage() {
  const [authUser, setAuthUser] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        
        const { data: { user }, error } = await supabase.auth.getUser()
        
        if (error) {
          setError(error.message)
        } else {
          setAuthUser(user)
        }
      } catch (err) {
        setError('Error connecting to Supabase')
      }
    }

    checkAuth()
  }, [])

  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold mb-4">Debug Auth Info</h1>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          Error: {error}
        </div>
      )}
      
      {authUser ? (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          <h2 className="font-bold">Authenticated User Found:</h2>
          <pre className="mt-2 text-sm overflow-auto">
            {JSON.stringify(authUser, null, 2)}
          </pre>
        </div>
      ) : (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          No authenticated user found
        </div>
      )}
      
      <div className="mt-4">
        <a href="/login" className="text-blue-600 underline mr-4">
          Go to Login
        </a>
        <a href="/dashboard" className="text-blue-600 underline">
          Go to Dashboard
        </a>
      </div>
    </div>
  )
}