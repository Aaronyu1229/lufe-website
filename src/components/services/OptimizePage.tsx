import type { ReactNode } from "react";
import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { Reveal } from "@/components/Reveal";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { FaqSection } from "@/components/faq/FaqSection";
import { optimizePageEn } from "@/i18n/en/optimize-page";
import { localizedHref, type Locale } from "@/i18n/locale";
import { optimizePageZh } from "@/i18n/zh/optimize-page";

import { ContactButton } from "./ContactButton";

export const OPTIMIZE_PAIN_POINTS = optimizePageZh.painPoints;
export const OPTIMIZE_SERVICES = optimizePageZh.servicesOffered;
export const OPTIMIZE_FAQS = optimizePageZh.faqs;

function SectionHeading({ children }: { readonly children: ReactNode }) {
  return <h2 className="h2 text-tx">{children}</h2>;
}

export function OptimizePageContent({ relatedReading, locale = "zh" }: { readonly relatedReading?: ReactNode; readonly locale?: Locale }) {
  const copy = locale === "en" ? optimizePageEn : optimizePageZh;

  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/v5/optimize-1600.webp" srcSet="/images/v5/optimize-1600.webp 1600w, /images/v5/optimize-2400.webp 2400w" position="70% 30%" video={HERO_VIDEOS.optimize} />
        <div className="lufe-container lufe-hero-content pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href={localizedHref(locale, "/")} className="hover:text-white">{copy.home}</Link>
            <span className="text-white/30">/</span>
            <Link href={localizedHref(locale, "/services")} className="hover:text-white">{copy.services}</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/75">{copy.breadcrumb}</span>
          </nav>
          <h1 className="h1 mb-6 max-w-[760px] text-white">{copy.heroTitle}</h1>
          <p className="lead max-w-[650px] whitespace-pre-line !text-white/75">{copy.heroScene}</p>
          <ContactButton className="mt-8 cursor-pointer bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l">{copy.heroAction}</ContactButton>
        </div>
        <ScrollCue label={copy.scrollCueLabel} />
      </section>

      <div className="border-b border-bd bg-cream py-4 text-[14px] leading-[1.8] text-tx2">
        <p className="lufe-container"><strong className="text-tx">{copy.advanced.title}</strong>{copy.advanced.beforeLink}<Link href={localizedHref(locale, "/services")} className="font-semibold text-sky hover:text-navy">{copy.advanced.link}</Link>{copy.advanced.afterLink}</p>
      </div>

      <section className="bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <SectionHeading>{copy.painHeading.prefix}<span className="text-gold-d">{copy.painHeading.highlight}</span></SectionHeading>
          <Reveal className="mt-8 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-5">
            {copy.painPoints.map((point) => (
              <Link key={point.anchor} href={`#${point.anchor}`} className="lufe-card border border-bd bg-cream p-5 hover:border-gold hover:bg-white">
                <h3 className="h3 text-tx">{point.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.8] text-tx2">{point.scene}</p>
                <p className="mt-5 text-[14px] font-semibold text-sky">→ {point.action}</p>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="opt-cost" className="scroll-mt-[90px] bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative min-h-[260px] overflow-hidden border border-bd md:order-2"><TieredImage src="/images/services/services-optimize-whiteboard-1600.webp" alt={copy.cost.imageAlt} sizes="(max-width: 767px) 100vw, 50vw" className="absolute inset-0 h-full w-full object-cover" /></div>
          <div className="md:order-1">
            <SectionHeading>{copy.cost.headingPrefix}<span className="text-gold-d">{copy.cost.headingHighlight}</span></SectionHeading>
            <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.9] text-tx2">{copy.cost.body}</p>
            <p className="mt-6 border-l-4 border-gold bg-white px-5 py-4 text-[16px] font-medium leading-[1.8] text-tx">{copy.cost.callout}</p>
          </div>
        </div>
      </section>

      <section id="opt-sales" className="scroll-mt-[90px] bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-12">
          <div>
            <SectionHeading>{copy.sales.headingPrefix}<span className="text-gold-d">{copy.sales.headingHighlight}</span></SectionHeading>
            <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.9] text-tx2">{copy.sales.body}</p>
          </div>
          <div className="grid gap-3 border border-bd bg-cream p-5 text-[16px] font-medium text-tx">{copy.sales.items.map((item) => <p key={item}>{item}</p>)}</div>
        </div>
      </section>

      <section id="opt-find" className="scroll-mt-[90px] bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative min-h-[260px] overflow-hidden border border-bd md:order-2"><TieredImage src="/images/insights/amazon-category-1600.webp" alt={copy.find.imageAlt} sizes="(max-width: 767px) 100vw, 50vw" className="absolute inset-0 h-full w-full object-cover" /></div>
          <div className="md:order-1">
            <SectionHeading>{copy.find.headingPrefix}<span className="text-gold-d">{copy.find.headingHighlight}</span></SectionHeading>
            <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.9] text-tx2">{copy.find.body}</p>
            <p className="mt-6 border-l-4 border-gold bg-white px-5 py-4 text-[16px] font-medium leading-[1.8] text-tx">{copy.find.callout}</p>
          </div>
        </div>
      </section>

      <section id="opt-system" className="scroll-mt-[90px] bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <SectionHeading>{copy.system.headingPrefix}<span className="text-gold-d">{copy.system.headingHighlight}</span></SectionHeading>
          <p className="mt-5 max-w-[760px] whitespace-pre-line text-[16px] leading-[1.9] text-tx2">{copy.system.body}</p>
          <Reveal className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-5">
            {copy.system.steps.map((step) => <p key={step} className="lufe-card border border-bd bg-cream p-4 text-[15px] font-medium leading-[1.7] text-tx">{step}</p>)}
          </Reveal>
          <p className="mt-7 border-l-4 border-gold bg-cream px-5 py-4 text-[16px] font-medium leading-[1.8] text-tx">{copy.system.callouts[0]}</p>
          <p className="mt-4 border-l-4 border-gold bg-cream px-5 py-4 text-[16px] font-medium leading-[1.8] text-tx">{copy.system.callouts[1]}</p>
        </div>
      </section>

      <section id="opt-dashboard" className="scroll-mt-[90px] bg-navy py-[72px] text-white md:py-[88px]">
        <div className="lufe-container">
          <h2 className="h2 text-white">{copy.dashboard.headingPrefix}<span className="text-gold">{copy.dashboard.headingHighlight}</span></h2>
          <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.9] text-white/75">{copy.dashboard.body}</p>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <SectionHeading>{copy.startHeading}</SectionHeading>
          <Reveal className="mt-8 grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
            {copy.servicesOffered.map((service) => <article key={service.title} className="lufe-card border-t-4 border-gold bg-white p-6 md:p-8"><p className="text-[14px] font-semibold text-gold-d">{service.title}</p><h3 className="h3 mt-3 text-tx">{service.timeline}</h3><div className="mt-6 grid gap-4">{service.details.map(([label, detail]) => <p key={label} className="text-[15px] leading-[1.8] text-tx2"><strong className="text-tx">{label}：</strong>{detail}</p>)}</div></article>)}
          </Reveal>
        </div>
      </section>

      <FaqSection title={copy.faq.title} moreLabel={copy.faq.more} idPrefix="optimize-faq" items={copy.faqs.map(([question, answer, takeaway], index) => ({ num: String(index + 1).padStart(2, "0"), question, answer, takeaway }))} className="bg-white py-[72px] md:py-[96px]" askLabel={copy.faq.ask} />

      {relatedReading}

      <section className="bg-navy py-[78px] text-white md:py-[96px]">
        <div className="lufe-container"><div className="mx-auto max-w-[720px] text-center">
          <h2 className="h2 text-white">{copy.closing.title}</h2>
          <p className="mt-4 text-[16px] leading-[1.85] text-white/70">{copy.closing.line}</p>
          <ContactButton className="mt-8 cursor-pointer bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l">{copy.closing.action}</ContactButton>
        </div></div>
      </section>
    </>
  );
}

export function OptimizePage({ locale = "zh" }: { readonly locale?: Locale }) {
  return <OptimizePageContent locale={locale} />;
}
