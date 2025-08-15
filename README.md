# Digital CRM - HMSG Business Management Application

Ứng dụng quản lý khách hàng và cơ hội kinh doanh cho doanh nghiệp Việt Nam, thay thế quy trình làm việc với Google Sheets/Excel.

## 🚀 Tổng quan

Digital CRM là một ứng dụng web hiện đại được xây dựng để quản lý thông tin công ty, khách hàng và cơ hội kinh doanh. Ứng dụng cung cấp giao diện thân thiện, đồng bộ dữ liệu với Google Sheets và tự động gửi báo cáo hàng tuần.

### ✨ Tính năng chính

- **Quản lý công ty**: CRUD operations với filtering và tìm kiếm
- **Dashboard thống kê**: Hiển thị các chỉ số quan trọng theo thời gian thực
- **Đồng bộ Google Sheets**: Sync một chiều từ app sang sheets
- **Báo cáo tự động**: Email báo cáo Excel hàng tuần
- **Phân quyền team**: Chỉ team "B" truy cập module Digital CRM
- **Responsive design**: Tối ưu cho mobile và desktop

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Supabase (PostgreSQL, Authentication, REST API)
- **Hosting**: Netlify với domain tùy chỉnh (hmsg.fun)
- **Integrations**: Google Sheets API, Email automation
- **File Processing**: Excel export với `xlsx`/`exceljs`

## 📋 Yêu cầu hệ thống

- Node.js 18+
- npm hoặc yarn
- Tài khoản Supabase
- Google Cloud Console project (cho Sheets API)
- Netlify account (cho deployment)

## 🚀 Cài đặt và chạy

### 1. Clone repository

```bash
git clone <repository-url>
cd "hmsg fun"
cd digital-crm
```

### 2. Cài đặt dependencies

```bash
npm install
```

### 3. Cấu hình environment variables

Tạo file `.env.local`:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Google Sheets API
GOOGLE_SERVICE_ACCOUNT_EMAIL=your_service_account_email
GOOGLE_PRIVATE_KEY=your_private_key
GOOGLE_SHEET_ID=your_sheet_id

# Email Configuration
SMTP_HOST=your_smtp_host
SMTP_PORT=587
SMTP_USER=your_smtp_user
SMTP_PASS=your_smtp_password
```

### 4. Khởi tạo database

Chạy script SQL trong `database/init.sql` trên Supabase để tạo:
- Bảng users, companies, email_configs, sync_logs
- Row Level Security policies
- Sample data cho testing

### 5. Chạy ứng dụng

```bash
# Development
npm run dev

# Production build
npm run build
npm run start

# Linting
npm run lint
```

Truy cập: `http://localhost:3000`

## 📁 Cấu trúc project

```
digital-crm/
├── src/
│   ├── app/
│   │   ├── login/page.tsx          # Trang đăng nhập
│   │   ├── dashboard/page.tsx      # Dashboard chính
│   │   ├── digital/page.tsx        # Module Digital CRM
│   │   ├── settings/page.tsx       # Cài đặt admin
│   │   └── api/                    # API routes
│   │       ├── auth/               # Authentication endpoints
│   │       ├── companies/          # Company CRUD APIs
│   │       ├── sync/               # Google Sheets sync
│   │       └── reports/            # Email reports
│   ├── components/
│   │   ├── layout/
│   │   │   └── header.tsx          # Header với dynamic title
│   │   ├── dashboard/
│   │   │   ├── stats-cards.tsx     # Thẻ thống kê
│   │   │   └── company-table.tsx   # Bảng công ty
│   │   └── settings/
│   │       ├── email-config.tsx    # Cấu hình email
│   │       └── sync-logs.tsx       # Logs đồng bộ
│   ├── lib/
│   │   ├── supabase.ts            # Supabase client config
│   │   ├── google-sheets.ts       # Google Sheets integration
│   │   └── email.ts               # Email utilities
│   └── types/
│       └── database.ts            # TypeScript types
├── database/
│   └── init.sql                   # Database schema & sample data
├── public/                        # Static assets
└── docs/                         # Project documentation
    └── PRD/                      # Product requirements
```

## 🔐 Authentication & Authorization

