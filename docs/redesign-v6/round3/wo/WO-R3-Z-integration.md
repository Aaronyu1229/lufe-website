# WO-R3-Z — Round 3 integration: fonts, global audits, Lighthouse

Read first: `docs/redesign-v6/wo/COMMON.md`, `docs/redesign-v6/round3/DECISIONS-R3.md` (§0 all G rules).
Runs **after WO-R3-0, WO-R3-A and WO-R3-B are all merged** into `redesign/v6`.

- Branch: `v6/r3-z-integration` from latest `origin/redesign/v6`. PR → `redesign/v6`. Port `3590` (baseline `3591`).
- Allowed paths: `src/app/fonts/**` (this WO is the **only** one that commits fonts), plus one-line fixes for audit findings in any file touched by R3-0/A/B (list each fix in the PR body with the audit line that triggered it). No new copy. Never `src/data/articles.ts`.

## 1. Fonts
1. `node scripts/check-font-subset.mjs src` → paste output (expect the round-3 characters).
2. `npm run font:rebuild` → re-run the guard → must report no uncovered characters.
3. Commit `src/app/fonts/**` in one commit `chore(fonts): rebuild subset for round 3`.

## 2. Global audits (paste every command and its output; each must end clean or with a listed fix)
```
# G-6 step connectors gone
rg -n "lufe-step-icon::after|--lufe-step-progress" src
# G-6 no filled / tinted icon boxes (buttons and badges are allowed — justify any remaining hit)
rg -n "place-items-center[^\"]*\bbg-(gold|navy|sky|ember)\b|bg-gold text-navy[^\"]*place-items|bg-gold/10|bg-gold/\[\.08\]|bg-sky/10|iconBg" src
rg -n 'fill="currentColor"' src/components
# G-4 counters: only data-lufe-counter drives count-ups
rg -n "\.num\b" src/components/DelightLayer.tsx
# G-8 inline article images gone
rg -n "articleInlineImages|inlineImages|insights/inline" src public tests ; ls public/images/insights/inline 2>&1
# G-7 one FAQ style: no other FAQ implementation
rg -n "<Disclosure|<details|<dl" src/app src/components | rg -v "ArticleDetail.tsx"   # TOC Disclosure + sources <details> in ArticleDetail are not FAQs
rg -ln "FaqSection|FaqList|AccordionItem" src
# G-2 / G-3 heroes: static check
rg -n "className=\"display" src
# removed sections
rg -n "SubsidyMatcher|id=\"match\"|#partners|多倫多|toronto" src
# deleted case story images not referenced
rg -n "costco-health-2|costco-health-3|electronics-tariff-2|shoe-brand-3|bubble-tea-2|bubble-tea-3" src public
```
Expected: no hits except documented allowances (`ArticleDetail` TOC `Disclosure` and sources `<details>`; methodology `RubricItem` uses `AccordionItem`).

## 3. Runtime audits (Playwright, 1440 and 390, against `next start -p 3590`)
Routes: `/`, `/about`, `/about/aaron-yu`, `/assess`, `/cases`, `/cases/costco-health`, `/cases/electronics-tariff`, `/cases/shoe-brand`, `/cases/bubble-tea`, `/contact`, `/field-notes`, `/insights`, every `/insights/<slug>` linked from `/insights` (collect hrefs from the page), `/resources`, `/resources/subsidies`, `/services`, `/services/product-testing`, `/services/consignment`, `/services/localization`, `/services/call-center`, `/services/north-america`, `/services/optimize`, `/services/methodology`.
For every route print one line: `width route OK|OVERFLOW heroCounters=<n> heroNums=<n> breadcrumb=<n> faqOpenOnLoad=<n> articleFigures=<n|-> videoRate=<n|-> consoleErrors=<n>`:
- `scrollWidth === innerWidth` (OK).
- `section.lufe-hero [data-lufe-counter]` and `section.lufe-hero .num` both `0`.
- breadcrumb count `1` for every route except `/` and article pages.
- `[aria-expanded="true"]` inside FAQ lists `0` on load (methodology rubric excluded).
- article pages: `#main-content article figure` `=== 1`.
- `videoRate`: after 3s, `document.querySelector("video.lufe-hero-video")?.playbackRate` must equal the DECISIONS G-1 table value for that route (1440 only; at 390 report `-` if the video did not mount).
- console errors `0`.
Count-up checks (mid-animation ≈1s after scroll-in, final after +2.2s): `/` `#jumping` first counter (0 < mid < 120, end `120+`), `/cases/bubble-tea` results band (end `10 家`), `/cases/shoe-brand` results (end `4.7★` — verify the decimal renders `x.y★` mid-way), `/about` network (`30+`), `/cases` first case card number. Print `mid/end` and `MID-OK|MID-FAIL`.
Carousel check on `/` (cases carousel) and `/about` (story, dark tone) at 390: flick-drag and print counter text + thumb `transform` before/after.
Also run once with `page.emulateMedia({ reducedMotion: "reduce" })` on `/` and `/cases/bubble-tea`: counters show final values immediately, carousel slides all `opacity: 1`.

## 4. Lighthouse (mobile) vs baseline `65de4da`
```
git worktree add /tmp/lufe-r3-base 65de4da && (cd /tmp/lufe-r3-base && npm ci)
# build both with the mkdir lock (COMMON step 5), then:
(cd /tmp/lufe-r3-base && npx next start -p 3591 > /tmp/lufe-start-3591.log 2>&1 &) ; npx next start -p 3590 > /tmp/lufe-start-3590.log 2>&1 &
sleep 8
for p in / /about /cases/bubble-tea /services/call-center; do
  for port in 3591 3590; do
    npx -y lighthouse@12 "http://localhost:$port$p" --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate \
      --only-categories=performance --output=json --output-path="/tmp/lh-r3-$port-$(echo $p | tr / _).json" --quiet --chrome-flags="--headless=new"
  done
done
```
Run each pair 3 times and report the median: Performance score, LCP, TBT, CLS, total transfer bytes. Table: route × (baseline, round 3, Δ).
Gate: no route loses more than 5 performance points or gains more than 0.05 CLS versus baseline; LCP must not regress by more than 300ms. If a gate fails, find the cause (e.g. eager images in the subsidy panels, globe, carousel per-frame work) and fix it in this WO, or stop and report.
Clean up: kill both servers (`lsof -i :3590 -i :3591` empty), `git worktree remove /tmp/lufe-r3-base`.

## 5. Verification + PR
COMMON.md steps 2–8 (tsc, lint, vitest summary, locked build route table — all static routes stay `○`/`●`), the audit outputs above, the Lighthouse table, screenshot folder `/tmp/lufe-v6-shots/WO-R3-Z`. PR body: one line per DECISIONS-R3 note (#1–#28) with `verified — <route/check>`; list §E items as still awaiting Aaron.
