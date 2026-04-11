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
    <section className="bg-white min-h-screen pt-[100px] md:pt-[120px] pb-[60px] md:pb-[80px] px-5 md:px-10">
      <div className="max-w-[1100px] mx-auto">
        <div className="section-label">案例</div>
        <h1 className="section-heading">
          這些企業都找到了自己的路
        </h1>
        <p className="section-desc">
          不同產業、不同市場，但都用對的方法做了對的決策。點進去看完整的思考過程。
        </p>

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
                href={`/cases/${c.slug}`}
                className="group bg-white rounded-none text-left cursor-pointer transition-all shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg relative overflow-hidden border border-bd"
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
