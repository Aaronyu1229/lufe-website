# 工單：Aaron 2026-09-30 晚間回饋（五件）

工作目錄 `~/dev/lufe-fb`，分支 `fix/home-feedback-0930`（從 main）。截圖在本資料夾。
另一張 PR（feat/site-grid-alignment）正在改全站容器寬度與左右內距——**本工單不准動任何容器的 max-w／px／padding**，避免衝突。

## 1. 首頁一打開導覽列是白色玻璃版，要往下捲才變回透明（截圖 1）
根因已查到：`curl https://lufe.world/` 的伺服器 HTML 裡導覽列 class 是 `lufe-glass-light text-tx`，其他頁都是 `navbar-over-hero`。首頁預先渲染時 `usePathname()` 拿到的不是 `"/"`（可能是 null／""／"/index"），`pathnameHasDarkHero` 判成 false；要等 JS 載入後才修正。
修法：`src/components/Navbar.tsx` 把 pathname 正規化（null、""、"/index" 一律視為 "/"），讓首頁伺服器 HTML 就輸出 `navbar-over-hero`。
加測試：`npm run build` 後的 `.next/server/app/index.html`（或等效方式）導覽列 class 含 `navbar-over-hero`；或對 `pathnameHasDarkHero` 做單元測試涵蓋 ""／"/index"。**驗收一定要用 build 後的 HTML 驗**，不能只測函式。

## 2. 首頁四章時間軸那條金線，不會跟著滑鼠走（截圖 2，`src/components/home/PositioningBand.tsx`）
現在金線只跟捲動走。要改成：滑鼠移到某張章節卡片、或移到時間軸上某個點時，金線用彈簧感的轉場（沿用 `--ease-spring`，約 .45s）延伸／縮回到那一點，該點與之前的點都亮起；滑鼠離開後回到捲動進度。金線寬度 = index/(章節數-1) × 75%。
`prefers-reduced-motion` 時不做轉場，直接跳到位置。手機版時間軸本來就隱藏，不用管。

## 3. 「品測」全站改為「市場探查」
- 範圍：`src/**` 所有畫面文字、metadata title/description、導覽選單、頁尾、JSON-LD、麵包屑、測試裡的期待字串。含「品測費」「品測包」「看品測怎麼做」等複合詞，一律把「品測」換成「市場探查」，讀起來不通順的逐一列在 PR 裡讓主控決定（不要自己改寫句子）。
- **網址 `/services/product-testing` 不改**（已被搜尋引擎收錄）。
- `docs/**` 不要動（主控會自己處理文件）。
- 改完如果字型守門擋 build（新中文字），**不要**自己跑 `font:rebuild`，在 PR 裡寫出來，主控會處理。

## 4. 首頁「我們不是跟你賭夢想，」→「我們不是跟你賭市場，」
包含 `CasesSection.tsx`、`CasesPage.tsx`、`AboutPage.tsx` 所有出現處。

## 5. 首頁「一個窗口，一條進度線」下方那張比較表，設計感怪（截圖 3，`src/components/home/WhySection.tsx`）
現況問題：表頭奶油色底在右邊露出一塊白色空格、三欄擠在中間右側空一大片、● 和 — 太小太灰，鹿飛那一列不夠突出。
改法（照 apple-design 精神：清楚層級、對齊、無多餘裝飾、方正直角）：
- 表格填滿容器，第一欄約 40%，三欄等寬置中；表頭和表身同色（白底），表頭只用細底線＋`text-tx3` 小字，不要奶油底。
- 涵蓋＝16px 金色（`text-gold-d`）打勾 SVG（方頭線條、stroke 2），不涵蓋＝淡灰短橫線（`text-tx3`/50%）。
- 鹿飛那一列：左側 3px 金色實線＋極淡金底（現有 `bg-gold/10` 可保留），文字 `font-semibold`。
- 列高一致（py-5），手機可橫向捲動但只捲表格本身（`scrollWidth` 不能撐寬頁面）。
- 保留每格的 aria-label。檢查 DelightLayer 有沒有在這張表插入額外元素造成白塊，有的話修掉根因。

## 通用
不裝套件；不准 `rounded-*`（除 `rounded-full`）；不改其他文字。
驗證：`npm ci`；`npx tsc --noEmit`；`npx eslint src`；`npx vitest run --maxWorkers=2`；
建置用 `until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（只准 mkdir／rmdir）。
`next start` 後用 agent-browser 在 1440 與 390 截首頁：一開頁導覽列、時間軸 hover 第三張卡時、比較表；截圖放 `docs/proposals/fb0930/after-*.png` 一起 commit。
commit 結尾 `Co-Authored-By: Codex <noreply@openai.com>`；`git push -u origin fix/home-feedback-0930`；`gh pr create --base main --title "fix: 首頁回饋五件（導覽列初始色、時間軸跟滑鼠、市場探查、比較表）"`。**不准合併。**
