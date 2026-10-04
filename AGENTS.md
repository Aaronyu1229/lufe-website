<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## 雙語規則 (bilingual rule)

- 任何變更 `src/i18n/zh/*`、`src/data/*`，或 components/pages 內使用者可見的中文內容，都必須在同一個 PR 更新對應的 `src/i18n/en/*`。
- 必須執行 `npx vitest run tests/i18n`，並將輸出的 fingerprint 複製到英文檔；未變更英文文字時，絕不得只更新 fingerprint。
- 新增中文頁面必須遵循 `docs/bilingual-spec` 分支的 `docs/superpowers/plans/2026-10-03-bilingual-p2-pages.md` Plan 2 recipe，或在 `src/i18n/coverage.ts` 列入並說明 `EN_PENDING`／`EN_EXCLUDED` 原因。
- 頁面 metadata 的 title 與 description 也屬於中文內容。
