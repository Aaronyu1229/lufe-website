"use client";

import { useEffect, useRef, useState } from "react";

import { aboutPageZh, type AboutPageCopy } from "@/i18n/zh/about-page";

type FreightRateChartCopy = AboutPageCopy["freightRateChart"];

/** CHART-SLOT-02: 40ft container world average rate, 2019 vs Sept 2021 (Drewry WCI). */
export function FreightRateChart({ copy = aboutPageZh.freightRateChart }: { readonly copy?: FreightRateChartCopy } = {}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);
  const max = Math.max(...copy.rates.map((rate) => rate.value));

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    // Bars grow once, when the chart is mostly on screen; reduced motion shows the final state.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setShown(true); return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry?.isIntersecting) { setShown(true); observer.disconnect(); }
    }, { threshold: 0.6 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return <figure ref={ref} data-slot="CHART-SLOT-02" className="mt-8" aria-label={copy.ariaLabel}>
    <div className="flex flex-col justify-center gap-5 border-y border-bd py-6 md:aspect-[3/1] md:py-0">
      <p className="text-[13px] text-tx3">{copy.description}</p>
      {copy.rates.map((rate, index) => <div key={rate.label} className="grid gap-2 sm:grid-cols-[132px_minmax(0,1fr)] sm:items-center sm:gap-4">
        <p className="text-[14px] text-tx2">{rate.label}</p>
        <div className="flex min-w-0 items-center gap-3">
          <span aria-hidden="true" className={`block h-3 origin-left transition-transform duration-[900ms] ease-[var(--ease-spring)] motion-reduce:transition-none ${index ? "bg-gold delay-150" : "bg-tx3/40"}`} style={{ width: `${Math.max(4, (rate.value / max) * 78)}%`, transform: shown ? "scaleX(1)" : "scaleX(0)" }} />
          <span className={`num shrink-0 text-[16px] text-tx transition-opacity duration-500 motion-reduce:transition-none ${index ? "delay-500" : "delay-300"} ${shown ? "opacity-100" : "opacity-0"}`}>{rate.value.toLocaleString("en-US")} {rate.unit}</span>
        </div>
      </div>)}
    </div>
  </figure>;
}
