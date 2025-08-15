-- Debug auth login issues
-- Kiểm tra auth.users data quality

-- 1. Kiểm tra auth users structure
SELECT 
  'Auth users structure:' as info,
  email,
  id,
  created_at,
  email_confirmed_at IS NOT NULL as email_confirmed,
  encrypted_password IS NOT NULL as has_password,
  length(encrypted_password) as password_length,
  role,
  aud,
  instance_id
FROM auth.users 
WHERE email LIKE '%@hoanmy.com'
ORDER BY email
LIMIT 5;

-- 2. Kiểm tra specific user để test
SELECT 
  'Specific user check:' as info,
  email,
  id,
  encrypted_password IS NOT NULL as has_password,
  email_confirmed_at,
  role,
  aud
FROM auth.users 
WHERE email = 'quynh.bui@hoanmy.com';

-- 3. Verify password hash (test with known password)
-- Try to verify if password '123456789' matches stored hash
SELECT 
  'Password verification:' as info,
  email,
  crypt('123456789', encrypted_password) = encrypted_password as password_match
FROM auth.users 
WHERE email = 'quynh.bui@hoanmy.com';

-- 4. Kiểm tra required fields
SELECT 
  'Missing required fields:' as info,
  email,
  CASE 
    WHEN instance_id IS NULL THEN 'missing instance_id'
    WHEN aud IS NULL THEN 'missing aud'
    WHEN role IS NULL THEN 'missing role'
    WHEN email_confirmed_at IS NULL THEN 'missing email_confirmed_at'
    WHEN encrypted_password IS NULL THEN 'missing encrypted_password'
    ELSE 'all_fields_present'
  END as status
FROM auth.users 
WHERE email LIKE '%@hoanmy.com'
ORDER BY email;