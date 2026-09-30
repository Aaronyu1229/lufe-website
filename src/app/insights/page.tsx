import { InsightsPage } from "@/components/insights/InsightsPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { articles } from "@/data/articles";
import { CHAPTER_ARTICLE_TAGS, type ArticleChapterKey } from "@/data/chapters";
import { toDatabaseInsightCard, toInsightCard } from "@/lib/articles/presentation";
import { listPublishedArticles } from "@/lib/articles/repository";
import type { DatabaseArticle } from "@/lib/articles/repository";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = createPageMetadata({
  path: "/insights",
  title: "洞察 · 東南亞與北美出海實戰",
  description: "菲律賓、印尼、東南亞趨勢、北美市場、出海實戰、企業體質——幫台灣企業用最少的時間搞懂北美與東南亞出海。",
});

export default async function Insights() {
  let databaseArticles: DatabaseArticle[] = [];

  try {
    databaseArticles = await listPublishedArticles();
  } catch {
    databaseArticles = [];
  }

  const chapterBySlug: Record<string, ArticleChapterKey> = {};
  const chapterEntries = Object.entries(CHAPTER_ARTICLE_TAGS) as [ArticleChapterKey, string][];
  for (const article of databaseArticles) {
    const chapter = chapterEntries.find(([, tag]) => article.tags.includes(tag))?.[0];
    if (chapter) chapterBySlug[article.slug] = chapter;
  }

  const insightCards = [
    ...articles.map(toInsightCard),
    ...databaseArticles.map(toDatabaseInsightCard),
  ]
    .filter((article) => article.slug !== "vietnam-market-entry-guide")
    .sort((left, right) => right.date.localeCompare(left.date));

  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "洞察", path: "/insights" }]} />
    <InsightsPage articles={insightCards} chapterBySlug={chapterBySlug} />
  </>;
}
