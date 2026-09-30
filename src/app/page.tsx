import { HeroSection } from "@/components/home/HeroSection";
import { OpeningSection } from "@/components/home/OpeningSection";
import { ChaptersSection } from "@/components/home/PositioningBand";
import { JumpingSection } from "@/components/home/JumpingSection";
import { CasesSection } from "@/components/home/CasesSection";
import { LatestInsightsSection } from "@/components/home/LatestInsightsSection";
import { OneContractSection } from "@/components/home/WhySection";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { CTASection } from "@/components/home/CTASection";
import { articles } from "@/data/articles";
import { toDatabaseInsightCard, toInsightCard } from "@/lib/articles/presentation";
import { listPublishedArticles } from "@/lib/articles/repository";
import type { DatabaseArticle } from "@/lib/articles/repository";

// Self-referencing canonical. The root layout no longer sets a global one —
// it made every page claim the homepage as its canonical. Each page owns its
// own from here on; the remaining pages are handled in a follow-up.
export const metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export const revalidate = 300;

export default async function Home() {
  let databaseArticles: DatabaseArticle[] = [];

  try {
    databaseArticles = await listPublishedArticles();
  } catch {
    databaseArticles = [];
  }

  const latestArticles = [
    ...articles.map(toInsightCard),
    ...databaseArticles.map(toDatabaseInsightCard),
  ]
    .filter((article) => article.slug !== "vietnam-market-entry-guide")
    .sort((left, right) => right.date.localeCompare(left.date))
    .slice(0, 3);

  return (
    <>
      <HeroSection />
      <OpeningSection />
      <ChaptersSection />
      <JumpingSection />
      <CasesSection />
      <LatestInsightsSection articles={latestArticles} />
      <OneContractSection />
      <HomeFAQ />
      <CTASection />
    </>
  );
}
