# 工單：鹿飛 /insights 改為 DB 驅動 + Ghost 相容 Admin API

- 日期：2026-09-13
- repo：`~/dev/lufe-website`（Next.js 16.2.2，App Router，Vercel，push main 自動部署）
- 分支：`feat/insights-ghost-admin-api`（從 `origin/main` 開），完成後開 PR 到 `main`。**不得 merge、不得 push main。**
- 參考實作（已上線、已驗證）：`~/tradepilot`
  - 規格：`docs/superpowers/specs/2026-09-11-blog-and-ghost-compatible-admin-api-design.md`（**先讀全文**，§5 合約、§6 陷阱、§8 反面測試全部適用，本工單只寫差異）
  - 程式：`src/lib/security/ghost-auth.ts`、`src/lib/articles/ghost-admin.ts`、`src/lib/articles/sanitize.ts`、`src/lib/articles/repository.ts`、`src/app/ghost/api/admin/posts/**`
  - 測試：`tests/api/ghost-admin.test.ts`、`tests/e2e/ghost-admin-http.test.ts`、`tests/fixtures/nikablog-ghost-publisher.ts`（**原樣複製此 fixture**，它是發文端的真實程式碼）
- ⚠️ 本 repo 的 `AGENTS.md`：Next 16 有破壞性變更，寫 route handler / revalidate / params 前先讀 `node_modules/next/dist/docs/` 對應章節。

## 1. 目的

讓外部工程師用 Ghost Admin API 協定發文，文章出現在 **`https://lufe.world/insights/{slug}`**，
並與既有 13 篇寫死文章（`src/data/articles.ts`）出現在**同一個** `/insights` 列表。

## 2. 與 TradePilot 的差異（本工單的重點）

