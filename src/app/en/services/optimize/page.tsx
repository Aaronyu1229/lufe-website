import type { Metadata } from "next";

import { OptimizePageContent } from "@/components/services/OptimizePage";
import { RelatedReading } from "@/components/services/RelatedReading";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { optimizePageEn } from "@/i18n/en/optimize-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/optimize",
  locale: "en",
  title: "Operations Optimization | Brands already operating overseas",
  description: "For products already selling overseas: review logistics, channels, operations processes, and numbers. The founder comes from Jumping Freight, backed by 43 years of international logistics.",
});

export default async function EnglishOptimizePage() {
  const relatedReading = await RelatedReading({ chapter: "after", locale: "en" });

  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/en" }, { name: "Services", path: "/en/services" }, { name: "Operations Optimization", path: "/en/services/optimize" }]} />
    <FaqJsonLd items={optimizePageEn.faqs.map(([question, answer]) => ({ question, answer }))} />
    <OptimizePageContent locale="en" relatedReading={relatedReading} />
  </>;
}
