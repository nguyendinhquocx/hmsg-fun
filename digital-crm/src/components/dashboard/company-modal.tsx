'use client'

import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import { X } from 'lucide-react'

interface Company {
  id: string
  name: string
  code: string
  sector: string
  contact_person: string
  contact_email: string
  contact_phone: string
  status: 'active' | 'inactive' | 'potential'
  notes: string
  created_at: string
  updated_at: string
}

interface CompanyModalProps {
  isOpen: boolean
  onClose: () => void
  company: Company | null
  onSave: (company: Company) => void
}

export default function CompanyModal({ isOpen, onClose, company, onSave }: CompanyModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    sector: '',
    contact_person: '',
    contact_email: '',
    contact_phone: '',
    status: 'potential' as const,
    notes: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    if (isOpen) {
      if (company) {
        setFormData({
          name: company.name,
          code: company.code || '',
          sector: company.sector,
          contact_person: company.contact_person || '',
          contact_email: company.contact_email || '',
          contact_phone: company.contact_phone || '',
          status: company.status,
          notes: company.notes || ''
        })
      } else {
        setFormData({
          name: '',
          code: '',
          sector: '',
          contact_person: '',
          contact_email: '',
          contact_phone: '',
          status: 'potential',
          notes: ''
        })
      }
      setErrors({})
    }
  }, [isOpen, company])

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) {
      newErrors.name = 'Tên công ty là bắt buộc'
    }

    if (!formData.sector.trim()) {
      newErrors.sector = 'Lĩnh vực là bắt buộc'
    }

    if (formData.contact_email && !/\S+@\S+\.\S+/.test(formData.contact_email)) {
      newErrors.contact_email = 'Email không hợp lệ'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)

    try {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (!user) {
        throw new Error('User not authenticated')
      }

      const companyData = {
        ...formData,
        team: 'b',
        created_by: user.id,
        updated_at: new Date().toISOString()
      }

      let savedCompany: Company

      if (company) {
        // Update existing company
        const { data, error } = await supabase
          .from('companies')
          .update(companyData)
          .eq('id', company.id)
          .select()
          .single()

        if (error) throw error
        savedCompany = data
      } else {
        // Create new company
        const { data, error } = await supabase
          .from('companies')
          .insert({
            ...companyData,
            created_at: new Date().toISOString()
          })
          .select()
          .single()

        if (error) throw error
        savedCompany = data
      }

      // TODO: Trigger Google Sheets sync
      await triggerGoogleSheetSync(company ? 'update' : 'create', savedCompany)

      onSave(savedCompany)
    } catch (error) {
      console.error('Error saving company:', error)
      setErrors({ general: 'Có lỗi xảy ra khi lưu thông tin công ty' })
    } finally {
      setIsLoading(false)
    }
  }

  const triggerGoogleSheetSync = async (operation: 'create' | 'update', companyData: Company) => {
    try {
      const response = await fetch('/api/sync-google-sheet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          operation,
          data: companyData
        })
      })

      if (!response.ok) {
        console.error('Google Sheet sync failed:', await response.text())
      }
    } catch (error) {
      console.error('Google Sheet sync error:', error)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }))
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900">
              {company ? 'Chỉnh sửa công ty' : 'Thêm công ty mới'}
            </h3>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {errors.general && (
              <div className="rounded-md bg-red-50 p-4">
                <p className="text-sm text-red-800">{errors.general}</p>
              </div>
            )}

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Tên công ty *
                </label>
                <input
                  type="text"
                  id="name"
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.name ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                />
                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="code" className="block text-sm font-medium text-gray-700">
                  Mã số thuế
                </label>
                <input
                  type="text"
                  id="code"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.code}
                  onChange={(e) => handleInputChange('code', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                  Trạng thái
                </label>
                <select
                  id="status"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.status}
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  <option value="potential">Tiềm năng</option>
                  <option value="active">Hoạt động</option>
                  <option value="inactive">Ngừng hoạt động</option>
                </select>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="sector" className="block text-sm font-medium text-gray-700">
                  Lĩnh vực *
                </label>
                <input
                  type="text"
                  id="sector"
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.sector ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                  value={formData.sector}
                  onChange={(e) => handleInputChange('sector', e.target.value)}
                  placeholder="VD: Công nghệ thông tin, Y tế, Giáo dục..."
                />
                {errors.sector && <p className="mt-1 text-sm text-red-600">{errors.sector}</p>}
              </div>

              <div>
                <label htmlFor="contact_person" className="block text-sm font-medium text-gray-700">
                  Người liên hệ
                </label>
                <input
                  type="text"
                  id="contact_person"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.contact_person}
                  onChange={(e) => handleInputChange('contact_person', e.target.value)}
                />
              </div>

              <div>
                <label htmlFor="contact_phone" className="block text-sm font-medium text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="tel"
                  id="contact_phone"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.contact_phone}
                  onChange={(e) => handleInputChange('contact_phone', e.target.value)}
                />
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="contact_email" className="block text-sm font-medium text-gray-700">
                  Email liên hệ
                </label>
                <input
                  type="email"
                  id="contact_email"
                  className={`mt-1 block w-full rounded-md shadow-sm ${
                    errors.contact_email ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-blue-500 focus:ring-blue-500'
                  }`}
                  value={formData.contact_email}
                  onChange={(e) => handleInputChange('contact_email', e.target.value)}
                />
                {errors.contact_email && <p className="mt-1 text-sm text-red-600">{errors.contact_email}</p>}
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700">
                  Ghi chú
                </label>
                <textarea
                  id="notes"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Thông tin bổ sung về công ty..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
              >
                Hủy
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
              >
                {isLoading ? 'Đang lưu...' : company ? 'Cập nhật' : 'Thêm mới'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}