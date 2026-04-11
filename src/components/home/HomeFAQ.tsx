"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

/**
 * HomeFAQ
 * Three quick-scan questions that surface the most common last-mile hesitations
 * (price, timeline, risk of "not suitable"). Condensed from /services FAQ so a
 * visitor doesn't have to leave the home page to get closure on these concerns.
 */

const items = [
  {
    q: "這要花多少錢？",
    a: "初步評估階段的投入通常是幾萬到十幾萬台幣——取決於你的產品類型和目標市場。測試階段大約 50–100 萬。我們會在第一次聊天時給你一個合理的預算範圍，你不用承諾任何事，也不會拿到天價報價。",
  },
  {
    q: "從開始到產品上架要多久？",
    a: "平均 6–9 個月，取決於產品類型和目標市場的認證要求。食品和保健品通常較長（9–12 個月），消費電子產品較快（4–6 個月）。我們會在評估報告裡給你明確的時間表，不會讓你一直等。",
  },
  {
    q: "如果評估後發現我的產品不適合怎麼辦？",
    a: "那反而是最好的結果之一——你省下了幾百萬的冤枉錢。我們會老實告訴你為什麼，也會告訴你未來什麼條件改變後可以再考慮。有時候「現在不適合」只是「換個方式更好」。",
  },
];

export function HomeFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section className="bg-white py-[72px] md:py-[96px] px-5 md:px-10">
      <div className="max-w-[840px] mx-auto">
        <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold/70 mb-3">
          你可能會想知道
        </div>
        <h2 className="font-sans text-[clamp(26px,3.2vw,38px)] leading-[1.2] font-light tracking-[-0.4px] mb-3">
          三個最常被問到的問題
        </h2>
        <p className="text-[15px] text-tx2 max-w-[520px] leading-[1.7] mb-10 font-normal">
          在你決定聊聊之前，先回答你心裡可能已經冒出來的那幾個疑問。
        </p>

        <div className="border-t border-bd">
          {items.map((item, i) => {
            const isOpen = openIdx === i;
            return (
              <div key={item.q} className="border-b border-bd">
                <button
                  onClick={() => setOpenIdx(isOpen ? null : i)}
                  className="w-full flex items-center justify-between py-5 md:py-6 text-left cursor-pointer group"
                  aria-expanded={isOpen}
                >
                  <span className="text-[16px] md:text-[17px] font-medium pr-4 group-hover:text-navy transition-colors">
                    {item.q}
                  </span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 18 18"
                    fill="none"
                    className={`transition-transform duration-300 shrink-0 text-tx3 group-hover:text-gold ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  >
                    <path
                      d="M4 7L9 12L14 7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 text-[14.5px] text-tx2 leading-[1.85] font-normal max-w-[720px]">
                        {item.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-[13.5px] text-tx3 font-normal">
          還有其他問題？
          <Link
            href="/services#faq"
            className="ml-2 text-navy font-semibold border-b border-navy/30 hover:border-navy pb-0.5 transition-colors"
          >
            看完整 FAQ
          </Link>
        </div>
      </div>
    </section>
  );
}
