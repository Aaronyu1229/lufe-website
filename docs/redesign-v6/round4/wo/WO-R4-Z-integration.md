# WO-R4-Z — Round 4 integration: fonts, audits, redirects, video speed, Lighthouse

Read first: `docs/redesign-v6/wo/COMMON.md`, `docs/redesign-v6/round4/DECISIONS-R4.md` (all of §0, §D, §G).
Runs **after WO-R4-0, A, B and C are all merged** into `redesign/v6`.

- Branch: `v6/r4-z-integration` from latest `origin/redesign/v6`. PR → `redesign/v6`. Port `3590` (baseline `3591`).
- Allowed paths: `src/app/fonts/**` (the **only** WO that commits fonts), plus one-line fixes for audit findings in files touched by R4-0/A/B/C (list each fix with the audit line that triggered it). No new copy. Never `src/data/articles.ts`.

## 1. Fonts
1. `node scripts/check-font-subset.mjs src` → paste output.
2. `npm run font:rebuild` → re-run the guard → no uncovered characters.
3. Commit `src/app/fonts/**` alone: `chore(fonts): rebuild subset for round 4`.

## 2. Static audits (paste each command + output; each must be empty or justified)
```
# H-1 deleted pages and cases leave no trace
rg -n "shoe-brand|costco-health|electronics-tariff|field-notes|fieldNotes|FieldNotes|現場紀錄" src tests --glob '!src/data/articles.ts'
rg -n "皮鞋|襪子|電子大廠|產地轉移|Costco 120|120\+ 家|小山羊" src --glob '!src/data/articles.ts'
ls public/images/field-notes public/videos/hero/fieldnotes-* public/videos/hero/case-costco-* public/videos/hero/case-electronics-* public/videos/hero/case-shoe-* 2>&1 | head
rg -n "bubble-tea-4|case-1-costco|case-2-tariff|case-3-pivot|case-shoes|case-costco\.jpg|case-electronics\.jpg" src tests
# only next.config.ts may mention old slugs:
rg -n "shoe-brand|costco-health|electronics-tariff|field-notes" next.config.ts
# H-3 audience labels (image alt allowed)
rg -n "媽媽|家長|上班族|小資|白領|她們|年輕人喜歡|長輩明確" src --glob '!src/data/articles.ts' | rg -v 'alt'
# H-2 no counters on text values
rg -n "data-lufe-counter" src | wc -l    # list each site; text-valued cases must not carry it
# old copy gone
rg -n "想通的事|星期五晚上十一點的那封信|每一章讀到一半|補助與活動|四個案例|這四個案例|學校家長|想看實際做過的案子" src --glob '!src/data/articles.ts'
# subsidy structure
rg -n "SubsidyStageMap" src tests
# heroes still free of numbers (R3 G-2)
rg -n "className=\"display" src
```
Allowed hits: `next.config.ts` redirect sources; article copy in `src/data/articles.ts` (excluded); image `alt` text.

## 3. Redirects (on `next start -p 3590`)
```
for p in /cases/shoe-brand /cases/costco-health /cases/electronics-tariff /field-notes; do
  echo "== $p"; curl -sI http://localhost:3590$p | grep -iE "^HTTP|^location"
done
for p in /cases/goat-milk-soap-global /cases/fish-floss-us-fda /cases/bubble-tea /resources; do curl -s -o /dev/null -w "$p %{http_code}\n" http://localhost:3590$p; done
curl -s http://localhost:3590/sitemap.xml | rg -c "shoe-brand|costco-health|electronics-tariff|field-notes"   # must print 0
curl -s http://localhost:3590/sitemap.xml | rg -o "/cases/[a-z-]+" | sort -u
```
Expected: 308 + `location` `/cases`, `/cases/goat-milk-soap-global`, `/cases/fish-floss-us-fda`, `/resources`; new pages 200; sitemap lists exactly the three case slugs.

