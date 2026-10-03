import Image from "next/image";
import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { ScrollCue } from "@/components/ScrollCue";
import { FaqSection } from "@/components/faq/FaqSection";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { SubsidiesCTASection } from "@/components/subsidy/SubsidiesCTASection";
import { SubsidyPlans } from "@/components/subsidy/SubsidyPlans";
import { SUBSIDIES, SUBSIDY_CARD_COPY } from "@/data/subsidies";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/resources/subsidies",
  title: "2026 政府出海補助",
  description: "貿易署、經濟部、外貿協會——四個和出海直接相關的計畫，幫台灣企業降低出海成本。鹿飛整理的實戰版本，直接告訴你哪個適合你。",
});

export const SUBSIDY_FAQS = [
  { question: "鹿飛會幫我申請補助嗎？", answer: "我們不是代辦公司。但我們能幫你把「為什麼要出海、要去哪、要怎麼做」講清楚——這剛好就是計畫書的核心。很多客戶是把我們的評估報告直接當成申請依據。" },
  { question: "我要自己寫計畫書嗎？", answer: "計畫書的主體要由你公司提出（這是規定）。但鹿飛會提供完整的市場分析、策略規劃與執行方案，讓你只要把內容整理成官方格式即可。" },
  { question: "可以同時申請多個計畫嗎？", answer: "可以。不同計畫針對不同用途，例如展覽補助不衝突海外通路布建補助。但同一筆費用不能重複請款，這是基本原則。" },
  { question: "申請通過率高嗎？", answer: "各計畫不同，但有策略、有數據、有明確商業目標的申請案明顯較容易過。鹿飛的產出剛好符合這三項——我們不會保證你一定拿到，但會把你的勝率拉到最高。" },
  { question: "如果我還沒開始出海，現在申請會不會太早？", answer: "第 4 項跨境電商輔導就是為你這種情況設計的——先用免費資源學，不用先投錢。等你有方向了再申請金額較大的計畫。" },
] as const;

