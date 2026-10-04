import Link from "next/link";
import { TieredImage } from "@/components/TieredImage";

import { CHAPTER_ARTICLES, CHAPTER_ARTICLE_TAGS, type ChapterKey } from "@/data/chapters";
import { insightsEn } from "@/i18n/en/insights";
import { insightsZh } from "@/i18n/zh/insights";
import { getPublishedEnglishArticles } from "@/lib/articles/english";
import { toDatabaseInsightCard, toInsightCard, type InsightCard } from "@/lib/articles/presentation";
import { getPublishedArticles } from "@/lib/articles/published";
import { listPublishedArticles } from "@/lib/articles/repository";
import { localizedHref, type Locale } from "@/i18n/locale";

const isExternalImage = (image: string): boolean => /^https?:\/\//.test(image);

export function RelatedReadingContent({ articles: reading, locale = "zh" }: { readonly articles: readonly InsightCard[]; readonly locale?: Locale }) {
  if (reading.length === 0) return null;
  const copy = locale === "en" ? insightsEn : insightsZh;

  return (
    <section className="bg-cream py-[72px] md:py-[88px]">
      <div className="lufe-container">
        <h2 className="h2 mb-8 text-tx">{copy.article.relatedReading}</h2>
        <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-3">
          {reading.map((article) => (
            <Link key={article.slug} href={localizedHref(locale, `/insights/${article.slug}`)} className="lufe-card lufe-insight-card group min-w-0 overflow-hidden border border-bd bg-white hover:border-gold">
              <div className="relative aspect-[16/10] overflow-hidden">
                {isExternalImage(article.image) ? (
                  // Database article images are not known to Next's static image configuration.
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={article.image} alt={article.title} className="absolute inset-0 h-full w-full object-cover" />
                ) : (
                  <TieredImage src={article.image} alt={article.title} sizes="(max-width: 767px) 100vw, 33vw" className="absolute inset-0 h-full w-full object-cover" />
                )}
              </div>
              <div className="p-5">
                <p className="mb-3 text-[12px] text-tx3">{article.date} · {article.readTime}</p>
                <h3 className="h3 text-tx group-hover:text-gold-d">{article.title}</h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export async function RelatedReading({ chapter, locale = "zh" }: { readonly chapter: ChapterKey; readonly locale?: Locale }) {
  const staticSlugs: ReadonlySet<string> = new Set(CHAPTER_ARTICLES[chapter]);
  const staticCards = (locale === "en" ? getPublishedEnglishArticles() : getPublishedArticles())
    .filter((article) => staticSlugs.has(article.slug))
    .map(toInsightCard);

  let databaseCards: InsightCard[] = [];
  if (locale === "zh") {
    try {
      databaseCards = (await listPublishedArticles())
        .filter((article) => article.tags.includes(CHAPTER_ARTICLE_TAGS[chapter]))
        .map(toDatabaseInsightCard);
    } catch {
      databaseCards = [];
    }
  }

  const reading = Array.from(
    new Map([...staticCards, ...databaseCards].map((article) => [article.slug, article])).values(),
  )
    .sort((left, right) => right.date.localeCompare(left.date))
    .slice(0, 3);

  return <RelatedReadingContent articles={reading} locale={locale} />;
}
