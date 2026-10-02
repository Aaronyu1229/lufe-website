import type { ReactNode } from "react";
import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { Reveal } from "@/components/Reveal";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { FaqSection } from "@/components/faq/FaqSection";

import { ContactButton } from "./ContactButton";

export const OPTIMIZE_PAIN_POINTS = [
  {
    anchor: "opt-cost",
    title: "省不下來",
    scene: "海運報價每半年漲一次，你沒有議價籌碼；倉儲月結單看不懂；退貨的運費比正品還貴",
    action: "重新盤點物流結構",
  },
  {
    anchor: "opt-sales",
    title: "賣得起伏",
    scene: "節慶暴增、平常低迷；廣告一停就沒訂單；退貨率和評價忽高忽低",
    action: "通路績效調整",
  },
  {
    anchor: "opt-find",
    title: "沒被找到",
    scene: "產品在架上，但搜尋、AI 問答、社群裡都沒有你",
    action: "集客",
  },
  {
    anchor: "opt-system",
    title: "跑得卡卡",
    scene: "跨時區溝通延遲；台灣總部和在地團隊對不上；SOP 散在各處，新人培訓很久",
    action: "營運系統",
  },
  {
    anchor: "opt-dashboard",
    title: "看不見",
    scene: "每個月不知道哪裡賺、哪裡漏，決策像在猜",
    action: "儀表板",
  },
] as const;

export const OPTIMIZE_SERVICES = [
  {
    title: "先診斷",
    timeline: "2–3 週，定額診斷費",
    details: [
      ["交付", "一份診斷報告＋90 分鐘結論會議"],
      ["範圍", "供應鏈、通路績效、成本拆解、合規風險、團隊運作"],
      ["適合", "不確定問題在哪一段的"],
    ],
  },
  {
    title: "直接優化",
    timeline: "1–3 個月，月費＋績效獎金",
    details: [
      ["交付", "物流重規劃、倉儲優化、通路調整、行銷策略升級、SOP 建立與團隊訓練"],
      ["適合", "已經知道卡哪裡、要人進來一起做的"],
    ],
  },
] as const;

export const OPTIMIZE_FAQS = [
  ["沒跟你們走過第一年也可以嗎？", "可以。這一頁的方案是獨立的，第一次談我們會先問你現在的狀況。", "可以，方案獨立"],
  ["不確定自己的問題屬於哪一類？", "先聊聊。我們會花 30 分鐘聽你現在的狀況，告訴你是該先診斷，還是可以直接進優化。", "先聊 30 分鐘再決定"],
  ["怎麼收費？", "診斷是定額，優化是月費加績效。第一次談給範圍。", "診斷定額，優化月費加績效"],
] as const;

function SectionHeading({ children }: { readonly children: ReactNode }) {
  return <h2 className="h2 text-tx">{children}</h2>;
}

