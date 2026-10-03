"use client";

import { useMemo, useRef, type MouseEvent, type ReactNode } from "react";
import Link from "next/link";

import { TieredImage } from "@/components/TieredImage";
import { ArticleFaq } from "@/components/insights/ArticleFaq";
import { ArticleTocList, MobileArticleToc, ReadingProgress, useActiveHeading, useReadingProgress, type Heading } from "@/components/insights/ArticleToc";
import { InsightCta } from "@/components/insights/InsightCta";
import { StaticArticleContent, getStaticArticleHeadings, renderInlineMarkdown } from "@/components/insights/StaticArticleContent";
import { Disclosure } from "@/components/ui";
import type { Article } from "@/data/articles";
import type { DatabaseInsight, InsightCard } from "@/lib/articles/presentation";

const colorMap: Record<string, string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold-d",
  ember: "bg-[rgba(217,139,74,0.08)] text-ember",
};

const databaseHeadingPattern = /<h2\b([^>]*)>([\s\S]*?)<\/h2>/gi;

interface Props {
  readonly article: Article | DatabaseInsight;
  readonly image: string;
  readonly related: readonly InsightCard[];
}

function isDatabaseArticle(article: Article | DatabaseInsight): article is DatabaseInsight {
  return !Array.isArray(article.content);
}

function isDatabaseContent(content: Article["content"] | DatabaseInsight["content"]): content is DatabaseInsight["content"] {
  return !Array.isArray(content);
}

function getArticleHeadings(content: Article["content"] | DatabaseInsight["content"]): Heading[] {
  return isDatabaseContent(content) ? getDatabaseArticleHeadings(content.html) : getStaticArticleHeadings(content);
}

export function renderStaticBoldMarkup(text: string): ReactNode {
  return renderInlineMarkdown(text);
}

function withoutUrls(note: string | undefined): string | undefined {
  const cleaned = note?.replace(/\s*https?:\/\/\S+/g, "").trim();
  return cleaned || undefined;
}

