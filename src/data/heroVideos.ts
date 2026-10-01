export interface HeroVideo {
  readonly src: string;
  readonly poster: string;
  readonly posterSrcSet: string;
  readonly position?: string;
}

export const HERO_VIDEOS = {
  about: {
    src: "/videos/hero/about-flight-720.mp4",
    poster: "/images/hero-video/about-flight-1600.webp",
    posterSrcSet: "/images/hero-video/about-flight-640.webp 640w, /images/hero-video/about-flight-1080.webp 1080w, /images/hero-video/about-flight-1600.webp 1600w, /images/hero-video/about-flight-2400.webp 2400w",
  },
  author: {
    src: "/videos/hero/insights-notebook-720.mp4",
    poster: "/images/hero-video/insights-notebook-1600.webp",
    posterSrcSet: "/images/hero-video/insights-notebook-640.webp 640w, /images/hero-video/insights-notebook-1080.webp 1080w, /images/hero-video/insights-notebook-1600.webp 1600w, /images/hero-video/insights-notebook-2400.webp 2400w",
  },
  cases: {
    src: "/videos/hero/cases-manila-720.mp4",
    poster: "/images/hero-video/cases-manila-1600.webp",
    posterSrcSet: "/images/hero-video/cases-manila-640.webp 640w, /images/hero-video/cases-manila-1080.webp 1080w, /images/hero-video/cases-manila-1600.webp 1600w",
  },
  "case:costco-health": {
    src: "/videos/hero/case-costco-720.mp4",
    poster: "/images/hero-video/case-costco-1600.webp",
    posterSrcSet: "/images/hero-video/case-costco-640.webp 640w, /images/hero-video/case-costco-1080.webp 1080w, /images/hero-video/case-costco-1600.webp 1600w, /images/hero-video/case-costco-2400.webp 2400w",
  },
  "case:electronics-tariff": {
    src: "/videos/hero/case-electronics-720.mp4",
    poster: "/images/hero-video/case-electronics-1600.webp",
    posterSrcSet: "/images/hero-video/case-electronics-640.webp 640w, /images/hero-video/case-electronics-1080.webp 1080w, /images/hero-video/case-electronics-1600.webp 1600w, /images/hero-video/case-electronics-2400.webp 2400w",
  },
  "case:shoe-brand": {
    src: "/videos/hero/case-shoe-720.mp4",
    poster: "/images/hero-video/case-shoe-1600.webp",
    posterSrcSet: "/images/hero-video/case-shoe-640.webp 640w, /images/hero-video/case-shoe-1080.webp 1080w, /images/hero-video/case-shoe-1600.webp 1600w, /images/hero-video/case-shoe-2400.webp 2400w",
  },
  "case:bubble-tea": {
    src: "/videos/hero/case-bubbletea-720.mp4",
    poster: "/images/hero-video/case-bubbletea-1600.webp",
    posterSrcSet: "/images/hero-video/case-bubbletea-640.webp 640w, /images/hero-video/case-bubbletea-1080.webp 1080w, /images/hero-video/case-bubbletea-1600.webp 1600w, /images/hero-video/case-bubbletea-2400.webp 2400w",
  },
  fieldNotes: {
    src: "/videos/hero/fieldnotes-conference-720.mp4",
    poster: "/images/hero-video/fieldnotes-conference-1600.webp",
    posterSrcSet: "/images/hero-video/fieldnotes-conference-640.webp 640w, /images/hero-video/fieldnotes-conference-1080.webp 1080w, /images/hero-video/fieldnotes-conference-1600.webp 1600w",
  },
  insights: {
    src: "/videos/hero/insights-notebook-720.mp4",
    poster: "/images/hero-video/insights-notebook-1600.webp",
    posterSrcSet: "/images/hero-video/insights-notebook-640.webp 640w, /images/hero-video/insights-notebook-1080.webp 1080w, /images/hero-video/insights-notebook-1600.webp 1600w, /images/hero-video/insights-notebook-2400.webp 2400w",
  },
  resources: {
    src: "/videos/hero/resources-taipei-720.mp4",
    poster: "/images/hero-video/resources-taipei-1600.webp",
    posterSrcSet: "/images/hero-video/resources-taipei-640.webp 640w, /images/hero-video/resources-taipei-1080.webp 1080w, /images/hero-video/resources-taipei-1600.webp 1600w, /images/hero-video/resources-taipei-2400.webp 2400w",
  },
  contact: {
    src: "/videos/hero/contact-laptop-720.mp4",
    poster: "/images/hero-video/contact-laptop-1600.webp",
    posterSrcSet: "/images/hero-video/contact-laptop-640.webp 640w, /images/hero-video/contact-laptop-1080.webp 1080w, /images/hero-video/contact-laptop-1600.webp 1600w",
  },
  subsidies: {
    src: "/videos/hero/subsidies-taipei-720.mp4",
    poster: "/images/hero-video/subsidies-taipei-1600.webp",
    posterSrcSet: "/images/hero-video/subsidies-taipei-640.webp 640w, /images/hero-video/subsidies-taipei-1080.webp 1080w, /images/hero-video/subsidies-taipei-1600.webp 1600w, /images/hero-video/subsidies-taipei-2400.webp 2400w",
  },
  services: {
    src: "/videos/hero/hero-map-planning-720.mp4",
    poster: "/images/hero/hero-slide-2-poster-1600.webp",
    posterSrcSet: "/images/hero/hero-slide-2-poster-828.webp 828w, /images/hero/hero-slide-2-poster-1600.webp 1600w, /images/hero/hero-slide-2-poster-2400.webp 2400w",
  },
  "chapter:m1": {
    src: "/videos/hero/chapter-research-720.mp4",
    poster: "/images/hero-video/chapter-research-1600.webp",
    posterSrcSet: "/images/hero-video/chapter-research-640.webp 640w, /images/hero-video/chapter-research-1080.webp 1080w, /images/hero-video/chapter-research-1600.webp 1600w, /images/hero-video/chapter-research-2400.webp 2400w",
  },
  "chapter:m3": {
    src: "/videos/hero/chapter-warehouse-720.mp4",
    poster: "/images/hero-video/chapter-warehouse-1600.webp",
    posterSrcSet: "/images/hero-video/chapter-warehouse-640.webp 640w, /images/hero-video/chapter-warehouse-1080.webp 1080w, /images/hero-video/chapter-warehouse-1600.webp 1600w, /images/hero-video/chapter-warehouse-2400.webp 2400w",
  },
  "chapter:m9": {
    src: "/videos/hero/chapter-storefront-720.mp4",
    poster: "/images/hero-video/chapter-storefront-1600.webp",
    posterSrcSet: "/images/hero-video/chapter-storefront-640.webp 640w, /images/hero-video/chapter-storefront-1080.webp 1080w, /images/hero-video/chapter-storefront-1600.webp 1600w, /images/hero-video/chapter-storefront-2400.webp 2400w",
  },
  "chapter:after": {
    src: "/videos/hero/chapter-callcenter-720.mp4",
    poster: "/images/hero-video/chapter-callcenter-1600.webp",
    posterSrcSet: "/images/hero-video/chapter-callcenter-640.webp 640w, /images/hero-video/chapter-callcenter-1080.webp 1080w, /images/hero-video/chapter-callcenter-1600.webp 1600w",
    position: "right center",
  },
  "chapter:na": {
    src: "/videos/hero/chapter-retail-720.mp4",
    poster: "/images/hero-video/chapter-retail-1600.webp",
    posterSrcSet: "/images/hero-video/chapter-retail-640.webp 640w, /images/hero-video/chapter-retail-1080.webp 1080w, /images/hero-video/chapter-retail-1600.webp 1600w, /images/hero-video/chapter-retail-2400.webp 2400w",
  },
  optimize: {
    src: "/videos/hero/hero-highway-aerial-720.mp4",
    poster: "/images/hero/hero-slide-3-poster-1600.webp",
    posterSrcSet: "/images/hero/hero-slide-3-poster-828.webp 828w, /images/hero/hero-slide-3-poster-1600.webp 1600w, /images/hero/hero-slide-3-poster-2400.webp 2400w",
  },
  methodology: {
    src: "/videos/hero/methodology-whiteboard-720.mp4",
    poster: "/images/hero-video/methodology-whiteboard-1600.webp",
    posterSrcSet: "/images/hero-video/methodology-whiteboard-640.webp 640w, /images/hero-video/methodology-whiteboard-1080.webp 1080w, /images/hero-video/methodology-whiteboard-1600.webp 1600w, /images/hero-video/methodology-whiteboard-2400.webp 2400w",
  },
} as const satisfies Record<string, HeroVideo>;
