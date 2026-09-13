import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug, getArticleImage } from "@/data/articles";
import { ArticleDetail } from "@/components/insights/ArticleDetail";
import { toDatabaseInsight } from "@/lib/articles/presentation";
import { getPublishedArticleBySlug } from "@/lib/articles/repository";
import { SITE_URL } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = true;
export const revalidate = 300;

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const staticArticle = getArticleBySlug(slug);
  if (staticArticle) {
    return {
      title: `${staticArticle.title} — 鹿飛 LUFÉ`,
      description: staticArticle.summary,
    };
  }

  const databaseArticle = await getPublishedArticleBySlug(slug);
  if (!databaseArticle) return { title: "文章未找到 — 鹿飛 LUFÉ" };

  const article = toDatabaseInsight(databaseArticle);
  const canonical = databaseArticle.canonicalUrl?.startsWith(SITE_URL)
    ? databaseArticle.canonicalUrl
    : `${SITE_URL}/insights/${slug}`;

  return {
    title: `${databaseArticle.metaTitle ?? article.title} — 鹿飛 LUFÉ`,
    description: article.summary,
    alternates: { canonical },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const staticArticle = getArticleBySlug(slug);

  if (staticArticle) {
    return <ArticleDetail article={staticArticle} image={getArticleImage(staticArticle)} />;
  }

  const databaseArticle = await getPublishedArticleBySlug(slug);
  if (!databaseArticle) notFound();

  const article = toDatabaseInsight(databaseArticle);
  return <ArticleDetail article={article} image={article.image} />;
}
