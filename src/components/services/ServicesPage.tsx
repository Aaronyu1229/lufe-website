"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMessageBox } from "../MessageBox";
import { STAGE_ORDER, STAGES, ACCENT_CLASSES } from "@/data/services";

/**
 * ServicesPage (hub).
 * Previously a 576-line scroll-everything page. Now a lightweight hub that
 * routes visitors into the real content, which lives on sub-pages:
 *   /services/[stage]  — four stage sub-pages with full depth
 *   /services/optimize — standalone optimize page
 *   /services/methodology — the framework page
 */

const topFaqs = [
  {
    q: "我該從哪個階段開始？",
    a: "多數客戶從階段 01 市場評估開始，因為沒有評估就跳到產品測試通常是在燒錢。少數已經有明確市場目標的客戶可以從階段 02 直接切入。如果你不確定，就先聊聊。",
  },
  {
    q: "跨境前需要準備多少資金？",
    a: "取決於你的產品類型和目標市場。評估階段幾萬到十幾萬台幣，測試階段 50-100 萬。我們會在第一次聊天時給你合理的預算範圍。",
  },
  {
    q: "鹿飛跟傳統貿易商有什麼不同？",
    a: "傳統貿易商只做買賣，賺價差。鹿飛做的是全程導航：從評估到落地，陪你走完全程，而且我們不賺價差，賺的是讓品牌在海外建立的服務費。",
  },
];

