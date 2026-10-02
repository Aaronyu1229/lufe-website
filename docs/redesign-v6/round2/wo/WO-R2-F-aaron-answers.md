# WO-R2-F — Apply Aaron's answers (2026-10-02 morning)

Read `docs/redesign-v6/wo/COMMON.md` first. Branch `v6/r2-f-answers` from latest `origin/redesign/v6`. PR → `redesign/v6`. Port `3420`. Only Codex run active; mkdir build lock.

Aaron overrides his own methodology v2.1 spec where stated below — these edits are authorized.

## Allowed paths
`src/data/subsidies.ts`, `src/components/services/methodology/content.ts`, `src/components/services/MethodologyPage.tsx`, `src/app/services/methodology/page.tsx`, `src/data/chapters.ts`, `src/components/services/ServicesPage.tsx`, `public/images/methodology/**` (new), related tests under `tests/components/**`. Fonts: rebuild AND commit `src/app/fonts/*` in this WO (it is the last change before review), as a separate commit `chore(fonts): rebuild subset`.

## Exact edits
1. Subsidy 03 threshold = revenue decline (Aaron's decision):
   - `subsidies.ts:231` → `"月平均營業額較基期衰退 10% 以上的製造業（輸美實績衝擊門檻）"`
   - `subsidies.ts:284` → `"輸美實績衝擊門檻：月均營業額較基期（前一年同期 / 前一年下半年 / 當年 1-2 月，三者擇一）衰退 10% 以上"`
   - `rg -n "對美出口較基期|對美出口.*衰退" src --glob '!src/data/articles.ts'` → 0.
2. Methodology — delete:
   - the hero small line `這不是第五章。這是我們第一次跟你談的時候，腦子裡跑的那套東西。` (`MethodologyPage.tsx:80`, remove the element entirely).
   - in `RULES_COPY`, the first two lines `總分不到 60，我們不接。` and `不是不想賺，是接了對你沒有好處，對我們的案例也沒有好處。` (and the blank line after them). Keep the rest of the block and its heading `我們的規矩`.
   - meta description → `鹿飛的出海方法論：先用一兩萬問菲律賓市場，再決定投多少。兩個真實研究例子、五個評估問題、打兩次分。`
   - Keep the score matrix (`60–74 Conditional Go` etc.) unchanged.
3. Methodology — add an image beside section 「我們的初心」: desktop two columns (text left, image right, image ~40% width, aspect 4:5, `object-cover`), mobile image below text. Source one Pexels photo (commercial-free licence) that reads as "a Taiwanese product owner reviewing market feedback / warehouse-to-shelf" — calm, no faces looking at camera. Download, add via the repo's tiered image pipeline exactly like case images were added (`scripts/build-image-tiers.mjs`, `TieredImage`), alt text in Chinese. Record source URL, author, licence in the PR body.
4. Hide the teacher role everywhere (Aaron: do not reveal that panelists/staff are teachers):
   - `content.ts:22` `請五位二十多歲的菲律賓女老師，` → `請五位二十多歲的菲律賓女性上班族，`
   - `content.ts:143` `五位老師聊完，` → `五位受訪者聊完，`
   - `chapters.ts:183` title `一桌教師與家長` → `一桌上班族與家長`; body `當地學校的教師（高收入的工薪階層）和家長（真正掏錢的人）圍著桌子。` → `當地有消費力的上班族和家長（真正掏錢的人）圍著桌子。`
   - `chapters.ts:212` question → `為什麼找上班族與家長？`; answer → `上班族是當地有消費力的工薪階層，家長是真正掏錢買東西的人。這兩群人的反應，比問卷準。`
   - `ServicesPage.tsx:102` → `當地上班族與家長組成的測試面板，產品上架前先取得真實反應`
5. Call-center: remove education-background claims (Aaron: customer service is simply about strong English):
   - `chapters.ts:350` body → `受過完整訓練的菲律賓英語客服團隊，英文溝通是基本功。\n規則與標準由台灣端制定與管理` (keep title/icon).
   - `chapters.ts:360` → delete this array item entirely (check the surrounding list still renders; if it leaves a list with one item, say so in the PR).
   - After edits: `rg -n "老師|教師|英語教育體系|出身" src/data/chapters.ts src/components/services src/app/services` → 0. (Do NOT change `英語教育機構` in AboutPage/CasesPage/CasesSection/chapters.ts:308 — that is the partner's real founding story.)

## Verification
COMMON.md steps; font rebuild committed; locked build green with the postbuild guard; screenshots 1440/390 of `/services/methodology` (hero, 初心 with image, 規矩), `/services/product-testing`, `/services/call-center`, `/resources/subsidies`; scrollWidth; console errors; paste the rg outputs above.
