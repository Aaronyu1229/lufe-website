"use client";

import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/data/articles";

const colorMap: Record<string, string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold",
  ember: "bg-[rgba(217,139,74,0.08)] text-ember",
};

interface Props {
  readonly article: Article;
  readonly image: string;
}

export function ArticleDetail({ article, image }: Props) {
  return (
    <article className="bg-white min-h-screen pt-[96px] pb-[80px] px-5 md:px-10">
      <div className="max-w-[720px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[12px] text-tx3 mb-8">
          <Link href="/insights" className="hover:text-navy transition-colors">
            洞察與資源
          </Link>
          <span>/</span>
          <span className="text-tx2">{article.category}</span>
        </nav>

        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <span
            className={`text-[11px] px-2.5 py-[3px] rounded-none font-medium ${colorMap[article.color]}`}
          >
            {article.category}
          </span>
          <span className="text-[12px] text-tx3">{article.date}</span>
          <span className="text-[12px] text-tx3">{article.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="font-sans text-[clamp(28px,4vw,40px)] leading-[1.25] font-light tracking-[-0.5px] mb-6">
          {article.title}
        </h1>

        {/* Summary */}
        <p className="text-[16px] text-tx2 leading-[1.8] font-normal mb-8 border-l-2 border-gold pl-4">
          {article.summary}
        </p>

        {/* Cover image */}
        <div className="relative w-full h-[240px] md:h-[360px] mb-10 overflow-hidden">
          <Image
            src={image}
            alt={article.title}
            fill
            className="object-cover"
          />
        </div>

        {/* Content */}
        <div className="space-y-5">
          {article.content.map((paragraph, i) => {
            if (paragraph.startsWith("## ")) {
              return (
                <h2
                  key={i}
                  className="font-sans text-[22px] font-medium leading-[1.4] mt-10 mb-3 tracking-[-0.3px]"
                >
                  {paragraph.slice(3)}
                </h2>
              );
            }
            return (
              <p
                key={i}
                className="text-[15px] text-tx leading-[1.85] font-normal"
              >
                {paragraph}
              </p>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-bd mt-14 mb-10" />

        {/* Bottom CTA */}
        <div className="p-8 bg-cream/50 text-center">
          <h3 className="text-[18px] font-medium mb-2">
            看完文章，想知道你的產品適不適合出海？
          </h3>
          <p className="text-[14px] text-tx2 font-normal mb-5">
            兩分鐘免費評估，找到你的出海起點。
          </p>
          <Link
            href="/assess"
            className="inline-block bg-gold text-navy px-7 py-3.5 rounded-none text-[15px] font-semibold transition-colors hover:bg-gold-l"
          >
            免費出海評估 →
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/insights"
            className="text-[13px] text-tx3 font-medium hover:text-navy transition-colors"
          >
            ← 回到所有文章
          </Link>
        </div>
      </div>
    </article>
  );
}
