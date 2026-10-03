"use client";

import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { SnapRail } from "@/components/motion/SnapRail";
import { BuildingIcon, PackageIcon, TargetIcon, UsersIcon } from "@/components/icons/LineIcons";
import { FaqSection } from "@/components/faq/FaqSection";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { servicesPageEn } from "@/i18n/en/services-page";
import { localizedHref, type Locale } from "@/i18n/locale";
import { servicesPageZh } from "@/i18n/zh/services-page";

import { ContactButton } from "./ContactButton";

export { SERVICE_FAQS } from "@/data/serviceFaqs";

type ChapterTile = {
  readonly href: string;
  readonly image: string;
  readonly maxTierWidth?: number;
  readonly badge?: string;
};

type ServicesPageProps = {
  readonly locale?: Locale;
};

const CHAPTER_TILES: readonly ChapterTile[] = [
  {
    href: "/services/product-testing",
    image: "/images/hero-video/chapter-research-1600.webp",
  },
  {
    href: "/services/consignment",
    image: "/images/hero-video/chapter-warehouse-1600.webp",
  },
  {
    href: "/services/localization",
    image: "/images/hero-video/chapter-storefront-1600.webp",
  },
  {
    href: "/services/call-center",
    image: "/images/hero-video/chapter-callcenter-1600.webp",
    maxTierWidth: 1600,
  },
];

const SERVICE_PATHS = [
  {
    href: "/services/product-testing",
    image: "/images/subsidies/card-skyline-1600.webp",
    eyebrowClassName: "text-sky",
  },
  {
    href: "/services/north-america",
    image: "/images/hero-video/chapter-retail-1600.webp",
    eyebrowClassName: "text-gold-d",
  },
] as const;

const CAPABILITIES = [
  {
    icon: UsersIcon,
  },
  {
    icon: PackageIcon,
  },
  {
    icon: BuildingIcon,
  },
  {
    icon: TargetIcon,
  },
] as const;

