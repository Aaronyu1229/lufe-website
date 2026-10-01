"use client";

import { useRef, useState } from "react";

import { FileIcon, MessageIcon, TargetIcon } from "@/components/icons/LineIcons";

import { METHODOLOGY_EXAMPLES } from "./content";

const sectionIcons = [FileIcon, MessageIcon, TargetIcon];

export function MethodologyExamples() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveIndex = () => {
    const container = containerRef.current;
    if (!container) return;

    setActiveIndex(Math.round(container.scrollLeft / container.clientWidth));
  };

  const scrollToExample = (index: number) => {
    const container = containerRef.current;
    if (!container) return;

    container.scrollTo({ left: container.clientWidth * index });
    setActiveIndex(index);
  };

  return (
    <>
      <div
        ref={containerRef}
        onScroll={updateActiveIndex}
        className="flex min-w-0 snap-x snap-mandatory gap-4 overflow-x-auto pb-3 md:grid md:grid-cols-2 md:items-stretch md:overflow-visible md:pb-0"
      >
        {METHODOLOGY_EXAMPLES.map((example) => (
          <article key={example.title} className="w-full shrink-0 snap-center border border-bd bg-cream p-5 md:w-auto md:p-7">
            <h3 className="h3 max-w-[24ch] text-tx">{example.title}</h3>
            <div className="mt-7 grid gap-6">
              {example.sections.map((section, index) => {
                const Icon = sectionIcons[index];

                return (
                  <section key={section.label}>
                    <h4 className="flex items-center gap-2 text-[15px] font-semibold text-sky">
                      <Icon size={16} />
                      {section.label}
                    </h4>
                    <p className="mt-3 whitespace-pre-line text-[15px] leading-[1.85] text-tx2">{section.body}</p>
                  </section>
                );
              })}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-5 flex justify-center gap-2 md:hidden" aria-label="研究例子">
        {METHODOLOGY_EXAMPLES.map((example, index) => (
          <button
            key={example.title}
            type="button"
            aria-label={`查看例子 ${index + 1}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => scrollToExample(index)}
            className={`h-2.5 w-2.5 rounded-full border border-navy transition-opacity motion-reduce:transition-none ${activeIndex === index ? "bg-navy" : "bg-transparent opacity-45"}`}
          />
        ))}
      </div>
    </>
  );
}
