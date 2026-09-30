"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import Image from "next/image";
import Link from "next/link";

import { Segmented, flip } from "@/components/ui";
import { CHAPTER_ARTICLES, CHAPTER_ARTICLE_TAGS, type ArticleChapterKey } from "@/data/chapters";
import type { InsightCard } from "@/lib/articles/presentation";

import { useMessageBox } from "../MessageBox";

const colorMap: Record<string, string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold-d",
  ember: "bg-[rgba(217,139,74,0.08)] text-ember",
};

export const INSIGHT_CHAPTERS = [
  { key: "all", label: "全部" },
  { key: "m1", label: CHAPTER_ARTICLE_TAGS.m1 },
  { key: "m3", label: CHAPTER_ARTICLE_TAGS.m3 },
  { key: "m9", label: CHAPTER_ARTICLE_TAGS.m9 },
  { key: "after", label: CHAPTER_ARTICLE_TAGS.after },
  { key: "na", label: CHAPTER_ARTICLE_TAGS.na },
  { key: "sub", label: CHAPTER_ARTICLE_TAGS.sub },
] as const;

export type InsightFilter = (typeof INSIGHT_CHAPTERS)[number]["key"];

const STATIC_CHAPTER_BY_SLUG: Readonly<Record<string, ArticleChapterKey>> = Object.fromEntries(
  Object.entries(CHAPTER_ARTICLES).flatMap(([key, slugs]) => slugs.map((slug) => [slug, key as ArticleChapterKey])),
);

interface Props {
  readonly articles: readonly InsightCard[];
  readonly chapterBySlug?: Readonly<Record<string, ArticleChapterKey>>;
}

interface InsightsPageContentProps extends Props {
  readonly active: InsightFilter;
  readonly onCategoryChange?: (category: InsightFilter) => void;
  readonly onMessageOpen?: () => void;
  readonly articleGridRef?: RefObject<HTMLDivElement | null>;
}

function isValidCategory(value: string | null): value is InsightFilter {
  return value !== null && INSIGHT_CHAPTERS.some((chapter) => chapter.key === value);
}

function isExternalImage(image: string): boolean {
  return /^https?:\/\//.test(image);
}

function CoverImage({ article, sizes }: { article: InsightCard; sizes?: string }) {
  if (!article.image) return <div aria-hidden="true" className="absolute inset-0 bg-black/[.06]" />;

  return isExternalImage(article.image)
    ? (
      // Database article images are not known to Next's static image configuration.
      // eslint-disable-next-line @next/next/no-img-element
      <img src={article.image} alt={article.title} className="absolute inset-0 h-full w-full object-cover" />
    )
    : <Image src={article.image} alt={article.title} fill sizes={sizes} className="object-cover" />;
}

function chapterForArticle(slug: string, chapterBySlug: Readonly<Record<string, ArticleChapterKey>>): ArticleChapterKey | undefined {
  return chapterBySlug[slug] ?? STATIC_CHAPTER_BY_SLUG[slug];
}

function chapterLabel(key: ArticleChapterKey | undefined, fallback: string): string {
  return key ? CHAPTER_ARTICLE_TAGS[key] : fallback;
}

