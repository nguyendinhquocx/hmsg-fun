# Digital CRM - Development Tasks

## 🏗️ Phase 1: Setup & Foundation
*Estimated: 1 day*

### Task 1.1: Project Initialization
- [ ] Create Next.js project (with TypeScript)
- [ ] Install Tailwind CSS, configure PostCSS
- [ ] Setup Supabase client (env variables for API keys)
- [ ] Initialize Git repository with .gitignore
- [ ] Write README with setup instructions
- [ ] Configure Netlify deployment with preview branch

**Acceptance Criteria:**
- Project runs locally with `npm run dev`
- All linting and type checking passes
- Netlify deploy preview works
- Folder structure: `/pages`, `/components`, `/lib`, `/styles`

### Task 1.2: Auth & Team System Foundation
- [ ] Setup Supabase Auth (email/password)
- [ ] Create Supabase tables: users, companies, teams, email_configs
- [ ] Seed initial users/teams (via SQL or admin UI)
- [ ] Implement login page, password change flow
- [ ] Role/team-based routing (only team "b" can access Digital module)

**Acceptance Criteria:**
- Users can log in, logout, change password
- Routing logic hides/shows Digital dashboard per team
- Admin can verify data in Supabase tables

---

## ✨ Phase 2: Core Features Implementation
*Estimated: 2-3 days*

### Task 2.1: Dashboard Cards & Company Table
- [ ] Build 3 cards: Tổng số công ty, số công ty tháng này, % tăng trưởng cùng kỳ năm trước
- [ ] Create company table with filter/search (responsive, paginated)
- [ ] Implement Add/Edit/Delete company with modal or slide-over form
- [ ] All CRUD operations update Supabase first

**Acceptance Criteria:**
- Cards show correct data, update when filters change
- Table supports search, filter, pagination
- Add/Edit/Delete works, UI updates on success
- Mobile and desktop layouts both polished

### Task 2.2: Google Sheet Sync Integration
- [ ] Build serverless function (Netlify or Next.js API route) for Google Sheet sync
- [ ] On create/update/delete in Supabase, call sync function to mirror changes to Google Sheet
- [ ] Handle Google API errors, show notification if sync fails
- [ ] Log failed syncs for admin retry

**Acceptance Criteria:**
- Sheet always reflects latest Supabase data
- Errors surfaced to user/admin
- Retry logic or manual sync option for admin

### Task 2.3: Settings & Email Automation
- [ ] Admin settings page: manage email list for reports
- [ ] Build schedule job (Netlify scheduled function) to send Excel report every Monday 7-8AM
- [ ] Excel export: correct format, filters applied, attachment in email
- [ ] Manual "Test Send" button for admin

**Acceptance Criteria:**
- Email config updates persist
- Report email received, correct format/data
- Manual test send works, error notifications shown if fails

---

## 🚀 Phase 3: Polish, Optimize & Deploy
*Estimated: 1-2 days*

### Task 3.1: UI Polish & Responsiveness
- [ ] Cross-device layout QA (desktop, tablet, mobile)
- [ ] Animation for modals, feedback, loading states
- [ ] Accessibility basics (labels, focus, ARIA)
- [ ] Card/table visual tweaks for clarity

**Acceptance Criteria:**
- Works perfectly on 320px+, all modern browsers
- Animations smooth, feedback clear
- Meets WCAG 2.1 AA basics

### Task 3.2: Production Readiness & Monitoring
- [ ] Environment variables for production
- [ ] Custom domain hmsg.fun, SSL via Netlify
- [ ] Setup analytics (Netlify Analytics or GA4)
- [ ] Error monitoring/logging for failed syncs/emails

**Acceptance Criteria:**
- Deployed to hmsg.fun, HTTPS active
- Analytics and error logs available to admin
- All features functional in production

---

## 🔄 Quality Checklist (BMAD-Mini Standards)
- [ ] >90 Lighthouse Performance score
- [ ] All core flows covered by tests or manual QA
- [ ] Mobile-first, responsive on all key screens
- [ ] Secure routing, auth, data validation
- [ ] Cross-browser (Chrome, Firefox, Safari, Edge)
- [ ] Production deployment, domain live
- [ ] Documentation updated (setup, usage, maintenance)

---
*Tasks created by: Chris Taylor*  
*Timeline estimate: 5-7 days total*  
*Last updated: 2025-08-12*