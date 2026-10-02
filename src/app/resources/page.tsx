import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { BreadcrumbJsonLd } from "@/components/seo/StructuredData";
import { BuildingIcon, CompassIcon, FileIcon, ReceiptIcon } from "@/components/icons/LineIcons";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { SUBSIDIES } from "@/data/subsidies";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  path: "/resources",
  title: "資源 · 出海補助與工具",
  description: "正在開放的政府出海補助、案例、實務文章與比對工具——一個入口看完所有可以幫你出海的資源。",
});

export default function ResourcesPage() {
  return <>
    <BreadcrumbJsonLd items={[{ name: "首頁", path: "/" }, { name: "資源", path: "/resources" }]} />
    <div className="bg-white">
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/hero/hero-compass-1600.webp" video={HERO_VIDEOS.resources} />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60"><Link href="/" className="hover:text-white">首頁</Link><span aria-hidden="true" className="text-white/30">/</span><span className="text-white/75">資源</span></nav>
          <h1 className="h1 mb-6 max-w-[880px] text-white">出海資源中心，<br /><span className="text-gold">補助與工具一次看完</span></h1>
          <p className="lead max-w-[640px] !text-white/75">政府出海補助協助降低成本，案例、文章與比對工具提供判斷依據。每一項都能直接銜接鹿飛的服務</p>
        </div>
        <ScrollCue />
      </section>

      <section className="bg-white py-[80px] md:py-[110px]">
        <div className="lufe-container">
          <h2 className="h2 text-tx">政府出海補助</h2>
          <p className="lead mt-5 max-w-[700px]">貿易署、經濟部、中企署的出海相關計畫，鹿飛整理成適用對象、補助範圍與申請重點</p>
          <div className="mt-10">
            <div className="hidden grid-cols-[48px_1.6fr_1fr_1.2fr_1.2fr] gap-4 border-b border-bd pb-3 text-[12px] font-semibold text-tx3 md:grid"><span>編號</span><span>計畫</span><span>主管機關</span><span>額度</span><span>時程</span></div>
            {SUBSIDIES.map((subsidy) => <Link key={subsidy.slug} href={`/resources/subsidies#${subsidy.slug}`} className="grid gap-2 border-t border-bd py-5 transition-transform hover:bg-cream active:scale-[.995] md:grid-cols-[48px_1.6fr_1fr_1.2fr_1.2fr] md:gap-4">
              <span className="num text-gold-d">{subsidy.num}</span>
              <strong className="text-[16px] font-semibold text-tx">{subsidy.shortTitle}</strong>
              <span className="text-[14px] text-tx2">{subsidy.agency}</span>
              <span className="num text-[15px] text-tx">{subsidy.amount}</span>
              <span className="text-[13px] leading-[1.6] text-tx3">{subsidy.deadline}</span>
            </Link>)}
          </div>
          <Link href="/resources/subsidies" className="mt-8 inline-block text-[15px] font-semibold text-gold-d hover:text-navy">看完整補助整理 →</Link>
        </div>
      </section>

      <section className="bg-cream py-[80px] md:py-[110px]">
        <div className="lufe-container">
          <h2 className="h2 mb-10 text-tx">做決定之前，<br /><span className="text-gold-d">還可以先看這些</span></h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ExploreTile href="/cases" icon={<BuildingIcon size={22} />} eyebrow="案例" title="實際做過的案子" description="每個案例的完整過程：卡在哪、怎麼判斷、後來怎麼走" action="看案例 →" />
            <ExploreTile href="/insights" icon={<FileIcon size={22} />} eyebrow="洞察與指南" title="市場與法規的實務文章" description="依出海階段整理的分析與實務指南" action="讀文章 →" />
            <ExploreTile href="/assess" icon={<CompassIcon size={22} />} eyebrow="處境比對" title="2 分鐘找到最像你的案例" description="三個問題，比對鹿飛做過的案例與當時的判斷方法" action="開始比對 →" />
            <ExploreTile href="https://tradepiloter.com" icon={<ReceiptIcon size={22} />} eyebrow="TradePilot" title="線上關稅查詢工具" description="鹿飛自主開發，出口前先把稅則查清楚" action="前往 TradePilot ↗" external />
          </div>
        </div>
      </section>
    </div>
  </>;
}

function ExploreTile({ href, icon, eyebrow, title, description, action, external = false }: {
  readonly href: string;
  readonly icon: ReactNode;
  readonly eyebrow: string;
  readonly title: string;
  readonly description: string;
  readonly action: string;
  readonly external?: boolean;
}) {
  const className = "group flex min-h-[280px] flex-col border border-bd bg-white p-7 transition-[border-color,transform] active:scale-[.985] md:p-8 [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-gold";
  const content = <><span className="grid h-10 w-10 place-items-center border border-gold/40 text-gold-d">{icon}</span><p className="mt-6 text-[13px] font-semibold text-gold-d">{eyebrow}</p><h3 className="h3 mt-2 text-tx">{title}</h3><p className="mt-3 text-[15px] leading-[1.8] text-tx2">{description}</p><span className="mt-auto pt-8 text-[15px] font-semibold text-navy"><span className="inline-block transition-transform [@media(hover:hover)]:group-hover:translate-x-1">{action}</span></span></>;

  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" aria-label="前往 TradePilot（另開新分頁）" className={className}>{content}</a>
    : <Link href={href} className={className}>{content}</Link>;
}
