import { HeroSection } from "@/components/home/HeroSection";
import { OpeningSection } from "@/components/home/OpeningSection";
import { ChaptersSection } from "@/components/home/PositioningBand";
import { JumpingSection } from "@/components/home/JumpingSection";
import { CasesSection } from "@/components/home/CasesSection";
import { LatestInsightsSection } from "@/components/home/LatestInsightsSection";
import { OneContractSection } from "@/components/home/WhySection";
import { HomeFAQ } from "@/components/home/HomeFAQ";
import { FaqJsonLd } from "@/components/seo/StructuredData";
import { CTASection } from "@/components/home/CTASection";
import { articles } from "@/data/articles";
import { HOME_FAQ_ITEMS } from "@/data/homeFaq";
import { toDatabaseInsightCard, toInsightCard } from "@/lib/articles/presentation";
import { listPublishedArticles } from "@/lib/articles/repository";
import type { DatabaseArticle } from "@/lib/articles/repository";
import { createPageMetadata } from "@/lib/seo";

export const metadata = createPageMetadata({ path: "/" });

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
    .sort((left, right) => right.date.localeCompare(left.date))
    .slice(0, 3);

  return (
    <>
      <FaqJsonLd items={HOME_FAQ_ITEMS.map(({ question, answer }) => ({ question, answer }))} />
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
