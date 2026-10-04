"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { InsightArticleCard } from "@/components/insights/InsightArticleCard";
import { InsightCta } from "@/components/insights/InsightCta";
import { Segmented, flip } from "@/components/ui";
import { CHAPTER_ARTICLES, CHAPTER_ARTICLE_TAGS, type ArticleChapterKey } from "@/data/chapters";
import { CATEGORY_LABELS_EN } from "@/data/en/article-categories";
import { insightsEn } from "@/i18n/en/insights";
import { localizedHref, type Locale } from "@/i18n/locale";
import { insightsZh } from "@/i18n/zh/insights";
import type { InsightCard } from "@/lib/articles/presentation";

export const INSIGHT_CHAPTERS = [
  { key: "all", label: insightsZh.page.all },
  { key: "m1", label: insightsZh.page.chapterLabels.m1 },
  { key: "m3", label: insightsZh.page.chapterLabels.m3 },
  { key: "m9", label: insightsZh.page.chapterLabels.m9 },
  { key: "after", label: insightsZh.page.chapterLabels.after },
  { key: "na", label: insightsZh.page.chapterLabels.na },
  { key: "sub", label: insightsZh.page.chapterLabels.sub },
] as const;

/** Featured article per filter; filters not listed keep the newest-article default ("all") or show none. */
const FEATURED_SLUG_BY_FILTER: Partial<Record<InsightFilter, string>> = { m1: "why-philippines-first" };

export type InsightFilter = (typeof INSIGHT_CHAPTERS)[number]["key"];

const STATIC_CHAPTER_BY_SLUG: Readonly<Record<string, ArticleChapterKey>> = Object.fromEntries(
  Object.entries(CHAPTER_ARTICLES).flatMap(([key, slugs]) => slugs.map((slug) => [slug, key as ArticleChapterKey])),
);

interface Props {
  readonly articles: readonly InsightCard[];
  readonly chapterBySlug?: Readonly<Record<string, ArticleChapterKey>>;
  readonly locale?: Locale;
}

interface InsightsPageContentProps extends Props {
  readonly active: InsightFilter;
  readonly onCategoryChange?: (category: InsightFilter) => void;
  readonly articleGridRef?: RefObject<HTMLDivElement | null>;
}

function isValidCategory(value: string | null): value is InsightFilter {
  return value !== null && INSIGHT_CHAPTERS.some((chapter) => chapter.key === value);
}

function isExternalImage(image: string): boolean {
  return /^https?:\/\//.test(image);
}

function CoverImage({ article, sizes, className = "" }: { article: InsightCard; sizes?: string; className?: string }) {
  if (!article.image) return <div aria-hidden="true" className="absolute inset-0 bg-black/[.06]" />;

  return isExternalImage(article.image)
    ? (
      // Database article images are not known to Next's static image configuration.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={article.image} alt={article.title} className={`absolute inset-0 h-full w-full object-cover ${className}`} />
    )
    : <TieredImage src={article.image} alt={article.title} sizes={sizes ?? "100vw"} className={`absolute inset-0 h-full w-full object-cover ${className}`} />;
}

function chapterForArticle(slug: string, chapterBySlug: Readonly<Record<string, ArticleChapterKey>>): ArticleChapterKey | undefined {
  return chapterBySlug[slug] ?? STATIC_CHAPTER_BY_SLUG[slug];
}

function chapterLabel(key: ArticleChapterKey | undefined, fallback: InsightCard["category"], locale: Locale): string {
  if (key) return (locale === "en" ? insightsEn : insightsZh).page.chapterLabels[key];
  return locale === "en" ? CATEGORY_LABELS_EN[fallback] : fallback;
}

