# WO-Z — Integration (controller, or one Codex run after all lane PRs are merged)

Runs last, alone, on `redesign/v6` after WO-0, A, B, C, D are reviewed and merged (merge order: 0 → A → B → C → D; rebase each lane on the latest `redesign/v6` before merging if it is behind).

- Branch: `v6/z-integration` from `origin/redesign/v6`. PR → `redesign/v6`. Port `3105`.
- Allowed paths: `src/app/fonts/**` (generated), plus one-line fixes anywhere **only** for issues found by the checks below (list each in the PR).

## Steps
1. `npm ci`; `node scripts/check-font-subset.mjs src` → paste the missing-character list; `npm run font:rebuild`; commit `src/app/fonts/*` (`chore(fonts): rebuild subset for v6 copy`).
2. tsc / lint / `npx vitest run --maxWorkers=2` / locked build (COMMON.md) — all green, postbuild guard green.
3. Copy audits on `src/` and on built HTML (`.next/server/app/**/*.html`):
   - `rg -n "Aaron" src/components src/app src/data --glob '!src/data/articles.ts'` → every hit must be an allowed exception (DECISIONS §C-1); list them.
   - `rg -n "我" src/components src/app` (excluding quotes/FAQ answers/article content) → 0 in visible copy, or listed with reason.
   - v5 banned words (v5 DECISIONS §6) → 0 (except D18).
   - Full-stop audit: COMMON.md `rg` sweep over `src/components src/app src/data/{homeFaq,chapters,cases}.ts`; every remaining terminal `。` must be in a keep-category (§C-2). Paste the remaining list.
4. Media audit with Playwright on `next start`: for every page with a hero video, (a) no `<video>` in the server HTML (`curl -s … | grep -c "<video"` = 0, except `/` which already mounts client-side only — also 0), (b) after load + 4 s a `.lufe-hero-video[data-ready]` exists, (c) under `reducedMotion: 'reduce'` no video request appears in `page.on('request')` for `.mp4`, (d) opening no mega-menu pane triggers no image request (`#desktop-mega-menu` contains no `<img>` until the insights pane is opened — existing behaviour).
5. Lighthouse mobile (3 runs, median) for `/`, `/about`, `/cases/bubble-tea`, `/insights/go-no-go-framework` vs. the pre-v6 `redesign/v6` base (`e8072c0`). Pass: `/` performance ≥ 77 (baseline ≈ 79) and LCP not worse by > 0.3 s; other pages LCP not worse by > 0.5 s; accessibility ≥ 96, SEO 100. Paste the table.
6. Full screenshot pass 1440 + 390 for all 23 routes (`/ /services /services/product-testing /services/consignment /services/localization /services/call-center /services/north-america /services/optimize /services/methodology /about /about/aaron-yu /cases /cases/costco-health /cases/electronics-tariff /cases/shoe-brand /cases/bubble-tea /insights /insights/go-no-go-framework /contact /assess /resources /resources/subsidies /field-notes`): all `OK`, no console errors.
7. Form regression (do not submit to production): on `next start` with **no** `LUFE_DATABASE_URL`/`JP_LEAD_URL` env, submit the `/contact` form and confirm the UI shows the mailto fallback (proves the submit path still runs and fails safely). The real-lead end-to-end test is done by the controller with Keychain secrets, not here.
8. PR body: all outputs above + the DECISIONS §E list unchanged, so Aaron sees what still needs his answer.
