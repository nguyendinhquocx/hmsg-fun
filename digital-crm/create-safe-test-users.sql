-- Script tạo test users an toàn
-- Chỉ tạo users với email @test.local để tránh xung đột

-- Kiểm tra dữ liệu hiện tại
SELECT 
  'Current users count:' as info,
  COUNT(*) as count
FROM public.users;

-- Tạo test users an toàn (chỉ trong bảng users để test UI)
-- Sử dụng domain @test.local để tránh xung đột
INSERT INTO public.users (id, email, full_name, team, role, created_at)
VALUES 
  (gen_random_uuid(), 'admin@test.local', 'Admin Test', 'Digital', 'admin', NOW()),
  (gen_random_uuid(), 'user1@test.local', 'User Test 1', 'CHC', 'user', NOW()),
  (gen_random_uuid(), 'user2@test.local', 'User Test 2', 'Package', 'user', NOW()),
  (gen_random_uuid(), 'user3@test.local', 'User Test 3', 'Referral', 'user', NOW())
ON CONFLICT (email) DO NOTHING;

-- Kiểm tra kết quả
SELECT 
  'Test users created:' as info,
  COUNT(*) as count
FROM public.users 
WHERE email LIKE '%@test.local';

-- Hiển thị tất cả users
SELECT 
  email,
  full_name,
  team,
  role,
  CASE 
    WHEN email LIKE '%@test.local' THEN 'TEST USER'
    ELSE 'REAL USER'
  END as user_type,
  created_at
FROM public.users 
ORDER BY 
  CASE WHEN email LIKE '%@test.local' THEN 1 ELSE 0 END,
  created_at DESC;

/*
=== HƯỚNG DẪN ===

1. Script này tạo test users an toàn với domain @test.local
2. Không ảnh hưởng đến dữ liệu thật
3. Dễ dàng xóa test users:
   DELETE FROM public.users WHERE email LIKE '%@test.local';

=== LƯU Ý ===

- Test users này chỉ có trong bảng public.users
- KHÔNG có Supabase Auth accounts tương ứng
- Chỉ dùng để test giao diện, không thể login
- Để test login, sử dụng create-staff-api.js
*/