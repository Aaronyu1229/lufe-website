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
            className="object-cover opacity-[0.3] animate-hero-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/65 to-navy" />
        </div>

        <div className="relative max-w-[1100px] mx-auto">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-[13px] text-white/50 mb-6">
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
          <p className="text-[19px] md:text-[21px] text-white/75 max-w-[720px] leading-[1.55] font-light mb-8">
            {stage.subtitle}
          </p>
          <p className={`text-[17px] md:text-[18px] max-w-[700px] leading-[1.8] font-normal ${c.text} italic`}>
            {stage.heroLine}
          </p>
        </div>
      </section>

      {/* ─── Purpose ─── */}
      <section className="bg-white py-[64px] md:py-[84px] px-5 md:px-10">
        <div className="max-w-[960px] mx-auto">
          <h2 className="section-heading">
            為什麼要有<span className={`font-normal ${c.text}`}>這個階段</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-start mt-4">
            <div
              className={`relative w-[120px] h-[120px] md:w-[148px] md:h-[148px] ${c.softBg} border ${c.border} flex items-center justify-center shrink-0`}
            >
              <span
                className={`font-heading text-[56px] md:text-[72px] font-light tabular-nums ${c.text} leading-none`}
              >
                {stage.num}
              </span>
              <span
                aria-hidden="true"
                className={`absolute -top-px left-4 right-4 h-px ${c.text}`}
                style={{ backgroundColor: "currentColor", opacity: 0.4 }}
              />
              <span
                aria-hidden="true"
                className={`absolute -bottom-px left-4 right-4 h-px ${c.text}`}
                style={{ backgroundColor: "currentColor", opacity: 0.4 }}
              />
            </div>
            <p className="text-[17px] text-tx2 leading-[1.9] font-normal max-w-[720px]">
              {stage.purpose}
            </p>
          </div>
        </div>
      </section>

      {/* ─── What You Get (merged Outcomes + Deliverables) ─── */}
      <section className={`py-[72px] md:py-[96px] px-5 md:px-10 ${c.softBg}`}>
        <div className="max-w-[1100px] mx-auto">
          <h2 className="section-heading">
            這階段結束時，<span className={`font-normal ${c.text}`}>你會拿到什麼</span>
          </h2>
          <p className="section-desc">
            不是抽象承諾，分成兩層：你會「知道」什麼，以及你會實際「拿到」什麼。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 mt-10">
            {/* Left — Outcomes (理解層) */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className={`w-8 h-8 rounded-full ${c.softBg} border ${c.border} flex items-center justify-center ${c.text}`}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 7V13L16 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <h3 className={`text-[18px] font-semibold ${c.text}`}>你會知道什麼</h3>
              </div>
              <ul className="space-y-3">
                {stage.outcomes.map((outcome, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 bg-white p-4 border border-bd/60"
                  >
                    <div
                      className={`shrink-0 w-6 h-6 rounded-full ${c.softBg} flex items-center justify-center ${c.text} mt-[2px]`}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                        <path
                          d="M5 12L10 17L19 7"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                    <span className="text-[15.5px] text-tx leading-[1.7] font-normal">
                      {outcome}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right — Deliverables (實體層) */}
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 rounded-full bg-gold/10 border border-gold/40 flex items-center justify-center text-gold-d">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M8 3H15L19 7V20C19 20.5523 18.5523 21 18 21H8C7.44772 21 7 20.5523 7 20V4C7 3.44772 7.44772 3 8 3Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path d="M14 3V8H19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="text-[18px] font-semibold text-gold-d">你會實際拿到</h3>
              </div>
              <ul className="space-y-3">
                {stage.deliverables.map((d, i) => (
                  <li
                    key={i}
                    className="bg-white p-4 border-l-4 border-gold/60 border border-bd/60 hover:border-l-gold transition-colors"
                  >
                    <h4 className="text-[15.5px] font-semibold mb-1.5 text-tx">{d.title}</h4>
                    <p className="text-[13.5px] text-tx2 leading-[1.7] font-normal">
                      {d.desc}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Process Timeline ─── */}
      <section className="bg-navy py-[80px] md:py-[100px] px-5 md:px-10">
        <div className="max-w-[960px] mx-auto">
          <div className="w-12 h-px bg-gold/60 mb-5" />
          <h2 className="font-sans text-[clamp(26px,3.2vw,40px)] text-white leading-[1.2] font-light tracking-[-0.5px] mb-3">
            <span className="text-gold font-normal">{stage.timeline}</span> 的實際節奏
          </h2>
          <p className="text-[16.5px] text-white/60 leading-[1.8] mb-12 max-w-[520px]">
            每個階段我們都有明確的週進度，不會讓你不知道現在在做什麼。
          </p>

          <div className="space-y-5">
            {stage.process.map((p, i) => (
              <div
                key={i}
                className="grid grid-cols-[auto_1fr] gap-5 md:gap-8 py-6 border-t border-white/10"
              >
                <div className="min-w-[80px] md:min-w-[120px]">
                  <div className="text-[13px] font-semibold text-gold">
                    {p.week}
                  </div>
                </div>
                <div>
                  <h3 className="text-[18px] md:text-[20px] text-white font-medium mb-3">
                    {p.title}
                  </h3>
                  <ul className="space-y-2">
                    {p.items.map((item, j) => (
                      <li
                        key={j}
                        className="flex items-start gap-3 text-[15.5px] text-white/70 leading-[1.8]"
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

      {/* ─── Readiness + Red Flags (merged self-check) ─── */}
      <section className="bg-cream py-[72px] md:py-[96px] px-5 md:px-10">
        <div className="max-w-[960px] mx-auto">
          <h2 className="section-heading">
            你<span className={`font-normal ${c.text}`}>是不是該</span>進這個階段
          </h2>
          <p className="section-desc">
            兩個自我檢視：第一個看你準備好了沒，第二個看有沒有該先喊停的訊號。
          </p>

          {/* Readiness checks */}
          <div className="mt-10 mb-10">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-emerald-50 border border-emerald-500/40 flex items-center justify-center text-emerald-600">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="text-[17px] font-semibold text-emerald-700">準備好的訊號</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {stage.readiness.map((r, i) => (
                <div
                  key={i}
                  className={`flex items-start gap-3 p-4 bg-white border ${
                    r.positive
                      ? "border-l-4 border-l-emerald-500 border-bd"
                      : "border-l-4 border-l-amber-400 border-bd"
                  }`}
                >
                  <span
                    className={`shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-bold ${
                      r.positive ? "bg-emerald-500 text-white" : "bg-amber-400 text-white"
                    }`}
                  >
                    {r.positive ? "✓" : "!"}
                  </span>
                  <span className="text-[15px] text-tx leading-[1.65]">{r.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-bd/70 my-10" />

          {/* Red flags */}
          <div>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-8 h-8 rounded-full bg-red-50 border border-red-400/40 flex items-center justify-center text-red-500">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                  <path d="M12 8V13M12 17V17.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              </div>
              <h3 className="text-[17px] font-semibold text-red-600/90">如果遇到這些，我們會喊停</h3>
            </div>
            <div className="space-y-3">
              {stage.redFlags.map((rf, i) => (
                <div
                  key={i}
                  className="p-5 bg-white border-l-4 border-red-400/70 border border-bd/60"
                >
                  <h4 className="text-[16px] font-semibold mb-1.5 text-red-700/90">
                    {rf.title}
                  </h4>
                  <p className="text-[14.5px] text-tx2 leading-[1.8]">{rf.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── FAQ (moved before related case) ─── */}
      <section className="bg-white py-[64px] md:py-[84px] px-5 md:px-10">
        <div className="max-w-[760px] mx-auto">
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
                        <p className="pb-6 text-[16px] text-tx2 leading-[1.85] font-normal max-w-[700px]">
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

      {/* ─── Related Case (moved after FAQ) ─── */}
      {relatedCase && (
        <section className="bg-cream py-[64px] md:py-[84px] px-5 md:px-10">
          <div className="max-w-[960px] mx-auto">
            <h2 className="section-heading">
              這階段在真實案子裡<span className={`font-normal ${c.text}`}>長什麼樣</span>
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
                            : "bg-[rgba(212,168,92,0.12)] text-gold-d"
                        }`}
                      >
                        {t.label}
                      </span>
                    ))}
                  </div>
                  <div className="font-heading text-[40px] md:text-[48px] text-gold-d leading-none font-semibold mb-3">
                    {relatedCase.num}
                  </div>
                  <h3 className="font-heading text-[21px] md:text-[22px] leading-[1.35] font-bold mb-3">
                    {relatedCase.title}
                  </h3>
                  <p className="text-[15px] text-tx2 leading-[1.8] mb-4">
                    {relatedCase.summary}
                  </p>
                  <span className="text-[14.5px] font-semibold text-gold-d group-hover:translate-x-1 transition-transform inline-block">
                    看完整案例 →
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      {/* ─── CTA ─── */}
      <section className="bg-navy py-[72px] md:py-[96px] px-5 md:px-10">
        <div className="max-w-[720px] mx-auto text-center">
          <h2 className="font-sans text-[clamp(26px,3.2vw,38px)] text-white leading-[1.2] font-light tracking-[-0.4px] mb-4">
            準備好進入<span className="text-gold font-normal">{stage.title}</span>了嗎？
          </h2>
          <p className="text-[16.5px] text-white/60 leading-[1.8] mb-10 max-w-[520px] mx-auto">
            聊聊你的狀況，我們會告訴你這個階段對你是不是現在最該做的事。
          </p>
          <div className="flex justify-center items-center gap-6 md:gap-8 flex-wrap">
            <button
              onClick={open}
              className="bg-gold text-navy px-9 py-[15px] rounded-none text-[15.5px] font-semibold tracking-[0.5px] transition-all hover:bg-gold-l cursor-pointer"
            >
              聊聊你的產品 →
            </button>
            <Link
              href="/assess"
              className="group inline-flex items-center gap-2 text-white/75 text-[15.5px] font-medium transition-colors hover:text-white"
            >
              <span className="border-b border-white/30 pb-0.5 group-hover:border-white transition-colors">
                先做 2 分鐘評估
              </span>
              <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ─── Stage Navigator (cleaned up) ─── */}
      <section className="bg-white py-[48px] px-5 md:px-10 border-t border-bd">
        <div className="max-w-[1100px] mx-auto grid grid-cols-2 gap-4 md:gap-8">
          {prevStage ? (
            <Link
              href={`/services/${prevStage.slug}`}
              className="group block p-5 md:p-6 border border-bd rounded-none hover:border-gold transition-colors"
            >
              <div className="text-[13px] text-tx3 mb-1.5">← 上一階段</div>
              <div className="text-[16.5px] font-semibold group-hover:text-navy transition-colors">
                {prevStage.num} {prevStage.title}
              </div>
              <div className="text-[13px] text-tx3 mt-1">{prevStage.timeline}</div>
            </Link>
          ) : (
            <Link
              href="/services"
              className="group block p-5 md:p-6 border border-bd rounded-none hover:border-gold transition-colors"
            >
              <div className="text-[13px] text-tx3 mb-1.5">← 回服務總覽</div>
              <div className="text-[16.5px] font-semibold group-hover:text-navy transition-colors">
                看完整四階段路徑
              </div>
            </Link>
          )}
          {nextStage ? (
            <Link
              href={`/services/${nextStage.slug}`}
              className="group block p-5 md:p-6 border border-bd rounded-none hover:border-gold transition-colors text-right"
            >
              <div className="text-[13px] text-tx3 mb-1.5">下一階段 →</div>
              <div className="text-[16.5px] font-semibold group-hover:text-navy transition-colors">
                {nextStage.num} {nextStage.title}
              </div>
              <div className="text-[13px] text-tx3 mt-1">{nextStage.timeline}</div>
            </Link>
          ) : (
            <Link
              href="/services/optimize"
              className="group block p-5 md:p-6 border border-bd rounded-none hover:border-gold transition-colors text-right"
            >
              <div className="text-[13px] text-tx3 mb-1.5">進階方案 →</div>
              <div className="text-[16.5px] font-semibold group-hover:text-navy transition-colors">
                運營優化方案
              </div>
              <div className="text-[13px] text-tx3 mt-1">已經在海外，想做更好</div>
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
