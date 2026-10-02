# WO-R3-A — Cases (list + 4 detail pages), assess, about, author page

Read first: `docs/redesign-v6/wo/COMMON.md`, then `docs/redesign-v6/round3/DECISIONS-R3.md` (§0 G-2, G-3, G-4, G-5, G-6, G-9; §A #6–#14; §B-2–B-4; §C-1–C-4).
Depends on **WO-R3-0 merged** (uses `Carousel` `tone`, `data-carousel-parallax`, `data-lufe-counter` behaviour). Runs in parallel with WO-R3-B (disjoint paths).

- Branch: `v6/r3-a-cases-about-assess` from latest `origin/redesign/v6` (must contain R3-0). PR → `redesign/v6`. Port `3520`.
- Notes covered: #6, #7, #8, #9, #10, #11, #12, #13, #14 (timeline cards).
- Allowed paths:
  - `src/components/cases/**`, `src/app/cases/**`, `src/data/cases.ts` (only the `image` fields of story chapters)
  - `src/components/assess/**`, `src/app/assess/**`
  - `src/components/about/**` (incl. new `src/components/about/AuthorArticleList.tsx`), `src/app/about/**`
  - delete only: `public/images/cases/story/costco-health-2-*`, `costco-health-3-*`, `electronics-tariff-2-*`, `shoe-brand-3-*`, `bubble-tea-2-*`, `bubble-tea-3-*` (all tiers; `rg` the basenames across `src` and `public` first, paste the empty result)
  - tests: `tests/components/cases/**`, `tests/components/assess/**`, `tests/components/about/**`

## 1. Case detail — Apple layout (G-9, #12, #13, #14) — `CaseDetailPage.tsx`
Implement DECISIONS §C-1 exactly. Summary of required structure, in order:
1. Hero (G-3): breadcrumb `案例 / {tags[0].label}` with canonical classes; tag row (`mb-4`); `h1 mb-6 max-w-[880px] text-white`; `lead max-w-[640px] !text-white/75` with `summary`. **Delete the stats block from the hero.**
2. New results band directly after the hero: white, `border-b border-bd py-[64px] md:py-[88px]`; label `成果` (`text-[13px] font-semibold text-gold-d`); `grid gap-8 md:grid-cols-3 mt-6`; each stat: `border-t border-bd pt-6`, value `<div data-lufe-counter className="font-sans text-[clamp(48px,7vw,88px)] font-[650] leading-none tracking-[-.03em] text-navy">`, label `mt-3 text-[15px] text-tx2`.
3. Story: each chapter `grid gap-8 lg:grid-cols-12 border-t border-bd py-14 md:py-20` (first without the border-top); left `lg:col-span-4 lg:sticky lg:top-[112px] self-start` (number `01` 14px/600 `text-gold-d`, heading `h2` `text-[clamp(24px,2.6vw,34px)] font-[650] leading-[1.3] text-tx mt-2`); right `lg:col-span-7 lg:col-start-6` paragraphs `text-[18px] leading-[1.9] text-tx2`, first `mt-0`, next `mt-6`; the stage-links block stays at the end of its chapter's right column.
4. A chapter with `image` renders, **after** that chapter's grid, `<figure className="mx-auto max-w-[1180px]">` with an `overflow-hidden aspect-[4/3] md:aspect-[21/9]` box containing `TieredImage` (lazy, `sizes="(max-width: 1180px) 100vw, 1180px"`, `object-cover h-full w-full`, inline `transform: translateY(var(--lufe-figure-drift,0)) scale(1.06)`) and `figcaption` `mt-3 text-[13px] text-tx3` (= alt). Drift: a small client effect in this file sets `--lufe-figure-drift` to `((viewportCenter - figureCenter) / viewportHeight) * 4%` of figure height on rAF-throttled scroll, only while in view and not reduced motion.
5. Timeline: section background `bg-cream`; keep `Carousel` (R3-0 upgrade applies); card `border border-bd bg-white p-7 min-h-[260px] flex flex-col`; index box `grid h-10 w-10 place-items-center border border-gold/40 text-[15px] font-semibold text-gold-d tabular-nums` — **no `num` class, no fill**; rest unchanged.
6. Quote, CTA, related: unchanged.

`src/data/cases.ts`: remove the `image` property from: costco-health chapters 2 and 3; electronics-tariff chapter 2; shoe-brand chapter 3; bubble-tea chapters 2 and 3. Nothing else in that file changes (`articles.ts` is never touched). Delete the matching image files listed above.

## 2. Cases list (#11, G-4, G-6) — `CasesPage.tsx`
- Delete the whole middle `<section className="bg-white pb-0">…不確定自己比較像哪一條？…</section>`.
- Replace the bottom CTA block (`mt-20 border-t border-bd pt-14 text-center`) with §C-4: left (7 cols, left-aligned) keeps `你的故事會是哪一條？`, `聊聊你的產品，鹿飛先幫你看比較像哪一條路` and the `聊聊你的產品 →` button; remove the `先做 2 分鐘評估` link; right (5 cols) is a `Link href="/assess"` card with verbatim copy: `2 分鐘處境比對` / `不確定自己比較像哪一條？` / `三個問題，比對鹿飛做過的四個案例，找出最接近的一個` / chips `階段` `卡點` `市場` / `開始比對 →`. Hover lift 4px + arrow 4px (hover devices), press `scale(.985)`.
- Case card big number (`caseItem.num`, ~line 137): add `data-lufe-counter` (it used to count via `.num`; keep that behaviour).
- Road icon boxes: `border border-gold/40 text-gold-d` (remove `bg-gold/10` and the hover `bg-gold/15`; hover → `border-gold-d`).
- Hero: canonical G-3 classes (`h1 mb-6 max-w-[880px]`, lead `lead max-w-[640px] !text-white/75`); copy unchanged.

## 3. Assess (#10) — `AssessWizard.tsx`, `MatcherFlow.tsx`
Implement §C-3:
1. `EntryScreen` becomes: canonical hero (`HeroBackdrop src="/images/cases/cases-hero-collab-1600.webp"`, no `video`, `ScrollCue`), breadcrumb (`首頁 / 處境比對`, or `首頁 / 案例 / 比對` when `focusCase`), h1 + lead unchanged, focus-case box under the lead (`mt-8`), button `開始比對 ↓` (`href="#assess-quiz"`, smooth scroll via `scrollIntoView({ behavior: reduced ? "auto" : "smooth" })`, `mt-9`). Remove the side `TieredImage`.
2. `section#assess-quiz` white `scroll-mt-[74px] py-[80px] md:py-[112px]`, inner `mx-auto max-w-[860px]`: `MatcherFlow` + `AssessQuestionStaticCopy`.
3. `MatcherFlow` (only used by assess after WO-R3-B deletes the subsidy matcher — do not assume; it must still compile if both exist) restyled to light per §C-3 point 2: header row (big `01` Inter 56px `text-navy` + `/ 03` `text-tx3`; `← 上一步` / `重新開始` 14px `text-tx2` hover `text-navy`), three-segment progress (`flex gap-2`, each `h-[3px] bg-bd overflow-hidden`, inner `bg-gold-d origin-left` scaleX spring: answered 1, current 0.35, later 0), answered chips `border border-bd px-2.5 py-1 text-[13px] text-tx2` (label part `text-tx3`), question `h2 text-tx`, option cards light (§C-3), number box outline (selected `border-gold-d text-gold-d`, never filled), option grid `md:grid-cols-2` when the question has ≥5 options and none has a hint. Keep all behaviour (auto-advance 240ms, drag back, SSR of all questions, `aria-pressed`).
4. Below the quiz: `bg-cream py-[56px] md:py-[72px]` block `會和這四個案例比對` with 4 case tiles (`CASES` order; image `listImage` or `heroImage` — use `heroImage`, `aspect-[4/3]`, lazy, `sizes="(min-width: 768px) 25vw, 50vw"`; tag line = tags joined by ` · `; title 2-line clamp; `Link` to the case).
5. `AssessComplete` loading text `text-tx2`.
6. Result page: the ✓/× piece box → outline (`border border-gold text-gold` matched / `border-white/25 text-white/40` missed); nothing else.

## 4. About (#6, #7, #8) — `AboutPage.tsx`, `NetworkGlobe.tsx`
- Hero: delete the stats grid; lead keeps `mb-0`; `h1` → `h1 mb-6 max-w-[880px] text-white` (was `display`); breadcrumb → canonical classes (`mb-7 flex flex-wrap gap-2 text-[13px] text-white/60`).
- Story carousel: add `tone="dark"`; add `data-carousel-parallax` to each story card's `TieredImage` (its wrapper is already `overflow-hidden`).
- Team role icon boxes: `border border-gold/40 text-gold-d` (remove `bg-gold/10`).
- Network: city line `台北・馬尼拉・洛杉磯・紐約・舊金山・拉斯維加斯`; stat labels `國家與地區・躍馬物流網絡`, `出口案件・躍馬企業`, `年國際物流・躍馬企業` (values unchanged, keep `data-lufe-counter`); legend under the city line (`mt-4 grid gap-2 text-[13px] text-white/55`): row 1 `<span class="h-2 w-2 bg-gold">` + `資源網絡城市`; row 2 `<span class="h-2 w-2 bg-sky">` + `關注市場：新加坡・吉隆坡・曼谷・胡志明市・雅加達・宿霧`.
- `NetworkGlobe`: markers/arcs/colours/sizes and initial `phi: 4.1` exactly as DECISIONS §C-2 (per-marker `color` for the six market markers `[0.36, 0.56, 0.66]`, size `0.035`; network markers use default `markerColor`). Remove `toronto`.

## 5. Author page filter (#9) — `AaronAuthorPage.tsx` + new `AuthorArticleList.tsx`
- Hero: `h1` → `h1 mb-6 max-w-[880px] text-white` (was `display`); no other change.
- New client `AuthorArticleList({ articles }: { readonly articles: readonly InsightCard[] })`: `Segmented label="文章分類"` with options `全部` + each `Category` that occurs in `articles` (order: `菲律賓`, `印尼`, `東南亞趨勢`, `北美市場`, `出海實戰`, `企業體質` — read the union from `src/data/articles.ts` type, do not edit that file), each label followed by the count badge exactly like `/insights` (`<span className="lufe-insight-count" aria-hidden="true">{n}</span>`). Filter by `article.category`. All cards rendered in server HTML; non-matching wrapped in `hidden`. FLIP via `flip(grid, update)` from `@/components/ui`. URL sync `?cat=<category>` (encodeURIComponent; `全部` removes the param), read on mount and on `popstate`, same pattern as `InsightsPage`. Empty state impossible (only existing categories shown).
- `AaronAuthorPage` keeps the `h2 專欄文章` and renders `<AuthorArticleList articles={authorArticles} />` below it (`mb-10` wrapper around the Segmented with `max-w-full overflow-x-auto pb-1`, same as insights).

## 6. Tests
- `case-detail.test.ts`: hero section markup contains no `data-lufe-counter`; results band contains all three stat values; each case renders exactly 2 `<figure` in the story; timeline index has no `bg-gold`.
- `cases.test.ts`: no `不確定自己比較像哪一條？` outside the bottom card (exactly 1 occurrence); `開始比對 →` present; `href="/assess"` present.
- `assess.test.ts`: `id="assess-quiz"`, `開始比對 ↓`, `會和這四個案例比對`, all 4 case titles, all question labels/options in server HTML; no `bg-gold text-navy` in `MatcherFlow` markup.
- `about.test.ts`: `台北・馬尼拉・洛杉磯・紐約・舊金山・拉斯維加斯` present, `多倫多` absent, hero markup has no `data-lufe-counter`; author list markup contains `全部`, every article title, `lufe-insight-count`.

## 7. Verification
COMMON.md steps 1–8. Font guard: expected new characters from `成果`, `開始比對`, `會和這四個案例比對`, the market list, `紐約舊金山拉斯維加斯`, `資源網絡城市`, `關注市場`, `躍馬物流網絡` etc. — paste the guard output.
Screenshot paths: `/cases`, `/cases/bubble-tea`, `/cases/costco-health`, `/cases/electronics-tariff`, `/cases/shoe-brand`, `/assess`, `/assess?case=bubble-tea`, `/assess/result?stage=scaling&blocker=execution&market=sea`, `/about`, `/about/aaron-yu`, `/about/aaron-yu?cat=%E5%87%BA%E6%B5%B7%E5%AF%A6%E6%88%B0`.
Playwright extras (1440 + 390, paste output):
- Count-up mid-animation on `/cases/bubble-tea` results band: scroll the first `[data-lufe-counter]` after the hero into view, wait 1000ms, read text → numeric part strictly between 0 and 10; wait 2200ms → exactly `10 家`. Same for `/about` network `30+`.
- `/cases/bubble-tea`: `document.querySelectorAll("section.lufe-hero [data-lufe-counter], section.lufe-hero .num").length === 0`; story `figure` count `=== 2`.
- `/about/aaron-yu`: click the `出海實戰` segment → URL has `?cat=`, visible card count equals that category's count badge.
- `/assess`: click `開始比對 ↓` → `#assess-quiz` top within 0–80px of viewport top after 1s; answer 3 questions → URL becomes `/assess/result?...`.
- Globe (1440, `/about`): canvas present and no console errors (WebGL warnings in headless are acceptable only if `console.warn`, not errors).
