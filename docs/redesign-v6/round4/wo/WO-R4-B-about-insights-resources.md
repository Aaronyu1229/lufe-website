# WO-R4-B — About story, insights hero, article TOC, resources, subsidy plans

Read first: `docs/redesign-v6/wo/COMMON.md`, then `docs/redesign-v6/round4/DECISIONS-R4.md` (§0 H-6; §A #1 #2 #11 #13 #15 #16; §B-1, §B-6, §B-7; §C-2, §C-3, §C-4, §C-5). Also load the `apple-design` skill guidance summarised in DECISIONS H-6 (springs damping 1, interruptible, feedback on press, progressive disclosure, reduced motion = instant).
Runs **after WO-R4-0 is merged**, in parallel with WO-R4-A. Do not touch WO-R4-A / WO-R4-C files.

- Branch: `v6/r4-b-content` from latest `origin/redesign/v6`. PR → `redesign/v6`. Port `3530`.
- Notes covered: #1, #2, #11, #13, #15, #16 (the #12 / #14 videos are already swapped by WO-R4-0 through `HERO_VIDEOS`).
- Allowed paths:
  - `src/components/about/AboutPage.tsx`, `src/components/story/StoryChapters.tsx` (new, optional), `public/images/about/about-port-*.webp` (generated tiers)
  - `src/components/insights/InsightsPage.tsx` (hero h1 + lead only), `src/components/insights/ArticleDetail.tsx` (TOC only), `src/components/insights/ArticleToc.tsx` (new, if you extract)
  - `src/app/resources/page.tsx`
  - `src/app/resources/subsidies/page.tsx` (only if an import changes), `src/components/subsidy/SubsidyPlans.tsx`, `src/components/subsidy/SubsidyPlanPanel.tsx`, `src/components/subsidy/SubsidyCompare.tsx` (new; replaces `SubsidyStageMap.tsx`, delete that file)
  - `src/components/Navbar.tsx` and `src/components/Footer.tsx` — **only** the label string `補助與活動` → `補助與資源` (WO-R4-0 already removed the field-notes links)
  - `src/data/chapters.ts` — **only** `CHAPTER_ARTICLE_TAGS.sub` → `補助與資源` (WO-R4-C edits other parts of this file later; keep your diff to that one line)
  - tests: `tests/components/about/**`, `tests/components/insights/**`, `tests/components/article-detail.test.ts`, `tests/components/resources/**`, `tests/components/subsidy/**`, `tests/components/navbar.test.ts` (label only)
- Never edit `src/data/articles.ts`, `src/data/subsidies.ts` (content stays word-for-word; you only re-present it), `src/data/heroVideos.ts`.

## 1. About page (#1, #2) — DECISIONS §B-1 + §C-2
1. Hero: h1 `從貨櫃出發，` + `<br /><span className="text-gold">陪台灣企業走完抵達之後</span>`; the quote paragraph unchanged; lead `鹿飛協助台灣企業在北美與東南亞落地：市場驗證、通路進入、在地團隊與客服，一個窗口串起出海的每一段。這個故事，要從躍馬企業說起`. Move `id="story"` off the hero onto the new story section (Navbar link `/about#story` must land on the story start). Hero keeps `HeroBackdrop … video={HERO_VIDEOS.about}`.
2. Replace the dark `Carousel` story section with `section#story` (white) per §C-2: small label `鹿飛的故事`, then four chapters from a new exported `storyChapters` array (remove `storyCards`):
   ```ts
   export const storyChapters = [
     { num: "01", label: "起點・躍馬企業", title: "42 年，把台灣的貨送到世界各地", paragraphs: [ /* §B-1 */ ], stats: true, jumpingLink: true, image: { src: "/images/about/about-port-1600.webp", alt: "貨櫃碼頭——躍馬 42 年的日常", position: "center 40%" } },
     { num: "02", label: "市場觀察", title: "貨都送到了，故事卻常常停在抵達之後", paragraphs: [ … ] },
     { num: "03", label: "關鍵洞察", title: "差別不在物流，而在抵達之後有沒有人接手", paragraphs: [ …, … ], image: { src: "/images/about/story-belief-compass-1600.webp", alt: "羅盤放在世界地圖上——有計畫的探索", maxTierWidth: 1600, position: "center" } },
     { num: "04", label: "鹿飛的成立", title: "從躍馬出發，鹿飛接手抵達之後的每一段", paragraphs: [ …, … ], servicesLink: true, image: { src: "/images/about/aaron-news-interview-1080.webp", alt: "台視新聞訪問躍馬企業市場經理", maxTierWidth: 1080, position: "42% center" } },
   ] as const;
   ```
   Paste every paragraph verbatim from §B-1 (story paragraphs **keep** their final `。`). The figcaption text = `alt`. WO-R4-0 commits only `public/images/about/about-port.jpg`; after referencing `/images/about/about-port-1600.webp`, run `npm run images:build` and commit the generated tiers (commit only tiers of your new files; `git checkout --` any other tier the script rewrote) (add `public/images/about/about-port-*.webp` to your allowed paths).
3. Chapter 01 extras: stats row (`42` / `年國際物流・躍馬企業`, `500+` / `出口案件・躍馬企業`, `30+` / `國家與地區・躍馬物流網絡`, each value with `data-lufe-counter`), then the jumping.group entry card (`躍馬企業官網` / `認識躍馬企業` / `jumping.group` / `↗`, `href="https://jumping.group" target="_blank" rel="noopener noreferrer"`, `aria-label="認識躍馬企業（另開新分頁）"`). Chapter 04: `看四個方案 →` → `/services`.
4. Figures: same wide "pause" treatment as case detail (aspect `4/3` → `md:21/9`, ±4% parallax via rAF + `getBoundingClientRect`, disabled under reduced motion, `scale(1.06)`, lazy). Write it inside `StoryChapters.tsx` (do **not** import from or modify `CaseDetailPage.tsx`).
5. Team / network / philosophy: add eyebrows `05・今天的團隊`, `06・資源網絡`, `07・鹿飛的信念` (13px/600, `text-gold-d` on light, `text-gold` on navy, `mb-4`). Network: delete the three-stat grid (moved to chapter 01); keep city line, legend, globe. Network cards and philosophy unchanged.
6. Closing CTA h2 → `下一章，從你的產品開始`; rest unchanged.
7. Remove the now-unused `Carousel` import. Do not delete `aaron-workshop-*` images (run `rg` and report whether anything else uses them; leave them).
8. Tests (`tests/components/about/about-r4.test.ts`): server HTML contains `躍馬企業官網`, `href="https://jumping.group"`, `關鍵洞察`, all four chapter titles in order, `id="story"` exactly once and not on the `.lufe-hero` section, three `data-lufe-counter` inside `#story`, zero inside `#network`, and no `想通的事`.

## 2. Insights hero (#11)
`InsightsPage.tsx` h1: `出海洞察，<br /><span className="text-gold">從判斷到執行的實務指南</span>` (keep classes `h1 mb-6 max-w-[880px] text-white`); lead `依出海的每個階段整理：市場探查、寄賣通路、公司落地、海外客服與北美市場的分析與實務指南`. Nothing else in the file.

## 3. Article TOC (#13, every article) — §C-3
Extract the TOC into `src/components/insights/ArticleToc.tsx` (client) and use it from `ArticleDetail.tsx` in three places: desktop aside, mobile `Disclosure`, mobile current-section bar.
1. Shared hook `useActiveHeading(headings)` (the existing scroll logic, unchanged threshold 120px) returning `activeIndex`.
2. `ArticleTocList({ headings, activeIndex, onNavigate, variant: "aside" | "inline" | "sheet" })`: numbered rows per §C-3 (number `01`, read / current / upcoming colours). `aside` variant adds the moving `bg-cream` plate with a 2px `bg-gold` left edge (springs `response 0.35, damping 1` on `translateY` and `height`, via `useSpring` from `@/lib/motion`; jump under reduced motion). No left border line any more.
3. Aside header: `本文目錄` left, `{String(activeIndex + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}` right. Below the list: 2px rail with gold `scaleX(progress)` (reuse the reading-progress value: lift `ReadingProgress`'s computation into a small `useReadingProgress()` hook used by both) and `剩約 {m} 分鐘` / `已讀完` (`m = Math.ceil(minutes * (1 - progress))`, `minutes = parseInt(article.readTime)`; omit the line when `NaN`; show `已讀完` when `progress >= 0.98`).
4. Mobile current-section bar (`lg:hidden`): appears when the cover `figure` has scrolled above the viewport top (IntersectionObserver on the figure); `fixed inset-x-0 top-[76px] z-[50] h-11 border-b border-bd bg-white/90 backdrop-blur` (+ `@media (prefers-reduced-transparency: reduce)` → `bg-white`, done with Tailwind arbitrary variant `[@media(prefers-reduced-transparency:reduce)]:bg-white`). Content: counter (12px `tabular-nums text-gold-d`), current title (14px/600 `truncate`), 28×28 outline `+` box rotating to 45° when open. Show/hide: opacity + `translateY(-8px → 0)` spring. Tap → sheet below the bar with `ArticleTocList variant="sheet"` (max-h `60svh`, `overflow-y-auto`, white, `border-b border-bd`), height spring + content fade identical to the FAQ calm accordion; the sheet markup is always rendered (SSR) with `hidden` until first open; `aria-expanded`/`aria-controls` on the bar button; Esc and outside tap close; selecting an item scrolls (smooth unless reduced motion), updates the hash with `replaceState`, then closes.
5. Keep `ReadingProgress` bar, related articles, FAQ, sources untouched. `Disclosure summary="本文目錄"` stays; its child becomes `ArticleTocList variant="inline"`.
6. Tests (`tests/components/article-detail.test.ts`, TOC assertions): server HTML of a static article with ≥3 headings contains `本文目錄`, `01`, `02`, a `nav[aria-label="本文目錄"]`, the mobile bar list with exactly `headings.length` links, no `rounded-`; an article without headings renders none of these.

## 4. Resources (#14 copy, #15) — §B-7 + §C-4
1. metadata title/description, h1, lead per §B-7.
2. Keep the subsidy table section unchanged.
3. Replace the bottom one-line cross-link `div` with the 「繼續探索」 section exactly per §C-4 (four tiles, copy verbatim, icons `BuildingIcon` / `FileIcon` / `CompassIcon` / `ReceiptIcon` from `@/components/icons/LineIcons`; TradePilot tile `target="_blank" rel="noopener noreferrer"` with `aria-label="前往 TradePilot（另開新分頁）"`).
4. Navbar/Footer/`CHAPTER_ARTICLE_TAGS.sub` label `補助與活動` → `補助與資源` (string-only edits).
5. Tests (`tests/components/resources/resources.test.ts`): HTML contains the new h1 lines, four tiles with hrefs `/cases`, `/insights`, `/assess`, `https://tradepiloter.com`, no `現場紀錄`, no `field-notes`, no `想看實際做過的案子`.

## 5. Subsidy plans (#16) — §C-5
1. New `SubsidyCompare.tsx` replaces `SubsidyStageMap.tsx` (delete the old file). Props `{ subsidies, now, onSelect }`. Desktop: `grid lg:grid-cols-4` + subgrid rows (`lg:grid-rows-[repeat(7,auto)]` on the parent, each column `lg:row-span-7 lg:grid lg:grid-rows-subgrid`), order by `["assess","enter","optimize"]` stage then original order. Seven rows per §C-5.1. Stage eyebrow uses `STAGE_LABELS[stage].label` with the stage index (`01`/`02`/`03`). Mobile: wrap the same column markup in `SnapRail` (`@/components/motion/SnapRail`) with classes `flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 lg:grid …` (desktop grid kept), each card `basis-[82vw] shrink-0 snap-start border border-bd bg-white p-5 lg:basis-auto lg:border-0 lg:p-0 lg:px-6`.
   - Action button `看重點 ↓` (`type="button"`, `active:scale-[.97]`) → `onSelect(slug)`.
2. `SubsidyPlans.tsx`: render `SubsidyCompare` instead of `SubsidyStageMap`; everything else (sticky Segmented, hash sync, panel transition) unchanged.
3. `SubsidyPlanPanel.tsx`: keep header, `適合` row and `鹿飛怎麼幫` row exactly; remove the four other `DetailRow`s and add below a `細節` label (13px/600 `text-tx3`, `mt-10`) followed by three `AccordionItem`s (`@/components/faq/AccordionItem`, ids `${subsidy.slug}-detail-1..3`, nums `01`–`03`, default closed):
   - header `補助涵蓋與費用明細` + right meta `{coversDetail.length} 項` (13px `text-tx3`) → body: covers tag grid then coversDetail cards (current markup).
   - `申請與核銷流程` + `{processSteps.length} 步` → current step grid.
   - `容易踩雷的點` + `{importantNotes.length} 點` → current ember panel.
   - Skip an item whose array is empty/undefined.
   Footer unchanged.
4. All panels still in server HTML; accordion bodies too (the shared component already renders content in the DOM — verify with a test).
5. Measure (paste): at 1440 with Playwright, `#plans` height from its top to the bottom of the first visible panel, on `9c99ef9` (`git worktree add /tmp/lufe-r4b-base 9c99ef9`, build with the lock, `next start -p 3531`) vs this branch. Target ≥ 40% shorter. Remove the worktree afterwards.
6. Tests (`tests/components/subsidy/**`): server HTML contains each subsidy `shortTitle` inside the compare grid exactly once, `看重點 ↓` ×4, `細節` ×4, every `coversDetail[].title` and `processSteps[].title` and `importantNotes[]` still present (content not lost), no `SubsidyStageMap`.

## 6. Verification
COMMON.md steps 1–8. Playwright paths: `/about /insights /insights/agent-vs-distributor-exclusive /resources /resources/subsidies` plus one database article if any (`/insights` first card href). Extra checks (paste):
- `/about`: click Navbar 關於 → 品牌故事 (`/about#story`) lands with `#story` top within 0–100px of viewport top.
- `/insights/agent-vs-distributor-exclusive` at 390: scroll 1500px → the current-section bar is visible (`opacity` ≥ 0.99); tap it → sheet visible; tap item 3 → heading 3 top within 0–140px; sheet hidden.
- At 1440 the aside counter text changes as you scroll (print before/after).
- `/resources/subsidies` at 1440: the four `看重點 ↓` buttons share the same `getBoundingClientRect().top` (subgrid alignment); click the 3rd → hash equals that slug and the matching panel is visible.
- Reduced motion run on `/resources/subsidies` and one article: no element has a non-identity transform after interactions (sample the TOC plate and the compare cards).
- Font guard list before local rebuild; never commit fonts.
PR body: `#1 #2 #11 #13 #15 #16` lines, copy kept/changed, full-stop sweep, the #plans height table.
