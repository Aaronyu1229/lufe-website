"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: "10+", label: "年出海實戰經驗" },
  { value: "50+", label: "企業成功出海" },
  { value: "30+", label: "覆蓋國家市場" },
  { value: "2,400+", label: "TradePilot 用戶" },
];

function parseStatValue(value: string): { number: number; suffix: string } {
  const match = value.replace(/,/g, "").match(/^(\d+)(.*)$/);
  if (!match) return { number: 0, suffix: value };
  return { number: parseInt(match[1], 10), suffix: match[2] };
}

function formatNumber(n: number, original: string): string {
  // Preserve comma formatting if original had commas
  if (original.includes(",")) {
    return n.toLocaleString();
  }
  return String(n);
}

export function StatsBanner() {
  const [counted, setCounted] = useState(false);
  const parsed = stats.map((s) => parseStatValue(s.value));
  const [values, setValues] = useState<number[]>(parsed.map(() => 0));
  const ref = useRef<HTMLDivElement>(null);

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
            setValues(parsed.map((p) => Math.round(ease * p.number)));
            if (progress < 1) requestAnimationFrame(tick);
          }

          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.3 }
    );

    const el = ref.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [counted]);

  return (
    <section className="bg-[#0D1627] py-[80px] md:py-[100px] px-5 md:px-10">
      <div
        ref={ref}
        className="max-w-[1400px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 text-center"
      >
        {stats.map((s, i) => (
          <div key={s.label}>
            <div className="font-sans text-[clamp(36px,4vw,52px)] text-white leading-none font-light mb-2">
              {formatNumber(values[i], s.value)}
              {parsed[i].suffix}
            </div>
            <div className="text-[13px] text-white/70 font-normal tracking-wide">
              {s.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
