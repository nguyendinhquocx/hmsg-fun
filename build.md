5:13:16 PM: Netlify Build                                                 
5:13:16 PM: ────────────────────────────────────────────────────────────────
5:13:16 PM: ​
5:13:16 PM: ❯ Version
5:13:16 PM:   @netlify/build 35.0.7
5:13:16 PM: ​
5:13:16 PM: ❯ Flags
5:13:16 PM:   accountId: 6815f6e801302cc05c8831c8
5:13:16 PM:   baseRelDir: true
5:13:16 PM:   buildId: 689f08259ddbfa0008603804
5:13:16 PM:   deployId: 689f08259ddbfa0008603806
5:13:16 PM: ​
5:13:16 PM: ❯ Current directory
5:13:16 PM:   /opt/build/repo/digital-crm
5:13:16 PM: ​
5:13:16 PM: ❯ Config file
5:13:16 PM:   /opt/build/repo/digital-crm/netlify.toml
5:13:16 PM: ​
5:13:16 PM: ❯ Context
5:13:16 PM:   production
5:13:17 PM: ​
5:13:17 PM: ❯ Using Next.js Runtime - v5.12.0
5:13:18 PM: No Next.js cache to restore
5:13:18 PM: ​
5:13:18 PM: build.command from netlify.toml                               
5:13:18 PM: ────────────────────────────────────────────────────────────────
5:13:18 PM: ​
5:13:18 PM: $ npm run build
5:13:18 PM: > digital-crm@0.1.0 build
5:13:18 PM: > next build
5:13:19 PM: ⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
5:13:19 PM:    ▲ Next.js 15.4.6
5:13:19 PM:    Creating an optimized production build ...
5:13:40 PM:  ⚠ Compiled with warnings in 20.0s
5:13:40 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:13:40 PM: Critical dependency: the request of a dependency is an expression
5:13:40 PM: Import trace for requested module:
5:13:40 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:13:40 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:13:40 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:13:40 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:13:40 PM: ./src/lib/supabase-server.ts
5:13:40 PM: ./src/app/api/send-report/route.ts
5:13:42 PM: <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (108kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
5:13:42 PM:  ⚠ Compiled with warnings in 1000ms
5:13:42 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:13:42 PM: A Node.js API is used (process.versions at line: 11) which is not supported in the Edge Runtime.
5:13:42 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:13:42 PM: Import trace for requested module:
5:13:42 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:13:42 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:13:42 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:13:42 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:13:42 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:13:42 PM: A Node.js API is used (process.versions at line: 12) which is not supported in the Edge Runtime.
5:13:42 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:13:42 PM: Import trace for requested module:
5:13:42 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:13:42 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:13:42 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:13:42 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:13:42 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:13:42 PM: A Node.js API is used (process.versions at line: 58) which is not supported in the Edge Runtime.
5:13:42 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:13:42 PM: Import trace for requested module:
5:13:42 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:13:42 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:13:42 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:13:42 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:13:42 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:13:42 PM: A Node.js API is used (process.versions at line: 59) which is not supported in the Edge Runtime.
5:13:42 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:13:42 PM: Import trace for requested module:
5:13:42 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:13:42 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:13:42 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:13:42 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:13:42 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:13:42 PM: A Node.js API is used (process.versions at line: 60) which is not supported in the Edge Runtime.
5:13:42 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:13:42 PM: Import trace for requested module:
5:13:42 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:13:42 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:13:42 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:13:42 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:13:42 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:13:42 PM: A Node.js API is used (process.version at line: 24) which is not supported in the Edge Runtime.
5:13:42 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:13:42 PM: Import trace for requested module:
5:13:42 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:13:42 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:13:46 PM:  ✓ Compiled successfully in 23.0s
5:13:46 PM:    Linting and checking validity of types ...
5:13:49 PM: ./src/app/api/auth/logout/route.ts
5:13:49 PM: 4:28  Warning: 'request' is defined but never used.  @typescript-eslint/no-unused-vars
5:13:49 PM: ./src/app/api/auth/user/route.ts
5:13:49 PM: 4:27  Warning: 'request' is defined but never used.  @typescript-eslint/no-unused-vars
5:13:49 PM: ./src/app/api/send-report/route.ts
5:13:49 PM: 80:27  Warning: 'rowNumber' is defined but never used.  @typescript-eslint/no-unused-vars
5:13:49 PM: ./src/app/api/sync-google-sheet/route.ts
5:13:49 PM: 21:11  Warning: 'CompanyData' is defined but never used.  @typescript-eslint/no-unused-vars
5:13:49 PM: ./src/app/dashboard/page.tsx
5:13:49 PM: 5:10  Warning: 'Building2' is defined but never used.  @typescript-eslint/no-unused-vars
5:13:49 PM: 5:21  Warning: 'Users' is defined but never used.  @typescript-eslint/no-unused-vars
5:13:49 PM: 5:28  Warning: 'Settings' is defined but never used.  @typescript-eslint/no-unused-vars
5:13:49 PM: 5:38  Warning: 'ArrowRight' is defined but never used.  @typescript-eslint/no-unused-vars
5:13:49 PM: 5:50  Warning: 'Lock' is defined but never used.  @typescript-eslint/no-unused-vars
5:13:49 PM: ./src/app/login/debug-page.tsx
5:13:49 PM: 15:9  Warning: 'router' is assigned a value but never used.  @typescript-eslint/no-unused-vars
5:13:49 PM: ./src/components/dashboard/company-table.tsx
5:13:49 PM: 49:6  Warning: React Hook useEffect has a missing dependency: 'filterCompanies'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
5:13:49 PM: ./src/lib/supabase-server.ts
5:13:49 PM: 19:20  Warning: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
5:13:49 PM: 28:20  Warning: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
5:13:49 PM: info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
5:13:58 PM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
5:13:57 PM: Failed to compile.
5:13:57 PM: 
5:13:57 PM: ./src/app/api/send-report/route.ts:8:21
5:13:57 PM: Type error: Property 'createTransporter' does not exist on type 'typeof import("/opt/build/repo/digital-crm/node_modules/@types/nodemailer/index")'. Did you mean 'createTransport'?
5:13:57 PM:    6 | // Create email transporter
5:13:57 PM:    7 | const createTransporter = () => {
5:13:57 PM: >  8 |   return nodemailer.createTransporter({
5:13:57 PM:      |                     ^
5:13:57 PM:    9 |     host: process.env.SMTP_HOST,
5:13:57 PM:   10 |     port: parseInt(process.env.SMTP_PORT || '587'),
5:13:57 PM:   11 |     secure: false,
5:13:57 PM: Next.js build worker exited with code: 1 and signal: null
5:13:57 PM: ​
5:13:57 PM: "build.command" failed                                        
5:13:57 PM: ────────────────────────────────────────────────────────────────
5:13:57 PM: ​
5:13:57 PM:   Error message
5:13:57 PM:   Command failed with exit code 1: npm run build (https://ntl.fyi/exit-code-1)
5:13:57 PM: ​
5:13:57 PM:   Error location
5:13:57 PM:   In build.command from netlify.toml:
5:13:57 PM:   npm run build
5:13:57 PM: ​
5:13:57 PM:   Resolved config
5:13:57 PM:   build:
5:13:57 PM:     base: /opt/build/repo/digital-crm
5:13:57 PM:     command: npm run build
5:13:57 PM:     commandOrigin: config
5:13:57 PM:     environment:
5:13:57 PM:       - NEXT_TELEMETRY_DISABLED
5:13:57 PM:     publish: /opt/build/repo/digital-crm/.next
5:13:57 PM:     publishOrigin: config
5:13:57 PM:   functionsDirectory: /opt/build/repo/digital-crm/netlify/functions
5:13:57 PM:   plugins:
5:13:57 PM:     - inputs: {}
5:13:57 PM:       origin: config
5:13:57 PM:       package: "@netlify/plugin-nextjs"
5:13:57 PM:   redirects:
5:13:58 PM:     - from: /*
      status: 200
      to: /index.html
  redirectsOrigin: config
5:13:58 PM: Build failed due to a user error: Build script returned non-zero exit code: 2
5:13:58 PM: Failing build: Failed to build site
5:13:58 PM: Finished processing build request in 1m4.056s