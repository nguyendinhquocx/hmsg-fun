-- Script nhanh: Chỉ thêm nhân viên vào bảng users (không tạo Supabase Auth)
-- Dùng để test nhanh hoặc khi đã có Supabase Auth accounts

-- Xóa dữ liệu test cũ (nếu có)
DELETE FROM public.users WHERE email LIKE '%@example.com';

-- Thêm tất cả nhân viên Hoàn Mỹ vào bảng users
INSERT INTO public.users (id, email, full_name, team, role, created_at) VALUES
-- CHC Team
(gen_random_uuid(), 'khanh.tran@hoanmy.com', 'Trần Thị Khanh', 'CHC', 'user', NOW()),
(gen_random_uuid(), 'hong.le@hoanmy.com', 'Lê Thị Thúy Hồng', 'CHC', 'user', NOW()),
(gen_random_uuid(), 'quynh.bui@hoanmy.com', 'Bùi Thị Như Quỳnh', 'CHC', 'user', NOW()),
(gen_random_uuid(), 'thuy.pham@hoanmy.com', 'Phạm Thị Thanh Thùy', 'CHC', 'user', NOW()),

-- Package Team
(gen_random_uuid(), 'anh.ngo@hoanmy.com', 'Ngô Thị Lan Anh', 'Package', 'user', NOW()),
(gen_random_uuid(), 'truc.nguyen3@hoanmy.com', 'Nguyễn Thị Diễm Trúc', 'Package', 'user', NOW()),

-- Referral Team
(gen_random_uuid(), 'trang.nguyen9@hoanmy.com', 'Nguyễn Thị Xuân Trang', 'Referral', 'user', NOW()),
(gen_random_uuid(), 'tram.mai@hoanmy.com', 'Mai Lê Bảo Trâm', 'Referral', 'user', NOW()),
(gen_random_uuid(), 'vuong.duong@hoanmy.com', 'Dương Thanh Vương', 'Referral', 'user', NOW()),
(gen_random_uuid(), 'phong.trinh@hoanmy.com', 'Trịnh Vũ Phong', 'Referral', 'user', NOW()),

-- PHI Team
(gen_random_uuid(), 'phi.tran@hoanmy.com', 'Trần Thị Phương Phi', 'PHI', 'user', NOW()),

-- Digital Team
(gen_random_uuid(), 'quoc.nguyen3@hoanmy.com', 'Nguyễn Đình Quốc', 'Digital', 'admin', NOW()),

-- Manager Team
(gen_random_uuid(), 'luan.tran@hoanmy.com', 'Trần Hoàng Luân', 'Manager', 'user', NOW()),
(gen_random_uuid(), 'phung.le2@hoanmy.com', 'Lê Thị Kim Phụng', 'Manager', 'user', NOW())

ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  team = EXCLUDED.team,
  role = EXCLUDED.role,
  updated_at = NOW();

-- Kiểm tra kết quả
SELECT 
  email,
  full_name,
  team,
  role,
  created_at
FROM public.users 
WHERE email LIKE '%@hoanmy.com'
ORDER BY team, full_name;

-- Đếm số lượng theo team
SELECT 
  team,
  COUNT(*) as so_luong,
  STRING_AGG(full_name, ', ' ORDER BY full_name) as danh_sach
FROM public.users 
WHERE email LIKE '%@hoanmy.com'
GROUP BY team
ORDER BY team;

/*
=== HƯỚNG DẪN ===

1. Script này CHỈ thêm vào bảng users, KHÔNG tạo Supabase Auth accounts
2. Dùng để test nhanh hoặc khi bạn đã có Auth accounts sẵn
3. Mật khẩu sẽ được quản lý riêng trong Supabase Auth

=== ĐỂ TẠO ACCOUNTS HOÀN CHỈNH ===

Sử dụng file: create-hoanmy-staff.sql
- Tạo cả Supabase Auth accounts VÀ bảng users
- Mật khẩu mặc định: Hmsg@2025
- Đầy đủ metadata cho authentication

=== TEAM MAPPING ===

- CHC: 4 người
- Package: 2 người  
- Referral: 4 người
- PHI: 1 người
- Digital: 1 người (admin)
- Manager: 2 người

Tổng: 14 nhân viên
*/