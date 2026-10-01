import { imageTierSrcSet } from "@/lib/image-tiers";

interface HeroBackdropProps {
  readonly src: string;
  readonly srcSet?: string;
  readonly mobileSrc?: string;
  readonly position?: string;
  readonly night?: boolean;
}

/** Decorative responsive hero image with the v5 text-side contrast scrim. */
export function HeroBackdrop({ src, srcSet, mobileSrc, position = "center", night = false }: HeroBackdropProps) {
  return (
    <div aria-hidden="true" className={`lufe-hero-backdrop${night ? " lufe-hero-backdrop-night" : ""}`}>
      <picture>
        {mobileSrc ? <source media="(max-width: 767px)" srcSet={mobileSrc} type="image/webp" /> : null}
        {/* Local responsive sources are pre-generated to the work-order sizes. */}
        <img src={src} srcSet={srcSet ?? imageTierSrcSet(src)} sizes="100vw" loading="eager" fetchPriority="high" decoding="async" alt="" className="lufe-hero-image" style={{ objectPosition: position }} />
      </picture>
      <div className="lufe-hero-scrim" />
    </div>
  );
}
