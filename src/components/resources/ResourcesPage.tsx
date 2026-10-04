import Link from "next/link";
import type { ReactNode } from "react";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { BuildingIcon, CompassIcon, FileIcon, ReceiptIcon } from "@/components/icons/LineIcons";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { SUBSIDIES, type Subsidy } from "@/data/subsidies";
import { resourcesPageEn } from "@/i18n/en/resources-page";
import { SUBSIDIES_EN } from "@/i18n/en/subsidies";
import { localizedHref, type Locale } from "@/i18n/locale";
import { resourcesPageZh } from "@/i18n/zh/resources-page";

const EXPLORE_ICONS = [
  <BuildingIcon key="cases" size={22} />,
  <FileIcon key="insights" size={22} />,
  <CompassIcon key="assess" size={22} />,
  <ReceiptIcon key="tradepilot" size={22} />,
] as const;

export function ResourcesPage({ locale = "zh" }: { readonly locale?: Locale }) {
  const copy = locale === "en" ? resourcesPageEn : resourcesPageZh;
  const subsidies = locale === "en" ? SUBSIDIES_EN : SUBSIDIES;

  return <>
    <BreadcrumbJsonLd items={[{ name: copy.home, path: localizedHref(locale, "/") }, { name: copy.breadcrumb, path: localizedHref(locale, "/resources") }]} />
    <div className="bg-white">
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/hero/hero-compass-1600.webp" video={HERO_VIDEOS.resources} />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60"><Link href={localizedHref(locale, "/")} className="hover:text-white">{copy.home}</Link><span aria-hidden="true" className="text-white/30">/</span><span className="text-white/75">{copy.breadcrumb}</span></nav>
          <h1 className="h1 mb-6 max-w-[880px] text-white">{copy.title[0]}<br /><span className="text-gold">{copy.title[1]}</span></h1>
          <p className="lead max-w-[640px] !text-white/75">{copy.lead}</p>
        </div>
        <ScrollCue label={copy.scrollCue} />
      </section>

      <section className="bg-white py-[80px] md:py-[110px]">
        <div className="lufe-container">
          <h2 className="h2 text-tx">{copy.subsidies.heading}</h2>
          <p className="lead mt-5 max-w-[700px]">{copy.subsidies.lead}</p>
          <div className="mt-10">
            <div className="hidden grid-cols-[48px_1.6fr_1fr_1.2fr_1.2fr] gap-4 border-b border-bd pb-3 text-[12px] font-semibold text-tx3 md:grid">{copy.subsidies.columns.map((column) => <span key={column}>{column}</span>)}</div>
            {subsidies.map((subsidy) => <SubsidyRow key={subsidy.slug} subsidy={subsidy} locale={locale} />)}
          </div>
          <Link href={localizedHref(locale, "/resources/subsidies")} className="mt-8 inline-block text-[15px] font-semibold text-gold-d hover:text-navy">{copy.subsidies.action}</Link>
        </div>
      </section>

      <section className="bg-cream py-[80px] md:py-[110px]">
        <div className="lufe-container">
          <h2 className="h2 mb-10 text-tx">{copy.explore.heading[0]}<br /><span className="text-gold-d">{copy.explore.heading[1]}</span></h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {copy.explore.items.map((item, index) => <ExploreTile key={item.href} {...item} icon={EXPLORE_ICONS[index]!} locale={locale} />)}
          </div>
        </div>
      </section>
    </div>
  </>;
}

function SubsidyRow({ subsidy, locale }: { readonly subsidy: Subsidy; readonly locale: Locale }) {
  return <Link href={localizedHref(locale, `/resources/subsidies#${subsidy.slug}`)} className="grid gap-2 border-t border-bd py-5 transition-transform hover:bg-cream active:scale-[.995] md:grid-cols-[48px_1.6fr_1fr_1.2fr_1.2fr] md:gap-4">
    <span className="num text-gold-d">{subsidy.num}</span>
    <strong className="text-[16px] font-semibold text-tx">{subsidy.shortTitle}</strong>
    <span className="text-[14px] text-tx2">{subsidy.agency}</span>
    <span className="num text-[15px] text-tx">{subsidy.amount}</span>
    <span className="text-[13px] leading-[1.6] text-tx3">{subsidy.deadline}</span>
  </Link>;
}

function ExploreTile({ href, icon, eyebrow, title, description, action, external = false, externalAriaLabel, locale }: {
  readonly href: string;
  readonly icon: ReactNode;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly action: string;
  readonly external?: boolean;
  readonly externalAriaLabel?: string;
  readonly locale: Locale;
}) {
  const className = "group flex min-h-[280px] flex-col border border-bd bg-white p-7 transition-[border-color,transform] active:scale-[.985] md:p-8 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-gold";
  const content = <><span className="grid h-10 w-10 place-items-center border border-gold/40 text-gold-d">{icon}</span><h3 className="h3 mt-6 text-tx">{title}</h3><p className="mt-3 text-[15px] leading-[1.8] text-tx2">{description}</p><span className="mt-auto pt-8 text-[15px] font-semibold text-navy"><span className="inline-block transition-transform [@media(hover:hover)]:group-hover:translate-x-1">{action}</span></span></>;

  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" aria-label={externalAriaLabel} className={className}>{content}</a>
    : <Link href={localizedHref(locale, href)} className={className}>{content}</Link>;
}
