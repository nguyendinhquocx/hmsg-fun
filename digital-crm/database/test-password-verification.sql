-- Test password verification cho specific user
SELECT 
  'Password verification test:' as info,
  email,
  length(encrypted_password) as hash_length,
  substring(encrypted_password, 1, 10) as hash_prefix,
  crypt('123456789', encrypted_password) = encrypted_password as password_matches_123456789,
  email_confirmed_at IS NOT NULL as email_confirmed,
  role,
  aud
FROM auth.users 
WHERE email = 'quynh.bui@hoanmy.com';

-- Test với vài users khác
SELECT 
  'Multiple users password test:' as info,
  email,
  crypt('123456789', encrypted_password) = encrypted_password as password_correct,
  email_confirmed_at IS NOT NULL as confirmed
FROM auth.users 
WHERE email IN ('quynh.bui@hoanmy.com', 'khanh.tran@hoanmy.com', 'quoc.nguyen3@hoanmy.com')
ORDER BY email;