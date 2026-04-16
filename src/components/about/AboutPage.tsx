"use client";

import Image from "next/image";
import Link from "next/link";
import { useMessageBox } from "../MessageBox";

/* ───────── data ───────── */

const networkCards = [
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="8" width="24" height="16" rx="3" stroke="#D4A85C" strokeWidth="1.5" />
        <path d="M4 13H28" stroke="#D4A85C" strokeWidth="1.5" />
        <circle cx="8" cy="20" r="1.5" fill="#D4A85C" />
        <rect x="18" y="18" width="6" height="3" rx="1" stroke="#D4A85C" strokeWidth="1" />
      </svg>
    ),
    title: "北美通路",
    desc: "與 Costco、Walmart、Amazon 等主流通路的直接合作關係，幫你省去一層層中間人。",
    color: "gold" as const,
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="12" r="4" stroke="#5B8FA8" strokeWidth="1.5" />
        <path d="M8 26C8 21.5817 11.5817 18 16 18C20.4183 18 24 21.5817 24 26" stroke="#5B8FA8" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="24" cy="10" r="2.5" stroke="#5B8FA8" strokeWidth="1" />
        <circle cx="8" cy="10" r="2.5" stroke="#5B8FA8" strokeWidth="1" />
      </svg>
    ),
    title: "東南亞團隊",
    desc: "菲律賓、越南、泰國在地夥伴，從法規到營運都有人幫你搞定，不用自己摸索。",
    color: "sky" as const,
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="14" width="10" height="12" rx="1" stroke="#D4A85C" strokeWidth="1.5" />
        <rect x="16" y="8" width="10" height="18" rx="1" stroke="#D4A85C" strokeWidth="1.5" />
        <path d="M9 18H13M9 21H13" stroke="#D4A85C" strokeWidth="1" strokeLinecap="round" />
        <path d="M19 12H23M19 15H23M19 18H23" stroke="#D4A85C" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
    title: "國際物流",
    desc: "覆蓋 30+ 國家的物流網絡，從報關、倉儲到最後一哩配送，全程可追蹤。",
    color: "gold" as const,
  },
  {
    icon: (
      <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
        <rect x="6" y="6" width="20" height="20" rx="4" stroke="#D98B4A" strokeWidth="1.5" />
        <path d="M12 16L15 19L21 13" stroke="#D98B4A" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    title: "科技工具",
    desc: "自主開發的 TradePilot 關稅查詢工具，2,400+ 用戶使用中。用科技降低跨境的資訊門檻。",
    color: "ember" as const,
  },
];

const colorMap: Record<string, { border: string; iconBg: string }> = {
  gold: { border: "hover:border-gold", iconBg: "bg-[rgba(212,168,92,0.08)]" },
  sky: { border: "hover:border-sky", iconBg: "bg-[rgba(91,143,168,0.08)]" },
  ember: { border: "hover:border-ember", iconBg: "bg-[rgba(217,139,74,0.08)]" },
};

const beliefs = [
  {
    title: "好產品值得被世界看見",
    desc: "台灣有太多好產品，只是缺一條順暢的路。我們的工作就是幫你找到那條路。",
  },
  {
    title: "全程陪跑，不只做其中一段",
    desc: "從評估到落地，你不需要找三家公司才能走完一條路。一個團隊，一條線，全程搞定。",
  },
  {
    title: "用數據做決策，不靠猜",
    desc: "每一步都有數據支撐。我們不會叫你「先試試看」，而是先幫你搞清楚值不值得試。",
  },
];

