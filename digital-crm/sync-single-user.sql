-- Script đồng bộ 1 user cụ thể từ auth.users vào public.users
-- Sử dụng sau khi tạo user trong Supabase Authentication Dashboard

-- CÁCH SỬ DỤNG:
-- 1. Thay 'your-email@hoanmy.com' bằng email user vừa tạo
-- 2. Chạy script này trong Supabase SQL Editor

-- Kiểm tra user có trong auth.users không
SELECT 
  'User trong auth.users:' as info,
  email,
  raw_user_meta_data->>'full_name' as full_name,
  raw_user_meta_data->>'team' as team,
  raw_user_meta_data->>'role' as role,
  created_at
FROM auth.users 
WHERE email = 'your-email@hoanmy.com';  -- ⚠️ THAY ĐỔI EMAIL TẠI ĐÂY

-- Đồng bộ user vào bảng public.users
INSERT INTO public.users (id, email, full_name, team, role, created_at)
SELECT 
  au.id,
  au.email,
  COALESCE(au.raw_user_meta_data->>'full_name', 
           SPLIT_PART(au.email, '@', 1)) as full_name,
  COALESCE(au.raw_user_meta_data->>'team', 'Unknown') as team,
  COALESCE(au.raw_user_meta_data->>'role', 'user') as role,
  COALESCE(au.created_at, NOW()) as created_at
FROM auth.users au
WHERE au.email = 'your-email@hoanmy.com'  -- ⚠️ THAY ĐỔI EMAIL TẠI ĐÂY
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
  'Kết quả đồng bộ:' as info,
  email,
  full_name,
  team,
  role,
  created_at
FROM public.users 
WHERE email = 'your-email@hoanmy.com';  -- ⚠️ THAY ĐỔI EMAIL TẠI ĐÂY

-- Kiểm tra tổng số users
SELECT 
  'Tổng số users:' as info,
  COUNT(*) as total_users
FROM public.users;

/*
=== HƯỚNG DẪN CHI TIẾT ===

1. TẠO USER TRONG SUPABASE DASHBOARD:
   - Vào Authentication → Users → Add user
   - Email: test@hoanmy.com
   - Password: Hmsg@2025
   - Auto Confirm User: YES
   - User Metadata:
     {
       "full_name": "Nguyễn Văn Test",
       "team": "Digital",
       "role": "user"
     }

2. CHẠY SCRIPT NÀY:
   - Thay 'your-email@hoanmy.com' bằng email vừa tạo
   - Copy và paste vào Supabase SQL Editor
   - Click Execute

3. ĐĂNG NHẬP:
   - URL: http://localhost:3000/login
   - Email: test@hoanmy.com
   - Password: Hmsg@2025

=== VÍ DỤ CỤ THỂ ===

Nếu tạo user với email: admin@hoanmy.com
Thì thay tất cả 'your-email@hoanmy.com' thành 'admin@hoanmy.com'

=== LƯU Ý ===

- Mật khẩu mặc định: Hmsg@2025
- Phải có User Metadata đầy đủ
- Auto Confirm User phải là YES
- Script này chỉ đồng bộ 1 user, không ảnh hưởng users khác
*/