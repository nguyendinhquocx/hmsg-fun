# Hướng Dẫn Chuyển Đổi từ Test Users sang Real Users

## 📋 Tổng Quan

Ứng dụng Digital CRM hiện tại đang sử dụng **test users** (`admin@test.com`, `manager@test.com`, `user@test.com`). Để chuyển sang **real users**, bạn cần:

1. ✅ **Hiểu cách authentication hoạt động**
2. ✅ **Tạo real users trong Supabase Auth**
3. ✅ **Sync users vào database**
4. ✅ **Test và xóa test users**

## 🔍 Cách Authentication Hoạt động

### Login Flow
```
User nhập email/password 
→ Supabase Auth authenticate 
→ Kiểm tra user trong bảng `users` 
→ Kiểm tra team = 'CHC' 
→ Tạo JWT token 
→ Redirect to dashboard
```

### Dashboard Flow
```
Dashboard load 
→ Lấy user từ Supabase Auth 
→ Hiển thị thông tin từ user_metadata
```

**Kết luận**: 
- **Login** cần cả Supabase Auth + bảng `users`
- **Dashboard** chỉ cần Supabase Auth user_metadata

## 🚀 Các Phương Pháp Tạo Real Users

### Phương Pháp 1: Thủ Công (Khuyến nghị cho ít users)

1. **Vào Supabase Dashboard**
   - Truy cập: https://supabase.com/dashboard
   - Chọn project → Authentication → Users

2. **Tạo User Mới**
   - Click "Add user"
   - Nhập email và password thật

3. **Thêm Metadata** (Quan trọng!)
   ```json
   {
     "full_name": "Nguyễn Văn A",
     "team": "CHC",
     "role": "admin"
   }
   ```

4. **Sync vào Database**
   - Chạy script: `scripts/sync-real-users.sql`

### Phương Pháp 2: API Endpoint (Khuyến nghị cho nhiều users)

1. **Thêm Service Role Key vào .env.local**
   ```env
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

2. **Sử dụng API để tạo users**
   ```bash
   curl -X POST http://localhost:3003/api/admin/create-user \
     -H "Content-Type: application/json" \
     -d '{
       "email": "admin@yourcompany.com",
       "password": "strongpassword123",
       "full_name": "Nguyễn Văn Admin",
       "role": "admin"
     }'
   ```

## 📝 Checklist Thực Hiện

### Bước 1: Chuẩn Bị
- [ ] Chuẩn bị danh sách users cần tạo
- [ ] Quyết định role cho từng user (admin/manager/user)
- [ ] Chuẩn bị passwords mạnh
- [ ] Lấy Service Role Key từ Supabase (nếu dùng API)

### Bước 2: Tạo Users
- [ ] Tạo users trong Supabase Auth
- [ ] Đảm bảo metadata có đầy đủ: `full_name`, `team: "CHC"`, `role`
- [ ] Verify email format đúng

### Bước 3: Sync Database
- [ ] Chạy script `scripts/sync-real-users.sql`
- [ ] Kiểm tra users đã được thêm vào bảng `users`

### Bước 4: Test
- [ ] Test login với real users
- [ ] Verify dashboard hiển thị đúng thông tin
- [ ] Test các chức năng chính

### Bước 5: Cleanup (Tùy chọn)
- [ ] Xóa test users khỏi Supabase Auth
- [ ] Xóa test users khỏi bảng `users`

## 🛠️ Scripts và Tools

### 1. Sync Script
```sql
-- Chạy trong Supabase SQL Editor
-- File: scripts/sync-real-users.sql

-- Sync users từ Auth vào bảng users
INSERT INTO users (id, email, full_name, team, role, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  au.raw_user_meta_data->>'full_name' as full_name,
  'CHC' as team,
  au.raw_user_meta_data->>'role' as role,
  au.created_at,
  NOW() as updated_at
FROM auth.users au
LEFT JOIN users u ON au.id = u.id
WHERE u.id IS NULL 
  AND au.email NOT LIKE '%@test.com'
  AND au.raw_user_meta_data->>'team' = 'CHC';
```

### 2. API Endpoints
- **POST** `/api/admin/create-user` - Tạo user mới
- **GET** `/api/admin/create-user` - Lấy danh sách users
- **DELETE** `/api/admin/create-user` - Xóa user

## ⚠️ Lưu Ý Quan Trọng

### Metadata Bắt Buộc
```json
{
  "full_name": "Tên hiển thị",
  "team": "CHC",           // PHẢI là "CHC" để truy cập Digital CRM
  "role": "admin"        // admin, manager, hoặc user
}
```

### Quyền Truy Cập
- Chỉ users có `team: "CHC"` mới truy cập được Digital CRM
- Role quyết định quyền hạn trong ứng dụng

### Security
- Service Role Key có quyền admin, cần bảo mật
- Passwords phải mạnh (ít nhất 8 ký tự)
- Email phải unique

## 🔧 Troubleshooting

### Lỗi "Bạn không có quyền truy cập module Digital CRM"
**Nguyên nhân**: User không có `team: "CHC"` hoặc không có trong bảng `users`

**Giải pháp**:
1. Kiểm tra metadata trong Supabase Auth
2. Chạy sync script
3. Verify user có trong bảng `users`

### Login thành công nhưng redirect về login
**Nguyên nhân**: Middleware không verify được JWT token

**Giải pháp**:
1. Check browser console có lỗi không
2. Verify JWT_SECRET trong .env.local
3. Restart server

### Dashboard hiển thị thông tin sai
**Nguyên nhân**: User metadata không đầy đủ

**Giải pháp**:
1. Cập nhật metadata trong Supabase Auth
2. Logout và login lại

## 📞 Hỗ Trợ

Nếu gặp vấn đề:
1. Kiểm tra console logs
2. Verify Supabase configuration
3. Test với 1 user trước khi tạo nhiều
4. Backup test users trước khi xóa

## 🎯 Bước Tiếp Theo

1. **Ngay bây giờ**: Tạo 1-2 real users để test
2. **Sau khi test OK**: Tạo thêm users theo nhu cầu
3. **Khi ổn định**: Xóa test users
4. **Tương lai**: Setup user management UI cho admin

---

**Chúc bạn setup thành công! 🚀**