/** Keeps every selected article and every collapsed card detail in the initial HTML. */
export function InsightsPageContent({
  articles,
  chapterBySlug = {},
  active,
  onCategoryChange = () => {},
  articleGridRef,
  locale = "zh",
}: InsightsPageContentProps) {
  const copy = locale === "en" ? insightsEn : insightsZh;
  const listedArticles = articles;
  const featuredSlug = FEATURED_SLUG_BY_FILTER[active];
  const featured = featuredSlug ? listedArticles.find((article) => article.slug === featuredSlug) : listedArticles[0];
  const showFeatured = active === "all" || Boolean(featuredSlug);
  const hasMatches = active === "all" || listedArticles.some((article) => chapterForArticle(article.slug, chapterBySlug) === active);
  const chapterCounts = new Map<InsightFilter, number>(INSIGHT_CHAPTERS.map((chapter) => [chapter.key, 0]));
  chapterCounts.set("all", listedArticles.length);
  listedArticles.forEach((article) => {
    const chapter = chapterForArticle(article.slug, chapterBySlug);
    if (chapter) chapterCounts.set(chapter, (chapterCounts.get(chapter) ?? 0) + 1);
  });

  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/v5/insights-1600.webp" srcSet="/images/v5/insights-1600.webp 1600w, /images/v5/insights-2400.webp 2400w" video={HERO_VIDEOS.insights} />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60"><Link href={localizedHref(locale, "/")} className="hover:text-white">{copy.page.home}</Link><span aria-hidden="true" className="text-white/30">/</span><span className="text-white/75">{copy.page.breadcrumb}</span></nav>
            <h1 className="h1 mb-6 max-w-[880px] text-white">{copy.page.title[0]}<br /><span className="text-gold">{copy.page.title[1]}</span></h1>
            <p className="lead max-w-[640px] !text-white/75">{copy.page.lead}</p>
          </div>
        </div>
        <ScrollCue label={copy.page.scrollCue} />
      </section>

      <section id="articles" className="scroll-mt-[64px] overflow-hidden bg-white pb-[80px] pt-[60px] md:pb-[110px] md:pt-[80px]">
        <div className="lufe-container min-w-0">
          <div className="mb-10 max-w-full overflow-x-auto pb-1"><Segmented label={copy.page.chapterFilter} value={active} onChange={(value) => { if (isValidCategory(value)) onCategoryChange(value); }} options={INSIGHT_CHAPTERS.filter((chapter) => chapter.key === "all" || (chapterCounts.get(chapter.key) ?? 0) > 0).map((chapter) => ({ value: chapter.key, label: <>{chapter.key === "all" ? copy.page.all : copy.page.chapterLabels[chapter.key]}<span className="lufe-insight-count" aria-hidden="true">{chapterCounts.get(chapter.key) ?? 0}</span></> }))} className="max-w-none" /></div>
          {active === "m1" ? <div className="mb-8 max-w-[760px]">
            <p className="whitespace-pre-line text-[16px] leading-[1.85] text-tx2">{copy.page.firstMonthNote}</p>
            <Link href={localizedHref(locale, "/services/product-testing")} className="mt-3 inline-block text-[14px] font-semibold text-gold-d">{copy.page.productTesting}</Link>
          </div> : null}
          {featured ? <div className={showFeatured ? "mb-8" : "hidden"}>
            <Link href={localizedHref(locale, `/insights/${featured.slug}`)} className="group grid overflow-hidden border border-bd bg-white active:scale-[.995] lg:grid-cols-[7fr_5fr]">
              <div className="relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[340px]"><CoverImage article={featured} sizes="(max-width: 1023px) 100vw, 58vw" className="transition-transform duration-[600ms] [@media(hover:hover)]:group-hover:scale-[1.03]" /></div>
              <div className="min-w-0 p-7 md:p-10"><div className="mb-4 flex flex-wrap items-center gap-2"><span className="bg-gold px-2 py-0.5 text-[11px] font-semibold text-navy">{copy.page.featured}</span><span className="text-[13px] text-tx3">{chapterLabel(chapterForArticle(featured.slug, chapterBySlug), featured.category, locale)}</span></div><h2 className="h3 mb-3 text-tx">{featured.title}</h2><p className="line-clamp-2 text-[15px] leading-[1.8] text-tx2">{featured.summary}</p><p className="mt-6 text-[13px] text-tx3">{featured.date} · {featured.readTime}</p><span className="mt-4 inline-block text-[14px] font-semibold text-gold-d">{copy.page.readArticle}</span></div>
            </Link>
          </div> : null}
          <div ref={articleGridRef} className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
              {listedArticles.map((article, index) => {
              const chapter = chapterForArticle(article.slug, chapterBySlug);
              const isMatch = active === "all" || chapter === active;
              const primaryLabel = chapterLabel(chapter, article.category, locale);
              const isFeaturedInAll = showFeatured && article.slug === featured?.slug;
              return <div key={`${article.slug}-${active}`} data-key={article.slug} className={isMatch && !isFeaturedInAll ? "" : "hidden"}><InsightArticleCard article={article} primaryCategory={primaryLabel} showSecondaryCategory={Boolean(chapter) && article.category !== CHAPTER_ARTICLE_TAGS[chapter!]} animationDelay={`${index * 35}ms`} locale={locale} /></div>;
              })}
          </div>
          {!hasMatches ? <div className="py-16 text-center text-[15.5px] text-tx3">{copy.page.empty}</div> : null}
        </div>
      </section>
      <InsightCta locale={locale} />
    </>
  );
}

function categoryFromLocation(): InsightFilter {
  if (typeof window === "undefined") return "all";
  const category = new URLSearchParams(window.location.search).get("cat");
  return isValidCategory(category) ? category : "all";
}

export function InsightsPage({ articles, chapterBySlug = {}, locale = "zh" }: Props) {
  const [active, setActive] = useState<InsightFilter>("all");
  const articleGridRef = useRef<HTMLDivElement>(null);
  const selectCategory = (category: InsightFilter) => {
    const update = () => setActive(category);
    const grid = articleGridRef.current;
    if (grid && category !== active) flip(grid, update); else update();
    const url = new URL(window.location.href);
    if (category === "all") url.searchParams.delete("cat"); else url.searchParams.set("cat", category);
    window.history.pushState(null, "", `${url.pathname}${url.search}${url.hash}`);
  };

  useEffect(() => {
    const syncCategory = () => setActive(categoryFromLocation());
    syncCategory();
    window.addEventListener("popstate", syncCategory);
    return () => window.removeEventListener("popstate", syncCategory);
  }, []);

  return <InsightsPageContent articles={articles} chapterBySlug={chapterBySlug} active={active} onCategoryChange={selectCategory} articleGridRef={articleGridRef} locale={locale} />;
}
