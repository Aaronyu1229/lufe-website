import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, getArticleImage } from "@/data/articles";
import { ArticleDetail } from "@/components/insights/ArticleDetail";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { CHAPTER_ARTICLES, CHAPTER_ARTICLE_TAGS, type ArticleChapterKey } from "@/data/chapters";
import { toDatabaseInsight, toDatabaseInsightCard, toInsightCard, type InsightCard } from "@/lib/articles/presentation";
import { getArticlePublishedDate, getPublishedArticles, isPublished } from "@/lib/articles/published";
import { getPublishedArticleBySlug, listPublishedArticles, type DatabaseArticle } from "@/lib/articles/repository";
import { SITE_URL } from "@/lib/site";
import { createArticleMetadata, toAbsoluteUrl, toIsoDate, withoutSiteName } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 300;

export async function generateStaticParams() {
  return getPublishedArticles().map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const staticArticle = getArticleBySlug(slug);
  if (staticArticle) {
    if (!isPublished(staticArticle)) return { title: "文章未找到" };

    return createArticleMetadata({
      path: `/insights/${staticArticle.slug}`,
      title: withoutSiteName(staticArticle.title),
      description: staticArticle.summary,
      image: getArticleImage(staticArticle),
      publishedTime: staticArticle.publishAt ?? toIsoDate(staticArticle.date),
      modifiedTime: toIsoDate(staticArticle.updated ?? staticArticle.date),
    });
  }

  const databaseArticle = await getPublishedArticleBySlug(slug);
  if (!databaseArticle) return { title: "文章未找到" };

  const article = toDatabaseInsight(databaseArticle);
  const canonical = databaseArticle.canonicalUrl?.startsWith(`${SITE_URL}/`)
    ? databaseArticle.canonicalUrl
    : `${SITE_URL}/insights/${slug}`;

  return createArticleMetadata({
    path: `/insights/${slug}`,
    title: withoutSiteName(databaseArticle.metaTitle ?? article.title),
    description: article.summary,
    image: article.image,
    publishedTime: toIsoDate(databaseArticle.publishedAt ?? databaseArticle.createdAt),
    modifiedTime: toIsoDate(databaseArticle.updatedAt ?? databaseArticle.publishedAt ?? databaseArticle.createdAt),
    canonical,
  });
}

function chapterForSlug(slug: string, databaseArticles: readonly DatabaseArticle[]): ArticleChapterKey | undefined {
  const staticChapter = (Object.entries(CHAPTER_ARTICLES) as [ArticleChapterKey, readonly string[]][])
    .find(([, slugs]) => slugs.includes(slug))?.[0];
  if (staticChapter) return staticChapter;

  const databaseArticle = databaseArticles.find((article) => article.slug === slug);
  return (Object.entries(CHAPTER_ARTICLE_TAGS) as [ArticleChapterKey, string][])
    .find(([, tag]) => databaseArticle?.tags.includes(tag))?.[0];
}

async function getRelatedArticles(article: InsightCard): Promise<readonly InsightCard[]> {
  let databaseArticles: DatabaseArticle[] = [];
  try {
    databaseArticles = await listPublishedArticles();
  } catch {
    databaseArticles = [];
  }

  const chapter = chapterForSlug(article.slug, databaseArticles);
  const cards = [
    ...getPublishedArticles().map(toInsightCard),
    ...databaseArticles.map(toDatabaseInsightCard),
  ];

  return Array.from(new Map(cards.map((card) => [card.slug, card])).values())
    .filter((card) => card.slug !== article.slug)
    .filter((card) => chapter ? chapterForSlug(card.slug, databaseArticles) === chapter : card.category === article.category)
    .sort((left, right) => right.date.localeCompare(left.date))
    .slice(0, 3);
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const staticArticle = getArticleBySlug(slug);

  if (staticArticle) {
    if (!isPublished(staticArticle)) notFound();

    const article = { ...staticArticle, date: getArticlePublishedDate(staticArticle) };
    const image = getArticleImage(article);
    const canonical = toAbsoluteUrl(`/insights/${article.slug}`);
    const publishedTime = staticArticle.publishAt ?? toIsoDate(staticArticle.date);
    const modifiedTime = toIsoDate(staticArticle.updated ?? staticArticle.date);
    const related = await getRelatedArticles(toInsightCard(article));
    return <>
      <BreadcrumbJsonLd items={[
        { name: "洞察與資源", path: "/insights" },
        { name: article.category, path: `/insights/${article.slug}` },
      ]} />
      <ArticleJsonLd
        headline={article.title}
        description={article.summary}
        image={image}
        datePublished={publishedTime}
        dateModified={modifiedTime}
        canonical={canonical}
        citation={article.sources?.map((source) => source.url)}
      />
      {article.faq ? <FaqJsonLd items={article.faq.map(({ q, a }) => ({ question: q, answer: a }))} /> : null}
      <ArticleDetail article={article} image={image} related={related} />
    </>;
  }

  const databaseArticle = await getPublishedArticleBySlug(slug);
  if (!databaseArticle) notFound();

  const article = toDatabaseInsight(databaseArticle);
  const canonical = databaseArticle.canonicalUrl?.startsWith(`${SITE_URL}/`)
    ? databaseArticle.canonicalUrl
    : toAbsoluteUrl(`/insights/${article.slug}`);
  const publishedTime = toIsoDate(databaseArticle.publishedAt ?? databaseArticle.createdAt);
  const modifiedTime = toIsoDate(databaseArticle.updatedAt ?? databaseArticle.publishedAt ?? databaseArticle.createdAt);
  const related = await getRelatedArticles(toDatabaseInsightCard(databaseArticle));
  return <>
    <BreadcrumbJsonLd items={[
      { name: "洞察與資源", path: "/insights" },
      { name: article.category, path: `/insights/${article.slug}` },
    ]} />
    <ArticleJsonLd
      headline={article.title}
      description={article.summary}
      image={article.image}
      datePublished={publishedTime}
      dateModified={modifiedTime}
      canonical={canonical}
    />
    <ArticleDetail article={article} image={article.image} related={related} />
  </>;
}
