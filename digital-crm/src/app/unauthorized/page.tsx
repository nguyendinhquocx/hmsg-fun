import { AlertTriangle } from 'lucide-react'
import Link from 'next/link'

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <div className="text-center">
            <AlertTriangle className="mx-auto h-12 w-12 text-yellow-400" />
            <h2 className="mt-6 text-3xl font-bold tracking-tight text-gray-900">
              Không có quyền truy cập
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Bạn không thuộc team Digital (team b) nên không thể truy cập module này.
            </p>
            <div className="mt-6">
              <Link
                href="/login"
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Quay lại đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}