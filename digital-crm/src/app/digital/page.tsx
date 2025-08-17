'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Header from '@/components/layout/header'
import StatsCards from '@/components/dashboard/stats-cards'
import CompanyTable from '@/components/dashboard/company-table'
import { createClient } from '@supabase/supabase-js'

interface User {
  id: string
  email: string
  full_name: string
  team: string
  role: string
}

export default function DigitalPage() {
  const [user, setUser] = useState<User | null>(null)
  const router = useRouter()

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

  const handleBackToHome = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white">
      <Header user={user} />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Digital CRM
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Quản lý cơ hội kinh doanh team CHC
            </p>
          </div>
          <button
            onClick={handleBackToHome}
            className="px-4 py-2 text-sm font-medium rounded border border-gray-300 bg-white text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
          >
            ← Về trang chủ
          </button>
        </div>

        <div className="space-y-8">
          {/* Statistics Cards */}
          <StatsCards />

          {/* Company Table */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Danh sách công ty
              </h3>
              <CompanyTable />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}