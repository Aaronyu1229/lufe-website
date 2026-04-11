import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CaseDetailPage } from "@/components/cases/CaseDetailPage";
import { CASES, getCase } from "@/data/cases";

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
  if (!c) return { title: "案例 | 鹿飛 LUFÉ" };
  return {
    title: `${c.title} | 鹿飛 LUFÉ`,
    description: c.summary,
  };
}

export default async function CasePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseItem = getCase(slug);
  if (!caseItem) notFound();
  return <CaseDetailPage caseItem={caseItem} />;
}
