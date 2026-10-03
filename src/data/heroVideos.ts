export interface HeroVideo {
  readonly src: string;
  readonly srcHd?: string;
  readonly poster: string;
  readonly posterSrcSet: string;
  readonly playbackRate: number;
  readonly position?: string;
}

// Every subpage hero plays at 0.8x so nothing reads as fast-forward (Aaron, 2026-10-03; supersedes DECISIONS-R4 H-4). The home hero sets its own rates.
export const HERO_VIDEOS = {
  about: {
    src: "/videos/hero/about-sailing-720.mp4",
    poster: "/images/hero-video/about-sailing-1600.webp",
    posterSrcSet: "/images/hero-video/about-sailing-640.webp 640w, /images/hero-video/about-sailing-1080.webp 1080w, /images/hero-video/about-sailing-1600.webp 1600w",
    playbackRate: 0.8,
  },
  author: {
    src: "/videos/hero/insights-notebook-720.mp4",
    poster: "/images/hero-video/insights-notebook-1600.webp",
    posterSrcSet: "/images/hero-video/insights-notebook-640.webp 640w, /images/hero-video/insights-notebook-1080.webp 1080w, /images/hero-video/insights-notebook-1600.webp 1600w, /images/hero-video/insights-notebook-2400.webp 2400w",
    playbackRate: 0.8,
  },
  cases: {
    src: "/videos/hero/cases-skyline-720.mp4",
    poster: "/images/hero-video/cases-skyline-1600.webp",
    posterSrcSet: "/images/hero-video/cases-skyline-640.webp 640w, /images/hero-video/cases-skyline-1080.webp 1080w, /images/hero-video/cases-skyline-1600.webp 1600w, /images/hero-video/cases-skyline-2400.webp 2400w",
    playbackRate: 0.8,
  },
  "case:goat-milk-soap-global": {
    src: "/videos/hero/case-soap-720.mp4",
    poster: "/images/hero-video/case-soap-1600.webp",
    posterSrcSet: "/images/hero-video/case-soap-640.webp 640w, /images/hero-video/case-soap-1080.webp 1080w, /images/hero-video/case-soap-1600.webp 1600w, /images/hero-video/case-soap-2400.webp 2400w",
    playbackRate: 0.8,
  },
  "case:fish-floss-us-fda": {
    src: "/videos/hero/case-floss-720.mp4",
    poster: "/images/hero-video/case-floss-1600.webp",
    posterSrcSet: "/images/hero-video/case-floss-640.webp 640w, /images/hero-video/case-floss-1080.webp 1080w, /images/hero-video/case-floss-1600.webp 1600w, /images/hero-video/case-floss-2400.webp 2400w",
    playbackRate: 0.8,
  },
  "case:bubble-tea": {
    src: "/videos/hero/case-bubbletea-720.mp4",
    poster: "/images/hero-video/case-bubbletea-1600.webp",
    posterSrcSet: "/images/hero-video/case-bubbletea-640.webp 640w, /images/hero-video/case-bubbletea-1080.webp 1080w, /images/hero-video/case-bubbletea-1600.webp 1600w, /images/hero-video/case-bubbletea-2400.webp 2400w",
    playbackRate: 0.8,
  },
  assess: {
    src: "/videos/hero/assess-chess-720.mp4",
    poster: "/images/hero-video/assess-chess-1600.webp",
    posterSrcSet: "/images/hero-video/assess-chess-640.webp 640w, /images/hero-video/assess-chess-1080.webp 1080w, /images/hero-video/assess-chess-1600.webp 1600w, /images/hero-video/assess-chess-2400.webp 2400w",
    playbackRate: 0.8,
  },
  insights: {
    src: "/videos/hero/insights-notebook-720.mp4",
    poster: "/images/hero-video/insights-notebook-1600.webp",
    posterSrcSet: "/images/hero-video/insights-notebook-640.webp 640w, /images/hero-video/insights-notebook-1080.webp 1080w, /images/hero-video/insights-notebook-1600.webp 1600w, /images/hero-video/insights-notebook-2400.webp 2400w",
    playbackRate: 0.8,
  },
  resources: {
    src: "/videos/hero/resources-books-720.mp4",
    poster: "/images/hero-video/resources-books-1600.webp",
    posterSrcSet: "/images/hero-video/resources-books-640.webp 640w, /images/hero-video/resources-books-1080.webp 1080w, /images/hero-video/resources-books-1600.webp 1600w",
    playbackRate: 0.8,
  },
  contact: {
    src: "/videos/hero/contact-laptop-720.mp4",
    poster: "/images/hero-video/contact-laptop-1600.webp",
    posterSrcSet: "/images/hero-video/contact-laptop-640.webp 640w, /images/hero-video/contact-laptop-1080.webp 1080w, /images/hero-video/contact-laptop-1600.webp 1600w",
    playbackRate: 0.8,
  },
  subsidies: {
    src: "/videos/hero/subsidies-desk-720.mp4",
    poster: "/images/hero-video/subsidies-desk-1600.webp",
    posterSrcSet: "/images/hero-video/subsidies-desk-640.webp 640w, /images/hero-video/subsidies-desk-1080.webp 1080w, /images/hero-video/subsidies-desk-1600.webp 1600w, /images/hero-video/subsidies-desk-2400.webp 2400w",
    playbackRate: 0.8,
  },
  services: {
    src: "/videos/hero/services-port-720.mp4",
    poster: "/images/hero-video/services-port-1600.webp",
    posterSrcSet: "/images/hero-video/services-port-640.webp 640w, /images/hero-video/services-port-1080.webp 1080w, /images/hero-video/services-port-1600.webp 1600w, /images/hero-video/services-port-2400.webp 2400w",
    playbackRate: 0.8,
  },
  "chapter:m1": {
    src: "/videos/hero/chapter-research-720.mp4",
    poster: "/images/hero-video/chapter-research-1600.webp",
    posterSrcSet: "/images/hero-video/chapter-research-640.webp 640w, /images/hero-video/chapter-research-1080.webp 1080w, /images/hero-video/chapter-research-1600.webp 1600w, /images/hero-video/chapter-research-2400.webp 2400w",
    playbackRate: 0.8,
  },
  "chapter:m3": {
    src: "/videos/hero/chapter-warehouse-720.mp4",
    poster: "/images/hero-video/chapter-warehouse-1600.webp",
    posterSrcSet: "/images/hero-video/chapter-warehouse-640.webp 640w, /images/hero-video/chapter-warehouse-1080.webp 1080w, /images/hero-video/chapter-warehouse-1600.webp 1600w, /images/hero-video/chapter-warehouse-2400.webp 2400w",
    playbackRate: 0.8,
  },
  "chapter:m9": {
    src: "/videos/hero/chapter-storefront-720.mp4",
    poster: "/images/hero-video/chapter-storefront-1600.webp",
    posterSrcSet: "/images/hero-video/chapter-storefront-640.webp 640w, /images/hero-video/chapter-storefront-1080.webp 1080w, /images/hero-video/chapter-storefront-1600.webp 1600w, /images/hero-video/chapter-storefront-2400.webp 2400w",
    playbackRate: 0.8,
  },
  "chapter:after": {
    src: "/videos/hero/chapter-callcenter-720.mp4",
    poster: "/images/hero-video/chapter-callcenter-1600.webp",
    posterSrcSet: "/images/hero-video/chapter-callcenter-640.webp 640w, /images/hero-video/chapter-callcenter-1080.webp 1080w, /images/hero-video/chapter-callcenter-1600.webp 1600w",
    playbackRate: 0.8,
    position: "right center",
  },
  "chapter:na": {
    src: "/videos/hero/na-skyline-720.mp4",
    srcHd: "/videos/hero/na-skyline-1080.mp4",
    poster: "/images/hero-video/na-skyline-1600.webp",
    posterSrcSet: "/images/hero-video/na-skyline-640.webp 640w, /images/hero-video/na-skyline-1080.webp 1080w, /images/hero-video/na-skyline-1600.webp 1600w, /images/hero-video/na-skyline-2400.webp 2400w",
    playbackRate: 0.8,
  },
  optimize: {
    src: "/videos/hero/optimize-containers-720.mp4",
    poster: "/images/hero-video/optimize-containers-1600.webp",
    posterSrcSet: "/images/hero-video/optimize-containers-640.webp 640w, /images/hero-video/optimize-containers-1080.webp 1080w, /images/hero-video/optimize-containers-1600.webp 1600w, /images/hero-video/optimize-containers-2400.webp 2400w",
    playbackRate: 0.8,
  },
  methodology: {
    src: "/videos/hero/methodology-whiteboard-720.mp4",
    poster: "/images/hero-video/methodology-whiteboard-1600.webp",
    posterSrcSet: "/images/hero-video/methodology-whiteboard-640.webp 640w, /images/hero-video/methodology-whiteboard-1080.webp 1080w, /images/hero-video/methodology-whiteboard-1600.webp 1600w, /images/hero-video/methodology-whiteboard-2400.webp 2400w",
    playbackRate: 0.8,
  },
} as const satisfies Record<string, HeroVideo>;
