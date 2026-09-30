# 工單：全站左邊界統一（2026-09-30，Aaron 選方案 B）

你在 `~/dev/lufe-grid`（worktree，分支 `feat/site-grid-alignment`，從 main 開出）。
參考圖：`docs/proposals/grid/hero-alignment-before-after-2026-09-30.png`（金線＝導覽列 logo 左緣；上＝現況，下＝首頁大圖修正後的樣子）。

## 問題（實測 1920 寬）
導覽列內容是 `max-w-[1200px]`＋`px-10`，logo 左緣在 400px；但首頁大圖文字在 324、品測頁 410、關於我們 360／431、頁尾 360。各區塊用了 1100／1200／1400／900 等不同容器，左邊界不在同一條線上。首頁大圖按鈕離底部分頁籤只有 52px。

## 規則（一條線）
1. 新增一個全站容器工具（例如 `globals.css` 的 `.lufe-container`，或一個 `Container` 元件）：`max-width:1200px; margin-inline:auto; padding-inline:20px`，`md` 以上 `padding-inline:40px`——**與導覽列完全相同**。導覽列也改用它（數值不變）。
2. 每一頁的大圖（hero）、每一個 section 的外層、頁尾，都改用這個容器，讓「靠左對齊的內容」左緣＝導覽列 logo 左緣。
3. 內容本來就比較窄的（閱讀欄 max-w-[720px]、[900px] 等）：
   - 若該區塊是**靠左排**：窄欄放在容器裡、靠左，不置中（左緣對齊那條線）。
   - 若該區塊本來就是**置中排版**（整段 text-center 的標題＋引言、CTA 區）：維持置中，不用對齊左緣。
   - 不確定屬於哪一種的，列在 PR 裡讓主控判斷，不要自己猜。
4. 首頁大圖：文字區改用容器；把整塊文字往上抬，讓按鈕底部到分頁籤頂端的距離約 140px（1440×900 與 1920×1000 都要），分頁籤列也用同一個容器。其他頁大圖只對齊左緣、底部距離維持現狀。
5. **不改任何文字、字級、顏色、圖片、動畫**；方正直角；不裝套件。手機（<768px）左右內距一律 20px。

## 只准改
`src/app/globals.css`、`src/components/**`、`src/app/**/page.tsx`（只准改外層容器 class）、`tests/**`。不准動 `src/data/**`、`src/lib/**`、`src/app/api/**`、`src/app/fonts/**`、`docs/**`。

## 驗證（寫進 PR，附表格）
1. `npm ci`；`npx tsc --noEmit`；`npx eslint src`；`npx vitest run --maxWorkers=2`。
2. 建置：`until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（只准 mkdir／rmdir）。
3. `next start` 後寫一支 agent-browser 量測腳本（不提交），在 1920×1000、1440×900、390×844 三種寬度，對這些頁：`/`、`/services`、`/services/product-testing`、`/services/consignment`、`/services/localization`、`/services/call-center`、`/services/north-america`、`/services/optimize`、`/services/methodology`、`/cases`、`/cases/costco-health`、`/insights`、`/insights/go-no-go-framework`、`/about`、`/contact`、`/assess`、`/resources`、`/field-notes`：
   - 記錄 logo 左緣、大圖 h1/h2 左緣、每個 section 第一個靠左標題的左緣、頁尾 logo 左緣。
   - 靠左的都要等於 logo 左緣（±2px）；置中的標記「置中」。
   - 首頁大圖三張輪播各量一次「按鈕底→分頁籤頂」距離。
   - `document.documentElement.scrollWidth` 必須等於視窗寬。
   把結果表格貼進 PR。
4. 做完 `agent-browser close`、關掉 next start。

## 交付
commit 結尾 `Co-Authored-By: Codex <noreply@openai.com>`；`git push -u origin feat/site-grid-alignment`；`gh pr create --base main --title "fix: 全站左邊界統一"`。**不准合併。**
