'use client'

import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      console.log('Starting login API call...')
      
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      console.log('Login API response status:', response.status)

      const data = await response.json()
      console.log('Login API response data:', data)

      if (!response.ok) {
        setError(data.error || 'Đã xảy ra lỗi')
        return
      }

      if (data.success) {
        console.log('Login successful, redirecting to dashboard...')
        // Redirect to dashboard
        window.location.href = '/dashboard'
      }
    } catch (err) {
      console.error('Login fetch error:', err)
      setError('Không thể kết nối đến server')
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