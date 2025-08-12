# Digital CRM - Quick Architecture & Design

## 🏗️ Tech Stack Decision

### Frontend: Next.js (React) + Tailwind CSS
**Why**: Fast development, mobile-first, strong ecosystem, easy to host on Netlify. Tailwind enables rapid UI building and consistent design.
**Alternatives considered**: React+MUI, Vue+Vuetify. Chose Next.js for SSR/ISR flexibility, Tailwind for speed.
**Trade-offs**: Slightly more config than pure Create React App, but much more flexible and production-ready.

### Backend/API: Supabase (PostgreSQL, Auth, REST API)
**Why**: Managed database, built-in authentication, instant REST API, free tier suitable for MVP, easy integration with Next.js.
**Data needs**: Multi-table (users, companies, teams, email configs, logs). Handles auth and RBAC natively.
**Authentication**: Email/password (admin seeds users, users can change password). Team-based access control.

### Styling: Tailwind CSS
**Why**: Fast, consistent, mobile-first responsive design.
**Component library**: Custom components with Tailwind; can add HeadlessUI or Radix for advanced interactivity.

### Hosting & Deployment: Netlify
**Why**: Familiar for team, simple CI/CD, supports Next.js SSR/ISR, custom domain (hmsg.fun).
**Domain**: hmsg.fun with subroutes for Digital module.
**CI/CD**: Netlify auto-builds from GitHub repo.

### Google Sheets Sync: Google Sheets API via Netlify Functions
**Why**: Enables backend sync logic, secure serverless execution. Handles Excel export and sync.
**Trade-offs**: Slightly slower than direct DB write, but robust for audit/logging.

### Email Automation: Netlify Scheduled Functions + SMTP/SendGrid
**Why**: Scheduled functions run every Monday 7-8AM, gather data, export Excel, email to configured list.

---

## 📱 Key Screens & User Flow

### Screen 1: Login (hmsg.fun)
- **Purpose**: Authenticate user, determine team/role.
- **Main elements**: Email, password fields, error messages, "change password" flow.
- **User actions**: Login, change password.

### Screen 2: Main Dashboard (Digital module)
- **Purpose**: Show Digital CRM only to team "b" users.
- **Main elements**:
    - Cards: Tổng số công ty (filtered), số công ty tháng này, % tăng trưởng so với cùng kỳ năm trước.
    - Table: Company list, all fields, filter/search.
    - Actions: Add, edit, delete company (only own/team data).
- **User actions**: Filter data, CRUD company, export backup.

### Screen 3: Settings (Admin only)
- **Purpose**: Manage email list for report, user/team management.
- **Main elements**: List of report emails, add/remove/edit emails, test send, user list for team assignment.
- **User actions**: Add/remove emails, manage users.

### Screen 4: Notification/Error States
- **Purpose**: Notify user/admin when sync with Google Sheet fails, or email send fails.
- **Main elements**: Toasts/alerts, log of failed syncs.

---

## 🔄 User Journey

**Happy Path:**
1. User logs in → sees “Digital” if team = b → accesses dashboard → CRUD company data (filter/search) → data syncs to Supabase, then Google Sheet.
2. Every Monday, system auto-sends Excel report to configured emails.

**Error Handling:**
- If Google Sheet sync fails: Show alert, log error, flag for retry.
- If email send fails: Show alert, log error, admin can resend.

---

## 📦 Implementation Approach

### Phase 1: Core Foundation (Day 1-2)
- [ ] Next.js + Tailwind setup on Netlify
- [ ] Supabase integration (auth, database schemas: users, companies, teams)
- [ ] Login screen, password change
- [ ] Role/team-based access logic

### Phase 2: Feature Complete (Day 2-4)
- [ ] Dashboard cards (aggregate queries)
- [ ] Company table CRUD + filters (all actions trigger Supabase + Google Sheet sync)
- [ ] Settings page for email config, user/team management
- [ ] Notification/error UI

### Phase 3: Polish & Deploy (Day 4-5)
- [ ] Email report automation (Netlify scheduled functions)
- [ ] Excel export (xlsx package via serverless)
- [ ] Test cross-device, cross-browser
- [ ] Deploy to hmsg.fun, setup domain, SSL

---

## ⚡ Performance Strategy
- **Images**: Optimize logos/avatars, SVG preferred, no heavy assets
- **Code splitting**: Next.js dynamic imports for dashboard/table
- **Caching**: Supabase queries cached on client, Netlify CDN for static assets
- **Core Web Vitals**: LCP <2s, CLS <0.1, FID <100ms

## 🔒 Security Considerations
- **Data protection**: Only logged-in users access; RBAC for team/role; sensitive API keys in serverless only
- **Authentication**: Supabase session tokens, password reset via email
- **API security**: Validate all serverless input, rate limit API
- **HTTPS**: Enforced via Netlify, HSTS headers

## 📊 Monitoring & Analytics
- **User analytics**: Netlify Analytics, optional Google Analytics
- **Performance monitoring**: Lighthouse, Core Web Vitals
- **Error tracking**: Log failed syncs, email sends, surface to admin
- **Uptime monitoring**: Netlify status page

---

*Architecture completed by: Sam Rivera*  
*Review date: 2025-08-12*  
*Approved by: Stakeholder*