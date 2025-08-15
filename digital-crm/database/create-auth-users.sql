-- Tạo auth users từ database users table
-- Password mặc định: 123456789 cho tất cả

-- Step 1: Xóa auth users hiện tại (nếu có)
DELETE FROM auth.users WHERE email LIKE '%@hoanmy.com';

-- Step 2: Tạo auth users từ database với cùng ID
INSERT INTO auth.users (
  id,
  instance_id,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_app_meta_data,
  raw_user_meta_data,
  is_super_admin,
  role
)
SELECT 
  u.id,
  '00000000-0000-0000-0000-000000000000'::uuid,
  u.email,
  crypt('123456789', gen_salt('bf')), -- Password: 123456789
  NOW(),
  u.created_at,
  u.updated_at,
  '{"provider": "email", "providers": ["email"]}',
  jsonb_build_object('full_name', u.full_name, 'team', u.team),
  false,
  'authenticated'
FROM public.users u
WHERE u.email LIKE '%@hoanmy.com';

-- Step 3: Tạo auth.identities cho email provider
INSERT INTO auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT 
  gen_random_uuid(),
  u.id,
  jsonb_build_object(
    'sub', u.id::text,
    'email', u.email,
    'email_verified', true
  ),
  'email',
  NOW(),
  u.created_at,
  u.updated_at
FROM public.users u
WHERE u.email LIKE '%@hoanmy.com';

-- Step 4: Verify tất cả đã sync
SELECT 
  'Auth users created:' as info,
  au.email,
  au.id as auth_id,
  u.id as db_id,
  u.full_name,
  u.team,
  u.role,
  CASE 
    WHEN au.id = u.id THEN '✅ PERFECT MATCH' 
    ELSE '❌ MISMATCH' 
  END as status
FROM auth.users au
JOIN public.users u ON au.email = u.email
WHERE au.email LIKE '%@hoanmy.com'
ORDER BY u.team, u.full_name;