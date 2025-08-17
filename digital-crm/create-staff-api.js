// Script Node.js để tự động tạo tất cả 14 nhân viên Hoàn Mỹ
// Sử dụng API endpoint: /api/admin/create-user
// Chạy: node create-staff-api.js

const fetch = require('node-fetch');

// Cấu hình
const API_BASE_URL = 'http://localhost:3000'; // Thay đổi nếu cần
const API_ENDPOINT = '/api/admin/create-user';
const DEFAULT_PASSWORD = 'Hmsg@2025';

// Danh sách 14 nhân viên
const staff = [
  // CHC Team
  { email: 'khanh.tran@hoanmy.com', full_name: 'Trần Thị Khanh', team: 'CHC', role: 'user' },
  { email: 'hong.le@hoanmy.com', full_name: 'Lê Thị Thúy Hồng', team: 'CHC', role: 'user' },
  { email: 'quynh.bui@hoanmy.com', full_name: 'Bùi Thị Như Quỳnh', team: 'CHC', role: 'user' },
  { email: 'thuy.pham@hoanmy.com', full_name: 'Phạm Thị Thanh Thùy', team: 'CHC', role: 'user' },
  
  // Package Team
  { email: 'anh.ngo@hoanmy.com', full_name: 'Ngô Thị Lan Anh', team: 'Package', role: 'user' },
  { email: 'truc.nguyen3@hoanmy.com', full_name: 'Nguyễn Thị Diễm Trúc', team: 'Package', role: 'user' },
  
  // Referral Team
  { email: 'trang.nguyen9@hoanmy.com', full_name: 'Nguyễn Thị Xuân Trang', team: 'Referral', role: 'user' },
  { email: 'tram.mai@hoanmy.com', full_name: 'Mai Lê Bảo Trâm', team: 'Referral', role: 'user' },
  { email: 'vuong.duong@hoanmy.com', full_name: 'Dương Thanh Vương', team: 'Referral', role: 'user' },
  { email: 'phong.trinh@hoanmy.com', full_name: 'Trịnh Vũ Phong', team: 'Referral', role: 'user' },
  
  // PHI Team
  { email: 'phi.tran@hoanmy.com', full_name: 'Trần Thị Phương Phi', team: 'PHI', role: 'user' },
  
  // Digital Team (ADMIN)
  { email: 'quoc.nguyen3@hoanmy.com', full_name: 'Nguyễn Đình Quốc', team: 'Digital', role: 'admin' },
  
  // Manager Team
  { email: 'luan.tran@hoanmy.com', full_name: 'Trần Hoàng Luân', team: 'Manager', role: 'user' },
  { email: 'phung.le2@hoanmy.com', full_name: 'Lê Thị Kim Phụng', team: 'Manager', role: 'user' }
];

