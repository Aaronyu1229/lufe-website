import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ArticleDetail } from "@/components/insights/ArticleDetail";
import { ArticleJsonLd, BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { getArticleImage } from "@/data/articles";
import { CATEGORY_LABELS_EN } from "@/data/en/article-categories";
import { CHAPTER_ARTICLES, type ArticleChapterKey } from "@/data/chapters";
import { getEnglishArticle, getPublishedEnglishArticles } from "@/lib/articles/english";
import { toInsightCard, type InsightCard } from "@/lib/articles/presentation";
import { createArticleMetadata, toAbsoluteUrl, toIsoDate, withoutSiteName } from "@/lib/seo";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;
export const revalidate = 300;

export async function generateStaticParams() {
  return getPublishedEnglishArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = getEnglishArticle(slug);
  if (!article) return { title: "Article not found" };

  return createArticleMetadata({
    path: `/insights/${article.slug}`,
    locale: "en",
    title: withoutSiteName(article.title),
    description: article.summary,
    image: getArticleImage(article),
    publishedTime: article.publishAt ?? toIsoDate(article.date),
    modifiedTime: toIsoDate(article.updated ?? article.date),
  });
}

function chapterForSlug(slug: string): ArticleChapterKey | undefined {
  return (Object.entries(CHAPTER_ARTICLES) as [ArticleChapterKey, readonly string[]][])
    .find(([, slugs]) => slugs.includes(slug))?.[0];
}

function getRelatedArticles(article: InsightCard): readonly InsightCard[] {
  const chapter = chapterForSlug(article.slug);

  return getPublishedEnglishArticles()
    .map(toInsightCard)
    .filter((candidate) => candidate.slug !== article.slug)
    .filter((candidate) => chapter ? chapterForSlug(candidate.slug) === chapter : candidate.category === article.category)
    .sort((left, right) => right.date.localeCompare(left.date))
    .slice(0, 3);
}

export default async function EnglishArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getEnglishArticle(slug);
  if (!article) notFound();

  const image = getArticleImage(article);
  const canonical = toAbsoluteUrl(`/en/insights/${article.slug}`);
  const publishedTime = article.publishAt ?? toIsoDate(article.date);
  const modifiedTime = toIsoDate(article.updated ?? article.date);
  const related = getRelatedArticles(toInsightCard(article));

  return <>
    <BreadcrumbJsonLd items={[
      { name: "Insights & resources", path: "/en/insights" },
      { name: CATEGORY_LABELS_EN[article.category], path: `/en/insights/${article.slug}` },
    ]} />
    <ArticleJsonLd
      headline={article.title}
      description={article.summary}
      image={image}
      datePublished={publishedTime}
      dateModified={modifiedTime}
      canonical={canonical}
      citation={article.sources?.map((source) => source.url)}
      locale="en"
    />
    {article.faq ? <FaqJsonLd items={article.faq.map(({ q, a }) => ({ question: q, answer: a }))} /> : null}
    <ArticleDetail article={article} image={image} related={related} locale="en" />
  </>;
}
