import type { Metadata } from "next";
import { Suspense } from "react";

import { AssessFallback, AssessResult } from "@/components/assess/AssessWizard";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/assess/result",
  locale: "en",
  title: "Situation Check Results",
});

export default function EnglishAssessResultPage() {
  return <Suspense fallback={<AssessFallback locale="en" />}><AssessResult locale="en" /></Suspense>;
}