## 4. Runtime audits (Playwright 1440 and 390)
Routes: `/`, `/about`, `/about/aaron-yu`, `/assess`, `/cases`, `/cases/goat-milk-soap-global`, `/cases/fish-floss-us-fda`, `/cases/bubble-tea`, `/contact`, `/insights`, every `/insights/<slug>` linked from `/insights`, `/resources`, `/resources/subsidies`, `/services`, `/services/product-testing`, `/services/consignment`, `/services/localization`, `/services/call-center`, `/services/north-america`, `/services/optimize`, `/services/methodology`.
Per route print: `width route OK|OVERFLOW heroCounters=<n> breadcrumb=<n> brokenImgs=<n> videoSrc=<file|-> videoRate=<n|-> consoleErrors=<n>`
- `brokenImgs`: after scrolling to bottom in 600px steps (300ms waits) with `deviceScaleFactor: 2`, count `img` whose `complete && naturalWidth === 0`. Must be 0.
- `videoSrc`/`videoRate` (1440, after 3s): `currentSrc` basename and `playbackRate`; must match `src/data/heroVideos.ts` for that route (north-america must be the `-1080.mp4` at 1440 and `-720.mp4` at 390).
- Count-ups: `/` `#jumping` first value ends `10` and is mid-animation ≈1s after scroll-in; the `全球` and `FDA` tiles never change text; `/cases/bubble-tea` results end `10 家`; `/about` `#story` first counter ends `42`.
- `/about#story` scroll lands on the story section; `/resources/subsidies` compare buttons aligned (same `top`); article TOC mobile bar opens and navigates (repeat B's check on one article).
- Reduced-motion run on `/`, `/about`, `/resources/subsidies`, one article: counters final immediately; no hero video element mounted.

## 5. Perceived video speed (H-4)
Re-run the round-4 measurement script (`docs/redesign-v6/round4/measure-motion.sh`, committed by WO-R4-0) over every `public/videos/hero/*-720.mp4` in use and paste the table `file m rate(expected) rate(heroVideos.ts)`. Every in-use clip: `rate == clamp(round .05, √(75/m), .6, 1.25)` (home clips excluded) and none listed as timelapse in DECISIONS §D-1. Any mismatch → fix the number in `heroVideos.ts` (one-line fix) and list it.

## 6. Lighthouse (mobile) vs baseline `9c99ef9`
```
git worktree add /tmp/lufe-r4-base 9c99ef9 && (cd /tmp/lufe-r4-base && npm ci)
# build both with the COMMON mkdir lock, then:
(cd /tmp/lufe-r4-base && npx next start -p 3591 > /tmp/lufe-start-3591.log 2>&1 &) ; npx next start -p 3590 > /tmp/lufe-start-3590.log 2>&1 &
sleep 8
for p in / /about /cases /resources/subsidies; do
  for port in 3591 3590; do
    npx -y lighthouse@12 "http://localhost:$port$p" --form-factor=mobile --screenEmulation.mobile --throttling-method=simulate \
      --only-categories=performance --output=json --output-path="/tmp/lh-r4-$port-$(echo $p | tr / _).json" --quiet --chrome-flags="--headless=new"
  done
done
```
3 runs per pair, report medians: Performance, LCP, TBT, CLS, total transfer bytes; table route × (baseline, round 4, Δ).
Gate: no route loses > 5 points, CLS +0.05 max, LCP regression ≤ 300ms. Watch especially `/about` (new story figures must be lazy; only the hero poster eager) and `/resources/subsidies` (accordion bodies must not eagerly load images — there are none, confirm). If a gate fails, find and fix the cause in this WO or stop and report.
Clean up: kill servers (`lsof -i :3590 -i :3591` empty), `git worktree remove /tmp/lufe-r4-base`.

## 7. Verification + PR
COMMON.md steps 2–8 (tsc, lint, vitest summary, locked build route table — static routes stay `○`/`●`; `/field-notes` and the three old case routes must be gone from the table, the two new case routes present as `●`). Screenshot folder `/tmp/lufe-v6-shots/WO-R4-Z`. PR body: one line per DECISIONS-R4 note (#1–#24) `verified — <route/check>`; list §E items as still awaiting Aaron.
