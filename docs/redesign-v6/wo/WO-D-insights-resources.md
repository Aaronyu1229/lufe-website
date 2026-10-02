# WO-D — Insights list, article template, Resources, Subsidies, Services full-stop sweep

Read `docs/redesign-v6/wo/COMMON.md` first. Runs after WO-A/WO-B are merged. **Runs in parallel with WO-C** (disjoint paths).
Implements DECISIONS #46 (author card part), #59–#70, and the §C-2 sweep for service pages.

- Branch: `v6/d-insights-resources` from `origin/redesign/v6`. PR → `redesign/v6`. Screenshot port: `3104`.

## Allowed paths
- `src/components/insights/**`, `src/app/insights/**`
- `src/data/articleInlineImages.ts` (new), `public/images/insights/inline/**` (new)
- `src/app/resources/**`, `src/components/subsidy/**`
- `src/components/services/**`, `src/app/services/**`, `src/data/chapters.ts` (copy/punctuation edits only — do not change keys, slugs or the article mapping)
- Tests: `tests/components/insights/**`, `tests/components/article-detail.test.ts`, `tests/components/resources/**`, `tests/components/subsidy/**`, `tests/components/services/**`
- Read-only: `src/data/articles.ts` (**never edit** — owned by the blog autopilot), `@/data/subsidies`, `@/data/fieldNotes`, `@/data/heroVideos`, `@/components/icons/LineIcons`, `@/lib/**`, `@/components/ui`, `@/components/assess/MatcherFlow` (do **not** modify it).

## 1. `InsightCta` (new `src/components/insights/InsightCta.tsx`) — #60 (DECISIONS §C-9)
Client component (needs `useMessageBox`). Layout: `section` white, `border-t border-bd py-[96px]`, inner `mx-auto max-w-[760px] text-center`.
- h2 (`font-sans text-[clamp(32px,4.4vw,52px)] font-[650] leading-[1.12] tracking-[-.022em] text-tx [text-wrap:balance]`): line 1 `把文章裡的方法，`, line 2 `<span className="text-gold-d">用在自己的產品上</span>`
- p `lead mx-auto mt-5 max-w-[560px]`: `30 分鐘初步評估，不收費。先判斷值不值得做，再談怎麼做`
- three points (`mt-10 grid gap-4 sm:grid-cols-3 sm:divide-x sm:divide-bd`), each `flex items-center justify-center gap-2 text-[15px] text-tx2` with a 20px `text-gold-d` icon: `FileIcon` `第一次談完，給一頁建議` · `ReceiptIcon` `首次諮詢即說明費用與時程` · `ClockIcon` `24 小時內回覆`
- buttons (`mt-10 flex flex-wrap justify-center gap-3`): primary button `聊聊你的產品 →` (`bg-gold px-8 py-4 text-[16px] font-semibold text-navy hover:bg-gold-l active:scale-[.97] transition-transform duration-100`, arrow nudges 3px on hover) → `open()`; secondary `Link` `/assess` `2 分鐘處境比對` (`border border-navy/15 bg-white px-8 py-4 text-[16px] font-semibold text-navy hover:border-navy/40 active:scale-[.97]`).
- No scroll-triggered animation.
Use it at the end of `/insights` (replacing the cream CTA box) and at the end of every article (replacing the cream CTA box).

## 2. `/insights` list (`InsightsPage.tsx`) — #59
- Hero: single column (remove the right-hand featured card and its gradient overlay). Keep breadcrumb, h1, lead, stats; `HeroBackdrop` keeps `video={HERO_VIDEOS.insights}`. Remove the `洞察` kicker `<p>` above the h1 (v5 D1: no kickers).
- New featured card at the top of the list section, rendered only when `active === "all"` (hidden with `hidden` class otherwise so it stays in SSR): `Link` to the featured article, `grid lg:grid-cols-[7fr_5fr] border border-bd bg-white overflow-hidden`; left `CoverImage` `aspect-[16/9] lg:aspect-auto lg:min-h-[340px]`; right `p-7 md:p-10`: small label `精選`（`bg-gold px-2 py-0.5 text-[11px] font-semibold text-navy`）+ chapter label, `h2 h3` title, summary (2-line clamp), `date · readTime`, `閱讀全文 →`. Hover: image `scale(1.03)` 600ms (existing `lufe-insight-card` style), card `active:scale-[.995]`. In the grid below, skip the featured article when `active === "all"` (still rendered elsewhere in SSR).
- Empty-state copy: `這個分類暫時還沒有文章`.

