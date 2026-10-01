# WO-0 — shared foundation: hero video, video assets, icon set, count-up, deer keyframes

Runs **alone, first**. Every other WO branches from `redesign/v6` after this PR is merged.
Read `docs/redesign-v6/wo/COMMON.md` first. Implements DECISIONS #9, #29 (keyframes only), #30, #48, #56 and the video part of #59, #69, #70, plus the hero video for every inner page listed in DECISIONS §D-1.

- Branch: `v6/0-shared` from `origin/redesign/v6`. PR → `redesign/v6`. Port for screenshots: `3100`.

## Allowed paths
- `src/components/HeroBackdrop.tsx`
- `src/components/HeroBackdropVideo.tsx` (new)
- `src/data/heroVideos.ts` (new)
- `src/components/icons/LineIcons.tsx` (new)
- `src/components/DelightLayer.tsx`
- `src/app/globals.css` (additions inside `@layer components` only; plus `@keyframes`)
- `public/videos/hero/**` (new files only — do not modify/delete existing videos)
- `public/images/hero-video/**` (new)
- One-line `video={HERO_VIDEOS[…]}` additions (plus the import) in these existing call sites — no other edits in them:
  `src/components/about/AboutPage.tsx`, `src/components/about/AaronAuthorPage.tsx`, `src/components/cases/CasesPage.tsx`, `src/components/contact/ContactPage.tsx`, `src/components/field-notes/FieldNotesPage.tsx`, `src/components/insights/InsightsPage.tsx`, `src/app/resources/page.tsx`, `src/app/resources/subsidies/page.tsx`, `src/components/services/ServicesPage.tsx`, `src/components/services/ChapterPage.tsx`, `src/components/services/OptimizePage.tsx`, `src/components/services/MethodologyPage.tsx`
- Tests: `tests/components/shared/**` (new)

