5:10:00 PM:    Linting and checking validity of types ...
5:10:04 PM: ./src/app/api/auth/logout/route.ts
5:10:04 PM: 4:28  Warning: 'request' is defined but never used.  @typescript-eslint/no-unused-vars
5:10:04 PM: ./src/app/api/auth/user/route.ts
5:10:04 PM: 4:27  Warning: 'request' is defined but never used.  @typescript-eslint/no-unused-vars
5:10:04 PM: ./src/app/api/send-report/route.ts
5:10:04 PM: 80:27  Warning: 'rowNumber' is defined but never used.  @typescript-eslint/no-unused-vars
5:10:04 PM: ./src/app/api/sync-google-sheet/route.ts
5:10:04 PM: 21:11  Warning: 'CompanyData' is defined but never used.  @typescript-eslint/no-unused-vars
5:10:04 PM: ./src/app/dashboard/page.tsx
5:10:04 PM: 5:10  Warning: 'Building2' is defined but never used.  @typescript-eslint/no-unused-vars
5:10:04 PM: 5:21  Warning: 'Users' is defined but never used.  @typescript-eslint/no-unused-vars
5:10:04 PM: 5:28  Warning: 'Settings' is defined but never used.  @typescript-eslint/no-unused-vars
5:10:04 PM: 5:38  Warning: 'ArrowRight' is defined but never used.  @typescript-eslint/no-unused-vars
5:10:04 PM: 5:50  Warning: 'Lock' is defined but never used.  @typescript-eslint/no-unused-vars
5:10:04 PM: ./src/app/login/debug-page.tsx
5:10:04 PM: 15:9  Warning: 'router' is assigned a value but never used.  @typescript-eslint/no-unused-vars
5:10:04 PM: ./src/components/dashboard/company-table.tsx
5:10:04 PM: 49:6  Warning: React Hook useEffect has a missing dependency: 'filterCompanies'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
5:10:04 PM: ./src/lib/supabase-server.ts
5:10:04 PM: 19:20  Warning: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
5:10:04 PM: 28:20  Warning: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
5:10:04 PM: info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
5:10:10 PM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
5:10:10 PM: Failed to compile.
5:10:10 PM: 
5:10:10 PM: ./netlify-disabled/functions/scheduled-report.ts:1:25
5:10:10 PM: Type error: Cannot find module '@netlify/functions' or its corresponding type declarations.
5:10:10 PM: > 1 | import { Handler } from '@netlify/functions'
5:10:10 PM:     |                         ^
5:10:10 PM:   2 |
5:10:10 PM:   3 | export const handler: Handler = async (event, context) => {
5:10:10 PM:   4 |   try {
5:10:10 PM: Next.js build worker exited with code: 1 and signal: null
5:10:10 PM: ​
5:10:10 PM: "build.command" failed                                        
5:10:10 PM: ────────────────────────────────────────────────────────────────
5:10:10 PM: ​
5:10:10 PM:   Error message
5:10:10 PM:   Command failed with exit code 1: npm run build (https://ntl.fyi/exit-code-1)
5:10:10 PM: ​
5:10:10 PM:   Error location
5:10:10 PM:   In build.command from netlify.toml:
5:10:10 PM:   npm run build
5:10:10 PM: ​
5:10:10 PM:   Resolved config
5:10:10 PM:   build:
5:10:10 PM:     base: /opt/build/repo/digital-crm
5:10:10 PM:     command: npm run build
5:10:10 PM:     commandOrigin: config
5:10:10 PM:     environment:
5:10:10 PM:       - NEXT_TELEMETRY_DISABLED
5:10:10 PM:     publish: /opt/build/repo/digital-crm/.next
5:10:10 PM:     publishOrigin: config
5:10:10 PM:   functionsDirectory: /opt/build/repo/digital-crm/netlify/functions
5:10:10 PM:   plugins:
5:10:10 PM:     - inputs: {}
5:10:10 PM:       origin: config
5:10:10 PM:       package: "@netlify/plugin-nextjs"
5:10:10 PM:   redirects:
5:10:10 PM:     - from: /*
      status: 200
      to: /index.html
  redirectsOrigin: config
5:10:10 PM: Build failed due to a user error: Build script returned non-zero exit code: 2
5:10:10 PM: Failing build: Failed to build site
5:10:11 PM: Finished processing build request in 1m7.414s