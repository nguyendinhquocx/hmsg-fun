-- Complete fix for RLS policy conflicts
-- Step 1: Drop ALL existing policies on companies table
DROP POLICY IF EXISTS "Team b users can access companies" ON companies;
DROP POLICY IF EXISTS "CHC and Admin users can access companies" ON companies;
DROP POLICY IF EXISTS "Allow team b users access companies" ON companies;

-- Step 2: Check if there are any other policies and drop them
-- Get all policies on companies table first
-- SELECT policyname FROM pg_policies WHERE tablename = 'companies';

-- If you see any other policies, drop them manually like:
-- DROP POLICY IF EXISTS "policy_name_here" ON companies;

-- Step 3: Now we can safely alter the columns
ALTER TABLE users ALTER COLUMN team DROP DEFAULT;
ALTER TABLE users ALTER COLUMN team TYPE VARCHAR(100);

ALTER TABLE companies ALTER COLUMN team DROP DEFAULT; 
ALTER TABLE companies ALTER COLUMN team TYPE VARCHAR(100);
ALTER TABLE companies ALTER COLUMN team SET DEFAULT 'CHC';

-- Step 4: Recreate the policy with new team logic
CREATE POLICY "CHC and Admin users can access companies" ON companies
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id::text = auth.uid()::text 
      AND (team = 'CHC' OR role = 'admin')
    )
  );

-- Step 5: Clear existing data and insert real employees
DELETE FROM users;

-- Insert real HMSG employees
INSERT INTO users (email, full_name, team, role) VALUES
  -- CHC Team (CÓ QUYỀN Digital CRM)
  ('khanh.tran@hoanmy.com', 'Trần Thị Khanh', 'CHC', 'user'),
  ('hong.le@hoanmy.com', 'Lê Thị Thúy Hồng', 'CHC', 'user'),
  ('quynh.bui@hoanmy.com', 'Bùi Thị Như Quỳnh', 'CHC', 'user'),
  ('thuy.pham@hoanmy.com', 'Phạm Thị Thanh Thùy', 'CHC', 'user'),
  
  -- Package Team
  ('anh.ngo@hoanmy.com', 'Ngô Thị Lan Anh', 'Package', 'user'),
  ('truc.nguyen3@hoanmy.com', 'Nguyễn Thị Diễm Trúc', 'Package', 'user'),
  
  -- Referral Team
  ('trang.nguyen9@hoanmy.com', 'Nguyễn Thị Xuân Trang', 'Referral', 'user'),
  ('tram.mai@hoanmy.com', 'Mai Lê Bảo Trâm', 'Referral', 'user'),
  ('vuong.duong@hoanmy.com', 'Dương Thanh Vương', 'Referral', 'user'),
  ('phong.trinh@hoanmy.com', 'Trịnh Vũ Phong', 'Referral', 'user'),
  
  -- PHI Team
  ('phi.tran@hoanmy.com', 'Trần Thị Phương Phi', 'PHI', 'user'),
  
  -- Admin & Manager
  ('quoc.nguyen3@hoanmy.com', 'Nguyễn Đình Quốc', 'Admin', 'admin'),
  ('luan.tran@hoanmy.com', 'Trần Hoàng Luân', 'Manager', 'admin')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  team = EXCLUDED.team,
  role = EXCLUDED.role,
  updated_at = NOW();

-- Step 6: Verify results
SELECT 'Policies on companies table:' as info;
SELECT policyname FROM pg_policies WHERE tablename = 'companies';

SELECT 'Users data:' as info;
SELECT email, full_name, team, role FROM users ORDER BY role DESC, team, full_name;