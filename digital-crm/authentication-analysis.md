# Phân Tích Authentication Flow Hiện Tại

## Tổng Quan

Ứng dụng Digital CRM hiện tại sử dụng **2 nguồn dữ liệu user khác nhau**:

1. **Supabase Authentication** - Lưu trữ thông tin đăng nhập và user metadata
2. **Bảng `users`** - Lưu trữ thông tin chi tiết về user trong database

## Chi Tiết Authentication Flow

### 1. Login Page (`/login`)

**Flow đăng nhập:**

1. **Bước 1: Authenticate với Supabase Auth**
   ```javascript
   const { data, error } = await supabase.auth.signInWithPassword({
     email: trimmedEmail,
     password: trimmedPassword,
   })
   ```

2. **Bước 2: Kiểm tra user trong bảng `users`**
   ```javascript
   const { data: userProfile, error: profileError } = await supabase
     .from('users')
     .select('team, role, full_name')
     .eq('id', data.user.id)
     .single()
   ```

3. **Bước 3: Kiểm tra quyền truy cập team 'CHC'**
   ```javascript
   if (userProfile.team !== 'CHC') {
     setError('Bạn không có quyền truy cập module Digital CRM')
   }
   ```

4. **Bước 4: Tạo JWT token cho middleware**
   - Gọi API `/api/auth/create-token`
   - Tạo `authToken` cookie

5. **Bước 5: Redirect đến dashboard**

### 2. Dashboard Page (`/dashboard`)

**Flow lấy thông tin user:**

1. **Chỉ sử dụng Supabase Auth**
   ```javascript
   const { data: { user }, error } = await supabase.auth.getUser()
   ```

2. **Lấy thông tin từ user_metadata**
   ```javascript
   const userMetadata = user.user_metadata || {}
   const formattedUser = {
     id: user.id,
     email: user.email || '',
     full_name: userMetadata.full_name || user.email?.split('@')[0] || '',
     team: userMetadata.team || 'Admin',
     role: userMetadata.role || 'user'
   }
   ```

**⚠️ Vấn đề:** Dashboard **KHÔNG** query bảng `users`, chỉ dựa vào `user_metadata`

## Hiện Trạng Test Users vs Real Users

### Test Users (Hiện tại)

**Trong Supabase Auth:**
- Email: `admin@test.com`, `manager@test.com`, `user@test.com`
- Password: `123456`
- User metadata: `{ full_name: "...", team: "CHC", role: "..." }`

**Trong bảng `users`:**
- Có records tương ứng với các test users
- Được tạo bằng script `create-test-users.sql`

### Real Users (Cần chuyển đổi)

**Yêu cầu:**
1. Tạo users thật trong Supabase Auth với email và password thật
2. Đảm bảo user metadata có đầy đủ thông tin: `full_name`, `team`, `role`
3. Sync thông tin vào bảng `users` để login page hoạt động đúng

## Khuyến Nghị

### Cách 1: Tạo Real Users Thủ Công
1. Vào Supabase Dashboard > Authentication > Users
2. Tạo user mới với email thật
3. Thêm metadata: `{ "full_name": "Tên thật", "team": "CHC", "role": "admin/manager/user" }`
4. Chạy script sync để thêm vào bảng `users`

### Cách 2: Tạo Signup Page
1. Tạo trang đăng ký cho admin
2. Tự động tạo user trong Supabase Auth
3. Tự động thêm vào bảng `users`

### Cách 3: Import Users
1. Chuẩn bị danh sách users (CSV/Excel)
2. Tạo script import hàng loạt
3. Tự động tạo trong cả Supabase Auth và bảng `users`

## Lưu Ý Quan Trọng

1. **Login page** cần cả Supabase Auth và bảng `users`
2. **Dashboard page** chỉ cần Supabase Auth user_metadata
3. **Middleware** sử dụng JWT token từ login
4. **Team 'CHC'** là requirement để truy cập Digital CRM
5. **User metadata** phải có đầy đủ: `full_name`, `team`, `role`

## Bước Tiếp Theo

1. Quyết định cách tạo real users (thủ công/signup/import)
2. Tạo script sync users từ Auth vào bảng `users`
3. Test với real users
4. Xóa test users (nếu cần)