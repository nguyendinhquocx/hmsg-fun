-- Script tạo nhân viên Hoàn Mỹ CHỈ ĐỂ TEST GIAO DIỆN
-- KHÔNG tạo Supabase Auth accounts
-- Chỉ tạo records trong bảng users để test UI

-- ⚠️ LƯU Ý: Script này chỉ để test, không thể đăng nhập được!
-- Để tạo accounts thật, sử dụng: node create-staff-api.js

-- Tạm thời disable foreign key constraint để test
ALTER TABLE public.users DROP CONSTRAINT IF EXISTS users_id_fkey;

-- Xóa dữ liệu test cũ
DELETE FROM public.users WHERE email LIKE '%@hoanmy.com' OR email LIKE '%@example.com';

-- Thêm 14 nhân viên Hoàn Mỹ để test giao diện
INSERT INTO public.users (id, email, full_name, team, role, created_at) VALUES
-- CHC Team (4 người)
(gen_random_uuid(), 'khanh.tran@hoanmy.com', 'Trần Thị Khanh', 'CHC', 'user', NOW()),
(gen_random_uuid(), 'hong.le@hoanmy.com', 'Lê Thị Thúy Hồng', 'CHC', 'user', NOW()),
(gen_random_uuid(), 'quynh.bui@hoanmy.com', 'Bùi Thị Như Quỳnh', 'CHC', 'user', NOW()),
(gen_random_uuid(), 'thuy.pham@hoanmy.com', 'Phạm Thị Thanh Thùy', 'CHC', 'user', NOW()),

-- Package Team (2 người)
(gen_random_uuid(), 'anh.ngo@hoanmy.com', 'Ngô Thị Lan Anh', 'Package', 'user', NOW()),
(gen_random_uuid(), 'truc.nguyen3@hoanmy.com', 'Nguyễn Thị Diễm Trúc', 'Package', 'user', NOW()),

-- Referral Team (4 người)
(gen_random_uuid(), 'trang.nguyen9@hoanmy.com', 'Nguyễn Thị Xuân Trang', 'Referral', 'user', NOW()),
(gen_random_uuid(), 'tram.mai@hoanmy.com', 'Mai Lê Bảo Trâm', 'Referral', 'user', NOW()),
(gen_random_uuid(), 'vuong.duong@hoanmy.com', 'Dương Thanh Vương', 'Referral', 'user', NOW()),
(gen_random_uuid(), 'phong.trinh@hoanmy.com', 'Trịnh Vũ Phong', 'Referral', 'user', NOW()),

-- PHI Team (1 người)
(gen_random_uuid(), 'phi.tran@hoanmy.com', 'Trần Thị Phương Phi', 'PHI', 'user', NOW()),

-- Digital Team (1 người - ADMIN)
(gen_random_uuid(), 'quoc.nguyen3@hoanmy.com', 'Nguyễn Đình Quốc', 'Digital', 'admin', NOW()),

-- Manager Team (2 người)
(gen_random_uuid(), 'luan.tran@hoanmy.com', 'Trần Hoàng Luân', 'Manager', 'user', NOW()),
(gen_random_uuid(), 'phung.le2@hoanmy.com', 'Lê Thị Kim Phụng', 'Manager', 'user', NOW())

ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  team = EXCLUDED.team,
  role = EXCLUDED.role,
  updated_at = NOW();

-- Khôi phục foreign key constraint sau khi test
-- (Uncomment dòng dưới khi muốn khôi phục constraint)
-- ALTER TABLE public.users ADD CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

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

-- Thống kê theo team
SELECT 
  team,
  COUNT(*) as so_luong,
  STRING_AGG(full_name, ', ' ORDER BY full_name) as danh_sach
FROM public.users 
WHERE email LIKE '%@hoanmy.com'
GROUP BY team
ORDER BY team;

/*
=== HƯỚNG DẪN SỬ DỤNG ===

🎯 MỤC ĐÍCH: CHỈ ĐỂ TEST GIAO DIỆN
- Script này tạo 14 records trong bảng users
- KHÔNG tạo Supabase Auth accounts
- Không thể đăng nhập được!
- Chỉ để test hiển thị danh sách users trong dashboard

⚡ CÁCH SỬ DỤNG:
1. Chạy script này trong Supabase SQL Editor
2. Kiểm tra giao diện dashboard
3. Xem danh sách users hiển thị đúng chưa
4. Test các chức năng filter, search, etc.

🚀 ĐỂ TẠO ACCOUNTS THẬT:
1. Xóa dữ liệu test: DELETE FROM public.users WHERE email LIKE '%@hoanmy.com';
2. Khôi phục constraint: ALTER TABLE public.users ADD CONSTRAINT users_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;
3. Chạy: node create-staff-api.js

=== DANH SÁCH 14 NHÂN VIÊN ===

CHC (4): Trần Thị Khanh, Lê Thị Thúy Hồng, Bùi Thị Như Quỳnh, Phạm Thị Thanh Thùy
Package (2): Ngô Thị Lan Anh, Nguyễn Thị Diễm Trúc  
Referral (4): Nguyễn Thị Xuân Trang, Mai Lê Bảo Trâm, Dương Thanh Vương, Trịnh Vũ Phong
PHI (1): Trần Thị Phương Phi
Digital (1): Nguyễn Đình Quốc (ADMIN)
Manager (2): Trần Hoàng Luân, Lê Thị Kim Phụng

=== LƯU Ý ===

⚠️ QUAN TRỌNG:
- Đây chỉ là dữ liệu test, không thể đăng nhập
- Để tạo accounts thật, phải sử dụng create-staff-api.js
- Nhớ khôi phục foreign key constraint sau khi test xong
- Mật khẩu thật sẽ là: Hmsg@2025
*/