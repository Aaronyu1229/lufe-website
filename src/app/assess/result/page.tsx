import type { Metadata } from "next";
import { Suspense } from "react";

import { AssessFallback, AssessResult } from "@/components/assess/AssessWizard";

export const metadata: Metadata = {
  title: "處境比對結果",
  robots: { index: false, follow: true },
};

export default function AssessResultPage() {
  return <Suspense fallback={<AssessFallback />}><AssessResult /></Suspense>;
}
