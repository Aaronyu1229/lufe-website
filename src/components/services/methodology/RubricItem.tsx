"use client";

import { AccordionItem } from "@/components/faq/AccordionItem";

import type { MethodologyDimension } from "./content";
import type { Locale } from "@/i18n/locale";

export function splitDimensionName(name: string): [string, string] {
  const firstSpace = name.indexOf(" ");
  return [name.slice(0, firstSpace), name.slice(firstSpace + 1)];
}

export function RubricItem({ dimension, num, defaultOpen, locale = "zh", seeLabel = "看：", redLineLabel = "紅線：" }: {
  readonly dimension: MethodologyDimension;
  readonly num: string;
  readonly defaultOpen: boolean;
  readonly locale?: Locale;
  readonly seeLabel?: string;
  readonly redLineLabel?: string;
}) {
  const [, zh] = splitDimensionName(dimension.name);
  const title = locale === "en" ? dimension.name : zh;

  return (
    <AccordionItem
      id={`methodology-rubric-${num}`}
      num={num}
      defaultOpen={defaultOpen}
      header={<span className="block"><span className="block text-[22px] font-[650] leading-[1.35] text-tx">{title}</span><span className="mt-1 block text-[16px] font-medium text-sky">{locale === "en" ? `“${dimension.question}”` : `「${dimension.question}」`}</span></span>}
    >
      <div className="grid gap-5 md:grid-cols-2">
        <p className="text-[15px] leading-[1.85] text-tx2"><strong className="text-tx">{seeLabel}</strong>{dimension.criteria}</p>
        <p className="border-l-2 border-ember bg-ember/5 p-4 text-[15px] leading-[1.85] text-tx2"><strong className="text-ember">{redLineLabel}</strong>{dimension.redAt}</p>
      </div>
    </AccordionItem>
  );
}
