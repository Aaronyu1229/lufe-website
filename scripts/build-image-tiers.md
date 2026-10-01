# Build image tiers

Run `npm run images:build` whenever an image used from `public/images` changes.

The script scans image paths used by `src/**`. For every referenced JPEG or PNG wider than 900px, it writes same-directory WebP tiers at 640, 1080, 1600, and 2400px without enlarging the source. Files use WebP quality 72 and are committed with the code. A reference to a generated `-1600.webp` tier also resolves back to its same-named JPEG or PNG, so the command works from a clean checkout after production code has stopped referring to original files. `HeroSection` is excluded because its existing 828/1600/1920 WebP set is intentionally managed separately.

Use native `img` elements with `srcSet` and `sizes` for these files. Do not route them through `next/image`: these static tiers avoid on-demand image transformations. Keep the original JPEG and PNG files for Open Graph images and external links.
