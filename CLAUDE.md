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