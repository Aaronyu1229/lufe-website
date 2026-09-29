# 鹿飛 LUFÉ 方正版改版：交接文件（換視窗先讀這份）

> 最後更新：2026-09-29（第二波只剩 C3）。這份文件是權威來源，以它為準，不以任何人的記憶為準。
> 看完這份之後，接著讀同資料夾的 `PLAN.md`（硬規則）和 `DECISIONS.md`（Aaron 逐頁的決定）。

## 0. 一句話現況
設計已經全部定案。第一波已合併（`abd9483`）。**第二波（3 條並行）幾乎做完（2026-09-29）**：除了 C3（案例列表＋案例詳情）以外，所有頁面都已審完並合進 `redesign/square`（見 §3-B）。C3 合併後就進 §6「全部階段做完之後」。

---

## 1. 已完成並上線（全部在 lufe.world 實測過）
| 項目 | PR | 合併到 main 的 commit |
|---|---|---|
| 預約諮詢：原本的 Calendly 是 404，改成寄信（按鈕「寄信預約」，會開一封填好主旨的信） | #39 | `6b2a57b` |
| 文章內文的 `**…**` 改成粗體輸出，由伺服器直接產生 | #40 | `e211de9` |
| **兩個表單原本從未送出過**（只假裝成功），修成真的會送 | #42 | `34dd27b` |
| JP Worker 新增 `/web/lufe-lead`，用專屬鑰匙 | jp-system #865 | `f1bb0ab`（已部署，`/health` 顯示這個 sha） |

### 表單送出的架構（改版時絕不能改壞）
- 前端兩個表單：`MessageBox.tsx`（快速留言）和 `contact/ContactPage.tsx`（完整表單），都 POST 到 `/api/lead`。
- `src/app/api/lead/route.ts` 的流程：
  1. 驗證欄位。蜜罐欄位 `website` 如果不是空的，直接回 ok、不做事。
  2. **先寫入 `lufe.leads`**，再 POST 到 JP，然後回寫 `notified` / `notify_error`。
  3. 寫庫或通知任一個成功就回 200；兩個都失敗才回 502，前端這時顯示寄信連結。
- 資料庫：Supabase 專案 `agqtoxpuvovqwsuldlgz`（**共用專案，鹿飛只能用 `lufe` schema，⛔ 不能用 public**）。
  - `lufe.leads` 有開 RLS，只有一條 policy 給 `lufe_app`；anon／authenticated 讀不到；`lufe_app` 刪不掉。
  - 建表的 SQL 在 `db/migrations/20260929_leads.sql`。
  - 要改結構只能走 Supabase Management API（Keychain 的「Supabase CLI」token）。`lufe_app` 沒有 CREATE 權限。
- 環境變數（Vercel production）：`LUFE_DATABASE_URL`、`JP_LEAD_URL`、`LUFE_LEAD_SECRET`。
  - 鑰匙的值存在 Keychain `lufe-lead-secret-20260929`，Cloudflare JP Worker 也設了同一把。
- 已驗證：正式站用實際畫面送了 2 筆測試（快速留言、完整表單），兩筆都 `notified=true`。熱機時約 4 秒。
- ⏳ 還在等 Aaron 回覆：手機 LINE/Telegram 有沒有真的收到那兩則「📩 鹿飛官網 新詢問」。
- 那 2 筆測試資料（name=「系統測試（Claude）」）還留在表裡；要刪的話需要 Aaron 點頭。

---

## 2. 分支、worktree、PR 對照表
| 用途 | 分支 | worktree | PR |
|---|---|---|---|
| 設計提案存檔（不合併） | `proposal/apple-design-site` | `~/dev/lufe-website-apple` | #38（draft） |
| **改版整合分支**（所有階段合進這裡，最後才合進 main） | `redesign/square` | `~/dev/lufe-redesign` | — |
| 第 1 階段 | `redesign/p1-foundation` | `~/dev/lufe-p1` | #41（✅ 已合進 redesign/square，`9bca3fb`） |
| 共用元件包 | `redesign/p1b-primitives` | `~/dev/lufe-p1b` | #43（✅ 已合進 redesign/square，`abd9483`） |
| 正式站 | `main` | `~/dev/lufe-website` | — |

