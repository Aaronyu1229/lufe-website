import { InsightsPage } from "@/components/insights/InsightsPage";
import { articles } from "@/data/articles";
import { toDatabaseInsightCard, toInsightCard } from "@/lib/articles/presentation";
import { listPublishedArticles } from "@/lib/articles/repository";
import type { DatabaseArticle } from "@/lib/articles/repository";

export const revalidate = 300;

export const metadata = {
  title: "洞察 · 東南亞與北美出海實戰 — 鹿飛 LUFÉ",
  description:
    "菲律賓、印尼、東南亞趨勢、北美市場、出海實戰、企業體質——幫台灣企業用最少的時間搞懂北美與東南亞出海。",
};

export default async function Insights() {
  let databaseArticles: DatabaseArticle[] = [];

  try {
    databaseArticles = await listPublishedArticles();
  } catch {
    databaseArticles = [];
  }

  const insightCards = [
    ...articles.map(toInsightCard),
    ...databaseArticles.map(toDatabaseInsightCard),
  ].sort((left, right) => right.date.localeCompare(left.date));

  return <InsightsPage articles={insightCards} />;
}
