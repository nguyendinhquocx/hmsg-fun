-- Fix identities without email column (it's generated)
-- Tạo identities nếu thiếu - không include email column

-- Kiểm tra identities hiện tại
SELECT 
  'Current identities:' as info,
  COUNT(*) as total
FROM auth.identities 
WHERE provider = 'email';

-- Tạo identities cho users không có
INSERT INTO auth.identities (
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at
)
SELECT 
  u.email,
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
FROM auth.users u
WHERE u.email LIKE '%@hoanmy.com'
  AND NOT EXISTS (
    SELECT 1 FROM auth.identities i 
    WHERE i.user_id = u.id AND i.provider = 'email'
  );

-- Verify sau khi tạo
SELECT 
  'After fix:' as info,
  au.email,
  ai.provider,
  ai.provider_id
FROM auth.users au
JOIN auth.identities ai ON au.id = ai.user_id
WHERE au.email LIKE '%@hoanmy.com'
  AND ai.provider = 'email'
ORDER BY au.email
LIMIT 5;