"use client";

import Link from "next/link";
import { PILLARS, type PillarSlug } from "@/data/services";

/**
 * PositioningBand — 物流為基石 · 兩件事為核心
 *
 * v3 的故事順序：
 *   1. 真正的基石 (The Moat)：躍馬 42 年國際物流——這是別人偷不走的護城河
 *   2. 在這個基石上,我們做兩件事：產品適配 + 通路銷售
 *   3. 進階模組 (團隊體質)：折成一行小 link,避免「什麼都做」的稀釋
 *
 * 為什麼這樣排：
 *   - 物流是三種 TA 都會立刻信任的數字（傳產老闆、品牌主理人、D2C 創辦人）
 *   - AI 是 2026 年的雜訊,從首頁完全拿掉
 *   - 團隊體質維持存在但不佔視覺位置
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

const CORE_PILLARS: readonly PillarSlug[] = ["fit", "channel"];

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
        {/* ─── Identity header ─── */}
        <div className="text-center mb-12 md:mb-16">
          <div className="text-[11.5px] font-semibold tracking-[2.5px] uppercase text-gold-d mb-5">
            鹿飛是什麼
          </div>
          <h2 className="font-sans text-[clamp(32px,5vw,58px)] leading-[1.08] font-light tracking-[-0.8px] text-navy mb-6">
            真的跑過船的人,
            <br className="md:hidden" />
            <span className="text-gold-d font-normal">才懂出海的眉角</span>
          </h2>
          <p className="text-[16.5px] md:text-[18px] text-tx2 max-w-[720px] mx-auto leading-[1.8] font-normal">
            出海不是報告寫得出來的。鹿飛站在躍馬國際{" "}
            <span className="text-tx font-medium">42 年</span>{" "}
            的國際物流實戰上,幫你把
            <span className="text-tx font-medium">產品適配</span>跟
            <span className="text-tx font-medium">通路銷售</span>兩件事跑通。
          </p>
        </div>

        {/* ─── 真正的基石 · 物流 hero card ─── */}
        <div className="mb-12 md:mb-16 max-w-[1000px] mx-auto">
          <div className="flex items-center gap-3 mb-5 md:mb-6">
            <div className="w-8 h-px bg-navy/40" />
            <span className="text-[10.5px] md:text-[11px] font-semibold tracking-[2.5px] uppercase text-navy/70">
              真正的基石 · The Moat
            </span>
            <div className="flex-1 h-px bg-bd/70" />
          </div>

          <div className="relative bg-navy text-white overflow-hidden">
            {/* gold accent bar */}
            <div
              aria-hidden="true"
              className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-gold via-gold-d to-gold/40"
            />
            {/* subtle radial */}
            <div
              aria-hidden="true"
              className="absolute inset-0 opacity-30 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(212,168,92,0.18) 0%, transparent 60%)",
              }}
            />

            <div className="relative p-8 md:p-12 grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-8 md:gap-12 items-center">
              {/* Left — narrative */}
              <div>
                <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-gold mb-3">
                  Yueh Ma International · 躍馬國際
                </div>
                <h3 className="font-sans text-[26px] md:text-[34px] leading-[1.2] font-light tracking-[-0.5px] mb-5">
                  出海不是報告寫得出來的,
                  <br />
                  <span className="text-gold font-normal">是真的跑過船的人</span>
                </h3>
                <p className="text-[15.5px] md:text-[16.5px] text-white/75 leading-[1.85] font-normal">
                  從報關、倉儲到最後一哩——這套東西不是教科書讀來的,是 42 年在港口、海關、貨櫃場跑出來的。
                  你的貨不會因為顧問不懂現場而卡在海上。
                </p>
              </div>

              {/* Right — 3 stats */}
              <div className="grid grid-cols-3 gap-4 md:gap-6 md:border-l md:border-white/15 md:pl-12">
                <div>
                  <div className="font-sans text-[36px] md:text-[44px] font-extralight text-white tabular-nums leading-none mb-2">
                    42<span className="text-gold text-[24px] md:text-[28px]">+</span>
                  </div>
                  <div className="text-[10.5px] md:text-[11px] text-white/55 tracking-[0.5px] leading-[1.4]">
                    年國際物流實戰
                  </div>
                </div>
                <div>
                  <div className="font-sans text-[36px] md:text-[44px] font-extralight text-white tabular-nums leading-none mb-2">
                    500<span className="text-gold text-[24px] md:text-[28px]">+</span>
                  </div>
                  <div className="text-[10.5px] md:text-[11px] text-white/55 tracking-[0.5px] leading-[1.4]">
                    出口實戰案件
                  </div>
                </div>
                <div>
                  <div className="font-sans text-[36px] md:text-[44px] font-extralight text-white tabular-nums leading-none mb-2">
                    30<span className="text-gold text-[24px] md:text-[28px]">+</span>
                  </div>
                  <div className="text-[10.5px] md:text-[11px] text-white/55 tracking-[0.5px] leading-[1.4]">
                    國家與地區覆蓋
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ─── 在這個基石上 · 兩件核心服務 section label ─── */}
        <div className="flex items-center gap-3 mb-6 md:mb-8 max-w-[1000px] mx-auto">
          <div className="w-8 h-px bg-gold-d/60" />
          <span className="text-[10.5px] md:text-[11px] font-semibold tracking-[2.5px] uppercase text-gold-d">
            在這個基石上 · 我們做兩件事
          </span>
          <div className="flex-1 h-px bg-bd/70" />
        </div>

        {/* ─── 2 Core Pillar cards ─── */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6 max-w-[1000px] mx-auto">
          {CORE_PILLARS.map((slug) => {
            const p = PILLARS[slug];
            const c = accentMap[p.accent as Accent];
            return (
              <Link
                key={slug}
                href={`/services#pillar-${slug}`}
                className="group relative bg-white border border-bd hover:border-transparent hover:shadow-[0_12px_40px_rgba(16,27,48,0.10)] transition-all duration-300 p-7 md:p-9 flex flex-col"
              >
                {/* Top row — num + subtitle badge */}
                <div className="flex items-start justify-between mb-6">
                  <div
                    className={`relative z-10 w-[62px] h-[62px] md:w-[72px] md:h-[72px] rounded-full border-2 ${c.border} ${c.bg} ${c.glow} flex items-center justify-center transition-all group-hover:-translate-y-0.5`}
                  >
                    <span
                      className={`font-sans text-[22px] md:text-[26px] font-semibold tabular-nums ${c.text}`}
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
                <h3 className="text-[23px] md:text-[26px] font-semibold leading-tight text-tx mb-2">
                  {p.title}
                </h3>
                <p
                  className={`text-[16px] md:text-[17px] font-medium leading-[1.6] ${c.text} mb-6`}
                >
                  {p.tagline}
                </p>

                {/* Services list */}
                <ul className="space-y-2.5 mb-6 flex-1">
                  {p.services.map((s) => (
                    <li
                      key={s.title}
                      className="flex items-start gap-2 text-[14.5px] md:text-[15px] text-tx2 leading-[1.65]"
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
                  className={`text-[13.5px] font-semibold inline-flex items-center gap-1 ${c.text} group-hover:gap-2 transition-all`}
                >
                  看這個支柱的做法 →
                </div>
              </Link>
            );
          })}
        </div>

        {/* ─── 進階模組 · 一行小 link (團隊體質) ─── */}
        <div className="mt-10 md:mt-12 max-w-[1000px] mx-auto text-center">
          <Link
            href="/services#pillar-team"
            className="group inline-flex items-center gap-2.5 text-[13.5px] md:text-[14.5px] text-tx3 hover:text-navy transition-colors"
          >
            <span className="text-tx3/70 tracking-[1.5px] uppercase">進階</span>
            <span aria-hidden="true" className="w-px h-3 bg-tx3/30" />
            <span className="border-b border-tx3/30 pb-0.5 group-hover:border-navy transition-colors">
              第二年想把團隊長大?看進階模組
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        {/* ─── 完整服務 CTA ─── */}
        <div className="mt-14 md:mt-16 pt-10 border-t border-bd/50 text-center max-w-[1000px] mx-auto">
          <p className="text-[16px] md:text-[17px] text-tx2 leading-[1.85] font-normal mb-6">
            主要戰場是
            <strong className="text-navy font-semibold">北美</strong>跟
            <strong className="text-navy font-semibold">東南亞</strong>——這套方法在{" "}
            <strong className="text-navy font-semibold tabular-nums">500+</strong>{" "}
            次出口實戰裡跑過。
          </p>
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-tx2 hover:text-navy transition-colors"
          >
            <span className="border-b border-tx3/40 pb-0.5 group-hover:border-navy transition-colors">
              看完整服務內容
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
