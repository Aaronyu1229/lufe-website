# 工單：首頁手機版 PageSpeed 提升（2026-10-01）

工作目錄 `~/dev/lufe-perf`，分支 `perf/mobile-lcp`（從 main）。

## 現況（Lighthouse 12、手機模擬、正式站 lufe.world）
效能 81／無障礙 96／最佳做法 100／SEO 100。桌機效能 98。
- LCP 5.2s，LCP 元素是首頁大圖的 `<h2 class="display">`，其中 render delay 4.5s。
- **已實驗證明根因**：用 `--blocked-url-patterns="*.woff2"` 擋掉字型，效能 81→97、LCP 5.2→2.6s。Lighthouse／PSI 跑在 Linux，沒有中文系統字，標題要等 416KB 的 `NotoSansTC-subset.woff2` 下載完才算完成繪製。
- 同時首頁一開就下載：首張影片 hero-portrait-720.mp4（1.2MB）、下一張影片 hero-map-planning-720.mp4（434KB）、第三張海報，跟字型搶頻寬。
- 無障礙：`text-gold-d`（#8F6A1F）在奶油底對比 4.42／4.44，不到 4.5；導覽列 logo 圖 `alt="鹿飛 LUFÉ"` 跟旁邊文字重複（image-redundant-alt）。

## 要做的
### 1. 中文字型拆成「首屏小檔＋其餘大檔」（主要收益）
- 改 `scripts/build-font-subset.py`（與 `scripts/build-font-subset.md` 說明）：除了現有全站字集，另產出 `NotoSansTC-critical.woff2`，只含「首頁第一個畫面」會出現的字：導覽列（含選單面板標題）、首頁大圖三張輪播的標題／副標／按鈕／分頁籤、`聊聊你的產品`、手機底部 CTA 文字。字集請從原始碼自動抽（例如抽 `HeroSection.tsx` 的 HOME_HERO_SLIDES 與 `Navbar.tsx` 的中文），不要手抄。全站檔維持現狀（含全部字）。
- `src/app/layout.tsx`：用兩個 `localFont`：critical（`preload: true`）與全站（`preload: false`），兩者 `display: "swap"`、`weight: "100 900"`、`adjustFontFallback: false`。CSS 的字型堆疊改為 critical 在前、全站在後、再接現有 fallback（PingFang TC…）。檢查 `globals.css` 所有用到 `--font-noto-sans-tc` 的地方都跟著改。
- `scripts/check-font-subset.mjs`：守門邏輯改為「全站檔涵蓋所有字」（維持現行），另加「critical 檔涵蓋首頁大圖與導覽列的字」檢查；新增中文字時仍然只要跑 `npm run font:rebuild`。
- critical 檔目標 < 60KB。PR 裡寫出兩個檔案的大小與字數。

### 2. 首頁大圖影片晚一點才下載（`src/components/home/HeroSection.tsx`）
- 首張影片不要在伺服器 HTML 就掛上；改成 `window` 的 `load` 事件之後（已經 load 就立即）再掛上，海報圖先撐著畫面。注意檔案裡 PR #4／#5 的註解（掛載競態、rotationKey），不要破壞那些行為。
- 下一張的預熱（warm up），改成在「目前這張影片 canplay 之後」才做，不要 hydration 一完成就掛。
- 非當前張的海報 `<img>` 加 `loading="lazy"` 與 `fetchPriority="low"`；第一張海報加 `fetchPriority="high"`。
- reduced-motion 行為不變（不下載影片）。

### 3. 無障礙兩項
- `--color-gold-d` 由 `#8F6A1F` 改為 `#87641C`（實算：奶油底 #f5f2ec 4.86、#f9f2e7 4.88、白 5.43）。全站只改這一個 token，不要逐處改 class。
- 導覽列 logo 的 `<img>` 旁邊已有文字「鹿飛 LUFÉ」，把 img 改成 `alt=""`（裝飾）；連結本身的可讀名稱要保留（檢查 a 的 accessible name 仍是「鹿飛 LUFÉ」或有 aria-label）。頁尾若有同樣狀況一併處理。

## 不要做
不改文案、版面、顏色（除了 gold-d token）、動畫；不裝套件；不動 `docs/redesign-v5/**`。

## 驗證（寫進 PR，附數字）
1. `npm ci`；`npx tsc --noEmit`；`npx eslint src`；`npx vitest run --maxWorkers=2`。
2. `npm run font:rebuild` 後建置：`until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（只准 mkdir／rmdir）。
3. `next start -p 3120` 後跑 `npx -y lighthouse@12 http://localhost:3120/ --chrome-flags="--headless=new"`（手機預設）與 `--preset=desktop` 各 3 次，貼中位數的四項分數與 LCP／TBT／CLS。另外對 `/services`、`/about` 各跑一次手機版，確認沒有變差。
4. agent-browser 1440 與 390 截首頁首屏，確認中文字形看起來跟現在一樣（沒有掉回系統字或缺字）、影片仍會播放、輪播換張時下一張影片正常。截圖放 `docs/proposals/perf1001/` 一起 commit。
5. commit 結尾 `Co-Authored-By: Codex <noreply@openai.com>`；`git push -u origin perf/mobile-lcp`；`gh pr create --base main --title "perf: 首頁手機 LCP（字型拆檔、影片延後、對比）"`。**不准合併。**

---
## 第二輪（主控審查後，2026-10-01）
主控已在本分支加一個 commit：Playfair 不預載（首頁手機 86→89）。

