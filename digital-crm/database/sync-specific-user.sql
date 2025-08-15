-- Sync specific user: quynh.bui@hoanmy.com
-- Auth ID: 62f3774a-7cd2-41f0-a116-3a1848eadc0b
-- Database ID: c6bbf13d-affa-4ad6-97e2-bc27e760ce81

-- Option 1: Update database ID to match auth ID
UPDATE public.users 
SET id = '62f3774a-7cd2-41f0-a116-3a1848eadc0b',
    updated_at = NOW()
WHERE email = 'quynh.bui@hoanmy.com';

-- Verify sync
SELECT 
  'After sync:' as info,
  au.email,
  au.id as auth_id,
  u.id as db_id,
  u.full_name,
  u.team,
  CASE 
    WHEN au.id = u.id THEN '✅ SYNCED' 
    ELSE '❌ MISMATCH' 
  END as status
FROM auth.users au
JOIN public.users u ON au.email = u.email
WHERE au.email = 'quynh.bui@hoanmy.com';

-- Option 2: Sync all mismatched users at once
-- UPDATE public.users 
-- SET id = auth.users.id,
--     updated_at = NOW()
-- FROM auth.users 
-- WHERE public.users.email = auth.users.email 
--   AND public.users.id != auth.users.id;