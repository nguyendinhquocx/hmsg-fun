# Hướng Dẫn Thêm Nhân Viên Hoàn Mỹ

## 📋 Tổng Quan

Có 2 cách để thêm nhanh 14 nhân viên Hoàn Mỹ vào hệ thống:

## ⚠️ LƯU Ý QUAN TRỌNG

- **FOREIGN KEY CONSTRAINT:** Bảng `users` có ràng buộc với `auth.users`, PHẢI tạo Supabase Auth accounts trước!
- **Mật khẩu mặc định:** `Hmsg@2025`
- **Chỉ có 1 admin:** Nguyễn Đình Quốc (Digital team)
- **13 users còn lại:** Role 'user'
- **Email domain:** @hoanmy.com
- **KHUYẾN NGHỊ:** Sử dụng script `create-staff-api.js` để tự động tạo tất cả
- **Cần thông báo:** Gửi thông tin đăng nhập cho nhân viên sau khi tạo

### 🎯 Phương Án 1: Tạo Accounts Hoàn Chỉnh (Khuyến Nghị)
**File:** `create-hoanmy-staff.sql`
- ✅ Tạo Supabase Auth accounts với mật khẩu `Hmsg@2025`
- ✅ Tự động sync vào bảng `users`
- ✅ Nhân viên có thể đăng nhập ngay
- ✅ Metadata đầy đủ (full_name, team, role)

### 🚀 Phương Án 2: Chỉ Test Giao Diện
**File:** `create-staff-test-only.sql` (MỚI - Khuyến nghị cho test)
- ✅ Tự động disable foreign key constraint để test
- ✅ Tạo 14 records với đầy đủ thông tin nhân viên Hoàn Mỹ
- ✅ Hướng dẫn khôi phục constraint sau khi test
- ❌ Không tạo Supabase Auth accounts
- 🎯 Mục đích: Test giao diện, không thể đăng nhập

**File cũ:** `quick-add-staff-to-table.sql` (Không khuyến nghị - có lỗi constraint)

---

## 🎯 PHƯƠNG ÁN 1: TẠO ACCOUNTS HOÀN CHỈNH

### Bước 1A: Sử dụng Script Node.js Tự Động (KHUYẾN NGHỊ)

**Cách nhanh nhất:** Sử dụng script `create-staff-api.js` để tự động tạo tất cả 14 nhân viên.

```bash
# 1. Cài đặt dependencies
npm install node-fetch

# 2. Đảm bảo dev server đang chạy
npm run dev

# 3. Chạy script tự động
node create-staff-api.js
```

Script sẽ:
- ✅ Tự động tạo tất cả 14 nhân viên
- ✅ Hiển thị progress real-time
- ✅ Báo cáo kết quả chi tiết
- ✅ Thống kê theo team
- ✅ Xử lý lỗi và retry

### Bước 1B: Sử dụng API Endpoint (Nếu cần tạo thủ công)

**Cách tốt nhất:** Sử dụng API endpoint `/api/admin/create-user` đã có sẵn trong hệ thống.

```bash
# Ví dụ tạo 1 user bằng curl
curl -X POST http://localhost:3000/api/admin/create-user \
  -H "Content-Type: application/json" \
  -d '{
    "email": "khanh.tran@hoanmy.com",
    "password": "Hmsg@2025",
    "full_name": "Trần Thị Khanh",
    "team": "CHC",
    "role": "user"
  }'
```

**Lặp lại cho tất cả 14 nhân viên** với thông tin tương ứng.

