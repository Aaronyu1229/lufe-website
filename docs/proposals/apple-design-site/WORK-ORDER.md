# Work order — LUFÉ full-site fluid-interface proposal (static HTML)

You are building **static HTML proposal pages** for the LUFÉ website redesign, applying the
`apple-design` skill. Nothing here touches the Next.js app. Output is plain `.html` files in
`docs/proposals/apple-design-site/`.

## Read first (mandatory)

1. `~/.agents/skills/apple-design/SKILL.md` — the design law for this work. Every motion and
   material decision must trace to a section of it.
2. `docs/proposals/apple-design-site/index.html` — the finished reference page. Match its
   structure, tone, spacing and code style exactly.
3. `docs/proposals/apple-design-site/assets/lufe.css` and `assets/lufe.js` — the shared design
   system and motion engine. **Read both fully.** Use their classes and `window.LUFE` APIs.
4. The source components / data listed in your lane — this is where **all content** comes from.

## Hard rules

- **Do NOT edit** `assets/lufe.css`, `assets/lufe.js`, `index.html`, `WORK-ORDER.md`, or any file
  outside your lane's output list. Page-specific CSS goes in that page's own `<style>`; page JS in
  that page's own `<script>` after `assets/lufe.js`.
- **Content is verbatim** from the source `.tsx` / `src/data/*.ts`: every heading, paragraph, number,
  list item, FAQ, CTA label. Do not invent copy, stats, testimonials, clients or dates. Do not drop
  sections. If a source section is purely decorative, you may simplify its visuals, not its text.
  Keep the site-wide CTA rule: primary "聊聊你的產品" (a `data-chat` button → shared chat sheet),
  secondary "先做 2 分鐘處境比對" → `assess.html`.
- **Images**: use the live site, `https://lufe.world` + the `public/` path the source uses
  (e.g. `/images/cases/case-1-costco.jpg` → `https://lufe.world/images/cases/case-1-costco.jpg`).
  Before using a URL, confirm it returns 200 with `curl -sI`. If a source image does not exist, omit it.
- **Links between pages** use these file names (flat, same folder):
  `index.html services.html services-market-assessment.html services-product-testing.html
  services-channel-entry.html services-localization.html services-methodology.html
  services-optimize.html cases.html case.html?slug=<slug> insights.html article.html?slug=<slug>
  field-notes.html about.html contact.html assess.html resources.html subsidies.html`.
  Map source `href="/services/..."` etc. to these. External links stay as-is.
- **Page skeleton** (copy from index.html):
  ```html
  <!doctype html><html lang="zh-Hant"><head> …same meta + fonts + assets/lufe.css… <style>page css</style></head>
  <body data-page="<name>" data-hero="dark|light">
  <div data-lufe-nav></div>
  <main> …sections… </main>
  <div data-lufe-footer></div>
  <template id="lufe-notes"><li><b>…</b>：…</li> … </template>
  <script src="assets/lufe.js"></script>   <!-- must come after all markup -->
  <script> (() => { const { … } = LUFE; … })(); </script>
  </body></html>
  ```
  `data-hero="dark"` when the first section inside `<main>` is a dark hero (use `.page-hero`).
  `data-page`: services pages use `services-…`, `case`, `article`, others their file name.
- `<title>`: `<頁名> · 鹿飛 LUFÉ（流體介面提案）`.

## Skill → allowed interaction vocabulary (use, don't invent new engines)

| Need | Use |
|---|---|
| Horizontal list of cards / steps | `.car-vp > .car-track` + `LUFE.carousel(vp,{prev,next})` (momentum + snap) |
| Card that reveals more detail | `LUFE.expand(card,{img,html})` — morphs out of the card, drag-down to dismiss; put `id="xpTitle"` on the heading inside `html` |
| Filters / tabs | `.seg` + `LUFE.segmented(seg,onChange)`; when filtering a grid wrap the DOM change in `LUFE.flip(grid, () => {...})` (children need `data-key`) |
| Q&A / collapsible | `.qa` markup + `LUFE.initQA()` |
| Choice pills | `.choices` + `LUFE.choices(group,onChange)` |
| Inline form validation | `LUFE.validate(fieldEl,inputEl,testFn)` returns a submit-time checker |
| Any other animated value | `LUFE.spring(initial,onUpdate)` + `LUFE.draggable(el,'x'|'y',{start,move,end})`, with `LUFE.project` / `LUFE.rubberband` |

Principles you must respect (from the skill):
- Feedback on pointer-down (already in `.btn`, `.card`, `.round`). Every motion interruptible;
  springs default `damping 1`; bounce (`damping .8–.9`) only after a flick.
- Spatial consistency: things return the way they came; popovers/panels originate from their trigger;
  step-forward slides left, step-back slides right.
- Restraint: **no scroll-triggered fade-ins, no count-up numbers, no auto-opening popups, no
  parallax on scroll, no looping decorative animation.** Motion only where it serves understanding.
- Hierarchy through weight + size + leading (`.display/.h1/.h2/.h3/.lead/.body`). CJK letter-spacing 0.
- Respect `prefers-reduced-motion` (the engine already jumps springs; CSS transitions you add must be
  covered — the shared CSS clamps durations globally).
- Mobile first: must work at 390px wide with **no horizontal page scroll**; 16–20px side gutter.
- Accessible: real `<button>`/`<a>`, labels on icon buttons, `aria-pressed`/`aria-expanded` where
  relevant, visible focus.

## Per-page notes

Each page gets a `<template id="lufe-notes">` with **4–7 `<li>`** in plain Traditional Chinese for a
non-engineer business owner: what changed on this page vs the live site and why (cite the skill idea
in everyday words, e.g. 「按下去立刻有回饋」「從卡片的位置展開、收回同一個位置」). No jargon like
"spring", "FLIP", "damping".

## Self-check before you finish

1. For each file you created: extract every inline `<script>` body and run it through
   `node -e "new Function(require('fs').readFileSync('/tmp/x.js','utf8'))"` — must not throw.
2. `grep -c 'data-lufe-nav\|data-lufe-footer\|assets/lufe.js\|lufe-notes'` = 4 per file.
3. Every `https://lufe.world/...` URL you used returns 200.
4. You changed no file outside your output list (`git status --porcelain` shows only your files).
5. Do **not** commit, push, or open a PR. The reviewer does that.

When everything passes, print exactly one final line: `LANE_<X>_DONE <comma-separated files>`.
