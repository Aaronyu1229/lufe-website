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
  gold: "bg-[rgba(212,168,92,0.12)] text-gold-d",
  ember: "bg-[rgba(217,139,74,0.08)] text-ember",
};

/* ───────── component ───────── */

type FilterCategory = Category | "全部";

const VALID_CATEGORIES: readonly FilterCategory[] = [
  "全部",
  "菲律賓",
  "印尼",
  "東南亞趨勢",
  "北美市場",
  "出海實戰",
  "企業體質",
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

  const featured = articles[0];

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-navy pt-[130px] md:pt-[170px] pb-[70px] md:pb-[90px] px-5 md:px-10 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/insights/insights-hero-analysis.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.3] animate-hero-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/80 to-navy/40" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy" />
          {/* Light sweep */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 -left-1/3 w-1/3 pointer-events-none animate-hero-light-sweep"
            style={{
              background:
                "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.04) 40%, rgba(212,168,92,0.08) 50%, rgba(255,255,255,0.04) 60%, transparent 100%)",
            }}
          />
        </div>

        {/* Soft gold glow — with pulse */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none animate-hero-glow-pulse"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 20% 0%, rgba(212,168,92,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-10 lg:gap-14 items-start">
          {/* Left column — breadcrumb, eyebrow, headline, stats */}
          <div>
            <nav aria-label="Breadcrumb" className="mb-7 text-[11px] font-medium tracking-[1px] text-white/50">
              <Link href="/" className="hover:text-gold transition-colors">首頁</Link>
              <span className="mx-2 text-white/30">/</span>
              <span className="text-white/75">洞察與資源</span>
            </nav>

            <div className="flex items-center gap-3 mb-5">
              <span className="block w-8 h-px bg-gold" />
              <span className="text-[11.5px] font-semibold tracking-[2.5px] uppercase text-gold">
                洞察與資源 · INSIGHTS
              </span>
            </div>

            <h1 className="font-heading text-[clamp(34px,4.8vw,58px)] text-white leading-[1.08] font-light tracking-[-0.8px] mb-6">
              跨境路上，
              <br />
              <span className="font-normal text-gold">知識就是捷徑</span>
            </h1>
            <p className="text-[17px] md:text-[18px] text-white/65 max-w-[540px] font-light leading-[1.8] mb-10">
              菲律賓、印尼、北美市場趨勢，出海實戰與企業體質——幫你用最少的時間搞懂跨境這件事。
            </p>

            {/* Stats strip */}
            <div className="border-t border-white/10 pt-6 grid grid-cols-3 gap-5 md:gap-8 max-w-[520px]">
              {[
                { n: String(articles.length), l: "篇實戰文章" },
                { n: "4", l: "主題分類" },
                { n: "每月", l: "新增更新" },
              ].map((s) => (
                <div key={s.l}>
                  <div className="font-heading text-[22px] md:text-[26px] font-light text-gold leading-none tabular-nums">
                    {s.n}
                  </div>
                  <div className="text-[11px] md:text-[11.5px] text-white/50 mt-1.5 tracking-[0.5px]">
                    {s.l}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right column — featured article card */}
          <div className="hidden lg:block">
            <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-white/40 mb-3">
              本期精選
            </div>
            <Link
              href={`/insights/${featured.slug}`}
              className="group block bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-gold/50 transition-all overflow-hidden"
            >
              <div className="relative h-[170px] overflow-hidden">
                <Image
                  src={getArticleImage(featured)}
                  alt={featured.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
                <div className="absolute bottom-3 left-4 flex items-center gap-2">
                  <span className="text-[10px] px-2 py-0.5 bg-gold text-navy font-semibold tracking-[1px] uppercase">
                    精選
                  </span>
                  <span className="text-[10.5px] text-white/80">
                    {featured.category}
                  </span>
                </div>
              </div>
              <div className="p-5">
                <h2 className="text-[17px] md:text-[18px] font-semibold leading-[1.45] text-white group-hover:text-gold transition-colors mb-2 line-clamp-2">
                  {featured.title}
                </h2>
                <p className="text-[13.5px] text-white/55 leading-[1.8] line-clamp-2 mb-3">
                  {featured.summary}
                </p>
                <div className="flex items-center justify-between text-[11px] text-white/45">
                  <span>{featured.date}</span>
                  <span>{featured.readTime}</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Filters + Articles ─── */}
      <section className="bg-white pt-[60px] md:pt-[80px] pb-[80px] px-5 md:px-10">
        <div className="max-w-[1000px] mx-auto">
        {/* Category chips */}
        <div className="flex gap-2 flex-wrap mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2.5 rounded-none text-[14.5px] font-medium cursor-pointer transition-all ${
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
                <h2 className="text-[17px] font-semibold leading-[1.5] mb-2 group-hover:text-gold transition-colors">
                  {article.title}
                </h2>
                <p className="text-[14.5px] text-tx2 leading-[1.8] font-normal line-clamp-3">
                  {article.summary}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-[13px] text-tx3">{article.date}</span>
                  <span className="text-[14.5px] font-medium text-gold opacity-0 group-hover:opacity-100 transition-opacity">
                    閱讀更多 →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-center py-16 text-tx3 text-[15.5px]">
            這個分類暫時還沒有文章，敬請期待！
          </div>
        )}

        {/* Bottom CTA */}
        <div className="mt-14 p-8 bg-cream rounded-none text-center">
          <h2 className="text-[19px] font-medium mb-2">
            看完文章，想聊聊你的狀況？
          </h2>
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
        </div>
      </section>
    </>
  );
}

export function InsightsPage() {
  return (
    <Suspense
      fallback={
        <section className="bg-navy pt-[130px] md:pt-[170px] pb-[70px] md:pb-[90px] px-5 md:px-10">
          <div className="max-w-[1200px] mx-auto min-h-[400px]" />
        </section>
      }
    >
      <InsightsPageInner />
    </Suspense>
  );
}
