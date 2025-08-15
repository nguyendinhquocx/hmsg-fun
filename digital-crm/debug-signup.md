# Debug Auto-Signup Issue

## Lỗi hiện tại:
- Status 401: "Auto-signup failed"  
- Supabase signup không thành công

## Kiểm tra Supabase Settings:

### 1. Authentication Settings
**Vào Supabase Dashboard → Authentication → Settings → General**

Kiểm tra:
- ✅ **Enable email confirmations**: DISABLE (tắt để signup không cần confirm email)
- ✅ **Enable phone confirmations**: DISABLE  
- ✅ **Allow new users to sign up**: ENABLE (bật để cho phép signup)

### 2. Email Templates (nếu cần)
**Authentication → Settings → Email Templates**
- Có thể disable email confirmation templates

### 3. RLS Policies
**Database → Authentication → Policies**
- Kiểm tra xem có policy nào block insert/update không

## Giải pháp thay thế:

### Option 1: Manual Auth User Creation
```sql
-- Tạo auth users manually trong Supabase SQL Editor
INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, created_at, updated_at)
VALUES 
  (gen_random_uuid(), 'tram.mai@hoanmy.com', crypt('123456789', gen_salt('bf')), NOW(), NOW(), NOW());
  
-- Sau đó sync với database
UPDATE public.users 
SET id = (SELECT id FROM auth.users WHERE email = 'tram.mai@hoanmy.com')
WHERE email = 'tram.mai@hoanmy.com';
```

### Option 2: Disable Auto-Signup, Use Manual Creation
Tạm thời comment auto-signup code và require admin tạo users manually.

## Test Steps:
1. Kiểm tra Supabase auth settings
2. Try manual auth user creation  
3. Test login again
4. Nếu work → fix auto-signup code