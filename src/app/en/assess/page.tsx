import type { Metadata } from "next";

import { AssessWizard } from "@/components/assess/AssessWizard";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/assess",
  locale: "en",
  title: "2-minute Situation Check",
  description: "Three questions show which of three cases we have worked on is closest to your overseas-expansion situation and which chapter it usually starts with. For a specific assessment, set aside 30 minutes.",
});

export default function EnglishAssessPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "Home", path: "/en" }, { name: "2-minute Situation Check", path: "/en/assess" }]} />
    <AssessWizard locale="en" />
  </>;
}