### Luồng đăng nhập
1. User truy cập `/login`
2. Đăng nhập qua Supabase Auth
3. Redirect đến `/dashboard` (hub chính)
4. Truy cập modules dựa trên team:
   - Team B: Truy cập `/digital` (Digital CRM)
   - Admin: Truy cập `/settings`

### Phân quyền
- **All users**: Dashboard, thông tin cá nhân
- **Team B**: Digital CRM module
- **Admin**: Settings, email config, sync logs

## 🔄 Data Flow

1. **CRUD Operations**: User thao tác dữ liệu qua web interface
2. **Database**: Dữ liệu lưu trong Supabase PostgreSQL
3. **Google Sheets Sync**: Background function đồng bộ một chiều
4. **Weekly Reports**: Scheduled function xuất Excel và gửi email

## 🎨 UI/UX Design

### Theme: Minimalist Black & White
- **Background**: Màu trắng chủ đạo
- **Text**: Màu đen, typography rõ ràng
- **Buttons**: White background, black text, subtle hover
- **No icons**: Interface text-based, sạch sẽ
- **Navigation**: Dynamic page titles, back buttons

### Responsive Design
- Mobile-first approach (320px+)
- Cross-browser compatibility
- Core Web Vitals optimized

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/login` - Đăng nhập
- `POST /api/auth/logout` - Đăng xuất  
- `GET /api/auth/user` - Thông tin user

### Companies (Đang phát triển)
- `GET /api/companies` - Danh sách công ty
- `POST /api/companies` - Tạo công ty mới
- `PUT /api/companies/[id]` - Cập nhật công ty
- `DELETE /api/companies/[id]` - Xóa công ty

### Reports & Sync (Đang phát triển)
- `POST /api/sync/google-sheets` - Đồng bộ Google Sheets
- `POST /api/send-report` - Gửi báo cáo email
- `GET /api/sync-logs` - Lịch sử đồng bộ

## 🧪 Testing

### Test Accounts
Xem `database/init.sql` để biết các tài khoản test:
- Admin user (team B, role admin)
- Regular user (team B, role user)
- Other team user (team A)

### Test Commands
```bash
# Unit tests (khi có)
npm test

# E2E tests (khi có)
npm run test:e2e
```

## 🚀 Deployment

### Netlify Deployment
1. Connect repository to Netlify
2. Set environment variables
3. Configure build command: `cd digital-crm && npm run build`
4. Set publish directory: `digital-crm/.next`
5. Configure domain: `hmsg.fun`

### Environment Variables (Production)
Cần set tất cả env vars từ `.env.local` trên Netlify dashboard.

## 📊 Monitoring & Analytics

### Performance Targets
- Load time: < 3 seconds
- Lighthouse Performance: > 90
- Core Web Vitals:
  - LCP < 2s
  - CLS < 0.1  
  - FID < 100ms

### Error Monitoring
- Supabase logs cho database errors
- Netlify function logs cho API errors
- Browser console cho client errors

## 🔒 Security

### Best Practices Implemented
- Environment variables cho sensitive data
- Row Level Security (RLS) policies
- HTTPS enforcement
- Team-based access control
- API route protection

### Security Checklist
- [ ] All API keys in environment variables
- [ ] RLS policies tested
- [ ] HTTPS redirect configured
- [ ] Input validation implemented
- [ ] SQL injection protection

## 🛠️ Development Guidelines

### Code Standards
- TypeScript strict mode
- ESLint configuration
- Prettier formatting
- Component-based architecture
- API-first approach

### Adding New Features
1. Follow established patterns in `/src/app/api/`
2. Maintain minimalist UI theme
3. Update database schema in `init.sql`
4. Add TypeScript types
5. Test on multiple devices

## 📞 Support & Maintenance

### Common Issues
1. **Supabase 404 errors**: Use server-side API routes thay vì client-side
2. **UI inconsistency**: Follow established white/black theme
3. **Auth problems**: Check environment variables và RLS policies

### Maintenance Tasks
- Weekly: Check sync logs và email reports
- Monthly: Database performance review
- Quarterly: Security audit và dependency updates

## 📝 License

[Specify your license here]

## 🤝 Contributing

[Add contribution guidelines if applicable]

---

**Developed with ❤️ for HMSG Business Management**

*Last updated: August 2024*