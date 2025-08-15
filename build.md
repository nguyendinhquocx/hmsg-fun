5:06:01 PM: Netlify Build                                                 
5:06:01 PM: ────────────────────────────────────────────────────────────────
5:06:01 PM: ​
5:06:01 PM: ❯ Version
5:06:01 PM:   @netlify/build 35.0.7
5:06:01 PM: ​
5:06:01 PM: ❯ Flags
5:06:01 PM:   accountId: 6815f6e801302cc05c8831c8
5:06:01 PM:   baseRelDir: true
5:06:01 PM:   buildId: 689f066d02714f000855b009
5:06:01 PM:   deployId: 689f066d02714f000855b00b
5:06:01 PM: ​
5:06:01 PM: ❯ Current directory
5:06:01 PM:   /opt/build/repo/digital-crm
5:06:01 PM: ​
5:06:01 PM: ❯ Config file
5:06:01 PM:   /opt/build/repo/digital-crm/netlify.toml
5:06:01 PM: ​
5:06:01 PM: ❯ Context
5:06:01 PM:   production
5:06:02 PM: ​
5:06:02 PM: ❯ Using Next.js Runtime - v5.12.0
5:06:03 PM: No Next.js cache to restore
5:06:03 PM: ​
5:06:03 PM: build.command from netlify.toml                               
5:06:03 PM: ────────────────────────────────────────────────────────────────
5:06:03 PM: ​
5:06:03 PM: $ npm run build
5:06:03 PM: > digital-crm@0.1.0 build
5:06:03 PM: > next build
5:06:04 PM: ⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
5:06:04 PM:    ▲ Next.js 15.4.6
5:06:04 PM:    Creating an optimized production build ...
5:06:35 PM:  ⚠ Compiled with warnings in 30.0s
5:06:35 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:06:35 PM: Critical dependency: the request of a dependency is an expression
5:06:35 PM: Import trace for requested module:
5:06:35 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:06:35 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:06:35 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:06:35 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:06:35 PM: ./src/lib/supabase-server.ts
5:06:35 PM: ./src/app/api/send-report/route.ts
5:06:37 PM: <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (108kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
5:06:38 PM:  ⚠ Compiled with warnings in 1000ms
5:06:38 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:06:38 PM: A Node.js API is used (process.versions at line: 11) which is not supported in the Edge Runtime.
5:06:38 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:06:38 PM: Import trace for requested module:
5:06:38 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:06:38 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:06:38 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:06:38 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:06:38 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:06:38 PM: A Node.js API is used (process.versions at line: 12) which is not supported in the Edge Runtime.
5:06:38 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:06:38 PM: Import trace for requested module:
5:06:38 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:06:38 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:06:38 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:06:38 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:06:38 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:06:38 PM: A Node.js API is used (process.versions at line: 58) which is not supported in the Edge Runtime.
5:06:38 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:06:38 PM: Import trace for requested module:
5:06:38 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:06:38 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:06:38 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:06:38 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:06:38 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:06:38 PM: A Node.js API is used (process.versions at line: 59) which is not supported in the Edge Runtime.
5:06:38 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:06:38 PM: Import trace for requested module:
5:06:38 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:06:38 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:06:38 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:06:38 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:06:38 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:06:38 PM: A Node.js API is used (process.versions at line: 60) which is not supported in the Edge Runtime.
5:06:38 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:06:38 PM: Import trace for requested module:
5:06:38 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:06:38 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:06:38 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:06:38 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:06:38 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:06:38 PM: A Node.js API is used (process.version at line: 24) which is not supported in the Edge Runtime.
5:06:38 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:06:38 PM: Import trace for requested module:
5:06:38 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:06:38 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:06:42 PM:  ✓ Compiled successfully in 34.0s
5:06:42 PM:    Linting and checking validity of types ...
5:06:54 PM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
5:06:50 PM: ./src/app/api/auth/logout/route.ts
5:06:50 PM: 4:28  Warning: 'request' is defined but never used.  @typescript-eslint/no-unused-vars
5:06:50 PM: ./src/app/api/auth/user/route.ts
5:06:50 PM: 4:27  Warning: 'request' is defined but never used.  @typescript-eslint/no-unused-vars
5:06:50 PM: ./src/app/api/send-report/route.ts
5:06:50 PM: 80:27  Warning: 'rowNumber' is defined but never used.  @typescript-eslint/no-unused-vars
5:06:50 PM: ./src/app/api/sync-google-sheet/route.ts
5:06:50 PM: 21:11  Warning: 'CompanyData' is defined but never used.  @typescript-eslint/no-unused-vars
5:06:50 PM: ./src/app/dashboard/page.tsx
5:06:50 PM: 5:10  Warning: 'Building2' is defined but never used.  @typescript-eslint/no-unused-vars
5:06:50 PM: 5:21  Warning: 'Users' is defined but never used.  @typescript-eslint/no-unused-vars
5:06:50 PM: 5:28  Warning: 'Settings' is defined but never used.  @typescript-eslint/no-unused-vars
5:06:50 PM: 5:38  Warning: 'ArrowRight' is defined but never used.  @typescript-eslint/no-unused-vars
5:06:50 PM: 5:50  Warning: 'Lock' is defined but never used.  @typescript-eslint/no-unused-vars
5:06:50 PM: ./src/app/login/debug-page.tsx
5:06:50 PM: 15:9  Warning: 'router' is assigned a value but never used.  @typescript-eslint/no-unused-vars
5:06:50 PM: ./src/components/dashboard/company-table.tsx
5:06:50 PM: 49:6  Warning: React Hook useEffect has a missing dependency: 'filterCompanies'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
5:06:50 PM: ./src/lib/supabase-server.ts
5:06:50 PM: 19:20  Warning: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
5:06:50 PM: 28:20  Warning: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
5:06:50 PM: info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
5:06:53 PM: Failed to compile.
5:06:53 PM: 
5:06:53 PM: ./netlify/functions/scheduled-report.ts:1:25
5:06:53 PM: Type error: Cannot find module '@netlify/functions' or its corresponding type declarations.
5:06:53 PM: > 1 | import { Handler } from '@netlify/functions'
5:06:53 PM:     |                         ^
5:06:53 PM:   2 |
5:06:53 PM:   3 | export const handler: Handler = async (event, context) => {
5:06:53 PM:   4 |   try {
5:06:53 PM: Next.js build worker exited with code: 1 and signal: null
5:06:53 PM: ​
5:06:53 PM: "build.command" failed                                        
5:06:53 PM: ────────────────────────────────────────────────────────────────
5:06:53 PM: ​
5:06:53 PM:   Error message
5:06:53 PM:   Command failed with exit code 1: npm run build (https://ntl.fyi/exit-code-1)
5:06:53 PM: ​
5:06:53 PM:   Error location
5:06:53 PM:   In build.command from netlify.toml:
5:06:53 PM:   npm run build
5:06:53 PM: ​
5:06:53 PM:   Resolved config
5:06:53 PM:   build:
5:06:53 PM:     base: /opt/build/repo/digital-crm
5:06:53 PM:     command: npm run build
5:06:53 PM:     commandOrigin: config
5:06:53 PM:     environment:
5:06:53 PM:       - NEXT_TELEMETRY_DISABLED
5:06:53 PM:     publish: /opt/build/repo/digital-crm/.next
5:06:53 PM:     publishOrigin: config
5:06:53 PM:   functionsDirectory: /opt/build/repo/digital-crm/netlify/functions
5:06:53 PM:   plugins:
5:06:53 PM:     - inputs: {}
5:06:53 PM:       origin: config
5:06:53 PM:       package: "@netlify/plugin-nextjs"
5:06:53 PM:   redirects:
5:06:53 PM:     - from: /*
      status: 200
      to: /index.html
  redirectsOrigin: config
5:06:53 PM: Build failed due to a user error: Build script returned non-zero exit code: 2
5:06:54 PM: Failing build: Failed to build site
5:06:54 PM: Finished processing build request in 1m19.799s