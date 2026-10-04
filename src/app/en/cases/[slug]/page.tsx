import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { CaseDetailPage } from "@/components/cases/CaseDetailPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { CASES_EN, getCaseEn } from "@/i18n/en/cases";
import { createPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return CASES_EN.map((caseItem) => ({ slug: caseItem.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseItem = getCaseEn(slug);
  if (!caseItem) return { title: "Cases" };
  return createPageMetadata({
    path: `/cases/${caseItem.slug}`,
    locale: "en",
    title: caseItem.title,
    description: caseItem.metaDescription ?? caseItem.summary,
  });
}

export default async function EnglishCasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseItem = getCaseEn(slug);
  if (!caseItem) notFound();
  return <>
    <BreadcrumbJsonLd items={[
      { name: "Cases", path: "/en/cases" },
      { name: caseItem.tags[0]?.label ?? caseItem.title, path: `/en/cases/${caseItem.slug}` },
    ]} />
    <CaseDetailPage caseItem={caseItem} locale="en" />
  </>;
}
