import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { articles, getArticleBySlug, getArticleImage } from "@/data/articles";
import { ArticleDetail } from "@/components/insights/ArticleDetail";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { toDatabaseInsight } from "@/lib/articles/presentation";
import { getPublishedArticleBySlug } from "@/lib/articles/repository";
import { SITE_URL } from "@/lib/site";
import { createArticleMetadata, toAbsoluteUrl, toIsoDate, withoutSiteName } from "@/lib/seo";

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
    return createArticleMetadata({
      path: `/insights/${staticArticle.slug}`,
    title: withoutSiteName(staticArticle.title),
      description: staticArticle.summary,
      image: getArticleImage(staticArticle),
      publishedTime: toIsoDate(staticArticle.date),
      modifiedTime: toIsoDate(staticArticle.date),
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

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const staticArticle = getArticleBySlug(slug);

  if (staticArticle) {
    const image = getArticleImage(staticArticle);
    const canonical = toAbsoluteUrl(`/insights/${staticArticle.slug}`);
    const publishedTime = toIsoDate(staticArticle.date);
    return <>
      <BreadcrumbJsonLd items={[
        { name: "洞察與資源", path: "/insights" },
        { name: staticArticle.category, path: `/insights/${staticArticle.slug}` },
      ]} />
      <ArticleJsonLd
        headline={staticArticle.title}
        description={staticArticle.summary}
        image={image}
        datePublished={publishedTime}
        dateModified={publishedTime}
        canonical={canonical}
      />
      <ArticleDetail article={staticArticle} image={image} />
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
    <ArticleDetail article={article} image={article.image} />
  </>;
}
