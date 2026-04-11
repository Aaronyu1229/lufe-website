"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

type SlideMedia = {
  type: "video";
  src: string;
  portraitSrc?: string;
  poster: string;
  playbackRate?: number;
};

type Slide = {
  id: string;
  chipLabel: string;
  chipHref: string;
  eyebrow: string;
  titleLines: [string, string];
  subtitle: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
  media: SlideMedia;
};

const slides: Slide[] = [
  {
    id: "stage-1",
    chipLabel: "不確定能不能出海",
    chipHref: "/services",
    eyebrow: "企業出海導航",
    titleLines: ["好產品值得一條", "順暢的出海路"],
    subtitle: "從市場驗證到落地營運，我們陪你走完全程。",
    primary: { label: "免費評估你的產品", href: "/assess" },
    secondary: { label: "看完整出海路徑", href: "/services" },
    media: {
      type: "video",
      src: "/videos/hero/hero-cai-mep-1080.mp4",
      portraitSrc: "/videos/hero/hero-portrait-720.mp4",
      poster: "/images/hero/hero-poster.jpg",
      playbackRate: 1.0,
    },
  },
  {
    id: "stage-2",
    chipLabel: "準備出海找方向",
    chipHref: "/services/market-assessment",
    eyebrow: "出海路徑規劃",
    titleLines: ["方向對了", "後面都省力"],
    subtitle: "選對市場、定好節奏、鋪好通路——一次講清楚。",
    primary: { label: "看完整出海路徑", href: "/services" },
    secondary: { label: "兩分鐘測一下", href: "/assess" },
    media: {
      type: "video",
      src: "/videos/hero/hero-map-planning-1080.mp4",
      poster: "/images/hero/hero-slide-2-poster.jpg",
      playbackRate: 1.0,
    },
  },
  {
    id: "stage-3",
    chipLabel: "出海中想優化",
    chipHref: "/services/optimize",
    eyebrow: "進階優化方案",
    titleLines: ["跑起來了", "該讓每公里更省"],
    subtitle: "成本、效率、合規同步優化，放大獲利空間。",
    primary: { label: "看進階優化方案", href: "/services#optimize" },
    secondary: { label: "直接聊聊", href: "/contact" },
    media: {
      type: "video",
      src: "/videos/hero/hero-highway-aerial-1080.mp4",
      poster: "/images/hero/hero-slide-3-poster.jpg",
      playbackRate: 1.0,
    },
  },
];

const AUTOPLAY_MS = 10000;

