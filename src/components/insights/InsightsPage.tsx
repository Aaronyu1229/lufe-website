"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { articles, categories, getArticleImage } from "@/data/articles";
import type { Category } from "@/data/articles";
import { useMessageBox } from "../MessageBox";

/* ───────── style maps ───────── */

const colorMap: Record<string, string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold",
  ember: "bg-[rgba(217,139,74,0.08)] text-ember",
};

/* ───────── component ───────── */

type FilterCategory = Category | "全部";

const VALID_CATEGORIES: readonly FilterCategory[] = [
  "全部",
  "市場趨勢",
  "實戰指南",
  "法規解讀",
  "工具推薦",
];

function isValidCategory(value: string | null): value is FilterCategory {
  return value !== null && VALID_CATEGORIES.includes(value as FilterCategory);
}

function InsightsPageInner() {
  const searchParams = useSearchParams();
  const catParam = searchParams.get("cat");
  const initial: FilterCategory = isValidCategory(catParam) ? catParam : "全部";
  const [active, setActive] = useState<FilterCategory>(initial);
  const { open } = useMessageBox();

  // Sync URL → state when back/forward nav changes the query
  useEffect(() => {
    if (isValidCategory(catParam) && catParam !== active) {
      setActive(catParam);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catParam]);

  const filtered =
    active === "全部"
      ? articles
      : articles.filter((a) => a.category === active);

  return (
    <section className="bg-white min-h-screen pt-[120px] pb-[80px] px-5 md:px-10">
      <div className="max-w-[1000px] mx-auto">
        <div className="section-label">洞察與資源</div>
        <h1 className="section-heading">跨境路上，知識就是捷徑</h1>
        <p className="section-desc">
          市場趨勢、實戰經驗、法規解讀——幫你用最少的時間搞懂跨境這件事。
        </p>

        {/* Category chips */}
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2.5 rounded-none text-[13px] font-medium cursor-pointer transition-all ${
                active === cat
                  ? "bg-navy text-white"
                  : "bg-white text-tx2 border border-bd hover:border-tx"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Article cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {filtered.map((article) => (
            <Link
              key={article.slug}
              href={`/insights/${article.slug}`}
              className="group bg-white rounded-none shadow-[0_1px_3px_rgba(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-lg"
            >
              {/* Cover image */}
              <div className="h-[160px] overflow-hidden relative">
                <Image
                  src={getArticleImage(article)}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`text-[11px] px-2.5 py-[3px] rounded-none font-medium ${colorMap[article.color]}`}
                  >
                    {article.category}
                  </span>
                  <span className="text-[11px] text-tx3">{article.readTime}</span>
                </div>
                <h3 className="text-[16px] font-semibold leading-[1.5] mb-2 group-hover:text-gold transition-colors">
                  {article.title}
                </h3>
                <p className="text-[13px] text-tx2 leading-[1.7] font-normal line-clamp-3">
                  {article.summary}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[12px] text-tx3">{article.date}</span>
                  <span className="text-[13px] font-medium text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    閱讀更多 →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-tx3 text-[14px]">
            這個分類暫時還沒有文章，敬請期待！
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 p-8 bg-cream rounded-none text-center">
          <h3 className="text-[18px] font-medium mb-2">
            看完文章，想聊聊你的狀況？
          </h3>
          <p className="text-[14px] text-tx2 font-normal mb-6 max-w-[440px] mx-auto">
            聊聊，不收費、不承諾。我們會老實告訴你值不值得一試。
          </p>
          <div className="flex justify-center items-center gap-6 flex-wrap">
            <button
              onClick={open}
              className="inline-block bg-gold text-navy px-8 py-3.5 rounded-none text-[15px] font-semibold transition-colors hover:bg-gold-l cursor-pointer"
            >
              聊聊你的產品 →
            </button>
            <Link
              href="/assess"
              className="group inline-flex items-center gap-2 text-tx2 text-[14px] font-medium transition-colors hover:text-navy"
            >
              <span className="border-b border-tx3/40 pb-0.5 group-hover:border-navy transition-colors">
                先做 2 分鐘評估
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function InsightsPage() {
  return (
    <Suspense
      fallback={
        <section className="bg-white min-h-screen pt-[120px] pb-[80px] px-5 md:px-10">
          <div className="max-w-[1000px] mx-auto" />
        </section>
      }
    >
      <InsightsPageInner />
    </Suspense>
  );
}