| # | 項目 | TradePilot | 鹿飛（本工單） |
|---|---|---|---|
| D1 | 文章網址 | `/blog/{slug}` | **`/insights/{slug}`**；回應 `url` = `https://lufe.world/insights/{slug}`（從 `src/lib/site.ts` 的 `SITE_URL` 組，不寫死） |
| D2 | DB | Drizzle + `articles` 表 | **不引入 Drizzle**。用 `postgres`（postgres.js）套件、參數化查詢。表為 **`lufe.articles`**（schema 限定寫法，不依賴 search_path），DDL 與 TradePilot `0009_add_articles.sql` 相同。DDL 放 `docs/sql/2026-09-13-lufe-articles.sql`，**不得在程式或 build 中自動執行**（由維運手動執行） |
| D3 | 環境變數 | `DATABASE_URL` | **`LUFE_DATABASE_URL`**（Supabase pooler，受限帳號，只有 `lufe` schema 的 select/insert/update/delete）、**`GHOST_COMPAT_ADMIN_KEY`**（`id:secret`）。缺任一時：Ghost 端點回 503 JSON；公開頁面照常只顯示寫死文章，不得 500 |
| D4 | 既有寫死文章 | 無 | 保留 `src/data/articles.ts` 不動。**slug 衝突**：POST/PUT 的 slug 與寫死文章相同 → `422` `{errors:[{type:"ValidationError",message:"slug is reserved"}]}`。GET slug 端點對寫死文章回 404（它不在 DB） |
| D5 | 頁面渲染 | ISR | `/insights/[slug]`：`generateStaticParams` **只回寫死文章**；`dynamicParams = true`；DB 文章按需渲染 + ISR。⛔ **DB 文章不得在 build 時預渲染**（原因見 D6） |
| D6 | 字型子集守門 | 無 | `prebuild`/`postbuild` 會掃 `src/` 與 `.next/server/app`，子集外中文字會讓 build 失敗。DB 文章是 runtime 產生，不進 build 產物，所以不會擋 build——**這是依賴 D5 成立**。另外：DB 文章的**標題、摘要、內文**一律套用系統中文字型堆疊（例 `"PingFang TC","Noto Sans TC","Microsoft JhengHei",sans-serif`），避免同一段內子集字與系統字混排。**不得修改 `src/app/fonts/` 與字型守門腳本**，本工單新增的原始碼（含註解、測試字串）若含中文，必須在子集內，否則用英文 |
| D7 | 列表頁 | 獨立 `/blog` | `src/app/insights/page.tsx`（server）讀 DB 已發布文章（try/catch，失敗回 `[]`），與寫死文章合併、依日期新到舊排序，以 props 傳給 client 元件 `InsightsPage`（目前直接 import `articles`，改成吃 props）。`featured` 仍取排序後第一篇 |
| D8 | 欄位對應 | — | DB → 顯示模型：`category` = tags 中第一個屬於 `Category` 聯集的值，否則 `"出海實戰"`；`date` = `published_at` 的台北日期 `YYYY-MM-DD`；`summary` = `meta_description` ?? 內文純文字前 120 字；`readTime` = 內文純文字字數 / 400 無條件進位 + `" 分鐘"`；`color` 依 slug 雜湊輪替 `sky/gold/ember`；圖片 = `feature_image`（外部網址，**用 `<img>` 不用 `next/image`**，避免 remotePatterns），無圖時沿用 `getArticleImage` 的預設邏輯。內文以消毒後 HTML 渲染（寫死文章仍走原本 `content: string[]` 路徑，兩種都要支援） |
| D9 | hreflang / i18n | 有 next-intl，要擋 | 本 repo 無 i18n、無 middleware。確認沒有 middleware 攔截 `/ghost/*`；若將來有，要排除 |
| D10 | 速率限制 | Upstash | 本 repo 無 Redis，**本工單不做**（端點需 JWT，另案處理）。在 PR 描述列為已知缺口 |
| D11 | revalidate | `/blog/*` | 寫入成功後、回應前：`revalidatePath('/insights/{slug}')`、`revalidatePath('/insights')`、`revalidatePath('/sitemap.xml')`；PUT 改 slug 時舊 slug 也要 revalidate |
| D12 | sitemap | — | `src/app/sitemap.ts` 加入 DB 已發布文章（`lastModified` = `updated_at`），DB 段 try/catch 失敗回空，其餘路由照常 |
| D13 | metadata | — | DB 文章頁：`title` = `meta_title ?? title` + ` — 鹿飛 LUFÉ`，`description`，canonical 為 `/insights/{slug}` 自我指向（`canonical_url` 若有值且為 `https://lufe.world` 開頭才採用，否則忽略）；草稿 404 |

## 3. 測試（本 repo 目前沒有測試框架）

- 加 `vitest`（devDependency）與 `npm test` script。不得加其他測試框架。
- 單元：JWT 驗證（對應 TradePilot `tests/lib/ghost-auth.test.ts`）、消毒、欄位對應 D8、slug 保留 D4。
- **HTTP 合約測試（必須真的跑過一次並把輸出貼進 PR 描述）**：
  - 用 Docker 起 `postgres:17`，套 `docs/sql/2026-09-13-lufe-articles.sql`（需先 `create schema lufe`）。
  - `next build && next start`，用複製來的 NikaBlog publisher fixture 真的 `publish()` 兩次（第二次同 slug 走更新），斷言回傳 `publishedUrl` 以 fetch 得 200 且 body 含標題。
  - 以環境變數 gate（例 `LUFE_GHOST_HTTP_TEST=1`），平常 `npm test` 跳過。
- TradePilot §8 的 10 條反面測試全部適用（把 `/blog` 換成 `/insights`；第 4 條「INTERNAL_API_TOKEN 交叉」本 repo 無此 token，改為「錯誤 kid → 401」；第 8 條 locale 不適用，改為「寫死文章 slug 與 DB 文章 slug 各至少一篇」；第 10 條改為「DB 文章頁 canonical 指向自身」）。另加：
  11. POST 寫死文章的 slug → 422，DB 無新列。
  12. `LUFE_DATABASE_URL` 未設時 `/insights` 200 且仍列出 13 篇寫死文章；`/insights/{寫死slug}` 200。
  13. `npm run build` 必須通過（含字型守門）。

