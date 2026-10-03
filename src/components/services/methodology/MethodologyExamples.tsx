"use client";

import { useEffect, useState } from "react";

import { Segmented } from "@/components/ui";
import { useSpring } from "@/lib/motion";

import { METHODOLOGY_EXAMPLES } from "./content";

function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export function MethodologyExamples() {
  const [activeKey, setActiveKey] = useState(METHODOLOGY_EXAMPLES[0]?.key ?? "peanut");
  const opacity = useSpring(1, { precision: 0.001 });
  const translateY = useSpring(0, { precision: 0.001 });

  useEffect(() => {
    if (prefersReducedMotion()) {
      opacity.jump(1);
      translateY.jump(0);
      return;
    }

    opacity.jump(0);
    translateY.jump(8);
    opacity.to(1, { response: 0.24, damping: 1 });
    translateY.to(0, { response: 0.24, damping: 1 });
  }, [activeKey, opacity, translateY]);

  return <>
    <Segmented
      label="研究例子"
      value={activeKey}
      onChange={(key) => setActiveKey(key === "sunscreen" ? "sunscreen" : "peanut")}
      options={METHODOLOGY_EXAMPLES.map((example) => ({ value: example.key, label: example.tab }))}
      className="mt-8"
    />
    {METHODOLOGY_EXAMPLES.map((example) => {
      const active = example.key === activeKey;

      return <article
        key={example.key}
        hidden={!active}
        className="mt-8 border border-bd bg-white"
        style={active ? { opacity: opacity.value, transform: `translateY(${translateY.value}px)` } : undefined}
      >
        <header className="border-b border-bd p-6 md:p-8">
          <h3 className="h3 text-tx">{example.title}</h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {example.tags.map((tag) => <span key={tag} className="border border-bd px-2.5 py-1 text-[13px] text-tx2">{tag}</span>)}
          </div>
        </header>
        <div className="grid min-w-0 lg:grid-cols-12">
          <section className="p-6 md:p-8 lg:col-span-4 lg:border-r lg:border-bd">
            <p className="mt-4 whitespace-pre-line text-[15px] leading-[1.85] text-tx2">{example.method}</p>
          </section>
          <section className="p-6 md:p-8 lg:col-span-8">
            <div data-lufe-methodology-findings className="mt-4 grid gap-3 sm:grid-cols-2">
              {example.findings.map((finding) => <article key={finding.label} className="border border-bd p-5">
                <p className="text-[12px] font-semibold text-gold-d">{finding.label}</p>
                <h4 className="mt-2 text-[18px] font-[650] leading-[1.4] text-tx">{finding.headline}</h4>
                <p className="mt-2 text-[14px] leading-[1.75] text-tx2">{finding.detail}</p>
              </article>)}
            </div>
          </section>
        </div>
        <section className="bg-navy p-6 text-white md:p-8">
          <div className="mt-4 grid gap-6 md:grid-cols-3">
            {example.implications.map((implication, index) => <div key={implication} className="border-t border-white/20 pt-4">
              <p className="mt-2 text-[17px] font-[650] leading-[1.55] text-white">{implication}</p>
            </div>)}
          </div>
          <p className="mt-6 text-[14px] leading-[1.8] text-white/70">{example.note}</p>
        </section>
      </article>;
    })}
  </>;
}
