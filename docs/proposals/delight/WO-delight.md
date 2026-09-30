# 工單：體驗層與小巧思（v6，2026-09-30，Aaron 已全部同意，簽名除外）

你在 `~/dev/lufe-delight`（worktree，分支 `feat/delight-layer`，從 main 開出）。
**規格＝** `docs/proposals/delight/delight-after-2026-09-30.html`（最終樣子，可操作）與 `delight-compare-2026-09-30.html`（逐頁逐層寫了每個巧思；左上「巧思總表」是全清單）。原型末段 `v6 delight layer` 的 CSS／JS 就是行為規格。原型是靜態頁模擬，實作要對到網站真正的元件。

## 原則
- 網站既有文字一字不改。只准新增下面列出的新字：「接到第三個月 →」「你只花了這一筆」、海外客服示意信件（`📩 新郵件`、`週五 23:04`、`Where is my refund?`、`I returned the order two weeks ago and haven't heard back…`、`已由菲律賓客服回覆 · 23:09`、角標 `示意`）、評分卡的「拖拖看 · 加權總分」與既有分數區間文字、回頂鈕 aria-label「回到頂端」。
- **不做創辦人簽名**（等 Aaron 本人簽名檔）。
- 方正直角；不准裝套件；動畫只動 transform／opacity（視差、進度線除外用 transform）；用 `src/lib/motion`。
- 全部要有 `prefers-reduced-motion: reduce` 版本：數字直接顯示最終值、金光不掃、照片不動、信件直接顯示已回覆狀態。
- 伺服器 HTML 裡內容必須完整可見（數字的最終值要在 HTML 裡，數到位只是 JS 載入後的動畫；評分卡預設值 74 與 Conditional Go 要在 HTML 裡）。
- 所有 scroll 監聽用 passive＋rAF 節流；IntersectionObserver 只觸發一次的就 unobserve。

## 要做（對照 compare 頁的巧思總表）
1. 全站：金色閱讀進度線（長頁面、導覽列下方）；「→」滑過前推 4px；文字連結（看所有…、下一章等）滑過畫底線；h2 金色重點字的底線掃入；數字數到位（hero 數字列、躍馬三數字、關於三數字、洞察數字列、個案卡大數字、方法論例子總分）；右下角回到頂端（捲過 1.5 屏出現、手機避開底部浮動列）；深色 CTA 區跟滑鼠的柔光。
2. 有照片的 hero（首頁影片除外）：照片落定（1.08→1、1.6s、一次）＋慢速視差（85%）。
3. 首頁：滑過四章卡 → 時間軸對應月份亮起；比較表「鹿飛」列進場掃一次金光、其他列 hover 淺底。
4. 服務總覽：四章列表 hover 從右浮出價格 chip（用 `src/data/chapters.ts` 既有的價格欄位，不要硬寫）。
5. 品測：步驟線隨捲動畫出、走過的編號外圈亮；價格卡兩條路 hover 出現「接到第三個月 →」「你只花了這一筆」。其他方案頁的四步（海外客服、北美）也套步驟線。
6. 寄賣：「我們這一軌」週次隨捲動逐列亮起、未到的淡；最後一列「證下來那天」出現時掃一次金光。
7. 公司落地：兩欄表 hover 淺底＋「誰在當地」欄的金色圖釘站起。
8. 海外客服：hero 右下（手機在上方不擋標題）示意信件：0.9s 滑入、3.2s 打勾變已回覆；只播一次；`aria-hidden="true"`。
9. 方法論：「分數怎麼讀」下方互動評分卡：五條 range（Market 20、Barrier 20、Competition 20、Profitability 25、Regulatory 15），預設 82/62/71/78/80，總分 `Math.floor` 加權（預設＝74），即時更新；對應的分數區間卡浮起、其他淡；<60 補「我們自己的規矩：不到 60 分，我們不接。」（網站既有句）。range 要可鍵盤操作、有 aria-label。
10. 案例：個案照片 hover 推近 1.05；大數字數到位。洞察：文章封面 hover 推近 1.04；章節分段按鈕帶文章數（真實數量，用現有資料計算）。
11. 關於我們：四條信念捲到哪條、編號從空心變實心。
12. 換頁淡入：先讀 `node_modules/next/dist/docs/` 確認這版 Next 有沒有穩定的 View Transitions 支援；有就開、沒有就**不做**並在 PR 說明（不准用 hack）。

## 只准改
`src/app/globals.css`、`src/components/**`、`src/app/**/page.tsx`（只准包裝與掛元件，不改字）、`tests/**`、必要時 `next.config.ts` 只為第 12 點。不准動 `src/data/**` 文字、`src/app/api/**`、`src/lib/leads/**`、`src/lib/articles/**`、`src/app/fonts/**`。

## 驗證（寫進 PR）
`npm ci`；`npx tsc --noEmit`；`npx eslint src`；`npx vitest run --maxWorkers=2`（新增：評分卡預設 74／Conditional Go 在伺服器 HTML、數字最終值在 HTML、reduced-motion 樣式存在、沒有 `rounded-`）；建置 `until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（只准 mkdir／rmdir；字型守門擋下就列缺字、不繞過）；`next start` 後 agent-browser 1440／390 逐頁確認無橫向捲動、無 console error；做完 `agent-browser close`、關掉自己的 next start。

## 交付
commit 結尾 `Co-Authored-By: Codex <noreply@openai.com>`；`git push -u origin feat/delight-layer`；`gh pr create --base main --title "feat: 體驗層與小巧思"`。**不准合併。**
