# 工單：四篇舊文改寫上架（2026-10-01）

工作目錄 `~/dev/lufe-rewrite`，分支 `content/rewrite-four-articles`（從 main）。
稿件：本資料夾四個 md（front matter＋markdown 正文）。另一張 PR（feat/author-page）正在改 `ArticleDetail.tsx` 加作者卡——你對 ArticleDetail 的改動**只限於新增 FAQ 區塊**，放在正文之後，盡量獨立成新元件，減少衝突。

## 主控決定的上架規則（照做，不要自己改寫內容）
1. **凡是句子帶【待 Aaron 確認】的，整句刪掉**（作者本人還沒背書，不能當事實上線）。刪完若「我們在現場看到的」該節沒有內容，整節（含標題）刪掉。
2. 每篇末尾「要問 Aaron 的追問」整節刪掉（那是給主控的，不上線）。
3. 其他文字逐字照稿，不潤飾。出處與「最後查證：2026-10-01」保留。

## 實作
- `src/data/articles.ts`：
  - `Article` 型別加選填 `faq?: readonly { q: string; a: string }[]` 與 `updated?: string`。
  - 四篇舊文**原地改成新內容**：slug 改為 front matter 的 `new_slug`、title、summary＝excerpt、category、content（依現有 content 格式轉換 markdown：小標、清單、表格、引言、連結；若現有格式不支援表格，新增最小的表格支援並加測試）、faq、`updated: "2026-10-01"`、readTime 依字數估。保留原 date（發布日）。
- 轉址（`next.config.ts`）：四個舊網址 `/insights/<old_slug>` 永久轉址（301/308）到新網址。越南那篇原本已有轉址（第 85 行附近），改指到 `/insights/why-philippines-first`。
- 舊 slug 的其他引用一起改：`src/data/chapters.ts` 的 `TAG_ONLY_ARTICLE_SLUGS`、`CHAPTER_ARTICLES`、`SLUG_IMAGE_MAP`，以及 `grep -rn` 找到的任何地方（sitemap、相關閱讀、導覽）。章節歸屬照 front matter 的 `chapter`。
- FAQ：文章頁正文後顯示「常見問題」（沿用站上 Disclosure 元件或簡單 dl，內容要在伺服器 HTML 裡），並輸出 `FAQPage` JSON-LD（只在有 faq 的文章）。Article JSON-LD 加 `dateModified`＝updated。
- 文章內的外部連結：`target="_blank" rel="noopener"`；內部連結用 Next Link。

## 驗證
- 測試：四篇新 slug 可取得、舊 slug 轉址設定存在且指向新 slug、全站 `src/` 不再出現四個舊 slug（next.config 轉址除外）、四篇正文不含「待 Aaron 確認」「要問 Aaron」字樣、FAQPage JSON-LD 存在且 3 題。
- `npm ci`；`npx tsc --noEmit`；`npx eslint src`；`npx vitest run --maxWorkers=2`。
- 若新中文字擋 build：**不要**自己跑 font:rebuild，寫在 PR 裡（主控處理）。可以先跑 `npm run build` 看是否只卡字型守門。
- 建置：`until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done; npm run build; rmdir /tmp/lufe-build.lock`（只准 mkdir／rmdir）。
- agent-browser 1440／390 截四篇各一張首屏＋一篇的表格與 FAQ，放本資料夾 commit；手機 scrollWidth＝視窗寬。
- PR 描述列出：每篇刪掉的【待確認】句數、刪掉的整節。
commit 結尾 `Co-Authored-By: Codex <noreply@openai.com>`；`git push -u origin content/rewrite-four-articles`；`gh pr create --base main --title "content: 四篇舊文改寫（菲律賓優先、電商第一年、到岸成本、Amazon 美國）"`。**不准合併。**
