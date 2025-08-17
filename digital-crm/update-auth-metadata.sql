-- Script để cập nhật metadata trong auth.users
-- Cập nhật raw_user_meta_data để dashboard có thể đọc team và role

-- Admin user
UPDATE auth.users 
SET raw_user_meta_data = jsonb_build_object(
  'full_name', 'Administrator',
  'team', 'b',
  'role', 'admin'
)
WHERE email = 'admin@hmsg.fun';

-- User 1 - Team B
UPDATE auth.users 
SET raw_user_meta_data = jsonb_build_object(
  'full_name', 'Nhân viên Team B',
  'team', 'b', 
  'role', 'user'
)
WHERE email = 'user1@hmsg.fun';

-- User 2 - Team A  
UPDATE auth.users 
SET raw_user_meta_data = jsonb_build_object(
  'full_name', 'Nhân viên Team A',
  'team', 'a',
  'role', 'user'
)
WHERE email = 'user2@hmsg.fun';

-- Kiểm tra kết quả
SELECT email, raw_user_meta_data FROM auth.users WHERE email IN ('admin@hmsg.fun', 'user1@hmsg.fun', 'user2@hmsg.fun');