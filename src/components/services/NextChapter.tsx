import Link from "next/link";

import { TieredImage } from "@/components/TieredImage";
import type { Chapter } from "@/data/chapters";
import { localizedHref, type Locale } from "@/i18n/locale";

export function NextChapter({ chapter, locale = "zh" }: { readonly chapter: Chapter; readonly locale?: Locale }) {
  if (!chapter.next) return null;

  const next = chapter.next;

  return (
    <section className="bg-white py-[64px]">
      <div className="lufe-container">
        <Link href={localizedHref(locale, next.href)} className="group grid min-w-0 border border-bd bg-cream active:scale-[.985] md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] [@media(hover:hover)]:hover:border-gold">
          <figure className="aspect-[16/10] overflow-hidden">
            <TieredImage src={next.image} alt={next.imageAlt} maxTierWidth={next.maxTierWidth} sizes="(min-width: 768px) 40vw, 100vw" className="h-full w-full object-cover transition-transform duration-500 [@media(hover:hover)]:group-hover:scale-[1.03]" />
          </figure>
          <div className="flex flex-col justify-center p-6 md:p-10">
            <p className="text-[13px] font-medium text-gold-d">{next.label}</p>
            <p className="mt-2 text-[16px] font-semibold text-tx">{next.title}</p>
            <h2 className="h3 mt-2 text-tx">{next.heading}</h2>
            <span aria-hidden="true" className="mt-5 text-[28px] text-gold-d transition-transform [@media(hover:hover)]:group-hover:translate-x-1">→</span>
          </div>
        </Link>
      </div>
    </section>
  );
}
