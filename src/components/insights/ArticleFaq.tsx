import type { Article } from "@/data/articles";
import { FaqList } from "@/components/faq/FaqList";

export function ArticleFaq({ faq }: Pick<Article, "faq">) {
  if (!faq?.length) return null;

  return (
    <section className="mt-12" aria-labelledby="article-faq-heading">
      <h2 id="article-faq-heading" className="mb-5 font-sans text-[26px] font-[650] leading-[1.35] text-tx">常見問題</h2>
      <FaqList idPrefix="article-faq" items={faq.map((item, index) => ({
        num: String(index + 1).padStart(2, "0"),
        question: item.q,
        answer: item.a,
      }))} />
    </section>
  );
}
