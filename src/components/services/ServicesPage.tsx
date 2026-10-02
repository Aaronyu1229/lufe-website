"use client";

import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { BuildingIcon, PackageIcon, TargetIcon, UsersIcon } from "@/components/icons/LineIcons";
import { FaqSection } from "@/components/faq/FaqSection";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { SERVICE_FAQS } from "@/data/serviceFaqs";

import { ContactButton } from "./ContactButton";

export { SERVICE_FAQS } from "@/data/serviceFaqs";

type ChapterTile = {
  readonly month: string;
  readonly name: string;
  readonly line: string;
  readonly href: string;
  readonly image: string;
  readonly alt: string;
  readonly maxTierWidth?: number;
  readonly badge?: string;
};

const CHAPTER_TILES: readonly ChapterTile[] = [
  {
    month: "第一個月",
    name: "市場探查",
    line: "用當地真實消費者的反應，決定要不要往下走",
    href: "/services/product-testing",
    image: "/images/hero-video/chapter-research-1600.webp",
    alt: "會議中討論圖表的團隊",
  },
  {
    month: "第三個月",
    name: "寄賣",
    line: "產品證審核期間，上架與市場活動同步推進",
    href: "/services/consignment",
    image: "/images/hero-video/chapter-warehouse-1600.webp",
    alt: "貨架上待出貨的包裹",
  },
  {
    month: "第九個月",
    name: "公司落地",
    line: "註冊、招聘、掛證，在當地建立自己的團隊",
    href: "/services/localization",
    image: "/images/hero-video/chapter-storefront-1600.webp",
    alt: "夜晚街角的咖啡店與行人",
  },
  {
    month: "之後的每一天",
    name: "海外客服",
    line: "英文客服由菲律賓專業團隊接手，服務規則由台灣端制定",
    href: "/services/call-center",
    image: "/images/hero-video/chapter-callcenter-1600.webp",
    alt: "一邊通話一邊打字的客服人員",
    maxTierWidth: 1600,
    badge: "2027 Q1 首批",
  },
];

const SERVICE_PATHS = [
  {
    href: "/services/product-testing",
    image: "/images/cases/story/bubble-tea-2-1600.webp",
    alt: "馬尼拉都會區的商業大樓街景",
    eyebrow: "菲律賓 · 第一年四章",
    eyebrowClassName: "text-sky",
    title: "先花 1～2 萬，確認市場要不要這個產品",
    line: "市場探查 → 寄賣 → 公司落地 → 海外客服，可以只走一章，也可以一路走完",
    specs: [
      ["適合", "連鎖餐飲、美妝保養、美業等有產品的品牌；沒出過海，或出過但沒站穩"],
      ["收費", "每章明碼。起手包 7 萬（市場探查 1～2 萬＋寄賣包 5～6 萬，市場探查費可抵）；落地按案；客服第一次談給區間"],
      ["第一步", "市場探查，用一頁報告決定下一步"],
    ],
    cta: "從第一章開始 →",
  },
  {
    href: "/services/north-america",
    image: "/images/hero-video/chapter-retail-1600.webp",
    alt: "超市貨架走道",
    eyebrow: "北美 · 零售通路",
    eyebrowClassName: "text-gold-d",
    title: "進入北美主流零售通路",
    line: "市場研究、展覽佈局、引進買家、上桌談判，由北美團隊執行，鹿飛負責合約與進度",
    specs: [
      ["適合", "產品已在台灣或其他市場站穩的品牌"],
      ["收費", "前期低服務費＋成交抽成，第一次談給明確數字"],
      ["時程", "平均 6～9 個月；食品保健品 9～12 個月"],
    ],
    cta: "了解北美通路拓展 →",
  },
] as const;

