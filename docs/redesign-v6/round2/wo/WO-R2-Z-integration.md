# WO-R2-Z — Round-2 integration (alone, last)

Runs after WO-R2-0, WO-R2-1 and WO-R2-A are reviewed and merged into `redesign/v6` (merge order 0 → 1 → A; rebase a lane on the latest `redesign/v6` before merging if it is behind).
Read `docs/redesign-v6/wo/COMMON.md` and `docs/redesign-v6/round2/DECISIONS-R2.md`.

- Branch: `v6/r2-z-integration` from latest `origin/redesign/v6`. PR → `redesign/v6`. Port `3419`.
- Baseline for comparisons: `d09dc9d` (redesign/v6 head before round 2). Verify with `git merge-base --is-ancestor d09dc9d origin/redesign/v6`.
- Allowed paths: `src/app/fonts/**` (generated), `src/data/chapters.ts` (§2 only), `tests/**` (only tests broken by §2), plus one-line fixes anywhere **only** for problems found by §3–§6 (list each in the PR).

## Steps
1. `npm ci`; `node scripts/check-font-subset.mjs src` → paste the missing-character list; `npm run font:rebuild`; commit `src/app/fonts/*` as `chore(fonts): rebuild subset for round-2 services copy`.
2. Orphan cleanup: `rg -n "overview" src` → `Chapter.overview` / the `Overview` type / every `overview:` block in `CHAPTERS` must now be unused (WO-R2-A stopped reading it). Delete them and any test that pinned them. Commit `refactor(services): drop unused chapter overview copy`.
3. tsc / lint / `npx vitest run --maxWorkers=2` / locked build (COMMON.md) — all green; route table: all 8 `/services*` routes still `○`.
4. Copy audits (paste results):
   - `rg -n "老師" src --glob '!src/data/articles.ts'` → only `src/components/services/methodology/content.ts` (2 hits, frozen per DECISIONS-R2 §E-4).
   - `rg -n "你可能是這樣走到這裡的|MailPreview|lufe-mail|Where is my refund" src` → 0.
   - `rg -n "data-lufe-counter|heroStats" src/components/services` → 0 (rule R-1).
   - `rg -n "躍馬" src/components/services` → 0 (it may remain in `src/data/serviceFaqs.ts` answer 3 only).
   - `git diff d09dc9d -- src/components/services/methodology/content.ts` → empty (v2.1 copy frozen).
   - Full-stop sweep (COMMON.md command) over `src/components/services src/components/faq src/data/chapters.ts src/data/serviceFaqs.ts`: every terminal `。` must be a FAQ answer; paste the list.
   - `rg -n "我" src/components/services src/components/faq src/data/chapters.ts src/data/serviceFaqs.ts` → only 「我們」 inside body text / FAQ answers; no 「我」 alone, no pronoun in any `h2`/`h3`.
5. Screenshot pass (COMMON.md script) 1440 + 390 for: `/ /services /services/product-testing /services/consignment /services/localization /services/call-center /services/north-america /services/optimize /services/methodology`. All `OK`, no console errors. Repeat once with `reducedMotion: "reduce"` (add `reducedMotion` to `newPage`) — no console errors, chapter-bar ping absent (`getComputedStyle(dot, "::after").animationName === "none"`).
6. Image weight check: on `/services/call-center` at 390, collect `page.on("response")` for `/images/services/` during load **without scrolling** → no scenario/fit image may load before scrolling (all lazy). Then scroll to bottom and confirm each loaded image is the 640 or 1080 tier.
7. Lighthouse mobile, 3 runs each, median, for `/services` and `/services/call-center`, current head vs baseline `d09dc9d` (build the baseline in a separate worktree `git worktree add /tmp/lufe-r2-base d09dc9d`, `npm ci`, locked build, `next start -p 3418`; remove the worktree afterwards):
   ```
   npx -y lighthouse@12 http://localhost:<port><path> --preset=perf --form-factor=mobile --screenEmulation.mobile --only-categories=performance,accessibility,seo --output=json --output-path=/tmp/lufe-r2-lh-<label>-<n>.json --chrome-flags="--headless=new"
   ```
   (accessibility/seo need the default config: run a second command without `--preset=perf` if your Lighthouse version rejects the combination.) Table: performance, LCP, CLS, TBT, accessibility, SEO — baseline vs head.
   Pass: performance not lower than baseline by more than 3 points; LCP not worse by more than 0.3 s; CLS ≤ 0.1; accessibility ≥ 96; SEO 100. If a page fails, find the cause (most likely an eager image or a non-lazy tile) and fix it in a one-line change, or stop and report.
8. PR body: outputs of 1–7, the DECISIONS-R2 §E list copied unchanged (so Aaron sees what still needs his answer), and the list of one-line fixes.
