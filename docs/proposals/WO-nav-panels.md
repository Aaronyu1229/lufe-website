# 工單：導覽列五個下拉面板統一骨架（2026-09-30，Aaron 已同意方向）

你在 `~/dev/lufe-nav`（worktree，分支 `feat/nav-panels-unified`，從 main 開出）。
**規格＝** `docs/proposals/nav-panels-2026-09-30.html`（用瀏覽器開，滑過上方五個選單；下方八張說明卡是規則）。現況截圖 `docs/proposals/nav-panels-before-2026-09-30.png`。

## 只准改
- `src/components/Navbar.tsx`（桌機 mega 面板＋手機選單）
- 必要時 `src/app/globals.css`（只加 nav 面板相關 class）
- `tests/**` 裡與 Navbar 有關的測試（沒有就新增 `tests/components/navbar.test.ts`）
不准動其他檔案、不准改字型檔、不准裝套件。

## 要做
1. 五個面板（服務／進階／案例／洞察／關於我們）共用同一個骨架：`grid-template-columns: 1fr 1fr 320px`；左兩欄清單、右欄精選（淺米色底 `rgba(245,242,236,.7)`、左邊框）。每欄 padding 26px，欄與欄之間 1px 分隔線。面板 `min-height:300px`。
2. 每一個清單項目：標記（28px 寬）＋標題（15px、650）＋一行說明（12.5px、tx3、單行、超出省略）。標記**去背**（沒有外框、沒有底色），顏色一律 `text-gold-d`（#8F6A1F），hover 深一階（#7A5A1A）並右移 1px；標題 hover 變 sky。項目 hover 淡藍底 `rgba(58,107,132,.07)`，`:active scale(.985)`。
   - 服務：品測（指南針）第一個月 · 1～2 萬／寄賣（趨勢線）第三個月 · 5～6 萬／公司落地（大樓）第九個月 · 按案報價／海外客服（耳機）之後的每一天 · 2027 Q1 首批；第二欄「另一條線」北美通路（`US` 文字）Costco、Walmart、Amazon＋「一頁看完」四章總覽 `/services`；右欄深藍卡「出海起手包 7 萬」→ `/services/product-testing`。
   - 進階：運營優化、鹿飛方法論、2 分鐘處境比對 `/assess`；右欄深藍卡「免費初步評估 30 分鐘」→ 打開 MessageBox（沿用現有 `useMessageBox().open`）。
   - 案例：四個案例，標記＝案例的 `num`（6 個月→顯示原 `num` 值，字 13px Inter bold），說明＝產業 · 市場；「看所有案例 →」；右欄可點的產業／市場標籤（連 `/cases`，若 cases 頁支援篩選參數就帶上，否則都連 `/cases`）＋深藍卡「不確定比較像哪一條？」→ `/assess`。**不要**再有點不了的純文字「分類瀏覽」。
   - 洞察：第一欄「按章節找」五個章節（沿用現有 ChapterIcon 與 `?cat=` key，說明＝該章文章數，用 `CHAPTER_ARTICLES` 算）；第二欄「其他內容」補助與活動、現場紀錄、TradePilot 關稅工具 ↗、看所有文章 →；右欄最新文章卡（沿用現有 latestArticle 圖＋標題＋日期分鐘）。
   - 關於我們：01～06 六項（標記＝兩位數字），兩欄各三；右欄創辦人卡：照片 `/images/about/aaron-portrait.jpg`（64px 方形、`object-position center 18%`）＋「Aaron Yu」＋「鹿飛 LUFÉ 創辦人・來自躍馬企業」＋「看了很多年貨櫃出去，決定去接貨到了之後的事。」。**拿掉**「AY」方塊與「42+ 年國際物流實戰」那段舊字。
3. 分組標題（各欄最上面的小字）一律：12px、600、tx3（灰），不用金色。
4. 高度：切換面板時高度用 `src/lib/motion` 的 `useSpring`（response≈0.38、damping 1）從目前高度平順變到新高度，可中途改目標；內容淡入。從觸發選單為原點展開（現有 `megaOrigin` 沿用），離開延遲 120ms 才收。`prefers-reduced-motion` 時直接跳。
5. 手機選單：各群組項目也加同樣的金色去背標記（服務、洞察、關於、案例），說明不用加。
6. 文字只准用上面寫的與規格 HTML 裡的，不准自己寫新說法。

## 驗證（寫進 PR）
`npm ci`；`npx tsc --noEmit`；`npx eslint src`；`npx vitest run --maxWorkers=2`（新增測試：五個面板都在伺服器 HTML、沒有 `rounded-`、關於面板沒有「42+ 年國際物流實戰」與「AY」、案例面板沒有純文字「分類瀏覽」）；建置 `until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（只准 mkdir／rmdir；字型守門擋下就列缺字、不繞過）。

## 交付
commit 結尾 `Co-Authored-By: Codex <noreply@openai.com>`；`git push -u origin feat/nav-panels-unified`；`gh pr create --base main --title "feat: 導覽列五個面板統一骨架"`。**不准合併。**
