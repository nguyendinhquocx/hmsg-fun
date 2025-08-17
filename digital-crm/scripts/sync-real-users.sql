-- Script để sync real users từ Supabase Auth vào bảng users
-- Chạy script này sau khi đã tạo real users trong Supabase Authentication

-- 1. Kiểm tra users hiện có trong Auth nhưng chưa có trong bảng users
SELECT 
  au.id,
  au.email,
  au.raw_user_meta_data->>'full_name' as full_name,
  au.raw_user_meta_data->>'team' as team,
  au.raw_user_meta_data->>'role' as role,
  au.created_at
FROM auth.users au
LEFT JOIN users u ON au.id = u.id
WHERE u.id IS NULL  -- Users chưa có trong bảng
  AND au.email NOT LIKE '%@test.com'  -- Bỏ qua test users
  AND au.raw_user_meta_data->>'team' = 'CHC';  -- Chỉ users thuộc team 'CHC'

-- 2. Sync users từ Auth vào bảng users
INSERT INTO users (id, email, full_name, team, role, created_at, updated_at)
SELECT 
  au.id,
  au.email,
  COALESCE(
    au.raw_user_meta_data->>'full_name', 
    split_part(au.email, '@', 1)
  ) as full_name,
  COALESCE(
    au.raw_user_meta_data->>'team', 
    'b'
  ) as team,
  COALESCE(
    au.raw_user_meta_data->>'role', 
    'user'
  ) as role,
  au.created_at,
  NOW() as updated_at
FROM auth.users au
LEFT JOIN users u ON au.id = u.id
WHERE u.id IS NULL  -- Chỉ thêm users chưa có trong bảng
  AND au.email NOT LIKE '%@test.com'  -- Bỏ qua test users
  AND au.raw_user_meta_data->>'team' = 'CHC'  -- Chỉ users thuộc team 'CHC'
  AND au.email IS NOT NULL;  -- Đảm bảo có email

-- 3. Kiểm tra kết quả sau khi sync
SELECT 
  u.id,
  u.email,
  u.full_name,
  u.team,
  u.role,
  u.created_at
FROM users u
WHERE u.email NOT LIKE '%@test.com'
ORDER BY u.created_at DESC;

-- 4. Cập nhật thông tin users nếu metadata thay đổi
UPDATE users 
SET 
  full_name = COALESCE(
    (SELECT au.raw_user_meta_data->>'full_name' 
     FROM auth.users au 
     WHERE au.id = users.id), 
    users.full_name
  ),
  team = COALESCE(
    (SELECT au.raw_user_meta_data->>'team' 
     FROM auth.users au 
     WHERE au.id = users.id), 
    users.team
  ),
  role = COALESCE(
    (SELECT au.raw_user_meta_data->>'role' 
     FROM auth.users au 
     WHERE au.id = users.id), 
    users.role
  ),
  updated_at = NOW()
WHERE users.email NOT LIKE '%@test.com';

-- 5. Xóa test users (chạy khi không cần nữa)
-- CẢNH BÁO: Chỉ chạy khi chắc chắn muốn xóa test users!
/*
DELETE FROM users 
WHERE email IN (
  'admin@test.com',
  'manager@test.com', 
  'user@test.com'
);
*/

-- 6. Kiểm tra tổng số users
SELECT 
  'Total users in database' as description,
  COUNT(*) as count
FROM users
UNION ALL
SELECT 
  'Real users (non-test)' as description,
  COUNT(*) as count
FROM users 
WHERE email NOT LIKE '%@test.com'
UNION ALL
SELECT 
  'Test users' as description,
  COUNT(*) as count
FROM users 
WHERE email LIKE '%@test.com';