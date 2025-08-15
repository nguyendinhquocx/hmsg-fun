5:15:36 PM:    Linting and checking validity of types ...
5:15:39 PM: ./src/app/api/auth/logout/route.ts
5:15:39 PM: 4:28  Warning: 'request' is defined but never used.  @typescript-eslint/no-unused-vars
5:15:39 PM: ./src/app/api/auth/user/route.ts
5:15:39 PM: 4:27  Warning: 'request' is defined but never used.  @typescript-eslint/no-unused-vars
5:15:39 PM: ./src/app/api/send-report/route.ts
5:15:39 PM: 80:27  Warning: 'rowNumber' is defined but never used.  @typescript-eslint/no-unused-vars
5:15:39 PM: ./src/app/api/sync-google-sheet/route.ts
5:15:39 PM: 21:11  Warning: 'CompanyData' is defined but never used.  @typescript-eslint/no-unused-vars
5:15:39 PM: ./src/app/dashboard/page.tsx
5:15:39 PM: 5:10  Warning: 'Building2' is defined but never used.  @typescript-eslint/no-unused-vars
5:15:39 PM: 5:21  Warning: 'Users' is defined but never used.  @typescript-eslint/no-unused-vars
5:15:39 PM: 5:28  Warning: 'Settings' is defined but never used.  @typescript-eslint/no-unused-vars
5:15:39 PM: 5:38  Warning: 'ArrowRight' is defined but never used.  @typescript-eslint/no-unused-vars
5:15:39 PM: 5:50  Warning: 'Lock' is defined but never used.  @typescript-eslint/no-unused-vars
5:15:39 PM: ./src/app/login/debug-page.tsx
5:15:39 PM: 15:9  Warning: 'router' is assigned a value but never used.  @typescript-eslint/no-unused-vars
5:15:39 PM: ./src/components/dashboard/company-table.tsx
5:15:39 PM: 49:6  Warning: React Hook useEffect has a missing dependency: 'filterCompanies'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
5:15:39 PM: ./src/lib/supabase-server.ts
5:15:39 PM: 19:20  Warning: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
5:15:39 PM: 28:20  Warning: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
5:15:39 PM: info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
5:15:46 PM: Failed during stage 'building site': Build script returned non-zero exit code: 2
5:15:45 PM: Failed to compile.
5:15:45 PM: 
5:15:45 PM: ./src/app/api/send-report/route.ts:67:21
5:15:45 PM: Type error: Property 'code' does not exist on type 'Company'.
5:15:45 PM:   65 |     worksheet.addRow({
5:15:45 PM:   66 |       name: company.name,
5:15:45 PM: > 67 |       code: company.code || '',
5:15:45 PM:      |                     ^
5:15:45 PM:   68 |       sector: company.sector,
5:15:45 PM:   69 |       contact_person: company.contact_person || '',
5:15:45 PM:   70 |       contact_email: company.contact_email || '',
5:15:45 PM: Next.js build worker exited with code: 1 and signal: null
5:15:45 PM: ​
5:15:45 PM: "build.command" failed                                        
5:15:45 PM: ────────────────────────────────────────────────────────────────
5:15:45 PM: ​
5:15:45 PM:   Error message
5:15:45 PM:   Command failed with exit code 1: npm run build
5:15:45 PM: ​
5:15:45 PM:   Error location
5:15:45 PM:   In build.command from netlify.toml:
5:15:45 PM:   npm run build
5:15:45 PM: ​
5:15:45 PM:   Resolved config
5:15:45 PM:   build:
5:15:45 PM:     base: /opt/build/repo/digital-crm
5:15:45 PM:     command: npm run build
5:15:45 PM:     commandOrigin: config
5:15:45 PM:     environment:
5:15:45 PM:       - NEXT_TELEMETRY_DISABLED
5:15:45 PM:     publish: /opt/build/repo/digital-crm/.next
5:15:45 PM:     publishOrigin: config
5:15:45 PM:   functionsDirectory: /opt/build/repo/digital-crm/netlify/functions
5:15:45 PM:   plugins:
5:15:45 PM:     - inputs: {}
5:15:45 PM:       origin: config
5:15:45 PM:       package: "@netlify/plugin-nextjs"
5:15:45 PM:   redirects:
5:15:46 PM:     - from: /*
      status: 200
      to: /index.html
  redirectsOrigin: config
5:15:46 PM: Build failed due to a user error: Build script returned non-zero exit code: 2
5:15:46 PM: Failing build: Failed to build site
5:15:46 PM: Finished processing build request in 48.837s