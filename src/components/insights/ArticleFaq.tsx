import type { Article } from "@/data/articles";

export function ArticleFaq({ faq }: Pick<Article, "faq">) {
  if (!faq?.length) return null;

  return (
    <section className="mt-12" aria-labelledby="article-faq-heading">
      <h2 id="article-faq-heading" className="mb-5 font-sans text-[26px] font-[650] leading-[1.35] text-tx">常見問題</h2>
      <dl>
        {faq.map((item) => (
          <div key={item.q} className="border-t border-bd py-5 last:border-b">
            <dt className="font-semibold text-tx">{item.q}</dt>
            <dd className="mt-2 text-tx2">{item.a}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
