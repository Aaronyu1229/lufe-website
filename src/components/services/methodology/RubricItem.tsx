"use client";

import { AccordionItem } from "@/components/faq/AccordionItem";

import type { METHODOLOGY_DIMENSIONS } from "./content";

type Dimension = (typeof METHODOLOGY_DIMENSIONS)[number];

export function splitDimensionName(name: string): [string, string] {
  const firstSpace = name.indexOf(" ");
  return [name.slice(0, firstSpace), name.slice(firstSpace + 1)];
}

export function RubricItem({ dimension, num, defaultOpen }: {
  readonly dimension: Dimension;
  readonly num: string;
  readonly defaultOpen: boolean;
}) {
  const [, zh] = splitDimensionName(dimension.name);

  return (
    <AccordionItem
      id={`methodology-rubric-${num}`}
      num={num}
      defaultOpen={defaultOpen}
      header={<span className="block"><span className="block text-[22px] font-[650] leading-[1.35] text-tx">{zh}</span><span className="mt-1 block text-[16px] font-medium text-sky">「{dimension.question}」</span></span>}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <p className="text-[15px] leading-[1.85] text-tx2"><strong className="text-tx">看：</strong>{dimension.criteria}</p>
        <p className="border-l-2 border-ember bg-ember/5 p-4 text-[15px] leading-[1.85] text-tx2"><strong className="text-ember">紅線：</strong>{dimension.redAt}</p>
      </div>
    </AccordionItem>
  );
}
