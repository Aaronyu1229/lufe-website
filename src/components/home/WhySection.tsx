"use client";

import { useEffect, useRef, useState } from "react";

const coverageBars = [
  { label: "傳統顧問", width: "20%", marginLeft: "0%", text: "策略", variant: "default" as const },
  { label: "貿易商", width: "35%", marginLeft: "40%", text: "通路", variant: "default" as const },
  { label: "物流公司", width: "25%", marginLeft: "65%", text: "執行", variant: "default" as const },
  { label: "鹿飛 LUFÉ", width: "100%", marginLeft: "0%", text: "評估 → 測試 → 通路 → 物流 → 落地", variant: "lufe" as const },
];

const stats = [
  { target: 10, suffix: "+", label: "年國際物流實戰" },
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
    <section className="bg-navy py-[100px] md:py-[140px] px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold mb-3">
          為什麼是鹿飛
        </div>
        <h2 className="font-sans text-[clamp(28px,3.5vw,44px)] leading-[1.15] mb-3 font-bold tracking-[-0.5px] text-white">
          你不需要找三家公司
          <br />
          才能走完一條路
        </h2>
        <p className="text-[15px] text-white/60 max-w-[480px] leading-[1.7] mb-12 font-normal">
          市場上的選擇，每一家都只做你的一部分。鹿飛把它們串成一條線。
        </p>

        {/* Coverage bars */}
        <div className="mb-16">
          {coverageBars.map((bar) => (
            <div key={bar.label} className="flex items-center gap-4 mb-3.5">
              <div
                className={`w-[72px] md:w-[100px] text-[11px] md:text-[12.5px] text-right font-normal flex-shrink-0 ${
                  bar.variant === "lufe"
                    ? "text-gold font-medium"
                    : "text-white/60"
                }`}
              >
                {bar.label}
              </div>
              <div className="flex-1 h-8 bg-white/[0.03] rounded-none relative overflow-hidden">
                <div
                  className={`h-full rounded-none flex items-center px-2 md:px-3 text-[10px] md:text-[11px] font-medium text-white/70 whitespace-nowrap overflow-hidden ${
                    bar.variant === "lufe"
                      ? "bg-gradient-to-r from-[rgba(212,168,92,0.15)] to-[rgba(212,168,92,0.25)]"
                      : "bg-white/[0.08]"
                  }`}
                  style={{ width: bar.width, marginLeft: bar.marginLeft }}
                >
                  {bar.text}
                </div>
              </div>
            </div>
          ))}
          <div className="flex justify-between pl-[72px] md:pl-[116px] pr-0 md:pr-[16px] mt-2 text-[10px] md:text-[10.5px] text-white/30 font-normal">
            <span>市場評估</span>
            <span>產品測試</span>
            <span>通路進入</span>
            <span>物流執行</span>
            <span>落地營運</span>
          </div>
        </div>

        <div className="w-full h-px bg-white/5 mb-12" />

        {/* Stats */}
        <div
          ref={statsRef}
          className="flex justify-center gap-8 md:gap-16 flex-wrap"
        >
          {stats.map((stat, i) => (
            <div key={stat.label} className="text-center">
              <div className="font-sans text-[36px] text-gold font-semibold">
                {values[i]}
                {stat.suffix}
              </div>
              <div className="text-[12px] text-white/50 font-normal mt-0.5">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div className="mt-16 border-t border-gold/10 pt-8 p-5 md:p-8 rounded-none border-l-4 border-gold pl-5 md:pl-8 bg-white/[0.02] max-w-[600px] mx-auto flex flex-col md:flex-row gap-4 md:gap-5 items-center md:items-start text-center md:text-left">
          <div className="w-[52px] h-[52px] rounded-none bg-[rgba(212,168,92,0.15)] flex items-center justify-center text-[16px] font-semibold text-gold flex-shrink-0 font-sans">
            陳
          </div>
          <div>
            <q className="font-[var(--font-playfair)] text-[16px] text-white/70 italic leading-[1.6] font-normal block mb-2.5">
              「Aaron
              的團隊幫我們在 6
              個月內把產品從台灣帶進 Costco。從合規到通路，全程不用我們操心。」
            </q>
            <cite className="text-[12.5px] text-white/50 not-italic font-normal">
              陳先生 — 保健品品牌負責人
            </cite>
          </div>
        </div>
      </div>
    </section>
  );
}
