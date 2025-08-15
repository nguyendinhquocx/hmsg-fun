-- Kiểm tra auth.identities table
SELECT 
  'Identities check:' as info,
  COUNT(*) as total_identities
FROM auth.identities 
WHERE provider = 'email';

-- Kiểm tra có identities cho users không
SELECT 
  'User identities:' as info,
  au.email,
  ai.provider,
  ai.provider_id IS NOT NULL as has_provider_id
FROM auth.users au
LEFT JOIN auth.identities ai ON au.id = ai.user_id
WHERE au.email LIKE '%@hoanmy.com'
ORDER BY au.email
LIMIT 5;

-- Tạo identities nếu thiếu
INSERT INTO auth.identities (
  provider_id,
  user_id,
  identity_data,
  provider,
  last_sign_in_at,
  created_at,
  updated_at,
  email
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
  u.updated_at,
  u.email
FROM auth.users u
WHERE u.email LIKE '%@hoanmy.com'
  AND NOT EXISTS (
    SELECT 1 FROM auth.identities i 
    WHERE i.user_id = u.id AND i.provider = 'email'
  );

-- Verify identities created
SELECT 
  'After creating identities:' as info,
  COUNT(*) as total_identities
FROM auth.identities 
WHERE provider = 'email' 
  AND email LIKE '%@hoanmy.com';