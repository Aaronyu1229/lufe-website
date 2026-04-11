"use client";

import Link from "next/link";
import { useMessageBox } from "../MessageBox";

/**
 * SubsidiesCTASection — final CTA block for /resources/subsidies.
 * Uses MessageBox for the primary CTA to stay consistent with site-wide
 * CTA rules ("聊聊你的產品" + "先做 2 分鐘評估").
 */
export function SubsidiesCTASection() {
  const { open } = useMessageBox();

  return (
    <section className="py-[72px] md:py-[100px] px-5 md:px-10 lg:px-16 bg-navy text-white relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 50%, #D4A85C 0%, transparent 50%)",
        }}
      />
      <div className="max-w-[900px] mx-auto text-center relative">
        <h2
          className="font-sans text-white leading-[1.1] mb-6 font-extralight tracking-[-1.5px]"
          style={{ fontSize: "clamp(30px, 4vw, 50px)" }}
        >
          不確定哪個適合你？
          <br />
          <span className="text-gold">先聊聊看</span>
        </h2>
        <p className="text-[16px] text-white/70 max-w-[600px] mx-auto mb-10 leading-[1.75]">
          告訴我們你的產品、市場目標和現在卡在哪一步，
          我們會告訴你哪個補助最適合、下一步怎麼走。
        </p>
        <div className="flex items-center justify-center gap-6 md:gap-8 flex-wrap">
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
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
