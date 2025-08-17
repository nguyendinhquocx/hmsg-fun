export default function TestPage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <h1 className="text-2xl font-bold">Test Page</h1>
      <p>Nếu bạn thấy trang này, nghĩa là routing hoạt động bình thường.</p>
      <div className="mt-4">
        <a href="/dashboard" className="text-blue-600 underline">
          Thử truy cập Dashboard
        </a>
      </div>
      <div className="mt-2">
        <a href="/login" className="text-blue-600 underline">
          Quay về Login
        </a>
      </div>
    </div>
  )
}