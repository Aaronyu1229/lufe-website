import Link from "next/link";

import { TieredImage } from "@/components/TieredImage";
import { CATEGORY_LABELS_EN } from "@/data/en/article-categories";
import type { Category } from "@/data/articles";
import { insightsEn } from "@/i18n/en/insights";
import { localizedHref, type Locale } from "@/i18n/locale";
import { insightsZh } from "@/i18n/zh/insights";
import type { InsightCard } from "@/lib/articles/presentation";

const colorMap: Record<string, string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold-d",
  ember: "bg-[rgba(217,139,74,0.08)] text-ember",
};

interface InsightArticleCardProps {
  readonly article: InsightCard;
  readonly primaryCategory?: string;
  readonly showSecondaryCategory?: boolean;
  readonly sizes?: string;
  readonly animationDelay?: string;
  readonly locale?: Locale;
}

function isExternalImage(image: string): boolean {
  return /^https?:\/\//.test(image);
}

function categoryLabel(locale: Locale, label: string): string {
  return locale === "en" && label in CATEGORY_LABELS_EN
    ? CATEGORY_LABELS_EN[label as Category]
    : label;
}

/** Shared article card used by the insights index and Aaron's author page. */
export function InsightArticleCard({
  article,
  primaryCategory = article.category,
  showSecondaryCategory = false,
  sizes = "(max-width: 767px) 100vw, (max-width: 1023px) 50vw, 360px",
  animationDelay,
  locale = "zh",
}: InsightArticleCardProps) {
  const copy = locale === "en" ? insightsEn : insightsZh;
  const primaryLabel = categoryLabel(locale, primaryCategory);
  const secondaryLabel = categoryLabel(locale, article.category);

  return (
    <Link href={localizedHref(locale, `/insights/${article.slug}`)} style={animationDelay ? { animationDelay } : undefined} className="lufe-card lufe-insight-card group min-w-0 overflow-hidden border border-bd bg-white hover:border-gold/60">
      <div className="relative aspect-[16/10] overflow-hidden">
        {article.image ? (
          isExternalImage(article.image)
            ? (
              // Database article images are not known to Next's static image configuration.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={article.image} alt={article.title} className="absolute inset-0 h-full w-full object-cover" />
            )
            : <TieredImage src={article.image} alt={article.title} sizes={sizes} className="absolute inset-0 h-full w-full object-cover" />
        ) : <div aria-hidden="true" className="absolute inset-0 bg-black/[.06]" />}
      </div>
      <div className="min-w-0 p-5 md:p-6">
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className={`px-2.5 py-[3px] text-[11px] font-medium ${colorMap[article.color]}`}>{primaryLabel}</span>
          {showSecondaryCategory && article.category !== primaryCategory ? <span className="border border-bd px-2 py-[2px] text-[10px] text-tx3">{secondaryLabel}</span> : null}
          <span className="text-[11px] text-tx3">{article.readTime}</span>
        </div>
        <h2 className="h3 mb-2 text-tx group-hover:text-gold-d">{article.title}</h2>
        <p className="line-clamp-3 text-[14.5px] leading-[1.8] text-tx2">{article.summary}</p>
        <div className="mt-4 flex items-center justify-between gap-3 text-[13px] text-tx3"><span>{article.date}</span><span className="shrink-0 font-medium text-gold-d">{copy.card.readMore}</span></div>
      </div>
    </Link>
  );
}
