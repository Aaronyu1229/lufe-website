"use client";

import { useEffect, useRef, useState } from "react";

const coverageBars = [
  { label: "傳統顧問", width: "20%", marginLeft: "0%", text: "策略", variant: "default" as const },
  { label: "貿易商", width: "35%", marginLeft: "40%", text: "通路", variant: "default" as const },
  { label: "物流公司", width: "25%", marginLeft: "65%", text: "執行", variant: "default" as const },
  { label: "鹿飛 LUFÉ", width: "100%", marginLeft: "0%", text: "評估 → 測試 → 通路 → 物流 → 落地", variant: "lufe" as const },
];

const stats = [
  { target: 42, suffix: "+", label: "年國際物流實戰" },
  { target: 30, suffix: "+", label: "國家與地區覆蓋" },
  { target: 500, suffix: "+", label: "出口案件處理" },
  { target: 2400, suffix: "+", label: "人使用免費關稅工具" },
];

export function WhySection() {
  const [counted, setCounted] = useState(false);
  const [values, setValues] = useState<number[]>(stats.map(() => 0));
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !counted) {
          setCounted(true);
          const duration = 1500;
          const start = performance.now();

          function tick(now: number) {
            const progress = Math.min((now - start) / duration, 1);
            const ease = 1 - Math.pow(1 - progress, 3);
            setValues(stats.map((s) => Math.round(ease * s.target)));
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    const el = statsRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [counted]);

  return (
    <section className="relative bg-navy py-[96px] md:py-[128px] px-5 md:px-10 overflow-hidden">
      {/* Subtle gold radial accent — visual climax marker */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center top, rgba(212,168,92,0.10) 0%, rgba(212,168,92,0.03) 40%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <div className="text-[11.5px] font-semibold tracking-[2.5px] uppercase text-gold mb-4">
            為什麼是鹿飛
          </div>
          <h2 className="font-sans text-[clamp(32px,4.8vw,56px)] leading-[1.1] font-light tracking-[-0.8px] text-white max-w-[840px] mx-auto">
            你不需要找三家公司
            <br />
            才能走完<span className="text-gold font-normal">一條路</span>
          </h2>
          <p className="text-[16px] text-white/55 max-w-[520px] leading-[1.7] mx-auto mt-6 font-normal">
            市場上的選擇，每一家都只做你的一段。
            <br className="hidden md:block" />
            鹿飛把它們串成一條線。
          </p>
        </div>

        {/* Coverage bars — enlarged with more breathing room */}
        <div className="mb-20 md:mb-24 max-w-[960px] mx-auto">
          {coverageBars.map((bar) => (
            <div
              key={bar.label}
              className={`flex items-center gap-4 mb-3 py-3 md:py-3.5 px-3 md:px-4 rounded-none ${
                bar.variant === "lufe"
                  ? "bg-gold/[0.08] border border-gold/15"
                  : "bg-white/[0.02]"
              }`}
            >
              <div
                className={`w-[80px] md:w-[120px] text-[11px] md:text-[13px] text-right font-normal flex-shrink-0 flex items-center justify-end gap-1.5 ${
                  bar.variant === "lufe"
                    ? "text-gold font-semibold"
                    : "text-white/40"
                }`}
              >
                {bar.label}
              </div>
              <div className="flex-1 h-9 md:h-10 bg-white/[0.03] rounded-none relative overflow-hidden">
                <div
                  className={`h-full rounded-none flex items-center px-2 md:px-3 text-[10px] md:text-[12px] font-medium whitespace-nowrap overflow-hidden ${
                    bar.variant === "lufe"
                      ? "bg-gradient-to-r from-gold/25 to-gold/40 text-gold"
                      : "bg-white/[0.06] text-white/50"
                  }`}
                  style={{ width: bar.width, marginLeft: bar.marginLeft }}
                >
                  {bar.text}
                </div>
              </div>
              <div className="flex-shrink-0 w-5 text-center">
                {bar.variant === "lufe" ? (
                  <span className="text-gold text-[16px]">✓</span>
                ) : (
                  <span className="text-white/20 text-[15px]">✗</span>
                )}
              </div>
            </div>
          ))}
          <div className="flex justify-between pl-[84px] md:pl-[136px] pr-0 md:pr-[16px] mt-3 text-[10px] md:text-[11px] text-white/30 font-normal">
            <span>市場評估</span>
            <span>產品測試</span>
            <span>通路進入</span>
            <span>物流執行</span>
            <span>落地營運</span>
          </div>
        </div>

        {/* Stats — larger, more generous spacing */}
        <div
          ref={statsRef}
          className="flex justify-center gap-10 md:gap-20 flex-wrap mb-20"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="font-sans text-[44px] md:text-[56px] text-white font-extralight tabular-nums leading-none">
                {values[i]}
                <span className="text-gold">{stat.suffix}</span>
              </div>
              <div className="text-[12px] md:text-[13px] text-white/50 font-normal mt-2 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial — now from a different client than the Costco featured case */}
        <div className="max-w-[680px] mx-auto border-l-2 border-gold pl-6 md:pl-8">
          <q className="block text-[17px] md:text-[19px] text-white/85 italic leading-[1.7] font-light mb-4 font-[var(--font-playfair)]">
            鹿飛幫我們把產地從大陸轉到越南，光是關稅就省了 15%。
            從盤點稅則、找代工廠、到第一批貨順利出口，他們一條龍包辦，我只要做決策。
          </q>
          <div className="flex items-center gap-3 text-[12.5px] text-white/50 font-normal">
            <div className="w-9 h-9 rounded-none bg-gold/15 flex items-center justify-center text-gold text-[13px] font-semibold">
              林
            </div>
            <div>
              <div className="text-white/75 font-medium">林總</div>
              <div className="text-white/45">電子零組件大廠・美國市場</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
