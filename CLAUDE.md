# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **Digital CRM** project documentation package created using the BMAD-Mini methodology. The repository contains comprehensive documentation for building a Vietnamese business opportunity management web application that replaces Google Sheets/Excel workflows.

## Architecture & Tech Stack

### Planned Technology Stack
- **Frontend**: Next.js (React) + Tailwind CSS + TypeScript
- **Backend**: Supabase (PostgreSQL, Auth, REST API)
- **Hosting**: Netlify with custom domain (hmsg.fun)
- **External Integrations**: 
  - Google Sheets API (one-way sync from app to sheets)
  - Email automation via Netlify Scheduled Functions + SMTP/SendGrid
- **File Processing**: Excel export using `xlsx` or `exceljs` packages

### Key Features
- Team-based access control (only team "b" accesses Digital module)
- Company CRUD operations with real-time dashboard cards
- One-way data synchronization to Google Sheets
- Automated weekly Excel reports via email (Mondays 7-8 AM)
- Mobile-first responsive design

## Development Commands

Based on the architecture documentation, the following commands will be used once the project is initialized:

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks (if configured)

# Testing (to be determined during setup)
npm test            # Run tests
npm run test:watch  # Watch mode for tests
```

## Project Structure

The current repository contains planning documentation in the `PRD/` folder:
- `01-mini-prd.md` - Product requirements and MVP scope
- `02-architecture.md` - Technical architecture and design decisions  
- `03-wireframes.md` - UI wireframes and user flows
- `04-dev-tasks.md` - Development task breakdown with acceptance criteria
- `05-sync-guide.md` - Google Sheets sync and email automation implementation guide

## Implementation Phases

### Phase 1: Setup & Foundation (1 day)
- Next.js + TypeScript + Tailwind CSS setup
- Supabase integration with auth and database schemas
- Netlify deployment configuration
- Basic login/logout and team-based routing

### Phase 2: Core Features (2-3 days)
- Dashboard with dynamic statistics cards
- Company table with CRUD operations, filtering, and search
- Google Sheets API integration for one-way sync
- Admin settings for email configuration
- Scheduled email reports with Excel export

### Phase 3: Polish & Deploy (1-2 days)
- Cross-device responsive testing
- Performance optimization (target: >90 Lighthouse score)
- Production deployment to hmsg.fun
- Error monitoring and analytics setup

## Important Development Notes

### Security Requirements
- All Google API credentials and SMTP secrets must be stored as environment variables
- Team-based access control: only team "b" users can access Digital module
- Role-based authentication with admin privileges for settings management
- HTTPS enforcement and secure headers via Netlify

### Data Flow
1. User performs CRUD operations on companies via web interface
2. Data is written to Supabase PostgreSQL database
3. Background function syncs changes to Google Sheets (one-way only)
4. Weekly scheduled function exports data to Excel and emails configured recipients

### Performance Targets
- Load time: < 3 seconds
- Lighthouse Performance score: > 90
- Mobile-first responsive design (320px+ width support)
- Core Web Vitals: LCP <2s, CLS <0.1, FID <100ms

## Quality Standards

The project follows BMAD-Mini standards requiring:
- Comprehensive error handling and user feedback
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Accessibility basics (WCAG 2.1 AA)
- Production-ready monitoring and analytics
- Complete documentation for setup and maintenance

## External API Integration

### Google Sheets API
- Service account authentication required
- Sheets must be shared with service account email
- One-way sync only (app → sheets, not bidirectional)
- Error logging and retry mechanism for failed syncs

### Email Automation
- Uses Netlify Scheduled Functions for weekly reports
- SMTP/SendGrid for email delivery
- Excel file generation and attachment
- Configurable recipient lists via admin interface

## Language & Localization

The application is designed for Vietnamese users with Vietnamese language interface and business terminology. All user-facing text should be in Vietnamese, while code and technical documentation can be in English.

---

# CURRENT PROJECT STATUS (IMPLEMENTATION COMPLETED)

## ✅ Successfully Implemented Features

### 1. Project Setup & Infrastructure
- **Next.js 15** project with TypeScript and Tailwind CSS
- **Supabase integration** with PostgreSQL, authentication, Row Level Security
- **Server-side API approach** to avoid client-side Supabase issues
- **Database schema** with users, companies, email_configs, sync_logs tables

### 2. Authentication System
- API-based authentication (`/api/auth/login`, `/api/auth/logout`, `/api/auth/user`)
- All users can login and access main dashboard
- Team-based module access (only Team B can access Digital CRM)
- Role-based permissions (admin vs user)

### 3. UI/UX Design - MINIMALIST BLACK & WHITE THEME
- **Login page**: HMSG branding, white background, minimalist design
- **Dashboard**: Clean white background, removed all icons, black/white theme
- **Header**: Dynamic title based on page (Trang chủ, Digital CRM, Cài đặt)
- **Navigation**: Back to home button on Digital page
- **Buttons**: White background, black text, subtle hover effects

### 4. Core Application Structure
```
/login -> /dashboard (main hub) -> /digital (Digital CRM module)
                                -> /settings (admin only)
