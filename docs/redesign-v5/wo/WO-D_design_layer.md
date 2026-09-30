# 工單 WO-D：設計層（apple-design）＋全滿大圖＋新照片（v5 第三波）

你在 `~/dev/lufe-v5-d`（git worktree，分支 `v5/d-design`，從 `redesign/v5` 開出；第一、二波都已合進去，全站文字已定稿）。
先讀 `docs/redesign-v5/DECISIONS.md`（特別是 D11～D14、§4、§5）。
**最終樣子**：瀏覽器開 `docs/redesign-v5/prototype/after.html`（各頁 `#home`、`#product-testing`…），逐層對照 `docs/redesign-v5/prototype/compare.html`（左側每一層都寫了「改了什麼」）。原型末段的 CSS／JS（搜尋 `Apple-design pass`、`Full-bleed heroes`、`Hero like live lufe.world`）就是行為規格。

## 原則
- **文字一個字都不准改**（第一、二波已定稿）。這一波只動樣式、結構包裝、互動、圖片。
- 方正直角，不准出現 `rounded-*`（`rounded-full` 圓點除外）（D11）。
- 用站內既有的 `src/lib/motion`（spring、project、rubberband、draggable、useSpring）與 `src/components/ui`（Carousel、Segmented、Disclosure、ExpandCard）。**不准裝新套件**。
- 站內**已經有**的行為不要重做：`MessageBox`（已可拖曳關閉）、`Disclosure`（已是彈簧收合）、`Segmented`（已是滑動方塊）、`Carousel`（已可甩＋停在卡片邊）、Navbar 在深色大圖上透明。只在需要時小幅調整。
- 收合、切換的文字仍必須在伺服器 HTML 裡。
- 每做完下面一大項就 commit 一次（方便審查與退回）。

## 可以改的檔案
`src/app/globals.css`、`src/components/**`、`src/app/**/page.tsx`（只准動版面包裝與圖片，不准改字）、`public/images/v5/**`（新增）、`tests/**`。
**不准動**：`src/data/**` 的文字、`src/app/api/**`、`src/lib/leads/**`、`src/lib/articles/**`、`next.config.ts`、`src/app/fonts/**`、`docs/**`。

## 要做的事（依序）

### 1. 新照片（DECISIONS §4）
- 下載 9 張 Pexels 照片（網址格式見 §4），用 `sharp`（專案已有就用；沒有就用 macOS `sips` + `cwebp`，不准加 npm 套件）轉成 webp，存 `public/images/v5/{頁名}-1600.webp` 與 `-2400.webp`，單張 2400 版控制在 400 KB 內、1600 版 250 KB 內。
- 各頁 hero 背景換成對應照片，`background-position` 照 §4 括號。首頁、服務總覽、關於我們沿用原圖／影片。
- 用 `next/image`（`fill`、`priority`、`sizes="100vw"`）或 `<picture>` 讓手機拿 1600 版。

### 2. 每一頁打開就是一整張圖（D14）
- 所有頁面的第一個 section（首頁、服務總覽、五個方案頁、運營優化、方法論、案例、洞察、關於、聯絡、處境比對、資源、補助、現場紀錄）：`min-height:100svh`（加 `100vh` fallback），內容貼齊下方（`flex-col justify-end`），大圖從頁面最頂端開始，導覽列浮在圖上。
- 首頁已經是這樣，照它的做法統一其他頁。
- 大圖右下角加一顆「往下」按鈕（`aria-label="往下看"`），點了平滑捲到下一個 section（reduced-motion 時直接跳）。首頁不用加（有分頁籤）。
- Navbar：在大圖範圍內透明（頂端一層 `rgba(8,13,24,.5)→0` 的淡漸層讓選單字可讀）；捲過大圖後變深色毛玻璃（`rgba(16,27,48,.72)` + `backdrop-filter: blur(22px) saturate(180%)`），只有底下有內容時才有陰影。把 `pathnameHasDarkHero` 改成涵蓋所有頁面。

### 3. 大圖遮罩：只在文字側（D13）
所有 hero 的深色疊層改成原型 `html[data-scrim="local"]` 那組：
- 桌機：`linear-gradient(90deg, rgba(16,27,48,.86) 0%, rgba(16,27,48,.68) 36%, rgba(16,27,48,.22) 60%, rgba(16,27,48,0) 78%), linear-gradient(0deg, rgba(16,27,48,.6) 0%, rgba(16,27,48,0) 40%)`
- 手機（<768px）：`linear-gradient(0deg, rgba(16,27,48,.9) 0%, rgba(16,27,48,.72) 45%, rgba(16,27,48,.42) 75%, rgba(16,27,48,.2) 100%)`
- 海外客服（夜景）用 `rgba(8,13,24,…)` 同一組數值。
- 大標加 `text-shadow: 0 1px 2px rgba(0,0,0,.35), 0 10px 40px rgba(0,0,0,.35)`；內文 `0 1px 2px rgba(0,0,0,.45)`。
- 原本的 `opacity-[0.3]` 之類把照片整張壓暗的做法要拿掉（照片本身不透明，只靠漸層）。