## 3. Article template (`ArticleDetail.tsx` + `src/app/insights/[slug]/page.tsx`) — #61–#68 (DECISIONS §C-10, §C-11)
Template-only. Never edit article text.
- Page passes a new prop `related: readonly InsightCard[]` (3 items): same chapter (via `CHAPTER_ARTICLES`) else same `category`, newest first, excluding the current slug, from `getPublishedArticles().map(toInsightCard)` plus database articles if already loaded on that page; keep the route `●`/ISR exactly as today (`revalidate = 300`, `generateStaticParams` unchanged).
- Layout: outer `lufe-container`; inner `grid gap-16 lg:grid-cols-[minmax(0,720px)_280px]`. Main column = everything that exists today (header, cover, content, FAQ, sources, author card). Right column (`hidden lg:block`) = `aside` `sticky top-[96px] self-start`:
  - `本文目錄` (13px/600 `text-tx3 mb-3`) + list of h2 links (14px `text-tx2`, active `text-tx font-semibold`), left rail `border-l border-bd` with a 2px gold indicator absolutely positioned and moved with `useSpring` (response 0.35, damping 1) to the active item's offset/height. Active = last h2 whose top ≤ 120px (scroll listener with rAF). Click → `scrollIntoView({ behavior: reduced ? "auto" : "smooth" })` and `history.replaceState` the hash.
  - `延伸閱讀` (13px/600 `text-tx3 mt-10 mb-3`): three rows `grid grid-cols-[72px_1fr] gap-3`: thumbnail 72×48 (`TieredImage` lazy, or plain `img` for external URLs, `object-cover`), title 14px/600 `line-clamp-2`, date 12px `text-tx3`.
- Headings need ids: `StaticArticleContent` gives every h2 `id={\`section-${n}\`}` (n = 1-based h2 count) and `scroll-mt-[96px]`; export a helper `getStaticArticleHeadings(content): { id: string; text: string }[]` (plain text, strip `**`). For database HTML, derive headings with a regex over `<h2[^>]*>(.*?)</h2>` (strip tags) and inject the same ids into the HTML string before `dangerouslySetInnerHTML` (only add `id` when the h2 has none).
- Below 1024px: under the summary, a `Disclosure` `本文目錄` (default closed) listing the same links (SSR); `延伸閱讀` rendered after the author card as `grid gap-5 md:grid-cols-3` using `InsightArticleCard`.
- Inline images (`src/data/articleInlineImages.ts`):
  ```ts
  import type { Category } from "@/data/articles";
  export interface InlineImage { readonly src: string; readonly alt: string; readonly beforeH2: number }
  export const CATEGORY_INLINE_IMAGES: Record<Category, readonly [InlineImage, InlineImage]>;
  export const SLUG_INLINE_IMAGES: Partial<Record<string, readonly InlineImage[]>> = {};
  export function getInlineImages(slug: string, category: Category): readonly InlineImage[];
  ```
  Defaults per category, `beforeH2` 3 and 5:
  - 菲律賓: `/images/insights/inline/ph-jeepney-1600.webp` alt `菲律賓街頭的吉普尼`; `/images/insights/inline/ph-taguig-1600.webp` alt `夜晚的 Taguig 市街景`
  - 北美市場: `na-grocery` alt `超市貨架上的商品陳列`; `na-warehouse` alt `量販倉儲賣場的貨架走道`
  - 出海實戰: `export-containers` alt `港口堆疊的貨櫃`; `export-boxes` alt `準備出貨的紙箱`
  - 企業體質: `biz-charts` alt `桌上的筆記本與數據圖表`; `biz-notes` alt `在筆記本上整理數據重點`
  - 東南亞趨勢 and 印尼: `sea-mobile` alt `手機上的購物應用程式`; `sea-saigon` alt `胡志明市西貢河上的貨櫃船`
  Download (`curl -L -A "Mozilla/5.0"`, `https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w=2400`) into `public/images/insights/inline/<name>.jpg`: ph-jeepney 36035924, ph-taguig 3214989, na-grocery 16211537, na-warehouse 8377802, export-containers 33692749, export-boxes 6169055, biz-charts 669613, biz-notes 8424447, sea-mobile 7661069, sea-saigon 2144905. Then `npm run images:build`; commit jpg + tiers.
  `StaticArticleContent` gets an optional `inlineImages` prop and renders `<figure className="my-10">` (`TieredImage` lazy `aspect-[16/9] w-full object-cover`, `figcaption` 13px `text-tx3 mt-3` = alt) immediately **before** the n-th h2. If the article has fewer h2s, the image is skipped. Database articles get no inline images.
- Author card: subtitle `躍馬企業國際物流背景出身，專注研究台灣企業如何在北美與東南亞市場落地`; link label `看更多專欄文章 →`. Byline `Aaron Yu・鹿飛 LUFÉ 創辦人` stays (allowed byline).
- Replace the end CTA box with `<InsightCta />` (place it after the article grid, full width — outside the 720px column).

