# Hướng dẫn sửa lỗi "relation public.users does not exist"

## Vấn đề
Khi chạy script `create-test-users.sql`, bạn gặp lỗi:
```
ERROR: 42P01: relation "public.users" does not exist
LINE 209: INSERT INTO public.users
```

Lỗi này xảy ra vì bảng `public.users` chưa được tạo trong database.

## Giải pháp

### Bước 1: Tạo bảng users

**Cách 1: Chạy script đơn giản (Khuyến nghị)**

1. Vào Supabase Dashboard → SQL Editor
2. Chạy script `create-users-table.sql`:

```sql
-- Script đơn giản để tạo bảng users
-- Chạy script này trước khi chạy create-test-users.sql

-- Tạo bảng users nếu chưa tồn tại
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  team TEXT NOT NULL DEFAULT 'a',
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('admin', 'user')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;

-- Tạo policies cơ bản
CREATE POLICY "Users can read all users" ON public.users
  FOR SELECT USING (true);

CREATE POLICY "Users can update own data" ON public.users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Allow insert for authenticated users" ON public.users
  FOR INSERT WITH CHECK (auth.uid() = id);
```

**Cách 2: Chạy script đầy đủ**

Nếu bạn muốn tạo toàn bộ database schema, chạy script `database/init.sql`

### Bước 2: Tạo test users

**Cách 1: Qua Supabase Dashboard (Dễ nhất)**

1. Vào Supabase Dashboard → Authentication → Users
2. Click "Add user" và tạo:

**Test User:**
- Email: `test@example.com`
- Password: `password123`
- User Metadata:
```json
{
  "full_name": "Test User",
  "team": "CHC",
  "role": "user"
}
```

**Admin User:**
- Email: `admin@example.com`
- Password: `admin123`
- User Metadata:
```json
{
  "full_name": "Admin User",
  "team": "CHC",
  "role": "admin"
}
```

**No Access User:**
- Email: `noaccess@example.com`
- Password: `noaccess123`
- User Metadata:
```json
{
  "full_name": "No Access User",
  "team": "a",
  "role": "user"
}
```

**Cách 2: Chạy SQL Script**

Sau khi tạo bảng users, bạn có thể chạy script `create-test-users.sql`

### Bước 3: Verify

Kiểm tra bảng users đã được tạo:

```sql
-- Kiểm tra bảng users
SELECT 
  email,
  full_name,
  team,
  role
FROM public.users;

-- Kiểm tra auth users
SELECT 
  email,
  raw_user_meta_data
FROM auth.users
WHERE email IN ('test@example.com', 'admin@example.com', 'noaccess@example.com');
```

## Test Login

Sau khi tạo xong, test login tại `http://localhost:3003`:

1. **test@example.com / password123** → Thành công, redirect đến dashboard
2. **admin@example.com / admin123** → Thành công, redirect đến dashboard  
3. **noaccess@example.com / noaccess123** → Lỗi "Không có quyền truy cập"

## Lưu ý

- Bảng `public.users` cần được tạo trước khi chạy bất kỳ script test nào
- Trigger sẽ tự động sync user từ `auth.users` sang `public.users`
- Team 'CHC' có quyền truy cập Digital CRM
- Metadata phải có đầy đủ: `full_name`, `team`, `role`

## Troubleshooting

Nếu vẫn gặp lỗi:

1. Kiểm tra quyền truy cập Supabase
2. Đảm bảo đang chạy script trong đúng project
3. Kiểm tra RLS policies đã được tạo
4. Xem logs trong Supabase Dashboard → Logs