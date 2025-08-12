# Digital CRM - Hệ thống quản lý cơ hội kinh doanh

Ứng dụng web quản lý cơ hội kinh doanh cho phòng kinh doanh, thay thế quy trình Google Sheet/Excel với tính năng đồng bộ dữ liệu tự động và gửi báo cáo email định kỳ.

## ✨ Tính năng chính

### 🔐 Xác thực & Phân quyền
- Đăng nhập với email/password
- Phân quyền theo team (chỉ team B truy cập module Digital)
- Vai trò Admin và User với quyền hạn khác nhau

### 📊 Dashboard thống kê
- Tổng số công ty
- Số công ty tháng hiện tại
- % tăng trưởng so với cùng kỳ năm trước
- Biểu đồ và thống kê trực quan

### 🏢 Quản lý công ty (CRUD)
- Thêm/sửa/xóa thông tin công ty
- Tìm kiếm và lọc dữ liệu
- Xuất dữ liệu CSV
- Giao diện responsive, mobile-first

### 🔄 Đồng bộ Google Sheets
- Tự động đồng bộ 1 chiều (web → Google Sheets)
- Log trạng thái đồng bộ
- Retry mechanism khi có lỗi

### 📧 Báo cáo email tự động
- Gửi báo cáo Excel hàng tuần (thứ Hai 7-8h sáng)
- Cấu hình danh sách email nhận báo cáo
- Test gửi email thủ công

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Auth, API)
- **Hosting**: Netlify
- **External APIs**: Google Sheets API, Email SMTP
- **Packages**: Lucide React, ExcelJS, Nodemailer

## 🚀 Cài đặt và chạy

### 1. Clone repository

```bash
git clone <repository-url>
cd digital-crm
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình environment variables

Tạo file `.env.local` từ `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Điền thông tin cần thiết:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Google Sheets API
GOOGLE_PRIVATE_KEY=your_google_service_account_private_key
GOOGLE_CLIENT_EMAIL=your_google_service_account_email
GOOGLE_SHEET_ID=your_google_sheet_id

# Email Configuration
SMTP_HOST=smtp.sendgrid.net
SMTP_PORT=587
SMTP_USER=apikey
SMTP_PASS=your_sendgrid_api_key
FROM_EMAIL=noreply@hmsg.fun
```

### 4. Khởi tạo database

Chạy SQL trong file `database/init.sql` trên Supabase Dashboard để tạo tables và sample data.

### 5. Chạy development server

```bash
npm run dev
```

Ứng dụng sẽ chạy tại `http://localhost:3000`

## 📋 Development Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint

# Deployment
netlify deploy --prod # Deploy to Netlify
```

## 🗃️ Database Schema

### Tables
- `users` - Thông tin người dùng, team, role
- `companies` - Dữ liệu công ty
- `email_configs` - Cấu hình email nhận báo cáo
- `sync_logs` - Log đồng bộ Google Sheets

### Relationships
- `companies.created_by` → `users.id`
- Có Row Level Security (RLS) policies

## 🔧 Cấu hình Google Sheets

1. Tạo Google Cloud Project
2. Bật Google Sheets API
3. Tạo Service Account và download credentials
4. Chia sẻ Google Sheet cho service account email
5. Lấy Sheet ID từ URL và cấu hình trong env vars

## 📧 Cấu hình Email

1. Tạo tài khoản SendGrid hoặc SMTP provider khác
2. Lấy API key/credentials
3. Cấu hình trong environment variables
4. Thêm domain verification nếu cần

## 🚀 Deployment trên Netlify

1. **Connect repository**: Liên kết GitHub repo với Netlify
2. **Configure build settings**:
   - Build command: `npm run build`
   - Publish directory: `.next`
3. **Environment variables**: Thêm tất cả env vars cần thiết
4. **Custom domain**: Cấu hình domain hmsg.fun
5. **Scheduled functions**: Netlify sẽ tự động chạy function theo schedule

### Build settings trong Netlify Dashboard:
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18.x hoặc 20.x

## 📱 Responsive Design

Ứng dụng được thiết kế mobile-first với breakpoints:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+

## 🔒 Security Features

- Row Level Security (RLS) trên Supabase
- Team-based access control
- Environment variables cho sensitive data
- HTTPS enforced trên production
- Input validation và sanitization

## 📊 Performance Goals

- Load time: < 3 giây
- Lighthouse Performance score: > 90
- Core Web Vitals: LCP <2s, CLS <0.1, FID <100ms

## 🧪 Testing

```bash
# Manual testing accounts (configure in Supabase)
# Admin: admin@hmsg.fun (team: b, role: admin)
# User: user1@hmsg.fun (team: b, role: user)
# Unauthorized: user2@hmsg.fun (team: a, role: user)
```

## 📝 Usage Guide

### Đăng nhập
1. Truy cập `/login`
2. Nhập email/password
3. Chỉ thành viên team B mới được truy cập

### Dashboard
- Xem thống kê tổng quan
- Quản lý danh sách công ty
- Tìm kiếm và lọc dữ liệu

### Settings (Admin only)
- Cấu hình email nhận báo cáo
- Xem log đồng bộ Google Sheets
- Test gửi báo cáo thủ công

## 🆘 Troubleshooting

### Google Sheets sync fails
- Kiểm tra service account credentials
- Verify Sheet ID và sharing permissions
- Check sync logs trong Settings

### Email reports not sending
- Verify SMTP credentials
- Check email configurations
- Look at scheduled function logs

### Authentication issues
- Verify Supabase credentials
- Check user profile data
- Ensure proper team assignment

## 🤝 Contributing

1. Fork repository
2. Create feature branch
3. Make changes
4. Test thoroughly
5. Submit pull request

## 📄 License

Private project for HMSG Company.

---

**Liên hệ**: Digital Team - team-digital@hmsg.fun
