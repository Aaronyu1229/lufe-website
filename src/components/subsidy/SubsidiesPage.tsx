import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { FaqSection } from "@/components/faq/FaqSection";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { SUBSIDIES, SUBSIDY_CARD_COPY } from "@/data/subsidies";
import { SUBSIDIES_EN } from "@/i18n/en/subsidies";
import { subsidiesPageEn } from "@/i18n/en/subsidies-page";
import { localizedHref, type Locale } from "@/i18n/locale";
import { subsidiesPageZh } from "@/i18n/zh/subsidies-page";

import { SubsidiesCTASection } from "./SubsidiesCTASection";
import { SubsidyPlans } from "./SubsidyPlans";

const PILLAR_ICONS = [
  <svg key="funding" width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M9 9C9 9 9.5 8 12 8C14.5 8 15 9.5 15 10.2C15 11.1 14 11.6 12 12.2C10 12.8 9 13.5 9 14.5C9 15.5 10 16 12 16C14 16 15 15 15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  <svg key="proposal" width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 3H15L19 7V20C19 20.5523 18.5523 21 18 21H8C7.44772 21 7 20.5523 7 20V4C7 3.44772 7.44772 3 8 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M14 3V8H19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M10 13L12 15L16 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>,
  <svg key="combined" width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="9" width="10" height="10" stroke="currentColor" strokeWidth="1.5" /><rect x="8" y="6" width="10" height="10" stroke="currentColor" strokeWidth="1.5" /><rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" /></svg>,
] as const;

export function SubsidiesPage({ locale = "zh", now = new Date() }: { readonly locale?: Locale; readonly now?: Date }) {
  const copy = locale === "en" ? subsidiesPageEn : subsidiesPageZh;
  const subsidies = locale === "en" ? SUBSIDIES_EN : SUBSIDIES;

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: copy.home, path: localizedHref(locale, "/") },
        { name: copy.resources, path: localizedHref(locale, "/resources") },
        { name: copy.breadcrumb, path: localizedHref(locale, "/resources/subsidies") },
      ]} />
      <FaqJsonLd items={copy.faqs} />
      <div className="bg-white">
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src={SUBSIDY_CARD_COPY.hero} video={HERO_VIDEOS.subsidies} />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60"><Link href={localizedHref(locale, "/")} className="hover:text-white">{copy.home}</Link><span aria-hidden="true" className="text-white/30">/</span><Link href={localizedHref(locale, "/resources")} className="hover:text-white">{copy.resources}</Link><span aria-hidden="true" className="text-white/30">/</span><span className="text-white/75">{copy.breadcrumb}</span></nav>
          <h1 className="h1 mb-6 max-w-[880px] text-white">{copy.hero.title[0]}<br /><span className="text-gold">{copy.hero.title[1]}</span></h1>
          <p className="lead max-w-[640px] !text-white/75">
            {copy.hero.leadStart}<span className="font-medium text-white">{copy.hero.northAmerica}</span>{copy.hero.leadBetweenRegions}<span className="font-medium text-white">{copy.hero.southeastAsia}</span>{copy.hero.leadAfterRegions}{copy.hero.leadBeforeCount}<span className="font-medium text-white">{copy.hero.count}</span>{copy.hero.leadAfterCount}
          </p>
        </div>
        <ScrollCue label={copy.scrollCue} />
      </section>

      <section className="border-y border-bd/60 bg-cream/60 py-7">
        <div className="lufe-container flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          <div className="flex flex-1 flex-wrap items-center justify-center gap-x-12 gap-y-5 opacity-80 md:justify-start">
            <Image src="/images/logo/agencies/tita.png" alt={copy.agencies.tradeAlt} width={460} height={61} className="h-7 w-auto md:h-8" />
            <span className="flex items-center gap-2.5" role="img" aria-label={copy.agencies.ministryAria}><Image src="/images/logo/agencies/moea-mark.png" alt="" width={97} height={96} className="h-7 w-auto md:h-8" /><span className="text-[20px] font-semibold tracking-[0.12em] text-tx md:text-[22px]">{copy.agencies.ministryName}</span></span>
            <Image src="/images/logo/agencies/smea.png" alt={copy.agencies.smeaAlt} width={391} height={55} className="h-7 w-auto md:h-8" />
          </div>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[96px]">
        <div className="lufe-container">
          <h2 className="h2 mb-10 max-w-[780px] text-tx">{copy.subsidyIntroHeading[0]}<span className="text-gold">{copy.subsidyIntroHeading[1]}</span></h2>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            {copy.pillars.map((pillar, index) => <Pillar key={pillar.title} title={pillar.title} desc={pillar.description} icon={PILLAR_ICONS[index]!} />)}
          </div>
        </div>
      </section>

      <SubsidyPlans subsidies={subsidies} now={now} locale={locale} />

      <FaqSection title={copy.faqTitle} idPrefix="subsidy-faq" items={copy.faqs.map((faq, index) => ({ num: String(index + 1).padStart(2, "0"), question: faq.question, answer: faq.answer }))} className="bg-white py-[72px] md:py-[96px]" askLabel={copy.faqAskLabel} moreLabel={copy.faqMoreLabel} />

      <section className="border-t border-bd bg-cream py-[60px] md:py-[80px]">
          <div className="lufe-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="max-w-[520px]"><h3 className="h3 text-tx">{copy.updates.title}</h3><p className="mt-2 text-[14.5px] leading-[1.8] text-tx2">{copy.updates.description}</p></div><div className="shrink-0"><a href={copy.updates.href} className="inline-flex items-center gap-2 bg-navy px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-navy/90">{copy.updates.action}</a><p className="mt-2 text-center text-[11px] text-tx3 md:text-right">{copy.updates.note}</p></div></div>
      </section>
      <SubsidiesCTASection locale={locale} />
      </div>
    </>
  );
}

function Pillar({ title, desc, icon }: { readonly title: string; readonly desc: string; readonly icon: ReactNode }) {
  return <div className="border border-bd bg-white p-7"><div className="mb-4 flex items-center justify-between"><div className="grid h-12 w-12 place-items-center border border-gold/40 text-gold-d">{icon}</div></div><h3 className="h3 text-tx">{title}</h3><p className="mt-2 text-[15px] leading-[1.8] text-tx2">{desc}</p></div>;
}
