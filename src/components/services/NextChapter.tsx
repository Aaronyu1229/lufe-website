import Link from "next/link";

import type { Chapter } from "@/data/chapters";

export function NextChapter({ chapter }: { readonly chapter: Chapter }) {
  if (!chapter.next) return null;

  return (
    <section className="bg-white px-5 py-[64px] md:px-10">
      <div className="mx-auto max-w-[960px]">
        <Link href={chapter.next.href} className="lufe-card flex items-center justify-between gap-6 border border-bd bg-cream p-6 hover:border-gold md:p-8">
          <div>
            <p className="mb-2 text-[13px] font-medium text-gold-d">{chapter.next.label}</p>
            <p className="text-[16px] font-semibold text-tx">{chapter.next.title}</p>
            <h2 className="h3 mt-2 text-tx">{chapter.next.heading}</h2>
          </div>
          <span aria-hidden="true" className="shrink-0 text-[28px] text-gold-d">→</span>
        </Link>
      </div>
    </section>
  );
}
