# LUFÉ v6 — common rules for every work order (read before your WO)

Repo: Next.js 16 App Router (read `node_modules/next/dist/docs/` before using any Next API you are unsure about — this version has breaking changes), React 19, TypeScript, Tailwind v4, vitest (`tests/**/*.test.ts`, env node).
Authority: `docs/redesign-v6/DECISIONS.md` (Traditional Chinese). Your WO pastes the exact copy you need; if your WO and DECISIONS ever disagree, DECISIONS wins — stop and say so in the PR body.
Also obey (still valid): `docs/redesign-v5/DECISIONS.md` §6–7, `docs/redesign/wave2/common-rules.md` hard rules 2, 3, 5, 6, 7, 9, 11 and its Typography section. Rule 4 of wave2 is **partially overridden** for v6: count-up numbers (only through `DelightLayer`, elements marked `data-lufe-counter`) and hero background videos (only through `HeroBackdrop`'s `video` prop) are now allowed. Everything else in rule 4 stands (no scroll-triggered fades, no auto popups).

## Git
- Base branch: `redesign/v6`. Create your branch from the latest `origin/redesign/v6` (it will already contain WO-0 once WO-0 is merged).
- PR targets `redesign/v6`. **Never target or touch `main`. Never merge your own PR.**
- Conventional commits (`feat(<area>): …`), last line `Co-Authored-By: Codex <noreply@openai.com>`.
- Model: run with `codex exec --model gpt-5.6-terra`.

## Allowed paths
You may only create/modify files listed in your WO's "Allowed paths", plus new tests under the test folder named there. If something outside is truly required, do not change it — explain in the PR body.
Always forbidden unless your WO lists them: `src/app/layout.tsx`, `src/app/template.tsx`, `src/components/ui/**`, `src/lib/**`, `src/components/MessageBox.tsx`, `src/app/api/**`, `src/data/articles.ts` (owned by the blog autopilot — never edit), `src/app/fonts/**` (never commit), `package.json`/lockfile.

## Design invariants
- Square corners everywhere (no `rounded-*` except `rounded-full` on tiny dots / the 32px author avatar that already exists).
- Brand colors only: tokens `navy navy-l gold gold-d gold-l cream cream-d sky ember tx tx2 tx3 bd` (+ white/black alpha). No new hex colors.
- Any **global** CSS you are allowed to add goes inside `@layer components { … }` in `src/app/globals.css` (only WO-0 may touch globals.css).
- Collapsed / tabbed / panel / off-screen-question content must be in the server HTML (rule 2).
- Hidden panels must not eagerly download images (no `<img>` inside a never-opened panel unless it is `loading="lazy"` **and** not rendered until first open).
- Motion: only `transform`/`opacity`; interruptible (springs from `@/lib/motion`, pass `precision: 0.001–0.002` for unitless 0..1 values); `prefers-reduced-motion` → no movement. Press feedback `scale(.97)` buttons / `scale(.985)` cards; hover lift only inside `@media (hover:hover)` (Tailwind `[@media(hover:hover)]:hover:…`).
- On navy backgrounds body text is `text-white/65`–`/75`; never `text-tx2/tx3` there. Remove legacy classes `section-heading`, `hero-title`, `section-desc`, `section-label` from any element you touch.
- Headings: `.display .h1 .h2 .h3 .lead .num` tokens; heading weight ≥ 600.

## Copy rules (DECISIONS §C-1, §C-2)
- Paste copy **verbatim** from your WO (backticked strings). Do not paraphrase.
- Full-stop rule: drop the final `。` of subtitles/leads, card/list/table/step descriptions, nav/footer/button/link/badge/stat labels, captions, and general marketing paragraphs. Keep the final `。` in article body, FAQ answers, case-story paragraphs, customer quotes, form error/success/system messages, privacy/legal notes, and all `metadata` descriptions. Mid-text `。` always stays.
- Sweep your allowed paths with: `rg -n '。(["'\''`]|\s*<|\s*\}|\\n"?\s*\}?$|$)' <allowed paths>` and decide each hit by the rule above. List what you changed and what you deliberately kept in the PR body.
- No first-person 「我」 in site copy; no 「Aaron」 in visible copy except: article author byline, the `/about/aaron-yu` page name/breadcrumb, email address, customer quotes, file names.

