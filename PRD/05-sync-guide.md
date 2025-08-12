# Digital CRM - Google Sheet Sync & Email Automation Guide

## 🔄 Google Sheet Sync Integration

### 1. **Purpose**
- Tự động đồng bộ dữ liệu công ty từ Supabase lên Google Sheet khi có thao tác Thêm/Sửa/Xoá trên web.
- Đảm bảo dữ liệu trên Google Sheet luôn là bản sao “xuất báo cáo” của Supabase (1 chiều, không sửa trực tiếp trên Sheet).

---

### 2. **Kiến trúc & Luồng Đồng Bộ**

**User (web) → API → Supabase → Google Sheet**

1. **CRUD Công ty trên web:**
    - Khi user thêm, sửa, xoá, frontend gọi API backend.
    - API:
        1. Ghi dữ liệu vào Supabase (Postgres).
        2. Gọi cloud function (Netlify Function/Next.js API) để đồng bộ dữ liệu lên Google Sheet thông qua Google Sheets API.
        3. Nếu lỗi, trả về thông báo cho user; log trạng thái để admin kiểm tra lại.

2. **Google Sheet lưu dữ liệu gì?**
    - Mỗi dòng = 1 công ty.
    - Các trường: Tên, mã số, lĩnh vực, liên hệ, team, ngày tạo/cập nhật, v.v.
    - Cột ID để mapping với dữ liệu Supabase.

---

### 3. **Hướng dẫn thiết lập Google Sheet API**

**A. Tạo Google Sheet:**
- Tạo 1 file Google Sheet mới, đặt tên “Digital CRM Data”.
- Ghi rõ header các cột: id, name, sector, contact, team, created_at, updated_at, ...

**B. Cấp quyền cho Service Account:**
- Tạo project trên Google Cloud Console.
- Bật Google Sheets API.
- Tạo Service Account, cấp quyền Editor cho file sheet.
- Lấy file credentials.json (hoặc env vars: client_email, private_key).

**C. Chia sẻ file sheet cho email service account (dạng `xxxx@xxxx.iam.gserviceaccount.com`).**

**D. Lưu lại Sheet ID (lấy từ URL).**

---

### 4. **Tích hợp vào ứng dụng**

**A. Serverless Function (Netlify/Next.js API):**
- Sử dụng thư viện `googleapis` (Node.js) để kết nối Google Sheets API.
- Mỗi lần CRUD thành công ở Supabase, gọi hàm này để:
    - Thêm dòng mới (appendRow)
    - Sửa dòng (updateRow theo ID)
    - Xoá dòng (deleteRow theo ID)
- Xử lý lỗi (mạng, quota, sheet bị lock) → trả về lỗi cho frontend & lưu log.

**Ví dụ:**
```js
// Pseudo-code for sync
await supabaseClient.insert('companies', data); // 1. Ghi DB
await syncGoogleSheet('add', data);             // 2. Gọi hàm đồng bộ
if (syncError) { 
  logSyncError(data, error); 
  return errorToUser();
}
```

**B. Retry / Xử lý lỗi đồng bộ:**
- Nếu đồng bộ lỗi, lưu lại bản ghi “pending sync” trong Supabase (bảng logs).
- Admin có thể chạy lại sync thủ công hoặc lên lịch tự động “retry” (cron job chạy mỗi 5 phút).

---

## 📧 Email Automation – Gửi Báo Cáo Excel Định Kỳ

### 1. **Mục đích**
- Tự động gửi file Excel báo cáo (dữ liệu công ty team Digital) qua email cho danh sách đã cấu hình, mỗi Thứ Hai hàng tuần (7-8h sáng).

### 2. **Luồng hoạt động**
1. Netlify Scheduled Function (hoặc Next.js CRON) chạy vào khung giờ định sẵn.
2. Lấy danh sách công ty từ Supabase (filter theo team b, trạng thái, v.v.).
3. Chuyển data sang file Excel (`xlsx` hoặc `exceljs`).
4. Lấy danh sách email nhận báo cáo từ bảng cấu hình.
5. Gửi email kèm file đính kèm qua SMTP/SendGrid.

### 3. **Cấu hình & tích hợp**

**A. Email config**  
- Trong Settings (chỉ admin truy cập): Thêm/xoá/sửa email nhận báo cáo.
- Bảng `email_configs` trong Supabase lưu danh sách email, trạng thái active.

**B. Thư viện gửi mail**
- Dùng `nodemailer` (SMTP) hoặc `@sendgrid/mail` để gửi mail từ serverless function.
- File Excel tạo bằng `xlsx` hoặc `exceljs`.

**C. Xử lý lỗi**
- Nếu gửi mail lỗi (SMTP down, quota...), ghi log lỗi, retry tự động lần sau.
- Có chức năng thủ công “Test gửi mail” để admin kiểm tra.

---

## 🛠️ Checklist vận hành & bảo trì

- [ ] Google Sheet luôn chia sẻ quyền cho service account.
- [ ] Thường xuyên kiểm tra bảng log “pending sync”, retry nếu có lỗi.
- [ ] Kiểm tra định kỳ email gửi báo cáo, test lại khi đổi cấu hình.
- [ ] Đảm bảo environment variables cho Google/SMTP đầy đủ trên Netlify.

---

## ⚡ Lưu ý Bảo Mật

- KHÔNG public credentials Google hoặc SMTP lên Github.
- Đặt biến môi trường trong dashboard Netlify/hosting.
- Không cho phép sửa dữ liệu trực tiếp trên Google Sheet (nếu có sẽ bị overwrite mỗi lần sync).

---

## 📝 Tài liệu tham khảo

- [Google Sheets API Node.js Quickstart](https://developers.google.com/sheets/api/quickstart/nodejs)
- [Netlify Scheduled Functions](https://docs.netlify.com/functions/scheduled-functions/)
- [ExcelJS - Node.js Excel file generation](https://github.com/exceljs/exceljs)
- [Nodemailer - Node.js email library](https://nodemailer.com/about/)

---

*Last updated: 2025-08-12 • Author: Chris Taylor (BMAD-Mini)*