- 設計的權威來源：`~/dev/lufe-website-apple/docs/proposals/lufe-square-site/`，入口是 `overview.html`。每頁都有 `compare-*.html`，是 Aaron 的 A/B 選擇紀錄。
- `redesign/square` 已併入 main 的 #39／#40／#42（`8e0628e`）。之後 main 若再有修正，開第二波前要先再合一次。
- `~/dev/lufe-p1`、`~/dev/lufe-p1b` 兩個 worktree 已用完，可以 `git worktree remove`。

---

## 3. 第一波結果（2026-09-29 完成）
- **A（#41）**：`MessageBox.tsx` 衝突已解，畫面用 P1 底部面板、送出邏輯用 main 的 `/api/lead`；`ContactPage.tsx` 沒衝突。主控驗過：tsc／lint／test／build 綠；導覽下拉與 `compare-global.html` C 並排一致；下拉連結在 SSR HTML；390 寬 8 頁無橫向捲動、console 無錯；本機實際送出快速留言 → `lufe.leads` 新增一筆 `notified=true`（第 3 筆「系統測試（Claude）」）。
  - ⚠️ 本機測表單：`vercel env pull` 拉下來的三個密鑰是**空值**（敏感變數不會下載）；要用 Keychain `lufe-database-url`、`lufe-lead-secret-20260929`，`JP_LEAD_URL=https://jp-system.reborn-uidesigner.workers.dev/web/lufe-lead`。
- **B（#43）**：`src/components/ui/` 有 `Carousel`（`itemClassName` 可改卡寬）、`Segmented`、`Disclosure`、`ExpandCard`（面板在 hydration 後 portal 到 body，SSR 時內容在 HTML 裡）、`ChoiceGroup`、`flip`（內部用 `flushSync`，可以直接包 setState），從 `@/components/ui` 匯入。
  - 審查抓到 Codex 自報全綠但實際壞掉的 7 件（收合打不開、ExpandCard 放進 Carousel 被裁切、關閉後卡住、flip 在 React 無效、滑塊偏 4px、0–1 值的彈簧半路跳到終點、卡寬寫死），兩輪修正後都在瀏覽器驗過。
  - 🔑 用 `src/lib/motion` 的彈簧跑 0–1 或索引這種無單位的值時，一定要傳 `precision`（0.001–0.002），預設 0.5 是給像素用的。

### 3-B. 第二波結果（2026-09-29）
| 條 | 步驟 | PR | 狀態 |
|---|---|---|---|
| A | 首頁 | #46 | ✅ 已合併 |
| A | 洞察列表、文章、現場紀錄 | #48 | ✅ 已合併 |
| B | 服務總覽 | #44 | ✅ 已合併 |
| B | 方法論、進階優化 | #47 | ✅ 已合併 |
| B | 4 個服務階段頁 | #49 | ✅ 已合併 |
| C | 關於、聯絡 | #45 | ✅ 已合併 |
| C | 處境比對、補助、資源 | #50 | ✅ 已合併 |
| C | 案例列表、案例詳情 | （進行中） | ⏳ |
| 主控 | 全站字級 class 改成可被頁面覆蓋 | #51 | ✅ 已合併 |

- 工單共用規則在 `docs/redesign/wave2/common-rules.md`；內容比對工具是同資料夾的 `snap.sh`（抓 20 頁伺服器 HTML）＋ `textdiff.py`（逐頁列出不見／多出的文字）。基準要用**改版前**的 build 抓。
- 🔑 審查每條都抓到 Codex 自報全綠但實際有問題的地方。最常見的三種，已寫進共用規則：
  1. 標題細字：舊的 `section-heading`／`hero-title` 會把字重壓成 300，而且蓋過 Tailwind。
  2. 深色背景文字太淡：`.lead` 自帶灰色、沒包 layer，蓋過 `text-white/70`。已由 #51 從根本修掉。
  3. 為了讀網址參數把靜態頁改成動態頁：`/insights` 曾從 ○ 變成 ƒ。
