"use client";

import Link from "next/link";

/**
 * HomeFAQ
 * 3 individual concern cards (not an accordion) — all answers visible.
 * Sits between the navy WhySection and navy CTASection on home, so the
 * cream background with radial glow gives this section its own identity
 * as a "warm breath" between two dramatic dark sections.
 *
 * Design intent: surface all 3 answers at scan-speed, make each feel like
 * a distinct concern being addressed individually, avoid text-wall fatigue.
 */

type Accent = "sky" | "gold" | "ember";

interface FaqItem {
  readonly num: string;
  readonly accent: Accent;
  readonly topic: string;
  readonly question: string;
  readonly answer: string;
  readonly takeaway: string;
  readonly icon: React.ReactNode;
}

const MoneyIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect x="4" y="9" width="24" height="15" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
    <circle cx="16" cy="16.5" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    <path d="M7 12V21" stroke="currentColor" strokeWidth="1" opacity="0.55" />
    <path d="M25 12V21" stroke="currentColor" strokeWidth="1" opacity="0.55" />
    <path d="M4 6H28" stroke="currentColor" strokeWidth="1.5" opacity="0.45" />
    <path d="M2 27H30" stroke="currentColor" strokeWidth="1.5" opacity="0.3" />
  </svg>
);

const ClockIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.5" />
    <path d="M16 9V16L20.5 18.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    <path d="M16 3V5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M16 27V29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 16H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M27 16H29" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ShieldIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path
      d="M16 3L5 7V15C5 21 9.5 26.5 16 29C22.5 26.5 27 21 27 15V7L16 3Z"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
    <path
      d="M11 16L14.5 19L21 12.5"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const items: readonly FaqItem[] = [
  {
    num: "01",
    accent: "sky",
    topic: "預算",
    question: "這要花多少錢？",
    answer:
      "看你走哪條路。如果是先去東南亞測試市場，我們按階段收固定費用，每一步花多少錢事前講清楚。如果是要打進北美通路，前期只收低服務費，主要靠成交抽成——我們幫你賣出去才真的賺錢。不管哪條路，第一次聊天就會給你明確的數字。",
    takeaway: "探路固定費，落地抽成制。第一次對話就給數字。",
    icon: <MoneyIcon />,
  },
  {
    num: "02",
    accent: "gold",
    topic: "時程",
    question: "從開始到看到結果要多久？",
    answer:
      "東南亞探路通常 3–4 個月就能拿到第一批市場回饋。北美通路落地平均 6–9 個月，食品保健品會再長一些（9–12 個月），因為認證要求較高。我們會在第一次對話後給你明確的時間表。",
    takeaway: "探路 3–4 個月有回饋 · 落地 6–12 個月進通路。",
    icon: <ClockIcon />,
  },
  {
    num: "03",
    accent: "ember",
    topic: "風險",
    question: "如果發現我的產品不適合怎麼辦？",
    answer:
      "那反而是最好的結果之一——你省下了幾百萬的冤枉錢。探路的設計就是用最小成本先驗證，不適合就停，不會讓你砸大錢才發現。我們會老實告訴你為什麼，也會告訴你什麼條件改變後可以再試。",
    takeaway: "探路就是為了在砸大錢之前先搞清楚。",
    icon: <ShieldIcon />,
  },
];

const accentMap: Record<
  Accent,
  {
    border: string;
    text: string;
    numText: string;
    iconBg: string;
    takeawayBg: string;
    takeawayText: string;
  }
