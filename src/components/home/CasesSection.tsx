"use client";

import Image from "next/image";
import Link from "next/link";

const cases = [
  {
    slug: "costco-health",
    featured: true,
    tags: [
      { label: "食品", variant: "sky" as const },
      { label: "北美", variant: "gold" as const },
    ],
    num: "6 個月",
    title: "保健品怎麼從台灣走進北美 Costco？",
    desc: "從 FDA 註冊到通路談判，打進全球最大會員制零售通路。完整走過評估、測試、通路進入的每一步。",
    route: { from: "台灣", to: "Costco" },
    image: "/images/cases/case-1-costco.jpg",
  },
  {
    slug: "electronics-tariff",
    tags: [
      { label: "電子", variant: "sky" as const },
      { label: "美國", variant: "gold" as const },
    ],
    num: "-15%",
    title: "電子大廠怎麼靠產地轉移省下關稅？",
    desc: "從大陸轉越南出貨，找到中美關稅戰中的最優路徑。",
    image: "/images/cases/case-2-tariff.jpg",
  },
  {
    slug: "shoe-brand",
    tags: [
      { label: "服飾", variant: "sky" as const },
      { label: "美國", variant: "gold" as const },
    ],
    num: "3x",
    title: "知名皮鞋品牌為什麼改賣襪子大賺？",
    desc: "分析亞馬遜數據後調整品類策略，找到高毛利藍海品項。",
    image: "/images/cases/case-3-pivot.jpg",
  },
  {
    slug: "bubble-tea",
    tags: [
      { label: "飲品", variant: "sky" as const },
      { label: "東南亞", variant: "gold" as const },
    ],
    num: "10 家",
    title: "珍珠奶茶品牌怎麼在菲律賓成功落地？",
    desc: "從市場探索到門市營運，建立穩定營收基地。",
    image: "/images/cases/case-4-manila.jpg",
  },
];

const tagStyles = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold-d",
};

export function CasesSection() {
  return (
    <section className="py-[60px] md:py-[80px] px-5 md:px-10 max-w-[1400px] mx-auto">
      <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold-d mb-3">
        案例
      </div>
      <div className="flex items-center gap-6 mb-8">
        <h2 className="font-sans text-[clamp(28px,3.5vw,44px)] leading-[1.15] font-light tracking-[-0.5px] md:whitespace-nowrap">
          這些企業都找到了自己的路
        </h2>
        <div className="hidden md:block flex-1 h-px bg-bd" />
      </div>
      <p className="text-[15px] text-tx2 max-w-[480px] leading-[1.7] mb-11 font-normal -mt-4">
        不同產業、不同市場，但都用對的方法做了對的決策。
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {cases.map((c) =>
          c.featured ? (
            <Link
              key={c.title}
              href={`/cases/${c.slug}`}
              className="group md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center p-5 md:p-10 bg-white rounded-none transition-all duration-300 cursor-pointer shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg"
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
                <div className="font-sans text-[48px] font-semibold text-gold-d mb-2.5 leading-none">
                  {c.num}
                </div>
                <h3 className="font-sans text-[22px] leading-[1.4] mb-2 font-bold">
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
              <div className="rounded-none h-full min-h-[200px] overflow-hidden relative">
                <Image
                  src={c.image}
                  alt={c.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </Link>
          ) : (
            <Link
              key={c.title}
              href={`/cases/${c.slug}`}
              className="group bg-white rounded-none transition-all duration-300 cursor-pointer relative overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg"
            >
              <div className="h-[180px] overflow-hidden relative">
                <Image src={c.image} alt={c.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="p-[30px]">
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
                <div className="font-sans text-[42px] font-semibold text-gold-d mb-2.5 leading-none">
                  {c.num}
                </div>
                <h3 className="font-sans text-[18px] leading-[1.4] mb-2 font-bold">
                  {c.title}
                </h3>
                <p className="text-[13px] text-tx2 leading-[1.65] font-normal">
                  {c.desc}
                </p>
                <span className="absolute bottom-[18px] right-[18px] text-[13px] font-medium text-tx3 transition-colors duration-300 group-hover:text-gold">
                  閱讀案例 →
                </span>
              </div>
            </Link>
          )
        )}
      </div>

      <div className="text-center mt-14">
        <Link
          href="/cases"
          className="group inline-flex items-center gap-2 text-tx2 text-[14px] font-medium tracking-[0.3px] transition-colors duration-300 hover:text-navy"
        >
          <span className="border-b border-tx3/40 pb-0.5 group-hover:border-navy transition-colors">
            看更多案例
          </span>
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
        </Link>
      </div>
    </section>
  );
}
