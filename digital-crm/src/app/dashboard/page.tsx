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

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const getUser = async () => {
      try {
        console.log('Dashboard: Getting user from client-side Supabase...')
        console.log('Dashboard: Supabase URL:', process.env.NEXT_PUBLIC_SUPABASE_URL)
        console.log('Dashboard: Supabase Key:', process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.substring(0, 10) + '...')
        
        const supabase = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        )
        
        const { data: { user }, error } = await supabase.auth.getUser()
        
        console.log('Dashboard: Supabase getUser result - error:', error?.message || null)
        console.log('Dashboard: Supabase getUser result - user:', user ? 'Found user' : 'No user')
        
        if (error || !user) {
          console.log('Dashboard: No authenticated user, redirecting to login...')
          window.location.href = '/login'
          return
        }

        // Extract user metadata and format
        const userMetadata = user.user_metadata || {}
        const formattedUser = {
          id: user.id,
          email: user.email || '',
          full_name: userMetadata.full_name || user.email?.split('@')[0] || '',
          team: userMetadata.team || 'Admin',
          role: userMetadata.role || 'user'
        }

        console.log('Dashboard: User authenticated, setting user state:', formattedUser)
        setUser(formattedUser)
        
      } catch (error) {
        console.error('Dashboard: Error getting user:', error)
        console.log('Dashboard: Error occurred, redirecting to login...')
        window.location.href = '/login'
        return
      } finally {
        setIsLoading(false)
      }
    }

    getUser()
  }, [])

  const handleDigitalAccess = () => {
    window.location.href = '/digital'
  }

  const handleSettings = () => {
    window.location.href = '/settings'
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-gray-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header user={user} />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Digital CRM Module */}
          <div className="relative bg-white rounded border border-gray-200 hover:border-black transition-colors duration-200">
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Digital CRM</h3>
                <p className="text-sm text-gray-500">Báo cáo Digital</p>
              </div>
              
              <p className="text-gray-600 mb-6">
                Quản lý công ty, theo dõi thống kê, đồng bộ Google Sheets và báo cáo tự động.
              </p>
              
              <button
                onClick={handleDigitalAccess}
                className="w-full px-4 py-2 text-sm font-medium rounded border border-gray-300 bg-white text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
              >
                Truy cập Digital CRM
              </button>
            </div>
          </div>

          {/* Settings Module */}
          <div className="bg-white rounded border border-gray-200 hover:border-black transition-colors duration-200">
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Cài đặt hệ thống</h3>
                <p className="text-sm text-gray-500">Quản lý cấu hình</p>
              </div>
              
              <p className="text-gray-600 mb-6">
                Quản lý email báo cáo, xem log đồng bộ, và cấu hình hệ thống.
              </p>
              
              <button
                onClick={handleSettings}
                className="w-full px-4 py-2 border border-gray-300 text-sm font-medium rounded text-black bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
              >
                Mở cài đặt
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  )
}