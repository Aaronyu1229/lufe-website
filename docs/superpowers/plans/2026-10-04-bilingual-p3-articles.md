# 中英雙語 Plan 3／4：英文文章 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 靜態文章（`src/data/articles.ts`）全部有英文版，`/en/insights` 列表與 `/en/insights/<slug>` 文章頁上線（仍 noindex），首頁「最新洞察」、選單最新文章、延伸閱讀、創辦人文章清單在英文頁顯示英文文章；之後自動駕駛每篇新文章中英同發。

**Architecture:** 英文文章一篇一檔 `src/data/en/articles/<slug>.ts`，只放文字欄位，用 slug 對應中文文章；`src/data/en/articles/index.ts` 匯總成 `EN_ARTICLES`。非文字欄位（日期、`publishAt`、分類值、顏色、`lastVerified`）一律取中文那份，所以中英同時發布。每篇英文文章自動登記進 `I18N_MODULES`，沿用指紋（中文改了英文要跟著改）與數字一致性檢查。文章內站內連結維持中文路徑寫法，由渲染端依語言轉成 `/en/...`；指向還沒有英文的文章時改連 `/en/insights`。

**Tech Stack:** 同 Plan 1／2（Next.js 16.2.2、React 19、vitest）。

**Spec:** `docs/superpowers/specs/2026-10-03-bilingual-site-design.md` §4、§6 P2；**前置：** Plan 2 已全部上線（PR #140、#142、#143、#145、#146）。

**與規格的差異（需 Aaron 知悉）：** 規格 §4 寫資料庫文章（Ghost 相容介面）要加 `locale` 欄位。實查 2026-10-04 正式站資料庫文章 0 篇、列表 14 篇全部是靜態文章，所以**資料庫部分本計畫不做**：`/en/insights` 只列靜態英文文章，資料庫文章不出現在英文版。等第一篇資料庫文章要發布時再另立小計畫（含需要 postgres 管理者手動執行的 migration）。

## Global Constraints

- 繼承 Plan 1、Plan 2 全部 Global Constraints（網址、noindex、用語表、英文文風、翻譯鐵律、不放「以中文版為準」、建置鎖只准 `mkdir /tmp/lufe-build.lock`／`rmdir`、字型守門、Next 16 先讀 `node_modules/next/dist/docs/`、程式註解英文、commit 尾行 `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`）。
- **不得改動 `src/data/articles.ts` 的結構與既有內容**（`scripts/blog-schedule.mjs` 以 AST 讀它；測試取 `articles[0]`）。
- **中文輸出逐字不變**：每個改到的文章相關元件，改動前先存黃金快照（Plan 2 配方 R1），改完逐字比對。
- **英文完整**：英文文章頁整份 HTML（含 `alt`、`aria-label`、JSON-LD、出處標題與發布者）不得含漢字；站內連結全在 `/en` 底下。
- **翻譯鐵律（每篇）**：數字、年份、百分比、金額、「預計」中英一致（`checkConsistency`）；金額寫 `NT$`；不新增中文沒有的案例、經驗、數字；禁用 `guarantee`、`guaranteed`、`golden decade`、`demographic dividend`（大小寫不拘）。
- **出處（sources）**：`url` 不變；`title`、`publisher`、`note` 翻成英文（官方英文名稱不確定時用直白描述，不得杜撰正式英文名）；出處編號 `[n]` 與中文完全相同。
- **英文分類標籤（定案）**：菲律賓＝Philippines；印尼＝Indonesia；東南亞趨勢＝Southeast Asia trends；北美市場＝North America；出海實戰＝Going abroad in practice；企業體質＝Business fundamentals；全部＝All。
- **閱讀時間**：英文 `readTime` 寫 `"<n> min read"`，n 與中文分鐘數相同。
- **絕不用編碼（base64、跳脫字元等）把中文藏起來躲過無漢字檢查。** 一時翻不了的就保留原樣並在 PR 描述列出。
- **絕不為了讓「讀原始碼找字串」的守門測試通過而複製 JSX**；改守門測試去斷言 prop 的中文預設值，並在 PR 說明。

## Review Focus

