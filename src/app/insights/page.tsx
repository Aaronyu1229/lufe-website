import { InsightsPage } from "@/components/insights/InsightsPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { CHAPTER_ARTICLE_TAGS, type ArticleChapterKey } from "@/data/chapters";
import { toDatabaseInsightCard, toInsightCard } from "@/lib/articles/presentation";
import { getPublishedArticles } from "@/lib/articles/published";
import { listPublishedArticles } from "@/lib/articles/repository";
import type { DatabaseArticle } from "@/lib/articles/repository";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata = createPageMetadata({
  path: "/insights",
  title: "洞察 · 出海第一年會遇到的事",
  description: "按出海第一年的順序整理：第一個月問市場、第三個月談寄賣、第九個月談公司落地，以及北美通路。台灣品牌進菲律賓之前，先把常見的卡點讀一遍。",
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
    ...getPublishedArticles().map(toInsightCard),
    ...databaseArticles.map(toDatabaseInsightCard),
  ]
    .sort((left, right) => right.date.localeCompare(left.date));

  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "洞察", path: "/insights" }]} />
    <InsightsPage articles={insightCards} chapterBySlug={chapterBySlug} />
  </>;
}
