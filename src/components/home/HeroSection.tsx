"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useMessageBox } from "../MessageBox";

interface Slide {
  readonly image: string;
  readonly headline: string;
  readonly subtitle: string;
  readonly cta: string;
  readonly action: "message" | { href: string };
}

const SLIDES: readonly Slide[] = [
  {
    image: "/hero-bg.jpg",
    headline: "好產品值得一條順暢的出海路",
    subtitle: "從市場驗證到落地營運，我們陪你走完全程。",
    cta: "兩分鐘免費評估 →",
    action: { href: "/assess" },
  },
  {
    image: "/hero-2.jpg",
    headline: "六個月，從台灣到北美 Costco",
    subtitle: "真實案例，真實成果。",
    cta: "看案例 →",
    action: { href: "/cases" },
  },
  {
    image: "/hero-3.jpg",
    headline: "出海不是冒險，是有計畫的探索",
    subtitle: "不確定從哪開始？聊聊你的產品。",
    cta: "聊聊你的產品 →",
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
      className="min-h-screen relative overflow-hidden flex items-center"
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
    >
      {/* Background slides with crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          role="group"
          aria-roledescription="slide"
          aria-label={`${current + 1} / ${SLIDES.length}: ${slide.headline}`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url('${slide.image}')` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy/60" />
        </motion.div>
      </AnimatePresence>

      {/* Left / Right arrows */}
      <button
        onClick={goBack}
        aria-label="上一張"
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 hidden md:flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white/70 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M11 4L6 9L11 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      <button
        onClick={advance}
        aria-label="下一張"
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-10 w-10 h-10 hidden md:flex items-center justify-center rounded-full bg-white/10 backdrop-blur-sm text-white/70 hover:bg-white/20 hover:text-white transition-colors cursor-pointer"
      >
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
          <path d="M7 4L12 9L7 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 pt-[140px] md:pt-[180px] pb-[80px] md:pb-[120px] relative z-10">
        <div className="max-w-[680px]">
          <div className="inline-block border-b-2 border-gold/40 text-gold text-[12.5px] font-medium mb-8 tracking-[1.5px] uppercase pb-1">
            企業出海的導航系統
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
            >
              <h1
                className="font-sans text-white leading-[1.1] mb-6 font-bold tracking-[-1.5px]"
                style={{ fontSize: "clamp(32px, 5.5vw, 68px)" }}
              >
                {slide.headline}
              </h1>

              <p className="text-[18px] text-white/70 font-normal mb-10">
                {slide.subtitle}
              </p>

              {slide.action === "message" ? (
                <button
                  onClick={open}
                  className="bg-gold text-navy px-8 py-4 rounded-none text-[15px] font-semibold cursor-pointer transition-all hover:bg-gold-l"
                >
                  {slide.cta}
                </button>
              ) : (
                <Link
                  href={slide.action.href}
                  className="inline-block bg-gold text-navy px-8 py-4 rounded-none text-[15px] font-semibold transition-all hover:bg-gold-l"
                >
                  {slide.cta}
                </Link>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation dots — 44x44 touch target with visual dot inside */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex gap-0">
        {SLIDES.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`前往第 ${i + 1} 張`}
            aria-current={i === current ? "true" : undefined}
            className="w-11 h-11 flex items-center justify-center cursor-pointer"
          >
            <span className={`block w-2.5 h-2.5 rounded-full transition-colors duration-300 ${
              i === current ? "bg-gold" : "bg-white/40"
            }`} />
          </button>
        ))}
      </div>
    </section>
  );
}
