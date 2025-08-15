'use client'

import { useState, useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { LogOut, Settings, User, Key } from 'lucide-react'
import ChangePasswordModal from '@/components/auth/change-password-modal'

interface User {
  id: string
  email: string
  full_name: string
  team: string
  role: string
}

export default function Header() {
  const [user, setUser] = useState<User | null>(null)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showChangePassword, setShowChangePassword] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

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
      }
    }

    getUser()
  }, [])

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/auth/logout', {
        method: 'POST'
      })
      
      if (response.ok) {
        window.location.href = '/login'
      } else {
        alert('Không thể đăng xuất')
      }
    } catch (error) {
      console.error('Logout error:', error)
      alert('Có lỗi xảy ra khi đăng xuất')
    }
  }

  const getPageTitle = () => {
    if (pathname === '/dashboard') return 'Trang chủ'
    if (pathname === '/digital') return 'Digital CRM'
    if (pathname === '/settings') return 'Cài đặt'
    return 'HMSG'
  }

  return (
    <header className="bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              {getPageTitle()}
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            {user && (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-5 w-5 text-blue-600" />
                  </div>
                  <span className="text-gray-700 font-medium">{user.full_name}</span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="px-4 py-2 text-sm text-gray-500 border-b">
                      <p className="font-medium text-gray-900">{user.email}</p>
                      <p>Team {user.team.toUpperCase()} • {user.role === 'admin' ? 'Quản trị' : 'Người dùng'}</p>
                    </div>
                    
                    {user.role === 'admin' && (
                      <button
                        onClick={() => {
                          router.push('/settings')
                          setShowUserMenu(false)
                        }}
                        className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <Settings className="h-4 w-4 mr-3" />
                        Cài đặt
                      </button>
                    )}
                    
                    <button
                      onClick={() => {
                        setShowChangePassword(true)
                        setShowUserMenu(false)
                      }}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <Key className="h-4 w-4 mr-3" />
                      Đổi mật khẩu
                    </button>
                    
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-3" />
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <ChangePasswordModal
        isOpen={showChangePassword}
        onClose={() => setShowChangePassword(false)}
      />
    </header>
  )
}