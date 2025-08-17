'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/header'
import { createClient } from '@supabase/supabase-js'

interface User {
  id: string
  email: string
  full_name: string
  team: string
  role: string
}

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const getUser = async () => {
      const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      )
      const { data: { user: authUser } } = await supabase.auth.getUser()
      if (authUser) {
        const userMetadata = authUser.user_metadata || {}
        setUser({
          id: authUser.id,
          email: authUser.email || '',
          full_name: userMetadata.full_name || authUser.email?.split('@')[0] || '',
          team: userMetadata.team || 'Admin',
          role: userMetadata.role || 'user'
        })
      }
    }
    getUser()
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <Header user={user} />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Cài đặt hệ thống
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Trang cài đặt đang được phát triển
          </p>
        </div>

        <div className="bg-white border border-gray-200 rounded p-6">
          <p className="text-gray-600">
            Tính năng cài đặt sẽ được bổ sung trong phiên bản tiếp theo.
          </p>
        </div>
      </main>
    </div>
  )
}