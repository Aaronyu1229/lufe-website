import type { Metadata } from "next";

import { SubsidiesPage } from "@/components/subsidy/SubsidiesPage";
import { subsidiesPageZh } from "@/i18n/zh/subsidies-page";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/resources/subsidies",
  title: subsidiesPageZh.metadata.title,
  description: subsidiesPageZh.metadata.description,
});

export default function SubsidiesRoutePage() {
  return <SubsidiesPage />;
}
