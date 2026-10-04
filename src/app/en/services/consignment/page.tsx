import type { Metadata } from "next";

import { ChapterPage } from "@/components/services/ChapterPage";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { CHAPTERS_EN } from "@/i18n/en/chapters";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/services/consignment",
  locale: "en",
  title: "Consignment | Get listed, then let people try it",
  description: "Connect with Philippine channels already selling, while we coordinate product certification, trials, data, and contracts.",
});

export default function EnglishConsignmentPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/en" }, { name: "Services", path: "/en/services" }, { name: CHAPTERS_EN.m3.label, path: "/en/services/consignment" }]} />
    <FaqJsonLd items={CHAPTERS_EN.m3.faqs} />
    <ChapterPage chapter={CHAPTERS_EN.m3} locale="en" />
  </>;
}
