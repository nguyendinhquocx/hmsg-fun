import { redirect } from 'next/navigation'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import Header from '@/components/layout/header'
import EmailConfigManager from '@/components/settings/email-config-manager'
import SyncLogsViewer from '@/components/settings/sync-logs-viewer'
import TestReportSender from '@/components/settings/test-report-sender'

export default async function SettingsPage() {
  const supabase = await createServerSupabaseClient()

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
    <div className="min-h-screen bg-white">
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
          <div className="bg-white border border-gray-200 rounded">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Cấu hình email báo cáo
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Quản lý danh sách email nhận báo cáo tự động hàng tuần
              </p>
              <EmailConfigManager />
            </div>
          </div>

          {/* Sync Logs */}
          <div className="bg-white border border-gray-200 rounded">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Log đồng bộ Google Sheets
              </h3>
              <p className="text-sm text-gray-600 mb-6">
                Theo dõi trạng thái đồng bộ dữ liệu với Google Sheets
              </p>
              <SyncLogsViewer />
            </div>
          </div>

          {/* Manual Report Test */}
          <div className="bg-white border border-gray-200 rounded">
            <div className="px-4 py-5 sm:p-6">
              <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
                Kiểm tra báo cáo email
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