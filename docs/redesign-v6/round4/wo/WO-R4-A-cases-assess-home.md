# WO-R4-A — Cases (soap, fish floss, bubble tea), assess, home case surfaces

Read first: `docs/redesign-v6/wo/COMMON.md` (all rules apply), then `docs/redesign-v6/round4/DECISIONS-R4.md` (authority for round 4: §0 H-1, H-2, H-3; §A notes #3, #5–#9; §B-2, §B-3, §B-4, §B-5; §C-1; §F). All Chinese copy below is pasted from DECISIONS — if anything differs, DECISIONS wins; stop and say so in the PR.
Runs **after WO-R4-0 is merged**, in parallel with WO-R4-B. Do not touch any WO-R4-B / WO-R4-C file.

- Branch: `v6/r4-a-cases` from latest `origin/redesign/v6`. PR → `redesign/v6`. Port `3520`.
- Notes covered: #3 (wire the video), #5, #6, #7, #8, #9.
- Allowed paths:
  - `src/data/cases.ts`
  - `src/components/cases/CasesPage.tsx`, `src/components/cases/CaseDetailPage.tsx`
  - `src/components/assess/AssessWizard.tsx`, `src/components/assess/MatcherFlow.tsx` (only if a type needs the new blocker), `src/app/assess/**`
  - `src/components/home/CasesSection.tsx`, `src/components/home/JumpingSection.tsx`
  - `src/data/subsidies.ts` (only the `CONTEXTUAL_COPY` and `CONTEXT_SUBSIDY_MAP` case entries)
  - `public/images/cases/**` (generated tiers for the new story images + deletions listed below), `public/case-costco.jpg`, `public/case-electronics.jpg`, `public/case-shoes.jpg` (delete), `public/images/cases/detail/**` (deletions/new)
  - tests: `tests/components/cases/**`, `tests/components/assess/**`, `tests/components/home/**`, `tests/data/cases*.test.ts` (new)
- Never edit `src/data/articles.ts`, `src/data/heroVideos.ts` (WO-R4-0 already added `case:goat-milk-soap-global`, `case:fish-floss-us-fda`, `assess` and removed the old case keys), `next.config.ts` (redirects already in place).

## 0. Assets you receive from WO-R4-0
WO-R4-0 commits the source photos `public/images/cases/story/bubble-tea-tasting.jpg`, `goat-soap-1.jpg`, `goat-soap-2.jpg`, `fish-floss-1.jpg`, `fish-floss-2.jpg` (all ≥2400px wide) **without tiers**. After you reference them as `…-1600.webp` in `cases.ts`, run `npm run images:build` and commit the generated `-640/-1080/-1600/-2400.webp` files. (commit only tiers of your new files; `git checkout --` any other tier the script rewrote) Hero posters for the two new cases (`/images/hero-video/case-soap-1600.webp`, `/images/hero-video/case-floss-1600.webp`) and their 2400 tiers are already committed by WO-R4-0. If any of these files is missing, stop and report — do not substitute.

## 1. Case data (`src/data/cases.ts`)
1. Delete `shoeBrand`, `costcoHealth`, `electronicsTariff` objects and their `CASE_CARD_META` entries.
2. Add `goatMilkSoap` (slug `goat-milk-soap-global`) and `fishFloss` (slug `fish-floss-us-fda`) with **exactly** the copy in DECISIONS §B-2 and §B-3 (title, summary, tags, industry, market, num, stats, story headings/paragraphs/images/`showStageLinks`, timeline, stagesUsed, related, challenge, approach, result, `keyDecisions: []`, no `quote`). Card meta from the same sections.
   - `heroImage`: soap `/images/hero-video/case-soap-1600.webp`, floss `/images/hero-video/case-floss-1600.webp`. `listImage`: same value as `heroImage`.
   - Story image paths: `/images/cases/story/goat-soap-1-1600.webp`, `/images/cases/story/goat-soap-2-1600.webp`, `/images/cases/story/fish-floss-1-1600.webp`, `/images/cases/story/fish-floss-2-1600.webp`. Alts: soap `木桌上的手工羊奶皂`, `包裝好的手工皂與牛皮紙標籤`; floss `市場攤位上的魚乾與蝦乾` (position `center 60%`), `尚未印刷的食品包裝袋`. Soap 1 position `center 75%`.
3. Bubble tea: apply DECISIONS §B-4 exactly (new chapter 2 with image `/images/cases/story/bubble-tea-tasting-1600.webp` alt `三杯不同口味的珍珠奶茶，等待試飲`, `position: "center 62%"`, `aspect: "16/9"`, new chapter 3, remove the image from the 「核心直營、外圍加盟」 chapter, timeline Month 1 desc, card beat 3, `approach`, `keyDecisions[0].reasoning`; remove `甜度偏高` and `25–35 歲白領` everywhere in the object). `related: ["goat-milk-soap-global", "fish-floss-us-fda"]`.
4. `CASES = [goatMilkSoap, fishFloss, bubbleTea]`.
5. `INDUSTRIES`: `all 全部產業`, `food 食品`, `personal-care 美妝個護`, `fnb 餐飲飲品`. `MARKETS`: `all 全部市場`, `north-america 北美`, `sea 東南亞`, `global 全球`.
6. Remove the file-header comment lines that no longer apply only if they name deleted cases (none currently — leave the header alone).

## 2. Text-valued results (DECISIONS §C-1)
Add a tiny exported helper in `src/data/cases.ts`: `export function isNumericValue(value: string): boolean { return /\d/.test(value); }`.
- `CaseDetailPage` results band: numeric → current markup (with `data-lufe-counter`); text → no `data-lufe-counter`, classes `font-sans text-[clamp(32px,4vw,48px)] font-[650] leading-[1.15] tracking-[-.02em] text-navy`.
- `CasesPage` card big number (`data-lufe-counter` element) and panel number: numeric → unchanged; text → no `data-lufe-counter`, card size `text-[clamp(40px,5vw,56px)]`.
- `CaseDetailPage` related cards `num`: text → `text-[28px]` (numeric stays 36px).
- Home (`CasesSection`, `JumpingSection`): same rule; home card text values `text-[36px]` (featured `text-[44px]`), Jumping text values `text-[clamp(26px,3.2vw,36px)]`.

## 2b. Story image aspect override
`StoryChapter.image` gains optional `aspect?: "16/9"`. When set, the figure uses `aspect-[4/3] md:aspect-[16/9]` instead of `md:aspect-[21/9]` (tall subjects such as the three cups would lose their lids/pearls at 21:9). Only bubble-tea-tasting uses it.

## 3. Bubble-tea image bug (#6) and a guard test
Root cause (do not re-investigate, just fix and guard): `bubble-tea-4` was a 2:3 portrait with no `-2400` tier while `imageTierSrcSet` advertises `2400w` for every `-1600.webp` source → 404 on high-DPR desktops, plus a crop to 21:9.
1. Delete `public/images/cases/story/bubble-tea-4.png`, `bubble-tea-4-640.webp`, `bubble-tea-4-1080.webp`, `bubble-tea-4-1600.webp` (after `rg -n "bubble-tea-4" src tests` shows no other use).
2. New test `tests/data/cases-images.test.ts`: for every case, every `story[].image.src` and `heroImage`, compute the URLs from `imageTierSrcSet(src)` (import from `@/lib/image-tiers`; for hero posters use the same `maxTierWidth` you pass at render time) and assert each file exists under `public/` (`fs.existsSync`). Also assert each story image source jpg/png is landscape (use `sharp` only if already a dependency — check `package.json`; otherwise read the `-640.webp` width/height via the WebP header bytes, or skip the orientation assertion and say so).

## 4. Cases page (`CasesPage.tsx`)
- Hero: no change in markup — the video/poster now comes from `HERO_VIDEOS.cases` (WO-R4-0 swapped it). Keep the `src` prop; it is the no-video fallback.
- 「2 分鐘處境比對」 card body: `三個問題，比對鹿飛做過的三個案例，找出最接近的一個`.
- Filters render the new `INDUSTRIES` / `MARKETS` (data-driven, no markup change). Empty-state text unchanged.

## 5. Assess (`AssessWizard.tsx`)
1. Hero: `<HeroBackdrop src="/images/cases/cases-hero-collab-1600.webp" video={HERO_VIDEOS.assess} />` (import `HERO_VIDEOS`).
2. Lead: `三個問題，約 2 分鐘。比對鹿飛做過的三個案例，找出最接近的一個，以及當時的判斷方法`.
3. Bottom heading `會和這三個案例比對`; grid `md:grid-cols-3` (mobile stays 2 → change to `grid-cols-1 sm:grid-cols-3` so three cards never leave an orphan; keep image aspect).
4. `Blocker` type gains `"compliance"`; `BLOCKER_SHORT.compliance = "搞法規"`; add the option to `BLOCKER_OPTIONS` (append last): `{ value: "compliance", label: "不確定法規、成分或標示過不過得了關", hint: "訊號：產品在台灣合法上架，但不知道目的地的主管機關、成分限制與標示格式" }`.
5. `CASE_SIGNATURES`: `{ slug: "goat-milk-soap-global", stage: "tested", blocker: "market", market: "other" }`, `{ slug: "fish-floss-us-fda", stage: "idea", blocker: "compliance", market: "us" }`, `{ slug: "bubble-tea", stage: "scaling", blocker: "execution", market: "sea" }`.
6. `rg -n "costco|shoe|electronics|tariff" src/app/assess src/components/assess` must be empty; fix `/assess/result` if it hard-codes slugs or narrative strings for deleted cases (keep its UI otherwise).
7. Keep every other string.

## 6. Home
- `JumpingSection.tsx` `JUMPING_STATS` = DECISIONS §B-5 three items (`10` bubble-tea, `全球` soap, `FDA` floss) with their hrefs. Label above (`鹿飛案例成果`) unchanged.
- `CasesSection.tsx`: `Industry` type → `"food" | "personal-care" | "fnb"`; `Market` → `"north-america" | "sea" | "global"`; `trustSignal` becomes optional (render `TrustSignal` only when present). `HOME_CASE_CARDS` = soap, floss, bubble-tea with DECISIONS §B-5 copy; `featured: true` only for bubble-tea; images: soap/floss use their hero posters (`/images/hero-video/case-soap-1600.webp`, `/images/hero-video/case-floss-1600.webp`), bubble-tea unchanged. Delete now-unused images `public/images/cases/case-1-costco*`, `case-2-tariff*`, `case-3-pivot*` after `rg` confirms no references (the `review/site` snapshot under docs is not a reference).
- Delete `public/images/cases/detail/costco-health-hero*`, `electronics-tariff-hero*`, `shoe-brand-hero*`, `public/images/cases/story/costco-health-*`, `electronics-tariff-*`, `shoe-brand-*`, `public/case-costco.jpg`, `public/case-electronics.jpg`, `public/case-shoes.jpg` — each only after `rg -n "<basename>" src tests` is empty.

## 7. Subsidy contextual copy (`src/data/subsidies.ts`)
Remove the three `/cases/electronics-tariff`, `/cases/costco-health`, `/cases/shoe-brand` entries from `CONTEXTUAL_COPY` and `CONTEXT_SUBSIDY_MAP`; add the two new entries exactly as DECISIONS §B-5 (both map to `market-expansion`). Touch nothing else in this file.

## 8. Tests
- Update tests that pin deleted cases/copy (`tests/components/assess/assess.test.ts`, `tests/components/home/page.test.ts`, case tests). Add:
  - `tests/components/cases/case-r4.test.ts`: `CASES.map(c => c.slug)` equals `["goat-milk-soap-global","fish-floss-us-fda","bubble-tea"]`; server render of each detail page contains its title and every story heading; soap/floss render **no** `data-lufe-counter`; bubble-tea results band renders 3 `data-lufe-counter`; bubble-tea HTML contains `九宮格` and `盲飲` and not `甜度偏高` / `白領`; no case contains `Costco` in title/summary/story.
  - assess: a stage=idea / blocker=compliance / market=us answer set ranks `fish-floss-us-fda` first.
- Copy audit (paste output): `rg -n "shoe-brand|costco-health|electronics-tariff|Costco 120|120\+|皮鞋|襪子|電子大廠|四個案例|這四個|甜度偏高|白領" src tests --glob '!src/data/articles.ts'` → empty (the North America service copy `Costco、Walmart 與 Amazon` in `chapters.ts` / `services.ts` is allowed and not in your paths).

## 9. Verification
COMMON.md steps 1–8. Playwright paths: `/cases /cases/goat-milk-soap-global /cases/fish-floss-us-fda /cases/bubble-tea /assess / `. Additionally (paste output):
- `/cases/bubble-tea` at 1440 with `deviceScaleFactor: 2`: every `img` in `#main-content` has `naturalWidth > 0` after scrolling each into view (print `img broken=<n>`; must be 0).
- `/cases` filter: click `美妝個護` → exactly 1 visible card; `全球` market → 1; `北美` → 1.
- `/assess` at 1440: `document.querySelector("video.lufe-hero-video")` exists after 3 s and its `playbackRate` equals the `assess` value in `src/data/heroVideos.ts`.
- Old URLs on `next start` (redirects come from WO-R4-0): `for p in /cases/shoe-brand /cases/costco-health /cases/electronics-tariff; do curl -sI http://localhost:3520$p | head -3; done` → `308`, `location:` `/cases`, `/cases/goat-milk-soap-global`, `/cases/fish-floss-us-fda` (Next uses 308 for `permanent: true`; that is the intended "301-class" permanent redirect).
- Font guard output before local rebuild (new characters expected); never commit `src/app/fonts`.
PR body: `#3 #5 #6 #7 #8 #9` lines, copy kept/changed, full-stop sweep (case-story paragraphs keep `。`; card beats / labels / summaries drop it — the DECISIONS strings are already correct).
