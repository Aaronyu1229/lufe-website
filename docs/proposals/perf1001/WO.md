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
