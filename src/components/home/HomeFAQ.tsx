"use client";

import Link from "next/link";

import { Disclosure } from "@/components/ui";

interface FaqItem {
  readonly num: string;
  readonly question: string;
  readonly answer: string;
  readonly takeaway: string;
}

export const HOME_FAQ_ITEMS: readonly FaqItem[] = [
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
    <section className="bg-cream px-5 py-[62px] md:px-10 md:py-[96px] md:pb-[100px]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-y-[43px] md:grid-cols-12 md:gap-x-16 md:gap-y-0">
        <div className="self-start md:col-span-4 md:sticky md:top-[96px]">
          <h2 className="max-w-[360px] font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-navy [text-wrap:balance]">
            三個最常被問到的問題
          </h2>
          <p className="mt-4 max-w-[340px] text-[17px] leading-[1.7] text-tx2">
            在你決定聊聊之前，先回答你心裡可能已經冒出來的那幾個疑問。
          </p>
          <Link href="/services#faq" className="mt-6 inline-flex items-center gap-2 text-[16px] font-semibold text-sky md:mt-8">
            還有其他問題？看完整 FAQ <span aria-hidden="true">→</span>
          </Link>
        </div>

        <div className="min-w-0 md:col-span-8">
          {HOME_FAQ_ITEMS.map((item, index) => (
            <Disclosure
              key={item.num}
              id={`home-faq-${item.num}`}
              defaultOpen={index === 0}
              summary={
                <span className="grid min-w-0 grid-cols-[38px_minmax(0,1fr)] items-baseline gap-[7px] md:grid-cols-[50px_minmax(0,1fr)] md:gap-[10px]">
                  <span className="text-[13px] font-medium tracking-[0.05em] text-[#7A5A1A] tabular-nums">{item.num}</span>
                  <span className="text-[18px] font-semibold leading-[1.5] tracking-normal text-tx md:text-[20px]">
                    {item.question}
                  </span>
                </span>
              }
            >
              <p className="mb-2 ml-[45px] max-w-[650px] text-[16px] font-medium leading-[1.65] text-tx md:ml-[60px] md:text-[17px]">
                {item.takeaway}
              </p>
              <p className="ml-[45px] max-w-[650px] text-[15.5px] leading-[1.85] text-tx2 md:ml-[60px]">
                {item.answer}
              </p>
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
