
# AGENT.md - Aurelia Bank (banking system)

## Project
A web banking system built as a resume project. Roles: CUSTOMER, EMPLOYEE, ADMIN. Modules: authentication, RBAC, KYC, accounts, transactions, statements, fixed deposits, notifications, admin panel, reports, fraud flags, audit log. Out of scope: loans, cards, beneficiaries, real payment networks. All money is simulated.

## Stack
Next.js (App Router) with TypeScript strict, MongoDB Atlas with Mongoose, Zod, jose (JWT, Edge-safe), bcryptjs, Nodemailer, pdf-lib, Recharts, Tailwind CSS with shadcn/ui, react-hook-form, Jest, mongodb-memory-server (replica set), Playwright, Pino.

## Folder structure
src/app        pages and API routes (real folders customer, employee, admin; (auth) group for public auth pages)
src/models     Mongoose schemas only
src/services   ALL business logic
src/lib        db, jwt, cookies, mailer, storage, money, limits, rate-limit, mask, interest, pdf
src/validators Zod schemas
src/components ui/, layout/, feature components
src/types
scripts        seed and job scripts
tests          unit, integration, e2e
docs

## Hard rules
1. All business logic lives in src/services. Route handlers only: get the session, validate with Zod, call a service, return the standard response.
2. Money is an integer number of paise everywhere (Number.isSafeInteger). Convert to rupees only for display through src/lib/money.ts. Never use floating point for money.
3. Every money movement runs inside a MongoDB session transaction and carries a unique idempotencyKey. Debits use ONE conditional update so a balance can never go below the minimum balance.
4. Every API route uses the withApi wrapper, validates input with Zod and calls requireRole() and, for owned resources, requireOwner(). Middleware alone is not enough.
5. Never log or return passwords, PINs, OTPs, hashes, tokens or full Aadhaar and PAN numbers. Mask Aadhaar and PAN by default and store them encrypted.
6. Sensitive actions write an audit entry through audit.service. Audit logs and transactions are append-only: write no update or delete code for them.
7. Errors: throw AppError(code, status, message). Responses are { success: true, data } or { success: false, error: { code, message } }.
8. Emails and notifications are sent asynchronously and must never fail the main request.
9. TypeScript strict, no any, ESLint and Prettier clean.
10. Do not add features, packages or files beyond the prompt. If something is missing, say so instead of guessing.

## Design system: Emerald Trust
Colours (CSS variables and Tailwind tokens):
  background #04201B, surface #0A2F28, surface-2 #0F3B33, foreground #ECFAF4,
  muted #8DB7AB, accent #2ED3A0, accent-2 #E9C46A (gold highlights only),
  positive #6CF0C0, danger #FF6B6B, border rgba(46,211,160,0.22)
Primary button: gradient 135deg from #2ED3A0 to #8BF0CF, text #04201B, pill radius, small lift on hover.
Fonts: Sora for headings, Manrope for body, both through next/font/google. Amounts use tabular-nums.
Style: dark emerald surfaces, rounded-2xl cards with a 1px border, soft mint glow, generous spacing, responsive from 360px, keyboard accessible, every input labelled.
Every page and list has loading, empty and error states. Amounts are always shown with formatINR (en-IN, rupee sign).
Brand name: Aurelia Bank (placeholder).

## Workflow
One step per prompt. Do only what the prompt asks. After coding run lint, typecheck and tests, then summarise the files changed and how to test manually. Never commit .env files. Prefer small, focused files.