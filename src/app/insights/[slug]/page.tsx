import { notFound } from "next/navigation";
import { articles, getArticleBySlug, getArticleImage } from "@/data/articles";
import { ArticleDetail } from "@/components/insights/ArticleDetail";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "文章未找到 — 鹿飛 LUFÉ" };

  return {
    title: `${article.title} — 鹿飛 LUFÉ`,
    description: article.summary,
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const image = getArticleImage(article);

  return <ArticleDetail article={article} image={image} />;
}
