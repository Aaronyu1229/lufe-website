"use client";

import { useEffect, useRef, useState } from "react";

const STAGES = ["評估", "測試", "通路", "物流", "落地"] as const;

type CoverageRow = {
  label: string;
  note: string;
  stages: readonly [boolean, boolean, boolean, boolean, boolean];
  variant: "default" | "lufe";
};

const coverage: readonly CoverageRow[] = [
  {
    label: "傳統顧問",
    note: "只做前期策略",
    stages: [true, false, false, false, false],
    variant: "default",
  },
  {
    label: "貿易商",
    note: "只做中段通路",
    stages: [false, true, true, false, false],
    variant: "default",
  },
  {
    label: "物流公司",
    note: "只做尾段執行",
    stages: [false, false, false, true, true],
    variant: "default",
  },
  {
    label: "鹿飛 LUFÉ",
    note: "五階段全程自營",
    stages: [true, true, true, true, true],
    variant: "lufe",
  },
];

type Stat = {
  target: number;
  suffix: string;
  label: string;
};

const stats: readonly Stat[] = [
  { target: 42, suffix: "+", label: "年國際物流實戰" },
  { target: 30, suffix: "+", label: "國家與地區覆蓋" },
  { target: 500, suffix: "+", label: "出海專案經驗" },
  { target: 5, suffix: "", label: "階段全程自營" },
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
            端到端 · 同一組人
          </div>
          <h2 className="font-sans text-[clamp(32px,4.8vw,56px)] leading-[1.1] font-light tracking-[-0.8px] text-white max-w-[840px] mx-auto">
            從評估到落地，
            <br />
            你面對的<span className="text-gold font-normal">只有我們</span>。
          </h2>
          <p className="text-[16px] text-white/55 max-w-[560px] leading-[1.75] mx-auto mt-6 font-normal">
            一個專案經理、一份合約、一條進度線。
            <br className="hidden md:block" />
            市場上沒有全能的玩家，但你需要一個把五個階段縫起來的團隊。
          </p>
        </div>

        {/* Coverage matrix — 5-stage grid per row */}
        <div className="mb-20 md:mb-24 max-w-[960px] mx-auto">
          {/* Stage header row */}
          <div className="flex items-end gap-3 md:gap-4 mb-4 pl-[92px] md:pl-[148px] pr-[36px] md:pr-[44px]">
            <div className="flex-1 grid grid-cols-5 gap-2 md:gap-3">
              {STAGES.map((stage) => (
                <div
                  key={stage}
                  className="text-center text-[10px] md:text-[11px] font-medium tracking-[1.5px] text-white/50 uppercase"
                >
                  {stage}
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
                    className={`text-[12px] md:text-[14px] ${
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

                {/* 5-stage cells */}
                <div className="flex-1 grid grid-cols-5 gap-2 md:gap-3">
                  {row.stages.map((covered, idx) => (
                    <div
                      key={idx}
                      className={`h-8 md:h-10 flex items-center justify-center text-[11px] md:text-[13px] transition-all ${
                        covered
                          ? isLufe
                            ? "bg-gradient-to-b from-gold/35 to-gold/25 border border-gold/40 text-gold"
                            : "bg-white/[0.07] border border-white/10 text-white/55"
                          : "border border-dashed border-white/[0.06]"
                      }`}
                      aria-label={
                        covered
                          ? `${row.label}涵蓋${STAGES[idx]}`
                          : `${row.label}不涵蓋${STAGES[idx]}`
                      }
                    >
                      {covered ? "●" : ""}
                    </div>
                  ))}
                </div>

                {/* Status icon */}
                <div className="flex-shrink-0 w-5 md:w-6 text-center">
                  {isLufe ? (
                    <span className="text-gold text-[16px] md:text-[18px]">✓</span>
                  ) : (
                    <span className="text-white/20 text-[14px] md:text-[15px]">—</span>
                  )}
                </div>
              </div>
            );
          })}

          {/* Footnote: the promise, in plain words */}
          <p className="mt-6 text-center text-[11.5px] md:text-[12.5px] text-white/40 font-normal leading-[1.7]">
            對手做完一段交給下一家，鹿飛五個階段<span className="text-gold/80">全程自營</span>——
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
              <div className="text-[12px] md:text-[13px] text-white/50 font-normal mt-2 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial — now aligned with the end-to-end story */}
        <div className="max-w-[680px] mx-auto border-l-2 border-gold pl-6 md:pl-8">
          <q className="block text-[17px] md:text-[19px] text-white/85 italic leading-[1.7] font-light mb-4 font-[var(--font-playfair)]">
            以前要同時盯三家——顧問催進度、貿易商催付款、貨代催艙位。換成鹿飛之後，
            我只開一次會，每週一份進度信。本來要三週的事情，七天就跑完。
          </q>
          <div className="flex items-center gap-3 text-[12.5px] text-white/50 font-normal">
            <div className="w-9 h-9 rounded-none bg-gold/15 flex items-center justify-center text-gold text-[13px] font-semibold">
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