/** Keeps every selected article and every collapsed card detail in the initial HTML. */
export function InsightsPageContent({
  articles,
  chapterBySlug = {},
  active,
  onCategoryChange = () => {},
  onMessageOpen = () => {},
  articleGridRef,
}: InsightsPageContentProps) {
  const listedArticles = articles.filter((article) => article.slug !== "vietnam-market-entry-guide");
  const featured = listedArticles[0];
  const hasMatches = active === "all" || listedArticles.some((article) => chapterForArticle(article.slug, chapterBySlug) === active);

  return (
    <>
      <section className="relative overflow-hidden bg-navy px-5 pb-[70px] pt-[130px] text-white md:px-10 md:pb-[90px] md:pt-[170px]">
        <div className="absolute inset-0" aria-hidden="true"><Image src="/images/insights/insights-hero-analysis.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-30" /><div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/40" /><div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy" /></div>
        <div className="relative mx-auto grid max-w-[1200px] min-w-0 grid-cols-1 items-start gap-10 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-14">
          <div className="min-w-0">
            <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60"><Link href="/" className="hover:text-white">首頁</Link><span aria-hidden="true" className="text-white/30">/</span><span className="text-white/75">洞察</span></nav>
            <p className="mb-4 text-[14px] font-semibold text-gold">洞察</p>
            <h1 className="display mb-6 max-w-[720px] font-sans text-white">每一章讀到一半會想問的事，<span className="text-gold">這裡先寫好</span></h1>
            <p className="lead mb-10 max-w-[540px] text-white/70">按你現在在故事的哪一個月找。</p>
            <div className="grid max-w-[520px] grid-cols-3 gap-5 border-t border-white/10 pt-6 md:gap-8">{[{ n: String(listedArticles.length), l: "篇實戰文章" }, { n: "6", l: "章節分類" }, { n: "每月", l: "新增更新" }].map((stat) => <div key={stat.l} className="min-w-0"><div className="num text-[clamp(22px,3vw,32px)] leading-none text-gold">{stat.n}</div><div className="mt-1.5 text-[11px] tracking-[0.5px] text-white/50 md:text-[11.5px]">{stat.l}</div></div>)}</div>
          </div>
          {featured ? <div className="hidden min-w-0 lg:block"><Link href={`/insights/${featured.slug}`} className="block overflow-hidden border border-white/10 bg-white/[0.05] hover:border-gold/60"><div className="relative h-[170px] overflow-hidden"><CoverImage article={featured} sizes="(max-width: 1024px) 100vw, 40vw" /><div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" /><div className="absolute bottom-3 left-4 flex items-center gap-2"><span className="bg-gold px-2 py-0.5 text-[10px] font-semibold tracking-[1px] text-navy">精選</span><span className="text-[10.5px] text-white/80">{chapterLabel(chapterForArticle(featured.slug, chapterBySlug), featured.category)}</span></div></div><div className="p-5"><h2 className="h3 mb-2 text-white">{featured.title}</h2><p className="line-clamp-2 text-[14px] leading-[1.75] text-white/70">{featured.summary}</p><div className="mt-3 flex items-center justify-between text-[11px] text-white/45"><span>{featured.date}</span><span>{featured.readTime}</span></div></div></Link></div> : null}
        </div>
      </section>

      <section className="overflow-hidden bg-white px-5 pb-[80px] pt-[60px] md:px-10 md:pb-[110px] md:pt-[80px]">
        <div className="mx-auto max-w-[1080px] min-w-0">
          <div className="mb-10 max-w-full overflow-x-auto pb-1"><Segmented label="洞察章節" value={active} onChange={(value) => { if (isValidCategory(value)) onCategoryChange(value); }} options={INSIGHT_CHAPTERS.map((chapter) => ({ value: chapter.key, label: chapter.label }))} className="max-w-none" /></div>
          <div ref={articleGridRef} className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {listedArticles.map((article) => {
              const chapter = chapterForArticle(article.slug, chapterBySlug);
              const isMatch = active === "all" || chapter === active;
              const primaryLabel = chapterLabel(chapter, article.category);
              return <Link key={article.slug} data-key={article.slug} href={`/insights/${article.slug}`} className={`group min-w-0 overflow-hidden border border-bd bg-white hover:border-gold/60 ${isMatch ? "" : "hidden"}`}><div className="relative aspect-[16/10] overflow-hidden"><CoverImage article={article} sizes="(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 360px" /></div><div className="min-w-0 p-5 md:p-6"><div className="mb-3 flex flex-wrap items-center gap-2"><span className={`px-2.5 py-[3px] text-[11px] font-medium ${colorMap[article.color]}`}>{primaryLabel}</span>{chapter && article.category !== primaryLabel ? <span className="border border-bd px-2 py-[2px] text-[10px] text-tx3">{article.category}</span> : null}<span className="text-[11px] text-tx3">{article.readTime}</span></div><h2 className="h3 mb-2 text-tx group-hover:text-gold-d">{article.title}</h2><p className="line-clamp-3 text-[14.5px] leading-[1.8] text-tx2">{article.summary}</p><div className="mt-4 flex items-center justify-between gap-3 text-[13px] text-tx3"><span>{article.date}</span><span className="shrink-0 font-medium text-gold-d">閱讀更多 →</span></div></div></Link>;
            })}
          </div>
          {!hasMatches ? <div className="py-16 text-center text-[15.5px] text-tx3">這個分類暫時還沒有文章，敬請期待！</div> : null}
          <div className="mt-14 border border-bd bg-cream px-5 py-8 text-center md:px-8"><h2 className="h3 mb-2 text-tx">看完文章，想聊聊你的狀況？</h2><p className="mx-auto mb-6 max-w-[440px] text-[15.5px] leading-[1.8] text-tx2">聊聊，不收費、不承諾。我們會老實告訴你值不值得一試。</p><div className="flex flex-wrap items-center justify-center gap-6"><button onClick={onMessageOpen} className="cursor-pointer bg-gold px-8 py-3.5 text-[16.5px] font-semibold text-navy hover:bg-gold-l">聊聊你的產品 →</button><Link href="/assess" className="inline-flex items-center gap-2 text-[15.5px] font-medium text-tx2 hover:text-navy"><span className="border-b border-tx3/40 pb-0.5">先做 2 分鐘評估</span><span aria-hidden="true">→</span></Link></div></div>
        </div>
      </section>
    </>
  );
}

function categoryFromLocation(): InsightFilter {
  if (typeof window === "undefined") return "all";
  const category = new URLSearchParams(window.location.search).get("cat");
  return isValidCategory(category) ? category : "all";
}

export function InsightsPage({ articles, chapterBySlug = {} }: Props) {
  const { open } = useMessageBox();
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

  return <InsightsPageContent articles={articles} chapterBySlug={chapterBySlug} active={active} onCategoryChange={selectCategory} onMessageOpen={open} articleGridRef={articleGridRef} />;
}
