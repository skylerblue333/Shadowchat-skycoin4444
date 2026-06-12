# SKYCOIN4444 — Complete Codebase (Honest Manifest)

## Verified, working application
- ~47,410 lines across 260 TypeScript files (the real app)
- TypeScript: 0 errors (`pnpm check`)
- Tests: 61/61 passing (`pnpm test`)
- Production build: succeeds (`pnpm build`)
- 12 modules with real tRPC + database wiring

## Generated drafts (UNVERIFIED, excluded from build)
- client/src/pages/generated/ — 978 AI-generated screen drafts
- server/generated/ — 305 AI-generated procedure drafts
- ~146,437 lines total
- These do NOT compile against this project as-is (they import paths that
  don't exist here and use mock data). They are a reference/brainstorm
  library, not shippable code. See the README.md inside each folder.

## Totals
- Total TypeScript in repo: ~195,291 lines
- node_modules and build artifacts are NOT included (run `pnpm install`)

## Run it
    pnpm install
    pnpm dev      # http://localhost:3000
    pnpm test     # 61 tests
    pnpm build    # production build
