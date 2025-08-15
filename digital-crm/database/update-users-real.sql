-- Update users table with real HMSG employees
-- Delete existing sample data
DELETE FROM users;

-- Insert real HMSG employees
INSERT INTO users (email, full_name, team, role) VALUES
  -- CHC Team (Team B - CÓ QUYỀN Digital CRM)
  ('khanh.tran@hoanmy.com', 'Trần Thị Khanh', 'b', 'user'),
  ('hong.le@hoanmy.com', 'Lê Thị Thúy Hồng', 'b', 'user'),
  ('quynh.bui@hoanmy.com', 'Bùi Thị Như Quỳnh', 'b', 'user'),
  ('thuy.pham@hoanmy.com', 'Phạm Thị Thanh Thùy', 'b', 'user'),
  
  -- Package Team (Team A - KHÔNG có quyền Digital CRM)
  ('anh.ngo@hoanmy.com', 'Ngô Thị Lan Anh', 'a', 'user'),
  ('truc.nguyen3@hoanmy.com', 'Nguyễn Thị Diễm Trúc', 'a', 'user'),
  
  -- Referral Team (Team A - KHÔNG có quyền Digital CRM)
  ('trang.nguyen9@hoanmy.com', 'Nguyễn Thị Xuân Trang', 'a', 'user'),
  ('tram.mai@hoanmy.com', 'Mai Lê Bảo Trâm', 'a', 'user'),
  ('vuong.duong@hoanmy.com', 'Dương Thanh Vương', 'a', 'user'),
  ('phong.trinh@hoanmy.com', 'Trịnh Vũ Phong', 'a', 'user'),
  
  -- PHI Team (Team A - KHÔNG có quyền Digital CRM)
  ('phi.tran@hoanmy.com', 'Trần Thị Phương Phi', 'a', 'user'),
  
  -- Admin (Full quyền - Team B + Admin role)
  ('quoc.nguyen3@hoanmy.com', 'Nguyễn Đình Quốc', 'b', 'admin'),
  
  -- Manager (Full quyền - Team B + Admin role)  
  ('luan.tran@hoanmy.com', 'Trần Hoàng Luân', 'b', 'admin')
ON CONFLICT (email) DO UPDATE SET
  full_name = EXCLUDED.full_name,
  team = EXCLUDED.team,
  role = EXCLUDED.role,
  updated_at = NOW();

-- Verify the data
SELECT email, full_name, team, role FROM users ORDER BY role DESC, full_name;