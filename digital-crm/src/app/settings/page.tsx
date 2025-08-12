import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase'
import Header from '@/components/layout/header'
import EmailConfigManager from '@/components/settings/email-config-manager'
import SyncLogsViewer from '@/components/settings/sync-logs-viewer'

export default async function SettingsPage() {
  const supabase = createServerSupabaseClient()

  // Check authentication and admin role
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const { data: userProfile } = await supabase
    .from('users')
    .select('role, team')
    .eq('id', user.id)
    .single()

  if (!userProfile || userProfile.role !== 'admin') {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">
            Cài đặt hệ thống
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Quản lý cấu hình email báo cáo và theo dõi đồng bộ dữ liệu
          </p>
        </div>

        <div className="space-y-8">
          {/* Email Configuration */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                📧 Cấu hình email báo cáo
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Quản lý danh sách email nhận báo cáo tự động hàng tuần
              </p>
              <EmailConfigManager />
            </div>
          </div>

          {/* Sync Logs */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                🔄 Log đồng bộ Google Sheets
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Theo dõi trạng thái đồng bộ dữ liệu với Google Sheets
              </p>
              <SyncLogsViewer />
            </div>
          </div>

          {/* Manual Report Test */}
          <div className="bg-white shadow rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                📊 Kiểm tra báo cáo email
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Gửi thử báo cáo email để kiểm tra cấu hình
              </p>
              <TestReportSender />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

// Test Report Sender Component (inline for simplicity)
function TestReportSender() {
  return (
    <div className="space-y-4">
      <button
        onClick={async () => {
          try {
            const response = await fetch('/api/send-report', {
              method: 'POST',
              headers: {
                'Authorization': 'Bearer admin-test',
                'Content-Type': 'application/json'
              }
            })
            
            if (response.ok) {
              alert('Báo cáo đã được gửi thành công!')
            } else {
              const error = await response.text()
              alert(`Lỗi: ${error}`)
            }
          } catch (error) {
            alert(`Lỗi: ${error}`)
          }
        }}
        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
      >
        🧪 Gửi báo cáo thử nghiệm
      </button>
      
      <div className="text-xs text-gray-500">
        <p>• Báo cáo sẽ được gửi đến tất cả email đã cấu hình</p>
        <p>• File Excel chứa dữ liệu công ty hiện tại sẽ được đính kèm</p>
        <p>• Chức năng này chỉ dành cho admin</p>
      </div>
    </div>
  )
}