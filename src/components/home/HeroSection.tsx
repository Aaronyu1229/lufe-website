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
    id: "pillar-fit",
    chipLabel: "核心 · 產品適配性",
    chipHref: "/services#pillar-fit",
    eyebrow: "核心服務 · 01 · 第一年",
    titleLines: ["協助台灣企業", "在北美與東南亞落地"],
    subtitle: "這個市場真的要你嗎？市場評估、產品測試、決策框架 — 先把勝率搞清楚。",
    primary: { label: "看真實案例", href: "/cases" },
    secondary: { label: "你跟哪個案例最像？", href: "/assess" },
    media: {
      type: "video",
      src: "/videos/hero/hero-cai-mep-1080.mp4",
      portraitSrc: "/videos/hero/hero-portrait-720.mp4",
      poster: "/images/hero/hero-poster.jpg",
      playbackRate: 1.0,
    },
  },
  {
    id: "pillar-channel",
    chipLabel: "核心 · 通路銷售力",
    chipHref: "/services#pillar-channel",
    eyebrow: "核心服務 · 02 · 第一年",
    titleLines: ["上得了架", "還要賣得動"],
    subtitle: "通路進入、展會佈局、數位集客 — 把產品放進對的通路，讓消費者找得到。",
    primary: { label: "看完整服務內容", href: "/services" },
    secondary: { label: "你跟哪個案例最像？", href: "/assess" },
    media: {
      type: "video",
      src: "/videos/hero/hero-map-planning-1080.mp4",
      poster: "/images/hero/hero-slide-2-poster.jpg",
      playbackRate: 1.0,
    },
  },
  {
    id: "logistics-moat",
    chipLabel: "底氣 · 42 年國際物流",
    chipHref: "/about",
    eyebrow: "真正的底氣 · 躍馬 42 年",
    titleLines: ["真的跑過船的人，", "才懂出海的眉角"],
    subtitle: "從報關、倉儲到最後一哩 — 不是教科書讀來的，是 42 年港口、海關、貨櫃場跑出來的。",
    primary: { label: "認識躍馬國際", href: "/about" },
    secondary: { label: "看完整服務內容", href: "/services" },
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
  // Only mount videos as they approach being active — keeps initial page load lean.
  // Slide 0 mounts immediately (LCP); others mount when they become the active index.
  const [mountedMap, setMountedMap] = useState<Record<number, boolean>>({ 0: true });
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

  // Mount the active slide and warm up the next one so its video is ready before
  // the cross-fade. Never un-mounts to avoid re-downloading once seen.
  useEffect(() => {
    const nextIndex = (activeIndex + 1) % slides.length;
    setMountedMap((prev) => {
      if (prev[activeIndex] && prev[nextIndex]) return prev;
      return { ...prev, [activeIndex]: true, [nextIndex]: true };
    });
  }, [activeIndex]);

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
        const mounted = mountedMap[i] ?? false;
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
            {mounted && (
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
            )}
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

      {/* Bottom slide navigator — Bain-style distributed bar */}
      <div className="absolute left-0 right-0 bottom-0 z-10 border-t border-white/10 bg-gradient-to-t from-black/30 to-transparent backdrop-blur-[2px]">
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 h-[60px] md:h-[76px] flex items-stretch">
          {slides.map((slide, i) => {
            const isActive = i === activeIndex;
            return (
              <Link
                key={slide.id}
                href={slide.chipHref}
                onMouseEnter={() => goTo(i)}
                onFocus={() => goTo(i)}
                aria-current={isActive ? "true" : undefined}
                className={`relative flex-1 min-w-0 flex items-center justify-center text-center px-2 text-[12px] md:text-[13px] tracking-[0.3px] transition-colors duration-300 cursor-pointer ${
                  isActive
                    ? "text-white font-semibold"
                    : "text-white/55 hover:text-white/85 font-medium"
                }`}
              >
                <span className="truncate">{slide.chipLabel}</span>
                {/* Track — full width of slot */}
                <span className="absolute left-0 right-0 bottom-0 h-[2px] bg-white/10" />
                {/* Progress fill — spans full slot width */}
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
      </div>
    </section>
  );
}
