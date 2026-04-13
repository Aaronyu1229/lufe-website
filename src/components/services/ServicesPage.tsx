"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMessageBox } from "../MessageBox";
import { PILLARS, PILLAR_ORDER, ACCENT_CLASSES, type PillarSlug } from "@/data/services";

const PILLAR_IMAGES: Record<PillarSlug, { src: string; alt: string }> = {
  fit: {
    src: "/images/services/pillar-fit-analysis.jpg",
    alt: "專業團隊分析市場數據圖表 — 產品適配性的核心",
  },
  channel: {
    src: "/images/services/pillar-channel-aisle.jpg",
    alt: "超市貨架上琳琅滿目的商品 — 通路銷售力的現場",
  },
  team: {
    src: "/images/services/pillar-team-collab.jpg",
    alt: "亞洲青年專業團隊在現代辦公室協作 — 團隊體質的樣貌",
  },
};

/**
 * ServicesPage (hub) — 3 pillars framing.
 *
 * Organizes all services under 3 pillars: 產品適配性 / 通路銷售力 / 團隊體質.
 * Each pillar section lists its services (some link to existing /services/[stage]
 * pages, some are new bolt-on services without dedicated sub-pages yet).
 * 底層物流 is a narrative strip at the bottom, not a service.
 */

const topFaqs = [
  {
    q: "我該走「出海探路」還是「通路落地」？",
    a: "如果你的產品還沒出過海、不確定海外市場反應，先走探路——用最小成本去東南亞測試。如果你的產品已經成熟、確定要打進北美通路，直接走落地。不確定的話，第一次聊天我們就能幫你判斷。",
  },
  {
    q: "兩條路的收費方式有什麼不同？",
    a: "探路是按階段收固定費用，每一步花多少錢事前講清楚，不會有意外的帳單。落地是前期收低服務費，主要靠成交抽成——我們幫你賣出去才真的賺錢。兩種模式的共同點：第一次聊天就給你明確數字。",
  },
  {
    q: "鹿飛跟傳統貿易商或顧問公司有什麼不同？",
    a: "傳統顧問只出報告、貿易商只做買賣、代操公司只賣工具。鹿飛做的是三個支柱全程自營：從勝率評估、通路進入到團隊體質，陪你走完全程。底層還有躍馬企業 42 年物流實戰，不會因為顧問不懂現場而卡在海上。",
  },
];