```

### 5. Database Setup
- User authentication synced with custom users table
- Sample data created for testing
- RLS policies implemented for security

## 🚧 Current Architecture

### Tech Stack
- **Frontend**: Next.js 15 + TypeScript + Tailwind CSS
- **Backend**: Supabase (PostgreSQL + Auth)
- **Architecture**: Server-side API routes for auth, client components for UI

### File Structure
```
digital-crm/
├── src/app/
│   ├── login/page.tsx (minimalist white theme)
│   ├── dashboard/page.tsx (main hub with module cards)
│   ├── digital/page.tsx (Digital CRM module)
│   ├── settings/page.tsx (admin settings)
│   └── api/auth/ (login, logout, user endpoints)
├── src/components/
│   ├── layout/header.tsx (dynamic titles)
│   ├── dashboard/ (stats cards, company table)
│   └── settings/ (email config, sync logs, test reports)
└── database/init.sql (complete schema)
```

### Key Components Working
- ✅ Authentication flow (login → dashboard → module access)
- ✅ Header with logout functionality and dynamic titles
- ✅ Team-based access control (Team B for Digital CRM)
- ✅ Admin-only settings access
- ✅ Minimalist UI design implemented
- ✅ Navigation between pages

## 🎯 Next Development Priorities

### Immediate (Ready to implement)
1. **Company CRUD operations** in Digital CRM module
2. **Statistics dashboard** with real company data
3. **Google Sheets integration** for data sync
4. **Email configuration** in settings page

### Backend APIs Still Needed
- Company management endpoints
- Statistics calculation
- Google Sheets sync functionality  
- Email report generation

## 💡 Important Technical Decisions Made

### 1. API-First Approach
- All auth operations use `/api/` routes instead of client-side Supabase
- Fixes 404 errors with Supabase client-side modules
- More secure and reliable

### 2. Design Philosophy
- **Minimalist black & white theme** throughout
- **No unnecessary icons** - clean text-based interface
- **White backgrounds** instead of gray
- **Subtle hover effects** for better UX

### 3. User Flow
- All users can login to main dashboard
- Team-specific access handled in UI (not login restriction)
- Clear navigation with back buttons and dynamic page titles

## 🔧 Development Commands
```bash
cd digital-crm
npm run dev     # Start development server (http://localhost:3000)
npm run build   # Build for production
npm run lint    # Run linting (if needed)
```

## 🔑 Test Credentials
Check database/init.sql for sample user accounts and test data.

## 📋 Common Tasks for Future Claude Sessions

1. **Adding new features**: Follow the established API-first pattern
2. **UI changes**: Maintain minimalist black/white theme
3. **Database changes**: Update database/init.sql and apply migrations
4. **New pages**: Use existing Header component, follow naming conventions

## 🛠️ Known Working Solutions

### Supabase Client Issues
- Use server-side API routes instead of client-side Supabase imports
- Example pattern: `/api/auth/action` endpoints with server-side Supabase client

### UI Consistency
- All buttons: `border border-gray-300 bg-white text-black hover:bg-gray-50`
- All backgrounds: `bg-white` (not gray)
- No icons unless absolutely necessary
- Dynamic page titles via Header component

This documentation ensures future Claude instances understand the complete context and can continue development seamlessly.