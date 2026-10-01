# 鹿飛部落格自動駕駛 RUNBOOK

授權：Aaron 2026-10-01「把頻率一次拉到一週三篇……我之後不管，我需要你自行修正處理」。範圍只限 lufe.world `/insights` 文章。付費、刪資料、其他網站一律不在範圍內。

節奏：每週二、四、六 09:00（+08:00）各 1 篇。文章用 `publishAt` 排程，ISR 自動出現。
執行者：本機 launchd 觸發 headless Claude（`~/dev/lufe-autopilot/run.sh weekly|monthly`）。

---

## 每週任務（週日 20:00）

目標：把**下週二、四、六**三個時段填滿，合併進 main。

1. **準備**
   - `cd ~/dev/lufe-website && git fetch -q origin`
   - 建 worktree：`git worktree add ~/dev/lufe-auto-<YYYYMMDD> -b content/auto-<YYYYMMDD> origin/main`，之後所有動作都在這個 worktree。
   - `npm ci`
   - `node scripts/blog-schedule.mjs --json` 取得下 3 個空檔。若空檔都已被佔用（已有排程文章），本週不產文，直接到第 9 步寫紀錄。
2. **檢查上週**：對已過 publishAt 的文章，`curl -s -o /dev/null -w "%{http_code}" https://lufe.world/insights/<slug>` 必須 200；sitemap 要含該網址。不對就記到 LOG 的「異常」。
3. **選題**：先抓 `https://jumping.group/sitemap.xml` 的 `/insights/` 清單——躍馬官網（同一位老闆）已寫或屬於物流／報關／關稅本業的題目，鹿飛**不寫**，改在相關文章裡連到躍馬那篇。然後從 `docs/blog-autopilot/QUEUE.md` 的「自動產線」區，由上往下取 3 個未勾選題目。「訪談佇列」的題目**不准自動寫**。
4. **研究**（每題）
   - DataForSEO 查主攻字與 3～5 個變體的台灣月搜尋量（帳密：`security find-generic-password -s dataforseo-api -w`，帳號 aaron.yu@reborn.in；端點 `keywords_data/google_ads/search_volume/live`，`location_code: 2158`、`language_name: "Chinese (Traditional)"`）。選量最大且符合意圖的當主攻字。
   - 查該主攻字的 Google 首頁（`serp/google/organic/live/advanced`，台灣、`language_code: "zh-TW"`），看前 5 名在寫什麼，找出**他們沒寫的**（資訊增益）。
   - 事實一律查官方或權威來源（政府、法規原文、平台官方說明、國際組織）。查不到就不寫。
   - 單次花費上限：每週 US$1；餘額低於 US$5 時停用 DataForSEO 並記在 LOG。
5. **寫作**（照現有 13 篇的格式與 `src/data/articles.ts` 的欄位）
   - 骨架：先說答案（≤60 字，第一句自然帶主攻字）→「情境：……」（200～350 字，明確是情境）→ 判斷步驟／比較表 → 什麼情況不建議 → 常見問題 3 題（至少一題用搜尋者原句）→ 一個最小下一步（市場探查 1～2 萬做完可以停，或 LINE 問一句）。
   - 新文章加在 `src/data/articles.ts` 的 `articles` 陣列**尾端**（測試會取 `articles[0]` 當已發布文章；列表依日期排序）。只連結已發布、或 publishAt 早於本篇的文章。
   - 正文 1,400～2,200 字；sources 陣列＋內文 [n] 註腳；`lastVerified` 當天；`date` 與 `publishAt` 用分配到的時段；作者同其他文章。
   - 封面圖：用 `public/images/**` 已有 WebP 分級、且**沒被其他文章用過**的圖；沒有合適的才用 free-assets（Pexels／Pixabay，可商用）下載，跑 `npm run images:build`。
   - 文中適當連到相關服務頁與 1～2 篇既有文章；在相關的既有文章「延伸閱讀」加回連（`src/data/chapters.ts`）。
6. **鐵律檢查（任何一條不過就不發這篇）**
   - 不得出現捏造經驗：`grep -nE "我們的客戶|某品牌|我們服務過|我們陪跑過|有一位客戶|去年我們"` 必須為 0。
   - 不得出現：「保證」「人口紅利」「黃金十年」「品測」。
   - 每個 [n] 都有對應 source；每個 source 至少被引用一次。
   - 數字必須有出處（方案公開價除外：市場探查 1～2 萬、寄賣包 5～6 萬、起手包 7 萬）。
   - 不碰法律意見的結論；涉及合約、勞動、商標時文末加「經驗與實務整理，非法律意見」。
7. **建置驗證**
   - `npm run font:rebuild`（新中文字）、`npx tsc --noEmit`、`npx eslint src`、`npx vitest run --maxWorkers=2`。
   - 建置：`until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（只准 mkdir／rmdir）。
   - 守門寫法：`if <檢查>; then <下一步>; fi`，不准用 `&&` 串在 grep 後面。
8. **上線**
   - commit（結尾 `Co-Authored-By: Claude Opus 5.5 <noreply@anthropic.com>`）、push、`gh pr create --base main`（標題「content: 自動排程 <日期> 三篇」，描述列出 3 篇標題、主攻字與月量、publishAt、來源數）。
   - 等 Vercel 檢查 pass（`gh pr checks <n>`，最多等 15 分鐘）後 `gh pr merge <n> --merge`。
   - 合併後確認：未到 publishAt 的文章在正式站要 404（還沒發布是對的）。
   - 在 QUEUE.md 勾選完成的題目（同一個 PR 內處理）。
9. **紀錄**：在 `docs/blog-autopilot/LOG.md` 最上面加一段（同一個 PR 內）：日期、3 篇 slug＋publishAt、花費、異常。若流程中途失敗、無法合併：不要硬上，把失敗原因寫成一個新檔 `~/Nika/Handoff/queue/鹿飛部落格自動駕駛 失敗 <YYYY-MM-DD>.md`（Aaron 的 Obsidian 交接區）與 `~/dev/lufe-autopilot/LAST_FAILURE.md`，worktree 保留。
10. **清理**：成功合併後 `git worktree remove` 該 worktree。

## 每月任務（每月 1 號 10:00）

1. DataForSEO：對所有已發布文章的主攻字查台灣 SERP（前 30 名），記下 lufe.world 的名次。
2. 若 Google Search Console 有權限（`docs/blog-autopilot/` 內若有 GSC 說明再用），抓上月曝光／點擊；沒有就跳過並註明。
3. 依結果補 QUEUE：
   - 排名 11～30 名的文章 → 列為「本月更新」：補一節搜尋者在問、我們沒寫的內容（看 SERP 的「其他人也問了」），更新 `updated` 與 `lastVerified`。每月最多更新 3 篇，併入當月第一個週日任務。
   - 用 DataForSEO `keywords_for_keywords` 找 5 個新題目（月量 ≥ 50、和鹿飛／躍馬專業相關、不是旅遊或消費者購物意圖），加到自動產線尾端。
4. 報告寫到 `docs/blog-autopilot/reports/<YYYY-MM>.md`（繁體中文、白話，給 Aaron 看：發了幾篇、哪些字進前 30、下月計畫、花費），開 PR 合併；同時把摘要（5 行內）寫成新檔 `~/Nika/Handoff/queue/鹿飛部落格月報 <YYYY-MM>.md`。

## 不做的事
- 不改網站版面、元件、樣式（只動 `articles.ts`、`chapters.ts`、字型子集、圖片與 `docs/blog-autopilot/`）。
- 不寫「訪談佇列」的題目。
- 不刪任何既有文章或網址。
- 不開任何付費服務。
