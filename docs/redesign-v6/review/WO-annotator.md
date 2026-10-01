# Work order: click-to-annotate review tool (redesign v6)

Worktree: `~/dev/lufe-v6`, branch `tool/review-annotator` (already checked out, based on origin/main 20f8092).
Goal: let Aaron (non-engineer, reads Traditional Chinese only) browse a frozen snapshot of the whole LUFÉ site
locally, click any element, and write a side note ("備註") about what should change in that layer or around it.
Notes are saved to a JSON file on disk so Claude can read them later and port changes into source code.

ALL UI TEXT MUST BE TRADITIONAL CHINESE. Code comments in English.

## Hard rules
1. Only create/modify files under `docs/redesign-v6/review/` plus one line appended to root `.gitignore`.
   Do NOT touch `src/`, `public/`, `scripts/`, `package.json`, lockfiles, fonts. No new npm dependencies.
   Python: stdlib only.
2. Build queue — use EXACTLY this (never lockf/flock/lock files):
   ```
   until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done
   npm run build; rc=$?
   rmdir /tmp/lufe-build.lock
   ```
3. Run `npm ci` first if `node_modules` is missing.
4. Commit on `tool/review-annotator`, push, open a PR to `main` titled
   `tool: 網站快照＋點擊加備註工具（v6 改版用）`. Never merge. Never push to main.

## Files to create (in `docs/redesign-v6/review/`)

### `snapshot.sh`
- Runs the locked build (rule 2) in the repo root, then rebuilds `docs/redesign-v6/review/site/` from scratch:
  - every `*.html` under `.next/server/app/` → same relative path under `site/` (e.g. `about.html`,
    `insights/foo.html`, `index.html`). Skip `_global-error*`, `_not-found*` except copy `_not-found.html` as `404.html`.
  - `.next/static/` → `site/_next/static/`
  - everything in `public/` → `site/` root
- Writes `site/_snapshot.json`: `{ "commit": <git rev-parse HEAD>, "createdAt": ISO, "pages": [sorted list of URL paths like "/", "/about", "/insights/foo"] }`.
- Add `docs/redesign-v6/review/site/` to root `.gitignore` (the snapshot is regenerable; do not commit it).

### `serve.py`  (python3 stdlib, `python3 docs/redesign-v6/review/serve.py [--port 8899]`, binds 127.0.0.1 only)
- Serves `site/`. URL resolution: `/` → `index.html`; `/about` → `about.html`; `/a/b` → `a/b.html`; falls back to
  `a/b/index.html`; else static file; else `404.html` with status 404. Strip query strings. Reject any path that
  resolves outside `site/` (path traversal) with 403.
- For every HTML response, inject `<link rel="stylesheet" href="/__review/annotate.css"><script src="/__review/annotate.js" defer></script>` right before `</body>`.
- `/__review/annotate.js` and `/__review/annotate.css` served from this folder.
- `GET /__review/notes` → contents of `notes.json` (create `{"version":1,"notes":[],"pagesDone":[]}` if missing).
- `POST /__review/notes` with full JSON document → validate it is an object with `notes` array and `pagesDone`
  array, body ≤ 5 MB → write atomically (temp file + `os.replace`), also keep a rolling backup
  `notes.backup.json` of the previous version. Return `{"ok":true}`.
- `GET /__review/pages` → `site/_snapshot.json`.
- `GET /__review/mobile?path=/about` → a small HTML page (Chinese UI) showing that path in a 390×844 iframe,
  centered, with a page dropdown to switch pages. The annotate script must work inside the iframe too.
- `GET /__review/all` → an HTML page listing ALL notes grouped by page (page path, section heading, quoted element
  text snippet, note text, category, scope, time), each with a link "去看" that opens the page and scrolls to the note
  (`/about#__note=<id>`). Plus progress "已看完 N / 總頁數" and the list of pages not yet marked done.
- Print on start, in Chinese: the URL to open, and the snapshot commit.

`notes.json` is NOT gitignored (it is the deliverable; Claude commits it later).

### `annotate.js` + `annotate.css` (vanilla JS, no deps, all class names prefixed `lrv-`, highest z-index, must not break the site's own JS/hydration; append UI to the end of `document.body`; re-append if removed)
- Floating toolbar bottom-right: button 「備註模式：關」/「備註模式：開」 (shortcut: key `N` when not typing),
  button 「本頁備註 (n)」 toggling the side panel, button 「這頁看完了 ✓」 toggling done state for the current page,
  link 「全部備註」 → `/__review/all`, link 「手機寬度看」 → `/__review/mobile?path=<current>`,
  a page dropdown 「跳到頁面」 listing all snapshot pages with ✓ for done ones, and text 「已看完 N/總數」.
