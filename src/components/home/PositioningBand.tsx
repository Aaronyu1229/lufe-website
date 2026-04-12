"use client";

import Link from "next/link";
import { PILLARS, type PillarSlug } from "@/data/services";

/**
 * PositioningBand — Core + Advanced framing.
 *
 * Instead of three equal pillars, we now lead with TWO core pillars
 * (產品適配性 + 通路銷售力 — what we do in year 1) and demote the third
 * pillar (團隊體質 + AI) to a smaller "進階模組 · 第二年起" strip below.
 *
 * Rationale: TA onboarding research showed that leading with 3 equal
 * pillars made us look "什麼都做". Two clear core commitments + one
 * discoverable advanced module reads as "懂節奏" instead of "賣雜貨".
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
const ADVANCED_PILLAR: PillarSlug = "team";

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
            第一年幫你落地，
            <br className="md:hidden" />
            <span className="text-gold-d font-normal">第二年讓你變強</span>
          </h2>
          <p className="text-[15px] md:text-[17px] text-tx2 max-w-[720px] mx-auto leading-[1.8] font-normal">
            出海的前 12 個月，你只需要把兩件事做好 ——
            <span className="text-tx font-medium">產品適配</span>和
            <span className="text-tx font-medium">通路銷售</span>。
            跑順之後，第二年我們再幫你把團隊跟 AI 工具補上。
          </p>
        </div>

        {/* ─── Core section label ─── */}
        <div className="flex items-center gap-3 mb-6 md:mb-8 max-w-[1000px] mx-auto">
          <div className="w-8 h-px bg-gold-d/60" />
          <span className="text-[10.5px] md:text-[11px] font-semibold tracking-[2.5px] uppercase text-gold-d">
            核心服務 · 第一年
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
                  className={`text-[14.5px] md:text-[15.5px] font-medium leading-[1.6] ${c.text} mb-6`}
                >
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

        {/* ─── Advanced module strip — Phase 2 ─── */}
        {(() => {
          const p = PILLARS[ADVANCED_PILLAR];
          const c = accentMap[p.accent as Accent];
          return (
            <div className="mt-10 md:mt-14 max-w-[1000px] mx-auto">
              <div className="flex items-center gap-3 mb-4 md:mb-5">
                <div className="w-8 h-px bg-ember/60" />
                <span className="text-[10.5px] md:text-[11px] font-semibold tracking-[2.5px] uppercase text-ember">
                  進階模組 · 第二年起
                </span>
                <div className="flex-1 h-px bg-bd/70" />
              </div>

              <Link
                href={`/services#pillar-${ADVANCED_PILLAR}`}
                className="group relative bg-white/60 backdrop-blur-[1px] border border-dashed border-ember/30 hover:border-ember hover:bg-white transition-all duration-300 p-6 md:p-7 flex flex-col md:flex-row md:items-center gap-5 md:gap-8"
              >
                {/* Left — num + title */}
                <div className="flex items-center gap-4 md:gap-5 md:w-[320px] md:shrink-0">
                  <div
                    className={`w-[48px] h-[48px] md:w-[54px] md:h-[54px] rounded-full border ${c.border} ${c.bg} flex items-center justify-center shrink-0`}
                  >
                    <span
                      className={`font-sans text-[16px] md:text-[18px] font-semibold tabular-nums ${c.text}`}
                    >
                      {p.num}
                    </span>
                  </div>
                  <div>
                    <div
                      className={`text-[10px] font-semibold tracking-[1.5px] uppercase ${c.text} mb-1`}
                    >
                      {p.subtitle} · Phase 2
                    </div>
                    <h3 className="text-[18px] md:text-[20px] font-semibold leading-tight text-tx">
                      {p.title} + AI
                    </h3>
                  </div>
                </div>

                {/* Middle — description */}
                <div className="flex-1">
                  <p className="text-[13px] md:text-[13.5px] text-tx2 leading-[1.75] mb-3">
                    跑起來之後的進階選項——
                    <span className="text-tx font-medium">海外團隊建置</span>、
                    <span className="text-tx font-medium">營運系統導入</span>、
                    <span className="text-tx font-medium">AI 數位員工</span>。
                    第一年不一定要做，但想把業務長大你會需要。
                  </p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-[11.5px] text-tx3">
                    {p.services.map((s) => (
                      <span
                        key={s.title}
                        className="inline-flex items-center gap-1.5"
                      >
                        <span
                          aria-hidden="true"
                          className={`w-1 h-1 rounded-full ${c.text}`}
                          style={{ backgroundColor: "currentColor" }}
                        />
                        {s.title}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Right — CTA */}
                <div
                  className={`text-[12px] font-semibold inline-flex items-center gap-1.5 ${c.text} md:shrink-0 group-hover:gap-2.5 transition-all`}
                >
                  看進階模組
                  <span className="transition-transform duration-300 group-hover:translate-x-0.5">
                    →
                  </span>
                </div>
              </Link>
            </div>
          );
        })()}

        {/* ─── 底層物流 narrative strip ─── */}
        <div className="mt-12 md:mt-16 px-6 md:px-8 py-6 md:py-7 bg-navy/[0.03] border-l-2 border-navy/20 max-w-[1000px] mx-auto">
          <div className="flex items-start gap-4">
            <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-navy/60 shrink-0 pt-1">
              底層
            </div>
            <p className="text-[13.5px] md:text-[14.5px] text-tx2 leading-[1.85] font-normal">
              這兩件核心服務底下，是躍馬國際{" "}
              <strong className="text-navy font-semibold tabular-nums">42</strong>{" "}
              年的國際物流實戰。
              我們站在真正跑船的人肩膀上——從報關、倉儲到最後一哩，不會因為顧問不懂現場而讓你的貨卡在海上。
            </p>
          </div>
        </div>

        {/* ─── Proof sentence ─── */}
        <div className="mt-10 md:mt-12 pt-8 border-t border-bd/50 text-center max-w-[1000px] mx-auto">
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
