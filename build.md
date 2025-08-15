5:21:43 PM: Netlify Build                                                 
5:21:43 PM: ────────────────────────────────────────────────────────────────
5:21:43 PM: ​
5:21:43 PM: ❯ Version
5:21:43 PM:   @netlify/build 35.0.7
5:21:43 PM: ​
5:21:43 PM: ❯ Flags
5:21:43 PM:   accountId: 6815f6e801302cc05c8831c8
5:21:43 PM:   baseRelDir: true
5:21:43 PM:   buildId: 689f0a265dbc3100080399b9
5:21:43 PM:   deployId: 689f0a265dbc3100080399bb
5:21:43 PM: ​
5:21:43 PM: ❯ Current directory
5:21:43 PM:   /opt/build/repo/digital-crm
5:21:43 PM: ​
5:21:43 PM: ❯ Config file
5:21:43 PM:   /opt/build/repo/digital-crm/netlify.toml
5:21:43 PM: ​
5:21:43 PM: ❯ Context
5:21:43 PM:   production
5:21:43 PM: ​
5:21:43 PM: ❯ Using Next.js Runtime - v5.12.0
5:21:44 PM: No Next.js cache to restore
5:21:44 PM: ​
5:21:44 PM: build.command from netlify.toml                               
5:21:44 PM: ────────────────────────────────────────────────────────────────
5:21:44 PM: ​
5:21:44 PM: $ npm run build
5:21:44 PM: > digital-crm@0.1.0 build
5:21:44 PM: > next build
5:21:45 PM: ⚠ No build cache found. Please configure build caching for faster rebuilds. Read more: https://nextjs.org/docs/messages/no-cache
5:21:45 PM:    ▲ Next.js 15.4.6
5:21:45 PM:    Creating an optimized production build ...
5:22:02 PM:  ⚠ Compiled with warnings in 16.0s
5:22:02 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:22:02 PM: Critical dependency: the request of a dependency is an expression
5:22:02 PM: Import trace for requested module:
5:22:02 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:22:02 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:22:02 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:22:02 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:22:02 PM: ./src/lib/supabase-server.ts
5:22:02 PM: ./src/app/api/sync-google-sheet-disabled/route.ts
5:22:04 PM: <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (108kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
5:22:04 PM:  ⚠ Compiled with warnings in 1000ms
5:22:04 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:22:04 PM: A Node.js API is used (process.versions at line: 11) which is not supported in the Edge Runtime.
5:22:04 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:22:04 PM: Import trace for requested module:
5:22:04 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:22:04 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:22:04 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:22:04 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:22:04 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:22:04 PM: A Node.js API is used (process.versions at line: 12) which is not supported in the Edge Runtime.
5:22:04 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:22:04 PM: Import trace for requested module:
5:22:04 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:22:04 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:22:04 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:22:04 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:22:04 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:22:04 PM: A Node.js API is used (process.versions at line: 58) which is not supported in the Edge Runtime.
5:22:04 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:22:04 PM: Import trace for requested module:
5:22:04 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:22:04 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:22:04 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:22:04 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:22:04 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:22:04 PM: A Node.js API is used (process.versions at line: 59) which is not supported in the Edge Runtime.
5:22:04 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:22:04 PM: Import trace for requested module:
5:22:04 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:22:04 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:22:04 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:22:04 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:22:04 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:22:04 PM: A Node.js API is used (process.versions at line: 60) which is not supported in the Edge Runtime.
5:22:04 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:22:04 PM: Import trace for requested module:
5:22:04 PM: ./node_modules/@supabase/realtime-js/dist/module/lib/websocket-factory.js
5:22:04 PM: ./node_modules/@supabase/realtime-js/dist/module/index.js
5:22:04 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:22:04 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:22:04 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:22:04 PM: A Node.js API is used (process.version at line: 24) which is not supported in the Edge Runtime.
5:22:04 PM: Learn more: https://nextjs.org/docs/api-reference/edge-runtime
5:22:04 PM: Import trace for requested module:
5:22:04 PM: ./node_modules/@supabase/supabase-js/dist/module/index.js
5:22:04 PM: ./node_modules/@supabase/ssr/dist/index.mjs
5:22:08 PM:  ✓ Compiled successfully in 19.0s
5:22:08 PM:    Linting and checking validity of types ...
5:22:11 PM: ./src/app/api/auth/logout/route.ts
5:22:11 PM: 4:28  Warning: 'request' is defined but never used.  @typescript-eslint/no-unused-vars
5:22:11 PM: ./src/app/api/auth/user/route.ts
5:22:11 PM: 4:27  Warning: 'request' is defined but never used.  @typescript-eslint/no-unused-vars
5:22:11 PM: ./src/app/api/send-report-disabled/route.ts
5:22:11 PM: 85:27  Warning: 'rowNumber' is defined but never used.  @typescript-eslint/no-unused-vars
5:22:11 PM: ./src/app/api/sync-google-sheet-disabled/route.ts
5:22:11 PM: 21:11  Warning: 'CompanyData' is defined but never used.  @typescript-eslint/no-unused-vars
5:22:11 PM: ./src/app/dashboard/page.tsx
5:22:11 PM: 5:10  Warning: 'Building2' is defined but never used.  @typescript-eslint/no-unused-vars
5:22:11 PM: 5:21  Warning: 'Users' is defined but never used.  @typescript-eslint/no-unused-vars
5:22:11 PM: 5:28  Warning: 'Settings' is defined but never used.  @typescript-eslint/no-unused-vars
5:22:11 PM: 5:38  Warning: 'ArrowRight' is defined but never used.  @typescript-eslint/no-unused-vars
5:22:11 PM: 5:50  Warning: 'Lock' is defined but never used.  @typescript-eslint/no-unused-vars
5:22:11 PM: ./src/app/login/debug-page.tsx
5:22:11 PM: 15:9  Warning: 'router' is assigned a value but never used.  @typescript-eslint/no-unused-vars
5:22:11 PM: ./src/components/dashboard/company-table.tsx
5:22:11 PM: 49:6  Warning: React Hook useEffect has a missing dependency: 'filterCompanies'. Either include it or remove the dependency array.  react-hooks/exhaustive-deps
5:22:11 PM: ./src/lib/supabase-server.ts
5:22:11 PM: 19:20  Warning: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
5:22:11 PM: 28:20  Warning: 'error' is defined but never used.  @typescript-eslint/no-unused-vars
5:22:11 PM: info  - Need to disable some ESLint rules? Learn more here: https://nextjs.org/docs/app/api-reference/config/eslint#disabling-rules
5:22:17 PM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
5:22:17 PM: Failed to compile.
5:22:17 PM: 
5:22:17 PM: ./src/app/api/send-report-disabled/route.ts:80:36
5:22:17 PM: Type error: Property 'updated_at' does not exist on type 'Company'.
5:22:17 PM:   78 |       notes: company.notes || '',
5:22:17 PM:   79 |       created_at: new Date(company.created_at).toLocaleDateString('vi-VN'),
5:22:17 PM: > 80 |       updated_at: new Date(company.updated_at).toLocaleDateString('vi-VN')
5:22:17 PM:      |                                    ^
5:22:17 PM:   81 |     })
5:22:17 PM:   82 |   })
5:22:17 PM:   83 |
5:22:17 PM: Next.js build worker exited with code: 1 and signal: null
5:22:17 PM: ​
5:22:17 PM: "build.command" failed                                        
5:22:17 PM: ────────────────────────────────────────────────────────────────
5:22:17 PM: ​
5:22:17 PM:   Error message
5:22:17 PM:   Command failed with exit code 1: npm run build (https://ntl.fyi/exit-code-1)
5:22:17 PM: ​
5:22:17 PM:   Error location
5:22:17 PM:   In build.command from netlify.toml:
5:22:17 PM:   npm run build
5:22:17 PM: ​
5:22:17 PM:   Resolved config
5:22:17 PM:   build:
5:22:17 PM:     base: /opt/build/repo/digital-crm
5:22:17 PM:     command: npm run build
5:22:17 PM:     commandOrigin: config
5:22:17 PM:     environment:
5:22:17 PM:       - NEXT_TELEMETRY_DISABLED
5:22:17 PM:     publish: /opt/build/repo/digital-crm/.next
5:22:17 PM:     publishOrigin: config
5:22:17 PM:   functionsDirectory: /opt/build/repo/digital-crm/netlify/functions
5:22:17 PM:   plugins:
5:22:17 PM:     - inputs: {}
5:22:17 PM:       origin: config
5:22:17 PM:       package: "@netlify/plugin-nextjs"
5:22:17 PM:   redirects:
5:22:17 PM:     - from: /*
      status: 200
      to: /index.html
  redirectsOrigin: config
5:22:17 PM: Build failed due to a user error: Build script returned non-zero exit code: 2
5:22:17 PM: Failing build: Failed to build site
5:22:18 PM: Finished processing build request in 50.716s