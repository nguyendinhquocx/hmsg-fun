# Test Login Debug Guide

## 1. Kiểm tra Auth Users Quality
**Chạy script:** `debug-auth-login.sql`

Kiểm tra:
- ✅ Password hash có tồn tại không
- ✅ Email confirmed 
- ✅ Required fields (instance_id, aud, role)
- ✅ Password verification với '123456789'

## 2. Test Login Response Chi Tiết

Mở **Developer Tools → Console** và chạy:
```javascript
// Test login API trực tiếp
fetch('/api/auth/login', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    email: 'quynh.bui@hoanmy.com',
    password: '123456789'
  })
})
.then(response => response.text())
.then(data => {
  console.log('Login response:', data);
})
.catch(error => {
  console.error('Login error:', error);
});
```

## 3. Alternative Solutions

### Option A: Reset specific user password
```sql
UPDATE auth.users 
SET encrypted_password = crypt('123456789', gen_salt('bf')),
    email_confirmed_at = NOW(),
    updated_at = NOW()
WHERE email = 'quynh.bui@hoanmy.com';
```

### Option B: Recreate user via Supabase Dashboard
1. **Authentication → Users → Invite new user**
2. **Email:** quynh.bui@hoanmy.com  
3. **Password:** 123456789
4. **Skip email confirmation**
5. **Copy new auth ID vào database:**
```sql
UPDATE public.users 
SET id = 'new_auth_id_here'
WHERE email = 'quynh.bui@hoanmy.com';
```

### Option C: Manual test với curl
```bash
curl -X POST https://bespoke-mandazi-50c4fe.netlify.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"quynh.bui@hoanmy.com","password":"123456789"}'
```

## 4. Expected Debug Output
- Password hash length: ~60 chars (bcrypt)
- email_confirmed_at: NOT NULL
- role: 'authenticated'
- aud: 'authenticated'
- Password match: true