## 4. 完成定義

- `npm run build`、`npm test`、`npx tsc --noEmit` 全綠（貼出實際輸出行數與通過數，不得摘要）
- HTTP 合約測試實跑一次，輸出貼 PR
- PR 描述含：變更清單、維運需手動做的事（執行 DDL、設兩個 Vercel 環境變數）、已知缺口 D10
- commit 格式 `feat: ...`；只 commit 本工單相關檔案，`git status --porcelain` 最後必須為空
- 印出 PR 網址

## 5. 不做

- 不改 `src/app/fonts/`、字型守門腳本、hero 元件、`src/lib/site.ts`
- 不刪/不改 `src/data/articles.ts` 的內容
- 不做金鑰管理 UI、圖片上傳端點、DELETE 端點
- 不設 Vercel 環境變數、不連正式資料庫

## 6. 派工前覆核的強制修正（優先於上文，衝突時以本節為準）

F1. **build 時不得連 DB**（否則 `/insights` 列表頁在 Vercel build 預渲染時把 DB 中文寫進 `.next/server/app/insights.html`，字型守門讓部署失敗）。DB 模組在 `process.env.NEXT_PHASE === 'phase-production-build'` 時一律回空、不建立連線——一處同時擋住 `/insights`、`sitemap.ts`、`/insights/[slug]`。`src/app/insights/page.tsx` 與 `src/app/sitemap.ts` 加 `export const revalidate = 300`。PR 描述註明：部署後 DB 文章最多 5 分鐘內或下次發文時出現。

F2. 測試 14（證明 F1）：Docker DB 先插入一篇標題與內文含子集外字（例 `龘`）的已發布文章，設好 `LUFE_DATABASE_URL` 後執行 `npm run build` 必須通過，且 `grep -l 龘 -r .next/server/app` 無結果。輸出貼 PR。

F3. 尾斜線（TradePilot T3）：`next.config.ts` 設 `skipTrailingSlashRedirect: true`，並在 `redirects()` 加入 `{ source: '/:path((?!ghost/).+)/', destination: '/:path', permanent: true }` 保留全站其餘路徑去斜線行為。HTTP 測試斷言：`/insights/` → 308、`/about/` → 308、`/ghost/api/admin/posts/`（無授權）→ 401 JSON。

F4. postgres.js：`postgres(url, { prepare: false, max: 3, ssl: 'require', idle_timeout: 20, connect_timeout: 10 })`，模組層單例（本機 Docker 測試時 ssl 可由環境變數關閉）。寫入 jsonb 的 `tags` 必須用 `sql.json(tags)`。維運說明寫明 pooler 帳號格式 `lufe_app.<project-ref>`。

F5. 列表頁 props 只傳卡片投影 `{slug, category, date, title, summary, readTime, color, image}`（`image` 在 server 算好），不得把 `content`/`html` 傳進 client 元件。`InsightsPage` 與 `ArticleDetail` 的圖片若為 `http(s)` 外部網址，改用 `<img>`（或 `<Image unoptimized>`）。`ArticleDetail` 的內文型別改為聯集：寫死文章 `content: string[]`、DB 文章 `{ html: string }`。

F6. 其他：slug 驗證 `^[a-z0-9]+(?:-[a-z0-9]+)*$` 且長度 ≤ 120，不符 → 422（避免 `revalidatePath` 路徑穿越）；`getPublishedArticleBySlug` 用 React `cache()` 包；vitest 設 `resolve.alias` 對應 `@/`；D13 canonical 前綴判斷用 `SITE_URL`，不寫死網域。