- Annotate mode ON: hovering any element shows an outline + small label of what it is; clicking
  (capture phase, preventDefault + stopPropagation, so links/buttons don't fire) selects it and opens the side panel
  editor. Annotate mode OFF: site behaves normally (links navigate between snapshot pages).
- Side panel (right, 380px; on viewport < 700px a bottom sheet ~60vh). Editor shows:
  - the selected element's description: nearest section heading text (closest preceding h1/h2/h3), and the first
    80 characters of the element's visible text;
  - buttons 「選大一點（往外一層）」 and 「選小一點」 to move the selection to parent / first element child,
    updating the outline;
  - scope radio: 「只改這一塊」 / 「這一塊和周圍」 / 「整個區段」 (default 只改這一塊);
  - category chips (multi-select): 文字、排版、圖片、刪掉、新增、其他;
  - textarea placeholder 「這裡想怎麼改？例如：這句太長，改成…／這兩塊對調／字太小」;
  - buttons 「儲存」 「取消」, and on existing notes 「刪除」 (confirm dialog in Chinese).
- Every saved note shows a numbered gold pin (#C8A24A-ish, white number) at the top-right corner of its element;
  clicking a pin opens it for editing. Pins reposition on scroll/resize/DOM changes (use rAF throttling).
  If the element can't be found, the note is listed in the panel under 「找不到位置的備註」 instead of disappearing.
- Panel list mode: all notes for the current page in page order, click → scroll to element and flash it.
- On load, if URL hash is `#__note=<id>`, scroll to and open that note.
- Note record:
  `{ id, page, selector, textSnippet (first 200 chars of innerText), heading, outerHTMLSnippet (first 1500 chars),
     viewportWidth, scope, categories[], text, createdAt, updatedAt, status: "open" }`
  `selector`: robust CSS path — stop at nearest ancestor with an id, otherwise `tag:nth-of-type()` chain from body;
  ignore any `lrv-` elements. On restore, if selector fails or its text no longer matches the snippet start, fall back
  to searching elements whose innerText starts with the first 40 chars of textSnippet.
- Persistence: load via GET, save the whole document via POST after every change; if POST fails, keep in
  `localStorage` key `lrv-notes-pending`, show a red toast 「備註沒存到檔案，請確認 serve.py 還開著」 and retry on the
  next change / every 10s. Toast 「已儲存」 on success.
- Never show raw English to the user in UI.

### `README.md` (Traditional Chinese, for Aaron, short)
How to open (one command Claude runs for him), how to use annotate mode, the three scope options, where notes go,
「手機寬度看」, 「這頁看完了」, and that the site in this tool is a frozen copy (forms won't really send).

### `test_serve.py` (stdlib unittest)
Covers: URL resolution (/, /about, nested, index fallback, 404), traversal rejection (`/../package.json`,
encoded `%2e%2e`), script injection present in HTML and absent in non-HTML, notes GET default, POST valid writes +
creates backup, POST invalid (not object / missing arrays / too big) rejected without touching the file.
Use a temp dir fixture for site/ and notes path (make serve.py's paths configurable via function args/env for tests).

## Verification you must run and paste into the PR body (real output, do not summarize away failures)
1. `bash docs/redesign-v6/review/snapshot.sh` rc=0, and `jq '.pages|length' site/_snapshot.json` (expect ≈35).
2. `python3 -m unittest docs/redesign-v6/review/test_serve.py -v` — paste the final summary line.
3. Start serve.py, then with Playwright (node, `npx playwright` is available; do not add it to package.json — use a
   throwaway script under /tmp) at 1440 and 390 widths: open `/`, turn annotate mode on, click the hero heading,
   press 「選大一點」 once, write a note, save; reload; assert the pin is visible and `notes.json` contains it;
   click a nav link with annotate mode OFF and assert navigation to the snapshot page works; open `/__review/all`
   and assert the note is listed. Save 4 screenshots to `docs/redesign-v6/review/screenshots/` and commit them.
   Report any browser console errors.
4. After the test, reset `notes.json` to the empty document before committing.
5. `git status` clean except intended files; `git diff --stat origin/main`.
