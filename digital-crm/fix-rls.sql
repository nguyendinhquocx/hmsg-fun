-- Sửa RLS policies

-- Drop old policies
DROP POLICY IF EXISTS "Users can read own data" ON users;
DROP POLICY IF EXISTS "Admins can manage users" ON users;
DROP POLICY IF EXISTS "Team b users can access companies" ON companies;
DROP POLICY IF EXISTS "Admins can manage email configs" ON email_configs;
DROP POLICY IF EXISTS "Admins can read sync logs" ON sync_logs;

-- New simplified policies

-- Users can read their own data
CREATE POLICY "Users can read own data" ON users
  FOR SELECT USING (auth.uid() = id);

-- Users can read all users (needed for team checking)
CREATE POLICY "Users can read all users" ON users
  FOR SELECT USING (true);

-- Team b users can access companies
CREATE POLICY "Team b users can access companies" ON companies
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND team = 'CHC'
    )
  );

-- Admins can manage email configs
CREATE POLICY "Admins can manage email configs" ON email_configs
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Admins can read sync logs
CREATE POLICY "Admins can read sync logs" ON sync_logs
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() 
      AND role = 'admin'
    )
  );

-- Allow service role to insert sync logs
CREATE POLICY "Service role can insert sync logs" ON sync_logs
  FOR INSERT WITH CHECK (true);