export function ServicesPage({ locale = "zh" }: ServicesPageProps) {
  const copy = locale === "en" ? servicesPageEn : servicesPageZh;
  const href = (path: string) => localizedHref(locale, path);

  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/services/services-hero-dhl-1600.webp" position="center" video={HERO_VIDEOS.services} />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <div className="min-w-0 max-w-[760px]">
            <nav aria-label={copy.breadcrumbAriaLabel} className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60"><Link href={href("/")} className="hover:text-white">{copy.breadcrumbHome}</Link><span className="text-white/30">/</span><span className="text-white/75">{copy.breadcrumbServices}</span></nav>
            <h1 className="h1 mb-6 max-w-[760px] text-white">{copy.h1}</h1>
            <p className="lead max-w-[720px] !text-white/75">{copy.lead}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ContactButton className="inline-flex cursor-pointer items-center justify-center bg-gold px-6 py-3.5 text-[15px] font-semibold text-navy hover:bg-gold-l active:scale-[.97]">{copy.primaryCta}</ContactButton>
              <a href="#chapters" className="inline-flex items-center justify-center border border-white/40 px-6 py-3.5 text-[15px] font-medium text-white hover:border-white active:scale-[.97]">{copy.secondaryCta}</a>
            </div>
          </div>
        </div>
        <ScrollCue label={copy.scrollCue} />
      </section>

      <section id="chapters" className="scroll-mt-[100px] bg-white py-[88px] md:py-[120px]">
        <div className="lufe-container">
          <h2 className="text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-[-.022em] text-navy">{copy.chaptersHeading}</h2>
          <p className="lead mt-5 text-tx2">{copy.chaptersLead}</p>
          <SnapRail className="mt-12 flex min-w-0 gap-5 overflow-x-auto snap-x snap-mandatory pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
            {CHAPTER_TILES.map((tile, index) => {
              const tileCopy = copy.tiles[index];
              return <Link key={tile.href} href={href(tile.href)} aria-label={copy.tileAriaLabel} className="group relative w-[82%] shrink-0 snap-start transition-transform active:scale-[.985] motion-reduce:transition-none md:w-auto">
                <figure className="relative mt-0 aspect-[4/5] overflow-hidden">
                  <TieredImage src={tile.image} alt={tileCopy.alt} maxTierWidth={tile.maxTierWidth} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 82vw" loading="lazy" className="block h-full w-full object-cover transition-transform duration-[600ms] motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.04] motion-reduce:group-hover:scale-100" />
                  {tile.badge ? <span className="absolute left-0 top-0 bg-gold px-2.5 py-1 text-[12px] font-semibold text-navy">{tile.badge}</span> : null}
                </figure>
                <h3 className="mt-1 text-[24px] font-[650] leading-[1.3] text-tx">{tileCopy.name}</h3>
                <p className="mt-2 text-[15px] leading-[1.75] text-tx2">{tileCopy.line}</p>
                <p className="mt-4 text-[14px] font-semibold text-sky">{copy.tileMore} <span aria-hidden="true" className="inline-block transition-transform motion-reduce:transition-none [@media(hover:hover)]:group-hover:translate-x-[3px]">→</span></p>
              </Link>;
            })}
          </SnapRail>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <h2 className="h2 text-tx">{copy.pathsHeading}</h2>
          <div className="mt-8 grid min-w-0 gap-5 md:grid-cols-2">
            {SERVICE_PATHS.map((path, index) => {
              const pathCopy = copy.paths[index];
              return <Link key={path.href} href={href(path.href)} className="group border border-bd bg-white transition-transform active:scale-[.985] [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-gold motion-reduce:transition-none">
                <figure className="aspect-[16/9] overflow-hidden">
                  <TieredImage src={path.image} alt={pathCopy.alt} sizes="(min-width: 768px) 50vw, 100vw" loading="lazy" className="block h-full w-full object-cover transition-transform duration-[500ms] motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.03] motion-reduce:group-hover:scale-100" />
                </figure>
                <div className="p-6 md:p-9">
                  <p className={`text-[14px] font-semibold ${path.eyebrowClassName}`}>{pathCopy.eyebrow}</p>
                  <h3 className="h3 mt-4 text-tx">{pathCopy.title}</h3>
                  <p className="mt-4 text-[15px] leading-[1.85] text-tx2">{pathCopy.line}</p>
                  <dl className="mt-6">
                    {pathCopy.specs.map(([term, detail]) => (
                      <div key={term} className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 border-t border-bd py-4">
                        <dt className="text-[13px] font-semibold text-tx3">{term}</dt>
                        <dd className="text-[15px] leading-[1.8] text-tx2">{detail}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-2 text-[15px] font-semibold text-sky">{pathCopy.cta}</p>
                </div>
              </Link>;
            })}
          </div>
        </div>
      </section>

      <section className="bg-navy py-[88px] text-white md:py-[112px]">
        <div className="lufe-container">
          <h2 className="text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-[-.022em] text-white">{copy.windowHeading}<span className="block text-gold">{copy.windowHeadingAccent}</span></h2>
          <p className="mt-5 max-w-[680px] text-[17px] leading-[1.85] text-white/70">{copy.windowLead}</p>
          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((capability, index) => {
              const capabilityCopy = copy.capabilities[index];
              const Icon = capability.icon;
              return <div key={index} className="bg-navy p-6 md:p-7"><span aria-hidden="true" className="grid h-10 w-10 place-items-center border border-gold/40 text-gold"><Icon size={20} /></span><h3 className="mt-5 text-[17px] font-[650] text-white">{capabilityCopy.title}</h3><p className="mt-2 text-[15px] leading-[1.8] text-white/70">{capabilityCopy.body}</p></div>;
            })}
          </div>
        </div>
      </section>

      <FaqSection title={copy.faqTitle} askLabel={copy.faqAsk} moreLabel={copy.faqMore} idPrefix="services-faq" items={copy.faqs.map((faq, index) => ({ num: String(index + 1).padStart(2, "0"), question: faq.q, answer: faq.a, takeaway: faq.takeaway }))} className="bg-white py-[72px] md:py-[96px]" />

      <section className="bg-navy py-[78px] text-white md:py-[96px]"><div className="lufe-container"><div className="mx-auto max-w-[720px] text-center"><h2 className="h2 text-white">{copy.ctaHeading}</h2><p className="mt-4 text-[16px] leading-[1.85] text-white/70">{copy.ctaLine}</p><ContactButton className="mt-8 cursor-pointer bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l">{copy.primaryCta}</ContactButton></div></div></section>
    </>
  );
}
