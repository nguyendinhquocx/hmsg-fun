# Digital CRM - Mini PRD

## 🎯 Goal
Tạo ứng dụng web quản lý cơ hội kinh doanh cho phòng kinh doanh, thay thế quy trình Google Sheet/Excel, giúp nhập liệu, theo dõi, thống kê, đồng bộ dữ liệu hiệu quả và tự động gửi báo cáo cho các nhóm liên quan.

## 👥 Target Users
- Trưởng phòng kinh doanh (admin, quản lý nhiều team)
- Nhân viên từng team (đặc biệt team b với module "Digital")
- Nhóm nhận báo cáo qua email (có thể là quản lý cấp cao, bộ phận khác...)

## ✅ Features (MVP - Version 1)
- Đăng nhập tài khoản (email/password), đổi mật khẩu sau khi đăng nhập lần đầu
- Phân quyền theo team (chỉ team b được truy cập module Digital)
- Dashboard card thống kê động (Tổng số công ty, số công ty trong tháng hiện tại, % tăng trưởng/sụt giảm cùng kỳ năm trước)
- Thêm/xoá/sửa công ty (CRUD) với các trường chuẩn hóa, filter động
- Đồng bộ dữ liệu 1 chiều: Khi CRUD trên web sẽ cập nhật Google Sheet (báo lỗi nếu sync thất bại)
- Gửi báo cáo Excel qua email định kỳ (cấu hình danh sách email, file Excel đúng mẫu, gửi tự động mỗi Thứ Hai 7-8h sáng)
- Giao diện mobile-first, thao tác nhanh, xuất/backup dữ liệu dễ dàng

## 🚫 Not Included (V1)
- Sửa trực tiếp trên Google Sheet và đồng bộ ngược lại
- Báo cáo nâng cao, phân tích AI
- Phân quyền phức tạp nhiều cấp (ngoài admin/team/user)
- Đồng bộ real-time hai chiều
- Quy trình duyệt tự động hoặc nhắc nhở nội bộ

## 🎨 Design Direction
- Style: Hiện đại, tối giản, tập trung vào thao tác nhanh
- Inspiration: Airtable, Notion, Google Sheets (UI dễ dùng, có filter/search mạnh)
- Mood: Tin cậy, chuyên nghiệp, nhanh chóng

## 🔧 Tech Preferences
- Frontend: Next.js (React) + Tailwind CSS
- Backend: Supabase (PostgreSQL, Auth, REST API)
- Hosting: Netlify (custom domain hmsg.fun)
- Đồng bộ: Google Sheets API (qua serverless function)
- Email: Netlify Scheduled Functions + dịch vụ SMTP/SendGrid
- Timeline: 5-7 ngày build MVP, live production ngay khi xong

## ✅ Success Criteria
- 100% nhân viên nhập liệu trên web, không dùng lại Sheet cũ
- Thời gian nhập liệu < 1 phút/công ty, không lỗi field
- Dashboard/card thống kê động đúng filter
- Báo cáo Excel gửi mail đầy đủ, đúng lịch
- Supabase và Google Sheet luôn đồng bộ 1 chiều (web → sheet)

## 📱 Device Support
- [x] Desktop
- [x] Tablet  
- [x] Mobile
- [x] All responsive

## 🎯 Performance Goals
- Load time: < 3 seconds typical
- Lighthouse score: > 90
- SEO needs: Không quan trọng (nội bộ)

---
*Estimated completion time: 5-7 ngày*
*Last updated: 2025-08-12*