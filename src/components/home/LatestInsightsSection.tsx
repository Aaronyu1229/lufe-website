import Image from "next/image";
import Link from "next/link";

import type { InsightCard } from "@/lib/articles/presentation";

export function LatestInsightsSection({ articles }: { articles: readonly InsightCard[] }) {
  return (
    <section className="bg-cream py-[80px] md:py-[104px]">
      <div className="lufe-container">
        <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-tx [text-wrap:balance]">
          讀到一半想深入的，
          <br />
          <span className="text-gold-d">這裡有</span>
        </h2>
        <div className="mt-9 grid gap-5 md:grid-cols-3">
          {articles.map((article) => (
            <Link key={article.slug} href={`/insights/${article.slug}`} className="lufe-card lufe-insight-card group border border-bd bg-white">
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image src={article.image} alt={article.title} fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-5 md:p-6">
                <p className="text-[12px] font-medium text-gold-d">{article.category}</p>
                <h3 className="mt-2 font-sans text-[20px] font-semibold leading-[1.45] text-tx group-hover:text-sky">{article.title}</h3>
                <p className="mt-3 line-clamp-3 text-[14.5px] leading-[1.8] text-tx2">{article.summary}</p>
                <p className="mt-5 text-[13px] text-tx3">{article.date} · {article.readTime}</p>
              </div>
            </Link>
          ))}
        </div>
        <Link href="/insights" className="mt-7 inline-flex text-[16px] font-semibold text-sky">看所有文章 →</Link>
      </div>
    </section>
  );
}
