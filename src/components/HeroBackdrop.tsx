import { imageTierSrcSet } from "@/lib/image-tiers";
import type { HeroVideo } from "@/data/heroVideos";

import { HeroBackdropVideo } from "./HeroBackdropVideo";

interface HeroBackdropProps {
  readonly src: string;
  readonly srcSet?: string;
  readonly mobileSrc?: string;
  readonly position?: string;
  readonly night?: boolean;
  readonly video?: HeroVideo;
}

/** Decorative responsive hero image with the v5 text-side contrast scrim. */
export function HeroBackdrop({ src, srcSet, mobileSrc, position = "center", night = false, video }: HeroBackdropProps) {
  const imageSrc = video?.poster ?? src;
  const imageSrcSet = video?.posterSrcSet ?? srcSet ?? imageTierSrcSet(src);
  const imagePosition = video?.position ?? position;

  return (
    <div aria-hidden="true" className={`lufe-hero-backdrop${night ? " lufe-hero-backdrop-night" : ""}`}>
      <picture>
        {mobileSrc && !video ? <source media="(max-width: 767px)" srcSet={mobileSrc} type="image/webp" /> : null}
        {/* Local responsive sources are pre-generated to the work-order sizes. */}
        <img src={imageSrc} srcSet={imageSrcSet} sizes="100vw" loading="eager" fetchPriority="high" decoding="async" alt="" className="lufe-hero-image" style={{ objectPosition: imagePosition }} />
      </picture>
      {video ? <HeroBackdropVideo src={video.src} position={imagePosition} /> : null}
      <div className="lufe-hero-scrim" />
    </div>
  );
}
