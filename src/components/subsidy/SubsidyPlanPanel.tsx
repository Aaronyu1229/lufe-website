import Link from "next/link";
import type { ReactNode } from "react";

import { AccordionItem } from "@/components/faq/AccordionItem";
import { STAGE_LABELS, type Subsidy } from "@/data/subsidies";
import { STAGE_LABELS_EN } from "@/i18n/en/subsidies";
import { subsidiesPageEn } from "@/i18n/en/subsidies-page";
import { localizedHref, type Locale } from "@/i18n/locale";
import { subsidiesPageZh } from "@/i18n/zh/subsidies-page";

import { SubsidyIcon } from "./SubsidyIcons";
import { SubsidyStatusBadge } from "./SubsidyStatus";

function CheckIcon() {
  return <svg aria-hidden="true" viewBox="0 0 18 18" className="mt-1 h-[18px] w-[18px] shrink-0 text-gold-d" fill="none"><path d="m3.5 9 3 3 8-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="square" strokeLinejoin="miter" /></svg>;
}

function DetailRow({ title, children }: { readonly title: string; readonly children: ReactNode }) {
  return <section className="grid gap-6 border-t border-bd py-10 lg:grid-cols-12">
    <h3 className="text-[15px] font-[650] text-tx lg:col-span-3">{title}</h3>
    <div className="min-w-0 lg:col-span-9">{children}</div>
  </section>;
}

function DetailHeader({ title, meta }: { readonly title: string; readonly meta: string }) {
  return <span className="flex min-w-0 items-center justify-between gap-4"><span className="text-[15px] font-[650] text-tx">{title}</span><span className="shrink-0 text-[13px] text-tx3">{meta}</span></span>;
}

