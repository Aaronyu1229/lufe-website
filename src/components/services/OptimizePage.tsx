import type { ReactNode } from "react";
import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { Reveal } from "@/components/Reveal";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { FaqSection } from "@/components/faq/FaqSection";

import { ContactButton } from "./ContactButton";
import { CTA_LINE } from "@/data/cta";

export const OPTIMIZE_PAIN_POINTS = [
  {
    anchor: "opt-cost",
    title: "省不下來",
    scene: "海運報價一直漲，你沒有議價籌碼；倉儲月結單看不懂；退貨的運費比正品還貴",
    action: "我們看你的物流帳單",
  },
  {
    anchor: "opt-sales",
    title: "賣得起伏",
    scene: "節慶暴增、平常低迷；廣告一停就沒訂單；退貨率和評價忽高忽低",
    action: "我們幫你看是哪一件沒對",
  },
  {
    anchor: "opt-find",
    title: "沒被找到",
    scene: "產品在架上，但搜尋、AI 問答、社群裡都沒有你",
    action: "我們幫你看缺在哪",
  },
  {
    anchor: "opt-system",
    title: "跑得卡卡",
    scene: "台灣和當地明明同一個時間上班，事情還是對不上；SOP 散在各處，新人要很久才上手",
    action: "我們幫你把流程放進系統",
  },
  {
    anchor: "opt-dashboard",
    title: "看不見",
    scene: "每個月不知道哪裡賺、哪裡漏，決策像在猜",
    action: "把數字放到同一個畫面",
  },
] as const;

export const OPTIMIZE_SERVICES = [
  {
    title: "先談",
    timeline: "30 分鐘，不收費",
    details: [
      ["交付", "我們聽你現在的狀況，告訴你卡在哪一段、值不值得動。帶上最近的物流月結單，會看得更準"],
      ["範圍", "物流、通路、營運流程、數字"],
      ["適合", "不確定問題在哪一段的"],
    ],
  },
  {
    title: "按段做",
    timeline: "動哪一段，按那一段報價",
    details: [
      ["交付", "物流帳單盤點、營運系統導入、儀表板。通路和集客兩段，我們幫你看、幫你介紹人"],
      ["適合", "已經知道卡哪裡、要人進來一起做的"],
    ],
  },
] as const;

