"use client";

import { useMessageBox } from "../MessageBox";

export function HeroSection() {
  const { open } = useMessageBox();

  return (
    <section
      className="min-h-screen flex items-center relative overflow-hidden"
      style={{
        backgroundImage: "url('/hero-bg.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-navy/90 to-navy/60" />

      <div className="max-w-[1400px] mx-auto px-5 md:px-10 pt-[180px] pb-[120px] relative z-10">
        <div className="max-w-[680px]">
          <div className="inline-block border-b-2 border-gold/40 text-gold text-[12.5px] font-medium mb-8 tracking-[1.5px] uppercase pb-1">
            企業出海的導航系統
          </div>
          <h1 className="font-sans text-[clamp(40px,5.5vw,64px)] text-white leading-[1.1] mb-6 font-bold tracking-[-1.5px]">
            好產品值得一條
            <br />
            順暢的<span className="text-gold">出海路</span>
          </h1>
          <p className="text-[17px] text-white/60 max-w-[480px] leading-[1.75] mb-4">
            從市場驗證到落地營運，我們陪你走完全程。
            <br />
            別人幫你開車，我們幫你找路。
          </p>
          <p className="text-[14px] text-gold/80 mb-10">
            平均 6-9 個月，讓你的產品站上海外貨架。
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={open}
              className="bg-gold text-navy px-8 py-4 rounded-none text-[15px] font-semibold cursor-pointer transition-all hover:bg-gold-l"
            >
              聊聊你的產品 →
            </button>
            <span className="text-[13px] text-white/30">
              不確定該不該出海？先聊聊，不收費。
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
