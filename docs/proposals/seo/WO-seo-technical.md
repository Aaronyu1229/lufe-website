# 工單：SEO／GEO 技術修正（2026-09-30，Aaron 已同意現在修）

你在 `~/dev/lufe-seo`（worktree，分支 `feat/seo-technical`，從 main 開出）。背景見 `docs/proposals/seo/blog-plan-2026-09-30.html` 的「技術修正」區塊。
**先讀 `node_modules/next/dist/docs/` 裡 metadata、generateMetadata、JSON-LD 的說明**（這版 Next 跟你記得的可能不同）。網站網址一律從 `src/lib/site.ts` 取，不准寫死 `https://lufe.world`。

## 原則
- 網站看得到的文字一字不改；只加 metadata、結構化資料、作者資訊、DOM 順序調整。
- 不准裝套件；不准動 `src/app/api/**`、`src/lib/leads/**`、`src/app/fonts/**`。
- 結構化資料只寫網站上真的有的事實（名稱、網址、logo、作者、日期、FAQ 原文），不准捏造評分、評論、價格以外的數字、地址電話。

## 要做
**T1 結構化資料（JSON-LD，`<script type="application/ld+json">`，伺服器輸出）**
- 全站：`Organization`（name「鹿飛 LUFÉ」、url、logo `/images/logo/logo-mark-navy.png` 或現有最適合者、founder → Person Aaron Yu、sameAs 先留空陣列並在 PR 註明待補 LinkedIn）＋`WebSite`。
- `Person`（Aaron Yu，jobTitle「鹿飛 LUFÉ 創辦人」，worksFor 鹿飛，description 用網站既有文字「看了很多年貨櫃出去，決定去接貨到了之後的事。」）。
- 文章頁 `/insights/[slug]`：`Article`（headline、description、image、datePublished、dateModified〔有更新日用更新日，沒有用發布日〕、author → Aaron Yu Person、publisher → Organization、mainEntityOfPage）。靜態文章與資料庫文章都要。
- 有 FAQ 的頁面（首頁、服務總覽、五個方案頁、運營優化、方法論）：`FAQPage`，問答文字與畫面上一字不差。
- 所有非首頁：`BreadcrumbList`（照畫面上的麵包屑）。
**T2 canonical**：每一頁自己的 canonical（`alternates.canonical`）；有 `?cat=` 的洞察頁 canonical 指到 `/insights`。
**T3 文章頁**：`openGraph.type = "article"`，加 `publishedTime`、`modifiedTime`、`authors`；`<meta name="author">` 改成 `Aaron Yu`；畫面上若有作者顯示「鹿飛 LUFÉ」的地方，改成顯示 Aaron Yu（這是唯一允許改的可見文字）。
**T4 標題重複**：文章頁 title 目前是「文章標題 — 鹿飛 LUFÉ | 鹿飛 LUFÉ」，改成「文章標題 | 鹿飛 LUFÉ」；全站檢查所有頁 title 只出現一次品牌名。
**T5 導覽面板的文字不要排在主內容前面**：桌機 mega 面板的內容（五個面板）目前在伺服器 HTML 裡位於 `<main>` 之前。改成：面板內容仍在伺服器 HTML（內部連結要讓 Google 抓得到，既有 `tests/components/navbar.test.ts` 要繼續通過），但 DOM 位置移到 `<main>` 之後（例如在 layout 裡把面板容器放在 children 後面，用 fixed 定位對齊導覽列），畫面、互動、鍵盤操作、`aria-controls`、彈簧高度動畫都不能變。導覽列本身五個選單按鈕與 logo 仍在最前面。
**T6 robots.txt**：維持全站允許；另外明確列出允許 `OAI-SearchBot`、`PerplexityBot`、`Claude-SearchBot`、`Googlebot`、`Bingbot`（不擋任何訓練型爬蟲）；`/api/` 照舊不允許；Sitemap 照舊。

## 驗證（寫進 PR）
1. `npm ci`；`npx tsc --noEmit`；`npx eslint src`；`npx vitest run --maxWorkers=2`。
2. 新增測試：首頁 Organization＋WebSite；文章頁 Article（author 是 Aaron Yu、有 datePublished）；方案頁 FAQPage 與畫面問答一致；非首頁有 canonical 與 BreadcrumbList；文章 title 品牌只出現一次；伺服器 HTML 中第一個 `<main` 出現在 mega 面板內容之前。
3. 建置：`until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（只准 mkdir／rmdir；字型守門擋下就列缺字、不繞過）。
4. `next start` 後：每個 JSON-LD 用 `JSON.parse` 能解析；用 agent-browser 在 1440 滑過五個導覽面板，位置與動畫跟 main 上一致；390 手機選單正常；無 console error、無橫向捲動。做完 `agent-browser close`、關 next start。

## 交付
commit 結尾 `Co-Authored-By: Codex <noreply@openai.com>`；`git push -u origin feat/seo-technical`；`gh pr create --base main --title "feat: SEO／GEO 技術修正"`。**不准合併。**
