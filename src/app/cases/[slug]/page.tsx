import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetailPage } from "@/components/cases/CaseDetailPage";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { CASES, getCase } from "@/data/cases";
import { createPageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return CASES.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCase(slug);
  if (!c) return { title: "案例" };
  return createPageMetadata({ path: `/cases/${c.slug}`, title: c.title, description: c.summary });
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseItem = getCase(slug);
  if (!caseItem) notFound();
  return <>
    <BreadcrumbJsonLd items={[
      { name: "案例", path: "/cases" },
      { name: caseItem.tags[0]?.label ?? caseItem.title, path: `/cases/${caseItem.slug}` },
    ]} />
    <CaseDetailPage caseItem={caseItem} />
  </>;
}
