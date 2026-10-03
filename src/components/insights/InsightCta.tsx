"use client";

import Link from "next/link";

import { ClockIcon, FileIcon, ReceiptIcon } from "@/components/icons/LineIcons";
import { useMessageBox } from "@/components/MessageBox";

const points = [
  { icon: FileIcon, text: "談完給你一頁：建議從哪一章開始，或建議再等等" },
  { icon: ReceiptIcon, text: "每一章都有明碼價格，第一次談就講清楚" },
  { icon: ClockIcon, text: "24 小時內回覆" },
] as const;

export function InsightCta() {
  const { open } = useMessageBox();

  return (
    <section className="border-t border-bd bg-white py-[96px]">
      <div className="mx-auto max-w-[760px] px-5 text-center">
        <h2 className="font-sans text-[clamp(32px,4.4vw,52px)] font-[650] leading-[1.12] tracking-[-.022em] text-tx [text-wrap:balance]">
          把文章裡的方法，
          <br />
          <span className="text-gold-d">用在自己的產品上</span>
        </h2>
        <p className="lead mx-auto mt-5 max-w-[560px]">免費初步評估 30 分鐘。先聽你的產品在台灣怎麼賣，判斷值不值得出去，再談怎麼做。</p>
        <div className="mt-10 grid gap-4 sm:grid-cols-3 sm:divide-x sm:divide-bd">
          {points.map(({ icon: Icon, text }) => (
            <p key={text} className="flex items-center justify-center gap-2 text-[15px] text-tx2"><Icon size={20} className="shrink-0 text-gold-d" />{text}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <button type="button" onClick={open} className="group cursor-pointer bg-gold px-8 py-4 text-[16px] font-semibold text-navy transition-transform duration-100 hover:bg-gold-l active:scale-[.97]">
            預約 30 分鐘 <span aria-hidden="true" className="inline-block transition-transform duration-150 group-hover:translate-x-[3px]">→</span>
          </button>
          <Link href="/assess" className="border border-navy/15 bg-white px-8 py-4 text-[16px] font-semibold text-navy transition-colors hover:border-navy/40 active:scale-[.97]">2 分鐘處境比對</Link>
        </div>
      </div>
    </section>
  );
}