export const OPTIMIZE_FAQS = [
  ["沒跟你們走過第一年也可以嗎？", "可以。這一頁的方案是獨立的，第一次談我們會先問你現在的狀況。", "可以，方案獨立"],
  ["不確定自己的問題屬於哪一類？", "先聊聊。我們花 30 分鐘聽你現在的狀況，告訴你卡在哪一段、該從哪裡動。有時候我們會建議你再等等，那也是一種答案。", "先聊 30 分鐘再決定"],
  ["怎麼收費？", "第一次 30 分鐘不收費。決定要動哪一段之後，按那一段報價，第一次談就給範圍。我們不會先報價再問你需求。", "先談不收費，動哪一段報哪一段"],
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
          <h1 className="h1 mb-6 max-w-[760px] text-white">已經跑起來了，該讓每公里更省</h1>
          <p className="lead max-w-[650px] whitespace-pre-line !text-white/75">產品在海外已經賣得動，但利潤好像一直被吃掉、事情一直對不上、每個月的決定像在猜。你可能已經卡在這裡——這不是第一年的事，是走過第一年之後的事。</p>
          <ContactButton className="mt-8 cursor-pointer bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l">免費初步評估 30 分鐘 →</ContactButton>
        </div>
        <ScrollCue />
      </section>

      <div className="border-b border-bd bg-cream py-4 text-[14px] leading-[1.8] text-tx2">
        <p className="lufe-container"><strong className="text-tx">進階 ·</strong> 還沒開始的品牌，先看<Link href="/services" className="font-semibold text-sky hover:text-navy">四章</Link>。這一頁是給已經在海外跑了一段時間的人</p>
      </div>

      <section className="bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <SectionHeading>你可能已經卡在<span className="text-gold-d">這五段之一</span></SectionHeading>
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
            <SectionHeading>省不下來：<span className="text-gold-d">先看你的物流帳單</span></SectionHeading>
            <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.9] text-tx2">創辦人來自躍馬企業，背後是 43 年的國際物流。一張月結單裡哪些數字不該長那樣，我們看得出來。我們從運輸方式、倉儲位置、退貨處理三個層面重新盤點。</p>
            <p className="mt-6 border-l-4 border-gold bg-white px-5 py-4 text-[16px] font-medium leading-[1.8] text-tx">盤完，我們告訴你哪裡能省、值不值得動。不值得動的，我們會直接說。</p>
          </div>
        </div>
      </section>

      <section id="opt-sales" className="scroll-mt-[90px] bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-12">
          <div>
            <SectionHeading>賣得起伏：<span className="text-gold-d">廣告一停就沒單，通常不是廣告的問題</span></SectionHeading>
            <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.9] text-tx2">銷量跟著節慶走、廣告停了就掉、評價忽高忽低——多半是通路組合、價格帶、上架內容三件事有一件沒對。{"\n"}我們把三件事攤開來看，告訴你該調哪一個。這一段我們不代操廣告、不代管通路；要找人執行，我們幫你介紹。</p>
          </div>
          <div className="grid gap-3 border border-bd bg-cream p-5 text-[16px] font-medium text-tx"><p>通路組合</p><p>價格帶</p><p>上架內容</p></div>
        </div>
      </section>

      <section id="opt-find" className="scroll-mt-[90px] bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container grid grid-cols-1 items-center gap-8 md:grid-cols-2 md:gap-12">
          <div className="relative min-h-[260px] overflow-hidden border border-bd md:order-2"><TieredImage src="/images/insights/amazon-category-1600.webp" alt="線上通路與搜尋資料" sizes="(max-width: 767px) 100vw, 50vw" className="absolute inset-0 h-full w-full object-cover" /></div>
          <div className="md:order-1">
            <SectionHeading>沒被找到：<span className="text-gold-d">客人在問 AI，AI 沒提到你</span></SectionHeading>
            <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.9] text-tx2">越來越多人買東西前，先問 ChatGPT、Perplexity。AI 回答時沒有你的名字，客人就不知道你在架上。{"\n"}這一段我們現在不代寫、不代操。第一次談，我們幫你看缺在哪：是搜尋、是 AI 問答，還是社群；要找人做，我們幫你介紹。</p>
            <p className="mt-6 border-l-4 border-gold bg-white px-5 py-4 text-[16px] font-medium leading-[1.8] text-tx">先弄清楚缺在哪，再決定花不花錢。</p>
          </div>
        </div>
      </section>

      <section id="opt-system" className="scroll-mt-[90px] bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <SectionHeading>跑得卡卡：<span className="text-gold-d">事情都在人的腦子裡</span></SectionHeading>
          <p className="mt-5 max-w-[760px] whitespace-pre-line text-[16px] leading-[1.9] text-tx2">台灣早上九點，馬尼拉也是九點，但事情還是對不上——因為流程在人身上，不在系統裡。我們幫你導入一套營運系統，分五步：</p>
          <Reveal className="mt-7 grid grid-cols-1 gap-3 md:grid-cols-5">
            {["① 任務放進同一個看板", "② 文件和做法存成團隊知識庫", "③ 重複的事交給 AI 助手", "④ 數字放到同一個儀表板", "⑤ 每個月一起看、一起改"].map((step) => <p key={step} className="lufe-card border border-bd bg-cream p-4 text-[15px] font-medium leading-[1.7] text-tx">{step}</p>)}
          </Reveal>
          <p className="mt-7 border-l-4 border-gold bg-cream px-5 py-4 text-[16px] font-medium leading-[1.8] text-tx">目標是新人第一天就知道東西在哪、事情怎麼跑</p>
          <p className="mt-4 border-l-4 border-gold bg-cream px-5 py-4 text-[16px] font-medium leading-[1.8] text-tx">如果卡的是客訴和英文信沒人回，那是海外客服那一章的事。</p>
        </div>
      </section>

      <section id="opt-dashboard" className="scroll-mt-[90px] bg-navy py-[72px] text-white md:py-[88px]">
        <div className="lufe-container">
          <h2 className="h2 text-white">看不見：<span className="text-gold">每個月結束才知道賺沒賺</span></h2>
          <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.9] text-white/75">營運系統的第四步就是這件事：把物流、通路、客服的數字放到同一個畫面。不是為了好看，是為了下個月的決定不用猜。</p>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <SectionHeading>怎麼開始</SectionHeading>
          <Reveal className="mt-8 grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2">
            {OPTIMIZE_SERVICES.map((service) => <article key={service.title} className="lufe-card border-t-4 border-gold bg-white p-6 md:p-8"><p className="text-[14px] font-semibold text-gold-d">{service.title}</p><h3 className="h3 mt-3 text-tx">{service.timeline}</h3><div className="mt-6 grid gap-4">{service.details.map(([label, detail]) => <p key={label} className="text-[15px] leading-[1.8] text-tx2"><strong className="text-tx">{label}：</strong>{detail}</p>)}</div></article>)}
          </Reveal>
        </div>
      </section>

      <FaqSection title="常見問題" idPrefix="optimize-faq" items={OPTIMIZE_FAQS.map(([question, answer, takeaway], index) => ({ num: String(index + 1).padStart(2, "0"), question, answer, takeaway }))} className="bg-white py-[72px] md:py-[96px]" askLabel="直接問我們 →" />

      {relatedReading}

      <section className="bg-navy py-[78px] text-white md:py-[96px]">
        <div className="lufe-container"><div className="mx-auto max-w-[720px] text-center">
          <h2 className="h2 text-white">聊聊目前卡在哪一段</h2>
          <p className="mt-4 text-[16px] leading-[1.85] text-white/70">{CTA_LINE}</p>
          <ContactButton className="mt-8 cursor-pointer bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l">免費初步評估 30 分鐘 →</ContactButton>
        </div></div>
      </section>
    </>
  );
}

export function OptimizePage() {
  return <OptimizePageContent />;
}
