"use client";

import Link from "next/link";

/**
 * HomeFAQ
 * An editorial two-column FAQ: a sticky introduction anchors the section
 * while rule-separated questions, takeaways, and answers form the reading flow.
 */

interface FaqItem {
  readonly num: string;
  readonly question: string;
  readonly answer: string;
  readonly takeaway: string;
}

const items: readonly FaqItem[] = [
  {
    num: "01",
    question: "這要花多少錢？",
    answer:
      "看你走哪條路。如果是先去東南亞測試市場，我們按階段收固定費用，每一步花多少錢事前講清楚。如果是要打進北美通路，前期只收低服務費，主要靠成交抽成——我們幫你賣出去才真的賺錢。不管哪條路，第一次聊天就會給你明確的數字。",
    takeaway: "探路固定費，落地抽成制。第一次對話就給數字。",
  },
  {
    num: "02",
    question: "從開始到看到結果要多久？",
    answer:
      "東南亞探路通常 3–4 個月就能拿到第一批市場回饋。北美通路落地平均 6–9 個月，食品保健品會再長一些（9–12 個月），因為認證要求較高。我們會在第一次對話後給你明確的時間表。",
    takeaway: "探路 3–4 個月有回饋 · 落地 6–12 個月進通路。",
  },
  {
    num: "03",
    question: "如果發現我的產品不適合怎麼辦？",
    answer:
      "那反而是最好的結果之一——你省下了幾百萬的冤枉錢。探路的設計就是用最小成本先驗證，不適合就停，不會讓你砸大錢才發現。我們會老實告訴你為什麼，也會告訴你什麼條件改變後可以再試。",
    takeaway: "探路就是為了在砸大錢之前先搞清楚。",
  },
];

export function HomeFAQ() {
  return (
    <section className="relative bg-cream py-[62px] px-5 md:py-[96px] md:pb-[100px] md:px-10">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-y-[43px] md:grid-cols-12 md:gap-x-8 md:gap-y-0">
        <div className="self-start md:col-span-4 md:sticky md:top-[96px]">
          <p className="mb-[17px] text-[12px] font-semibold tracking-[0.09em] text-[#7A5A1A]">
            FAQ
          </p>
          <h2 className="max-w-[360px] text-[33px] font-light leading-[1.2] tracking-normal text-navy [text-wrap:balance] md:text-[clamp(31px,3.4vw,44px)]">
            三個最常被問到的問題
          </h2>
          <p className="mt-5 max-w-[340px] text-[16px] leading-[1.8] text-tx2">
            在你決定聊聊之前，先回答你心裡可能已經冒出來的那幾個疑問。
          </p>
          <Link
            href="/services#faq"
            className="group mt-6 flex w-fit items-center gap-2 text-[15px] font-semibold text-navy md:mt-8"
          >
            <span className="border-b border-[#7A5A1A] pb-[3px]">
              還有其他問題？看完整 FAQ
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        <div className="md:col-span-8">
          {items.map((item) => (
            <article
              key={item.num}
              className="border-t border-[rgba(26,26,46,0.12)] py-[25px] last:border-b md:pt-[29px] md:pb-[31px]"
            >
              <div className="grid grid-cols-[38px_minmax(0,1fr)] items-baseline gap-[7px] md:grid-cols-[50px_minmax(0,1fr)] md:gap-[10px]">
                <span className="text-[13px] font-medium tracking-[0.05em] text-[#7A5A1A] tabular-nums">
                  {item.num}
                </span>
                <h3 className="text-[18px] font-semibold leading-[1.5] tracking-normal text-tx md:text-[20px]">
                  {item.question}
                </h3>
              </div>
              <p className="mt-[17px] mb-2 ml-[45px] max-w-[650px] text-[16px] font-medium leading-[1.65] text-tx md:ml-[60px] md:text-[17px]">
                {item.takeaway}
              </p>
              <p className="ml-[45px] max-w-[650px] text-[15.5px] leading-[1.85] text-tx2 md:ml-[60px]">
                {item.answer}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