const teamRoles = [
  {
    title: "台灣核心團隊",
    scale: "5 人",
    desc: "創辦人 Aaron 領軍，專案經理、供應鏈顧問、合規法規專家、資料分析師各司其職。每個案子都有固定窗口，不會在多家公司之間被踢皮球。",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 26C7 21.0294 11.0294 17 16 17C20.9706 17 25 21.0294 25 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="25" cy="9" r="2" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="7" cy="9" r="2" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    title: "東南亞在地夥伴",
    scale: "越南 / 菲律賓 / 泰國",
    desc: "長期合作的當地顧問與代理，熟悉當地法規、清關、通路生態。你不用自己飛一趟去找人。",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 16H27M16 5C19 8 19 24 16 27M16 5C13 8 13 24 16 27" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="22" cy="11" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "北美通路關係",
    scale: "Costco / Amazon / Walmart",
    desc: "十年累積的直接對接窗口。不是拿名片介紹，是能真的把你的產品推進買手會議的關係。",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <rect x="4" y="10" width="24" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 15H28" stroke="currentColor" strokeWidth="1.2" />
        <path d="M10 6L10 10M22 6L22 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="18" y="18" width="6" height="3" rx="0.5" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
];

const howWeWorkSteps = [
  {
    num: "01",
    title: "第一次對話（免費）",
    desc: "30–60 分鐘，我們聽你講目前的狀況、疑問、顧慮。不推銷、不承諾。聊完後如果你覺得不適合，就直接結束；適合就進入下一步。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V15C20 15.5523 19.5523 16 19 16H13L8 20V16H5C4.44772 16 4 15.5523 4 15V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "範圍確認與報價",
    desc: "我們根據你的需求，給你一份明確的服務範圍、時程、報價。所有數字都透明，沒有隱藏費用。你有 1 週時間考慮。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 8H15M9 12H15M9 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Kickoff 與執行",
    desc: "簽約後兩週內 kickoff。每週或雙週一次進度同步會，中間有問題隨時能直接 LINE 找到負責人——不用透過業務轉達。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M5 12L12 5L19 12M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "交付與後續",
    desc: "階段結束時交付完整文件與結論。我們會告訴你是否需要進入下一階段，以及為什麼。如果不需要，我們會誠實地說「就到這」。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const thingsWeDontDo = [
  {
    title: "不做純貿易買賣",
    desc: "我們不賺中間價差，也不替你採購。我們的收入來自服務費，而不是產品加價。這讓我們的建議可以完全站在你的角度。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 9C9 9 9.5 8 12 8C14.5 8 15 9.5 15 10C15 11 14 11.5 12 12C10 12.5 12 14 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "不做純物流運輸",
    desc: "物流執行我們會串接，但不是我們的主業。市面上有很多優秀的物流公司，我們不搶他們的飯碗——只會幫你找到對的那家。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="8" width="11" height="9" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M13 11H18L21 14V17H13V11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="7" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="17" cy="19" r="1.5" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "不拿股權、不投資",
    desc: "我們不參股、不當股東。這是為了避免利益綁定扭曲判斷——當我們拿股權，你就不會聽到我們說「這案子不該做」。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 20L8 14L12 17L20 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 7H20V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "不做行銷代操",
    desc: "行銷策略我們會一起規劃，但日常的廣告投放、社群運營、KOL 合作這些執行工作，建議交給專業的 marketing agency。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 11V13C3 13.5523 3.44772 14 4 14H6L11 18V6L6 10H4C3.44772 10 3 10.4477 3 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M15 9C16 10 16 14 15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 7C20 9 20 15 18 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "不賣課、不收招生費",
    desc: "我們不辦「出海大師班」、不賣線上課、不做付費講座招生。我們的工作是陪你實戰，不是做知識付費。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 7L12 3L21 7L12 11L3 7Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M7 9V14C7 14 9 16 12 16C15 16 17 14 17 14V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M21 7V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

/* ───────── component ───────── */

export function AboutPage() {
  const { open } = useMessageBox();

  return (
    <>
      {/* ─── Founder Story (executive window hero) ─── */}
      <section
        id="story"
        className="relative bg-navy text-white pt-[130px] md:pt-[170px] pb-[80px] md:pb-[100px] px-5 md:px-10 overflow-hidden scroll-mt-[80px]"
      >
        {/* Executive window photo — conveys senior, reflective experience */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/about/about-hero-executive.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-[65%_center] opacity-[0.35] animate-hero-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/35" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/40 via-transparent to-navy" />
          {/* Light sweep */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 -left-1/3 w-1/3 pointer-events-none animate-hero-light-sweep"
            style={{
              background:
                "linear-gradient(105deg, transparent 0%, rgba(255,255,255,0.04) 40%, rgba(212,168,92,0.08) 50%, rgba(255,255,255,0.04) 60%, transparent 100%)",
            }}
          />
        </div>

        {/* Soft gold glow — with pulse */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none animate-hero-glow-pulse"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 15% 10%, rgba(212,168,92,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-[1200px] mx-auto">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-7 text-[11px] font-medium tracking-[1px] text-white/50">
            <Link href="/" className="hover:text-gold transition-colors">首頁</Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/75">關於我們</span>
          </nav>

          {/* Headline */}
          <h1 className="font-heading text-[clamp(34px,5vw,58px)] leading-[1.1] font-light tracking-[-0.8px] mb-7 max-w-[920px]">
            協助台灣企業
            <br />
            在<span className="font-normal text-gold">北美</span>與
            <span className="font-normal text-gold">東南亞</span>落地
          </h1>

          {/* Signature quote */}
          <p className="text-[17px] md:text-[18px] text-white/60 max-w-[640px] font-light leading-[1.8] italic mb-12">
            「別人幫你開車，我們幫你找路。」
          </p>

          {/* Founder block — larger, with stats row */}
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-10 border-l-[3px] border-gold pl-6 md:pl-8 py-3 max-w-[780px]">
            <div className="relative w-[128px] h-[128px] md:w-[148px] md:h-[148px] rounded-full overflow-hidden shrink-0 shadow-xl shadow-gold/25 ring-[1.5px] ring-gold/60">
              <Image
                src="/images/about/aaron-portrait.jpg"
                alt="Aaron Yu — 鹿飛 LUFÉ 創辦人"
                fill
                sizes="148px"
                className="object-cover object-[center_18%]"
                priority
              />
            </div>
            <div className="flex-1">
              <div className="text-[22px] md:text-[24px] font-semibold leading-tight">Aaron Yu</div>
              <div className="text-[15.5px] md:text-[16.5px] text-gold font-medium mt-1">
                鹿飛 LUFÉ 創辦人
              </div>
              <p className="text-[14.5px] md:text-[15px] text-white/55 font-normal mt-3 leading-[1.8] max-w-[480px]">
                從國際物流第一線走到全程跨境陪跑。四十二年，五百多個案子，三十多個國家——這些不是數字，是我看過多少產品走對、走錯、走回頭路的經驗值。
              </p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="border-t border-white/10 pt-7 grid grid-cols-3 gap-5 md:gap-10 max-w-[780px]">
            {[
              { n: "42+", l: "年國際物流實戰" },
              { n: "500+", l: "出口案件" },
              { n: "30+", l: "國家覆蓋" },
            ].map((s) => (
              <div key={s.l}>
                <div className="font-heading text-[26px] md:text-[30px] font-light text-gold leading-none tabular-nums">
                  {s.n}
                </div>
                <div className="text-[11px] md:text-[11.5px] text-white/50 mt-1.5 tracking-[0.5px]">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Story: 3 parts · 圖文交錯 ─── */}
      <section className="bg-navy text-white py-[80px] md:py-[110px] px-5 md:px-10 border-t border-white/5 overflow-hidden">
        <div className="max-w-[1100px] mx-auto">
          <div className="w-12 h-px bg-gold/60 mb-10 md:mb-14" />

          <div className="space-y-14 md:space-y-20">
            {/* 看到問題 — 圖左文右 */}
            <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-8 md:gap-12 items-center">
              <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/about/aaron-workshop.jpg"
                  alt="Aaron 在工作坊上分享跨境實戰觀察"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-[center_30%]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-navy/30 via-transparent to-navy/50"
                />
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="block w-5 h-px bg-gold" />
                  <span className="text-[10px] font-semibold tracking-[2px] uppercase text-gold/90">
                    01
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-[14.5px] font-semibold tracking-wider text-gold uppercase mb-4">
                  看到的問題
                </h2>
                <p className="text-[16.5px] md:text-[17px] text-white/75 leading-[1.9] font-normal">
                  在國際物流業做了十多年，我看到太多好產品倒在跨境這條路上——不是產品不好，是沒人幫他們把路走通。
                  找顧問只做評估、找貿易商只管買賣、找物流公司只跑運輸、找代操公司只買工具。每一段都有人做，但沒有人幫你串起來。
                  企業自己得當專案經理，在三四家公司之間來回溝通，效率極低，成本極高。
                </p>
              </div>
            </div>

            {/* 相信什麼 — 圖右文左 */}
            <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-8 md:gap-12 items-center">
              <div className="md:order-1">
                <h2 className="text-[14.5px] font-semibold tracking-wider text-gold uppercase mb-4">
                  相信的事
                </h2>
                <p className="text-[16.5px] md:text-[17px] text-white/75 leading-[1.9] font-normal">
                  我相信每一家有好產品的台灣公司，都值得試試走向海外。不是每個產品都適合，但至少應該有人幫你搞清楚。
                  跨境不應該是一場冒險，而應該是一次有計畫的探索——用三個維度判斷：這個市場的
                  <span className="text-white/90 font-medium">勝率</span>（產品適配）、
                  <span className="text-white/90 font-medium">潛力</span>（通路銷售）、
                  <span className="text-white/90 font-medium">成功率</span>（團隊體質）。有人帶路、有框架可用，風險就小了一半。
                </p>
              </div>
              <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden md:order-2">
                <Image
                  src="/images/about/story-belief-compass.jpg"
                  alt="羅盤放在世界地圖上 — 有計畫的探索"
                  fill
                  sizes="(max-width: 768px) 100vw, 35vw"
                  className="object-cover"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-navy/30 via-transparent to-navy/50"
                />
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="block w-5 h-px bg-gold" />
                  <span className="text-[10px] font-semibold tracking-[2px] uppercase text-gold/90">
                    02
                  </span>
                </div>
              </div>
            </div>

            {/* 做了什麼 — 圖左文右 */}
            <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-8 md:gap-12 items-center">
              <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/about/aaron-news-interview.jpg"
                  alt="台視新聞訪問躍馬企業市場經理 — 真實業界背書"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover object-[42%_center]"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-br from-navy/30 via-transparent to-navy/50"
                />
                <div className="absolute left-5 top-5 flex items-center gap-2">
                  <span className="block w-5 h-px bg-gold" />
                  <span className="text-[10px] font-semibold tracking-[2px] uppercase text-gold/90">
                    03
                  </span>
                </div>
              </div>
              <div>
                <h2 className="text-[14.5px] font-semibold tracking-wider text-gold uppercase mb-4">
                  做了什麼
                </h2>
                <p className="text-[16.5px] md:text-[17px] text-white/75 leading-[1.9] font-normal">
                  所以我創立了鹿飛——一個用三支柱方法論幫台灣企業落地的跨境團隊。
                  從產品適配、通路銷售到團隊體質，三個支柱全程自營；底下還有<a href="https://jumping.group" target="_blank" rel="noopener noreferrer" className="text-gold underline underline-offset-4 decoration-gold/40 hover:decoration-gold transition-colors">躍馬企業</a> 42 年的國際物流實戰當基礎。
                  主要戰場是<span className="text-white/90 font-medium">北美</span>和
                  <span className="text-white/90 font-medium">東南亞</span>——兩個地方我們每個月都真的有人在現場。
                  別人幫你開車，我們幫你找路。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Team Structure ─── */}
      <section
        id="team"
        className="bg-cream py-[72px] px-5 md:px-10 border-t border-b border-bd/40 scroll-mt-[80px]"
      >
        <div className="max-w-[900px] mx-auto">
          <h2 className="section-heading">
            不是 Aaron 一個人，
            <br />
            是一個<span className="text-gold-d font-normal">小而精</span>的團隊 + 全球節點
          </h2>
          <p className="section-desc">
            我們刻意不做大型顧問公司。規模保持在能讓創辦人親自過目每一個案子，
            同時又有足夠的專業分工與在地夥伴支援。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {teamRoles.map((role) => (
              <div
                key={role.title}
                className="group bg-white border border-bd p-6 rounded-none transition-all hover:border-gold hover:shadow-[0_8px_28px_rgba(16,27,48,0.07)]"
              >
                <div className="w-12 h-12 rounded-none bg-[rgba(212,168,92,0.08)] border border-gold-d/25 flex items-center justify-center text-gold-d mb-4 group-hover:bg-[rgba(212,168,92,0.14)] transition-colors">
                  {role.icon}
                </div>
                <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-gold-d mb-2">
                  {role.scale}
                </div>
                <h3 className="text-[17px] font-semibold mb-2 leading-tight">
                  {role.title}
                </h3>
                <p className="text-[14.5px] text-tx2 font-normal leading-[1.8]">
                  {role.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-[14.5px] text-tx3 font-normal italic">
            * 我們的定位是「小型精品 + 全球網絡」——不是萬人顧問公司，也不是 solo freelancer。
          </div>
        </div>
      </section>

      {/* ─── How We Work ─── */}
      <section
        id="how-we-work"
        className="bg-white py-[80px] px-5 md:px-10 scroll-mt-[80px]"
      >
        <div className="max-w-[900px] mx-auto">
          <h2 className="section-heading">
            從第一次對話到交付，<span className="text-gold-d font-normal">四個階段</span>
          </h2>
          <p className="section-desc">
            我們的流程很清楚——每一步你都知道接下來會發生什麼、要做什麼、需要多久。
          </p>

          <div className="space-y-5 mt-10">
            {howWeWorkSteps.map((step) => (
              <div
                key={step.num}
                className="group flex items-start gap-5 md:gap-7 p-5 md:p-7 bg-cream rounded-none border-l-4 border-gold/40 hover:border-gold-d transition-colors"
              >
                <div className="flex flex-col items-center gap-2 shrink-0">
                  <span className="font-sans text-[28px] md:text-[32px] font-light text-gold-d tabular-nums leading-none">
                    {step.num}
                  </span>
                  <div className="w-10 h-10 rounded-full border border-gold-d/30 flex items-center justify-center text-gold-d bg-white/60 group-hover:bg-white transition-colors">
                    {step.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-[18px] md:text-[20px] font-semibold mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[15px] md:text-[16px] text-tx2 leading-[1.8] font-normal">
                    {step.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Resource Network (with Saigon night overlay strip) ─── */}
      <section
        id="network"
        className="bg-white py-[80px] px-5 md:px-10 scroll-mt-[80px] border-t border-bd/40"
      >
        <div className="max-w-[900px] mx-auto">
          {/* Hero strip — Saigon Bitexco night cityscape as a wide banner */}
          <div className="relative w-full h-[160px] md:h-[200px] mb-10 overflow-hidden">
            <Image
              src="/images/about/network-saigon-night.jpg"
              alt="西貢金融塔 Bitexco 夜景 — LUFÉ 東南亞網絡的象徵"
              fill
              sizes="(max-width: 900px) 100vw, 900px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/40 to-transparent flex items-center">
              <div className="pl-6 md:pl-10">
                <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-gold mb-2">
                  全球節點
                </div>
                <div className="text-white text-[17px] md:text-[21px] font-light tracking-[-0.3px] leading-tight">
                  30+ 國家 · 500+ 出口案件 · 10 年實戰
                </div>
              </div>
            </div>
          </div>
          <h2 className="section-heading">
            你不只是找到一家公司
            <br />
            而是接上一整個網絡
          </h2>
          <p className="section-desc">
            十年累積的通路關係、在地夥伴和科技工具，全部為你的跨境計畫服務。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {networkCards.map((card) => {
              const c = colorMap[card.color];
              return (
                <div
                  key={card.title}
                  className={`p-7 bg-white rounded-none shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all hover:shadow-lg ${c.border}`}
                >
                  <div
                    className={`w-14 h-14 rounded-none ${c.iconBg} flex items-center justify-center mb-4`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="text-[18px] font-semibold mb-2">{card.title}</h3>
                  <p className="text-[15.5px] text-tx2 font-normal leading-[1.8]">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── What We Don't Do ─── */}
      <section
        id="what-we-dont-do"
        className="bg-cream py-[80px] px-5 md:px-10 scroll-mt-[80px]"
      >
        <div className="max-w-[900px] mx-auto">
          <h2 className="section-heading">
            我們<span className="text-red-500/80 font-normal">不做</span>什麼
          </h2>
          <p className="section-desc">
            專業分工比萬能重要。我們誠實告訴你哪些事不該找我們——這樣你才知道什麼時候該找我們。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-10">
            {thingsWeDontDo.map((item) => (
              <div
                key={item.title}
                className="p-6 bg-white border-l-4 border-red-300/60 rounded-none hover:border-red-400 transition-colors"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="relative w-10 h-10 rounded-none bg-red-50 border border-red-200/60 flex items-center justify-center text-red-400/80 shrink-0">
                    {item.icon}
                    <span
                      aria-hidden="true"
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <span className="block w-[130%] h-px bg-red-400/70 rotate-[-18deg]" />
                    </span>
                  </div>
                  <h3 className="text-[17px] font-semibold leading-tight pt-1.5">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[14.5px] text-tx2 leading-[1.8] font-normal pl-[52px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Brand Philosophy (with gold compass) ─── */}
      <section
        id="philosophy"
        className="relative bg-navy text-white py-[80px] px-5 md:px-10 overflow-hidden scroll-mt-[80px]"
      >
        {/* Compass bg - rich gold focal on dark */}
        <div className="absolute inset-0">
          <Image
            src="/images/about/philosophy-compass.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/65" />
        </div>

        <div className="relative max-w-[900px] mx-auto">
          <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold mb-3">
            品牌理念
          </div>
          <h2 className="font-heading text-[clamp(26px,3.2vw,38px)] leading-[1.2] font-light tracking-[-0.4px] mb-10">
            我們相信的事
          </h2>

          <div className="space-y-6">
            {beliefs.map((item, i) => (
              <div
                key={item.title}
                className="flex gap-5 items-start p-6 rounded-none bg-white/[0.04] backdrop-blur-sm border border-white/[0.08]"
              >
                <div className="w-8 h-8 rounded-none bg-gold flex items-center justify-center text-navy text-[15.5px] font-heading font-semibold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-[17px] font-semibold text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[15.5px] text-white/65 font-normal leading-[1.8]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA with team image */}
          <div className="mt-14 text-center">
            <div className="relative w-full max-w-[680px] h-[180px] mx-auto mb-8 overflow-hidden">
              <Image
                src="/images/about/aaron-teaching.jpg"
                alt="Aaron 在工作坊現場陪學員操作 — 陪跑的日常"
                fill
                sizes="(max-width: 680px) 100vw, 680px"
                className="object-cover object-[center_35%]"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/20 to-navy/75" />
            </div>
            <h3 className="text-[19px] text-white font-medium mb-2">
              想認識我們？聊聊你的跨境計畫
            </h3>
            <p className="text-[15.5px] text-white/60 font-normal mb-6">
              不確定該不該跨境？先聊聊，不收費、不承諾、不賣課。
            </p>
            <button
              onClick={open}
              className="bg-gold text-navy px-8 py-3.5 rounded-none text-[16.5px] font-semibold cursor-pointer transition-colors hover:bg-gold-l"
            >
              聊聊你的產品 →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
