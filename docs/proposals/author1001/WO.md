# 工單：Aaron 作者頁＋文章作者卡（2026-10-01）

工作目錄 `~/dev/lufe-author`，分支 `feat/author-page`（從 main）。依據：`docs/proposals/blog-plan-2026-09-30.html`「作者與網站外」「每篇文章的骨架：作者卡」。

## 素材
- 新照片已放好：`public/images/about/aaron-portrait-studio.jpg`（2400px 長邊，原始形象照 X1_00309）。跑 `npm run images:build` 產 WebP 分級並 commit。現有 `aaron-portrait.jpg` 的引用（Navbar、AboutPage）改用新照片的分級版（構圖一樣，只是更清晰）。
- 文字**只能用網站上已經存在的句子**（`src/components/about/AboutPage.tsx`、`src/components/seo/StructuredData.tsx` 的 Person 描述），不准新寫經歷、頭銜、年份。可用的例子：「鹿飛 LUFÉ 創辦人・來自躍馬企業」「看了很多年貨櫃出去，決定去接貨到了之後的事。」、躍馬企業 42 年／500+ 出口案件／30+ 國家。
- LinkedIn：https://www.linkedin.com/in/wibp/

## 1. 作者頁 `/about/aaron-yu`
- 版型沿用全站：深色大圖 hero（可用照片當右側人像或背景，照 `HeroBackdrop`／`.lufe-hero` 慣例，左緣對齊 `.lufe-container`）→ 簡介（上述既有句子）→ LinkedIn 連結（新視窗、`rel="me noopener"`）→「Aaron 寫的文章」列表（從 `src/data/articles.ts` 讀所有文章，沿用洞察頁的卡片元件）。
- metadata 用 `createPageMetadata`；麵包屑：首頁 / 關於我們 / Aaron Yu。
- JSON-LD：`ProfilePage`，`mainEntity` 指向既有 Person `@id`（`https://lufe.world/#aaron-yu`）；Person 節點加 `url: https://lufe.world/about/aaron-yu`、`image`（新照片 1080 webp 的絕對網址）。
- 加進 `sitemap.ts`。關於我們頁創辦人區塊加一個「看 Aaron 的文章 →」連到此頁。

## 2. 文章作者卡（`src/components/insights/ArticleDetail.tsx`）
- 文章頂部標題下方：小頭像（32px，`rounded-full` 可用）＋「Aaron Yu・鹿飛 LUFÉ 創辦人」＋發布／最後更新日期（用 articles.ts 既有日期欄位；沒有更新日就只顯示發布日）。名字連到 `/about/aaron-yu`。
- 文章結尾：作者卡（照片 96px、名字、「鹿飛 LUFÉ 創辦人・來自躍馬企業」、既有那句簡介、LinkedIn、「看更多 Aaron 的文章 →」）。
- Article JSON-LD 的 author 加 `url` 指向作者頁。

## 規則
方正直角（頭像可 `rounded-full`）；不裝套件；不改其他文案；中文新字若擋 build 不要自己 font:rebuild，寫在 PR 裡。

## 驗證
`npm ci`；`npx tsc --noEmit`；`npx eslint src`；`npx vitest run --maxWorkers=2`（新增測試：作者頁 JSON-LD 為 ProfilePage 且 mainEntity @id 正確、文章頁含作者卡與作者頁連結、sitemap 含 /about/aaron-yu）；建置 `until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（只准 mkdir／rmdir）。agent-browser 1440／390 截作者頁與一篇文章頂部＋結尾，放 `docs/proposals/author1001/` commit；手機 scrollWidth = 視窗寬。
commit 結尾 `Co-Authored-By: Codex <noreply@openai.com>`；`git push -u origin feat/author-page`；`gh pr create --base main --title "feat: Aaron 作者頁與文章作者卡"`。**不准合併。**
