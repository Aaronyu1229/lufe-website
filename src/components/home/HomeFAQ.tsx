"use client";

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
    answer: "數字：品測 1～2 萬（前 10 家實驗價）。寄賣包 5～6 萬，合起來是 7 萬起手包，品測費可抵。\n公司落地按案，第一次談就給範圍；海外客服的區間，也是第一次談就給。\n\n真心話：我們不會先報價再問你需求。\n第一次見面，我們想先聽你的產品在台灣怎麼賣、為什麼想出去。\n有時候聽完，我們會建議你再等等——那也是一種答案。",
    takeaway: "先講數字，再講一句真心話。",
  },
  {
    num: "02",
    question: "從開始到看到結果要多久？",
    answer: "品測：面板跑完就給你那一頁，不用等證。\n寄賣：產品證要 6～12 週，這段時間學校活動先跑，證下來貨就上架。\n公司落地：看你要開什麼公司、要幾個人，第一次談給時間表。\n我們不說「一個月交付」，因為證的時間不是我們能壓的。",
    takeaway: "品測跑完就有報告 · 產品證 6～12 週",
  },
  {
    num: "03",
    question: "如果發現我的產品不適合怎麼辦？",
    answer: "花 1～2 萬知道菲律賓現在不要你，比花幾百萬落地才知道，便宜太多。\n報告會寫清楚為什麼、什麼條件改了可以再試。\n我們想跟你做久一點，不是收一次錢。",
    takeaway: "那是品測最有價值的一種結果。",
  },
];

export function HomeFAQ() {
  return (
    <section className="px-5 py-[62px] md:px-10 md:py-[96px] md:pb-[100px]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-y-[43px] md:grid-cols-12 md:gap-x-16 md:gap-y-0">
        <div className="self-start md:col-span-4 md:sticky md:top-[96px]">
          <h2 className="max-w-[360px] font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-navy [text-wrap:balance]">
            你可能想先問的三件事
          </h2>
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
              <p className="ml-[45px] max-w-[650px] whitespace-pre-line text-[15.5px] leading-[1.85] text-tx2 md:ml-[60px]">
                {item.answer}
              </p>
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
