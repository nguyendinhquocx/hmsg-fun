import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { createServerSupabaseClient } from '@/lib/supabase'

// Initialize Google Sheets API
const getGoogleSheetsClient = () => {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  })

  return google.sheets({ version: 'v4', auth })
}

const SHEET_ID = process.env.GOOGLE_SHEET_ID!
const SHEET_RANGE = 'Sheet1'

interface CompanyData {
  id: string
  name: string
  code: string
  sector: string
  contact_person: string
  contact_email: string
  contact_phone: string
  status: string
  notes: string
  created_at: string
  updated_at: string
}

export async function POST(request: NextRequest) {
  try {
    const { operation, data } = await request.json()
    
    if (!['create', 'update', 'delete'].includes(operation)) {
      return NextResponse.json(
        { error: 'Invalid operation' },
        { status: 400 }
      )
    }

    const supabase = createServerSupabaseClient()
    const sheets = getGoogleSheetsClient()

    // Log sync attempt
    const logData = {
      operation,
      table_name: 'companies',
      record_id: data.id,
      status: 'pending' as const
    }

    let success = false
    let errorMessage = null

    try {
      // Get current sheet data to find the row
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: SHEET_ID,
        range: `${SHEET_RANGE}!A:K`,
      })

      const rows = response.data.values || []
      
      // Header row if sheet is empty
      if (rows.length === 0) {
        await sheets.spreadsheets.values.update({
          spreadsheetId: SHEET_ID,
          range: `${SHEET_RANGE}!A1:K1`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [[
              'ID',
              'Tên công ty',
              'Mã số thuế',
              'Lĩnh vực',
              'Người liên hệ',
              'Email',
              'Điện thoại',
              'Trạng thái',
              'Ghi chú',
              'Ngày tạo',
              'Ngày cập nhật'
            ]]
          }
        })
      }

      const headerExists = rows.length > 0
      const dataRows = headerExists ? rows.slice(1) : []
      
      // Find existing row by ID (assuming ID is in column A)
      let rowIndex = -1
      if (headerExists) {
        rowIndex = dataRows.findIndex(row => row[0] === data.id)
      }

      const companyRow = [
        data.id,
        data.name,
        data.code || '',
        data.sector,
        data.contact_person || '',
        data.contact_email || '',
        data.contact_phone || '',
        data.status,
        data.notes || '',
        new Date(data.created_at).toLocaleDateString('vi-VN'),
        new Date(data.updated_at).toLocaleDateString('vi-VN')
      ]

      if (operation === 'create') {
        // Append new row
        const nextRow = (headerExists ? rows.length : 0) + 1
        await sheets.spreadsheets.values.update({
          spreadsheetId: SHEET_ID,
          range: `${SHEET_RANGE}!A${nextRow}:K${nextRow}`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [companyRow]
          }
        })
      } else if (operation === 'update' && rowIndex >= 0) {
        // Update existing row (add 2 because: 1 for header + 1 for 1-based indexing)
        const actualRowNumber = rowIndex + (headerExists ? 2 : 1)
        await sheets.spreadsheets.values.update({
          spreadsheetId: SHEET_ID,
          range: `${SHEET_RANGE}!A${actualRowNumber}:K${actualRowNumber}`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [companyRow]
          }
        })
      } else if (operation === 'delete' && rowIndex >= 0) {
        // Delete row by clearing its content and shifting rows up
        const actualRowNumber = rowIndex + (headerExists ? 2 : 1)
        
        // Clear the row
        await sheets.spreadsheets.values.clear({
          spreadsheetId: SHEET_ID,
          range: `${SHEET_RANGE}!A${actualRowNumber}:K${actualRowNumber}`
        })

        // If there are rows below, shift them up
        const totalRows = rows.length
        if (actualRowNumber < totalRows) {
          const belowRows = rows.slice(actualRowNumber)
          if (belowRows.length > 0) {
            await sheets.spreadsheets.values.update({
              spreadsheetId: SHEET_ID,
              range: `${SHEET_RANGE}!A${actualRowNumber}:K${totalRows}`,
              valueInputOption: 'RAW',
              requestBody: {
                values: belowRows
              }
            })
          }
        }
      }

      success = true
    } catch (error) {
      console.error('Google Sheets sync error:', error)
      errorMessage = error instanceof Error ? error.message : 'Unknown error'
    }

    // Log the result
    await supabase.from('sync_logs').insert({
      ...logData,
      status: success ? 'success' : 'failed',
      error_message: errorMessage
    })

    if (success) {
      return NextResponse.json({ success: true })
    } else {
      return NextResponse.json(
        { error: errorMessage },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Sync API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}