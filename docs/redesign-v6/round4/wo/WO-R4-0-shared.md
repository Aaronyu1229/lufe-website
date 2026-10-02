# WO-R4-0 — Shared: hero videos, HD source, new photo sources, redirects, /field-notes removal

Read first: `docs/redesign-v6/wo/COMMON.md`, then `docs/redesign-v6/round4/DECISIONS-R4.md` (§0 H-1, H-4, H-5; §D; notes #3 #4 #10 #12 #14 #17 #22 #23).
Runs **first and alone**. WO-R4-A and WO-R4-B branch from `origin/redesign/v6` after this PR is merged.

- Branch: `v6/r4-0-shared` from latest `origin/redesign/v6`. PR → `redesign/v6`. Port `3510`.
- Allowed paths:
  - `src/data/heroVideos.ts`, `src/components/HeroBackdrop.tsx`, `src/components/HeroBackdropVideo.tsx`
  - `public/videos/hero/**`, `public/images/hero-video/**`
  - `public/images/cases/story/` (add the five source photos only), `public/images/about/about-port.jpg` (add)
  - `next.config.ts` (redirects only)
  - delete: `src/app/field-notes/**`, `src/components/field-notes/**`, `src/data/fieldNotes.ts`, `public/images/field-notes/**`, `tests/components/field-notes/**`
  - `src/components/Navbar.tsx`, `src/components/Footer.tsx` (field-notes links only)
  - `src/app/resources/page.tsx` (delete the 「活動與現場紀錄」 section and the `ACTIVITIES` import only — WO-R4-B redesigns the rest)
  - tests: `tests/components/shared/hero-videos.test.ts`, `tests/components/resources/resources.test.ts` (remove field-note assertions only), `tests/components/navbar.test.ts`, `tests/components/footer*.test.ts`, `tests/config/redirects.test.ts` (new)
- Do **not** touch cases/assess/about/services components or `src/data/cases.ts` (lanes A/B/C wire the content). The old case keys disappear from `HERO_VIDEOS` here; `CaseDetailPage` already looks videos up with `HERO_VIDEOS[\`case:${slug}\`]` and tolerates `undefined`, so the three old case pages keep rendering (poster image only) until lane A replaces them. Confirm with the build.

## 1. Videos (DECISIONS §D-1)
All sources are Pexels (Pexels License: free commercial use, no attribution required). Download to `/tmp/lufe-src/<code>.mp4` (or copy the pre-cut originals from `/private/tmp/claude-502/-Users-aaron/38b951f5-fa1b-4046-96c5-560adf5b2bb8/scratchpad/vid/src/<slot>-src.mp4` if that folder still exists — they are lossless cuts of the same files starting at 0s, so use the same START/DUR).

| Code | Output (`public/videos/hero/`) | Download URL | START | DUR |
|---|---|---|---|---|
| about-sailing | `about-sailing-720.mp4` | https://videos.pexels.com/video-files/37287417/15795926_1920_1080_60fps.mp4 | 2 | 12 |
| cases-skyline | `cases-skyline-720.mp4` | https://videos.pexels.com/video-files/34862466/14774610_3840_2160_60fps.mp4 | 2 | 12 |
| services-port | `services-port-720.mp4` | https://videos.pexels.com/video-files/32038130/13656580_3840_2160_60fps.mp4 | 2 | 12 |
| optimize-containers | `optimize-containers-720.mp4` | https://videos.pexels.com/video-files/9702133/9702133-uhd_3840_2160_30fps.mp4 | 2 | 12 |
| na-skyline | `na-skyline-720.mp4` + `na-skyline-1080.mp4` | https://videos.pexels.com/video-files/11471275/11471275-uhd_3840_2160_30fps.mp4 | 2 | 12 |
| assess-chess | `assess-chess-720.mp4` | https://videos.pexels.com/video-files/6599643/6599643-uhd_3840_2160_25fps.mp4 | 2 | 12 |
| resources-books | `resources-books-720.mp4` | https://videos.pexels.com/video-files/38668053/16425003_1920_1080_50fps.mp4 | 0 | 11 |
| subsidies-desk | `subsidies-desk-720.mp4` | https://videos.pexels.com/video-files/7651532/7651532-uhd_3840_2160_30fps.mp4 | 0 | 11 |
| case-soap | `case-soap-720.mp4` | https://videos.pexels.com/video-files/13161560/13161560-uhd_3840_2160_30fps.mp4 | 2 | 12 |
| case-floss | `case-floss-720.mp4` | https://videos.pexels.com/video-files/34717908/14716373_3840_2160_24fps.mp4 | 2 | 12 |

720p transcode (exact; note `fps=30` — the motion metric depends on it):
```
ffmpeg -y -ss "$START" -t "$DUR" -i "/tmp/lufe-src/$CODE.mp4" -an \
  -vf "scale=-2:720:flags=lanczos,fps=30" \
  -c:v libx264 -profile:v high -level 4.0 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart \
  "public/videos/hero/$CODE-720.mp4"
```
If > 2.5 MB: redo with `-crf 28 -maxrate 1200k -bufsize 2400k` (expected for `services-port` and `case-floss`).
1080p for na-skyline only: same command with `scale=-2:1080:flags=lanczos,fps=30` and `-crf 24 -level 4.1`; must be ≤ 5 MB (expected ≈ 5.03 MB → if over 5,000,000 bytes use `-crf 25`).
Poster (frame at START): `ffmpeg -y -ss "$START" -i "/tmp/lufe-src/$CODE.mp4" -frames:v 1 -vf "scale='min(2400,iw)':-2" -q:v 2 "public/images/hero-video/$CODE.jpg"`, then `npm run images:build` (posters are referenced from `heroVideos.ts`, so the script picks them up). `about-sailing` and `resources-books` are 1080p sources → no 2400 tier.

Delete (videos and their posters/tiers; check with `rg -n "<name>" src tests` first — the `chapter-retail` **poster** is still used by `ServicesPage.tsx`, keep `public/images/hero-video/chapter-retail-*`, delete only its video):
`about-flight-720.mp4`, `cases-manila-720.mp4`, `case-costco-720.mp4`, `case-electronics-720.mp4`, `case-shoe-720.mp4`, `fieldnotes-conference-720.mp4`, `chapter-retail-720.mp4`, `resources-taipei-720.mp4`, `subsidies-taipei-720.mp4` + posters `about-flight-*`, `cases-manila-*`, `case-costco-*`, `case-electronics-*`, `case-shoe-*`, `fieldnotes-conference-*`, `resources-taipei-*`, `subsidies-taipei-*` in `public/images/hero-video/`.

Paste `ls -l public/videos/hero/` and the measurement table: `bash docs/redesign-v6/round4/measure-motion.sh public/videos/hero/*-720.mp4` (the script ships in the docs folder; if it is not on the branch yet, copy it from DECISIONS §D-1). Expected m values (±10%): about-sailing 26.3, cases-skyline 33.2, services-port 58.2, optimize-containers 66.8, na-skyline 11.3, assess-chess 16.4, resources-books 29.7, subsidies-desk 34.5, case-soap 126.1, case-floss 45.6. If one deviates by more than 10%, stop and report (wrong segment).

## 2. `heroVideos.ts`
1. `HeroVideo` gains `readonly srcHd?: string;`.
2. Entries (poster = `/images/hero-video/<code>-1600.webp`; `posterSrcSet` lists only tiers that exist on disk):
   - `about` → about-sailing, `playbackRate: 1.25`
   - `cases` → cases-skyline, `1.25`
   - `services` → services-port, `1.15` (no longer shares the home clip)
   - `optimize` → optimize-containers, `1.05` (no longer shares the home clip)
   - `"chapter:na"` → na-skyline, `srcHd: "/videos/hero/na-skyline-1080.mp4"`, `1.25`
   - `assess` (new) → assess-chess, `1.25`
   - `resources` → resources-books, `1.25`
   - `subsidies` → subsidies-desk, `1.25`
   - `"case:goat-milk-soap-global"` (new) → case-soap, `0.75`
   - `"case:fish-floss-us-fda"` (new) → case-floss, `1.25`
   - delete `"case:costco-health"`, `"case:electronics-tariff"`, `"case:shoe-brand"`, `fieldNotes`
   - unchanged: `author`, `"case:bubble-tea"`, `contact`, `insights`, `"chapter:m1"`, `"chapter:m3"`, `"chapter:m9"`, `"chapter:after"`, `methodology`
3. Update the comment: `// playbackRate = clamp(round to .05, sqrt(75 / median luma-diff per second at 30fps), 0.6, 1.25). No timelapses. See DECISIONS-R4 H-4 and docs/redesign-v6/round4/measure-motion.sh.`
4. Test `tests/components/shared/hero-videos.test.ts`: snapshot the full rate table above; every rate in `[0.6, 1.25]`; every `src`, `srcHd` and every URL inside `posterSrcSet` exists under `public/` (`fs.existsSync`); `chapter:na` has `srcHd`; no key contains `costco|electronics|shoe|fieldNotes`.

## 3. HD source (H-5)
- `HeroBackdrop` passes `srcHd={video.srcHd}` to `HeroBackdropVideo`.
- `HeroBackdropVideo` new optional prop `srcHd?: string`. Decide the source **once at mount time** (inside the existing mount effect, before `setMounted(true)`): `const useHd = Boolean(srcHd) && window.matchMedia("(min-width: 1024px)").matches && !navigator.connection?.saveData;` store in state; render `<source src={useHd ? srcHd : src} type="video/mp4" />`. Do not swap sources on resize. Everything else (idle mount, visibility, reduced motion, playbackRate) unchanged.

## 4. Redirects (`next.config.ts`, inside `redirects()`, before the trailing-slash rule)
```ts
{ source: "/cases/shoe-brand", destination: "/cases", permanent: true },
{ source: "/cases/costco-health", destination: "/cases/goat-milk-soap-global", permanent: true },
{ source: "/cases/electronics-tariff", destination: "/cases/fish-floss-us-fda", permanent: true },
{ source: "/field-notes", destination: "/resources", permanent: true },
```
(Next answers `permanent: true` with 308, the permanent equivalent of 301 that search engines treat the same.) Until lane A merges, the two new case URLs 404 on this branch — expected; note it in the PR. Test `tests/config/redirects.test.ts`: import the config, `await config.redirects()`, assert the four entries exist with `permanent: true`.

## 5. Remove /field-notes (H-1, #10)
1. Delete `src/app/field-notes/`, `src/components/field-notes/`, `src/data/fieldNotes.ts`, `public/images/field-notes/`, `tests/components/field-notes/`.
2. `Navbar.tsx`: remove both `MenuLink`/`MobileSubLink` `/field-notes` items, remove `/field-notes` from the transparent-header path list (line ~61), delete `PinIcon` if now unused.
3. `Footer.tsx`: remove `{ label: "現場紀錄", href: "/field-notes" }`.
4. `src/app/resources/page.tsx`: delete the whole cream section 「活動與現場紀錄」 (incl. `看所有現場紀錄 →`), the `ACTIVITIES` import and `activities` const, and `TieredImage` import if unused. Nothing else.
5. `rg -n "field-notes|fieldNotes|FieldNotes|現場紀錄" src tests` → only `next.config.ts` may remain. Paste output.

## 6. New photo sources (used by lanes A/B; you only add the originals)
Download (Pexels License) and save exactly:
| Save as | Download URL | Author | Size |
|---|---|---|---|
| `public/images/cases/story/bubble-tea-tasting.jpg` | https://images.pexels.com/photos/12666797/pexels-photo-12666797.jpeg | Telly Mina | 4272×2848 |
| `public/images/cases/story/goat-soap-1.jpg` | https://images.pexels.com/photos/7055166/pexels-photo-7055166.jpeg | Pavel Danilyuk | 5473×3654 |
| `public/images/cases/story/goat-soap-2.jpg` | https://images.pexels.com/photos/7814773/pexels-photo-7814773.jpeg | Mikhail Nilov | 7420×4949 |
| `public/images/cases/story/fish-floss-1.jpg` | https://images.pexels.com/photos/33559692/pexels-photo-33559692.jpeg | Satish V | 6000×4000 |
| `public/images/cases/story/fish-floss-2.jpg` | https://images.pexels.com/photos/12024976/pexels-photo-12024976.jpeg | Mr. Mockup | 3811×2531 |
| `public/images/about/about-port.jpg` | https://images.pexels.com/photos/8193332/pexels-photo-8193332.jpeg | Niklas Jeromin | 5724×3817 |
Downscale any original wider than 4000px to 4000px (`sips -Z 4000`) to keep the repo small; keep JPEG quality ~85. Do **not** generate their tiers here (the tier script only processes images referenced from `src`; lanes A/B run `npm run images:build` after they reference them and commit the tiers). Verify sizes with `sips -g pixelWidth -g pixelHeight` and paste.

## 7. Verification
COMMON.md steps 1–8. Playwright paths: `/about /cases /assess /services /services/optimize /services/north-america /resources /resources/subsidies`. Extra (paste):
- 1440: for each path print `currentSrc` basename and `playbackRate` of `video.lufe-hero-video` after 3 s (`/assess` has no video yet — lane A wires it; print `-`). `/services/north-america` must show `na-skyline-1080.mp4`; at 390 `na-skyline-720.mp4`.
- `next start` redirect check: `for p in /cases/shoe-brand /cases/costco-health /cases/electronics-tariff /field-notes; do curl -sI http://localhost:3510$p | grep -iE "^HTTP|^location"; done`.
- Build route table: `/field-notes` gone.
PR body: `#4 #10 #12 #14 #17 #22 #23` done, `#3` assets ready (wiring in A), video table with final sizes and m/rate, photo table.
