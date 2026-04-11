"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMessageBox } from "../MessageBox";
import {
  CASES,
  INDUSTRIES,
  MARKETS,
  type IndustryFilter,
  type MarketFilter,
} from "@/data/cases";

const tagStyles: Record<string, string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold",
};

export function CasesPage() {
  const [industry, setIndustry] = useState<IndustryFilter>("all");
  const [market, setMarket] = useState<MarketFilter>("all");

  const filtered = useMemo(
    () =>
      CASES.filter((c) => {
        if (industry !== "all" && c.industry !== industry) return false;
        if (market !== "all" && c.market !== market) return false;
        return true;
      }),
    [industry, market]
  );

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-navy pt-[130px] md:pt-[170px] pb-[70px] md:pb-[90px] px-5 md:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/cases/cases-hero-collab.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.32]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/55 to-navy" />
        </div>

        {/* Soft gold glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 20% 10%, rgba(212,168,92,0.14) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-7 text-[11px] font-medium tracking-[1px] text-white/50">
            <Link href="/" className="hover:text-gold transition-colors">首頁</Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/75">案例</span>
          </nav>

          {/* Eyebrow — bilingual */}
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px bg-gold" />
            <span className="text-[11.5px] font-semibold tracking-[2.5px] uppercase text-gold">
              案例 · CASE STUDIES
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-[clamp(34px,5vw,60px)] text-white leading-[1.08] font-light tracking-[-0.8px] mb-6 max-w-[900px]">
            這些企業都找到了
            <br />
            <span className="font-normal text-gold">自己的路</span>
          </h1>
          <p className="text-[15.5px] md:text-[17px] text-white/65 max-w-[640px] font-light leading-[1.75] mb-12 md:mb-14">
            不同產業、不同市場，但都用對的方法做了對的決策。每一個案例都是一次真實的思考過程。
          </p>

          {/* 4 case preview chips */}
          <div className="hidden md:block mb-12">
            <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-white/40 mb-4">
              收錄案例
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {CASES.map((c) => (
                <a
                  key={c.slug}
                  href={`#case-${c.slug}`}
                  className="group bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-gold/40 p-4 transition-all"
                >
                  <div className="flex items-baseline gap-2 mb-1.5 flex-wrap">
                    {c.tags.slice(0, 1).map((t) => (
                      <span
                        key={t.label}
                        className="text-[10px] text-white/50 uppercase tracking-[1px]"
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                  <div className="text-[13px] font-semibold text-white leading-tight mb-1.5 group-hover:text-gold transition-colors line-clamp-2">
                    {c.title}
                  </div>
                  <div className="font-heading text-[15px] text-gold font-normal tabular-nums">
                    {c.num}
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <div className="border-t border-white/10 pt-7 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {[
              { n: "4", l: "真實案例" },
              { n: "4", l: "產業別" },
              { n: "2", l: "主要市場" },
              { n: "100%", l: "真實數據" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-heading text-[24px] md:text-[28px] font-light text-gold leading-none tabular-nums">
                  {s.n}
                </div>
                <div className="text-[11px] md:text-[11.5px] text-white/50 mt-1.5 tracking-[0.5px]">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Filters + Card wall ─── */}
      <section className="bg-white pt-[60px] md:pt-[80px] pb-[60px] md:pb-[80px] px-5 md:px-10">
        <div className="max-w-[1100px] mx-auto">
        {/* Filters */}
        <div className="mt-10 mb-8 space-y-4">
          <div>
            <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-2">
              按產業
            </div>
            <div className="flex gap-2 flex-wrap">
              {INDUSTRIES.map((i) => (
                <button
                  key={i.value}
                  onClick={() => setIndustry(i.value)}
                  className={`px-3.5 py-1.5 text-[12.5px] font-medium rounded-none transition-colors cursor-pointer ${
                    industry === i.value
                      ? "bg-navy text-white"
                      : "bg-cream text-tx2 hover:bg-bd/40"
                  }`}
                >
                  {i.label}
                </button>
              ))}
            </div>
          </div>
          <div>
            <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-2">
              按市場
            </div>
            <div className="flex gap-2 flex-wrap">
              {MARKETS.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setMarket(m.value)}
                  className={`px-3.5 py-1.5 text-[12.5px] font-medium rounded-none transition-colors cursor-pointer ${
                    market === m.value
                      ? "bg-navy text-white"
                      : "bg-cream text-tx2 hover:bg-bd/40"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-[12px] text-tx3 mb-6">
          顯示 {filtered.length} 個案例
        </div>

        {/* Card wall */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filtered.map((c) => (
              <Link
                key={c.slug}
                id={`case-${c.slug}`}
                href={`/cases/${c.slug}`}
                className="group bg-white rounded-none text-left cursor-pointer transition-all shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg relative overflow-hidden border border-bd scroll-mt-[100px]"
              >
                <div className="h-[200px] overflow-hidden relative">
                  <Image
                    src={c.heroImage}
                    alt={c.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7">
                  <div className="flex gap-1.5 mb-3">
                    {c.tags.map((t) => (
                      <span
                        key={t.label}
                        className={`text-[11px] px-2.5 py-[3px] rounded-none font-medium ${tagStyles[t.variant]}`}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                  <div className="font-heading text-[42px] text-gold leading-none font-semibold mb-3 tabular-nums">
                    {c.num}
                  </div>
                  <h3 className="font-heading text-[18px] leading-[1.4] mb-2 font-bold">
                    {c.title}
                  </h3>
                  <p className="text-[13px] text-tx2 leading-[1.65] font-normal mb-4">
                    {c.summary}
                  </p>
                  <span className="text-[13px] font-semibold text-tx3 group-hover:text-gold transition-colors">
                    看完整故事 →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-tx3 text-[14px] bg-cream">
            這個組合暫時沒有案例。試試調整篩選條件。
          </div>
        )}

        {/* Bottom CTA */}
        <CasesListBottomCTA />
        </div>
      </section>
    </>
  );
}

function CasesListBottomCTA() {
  const { open } = useMessageBox();
  return (
    <div className="text-center mt-16 pt-14 border-t border-bd">
      <p className="text-[16px] text-tx font-medium mb-3">
        想知道你的產品適合哪條路？
      </p>
      <p className="text-[13.5px] text-tx2 font-normal mb-6 max-w-[440px] mx-auto">
        聊聊，不收費、不承諾、不賣課。我們會老實告訴你值不值得一試。
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
  );
}
