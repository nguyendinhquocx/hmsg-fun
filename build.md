5:25:12 PM:    Linting and checking validity of types ...
5:25:14 PM: Failed to compile.
5:25:14 PM: 
5:25:14 PM: ./src/components/dashboard/company-modal.tsx:52:11
5:25:14 PM: Type error: Type '"active" | "inactive" | "potential"' is not assignable to type '"potential"'.
5:25:14 PM:   Type '"active"' is not assignable to type '"potential"'.
5:25:14 PM:   50 |           contact_email: company.contact_email || '',
5:25:14 PM:   51 |           contact_phone: company.contact_phone || '',
5:25:14 PM: > 52 |           status: company.status,
5:25:14 PM:      |           ^
5:25:14 PM:   53 |           notes: company.notes || ''
5:25:14 PM:   54 |         })
5:25:14 PM:   55 |       } else {
5:25:14 PM: Next.js build worker exited with code: 1 and signal: null
5:25:14 PM: ​
5:25:14 PM: "build.command" failed                                        
5:25:14 PM: ────────────────────────────────────────────────────────────────
5:25:14 PM: ​
5:25:14 PM:   Error message
5:25:14 PM:   Command failed with exit code 1: npm run build (https://ntl.fyi/exit-code-1)
5:25:14 PM: ​
5:25:14 PM:   Error location
5:25:14 PM:   In build.command from netlify.toml:
5:25:14 PM:   npm run build
5:25:14 PM: ​
5:25:14 PM:   Resolved config
5:25:14 PM:   build:
5:25:14 PM:     base: /opt/build/repo/digital-crm
5:25:14 PM:     command: npm run build
5:25:14 PM:     commandOrigin: config
5:25:14 PM:     environment:
5:25:14 PM:       - NEXT_TELEMETRY_DISABLED
5:25:14 PM:     publish: /opt/build/repo/digital-crm/.next
5:25:14 PM:     publishOrigin: config
5:25:14 PM:   functionsDirectory: /opt/build/repo/digital-crm/netlify/functions
5:25:14 PM:   plugins:
5:25:14 PM:     - inputs: {}
5:25:14 PM:       origin: config
5:25:14 PM:       package: "@netlify/plugin-nextjs"
5:25:14 PM:   redirects:
5:25:15 PM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
5:25:15 PM:     - from: /*
      status: 200
      to: /index.html
  redirectsOrigin: config
5:25:15 PM: Build failed due to a user error: Build script returned non-zero exit code: 2
5:25:15 PM: Failing build: Failed to build site
5:25:15 PM: Finished processing build request in 33.04s