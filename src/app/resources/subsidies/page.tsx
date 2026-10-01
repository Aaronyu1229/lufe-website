import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { Disclosure } from "@/components/ui";
import { BreadcrumbJsonLd, FaqJsonLd } from "@/components/seo/StructuredData";
import { SubsidiesCTASection } from "@/components/subsidy/SubsidiesCTASection";
import { SubsidyMatcher } from "@/components/subsidy/SubsidyMatcher";
import { SubsidyComparison, SubsidyPlanCard } from "@/components/subsidy/SubsidyPlanCard";
import { STAGE_LABELS, SUBSIDIES, SUBSIDY_CARD_COPY } from "@/data/subsidies";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/resources/subsidies",
  title: "2026 政府出海補助",
  description: "貿易署、經濟部、中企署——四個正在開放的計畫，幫台灣企業降低出海成本。鹿飛整理的實戰版本，直接告訴你哪個適合你。",
});

export const SUBSIDY_FAQS = [
  { question: "鹿飛會幫我申請補助嗎？", answer: "我們不是代辦公司。但我們能幫你把「為什麼要出海、要去哪、要怎麼做」講清楚——這剛好就是計畫書的核心。很多客戶是把我們的評估報告直接當成申請依據。" },
  { question: "我要自己寫計畫書嗎？", answer: "計畫書的主體要由你公司提出（這是規定）。但鹿飛會提供完整的市場分析、策略規劃與執行方案，讓你只要把內容整理成官方格式即可。" },
  { question: "可以同時申請多個計畫嗎？", answer: "可以。不同計畫針對不同用途，例如展覽補助不衝突海外通路布建補助。但同一筆費用不能重複請款，這是基本原則。" },
  { question: "申請通過率高嗎？", answer: "各計畫不同，但有策略、有數據、有明確商業目標的申請案明顯較容易過。鹿飛的產出剛好符合這三項——我們不會保證你一定拿到，但會把你的勝率拉到最高。" },
  { question: "如果我還沒開始出海，現在申請會不會太早？", answer: "第 4 項跨境電商輔導就是為你這種情況設計的——先用免費資源學，不用先投錢。等你有方向了再申請金額較大的計畫。" },
] as const;