const CAPABILITIES = [
  {
    icon: UsersIcon,
    title: "在地消費者面板",
    body: "當地教師與家長組成的測試面板，產品上架前先取得真實反應",
  },
  {
    icon: PackageIcon,
    title: "持證進口與通路夥伴",
    body: "產品證由持證進口商代辦代持，合作電商通路與倉儲直接銜接",
  },
  {
    icon: BuildingIcon,
    title: "律師行與 HR 體系",
    body: "公司註冊、文件與招聘，由合作的律師行與 HR 體系執行",
  },
  {
    icon: TargetIcon,
    title: "台灣端專案管理",
    body: "合約、進度與品質指標由鹿飛台灣公司負責，一個窗口對接所有環節",
  },
] as const;

export function ServicesPage() {
  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/services/services-hero-dhl-1600.webp" position="center" video={HERO_VIDEOS.services} />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <div className="min-w-0 max-w-[760px]">
            <nav aria-label="Breadcrumb" className="mb-7 text-[13px] text-white/55"><Link href="/" className="hover:text-white">首頁</Link><span className="mx-2 text-white/30">/</span><span className="text-white/80">服務</span></nav>
            <h1 className="h1 max-w-[760px] text-white">一家品牌在馬尼拉的第一年</h1>
            <p className="lead mt-5 max-w-[720px] !text-white/75">市場探查、寄賣、公司落地、海外客服——企業出海第一年會遇到的四件事，鹿飛做成四個方案。可以只走一章，也可以一路走完</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <ContactButton className="inline-flex cursor-pointer items-center justify-center bg-gold px-6 py-3.5 text-[15px] font-semibold text-navy hover:bg-gold-l active:scale-[.97]">聊聊你的產品 →</ContactButton>
              <a href="#chapters" className="inline-flex items-center justify-center border border-white/40 px-6 py-3.5 text-[15px] font-medium text-white hover:border-white active:scale-[.97]">看四個章節 ↓</a>
            </div>
          </div>
        </div>
        <ScrollCue />
      </section>

      <section id="chapters" className="scroll-mt-[100px] bg-white py-[88px] md:py-[120px]">
        <div className="lufe-container">
          <h2 className="text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-[-.022em] text-navy">四個章節，按企業的節奏往前走</h2>
          <p className="lead mt-5 text-tx2">每一章獨立計價，每一章結束都能決定是否繼續</p>
          <div className="mt-12 flex min-w-0 gap-5 overflow-x-auto snap-x snap-mandatory pb-2 md:grid md:grid-cols-2 md:overflow-visible lg:grid-cols-4">
            {CHAPTER_TILES.map((tile) => (
              <Link key={tile.name} href={tile.href} aria-label="了解方案 →" className="group relative w-[82%] shrink-0 snap-start transition-transform active:scale-[.985] motion-reduce:transition-none md:w-auto">
                <div className="relative h-[2px] bg-bd">
                  <span aria-hidden="true" className="absolute -top-1 left-0 h-2.5 w-2.5 bg-gold" />
                  <span aria-hidden="true" className="absolute inset-0 origin-left scale-x-0 bg-gold transition-transform duration-300 motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-x-100 motion-reduce:group-hover:scale-x-100" />
                </div>
                <figure className="relative mt-5 aspect-[4/5] overflow-hidden">
                  <TieredImage src={tile.image} alt={tile.alt} maxTierWidth={tile.maxTierWidth} sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 82vw" loading="lazy" className="block h-full w-full object-cover transition-transform duration-[600ms] motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.04] motion-reduce:group-hover:scale-100" />
                  {tile.badge ? <span className="absolute left-0 top-0 bg-gold px-2.5 py-1 text-[12px] font-semibold text-navy">{tile.badge}</span> : null}
                </figure>
                <p className="mt-5 text-[13px] font-semibold text-gold-d">{tile.month}</p>
                <h3 className="mt-1 text-[24px] font-[650] leading-[1.3] text-tx">{tile.name}</h3>
                <p className="mt-2 text-[15px] leading-[1.75] text-tx2">{tile.line}</p>
                <p className="mt-4 text-[14px] font-semibold text-sky">了解方案 <span aria-hidden="true" className="inline-block transition-transform motion-reduce:transition-none [@media(hover:hover)]:group-hover:translate-x-[3px]">→</span></p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <h2 className="h2 text-tx">兩條出海路徑：菲律賓在地落地，北美通路拓展</h2>
          <div className="mt-8 grid min-w-0 gap-5 md:grid-cols-2">
            {SERVICE_PATHS.map((path) => (
              <Link key={path.href} href={path.href} className="group border border-bd bg-white transition-transform active:scale-[.985] [@media(hover:hover)]:hover:-translate-y-1 [@media(hover:hover)]:hover:border-gold motion-reduce:transition-none">
                <figure className="aspect-[16/9] overflow-hidden">
                  <TieredImage src={path.image} alt={path.alt} sizes="(min-width: 768px) 50vw, 100vw" loading="lazy" className="block h-full w-full object-cover transition-transform duration-[500ms] motion-reduce:transition-none [@media(hover:hover)]:group-hover:scale-[1.03] motion-reduce:group-hover:scale-100" />
                </figure>
                <div className="p-6 md:p-9">
                  <p className={`text-[14px] font-semibold ${path.eyebrowClassName}`}>{path.eyebrow}</p>
                  <h3 className="h3 mt-4 text-tx">{path.title}</h3>
                  <p className="mt-4 text-[15px] leading-[1.85] text-tx2">{path.line}</p>
                  <dl className="mt-6">
                    {path.specs.map(([term, detail]) => (
                      <div key={term} className="grid grid-cols-[72px_minmax(0,1fr)] gap-4 border-t border-bd py-4">
                        <dt className="text-[13px] font-semibold text-tx3">{term}</dt>
                        <dd className="text-[15px] leading-[1.8] text-tx2">{detail}</dd>
                      </div>
                    ))}
                  </dl>
                  <p className="mt-2 text-[15px] font-semibold text-sky">{path.cta}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy py-[88px] text-white md:py-[112px]">
        <div className="lufe-container">
          <h2 className="text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-[-.022em] text-white">一個窗口，<span className="block text-gold">串起當地的每一個執行夥伴</span></h2>
          <p className="mt-5 max-w-[680px] text-[17px] leading-[1.85] text-white/70">鹿飛負責合約、進度與品質；在地的測試、通路、法務與招聘，由長期合作的夥伴分工執行</p>
          <div className="mt-12 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {CAPABILITIES.map((capability) => {
              const Icon = capability.icon;
              return <div key={capability.title} className="bg-navy p-6 md:p-7"><span aria-hidden="true" className="grid h-10 w-10 place-items-center border border-gold/40 bg-gold/10 text-gold"><Icon size={20} /></span><h3 className="mt-5 text-[17px] font-[650] text-white">{capability.title}</h3><p className="mt-2 text-[15px] leading-[1.8] text-white/70">{capability.body}</p></div>;
            })}
          </div>
        </div>
      </section>

      <FaqSection title="選方案之前，最常被問的三件事" idPrefix="services-faq" items={SERVICE_FAQS.map((faq, index) => ({ num: String(index + 1).padStart(2, "0"), question: faq.q, answer: faq.a, takeaway: faq.takeaway }))} className="bg-white py-[72px] md:py-[96px]" />

      <section className="bg-navy py-[78px] text-white md:py-[96px]"><div className="lufe-container"><div className="mx-auto max-w-[720px] text-center"><h2 className="h2 text-white">想知道該從哪一章開始？</h2><p className="mt-4 text-[16px] leading-[1.85] text-white/70">聊聊你的狀況，我們幫你看——也可能建議你再等等。不收費、不承諾、不賣課</p><ContactButton className="mt-8 cursor-pointer bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l">聊聊你的產品 →</ContactButton></div></div></section>
    </>
  );
}
