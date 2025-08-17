# Hướng dẫn tạo Test Users cho Digital CRM

## Cách 1: Tạo qua Supabase Dashboard (Khuyến nghị)

### Bước 1: Tạo Users trong Authentication

1. Vào Supabase Dashboard → Authentication → Users
2. Click "Add user" và tạo các users sau:

**User 1 - Có quyền truy cập:**
- Email: `test@example.com`
- Password: `password123`
- User Metadata (JSON):
```json
{
  "full_name": "Test User",
  "team": "b",
  "role": "user"
}
```

**User 2 - Admin có quyền truy cập:**
- Email: `admin@example.com`
- Password: `admin123`
- User Metadata (JSON):
```json
{
  "full_name": "Admin User",
  "team": "b",
  "role": "admin"
}
```

**User 3 - Không có quyền truy cập:**
- Email: `noaccess@example.com`
- Password: `noaccess123`
- User Metadata (JSON):
```json
{
  "full_name": "No Access User",
  "team": "a",
  "role": "user"
}
```

### Bước 2: Sync vào bảng users

Chạy SQL sau trong SQL Editor:

```sql
-- Sync users từ auth.users sang public.users
INSERT INTO public.users (id, email, full_name, team, role)
SELECT 
  id,
  email,
  raw_user_meta_data->>'full_name' as full_name,
  raw_user_meta_data->>'team' as team,
  raw_user_meta_data->>'role' as role
FROM auth.users 
WHERE email IN ('test@example.com', 'admin@example.com', 'noaccess@example.com')
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  team = EXCLUDED.team,
  role = EXCLUDED.role;
```

### Bước 3: Verify

```sql
SELECT 
  email,
  full_name,
  team,
  role
FROM public.users
WHERE email IN ('test@example.com', 'admin@example.com', 'noaccess@example.com');
```

## Cách 2: Sử dụng SQL Script

Nếu muốn tạo qua SQL, sử dụng file `create-test-users.sql` đã tạo.

## Test Cases

### Test 1: Login thành công
- Email: `test@example.com`
- Password: `password123`
- Kết quả mong đợi: Redirect đến `/dashboard`

### Test 2: Login admin thành công
- Email: `admin@example.com`
- Password: `admin123`
- Kết quả mong đợi: Redirect đến `/dashboard`

### Test 3: Login không có quyền
- Email: `noaccess@example.com`
- Password: `noaccess123`
- Kết quả mong đợi: Hiển thị lỗi "Bạn không có quyền truy cập module Digital CRM"

### Test 4: Login sai thông tin
- Email: `wrong@example.com`
- Password: `wrongpass`
- Kết quả mong đợi: Hiển thị lỗi "Email hoặc mật khẩu không đúng"

## Debug

Kiểm tra console logs để debug:
- Authentication result
- Profile lookup result
- Team access check
- Redirect behavior

## Lưu ý

- Team 'b' có quyền truy cập Digital CRM
- Team khác 'b' sẽ bị từ chối truy cập
- User metadata phải có đầy đủ: full_name, team, role
- Public.users table phải sync với auth.users metadata