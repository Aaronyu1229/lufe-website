"use client";

import { STAGE_LABELS, type Subsidy, type SubsidyStage } from "@/data/subsidies";

import { SubsidyIcon } from "./SubsidyIcons";
import { SubsidyStatusBadge } from "./SubsidyStatus";

const stages: readonly SubsidyStage[] = ["assess", "enter", "optimize"];

export function SubsidyStageMap({ subsidies, now, onSelect }: {
  readonly subsidies: readonly Subsidy[];
  readonly now: Date;
  readonly onSelect: (slug: string) => void;
}) {
  return (
    <div className="grid lg:grid-cols-3">
      {stages.map((stageKey, index) => {
        const stage = STAGE_LABELS[stageKey];
        const plans = subsidies.filter((subsidy) => subsidy.stage === stageKey);

        return <section key={stageKey} className={`min-w-0 py-8 lg:py-0 ${index ? "border-t border-bd lg:border-l lg:border-t-0 lg:px-8" : "lg:pr-8"}`}>
          <div className="flex items-baseline gap-3">
            <span className="text-[13px] font-semibold text-gold-d">{String(index + 1).padStart(2, "0")}</span>
            <p className="eyebrow text-tx3">{stage.label}</p>
          </div>
          <p className="mt-3 text-[16px] font-semibold text-tx">{stage.desc.replace(/。$/, "")}</p>
          <div>
            {plans.map((subsidy) => <button
              key={subsidy.slug}
              type="button"
              onClick={() => onSelect(subsidy.slug)}
              className="group mt-5 block w-full cursor-pointer border border-bd bg-white p-5 text-left transition-[border-color,transform] duration-200 active:scale-[.985] [@media(hover:hover)]:hover:-translate-y-[3px] [@media(hover:hover)]:hover:border-gold"
            >
              <span className="flex items-start gap-4">
                <span aria-hidden="true" className="grid h-11 w-11 shrink-0 place-items-center border border-gold/40 text-gold-d"><SubsidyIcon iconKey={subsidy.iconKey} size={22} /></span>
                <span className="min-w-0">
                  <span className="flex items-baseline gap-2"><span className="text-[13px] font-semibold text-gold-d">{subsidy.num}</span><span className="text-[18px] font-[650] leading-[1.35] text-tx">{subsidy.shortTitle}</span></span>
                  <span className="num mt-5 block text-[22px] text-navy">{subsidy.amount}</span>
                  <span className="mt-4 flex flex-wrap items-center gap-2 text-[13px] text-tx3"><SubsidyStatusBadge subsidy={subsidy} now={now} /><span>{subsidy.deadline}</span></span>
                </span>
              </span>
            </button>)}
          </div>
        </section>;
      })}
    </div>
  );
}
