-- Fix team column type by dropping and recreating policies
-- Step 1: Drop existing policies that depend on team column
DROP POLICY IF EXISTS "Team b users can access companies" ON companies;
DROP POLICY IF EXISTS "CHC and Admin users can access companies" ON companies;

-- Step 2: Update the team column type
ALTER TABLE users ALTER COLUMN team DROP DEFAULT;
ALTER TABLE users ALTER COLUMN team TYPE VARCHAR(50);

-- Step 3: Update companies table team column
ALTER TABLE companies ALTER COLUMN team DROP DEFAULT;
ALTER TABLE companies ALTER COLUMN team TYPE VARCHAR(50);
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

-- Step 5: Delete existing sample data and insert real employees
DELETE FROM users;

-- Insert real HMSG employees with actual team names
INSERT INTO users (email, full_name, team, role) VALUES
  -- CHC Team (CÓ QUYỀN Digital CRM)
  ('khanh.tran@hoanmy.com', 'Trần Thị Khanh', 'CHC', 'user'),
  ('hong.le@hoanmy.com', 'Lê Thị Thúy Hồng', 'CHC', 'user'),
  ('quynh.bui@hoanmy.com', 'Bùi Thị Như Quỳnh', 'CHC', 'user'),
  ('thuy.pham@hoanmy.com', 'Phạm Thị Thanh Thùy', 'CHC', 'user'),
  
  -- Package Team (KHÔNG có quyền Digital CRM)
  ('anh.ngo@hoanmy.com', 'Ngô Thị Lan Anh', 'Package', 'user'),
  ('truc.nguyen3@hoanmy.com', 'Nguyễn Thị Diễm Trúc', 'Package', 'user'),
  
  -- Referral Team (KHÔNG có quyền Digital CRM)
  ('trang.nguyen9@hoanmy.com', 'Nguyễn Thị Xuân Trang', 'Referral', 'user'),
  ('tram.mai@hoanmy.com', 'Mai Lê Bảo Trâm', 'Referral', 'user'),
  ('vuong.duong@hoanmy.com', 'Dương Thanh Vương', 'Referral', 'user'),
  ('phong.trinh@hoanmy.com', 'Trịnh Vũ Phong', 'Referral', 'user'),
  
  -- PHI Team (KHÔNG có quyền Digital CRM)
  ('phi.tran@hoanmy.com', 'Trần Thị Phương Phi', 'PHI', 'user'),
  
  -- Admin (Full quyền)
  ('quoc.nguyen3@hoanmy.com', 'Nguyễn Đình Quốc', 'Admin', 'admin'),
  
  -- Manager (Full quyền)  
  ('luan.tran@hoanmy.com', 'Trần Hoàng Luân', 'Manager', 'admin')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  team = EXCLUDED.team,
  role = EXCLUDED.role,
  updated_at = NOW();

-- Verify the data
SELECT email, full_name, team, role FROM users ORDER BY role DESC, team, full_name;