- ✅ SEO 加分：改版前 `/insights` 的伺服器 HTML 只有 1 篇文章連結，現在 11 篇都在；各頁收合的 FAQ 答案、配對工具的全部題目，也都進了 HTML。
- ✅ 已實測：處境比對同一組答案，改版前後結果完全一樣；聯絡頁完整表單真的送出後，資料庫有新資料且 `notified=true`；首頁 Hero 12 秒自動換頁。
- 收尾清單：`/services/optimize` 收合列的箭頭方框貼齊卡片右緣。

### （以下為原第 1 階段待辦，已全部完成，保留備查）
Codex 已完成兩個 commit：`6c87b7c` 動畫引擎 `src/lib/motion/`（spring／draggable／project／rubberband＋測試），`388ee3e` 導覽列、頁尾、底部面板 MessageBox，以及移除 SubsidyCard。

**合併之前必須做完：**
1. 先把 `origin/main` 合進 `redesign/square`，才能帶進 #39／#40／#42。
2. 再把 `redesign/square` 合進 `redesign/p1-foundation`。**`MessageBox.tsx` 一定會衝突**：P1 是用舊的「假送出」（`setSubmitted(true)`）重寫的。解衝突時：
   - UI 保留 P1 的底部面板。
   - 送出邏輯用 main 的版本（fetch `/api/lead`、「送出中…」、失敗時顯示 mailto 連結）。
3. `ContactPage.tsx` 也可能衝突，因為 main 同時改了預約和送出。解法同上：送出邏輯以 main 為準。
4. 審查重點（我已經先查過的部分）：
   - ✅ 導覽下拉的內容跟正式站一致（抽查 9 個字串都在）。
   - ⬜ 還沒做：比對 P1 的導覽列／面板／頁尾和提案 `compare-global.html`（C 方案）、`index.html` 的截圖。
   - ⬜ 還沒做：確認下拉選單的連結有出現在伺服器輸出的 HTML 裡。
   - ⬜ 還沒做：手機 390px 寬度下沒有橫向捲動，console 沒有錯誤。
5. 跑 `npx tsc --noEmit`、`npm run lint`、`npm test`、`npm run build`（字型守門）。本機 `next start` 之後，**用實際畫面送一筆表單，確認資料庫 `lufe.leads` 多了一筆、`notified=true`**。只看畫面顯示「收到了」不算數。

---

## 4. 並行計畫（Aaron 2026-09-29 核准）

### 第一波：2 條並行（第 1 階段收尾 ＋ 共用元件包）
- **A**：完成 §3，合進 `redesign/square`。
- **B**：共用元件包，分支 `redesign/p1b-primitives`，從 `redesign/p1-foundation` 開出去。
  - 放在 `src/components/ui/`，全部用 `src/lib/motion` 驅動，照提案 `assets/lufe.js` 的行為：
    - `Carousel`（可甩的橫向列，會停在卡片邊）
    - `Segmented`（切換鈕，方塊會滑動）
    - `Disclosure`（收合；**內容必須在伺服器 HTML 裡**）
    - `ExpandCard`（卡片放大成浮動面板，往下甩可關；**面板內容也要先在 HTML 裡**）
    - `ChoiceGroup`
    - `flip` 動畫工具
  - 每個元件都要有測試。
  - B 只能新增檔案，**不准改 A 會動到的檔案**。

### 第二波：3 條並行（第一波兩條都合進 `redesign/square` 之後才開始）
| 條 | 內容（依序做） | 只准改這些 |
|---|---|---|
| A | 首頁 → 洞察列表、文章、現場紀錄 | `src/components/home/**`、`src/app/page.tsx`、`src/components/insights/**`、`src/app/insights/**`、`src/components/field-notes/**`、`src/app/field-notes/**` |
| B | 服務總覽、方法論、進階優化、4 個階段頁 | `src/components/services/**`、`src/app/services/**` |
| C | 關於、聯絡、處境比對、補助、資源 → 案例列表、案例詳情 | `src/components/{about,contact,assess,subsidy,cases}/**`、`src/app/{about,contact,assess,resources,cases}/**` |

