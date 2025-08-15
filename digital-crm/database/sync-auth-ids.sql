-- Sync auth user IDs với database user records
-- Lấy danh sách auth users và update IDs trong bảng users

-- Kiểm tra users trong auth vs database
SELECT 
  au.email as auth_email,
  au.id as auth_id,
  u.email as db_email,
  u.id as db_id,
  CASE 
    WHEN au.id = u.id THEN 'SYNCED' 
    ELSE 'MISMATCH' 
  END as status
FROM auth.users au
FULL OUTER JOIN public.users u ON au.email = u.email
ORDER BY au.email;

-- Update database user IDs to match auth IDs
-- Chỉ update nếu email match nhưng ID khác
UPDATE public.users 
SET id = auth.users.id,
    updated_at = NOW()
FROM auth.users 
WHERE public.users.email = auth.users.email 
  AND public.users.id != auth.users.id;

-- Verify sau khi update
SELECT 
  au.email,
  au.id as auth_id,
  u.id as db_id,
  u.full_name,
  u.team,
  u.role,
  CASE 
    WHEN au.id = u.id THEN '✅ SYNCED' 
    ELSE '❌ MISMATCH' 
  END as status
FROM auth.users au
JOIN public.users u ON au.email = u.email
ORDER BY u.team, u.full_name;