"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useMessageBox } from "../MessageBox";
import { ACCENT_CLASSES, STAGES, type Stage } from "@/data/services";
import { getCase } from "@/data/cases";

interface Props {
  readonly stage: Stage;
}

export function StagePage({ stage }: Props) {
  const { open } = useMessageBox();
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const c = ACCENT_CLASSES[stage.accent];
  const relatedCase = getCase(stage.relatedCaseSlug);
  const prevStage = stage.prevSlug ? STAGES[stage.prevSlug] : null;
  const nextStage = stage.nextSlug ? STAGES[stage.nextSlug] : null;

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative bg-navy pt-[140px] md:pt-[180px] pb-[80px] md:pb-[100px] px-5 md:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={stage.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.3]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/65 to-navy" />
        </div>

        <div className="relative max-w-[1100px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[12px] text-white/50 mb-6">
            <Link href="/services" className="hover:text-white transition-colors">
              服務
            </Link>
            <span>/</span>
            <span className="text-white/80">階段 {stage.num}</span>
          </nav>

          <div className={`text-[11.5px] font-semibold tracking-[2px] uppercase ${c.text} mb-3`}>
            STAGE {stage.num} · {stage.timeline}
          </div>
          <h1 className="font-heading text-[clamp(32px,5vw,56px)] text-white leading-[1.1] font-light tracking-[-0.8px] mb-5">
            {stage.title}
          </h1>
          <p className="text-[18px] md:text-[20px] text-white/75 max-w-[720px] leading-[1.55] font-light mb-8">
            {stage.subtitle}
          </p>
          <p className={`text-[16px] md:text-[17px] max-w-[700px] leading-[1.8] font-normal ${c.text} italic`}>
            {stage.heroLine}
          </p>
        </div>
      </section>

      {/* ─── Purpose ─── */}
      <section className="bg-white py-[64px] md:py-[84px] px-5 md:px-10">
        <div className="max-w-[840px] mx-auto">
          <div className="section-label">這個階段在做什麼</div>
          <h2 className="section-heading">
            為什麼要有<span className={`font-normal ${c.text}`}>這個階段</span>
          </h2>
          <p className="text-[16px] text-tx2 leading-[1.9] font-normal max-w-[720px]">
            {stage.purpose}
          </p>
        </div>
      </section>

      {/* ─── Outcomes ─── */}
      <section className={`py-[64px] md:py-[84px] px-5 md:px-10 ${c.softBg}`}>
        <div className="max-w-[840px] mx-auto">
          <div className="section-label">你會知道什麼</div>
          <h2 className="section-heading">
            這階段結束時，你手上會有
          </h2>
          <ul className="space-y-4 mt-8">
            {stage.outcomes.map((outcome, i) => (
              <li
                key={i}
                className="flex items-start gap-4 bg-white p-5 border border-bd/60"
              >
                <span className={`font-sans text-[20px] font-light tabular-nums ${c.text} shrink-0`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="text-[15px] text-tx leading-[1.7] font-normal">
                  {outcome}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ─── Deliverables ─── */}
      <section className="bg-white py-[64px] md:py-[84px] px-5 md:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="section-label">具體交付</div>
          <h2 className="section-heading">
            你會實際拿到的東西
          </h2>
          <p className="section-desc">
            不是抽象承諾，是可以寫進合約的交付物。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-8">
            {stage.deliverables.map((d, i) => (
              <div
                key={i}
                className="p-6 md:p-7 bg-cream rounded-none border-l-4 border-gold/40 transition-colors hover:border-gold"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className={`font-sans text-[15px] font-semibold tabular-nums ${c.text}`}>
                    0{i + 1}
                  </span>
                  <h3 className="text-[16px] font-semibold">{d.title}</h3>
                </div>
                <p className="text-[13.5px] text-tx2 leading-[1.75] font-normal">
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Process Timeline ─── */}
      <section className="bg-navy py-[80px] md:py-[100px] px-5 md:px-10">
        <div className="max-w-[960px] mx-auto">
          <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold mb-3">
            執行流程
          </div>
          <h2 className="font-sans text-[clamp(26px,3.2vw,40px)] text-white leading-[1.2] font-light tracking-[-0.5px] mb-3">
            <span className="text-gold font-normal">{stage.timeline}</span> 的實際節奏
          </h2>
          <p className="text-[15px] text-white/60 leading-[1.7] mb-12 max-w-[520px]">
            每個階段我們都有明確的週進度，不會讓你不知道現在在做什麼。
          </p>

          <div className="space-y-5">
            {stage.process.map((p, i) => (
              <div
                key={i}
                className="grid grid-cols-[auto_1fr] gap-5 md:gap-8 py-6 border-t border-white/10"
              >
                <div className="min-w-[80px] md:min-w-[120px]">
                  <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-gold">
                    {p.week}
                  </div>
                </div>
                <div>
                  <h3 className="text-[17px] md:text-[19px] text-white font-medium mb-3">
                    {p.title}
                  </h3>
                  <ul className="space-y-2">
                    {p.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-[14px] text-white/70 leading-[1.7]"
                      >
                        <span className="w-1 h-1 rounded-full bg-gold/60 mt-[10px] shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Readiness Self-Diagnostic ─── */}
      <section className="bg-cream py-[64px] md:py-[84px] px-5 md:px-10">
        <div className="max-w-[840px] mx-auto">
          <div className="section-label">自我診斷</div>
          <h2 className="section-heading">
            你現在<span className={`font-normal ${c.text}`}>準備好</span>進這個階段了嗎？
          </h2>
          <p className="section-desc">
            這不是門檻，是誠實的自我檢視。如果你多數項目是綠燈，這階段對你就是有效的。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-8">
            {stage.readiness.map((r, i) => (
              <div
                key={i}
                className={`flex items-start gap-3 p-4 bg-white border ${
                  r.positive ? "border-l-4 border-l-emerald-500 border-bd" : "border-l-4 border-l-red-400/70 border-bd"
                }`}
              >
                <span
                  className={`shrink-0 w-5 h-5 rounded-none flex items-center justify-center text-[11px] font-bold ${
                    r.positive ? "bg-emerald-500 text-white" : "bg-red-400/70 text-white"
                  }`}
                >
                  {r.positive ? "✓" : "✗"}
                </span>
                <span className="text-[13.5px] text-tx leading-[1.65]">{r.text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Red Flags ─── */}
      <section className="bg-white py-[64px] md:py-[84px] px-5 md:px-10">
        <div className="max-w-[840px] mx-auto">
          <div className="section-label text-red-500/80">紅燈警示</div>
          <h2 className="section-heading">
            如果遇到這些情況，<span className="font-normal text-red-500/80">我們會喊停</span>
          </h2>
          <p className="section-desc">
            我們不是為了接案而做事。如果某些狀況會讓這階段白做，我們會在第一時間告訴你。
          </p>

          <div className="space-y-4 mt-8">
            {stage.redFlags.map((rf, i) => (
              <div
                key={i}
                className="p-5 md:p-6 bg-red-50/50 border-l-4 border-red-400/70"
              >
                <h3 className="text-[16px] font-semibold mb-2 text-red-700/90">
                  {rf.title}
                </h3>
                <p className="text-[13.5px] text-tx2 leading-[1.75]">{rf.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Related Case ─── */}
      {relatedCase && (
        <section className="bg-cream py-[64px] md:py-[84px] px-5 md:px-10">
          <div className="max-w-[960px] mx-auto">
            <div className="section-label">實戰案例</div>
            <h2 className="section-heading">
              這階段在真實案子裡長什麼樣
            </h2>

            <Link
              href={`/cases/${relatedCase.slug}`}
              className="group block mt-8 bg-white rounded-none overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all"
            >
              <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr]">
                <div className="relative h-[240px] md:h-auto md:min-h-[280px] overflow-hidden">
                  <Image
                    src={relatedCase.heroImage}
                    alt={relatedCase.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="p-7 md:p-9 flex flex-col justify-center">
                  <div className="flex gap-1.5 mb-3">
                    {relatedCase.tags.map((t) => (
                      <span
                        key={t.label}
                        className={`text-[11px] px-2.5 py-[3px] rounded-sm font-medium ${
                          t.variant === "sky"
                            ? "bg-[rgba(91,143,168,0.08)] text-sky"
                            : "bg-[rgba(212,168,92,0.12)] text-gold"
                        }`}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                  <div className="font-heading text-[40px] md:text-[48px] text-gold leading-none font-semibold mb-3">
                    {relatedCase.num}
                  </div>
                  <h3 className="font-heading text-[20px] md:text-[22px] leading-[1.35] font-bold mb-3">
                    {relatedCase.title}
                  </h3>
                  <p className="text-[13.5px] text-tx2 leading-[1.7] mb-4">
                    {relatedCase.summary}
                  </p>
                  <span className="text-[13px] font-semibold text-gold group-hover:translate-x-1 transition-transform inline-block">
                    看完整案例 →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ─── FAQ ─── */}
      <section className="bg-white py-[64px] md:py-[84px] px-5 md:px-10">
        <div className="max-w-[760px] mx-auto">
          <div className="section-label">階段 FAQ</div>
          <h2 className="section-heading">這階段最常被問到的問題</h2>

          <div className="border-t border-bd mt-8">
            {stage.faqs.map((f, i) => {
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
                        <p className="pb-6 text-[14.5px] text-tx2 leading-[1.85] font-normal max-w-[700px]">
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
      <section className="bg-navy py-[72px] md:py-[96px] px-5 md:px-10">
        <div className="max-w-[720px] mx-auto text-center">
          <h2 className="font-sans text-[clamp(26px,3.2vw,38px)] text-white leading-[1.2] font-light tracking-[-0.4px] mb-4">
            準備好進入<span className="text-gold font-normal">{stage.title}</span>了嗎？
          </h2>
          <p className="text-[15px] text-white/60 leading-[1.75] mb-10 max-w-[520px] mx-auto">
            聊聊你的狀況，我們會告訴你這個階段對你是不是現在最該做的事。
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

      {/* ─── Stage Navigator ─── */}
      <section className="bg-white py-[48px] px-5 md:px-10 border-t border-bd">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 gap-4 md:gap-8">
          {prevStage ? (
            <Link
              href={`/services/${prevStage.slug}`}
              className="group block p-5 md:p-6 border border-bd rounded-none hover:border-gold transition-colors"
            >
              <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-1.5">
                ← 上一階段
              </div>
              <div className="text-[15px] font-semibold group-hover:text-navy transition-colors">
                {prevStage.num} {prevStage.title}
              </div>
              <div className="text-[12px] text-tx3 mt-1">{prevStage.timeline}</div>
            </Link>
          ) : (
            <Link
              href="/services"
              className="group block p-5 md:p-6 border border-bd rounded-none hover:border-gold transition-colors"
            >
              <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-1.5">
                ← 服務總覽
              </div>
              <div className="text-[15px] font-semibold group-hover:text-navy transition-colors">
                看完整四階段路徑
              </div>
            </Link>
          )}
          {nextStage ? (
            <Link
              href={`/services/${nextStage.slug}`}
              className="group block p-5 md:p-6 border border-bd rounded-none hover:border-gold transition-colors text-right"
            >
              <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-1.5">
                下一階段 →
              </div>
              <div className="text-[15px] font-semibold group-hover:text-navy transition-colors">
                {nextStage.num} {nextStage.title}
              </div>
              <div className="text-[12px] text-tx3 mt-1">{nextStage.timeline}</div>
            </Link>
          ) : (
            <Link
              href="/services/optimize"
              className="group block p-5 md:p-6 border border-bd rounded-none hover:border-gold transition-colors text-right"
            >
              <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-tx3 mb-1.5">
                進階方案 →
              </div>
              <div className="text-[15px] font-semibold group-hover:text-navy transition-colors">
                運營優化方案
              </div>
              <div className="text-[12px] text-tx3 mt-1">已經在海外，想做更好</div>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