### 並行時的防撞規則（寫進每一張工單）
1. **禁止修改**：`src/app/globals.css`、`src/app/layout.tsx`、`src/components/Navbar.tsx`、`Footer.tsx`、`MessageBox.tsx`、`src/components/ui/**`、`src/lib/**`。
   - 真的需要改就停下來，在 PR 裡說明，由主控統一處理。
   - 每頁需要的樣式，寫在該頁自己的元件裡（Tailwind class）。
2. **不准提交字型檔**（`src/app/fonts/**`）。字型子集守門擋下建置時，在 PR 裡列出缺的字就好，等全部合併後由主控跑一次 `npm run font:rebuild`。
3. **建置要排隊**：`npm run build` 之前要先拿鎖 `mkdir /tmp/lufe-build.lock`，建置完 `rmdir`。拿不到鎖就等 30 秒再試。vitest 一律加 `--maxWorkers=2`。
   - ⛔ **工單要寫明「只准用 mkdir／rmdir，不准改用 `lockf`／`flock`」**：第一波 Codex 自己改用 `lockf -k`，留下一個普通檔案 `/tmp/lufe-build.lock`，之後所有 `mkdir` 鎖都拿不到、永遠在等。發現建置一直在等鎖時，先 `ls -ld /tmp/lufe-build.lock`：如果是檔案而不是資料夾，而且 `lsof` 沒有程式佔用，就刪掉。
4. **內容一字不改**。收合、切換的內容文字**必須在伺服器 HTML 裡**。首頁 Hero 行為不變。方角。
5. 每一條都開 PR 到 `redesign/square`，不准合進 main，不准自己合併。

### 電腦資源規則（2026-09-29 Aaron 的 Mac 因記憶體滿而卡住）
- 同時最多 2 個 Codex，只有第二波可以 3 個，而且必須搭配建置鎖。
- 每做完一個階段：跑 `agent-browser close`；用 `ps -axo pid,ppid,etime,rss,command | grep -E "vitest|Chrome for Testing|agent-browser-darwin|next start"` 找 ppid=1 的殘留程序，先用 `lsof -a -p PID -d cwd` 確認是自己 worktree 的，才關掉。**別的 session 的東西不要碰**（例如 `~/jp-system-wt-*`）。
- 等 Codex 結束要記下 PID，用 `kill -0 $PID` 判斷。⛔ 不要用 `pgrep -x codex`（ChatGPT.app 也叫 codex）。

---

## 5. 每條 PR 合進整合分支前，主控要做的審查
1. 讀 diff：內容和原始碼逐字一致；沒有改到禁止改的檔案。
2. 自己跑 tsc／lint／test／build，不引用 Codex 自己回報的數字。
3. 本機 `next start`，在 1440 和 390 寬度下，把截圖和提案對應的頁面並排比對，並操作每個互動。
4. `curl` 抓伺服器 HTML，確認收合內容的文字都在。
5. console 沒有錯誤，也沒有橫向捲動。

## 6. 全部階段做完之後
1. 主控跑 `npm run font:rebuild` 並提交。
2. 全站總檢查：19 頁 × 兩種寬度、SEO（收合內容在 HTML 裡、canonical 維持現狀）、Lighthouse（跟目前 67 分比較，不能變差）、無障礙。
3. Aaron 在 `redesign/square` 的 Vercel 預覽站從頭走一遍。預覽站有登入保護，網址後加 bypass 參數，方法見記憶 `project_lufe_impeccable_round1_2026_09_21`。
4. Aaron 說 OK 之後，由 `redesign/square` 開 PR 合進 main。上線後到正式站驗證，**包含實際送一筆表單**。

## 7. 等 Aaron 回覆或處理的事
- 手機有沒有收到那兩則測試通知（2026-09-29 又多一則，改版本機驗證送的）。
- 要不要刪掉那 4 筆測試留言（name=「系統測試（Claude）」；2026-09-29 聯絡頁完整表單驗證又多一筆）。
- （跟改版無關）開通 Google Search Console；補寫現場紀錄三則筆記的內容。