### 4. 字體（apple-design §15）
`globals.css`：`.display` letter-spacing -0.028em、line-height 1.08；`.h1` -0.022em／1.10；`.h2` -0.016em／1.16；`.h3` -0.008em；小標籤（麵包屑、章節標籤、數字說明）+0.02em。各頁用 `font-sans text-[clamp(...)]` 自己寫大標的，也要套同樣字距。

### 5. 按下就回饋、滑過浮起（§1）
- 按鈕 `:active { transform: scale(.97) }`（100ms）；金色主按鈕加 `box-shadow: 0 1px 0 rgba(255,255,255,.35) inset, 0 8px 20px -10px rgba(212,168,92,.8)`。
- 卡片類（四章卡、文章卡、個案卡、三條路、下一章卡、五問卡、團隊／網絡卡、五段卡點卡）：`@media (hover:hover)` 滑過 `translateY(-3px)` + 柔影；`:active scale(.985)`。用 spring 曲線 `cubic-bezier(.22,1,.36,1)`。
- 服務總覽四章列表：滑過淡金底、右移 10px。
- `:focus-visible` 金色外框 2px、offset 3px。

### 6. 材質（§12）
- 桌機下拉面板：淺色毛玻璃（`rgba(255,255,255,.78)` + blur 26px），從觸發點長出（`transform-origin` 對準觸發的選單項、縮放 .96→1 ＋去模糊），離開延遲 120ms 才收。已有 `megaOrigin` 就沿用。
- 章節列（`ChapterBar`）：淺色毛玻璃、sticky、貼頂才有陰影；走過的章節連線填金色（由左往右填滿的動畫）、目前節點放大。改成原型的「點＋連線」樣式（原型 `.chapbar`），手機可左右滑。
- 手機底部浮動列：深色毛玻璃，左邊「第一次談不收費」、右邊「聊聊你的產品 →」（打開 MessageBox），捲過首屏才浮上來；只在 <768px 出現。

### 7. 頁面專屬互動
- 首頁四章時間軸：隨捲動填金色（走到哪一章亮哪一點）；點月份捲到那張卡並閃一下金框。
- 品測「你會拿到一頁」報告示意：跟著滑鼠傾斜（spring，離開時 damping .8 回正）。
- 方法論評分例子：五條分數條進入畫面時由左長出（依序 90ms）。
- 洞察：切換章節後文章卡依序淡入（35ms 錯開）。
- 進入畫面淡入上浮（section 標題、卡片群組，60ms 錯開），用 IntersectionObserver；**伺服器 HTML 裡內容必須可見**（沒有 JS 也看得到），動畫只在 JS 載入後加上 class 才生效。

### 8. 無障礙（§14）
`prefers-reduced-motion: reduce`：所有位移動畫改成無或淡入、時間軸直接填滿；`prefers-reduced-transparency: reduce`：毛玻璃改實色；`prefers-contrast: more`：毛玻璃改實色＋明確邊框。

## 驗證（全部要做，數字寫進 PR）
1. `npm ci`；`npx tsc --noEmit`；`npx eslint src`。
2. `npx vitest run --maxWorkers=2`（既有全部要綠；新增：hero 有 `min-h` 與照片、沒有 `rounded-`、reduced-motion 樣式存在）。
3. 建置：`until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（**只准 mkdir／rmdir**）。你不改字，字型守門應該會過；若沒過，列缺字、不要繞過。
4. `next start` 後用 agent-browser 在 1440×900 與 390×844 截每頁首屏，確認：大圖佔滿一屏、導覽列浮在圖上、文字可讀、沒有橫向捲動（`document.documentElement.scrollWidth` 必須等於視窗寬）。截圖不要提交。
5. 做完跑 `agent-browser close`，關掉你自己開的 `next start`。
6. `git status` 乾淨、推上去。

## 交付
- commit 結尾 `Co-Authored-By: Codex <noreply@openai.com>`。
- `git push -u origin v5/d-design`；`gh pr create --base redesign/v5 --title "v5 D：設計層＋全滿大圖＋新照片"`，body 列：每一大項做了什麼、照片檔案大小表、測試數字、兩種寬度的檢查結果、疑問。
- **不准合併、不准碰 main。**
