# 📋 Hướng dẫn quản lý nhân viên - Digital CRM

## 🎯 Cách thêm nhân viên mới

### Bước 1: Thêm vào Database
1. Vào **Supabase → Table Editor → users**
2. Click **Insert** → **Insert row**
3. Điền thông tin:
   ```
   email: nhanvien@congty.com
   full_name: Tên Nhân Viên
   team: a hoặc b
   role: user hoặc admin
   ```
4. Click **Save**

### Bước 2: Thông báo cho nhân viên
**Gửi cho nhân viên:**
```
Website: https://hmsg.fun
Email: [email bạn vừa thêm]
Password: 123456789 (mật khẩu mặc định)
```

### Bước 3: Nhân viên login
- Nhân viên truy cập website
- Login với email + password mặc định
- **Hệ thống tự động tạo tài khoản**
- Lần sau login bình thường

## 🔐 Phân quyền

### Team A:
- Chỉ vào được Dashboard chính
- KHÔNG vào được Digital CRM

### Team B: 
- Vào được Dashboard + Digital CRM
- Quản lý danh sách công ty

### Admin:
- Full quyền Dashboard + Digital CRM + Settings
- Quản lý cấu hình hệ thống

## 📝 Mật khẩu mặc định

**Tất cả nhân viên mới:** `123456789`

**Lưu ý:** Nhân viên có thể đổi password sau khi login thành công.

## ✅ Test Accounts hiện có

```
admin@hmsg.fun - password: 123456789 (Admin, Team B)
user1@hmsg.fun - password: 123456789 (User, Team B)  
user2@hmsg.fun - password: 123456789 (User, Team A)
```

## 🚀 Workflow thêm nhân viên

```
Manager → Database users table → Thông báo nhân viên → Done!
```

**Chỉ 1 bước cho Manager!** 😊