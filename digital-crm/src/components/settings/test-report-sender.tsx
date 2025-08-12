'use client'

export default function TestReportSender() {
  const handleSendTestReport = async () => {
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
  }

  return (
    <div className="space-y-4">
      <button
        onClick={handleSendTestReport}
        className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded bg-white text-black hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-black"
      >
        Gửi báo cáo thử nghiệm
      </button>
      
      <div className="text-xs text-gray-500">
        <p>• Báo cáo sẽ được gửi đến tất cả email đã cấu hình</p>
        <p>• File Excel chứa dữ liệu công ty hiện tại sẽ được đính kèm</p>
        <p>• Chức năng này chỉ dành cho admin</p>
      </div>
    </div>
  )
}