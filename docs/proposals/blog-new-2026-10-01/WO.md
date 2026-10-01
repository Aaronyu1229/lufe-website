# 工單：關鍵字優化 9 篇＋新文章 2 篇（2026-10-01）

工作目錄 `~/dev/lufe-rewrite`，分支 `content/rewrite-four-articles`，**更新同一個 PR #72**（不要開新 PR）。上一輪 11 篇故事版已在本分支。

## A. 套用 `docs/proposals/seo-pass-2026-10-01.md`
9 篇逐字照「原文 → 改為」替換：title、summary（excerpt）、「先說答案」、指定的 H2、指定的 FAQ 問句（與答案，若有改）。
- `landed-cost-before-export`：新增「FOB、CIF、DDP 差在哪」一節（含比較表），插在修改單指定位置；sources 新增 id 13–15。
- `us-fda-registration-guide`：新增 FDA 不發認證段落，插在指定位置；sources 新增 id 9–10。
- 修改單第 5 篇（first-time-export-checklist）照修改單的標題，不要用計畫表的版本。
- 修改單末尾的「查證備註」「要 Aaron 裁決」等編輯備註不上線。
- 若修改單的「原文」在現有 content 找不到（因故事版已調整），在 PR 裡列出，不要自己猜。

## B. 新增 2 篇文章：`docs/proposals/blog-new-2026-10-01/*.md`
- `agent-vs-distributor-exclusive`、`fob-cif-ddp-explained`：依 front matter（slug、title、excerpt、category、faq、sources、lastVerified）＋正文，逐字新增到 `src/data/articles.ts`；date 與 updated 皆 `2026-10-01`；readTime 依字數估；作者同其他文章。
- 封面圖：沿用 `SLUG_IMAGE_MAP` 的機制，從 `public/images/**` 現有、已有 WebP 分級的圖挑主題相近的（代理商篇：合作／談判類；FOB 篇：港口／貨櫃類），不要下載新圖，不要重複使用首頁大圖。
- 章節歸屬（`src/data/chapters.ts`）：代理商篇 → 第三章（寄賣）延伸閱讀；FOB 篇 → 基礎／方法論延伸閱讀（照現有資料結構，找最接近的位置）。
- sitemap 會自動包含，確認一下。
- 兩篇正文的「適合補 Aaron 故事」只是備註，不上線。

## 驗證
- 測試：13 篇都有 faq(3)、sources、情境 h2；每個 [n] 對得到 sources；9 篇 title 與修改單一致；2 篇新 slug 可取得、出現在 sitemap、有 FAQPage JSON-LD。
- `npx tsc --noEmit`；`npx eslint src`；`npx vitest run --maxWorkers=2`。
- 新中文字若擋 build：不要自己 font:rebuild，寫在 PR（主控處理）。
- 建置：`until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（只准 mkdir／rmdir）。
- agent-browser 1440／390 截兩篇新文章首屏＋FOB 比較表；手機 scrollWidth＝視窗寬；截圖放 `docs/proposals/blog-new-2026-10-01/` commit。
- 更新 PR #72 描述：加上「關鍵字優化 9 篇（新標題清單）」與「新增 2 篇」。
commit 結尾 `Co-Authored-By: Codex <noreply@openai.com>`；push 同一分支。**不准合併。**
