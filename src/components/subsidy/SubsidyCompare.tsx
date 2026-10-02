"use client";

import { SnapRail } from "@/components/motion/SnapRail";
import { STAGE_LABELS, type Subsidy, type SubsidyStage } from "@/data/subsidies";

import { SubsidyIcon } from "./SubsidyIcons";
import { SubsidyStatusBadge } from "./SubsidyStatus";

const stageOrder: readonly SubsidyStage[] = ["assess", "enter", "optimize"];

export function SubsidyCompare({ subsidies, now, onSelect }: {
  readonly subsidies: readonly Subsidy[];
  readonly now: Date;
  readonly onSelect: (slug: string) => void;
}) {
  const ordered = [...subsidies].sort((left, right) => stageOrder.indexOf(left.stage) - stageOrder.indexOf(right.stage));

  return <div data-subsidy-compare>
    <SnapRail className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 lg:grid lg:grid-cols-4 lg:grid-rows-[repeat(7,auto)] lg:overflow-visible lg:pb-0">
      {ordered.map((subsidy, index) => {
        const stageIndex = stageOrder.indexOf(subsidy.stage) + 1;
        return <article key={subsidy.slug} className={`basis-[82vw] shrink-0 snap-start border border-bd bg-white p-5 lg:row-span-7 lg:grid lg:grid-rows-subgrid lg:basis-auto lg:border-y-0 lg:border-r-0 lg:p-0 lg:px-6 ${index ? "lg:border-l" : ""}`}>
          <p className="text-[13px] font-semibold text-gold-d">{String(stageIndex).padStart(2, "0")} {STAGE_LABELS[subsidy.stage].label}</p>
          <div className="flex items-center pt-2"><span aria-hidden="true" className="grid h-11 w-11 place-items-center border border-gold/40 text-gold-d"><SubsidyIcon iconKey={subsidy.iconKey} size={22} /></span></div>
          <div className="pt-2"><p className="text-[13px] font-semibold text-gold-d">{subsidy.num}</p><h3 className="mt-1 text-[18px] font-[650] leading-[1.35] text-tx">{subsidy.shortTitle}</h3></div>
          <div className="mt-2 border-t border-bd pt-2 lg:mt-0"><p className="num text-[28px] leading-none text-navy">{subsidy.amount}</p>{subsidy.amountNote ? <p className="mt-2 line-clamp-2 text-[12px] leading-[1.6] text-tx3">{subsidy.amountNote}</p> : null}</div>
          <div className="pt-2"><div className="flex flex-wrap items-center gap-2 text-[13px] text-tx3"><SubsidyStatusBadge subsidy={subsidy} now={now} /><span>{subsidy.deadline}</span></div></div>
          <p className="mt-2 line-clamp-3 border-t border-bd pt-2 text-[15px] leading-[1.7] text-tx2 lg:mt-0">{subsidy.oneLiner}</p>
          <button type="button" onClick={() => onSelect(subsidy.slug)} className="mt-2 w-fit cursor-pointer text-[14px] font-semibold text-navy active:scale-[.97] lg:mt-0">看重點 ↓</button>
        </article>;
      })}
    </SnapRail>
  </div>;
}