1. **英文先於中文上線**：英文文章若自帶日期，可能在中文 `publishAt` 之前就出現 → Task 1 測試：英文文章的發布判斷只看中文那份的 `publishAt`；中文未發布時 `/en/insights/<slug>` 要 404，列表也不出現。
2. **文章內連結掉回中文或連到 404**：英文內文的 `[文字](/insights/x)` 要變 `/en/insights/x`；目標文章還沒英文時改連 `/en/insights` → Task 2 測試。
3. **中文文章改了英文沒跟上**（每月更新會改中文）→ Task 1 把每篇英文文章登記進 `I18N_MODULES`，指紋不符就紅燈。
4. **出處編號或數字被翻掉**：`[3]` 變 `[2]`、「1～2 萬」漏掉 → `checkConsistency` 跑每篇；Task 1 另加「英文內文的出處編號集合＝中文」測試。
5. **自動駕駛新文章沒附英文就合併**：Task 10 開啟「每篇文章都要有英文」守門，與 RUNBOOK 修改同一個 PR，避免中間空窗讓自動駕駛的 PR 莫名紅燈。

---

## Task 1：英文文章資料層＋守門

**Files:**
- Create: `src/data/en/articles/index.ts`
- Create: `src/data/en/article-categories.ts`
- Create: `src/lib/articles/english.ts`
- Modify: `src/i18n/registry.ts`（把每篇英文文章加進 `I18N_MODULES`）
- Test: `tests/i18n/english-articles.test.ts`

**Interfaces:**
- Produces:
  - `type EnglishArticle = { readonly slug: string; readonly sourceFingerprint: string; readonly title: string; readonly summary: string; readonly readTime: string; readonly content: readonly string[]; readonly faq?: readonly { q: string; a: string }[]; readonly sources?: readonly { id: number; title: string; publisher: string; url: string; note?: string }[] }`（在 `src/data/en/articles/index.ts`）
  - `EN_ARTICLES: Readonly<Record<string, EnglishArticle>>`
  - `CATEGORY_LABELS_EN: Readonly<Record<Category | "全部", string>>`（`src/data/en/article-categories.ts`）
  - `toEnglishArticle(zh: Article, en: EnglishArticle): Article`：回傳 `{ ...zh, title, summary, readTime, content, faq, sources }`（`category` 值保留中文，顯示時再用 `CATEGORY_LABELS_EN`）
  - `getEnglishArticle(slug: string, now?: Date): Article | undefined`：中文文章存在、已發布（`isPublished`）且有英文才回傳
  - `getPublishedEnglishArticles(now?: Date): readonly Article[]`：依 `getPublishedArticles(now)` 的順序，只留有英文的
  - `hasEnglishArticle(slug: string): boolean`（只看有沒有英文檔，不看發布時間；給連結轉換用）
  - `articleZhText(zh: Article)`：回傳 `{ title, summary, content, faq, sources: sources?.map(({ title, publisher, note }) => ({ title, publisher, note })) }`，給指紋與一致性用

- [ ] **Step 1: 寫失敗測試** `tests/i18n/english-articles.test.ts`：
  - 用 `vi.mock("@/data/en/articles", ...)` 提供一篇假的英文文章（slug 取 `articles` 裡一篇有 `publishAt` 的文章，另一篇取已發布的）。
  - `getEnglishArticle(<已發布 slug>)` 回傳的物件 `date`、`publishAt`、`category`、`color` 等於中文那份，`title` 是英文。
  - `getEnglishArticle(<未發布 slug>, new Date("2026-01-01"))` 為 `undefined`。
  - `getEnglishArticle("no-such-slug")` 為 `undefined`；有中文但沒英文的 slug 也是 `undefined`。
  - `getPublishedEnglishArticles()` 只含有英文的文章，順序同 `getPublishedArticles()`。
  - 不 mock 的另一個 describe：對真實 `EN_ARTICLES` 每一篇：
    - slug 必須存在於 `articles`；
    - 英文 `content`、`faq`、`sources` 序列化後無漢字；
    - 不含 `/guarantee|golden decade|demographic dividend/i`；
    - 內文 `[n]` 出處編號集合＝中文內文的集合；`sources` 的 `id` 與 `url` 依序等於中文。
    （目前 `EN_ARTICLES` 是空物件，這些測試要能在空集合下通過，Task 5 起才有內容。）
- [ ] **Step 2: 跑** `npx vitest run tests/i18n/english-articles.test.ts` → FAIL（module not found）
- [ ] **Step 3: 實作** 上述檔案；`EN_ARTICLES` 先 `= {}`。`registry.ts` 加：
  ```ts
  ...Object.values(EN_ARTICLES).map((en) => {
    const zh = articles.find((article) => article.slug === en.slug)!;
    const { slug: _slug, sourceFingerprint, ...enText } = en;
    return { name: `article:${en.slug}`, zh: articleZhText(zh), en: { title: enText.title, summary: enText.summary, content: enText.content, faq: enText.faq, sources: enText.sources?.map(({ title, publisher, note }) => ({ title, publisher, note })) }, sourceFingerprint, enFile: `src/data/en/articles/${en.slug}.ts` };
  }),
  ```
  （照 `registry.ts` 既有型別調整；`readTime` 不放進比對，因為「6 分鐘」與「6 min read」本來就一致。）