export function SubsidyPlanPanel({ subsidy, now, locale = "zh" }: { readonly subsidy: Subsidy; readonly now: Date; readonly locale?: Locale }) {
  const copy = locale === "en" ? subsidiesPageEn : subsidiesPageZh;
  const stage = (locale === "en" ? STAGE_LABELS_EN : STAGE_LABELS)[subsidy.stage];

  return <article className="min-w-0">
    <header className="grid gap-10 pb-12 pt-14 md:pt-20 lg:grid-cols-12 lg:gap-16">
      <div className="min-w-0 lg:col-span-7">
        {subsidy.highlight ? <div className="mb-5 flex flex-wrap items-center gap-2"><span className="bg-ember px-2.5 py-1 text-[11px] font-semibold tracking-wider text-white">{subsidy.highlight}</span>{subsidy.highlightNote ? <span className="text-[12px] font-medium text-ember">{subsidy.highlightNote}</span> : null}</div> : null}
        <div className="mb-5 flex items-center gap-3"><span className="grid h-11 w-11 place-items-center border border-gold/40 text-gold-d"><SubsidyIcon iconKey={subsidy.iconKey} size={22} /></span></div>
        <h2 className="font-sans text-[clamp(28px,3.4vw,40px)] font-[650] leading-[1.2] text-tx">{subsidy.shortTitle}</h2>
        <p className="mt-3 text-[15px] text-tx3">{subsidy.program}</p>
        <p className="mt-5 text-[17px] leading-[1.8] text-tx2">{subsidy.oneLiner}</p>
      </div>
      <dl className="border border-bd p-7 md:p-8 lg:col-span-5">
        <div className="py-4 first:pt-0"><dt className="text-[13px] text-tx3">{copy.plans.amount}</dt><dd className="num mt-2 text-[28px] text-navy">{subsidy.amount}</dd>{subsidy.amountNote ? <p className="mt-1 text-[12px] leading-[1.65] text-tx3">{subsidy.amountNote}</p> : null}</div>
        <div className="border-t border-bd py-4"><dt className="text-[13px] text-tx3">{copy.plans.timeline}</dt><dd className="mt-2 text-[15px] font-medium leading-[1.6] text-tx">{subsidy.deadline}</dd><p className="mt-1 text-[12px] leading-[1.65] text-tx3">{subsidy.applicationNote}</p></div>
        <div className="border-t border-bd py-4"><dt className="text-[13px] text-tx3">{copy.plans.stage}</dt><dd className="mt-2 text-[15px] font-medium text-tx">{stage.label}</dd></div>
        <div className="border-t border-bd pb-0 pt-4"><dt className="text-[13px] text-tx3">{copy.plans.status}</dt><dd className="mt-2"><SubsidyStatusBadge subsidy={subsidy} now={now} locale={locale} /></dd></div>
      </dl>
    </header>

    <DetailRow title={copy.plans.suitable}><ul className="grid gap-x-8 gap-y-3 md:grid-cols-2">{subsidy.whoFor.map((item) => <li key={item} className="flex gap-3 text-[14.5px] leading-[1.75] text-tx2"><CheckIcon />{item}</li>)}</ul></DetailRow>
    <div className="mt-10 [&>div>button]:py-4">
      {subsidy.coversDetail?.length ? <AccordionItem id={`${subsidy.slug}-detail-1`} num="01" header={<DetailHeader title={copy.plans.covers} meta={`${subsidy.coversDetail.length}${copy.plans.coversCount}`} />}>
        <div className="flex flex-wrap gap-2">{subsidy.covers.map((item) => <span key={item} className="border border-bd px-3 py-1.5 text-[13px] text-tx2">{item}</span>)}</div>
        <div className="mt-5 grid gap-3 md:grid-cols-2">{subsidy.coversDetail.map((item) => <article key={item.title} className="border border-bd p-4"><div className="flex flex-col justify-between gap-3 sm:flex-row"><div><h4 className="text-[15px] font-[650] text-tx">{item.title}</h4><p className="mt-2 text-[13px] leading-[1.7] text-tx2">{item.note}</p></div>{item.limit ? <span className="num shrink-0 text-[15px] text-navy">{item.limit}</span> : null}</div></article>)}</div>
      </AccordionItem> : null}
      {subsidy.processSteps?.length ? <AccordionItem id={`${subsidy.slug}-detail-2`} num="02" header={<DetailHeader title={copy.plans.process} meta={`${subsidy.processSteps.length}${copy.plans.processCount}`} />}>
        <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">{subsidy.processSteps.map((item, index) => <li key={item.title} className="border border-bd p-4"><span className="grid h-8 w-8 place-items-center border border-gold/40 text-[13px] font-semibold text-gold-d">{String(index + 1).padStart(2, "0")}</span><h4 className="mt-4 text-[14.5px] font-[650] text-tx">{item.title}</h4><p className="mt-2 text-[13px] leading-[1.7] text-tx2">{item.note}</p></li>)}</ol>
      </AccordionItem> : null}
      {subsidy.importantNotes?.length ? <AccordionItem id={`${subsidy.slug}-detail-3`} num="03" header={<DetailHeader title={copy.plans.notes} meta={`${subsidy.importantNotes.length}${copy.plans.notesCount}`} />}>
        <ul className="grid gap-3 border-l-2 border-ember bg-ember/5 p-5">{subsidy.importantNotes.map((item) => <li key={item} className="text-[14px] leading-[1.75] text-tx2">{item}</li>)}</ul>
      </AccordionItem> : null}
    </div>
    <DetailRow title={copy.plans.lufeAngle}><div className="bg-navy p-6 text-[15px] leading-[1.8] text-white/90">{subsidy.lufeAngle}</div></DetailRow>

    <footer className="flex flex-wrap items-end justify-between gap-4 pb-4 pt-10">
      <Link href={localizedHref(locale, "/assess")} className="text-[14.5px] font-semibold text-navy hover:text-gold-d">{copy.plans.assessAction}</Link>
      <div className="text-right text-[11px] leading-[1.6] text-tx3">{subsidy.sourceUrl ? <a href={subsidy.sourceUrl} target="_blank" rel="noopener noreferrer" className="hover:text-gold-d">{copy.plans.officialAnnouncement}</a> : null}</div>
    </footer>
  </article>;
}
