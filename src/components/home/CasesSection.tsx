"use client";

import Link from "next/link";

import { PackageIcon, SlidersIcon, SproutIcon } from "@/components/icons/LineIcons";
import { Carousel, ExpandCard } from "@/components/ui";
import { isNumericValue } from "@/data/cases";
import { homeCasesEn } from "@/i18n/en/home-cases";
import { localizedHref, type Locale } from "@/i18n/locale";
import { homeCasesZh, type HomeCasesCopy } from "@/i18n/zh/home-cases";

type Industry = "food" | "personal-care" | "fnb";
type Market = "north-america" | "sea";

interface CaseCardData {
  readonly slug: string;
  readonly featured: boolean;
  readonly industry: Industry;
  readonly market: Market;
  readonly tags: readonly { label: string; variant: "sky" | "gold" }[];
  readonly num: string;
  readonly numLabel: string;
  readonly scalePrefix: string;
  readonly title: string;
  readonly painLine: string;
  readonly solutionLine: string;
  readonly route: { from: string; to: string };
  readonly trustSignal?: string;
  readonly hideStoryLink?: boolean;
  readonly image: string;
}

const HOME_CASE_CARD_CONFIG = [
  { slug: "goat-milk-soap-global", featured: false, industry: "personal-care", market: "north-america", image: "/images/hero-video/case-soap-1600.webp" },
  { slug: "fish-floss-us-fda", featured: false, industry: "food", market: "north-america", image: "/images/hero-video/case-floss-1600.webp" },
  { slug: "bubble-tea", featured: true, industry: "fnb", market: "sea", image: "/images/cases/case-4-manila-1080.webp" },
] as const;

const HOME_CASE_ROAD_CONFIG = [
  { icon: SproutIcon },
  { icon: SlidersIcon },
  { icon: PackageIcon },
] as const;

function createCaseCards(copy: HomeCasesCopy): CaseCardData[] {
  return HOME_CASE_CARD_CONFIG.map((config, index) => ({ ...config, ...copy.cards[index]! }));
}

function createCaseRoads(copy: HomeCasesCopy) {
  return HOME_CASE_ROAD_CONFIG.map((config, index) => ({ ...config, ...copy.roads[index]! }));
}

export const HOME_CASE_CARDS = createCaseCards(homeCasesZh);
export const HOME_CASE_ROADS = createCaseRoads(homeCasesZh);

const tagStyles: Record<"sky" | "gold", string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold-d",
};

function FromToRoute({ from, to }: { from: string; to: string }) {
  return (
    <div className="flex min-w-0 items-center gap-2 text-[11px] font-medium text-tx3">
      <span>{from}</span>
      <svg width="36" height="10" viewBox="0 0 36 10" aria-hidden="true" className="shrink-0">
        <path d="M0,5 Q18,-1 36,5" stroke="#D4A85C" strokeWidth="1.5" fill="none" opacity="0.55" />
      </svg>
      <span className="text-tx2">{to}</span>
    </div>
  );
}

function TrustSignal({ text }: { text: string }) {
  return <span className="text-[11px] font-medium text-tx3">{text}</span>;
}

function CaseTags({ tags }: { tags: CaseCardData["tags"] }) {
  return (
    <div className="mb-3 flex flex-wrap gap-1.5">
      {tags.map((tag) => (
        <span key={tag.label} className={`px-2.5 py-[3px] text-[11px] font-medium ${tagStyles[tag.variant]}`}>
          {tag.label}
        </span>
      ))}
    </div>
  );
}

