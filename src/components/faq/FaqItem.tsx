import type { JSX } from "react";

import { AccordionItem } from "./AccordionItem";

export type FaqEntry = {
  readonly num: string;
  readonly question: string;
  readonly answer: string;
  readonly takeaway?: string;
};

export function FaqItem({ item, idPrefix, defaultOpen }: {
  readonly item: FaqEntry;
  readonly idPrefix: string;
  readonly defaultOpen?: boolean;
}): JSX.Element {
  return (
    <AccordionItem
      id={`${idPrefix}-${item.num}`}
      num={item.num}
      header={<span className="text-[20px] font-semibold leading-[1.5] text-tx">{item.question}</span>}
      defaultOpen={defaultOpen}
    >
      {item.takeaway ? <p className="max-w-[650px] border-l-2 border-gold pl-4 text-[17px] font-medium leading-[1.65] text-tx">{item.takeaway}</p> : null}
      <p className={`${item.takeaway ? "mt-4 " : ""}max-w-[650px] whitespace-pre-line text-[15.5px] leading-[1.85] text-tx2`}>{item.answer}</p>
    </AccordionItem>
  );
}
