"use client";

import Image from "next/image";
import Link from "next/link";

/**
 * StagesSection (home)
 * Previews the four real work stages from /services. Previously this was a
 * duplicate of Hero's chip bar (the 3 uncertainty states), which wasted the
 * slot. Now it shows the actual workflow: 01 評估 → 02 測試 → 03 通路 → 04 落地.
 * Hero asks "which stage are you in?" — this section answers "here's what
 * each stage of work actually looks like."
 */

const stages = [
  {
    slug: "market-assessment",
    num: "01",
    title: "市場評估",
    timeline: "2–4 週",
    desc: "在你花大錢之前，先花小錢搞清楚。評估需求、競品、法規、利潤結構。",
    deliverable: "一份清楚告訴你「值不值得去」的報告",
    image: "/images/services/stage-01-map-assess.jpg",
    imageAlt: "古地圖與羅盤 — 探索新市場的起點",
    accent: "sky",
  },
  {
    slug: "product-testing",
    num: "02",
    title: "產品測試",
    timeline: "4–6 週",
    desc: "小批量投放，讓市場幫你回答。用真實數據取代主觀猜測。",
    deliverable: "一組真實的市場反饋數據",
    image: "/images/services/stage-02-product-test.jpg",
    imageAlt: "產品包裝與品質檢測",
    accent: "sky",
  },
  {
    slug: "channel-entry",
    num: "03",
    title: "通路進入",
    timeline: "2–3 個月",
    desc: "從試水溫到正式上架。通路談判、合規認證、在地化執行。",
    deliverable: "產品正式上架海外通路",
    image: "/images/services/stage-03-retail-aisle.jpg",
    imageAlt: "超市貨架 — 產品正式上架海外通路",
    accent: "gold",
  },
  {
    slug: "localization",
    num: "04",
    title: "海外落地",
    timeline: "持續",
    desc: "不只是賣出去，還要站得穩。在地團隊、供應鏈、客服體系。",
    deliverable: "一個可持續的海外營運體系",
    image: "/images/services/stage-04-asian-team.jpg",
    imageAlt: "亞洲在地團隊討論",
    accent: "ember",
  },
];

/**
 * Accent map — StagesSection lives on a CREAM background, so gold text
 * uses the dark-gold variant (`text-gold-d`) to reach WCAG AA.
 * Sky / ember tokens are already darkened at the CSS level.
 */
const accentMap: Record<string, { num: string; dot: string; hover: string }> = {
  sky: { num: "text-sky", dot: "bg-sky", hover: "hover:border-sky" },
  gold: { num: "text-gold-d", dot: "bg-gold", hover: "hover:border-gold" },
  ember: { num: "text-ember", dot: "bg-ember", hover: "hover:border-ember" },
};

export function StagesSection() {
  return (
    <section className="py-[72px] md:py-[96px] px-5 md:px-10 bg-cream">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold-d mb-3">
          完整路徑
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-3">
          <h2 className="font-sans text-[clamp(28px,3.5vw,44px)] leading-[1.15] font-light tracking-[-0.5px] max-w-[720px]">
            四個階段，一條<span className="text-gold-d font-normal">完整</span>的跨境路
          </h2>
          <Link
            href="/services"
            className="group text-[15px] font-semibold text-tx2 hover:text-navy transition-colors inline-flex items-center gap-1.5 whitespace-nowrap"
          >
            看每個階段做什麼
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
        <p className="text-[16.5px] text-tx2 max-w-[540px] leading-[1.8] mb-12 font-normal">
          每個階段都有明確的目標與交付成果。你不用猜下一步——我們陪你走。
        </p>

        {/* Desktop path: 4 cards with connector line */}
        <div className="relative hidden md:block">
          {/* Connector gradient line */}
          <div
            className="absolute top-[84px] left-[12%] right-[12%] h-[2px] bg-gradient-to-r from-sky/30 via-gold/40 to-ember/30"
            aria-hidden="true"
          />
          <div className="grid grid-cols-4 gap-5 relative">
            {stages.map((stage) => {
              const c = accentMap[stage.accent];
              return (
                <Link
                  key={stage.num}
                  href={`/services/${stage.slug}`}
                  className={`group block bg-white rounded-none transition-all duration-400 relative overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 border border-bd ${c.hover}`}
                >
                  {/* Image */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-navy">
                    <Image
                      src={stage.image}
                      alt={stage.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover img-navy-unify transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6 lg:p-7">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className={`font-sans text-[28px] font-light tabular-nums ${c.num}`}>
                        {stage.num}
                      </span>
                      <span className="text-[11px] text-tx3 font-normal tracking-wider uppercase">
                        {stage.timeline}
                      </span>
                    </div>
                    <h3 className="text-[18px] font-semibold mb-2 leading-tight">
                      {stage.title}
                    </h3>
                    <p className="text-[14.5px] text-tx2 leading-[1.8] font-normal mb-4">
                      {stage.desc}
                    </p>
                    <div className="pt-3 border-t border-bd/60">
                      <span className="text-[10.5px] font-semibold tracking-wider uppercase text-tx3">
                        交付
                      </span>
                      <p className={`text-[13.5px] mt-1 font-medium ${c.num}`}>
                        {stage.deliverable}
                      </p>
                    </div>
                    <div className="mt-4 text-[13px] font-semibold text-tx3 group-hover:text-gold transition-colors inline-flex items-center gap-1 group-hover:gap-2">
                      看這個階段 →
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile stack: compact vertical list */}
        <div className="md:hidden space-y-4">
          {stages.map((stage) => {
            const c = accentMap[stage.accent];
            return (
              <Link
                key={stage.num}
                href={`/services/${stage.slug}`}
                className={`block bg-white rounded-none border border-bd p-5 ${c.hover} transition-colors`}
              >
                <div className="flex items-start gap-4">
                  <div className="relative w-[92px] h-[68px] shrink-0 overflow-hidden bg-navy">
                    <Image
                      src={stage.image}
                      alt={stage.imageAlt}
                      fill
                      sizes="92px"
                      className="object-cover img-navy-unify"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className={`font-sans text-[21px] font-light tabular-nums ${c.num}`}>
                        {stage.num}
                      </span>
                      <h3 className="text-[16.5px] font-semibold leading-tight">
                        {stage.title}
                      </h3>
                      <span className="text-[10px] text-tx3 tracking-wider uppercase ml-auto">
                        {stage.timeline}
                      </span>
                    </div>
                    <p className="text-[13.5px] text-tx2 leading-[1.6]">
                      {stage.desc}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
