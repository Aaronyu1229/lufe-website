"use client";

import Image from "next/image";
import Link from "next/link";
import { useMessageBox } from "../MessageBox";

/**
 * CTASection — final conversion block.
 * CTA rule (site-wide): primary "聊聊你的產品" → MessageBox,
 * secondary "先做 2 分鐘評估" → /assess. No other labels.
 */

export function CTASection() {
  const { open } = useMessageBox();

  return (
    <section className="relative bg-navy py-[60px] md:py-[80px] px-5 md:px-10 overflow-hidden">
      {/* Background executive image */}
      <Image
        src="/images/cta/cta-executive.jpg"
        alt=""
        fill
        sizes="100vw"
        aria-hidden="true"
        className="object-cover object-[70%_center] img-navy-unify opacity-50"
      />
      {/* Navy gradient from left so text stays readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/40"
      />
      <div className="relative z-10 max-w-[1400px] mx-auto text-center">
        <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold/70 mb-3">
          開始
        </div>

        {/* Before / After */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 max-w-[760px] mx-auto mb-12 relative">
          {/* VS separator */}
          <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 w-10 h-10 rounded-full bg-navy border border-white/20 items-center justify-center">
            <span className="text-[11px] font-bold text-white/50 tracking-wider">VS</span>
          </div>
          <div className="md:hidden flex justify-center py-3">
            <span className="text-[11px] font-bold text-white/30 tracking-wider">VS</span>
          </div>

          {/* Before */}
          <div className="p-8 md:p-10 rounded-none text-center bg-white/[0.04] border border-white/10">
            <div className="text-[14.5px] font-semibold mb-4 tracking-[0.5px] text-white/40">
              沒有鹿飛
            </div>
            <div className="h-[120px] flex items-center justify-center">
              <svg viewBox="0 0 180 80" width="180">
                <path d="M20,40 L50,20" stroke="#8A8F9E" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
                <path d="M20,40 L60,60" stroke="#8A8F9E" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
                <path d="M50,20 L90,30" stroke="#8A8F9E" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
                <path d="M60,60 L100,50" stroke="#8A8F9E" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
                <path d="M90,30 L130,15" stroke="#8A8F9E" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
                <path d="M100,50 L140,65" stroke="#8A8F9E" strokeWidth="1" strokeDasharray="4,4" opacity="0.5" />
                <circle cx="20" cy="40" r="4" fill="#8A8F9E" opacity="0.4" />
                <circle cx="50" cy="20" r="3" fill="#8A8F9E" opacity="0.3" />
                <circle cx="60" cy="60" r="3" fill="#8A8F9E" opacity="0.3" />
                <circle cx="90" cy="30" r="3" fill="#8A8F9E" opacity="0.3" />
                <circle cx="100" cy="50" r="3" fill="#8A8F9E" opacity="0.3" />
                <circle cx="130" cy="15" r="3" fill="#8A8F9E" opacity="0.3" />
                <circle cx="140" cy="65" r="3" fill="#8A8F9E" opacity="0.3" />
                <text x="155" y="20" fill="#8A8F9E" fontSize="14" opacity="0.5">?</text>
                <text x="150" y="70" fill="#8A8F9E" fontSize="14" opacity="0.5">?</text>
              </svg>
            </div>
            <p className="text-[13.5px] text-white/40 font-normal mt-2">
              找了三家公司、走了三條路
              <br />
              中間全靠自己串
            </p>
          </div>

          {/* After */}
          <div className="p-8 md:p-10 rounded-none text-center bg-[rgba(212,168,92,0.08)] border border-gold/20">
            <div className="text-[14.5px] font-semibold mb-4 tracking-[0.5px] text-gold">
              有鹿飛
            </div>
            <div className="h-[120px] flex items-center justify-center">
              <svg viewBox="0 0 180 80" width="180">
                <path d="M20,40 Q60,20 100,40 Q140,60 170,35" stroke="#D4A85C" strokeWidth="2" fill="none" strokeLinecap="round" />
                <circle cx="20" cy="40" r="5" fill="#D4A85C" />
                <circle cx="60" cy="28" r="4" fill="none" stroke="#D4A85C" strokeWidth="1.5" />
                <text x="60" y="32" textAnchor="middle" fill="#D4A85C" fontSize="8">1</text>
                <circle cx="100" cy="40" r="4" fill="none" stroke="#D4A85C" strokeWidth="1.5" />
                <text x="100" y="44" textAnchor="middle" fill="#D4A85C" fontSize="8">2</text>
                <circle cx="140" cy="52" r="4" fill="none" stroke="#D4A85C" strokeWidth="1.5" />
                <text x="140" y="56" textAnchor="middle" fill="#D4A85C" fontSize="8">3</text>
                <circle cx="170" cy="35" r="5" fill="#D4A85C" />
                <text x="20" y="58" textAnchor="middle" fill="#D4A85C" fontSize="9" opacity="0.7">台灣</text>
                <text x="170" y="52" textAnchor="middle" fill="#D4A85C" fontSize="9" opacity="0.7">海外</text>
              </svg>
            </div>
            <p className="text-[13.5px] text-gold font-medium mt-2">
              一個窗口、一條線
              <br />
              從評估到落地全程搞定
            </p>
          </div>
        </div>

        <h2 className="font-sans text-[clamp(28px,3.5vw,44px)] leading-[1.15] mb-3 font-light tracking-[-0.5px] text-white">
          每一家有好產品的公司
          <br />
          都值得試試看
        </h2>
        <p className="text-[16.5px] text-white/55 max-w-[460px] mx-auto leading-[1.8] mb-10 font-normal">
          不確定從哪開始？先聊聊，不收費、不承諾、不賣課。
          我們會老實告訴你值不值得出去。
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
            className="group inline-flex items-center gap-2 text-white/75 text-[15.5px] font-medium tracking-[0.3px] transition-colors duration-300 hover:text-white"
          >
            <span className="border-b border-white/30 pb-0.5 group-hover:border-white transition-colors">
              先做 2 分鐘評估
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
