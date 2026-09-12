"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

type SlideMedia = {
  type: "video";
  src: string;
  portraitSrc?: string;
  /** Landscape cut re-encoded at 720p, for narrow viewports. */
  mobileSrc?: string;
  /** Widest tier the srcSet offers; also the src browsers fall back to. */
  posterFallback: string;
  posterSrcSet: string;
  playbackRate?: number;
};

type Slide = {
  id: string;
  heavyOverlay?: boolean;
  chipLabel: string;
  chipHref: string;
  eyebrow: string;
  titleLines: [string, string];
  subtitle: string;
  primary: { label: string; href: string; external?: boolean };
  secondary: { label: string; href: string };
  media: SlideMedia;
};

const slides: Slide[] = [
  {
    id: "pillar-fit",
    heavyOverlay: true,
    chipLabel: "產品適配性",
    chipHref: "/services#pillar-fit",
    eyebrow: "產品適配性",
    titleLines: ["協助台灣企業", "在北美與東南亞落地"],
    subtitle: "這個市場真的要你嗎？市場評估、產品測試、決策框架 — 先把勝率搞清楚。",
    primary: { label: "看真實案例", href: "/cases" },
    secondary: { label: "你跟哪個案例最像？", href: "/assess" },
    media: {
      type: "video",
      src: "/videos/hero/hero-cai-mep-1080.mp4",
      portraitSrc: "/videos/hero/hero-portrait-720.mp4",
      posterFallback: "/images/hero/hero-poster-1600.webp",
      posterSrcSet:
        "/images/hero/hero-poster-828.webp 828w, " +
        "/images/hero/hero-poster-1600.webp 1600w, " +
        "/images/hero/hero-poster-1920.webp 1920w",
      // Aerial container-ship footage reads slower than the other two slides
      // because the subject fills the frame. Nudged up to match their pace.
      playbackRate: 1.25,
    },
  },
  {
    id: "pillar-channel",
    chipLabel: "通路銷售力",
    chipHref: "/services#pillar-channel",
    eyebrow: "通路銷售力",
    titleLines: ["上得了架", "還要賣得動"],
    subtitle: "通路進入、展會佈局、數位集客 — 把產品放進對的通路，讓消費者找得到。",
    primary: { label: "看完整服務內容", href: "/services" },
    secondary: { label: "你跟哪個案例最像？", href: "/assess" },
    media: {
      type: "video",
      src: "/videos/hero/hero-map-planning-1080.mp4",
      mobileSrc: "/videos/hero/hero-map-planning-720.mp4",
      posterFallback: "/images/hero/hero-slide-2-poster-1600.webp",
      posterSrcSet:
        "/images/hero/hero-slide-2-poster-828.webp 828w, " +
        "/images/hero/hero-slide-2-poster-1600.webp 1600w, " +
        "/images/hero/hero-slide-2-poster-2400.webp 2400w",
      playbackRate: 1.0,
    },
  },
  {
    id: "logistics-moat",
    heavyOverlay: true,
    chipLabel: "基石 · 42 年國際物流",
    chipHref: "/about",
    eyebrow: "躍馬企業 · 42 年實戰",
    titleLines: ["真的跑過船的人，", "才懂出海的眉角"],
    subtitle: "出海不是報告寫得出來的。鹿飛站在躍馬企業 42 年的國際物流實戰上，幫你把產品適配跟通路銷售兩件事跑通。",
    primary: { label: "認識躍馬企業", href: "https://jumping.group", external: true },
    secondary: { label: "看完整服務內容", href: "/services" },
    media: {
      type: "video",
      src: "/videos/hero/hero-highway-aerial-1080.mp4",
      mobileSrc: "/videos/hero/hero-highway-aerial-720.mp4",
      posterFallback: "/images/hero/hero-slide-3-poster-1600.webp",
      posterSrcSet:
        "/images/hero/hero-slide-3-poster-828.webp 828w, " +
        "/images/hero/hero-slide-3-poster-1600.webp 1600w, " +
        "/images/hero/hero-slide-3-poster-2400.webp 2400w",
      playbackRate: 1.0,
    },
  },
];

const AUTOPLAY_MS = 10000;