function stripHtml(value: string): string {
  return value.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

function headingId(attributes: string, index: number): string {
  const match = /\bid\s*=\s*(["'])(.*?)\1/i.exec(attributes);
  return match?.[2] ?? `section-${index}`;
}

export function getDatabaseArticleHeadings(html: string): Heading[] {
  let index = 0;
  return Array.from(html.matchAll(databaseHeadingPattern)).map((match) => {
    index += 1;
    return { id: headingId(match[1], index), text: stripHtml(match[2]) };
  });
}

export function addDatabaseArticleHeadingIds(html: string): string {
  let index = 0;

  return html.replace(/<h2\b([^>]*)>/gi, (tag, attributes: string) => {
    index += 1;
    const withClass = /\bclass\s*=/i.test(attributes)
      ? attributes.replace(/\bclass\s*=\s*(["'])(.*?)\1/i, 'class="$2 scroll-mt-[96px]"')
      : `${attributes} class="scroll-mt-[96px]"`;
    return /\bid\s*=/i.test(attributes)
      ? `<h2${withClass}>`
      : `<h2${withClass} id="section-${index}">`;
  });
}

export function stripDatabaseArticleImages(html: string): string {
  return html
    .replace(/<figure\b[^>]*>[\s\S]*?<\/figure\s*>/gi, "")
    .replace(/<img\b[^>]*>/gi, "")
    .replace(/<p\b[^>]*>\s*<\/p\s*>/gi, "");
}

function getFirstDatabaseArticleImage(html: string): string {
  const match = /<img\b[^>]*\bsrc\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))[^>]*>/i.exec(html);
  return match?.[1] ?? match?.[2] ?? match?.[3] ?? "";
}

function ArticleSources({ sources, lastVerified }: Pick<Article, "sources" | "lastVerified">) {
  if (!sources?.length || !lastVerified) return null;

  return (
    <section className="mt-12" aria-labelledby="article-sources-heading">
      <details id="article-sources" className="border-y border-bd py-4">
        <summary id="article-sources-heading" className="cursor-pointer font-sans text-[18px] font-[650] text-tx marker:text-gold-d">
          出處與查證（{sources.length} 筆）・最後查證 {lastVerified}
        </summary>
        <ol className="mt-5 space-y-3">
          {sources.map((source) => {
            const note = withoutUrls(source.note);
            return (
              <li key={source.id} id={`source-${source.id}`} className="scroll-mt-24">
                <a href={source.url} target="_blank" rel="noopener" className="group block border-l-2 border-transparent py-1 pl-3 text-[15px] leading-[1.7] text-tx2 hover:border-gold hover:text-navy focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold">
                  <span className="font-medium text-tx group-hover:text-navy">[{source.id}] {source.title}・{source.publisher}</span>
                  {note ? <span className="mt-1 block text-[13px] leading-[1.6] text-tx3">{note}</span> : null}
                </a>
              </li>
            );
          })}
        </ol>
      </details>
    </section>
  );
}

function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function RelatedArticleRows({ articles }: { readonly articles: readonly InsightCard[] }) {
  if (!articles.length) return null;

  return <div className="grid gap-4">{articles.map((article) => <Link key={article.slug} href={`/insights/${article.slug}`} className="border-t border-bd pt-4 active:scale-[.985]">
    <h3 className="line-clamp-2 text-[14px] font-semibold leading-[1.45] text-tx">{article.title}</h3>
    <p className="mt-1 text-[12px] text-tx3">{article.date}</p>
  </Link>)}</div>;
}

function ArticleAside({ headings, related, activeIndex, progress, minutes }: { readonly headings: readonly Heading[]; readonly related: readonly InsightCard[]; readonly activeIndex: number; readonly progress: number; readonly minutes: number | undefined }) {
  return <aside className="sticky top-[96px] self-start">
    {headings.length ? <ArticleTocList headings={headings} activeIndex={activeIndex} variant="aside" progress={progress} minutes={minutes} /> : null}
    {related.length ? <section className="mt-10"><h2 className="mb-3 text-[13px] font-semibold text-tx3">延伸閱讀</h2><RelatedArticleRows articles={related} /></section> : null}
  </aside>;
}

export function ArticleDetail({ article, image, related }: Props) {
  const databaseContent = isDatabaseArticle(article) ? article.content : null;
  const staticContent: readonly string[] = databaseContent ? [] : article.content as readonly string[];
  const staticFaq = isDatabaseArticle(article) ? undefined : article.faq;
  const staticSources = isDatabaseArticle(article) ? undefined : article.sources;
  const staticLastVerified = isDatabaseArticle(article) ? undefined : article.lastVerified;
  const coverImage = image || (databaseContent ? getFirstDatabaseArticleImage(databaseContent.html) : "");
  const externalImage = /^https?:\/\//.test(coverImage);
  const headings = useMemo(() => getArticleHeadings(article.content), [article.content]);
  const databaseHtml = databaseContent ? stripDatabaseArticleImages(addDatabaseArticleHeadingIds(databaseContent.html)) : "";
  const coverRef = useRef<HTMLElement | null>(null);
  const activeIndex = useActiveHeading(headings);
  const readingProgress = useReadingProgress();
  const minutes = Number.parseInt(article.readTime, 10);

  const handleSourceReference = (event: MouseEvent<HTMLDivElement>) => {
    if (!(event.target instanceof Element)) return;
    const sourceLink = event.target.closest<HTMLAnchorElement>("a[data-source-id]");
    const sourceId = sourceLink?.dataset.sourceId;
    if (!sourceId) return;
    const source = document.getElementById(sourceId);
    const sourceDetails = document.getElementById("article-sources");
    if (!source || !(sourceDetails instanceof HTMLDetailsElement)) return;
    event.preventDefault();
    sourceDetails.open = true;
    requestAnimationFrame(() => source.scrollIntoView({ behavior: prefersReducedMotion() ? "auto" : "smooth", block: "center" }));
  };

  return (
    <article className="min-h-screen bg-white pt-[126px] md:pt-[148px]">
      <ReadingProgress progress={readingProgress.value} />
      <MobileArticleToc headings={headings} activeIndex={activeIndex} coverRef={coverRef} />
      <div className="lufe-container">
        <div className="grid gap-16 lg:grid-cols-[minmax(0,720px)_280px]">
          <div className="min-w-0">
            <header className="mb-10">
              <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-tx3"><Link href="/insights" className="hover:text-navy">洞察與資源</Link><span aria-hidden="true">/</span><span className="text-tx2">{article.category}</span></nav>
              <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-tx3"><span className={`px-2.5 py-[3px] text-[11px] font-medium ${colorMap[article.color]}`}>{article.category}</span><span>{article.date}</span><span>{article.readTime}</span></div>
              <h1 className="h1 mb-6 font-sans text-tx">{article.title}</h1>
              <div className="mb-6 flex items-center gap-3"><TieredImage src="/images/about/aaron-portrait-studio-640.webp" alt="" maxTierWidth={640} sizes="32px" loading="eager" className="h-8 w-8 rounded-full object-cover object-[center_18%]" /><div className="text-[13px] leading-[1.55] text-tx3"><Link href="/about/aaron-yu" className="font-medium text-tx2 hover:text-navy">Aaron Yu・鹿飛 LUFÉ 創辦人</Link><p>發布：<time dateTime={article.date}>{article.date}</time></p></div></div>
              <p className="border-l-2 border-gold pl-4 text-[17px] leading-[1.8] text-tx2">{article.summary}</p>
              {headings.length ? <div className="mt-8 lg:hidden"><Disclosure summary="本文目錄"><ArticleTocList headings={headings} activeIndex={activeIndex} variant="inline" /></Disclosure></div> : null}
            </header>

            <figure ref={coverRef} className="relative mb-10 h-[240px] w-full overflow-hidden md:h-[360px]">{externalImage
              // Database article images are not known to Next's static image configuration.
              // eslint-disable-next-line @next/next/no-img-element
              ? <img src={coverImage} alt={article.title} className="h-full w-full object-cover" />
              : <TieredImage src={coverImage} alt={article.title} sizes="(max-width: 767px) 100vw, 720px" className="absolute inset-0 h-full w-full object-cover" />}</figure>

            {databaseContent ? <div className="text-[17px] leading-[1.95] text-tx [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-sans [&_h2]:text-[26px] [&_h2]:font-[650] [&_p+_p]:mt-5" dangerouslySetInnerHTML={{ __html: databaseHtml }} /> : <div onClick={handleSourceReference}><StaticArticleContent content={staticContent} /></div>}
            <ArticleFaq faq={staticFaq} />
            <ArticleSources sources={staticSources} lastVerified={staticLastVerified} />
            <div className="my-10 h-px w-full bg-bd md:my-14" />
            <section aria-labelledby="article-author" className="mb-10 border border-bd bg-cream p-5 md:mb-14 md:p-7"><div className="flex flex-col gap-5 sm:flex-row sm:items-start"><TieredImage src="/images/about/aaron-portrait-studio-1080.webp" alt="Aaron Yu" sizes="96px" className="h-24 w-24 shrink-0 object-cover object-[center_18%]" /><div><h2 id="article-author" className="h3 mb-1 text-tx"><Link href="/about/aaron-yu" className="hover:text-gold-d">Aaron Yu</Link></h2><p className="mb-3 text-[14.5px] font-medium text-gold-d">鹿飛 LUFÉ 創辦人・來自躍馬企業</p><p className="mb-4 max-w-[520px] text-[15px] leading-[1.8] text-tx2">創辦人來自躍馬企業，底下是 43 年的國際物流。貨代把貨送到，故事才開始；這個專欄寫的是貨到了之後的事。</p><div className="flex flex-wrap gap-x-5 gap-y-3 text-[14.5px] font-medium"><a href="https://www.linkedin.com/in/wibp/" target="_blank" rel="me noopener" className="border-b border-tx3/40 pb-0.5 text-tx2 hover:text-navy">LinkedIn ↗</a><Link href="/about/aaron-yu" className="border-b border-gold pb-0.5 text-gold-d hover:text-navy">看更多專欄文章 →</Link></div></div></div></section>
            {related.length ? <section className="mb-10 lg:hidden"><h2 className="h3 mb-5 text-tx">延伸閱讀</h2><RelatedArticleRows articles={related} /></section> : null}
            <div className="mb-[80px] text-center md:mb-[110px]"><Link href="/insights" className="text-[14.5px] font-medium text-tx3 hover:text-navy">← 回到所有文章</Link></div>
          </div>
          <div className="hidden lg:block"><ArticleAside headings={headings} related={related} activeIndex={activeIndex} progress={readingProgress.value} minutes={Number.isNaN(minutes) ? undefined : minutes} /></div>
        </div>
      </div>
      <InsightCta />
    </article>
  );
}
