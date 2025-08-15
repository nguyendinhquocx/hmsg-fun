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

### Team A (Package, Referral, PHI):
- Chỉ vào được Dashboard chính
- KHÔNG vào được Digital CRM

### Team B (CHC Only): 
- Vào được Dashboard + Digital CRM
- Quản lý danh sách công ty

### Admin:
- Full quyền Dashboard + Digital CRM + Settings
- Quản lý cấu hình hệ thống

## 📝 Mật khẩu mặc định

**Tất cả nhân viên mới:** `123456789`

**Lưu ý:** Nhân viên có thể đổi password sau khi login thành công.

## ✅ Accounts thực tế - HMSG

**Admin (Full quyền):**
```
quoc.nguyen3@hoanmy.com - Nguyễn Đình Quốc (Admin, Team B)
luan.tran@hoanmy.com - Trần Hoàng Luân (Manager, Team B)
```

**Team CHC (Digital CRM):**
```  
khanh.tran@hoanmy.com - Trần Thị Khanh
hong.le@hoanmy.com - Lê Thị Thúy Hồng
quynh.bui@hoanmy.com - Bùi Thị Như Quỳnh
thuy.pham@hoanmy.com - Phạm Thị Thanh Thùy
```

**Team khác (Dashboard only):**
```
Package: anh.ngo, truc.nguyen3
Referral: trang.nguyen9, tram.mai, vuong.duong, phong.trinh  
PHI: phi.tran
```

**Tất cả password:** `123456789`

## 🚀 Workflow thêm nhân viên

```
Manager → Database users table → Thông báo nhân viên → Done!
```

**Chỉ 1 bước cho Manager!** 😊