function CaseCard({ item, copy, locale }: { readonly item: CaseCardData; readonly copy: HomeCasesCopy; readonly locale: Locale }) {
  const storyLabel = item.featured ? copy.storyLabels.featured : copy.storyLabels.standard;

  return (
    <ExpandCard
      title={item.title}
      image={{ src: item.image, alt: item.title }}
      className="h-full"
      closeLabel={copy.closeLabel}
      card={
        <article className="lufe-card flex h-full min-w-0 flex-col overflow-hidden border border-bd bg-white shadow-[0_12px_32px_rgba(16,27,48,0.08)]">
          <div className="flex min-w-0 flex-1 flex-col p-6">
            <CaseTags tags={item.tags} />
            {item.featured && (
              <span className="mb-4 inline-flex w-fit bg-gold/15 px-2.5 py-1 text-[11px] font-semibold tracking-[0.5px] text-gold-d">
                {copy.featuredLabel}
              </span>
            )}
            {isNumericValue(item.num) ? (
              <div data-lufe-counter className={`font-sans font-semibold leading-none tabular-nums tracking-[-0.035em] text-gold-d ${item.featured ? "text-[52px]" : "text-[40px]"}`}>{item.num}</div>
            ) : (
              <div className={`font-sans font-[650] leading-[1.15] tracking-[-.02em] text-gold-d ${item.featured ? "text-[44px]" : "text-[36px]"}`}>{item.num}</div>
            )}
            <div className="mb-4 mt-2 text-[13px] font-medium text-tx3">{item.numLabel}</div>
            <div className="mb-2 text-[13px] font-medium text-tx2">{item.scalePrefix}</div>
            <h3 className="font-sans text-[19px] font-semibold leading-[1.4] text-tx">{item.title}</h3>
            <div className="mt-auto flex items-center justify-between gap-3 border-t border-bd pt-5">
              <FromToRoute from={item.route.from} to={item.route.to} />
              <span aria-hidden="true" className="grid h-[30px] w-[30px] shrink-0 place-items-center border border-navy/30 text-navy">
                <svg viewBox="0 0 16 16" className="h-4 w-4" fill="none">
                  <path d="M8 3v10M3 8h10" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </div>
        </article>
      }
      panel={
        <div>
          <CaseTags tags={item.tags} />
          {item.featured && (
            <span className="mb-4 inline-flex bg-gold/15 px-2.5 py-1 text-[11px] font-semibold tracking-[0.5px] text-gold-d">
              {copy.featuredLabel}
            </span>
          )}
          {isNumericValue(item.num) ? (
            <div data-lufe-counter className="font-sans text-[56px] font-semibold leading-none tabular-nums tracking-[-0.035em] text-gold-d">{item.num}</div>
          ) : (
            <div className={`font-sans font-[650] leading-[1.15] tracking-[-.02em] text-gold-d ${item.featured ? "text-[44px]" : "text-[36px]"}`}>{item.num}</div>
          )}
          <p className="mb-5 mt-2 text-[14px] font-medium text-tx3">{item.numLabel}</p>
          <p className="mb-6 text-[13px] font-medium text-tx2">{item.scalePrefix}</p>
          <div className="border-t border-bd py-4">
            <h3 className="mb-2 text-[14px] font-semibold text-tx3">{copy.painHeading}</h3>
            <p className="leading-[1.85] text-tx2">{item.painLine}</p>
          </div>
          <div className="border-t border-bd py-4">
            <h3 className="mb-2 text-[14px] font-semibold text-gold-d">{copy.solutionHeading}</h3>
            <p className="leading-[1.85] text-tx">{item.solutionLine}</p>
          </div>
          <div className="flex flex-wrap justify-between gap-3 border-t border-bd py-4 text-[13px] text-tx3">
            <FromToRoute from={item.route.from} to={item.route.to} />
            {item.trustSignal && <TrustSignal text={item.trustSignal} />}
          </div>
          {!item.hideStoryLink && (
            <Link href={localizedHref(locale, `/cases/${item.slug}`)} className="inline-flex bg-navy px-5 py-3 text-[14px] font-semibold text-white">
              {storyLabel}
            </Link>
          )}
        </div>
      }
    />
  );
}

export function CasesSection({ locale = "zh" }: { readonly locale?: Locale } = {}) {
  const copy = locale === "en" ? homeCasesEn : homeCasesZh;
  const cards = createCaseCards(copy);
  const roads = createCaseRoads(copy);

  return (
    <section className="overflow-hidden py-[80px]">
      <div className="lufe-container">
        <div className="max-w-[820px]">
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-tx [text-wrap:balance]">
            {copy.heading[0]}
            <br />
            <span className="text-gold-d">{copy.heading[1]}</span>
          </h2>
          <p className="mt-5 text-[17px] leading-[1.8] text-tx2">{copy.lead}</p>
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {roads.map((road) => {
            const Icon = road.icon;

            return (
            <article key={road.label} className="lufe-card group border border-bd bg-cream p-6 md:p-7">
              <span aria-hidden="true" className="mb-5 grid h-10 w-10 place-items-center border border-gold/40 text-gold-d transition-colors duration-200 [@media(hover:hover)]:group-hover:border-gold-d">
                <Icon size={20} className="transition-transform duration-200 [@media(hover:hover)]:group-hover:translate-x-px" />
              </span>
              <h3 className="font-sans text-[22px] font-semibold leading-[1.35] text-tx">{road.title}</h3>
              <p className="mt-4 whitespace-pre-line text-[15px] leading-[1.85] text-tx2">{road.detail}</p>
            </article>
            );
          })}
        </div>
      </div>

      <div className="lufe-container">
        <Carousel
          label={copy.carousel.label}
          previousLabel={copy.carousel.previous}
          nextLabel={copy.carousel.next}
          className="mt-8 overflow-hidden"
          itemClassName="basis-[82vw] max-w-[520px] md:basis-[380px]"
        >
          {cards.map((item) => <CaseCard key={item.slug} item={item} copy={copy} locale={locale} />)}
        </Carousel>
      </div>

      <div className="lufe-container mt-4">
        <Link href={localizedHref(locale, "/cases")} className="inline-flex text-[16px] font-semibold text-sky">
          {copy.allCases}
        </Link>
      </div>
    </section>
  );
}
