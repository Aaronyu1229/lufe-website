"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useMessageBox } from "../MessageBox";
import {
  CASES,
  CASE_CARD_META,
  INDUSTRIES,
  MARKETS,
  type IndustryFilter,
  type MarketFilter,
} from "@/data/cases";

const BEAT_LABELS = ["情境", "卡點", "決策", "結果"] as const;

export function CasesPage() {
  const [industry, setIndustry] = useState<IndustryFilter>("all");
  const [market, setMarket] = useState<MarketFilter>("all");
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);

  const filtered = useMemo(
    () =>
      CASES.filter((c) => {
        if (industry !== "all" && c.industry !== industry) return false;
        if (market !== "all" && c.market !== market) return false;
        return true;
      }),
    [industry, market]
  );

  const toggleExpand = (slug: string) => {
    setExpandedSlug((cur) => (cur === slug ? null : slug));
  };

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-navy pt-[130px] md:pt-[170px] pb-[80px] md:pb-[110px] px-5 md:px-10 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/cases/cases-hero-collab.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.28] animate-hero-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/60 to-navy" />
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
              "radial-gradient(ellipse 55% 45% at 20% 15%, rgba(212,168,92,0.14) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-[1100px] mx-auto">
          {/* Breadcrumb */}
          <nav
            aria-label="Breadcrumb"
            className="mb-7 text-[11px] font-medium tracking-[1px] text-white/50"
          >
            <Link href="/" className="hover:text-gold transition-colors">
              首頁
            </Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/75">案例</span>
          </nav>

          {/* Headline */}
          <h1 className="font-heading text-[clamp(34px,5vw,58px)] text-white leading-[1.08] font-light tracking-[-0.8px] mb-7 max-w-[880px]">
            兩個主戰場，
            <br />
            <span className="font-normal text-gold">同一組人走出來的</span>
          </h1>
          <p className="text-[17px] md:text-[18px] text-white/65 max-w-[600px] font-light leading-[1.8] mb-12 md:mb-14">
            北美和東南亞，不同產業、不同卡點，但每一個案例我們都真的做過、
            <br className="hidden md:block" />
            都能翻到最後一個決策。
          </p>

          {/* Single-line tagline strip */}
          <div className="border-t border-white/10 pt-7 flex flex-wrap items-center gap-x-6 gap-y-2 text-[13.5px] md:text-[15px] text-white/55 font-normal">
            <span>
              <span className="text-gold font-medium">北美</span> · 保健品 / 電子 / 服飾
            </span>
            <span className="text-white/20">·</span>
            <span>
              <span className="text-gold font-medium">東南亞</span> · 餐飲連鎖
            </span>
            <span className="text-white/20">·</span>
            <span>
              <span className="text-gold font-medium">1</span> 組團隊從頭做到尾
            </span>
          </div>
        </div>
      </section>

      {/* ─── Filters + Card stack ─── */}
      <section className="bg-white pt-[60px] md:pt-[84px] pb-[60px] md:pb-[84px] px-5 md:px-10">
        <div className="max-w-[1000px] mx-auto">
          {/* Minimal editorial filter row */}
          <div className="mb-10 md:mb-12 flex flex-wrap items-center gap-x-6 gap-y-4">
            <FilterGroup
              label="產業"
              options={INDUSTRIES}
              value={industry}
              onChange={setIndustry}
            />
            <span className="hidden md:block w-px h-4 bg-bd" />
            <FilterGroup
              label="市場"
              options={MARKETS}
              value={market}
              onChange={setMarket}
            />
            <div className="ml-auto text-[11.5px] text-tx3 tracking-[0.5px]">
              共 {filtered.length} 則
            </div>
          </div>

          {/* Cards */}
          {filtered.length > 0 ? (
            <div className="space-y-6 md:space-y-7">
              {filtered.map((c) => {
                const meta = CASE_CARD_META[c.slug];
                const isExpanded = expandedSlug === c.slug;

                return (
                  <article
                    key={c.slug}
                    id={`case-${c.slug}`}
                    className={`group bg-white border transition-all scroll-mt-[100px] ${
                      isExpanded
                        ? "border-gold/40 shadow-[0_12px_40px_rgba(18,38,63,0.10)]"
                        : "border-bd shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-bd hover:shadow-[0_6px_24px_rgba(18,38,63,0.07)]"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleExpand(c.slug)}
                      aria-expanded={isExpanded}
                      aria-controls={`case-panel-${c.slug}`}
                      className="w-full text-left cursor-pointer"
                    >
                      {/* Image with outcome overlay */}
                      <div className="relative h-[280px] md:h-[340px] overflow-hidden">
                        <Image
                          src={c.heroImage}
                          alt={c.title}
                          fill
                          sizes="(max-width: 1000px) 100vw, 1000px"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/30 to-transparent" />

                        {/* Tag eyebrow — top-left */}
                        <div className="absolute left-6 md:left-10 top-6 md:top-8 flex items-center gap-2">
                          <span className="block w-6 h-px bg-gold/80" />
                          <span className="text-[10.5px] tracking-[2px] uppercase text-gold/90 font-semibold">
                            {c.tags.map((t) => t.label).join(" · ")}
                          </span>
                        </div>

                        {/* Big outcome — bottom-left overlay */}
                        <div className="absolute left-6 md:left-10 right-6 md:right-10 bottom-6 md:bottom-9">
                          <div className="font-heading text-[54px] md:text-[72px] text-gold font-light leading-[0.95] tabular-nums mb-2">
                            {c.num}
                          </div>
                          <div className="text-[15.5px] md:text-[17px] text-white/85 font-normal leading-snug">
                            {meta.headline}
                          </div>
                        </div>
                      </div>

                      {/* Body — pain title + toggle */}
                      <div className="px-6 md:px-10 pt-7 md:pt-9 pb-7 md:pb-8">
                        <div className="flex items-start justify-between gap-6 md:gap-8">
                          <div className="flex-1 min-w-0">
                            <div className="text-[10.5px] tracking-[1.8px] uppercase text-tx3 font-semibold mb-3">
                              客戶的原話
                            </div>
                            <h2 className="font-heading text-[21px] md:text-[24px] text-tx font-semibold leading-[1.5]">
                              「{meta.painTitle}」
                            </h2>
                          </div>
                          <span
                            aria-hidden="true"
                            className={`flex-shrink-0 mt-1 w-10 h-10 rounded-full border border-bd flex items-center justify-center text-tx2 text-[19px] transition-all duration-300 ${
                              isExpanded
                                ? "rotate-45 bg-navy border-navy text-white"
                                : "group-hover:border-gold group-hover:text-gold"
                            }`}
                          >
                            +
                          </span>
                        </div>
                        {!isExpanded && (
                          <div className="mt-5 text-[13.5px] text-tx3 font-medium tracking-[0.3px]">
                            展開故事 · 四段 20 秒看完 →
                          </div>
                        )}
                      </div>
                    </button>

                    {/* Expanded: 4 beats + CTA */}
                    {isExpanded && (
                      <div
                        id={`case-panel-${c.slug}`}
                        className="px-6 md:px-10 pb-9 md:pb-10 animate-fade-in-up"
                      >
                        <div className="border-t border-bd pt-8 md:pt-9 grid grid-cols-1 md:grid-cols-2 gap-7 md:gap-x-12 md:gap-y-8">
                          {meta.beats.map((text, i) => (
                            <div key={BEAT_LABELS[i]} className="relative">
                              <div className="flex items-baseline gap-3 mb-2.5">
                                <span className="font-heading text-[14.5px] font-semibold text-gold-d tabular-nums tracking-[0.5px]">
                                  {String(i + 1).padStart(2, "0")}
                                </span>
                                <span className="text-[11px] font-semibold tracking-[2px] uppercase text-tx3">
                                  {BEAT_LABELS[i]}
                                </span>
                              </div>
                              <p className="text-[16px] md:text-[16.5px] text-tx2 leading-[1.8]">
                                {text}
                              </p>
                            </div>
                          ))}
                        </div>

                        <div className="mt-9 md:mt-10 pt-6 border-t border-bd/60 flex items-center justify-between gap-4 flex-wrap">
                          <div className="text-[13.5px] text-tx3 font-normal leading-relaxed">
                            完整時間軸、關鍵決策推理、客戶回饋——都在內頁
                          </div>
                          <div className="flex items-center gap-5 flex-wrap">
                            <Link
                              href={`/assess?case=${c.slug}`}
                              className="group inline-flex items-center gap-1.5 text-[14.5px] text-tx2 font-semibold tracking-[0.3px] hover:text-gold transition-colors"
                            >
                              <span className="border-b border-tx3/40 pb-0.5 group-hover:border-gold transition-colors">
                                比對你的處境
                              </span>
                              <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                                →
                              </span>
                            </Link>
                            <Link
                              href={`/cases/${c.slug}`}
                              className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-none text-[14.5px] font-semibold tracking-[0.3px] hover:bg-gold hover:text-navy transition-colors"
                            >
                              讀完整案例 →
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="py-20 text-center text-tx3 text-[15.5px] bg-cream border border-bd">
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

/* ────────── Filter group (editorial, text-button style) ────────── */

type FilterOption<T extends string> = {
  readonly value: T;
  readonly label: string;
};

function FilterGroup<T extends string>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly FilterOption<T>[];
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex items-center gap-3 md:gap-4">
      <span className="text-[10.5px] font-semibold tracking-[1.8px] uppercase text-tx3">
        {label}
      </span>
      <div className="flex items-center gap-1 flex-wrap">
        {options.map((opt, idx) => {
          const isActive = value === opt.value;
          return (
            <div key={opt.value} className="flex items-center">
              {idx > 0 && (
                <span className="text-tx3/40 mx-1.5 text-[11px]">·</span>
              )}
              <button
                type="button"
                onClick={() => onChange(opt.value)}
                className={`text-[14.5px] tracking-[0.3px] transition-colors cursor-pointer px-0.5 py-0.5 ${
                  isActive
                    ? "text-navy font-semibold border-b border-gold"
                    : "text-tx3 hover:text-tx2 font-medium"
                }`}
              >
                {opt.label}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ────────── Bottom CTA ────────── */

function CasesListBottomCTA() {
  const { open } = useMessageBox();
  return (
    <div className="text-center mt-20 pt-14 border-t border-bd">
      <p className="text-[17px] text-tx font-medium mb-3">
        想知道你的產品適合哪條路？
      </p>
      <p className="text-[15px] text-tx2 font-normal mb-6 max-w-[440px] mx-auto">
        聊聊，不收費、不承諾、不賣課。我們會老實告訴你值不值得一試。
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
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