- [ ] **Step 4: 跑** `npx vitest run tests/i18n` → 全綠
- [ ] **Step 5: Commit** `feat(i18n): English article data layer and guards`

## Task 2：文章元件吃 locale（含內文連結轉換）

**Files:**
- Modify: `src/components/insights/StaticArticleContent.tsx`、`ArticleDetail.tsx`、`ArticleFaq.tsx`、`ArticleToc.tsx`、`InsightArticleCard.tsx`、`InsightsPage.tsx`（介面文字搬到 zh／en 模組）
- Create: `src/i18n/zh/insights.ts`、`src/i18n/en/insights.ts`（「洞察與資源」「本文目錄」「出處與查證（{n} 筆）・最後查證 {date}」「發布：」「延伸閱讀」「← 回到所有文章」「看更多專欄文章 →」「鹿飛 LUFÉ 創辦人・來自躍馬企業」作者簡介、「查看出處 {n}」、列表頁篩選與空狀態等所有元件內中文）
- Test: `tests/i18n/insights-components-en.test.ts`

**Interfaces:**
- Consumes: `localizedHref`、`hasEnglishArticle`、`CATEGORY_LABELS_EN`、`expectEnglishMarkup`
- Produces: `localizeArticleHref(locale: Locale, href: string): string`（在 `StaticArticleContent.tsx` 匯出）：
  - `locale === "zh"` → 原樣
  - `/insights/<slug>`：有英文 → `/en/insights/<slug>`，沒有 → `/en/insights`
  - 其他以 `/` 開頭 → `localizedHref("en", href)`
  - 外部連結、`#`、`mailto:` → 原樣
  - 各元件加 `locale?: Locale`（預設 `"zh"`），子元件文字 prop 預設值＝原中文

- [ ] **Step 1: 黃金快照**：照 Plan 2 配方 R1，對 `ArticleDetail`（用 `articles[0]`、它的圖、空 related）與 `InsightsPage`（用 `getPublishedArticles().map(toInsightCard)`）各存 `tests/fixtures/article-detail.zh.html`、`tests/fixtures/insights-page.zh.html`，單獨 commit。
- [ ] **Step 2: 失敗測試**：
  - zh 快照逐字相同。
  - `localizeArticleHref` 的五種輸入各一個斷言（有英文的 slug 用 `vi.mock` 讓 `hasEnglishArticle` 回 true）。
  - `ArticleDetail` 以一篇假英文文章（`toEnglishArticle` 產生）＋`locale: "en"` 渲染 → `expectEnglishMarkup`，且分類顯示 `CATEGORY_LABELS_EN` 的值。
  - `InsightsPage` 以英文卡片＋`locale: "en"` 渲染 → `expectEnglishMarkup`。
- [ ] **Step 3: 跑** → FAIL
- [ ] **Step 4: 實作**（Plan 2 配方 R3–R5）。`renderInlineMarkdown`、`StaticArticleContent` 都要把 locale 傳到連結轉換；`情境：` 樣式判斷英文改判 `Scenario:`（英文翻譯一律用 `Scenario: ` 開頭）。
- [ ] **Step 5: 跑** `npx vitest run tests/i18n tests/components/insights` 全綠
- [ ] **Step 6: Commit** `feat(i18n): locale-aware article components`

## Task 3：英文路由 `/en/insights`、`/en/insights/[slug]`

**Files:**
- Create: `src/app/en/insights/page.tsx`、`src/app/en/insights/[slug]/page.tsx`
- Modify: `src/i18n/config.ts`（`EN_ROUTES` 加 `/insights`、`/insights/[slug]`）、`src/i18n/coverage.ts`（從 `EN_PENDING` 移除這兩條；`EN_PENDING` 變空物件）
- Test: `tests/i18n/insights-routes-en.test.ts`

- [ ] **Step 1: 失敗測試**：
  - `generateStaticParams()`（英文）只回傳 `getPublishedEnglishArticles()` 的 slug。
  - 英文 `[slug]` 頁的 `generateMetadata`：有英文 → 英文標題、`alternates.canonical` 為 `/en/insights/<slug>`；沒英文 → `{ title: "Article not found" }`。
  - 英文文章頁對沒英文的 slug 呼叫 `notFound()`（mock `next/navigation` 的 `notFound` 為 throw，斷言 throw）。
