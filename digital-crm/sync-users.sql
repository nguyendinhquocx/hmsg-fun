-- Script để đồng bộ Auth users với custom users table

-- Xóa users cũ (sample data)
DELETE FROM users;

-- Insert users với IDs từ auth.users
INSERT INTO users (id, email, full_name, team, role)
SELECT 
  auth.uid() as id,
  au.email,
  CASE 
    WHEN au.email = 'admin@hmsg.fun' THEN 'Administrator'
    WHEN au.email = 'user1@hmsg.fun' THEN 'Nhân viên Team B'
    WHEN au.email = 'user2@hmsg.fun' THEN 'Nhân viên Team A'
    ELSE 'Unknown User'
  END as full_name,
  CASE 
    WHEN au.email IN ('admin@hmsg.fun', 'user1@hmsg.fun') THEN 'b'
    ELSE 'a'
  END as team,
  CASE 
    WHEN au.email = 'admin@hmsg.fun' THEN 'admin'
    ELSE 'user'
  END as role
FROM auth.users au
WHERE au.email IN ('admin@hmsg.fun', 'user1@hmsg.fun', 'user2@hmsg.fun');

-- Kiểm tra kết quả
SELECT * FROM users;