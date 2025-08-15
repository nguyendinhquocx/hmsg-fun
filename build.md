5:19:49 PM: Failed to compile.
5:19:49 PM: 
5:19:49 PM: ./src/app/api/send-report/route.ts:80:36
5:19:49 PM: Type error: Property 'updated_at' does not exist on type 'Company'.
5:19:49 PM:   78 |       notes: company.notes || '',
5:19:49 PM:   79 |       created_at: new Date(company.created_at).toLocaleDateString('vi-VN'),
5:19:49 PM: > 80 |       updated_at: new Date(company.updated_at).toLocaleDateString('vi-VN')
5:19:49 PM:      |                                    ^
5:19:49 PM:   81 |     })
5:19:49 PM:   82 |   })
5:19:49 PM:   83 |
5:19:49 PM: Next.js build worker exited with code: 1 and signal: null
5:19:49 PM: ​
5:19:49 PM: "build.command" failed                                        
5:19:49 PM: ────────────────────────────────────────────────────────────────
5:19:49 PM: ​
5:19:49 PM:   Error message
5:19:49 PM:   Command failed with exit code 1: npm run build (https://ntl.fyi/exit-code-1)
5:19:49 PM: ​
5:19:49 PM:   Error location
5:19:49 PM:   In build.command from netlify.toml:
5:19:49 PM:   npm run build
5:19:49 PM: ​
5:19:49 PM:   Resolved config
5:19:49 PM:   build:
5:19:49 PM:     base: /opt/build/repo/digital-crm
5:19:49 PM:     command: npm run build
5:19:49 PM:     commandOrigin: config
5:19:49 PM:     environment:
5:19:49 PM:       - NEXT_TELEMETRY_DISABLED
5:19:49 PM:     publish: /opt/build/repo/digital-crm/.next
5:19:49 PM:     publishOrigin: config
5:19:49 PM:   functionsDirectory: /opt/build/repo/digital-crm/netlify/functions
5:19:49 PM:   plugins:
5:19:49 PM:     - inputs: {}
5:19:49 PM:       origin: config
5:19:49 PM:       package: "@netlify/plugin-nextjs"
5:19:49 PM:   redirects:
5:19:50 PM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
5:19:50 PM:     - from: /*
      status: 200
      to: /index.html
  redirectsOrigin: config
5:19:50 PM: Build failed due to a user error: Build script returned non-zero exit code: 2
5:19:50 PM: Failing build: Failed to build site
5:19:50 PM: Finished processing build request in 1m20.13s