# Deployment Guide - Digital CRM

## 🚀 Netlify Deployment từ GitHub

### Prerequisites
1. **GitHub repository** với code đã push
2. **Netlify account** connected với GitHub
3. **Supabase project** đã setup với database

### Step-by-Step Deployment

#### 1. GitHub Repository Setup
```bash
# Đảm bảo tất cả changes đã committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

#### 2. Netlify Configuration
- Login vào [Netlify](https://netlify.com)
- Click "New site from Git"
- Connect GitHub repository
- **Build settings:**
  - Build command: `npm run build`
  - Publish directory: `.next`
  - Node version: `20`

#### 3. Environment Variables
Trong Netlify dashboard, setup **Environment Variables**:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
GOOGLE_SHEETS_PRIVATE_KEY=your_google_service_account_private_key
GOOGLE_SHEETS_CLIENT_EMAIL=your_google_service_account_email
GOOGLE_SHEETS_SHEET_ID=your_google_sheet_id
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
NODE_ENV=production
```

#### 4. Custom Domain (hmsg.fun)
- Trong Netlify dashboard: Site settings → Domain management
- Add custom domain: `hmsg.fun`
- Update DNS records theo hướng dẫn Netlify

### ⚡ Automatic Deployment
- Mỗi lần push code lên GitHub `main` branch
- Netlify sẽ tự động trigger build và deploy
- Build time: ~2-3 phút

### 🔍 Post-Deployment Checklist
- [ ] Site load được tại custom domain
- [ ] Login functionality hoạt động
- [ ] Dashboard hiển thị đúng  
- [ ] Team-based access control work
- [ ] Supabase connection stable

### 🐛 Troubleshooting
- **Build fails**: Check build logs, thường là missing env vars
- **API errors**: Kiểm tra Supabase RLS policies và connection
- **404 errors**: Verify netlify.toml redirects đúng

### 📊 Performance Targets
- Load time: < 3 seconds
- Lighthouse score: > 90
- Core Web Vitals: All green