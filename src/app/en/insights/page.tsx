import type { Metadata } from "next";

import { InsightsPage } from "@/components/insights/InsightsPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { toInsightCard } from "@/lib/articles/presentation";
import { getPublishedEnglishArticles } from "@/lib/articles/english";
import { createPageMetadata } from "@/lib/seo";

export const revalidate = 300;

export const metadata: Metadata = createPageMetadata({
  path: "/insights",
  locale: "en",
  title: "Insights · What comes up in the first year abroad",
  description: "Organized by the first year abroad: ask about the market in month one, discuss Consignment in month three, and Company Setup in month nine. Before Taiwanese brands enter the Philippines, read through the common points of friction.",
});

export default function EnglishInsights() {
  const insightCards = getPublishedEnglishArticles().map(toInsightCard);

  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/en" }, { name: "Insights", path: "/en/insights" }]} />
    <InsightsPage articles={insightCards} locale="en" />
  </>;
}
