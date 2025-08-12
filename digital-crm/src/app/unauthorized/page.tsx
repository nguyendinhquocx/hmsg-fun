'use client'

import { useRouter } from 'next/navigation'

export default function UnauthorizedPage() {
  const router = useRouter()

  const handleBackToDashboard = () => {
    router.push('/dashboard')
  }

  return (
    <div className="min-h-screen bg-white flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-gray-200 sm:rounded-lg sm:px-10">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-yellow-100 mb-4">
              <svg className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">
              Không có quyền truy cập
            </h2>
            <p className="text-gray-600 mb-6">
              Bạn không thuộc team Digital (team b) nên không thể truy cập module này.
            </p>
            <button
              onClick={handleBackToDashboard}
              className="w-full px-4 py-2 border border-gray-300 text-sm font-medium rounded bg-white text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
            >
              Quay lại trang chủ
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}