### Bước 1C: Mở Supabase Dashboard (Phương pháp cũ)
1. Truy cập [Supabase Dashboard](https://supabase.com/dashboard)
2. Chọn project Digital CRM
3. Vào **SQL Editor**

### Bước 2: Chạy Script Tạo Users (Nếu dùng SQL)
1. Mở file `create-hoanmy-staff.sql`
2. **QUAN TRỌNG:** Chạy từng câu lệnh `SELECT auth.create_user(...)` một
3. Không chạy tất cả cùng lúc!

```sql
-- Ví dụ: Chạy từng cái như này
SELECT auth.create_user(
  jsonb_build_object(
    'email', 'khanh.tran@hoanmy.com',
    'password', 'Hmsg@2025',
    'email_confirm', true,
    'user_metadata', jsonb_build_object(
      'full_name', 'Trần Thị Khanh',
      'team', 'CHC',
      'role', 'user'
    )
  )
);
```

### Bước 3: Sync Vào Bảng Users
Sau khi tạo xong tất cả 14 users, chạy câu lệnh sync:

```sql
INSERT INTO public.users (id, email, full_name, team, role, created_at)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', au.email) as full_name,
  -- ... (xem full script)
FROM auth.users au
WHERE au.email LIKE '%@hoanmy.com'
-- ...
```

### Bước 4: Kiểm Tra Kết Quả
```sql
-- Kiểm tra bảng users
SELECT email, full_name, team, role 
FROM public.users 
WHERE email LIKE '%@hoanmy.com'
ORDER BY team, full_name;

-- Kiểm tra Supabase Auth
SELECT email, raw_user_meta_data 
FROM auth.users 
WHERE email LIKE '%@hoanmy.com';
```

---

## 🚀 PHƯƠNG ÁN 2: CHỈ THÊM VÀO BẢNG USERS

### Khi Nào Dùng?
- Test nhanh giao diện
- Đã có Auth accounts từ trước
- Chỉ cần data trong bảng `users`

### Cách Chạy:
1. Mở `quick-add-staff-to-table.sql`
2. Chạy toàn bộ script một lần
3. Kiểm tra kết quả

---

## 👥 DANH SÁCH NHÂN VIÊN

### CHC Team (4 người)
- Trần Thị Khanh - `khanh.tran@hoanmy.com`
- Lê Thị Thúy Hồng - `hong.le@hoanmy.com`
- Bùi Thị Như Quỳnh - `quynh.bui@hoanmy.com`
- Phạm Thị Thanh Thùy - `thuy.pham@hoanmy.com`

### Package Team (2 người)
- Ngô Thị Lan Anh - `anh.ngo@hoanmy.com`
- Nguyễn Thị Diễm Trúc - `truc.nguyen3@hoanmy.com`

### Referral Team (4 người)
- Nguyễn Thị Xuân Trang - `trang.nguyen9@hoanmy.com`
- Mai Lê Bảo Trâm - `tram.mai@hoanmy.com`
- Dương Thanh Vương - `vuong.duong@hoanmy.com`
- Trịnh Vũ Phong - `phong.trinh@hoanmy.com`

### PHI Team (1 người)
- Trần Thị Phương Phi - `phi.tran@hoanmy.com`

### Digital Team (1 người - ADMIN)
- Nguyễn Đình Quốc - `quoc.nguyen3@hoanmy.com` ⭐

### Manager Team (2 người)
- Trần Hoàng Luân - `luan.tran@hoanmy.com`
- Lê Thị Kim Phụng - `phung.le2@hoanmy.com`

**Tổng: 14 nhân viên**

---

## 🔐 THÔNG TIN ĐĂNG NHẬP

### Mật Khẩu Mặc Định
```
Hmsg@2025
```

### Quyền Hạn
- **Admin:** Nguyễn Đình Quốc (Digital)
- **User:** Tất cả các nhân viên khác

---

## 📧 SAU KHI TẠO XONG

### 1. Gửi Email Thông Báo
Gửi cho từng nhân viên:

```
Chào [Tên nhân viên],

Tài khoản Digital CRM của bạn đã được tạo:
- Email: [email]
- Mật khẩu: Hmsg@2025
- Link đăng nhập: [your-app-url]/login

Vui lòng đổi mật khẩu ngay sau lần đăng nhập đầu tiên.

Trân trọng,
Team Digital
```

### 2. Test Đăng Nhập
- Test với 2-3 accounts khác nhau
- Kiểm tra dashboard hiển thị đúng
- Verify quyền admin cho Nguyễn Đình Quốc

### 3. Dọn Dẹp
```sql
-- Xóa test users cũ
DELETE FROM public.users WHERE email LIKE '%@example.com';
DELETE FROM auth.users WHERE email LIKE '%@example.com';
```

---

## 🚨 TROUBLESHOOTING

### Lỗi "Email already exists"
```sql
-- Xóa user cũ trước
DELETE FROM auth.users WHERE email = 'email@hoanmy.com';
DELETE FROM public.users WHERE email = 'email@hoanmy.com';
```

### Lỗi Permission
- Đảm bảo đang chạy với admin privileges
- Kiểm tra RLS policies

### Team Không Đúng
- Kiểm tra mapping trong script sync
- Update manual nếu cần:
```sql
UPDATE public.users 
SET team = 'CHC' 
WHERE email = 'khanh.tran@hoanmy.com';
```

### Login Không Thành Công
1. Kiểm tra user có trong cả 2 bảng:
   - `auth.users`
   - `public.users`
2. Verify email_confirmed = true
3. Check password đúng format

---

## 📝 NOTES

- Script đã handle conflict với `ON CONFLICT DO UPDATE`
- Tất cả users được auto-confirm email
- Metadata được sync đầy đủ
- Team mapping linh hoạt, có thể customize
- Admin role chỉ cho Nguyễn Đình Quốc

---

## 🔄 NEXT STEPS

1. ✅ Chạy script tạo users
2. ✅ Test login flow
3. ✅ Gửi thông tin cho nhân viên
4. 🔄 Setup password reset flow
5. 🔄 Configure email templates
6. 🔄 Setup user management dashboard

---

**Chúc may mắn! 🚀**