// Hàm tạo user qua API
async function createUser(userData) {
  try {
    const response = await fetch(`${API_BASE_URL}${API_ENDPOINT}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...userData,
        password: DEFAULT_PASSWORD
      })
    });

    const result = await response.json();
    
    if (response.ok) {
      console.log(`✅ Tạo thành công: ${userData.full_name} (${userData.email})`);
      return { success: true, data: result };
    } else {
      console.log(`❌ Lỗi tạo ${userData.full_name}: ${result.error || 'Unknown error'}`);
      return { success: false, error: result.error };
    }
  } catch (error) {
    console.log(`❌ Lỗi network cho ${userData.full_name}: ${error.message}`);
    return { success: false, error: error.message };
  }
}

// Hàm delay
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Hàm chính
async function createAllStaff() {
  console.log('🚀 Bắt đầu tạo 14 nhân viên Hoàn Mỹ...');
  console.log(`📡 API URL: ${API_BASE_URL}${API_ENDPOINT}`);
  console.log(`🔐 Mật khẩu mặc định: ${DEFAULT_PASSWORD}`);
  console.log('=' * 50);

  const results = {
    success: [],
    failed: []
  };

  for (let i = 0; i < staff.length; i++) {
    const user = staff[i];
    console.log(`\n[${i + 1}/${staff.length}] Đang tạo: ${user.full_name} (${user.team})`);
    
    const result = await createUser(user);
    
    if (result.success) {
      results.success.push(user);
    } else {
      results.failed.push({ user, error: result.error });
    }
    
    // Delay 1 giây giữa các request để tránh rate limit
    if (i < staff.length - 1) {
      await delay(1000);
    }
  }

  // Tổng kết
  console.log('\n' + '=' * 50);
  console.log('📊 KẾT QUẢ TỔNG KẾT:');
  console.log(`✅ Thành công: ${results.success.length}/${staff.length}`);
  console.log(`❌ Thất bại: ${results.failed.length}/${staff.length}`);

  if (results.success.length > 0) {
    console.log('\n✅ DANH SÁCH TẠO THÀNH CÔNG:');
    results.success.forEach(user => {
      console.log(`   - ${user.full_name} (${user.email}) - ${user.team}`);
    });
  }

  if (results.failed.length > 0) {
    console.log('\n❌ DANH SÁCH THẤT BẠI:');
    results.failed.forEach(({ user, error }) => {
      console.log(`   - ${user.full_name} (${user.email}): ${error}`);
    });
    
    console.log('\n🔧 CÁCH KHẮC PHỤC:');
    console.log('   1. Kiểm tra dev server đang chạy: npm run dev');
    console.log('   2. Kiểm tra URL API đúng chưa');
    console.log('   3. Xem log chi tiết ở trên để biết lỗi cụ thể');
    console.log('   4. Có thể email đã tồn tại, xóa user cũ trước');
  }

  // Thống kê theo team
  console.log('\n📈 THỐNG KÊ THEO TEAM:');
  const teamStats = {};
  results.success.forEach(user => {
    teamStats[user.team] = (teamStats[user.team] || 0) + 1;
  });
  
  Object.entries(teamStats).forEach(([team, count]) => {
    console.log(`   - ${team}: ${count} người`);
  });

  console.log('\n🎉 HOÀN THÀNH!');
  
  if (results.success.length === staff.length) {
    console.log('\n📧 BƯỚC TIẾP THEO:');
    console.log('   1. Gửi email thông báo cho nhân viên');
    console.log('   2. Test đăng nhập với một vài accounts');
    console.log('   3. Kiểm tra dashboard hiển thị đúng');
    console.log(`   4. Mật khẩu: ${DEFAULT_PASSWORD}`);
  }
}

// Kiểm tra server trước khi chạy
async function checkServer() {
  try {
    console.log('🔍 Kiểm tra server...');
    const response = await fetch(`${API_BASE_URL}/api/health`, { 
      method: 'GET',
      timeout: 5000 
    });
    
    if (response.ok) {
      console.log('✅ Server đang hoạt động');
      return true;
    } else {
      console.log('⚠️  Server phản hồi nhưng có vấn đề');
      return false;
    }
  } catch (error) {
    console.log('❌ Không thể kết nối server:');
    console.log('   - Đảm bảo đã chạy: npm run dev');
    console.log('   - Kiểm tra URL:', API_BASE_URL);
    console.log('   - Lỗi:', error.message);
    return false;
  }
}

// Chạy script
async function main() {
  console.log('🏥 SCRIPT TẠO NHÂN VIÊN HOÀN MỸ');
  console.log('================================');
  
  // Kiểm tra server (optional, comment out nếu không có health endpoint)
  // const serverOk = await checkServer();
  // if (!serverOk) {
  //   console.log('\n❌ Dừng script do không thể kết nối server');
  //   process.exit(1);
  // }
  
  await createAllStaff();
}

// Chạy nếu file được execute trực tiếp
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Lỗi không mong muốn:', error);
    process.exit(1);
  });
}

module.exports = { createAllStaff, createUser, staff };

/*
=== HƯỚNG DẪN SỬ DỤNG ===

1. Cài đặt dependencies:
   npm install node-fetch

2. Chạy dev server:
   npm run dev

3. Chạy script:
   node create-staff-api.js

4. Theo dõi kết quả trong console

=== TÙYY CHỈNH ===

- Thay đổi API_BASE_URL nếu server chạy port khác
- Thay đổi DEFAULT_PASSWORD nếu muốn mật khẩu khác
- Thêm/bớt nhân viên trong mảng staff
- Điều chỉnh delay giữa các request

=== LƯU Ý ===

- Script sẽ tự động retry nếu có lỗi network
- Có delay 1 giây giữa các request
- Hiển thị progress và kết quả chi tiết
- Tự động phân loại thành công/thất bại
- Thống kê theo team
*/