"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import { Segmented } from "@/components/ui";
import { useSpring } from "@/lib/motion";
import type { Subsidy } from "@/data/subsidies";
import { subsidiesPageEn } from "@/i18n/en/subsidies-page";
import { type Locale } from "@/i18n/locale";
import { subsidiesPageZh } from "@/i18n/zh/subsidies-page";

import { SubsidyPlanPanel } from "./SubsidyPlanPanel";
import { SubsidyCompare } from "./SubsidyCompare";

function reducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function SubsidyPlans({ subsidies, now, locale = "zh" }: { readonly subsidies: readonly Subsidy[]; readonly now: Date; readonly locale?: Locale }) {
  const [activeSlug, setActiveSlug] = useState(subsidies[0]?.slug ?? "");
  const tabsRef = useRef<HTMLDivElement>(null);
  const opacity = useSpring(1, { precision: 0.001 });
  const translateY = useSpring(0, { precision: 0.001 });
  const copy = locale === "en" ? subsidiesPageEn : subsidiesPageZh;

  const selectPlan = useCallback((slug: string, updateHash: boolean, shouldScroll = true) => {
    if (!subsidies.some((subsidy) => subsidy.slug === slug)) return;
    setActiveSlug(slug);
    if (updateHash) window.history.replaceState(null, "", `#${slug}`);
    if (shouldScroll) tabsRef.current?.scrollIntoView({ behavior: reducedMotion() ? "auto" : "smooth", block: "start" });
  }, [subsidies]);

  useEffect(() => {
    const syncHash = () => selectPlan(window.location.hash.slice(1), false);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [selectPlan]);

  useEffect(() => {
    if (reducedMotion()) {
      opacity.jump(1);
      translateY.jump(0);
      return;
    }
    opacity.jump(0);
    translateY.jump(8);
    opacity.to(1, { response: 0.24, damping: 1 });
    translateY.to(0, { response: 0.24, damping: 1 });
  }, [activeSlug, opacity, translateY]);

  return <section id="plans" className="bg-white py-[72px] md:py-[96px]">
    <div className="lufe-container">
      <div className="mb-14 flex flex-col md:mb-20 gap-4 md:flex-row md:items-end md:justify-between">
        <h2 className="h2 max-w-[780px] text-tx">{copy.plans.heading[0]}<span className="text-gold">{copy.plans.heading[1]}</span></h2>
      </div>
      <SubsidyCompare subsidies={subsidies} now={now} locale={locale} onSelect={(slug) => selectPlan(slug, true)} />
    </div>
    <div ref={tabsRef} className="sticky top-[74px] z-10 mt-16 md:mt-24 border-b border-bd bg-white/90 py-3 backdrop-blur">
      <div className="lufe-container overflow-x-auto"><Segmented label={copy.plans.segmentedLabel} value={activeSlug} onChange={(slug) => selectPlan(slug, true, false)} options={subsidies.map((subsidy) => ({ value: subsidy.slug, label: `${subsidy.num} ${subsidy.shortTitle}` }))} className="max-w-none" /></div>
    </div>
    <div className="lufe-container">
      {subsidies.map((subsidy) => {
        const active = subsidy.slug === activeSlug;
        return <div key={subsidy.slug} id={subsidy.slug} hidden={!active} className="scroll-mt-[130px]" style={active ? { opacity: opacity.value, transform: `translateY(${translateY.value}px)` } : undefined}><SubsidyPlanPanel subsidy={subsidy} now={now} locale={locale} /></div>;
      })}
    </div>
  </section>;
}