## 4. `/resources` (`src/app/resources/page.tsx`) — #69 (DECISIONS §B-7, §C-12)
- Hero: h1 line 1 `出海資源中心，`, line 2 `<span className="text-gold">補助與現場一次看完</span>`; lead `!text-white/75`: `政府出海補助協助降低成本，活動與現場紀錄提供第一手市場觀察。兩條路都能直接銜接鹿飛的服務`. Keep `video={HERO_VIDEOS.resources}`.
- Section 1 (white): h2 `h2` `政府出海補助`; lead `貿易署、經濟部、中企署的出海相關計畫，鹿飛整理成適用對象、補助範圍與申請重點`. A list of all `SUBSIDIES`: desktop table-like rows `grid grid-cols-[48px_1.6fr_1fr_1.2fr_1.2fr] gap-4 border-t border-bd py-5` (num `num text-gold-d` · `shortTitle` 16px/600 · `agency` · `amount` (`num`) · `deadline` 13px `text-tx3`); mobile stacked. Each row is a `Link` to `/resources/subsidies#${slug}`, `hover:bg-cream`, `active:scale-[.995]`. Footer link `看完整補助整理 →`.
- Section 2 (cream): h2 `活動與現場紀錄`; lead `加盟展、論壇、商會與客戶現場，北美與東南亞的第一手紀錄`; three cards from `ACTIVITIES` (prefer items with `image` and not `tbd`, keep source order), card like the field-notes activity card (image lazy `aspect-[16/10]`, tag, location·date, title, summary). Footer link `看所有現場紀錄 →` → `/field-notes`.
- Bottom cross-links line: `想看實際做過的案子？前往<Link>案例</Link>｜想了解市場趨勢？前往<Link>洞察</Link>`.
- Remove the old two hub cards and the hard-coded `4 當期計畫` / `1,000萬` / `月更` stats (they may be outdated — DECISIONS §E-1).

## 5. `/resources/subsidies` — #70 (DECISIONS §C-13)
- `SubsidyMatcher.tsx`: replace `MatcherFlow` with a local step flow (state: `step`, `answers`, `completed`):
  - Progress row `flex justify-between text-[12px] font-medium text-white/55`: `第 {step+1} / {total} 題` (or `已完成`) and `{Math.round(progress)}%`; below a 2px track `bg-white/10` with a gold fill whose `scaleX` is driven by `useSpring(…, { precision: 0.001 })`.
  - Container `border border-white/10 bg-white/[.03] p-6 md:p-10`. All four questions are rendered (SSR); non-current ones get `hidden` (not unmounted). Each: `h3` question (`text-[22px] md:text-[28px] font-semibold text-white`), sublabel (`text-[15px] text-white/60 mt-2`) always visible, options `mt-7 grid gap-3 md:grid-cols-2`, each option a button `p-5 border text-left` with `label` (17px/600 white) and `hint` (13px `text-white/55`), selected `border-gold bg-gold/[.08]`, idle `border-white/10 [@media(hover:hover)]:hover:border-gold/40`, `active:scale-[.985]`; a 16×16 square check marker (square, not round). After select wait 280 ms then advance; number keys 1–5 select.
  - From step 2: `← 上一題` button (`text-[13.5px] text-white/55 hover:text-white`, `mt-6 pt-6 border-t border-white/10`).
  - Result: keep current `ResultView` (heading `{result.verdict}`, primary card), add the label `同時可以疊加申請` (12px/600 `text-white/50 mb-3`) above the secondary list, and a `重新測試` text button next to the CTAs.
  - Keep the section heading/lead (drop final `。`) and the privacy line.
- `SubsidyPlanCard.tsx`: `適合` and `補助涵蓋` Disclosures `defaultOpen`; the other three stay closed. No data edits in `src/data/subsidies.ts`.
- Page copy: drop final `。` per §C-2 in the hero lead, pillar descs, stage desc, subscribe paragraph; FAQ answers keep punctuation. Keep `video={HERO_VIDEOS.subsidies}`.

## 6. Services full-stop sweep
Run the COMMON.md `rg` sweep on `src/components/services src/app/services src/data/chapters.ts` and apply §C-2 (hero leads, card descriptions, section paragraphs; FAQ answers keep). Also replace first-person 「我們」 in **headings** only, if any, by 「鹿飛」. List every change in the PR. Do not change structure or keys.

## Tests
- `tests/components/article-detail.test.ts`: for a static article with ≥5 h2s, markup contains `id="section-1"`, the TOC labels, both inline images' alts before the 3rd/5th h2, `延伸閱讀`, `把文章裡的方法`; for an article with <3 h2s no inline image; no `看更多 Aaron 的文章`.
- `getInlineImages` returns category defaults for every `Category` value and every referenced file (+ tiers) exists in `public/`.
- `tests/components/insights/insights-page.test.ts`: hero has no `精選` card; featured card present in list markup; `InsightCta` texts present.
- `tests/components/resources/resources.test.ts`: every `SUBSIDIES[].shortTitle` and link `#${slug}` present; three activity titles present; no `4 個正在開放`.
- `tests/components/subsidy/subsidies.test.ts`: every matcher question label, sublabel, option label and hint in static markup; `同時可以疊加申請` rendered in the result view test; `適合` panel content present and expanded (`aria-expanded="true"`).
- Services tests: update pinned strings you changed.

## Verification
COMMON.md steps 1–8. Screenshot paths: `/insights /insights/go-no-go-framework /insights/first-time-export-checklist /insights/manila-beverage-first-store-90-days /resources /resources/subsidies /services /services/product-testing /services/methodology`. In Playwright at 1440 on `/insights/go-no-go-framework`: scroll to the 3rd h2 and screenshot the viewport (TOC indicator must be on item 3). On `/resources/subsidies`: answer all four questions and screenshot the result. `/insights` and `/insights/[slug]` must keep their current render mode in the build table.