export function OptimizePageContent({ relatedReading }: { readonly relatedReading?: ReactNode }) {
  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/v5/optimize-1600.webp" srcSet="/images/v5/optimize-1600.webp 1600w, /images/v5/optimize-2400.webp 2400w" position="70% 30%" video={HERO_VIDEOS.optimize} />
        <div className="lufe-container lufe-hero-content pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href="/" className="hover:text-white">首頁</Link>
            <span className="text-white/30">/</span>
            <Link href="/services" className="hover:text-white">服務</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/75">運營優化</span>
          </nav>
          <p className="mb-4 text-[14px] font-semibold text-gold">進階 · 運營優化</p>
          <h1 className="h1 mb-6 max-w-[760px] text-white">已經跑起來了，該讓每公里更省</h1>
          <p className="lead max-w-[650px] whitespace-pre-line !text-white/75">產品在海外已經賣得動，但總覺得利潤被吃掉、效率上不去、決策像在猜。{"\n"}這不是第一年的事，是走過第一年之後的事</p>
          <ContactButton className="mt-8 cursor-pointer bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l">聊聊你卡在哪一段 →</ContactButton>
        </div>
        <ScrollCue />
      </section>

      <div className="border-b border-bd bg-cream py-4 text-[14px] leading-[1.8] text-tx2">
        <p className="lufe-container"><strong className="text-tx">進階 ·</strong> 還沒開始的品牌，先看<Link href="/services" className="font-semibold text-sky hover:text-navy">四章</Link>。這一頁是給已經在海外跑了一段時間的人</p>
      </div>

      <section className="bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <SectionHeading>最常卡在<span className="text-gold-d">這五段之一</span></SectionHeading>
          <Reveal className="mt-8 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-5">
            {OPTIMIZE_PAIN_POINTS.map((point) => (
              <Link key={point.anchor} href={`#${point.anchor}`} className="lufe-card border border-bd bg-cream p-5 hover:border-gold hover:bg-white">
                <h3 className="h3 text-tx">{point.title}</h3>
                <p className="mt-3 text-[14px] leading-[1.8] text-tx2">{point.scene}</p>
                <p className="mt-5 text-[14px] font-semibold text-sky">→ {point.action}</p>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section id="opt-cost" className="scroll-mt-[90px] bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative min-h-[260px] overflow-hidden border border-bd md:order-2"><TieredImage src="/images/services/services-optimize-whiteboard-1600.webp" alt="檢視物流與營運資料" sizes="(max-width: 767px) 100vw, 50vw" className="absolute inset-0 h-full w-full object-cover" /></div>
          <div className="md:order-1">
            <p className="text-[14px] font-semibold text-gold-d">01</p>
            <SectionHeading>省不下來：<span className="text-gold-d">先看你的物流帳單</span></SectionHeading>
            <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.9] text-tx2">我們是做物流出身的，最知道一張月結單裡哪些數字不該長那樣。{"\n"}從運輸方式、倉儲位置、退貨處理三個層面重新盤點</p>
            <p className="mt-6 border-l-4 border-gold bg-white px-5 py-4 text-[16px] font-medium leading-[1.8] text-tx">盤完通常都有可省的空間，數字第一次談給你範圍</p>
          </div>
        </div>
      </section>

      <section id="opt-sales" className="scroll-mt-[90px] bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-12">
          <div>
            <p className="text-[14px] font-semibold text-gold-d">02</p>
            <SectionHeading>賣得起伏：<span className="text-gold-d">廣告一停就沒單，通常不是廣告的問題</span></SectionHeading>
            <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.9] text-tx2">銷量跟著節慶走、廣告停了就掉、評價忽高忽低——{"\n"}多半是通路組合、價格帶、上架內容三件事有一件沒對。{"\n"}我們把三件事攤開來看，再決定調哪一個</p>
          </div>
          <div className="grid gap-3 border border-bd bg-cream p-5 text-[16px] font-medium text-tx"><p>通路組合</p><p>價格帶</p><p>上架內容</p></div>
        </div>
      </section>

      <section id="opt-find" className="scroll-mt-[90px] bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative min-h-[260px] overflow-hidden border border-bd md:order-2"><TieredImage src="/images/insights/amazon-category-1600.webp" alt="線上通路與搜尋資料" sizes="(max-width: 767px) 100vw, 50vw" className="absolute inset-0 h-full w-full object-cover" /></div>
          <div className="md:order-1">
            <p className="text-[14px] font-semibold text-gold-d">03</p>
            <SectionHeading>沒被找到：<span className="text-gold-d">客人在問 AI，AI 沒提到你</span></SectionHeading>
            <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.9] text-tx2">越來越多人買東西前先問 ChatGPT、Perplexity。{"\n"}SEO 文章月產 30 篇以上 + AI 搜尋引擎佈局（AIO），讓 ChatGPT、Perplexity 在回答相關問題時推薦你的品牌</p>
            <p className="mt-6 border-l-4 border-gold bg-white px-5 py-4 text-[16px] font-medium leading-[1.8] text-tx">目標是讓 AI 回答時有你的名字</p>
          </div>
        </div>
      </section>

      <section id="opt-system" className="scroll-mt-[90px] bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <p className="text-[14px] font-semibold text-gold-d">04</p>
          <SectionHeading>跑得卡卡：<span className="text-gold-d">事情都在人的腦子裡</span></SectionHeading>
          <p className="mt-5 max-w-[760px] whitespace-pre-line text-[16px] leading-[1.9] text-tx2">台灣早上九點，馬尼拉也是九點，但事情還是對不上——{"\n"}因為流程在人身上，不在系統裡。{"\n\n"}一套五階導入的營運作業系統：</p>
          <Reveal className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-5">
            {["① Notion 任務管理", "② AI 複利知識庫", "③ AI 數位員工", "④ 事業營運儀表板", "⑤ 團隊創新共創"].map((step) => <p key={step} className="lufe-card border border-bd bg-cream p-4 text-[15px] font-medium leading-[1.7] text-tx">{step}</p>)}
          </Reveal>
          <p className="mt-7 border-l-4 border-gold bg-cream px-5 py-4 text-[16px] font-medium leading-[1.8] text-tx">目標是新人第一天就知道東西在哪、事情怎麼跑</p>
        </div>
      </section>

      <section id="opt-dashboard" className="scroll-mt-[90px] bg-navy py-[72px] text-white md:py-[88px]">
        <div className="lufe-container">
          <p className="text-[14px] font-semibold text-gold">05</p>
          <h2 className="h2 text-white">看不見：<span className="text-gold">每個月結束才知道賺沒賺</span></h2>
          <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.9] text-white/75">五階裡的第四階就是這件事：把物流、通路、客服的數字放到同一個畫面。{"\n"}不是為了好看，是為了下個月的決定不用猜</p>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <SectionHeading>兩種合作方式</SectionHeading>
          <Reveal className="mt-8 grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
            {OPTIMIZE_SERVICES.map((service) => <article key={service.title} className="lufe-card border-t-4 border-gold bg-white p-6 md:p-8"><p className="text-[14px] font-semibold text-gold-d">{service.title}</p><h3 className="h3 mt-3 text-tx">{service.timeline}</h3><div className="mt-6 grid gap-4">{service.details.map(([label, detail]) => <p key={label} className="text-[15px] leading-[1.8] text-tx2"><strong className="text-tx">{label}：</strong>{detail}</p>)}</div></article>)}
          </Reveal>
        </div>
      </section>

      <FaqSection title="常見問題" idPrefix="optimize-faq" items={OPTIMIZE_FAQS.map(([question, answer, takeaway], index) => ({ num: String(index + 1).padStart(2, "0"), question, answer, takeaway }))} className="bg-white py-[72px] md:py-[96px]" />

      {relatedReading}

      <section className="bg-navy py-[78px] text-white md:py-[96px]">
        <div className="lufe-container"><div className="mx-auto max-w-[720px] text-center">
          <h2 className="h2 text-white">聊聊目前卡在哪一段</h2>
          <p className="mt-4 text-[16px] leading-[1.85] text-white/70">30 分鐘，聽你現在的狀況，告訴你該先診斷還是直接做</p>
          <ContactButton className="mt-8 cursor-pointer bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l">聊聊你的狀況 →</ContactButton>
        </div></div>
      </section>
    </>
  );
}

export function OptimizePage() {
  return <OptimizePageContent />;
}
