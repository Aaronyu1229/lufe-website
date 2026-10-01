"use client";

import { useRef, useState, type RefObject } from "react";
import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { Reveal } from "@/components/Reveal";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { ExpandCard, Segmented, flip } from "@/components/ui";
import {
  CASES,
  CASE_CARD_META,
  INDUSTRIES,
  MARKETS,
  type IndustryFilter,
  type MarketFilter,
} from "@/data/cases";

import { useMessageBox } from "../MessageBox";

const BEAT_LABELS = ["情境", "卡點", "決策", "結果"] as const;

export const CASE_ROADS = [
  {
    label: "第一條",
    title: "從零開始",
    body: "在當地蓋一間英語教育機構，後來用同樣的方法做了一個連鎖手搖飲品牌。",
    lesson: "找人比找店面難，第一批人決定後面所有事。",
  },
  {
    label: "第二條",
    title: "改了再帶過去",
    body: "台灣的產品到了當地，改配方、改價格、改包裝。",
    lesson: "台灣的「好」不一定是當地的「好」，先讓當地人拿起來看看。",
  },
  {
    label: "第三條",
    title: "原封不動帶過去",
    body: "一個台灣的美業品牌，什麼都不改，只做當地行銷。",
    lesson: "品牌可以不改，但講故事的方式一定要改。",
  },
] as const;

interface CasesPageContentProps {
  readonly industry: IndustryFilter;
  readonly market: MarketFilter;
  readonly onIndustryChange?: (industry: IndustryFilter) => void;
  readonly onMarketChange?: (market: MarketFilter) => void;
  readonly onMessageOpen?: () => void;
  readonly caseStackRef?: RefObject<HTMLDivElement | null>;
}

function matchesFilter(
  caseItem: (typeof CASES)[number],
  industry: IndustryFilter,
  market: MarketFilter,
) {
  return (industry === "all" || caseItem.industry === industry) && (market === "all" || caseItem.market === market);
}

function isIndustryFilter(value: string): value is IndustryFilter {
  return INDUSTRIES.some((option) => option.value === value);
}

function isMarketFilter(value: string): value is MarketFilter {
  return MARKETS.some((option) => option.value === value);
}

function CaseTags({ tags }: { tags: (typeof CASES)[number]["tags"] }) {
  return <p className="text-[13px] font-medium text-tx3">{tags.map((tag) => tag.label).join(" · ")}</p>;
}

