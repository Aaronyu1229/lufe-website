import type { Metadata } from "next";
import { Suspense } from "react";

import { AssessFallback, AssessResult } from "@/components/assess/AssessWizard";
import { createPageMetadata } from "@/lib/seo";

// Results depend on the visitor's answers, so keep them out of the index like the Chinese page.
export const metadata: Metadata = {
  ...createPageMetadata({
    path: "/assess/result",
    locale: "en",
    title: "Situation Check Results",
  }),
  robots: { index: false, follow: true },
};

export default function EnglishAssessResultPage() {
  return <Suspense fallback={<AssessFallback locale="en" />}><AssessResult locale="en" /></Suspense>;
}
