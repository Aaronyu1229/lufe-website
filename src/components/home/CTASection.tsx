"use client";

import Link from "next/link";
import { useMessageBox } from "../MessageBox";

export function CTASection() {
  const { open } = useMessageBox();

  return (
    <section className="bg-[#FAFAF8] py-[120px] px-5 md:px-10">
      <div className="max-w-[1400px] mx-auto text-center">
        <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold mb-3">
          開始
        </div>

        {/* Before / After */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[640px] mx-auto mb-12">
          {/* Before */}
          <div className="p-7 rounded-none text-center bg-[rgba(26,26,46,0.04)] border border-bd">
            <h4 className="text-[13px] font-semibold mb-3.5 tracking-[0.5px] text-tx3">
              沒有鹿飛
            </h4>
            <div className="h-[100px] flex items-center justify-center">
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
            <p className="text-[12.5px] text-tx3 font-normal mt-2">
              找了三家公司、走了三條路
              <br />
              中間全靠自己串
            </p>
          </div>

          {/* After */}
          <div className="p-7 rounded-none text-center bg-[rgba(212,168,92,0.08)] border border-[rgba(212,168,92,0.2)]">
            <h4 className="text-[13px] font-semibold mb-3.5 tracking-[0.5px] text-gold">
              有鹿飛
            </h4>
            <div className="h-[100px] flex items-center justify-center">
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
            <p className="text-[12.5px] text-gold font-normal mt-2">
              一個窗口、一條線
              <br />
              從評估到落地全程搞定
            </p>
          </div>
        </div>

        <h2 className="font-heading text-[clamp(28px,3.5vw,42px)] leading-[1.2] mb-3 font-bold tracking-[-0.5px]">
          每一家有好產品的公司
          <br />
          都值得試試看
        </h2>
        <p className="text-[15px] text-tx2 max-w-[440px] mx-auto leading-[1.7] mb-10 font-normal">
          不確定從哪開始？沒關係。兩分鐘評估，找到你的起點。
        </p>
        <div className="flex justify-center gap-3 flex-wrap">
          <Link
            href="/assess"
            className="inline-block bg-gold text-navy px-[30px] py-3.5 rounded-none text-[15px] font-semibold transition-colors hover:bg-cream-d"
          >
            免費出海評估 →
          </Link>
          <button
            onClick={open}
            className="px-7 py-[13px] border border-bd bg-white text-tx rounded-none text-[14px] font-medium cursor-pointer transition-colors duration-300 hover:border-tx"
          >
            直接聊聊 →
          </button>
        </div>
      </div>
    </section>
  );
}
