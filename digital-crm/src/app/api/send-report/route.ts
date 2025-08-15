import { NextRequest, NextResponse } from 'next/server'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import nodemailer from 'nodemailer'
import ExcelJS from 'exceljs'

// Create email transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

// Generate Excel file
interface Company {
  id: string;
  name: string;
  contact_person: string;
  phone: string;
  email: string;
  status: string;
  created_at: string;
}

const generateExcelReport = async (companies: Company[]) => {
  const workbook = new ExcelJS.Workbook()
  const worksheet = workbook.addWorksheet('Báo cáo Digital CRM')

  // Set column headers
  worksheet.columns = [
    { header: 'Tên công ty', key: 'name', width: 30 },
    { header: 'Mã số thuế', key: 'code', width: 15 },
    { header: 'Lĩnh vực', key: 'sector', width: 25 },
    { header: 'Người liên hệ', key: 'contact_person', width: 20 },
    { header: 'Email', key: 'contact_email', width: 25 },
    { header: 'Điện thoại', key: 'contact_phone', width: 15 },
    { header: 'Trạng thái', key: 'status', width: 15 },
    { header: 'Ghi chú', key: 'notes', width: 40 },
    { header: 'Ngày tạo', key: 'created_at', width: 15 },
    { header: 'Ngày cập nhật', key: 'updated_at', width: 15 }
  ]

  // Style header row
  const headerRow = worksheet.getRow(1)
  headerRow.font = { bold: true, color: { argb: 'FFFFFF' } }
  headerRow.fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: '4F81BD' }
  }

  // Add data rows
  companies.forEach(company => {
    const statusLabels = {
      active: 'Hoạt động',
      inactive: 'Ngừng hoạt động',
      potential: 'Tiềm năng'
    }

    worksheet.addRow({
      name: company.name,
      code: company.code || '',
      sector: company.sector,
      contact_person: company.contact_person || '',
      contact_email: company.contact_email || '',
      contact_phone: company.contact_phone || '',
      status: statusLabels[company.status as keyof typeof statusLabels] || company.status,
      notes: company.notes || '',
      created_at: new Date(company.created_at).toLocaleDateString('vi-VN'),
      updated_at: new Date(company.updated_at).toLocaleDateString('vi-VN')
    })
  })

  // Auto-fit columns and add borders
  worksheet.eachRow((row, rowNumber) => {
    row.eachCell(cell => {
      cell.border = {
        top: { style: 'thin' },
        left: { style: 'thin' },
        bottom: { style: 'thin' },
        right: { style: 'thin' }
      }
    })
  })

  // Generate buffer
  const buffer = await workbook.xlsx.writeBuffer()
  return buffer
}

