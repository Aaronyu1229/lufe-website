# WO-R2-1 — Chapter-page template (call-center as reference) applied to 5 pages

Read first: `docs/redesign-v6/wo/COMMON.md`, `docs/redesign-v6/round2/DECISIONS-R2.md` (§0, §A #7–#19 #24–#26, §B-2…B-5, §C-1…C-5, §D). If this WO and DECISIONS-R2 disagree, DECISIONS-R2 wins — stop and say so in the PR.
Depends on **WO-R2-0 merged**. Runs **in parallel with WO-R2-A** (disjoint paths).

- Branch: `v6/r2-1-chapters` from latest `origin/redesign/v6`. PR → `redesign/v6`. Port `3411`.
- Allowed paths:
  - `src/components/services/ChapterPage.tsx`, `ChapterBar.tsx`, `NextChapter.tsx`
  - `src/components/services/chapter/**` (new, optional: split sub-components here to keep ChapterPage < 400 lines)
  - `src/components/MailPreview.tsx` (delete)
  - `src/data/chapters.ts`
  - `src/app/globals.css` (only inside the existing `@layer components` blocks; you are the only round-2 lane allowed to touch it)
  - `src/app/services/{product-testing,consignment,localization,call-center,north-america}/page.tsx`
  - `public/images/services/scenarios/**`, `public/images/services/fit/**` (new)
  - `tests/components/services/chapter-page.test.ts`, `tests/components/design-layer.test.ts`, new tests under `tests/components/services/`
- **Do not** remove the `overview` field from `Chapter`/`CHAPTERS` (ServicesPage still reads it until WO-R2-A merges; WO-R2-Z deletes it). Do not touch `ServicesPage.tsx`, `OptimizePage.tsx`, `MethodologyPage.tsx`.

## 1. Images (§D-2)
Download with `curl -L -A "Mozilla/5.0" "https://images.pexels.com/photos/{ID}/pexels-photo-{ID}.jpeg?auto=compress&cs=tinysrgb&w=2400" -o public/images/services/scenarios/<code>.jpg`:

| file | ID |
|---|---|
| scenarios/m1-1.jpg | 7368308 |
| scenarios/m1-2.jpg | 17065813 |
| scenarios/m1-3.jpg | 9821387 |
| scenarios/m3-1.jpg | 6169022 |
| scenarios/m3-2.jpg | 35765454 |
| scenarios/m3-3.jpg | 8730986 |
| scenarios/m9-1.jpg | 23842490 |
| scenarios/m9-2.jpg | 36729524 |
| scenarios/m9-3.jpg | 6321231 |
| scenarios/after-1.jpg | 4440787 |
| scenarios/after-2.jpg | 7709303 |
| scenarios/after-3.jpg | 7688191 |
| scenarios/na-1.jpg | 4124939 |
| scenarios/na-2.jpg | 35138560 |
| scenarios/na-3.jpg | 12969403 |
| fit/call-center-fit.jpg | 7857532 |

Reference them in code as `/images/services/scenarios/<code>-1600.webp` / `/images/services/fit/call-center-fit-1600.webp`, then run `npm run images:build` and commit the source jpgs **and** generated tiers (same as WO-C did for `public/images/cases/story`). Paste the generated-file count. Check each source is > 1600px wide; if a tier is missing, say so.

## 2. Data model (`src/data/chapters.ts`)
```ts
export type StepIcon = "package" | "users" | "pen" | "file" | "inbox" | "badge-check" | "list-checks" | "chart-column" | "search" | "presentation" | "handshake" | "store";
export type ChapterStep = { readonly number: string; readonly title: string; readonly body: string; readonly icon: StepIcon };
export type ChapterFaq = { readonly question: string; readonly answer: string; readonly takeaway: string };
export type ChapterScenario = { readonly title: string; readonly body: string; readonly answer: string; readonly image: string; readonly imageAlt: string };
// Chapter: scenarios: readonly ChapterScenario[]; add scenariosHeading: string
// NextChapter: add image: string; imageAlt: string; maxTierWidth?: number
// ChapterSection: add | { type: "fit"; heading: string; lead: string; items: readonly { label: string; body: string }[]; image: string; imageAlt: string }
// ChapterSection: remove "link-card" (no longer used after §3 NA) and its renderer case
```
`FaqJsonLd items={chapter.faqs}` keeps working (extra `takeaway` key is ignored — verify the component only reads question/answer; if it spreads, map explicitly in the page files).

## 3. Copy — paste verbatim (`\n` = newline in the string)

### 3.1 Headings (all chapters)
| key | field | new value |
|---|---|---|
| m1 | scenariosHeading | `出海前最常見的三個疑問` |
| m1 | steps heading | `市場探查的四個步驟` |
| m1 | report heading | `交付內容：一頁決策報告` |
| m3 | scenariosHeading | `準備寄賣時的三個卡點` |
| m3 | tracks heading | `產品證審核的 6～12 週，兩條進度同時走` |
| m3 | cards heading | `寄賣包服務內容` |
| m3 | callout heading | `交付內容` |
| m9 | scenariosHeading | `考慮在當地設點的三種情況` |
| after | scenariosHeading | `需要海外客服的三種情況` |
| after | steps heading | `客服服務流程` |
| after | dark-copy heading | `為什麼選擇菲律賓團隊` |
| na | scenariosHeading | `進軍北美前的三個卡點` |
| na | steps heading | `北美通路拓展四階段` |
| na | two-cards heading | `分工方式` |

In `ChapterPage` the hard-coded tracks headings become `產品證這一軌（審核中，持續推進）` and `鹿飛這一軌（每週都有進度）`. The literal `你可能是這樣走到這裡的` must no longer exist anywhere in `src/`.

### 3.2 Scenarios (title | body | answer | image code | alt)
m1
1. `想出海，不知道從哪裡開始` | `有產品，聽說東南亞有機會，但不知道從哪裡開始` | `先做市場探查：把產品放到當地消費者面前，用一頁報告決定要不要往下走` | m1-1 | `在世界地圖上標記目的地`
2. `報告很厚，決定還是沒有` | `找過顧問，拿到一份很厚的報告，還是不知道該不該去` | `市場探查只交一頁：誰會買、多少錢會買、為什麼不買。拿來做決定，不是拿來歸檔` | m1-2 | `整疊厚重的資料夾`
3. `不想一開始就投入幾百萬` | `怕一去就是幾百萬，想先花小錢確認` | `市場探查 1～2 萬（前 10 家實驗價）。沒過就停在這裡，過了再抵進下一章` | m1-3 | `裝滿硬幣的儲蓄罐與計算機`

m3
1. `市場驗證過了，下一步卡住` | `市場探查過了，想放貨去賣，但不知道證怎麼辦、貨放哪、誰來推` | `寄賣包一次處理：產品證代持、貨放合作夥伴的倉、上架前後的活動與推廣` | m3-1 | `倉庫鐵架上的紙箱`
2. `廣告投了，沒有人看見` | `自己上過東南亞平台，投了廣告，沒人看見` | `菲律賓消費者看網紅、看活動、看有沒有人真的用過；寄賣期間先讓人用過，再談廣告` | m3-2 | `手機上瀏覽購物應用程式`
3. `代理商只想抽成` | `有代理商找上門，只想抽成，不管你賣不賣得動` | `寄賣是賣多少算多少；產品證資料歸品牌，換通路只換一張合約` | m3-3 | `會議桌上準備簽署的合約`

m9
1. `想在當地設點，成本與時程不明` | `寄賣或代理跑順了，想在當地設點，不知道從註冊到招聘要花多少、多久` | `第一次談就給成本框架：註冊、律師、招聘、場地各大概多少，以及時間表` | m9-1 | `馬尼拉 Ayala 大道的商業區街景`
2. `開第一家店，擔心配方與選址` | `連鎖餐飲、美業品牌，想開第一家店，怕被拿走配方、怕選錯區` | `合約與文件由合作的律師行處理，選址與營運由當地夥伴陪跑；鹿飛與夥伴走過從零開店的路` | m9-2 | `咖啡店老闆在門口舉著營業中的牌子`
3. `想在菲律賓聘遠程團隊` | `在台灣有團隊，想在菲律賓聘人遠程做，不知道怎麼合規` | `人在當地、報告給台灣：招聘、到職與合規，由合作夥伴的 HR 體系與律師行處理` | m9-3 | `透過筆電進行視訊會議`

after
1. `海外客訴回不了` | `貨在海外賣，客訴和退換貨的訊息回不了，或回得很慢` | `客服信箱、平台訊息、社群私訊集中到同一個工作台，由專業英語客服團隊接手` | after-1 | `手上拿著待處理的退貨包裹`
2. `北美客服太貴，自己人英文不夠` | `去北美賣，請不起北美客服；去東南亞賣，自己人英文不夠` | `由菲律賓英語客服團隊承接，品牌不必在當地另聘客服` | after-2 | `戴著耳機的客服人員`
3. `客服外包價格偏高` | `找過台灣的客服外包，價格不便宜` | `服務規則、合約與品質指標由鹿飛台灣公司負責；報價區間第一次談就給` | after-3 | `指著帳單上的金額討論`

na
1. `想進北美主流通路，不知道第一步` | `產品在台灣站穩了，想進北美主流通路，不知道從哪一步開始` | `從市場研究與選品開始：哪一支產品先去、什麼規格、什麼價格帶` | na-1 | `超市走道上的購物車`
2. `參過展、寄過樣品，沒有下文` | `參過展、寄過樣品，沒有下文` | `北美團隊負責展位、銷售與買家邀約，把採購帶到品牌面前，一路談到首單` | na-2 | `人潮熱絡的商業展覽會場`
3. `擔心行銷預算回不來` | `怕砸了幾百萬行銷，回不來` | `收費採前期低服務費＋成交抽成，第一次談給明確數字` | na-3 | `筆電上的數據分析儀表板`

### 3.3 Steps (icon + changed text only; unchanged fields stay as they are)
- m1: 01 icon `package`, title `寄三支產品到馬尼拉`; 02 icon `users`, title `一桌教師與家長`, body `當地學校的教師（高收入的工薪階層）和家長（真正掏錢的人）圍著桌子。\n拿起來、聞一聞、翻價錢。有人皺眉，有人問哪裡買得到`; 03 icon `pen`; 04 icon `file`.
- after (all four replaced):
  - `01` icon `inbox` | `訊息集中到同一個工作台` | `客服信箱、平台訊息、社群私訊，接到同一個工作台`
  - `02` icon `badge-check` | `由專業英語客服團隊接手` | `受過完整訓練的菲律賓英語客服團隊，成員出身當地英語教育體系。\n合作夥伴在當地經營英語教育機構與連鎖餐飲，已服務過家長與餐飲客戶`
  - `03` icon `list-checks` | `依品牌規則回覆` | `回覆範本、退換貨規則、哪些情況要升級給品牌方——都寫進服務流程，由鹿飛台灣公司負責`
  - `04` icon `chart-column` | `每月服務報表` | `每月的訊息量、回覆時間、升級次數，一份報表看清楚`
- na: 步 01 `search`, 步 02 `presentation`, 步 03 `handshake`, 步 04 `store` (text unchanged).

### 3.4 Other body copy
- after `dark-copy` paragraphs (replace all three):
  1. `菲律賓是全球英語客服外包的重鎮，這是產業長年累積的結果`
  2. `鹿飛多做的一件事，是團隊成員出身英語教育體系：習慣向家長說明、溝通有耐心，也接得住品牌的客戶`
  3. `規則、合約、品質指標留在台灣公司；人在菲律賓。品牌面對的窗口是鹿飛，不是當地的外包廠`
- after: replace the `callout` "適合誰" section with a `fit` section placed at the same position:
  - heading `適合的品牌`; lead `已經在海外銷售，或正準備出海、需要英文客服的品牌`
  - items: `寄賣階段` / `電商平台開始有訂單，客訴、退換貨與商品詢問需要即時回覆`; `公司落地之後` / `當地門市或團隊成立，客服量變大，需要穩定的服務流程`; `北美市場` / `北美品牌的英文客服，多半也由菲律賓團隊承接；不必在北美另聘客服`
  - image `/images/services/fit/call-center-fit-1600.webp`, alt `兩位團隊成員一邊看筆電一邊包裝網路訂單`
- m9 cards first item body: `在當地蓋一間英語教育機構——招募師資、找場地、招第一個學生。\n後來用同樣的方法，做了一個連鎖手搖飲品牌`
- m9 table: row task `你的角色` → `品牌方的角色` (keep `isYou: true`).
- na: `title` → `進入北美主流零售通路`; `scene` → `從選品、展會到採購談判，協助已在台灣站穩的品牌進入 Costco、Walmart 與 Amazon`; second scenario of the old `scenarios` list is superseded by §3.2; two-cards item 2 body → `負責合約與進度：品牌面對的是一份合約、一條進度線`; delete the `link-card` section (replaced by `next` below).
- `src/app/services/north-america/page.tsx`: metadata title `北美通路｜進入北美主流零售通路` (description unchanged); add `<FaqJsonLd items={CHAPTERS.na.faqs} />` like the other chapter pages.
- `after.overview.body` (still rendered by the old ServicesPage until WO-R2-A merges): replace `英文老師等級的菲律賓客服團隊` with `專業的菲律賓英語客服團隊`. Leave `m1.overview` as is (WO-Z deletes `overview`).

### 3.5 FAQs (question | answer | takeaway). Answers keep their final `。`; takeaways have none. "same" = keep the current string exactly.
- m1: 1 same | same | `報告會寫清楚原因，以及什麼條件改了可以再試`; 2 same | same | `可以，市場探查獨立計價`; 3 `為什麼找教師與家長？` | `教師是當地高收入的工薪階層，家長是真正掏錢買東西的人。這兩群人的反應，比問卷準。` | `一群有消費力，一群真正掏錢`
- m3: 1 same | same | `廣告只是其中一段`; 2 same | same | `賣多少算多少，三個月看數字`; 3 same | same | `持證進口商代持，資料歸品牌`
- m9: 1 same | same | `不一定，可以直接談落地`; 2 same | `證幫你申請、坑幫你避，合規的最終責任在品牌方，這一點會清楚寫進合約。` | `協助申請與避坑，責任歸屬寫進合約`; 3 same | same | `人在當地，報告給台灣`
- after: 1 same | `兩件事：團隊是受過完整訓練的英語客服專業人員，不是一般話務員；服務規則在台灣公司，你面對的窗口是鹿飛，不是菲律賓的外包廠。` | `專業英語團隊，規則由台灣端負責`; 2 same | same | `2027 Q1 開始服務，登記者優先`; 3 same | same | `量小也可以先登記`
- na (new list): `北美通路拓展要多久？` | `平均 6～9 個月；食品與保健品因為認證要求較高，大約 9～12 個月。` | `平均 6～9 個月`; `怎麼收費？` | `前期收取較低的服務費，成交後依合約抽成。第一次談就給明確數字。` | `前期低服務費＋成交抽成`; `跟菲律賓四章有關係嗎？` | `各自獨立。北美通路由北美專責團隊執行，鹿飛負責合約與進度；去北美的品牌如果需要英文客服，也可以搭配海外客服方案。` | `各自獨立，可搭配海外客服`

### 3.6 Next-chapter cards (`next`)
| key | label | title | heading | href | image | imageAlt |
|---|---|---|---|---|---|---|
| m1 | `下一章 →` | `第三個月 · 寄賣` | `上架了，讓人先用過再說` | `/services/consignment` | `/images/hero-video/chapter-warehouse-1600.webp` | `貨架上待出貨的包裹` |
| m3 | `下一章 →` | `第九個月 · 公司落地` | `開始想要在當地有自己的人` | `/services/localization` | `/images/hero-video/chapter-storefront-1600.webp` | `夜晚街角的咖啡店與行人` |
| m9 | `下一章 →` | `之後的每一天 · 海外客服` | `星期五晚上十一點的那封信` | `/services/call-center` | `/images/hero-video/chapter-callcenter-1600.webp` (`maxTierWidth: 1600`) | `一邊通話一邊打字的客服人員` |
| after | `故事從頭來 →` | `第一個月 · 市場探查` | `先讓馬尼拉的媽媽拿起來看看` | `/services/product-testing` | `/images/hero-video/chapter-research-1600.webp` | `會議中討論圖表的團隊` |
| na | `延伸服務 →` | `海外客服` | `去北美的品牌，第一封英文客訴信也會來` | `/services/call-center` | `/images/hero-video/chapter-callcenter-1600.webp` (`maxTierWidth: 1600`) | `一邊通話一邊打字的客服人員` |

## 4. Template (`ChapterPage` and friends) — specs from DECISIONS-R2 §C
Section order per page stays as today: hero → chapter bar (PH only) → scenarios → `sections` in data order → FAQ → related reading → next-chapter card → CTA.

1. **Hero**: delete the `MailPreview` import/usage and the file `src/components/MailPreview.tsx`; delete all `.lufe-mail-*` rules in `globals.css` (including the selectors inside the reduced-motion and mobile media queries) — leave every other selector in those combined rules intact.
2. **Scenarios** (§C-1): `<section className="bg-white …">` with `h2 = chapter.scenariosHeading`, then three rows. Row i: `figure` + text; i=1 image on the right at ≥768px (`md:order-2` on the figure). Text: number (`01`…), `h3` title, body, then the answer block with the small label `鹿飛的做法`. Images `TieredImage` `loading="lazy"`, `sizes="(min-width: 768px) 50vw, 100vw"`, `className="h-full w-full object-cover"`, figure `aspect-[4/3] overflow-hidden`. No hover effect on rows.
3. **Steps** (§C-2): icon map `StepIcon → LineIcons component` (`package→PackageIcon, users→UsersIcon, pen→PenIcon, file→FileIcon, inbox→InboxIcon, badge-check→BadgeCheckIcon, list-checks→ListChecksIcon, chart-column→ChartColumnIcon, search→SearchIcon, presentation→PresentationIcon, handshake→HandshakeIcon, store→StoreIcon`). Card header row: 44×44 `.lufe-step-icon` box (`border border-gold/25 bg-gold/10 text-gold-d`, icon 22px) + the number text to its right. Grid `md:grid-cols-2 lg:grid-cols-4`. Keep `data-lufe-steps`/`data-lufe-step` so `DelightLayer` keeps driving `--lufe-step-progress` and `data-lufe-step-reached`.
   CSS (globals.css, replace the `.lufe-step-number` rules, same location):
   - `.lufe-step-icon` = old `.lufe-step-number` positioning; its `::after` connector only inside `@media (min-width:1024px)`.
   - reached: `.lufe-step[data-lufe-step-reached="true"] .lufe-step-icon { background: var(--color-gold); color: var(--color-navy); border-color: var(--color-gold); }` (no transition on these properties) and `.lufe-step[data-lufe-step-reached="true"] .lufe-step-icon svg { animation: lufe-step-pop .42s cubic-bezier(.34,1.56,.64,1) 1 both; }` with `@keyframes lufe-step-pop { 0% { transform: scale(.82) } 60% { transform: scale(1.08) } 100% { transform: scale(1) } }`.
   - `@media (hover:hover) { .lufe-step { transition: transform .25s cubic-bezier(.2,.8,.2,1); } .lufe-step:hover { transform: translateY(-3px); } .lufe-step:hover .lufe-step-icon svg { transform: scale(1.06); transition: transform .25s; } }`; `.lufe-step:active { transform: scale(.985); }`.
   - reduced-motion: no animation, no transform.
   - **Constraint** (`tests/components/design-layer.test.ts`): every rule after `.lufe-reading-progress` in globals.css may only transition `transform`/`opacity`. Do not add `transition` on background/color/border/box-shadow there.
4. **Chapter bar** (§C-3) in `ChapterBar.tsx` (+ CSS next to the existing `.lufe-chapter-*` rules):
   - State `previewIndex: number | null` set on `pointerenter`/`focus` of a link, cleared on `pointerleave`/`blur`.
   - Inside each `.lufe-chapter-line` add `<span className="lufe-chapter-line-preview" data-on={…} aria-hidden="true" />`: absolute, full size, `background: rgba(212,168,92,.5)`, `transform: scaleX(0)`, `transform-origin: left`, `transition: transform .32s cubic-bezier(.2,.8,.2,1)`; `data-on="true"` (→ `scaleX(1)`) when `previewIndex !== null && index > currentIndex && index <= previewIndex`.
   - Peek card: inside each link a `<span className="lufe-chapter-peek" aria-hidden="true">{chapter.title}</span>`, absolute `top: calc(100% + 8px); left: 0`, `white-space: nowrap`, white bg, `1px solid var(--color-bd)`, `padding: 8px 12px`, 12.5px `var(--color-tx2)`, `opacity:0; transform: translateY(-4px); pointer-events:none; transition: opacity .18s, transform .18s`. Shown on `.lufe-chapter-link:hover` / `:focus-visible` only inside `@media (hover:hover) and (min-width:768px)`; hidden below 768px (`display:none`). The link needs `position: relative`. The scroller div gets `md:overflow-visible` so the card is not clipped.
   - `.lufe-chapter-link { transition: color .15s, transform .1s; } .lufe-chapter-link:active { transform: scale(.97); }`; hover (hover:hover) `.lufe-chapter-link:hover .lufe-chapter-dot { transform: scale(1.25); }` (current dot keeps its own scale).
   - One-shot ping: `.lufe-chapter-link-current .lufe-chapter-dot { position: relative; }` + `::after` (inset 0, `border: 2px solid var(--color-gold)`, `animation: lufe-chapter-ping .9s cubic-bezier(.2,.8,.2,1) .3s 1 both`) with `@keyframes lufe-chapter-ping { from { transform: scale(1); opacity: .45 } to { transform: scale(2.4); opacity: 0 } }`.
   - Mobile centering on mount: `scroller.scrollTo({ left: link.offsetLeft - (scroller.clientWidth - link.offsetWidth) / 2, behavior: reduced ? "auto" : "smooth" })` on the scroller element only (never `scrollIntoView`).
   - reduced-motion: no ping, preview/peek switch without transition, no scale.
5. **Fit section** (§C-4): new renderer for `type: "fit"` — white bg; `grid md:grid-cols-12 gap-10 md:gap-16 items-center`; left `md:col-span-7`: `h2`, `p.lead`, list of items (`border-t border-bd pt-5`, `CheckIcon` 20px `text-gold-d`, label 16px/650 `text-tx`, body 15.5px `text-tx2`); right `md:col-span-5`: figure `aspect-[16/9] md:aspect-[4/5] overflow-hidden`, `TieredImage` lazy, `sizes="(min-width: 768px) 40vw, 100vw"`. On mobile the figure comes after the list.
6. **FAQ**: replace the `Disclosure` block with `<FaqSection title="常見問題" idPrefix={`${chapter.key}-faq`} items={chapter.faqs.map((f, i) => ({ num: String(i + 1).padStart(2, "0"), question: f.question, answer: f.answer, takeaway: f.takeaway }))} className="bg-white py-[72px] md:py-[96px]" />`. Remove the now-unused `Disclosure` import.
7. **Next-chapter card** (§C-5) in `NextChapter.tsx`: whole card is the `Link`, `group` class; `grid md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] border border-bd bg-cream`; left figure `aspect-[16/10] overflow-hidden` with `TieredImage` (lazy, `maxTierWidth={next.maxTierWidth}`, `sizes="(min-width: 768px) 40vw, 100vw"`, image `transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-[1.03]`); right `p-6 md:p-10 flex flex-col justify-center`: label (13px `text-gold-d`), title (16px/600), `h2.h3` heading, arrow (`[@media(hover:hover)]:group-hover:translate-x-1 transition-transform`). Card `active:scale-[.985]`, `[@media(hover:hover)]:hover:border-gold`. The NA page now renders it too.
8. Remove the `link-card` type and renderer. Keep `callout`/`dark-copy`/`two-cards` renderers (still used).
9. Full-stop sweep (COMMON.md) over your allowed paths; FAQ answers keep `。`, everything else in this WO has none.

## 5. Tests
- Update `chapter-page.test.ts`: every chapter renders `scenariosHeading`, all three scenario titles/bodies/answers, all FAQ questions/answers/takeaways in server HTML; NA renders `進入北美主流零售通路`, its 3 FAQs, a next card linking `/services/call-center`, and still no `aria-label="菲律賓服務章節"`; call-center renders `適合的品牌` and no `Where is my refund?`; no chapter markup contains `你可能是這樣走到這裡的` or `老師`.
- `design-layer.test.ts`: drop the `MailPreview` / `.lufe-mail-reply` expectations; keep every other assertion; add `expect(css).not.toContain("lufe-mail")`.
- New: `rg -n "老師" src/data/chapters.ts src/components/services` must be empty — encode as a test reading the files.

## 6. Verification
COMMON.md steps 1–8. Screenshot paths (port 3411): `/services/product-testing /services/consignment /services/localization /services/call-center /services/north-america`. Every path `OK` at 1440 and 390 (the chapter bar scroller must not cause document overflow). Additionally capture two interaction shots at 1440 on `/services/consignment`: hover the 「之後的每一天 · 海外客服」 link (preview line + peek card visible) and the step section after scrolling it into view (reached icons gold) — save as `hover-chapterbar.png`, `steps-reached.png`. Run one pass with `reducedMotion: "reduce"` and confirm no console errors.
PR body: note numbers #7–#19, #24 (H1/metadata part), #25, #26 with one line each.