- [ ] **Step 2: 跑** → FAIL
- [ ] **Step 3: 實作**：照中文頁的結構複製，資料改用 `getPublishedEnglishArticles`／`getEnglishArticle`；`export const dynamicParams = false`；**不讀資料庫文章**；`createArticleMetadata`／`createPageMetadata` 帶 `locale: "en"`；JSON-LD（`ArticleJsonLd`、`BreadcrumbJsonLd`、`FaqJsonLd`）用英文名稱與 `/en` 路徑；related 只取有英文的文章；列表頁 metadata：title `Insights · What comes up in the first year abroad`，description 照中文那段翻。
- [ ] **Step 4: 跑** `npx vitest run tests/i18n` 全綠（含 route-coverage）
- [ ] **Step 5: Commit** `feat(i18n): English insights routes`

## Task 4：首頁最新洞察、選單最新文章、延伸閱讀、創辦人文章清單

**Files:**
- Modify: `src/components/home/LatestInsightsSection.tsx`、`src/app/en/page.tsx`（把延後到 Plan 3 的區塊接上）
- Modify: `src/app/layout.tsx`、`src/components/Navbar.tsx`（新增 prop `latestArticleEn?: InsightCard`；`locale === "en"` 用它，沒有就不顯示）
- Modify: `src/components/services/RelatedReading.tsx`（英文改回傳英文卡片，`RelatedReadingContent` 標題文字走 copy）
- Modify: `src/components/about/AuthorArticleList.tsx`（英文顯示英文文章）
- Test: 更新 Plan 2 的 `tests/i18n/home-latest-insights-en.test.ts`、`navbar-en.test.ts`，新增 `tests/i18n/related-reading-en.test.ts`

- [ ] **Step 1:** 把 Plan 2 測試中「英文渲染為空」的斷言改成「英文渲染含英文文章標題且 `expectEnglishMarkup`」（這是規格內預定的行為改變，不是放寬；在 commit 訊息註明）。中文快照不動。
- [ ] **Step 2: 跑** → FAIL
- [ ] **Step 3: 實作**。`layout.tsx` 的 `latestArticleEn = getPublishedEnglishArticles()[0]`，經 `toInsightCard` 後傳入。
- [ ] **Step 4: 跑** `npx vitest run --maxWorkers=2` 全綠
- [ ] **Step 5: Commit** `feat(i18n): English latest insights, related reading and founder articles`

## Task 5–9：翻譯文章（每個 Task 3 篇）

每篇照「翻譯配方」：

1. 建 `src/data/en/articles/<slug>.ts`：
   ```ts
   import type { EnglishArticle } from "./index";
   // Fingerprint of the Chinese article this English was translated from; registry.test.ts prints the new value when Chinese changes.
   export const article: EnglishArticle = {
     slug: "<slug>",
     sourceFingerprint: "SET_AFTER_FIRST_RUN",
     title: "…", summary: "…", readTime: "<n> min read",
     content: [String.raw`…`],
     faq: [{ q: "…", a: "…" }],
     sources: [{ id: 1, title: "…", publisher: "…", url: "<same url>", note: "…" }],
   };
   ```
2. 在 `index.ts` import 並加進 `EN_ARTICLES`。
3. 內文規則：段落數與 `##` 標題數同中文；`> **先說答案：**` → `> **Short answer:**`；`## 情境：…` → `## Scenario: …`；表格欄數同中文；站內連結保留中文路徑寫法（`/services/...`、`/insights/...`），渲染端會轉；結尾「經驗與實務整理，非法律意見」→ "Based on practical experience; not legal advice."。
4. 跑 `npx vitest run tests/i18n`，把 `registry` 印出的指紋填回 `sourceFingerprint`，再跑一次全綠。
5. 一篇一個 commit：`feat(i18n): English article <slug>`。

| Task | 文章（依 `articles.ts` 順序） |
|---|---|
| 5 | `agent-vs-distributor-exclusive`、`fob-cif-ddp-explained`、`overseas-exhibition-subsidy-115-upgrade` |
| 6 | `manila-beverage-first-store-90-days`、`philippines-ecommerce-first-year`、`first-time-export-checklist` |
| 7 | `us-fda-registration-guide`、`tradepilot-tariff-tutorial`、`landed-cost-before-export` |
| 8 | `go-no-go-framework`、`why-philippines-first`、`product-testing-best-practices` |
| 9 | `amazon-us-three-decisions`、`philippines-fda-lto-cpr-cpn`、`philippines-cpr-transfer-change-importer`、`market-entry-modes-compared`，以及執行當下 `articles.ts` 裡其餘還沒有英文的文章（自動駕駛新增的） |

