# WO-R2-A — /services overview, optimize FAQ, methodology rubric polish

Read first: `docs/redesign-v6/wo/COMMON.md`, `docs/redesign-v6/round2/DECISIONS-R2.md` (§0, §A #1–#6 #23, §B-1, §B-5, §C-6…C-8). If this WO and DECISIONS-R2 disagree, DECISIONS-R2 wins — stop and say so.
Depends on **WO-R2-0 merged**. Runs **in parallel with WO-R2-1** (disjoint paths).

- Branch: `v6/r2-a-services` from latest `origin/redesign/v6`. PR → `redesign/v6`. Port `3412`.
- Allowed paths:
  - `src/components/services/ServicesPage.tsx`
  - `src/components/services/overview/**` (new, optional sub-components)
  - `src/data/serviceFaqs.ts`
  - `src/components/services/OptimizePage.tsx`, `src/app/services/optimize/page.tsx` (only if the FAQ tuple change requires it)
  - `src/components/services/MethodologyPage.tsx`, `src/components/services/methodology/RubricItem.tsx` (new)
  - `src/components/home/CasesSection.tsx` (one string, §4)
  - `tests/components/services/services-page.test.ts`, `optimize-page.test.ts`, `methodology-page.test.ts`, `tests/components/home/page.test.ts` (only if it pins the changed string)
- Forbidden here (owned by WO-R2-1): `src/data/chapters.ts`, `ChapterPage.tsx`, `ChapterBar.tsx`, `NextChapter.tsx`, `src/app/globals.css`. Use Tailwind utilities only. **Do not read `chapter.overview` any more**; keep `CHAPTERS` usage only for `path`/`label` if you need them.
- **Methodology copy is frozen** (Aaron's v2.1 spec): no string in `src/components/services/methodology/content.ts` or the visible text of `MethodologyPage.tsx` may change. You may only change markup/classes of the rubric section (§3). Prove it in the PR: `git diff origin/redesign/v6 -- src/components/services/methodology/content.ts` must be empty, and the methodology test must still find every copy constant.
- No images to download: every image used here already exists (tiers present).

## 1. `/services` (`ServicesPage.tsx`) — top to bottom
### 1.1 Hero (#1, #2)
Keep `HeroBackdrop` + `HERO_VIDEOS.services` + `ScrollCue` + breadcrumb + `h1` `一家品牌在馬尼拉的第一年`.
- Delete `heroStats` and its grid entirely.
- Lead (replace): `市場探查、寄賣、公司落地、海外客服——企業出海第一年會遇到的四件事，鹿飛做成四個方案。可以只走一章，也可以一路走完`
- Add buttons (`mt-8 flex flex-wrap gap-3`): primary `ContactButton` `聊聊你的產品 →` (classes as chapter hero primary: `inline-flex cursor-pointer items-center justify-center bg-gold px-6 py-3.5 text-[15px] font-semibold text-navy hover:bg-gold-l active:scale-[.97]`); secondary `<a href="#chapters">看四個章節 ↓</a>` (`border border-white/40 px-6 py-3.5 text-[15px] font-medium text-white hover:border-white active:scale-[.97]`).

### 1.2 Chapter tiles (#3, §C-6) — `<section id="chapters" className="scroll-mt-[100px] bg-white py-[88px] md:py-[120px]">`
- Heading `h2` (`text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-[-.022em] text-navy`): `四個章節，按企業的節奏往前走`
- Lead (`lead mt-5 text-tx2`): `每一章獨立計價，每一章結束都能決定是否繼續`
- Tiles (local constant, not from chapters.ts):

| month | name | line | href | image | alt | maxTierWidth |
|---|---|---|---|---|---|---|
| `第一個月` | `市場探查` | `用當地真實消費者的反應，決定要不要往下走` | `/services/product-testing` | `/images/hero-video/chapter-research-1600.webp` | `會議中討論圖表的團隊` | — |
| `第三個月` | `寄賣` | `產品證審核期間，上架與市場活動同步推進` | `/services/consignment` | `/images/hero-video/chapter-warehouse-1600.webp` | `貨架上待出貨的包裹` | — |
| `第九個月` | `公司落地` | `註冊、招聘、掛證，在當地建立自己的團隊` | `/services/localization` | `/images/hero-video/chapter-storefront-1600.webp` | `夜晚街角的咖啡店與行人` | — |
| `之後的每一天` | `海外客服` | `英文客服由菲律賓專業團隊接手，服務規則由台灣端制定` | `/services/call-center` | `/images/hero-video/chapter-callcenter-1600.webp` | `一邊通話一邊打字的客服人員` | 1600 |

  Link label on every tile: `了解方案 →`. Badge on the call-center tile image (top-left, `bg-gold px-2.5 py-1 text-[12px] font-semibold text-navy`): `2027 Q1 首批`.
- Layout: wrapper `mt-12 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4` (no negative margins); tile `group relative w-[82%] shrink-0 snap-start md:w-auto`.
- Tile = `Link` (whole tile clickable, `active:scale-[.985] transition-transform`): top rule `relative h-[2px] bg-bd` containing (a) a 10×10 `bg-gold` square at `-top-1 left-0`, (b) a gold line `absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-300 [@media(hover:hover)]:group-hover:scale-x-100`; then figure `mt-5 aspect-[4/5] overflow-hidden` with `TieredImage` (lazy, `sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 82vw"`, `h-full w-full object-cover transition-transform duration-[600ms] [@media(hover:hover)]:group-hover:scale-[1.04]`); then month (13px/600 `text-gold-d`, `mt-5`), name (24px/650 `text-tx`, `mt-1`), line (15px/1.75 `text-tx2`, `mt-2`), link label (14px/600 `text-sky`, `mt-4`, arrow span `inline-block transition-transform [@media(hover:hover)]:group-hover:translate-x-[3px]`).
- reduced-motion: add `motion-reduce:transition-none motion-reduce:group-hover:scale-100` to the moving parts.
- `rounded-*` forbidden. `scrollWidth` of the document at 390 must equal `innerWidth`.

### 1.3 Two paths (#4, §C-7) — cream section, heading unchanged `兩條出海路徑：菲律賓在地落地，北美通路拓展`
Two `Link` cards (`group border border-bd bg-white transition-transform active:scale-[.985] [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-gold`), grid `md:grid-cols-2 gap-5`. Each: figure `aspect-[16/9] overflow-hidden` (`TieredImage` lazy, `sizes="(min-width: 768px) 50vw, 100vw"`, image `group-hover:scale-[1.03]` inside hover media) → body `p-6 md:p-9`: eyebrow → `h3` → one-liner → `<dl>` with three rows (`grid grid-cols-[72px_minmax(0,1fr)] gap-4 border-t border-bd py-4`; `dt` 13px/600 `text-tx3`; `dd` 15px/1.8 `text-tx2`) → CTA 15px/600 `text-sky`.

Philippines card (`href="/services/product-testing"`, image `/images/cases/story/bubble-tea-2-1600.webp`, alt `馬尼拉都會區的商業大樓街景`):
- eyebrow (`text-sky`): `菲律賓 · 第一年四章`
- h3: `先花 1～2 萬，確認市場要不要這個產品`
- one-liner: `市場探查 → 寄賣 → 公司落地 → 海外客服，可以只走一章，也可以一路走完`
- `適合` → `連鎖餐飲、美妝保養、美業等有產品的品牌；沒出過海，或出過但沒站穩`
- `收費` → `每章明碼。起手包 7 萬（市場探查 1～2 萬＋寄賣包 5～6 萬，市場探查費可抵）；落地按案；客服第一次談給區間`
- `第一步` → `市場探查，用一頁報告決定下一步`
- CTA: `從第一章開始 →`

North America card (`href="/services/north-america"`, image `/images/hero-video/chapter-retail-1600.webp`, alt `超市貨架走道`):
- eyebrow (`text-gold-d`): `北美 · 零售通路`
- h3: `進入北美主流零售通路`
- one-liner: `市場研究、展覽佈局、引進買家、上桌談判，由北美團隊執行，鹿飛負責合約與進度`
- `適合` → `產品已在台灣或其他市場站穩的品牌`
- `收費` → `前期低服務費＋成交抽成，第一次談給明確數字`
- `時程` → `平均 6～9 個月；食品保健品 9～12 個月`
- CTA: `了解北美通路拓展 →`

### 1.4 Capability band (#5) — replaces the navy Yuema paragraph completely
`<section className="bg-navy py-[88px] text-white md:py-[112px]">`:
- `h2` two lines: `一個窗口，` / `<span className="text-gold">串起當地的每一個執行夥伴</span>` (same size class as §1.2 heading but `text-white`)
- lead (`mt-5 max-w-[680px] text-[17px] leading-[1.85] text-white/70`): `鹿飛負責合約、進度與品質；在地的測試、通路、法務與招聘，由長期合作的夥伴分工執行`
- 4 items, grid `mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4` with each cell `bg-navy p-6 md:p-7` (hairline grid effect): 40×40 icon box (`border border-gold/40 bg-gold/10 text-gold`, icon 20px) → title 17px/650 `text-white` `mt-5` → body 15px/1.8 `text-white/70` `mt-2`.
  - `UsersIcon` | `在地消費者面板` | `當地教師與家長組成的測試面板，產品上架前先取得真實反應`
  - `PackageIcon` | `持證進口與通路夥伴` | `產品證由持證進口商代辦代持，合作電商通路與倉儲直接銜接`
  - `BuildingIcon` | `律師行與 HR 體系` | `公司註冊、文件與招聘，由合作的律師行與 HR 體系執行`
  - `TargetIcon` | `台灣端專案管理` | `合約、進度與品質指標由鹿飛台灣公司負責，一個窗口對接所有環節`
- The strings `躍馬` / `42 年` must not appear in `ServicesPage.tsx` any more (they remain only inside FAQ answer 3 in `serviceFaqs.ts`).

### 1.5 FAQ (#6)
`src/data/serviceFaqs.ts`: add `takeaway` to each entry and replace answer 3:
1. q, a unchanged; `takeaway: "沒把握，就從市場探查開始"`
2. q, a unchanged; `takeaway: "每章明碼，第一次談就給範圍"`
3. q unchanged; `a: "顧問出報告，貿易商做買賣，貨代送貨。鹿飛做的是四件事一份合約，陪你走完第一年。底下有躍馬企業 42 年物流，不會因為不懂現場而卡在海上。鹿飛不做貿易商，也不做純接單的貨代。"`; `takeaway: "四件事一份合約，陪你走完第一年"`

Render `<FaqSection title="選方案之前，最常被問的三件事" idPrefix="services-faq" items={SERVICE_FAQS.map((f, i) => ({ num: String(i + 1).padStart(2, "0"), question: f.q, answer: f.a, takeaway: f.takeaway }))} className="bg-white py-[72px] md:py-[96px]" />`. `src/app/services/page.tsx` `FaqJsonLd` mapping stays `q/a`.

### 1.6 Final CTA — unchanged.
Remove imports that become unused (`Disclosure`, `Reveal` if unused, `CHAPTERS`/`PHILIPPINES_CHAPTER_KEYS` if unused).

## 2. `/services/optimize`
- `OPTIMIZE_FAQS` tuples gain a third element (takeaway): 1 `可以，方案獨立`; 2 `先聊 30 分鐘再決定`; 3 `診斷定額，優化月費加績效`. Questions/answers unchanged. `page.tsx` destructures `[question, answer]` — still valid; confirm.
- Replace the FAQ `<section>` with `<FaqSection title="常見問題" idPrefix="optimize-faq" items={…} className="bg-white py-[72px] md:py-[96px]" />`. Remove unused `Disclosure` import. Nothing else on the page changes (it has no stats strip; confirm in PR).

## 3. `/services/methodology` rubric — visual only (#23, §C-8)
- New `methodology/RubricItem.tsx` (client) built on `AccordionItem` from WO-R2-0: `num` = `01`…`05`; header = `<span className="block"><span className="block font-[var(--font-inter)] text-[12px] font-semibold uppercase tracking-[.08em] text-tx3">{en}</span><span className="block text-[22px] font-[650] leading-[1.35] text-tx">{zh}</span><span className="mt-1 block text-[16px] font-medium text-sky">「{dimension.question}」</span></span>` where `[en, zh]` = `dimension.name` split at the **first space** (render both parts; the concatenation with one space must equal the original string — add a test). Panel = `grid gap-5 md:grid-cols-2`: left `<p className="text-[15px] leading-[1.85] text-tx2"><strong className="text-tx">看：</strong>{criteria}</p>`; right `<p className="border-l-2 border-ember bg-ember/5 p-4 text-[15px] leading-[1.85] text-tx2"><strong className="text-ember">紅線：</strong>{redAt}</p>`.
- In `MethodologyPage.tsx` replace the `<details>` list with `<div className="mt-8 bg-white px-5 md:px-8">{METHODOLOGY_DIMENSIONS.map((d, i) => <RubricItem key={d.name} dimension={d} num={…} defaultOpen={i === 0} />)}</div>`. First item open only (v2.1 §5). No weights.
- 「分數怎麼讀」: above the existing table add a decorative scale (`aria-hidden="true"`): a `flex h-[6px]` bar with four segments in score order No-Go→Go: widths `45% / 15% / 15% / 25%`, colors `bg-ember/70`, `bg-gold-l`, `bg-gold`, `bg-navy`; below it ticks `0 45 60 75 100` (11px `text-tx3`, positioned at 0/45/60/75/100%, last one right-aligned). In each table row put an 8×8 square of the matching color before the score (map by `decision.verdict`: `Go`→navy, `Conditional Go`→gold, `Hold`→gold-l, `No-Go`→ember/70; check the exact verdict strings in `content.ts`). Row text unchanged.
- Everything else on the page (hero small print, 我們的規矩 block, all copy) unchanged — see DECISIONS-R2 §E-1/E-2: those are waiting for Aaron.

## 4. Home cases section (R-2)
`src/components/home/CasesSection.tsx` line with `找老師、找場地` → `在當地蓋一間英語教育機構——招募師資、找場地、招第一個學生；\n後來用同樣的方法，做了一個連鎖手搖飲品牌` (only `找老師` → `招募師資` changes).

## 5. Tests
- `services-page.test.ts`: replace the `overview?.body` assertion with the four tile lines + `了解方案 →`; FAQ: every q, a (normalized), takeaway present; remove the `北美零售通路另由北美專責團隊規劃執行。` expectation and add the new lead; assert markup does **not** contain `躍馬企業 · 年物流底層`, `data-lufe-counter`, `42+`, `500+`; assert `進入北美主流零售通路` and `串起當地的每一個執行夥伴` present.
- `optimize-page.test.ts`: FAQ q/a/takeaway present.
- `methodology-page.test.ts`: still passes unchanged (copy frozen); add: rubric renders five `aria-expanded` buttons, exactly one `true`; every `dimension.name` split parts rejoin to the original.

## 6. Verification
COMMON.md steps 1–8. Screenshot paths (port 3412): `/ /services /services/optimize /services/methodology`. All `OK` at 1440/390. Extra shots at 1440: `/services` with the pointer over the 2nd tile (`tile-hover.png`) and `/services/methodology` with rubric item 3 opened (`rubric-open.png`); at 390: `/services` chapter row scrolled horizontally to tile 3 (`tiles-scrolled.png`).
PR body: note numbers #1–#6, #23 (+ optimize consistency, CasesSection 老師), one line each.
