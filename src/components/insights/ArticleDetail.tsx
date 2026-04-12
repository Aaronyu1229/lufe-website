"use client";

import Link from "next/link";
import Image from "next/image";
import type { Article } from "@/data/articles";
import { useMessageBox } from "../MessageBox";

const colorMap: Record<string, string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold-d",
  ember: "bg-[rgba(217,139,74,0.08)] text-ember",
};

interface Props {
  readonly article: Article;
  readonly image: string;
}

export function ArticleDetail({ article, image }: Props) {
  const { open } = useMessageBox();
  return (
    <article className="bg-white min-h-screen pt-[96px] pb-[80px] px-5 md:px-10">
      <div className="max-w-[720px] mx-auto">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-[13px] text-tx3 mb-8">
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
          <span className="text-[13px] text-tx3">{article.date}</span>
          <span className="text-[13px] text-tx3">{article.readTime}</span>
        </div>

        {/* Title */}
        <h1 className="font-sans text-[clamp(28px,4vw,40px)] leading-[1.25] font-light tracking-[-0.5px] mb-6">
          {article.title}
        </h1>

        {/* Summary */}
        <p className="text-[17px] text-tx2 leading-[1.8] font-normal mb-8 border-l-2 border-gold pl-4">
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
                className="text-[16.5px] text-tx leading-[1.85] font-normal"
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
          <h3 className="text-[19px] font-medium mb-2">
            看完文章，想聊聊你的狀況？
          </h3>
          <p className="text-[15.5px] text-tx2 font-normal mb-6 max-w-[440px] mx-auto">
            聊聊，不收費、不承諾。我們會老實告訴你值不值得一試。
          </p>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <button
              onClick={open}
              className="inline-block bg-gold text-navy px-8 py-3.5 rounded-none text-[16.5px] font-semibold transition-colors hover:bg-gold-l cursor-pointer"
            >
              聊聊你的產品 →
            </button>
            <Link
              href="/assess"
              className="group inline-flex items-center gap-2 text-tx2 text-[15.5px] font-medium transition-colors hover:text-navy"
            >
              <span className="border-b border-tx3/40 pb-0.5 group-hover:border-navy transition-colors">
                先做 2 分鐘評估
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-8 text-center">
          <Link
            href="/insights"
            className="text-[14.5px] text-tx3 font-medium hover:text-navy transition-colors"
          >
            ← 回到所有文章
          </Link>
        </div>
      </div>
    </article>
  );
}
