"use client";

import { useRef, useState, type RefObject } from "react";
import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { ExpandCard, Segmented, flip } from "@/components/ui";
import { PackageIcon, SlidersIcon, SproutIcon } from "@/components/icons/LineIcons";
import {
  CASES,
  CASE_CARD_META,
  INDUSTRIES,
  isNumericValue,
  MARKETS,
  type CaseCardMeta,
  type CaseStudy,
  type IndustryFilter,
  type MarketFilter,
} from "@/data/cases";
import { CASES_EN, CASE_CARD_META_EN, INDUSTRIES_EN, MARKETS_EN } from "@/i18n/en/cases";
import { casesPageEn } from "@/i18n/en/cases-page";
import { localizedHref, type Locale } from "@/i18n/locale";
import { casesPageZh } from "@/i18n/zh/cases-page";

import { useMessageBox } from "../MessageBox";

const CASE_ROAD_ICONS = [SproutIcon, SlidersIcon, PackageIcon] as const;

export const CASE_ROADS = casesPageZh.roads.map((road, index) => ({
  ...road,
  icon: CASE_ROAD_ICONS[index]!,
}));

interface CasesPageContentProps {
  readonly industry: IndustryFilter;
  readonly market: MarketFilter;
  readonly locale?: Locale;
  readonly onIndustryChange?: (industry: IndustryFilter) => void;
  readonly onMarketChange?: (market: MarketFilter) => void;
  readonly onMessageOpen?: () => void;
  readonly caseStackRef?: RefObject<HTMLDivElement | null>;
}

function matchesFilter(caseItem: CaseStudy, industry: IndustryFilter, market: MarketFilter) {
  return (industry === "all" || caseItem.industry === industry) && (market === "all" || caseItem.market === market);
}

function isIndustryFilter(value: string, industries: readonly { readonly value: string }[]): value is IndustryFilter {
  return industries.some((option) => option.value === value);
}

function isMarketFilter(value: string, markets: readonly { readonly value: string }[]): value is MarketFilter {
  return markets.some((option) => option.value === value);
}

function CaseTags({ tags }: { readonly tags: readonly CaseStudy["tags"][number][] }) {
  return <p className="text-[13px] font-medium text-tx3">{tags.map((tag) => tag.label).join(" · ")}</p>;
}

