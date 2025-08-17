# Debug Login Flow - Hướng dẫn kiểm tra

## Vấn đề đã sửa

**Nguyên nhân 1:** Login page chỉ authenticate với Supabase nhưng không tạo JWT token cho middleware. Middleware cần `authToken` cookie để verify user.

**Nguyên nhân 2:** Middleware sử dụng `jsonwebtoken` library không tương thích với Edge Runtime.

**Giải pháp:** 
1. Sau khi authenticate thành công với Supabase
2. Tạo JWT token qua API `/api/auth/create-token`
3. Set `authToken` cookie
4. Tạo `auth-edge.ts` sử dụng Web Crypto API cho Edge Runtime
5. Cập nhật middleware sử dụng `verifyTokenEdge`
6. Redirect đến dashboard

## Các file đã thay đổi

1. **`src/app/login/page.tsx`** - Thêm logic tạo JWT token
2. **`src/app/api/auth/create-token/route.ts`** - API tạo JWT token và set cookie
3. **`src/lib/auth-edge.ts`** - JWT verification cho Edge Runtime
4. **`middleware.ts`** - Sử dụng auth-edge thay vì auth thường

## Cách test

### Bước 1: Đảm bảo có user test

Trước tiên, chạy script tạo bảng users:
```sql
-- Chạy trong Supabase SQL Editor
-- Nội dung file: create-users-table.sql
```

Sau đó tạo test user qua Supabase Dashboard:
- Email: `test@example.com`
- Password: `password123`
- User Metadata:
```json
{
  "full_name": "Test User",
  "team": "b",
  "role": "user"
}
```

### Bước 2: Test login

1. Mở `http://localhost:3003/login`
2. Đăng nhập với `test@example.com / password123`
3. Mở Developer Tools → Console để xem logs
4. Mở Developer Tools → Network để xem API calls

### Bước 3: Kiểm tra flow

**Console logs mong đợi:**
```
Starting login process...
Auth result: { user: true, error: undefined }
User authenticated, checking profile...
Profile result: { profile: {...}, error: undefined }
User profile found: { team: 'b', role: 'user', full_name: 'Test User' }
Access granted, creating session...
Session created, redirecting to dashboard...
```

**Network requests mong đợi:**
1. `POST /api/auth/create-token` → Status 200
2. Navigation đến `/dashboard`

### Bước 4: Verify cookie

Trong Developer Tools → Application → Cookies:
- Phải có cookie `authToken` với giá trị JWT
- Cookie phải có `HttpOnly: true`

## Troubleshooting

### Lỗi "Không tìm thấy thông tin người dùng"
- Kiểm tra bảng `public.users` đã được tạo
- Kiểm tra user có tồn tại trong bảng
- Chạy query:
```sql
SELECT * FROM public.users WHERE email = 'test@example.com';
```

### Lỗi "Lỗi tạo phiên đăng nhập"
- Kiểm tra API `/api/auth/create-token` có hoạt động
- Kiểm tra JWT_SECRET trong environment
- Xem Network tab để xem response từ API

### Vẫn redirect về login
- Kiểm tra cookie `authToken` đã được set
- Kiểm tra middleware có verify token đúng
- Xem Console có lỗi JavaScript nào

### Test với curl

Test API create-token:
```bash
curl -X POST http://localhost:3003/api/auth/create-token \
  -H "Content-Type: application/json" \
  -d '{
    "id": "test-id",
    "email": "test@example.com",
    "full_name": "Test User",
    "team": "b",
    "role": "user"
  }'
```

## Kiểm tra middleware

Nếu vẫn có vấn đề, kiểm tra middleware logs:
1. Thêm console.log trong `middleware.ts`
2. Xem terminal logs khi access `/dashboard`

## Test cases

1. **Login thành công (team b)** → Redirect đến dashboard
2. **Login thành công (team a)** → Hiện lỗi "Không có quyền truy cập"
3. **User không tồn tại** → Hiện lỗi "Không tìm thấy thông tin"
4. **Sai password** → Hiện lỗi "Email hoặc mật khẩu không đúng"