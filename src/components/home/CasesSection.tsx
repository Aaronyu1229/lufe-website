"use client";

import Link from "next/link";

const cases = [
  {
    featured: true,
    tags: [
      { label: "食品", variant: "sky" as const },
      { label: "北美", variant: "gold" as const },
    ],
    num: "6 個月",
    title: "保健品怎麼從台灣走進北美 Costco？",
    desc: "從 FDA 註冊到通路談判，打進全球最大會員制零售通路。完整走過評估、測試、通路進入的每一步。",
    route: { from: "台灣", to: "Costco" },
  },
  {
    tags: [
      { label: "電子", variant: "sky" as const },
      { label: "美國", variant: "gold" as const },
    ],
    num: "-15%",
    title: "電子大廠怎麼靠產地轉移省下關稅？",
    desc: "從大陸轉越南出貨，找到中美關稅戰中的最優路徑。",
  },
  {
    tags: [
      { label: "服飾", variant: "sky" as const },
      { label: "美國", variant: "gold" as const },
    ],
    num: "3x",
    title: "知名皮鞋品牌為什麼改賣襪子大賺？",
    desc: "分析亞馬遜數據後調整品類策略，找到高毛利藍海品項。",
  },
  {
    tags: [
      { label: "飲品", variant: "sky" as const },
      { label: "東南亞", variant: "gold" as const },
    ],
    num: "10 家",
    title: "珍珠奶茶品牌怎麼在菲律賓成功落地？",
    desc: "從市場探索到門市營運，建立穩定營收基地。",
  },
];

const tagStyles = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold",
};

export function CasesSection() {
  return (
    <section className="py-[120px] px-5 md:px-10 max-w-[1400px] mx-auto">
      <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold mb-3">
        案例
      </div>
      <h2 className="font-heading text-[clamp(28px,3.5vw,42px)] leading-[1.2] mb-3 font-bold tracking-[-0.5px]">
        這些企業都找到了自己的出海路
      </h2>
      <p className="text-[15px] text-tx2 max-w-[480px] leading-[1.7] mb-11 font-normal">
        不同產業、不同市場，但都用對的方法做了對的決策。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases.map((c) =>
          c.featured ? (
            <div
              key={c.title}
              className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8 items-center p-10 bg-white border border-bd rounded-none transition-colors duration-300 cursor-pointer hover:border-gold"
            >
              <div>
                <div className="flex gap-1.5 mb-2.5">
                  {c.tags.map((t) => (
                    <span
                      key={t.label}
                      className={`text-[11px] px-2.5 py-[3px] rounded-sm font-medium ${tagStyles[t.variant]}`}
                    >
                      {t.label}
                    </span>
                  ))}
                </div>
                <div className="font-heading text-[56px] font-bold text-gold mb-2.5 leading-none">
                  {c.num}
                </div>
                <h3 className="font-heading text-[22px] leading-[1.4] mb-2 font-bold">
                  {c.title}
                </h3>
                <p className="text-[13px] text-tx2 leading-[1.65] font-normal">
                  {c.desc}
                </p>
                {c.route && (
                  <div className="flex items-center gap-1.5 mt-3 text-[11px] text-tx3">
                    <span>{c.route.from}</span>
                    <svg width="40" height="12" viewBox="0 0 40 12">
                      <path
                        d="M0,6 Q20,0 40,6"
                        stroke="#D4A85C"
                        strokeWidth="1.5"
                        fill="none"
                        opacity="0.4"
                      />
                    </svg>
                    <span>{c.route.to}</span>
                  </div>
                )}
              </div>
              <div className="bg-cream rounded-none h-full min-h-[200px] flex items-center justify-center text-[13px] text-tx3">
                案例詳情圖
              </div>
            </div>
          ) : (
            <div
              key={c.title}
              className="p-[30px] bg-white border border-bd rounded-none transition-colors duration-300 cursor-pointer relative overflow-hidden hover:border-gold"
            >
              <div className="flex gap-1.5 mb-2.5">
                {c.tags.map((t) => (
                  <span
                    key={t.label}
                    className={`text-[11px] px-2.5 py-[3px] rounded-sm font-medium ${tagStyles[t.variant]}`}
                  >
                    {t.label}
                  </span>
                ))}
              </div>
              <div className="font-heading text-[42px] font-bold text-gold mb-2.5 leading-none">
                {c.num}
              </div>
              <h3 className="font-heading text-[18px] leading-[1.4] mb-2 font-bold">
                {c.title}
              </h3>
              <p className="text-[13px] text-tx2 leading-[1.65] font-normal">
                {c.desc}
              </p>
              <div className="absolute bottom-[18px] right-[18px] text-[16px] text-tx3 transition-colors duration-300">
                →
              </div>
            </div>
          )
        )}
      </div>

      <div className="text-center mt-11">
        <button
          onClick={() => window.open("https://calendly.com", "_blank")}
          className="px-7 py-[13px] border border-bd bg-white text-tx rounded-sm text-[14px] font-medium cursor-pointer transition-colors duration-300 hover:border-tx"
        >
          想知道你的產品適合哪條路？預約 30 分鐘聊聊
        </button>
      </div>
    </section>
  );
}
