import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { LinkedInIcon } from "@/components/icons/LineIcons";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { aaronAuthorPageEn } from "@/i18n/en/aaron-author-page";
import { localizedHref, type Locale } from "@/i18n/locale";
import { aaronAuthorPageZh } from "@/i18n/zh/aaron-author-page";
import { toInsightCard } from "@/lib/articles/presentation";
import { getPublishedEnglishArticles } from "@/lib/articles/english";
import { getArticlePublishedDate, getPublishedArticles } from "@/lib/articles/published";

import { SubsidiesCTASection } from "../subsidy/SubsidiesCTASection";
import { AuthorArticleList } from "./AuthorArticleList";

export function AaronAuthorPage({ locale = "zh" }: { readonly locale?: Locale }) {
  const publishedArticles = locale === "en" ? getPublishedEnglishArticles() : getPublishedArticles();
  const authorArticles = publishedArticles.map(toInsightCard);
  const latestDate = [...publishedArticles]
    .map(getArticlePublishedDate)
    .sort((first, second) => second.localeCompare(first))[0];
  const copy = locale === "en" ? aaronAuthorPageEn : aaronAuthorPageZh;

  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop
          src="/images/about/author-hero-port-1600.webp"
          srcSet="/images/about/author-hero-port-640.webp 640w, /images/about/author-hero-port-1080.webp 1080w, /images/about/author-hero-port-1600.webp 1600w, /images/about/author-hero-port-2400.webp 2400w"
          position="60% 50%"
          video={HERO_VIDEOS.author}
        />
        <div className="lufe-container lufe-hero-content pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href={localizedHref(locale, "/")} className="hover:text-white">{copy.home}</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <Link href={localizedHref(locale, "/about")} className="hover:text-white">{copy.about}</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-white/75">Aaron Yu</span>
          </nav>
          <h1 className="h1 mb-6 max-w-[880px] text-white">Aaron Yu</h1>
          <p className="mb-3 text-[17px] font-medium text-gold md:text-[18px]">{copy.founderLine}</p>
          <p className="mb-8 max-w-[500px] whitespace-pre-line text-[17px] leading-[1.8] text-white/70">{copy.intro}</p>
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-[14px] text-white/60">
            <span>{copy.articleCountPrefix}{authorArticles.length}{copy.articleCountSuffix}</span>
            {latestDate ? <><span aria-hidden="true">・</span><span>{copy.latestUpdatePrefix}{latestDate}</span></> : null}
            <span aria-hidden="true">・</span>
            <a href="https://www.linkedin.com/in/wibp/" target="_blank" rel="me noopener" className="inline-flex items-center gap-1 hover:text-white"><LinkedInIcon size={16} />LinkedIn</a>
          </div>
        </div>
      </section>

      <section className="bg-white pb-[80px] pt-[60px] md:pb-[110px] md:pt-[80px]">
        <div className="lufe-container">
          <h2 className="h2 mb-10">{copy.articleHeading}</h2>
          <AuthorArticleList articles={authorArticles} locale={locale} filterLabel={copy.articleFilter} allLabel={copy.allArticles} emptyLabel={locale === "en" ? copy.emptyArticles : undefined} />
        </div>
      </section>

      <SubsidiesCTASection
        heading={copy.cta.heading}
        body={copy.cta.body}
        buttonLabel={copy.cta.button}
        secondaryLabel={copy.cta.secondary}
        locale={locale}
      />
    </>
  );
}
