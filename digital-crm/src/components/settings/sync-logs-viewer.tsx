'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { RefreshCw, CheckCircle, XCircle, Clock, AlertCircle } from 'lucide-react'

interface SyncLog {
  id: string
  operation: 'create' | 'update' | 'delete'
  table_name: string
  record_id: string
  status: 'success' | 'failed' | 'pending'
  error_message: string | null
  created_at: string
}

export default function SyncLogsViewer() {
  const [logs, setLogs] = useState<SyncLog[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'success' | 'failed' | 'pending'>('all')

  useEffect(() => {
    fetchLogs()
    
    // Set up real-time subscription
    const subscription = supabase
      .channel('sync_logs')
      .on('postgres_changes', 
        { event: '*', schema: 'public', table: 'sync_logs' }, 
        () => {
          fetchLogs()
        }
      )
      .subscribe()

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const fetchLogs = async () => {
    try {
      const { data, error } = await supabase
        .from('sync_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(50)

      if (error) throw error
      setLogs(data || [])
    } catch (error) {
      console.error('Error fetching sync logs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case 'failed':
        return <XCircle className="h-5 w-5 text-red-500" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-500" />
      default:
        return <AlertCircle className="h-5 w-5 text-gray-500" />
    }
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      success: 'bg-green-100 text-green-800',
      failed: 'bg-red-100 text-red-800',
      pending: 'bg-yellow-100 text-yellow-800'
    }
    
    const labels = {
      success: 'Thành công',
      failed: 'Thất bại',
      pending: 'Đang xử lý'
    }

    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${styles[status as keyof typeof styles]}`}>
        {labels[status as keyof typeof labels]}
      </span>
    )
  }

  const getOperationLabel = (operation: string) => {
    const labels = {
      create: 'Tạo mới',
      update: 'Cập nhật',
      delete: 'Xóa'
    }
    return labels[operation as keyof typeof labels] || operation
  }

  const filteredLogs = filter === 'all' ? logs : logs.filter(log => log.status === filter)

  const retrySync = async (recordId: string) => {
    try {
      // Find the company data and retry sync
      const { data: company, error } = await supabase
        .from('companies')
        .select('*')
        .eq('id', recordId)
        .single()

      if (error || !company) {
        alert('Không tìm thấy dữ liệu công ty để đồng bộ lại')
        return
      }

      const response = await fetch('/api/sync-google-sheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation: 'update',
          data: company
        })
      })

      if (response.ok) {
        alert('Đã thử đồng bộ lại thành công')
        fetchLogs()
      } else {
        alert('Lỗi khi thử đồng bộ lại')
      }
    } catch (error) {
      console.error('Retry sync error:', error)
      alert('Có lỗi xảy ra khi thử đồng bộ lại')
    }
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3, 4, 5].map(i => (
          <div key={i} className="h-16 bg-gray-200 rounded"></div>
        ))}
      </div>
    )
  }

  const stats = {
    total: logs.length,
    success: logs.filter(l => l.status === 'success').length,
    failed: logs.filter(l => l.status === 'failed').length,
    pending: logs.filter(l => l.status === 'pending').length
  }

  return (
    <div className="space-y-6">
      {/* Stats Summary */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="bg-gray-50 p-4 rounded-lg text-center">
          <p className="text-2xl font-semibold text-gray-900">{stats.total}</p>
          <p className="text-sm text-gray-600">Tổng số</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-2xl font-semibold text-green-900">{stats.success}</p>
          <p className="text-sm text-green-600">Thành công</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg text-center">
          <p className="text-2xl font-semibold text-red-900">{stats.failed}</p>
          <p className="text-sm text-red-600">Thất bại</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg text-center">
          <p className="text-2xl font-semibold text-yellow-900">{stats.pending}</p>
          <p className="text-sm text-yellow-600">Đang xử lý</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-gray-700">Lọc theo trạng thái:</label>
          <select
            className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:ring-blue-500 focus:border-blue-500"
            value={filter}
            onChange={(e) => setFilter(e.target.value as 'all' | 'success' | 'failed')}
          >
            <option value="all">Tất cả</option>
            <option value="success">Thành công</option>
            <option value="failed">Thất bại</option>
            <option value="pending">Đang xử lý</option>
          </select>
        </div>
        
        <button
          onClick={fetchLogs}
          className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Làm mới
        </button>
      </div>

      {/* Logs Table */}
      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Trạng thái
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thao tác
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Thời gian
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Chi tiết
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getStatusIcon(log.status)}
                    <span className="ml-2">{getStatusBadge(log.status)}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {getOperationLabel(log.operation)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(log.created_at).toLocaleString('vi-VN')}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  <div className="max-w-xs">
                    <p className="truncate">ID: {log.record_id}</p>
                    {log.error_message && (
                      <p className="text-red-600 text-xs mt-1 truncate" title={log.error_message}>
                        {log.error_message}
                      </p>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {log.status === 'failed' && (
                    <button
                      onClick={() => retrySync(log.record_id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Thử lại
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Empty State */}
      {filteredLogs.length === 0 && (
        <div className="text-center py-8">
          <AlertCircle className="h-12 w-12 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">
            {filter === 'all' ? 'Chưa có log đồng bộ nào' : `Không có log ${filter}`}
          </p>
        </div>
      )}

      {/* Help Text */}
      <div className="text-sm text-gray-600 bg-blue-50 p-4 rounded-lg">
        <h4 className="font-medium mb-2">💡 Thông tin về đồng bộ Google Sheets:</h4>
        <ul className="space-y-1 text-xs">
          <li>• Mỗi khi thêm/sửa/xóa công ty, hệ thống sẽ tự động đồng bộ với Google Sheets</li>
          <li>• Nếu có lỗi đồng bộ, bạn có thể nhấn &quot;Thử lại&quot; để đồng bộ lại</li>
          <li>• Log được cập nhật real-time và chỉ hiển thị 50 bản ghi gần nhất</li>
          <li>• Trạng thái &quot;Đang xử lý&quot; có thể xuất hiện trong quá trình đồng bộ</li>
        </ul>
      </div>
    </div>
  )
}