## Fonts (font-subset guard)
New Chinese characters make `prebuild` fail ("uncovered non-ASCII characters"). Precedent (wave2 rule 8): fonts are rebuilt once by the integrator, never by lanes. For v6 you still need a green build for screenshots, so:
1. `npm run font:rebuild` (local only) → run the locked build → screenshots.
2. Before committing: `git checkout -- src/app/fonts && git status --short src/app/fonts` must print nothing.
3. In the PR body list the new characters the guard reported before your local rebuild (run `node scripts/check-font-subset.mjs src` before step 1 and paste its output).

## Verification (paste real output lines into the PR body; do not paraphrase numbers)
1. `npm ci` (first time in the worktree).
2. `npx tsc --noEmit` → 0 errors.
3. `npm run lint` → 0 errors (warnings listed).
4. `npx vitest run --maxWorkers=2` → paste the `Test Files` and `Tests` summary lines. Update tests that pin copy you changed; add tests named in your WO.
5. Locked build — exactly this, nothing else (mkdir/rmdir only; never lockf/flock; never create a file at that path):
   ```
   until mkdir /tmp/lufe-build.lock 2>/dev/null; do sleep 30; done
   npm run build > /tmp/lufe-build-$(basename $PWD).log 2>&1; rc=$?
   rmdir /tmp/lufe-build.lock
   tail -25 /tmp/lufe-build-$(basename $PWD).log; echo "build rc=$rc"
   ```
   Paste the route table lines for the routes you touched; static pages must stay `○`/`●` (never turn into `ƒ`).
6. Screenshots + overflow + console check with Playwright against `next start` (port in your WO):
   ```
   PORT=<your port>; npx next start -p $PORT > /tmp/lufe-start-$PORT.log 2>&1 & SP=$!
   sleep 6
   cat > /tmp/lufe-shot-$PORT.mjs <<'EOF'
   import { chromium } from "playwright";
   const [port, out, ...paths] = process.argv.slice(2);
   const browser = await chromium.launch();
   for (const width of [1440, 390]) {
     const page = await browser.newPage({ viewport: { width, height: width === 390 ? 844 : 900 } });
     const errors = [];
     page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
     page.on("pageerror", (e) => errors.push(String(e)));
     for (const p of paths) {
       await page.goto(`http://localhost:${port}${p}`, { waitUntil: "networkidle" });
       await page.waitForTimeout(800);
       const o = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, iw: window.innerWidth }));
       const name = `${out}/${width}${p.replace(/[/?=&]/g, "_") || "_home"}.png`;
       await page.screenshot({ path: name, fullPage: true });
       console.log(width, p, o.sw === o.iw ? "OK" : `OVERFLOW sw=${o.sw} iw=${o.iw}`);
     }
     console.log(width, "console errors:", errors.length ? errors : "none");
     await page.close();
   }
   await browser.close();
   EOF
   mkdir -p /tmp/lufe-v6-shots/<WO>; npx -y -p playwright@1.56.1 node /tmp/lufe-shot-$PORT.mjs $PORT /tmp/lufe-v6-shots/<WO> <paths…>
   kill $SP
   ```
   If Playwright says the browser is missing, run `npx -y playwright@1.56.1 install chromium` once.
   Paste the OK/OVERFLOW lines and console-error lines. Every path must be `OK`. Leave no background processes (`kill`, then confirm with `lsof -i :$PORT`).
7. `git diff --name-only origin/redesign/v6...HEAD` → only allowed paths + your tests.
8. `git status` clean, branch pushed, PR opened with `gh pr create --base redesign/v6`.

## PR body must contain
- One line per DECISIONS note number you implemented (`#0 done — …`).
- Copy changed vs copy deliberately kept (full-stop sweep list).
- Verification output (steps 2–7), font guard character list, screenshot folder path.
- Anything you could not do and why.
