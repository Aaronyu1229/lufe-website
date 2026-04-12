"use client";

import Link from "next/link";
import { PILLARS, PILLAR_ORDER, type PillarSlug } from "@/data/services";

/**
 * PositioningBand — 3 Pillars framing.
 *
 * Reframes the old 4-stage path as three pillars: 產品適配性 (勝率)、
 * 通路銷售力 (潛力)、團隊體質 (成功率)，with 42 年物流 as底層敘事.
 * Two战場 (北美 + 東南亞) woven into the proof sentence.
 *
 * Each pillar card shows num + title + subtitle + tagline + first 3 services,
 * and links to /services#pillar-{slug}.
 */

type Accent = "sky" | "gold" | "ember";

const accentMap: Record<
  Accent,
  {
    border: string;
    text: string;
    bg: string;
    glow: string;
  }
> = {
  sky: {
    border: "border-sky",
    text: "text-sky",
    bg: "bg-[rgba(58,107,132,0.06)]",
    glow: "group-hover:shadow-[0_0_0_6px_rgba(58,107,132,0.10)]",
  },
  gold: {
    border: "border-gold-d",
    text: "text-gold-d",
    bg: "bg-[rgba(212,168,92,0.08)]",
    glow: "group-hover:shadow-[0_0_0_6px_rgba(212,168,92,0.14)]",
  },
  ember: {
    border: "border-ember",
    text: "text-ember",
    bg: "bg-[rgba(164,90,32,0.06)]",
    glow: "group-hover:shadow-[0_0_0_6px_rgba(164,90,32,0.12)]",
  },
};

export function PositioningBand() {
  return (
    <section className="relative bg-cream py-[80px] md:py-[104px] px-5 md:px-10 overflow-hidden">
      {/* Soft gold radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 55% at 50% 35%, rgba(212,168,92,0.075) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[1200px] mx-auto">
        {/* Identity header */}
        <div className="text-center mb-14 md:mb-20">
          <div className="text-[11.5px] font-semibold tracking-[2.5px] uppercase text-gold-d mb-5">
            鹿飛是什麼
          </div>
          <h2 className="font-sans text-[clamp(32px,5vw,58px)] leading-[1.08] font-light tracking-[-0.8px] text-navy mb-6">
            三個支柱，
            <span className="text-gold-d font-normal">兩個主戰場</span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-tx2 max-w-[680px] mx-auto leading-[1.8] font-normal">
            從<span className="text-tx font-medium">產品適配</span>、
            <span className="text-tx font-medium">通路銷售</span>到
            <span className="text-tx font-medium">團隊體質</span>
            ——一個方法論，幫台灣企業在北美與東南亞落地。
          </p>
        </div>

        {/* ─── 3 Pillar cards ─── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6">
          {PILLAR_ORDER.map((slug: PillarSlug) => {
            const p = PILLARS[slug];
            const c = accentMap[p.accent as Accent];
            return (
              <Link
                key={slug}
                href={`/services#pillar-${slug}`}
                className="group relative bg-white border border-bd hover:border-transparent hover:shadow-[0_12px_40px_rgba(16,27,48,0.10)] transition-all duration-300 p-7 md:p-8 flex flex-col"
              >
                {/* Top row — num + subtitle badge */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`relative z-10 w-[58px] h-[58px] md:w-[64px] md:h-[64px] rounded-full border-2 ${c.border} ${c.bg} ${c.glow} flex items-center justify-center transition-all group-hover:-translate-y-0.5`}
                  >
                    <span
                      className={`font-sans text-[20px] md:text-[22px] font-semibold tabular-nums ${c.text}`}
                    >
                      {p.num}
                    </span>
                  </div>
                  <span
                    className={`text-[10.5px] font-semibold tracking-[2px] uppercase ${c.text} pt-3`}
                  >
                    {p.subtitle}
                  </span>
                </div>

                {/* Title + tagline */}
                <h3 className="text-[21px] md:text-[23px] font-semibold leading-tight text-tx mb-2">
                  {p.title}
                </h3>
                <p className={`text-[14px] md:text-[14.5px] font-medium leading-[1.6] ${c.text} mb-5`}>
                  {p.tagline}
                </p>

                {/* Services list — first 3 */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.services.map((s) => (
                    <li
                      key={s.title}
                      className="flex items-start gap-2 text-[13px] md:text-[13.5px] text-tx2 leading-[1.65]"
                    >
                      <span
                        aria-hidden="true"
                        className={`mt-[7px] shrink-0 w-1 h-1 rounded-full ${c.text}`}
                        style={{ backgroundColor: "currentColor" }}
                      />
                      <span>{s.title}</span>
                    </li>
                  ))}
                </ul>

                {/* Read more link */}
                <div
                  className={`text-[12.5px] font-semibold inline-flex items-center gap-1 ${c.text} group-hover:gap-2 transition-all`}
                >
                  看這個支柱的做法 →
                </div>
              </Link>
            );
          })}
        </div>

        {/* ─── 底層物流 narrative strip ─── */}
        <div className="mt-12 md:mt-16 px-6 md:px-8 py-6 md:py-7 bg-navy/[0.03] border-l-2 border-navy/20">
          <div className="flex items-start gap-4">
            <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-navy/60 shrink-0 pt-1">
              底層
            </div>
            <p className="text-[13.5px] md:text-[14.5px] text-tx2 leading-[1.85] font-normal">
              三個支柱底下是躍馬國際{" "}
              <strong className="text-navy font-semibold tabular-nums">42</strong>{" "}
              年的國際物流實戰。
              我們站在真正跑船的人肩膀上——從報關、倉儲到最後一哩，不會因為顧問不懂現場而讓你的貨卡在海上。
            </p>
          </div>
        </div>

        {/* ─── Proof sentence ─── */}
        <div className="mt-10 md:mt-12 pt-8 border-t border-bd/50 text-center">
          <p className="text-[14.5px] md:text-[16px] text-tx2 leading-[1.85] font-normal">
            這套方法，我們在{" "}
            <strong className="text-navy font-semibold tabular-nums">500+</strong>{" "}
            次出口實戰裡跑過、覆蓋{" "}
            <strong className="text-navy font-semibold tabular-nums">30+</strong>{" "}
            國家——主要戰場是
            <strong className="text-navy font-semibold">北美</strong>和
            <strong className="text-navy font-semibold">東南亞</strong>。
          </p>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 mt-6 text-[13px] font-semibold text-tx2 hover:text-navy transition-colors"
          >
            <span className="border-b border-tx3/40 pb-0.5 group-hover:border-navy transition-colors">
              看完整三支柱做法
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