export default function SubsidiesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: "首頁", path: "/" },
        { name: "資源", path: "/resources" },
        { name: "2026 政府出海補助", path: "/resources/subsidies" },
      ]} />
      <FaqJsonLd items={SUBSIDY_FAQS} />
      <div className="overflow-hidden bg-white">
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src={SUBSIDY_CARD_COPY.hero} />
        <div className="lufe-container lufe-hero-content pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <h1 className="h1 mb-8 max-w-[900px] text-white">政府在幫你出海，<br /><span className="text-gold/90">你知道怎麼拿嗎？</span></h1>
          <p className="lead mb-12 max-w-[700px] !text-white/[.72]">
            貿易署、經濟部、中企署——每年都有上億元的預算在幫台灣企業進入<span className="font-medium text-white">北美</span>和<span className="font-medium text-white">東南亞</span>兩個主戰場。
            但多數中小企業根本沒申請過，不是因為不符合資格，是因為不知道有這些計畫。
            我們替你整理了 <span className="font-medium text-white">4 個正在開放、而且和鹿飛三支柱方法論對齊</span> 的計畫。
          </p>
          <div className="grid grid-cols-2 gap-6 border-t border-white/10 pt-10 md:grid-cols-4 md:gap-10">
            <Stat num="4" label="當期開放計畫" /><Stat num="1,000萬" label="單筆最高補助額" /><Stat num="3" label="主管機關" /><Stat num="100%" label="和鹿飛服務對齊" />
          </div>
        </div>
        <ScrollCue />
      </section>

      <section className="border-y border-bd/60 bg-cream/60 py-7">
        <div className="lufe-container flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
          <p className="eyebrow shrink-0 text-gold">主管機關</p>
          <div className="flex flex-1 flex-wrap items-center gap-x-8 gap-y-2"><AgencyBadge name="國際貿易署" sub="TITA · 貿易署" /><span className="hidden h-5 w-px bg-bd md:block" /><AgencyBadge name="經濟部" sub="MOEA" /><span className="hidden h-5 w-px bg-bd md:block" /><AgencyBadge name="中小及新創企業署" sub="SMEA · 中企署" /></div>
          <p className="shrink-0 text-[11.5px] text-tx3 md:text-right">最後更新 2026.04</p>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[96px]">
        <div className="lufe-container">
          <h2 className="h2 mb-10 max-w-[780px] text-tx">補助不是額外收入，是<span className="text-gold">降低你出海的實際成本</span></h2>
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <Pillar num="01" title="錢是真的" desc="每年數億元的預算由貿易署、經濟部執行，不是畫大餅。重點是知道怎麼申請、寫對計畫書。" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.5" /><path d="M9 9C9 9 9.5 8 12 8C14.5 8 15 9.5 15 10.2C15 11.1 14 11.6 12 12.2C10 12.8 9 13.5 9 14.5C9 15.5 10 16 12 16C14 16 15 15 15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>} />
            <Pillar num="02" title="不只是申請表" desc="計畫書要和你的商業目標對齊，執行過程要有產出與報告。鹿飛的服務本身就符合大多數結案標準。" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><path d="M8 3H15L19 7V20C19 20.5523 18.5523 21 18 21H8C7.44772 21 7 20.5523 7 20V4C7 3.44772 7.44772 3 8 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M14 3V8H19" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" /><path d="M10 13L12 15L16 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg>} />
            <Pillar num="03" title="可以疊加使用" desc="同一家公司可以同時申請不同計畫——例如用展覽補助去美國展，用市場布建補助建立當地通路。" icon={<svg width="24" height="24" viewBox="0 0 24 24" fill="none"><rect x="3" y="9" width="10" height="10" stroke="currentColor" strokeWidth="1.5" /><rect x="8" y="6" width="10" height="10" stroke="currentColor" strokeWidth="1.5" /><rect x="13" y="3" width="8" height="8" stroke="currentColor" strokeWidth="1.5" /></svg>} />
          </div>
        </div>
      </section>

      <SubsidyMatcher />

      <section className="bg-white py-[72px] md:py-[96px]">
        <div className="lufe-container">
          <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="h2 max-w-[780px] text-tx">4 個計畫，對應你出海的<span className="text-gold">不同階段</span></h2>
            <p className="text-[14.5px] text-tx3 md:text-right">資料最後確認 <span className="font-medium text-tx">2026.04.23</span><br />名額有限 · 部分計畫經費用罄即止</p>
          </div>
          <SubsidyComparison subsidies={SUBSIDIES} />
          <div className="mx-auto grid max-w-[1120px] min-w-0 gap-5 md:gap-6">{SUBSIDIES.map((subsidy) => <SubsidyPlanCard key={subsidy.slug} subsidy={subsidy} />)}</div>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[96px]">
        <div className="lufe-container">
          <h2 className="h2 mb-10 max-w-[780px] text-tx">不知道哪個適合？先看你<span className="text-gold">現在在哪一步</span></h2>
          <div className="grid gap-5 md:grid-cols-3 md:gap-6">
            {(["assess", "enter", "optimize"] as const).map((stageKey) => {
              const stage = STAGE_LABELS[stageKey];
              const relevant = SUBSIDIES.filter((subsidy) => subsidy.stage === stageKey);
              return <div key={stageKey} className="min-w-0 border border-bd bg-white p-7 md:p-8"><p className="eyebrow mb-3 text-gold">{stage.label}</p><p className="mb-4 text-[16.5px] font-semibold leading-snug text-tx">{stage.desc}</p><div className="border-t border-bd/60 pt-4"><p className="eyebrow mb-2 text-tx3">適用計畫</p><ul className="grid gap-2">{relevant.length === 0 ? <li className="text-[13.5px] text-tx3">—</li> : relevant.map((subsidy) => <li key={subsidy.slug} className="text-[14.5px] leading-snug text-tx2"><Link href={`#${subsidy.slug}`} className="hover:text-gold"><span className="font-semibold text-gold">{subsidy.num}</span> {subsidy.shortTitle}</Link></li>)}</ul></div></div>;
            })}
          </div>
        </div>
      </section>

      <section className="bg-white py-[72px] md:py-[96px]">
        <div className="lufe-container">
          <h2 className="h2 mb-12 text-tx">申請前你最可能想問的事</h2>
          <div className="border-b border-bd2">{SUBSIDY_FAQS.map((faq) => <FAQItem key={faq.question} q={faq.question} a={faq.answer} />)}</div>
        </div>
      </section>

      <section className="border-t border-bd bg-cream py-[60px] md:py-[80px]">
        <div className="lufe-container flex flex-col gap-6 md:flex-row md:items-center md:justify-between"><div className="max-w-[520px]"><h3 className="h3 text-tx">補助一有更新，我們通知你</h3><p className="mt-2 text-[14.5px] leading-[1.8] text-tx2">每次有新計畫公告、金額加碼、截止日變動，鹿飛整理成一封信寄給你。不是每週轟炸，只在真的有事時才發。</p></div><div className="shrink-0"><a href="mailto:aaron.yu@reborn.in?subject=%E8%A8%82%E9%96%B1%E8%A3%9C%E5%8A%A9%E5%BF%AB%E8%A8%8A&body=%E5%B8%8C%E6%9C%9B%E6%94%B6%E5%88%B0%E9%B9%BF%E9%A3%9B%E7%9A%84%E6%94%BF%E5%BA%9C%E5%87%BA%E6%B5%B7%E8%A3%9C%E5%8A%A9%E6%9B%B4%E6%96%B0%E9%80%9A%E7%9F%A5%EF%BC%9A%0A%0A%E5%85%AC%E5%8F%B8%EF%BC%9A%0A%E5%A7%93%E5%90%8D%EF%BC%9A%0A%E4%B8%BB%E8%A6%81%E5%B8%82%E5%A0%B4%EF%BC%88%E5%8C%97%E7%BE%8E%2F%E6%9D%B1%E5%8D%97%E4%BA%9E%EF%BC%89%EF%BC%9A%0A" className="inline-flex items-center gap-2 bg-navy px-6 py-3.5 text-[14.5px] font-semibold text-white transition-colors hover:bg-navy/90">訂閱補助快訊 →</a><p className="mt-2 text-center text-[11px] text-tx3 md:text-right">寄信到 aaron.yu@reborn.in · 隨時退訂</p></div></div>
      </section>
      <SubsidiesCTASection />
      </div>
    </>
  );
}

