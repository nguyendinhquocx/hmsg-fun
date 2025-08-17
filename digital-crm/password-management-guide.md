# Hướng Dẫn Quản Lý Mật Khẩu cho Real Users

## 🔐 Tổng Quan

Khi chuyển từ test users sang real users, bạn cần quản lý mật khẩu một cách an toàn và hiệu quả. Dưới đây là các phương pháp khuyến nghị.

## 📋 Các Phương Pháp Quản Lý Mật Khẩu

### Phương Pháp 1: Tạo Mật Khẩu Tạm Thời (Khuyến nghị)

#### Bước 1: Admin tạo user với mật khẩu tạm thời
```javascript
// Sử dụng API /api/admin/create-user
{
  "email": "user@company.com",
  "password": "TempPass123!",  // Mật khẩu tạm thời
  "full_name": "Nguyễn Văn A",
  "role": "user"
}
```

#### Bước 2: Gửi thông tin đăng nhập cho user
**Email template:**
```
Chào [Tên User],

Tài khoản Digital CRM của bạn đã được tạo:
- Email: [email]
- Mật khẩu tạm thời: [temp_password]
- Link đăng nhập: [app_url]/login

Vui lòng đổi mật khẩu ngay sau lần đăng nhập đầu tiên.

Trân trọng,
Team Admin
```

#### Bước 3: User đổi mật khẩu lần đầu
- User đăng nhập với mật khẩu tạm thời
- Hệ thống yêu cầu đổi mật khẩu
- User tạo mật khẩu mới

### Phương Pháp 2: Gửi Email Reset Password

#### Bước 1: Tạo user với mật khẩu ngẫu nhiên
```javascript
// Tạo mật khẩu ngẫu nhiên mạnh
const generateRandomPassword = () => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
  let password = ''
  for (let i = 0; i < 12; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length))
  }
  return password
}

const tempPassword = generateRandomPassword()
```

#### Bước 2: Gửi email reset password ngay lập tức
```javascript
// Sau khi tạo user thành công
const { error } = await supabase.auth.resetPasswordForEmail(
  email,
  {
    redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
  }
)
```

#### Bước 3: User nhận email và tạo mật khẩu mới

### Phương Pháp 3: Self-Service Signup (Tương lai)

#### Tạo trang đăng ký cho users
```javascript
// src/app/signup/page.tsx
export default function SignupPage() {
  const handleSignup = async (email, password, fullName) => {
    // 1. Tạo user trong Supabase Auth
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: fullName,
          team: 'CHC',
          role: 'user' // Mặc định role user
        }
      }
    })
    
    // 2. Thêm vào bảng users (qua API)
    // 3. Gửi email xác nhận
  }
}
```

## 🛠️ Implementation Chi Tiết

### 1. Cập nhật API Create User

```javascript
// src/app/api/admin/create-user/route.ts
export async function POST(request) {
  const { email, password, full_name, role, sendResetEmail = false } = await request.json()
  
  // Tạo user
  const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    user_metadata: { full_name, team: 'CHC', role },
    email_confirm: true
  })
  
  if (sendResetEmail) {
    // Gửi email reset password
    await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/reset-password`
    })
  }
  
  // Sync vào database...
}
```

### 2. Tạo Password Reset Page

```javascript
// src/app/reset-password/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleResetPassword = async (e) => {
    e.preventDefault()
    
    if (password !== confirmPassword) {
      setError('Mật khẩu xác nhận không khớp')
      return
    }
    
    if (password.length < 8) {
      setError('Mật khẩu phải có ít nhất 8 ký tự')
      return
    }
    
    setLoading(true)
    setError('')
    
    const { error } = await supabase.auth.updateUser({
      password: password
    })
    
    if (error) {
      setError(error.message)
    } else {
      alert('Mật khẩu đã được cập nhật thành công!')
      router.push('/login')
    }
    
    setLoading(false)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Tạo mật khẩu mới
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleResetPassword}>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Mật khẩu mới
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Nhập mật khẩu mới (ít nhất 8 ký tự)"
            />
          </div>
          
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Xác nhận mật khẩu
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="Nhập lại mật khẩu mới"
            />
          </div>
          
          {error && (
            <div className="text-red-600 text-sm">{error}</div>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
          </button>
        </form>
      </div>
    </div>
  )
}
```

### 3. Force Password Change cho lần đăng nhập đầu

```javascript
// src/app/login/page.tsx
// Thêm vào sau khi login thành công

const checkFirstLogin = async (user) => {
  // Kiểm tra metadata có flag first_login không
  if (user.user_metadata?.first_login === true) {
    // Redirect đến trang đổi mật khẩu bắt buộc
    window.location.href = '/change-password?required=true'
    return
  }
  
  // Tiếp tục flow bình thường
  window.location.href = '/dashboard'
}
```

## 📧 Email Templates

### Template 1: Thông báo tài khoản mới
```html
<!DOCTYPE html>
<html>
<head>
    <title>Tài khoản Digital CRM của bạn</title>
