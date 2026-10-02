# WO-R4-C — Services: professional H1s, audience-label sweep, consignment "included", price block, methodology examples

Read first: `docs/redesign-v6/wo/COMMON.md`, then `docs/redesign-v6/round4/DECISIONS-R4.md` (§0 H-3, H-6; §A #18 #19 #20 #21 #24; §B-8, §B-9, §B-10, §B-11, §B-12; §C-6, §C-7, §C-8).
Runs after WO-R4-0 **and** after whichever of WO-R4-A / WO-R4-B merges first (max two lanes at once). Branch from latest `origin/redesign/v6` so you include B's one-line `CHAPTER_ARTICLE_TAGS.sub` change in `chapters.ts`; if B is not merged yet, do not touch that line.

- Branch: `v6/r4-c-services` from latest `origin/redesign/v6`. PR → `redesign/v6`. Port `3540`.
- Notes covered: #18, #19, #20, #21, #24 (+ the H-3 sweep outside cases).
- Allowed paths:
  - `src/data/chapters.ts` (m1, m3, m9, after, na entries and the `ChapterSection` type)
  - `src/components/services/ChapterPage.tsx`, `src/components/services/ServicesPage.tsx` (one string), `src/components/services/MethodologyPage.tsx`, `src/components/services/methodology/content.ts`, `src/components/services/methodology/MethodologyExamples.tsx`
  - `src/app/services/product-testing/page.tsx`, `src/app/services/call-center/page.tsx` (metadata only)
  - `src/app/globals.css` — only if a `.lufe-price-*` rule must change for the new layout, inside the existing layer
  - tests: `tests/components/services/**`, `tests/data/chapters*.test.ts`
- Never edit `src/data/articles.ts`, `src/data/cases.ts` (WO-R4-A), `src/data/heroVideos.ts`.

## 1. Product testing (#24) — §B-8
In `chapters.ts` m1: `title`, `scene`, step 02 `title`/`body`, FAQ 3 `question`/`answer`/`takeaway` verbatim from §B-8. `after.next.heading` → `先驗證市場，再決定投入`. `app/services/product-testing/page.tsx` metadata title/description verbatim.

## 2. Call center (#18) — §B-10
`after.title` → `海外客服，交給專業英語團隊`; `m9.next.heading` → same string; `app/services/call-center/page.tsx` metadata title `海外客服｜交給專業英語團隊` (description unchanged).

## 3. Audience-label sweep (H-3) — §B-12 rows outside cases
- `ServicesPage.tsx`: `當地上班族與家長組成的測試面板，產品上架前先取得真實反應` → `當地消費者組成的測試面板，產品上架前先取得真實反應`.
- `chapters.ts` m3 tracks row `第 3～6 週` body → `社群試用活動：先讓人用過。有人在社群裡問，有人拍了影片`.
- Methodology content per §4 below and `DOUBLE_SCORE_COPY` `她們心裡那個價位` → `受訪者心裡那個價位`.
- Gate (paste output): `rg -n "媽媽|家長|上班族|女性上班族|小資|白領|她們|年輕人喜歡|長輩" src --glob '!src/data/articles.ts' | rg -v 'alt='` → empty, except image `alt` text (list any remaining and justify).

## 4. Methodology examples (#21) — §B-11 + §C-8
1. `content.ts`: replace `METHODOLOGY_EXAMPLES` with:
   ```ts
   export interface MethodologyFinding { readonly label: string; readonly headline: string; readonly detail: string }
   export interface MethodologyExample { readonly key: "peanut" | "sunscreen"; readonly tab: string; readonly title: string; readonly tags: readonly string[]; readonly method: string; readonly findings: readonly MethodologyFinding[]; readonly implications: readonly string[]; readonly note: string }
   export const METHODOLOGY_EXAMPLES: readonly MethodologyExample[] = [ /* peanut, sunscreen — every string verbatim from DECISIONS §B-11 */ ];
   export const EXAMPLES_INTRO = "兩個真實的研究例子：怎麼問、問到什麼、品牌接下來怎麼做";
   ```
   `tab`: `花生糖禮盒` / `防曬乳`. `method` strings contain `\n` exactly where §B-11 shows it. Leave `EXAMPLES_CLOSING` and all other exports unchanged except `DOUBLE_SCORE_COPY` (§3).
2. `MethodologyExamples.tsx` rewrite per §C-8: `Segmented` (`@/components/ui`, label `研究例子`), both panels server-rendered, inactive `hidden`; crossfade spring (`useSpring`, `response 0.24, damping 1`, opacity + translateY 8px→0; reduced motion → no movement). Panel structure: header (title + tags) → `grid lg:grid-cols-12` (`01 怎麼問` left 4 cols; `02 問到什麼` right 8 cols with finding tiles `grid sm:grid-cols-2 gap-3`) → navy band `03 決策意涵` with three numbered implications `grid md:grid-cols-3 gap-6` and the note. Remove the old dots, `SnapRail` usage and the scroll-index logic.
3. `MethodologyPage.tsx` examples section: under `SectionHeading` add `<p className="mt-4 max-w-[640px] text-[17px] leading-[1.8] text-tx2">{EXAMPLES_INTRO}</p>`; keep closing line and CTA box unchanged.

## 5. Consignment "included" (#19) — §B-9 + §C-6
1. `ChapterSection` gains `{ readonly type: "included"; readonly heading: string; readonly items: readonly { readonly title: string; readonly body: string; readonly icon: StepIcon }[]; readonly featureNote: string }`.
2. m3: replace the `cards` section `寄賣包服務內容` with `type: "included"`, heading `寄賣包包含的五件事`, items (icons in order `store`, `badge-check`, `users`, `chart-column`, `presentation`) and `featureNote: "核心服務"`, copy verbatim from §B-9 (`社群試用活動` replaces `學校家長活動`).
3. `ChapterPage.tsx` `case "included"` renders the bento per §C-6 (first item navy feature tile `lg:row-span-2`, other four cream tiles; outline icons; numbers `01`–`05`). Hover lift 3px on the four small tiles only, hover devices only.

## 6. Price block (#20, all chapters) — §B-9 + §C-7
1. `price` section type gains optional `breakdown?: { readonly heading: string; readonly rows: readonly { readonly item: string; readonly note: string }[] }`.
2. m9 price: `title: "按案報價"`, `caption: "第一次談就給成本框架與時間表"`, `details: []`, `breakdown: { heading: "第一次談會給你", rows: [ {item:"公司註冊",note:"依公司類型給大概範圍"}, {item:"律師行文件",note:"依文件範圍給大概範圍"}, {item:"招聘",note:"依人數、實體或遠程給大概範圍"}, {item:"場地",note:"依地點與規模給大概範圍"}, {item:"時間表",note:"依公司類型與人數排出時程"} ] }`.
3. Rewrite `case "price"` per §C-7 for every chapter (m1, m3, m9, na). Label `費用` above the price. Numeric-vs-text title rule: `/\d/.test(title)`. Keep `lufe-price-path` / `lufe-price-route` classes and their texts (`你只花了這一筆`, `接到第三個月 →`) for m1's two paths, now laid out as two tiles. No other copy changes on m1/m3/na price blocks.

## 7. Tests
- Update pinned copy in `tests/components/services/**` (product-testing h1, call-center h1, consignment cards, methodology examples).
- New `tests/components/services/services-r4.test.ts`:
  - `/services/product-testing` HTML contains `先驗證市場，再決定投入` and none of `媽媽|家長|上班族`.
  - `/services/call-center` h1 text `海外客服，交給專業英語團隊`.
  - consignment HTML: `寄賣包包含的五件事`, five titles, `核心服務`, no `學校家長`.
  - localization HTML: `費用`, `按案報價`, `第一次談會給你`, the five row items; no element with classes `border-navy-l bg-navy` in the price section.
  - methodology HTML: both example titles, `花生糖禮盒`, `防曬乳`, `決策意涵`, the six finding headlines, and none of `女性上班族|小資|她們`.

## 8. Verification
COMMON.md steps 1–8. Playwright paths: `/services /services/product-testing /services/consignment /services/localization /services/call-center /services/north-america /services/methodology`. Extra (paste): methodology at 1440 click `防曬乳` → sunscreen panel visible and peanut `hidden`; at 390 the finding tiles stack in one column with no overflow; localization price section screenshot at 1440 and 390. Font guard list before local rebuild; never commit fonts.
PR body: `#18 #19 #20 #21 #24` lines, the H-3 gate output, copy kept/changed, full-stop sweep.
