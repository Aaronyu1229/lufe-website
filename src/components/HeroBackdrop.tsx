interface HeroBackdropProps {
  readonly src: string;
  readonly mobileSrc?: string;
  readonly position?: string;
  readonly night?: boolean;
}

/** Decorative responsive hero image with the v5 text-side contrast scrim. */
export function HeroBackdrop({ src, mobileSrc, position = "center", night = false }: HeroBackdropProps) {
  return (
    <div aria-hidden="true" className={`lufe-hero-backdrop${night ? " lufe-hero-backdrop-night" : ""}`}>
      <picture>
        {mobileSrc ? <source media="(max-width: 767px)" srcSet={mobileSrc} type="image/webp" /> : null}
        {/* Local responsive sources are pre-generated to the work-order sizes. */}
        <img src={src} alt="" className="lufe-hero-image" style={{ objectPosition: position }} />
      </picture>
      <div className="lufe-hero-scrim" />
    </div>
  );
}