</head>
<body>
    <h2>Chào {{full_name}},</h2>
    
    <p>Tài khoản Digital CRM của bạn đã được tạo thành công!</p>
    
    <div style="background: #f5f5f5; padding: 15px; margin: 20px 0;">
        <strong>Thông tin đăng nhập:</strong><br>
        Email: {{email}}<br>
        Mật khẩu tạm thời: {{temp_password}}<br>
        Link đăng nhập: <a href="{{app_url}}/login">{{app_url}}/login</a>
    </div>
    
    <p><strong>Lưu ý quan trọng:</strong></p>
    <ul>
        <li>Vui lòng đổi mật khẩu ngay sau lần đăng nhập đầu tiên</li>
        <li>Mật khẩu mới phải có ít nhất 8 ký tự</li>
        <li>Không chia sẻ thông tin đăng nhập với người khác</li>
    </ul>
    
    <p>Nếu có thắc mắc, vui lòng liên hệ admin.</p>
    
    <p>Trân trọng,<br>Team Digital CRM</p>
</body>
</html>
```

### Template 2: Reset password
```html
<!DOCTYPE html>
<html>
<head>
    <title>Tạo mật khẩu cho tài khoản Digital CRM</title>
</head>
<body>
    <h2>Chào {{full_name}},</h2>
    
    <p>Tài khoản Digital CRM của bạn đã được tạo. Vui lòng click vào link bên dưới để tạo mật khẩu:</p>
    
    <div style="text-align: center; margin: 30px 0;">
        <a href="{{reset_link}}" 
           style="background: #007bff; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block;">
            Tạo mật khẩu
        </a>
    </div>
    
    <p><strong>Thông tin tài khoản:</strong></p>
    <ul>
        <li>Email: {{email}}</li>
        <li>Vai trò: {{role}}</li>
        <li>Link đăng nhập: <a href="{{app_url}}/login">{{app_url}}/login</a></li>
    </ul>
    
    <p>Link này sẽ hết hạn sau 24 giờ. Nếu không thể truy cập, vui lòng liên hệ admin.</p>
    
    <p>Trân trọng,<br>Team Digital CRM</p>
</body>
</html>
```

## 🔒 Yêu Cầu Bảo Mật Mật Khẩu

### Password Policy
```javascript
const validatePassword = (password) => {
  const errors = []
  
  if (password.length < 8) {
    errors.push('Mật khẩu phải có ít nhất 8 ký tự')
  }
  
  if (!/[A-Z]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ hoa')
  }
  
  if (!/[a-z]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 chữ thường')
  }
  
  if (!/[0-9]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 số')
  }
  
  if (!/[!@#$%^&*]/.test(password)) {
    errors.push('Mật khẩu phải có ít nhất 1 ký tự đặc biệt (!@#$%^&*)')
  }
  
  return errors
}
```

### Mật khẩu mạnh examples
```
✅ Mật khẩu tốt:
- MyCompany2024!
- SecurePass123#
- Digital@CRM2024

❌ Mật khẩu yếu:
- 123456
- password
- company123
```

## 📱 Quy Trình Thực Tế

### Scenario 1: Tạo 1 user mới
1. Admin tạo user qua API với mật khẩu tạm thời
2. Admin gửi email thông báo cho user
3. User đăng nhập lần đầu
4. Hệ thống yêu cầu đổi mật khẩu
5. User tạo mật khẩu mới và tiếp tục sử dụng

### Scenario 2: Tạo nhiều users cùng lúc
1. Admin chuẩn bị danh sách users (Excel/CSV)
2. Tạo script import hàng loạt với mật khẩu ngẫu nhiên
3. Gửi email reset password cho tất cả users
4. Users nhận email và tự tạo mật khẩu

### Scenario 3: User quên mật khẩu
1. User click "Quên mật khẩu" ở trang login
2. Nhập email và gửi request
3. Hệ thống gửi email reset password
4. User click link và tạo mật khẩu mới

## ⚠️ Lưu Ý Bảo Mật

1. **Không lưu mật khẩu plain text** - Supabase tự động hash
2. **Mật khẩu tạm thời phải mạnh** - Ít nhất 8 ký tự, có chữ hoa, số, ký tự đặc biệt
3. **Email bảo mật** - Sử dụng HTTPS, không gửi mật khẩu qua email không mã hóa
4. **Expire links** - Reset password links phải có thời hạn (24h)
5. **Audit logs** - Log tất cả hoạt động tạo/đổi mật khẩu

## 🎯 Khuyến Nghị

**Cho môi trường production:**
1. Sử dụng Phương pháp 2 (Reset password email)
2. Implement password policy nghiêm ngặt
3. Setup email service chuyên nghiệp (SendGrid, AWS SES)
4. Thêm 2FA cho admin accounts
5. Regular password rotation policy

**Cho môi trường test/dev:**
1. Sử dụng Phương pháp 1 (Mật khẩu tạm thời)
2. Password đơn giản hơn cho dễ test
3. Có thể skip email verification

Bằng cách này, bạn có thể quản lý mật khẩu một cách an toàn và chuyên nghiệp cho tất cả real users! 🔐