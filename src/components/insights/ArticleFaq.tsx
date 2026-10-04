import type { Article } from "@/data/articles";
import { FaqList } from "@/components/faq/FaqList";
import { insightsEn } from "@/i18n/en/insights";
import { type Locale } from "@/i18n/locale";
import { insightsZh } from "@/i18n/zh/insights";

export function ArticleFaq({ faq, locale = "zh" }: Pick<Article, "faq"> & { readonly locale?: Locale }) {
  if (!faq?.length) return null;

  const copy = locale === "en" ? insightsEn : insightsZh;

  return (
    <section className="mt-12" aria-labelledby="article-faq-heading">
      <h2 id="article-faq-heading" className="mb-5 font-sans text-[26px] font-[650] leading-[1.35] text-tx">{copy.article.faqHeading}</h2>
      <FaqList idPrefix="article-faq" items={faq.map((item, index) => ({
        num: String(index + 1).padStart(2, "0"),
        question: item.q,
        answer: item.a,
      }))} />
    </section>
  );
}
