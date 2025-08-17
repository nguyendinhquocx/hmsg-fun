'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabase'
import { Eye, EyeOff, AlertCircle } from 'lucide-react'

export default function DebugLoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [debugInfo, setDebugInfo] = useState<Record<string, unknown>>({})

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    setDebugInfo({})

    try {
      console.log('1. Starting login process...')
      setDebugInfo(prev => ({ ...prev, step1: 'Starting login...' }))

      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      console.log('2. Auth result:', { data, error })
      setDebugInfo(prev => ({ ...prev, step2: { data: !!data.user, error: error?.message } }))

      if (error) {
        setError('Email hoặc mật khẩu không đúng')
        return
      }

      if (data.user) {
        console.log('3. User authenticated, ID:', data.user.id)
        setDebugInfo(prev => ({ ...prev, step3: `User ID: ${data.user.id}` }))

        // Check if user exists in users table and get team info
        console.log('4. Checking user profile...')
        const { data: userProfile, error: profileError } = await supabase
          .from('users')
          .select('team, role')
          .eq('id', data.user.id)
          .single()

        console.log('5. Profile result:', { userProfile, profileError })
        setDebugInfo(prev => ({ 
          ...prev, 
          step4: { 
            profile: userProfile, 
            error: profileError?.message,
            userId: data.user.id
          } 
        }))

        if (profileError || !userProfile) {
          setError('Không tìm thấy thông tin người dùng')
          await supabase.auth.signOut()
          return
        }

        console.log('6. User profile found:', userProfile)
        setDebugInfo(prev => ({ ...prev, step5: `Team: ${userProfile.team}, Role: ${userProfile.role}` }))

        if (userProfile.team !== 'CHC') {
          setError('Bạn không có quyền truy cập module Digital')
          await supabase.auth.signOut()
          return
        }

        console.log('7. Redirecting to dashboard...')
        setDebugInfo(prev => ({ ...prev, step6: 'Redirecting to dashboard...' }))
        
        // Force navigation
        window.location.href = '/dashboard'
      }
    } catch (err) {
      console.error('Login error:', err)
      setError('Đã xảy ra lỗi. Vui lòng thử lại.')
      setDebugInfo(prev => ({ ...prev, error: err }))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Digital CRM (Debug Mode)
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Đăng nhập vào hệ thống quản lý
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="flex">
                  <AlertCircle className="h-5 w-5 text-red-400" />
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Debug Info */}
            {Object.keys(debugInfo).length > 0 && (
              <div className="rounded-md bg-blue-50 p-4">
                <h4 className="text-sm font-medium text-blue-800">Debug Info:</h4>
                <pre className="text-xs text-blue-700 mt-2">
                  {JSON.stringify(debugInfo, null, 2)}
                </pre>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Nhập email của bạn"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Mật khẩu
              </label>
              <div className="mt-1 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="block w-full appearance-none rounded-md border border-gray-300 px-3 py-2 pr-10 placeholder-gray-400 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm"
                  placeholder="Nhập mật khẩu"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </div>
          </form>

          <div className="mt-6">
            <div className="text-center">
              <p className="text-xs text-gray-500">
                Debug mode - Kiểm tra console cho thông tin chi tiết
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}