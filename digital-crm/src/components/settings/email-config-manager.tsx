'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { Plus, Trash2, Edit, Mail, Check, X } from 'lucide-react'

interface EmailConfig {
  id: string
  email: string
  name: string
  active: boolean
  created_at: string
}

export default function EmailConfigManager() {
  const [emailConfigs, setEmailConfigs] = useState<EmailConfig[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isAdding, setIsAdding] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({ email: '', name: '' })

  useEffect(() => {
    fetchEmailConfigs()
  }, [])

  const fetchEmailConfigs = async () => {
    try {
      const { data, error } = await supabase
        .from('email_configs')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setEmailConfigs(data || [])
    } catch (error) {
      console.error('Error fetching email configs:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSave = async () => {
    if (!formData.email || !formData.name) return

    try {
      if (editingId) {
        // Update existing
        const { error } = await supabase
          .from('email_configs')
          .update({
            email: formData.email,
            name: formData.name,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingId)

        if (error) throw error
        
        setEmailConfigs(configs => 
          configs.map(config => 
            config.id === editingId 
              ? { ...config, email: formData.email, name: formData.name }
              : config
          )
        )
      } else {
        // Add new
        const { data, error } = await supabase
          .from('email_configs')
          .insert({
            email: formData.email,
            name: formData.name,
            active: true
          })
          .select()
          .single()

        if (error) throw error
        setEmailConfigs(configs => [data, ...configs])
      }

      setFormData({ email: '', name: '' })
      setIsAdding(false)
      setEditingId(null)
    } catch (error) {
      console.error('Error saving email config:', error)
      alert('Có lỗi xảy ra khi lưu cấu hình email')
    }
  }

  const handleEdit = (config: EmailConfig) => {
    setFormData({ email: config.email, name: config.name })
    setEditingId(config.id)
    setIsAdding(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa cấu hình email này?')) return

    try {
      const { error } = await supabase
        .from('email_configs')
        .delete()
        .eq('id', id)

      if (error) throw error
      setEmailConfigs(configs => configs.filter(config => config.id !== id))
    } catch (error) {
      console.error('Error deleting email config:', error)
      alert('Có lỗi xảy ra khi xóa cấu hình email')
    }
  }

  const toggleActive = async (id: string, currentActive: boolean) => {
    try {
      const { error } = await supabase
        .from('email_configs')
        .update({ active: !currentActive, updated_at: new Date().toISOString() })
        .eq('id', id)

      if (error) throw error
      
      setEmailConfigs(configs =>
        configs.map(config =>
          config.id === id ? { ...config, active: !currentActive } : config
        )
      )
    } catch (error) {
      console.error('Error toggling email config:', error)
      alert('Có lỗi xảy ra khi cập nhật trạng thái')
    }
  }

  const handleCancel = () => {
    setFormData({ email: '', name: '' })
    setIsAdding(false)
    setEditingId(null)
  }

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-16 bg-gray-200 rounded"></div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Add/Edit Form */}
      {isAdding && (
        <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email *
              </label>
              <input
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="example@company.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Tên người nhận *
              </label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                placeholder="Nguyễn Văn A"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              />
            </div>
          </div>
          <div className="flex justify-end space-x-2 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
            >
              <X className="h-4 w-4 inline mr-1" />
              Hủy
            </button>
            <button
              onClick={handleSave}
              disabled={!formData.email || !formData.name}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 disabled:opacity-50"
            >
              <Check className="h-4 w-4 inline mr-1" />
              {editingId ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </div>
      )}

      {/* Add Button */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Thêm email nhận báo cáo
        </button>
      )}

      {/* Email List */}
      <div className="space-y-3">
        {emailConfigs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <Mail className="h-12 w-12 mx-auto mb-4 text-gray-300" />
            <p>Chưa có email nào được cấu hình</p>
            <p className="text-sm">Thêm email để nhận báo cáo tự động</p>
          </div>
        ) : (
          emailConfigs.map((config) => (
            <div
              key={config.id}
              className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <div className="flex items-center space-x-4">
                <div className="flex-shrink-0">
                  <div className={`h-3 w-3 rounded-full ${config.active ? 'bg-green-500' : 'bg-red-500'}`} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{config.name}</p>
                  <p className="text-sm text-gray-500">{config.email}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleActive(config.id, config.active)}
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    config.active
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-red-100 text-red-800 hover:bg-red-200'
                  }`}
                >
                  {config.active ? 'Hoạt động' : 'Tạm dừng'}
                </button>
                
                <button
                  onClick={() => handleEdit(config)}
                  className="p-2 text-gray-400 hover:text-blue-600"
                >
                  <Edit className="h-4 w-4" />
                </button>
                
                <button
                  onClick={() => handleDelete(config.id)}
                  className="p-2 text-gray-400 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Status Summary */}
      {emailConfigs.length > 0 && (
        <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded-lg">
          <p>
            📨 <strong>{emailConfigs.filter(c => c.active).length}</strong> email đang hoạt động, 
            <strong> {emailConfigs.filter(c => !c.active).length}</strong> email bị tạm dừng
          </p>
          <p className="mt-1 text-xs">
            Báo cáo sẽ được gửi tự động vào mỗi thứ Hai lúc 7-8h sáng đến các email đang hoạt động
          </p>
        </div>
      )}
    </div>
  )
}