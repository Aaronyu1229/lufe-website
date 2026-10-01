# 工單：文章定時發布（publishAt）（2026-10-01）

工作目錄 `~/dev/lufe-sched`，分支 `feat/scheduled-publishing`（從 main 558adae）。

## 目標
文章可以先合併進 main，但到 `publishAt` 那一刻之前，網站任何地方都看不到；時間到了自動出現（不需重新部署）。網站已用 ISR：`/insights`、`/insights/[slug]`、`sitemap.ts` 都是 `revalidate = 300`。

## 要做的
1. `src/data/articles.ts`：`Article` 加選填 `publishAt?: string`（ISO 8601，含時區，例如 `2026-10-07T09:00:00+08:00`）。沒有 publishAt 的視為已發布（現有 13 篇不用改）。
2. 新增 `src/lib/articles/published.ts`：`isPublished(article, now = new Date())`、`getPublishedArticles(now?)`。**全站所有讀文章列表的地方都改用它**：洞察列表、章節延伸閱讀、首頁／導覽列的最新文章、作者頁文章列表、相關閱讀、sitemap、RSS（若有）、JSON-LD 裡的文章列表。用 `grep -rn "articles" src` 逐一確認，列在 PR。
3. 文章頁 `[slug]`：未發布的 slug 回 `notFound()`；`generateStaticParams` 只產已發布的。頁面顯示的發布日與 JSON-LD `datePublished`：有 publishAt 時用 publishAt 的日期。
4. 時間到後要能出現：確認 `dynamicParams = true` 時，未預先產生的 slug 在發布後第一次請求會被渲染並快取（revalidate 300）。列表頁、sitemap 也要在 revalidate 週期內反映新文章。寫測試覆蓋「發布前 404、發布後 200」的邏輯（用注入 now 的單元測試即可）。
5. 新增 `scripts/blog-schedule.mjs` 與 `npm run blog:schedule`：印出所有文章的 slug、publishAt、狀態（已發布／排程中），以及「下一個空檔」：依每週二、四、六 09:00 +08:00 的節奏，找出從現在起尚未被任何文章佔用的下 3 個時段（輸出 ISO 字串，一行一個，最後一段加 `--json` 參數時輸出 JSON 陣列）。
6. 測試：未來 publishAt 的假文章不出現在列表、sitemap、作者頁、相關閱讀、導覽列最新文章；過去 publishAt 的會出現。

## 驗證
`npm ci`；`npx tsc --noEmit`；`npx eslint src`；`npx vitest run --maxWorkers=2`；建置 `until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（只准 mkdir／rmdir）。
commit 結尾 `Co-Authored-By: Codex <noreply@openai.com>`；`git push -u origin feat/scheduled-publishing`；`gh pr create --base main --title "feat: 文章定時發布（publishAt）"`。**不准合併。**
