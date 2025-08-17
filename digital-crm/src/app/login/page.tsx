'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Trim email to remove any leading/trailing whitespace
    const trimmedEmail = email.trim()
    const trimmedPassword = password.trim()

    try {
      console.log('Starting login process...')
      
      // Step 1: Authenticate with Supabase Auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password: trimmedPassword,
      })

      console.log('Auth result:', { user: !!data.user, error: error?.message })

      if (error || !data.user) {
        setError('Email hoặc mật khẩu không đúng')
        return
      }

      console.log('User authenticated, checking profile...')
      
      // Step 2: Check if user exists in users table and get team info
      const { data: userProfile, error: profileError } = await supabase
        .from('users')
        .select('team, role, full_name')
        .eq('id', data.user.id)
        .single()

      console.log('Profile result:', { profile: userProfile, error: profileError?.message })

      if (profileError || !userProfile) {
        setError('Không tìm thấy thông tin người dùng trong hệ thống')
        await supabase.auth.signOut()
        return
      }

      console.log('User profile found:', userProfile)
      
      // Step 3: Check team access for Digital CRM
      if (userProfile.team !== 'CHC') {
          setError('Bạn không có quyền truy cập module Digital CRM')
          await supabase.auth.signOut()
          return
        }

      console.log('Access granted, creating session...')
      
      // Step 4: Create JWT token for middleware
      const tokenPayload = {
        id: data.user.id,
        email: data.user.email,
        full_name: userProfile.full_name,
        team: userProfile.team,
        role: userProfile.role
      }
      
      // Call API to create JWT token
      const tokenResponse = await fetch('/api/auth/create-token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(tokenPayload)
      })
      
      if (!tokenResponse.ok) {
        setError('Lỗi tạo phiên đăng nhập')
        await supabase.auth.signOut()
        return
      }
      
      console.log('Session created, redirecting to dashboard...')
      
      // Step 5: Redirect to dashboard
      router.push('/dashboard')
        
    } catch (err) {
      console.error('Login error:', err)
      setError('Đã xảy ra lỗi. Vui lòng thử lại.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          HMSG
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Đăng nhập vào hệ thống quản lý
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4">
          <form className="space-y-6" onSubmit={handleLogin}>
            {error && (
              <div className="rounded-lg bg-red-50 p-4">
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full appearance-none rounded-lg bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 hover:bg-gray-100 focus:bg-gray-50 focus:outline-none transition-colors"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mật khẩu
              </label>
              <div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="block w-full appearance-none rounded-lg bg-gray-50 px-4 py-3 text-sm placeholder-gray-400 hover:bg-gray-100 focus:bg-gray-50 focus:outline-none transition-colors"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="mx-auto block px-8 py-2 text-sm font-medium rounded-full bg-white text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Đang đăng nhập...' : 'Đăng nhập'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}