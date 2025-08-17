-- Script tạo nhanh nhân viên Hoàn Mỹ vào Supabase Auth và bảng users
-- Mật khẩu mặc định: Hmsg@2025
-- LƯU Ý: auth.create_user() không khả dụng, sử dụng phương pháp thay thế

-- PHƯƠNG ÁN 1: Sử dụng API endpoint (Khuyến nghị)
-- Sử dụng file: src/app/api/admin/create-user/route.ts
-- Gọi API để tạo từng user:

/*
POST /api/admin/create-user
Content-Type: application/json

{
  "email": "khanh.tran@hoanmy.com",
  "password": "Hmsg@2025",
  "full_name": "Trần Thị Khanh",
  "team": "CHC",
  "role": "user"
}
*/

-- PHƯƠNG ÁN 2: Tạo trực tiếp trong Supabase Dashboard
-- 1. Vào Authentication → Users → Add user
-- 2. Điền thông tin:
--    - Email: [email]
--    - Password: Hmsg@2025
--    - Auto Confirm User: YES
--    - User Metadata: {"full_name": "[tên]", "team": "[team]", "role": "[role]"}

-- PHƯƠNG ÁN 3: Chỉ tạo trong bảng users trước (để test)
-- Sau đó tạo Auth accounts thủ công

-- ⚠️  LƯU Ý: KHÔNG THỂ TẠO TRỰC TIẾP VÀO BẢNG USERS
-- Bảng users có foreign key constraint với auth.users
-- Phải tạo Supabase Auth accounts trước!

-- SCRIPT NÀY CHỈ DÙNG ĐỂ SYNC SAU KHI ĐÃ TẠO AUTH ACCOUNTS
-- Sử dụng create-staff-api.js để tạo accounts tự động!

-- ⚠️  CẢNH BÁO: KHÔNG XÓA DỮ LIỆU!
-- Script này chỉ dùng để SYNC, không xóa dữ liệu cũ
-- Nếu cần xóa dữ liệu test, hãy sử dụng điều kiện cụ thể:
-- DELETE FROM public.users WHERE email IN ('test1@example.com', 'test2@example.com');

-- KHÔNG CHẠY LỆNH XÓA CHUNG CHUNG NHƯ:
-- DELETE FROM public.users WHERE email LIKE '%@example.com'; -- NGUY HIỂM!

-- SCRIPT SYNC: Chạy sau khi đã tạo Auth accounts
-- Đồng bộ từ auth.users sang public.users
INSERT INTO public.users (id, email, full_name, team, role, created_at)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', au.email) as full_name,
  COALESCE(au.raw_user_meta_data->>'team', 'Unknown') as team,
  COALESCE(au.raw_user_meta_data->>'role', 'user') as role,
  NOW()
FROM auth.users au
WHERE au.email LIKE '%@hoanmy.com'
  AND NOT EXISTS (
    SELECT 1 FROM public.users pu WHERE pu.id = au.id
  )
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
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
=== HƯỚNG DẪN SỬ DỤNG ===

Do auth.create_user() không khả dụng, có 3 phương án:

🎯 PHƯƠNG ÁN 1: SỬ DỤNG API (KHUYẾN NGHỊ)
1. Chạy dev server: npm run dev
2. Sử dụng Postman hoặc curl để gọi API:

curl -X POST http://localhost:3000/api/admin/create-user \
  -H "Content-Type: application/json" \
  -d '{
    "email": "khanh.tran@hoanmy.com",
    "password": "Hmsg@2025",
    "full_name": "Trần Thị Khanh",
    "team": "CHC",
    "role": "user"
  }'

3. Lặp lại cho 14 nhân viên

🏗️ PHƯƠNG ÁN 2: SUPABASE DASHBOARD
1. Vào Supabase Dashboard → Authentication → Users
2. Click "Add user" cho từng nhân viên
3. Điền:
   - Email: [email nhân viên]
   - Password: Hmsg@2025
   - Auto Confirm User: ✅ YES
   - User Metadata: 
     {
       "full_name": "[Tên đầy đủ]",
       "team": "[Team]",
       "role": "user" (hoặc "admin" cho Nguyễn Đình Quốc)
     }
4. Sau đó chạy script sync để đưa vào bảng users

⚡ PHƯƠNG ÁN 3: CHỈ TẠO BẢNG USERS
1. Chạy script SQL này để tạo records trong bảng users
2. Tạo Auth accounts thủ công sau
3. Dùng để test nhanh giao diện

=== SCRIPT SYNC SAU KHI TẠO AUTH ACCOUNTS ===

INSERT INTO public.users (id, email, full_name, team, role, created_at)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', au.email) as full_name,
  COALESCE(au.raw_user_meta_data->>'team', 'CHC') as team,
  COALESCE(au.raw_user_meta_data->>'role', 'user') as role,
  NOW()
FROM auth.users au
WHERE au.email LIKE '%@hoanmy.com'
  AND NOT EXISTS (
    SELECT 1 FROM public.users pu WHERE pu.id = au.id
  )
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  team = EXCLUDED.team,
  role = EXCLUDED.role,
  updated_at = NOW();

=== DANH SÁCH 14 NHÂN VIÊN ===

CHC (4): Trần Thị Khanh, Lê Thị Thúy Hồng, Bùi Thị Như Quỳnh, Phạm Thị Thanh Thùy
Package (2): Ngô Thị Lan Anh, Nguyễn Thị Diễm Trúc
Referral (4): Nguyễn Thị Xuân Trang, Mai Lê Bảo Trâm, Dương Thanh Vương, Trịnh Vũ Phong
PHI (1): Trần Thị Phương Phi
Digital (1): Nguyễn Đình Quốc (ADMIN)
Manager (2): Trần Hoàng Luân, Lê Thị Kim Phụng

=== LƯU Ý ===

- Mật khẩu mặc định: Hmsg@2025
- Chỉ có Nguyễn Đình Quốc có role 'admin'
- Tất cả users khác có role 'user'
- Email domain: @hoanmy.com
- Cần gửi thông tin đăng nhập cho nhân viên sau khi tạo
*/