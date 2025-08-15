5:17:38 PM: Failed during stage 'building site': Build script returned non-zero exit code: 2 (https://ntl.fyi/exit-code-2)
5:17:38 PM: Failed to compile.
5:17:38 PM: 
5:17:38 PM: ./src/app/api/send-report/route.ts:74:30
5:17:38 PM: Type error: Property 'contact_phone' does not exist on type 'Company'. Did you mean 'contact_person'?
5:17:38 PM:   72 |       contact_person: company.contact_person || '',
5:17:38 PM:   73 |       contact_email: company.contact_email || '',
5:17:38 PM: > 74 |       contact_phone: company.contact_phone || '',
5:17:38 PM:      |                              ^
5:17:38 PM:   75 |       status: statusLabels[company.status as keyof typeof statusLabels] || company.status,
5:17:38 PM:   76 |       notes: company.notes || '',
5:17:38 PM:   77 |       created_at: new Date(company.created_at).toLocaleDateString('vi-VN'),
5:17:38 PM: Next.js build worker exited with code: 1 and signal: null
5:17:38 PM: ​
5:17:38 PM: "build.command" failed                                        
5:17:38 PM: ────────────────────────────────────────────────────────────────
5:17:38 PM: ​
5:17:38 PM:   Error message
5:17:38 PM:   Command failed with exit code 1: npm run build (https://ntl.fyi/exit-code-1)
5:17:38 PM: ​
5:17:38 PM:   Error location
5:17:38 PM:   In build.command from netlify.toml:
5:17:38 PM:   npm run build
5:17:38 PM: ​
5:17:38 PM:   Resolved config
5:17:38 PM:   build:
5:17:38 PM:     base: /opt/build/repo/digital-crm
5:17:38 PM:     command: npm run build
5:17:38 PM:     commandOrigin: config
5:17:38 PM:     environment:
5:17:38 PM:       - NEXT_TELEMETRY_DISABLED
5:17:38 PM:     publish: /opt/build/repo/digital-crm/.next
5:17:38 PM:     publishOrigin: config
5:17:38 PM:   functionsDirectory: /opt/build/repo/digital-crm/netlify/functions
5:17:38 PM:   plugins:
5:17:38 PM:     - inputs: {}
5:17:38 PM:       origin: config
5:17:38 PM:       package: "@netlify/plugin-nextjs"
5:17:38 PM:   redirects:
5:17:38 PM:     - from: /*
      status: 200
      to: /index.html
  redirectsOrigin: config
5:17:38 PM: Build failed due to a user error: Build script returned non-zero exit code: 2
5:17:38 PM: Failing build: Failed to build site
5:17:39 PM: Finished processing build request in 59.582s