function CasePanel({ caseItem }: { caseItem: (typeof CASES)[number] }) {
  const meta = CASE_CARD_META[caseItem.slug];

  return (
    <div>
      <CaseTags tags={caseItem.tags} />
      <div className="num mt-2 text-[56px] leading-[0.95] text-gold-d">{caseItem.num}</div>
      <p className="mt-2 text-[17px] leading-[1.4] text-tx2">{meta.headline}</p>
      <p className="mt-6 text-[15.5px] leading-[1.8] text-tx2">{caseItem.summary}</p>

      <div className="mt-6 border-t border-bd">
        {meta.beats.map((beat, index) => (
          <div key={BEAT_LABELS[index]} className="grid grid-cols-[32px_minmax(0,1fr)] gap-3 border-b border-bd py-4">
            <span className="num text-[14px] text-gold-d">{String(index + 1).padStart(2, "0")}</span>
            <div className="min-w-0">
              <p className="mb-1 text-[11px] font-semibold tracking-[0.12em] text-tx3">{BEAT_LABELS[index]}</p>
              <p className="text-[15.5px] leading-[1.8] text-tx2">{beat}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="py-5 text-[14px] leading-[1.7] text-tx3">完整時間軸、關鍵決策推理、客戶回饋——都在內頁</p>
      <div className="flex flex-wrap gap-3 border-t border-bd pt-5">
        <Link href={`/cases/${caseItem.slug}`} className="inline-flex bg-navy px-5 py-3 text-[14px] font-semibold text-white hover:bg-navy-l">
          讀完整案例 →
        </Link>
        <Link href={`/assess?case=${caseItem.slug}`} className="inline-flex bg-black/[.06] px-5 py-3 text-[14px] font-semibold text-tx hover:bg-black/[.1]">
          比對你的處境
        </Link>
      </div>
    </div>
  );
}

function CaseCard({ caseItem }: { caseItem: (typeof CASES)[number] }) {
  const meta = CASE_CARD_META[caseItem.slug];

  return (
    <ExpandCard
      title={caseItem.title}
      image={{ src: caseItem.heroImage, alt: caseItem.title }}
      card={
        <article className="lufe-card group overflow-hidden border border-bd bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:border-gold/60">
          <div className="relative h-[clamp(250px,35vw,340px)] overflow-hidden bg-navy">
            <TieredImage
              src={caseItem.heroImage}
              alt={caseItem.title}
              sizes="(max-width: 1080px) 100vw, 1080px"
              className="lufe-case-cover absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/95 via-navy/30 to-transparent" />

            <div className="absolute left-6 top-6 flex items-center gap-2 md:left-10 md:top-7">
              <span aria-hidden="true" className="h-px w-6 bg-gold/80" />
              <span className="text-[12px] font-semibold text-gold">{caseItem.tags.map((tag) => tag.label).join(" · ")}</span>
            </div>

            <div className="absolute bottom-7 left-6 right-6 md:bottom-8 md:left-10 md:right-10">
              <div className="num mb-2 text-[clamp(50px,7vw,72px)] leading-[0.95] text-gold">{caseItem.num}</div>
              <p className="text-[clamp(16px,2vw,18px)] leading-[1.4] text-white">{meta.headline}</p>
            </div>
          </div>

          <div className="grid grid-cols-[minmax(0,1fr)_40px] gap-x-6 gap-y-4 p-6 md:gap-x-7 md:px-10 md:py-7">
            <div className="min-w-0">
              <h2 className="h3 text-tx">「{meta.painTitle}」</h2>
            </div>
            <span aria-hidden="true" className="grid h-10 w-10 place-items-center border border-bd text-[22px] leading-none text-tx2 group-hover:border-gold group-hover:text-gold-d">
              +
            </span>
            <p className="col-span-full text-[14px] font-medium text-tx3">展開故事 · 四段 20 秒看完 →</p>
          </div>
        </article>
      }
      panel={<CasePanel caseItem={caseItem} />}
    />
  );
}

/**
 * Presentational export keeps every filter result and expanded panel in SSR markup.
 * The stateful wrapper below only changes visibility and animates card positions.
 */
export function CasesPageContent({
  industry,
  market,
  onIndustryChange = () => {},
  onMarketChange = () => {},
  onMessageOpen = () => {},
  caseStackRef,
}: CasesPageContentProps) {
  const visibleCount = CASES.filter((caseItem) => matchesFilter(caseItem, industry, market)).length;
  const hasMatches = visibleCount > 0;

  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/v5/cases-1600.webp" srcSet="/images/v5/cases-1600.webp 1600w, /images/v5/cases-2400.webp 2400w" position="center 60%" />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href="/" className="hover:text-white">首頁</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-white/75">案例</span>
          </nav>

          <h1 className="h1 mb-7 max-w-[880px] text-white">我們不是跟你賭市場，<br /><span className="text-gold">是有做過的事</span></h1>
          <p className="lead max-w-[600px] whitespace-pre-line text-white/70">在菲律賓，我們跟合作夥伴走過三條不一樣的路。{"\n"}底下是其中幾個決策的完整過程。</p>
        </div>
        <ScrollCue />
      </section>

      <section className="bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <Reveal className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-3">
            {CASE_ROADS.map((road) => <article key={road.label} className="lufe-card border border-bd bg-cream p-6"><p className="text-[14px] font-semibold text-gold-d">{road.label}</p><h2 className="h3 mt-3 text-tx">{road.title}</h2><p className="mt-4 text-[15px] leading-[1.8] text-tx2">{road.body}</p><div className="mt-6 border-t border-bd pt-4 text-[14px] leading-[1.8] text-tx2"><strong className="block text-tx">這條路教我們的事</strong>{road.lesson}</div></article>)}
          </Reveal>
        </div>
      </section>

      <section className="bg-white pb-0">
        <div className="lufe-container"><div className="flex flex-col items-start justify-between gap-6 border border-bd bg-cream p-6 md:flex-row md:items-center md:p-8"><div><h2 className="h3 text-tx">不確定自己比較像哪一條？</h2><p className="mt-2 text-[15px] leading-[1.8] text-tx2">先做 2 分鐘處境比對，我們告訴你最像哪一個案例。</p></div><Link href="/assess" className="shrink-0 bg-gold px-6 py-3.5 text-[15px] font-semibold text-navy hover:bg-gold-l">先做 2 分鐘處境比對 →</Link></div></div>
      </section>

      <section className="overflow-hidden bg-white pb-[80px] pt-[60px] md:pb-[110px] md:pt-[80px]">
        <div className="lufe-container min-w-0">
          <div className="mb-10 flex flex-wrap items-center gap-x-7 gap-y-5 md:mb-11">
            <div className="min-w-0">
              <p className="mb-2 text-[13px] font-semibold text-tx3">產業</p>
              <div className="max-w-full overflow-x-auto pb-1">
                <Segmented
                  label="產業"
                  value={industry}
                  onChange={(value) => {
                    if (isIndustryFilter(value)) onIndustryChange(value);
                  }}
                  options={INDUSTRIES.map((option) => ({ value: option.value, label: option.label }))}
                  className="max-w-none"
                />
              </div>
            </div>

            <div className="min-w-0">
              <p className="mb-2 text-[13px] font-semibold text-tx3">市場</p>
              <div className="max-w-full overflow-x-auto pb-1">
                <Segmented
                  label="市場"
                  value={market}
                  onChange={(value) => {
                    if (isMarketFilter(value)) onMarketChange(value);
                  }}
                  options={MARKETS.map((option) => ({ value: option.value, label: option.label }))}
                  className="max-w-none"
                />
              </div>
            </div>

            <p className="ml-auto whitespace-nowrap text-[13px] text-tx3" aria-live="polite">共 {visibleCount} 則</p>
          </div>

          <div ref={caseStackRef} className="grid min-w-0 gap-[22px]" aria-live="polite">
            {CASES.map((caseItem) => {
              const isMatch = matchesFilter(caseItem, industry, market);
              return (
                <div key={caseItem.slug} data-key={caseItem.slug} className={`min-w-0 ${isMatch ? "" : "hidden"}`}>
                  <CaseCard caseItem={caseItem} />
                </div>
              );
            })}
          </div>

          <div className={`border border-bd bg-cream px-6 py-20 text-center text-[15.5px] text-tx3 ${hasMatches ? "hidden" : ""}`}>
            這個組合暫時沒有案例。試試調整篩選條件。
          </div>

          <div className="mt-20 border-t border-bd pt-14 text-center">
            <h2 className="h2 text-tx">你的故事會是哪一條？</h2>
            <p className="mx-auto mt-3 max-w-[440px] text-[15px] leading-[1.8] text-tx2">聊聊你的產品，我們先幫你看比較像哪一條路。</p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-6">
              <button onClick={onMessageOpen} className="cursor-pointer bg-gold px-8 py-3.5 text-[16.5px] font-semibold text-navy hover:bg-gold-l">
                聊聊你的產品 →
              </button>
              <Link href="/assess" className="inline-flex items-center gap-2 text-[15.5px] font-medium text-tx2 hover:text-navy">
                <span className="border-b border-tx3/40 pb-0.5">先做 2 分鐘評估</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export function CasesPage() {
  const { open } = useMessageBox();
  const [industry, setIndustry] = useState<IndustryFilter>("all");
  const [market, setMarket] = useState<MarketFilter>("all");
  const caseStackRef = useRef<HTMLDivElement>(null);

  const updateFilter = (mutate: () => void) => {
    const stack = caseStackRef.current;
    if (stack) {
      flip(stack, mutate);
      return;
    }
    mutate();
  };

  return (
    <CasesPageContent
      industry={industry}
      market={market}
      onIndustryChange={(value) => updateFilter(() => setIndustry(value))}
      onMarketChange={(value) => updateFilter(() => setMarket(value))}
      onMessageOpen={open}
      caseStackRef={caseStackRef}
    />
  );
}
