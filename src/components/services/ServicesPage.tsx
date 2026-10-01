"use client";

import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { Reveal } from "@/components/Reveal";
import { ScrollCue } from "@/components/ScrollCue";
import { Disclosure } from "@/components/ui";
import { CHAPTERS, PHILIPPINES_CHAPTER_KEYS } from "@/data/chapters";
import { SERVICE_FAQS } from "@/data/serviceFaqs";

import { ContactButton } from "./ContactButton";

export { SERVICE_FAQS } from "@/data/serviceFaqs";

const heroStats = [
  { value: "4", label: "個章節 · 菲律賓" },
  { value: "42+", label: "躍馬企業 · 年物流底層" },
  { value: "500+", label: "出口案件" },
  { value: "30+", label: "國家覆蓋" },
] as const;

export function ServicesPage() {
  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/services/services-hero-dhl.jpg" position="center" />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <div className="min-w-0 max-w-[760px]">
            <nav aria-label="Breadcrumb" className="mb-7 text-[13px] text-white/55"><Link href="/" className="hover:text-white">首頁</Link><span className="mx-2 text-white/30">/</span><span className="text-white/80">服務</span></nav>
            <h1 className="h1 max-w-[760px] text-white">一家品牌在馬尼拉的第一年</h1>
            <p className="lead mt-5 max-w-[720px] !text-white/75">市場探查、寄賣、公司落地、海外客服——同一家公司在不同月份會遇到的四件事，我們做成四個方案。可以只走第一章，也可以一路走完。北美零售通路另由北美專責團隊規劃執行。底下是躍馬企業 42 年的物流，貨怎麼過去不用另外找人。</p>
            <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-6 border-t border-white/15 pt-6 md:grid-cols-4">
              {heroStats.map((stat) => <div key={stat.label}><p className="num text-[30px] leading-none text-gold">{stat.value}</p><p className="mt-2 text-[12px] leading-[1.5] text-white/55">{stat.label}</p></div>)}
            </div>
          </div>
        </div>
        <ScrollCue />
      </section>

      <section className="bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <Reveal className="lufe-service-list divide-y divide-bd border-y border-bd">
            {PHILIPPINES_CHAPTER_KEYS.map((key) => {
              const chapter = CHAPTERS[key];
              const overview = chapter.overview;
              if (!overview) return null;
              return <Link key={key} href={chapter.path} className="lufe-service-chapter grid gap-5 py-7 md:grid-cols-[minmax(0,1fr)_auto] md:px-5"><div><p className="text-[14px] font-semibold text-gold-d">{chapter.label} · {overview.price}</p><p className="mt-4 whitespace-pre-line text-[16px] leading-[1.85] text-tx2">{overview.body}</p><p className="mt-4 text-[15px] font-semibold text-sky">{overview.linkLabel}</p></div><span className="lufe-service-price" aria-hidden="true">{overview.price}</span><span aria-hidden="true" className="self-center text-[28px] text-gold-d">→</span></Link>;
            })}
          </Reveal>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container"><h2 className="h2 mb-8 text-tx">兩個故事：菲律賓的第一年，北美的貨架</h2><Reveal className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2"><article className="lufe-card border border-bd bg-white p-6 md:p-8"><p className="text-[14px] font-semibold text-sky">菲律賓 · 第一年四章</p><h3 className="h3 mt-4 text-tx">先花 1～2 萬，看馬尼拉要不要你</h3><p className="mt-4 text-[15px] leading-[1.85] text-tx2">市場探查 → 寄賣 → 公司落地 → 海外客服。<br />可以只走一章，也可以一路走完。</p><p className="mt-5 text-[15px] leading-[1.85] text-tx2"><strong className="text-tx">比較像你如果：</strong>連鎖餐飲、美妝保養、美業，或任何有產品的品牌——<br />沒出過海，或出過但沒站穩。</p><p className="mt-5 text-[15px] leading-[1.85] text-tx2"><strong className="text-tx">收費：</strong>每章明碼。起手包 7 萬＝市場探查 1～2 萬＋寄賣包 5～6 萬，市場探查費可抵；<br />落地按案；客服第一次談給區間。</p></article><Link href="/services/north-america" className="lufe-card border border-bd bg-white p-6 hover:border-gold md:p-8"><p className="text-[14px] font-semibold text-gold-d">北美 · 貨架</p><h3 className="h3 mt-4 text-tx">產品成熟了，要進 Costco、Walmart、Amazon</h3><p className="mt-4 text-[15px] leading-[1.85] text-tx2">市場研究、展覽佈局、引進買家、上桌談判。<br />由北美團隊執行，鹿飛負責合約與進度。</p><p className="mt-5 text-[15px] leading-[1.85] text-tx2"><strong className="text-tx">比較像你如果：</strong>產品已經在台灣或其他市場站穩。</p><p className="mt-5 text-[15px] leading-[1.85] text-tx2"><strong className="text-tx">收費：</strong>前期低服務費＋成交抽成，第一次談給明確數字。</p></Link></Reveal></div>
      </section>

      <section className="bg-navy py-[72px] text-white md:py-[88px]"><div className="lufe-container"><p className="whitespace-pre-line text-[17px] leading-[1.9] text-white/75">{"鹿飛不是新手上路的跨境顧問。\n躍馬企業 42 年做國際貨運承攬——報關、倉儲、海空運、最後一哩，每一段都還在做。\n所以你的貨怎麼過去、證掛在哪、到岸成本大概多少，我們報得出範圍。\n也因為看了 42 年貨到了之後的事，我們才敢把「落地」跟「客服」做成方案，而不是只出一份報告。"}</p></div></section>

      <section className="bg-white py-[72px] md:py-[88px]"><div className="lufe-container"><h2 className="h2 mb-6 text-tx">三個關鍵問題</h2><div className="border-b border-bd">{SERVICE_FAQS.map((faq, index) => <Disclosure key={faq.q} id={`services-faq-${index + 1}`} defaultOpen={index === 0} summary={<span><span aria-hidden="true" className="mr-4 text-[13px] font-semibold text-gold-d">{String(index + 1).padStart(2, "0")}</span>{faq.q}</span>}><p className="whitespace-pre-line text-[15.5px] leading-[1.85] text-tx2">{faq.a}</p></Disclosure>)}</div></div></section>

      <section className="bg-navy py-[78px] text-white md:py-[96px]"><div className="lufe-container"><div className="mx-auto max-w-[720px] text-center"><h2 className="h2 text-white">想知道你該從哪一章開始？</h2><p className="mt-4 text-[16px] leading-[1.85] text-white/70">聊聊你的狀況，我們幫你看——也可能建議你再等等。不收費、不承諾、不賣課。</p><ContactButton className="mt-8 cursor-pointer bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l">聊聊你的產品 →</ContactButton></div></div></section>
    </>
  );
}
