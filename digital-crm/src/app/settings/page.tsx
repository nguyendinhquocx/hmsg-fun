import Header from '@/components/layout/header'

export default function SettingsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
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