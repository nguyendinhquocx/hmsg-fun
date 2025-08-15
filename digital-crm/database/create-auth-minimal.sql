-- Tạo auth users tối thiểu - chỉ required columns
-- Password: 123456789

-- Step 1: Xóa auth users cũ
DELETE FROM auth.users WHERE email LIKE '%@hoanmy.com';

-- Step 2: Tạo auth users với minimal columns
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  role,
  aud
)
SELECT 
  u.id,
  '00000000-0000-0000-0000-000000000000'::uuid,
  u.email,
  crypt('123456789', gen_salt('bf')),
  NOW(),
  u.created_at,
  u.updated_at,
  'authenticated',
  'authenticated'
FROM public.users u
WHERE u.email LIKE '%@hoanmy.com';

-- Step 3: Verify
SELECT 
  'Created auth users:' as info,
  COUNT(*) as total
FROM auth.users 
WHERE email LIKE '%@hoanmy.com';

-- Step 4: Check perfect match
SELECT 
  au.email,
  au.id as auth_id,
  u.id as db_id,
  u.full_name,
  u.team,
  CASE 
    WHEN au.id = u.id THEN '✅ PERFECT' 
    ELSE '❌ MISMATCH' 
  END as status
FROM auth.users au
JOIN public.users u ON au.email = u.email
WHERE au.email LIKE '%@hoanmy.com'
ORDER BY u.team, u.full_name;