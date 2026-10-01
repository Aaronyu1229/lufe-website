# 工單：全站 11 篇文章故事版＋出處收合（2026-10-01，Aaron 拍板「照建議做」）

工作目錄 `~/dev/lufe-rewrite`，分支 `content/rewrite-four-articles`（已併入最新 main，含作者卡）。完成後**更新同一個 PR #72**，不要開新 PR。

## 稿件
本資料夾 11 個 md，每檔 YAML front matter：slug、title、excerpt、category、faq（3 組）、sources（陣列：id、title、publisher、url、note?）、lastVerified；正文 markdown。**文字逐字照稿**，不潤飾、不增刪。

## 實作
1. `src/data/articles.ts`：
   - `Article` 型別加：`sources?: readonly { id: number; title: string; publisher: string; url: string; note?: string }[]`、`lastVerified?: string`（faq、updated 已有）。
   - 11 篇的 title、summary（＝excerpt）、category、content、faq、sources、lastVerified 全部換成稿件內容；`updated: "2026-10-01"`；保留原 date 與 slug（稿件 slug 與現有一致）；readTime 依字數重估（約每分鐘 400 字）。
   - 先刪掉上一輪放進 content 的「出處與查證日期」長網址段落（現在改由 sources 欄位呈現）。
2. 文章頁（`ArticleDetail.tsx`，作者卡已在 main，**不要動作者卡**）：
   - **情境**段落：小標以「情境：」開頭的 h2，給一個淡底（`bg-cream`）＋左側 3px 金線的區塊樣式，讓讀者一眼看出是情境故事。
   - **註腳 [n]**：正文中的 `[1]` `[2]` 轉成上標連結 `<sup><a href="#source-1">1</a></sup>`，可點、可鍵盤操作。
   - **出處區**（放在常見問題之後、作者卡之前）：預設收合，標題一行「出處與查證（N 筆）・最後查證 YYYY-MM-DD」；展開後每筆一行：「[n] 短標題・publisher」，整行是外連（`target="_blank" rel="noopener"`），note 若有以小字顯示在下方；**不顯示原始網址字串**。每筆 `id="source-n"`；點註腳時若出處是收合狀態要自動展開並捲到該筆。內容要在伺服器 HTML 裡（SEO），收合用 `<details>` 或站上 Disclosure 元件皆可。
   - 常見問題：沿用上一輪的 ArticleFaq 與 FAQPage JSON-LD（現在 11 篇都有）。
   - Article JSON-LD：`citation` 放 sources 的 url 陣列；`dateModified`＝updated。
3. 文章列表、相關閱讀等處的標題摘要會跟著新資料變，不另外改版面。

## 驗證
- 測試：11 篇都有 faq(3)、sources(≥1)、情境 h2；正文的每個 `[n]` 都對得到 sources id、反之 sources 每筆至少被引用一次（若稿件有未引用的來源，列在 PR 不要自己刪）；正文不含「待 Aaron」「品測」「http」長網址字串；出處區 HTML 有 `id="source-1"`；FAQPage JSON-LD 存在。
- `npm ci`；`npx tsc --noEmit`；`npx eslint src`；`npx vitest run --maxWorkers=2`。
- 新中文字若擋 build：**不要**自己 font:rebuild，寫在 PR（主控處理）。
- 建置：`until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（只准 mkdir／rmdir）。
- agent-browser 1440／390：截一篇的情境區塊、註腳、出處收合與展開、FAQ；手機 scrollWidth＝視窗寬。截圖放本資料夾 commit。
- 更新 PR #72 描述：11 篇清單、每篇情境小標、出處筆數。
commit 結尾 `Co-Authored-By: Codex <noreply@openai.com>`；push 到同一分支。**不准合併。**
