"use client";

import { SnapRail } from "@/components/motion/SnapRail";
import { type Subsidy, type SubsidyStage } from "@/data/subsidies";
import { subsidiesPageEn } from "@/i18n/en/subsidies-page";
import { type Locale } from "@/i18n/locale";
import { subsidiesPageZh } from "@/i18n/zh/subsidies-page";

import { SubsidyIcon } from "./SubsidyIcons";
import { SubsidyStatusBadge } from "./SubsidyStatus";

const stageOrder: readonly SubsidyStage[] = ["assess", "enter", "optimize"];

export function SubsidyCompare({ subsidies, now, onSelect, locale = "zh" }: {
  readonly subsidies: readonly Subsidy[];
  readonly now: Date;
  readonly onSelect: (slug: string) => void;
  readonly locale?: Locale;
}) {
  const ordered = [...subsidies].sort((left, right) => stageOrder.indexOf(left.stage) - stageOrder.indexOf(right.stage));
  const copy = locale === "en" ? subsidiesPageEn : subsidiesPageZh;

  return <div data-subsidy-compare>
    <SnapRail className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-3 lg:grid lg:grid-cols-4 lg:grid-rows-[repeat(7,auto)] lg:overflow-visible lg:pb-0">
      {ordered.map((subsidy, index) => {
        const stageIndex = stageOrder.indexOf(subsidy.stage) + 1;
        return <article key={subsidy.slug} className={`basis-[82vw] shrink-0 snap-start border border-bd bg-white p-5 lg:row-span-7 lg:grid lg:grid-rows-subgrid lg:basis-auto lg:border-y-0 lg:border-r-0 lg:p-0 lg:px-8 ${index ? "lg:border-l" : ""}`}>
          <div className="flex items-center pt-2"><span aria-hidden="true" className="grid h-11 w-11 place-items-center border border-gold/40 text-gold-d"><SubsidyIcon iconKey={subsidy.iconKey} size={22} /></span></div>
          <div className="pt-6"><h3 className="text-[18px] font-[650] leading-[1.35] text-tx">{subsidy.shortTitle}</h3></div>
          <div className="mt-5 border-t border-bd pt-5"><p className="num text-[28px] leading-none text-navy">{subsidy.amount}</p>{subsidy.amountNote ? <p className="mt-3 line-clamp-2 text-[12px] leading-[1.6] text-tx3">{subsidy.amountNote}</p> : null}</div>
          <div className="pt-5"><div className="flex flex-wrap items-center gap-2 text-[13px] text-tx3"><SubsidyStatusBadge subsidy={subsidy} now={now} locale={locale} /><span>{subsidy.deadline}</span></div></div>
          <p className="mt-5 line-clamp-3 border-t border-bd pt-5 text-[15px] leading-[1.7] text-tx2">{subsidy.oneLiner}</p>
          <button type="button" onClick={() => onSelect(subsidy.slug)} className="mt-5 w-fit cursor-pointer text-[14px] font-semibold text-navy active:scale-[.97]">{copy.plans.compareAction}</button>
        </article>;
      })}
    </SnapRail>
  </div>;
}