function CasePanel({
  caseItem,
  cardMeta,
  locale,
}: {
  readonly caseItem: CaseStudy;
  readonly cardMeta: Record<string, CaseCardMeta>;
  readonly locale: Locale;
}) {
  const meta = cardMeta[caseItem.slug]!;
  const copy = locale === "en" ? casesPageEn : casesPageZh;

  return (
    <div>
      <CaseTags tags={caseItem.tags} />
      <div className={`${isNumericValue(caseItem.num) ? "num" : "font-sans font-[650]"} mt-2 text-[clamp(40px,5vw,56px)] leading-[0.95] text-gold-d`}>{caseItem.num}</div>
      <p className="mt-2 text-[17px] leading-[1.4] text-tx2">{meta.headline}</p>
      <p className="mt-6 text-[15.5px] leading-[1.8] text-tx2">{caseItem.summary}</p>

      <div className="mt-6 border-t border-bd">
        {meta.beats.map((beat, index) => (
          <div key={index} className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 border-b border-bd py-4">
            <span className="num text-[14px] text-gold-d">{String(index + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
              <p className="text-[15.5px] leading-[1.8] text-tx2">{beat}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="py-5 text-[14px] leading-[1.7] text-tx3">{copy.card.detail}</p>
      <div className="flex flex-wrap gap-3 border-t border-bd pt-5">
        <Link href={localizedHref(locale, `/cases/${caseItem.slug}`)} className="inline-flex bg-navy px-5 py-3 text-[14px] font-semibold text-white hover:bg-navy-l">
          {copy.card.readCase}
        </Link>
        <Link href={localizedHref(locale, `/assess?case=${caseItem.slug}`)} className="inline-flex bg-black/[.06] px-5 py-3 text-[14px] font-semibold text-tx hover:bg-black/[.1]">
          {copy.card.compare}
        </Link>
      </div>
    </div>
  );
}

function CaseCard({
  caseItem,
  cardMeta,
  locale,
}: {
  readonly caseItem: CaseStudy;
  readonly cardMeta: Record<string, CaseCardMeta>;
  readonly locale: Locale;
}) {
  const meta = cardMeta[caseItem.slug]!;
  const copy = locale === "en" ? casesPageEn : casesPageZh;

  return (
    <ExpandCard
      title={caseItem.title}
      image={{ src: caseItem.heroImage, alt: caseItem.title }}
      closeLabel={copy.card.close}
      card={
        <article className="lufe-card group overflow-hidden border border-bd bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-gold/60">
          <div className="relative h-[clamp(250px,35vw,340px)] overflow-hidden bg-navy">
            <TieredImage
              src={caseItem.heroImage}
              alt={caseItem.title}
              sizes="(max-width: 1080px) 100vw, 1080px"
              className="lufe-case-cover absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />

            <div className="absolute left-6 top-6 flex items-center gap-2 md:left-10 md:top-7">
              <span aria-hidden="true" className="h-px w-6 bg-gold/80" />
              <span className="text-[12px] font-semibold text-gold">{caseItem.tags.map((tag) => tag.label).join(" · ")}</span>
            </div>

            <div className="absolute bottom-7 left-6 right-6 md:bottom-8 md:left-10 md:right-10">
              {isNumericValue(caseItem.num) ? (
                <div data-lufe-counter className="num mb-2 text-[clamp(50px,7vw,72px)] leading-[0.95] text-gold">{caseItem.num}</div>
              ) : (
                <div className="mb-2 font-sans text-[clamp(40px,5vw,56px)] font-[650] leading-[0.95] tracking-[-.02em] text-gold">{caseItem.num}</div>
              )}
              <p className="text-[clamp(16px,2vw,18px)] leading-[1.4] text-white">{meta.headline}</p>
            </div>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_40px] gap-x-6 gap-y-4 p-6 md:gap-x-7 md:px-10 md:py-7">
            <div className="min-w-0">
              <h2 className="h3 text-tx">「{meta.painTitle}」</h2>
            </div>
            <span aria-hidden="true" className="grid h-10 w-10 place-items-center border border-bd text-[22px] leading-none text-tx2 group-hover:border-gold group-hover:text-gold-d">
              +
            </span>
            <p className="col-span-full text-[14px] font-medium text-tx3">{copy.card.expand}</p>
          </div>
        </article>
      }
      panel={<CasePanel caseItem={caseItem} cardMeta={cardMeta} locale={locale} />}
    />
  );
}

/**
 * Presentational export keeps every filter result and expanded panel in SSR markup.
 * The stateful wrapper below only changes visibility and animates card positions.
 */
export function CasesPageContent({
  industry,
  market,
  locale = "zh",
  onIndustryChange = () => {},
  onMarketChange = () => {},
  onMessageOpen = () => {},
  caseStackRef,
}: CasesPageContentProps) {
  const copy = locale === "en" ? casesPageEn : casesPageZh;
  const cases = locale === "en" ? CASES_EN : CASES;
  const cardMeta = locale === "en" ? CASE_CARD_META_EN : CASE_CARD_META;
  const industries = locale === "en" ? INDUSTRIES_EN : INDUSTRIES;
  const markets = locale === "en" ? MARKETS_EN : MARKETS;
  const visibleCount = cases.filter((caseItem) => matchesFilter(caseItem, industry, market)).length;
  const hasMatches = visibleCount > 0;

  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/v5/cases-1600.webp" srcSet="/images/v5/cases-1600.webp 1600w, /images/v5/cases-2400.webp 2400w" position="center 60%" video={HERO_VIDEOS.cases} />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href={localizedHref(locale, "/")} className="hover:text-white">{copy.home}</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-white/75">{copy.breadcrumb}</span>
          </nav>

          <h1 className="h1 mb-6 max-w-[880px] text-white">{copy.title[0]}<br /><span className="text-gold">{copy.title[1]}</span></h1>
          <p className="lead max-w-[640px] whitespace-pre-line !text-white/75">{copy.lead}</p>
        </div>
        <ScrollCue label={copy.scrollCue} />
      </section>

      <section className="bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-3">
            {copy.roads.map((road, index) => {
              const Icon = CASE_ROAD_ICONS[index]!;
              return <article key={index} className="group lufe-card border border-bd bg-cream p-6"><div data-case-road-icon="" className="grid h-10 w-10 place-items-center border border-gold/40 text-gold-d [@media(hover:hover)]:group-hover:border-gold-d"><Icon size={20} /></div><p className="mt-4 text-[14px] font-semibold text-gold-d">{road.label}</p><h2 className="h3 mt-3 text-tx">{road.title}</h2><p className="mt-4 text-[15px] leading-[1.8] text-tx2">{road.body}</p><div className="mt-6 border-t border-bd pt-4 text-[14px] leading-[1.8] text-tx2"><strong className="block text-tx">{copy.card.lesson}</strong>{road.lesson}</div></article>;
            })}
          </div>
        </div>
      </section>

      <section className="overflow-hidden bg-white pb-[80px] pt-[60px] md:pb-[110px] md:pt-[80px]">
        <div className="lufe-container min-w-0">
          <div className="mb-10 flex flex-wrap items-center gap-x-7 gap-y-5 md:mb-11">
            <div className="min-w-0">
              <div className="max-w-full overflow-x-auto pb-1">
                <Segmented
                  label={copy.filters.industry}
                  value={industry}
                  onChange={(value) => {
                    if (isIndustryFilter(value, industries)) onIndustryChange(value);
                  }}
                  options={industries.map((option) => ({ value: option.value, label: option.label }))}
                  className="max-w-none"
                />
              </div>
            </div>

            <div className="min-w-0">
              <div className="max-w-full overflow-x-auto pb-1">
                <Segmented
                  label={copy.filters.market}
                  value={market}
                  onChange={(value) => {
                    if (isMarketFilter(value, markets)) onMarketChange(value);
                  }}
                  options={markets.map((option) => ({ value: option.value, label: option.label }))}
                  className="max-w-none"
                />
              </div>
            </div>

            <p className="ml-auto whitespace-nowrap text-[13px] text-tx3" aria-live="polite">{copy.filters.countPrefix}{copy.filters.countPrefix && " "}{visibleCount}{copy.filters.countSuffix && " "}{copy.filters.countSuffix}</p>
          </div>

          <div ref={caseStackRef} className="grid min-w-0 gap-[22px]" aria-live="polite">
            {cases.map((caseItem) => {
              const isMatch = matchesFilter(caseItem, industry, market);
              return (
                <div key={caseItem.slug} data-key={caseItem.slug} className={`min-w-0 ${isMatch ? "" : "hidden"}`}>
                  <CaseCard caseItem={caseItem} cardMeta={cardMeta} locale={locale} />
                </div>
              );
            })}
          </div>

          <div className={`border border-bd bg-cream px-6 py-20 text-center text-[15.5px] text-tx3 ${hasMatches ? "hidden" : ""}`}>
            {copy.filters.empty}
          </div>

          <div className="mt-20 grid gap-8 border-t border-bd pt-14 lg:grid-cols-12 lg:items-stretch">
            <div className="lg:col-span-7">
              <h2 className="h2 text-tx">{copy.cta.heading}</h2>
              <p className="mt-3 max-w-[440px] text-[15px] leading-[1.8] text-tx2">{copy.cta.body}</p>
              <button onClick={onMessageOpen} className="mt-6 cursor-pointer bg-gold px-8 py-3.5 text-[16.5px] font-semibold text-navy hover:bg-gold-l">
                {copy.cta.button}
              </button>
            </div>
            <Link href={localizedHref(locale, "/assess")} className="group bg-navy p-8 text-white transition-transform active:scale-[.985] [@media(hover:hover)]:hover:-translate-y-1 md:p-10 lg:col-span-5">
              <h3 className="h3 mt-3 text-white">{copy.cta.assessHeading}</h3>
              <p className="mt-3 text-[15px] leading-[1.8] text-white/70">{copy.cta.assessBody}</p>
              <div className="mt-6 flex gap-2">
                {copy.cta.assessChips.map((chip) => <span key={chip} className="border border-white/25 px-3 py-1 text-[13px] text-white/75">{chip}</span>)}
              </div>
              <span aria-label={`${copy.cta.assessLabel} →`} className="mt-8 inline-flex text-[15px] font-semibold text-gold">{copy.cta.assessLabel} <span aria-hidden="true" className="ml-1 transition-transform [@media(hover:hover)]:group-hover:translate-x-1">→</span></span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export function CasesPage({ locale = "zh" }: { readonly locale?: Locale } = {}) {
  const { open } = useMessageBox();
  const [industry, setIndustry] = useState<IndustryFilter>("all");
  const [market, setMarket] = useState<MarketFilter>("all");
  const caseStackRef = useRef<HTMLDivElement>(null);

  const updateFilter = (mutate: () => void) => {
    const stack = caseStackRef.current;
    if (stack) {
      flip(stack, mutate);
      return;
    }
    mutate();
  };

  return (
    <CasesPageContent
      industry={industry}
      market={market}
      locale={locale}
      onIndustryChange={(value) => updateFilter(() => setIndustry(value))}
      onMarketChange={(value) => updateFilter(() => setMarket(value))}
      onMessageOpen={open}
      caseStackRef={caseStackRef}
    />
  );
}