### 審查發現：內頁變差，不能合併
同一台機器、本機 `next start`、Lighthouse 12 手機、各跑 2 次，「main 現況」vs「本分支」：

| 頁 | main 效能 / LCP / TBT | 本分支 效能 / LCP / TBT |
|---|---|---|
| `/` | 77–79 / 5.7s / ~30ms | 89 / 3.8s / ~30ms |
| `/services` | 61–62 / 15.9s / ~525ms | 50–51 / 13.7s / ~1,300ms |
| `/about` | 75 / 11.9s / ~60ms | 50–59 / 9.3s / 630–1,280ms |

內頁 LCP 有改善，但 TBT（主執行緒卡住時間）暴增。主控推測：內頁首屏的字不在 critical 檔，兩個字型檔先後到達，整頁中文要用兩個字型面比對、重排兩次。**這是推測，請先驗證再修。**

### 要做的（依序試，每一步都要量）
1. 先驗證 TBT 來源：用 Chrome performance trace（或 Lighthouse 的 `mainthread-work-breakdown`、`long-tasks` 稽核）找出 `/services`、`/about` 多出來的長任務是什麼（Layout？Recalc style？字型？JS？）。結果寫進 PR。
2. 把 critical 字集擴大成「**每一頁**的首屏」：導覽列＋每個路由的大圖 h1／引言／按鈕／麵包屑（從原始碼自動抽：各頁 hero 元件與 `src/data/chapters.ts`、`src/lib/seo` 用到的標題等）。目標 critical < 120KB。
3. 全站檔用 next/font/local 的 `declarations` 加 `unicode-range`，**排除** critical 已有的字，讓每個字只屬於一個字型面（避免同一字在兩個面重複比對）。check-font-subset 守門要跟著改：兩個檔合起來涵蓋全站。
4. 若 2＋3 之後 TBT 仍明顯高於 main，回報原因並提出替代方案，不要硬上。

### 合併門檻（全部要達成）
- `/` 手機效能 ≥ 88。
- `/services`、`/about`、`/services/product-testing`、`/cases` 手機效能**都不低於 main**（同機同條件各跑 2 次取平均，main 可在另一個 worktree `~/dev/lufe-copy2` 跑 `npx next start -p 3122` 當基準——那邊已建置好，不要改它的檔案）。
- 無障礙不低於 main。
- 字形外觀不變（1440／390 截圖）。
把對照表貼進 PR 描述（更新原本的表）。commit、push 到同一分支，不要開新 PR，不准合併。

---
## 第三輪（主控，2026-10-01）——換方向
感謝第二輪照實停下來。主控查到內頁慢的真正大頭不是字型：

`/services` 在 main 的網路紀錄：`images/services/services-hero-dhl.jpg` **2,023KB 原檔直送**，LCP 16s。`public/images/**` 裡有約 30 張 1–4MB 的 JPG（stage-*.jpg、case-*.jpg、cases-hero-collab.jpg、story-action-conversation.jpg…），全站大圖、卡片圖都在用原檔。首頁大圖早就用了 WebP 分級（`hero-poster-828/1600/1920.webp` + srcSet），內頁沒有。

### 要做的
1. **字型回到第一輪做法**：`git revert 5c0684a`（第二輪擴大 critical＋unicode-range 讓首頁從 89 掉到 85）。保留第一輪＋主控的 Playfair 不預載（a383574）。
2. **圖片分級**：寫 `scripts/build-image-tiers.mjs`（用專案已有的 `sharp`），把 `src/**` 實際引用到的 `public/images/**/*.jpg|png` 中寬度 > 900px 的，產出 WebP 分級：`<name>-640.webp`、`-1080.webp`、`-1600.webp`、`-2400.webp`（不放大，原圖不夠寬就少產幾級），品質 72。產物 commit 進 repo（不要用 next/image 的線上轉檔，會計費）。加 `npm run images:build`。說明寫進 `scripts/build-image-tiers.md`。
3. **改引用**：
   - `HeroBackdrop`（與所有 `.lufe-hero-backdrop` 的 `<img>`）：輸出 `srcSet` 用 WebP 分級、`sizes="100vw"`、`fetchPriority="high"`、不要 lazy；`src` 指向 1600 那級。
   - 其他 `<img>`／CSS background 用到大 JPG 的（案例卡、文章封面、章節卡片圖等）：`srcSet`＋合理 `sizes`＋`loading="lazy"`＋`decoding="async"`。CSS `background-image` 若難以 srcset，改用 `image-set()` 或改成 `<img>`（只在不影響版面時）。
   - 原 JPG 檔保留不刪（OG 圖、外部引用可能用到），只是頁面不再引用。
   - 寫一個測試：掃 `src/**`，除了 `opengraph`／`metadata` 用途，不得再直接引用 `public/images` 下 > 500KB 的檔案。
4. 首頁的 HeroSection 已經有分級，不用改（第一輪的影片延後保留）。

### 合併門檻（同機同條件、Lighthouse 12 手機、各 2 次平均，基準＝ http://localhost:3122 的 main，不要關它）
- `/` ≥ 88。
- `/services`、`/about`、`/services/product-testing`、`/cases`、`/insights`、`/contact` 效能都 **≥ main**，且 LCP 明顯下降。
- 無障礙 ≥ main。
- 1440／390 截圖：大圖畫質肉眼無明顯劣化、構圖位置（object-position）不變。
更新 PR #70 描述的對照表（整張重寫成最終版），同一分支 commit／push，不准合併。若某頁仍低於 main，照實寫出並附 trace 摘要。
