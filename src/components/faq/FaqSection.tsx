"use client";

import type { JSX } from "react";

import { useMessageBox } from "@/components/MessageBox";

import { type FaqEntry } from "./FaqItem";
import { FaqList } from "./FaqList";

export function FaqSection({ title, items, idPrefix, className = "py-[62px] md:py-[96px] md:pb-[100px]" }: {
  readonly title: string;
  readonly items: readonly FaqEntry[];
  readonly idPrefix: string;
  readonly className?: string;
}): JSX.Element {
  const { open } = useMessageBox();

  return (
    <section className={className}>
      <div className="lufe-container grid grid-cols-1 gap-y-[43px] md:grid-cols-12 md:gap-x-16 md:gap-y-0">
        <div className="self-start md:col-span-4 md:sticky md:top-[96px]">
          <h2 className="max-w-[360px] font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-navy [text-wrap:balance]">
            {title}
          </h2>
          <p className="mt-6 text-[15px] text-tx2">還有其他問題？</p>
          <button type="button" onClick={open} className="mt-2 cursor-pointer text-[15px] font-semibold text-sky">直接問鹿飛 →</button>
        </div>

        <div className="min-w-0 md:col-span-8">
          <FaqList items={items} idPrefix={idPrefix} />
        </div>
      </div>
    </section>
  );
}