Do **not** touch `src/components/assess/**` (no video there by decision #47) or case detail (WO-C adds it).

## 1. Download + transcode the videos (DECISIONS §D-1)
For each row V01, V03–V12, V14–V18, V20 (17 files): download with
`curl -L -A "Mozilla/5.0" -o /tmp/lufe-src/<code>.mp4 "<download URL>"` (keep sources out of the repo).

| code | output file | download URL |
|---|---|---|
| V01 | about-flight-720.mp4 | https://videos.pexels.com/video-files/3740041/3740041-uhd_3840_2160_24fps.mp4 |
| V03 | cases-manila-720.mp4 | https://videos.pexels.com/video-files/19666015/19666015-hd_1920_1080_30fps.mp4 |
| V04 | case-costco-720.mp4 | https://videos.pexels.com/video-files/9010436/9010436-uhd_3840_2160_30fps.mp4 |
| V05 | case-electronics-720.mp4 | https://videos.pexels.com/video-files/32386617/13814647_3840_2160_30fps.mp4 |
| V06 | case-shoe-720.mp4 | https://videos.pexels.com/video-files/37655310/15962732_3840_2160_25fps.mp4 |
| V07 | case-bubbletea-720.mp4 | https://videos.pexels.com/video-files/32554437/13882524_3840_2160_60fps.mp4 |
| V08 | fieldnotes-conference-720.mp4 | https://videos.pexels.com/video-files/34831818/14764858_1920_1080_24fps.mp4 |
| V09 | insights-notebook-720.mp4 | https://videos.pexels.com/video-files/7710425/7710425-uhd_4096_2160_25fps.mp4 |
| V10 | resources-taipei-720.mp4 | https://videos.pexels.com/video-files/10394868/10394868-uhd_3840_2160_30fps.mp4 |
| V11 | contact-laptop-720.mp4 | https://videos.pexels.com/video-files/7252685/7252685-hd_1920_1080_25fps.mp4 |
| V12 | subsidies-taipei-720.mp4 | https://videos.pexels.com/video-files/9062102/9062102-uhd_3840_2160_30fps.mp4 |
| V14 | chapter-research-720.mp4 | https://videos.pexels.com/video-files/3250235/3250235-uhd_3840_2160_25fps.mp4 |
| V15 | chapter-warehouse-720.mp4 | https://videos.pexels.com/video-files/6169987/6169987-uhd_3840_2160_25fps.mp4 |
| V16 | chapter-storefront-720.mp4 | https://videos.pexels.com/video-files/39681347/16921090_3840_2160_25fps.mp4 |
| V17 | chapter-callcenter-720.mp4 | https://videos.pexels.com/video-files/8865940/8865940-hd_1920_1080_25fps.mp4 |
| V18 | chapter-retail-720.mp4 | https://videos.pexels.com/video-files/29376327/12655226_3834_2160_30fps.mp4 |
| V20 | methodology-whiteboard-720.mp4 | https://videos.pexels.com/video-files/6062485/6062485-uhd_3840_2160_25fps.mp4 |

Segment: `START=1`, `DUR=12`. If the source is shorter than 13.5 s use `DUR = duration − START − 0.5` (`ffprobe -v error -show_entries format=duration -of csv=p=0 src.mp4`). For V07 use `START=6`. Pick another start only if the default segment shows a person looking straight into the camera or a hard cut; note the chosen START per file in the PR.

Transcode (exact):
```
ffmpeg -y -ss "$START" -t "$DUR" -i "/tmp/lufe-src/$CODE.mp4" -an \
  -vf "scale=1280:720:force_original_aspect_ratio=increase,crop=1280:720,fps=25,format=yuv420p" \
  -c:v libx264 -profile:v high -level 4.0 -preset slow -crf 26 \
  -maxrate 1500k -bufsize 3000k -g 50 -movflags +faststart \
  "public/videos/hero/$OUT"
```
Every output must be ≤ 2.5 MB (`ls -l`). If one is bigger, redo it with `-crf 28 -maxrate 1200k`. Paste `ls -l public/videos/hero/*-720.mp4` into the PR.

Poster (first frame of the same segment, full resolution of the source up to 2400 wide):
```
ffmpeg -y -ss "$START" -i "/tmp/lufe-src/$CODE.mp4" -frames:v 1 -vf "scale='min(2400,iw)':-2" -q:v 2 "public/images/hero-video/${OUT%-720.mp4}.jpg"
```
Then reference `/images/hero-video/<name>-1600.webp` from `src/data/heroVideos.ts` and run `npm run images:build` (it generates 640/1080/1600/2400 WebP tiers from the jpg, skipping tiers wider than the source). Commit the jpg and the generated `.webp` tiers.

## 2. `src/data/heroVideos.ts`
```ts
export interface HeroVideo {
  readonly src: string;          // /videos/hero/<name>-720.mp4
  readonly poster: string;       // largest available tier, e.g. /images/hero-video/<name>-1600.webp
  readonly posterSrcSet: string; // explicit "… 640w, … 1080w, … 1600w[, … 2400w]" — only tiers that exist on disk
  readonly position?: string;    // object-position for poster+video, default "center"
}
export const HERO_VIDEOS = { … } as const satisfies Record<string, HeroVideo>;
```
Keys (exactly): `about` (V01), `author` (V09 — same files as `insights`), `cases` (V03), `case:costco-health` (V04), `case:electronics-tariff` (V05), `case:shoe-brand` (V06), `case:bubble-tea` (V07), `fieldNotes` (V08), `insights` (V09), `resources` (V10), `contact` (V11), `subsidies` (V12), `services` (existing `/videos/hero/hero-map-planning-720.mp4`, poster `/images/hero/hero-slide-2-poster-1600.webp`, srcSet `…-828.webp 828w, …-1600.webp 1600w, …-2400.webp 2400w`), `chapter:m1` (V14), `chapter:m3` (V15), `chapter:m9` (V16), `chapter:after` (V17, position `right center`), `chapter:na` (V18), `optimize` (existing `/videos/hero/hero-highway-aerial-720.mp4`, poster `/images/hero/hero-slide-3-poster-*` same pattern), `methodology` (V20).
A test must assert every `src`, `poster` and every srcset URL exists under `public/`.

## 3. `HeroBackdrop` + `HeroBackdropVideo`
- `HeroBackdrop` gets an optional `video?: HeroVideo` prop. When present: the `<img>` uses `video.poster` / `video.posterSrcSet` (overriding `src`/`srcSet`), `objectPosition = video.position ?? position`, still `loading="eager" fetchPriority="high"` (it stays the LCP element). Render `<HeroBackdropVideo src={video.src} position={…} />` between `<picture>` and the scrim. `HeroBackdrop` stays a server-compatible component (no `"use client"`).
- `HeroBackdropVideo.tsx` (`"use client"`):
  - Renders nothing on the server and nothing until mounted → no `<video>` in SSR HTML (assert in test).
  - Mount condition: not `prefers-reduced-motion: reduce`, and not `navigator.connection?.saveData`. Wait for `window` `load` (or `document.readyState === "complete"`), then `requestIdleCallback` (fallback `setTimeout(…, 200)`), then mount.
  - `<video className="lufe-hero-video" muted loop playsInline autoPlay preload="none" aria-hidden="true" disablePictureInPicture>` with one `<source src type="video/mp4">`; `style={{ objectPosition }}`. Starts at opacity 0, set `data-ready` on the `playing` event → CSS fades to 1 over 800 ms.
  - `IntersectionObserver` (threshold 0.1): pause when the hero leaves the viewport, `play()` (catch the promise) when it returns. Also pause on `document.hidden`.
  - Listen to the reduced-motion media query; if it switches to reduce, pause and unmount.
- globals.css (`@layer components`):
  ```
  .lufe-hero-video { position:absolute; inset:0; width:100%; height:100%; object-fit:cover; opacity:0; transition:opacity 800ms ease-out; }
  .lufe-hero-video[data-ready] { opacity:1; }
  @media (prefers-reduced-motion: reduce) { .lufe-hero-video { display:none; } }
  ```
  Make sure the existing `[data-lufe-hero-photo]` drift (DelightLayer) moves the video together with the poster (they share the backdrop wrapper).

## 4. Wire every existing hero (one-liners)
`AboutPage` → `HERO_VIDEOS.about`; `AaronAuthorPage` → `.author`; `CasesPage` → `.cases`; `ContactPage` → `.contact`; `FieldNotesPage` → `.fieldNotes`; `InsightsPage` → `.insights`; `resources/page.tsx` → `.resources`; `resources/subsidies/page.tsx` → `.subsidies`; `ServicesPage` → `.services`; `ChapterPage` → `HERO_VIDEOS[\`chapter:${chapter.key}\`]` (all five chapter keys exist); `OptimizePage` → `.optimize`; `MethodologyPage` → `.methodology`.

## 5. `src/components/icons/LineIcons.tsx`
Named exports, each `({ size = 20, className }: { size?: number; className?: string })`, `viewBox="0 0 24 24"`, `fill="none" stroke="currentColor" strokeWidth={1.75} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"`. Use the path data of the matching **Lucide** icons (ISC license — add a one-line license comment at the top):
`CompassIcon`(compass), `TrendIcon`(trending-up), `BuildingIcon`(building-2), `HeadsetIcon`(headset), `SproutIcon`(sprout), `SlidersIcon`(sliders-horizontal), `PackageIcon`(package), `ClockIcon`(clock), `TargetIcon`(target), `PenIcon`(pen-line), `FileIcon`(file-text), `ReceiptIcon`(receipt), `MailIcon`(mail), `MapPinIcon`(map-pin), `CalendarClockIcon`(calendar-clock), `MessageIcon`(message-square), `LinkedInIcon`(linkedin), `ArrowRightIcon`(arrow-right), `PlusIcon`(plus).
No consumers in this WO (lanes import them).

## 6. Count-up upgrade (#9) — `DelightLayer.tsx` + globals.css
- For elements matched by the existing counter selector: always start from 0, fixed duration **1600 ms**, easing ease-out-quart (`1 − (1 − p)^4`), keep prefix/suffix and thousands separators exactly as today. Trigger when ≥40 % of the element is visible (`threshold: 0.4`) instead of the current rootMargin.
- When the count finishes (or immediately under reduced motion) set `data-lufe-counted` on the element.
- Before counting, set `style.fontVariantNumeric = "tabular-nums"` and fix the element's `minWidth` to its final rendered width (`getBoundingClientRect().width`) so layout never jitters.
- globals.css (`@layer components`), only for `[data-lufe-counter]` (not plain `.num`):
  ```
  [data-lufe-counter] { position:relative; }
  [data-lufe-counter]::after { content:""; position:absolute; left:0; bottom:-6px; width:100%; height:2px; background:var(--color-gold); transform:scaleX(0); transform-origin:left; transition:transform 600ms cubic-bezier(.2,.8,.2,1); }
  [data-lufe-counter][data-lufe-counted]::after { transform:scaleX(1); }
  @media (prefers-reduced-motion: reduce) { [data-lufe-counter]::after { transition:none; } }
  ```
  If an existing `[data-lufe-counter]` element is `display:block` and full-width (e.g. `/about` hero stats), wrap nothing — just verify in screenshots the line sits under the number and does not collide with the label; if it collides, change `bottom` to `-4px`.

## 7. Deer keyframes (#29, used by WO-A)
In globals.css (outside `@layer` is fine for `@keyframes`; the utility class inside `@layer components`):
```
@keyframes lufe-deer-tilt { 0%{transform:rotate(0)} 28%{transform:rotate(-14deg)} 58%{transform:rotate(5deg)} 80%{transform:rotate(-2deg)} 100%{transform:rotate(0)} }
@layer components {
  .lufe-deer { transform-origin: 50% 90%; }
  .lufe-deer-trigger:is(:hover,:focus-visible,:active) .lufe-deer { animation: lufe-deer-tilt 720ms cubic-bezier(.2,.8,.2,1); }
  @media (prefers-reduced-motion: reduce) { .lufe-deer-trigger .lufe-deer { animation:none !important; } }
}
```

## Tests (`tests/components/shared/`)
- `hero-videos.test.ts`: every file referenced by `HERO_VIDEOS` exists in `public/`; every mp4 ≤ 2_621_440 bytes.
- `hero-backdrop.test.ts`: `renderToStaticMarkup(HeroBackdrop with video)` contains the poster `<img>` with `fetchpriority="high"` and contains **no** `<video`.
- `line-icons.test.ts`: each export renders an `<svg` with `aria-hidden="true"`.

## Verification
COMMON.md steps 1–8. Screenshot paths: `/about /about/aaron-yu /cases /contact /field-notes /insights /resources /resources/subsidies /services /services/product-testing /services/call-center /services/optimize /services/methodology`. Additionally, in Playwright for `/about` at 1440: wait 4 s after load and assert `document.querySelector('.lufe-hero-video[data-ready]')` exists; with `page.emulateMedia({ reducedMotion: 'reduce' })` assert no `video` element exists. Paste both results.
Lighthouse mobile on `/about` before (origin/redesign/v6) vs after: `npx -y lighthouse http://localhost:3100/about --only-categories=performance --form-factor=mobile --quiet --chrome-flags="--headless" --output=json --output-path=/tmp/lh-about.json` and paste performance score + LCP for both; LCP must not get worse by more than 0.3 s.
