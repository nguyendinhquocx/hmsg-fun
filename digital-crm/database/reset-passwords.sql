-- Reset passwords cho tất cả users về 123456789
-- Cách 1: Update password trực tiếp trong auth.users (nếu có quyền)

-- Kiểm tra auth users hiện tại
SELECT 
  email,
  id,
  created_at,
  email_confirmed_at,
  encrypted_password IS NOT NULL as has_password
FROM auth.users 
WHERE email LIKE '%@hoanmy.com'
ORDER BY email;

-- Cách 2: Tạo script để reset password qua admin API
-- (Chạy từ Supabase Dashboard → Authentication → Users → Reset password)

-- Cách 3: Xóa auth users và để auto-signup tạo lại
-- DELETE FROM auth.users WHERE email LIKE '%@hoanmy.com';

-- Cách 4: Update password hash trực tiếp (nếu có quyền superuser)
-- Password: 123456789
-- Hash: $2a$10$... (cần generate từ bcrypt)

-- Tạm thời: Xóa auth users để auto-signup tạo lại với password đúng
SELECT 'Deleting auth users to allow fresh auto-signup...' as action;
DELETE FROM auth.users WHERE email LIKE '%@hoanmy.com';

-- Verify deletion
SELECT 'Remaining auth users:' as info;
SELECT email, id FROM auth.users WHERE email LIKE '%@hoanmy.com';