> = {
  sky: {
    border: "border-sky",
    text: "text-sky",
    numText: "text-sky",
    iconBg: "bg-[rgba(91,143,168,0.08)] text-sky",
    takeawayBg: "bg-[rgba(91,143,168,0.06)]",
    takeawayText: "text-sky",
  },
  gold: {
    border: "border-gold-d",
    text: "text-gold-d",
    numText: "text-gold-d",
    iconBg: "bg-[rgba(212,168,92,0.1)] text-gold-d",
    takeawayBg: "bg-[rgba(212,168,92,0.08)]",
    takeawayText: "text-gold-d",
  },
  ember: {
    border: "border-ember",
    text: "text-ember",
    numText: "text-ember",
    iconBg: "bg-[rgba(217,139,74,0.08)] text-ember",
    takeawayBg: "bg-[rgba(217,139,74,0.06)]",
    takeawayText: "text-ember",
  },
};

export function HomeFAQ() {
  return (
    <section className="relative bg-cream py-[80px] md:py-[104px] px-5 md:px-10 overflow-hidden">
      {/* Soft gold radial glow — gives the section depth without imagery */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(212,168,92,0.08) 0%, transparent 70%)",
        }}
      />

      {/* Decorative oversized "?" mark in the corner */}
      <div
        aria-hidden="true"
        className="absolute -right-10 -top-10 md:-right-16 md:-top-16 pointer-events-none select-none font-sans font-extralight text-[160px] md:text-[220px] leading-none text-gold/[0.04]"
      >
        ?
      </div>

      <div className="relative max-w-[1200px] mx-auto">
        {/* Header */}
        <div className="text-center mb-14 md:mb-16">
          <div className="text-[11.5px] font-semibold tracking-[2.5px] uppercase text-gold-d mb-4">
            你可能會想知道
          </div>
          <h2 className="font-sans text-[clamp(28px,3.8vw,44px)] leading-[1.15] font-light tracking-[-0.6px] text-navy mb-4">
            三個最常被問到的<span className="text-gold-d font-normal">問題</span>
          </h2>
          <p className="text-[16px] md:text-[17px] text-tx2 max-w-[560px] mx-auto leading-[1.8]">
            在你決定聊聊之前，先回答你心裡可能已經冒出來的那幾個疑問。
          </p>
        </div>

        {/* 3 concern cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {items.map((item) => {
            const c = accentMap[item.accent];
            return (
              <article
                key={item.num}
                className={`group relative bg-white p-6 md:p-8 border-t-2 ${c.border} shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_10px_30px_-8px_rgba(16,27,48,0.12)] hover:-translate-y-1 flex flex-col`}
              >
                {/* Header row — num + icon + topic badge */}
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center gap-4">
                    <span
                      className={`font-sans text-[34px] md:text-[38px] font-extralight tabular-nums leading-none ${c.numText}`}
                    >
                      {item.num}
                    </span>
                    <div
                      className={`w-12 h-12 ${c.iconBg} flex items-center justify-center`}
                    >
                      {item.icon}
                    </div>
                  </div>
                  <span
                    className={`text-[10px] font-semibold tracking-[1.5px] uppercase ${c.text} self-start mt-1`}
                  >
                    {item.topic}
                  </span>
                </div>

                {/* Question */}
                <h3 className="text-[19px] md:text-[21px] font-semibold leading-[1.4] text-tx mb-4">
                  {item.question}
                </h3>

                {/* Answer */}
                <p className="text-[15px] text-tx2 leading-[1.85] font-normal mb-6 flex-1">
                  {item.answer}
                </p>

                {/* Takeaway pull-quote */}
                <div
                  className={`${c.takeawayBg} px-4 py-3 border-l-2 ${c.border}`}
                >
                  <div className="text-[10px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-1">
                    要點
                  </div>
                  <p
                    className={`text-[14.5px] font-medium leading-snug ${c.takeawayText}`}
                  >
                    {item.takeaway}
                  </p>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer link */}
        <div className="mt-12 text-center">
          <Link
            href="/services#faq"
            className="group inline-flex items-center gap-2 text-[15px] font-semibold text-tx2 hover:text-navy transition-colors"
          >
            <span className="border-b border-tx3/40 pb-0.5 group-hover:border-navy transition-colors">
              還有其他問題？看完整 FAQ
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
