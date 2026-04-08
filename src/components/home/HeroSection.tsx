"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useMessageBox } from "../MessageBox";

interface Slide {
  readonly image: string;
  readonly label: string;
  readonly headline: string;
  readonly subtitle: string;
  readonly cta: string;
  readonly action: "message" | { href: string };
}

const SLIDES: readonly Slide[] = [
  {
    image: "/hero-bg.jpg",
    label: "策略顧問",
    headline: "好產品值得一條\n順暢的出海路",
    subtitle: "從市場驗證到落地營運，我們陪你走完全程。",
    cta: "兩分鐘免費評估",
    action: { href: "/assess" },
  },
  {
    image: "/hero-2.jpg",
    label: "成功案例",
    headline: "六個月，從台灣\n到北美 Costco",
    subtitle: "真實案例，真實成果。",
    cta: "看案例",
    action: { href: "/cases" },
  },
  {
    image: "/hero-3.jpg",
    label: "開始對話",
    headline: "出海不是冒險\n是有計畫的探索",
    subtitle: "不確定從哪開始？聊聊你的產品。",
    cta: "聊聊你的產品",
    action: "message",
  },
] as const;

const INTERVAL_MS = 6000;

export function HeroSection() {
  const { open } = useMessageBox();
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef(0);

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % SLIDES.length);
  }, []);

  const goBack = useCallback(() => {
    setCurrent((prev) => (prev - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(advance, INTERVAL_MS);
    return () => clearInterval(id);
  }, [advance, paused]);

  const slide = SLIDES[current];

  return (
    <section
      className="h-[82vh] min-h-[560px] max-h-[860px] relative overflow-hidden flex items-center"
      role="region"
      aria-roledescription="carousel"
      aria-label="精選內容輪播"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={(e) => {
        touchStartX.current = e.touches[0].clientX;
      }}
      onTouchEnd={(e) => {
        const diff = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(diff) > 50) {
          if (diff < 0) advance();
          else goBack();
        }
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") advance();
        else if (e.key === "ArrowLeft") goBack();
      }}
      tabIndex={0}
    >
      {/* Background slides — all rendered, CSS opacity crossfade */}
      {SLIDES.map((s, i) => (
        <div
          key={s.image}
          className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          style={{ opacity: i === current ? 1 : 0 }}
          aria-hidden={i !== current}
        >
          <div
            className="absolute inset-0 bg-cover bg-center scale-[1.03]"
            style={{ backgroundImage: `url('${s.image}')` }}
          />
          <div className="absolute inset-0 bg-navy/75" />
        </div>
      ))}

      {/* Content */}
      <div
        className="max-w-[1400px] mx-auto px-5 md:px-10 lg:px-16 relative z-10 w-full"
        role="group"
        aria-roledescription="slide"
        aria-label={`${current + 1} / ${SLIDES.length}: ${slide.headline}`}
      >
        <div className="max-w-[640px]">
          <div key={current} className="animate-fade-in-up">
            {/* Eyebrow label — Bain-style category tag */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-5 h-px bg-gold/70" />
              <span className="text-gold/70 text-[11px] font-medium tracking-[2.5px] uppercase">
                {slide.label}
              </span>
            </div>

            <h1
              className="font-sans text-white leading-[1.08] mb-7 font-bold tracking-[-1.5px] whitespace-pre-line"
              style={{ fontSize: "clamp(34px, 5vw, 60px)" }}
            >
              {slide.headline}
            </h1>

            <p className="text-[17px] text-white/50 font-normal mb-10 leading-relaxed max-w-[440px]">
              {slide.subtitle}
            </p>

            {/* CTA — Bain-style text link with underline + arrow */}
            {slide.action === "message" ? (
              <button
                onClick={open}
                className="group inline-flex items-center gap-2.5 text-white text-[14px] font-semibold tracking-[0.3px] cursor-pointer transition-colors hover:text-gold"
              >
                <span className="border-b border-white/30 pb-0.5 group-hover:border-gold transition-colors">
                  {slide.cta}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M4 9H14M14 9L10 5M14 9L10 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <Link
                href={slide.action.href}
                className="group inline-flex items-center gap-2.5 text-white text-[14px] font-semibold tracking-[0.3px] transition-colors hover:text-gold"
              >
                <span className="border-b border-white/30 pb-0.5 group-hover:border-gold transition-colors">
                  {slide.cta}
                </span>
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                  className="transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path
                    d="M4 9H14M14 9L10 5M14 9L10 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Progress line indicators — Bain-style minimal */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`前往第 ${i + 1} 張`}
            aria-current={i === current ? "true" : undefined}
            className="py-3 px-0.5 cursor-pointer"
          >
            <div
              className={`rounded-full transition-all duration-500 h-[2px] ${
                i === current ? "w-10 bg-white/90" : "w-5 bg-white/20"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
