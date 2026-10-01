const TIER_WIDTHS = [640, 1080, 1600, 2400] as const;
const TIERED_IMAGE_PATTERN = /-(?:640|1080|1600|2400)\.webp$/;

/** Builds a native responsive-image srcset from a generated 1600px WebP tier. */
export function imageTierSrcSet(src: string, maxWidth?: number): string | undefined {
  const match = src.match(TIERED_IMAGE_PATTERN);
  if (!match) return undefined;

  const base = src.replace(TIERED_IMAGE_PATTERN, "");
  const largestTier = maxWidth ?? (match[0] === "-1080.webp" ? 1080 : 2400);

  return TIER_WIDTHS
    .filter((width) => width <= largestTier)
    .map((width) => `${base}-${width}.webp ${width}w`)
    .join(", ");
}