function Stat({ num, label }: { readonly num: string; readonly label: string }) { return <div><p className="num mb-2 text-[32px] leading-none text-gold md:text-[40px]">{num}</p><p className="text-[11.5px] font-medium tracking-wider text-white/60">{label}</p></div>; }
function AgencyBadge({ name, sub }: { readonly name: string; readonly sub: string }) { return <div className="flex items-baseline gap-2.5"><span className="text-[15.5px] font-semibold tracking-[-0.2px] text-tx md:text-[16.5px]">{name}</span><span className="text-[10.5px] font-medium tracking-wider text-tx3">{sub}</span></div>; }
function Pillar({ num, title, desc, icon }: { readonly num: string; readonly title: string; readonly desc: string; readonly icon: ReactNode }) { return <div className="border border-bd bg-white p-7"><div className="mb-4 flex items-center justify-between"><div className="grid h-12 w-12 place-items-center border border-gold/30 bg-gold/[.08] text-gold-d">{icon}</div><span className="num text-[24px] text-gold">{num}</span></div><h3 className="h3 text-tx">{title}</h3><p className="mt-2 text-[15px] leading-[1.8] text-tx2">{desc}</p></div>; }
function FAQItem({ q, a }: { readonly q: string; readonly a: string }) { return <Disclosure summary={q}><p className="max-w-[720px] text-[15.5px] leading-[1.85]">{a}</p></Disclosure>; }
