# Hướng Dẫn Tạo Real Users cho Digital CRM

## Tổng Quan

Để chuyển từ test users sang real users, bạn cần tạo users thật trong Supabase Authentication với metadata phù hợp và sync vào bảng `users`.

## Phương Pháp 1: Tạo Users Thủ Công qua Supabase Dashboard

### Bước 1: Truy cập Supabase Dashboard

1. Đăng nhập vào [Supabase Dashboard](https://supabase.com/dashboard)
2. Chọn project Digital CRM của bạn
3. Vào **Authentication** > **Users**

### Bước 2: Tạo User Mới

1. Click **"Add user"** hoặc **"Create new user"**
2. Điền thông tin:
   - **Email**: Email thật của user (ví dụ: `john.doe@company.com`)
   - **Password**: Password mạnh (ít nhất 8 ký tự)
   - **Confirm password**: Nhập lại password

### Bước 3: Thêm User Metadata

**Quan trọng**: Phải thêm metadata để ứng dụng hoạt động đúng!

1. Sau khi tạo user, click vào user vừa tạo
2. Scroll xuống phần **"User Metadata"**
3. Click **"Edit"** hoặc **"Add metadata"**
4. Thêm JSON metadata:

```json
{
  "full_name": "Tên Đầy Đủ",
  "team": "CHC",
  "role": "admin"
}
```

**Giải thích các trường:**
- `full_name`: Tên hiển thị của user
- `team`: **Phải là "CHC"** để truy cập Digital CRM
- `role`: Vai trò (`admin`, `manager`, hoặc `user`)

### Bước 4: Ví Dụ Tạo Users Theo Role

#### Admin User
```json
{
  "full_name": "Nguyễn Văn Admin",
  "team": "CHC",
  "role": "admin"
}
```

#### Manager User
```json
{
  "full_name": "Trần Thị Manager",
  "team": "CHC",
  "role": "manager"
}
```

#### Regular User
```json
{
  "full_name": "Lê Văn User",
  "team": "CHC",
  "role": "user"
}
```

## Phương Pháp 2: Tạo Users qua SQL Script

### Tạo file `create-real-users.sql`

```sql
-- Tạo real users trong bảng users
-- Lưu ý: Phải tạo trong Supabase Auth trước!

INSERT INTO users (id, email, full_name, team, role, created_at, updated_at)
VALUES 
  -- Thay đổi UUID và thông tin theo users thật của bạn
  ('uuid-from-supabase-auth-1', 'admin@yourcompany.com', 'Nguyễn Văn Admin', 'b', 'admin', NOW(), NOW()),
  ('uuid-from-supabase-auth-2', 'manager@yourcompany.com', 'Trần Thị Manager', 'b', 'manager', NOW(), NOW()),
  ('uuid-from-supabase-auth-3', 'user@yourcompany.com', 'Lê Văn User', 'b', 'user', NOW(), NOW());
```

**Cách lấy UUID từ Supabase Auth:**
1. Vào Authentication > Users
2. Click vào user
3. Copy UUID từ trường "ID"

## Phương Pháp 3: Tạo Signup API (Khuyến nghị)

### Tạo API endpoint để admin tạo users

```javascript
// src/app/api/admin/create-user/route.ts
import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const supabaseAdmin = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Service role key
)

export async function POST(request: NextRequest) {
  try {
    const { email, password, full_name, role } = await request.json()

    // 1. Tạo user trong Supabase Auth
    const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      user_metadata: {
        full_name,
        team: 'CHC',
        role
      }
    })

    if (authError) {
      return NextResponse.json({ error: authError.message }, { status: 400 })
    }

    // 2. Thêm vào bảng users
    const { error: dbError } = await supabaseAdmin
      .from('users')
      .insert({
        id: authUser.user.id,
        email,
        full_name,
        team: 'CHC',
        role
      })

    if (dbError) {
      return NextResponse.json({ error: dbError.message }, { status: 400 })
    }

    return NextResponse.json({ 
      message: 'User created successfully',
      user: authUser.user 
    })

  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

## Sync Users từ Auth vào Database

### Script tự động sync

```sql
-- sync-auth-users.sql
-- Script để sync users từ Supabase Auth vào bảng users

INSERT INTO users (id, email, full_name, team, role, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', split_part(au.email, '@', 1)) as full_name,
  COALESCE(au.raw_user_meta_data->>'team', 'CHC') as team,
  COALESCE(au.raw_user_meta_data->>'role', 'user') as role,
  au.created_at,
  NOW() as updated_at
FROM auth.users au
LEFT JOIN users u ON au.id = u.id
WHERE u.id IS NULL  -- Chỉ thêm users chưa có trong bảng
  AND au.email NOT LIKE '%@test.com';  -- Bỏ qua test users
```

## Checklist Tạo Real Users

### ✅ Trước khi tạo
- [ ] Chuẩn bị danh sách users cần tạo
- [ ] Quyết định role cho từng user
- [ ] Chuẩn bị passwords mạnh

### ✅ Khi tạo users
- [ ] Tạo user trong Supabase Auth
- [ ] Thêm metadata đầy đủ: `full_name`, `team: "CHC"`, `role`
- [ ] Verify email format đúng
- [ ] Test login với user mới

### ✅ Sau khi tạo
- [ ] Sync vào bảng `users`
- [ ] Test login flow hoàn chỉnh
- [ ] Verify dashboard hiển thị đúng thông tin
- [ ] Xóa test users (nếu cần)

## Lưu Ý Quan Trọng

1. **Team phải là "CHC"**: Chỉ users có `team: "CHC"` mới truy cập được Digital CRM
2. **Metadata bắt buộc**: `full_name`, `team`, `role` phải có trong user_metadata
3. **Sync database**: Phải có record trong bảng `users` để login thành công
4. **Password policy**: Supabase yêu cầu password ít nhất 6 ký tự
5. **Email unique**: Mỗi email chỉ có thể tạo 1 user

## Troubleshooting

### Lỗi "Bạn không có quyền truy cập module Digital CRM"
- Kiểm tra `team` trong metadata có phải "CHC" không
- Kiểm tra user có trong bảng `users` không

### Lỗi "User not found" ở dashboard
- Kiểm tra user_metadata có đầy đủ không
- Verify user đã được tạo trong Supabase Auth

### Login thành công nhưng redirect về login
- Kiểm tra middleware có lỗi không
- Verify JWT token được tạo đúng
- Check browser console có lỗi không

## Bước Tiếp Theo

1. Tạo 1-2 real users để test
2. Test login flow hoàn chỉnh
3. Tạo thêm users theo nhu cầu
4. Xóa test users khi không cần
5. Setup user management system (nếu cần)