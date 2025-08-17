-- Script khôi phục dữ liệu bảng users từ auth.users
-- Chạy script này để khôi phục dữ liệu đã bị xóa nhầm

-- Kiểm tra dữ liệu hiện tại trong bảng users
SELECT COUNT(*) as current_users_count FROM public.users;

-- Kiểm tra dữ liệu trong auth.users
SELECT 
  COUNT(*) as auth_users_count,
  STRING_AGG(email, ', ') as emails
FROM auth.users;

-- Khôi phục tất cả users từ auth.users vào public.users
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
WHERE NOT EXISTS (
  SELECT 1 FROM public.users pu WHERE pu.id = au.id
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  team = EXCLUDED.team,
  role = EXCLUDED.role,
  updated_at = NOW();

-- Kiểm tra kết quả sau khi khôi phục
SELECT 
  COUNT(*) as restored_users_count,
  STRING_AGG(email, ', ') as restored_emails
FROM public.users;

-- Hiển thị chi tiết users đã khôi phục
SELECT 
  email,
  full_name,
  team,
  role,
  created_at
FROM public.users 
ORDER BY created_at DESC;

-- Thống kê theo team
SELECT 
  team,
  COUNT(*) as count,
  STRING_AGG(full_name, ', ' ORDER BY full_name) as members
FROM public.users 
GROUP BY team
ORDER BY team;

/*
=== HƯỚNG DẪN SỬ DỤNG ===

1. Chạy script này trong Supabase SQL Editor
2. Script sẽ:
   - Kiểm tra số lượng users hiện tại
   - Khôi phục tất cả users từ auth.users
   - Hiển thị kết quả khôi phục

3. Nếu vẫn không có dữ liệu, có thể:
   - Auth.users cũng bị xóa
   - Cần tạo lại users từ đầu

=== NGUYÊN NHÂN VẤN ĐỀ ===

Script create-hoanmy-staff.sql có lệnh:
DELETE FROM public.users WHERE email LIKE '%@example.com';

Có thể đã xóa nhầm dữ liệu khác nếu:
- Có users với email chứa @example.com
- Hoặc có lỗi trong điều kiện WHERE

=== PHÒNG TRÁNH TƯƠNG LAI ===

1. Luôn backup trước khi chạy script DELETE
2. Sử dụng điều kiện WHERE cụ thể hơn
3. Test script trên môi trường dev trước
*/