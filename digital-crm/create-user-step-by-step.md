# Hướng Dẫn Tạo Tài Khoản User Từng Bước

## 🎯 Mục tiêu
Tạo tài khoản trong Supabase Authentication và đồng bộ vào bảng `public.users` để có thể đăng nhập thành công.

## 📋 Các Bước Thực Hiện

### Bước 1: Tạo User trong Supabase Authentication

1. **Vào Supabase Dashboard:**
   - Truy cập: https://supabase.com/dashboard
   - Chọn project của bạn

2. **Tạo User mới:**
   - Vào **Authentication** → **Users**
   - Click **"Add user"**
   - Điền thông tin:

```json
{
  "email": "test@hoanmy.com",
  "password": "Hmsg@2025",
  "auto_confirm_user": true,
  "user_metadata": {
    "full_name": "Nguyễn Văn Test",
    "team": "Digital",
    "role": "user"
  }
}
```

3. **Lưu ý quan trọng:**
   - ✅ **Auto Confirm User**: Phải chọn YES
   - ✅ **Password**: Ghi nhớ mật khẩu này để đăng nhập
   - ✅ **User Metadata**: Phải có đầy đủ thông tin

### Bước 2: Đồng Bộ vào Bảng Users

Sau khi tạo user trong Auth, chạy script SQL này:

```sql
-- Đồng bộ user mới tạo vào bảng public.users
INSERT INTO public.users (id, email, full_name, team, role, created_at)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', au.email) as full_name,
  COALESCE(au.raw_user_meta_data->>'team', 'Unknown') as team,
  COALESCE(au.raw_user_meta_data->>'role', 'user') as role,
  COALESCE(au.created_at, NOW()) as created_at
FROM auth.users au
WHERE au.email = 'test@hoanmy.com'  -- Thay bằng email vừa tạo
  AND NOT EXISTS (
    SELECT 1 FROM public.users pu WHERE pu.id = au.id
  )
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  team = EXCLUDED.team,
  role = EXCLUDED.role,
  updated_at = NOW();
```

### Bước 3: Kiểm Tra Kết Quả

```sql
-- Kiểm tra user đã được tạo trong cả 2 bảng
SELECT 
  'auth.users' as table_name,
  email,
  raw_user_meta_data->>'full_name' as full_name,
  created_at
FROM auth.users 
WHERE email = 'test@hoanmy.com'

UNION ALL

SELECT 
  'public.users' as table_name,
  email,
  full_name,
  created_at
FROM public.users 
WHERE email = 'test@hoanmy.com';
```

## 🔐 Thông Tin Đăng Nhập

### Tài khoản vừa tạo:
- **Email**: `test@hoanmy.com`
- **Mật khẩu**: `Hmsg@2025`
- **URL đăng nhập**: `http://localhost:3000/login`

### Quy trình đăng nhập:
1. Mở trang login
2. Nhập email: `test@hoanmy.com`
3. Nhập password: `Hmsg@2025`
4. Click "Đăng nhập"
5. Hệ thống sẽ:
   - Xác thực với Supabase Auth
   - Kiểm tra user trong bảng `public.users`
   - Redirect đến dashboard nếu thành công

## 🚀 Tạo Nhiều Users Nhanh

### Phương án 1: Sử dụng API Script
```bash
# Chạy script tự động
cd digital-crm
node create-staff-api.js
```

### Phương án 2: Tạo thủ công
Lặp lại Bước 1 và 2 cho từng user với thông tin khác nhau:

```json
// User 1
{
  "email": "admin@hoanmy.com",
  "password": "Hmsg@2025",
  "user_metadata": {
    "full_name": "Nguyễn Đình Quốc",
    "team": "Digital",
    "role": "admin"
  }
}

// User 2
{
  "email": "user1@hoanmy.com",
  "password": "Hmsg@2025",
  "user_metadata": {
    "full_name": "Trần Thị Khanh",
    "team": "CHC",
    "role": "user"
  }
}
```

## ⚠️ Lưu Ý Quan Trọng

1. **Mật khẩu mặc định**: `Hmsg@2025`
   - Tất cả users mới tạo đều dùng mật khẩu này
   - Nên yêu cầu đổi mật khẩu lần đầu đăng nhập

2. **User Metadata bắt buộc**:
   - `full_name`: Tên đầy đủ
   - `team`: Team/phòng ban
   - `role`: Quyền hạn (user/admin)

3. **Auto Confirm User**:
   - Phải chọn YES để user có thể đăng nhập ngay
   - Nếu không, user sẽ cần xác thực email

4. **Đồng bộ bắt buộc**:
   - Phải chạy script đồng bộ sau khi tạo Auth user
   - Nếu không, user sẽ không thể truy cập dashboard

## 🔧 Troubleshooting

### Lỗi: "User not found in database"
```sql
-- Kiểm tra user có trong auth.users không
SELECT * FROM auth.users WHERE email = 'your-email@hoanmy.com';

-- Nếu có, chạy script đồng bộ
-- Nếu không, tạo lại user trong Auth
```

### Lỗi: "Invalid login credentials"
- Kiểm tra email và password
- Đảm bảo user đã được Auto Confirm
- Thử reset password nếu cần

### Lỗi: "Access denied"
- Kiểm tra user có trong bảng `public.users`
- Kiểm tra role và team đã đúng
- Chạy lại script đồng bộ

## 📞 Hỗ Trợ

Nếu gặp vấn đề, kiểm tra:
1. Supabase Dashboard → Authentication → Users
2. Supabase Dashboard → Table Editor → users
3. Browser Console để xem lỗi chi tiết
4. Network tab để kiểm tra API calls