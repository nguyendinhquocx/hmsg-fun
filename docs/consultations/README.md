# Expert Consultations

Thư mục này chứa các consultation sessions được lưu từ hệ thống BMad và Expert integration.

## Cấu trúc

- Các file consultation được lưu với format: `consultation-{date}-{time}.md`
- Mỗi file chứa đầy đủ metadata, summary và conversation log
- Files được organize theo tháng trong subdirectories

## Enhanced Commands

- `*save {filename}` - Lưu consultation hiện tại
- `*recommendations` - Generate structured recommendations
- `*expert {domain}` - Consult với domain expert

## Usage

Trong bất kỳ BMad agent nào (analyst, dev, pm, etc.), bạn có thể:
1. Trao đổi về vấn đề
2. Sử dụng `*expert frontend` để consult với chuyên gia
3. Sử dụng `*save project-name` để lưu consultation
4. Sử dụng `*recommendations` để có next steps

Tất cả đều hoạt động bằng tiếng Việt để phù hợp với team Việt Nam.