export function HeroSection() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [readyMap, setReadyMap] = useState<Record<number, boolean>>({});
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);
  const progressKey = useRef(0);

  // Detect portrait orientation
  useEffect(() => {
    const mql = window.matchMedia("(max-aspect-ratio: 1/1)");
    const update = () => setIsPortrait(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // Respect reduced motion
  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setPrefersReducedMotion(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  // Autoplay carousel
  useEffect(() => {
    if (paused || prefersReducedMotion) return;
    const timer = window.setTimeout(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [activeIndex, paused, prefersReducedMotion]);

  // Play the active slide's video; pause the others. Apply per-slide playbackRate.
  useEffect(() => {
    videoRefs.current.forEach((video, i) => {
      if (!video) return;
      if (i === activeIndex) {
        const rate = slides[i].media.playbackRate ?? 1.0;
        video.playbackRate = rate;
        video.currentTime = 0;
        const playPromise = video.play();
        if (playPromise) playPromise.catch(() => {});
      } else {
        video.pause();
      }
    });
  }, [activeIndex, isPortrait]);

  // Bump progress key on every slide change so the fill bar animation restarts
  progressKey.current += 1;

  const goTo = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const handleCanPlay = (index: number) => {
    setReadyMap((prev) => (prev[index] ? prev : { ...prev, [index]: true }));
  };

  const active = slides[activeIndex];

  return (
    <section
      className="h-screen min-h-[640px] relative overflow-hidden flex items-center"
      role="region"
      aria-label="好產品值得一條順暢的出海路"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Layered backgrounds — cross-fade between slides */}
      {slides.map((slide, i) => {
        const isActive = i === activeIndex;
        const useSrc =
          isPortrait && slide.media.portraitSrc
            ? slide.media.portraitSrc
            : slide.media.src;
        const ready = readyMap[i] ?? false;
        return (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
            style={{ opacity: isActive ? 1 : 0 }}
            aria-hidden="true"
          >
            {/* Poster underneath the video — always visible until video fades in */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url('${slide.media.poster}')` }}
            />
            <video
              ref={(el) => {
                videoRefs.current[i] = el;
              }}
              key={useSrc}
              className="bg-video"
              style={{
                opacity: ready ? 1 : 0,
                transition: "opacity 800ms ease-out",
              }}
              autoPlay={i === 0}
              loop
              muted
              playsInline
              preload={i === 0 ? "auto" : "metadata"}
              poster={slide.media.poster}
              onCanPlay={() => handleCanPlay(i)}
            >
              <source src={useSrc} type="video/mp4" />
            </video>
          </div>
        );
      })}

      {/* Directional overlay — stays above all slides */}
      <div className="bg-video-overlay" />

      {/* Content — keyed to remount on slide change for fade-in animation */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 relative z-10 w-full">
        <div key={active.id} className="max-w-[640px] animate-fade-in-up">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-5 h-px bg-gold/70" />
            <span className="text-gold/70 text-[11px] font-medium tracking-[2.5px] uppercase">
              {active.eyebrow}
            </span>
          </div>

          <h1
            className="font-sans text-white leading-[1.05] mb-7 font-extralight tracking-[-2px]"
            style={{ fontSize: "clamp(38px, 5.5vw, 68px)" }}
          >
            {active.titleLines[0]}
            <br />
            {active.titleLines[1]}
          </h1>

          <p className="text-[17px] text-white/60 font-normal mb-10 leading-relaxed max-w-[480px]">
            {active.subtitle}
          </p>

          <div className="flex items-center gap-8 flex-wrap">
            <Link
              href={active.primary.href}
              className="inline-block bg-gold text-navy px-8 py-[13px] rounded-none text-[13px] font-semibold tracking-[0.5px] transition-all hover:bg-gold-l"
            >
              {active.primary.label} →
            </Link>
            <Link
              href={active.secondary.href}
              className="group inline-flex items-center gap-2.5 text-white text-[14px] font-semibold tracking-[0.3px] transition-colors hover:text-gold"
            >
              <span className="border-b border-white/30 pb-0.5 group-hover:border-gold transition-colors">
                {active.secondary.label}
              </span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom slide navigator — Bain-style chip bar */}
      <div className="absolute left-0 right-0 bottom-0 z-10 border-t border-white/10 bg-gradient-to-t from-black/30 to-transparent backdrop-blur-[2px]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 h-[60px] md:h-[72px] flex items-center justify-between gap-4">
          {/* Chips */}
          <div className="flex items-center gap-5 md:gap-9 overflow-x-auto scrollbar-none h-full">
            {slides.map((slide, i) => {
              const isActive = i === activeIndex;
              return (
                <Link
                  key={slide.id}
                  href={slide.chipHref}
                  onMouseEnter={() => goTo(i)}
                  onFocus={() => goTo(i)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex-shrink-0 text-[12px] md:text-[13px] font-medium tracking-[0.3px] h-full flex items-center transition-colors duration-300 cursor-pointer ${
                    isActive ? "text-white" : "text-white/55 hover:text-white/85"
                  }`}
                >
                  {slide.chipLabel}
                  {/* Track */}
                  <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white/10" />
                  {/* Progress fill — only animates on active chip */}
                  <span
                    key={isActive ? `fill-${progressKey.current}` : `idle-${slide.id}`}
                    className={`absolute left-0 bottom-0 h-[2px] bg-gold origin-left ${
                      isActive && !paused && !prefersReducedMotion
                        ? "animate-hero-progress"
                        : isActive
                          ? "w-full"
                          : "w-0"
                    }`}
                  />
                </Link>
              );
            })}
          </div>

          {/* Slide counter */}
          <div className="hidden sm:flex items-center gap-3 text-white/60 flex-shrink-0 tabular-nums">
            <span className="text-[11px] font-medium tracking-[1.5px] text-white">
              {String(activeIndex + 1).padStart(2, "0")}
            </span>
            <span className="w-8 h-px bg-white/30" />
            <span className="text-[11px] font-medium tracking-[1.5px]">
              {String(slides.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