export function HeroSection() {
  const [isPortrait, setIsPortrait] = useState(false);
  const [rotationKey, setRotationKey] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [readyMap, setReadyMap] = useState<Record<number, boolean>>({});
  // Only mount videos as they approach being active — keeps initial page load lean.
  // Slide 0 mounts immediately (LCP); others mount when they become the active index.
  const [mountedMap, setMountedMap] = useState<Record<number, boolean>>({ 0: true });
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  // Detect portrait orientation
  useEffect(() => {
    const mql = window.matchMedia("(max-aspect-ratio: 1/1)");
    setIsPortrait(mql.matches);
    // Only a real rotation bumps the key. The first reading must not, or the
    // <video> would remount right after hydration and re-fetch what the
    // browser already picked from the <source media> list.
    const onChange = () => {
      setIsPortrait(mql.matches);
      setRotationKey((k) => k + 1);
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
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
      if (i !== activeIndex) {
        video.pause();
        return;
      }
      // playbackRate is tuned for the landscape footage. The portrait cuts are
      // close-ups of people, where speed changes read as unnatural, so they
      // always play at 1x.
      const usingPortrait = isPortrait && !!slides[i].media.portraitSrc;
      video.playbackRate = usingPortrait ? 1.0 : slides[i].media.playbackRate ?? 1.0;
      // Already playing (or already asked to): don't restart it. play()/pause()
      // flip `paused` synchronously, so it is a reliable "did we ask" flag.
      if (!video.paused) return;
      video.currentTime = 0;
      const playPromise = video.play();
      if (playPromise) playPromise.catch(() => {});
    });
    // mountedMap matters: a slide jumped to directly is mounted one render
    // later than this effect first runs, and without it nothing ever plays it.
  }, [activeIndex, isPortrait, mountedMap]);

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
        const ready = readyMap[i] ?? false;
        const mounted = mountedMap[i] ?? false;
        return (
          <div
            key={slide.id}
            className="absolute inset-0 transition-opacity duration-[900ms] ease-out"
            style={{
              opacity: isActive ? 1 : 0,
              filter: slide.heavyOverlay ? "brightness(0.74)" : undefined,
            }}
            aria-hidden="true"
          >
            {/* Poster underneath the video — always visible until video fades in.
                An <img srcSet> instead of a CSS background: a background-image is
                one fixed URL, so phones were being served the 4096px original.
                Not next/image: this is one of three absolutely-positioned layers
                that cross-fade, and the WebP tiers are already committed, so the
                optimizer would only add billed transforms. */}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={slide.media.posterFallback}
              srcSet={slide.media.posterSrcSet}
              sizes="100vw"
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            {mounted && (
              <video
                ref={(el) => {
                  videoRefs.current[i] = el;
                }}
                key={`${slide.id}-${rotationKey}`}
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
                onCanPlay={() => handleCanPlay(i)}
              >
                {/* Landscape comes first; both sources require motion preference so
                    reduced-motion users retain the poster without downloading video. */}
                <source
                  media="(prefers-reduced-motion: no-preference) and (min-aspect-ratio: 1/1)"
                  src={slide.media.src}
                  type="video/mp4"
                />
                <source
                  media="(prefers-reduced-motion: no-preference)"
                  src={slide.media.portraitSrc ?? slide.media.mobileSrc ?? slide.media.src}
                  type="video/mp4"
                />
              </video>
            )}
          </div>
        );
      })}

      {/* Directional overlay — stays above all slides */}
      <div
        className={`bg-video-overlay${active.heavyOverlay ? " bg-video-overlay-heavy" : ""}`}
      />

      {/* SEO: single stable H1 for the homepage. Visible H2 rotates per slide. */}
      <h1 className="sr-only">
        協助台灣企業在北美與東南亞落地 — 鹿飛 LUFÉ
      </h1>

      {/* Content — keyed to remount on slide change for fade-in animation */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 relative z-10 w-full">
        <div key={active.id} className="max-w-[640px] animate-fade-in-up">
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-5 h-px bg-gold/92" />
            <span className="text-gold/92 text-[11px] font-medium tracking-[2.5px] uppercase">
              {active.eyebrow}
            </span>
          </div>

          <h2
            className="hero-title font-sans text-white leading-[1.05] mb-7 tracking-[-2px]"
            style={{
              fontSize: "clamp(38px, 5.5vw, 68px)",
              textShadow: "0 1px 2px rgba(10,20,40,0.35)",
            }}
          >
            {active.titleLines[0]}
            <br />
            {active.titleLines[1]}
          </h2>

          <p
            className="text-[18px] text-white/88 font-normal mb-10 leading-relaxed max-w-[480px]"
            style={{ textShadow: "0 1px 2px rgba(10,20,40,0.3)" }}
          >
            {active.subtitle}
          </p>

          <div className="flex items-center gap-8 flex-wrap">
            {active.primary.external ? (
              <a
                href={active.primary.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-gold text-navy px-8 py-[13px] rounded-none text-[14.5px] font-semibold tracking-[0.5px] transition-all hover:bg-gold-l"
              >
                {active.primary.label} ↗
              </a>
            ) : (
              <Link
                href={active.primary.href}
                className="inline-block bg-gold text-navy px-8 py-[13px] rounded-none text-[14.5px] font-semibold tracking-[0.5px] transition-all hover:bg-gold-l"
              >
                {active.primary.label} →
              </Link>
            )}
            <Link
              href={active.secondary.href}
              className="group inline-flex items-center gap-2.5 text-white text-[15.5px] font-semibold tracking-[0.3px] transition-colors hover:text-gold"
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
                className={`relative flex-1 min-w-0 flex items-center justify-center text-center px-2 text-[13px] md:text-[14.5px] tracking-[0.3px] transition-colors duration-300 cursor-pointer ${
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
                  // activeIndex changes on every slide change, which is exactly
                  // when the fill animation should restart. A ref bumped in the
                  // render body restarted it on every unrelated re-render too.
                  key={isActive ? `fill-${activeIndex}` : `idle-${slide.id}`}
                  style={{ animationDuration: `${AUTOPLAY_MS}ms` }}
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
