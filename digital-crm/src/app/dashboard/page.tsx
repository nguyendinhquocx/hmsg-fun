'use client'

import { useState, useEffect } from 'react'
import Header from '@/components/layout/header'
import { Building2, Users, Settings, ArrowRight, Lock } from 'lucide-react'

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
        const response = await fetch('/api/auth/user')
        const data = await response.json()
        
        if (data.user) {
          setUser(data.user)
        }
      } catch (error) {
        console.error('Error fetching user:', error)
      } finally {
        setIsLoading(false)
      }
    }

    getUser()
  }, [])

  const handleDigitalAccess = () => {
    if (user?.team === 'CHC' || user?.role === 'admin') {
      window.location.href = '/digital'
    }
  }

  const handleSettings = () => {
    if (user?.role === 'admin') {
      window.location.href = '/settings'
    }
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
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Chào mừng, {user?.full_name}!
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Chọn module bạn muốn truy cập
          </p>
          <div className="mt-2 text-sm text-gray-500">
            Team: <span className="font-medium text-black">{user?.team?.toUpperCase()}</span>
            {user?.role === 'admin' && (
              <span className="ml-4 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-900">
                Quản trị viên
              </span>
            )}
          </div>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Digital CRM Module */}
          <div className="relative bg-white rounded border border-gray-200 hover:border-black transition-colors duration-200">
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Digital CRM</h3>
                <p className="text-sm text-gray-500">Quản lý cơ hội kinh doanh</p>
              </div>
              
              <p className="text-gray-600 mb-6">
                Quản lý công ty, theo dõi thống kê, đồng bộ Google Sheets và báo cáo tự động.
              </p>
              
              {user?.team === 'CHC' || user?.role === 'admin' ? (
                <button
                  onClick={handleDigitalAccess}
                  className="w-full px-4 py-2 text-sm font-medium rounded border border-gray-300 bg-white text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
                >
                  Truy cập Digital CRM
                </button>
              ) : (
                <div className="w-full px-4 py-2 text-sm font-medium rounded text-gray-500 bg-gray-100 text-center">
                  Chỉ dành cho Team CHC
                </div>
              )}
            </div>
          </div>

          {/* Other Modules Placeholder */}
          <div className="bg-white rounded border border-gray-200 opacity-60">
            <div className="p-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold text-gray-900">HR Management</h3>
                <p className="text-sm text-gray-500">Quản lý nhân sự</p>
              </div>
              
              <p className="text-gray-600 mb-6">
                Module quản lý nhân sự, chấm công, và báo cáo HR.
              </p>
              
              <div className="w-full px-4 py-2 text-sm font-medium rounded text-gray-500 bg-gray-100 text-center">
                Sắp ra mắt
              </div>
            </div>
          </div>

          {/* Settings Module - Only for Admin */}
          {user?.role === 'admin' && (
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
          )}

        </div>

        {/* Quick Stats */}
        <div className="mt-8 bg-white rounded border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Thông tin nhanh</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-black">
                Team {user?.team?.toUpperCase()}
              </div>
              <div className="text-sm text-gray-500">Nhóm của bạn</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black">
                {user?.role === 'admin' ? 'Quản trị' : 'Người dùng'}
              </div>
              <div className="text-sm text-gray-500">Vai trò</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-black">
                {user?.team === 'CHC' || user?.role === 'admin' ? '1' : '0'}
              </div>
              <div className="text-sm text-gray-500">Module có thể truy cập</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}