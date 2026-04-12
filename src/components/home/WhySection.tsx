"use client";

import { useEffect, useRef, useState } from "react";

const PILLARS = ["產品適配", "通路銷售", "國際物流"] as const;

type CoverageRow = {
  label: string;
  note: string;
  pillars: readonly [boolean, boolean, boolean];
  variant: "default" | "lufe";
};

const coverage: readonly CoverageRow[] = [
  {
    label: "傳統顧問",
    note: "只出策略報告",
    pillars: [true, false, false],
    variant: "default",
  },
  {
    label: "貿易商",
    note: "只做中段通路",
    pillars: [false, true, false],
    variant: "default",
  },
  {
    label: "貨代 / 物流商",
    note: "只跑後段運輸",
    pillars: [false, false, true],
    variant: "default",
  },
  {
    label: "鹿飛 LUFÉ",
    note: "三件事全程自營",
    pillars: [true, true, true],
    variant: "lufe",
  },
];

type Stat = {
  target: number;
  suffix: string;
  label: string;
};

const stats: readonly Stat[] = [
  { target: 42, suffix: "+", label: "年國際物流底層" },
  { target: 30, suffix: "+", label: "國家與地區覆蓋" },
  { target: 500, suffix: "+", label: "出海案件經驗" },
  { target: 3, suffix: "", label: "支柱全程自營" },
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
    return () => {
      if (el) observer.unobserve(el);
    };
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
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <div className="text-[11.5px] font-semibold tracking-[2.5px] uppercase text-gold mb-4">
            適配 · 通路 · 物流 · 一個團隊
          </div>
          <h2 className="font-sans text-[clamp(32px,4.8vw,56px)] leading-[1.1] font-light tracking-[-0.8px] text-white max-w-[880px] mx-auto">
            從評估市場到貨上架，
            <br />
            你面對的<span className="text-gold font-normal">只有我們</span>
          </h2>
          <p className="text-[17px] text-white/55 max-w-[640px] leading-[1.8] mx-auto mt-6 font-normal">
            產品適配、通路銷售、躍馬 42 年國際物流 ——
            <br className="hidden md:block" />
            不是三家拼起來的拼盤，是一個團隊從頭跑到尾。一個專案經理、一份合約、一條進度線。
          </p>
        </div>

        {/* Coverage matrix — 3-pillar grid per row */}
        <div className="mb-20 md:mb-24 max-w-[900px] mx-auto">
          {/* Pillar header row */}
          <div className="flex items-end gap-3 md:gap-4 mb-4 pl-[92px] md:pl-[148px] pr-[36px] md:pr-[44px]">
            <div className="flex-1 grid grid-cols-3 gap-3 md:gap-4">
              {PILLARS.map((pillar) => (
                <div
                  key={pillar}
                  className="text-center text-[10px] md:text-[11px] font-medium tracking-[1.5px] text-white/50 uppercase"
                >
                  {pillar}
                </div>
              ))}
            </div>
          </div>

          {/* Rows */}
          {coverage.map((row) => {
            const isLufe = row.variant === "lufe";
            return (
              <div
                key={row.label}
                className={`flex items-center gap-3 md:gap-4 mb-2.5 py-3 md:py-4 px-3 md:px-4 transition-colors ${
                  isLufe
                    ? "bg-gold/[0.08] border border-gold/20"
                    : "bg-white/[0.02] border border-white/[0.04]"
                }`}
              >
                {/* Label column */}
                <div
                  className={`w-[80px] md:w-[132px] flex-shrink-0 text-right ${
                    isLufe ? "text-gold" : "text-white/45"
                  }`}
                >
                  <div
                    className={`text-[13px] md:text-[15.5px] ${
                      isLufe ? "font-semibold" : "font-medium"
                    }`}
                  >
                    {row.label}
                  </div>
                  <div
                    className={`text-[9.5px] md:text-[10.5px] mt-0.5 leading-tight ${
                      isLufe ? "text-gold/70" : "text-white/30"
                    }`}
                  >
                    {row.note}
                  </div>
                </div>

                {/* 3-pillar cells */}
                <div className="flex-1 grid grid-cols-3 gap-3 md:gap-4">
                  {row.pillars.map((covered, idx) => (
                    <div
                      key={idx}
                      role="img"
                      aria-label={
                        covered
                          ? `${row.label}涵蓋${PILLARS[idx]}`
                          : `${row.label}不涵蓋${PILLARS[idx]}`
                      }
                      className={`h-8 md:h-10 flex items-center justify-center text-[11px] md:text-[14.5px] transition-all ${
                        covered
                          ? isLufe
                            ? "bg-gradient-to-b from-gold/35 to-gold/25 border border-gold/40 text-gold"
                            : "bg-white/[0.07] border border-white/10 text-white/55"
                          : "border border-dashed border-white/[0.06]"
                      }`}
                    >
                      <span aria-hidden="true">{covered ? "●" : ""}</span>
                    </div>
                  ))}
                </div>

                {/* Status icon */}
                <div className="flex-shrink-0 w-5 md:w-6 text-center">
                  {isLufe ? (
                    <span className="text-gold text-[17px] md:text-[19px]">✓</span>
                  ) : (
                    <span className="text-white/20 text-[15.5px] md:text-[16.5px]">—</span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Footnote: the promise, in plain words */}
          <p className="mt-6 text-center text-[11.5px] md:text-[13.5px] text-white/40 font-normal leading-[1.8]">
            對手做完一件事交給下一家，鹿飛三件事<span className="text-gold/80">全程自營</span>——
            <br className="hidden md:block" />
            沒有責任轉交，沒有窗口切換，沒有進度真空。
          </p>
        </div>

        {/* Stats — aligned to the promise */}
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
              <div className="text-[13px] md:text-[14.5px] text-white/50 font-normal mt-2 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial — now aligned with the end-to-end story */}
        <div className="max-w-[680px] mx-auto border-l-2 border-gold pl-6 md:pl-8">
          <q className="block text-[18px] md:text-[20px] text-white/85 italic leading-[1.8] font-light mb-4 font-[var(--font-playfair)]">
            以前要同時盯三家——顧問催進度、貿易商催付款、貨代催艙位。換成鹿飛之後，
            我只開一次會，每週一份進度信。本來要三週的事情，七天就跑完。
          </q>
          <div className="flex items-center gap-3 text-[13.5px] text-white/50 font-normal">
            <div className="w-9 h-9 rounded-none bg-gold/15 flex items-center justify-center text-gold text-[14.5px] font-semibold">
              陳
            </div>
            <div>
              <div className="text-white/75 font-medium">陳執行長</div>
              <div className="text-white/45">台灣食品品牌・東南亞市場</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
