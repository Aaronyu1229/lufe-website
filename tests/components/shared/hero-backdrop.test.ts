import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { HERO_VIDEOS } from "@/data/heroVideos";

describe("HeroBackdrop", () => {
  it("keeps the poster as the eager server-rendered LCP image without a video element", () => {
    const markup = renderToStaticMarkup(createElement(HeroBackdrop, {
      src: "/images/about/about-hero-executive-1600.webp",
      video: HERO_VIDEOS.about,
    }));

    expect(markup).toContain(`<img src="${HERO_VIDEOS.about.poster}"`);
    expect(markup.toLowerCase()).toContain('fetchpriority="high"');
    expect(markup).not.toContain("<video");
  });
});
