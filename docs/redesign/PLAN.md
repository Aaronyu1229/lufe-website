# LUFÉ 方正版改版計畫

- 設計來源：draft PR #38 的 `docs/proposals/lufe-square-site/`（逐頁定案的 HTML 提案）。決定紀錄複製在 `docs/redesign/DECISIONS.md`。
- 分支：所有階段 PR 都合進整合分支 `redesign/square`；全部完成、Aaron 在預覽站確認後，才由 `redesign/square` 開 PR 合進 `main`。改版期間正式站完全不動。
- 每一階段：Codex 實作（feature 分支 → PR 進 `redesign/square`）→ Claude 審 diff、跑 tsc／lint／test／build → 預覽站截圖與提案逐頁並排比對 → 合進整合分支。

## 硬規則（每階段都適用）
1. **內容照正式站原始碼一字不改**（標題、段落、數字、按鈕文字、連結目標）。提案只改呈現與互動。
2. **SEO**：所有收合、分頁、浮動面板、切換的內容，文字都必須在伺服器輸出的 HTML 裡（隱藏可以，點了才產生不行）。
3. **首頁 Hero 行為不變**（淡入淡出、10 秒輪播、整排分佈條、滑過切換）。
4. 方角：不得出現圓角（小圓點例外）。
5. 動作：一律由 `src/lib/motion` 的彈簧（damping ratio＋response）驅動，可中途打斷、從目前位置出發；尊重 `prefers-reduced-motion`／`prefers-reduced-transparency`／`prefers-contrast`。
6. 不做：捲動淡入、數字跳動、自動彈窗、裝飾性循環動畫。
7. 中文字型子集守門：`npm run build` 失敗時跑 `npm run font:rebuild` 並一起提交 `src/app/fonts/`。
8. 390 寬手機不得橫向捲動；每頁 console 無錯誤。

## 階段
1. 基礎＋全站外框：動畫引擎、字體排版 token、導覽列（毛玻璃＋下拉 C＋手機選單 C，移除頂端工具列）、頁尾（B＋補回正式站內容）、「聊聊你的產品」底部面板、移除右下角補助小卡。
2. 首頁
3. 服務總覽、方法論、進階優化、4 個階段頁
4. 案例列表、案例詳情
5. 洞察、文章、現場紀錄（單則獨立頁先不上線，內容仍是待補）
6. 關於、聯絡、處境比對、補助、資源