export function ServicesPage() {
  const { open } = useMessageBox();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-navy pt-[130px] md:pt-[170px] pb-[70px] md:pb-[90px] px-5 md:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/services/services-hero-dhl.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/55 to-navy" />
        </div>

        {/* Soft gold glow top-right */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
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

          {/* Eyebrow — bilingual */}
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px bg-gold" />
            <span className="text-[11.5px] font-semibold tracking-[2.5px] uppercase text-gold">
              服務 · SERVICES
            </span>
          </div>

          {/* Headline */}
          <h1 className="font-heading text-[clamp(34px,5vw,60px)] text-white leading-[1.08] font-light tracking-[-0.8px] mb-6 max-w-[900px]">
            跨境不難，難的是沒人告訴你
            <br />
            <span className="font-normal text-gold">完整的路怎麼走</span>
          </h1>
          <p className="text-[15.5px] md:text-[17px] text-white/65 max-w-[620px] font-light leading-[1.75] mb-12 md:mb-14">
            我們不只做其中一段，而是從評估到落地，幫你把整條路串起來。
          </p>

          {/* 4-stage mini path preview */}
          <div className="hidden md:block mb-12">
            <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-white/40 mb-4">
              完整路徑
            </div>
            <div className="relative flex items-center justify-between gap-3">
              {/* Connector line */}
              <div className="absolute left-0 right-0 top-[18px] h-px bg-gradient-to-r from-sky/50 via-gold/50 to-ember/50" />
              {STAGE_ORDER.map((slug, i) => {
                const stage = STAGES[slug];
                const c = ACCENT_CLASSES[stage.accent];
                return (
                  <Link
                    key={slug}
                    href={`/services/${slug}`}
                    className="group relative flex-1 text-left"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      <span
                        className={`relative z-10 w-[38px] h-[38px] flex items-center justify-center border bg-navy ${c.border} ${c.text} text-[13px] font-semibold tabular-nums transition-all group-hover:scale-110`}
                      >
                        {stage.num}
                      </span>
                      {i < STAGE_ORDER.length - 1 && (
                        <span className="text-white/20 text-[11px]">→</span>
                      )}
                    </div>
                    <div className="pl-[2px]">
                      <div className={`text-[13.5px] font-semibold text-white group-hover:${c.text} transition-colors leading-tight`}>
                        {stage.title}
                      </div>
                      <div className="text-[11px] text-white/40 mt-0.5">
                        {stage.timeline}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Stats strip */}
          <div className="border-t border-white/10 pt-7 grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-8">
            {[
              { n: "42+", l: "年國際物流實戰" },
              { n: "500+", l: "出口案件" },
              { n: "30+", l: "國家覆蓋" },
              { n: "4", l: "核心階段" },
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

      {/* ─── Four stages path ─── */}
      <section className="bg-white py-[80px] md:py-[100px] px-5 md:px-10">
        <div className="max-w-[1200px] mx-auto">
          <div className="section-label">完整路徑</div>
          <h2 className="section-heading">
            四個階段，<span className="font-normal text-gold">一條完整的跨境路</span>
          </h2>
          <p className="section-desc">
            每個階段都是獨立的服務，也可以從任一階段切入。點進去看每個階段的詳細流程、交付物、紅燈警示與相關案例。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-12">
            {STAGE_ORDER.map((slug) => {
              const stage = STAGES[slug];
              const c = ACCENT_CLASSES[stage.accent];
              return (
                <Link
                  key={slug}
                  href={`/services/${slug}`}
                  className={`group block bg-white rounded-none border border-bd transition-all duration-400 relative overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 hover:border-gold`}
                >
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-navy">
                    <Image
                      src={stage.image}
                      alt={stage.imageAlt}
                      fill
                      sizes="(max-width: 768px) 100vw, 25vw"
                      className="object-cover img-navy-unify transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-baseline gap-3 mb-2">
                      <span className={`font-sans text-[28px] font-light tabular-nums ${c.text}`}>
                        {stage.num}
                      </span>
                      <span className="text-[11px] text-tx3 font-normal tracking-wider uppercase">
                        {stage.timeline}
                      </span>
                    </div>
                    <h3 className="text-[17px] font-semibold mb-2 leading-tight">
                      {stage.title}
                    </h3>
                    <p className="text-[13px] text-tx2 leading-[1.65] font-normal mb-4 min-h-[3.3em]">
                      {stage.subtitle}
                    </p>
                    <span className={`text-[12.5px] font-semibold inline-flex items-center gap-1 ${c.text} group-hover:gap-2 transition-all`}>
                      看這個階段 →
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Two routes: Optimize / Methodology ─── */}
      <section className="bg-cream py-[72px] md:py-[96px] px-5 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="section-label">其他方案</div>
          <h2 className="section-heading">
            不走完整路徑？<span className="font-normal text-gold">還有兩條路</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <Link
              href="/services/optimize"
              className="group block bg-white rounded-none p-7 md:p-9 border-l-4 border-ember transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-none bg-[rgba(217,139,74,0.08)] flex items-center justify-center text-[18px]">
                  ⚡
                </span>
                <div>
                  <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-ember">
                    進階方案
                  </div>
                  <h3 className="text-[19px] font-semibold mt-0.5 group-hover:text-ember transition-colors">
                    運營優化方案
                  </h3>
                </div>
              </div>
              <p className="text-[14px] text-tx2 leading-[1.75] mb-5">
                產品已經在海外，但物流成本高、通路績效不穩、營運流程卡卡？
                這個方案為已經在跑的你設計。
              </p>
              <span className="text-[13px] font-semibold text-ember group-hover:translate-x-1 inline-block transition-transform">
                看優化方案 →
              </span>
            </Link>

            <Link
              href="/services/methodology"
              className="group block bg-white rounded-none p-7 md:p-9 border-l-4 border-gold transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-none bg-[rgba(212,168,92,0.1)] flex items-center justify-center text-[18px]">
                  ⚙
                </span>
                <div>
                  <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-gold">
                    方法論
                  </div>
                  <h3 className="text-[19px] font-semibold mt-0.5 group-hover:text-gold transition-colors">
                    鹿飛的決策框架
                  </h3>
                </div>
              </div>
              <p className="text-[14px] text-tx2 leading-[1.75] mb-5">
                我們怎麼判斷一個案子值不值得做？
                MBCPR 五維評分矩陣、紅燈判準、一個真實案例的完整評分過程。
              </p>
              <span className="text-[13px] font-semibold text-gold group-hover:translate-x-1 inline-block transition-transform">
                看方法論 →
              </span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Top FAQs ─── */}
      <section className="bg-white py-[72px] md:py-[96px] px-5 md:px-10">
        <div className="max-w-[760px] mx-auto">
          <div className="section-label">最常被問到</div>
          <h2 className="section-heading">三個關鍵問題</h2>
          <p className="section-desc">
            更多細節在每個階段的子頁。這裡先回答最常見的三題。
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
                    <span className="text-[15.5px] md:text-[16.5px] font-medium pr-4 group-hover:text-navy transition-colors">
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
                        <p className="pb-6 text-[14.5px] text-tx2 leading-[1.85] font-normal">
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
            想知道你的產品適合從<span className="text-gold font-normal">哪個階段</span>開始？
          </h2>
          <p className="text-[15px] text-white/60 leading-[1.75] mb-10 max-w-[520px] mx-auto">
            聊聊你的狀況，我們幫你規劃最適合的路徑，不收費、不承諾、不賣課。
          </p>
          <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
            <button
              onClick={open}
              className="bg-gold text-navy px-9 py-[15px] rounded-none text-[14px] font-semibold tracking-[0.5px] transition-all hover:bg-gold-l cursor-pointer"
            >
              聊聊你的產品 →
            </button>
            <Link
              href="/assess"
              className="group inline-flex items-center gap-2 text-white/75 text-[14px] font-medium transition-colors hover:text-white"
            >
              <span className="border-b border-white/30 pb-0.5 group-hover:border-white transition-colors">
                先做 2 分鐘評估
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