export async function POST(request: NextRequest) {
  try {
    // Verify this is a cron job or admin request
    const authHeader = request.headers.get('authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = createServerSupabaseClient()

    // Get all companies from team b
    const { data: companies, error: companiesError } = await supabase
      .from('companies')
      .select('*')
      .eq('team', 'b')
      .order('created_at', { ascending: false })

    if (companiesError) {
      throw new Error(`Failed to fetch companies: ${companiesError.message}`)
    }

    // Get active email configurations
    const { data: emailConfigs, error: emailError } = await supabase
      .from('email_configs')
      .select('email, name')
      .eq('active', true)

    if (emailError) {
      throw new Error(`Failed to fetch email configs: ${emailError.message}`)
    }

    if (!emailConfigs || emailConfigs.length === 0) {
      return NextResponse.json(
        { error: 'No active email recipients configured' },
        { status: 400 }
      )
    }

    // Generate Excel report
    const excelBuffer = await generateExcelReport(companies || [])

    // Create email transporter
    const transporter = createTransporter()

    // Prepare email content
    const now = new Date()
    const reportDate = now.toLocaleDateString('vi-VN')
    const weekStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 1)
    const weekEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - now.getDay() + 7)
    const weekRange = `${weekStart.toLocaleDateString('vi-VN')} - ${weekEnd.toLocaleDateString('vi-VN')}`

    // Get statistics
    const totalCompanies = companies?.length || 0
    const activeCompanies = companies?.filter(c => c.status === 'active').length || 0
    const potentialCompanies = companies?.filter(c => c.status === 'potential').length || 0
    
    // Companies created this week
    const weekStartISO = weekStart.toISOString()
    const thisWeekCompanies = companies?.filter(c => c.created_at >= weekStartISO).length || 0

    const subject = `Báo cáo Digital CRM - Tuần ${weekRange}`
    const htmlContent = `
      <html>
        <body style="font-family: Arial, sans-serif; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #4F81BD; border-bottom: 2px solid #4F81BD; padding-bottom: 10px;">
              📊 Báo cáo Digital CRM
            </h2>
            
            <p style="font-size: 16px; margin-bottom: 20px;">
              Xin chào,<br>
              Đây là báo cáo tự động từ hệ thống Digital CRM cho tuần <strong>${weekRange}</strong>.
            </p>

            <div style="background-color: #f8f9fa; padding: 20px; border-radius: 8px; margin-bottom: 20px;">
              <h3 style="margin-top: 0; color: #4F81BD;">📈 Thống kê tổng quan:</h3>
              <ul style="list-style-type: none; padding: 0;">
                <li style="margin-bottom: 8px;">🏢 <strong>Tổng số công ty:</strong> ${totalCompanies}</li>
                <li style="margin-bottom: 8px;">✅ <strong>Công ty đang hoạt động:</strong> ${activeCompanies}</li>
                <li style="margin-bottom: 8px;">🎯 <strong>Công ty tiềm năng:</strong> ${potentialCompanies}</li>
                <li style="margin-bottom: 8px;">🆕 <strong>Công ty mới tuần này:</strong> ${thisWeekCompanies}</li>
              </ul>
            </div>

            <div style="background-color: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
              <p style="margin: 0;">
                📎 <strong>File đính kèm:</strong> Báo cáo chi tiết được đính kèm dưới dạng file Excel.
              </p>
            </div>

            <hr style="margin: 30px 0; border: none; border-top: 1px solid #ddd;">
            
            <p style="font-size: 12px; color: #666;">
              Email này được gửi tự động từ hệ thống Digital CRM vào mỗi thứ Hai hàng tuần.<br>
              Thời gian tạo báo cáo: ${reportDate} ${now.toLocaleTimeString('vi-VN')}
            </p>
          </div>
        </body>
      </html>
    `

    // Send email to each recipient
    const recipients = emailConfigs.map(config => config.email)
    
    const mailOptions = {
      from: process.env.FROM_EMAIL || 'Digital CRM <quocnguyent10v@gmail.com>',
      to: recipients.join(', '),
      subject: subject,
      html: htmlContent,
      attachments: [
        {
          filename: `Digital_CRM_Report_${now.toISOString().split('T')[0]}.xlsx`,
          content: excelBuffer,
          contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      ]
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json({ 
      success: true, 
      message: `Report sent to ${recipients.length} recipients`,
      recipients: recipients,
      stats: {
        totalCompanies,
        activeCompanies,
        potentialCompanies,
        thisWeekCompanies
      }
    })

  } catch (error) {
    console.error('Email report error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}

// GET endpoint for manual testing
export async function GET(request: NextRequest) {
  // This allows manual testing of the report generation
  const url = new URL(request.url)
  const testMode = url.searchParams.get('test')
  
  if (testMode === 'true') {
    const mockRequest = new NextRequest(request.url, {
      method: 'POST',
      headers: {
        'authorization': 'Bearer test-token'
      }
    })
    return POST(mockRequest)
  }

  return NextResponse.json({ message: 'Email report API endpoint. Use POST method.' })
}