export function ServicesPage() {
  const { open } = useMessageBox();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-navy pt-[130px] md:pt-[170px] pb-[70px] md:pb-[90px] px-5 md:px-10 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/services/services-hero-dhl.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.3] animate-hero-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/55 to-navy" />
          {/* Light sweep — diagonal sheen travelling every 9s */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 -left-1/3 w-1/3 pointer-events-none animate-hero-light-sweep"
            style={{
              background:
                "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.04) 40%, rgba(212,168,92,0.08) 50%, rgba(255,255,255,0.04) 60%, transparent 100%)",
            }}
          />
        </div>

        {/* Soft gold glow top-right — with pulse */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none animate-hero-glow-pulse"
          style={{
            background:
              "radial-gradient(ellipse 55% 40% at 80% 0%, rgba(212,168,92,0.14) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-7 text-[11px] font-medium tracking-[1px] text-white/50">
            <Link href="/" className="hover:text-gold transition-colors">首頁</Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/75">服務</span>
          </nav>

          {/* Headline */}
          <h1 className="font-heading text-[clamp(34px,5vw,60px)] text-white leading-[1.08] font-light tracking-[-0.8px] mb-6 max-w-[920px]">
            三個支柱，
            <br />
            <span className="font-normal text-gold">兩個主戰場</span>
          </h1>
          <p className="text-[17px] md:text-[18px] text-white/65 max-w-[640px] font-light leading-[1.8] mb-12 md:mb-14">
            產品適配性、通路銷售力、團隊體質——一個方法論，幫台灣企業在
            <span className="text-white font-medium">北美</span>與
            <span className="text-white font-medium">東南亞</span>落地。
            底下是躍馬企業 42 年的物流實戰當基礎。
          </p>

          {/* 3-pillar mini preview */}
          <div className="hidden md:block mb-12">
            <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-white/40 mb-4">
              三個支柱
            </div>
            <div className="relative flex items-start gap-4">
              {/* Connector line */}
              <div className="absolute left-0 right-0 top-[18px] h-px bg-gradient-to-r from-sky/50 via-gold/50 to-ember/50" />
              {PILLAR_ORDER.map((slug) => {
                const p = PILLARS[slug];
                const c = ACCENT_CLASSES[p.accent];
                return (
                  <a
                    key={slug}
                    href={`#pillar-${slug}`}
                    className="group relative flex-1 text-left"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`relative z-10 w-[40px] h-[40px] flex items-center justify-center border bg-navy ${c.border} ${c.text} text-[14.5px] font-semibold tabular-nums transition-all group-hover:scale-110`}
                      >
                        {p.num}
                      </span>
                    </div>
                    <div className="pl-[2px]">
                      <div className="text-[15.5px] font-semibold text-white leading-tight mb-0.5">
                        {p.title}
                      </div>
                      <div className={`text-[11px] ${c.text} mt-0.5`}>
                        {p.subtitle}
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>

          {/* Stats strip */}
          <div className="border-t border-white/10 pt-7 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {[
              { n: "42+", l: "年物流底層" },
              { n: "500+", l: "出口案件" },
              { n: "30+", l: "國家覆蓋" },
              { n: "2", l: "主戰場 · 北美 · 東南亞" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-heading text-[24px] md:text-[28px] font-light text-gold leading-none tabular-nums">
                  {s.n}
                </div>
                <div className="text-[11px] md:text-[11.5px] text-white/50 mt-1.5 tracking-[0.5px]">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3 Pillars deep sections ─── */}
      {PILLAR_ORDER.map((slug, idx) => {
        const p = PILLARS[slug];
        const c = ACCENT_CLASSES[p.accent];
        const isEven = idx % 2 === 0;
        const img = PILLAR_IMAGES[slug];
        return (
          <section
            key={slug}
            id={`pillar-${slug}`}
            className={`scroll-mt-[100px] py-[80px] md:py-[110px] px-5 md:px-10 ${
              isEven ? "bg-white" : "bg-cream"
            }`}
          >
            <div className="max-w-[1200px] mx-auto">
              {/* Wide banner image — editorial break between text walls */}
              <div className="relative w-full aspect-[21/9] md:aspect-[24/9] overflow-hidden mb-10 md:mb-14">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                />
                {/* Subtle navy vignette at bottom for depth */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-navy/20 via-transparent to-transparent"
                />
                {/* Pillar num badge — bottom-left overlay */}
                <div className="absolute left-6 md:left-10 bottom-6 md:bottom-8 flex items-baseline gap-3">
                  <span
                    className={`font-heading text-[56px] md:text-[88px] font-light tabular-nums leading-none text-white drop-shadow-[0_4px_12px_rgba(0,0,0,0.5)]`}
                  >
                    {p.num}
                  </span>
                  <span
                    className={`text-[11px] md:text-[13px] font-semibold tracking-[2.5px] uppercase text-white/90 mb-2`}
                  >
                    {p.subtitle}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_1.3fr] gap-10 md:gap-14">
                {/* Left — pillar title block */}
                <div>
                  <h2 className="font-sans text-[clamp(28px,3.6vw,44px)] leading-[1.12] font-light tracking-[-0.5px] text-navy mb-4">
                    {p.title}
                  </h2>
                  <p
                    className={`text-[17px] md:text-[18px] font-medium leading-[1.6] ${c.text} mb-5`}
                  >
                    「{p.tagline}」
                  </p>
                  <p className="text-[15.5px] md:text-[16.5px] text-tx2 leading-[1.85] font-normal">
                    {p.description}
                  </p>
                </div>

                {/* Right — services list */}
                <div>
                  <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-tx3 mb-5">
                    這個支柱底下能做的事
                  </div>
                  <div className="space-y-4">
                    {p.services.map((s) => {
                      const Wrapper = s.href
                        ? ({ children }: { children: React.ReactNode }) =>
                            s.external ? (
                              <a
                                href={s.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`group block bg-white border border-bd hover:border-transparent hover:shadow-[0_8px_28px_rgba(16,27,48,0.08)] transition-all p-5 md:p-6`}
                              >
                                {children}
                              </a>
                            ) : (
                              <Link
                                href={s.href!}
                                className={`group block bg-white border border-bd hover:border-transparent hover:shadow-[0_8px_28px_rgba(16,27,48,0.08)] transition-all p-5 md:p-6`}
                              >
                                {children}
                              </Link>
                            )
                        : ({ children }: { children: React.ReactNode }) => (
                            <div className="bg-white border border-bd p-5 md:p-6">
                              {children}
                            </div>
                          );
                      return (
                        <Wrapper key={s.title}>
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <h3
                                className={`text-[17px] md:text-[18px] font-semibold leading-tight text-tx mb-2 ${
                                  s.href ? "group-hover:text-navy transition-colors" : ""
                                }`}
                              >
                                {s.title}
                              </h3>
                              <p className="text-[14.5px] md:text-[15px] text-tx2 leading-[1.8] font-normal">
                                {s.desc}
                              </p>
                            </div>
                            {s.href && (
                              <span
                                aria-hidden="true"
                                className={`shrink-0 text-[16.5px] mt-1 transition-transform ${c.text} group-hover:translate-x-0.5`}
                              >
                                →
                              </span>
                            )}
                          </div>
                        </Wrapper>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      {/* ─── 兩條路徑 ─── */}
      <section className="bg-white py-[80px] md:py-[110px] px-5 md:px-10 border-t border-bd/40">
        <div className="max-w-[960px] mx-auto">
          <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold-d mb-3">
            你的狀況
          </div>
          <h2 className="font-sans text-[clamp(26px,3.2vw,40px)] leading-[1.15] font-light tracking-[-0.5px] mb-4">
            同一套方法論，<span className="font-normal text-gold-d">兩種走法</span>
          </h2>
          <p className="text-[16.5px] md:text-[17.5px] text-tx2 leading-[1.8] max-w-[620px] mb-10 font-normal">
            三個支柱是骨架，但落地方式會因為你的市場和階段不同。
            看看哪條路比較像你現在的狀況。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
            {/* 探路 */}
            <div className="group border border-bd hover:border-sky transition-all p-7 md:p-9 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[rgba(91,143,168,0.08)] border border-sky/25">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="#5B8FA8" strokeWidth="1.5" />
                    <path d="M12 3C16 7 16 17 12 21M12 3C8 7 8 17 12 21M3 12H21" stroke="#5B8FA8" strokeWidth="1.2" />
                  </svg>
                </div>
                <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-sky">
                  出海探路
                </div>
              </div>
              <h3 className="text-[22px] md:text-[24px] font-semibold leading-tight mb-3">
                還不確定能不能賣
              </h3>
              <p className="text-[15px] text-tx2 leading-[1.8] font-normal mb-5 flex-1">
                幫你把產品送進東南亞市場測試——從出口合規、報關物流到找第一個通路對接。
                先用最小成本驗證，再決定要不要放大。
              </p>
              <div className="space-y-2.5 mb-6">
                <div className="flex items-start gap-2.5">
                  <span className="text-sky text-[14px] mt-0.5">→</span>
                  <span className="text-[14px] text-tx2">產品證 + 出海證準備</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-sky text-[14px] mt-0.5">→</span>
                  <span className="text-[14px] text-tx2">報關、物流全程處理</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-sky text-[14px] mt-0.5">→</span>
                  <span className="text-[14px] text-tx2">在地通路對接與回饋</span>
                </div>
              </div>
              <div className="pt-4 border-t border-bd/60">
                <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-1">
                  適合你如果
                </div>
                <p className="text-[13.5px] text-tx2 leading-[1.7]">
                  有產品但還沒出過海，想先測試東南亞市場的反應再決定下一步。
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-bd/60">
                <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-1">
                  收費方式
                </div>
                <p className="text-[13.5px] text-tx2 leading-[1.7]">
                  按階段固定費用，每一步花多少錢事前講清楚。
                </p>
              </div>
            </div>

            {/* 落地 */}
            <div className="group border border-bd hover:border-gold transition-all p-7 md:p-9 flex flex-col">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 flex items-center justify-center bg-[rgba(212,168,92,0.08)] border border-gold-d/25">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <rect x="3" y="8" width="18" height="12" rx="1" stroke="#8F6A1F" strokeWidth="1.5" />
                    <path d="M3 12H21" stroke="#8F6A1F" strokeWidth="1.2" />
                    <path d="M8 5L8 8M16 5L16 8" stroke="#8F6A1F" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-gold-d">
                  通路落地
                </div>
              </div>
              <h3 className="text-[22px] md:text-[24px] font-semibold leading-tight mb-3">
                產品準備好了，要進通路
              </h3>
              <p className="text-[15px] text-tx2 leading-[1.8] font-normal mb-5 flex-1">
                幫你打進北美主流通路——市場研究、展覽佈局、引進買家、上桌談判。
                我們出人、出策略，幫你把品牌帶到貨架上。
              </p>
              <div className="space-y-2.5 mb-6">
                <div className="flex items-start gap-2.5">
                  <span className="text-gold-d text-[14px] mt-0.5">→</span>
                  <span className="text-[14px] text-tx2">北美市場研究與選品策略</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-gold-d text-[14px] mt-0.5">→</span>
                  <span className="text-[14px] text-tx2">展覽佈置、銷售、買家引進</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <span className="text-gold-d text-[14px] mt-0.5">→</span>
                  <span className="text-[14px] text-tx2">通路談判與成交協助</span>
                </div>
              </div>
              <div className="pt-4 border-t border-bd/60">
                <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-1">
                  適合你如果
                </div>
                <p className="text-[13.5px] text-tx2 leading-[1.7]">
                  產品已經成熟，想進 Costco、Walmart、Amazon 等北美主流通路。
                </p>
              </div>
              <div className="mt-5 pt-4 border-t border-bd/60">
                <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-1">
                  收費方式
                </div>
                <p className="text-[13.5px] text-tx2 leading-[1.7]">
                  前期低服務費 + 成交抽成——我們幫你賣出去才真的賺錢。
                </p>
              </div>
            </div>
          </div>

          <p className="text-[14px] text-tx3 font-normal italic mt-8 text-center">
            不確定自己該走哪條？先聊聊，我們幫你判斷。
          </p>
        </div>
      </section>

      {/* ─── 底層物流 敘事 strip ─── */}
      <section className="bg-navy py-[72px] md:py-[96px] px-5 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <div className="w-12 h-px bg-gold/60 mb-5" />
          <h2 className="font-sans text-[clamp(26px,3.6vw,40px)] leading-[1.2] font-light tracking-[-0.5px] text-white mb-5">
            三個支柱底下，是真正跑了 <span className="font-normal text-gold">42 年</span>的國際物流
          </h2>
          <p className="text-[16.5px] md:text-[17.5px] text-white/65 leading-[1.85] font-normal max-w-[720px] mb-6">
            鹿飛不是新手上路的跨境顧問。我們底下有躍馬企業 42 年的國際貨運承攬實戰——報關、倉儲、海空運、最後一哩，每一段都是真正在做的事。
            顧問講策略的時候，我們知道現場會長什麼樣。這就是為什麼我們的「團隊體質」支柱永遠不會空談。
          </p>
          <div className="flex items-center gap-6 text-[14.5px] text-white/50 font-normal">
            <span>
              <strong className="text-white font-semibold tabular-nums">42+</strong> 年
            </span>
            <span className="text-white/20">·</span>
            <span>
              <strong className="text-white font-semibold tabular-nums">30+</strong> 國家
            </span>
            <span className="text-white/20">·</span>
            <span>
              <strong className="text-white font-semibold tabular-nums">500+</strong> 出口案件
            </span>
          </div>
        </div>
      </section>

      {/* ─── Methodology CTA card ─── */}
      <section className="bg-cream py-[72px] md:py-[96px] px-5 md:px-10">
        <div className="max-w-[900px] mx-auto">
          <Link
            href="/services/methodology"
            className="group block bg-white border-l-4 border-gold p-7 md:p-10 hover:shadow-lg transition-all"
          >
            <div className="flex items-start gap-6 flex-wrap">
              <div className="flex-1 min-w-0">
                <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-gold-d mb-3">
                  決策框架
                </div>
                <h2 className="text-[22px] md:text-[26px] font-semibold leading-tight text-navy mb-3 group-hover:text-gold-d transition-colors">
                  想看我們怎麼判斷 Go / No-Go？
                </h2>
                <p className="text-[15.5px] md:text-[16.5px] text-tx2 leading-[1.8] font-normal">
                  MBCPR 五維評分矩陣、紅燈判準、一個真實案例的完整評分過程——顧問報告背後的決策邏輯全部攤開。
                </p>
              </div>
              <span className="text-[15.5px] font-semibold text-gold-d mt-2 group-hover:translate-x-1 transition-transform inline-block">
                看方法論 →
              </span>
            </div>
          </Link>
        </div>
      </section>

      {/* ─── Top FAQs ─── */}
      <section className="bg-white py-[72px] md:py-[96px] px-5 md:px-10">
        <div className="max-w-[760px] mx-auto">
          <h2 className="section-heading">三個關鍵問題</h2>
          <p className="section-desc">
            更多細節在每個支柱的說明頁。這裡先回答最常見的三題。
          </p>

          <div className="border-t border-bd mt-10">
            {topFaqs.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={i} className="border-b border-bd">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="w-full flex items-center justify-between py-5 md:py-6 text-left cursor-pointer group"
                    aria-expanded={isOpen}
                  >
                    <span className="text-[17px] md:text-[17.5px] font-medium pr-4 group-hover:text-navy transition-colors">
                      {f.q}
                    </span>
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                      className={`shrink-0 transition-transform duration-300 text-tx3 group-hover:text-gold ${
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
                        <p className="pb-6 text-[16px] text-tx2 leading-[1.85] font-normal">
                          {f.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="bg-navy py-[80px] md:py-[100px] px-5 md:px-10">
        <div className="max-w-[720px] mx-auto text-center">
          <h2 className="font-sans text-[clamp(26px,3.2vw,38px)] text-white leading-[1.2] font-light tracking-[-0.4px] mb-4">
            想知道你最該從<span className="text-gold font-normal">哪個支柱</span>開始？
          </h2>
          <p className="text-[16.5px] text-white/60 leading-[1.8] mb-10 max-w-[540px] mx-auto">
            聊聊你的狀況，我們幫你判斷哪個支柱最該先動——不收費、不承諾、不賣課。
          </p>
          <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
            <button
              onClick={open}
              className="bg-gold text-navy px-9 py-[15px] rounded-none text-[15.5px] font-semibold tracking-[0.5px] transition-all hover:bg-gold-l cursor-pointer"
            >
              聊聊你的狀況 →
            </button>
            <Link
              href="/assess"
              className="group inline-flex items-center gap-2 text-white/75 text-[15.5px] font-medium transition-colors hover:text-white"
            >
              <span className="border-b border-white/30 pb-0.5 group-hover:border-white transition-colors">
                先比對案例
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