每個 Task 結束：`npx tsc --noEmit`、`npx vitest run --maxWorkers=2` 全綠才 commit 最後一篇。

## Task 10：守門開啟＋RUNBOOK 中英同發＋AGENTS 規則更新

**Files:**
- Test: `tests/i18n/article-coverage.test.ts`
- Modify: `docs/blog-autopilot/RUNBOOK.md`、`AGENTS.md`

- [ ] **Step 1: 失敗測試** `article-coverage.test.ts`：`articles` 每一篇（含 `publishAt` 在未來的）在 `EN_ARTICLES` 都有對應；失敗訊息：`Article <slug> has no English version. Add src/data/en/articles/<slug>.ts (see docs/blog-autopilot/RUNBOOK.md step 5b).`
- [ ] **Step 2: 跑** → 若 Task 9 已補齊則 PASS；若有遺漏，補翻到 PASS（不得把文章排除）。
- [ ] **Step 3: RUNBOOK**：
  - 第 5 步後加「5b 英文版」：照本計畫「翻譯配方」1–4 寫英文檔，同一個 PR。
  - 第 6 步鐵律加：英文跑同一套（禁用 `guarantee|golden decade|demographic dividend`、出處編號一致）；`npx vitest run tests/i18n` 必須綠（含數字一致性）。**英文不過＝整篇（含中文）不發。**
  - 第 8 步「等 Vercel 檢查 pass」改成「等全部檢查 pass（含 GitHub `test`）」。
  - 「每月任務」第 3 步更新文章時：中文改了要同步改英文並更新指紋。
  - 「不做的事」第一條允許範圍加上 `src/data/en/articles/`。
- [ ] **Step 4: AGENTS.md**：刪除「例外（至英文文章上線前）…」那一條，改成：「文章：新增或修改 `src/data/articles.ts` 的文章，必須在同一個 PR 新增或更新 `src/data/en/articles/<slug>.ts`（作法見 `docs/blog-autopilot/RUNBOOK.md` 5b）。」
- [ ] **Step 5: 跑** `npx vitest run --maxWorkers=2` 全綠
- [ ] **Step 6: Commit** `feat(i18n): require English for every article; autopilot publishes both`

## 驗證與 PR（每個 PR 都做，Claude 執行審查與上線）

- `npx tsc --noEmit`；`npx eslint src`（只允許主線既有的 `FreightRateChart.tsx:21`）；`npx vitest run --maxWorkers=2` 貼完整摘要行（含 failed 數）；建置（建置鎖）。
- `npm run start` 後：每個新的 `/en/insights...` 頁：可見文字除了 `MessageBox` 對話框外無漢字、站內連結全在 `/en`、`noindex`；1440 與 390 寬 `document.documentElement.scrollWidth` 等於視窗寬；對應中文頁 200 且 `index, follow`、內容不變。
- PR 分法：PR-1＝Task 1–4（地基＋路由，英文文章 0 篇時 `/en/insights` 顯示英文空狀態）；PR-2…＝Task 5–9 每個 Task 一個 PR；最後 PR＝Task 10。每個 PR 合併上線後才派下一個。
- **自動駕駛衝突**：每週日 20:00 自動駕駛會改 `articles.ts`、`chapters.ts`。Task 5–10 的 PR 只新增 `src/data/en/articles/*` 與 `index.ts`，不碰這兩個檔；若 rebase 時 `articles.ts` 有新文章，留給 Task 9／10 處理。

## Self-Review

1. **Spec 覆蓋：** §4 靜態文章 → Task 1、5–9；`/en/insights/[slug]` 沒英文 404 → Task 3；RUNBOOK 中英同發、英文不過整篇不發 → Task 10；資料庫文章 → 明確延後（見「與規格的差異」）。§6 P2 開放門檻「截至當天的全部靜態文章英文完成」→ Task 10 守門。切換鈕「沒英文的文章到 `/en/insights`」→ `localizeArticleHref` 與 Plan 1 的 `switchLocalePath` 已處理，開放日再驗。
2. **佔位字：** `SET_AFTER_FIRST_RUN` 為刻意佔位，Task 5–9 第 4 步填入且有指紋測試把關。
3. **型別一致：** `EnglishArticle`、`EN_ARTICLES`、`toEnglishArticle`、`getEnglishArticle`、`getPublishedEnglishArticles`、`hasEnglishArticle`、`articleZhText`、`localizeArticleHref`、`CATEGORY_LABELS_EN` 在 Task 1–4 定義與使用一致。
4. **Review Focus：** 五條都已對應到 Task 1、2、1、1、10 的測試。