export default function SubsidiesPage() {
  const now = new Date();

  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "首頁", path: "/" },
        { name: "資源", path: "/resources" },
        { name: "2026 政府出海補助", path: "/resources/subsidies" },
      ]} />
      <FaqJsonLd items={SUBSIDY_FAQS} />
      <div className="bg-white">
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src={SUBSIDY_CARD_COPY.hero} video={HERO_VIDEOS.subsidies} />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60"><Link href="/" className="hover:text-white">首頁</Link><span aria-hidden="true" className="text-white/30">/</span><Link href="/resources" className="hover:text-white">資源</Link><span aria-hidden="true" className="text-white/30">/</span><span className="text-white/75">2026 政府出海補助</span></nav>
          <h1 className="h1 mb-6 max-w-[880px] text-white">政府在幫你出海，<br /><span className="text-gold">你知道怎麼拿嗎？</span></h1>
          <p className="lead max-w-[640px] !text-white/75">
            貿易署、經濟部、中企署——每年都有上億元的預算在幫台灣企業進入<span className="font-medium text-white">北美</span>和<span className="font-medium text-white">東南亞</span>兩個主戰場。
            但多數中小企業根本沒申請過，不是因為不符合資格，是因為不知道有這些計畫
            我們替你整理了 <span className="font-medium text-white">4 個</span>計畫
          </p>
        </div>
        <ScrollCue />
      </section>

      <section className="border-y border-bd/60 bg-cream/60 py-7">
        <div className="lufe-container flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          <div className="flex flex-1 flex-wrap items-center justify-center gap-x-12 gap-y-5 opacity-80 md:justify-start">
            <Image src="/images/logo/agencies/tita.png" alt="經濟部國際貿易署" width={460} height={61} className="h-7 w-auto md:h-8" />
            <span className="flex items-center gap-2.5" role="img" aria-label="經濟部"><Image src="/images/logo/agencies/moea-mark.png" alt="" width={97} height={96} className="h-7 w-auto md:h-8" /><span className="text-[20px] font-semibold tracking-[0.12em] text-tx md:text-[22px]">經濟部</span></span>
            <Image src="/images/logo/agencies/smea.png" alt="經濟部中小及新創企業署" width={391} height={55} className="h-7 w-auto md:h-8" />
          </div>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[96px]">
        <div className="lufe-container">
          <h2 className="h2 mb-10 max-w-[780px] text-tx">補助不是額外收入，是<span className="text-gold">降低你出海的實際成本</span></h2>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <Pillar title="錢是真的" desc="每年數億元的預算由貿易署、經濟部執行，不是畫大餅。重點是知道怎麼申請、寫對計畫書" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M9 9C9 9 9.5 8 12 8C14.5 8 15 9.5 15 10.2C15 11.1 14 11.6 12 12.2C10 12.8 9 13.5 9 14.5C9 15.5 10 16 12 16C14 16 15 15 15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>} />
            <Pillar title="不只是申請表" desc="計畫書要和你的商業目標對齊，執行過程要有產出與報告。鹿飛的服務本身就符合大多數結案標準" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 3H15L19 7V20C19 20.5523 18.5523 21 18 21H8C7.44772 21 7 20.5523 7 20V4C7 3.44772 7.44772 3 8 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M14 3V8H19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M10 13L12 15L16 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>} />
            <Pillar title="可以疊加使用" desc="同一家公司可以同時申請不同計畫——例如用展覽補助去美國展，用市場布建補助建立當地通路" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="9" width="10" height="10" stroke="currentColor" strokeWidth="1.5" /><rect x="8" y="6" width="10" height="10" stroke="currentColor" strokeWidth="1.5" /><rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" /></svg>} />
          </div>
        </div>
      </section>

      <SubsidyPlans subsidies={SUBSIDIES} now={now} />

      <FaqSection title="申請前你最可能想問的事" idPrefix="subsidy-faq" items={SUBSIDY_FAQS.map((faq, index) => ({ num: String(index + 1).padStart(2, "0"), question: faq.question, answer: faq.answer }))} className="bg-white py-[72px] md:py-[96px]" />

      <section className="border-t border-bd bg-cream py-[60px] md:py-[80px]">
          <div className="lufe-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="max-w-[520px]"><h3 className="h3 text-tx">補助一有更新，我們通知你</h3><p className="mt-2 text-[14.5px] leading-[1.8] text-tx2">每次有新計畫公告、金額加碼、截止日變動，鹿飛整理成一封信寄給你。不是每週轟炸，只在真的有事時才發</p></div><div className="shrink-0"><a href="mailto:aaron.yu@reborn.in?subject=%E8%A8%82%E9%96%B1%E8%A3%9C%E5%8A%A9%E5%BF%AB%E8%A8%8A&body=%E5%B8%8C%E6%9C%9B%E6%94%B6%E5%88%B0%E9%B9%BF%E9%A3%9B%E7%9A%84%E6%94%BF%E5%BA%9C%E5%87%BA%E6%B5%B7%E8%A3%9C%E5%8A%A9%E6%9B%B4%E6%96%B0%E9%80%9A%E7%9F%A5%EF%BC%9A%0A%0A%E5%85%AC%E5%8F%B8%EF%BC%9A%0A%E5%A7%93%E5%90%8D%EF%BC%9A%0A%E4%B8%BB%E8%A6%81%E5%B8%82%E5%A0%B4%EF%BC%88%E5%8C%97%E7%BE%8E%2F%E6%9D%B1%E5%8D%97%E4%BA%9E%EF%BC%89%EF%BC%9A%0A" className="inline-flex items-center gap-2 bg-navy px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-navy/90">訂閱補助快訊 →</a><p className="mt-2 text-center text-[11px] text-tx3 md:text-right">寄信到 aaron.yu@reborn.in · 隨時退訂</p></div></div>
      </section>
      <SubsidiesCTASection />
      </div>
    </>
  );
}

function Pillar({ title, desc, icon }: { readonly title: string; readonly desc: string; readonly icon: ReactNode }) { return <div className="border border-bd bg-white p-7"><div className="mb-4 flex items-center justify-between"><div className="grid h-12 w-12 place-items-center border border-gold/40 text-gold-d">{icon}</div></div><h3 className="h3 text-tx">{title}</h3><p className="mt-2 text-[15px] leading-[1.8] text-tx2">{desc}</p></div>; }
