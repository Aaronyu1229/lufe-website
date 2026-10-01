"use client";

import Image from "next/image";
import Link from "next/link";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { Reveal } from "@/components/Reveal";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { Carousel } from "@/components/ui/Carousel";
import { useMessageBox } from "../MessageBox";

export const storyCards = [
  {
    num: "01",
    title: "看到的問題",
    image: "/images/about/aaron-workshop-1600.webp",
    maxTierWidth: 2400,
    alt: "Aaron 在工作坊上分享跨境實戰觀察",
    imageClassName: "object-cover object-[center_30%]",
    copy: <>我在躍馬企業看了很多年。<br /><br />躍馬做的是把貨送出去——42 年，500 多個出口案件，30 多個國家。<br />我在裡面看的不是報表，是貨櫃出去以後的事。<br />有的品牌在當地開了第二家店。<br />更多的是幾個月後貨退回來，或者就沒有下文了。</>,
  },
  {
    num: "02",
    title: "想通的事",
    image: "/images/about/story-belief-compass-1600.webp",
    maxTierWidth: 1600,
    alt: "羅盤放在世界地圖上 — 有計畫的探索",
    imageClassName: "object-cover",
    copy: <>我後來想通一件事：差別從來不在物流，貨都有送到。<br />差別在到了之後，有沒有人接著走。<br />證有沒有人辦、架上有沒有人推、第一封英文客訴信有沒有人回。</>,
  },
  {
    num: "03",
    title: "做了什麼",
    image: "/images/about/aaron-news-interview-1080.webp",
    maxTierWidth: 1080,
    alt: "台視新聞訪問躍馬企業市場經理 — 真實業界背書",
    imageClassName: "object-cover object-[42%_center]",
    copy: <>台灣市場不夠大，這件事做生意的人都知道。出去有難度，但出得去。<br />鹿飛做的，是把貨到了之後最難的四件事做成四個方案，<br />讓第一步小到你敢踏，後面的每一步都有人在。</>,
  },
];

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
    title: "北美",
    desc: "北美團隊：研究、展覽、買家、談判。",
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
    title: "東南亞",
    desc: "菲律賓合作夥伴：教育機構、連鎖餐飲、客服團隊、律師行、持證進口商。",
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
    title: "全球物流",
    desc: "躍馬企業 42 年國際貨運承攬：報關、倉儲、海空運、最後一哩。",
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
    title: "",
    desc: "台灣市場不夠大，出去是遲早的事。早一點、小一點開始，比晚一點、大一點便宜。",
  },
  {
    title: "",
    desc: "先做最難的那一件。辦證、開公司、接客訴——最難的我們先做；做不到的，我們老實說。",
  },
  {
    title: "",
    desc: "有立場。兩個選擇都對的時候，我們會建議能讓你長大的那一個，不是省事的那一個。",
  },
  {
    title: "",
    desc: "我們不是跟你賭市場，是有做過的事。",
  },
];

const teamRoles = [
  {
    title: "台灣核心",
    scale: "",
    desc: "合約、進度、你的窗口。第一次談的人是 Aaron，之後每一章的窗口也是同一個人。",
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
    title: "菲律賓合作夥伴",
    scale: "",
    desc: "在當地經營英語教育機構與連鎖餐飲多年，市場探查面板、落地執行、客服團隊都從這裡來。",
    icon: (
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 16H27M16 5C19 8 19 24 16 27M16 5C13 8 13 24 16 27" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="22" cy="11" r="1.5" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "北美團隊",
    scale: "",
    desc: "在北美當地做研究、展覽、買家引進、談判。北美這條線由他們執行。",
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

export const howWeWorkSteps = [
  {
    num: "01",
    title: "第一次談",
    desc: "我們先聽：你的產品在台灣怎麼賣、為什麼想出去、卡在哪。不報價。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 5C4 4.44772 4.44772 4 5 4H19C19.5523 4 20 4.44772 20 5V15C20 15.5523 19.5523 16 19 16H13L8 20V16H5C4.44772 16 4 15.5523 4 15V5Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "一頁建議",
    desc: "談完給你一頁：我們覺得你該從哪一章開始，或者建議你再等等。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect x="5" y="3" width="14" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 8H15M9 12H15M9 16H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "選一章",
    desc: "你決定要不要開始、從哪一章開始。每一章都有價，都可以只買一章。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M5 12L12 5L19 12M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "一份合約",
    desc: "不管走幾章，一份合約、一個窗口、一條進度線。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M5 12L10 17L19 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "05",
    title: "每一章結束",
    desc: "你拿到那一章交出來的東西，決定要不要翻下一頁。",
  },
];

export const thingsWeDontDo = [
  {
    title: "我們不當貿易商。",
    desc: "不買你的貨、不扛你的業績，我們把賣出去的路打通，貨還是你的。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.5" />
        <path d="M9 9C9 9 9.5 8 12 8C14.5 8 15 9.5 15 10C15 11 14 11.5 12 12C10 12.5 12 14 14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M12 6V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    title: "我們不當純接單的貨代。",
    desc: "物流是躍馬 42 年的底，但鹿飛賣的不是運費。",
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
    title: "我們不接「放貨給你賣、賣掉再抽成」的合作。",
    desc: "這種模式通常對雙方都不划算，我們會第一次談就說。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 20L8 14L12 17L20 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M15 7H20V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    title: "我們不保證合規、不保證進通路。",
    desc: "證幫你申請、坑幫你避，責任在品牌方；通路幫你談，賣不賣得動，市場探查會先告訴你。",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M3 11V13C3 13.5523 3.44772 14 4 14H6L11 18V6L6 10H4C3.44772 10 3 10.4477 3 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M15 9C16 10 16 14 15 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M18 7C20 9 20 15 18 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
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
        className="lufe-hero bg-navy text-white scroll-mt-[80px]"
      >
        <HeroBackdrop src="/images/about/about-hero-executive-1600.webp" position="65% center" />

        {/* Soft gold glow — with pulse */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 50% 40% at 15% 10%, rgba(212,168,92,0.15) 0%, transparent 70%)",
          }}
        />

        <div className="lufe-container lufe-hero-content pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-7 text-[11px] font-medium tracking-[1px] text-white/50">
            <Link href="/" className="hover:text-gold">首頁</Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/75">關於我們</span>
          </nav>

          {/* Headline */}
          <h1 className="font-sans text-[clamp(36px,6vw,72px)] leading-[1.1] font-[650] tracking-[-0.8px] [text-wrap:balance] mb-7 max-w-[920px]">
            協助台灣企業
            <br />
            在<span className="font-[650] text-gold">北美</span>與
            <span className="font-[650] text-gold">東南亞</span>落地
          </h1>

          {/* Signature quote */}
          <p className="text-[17px] md:text-[18px] text-white/60 max-w-[640px] font-light leading-[1.8] italic mb-12">
            「別人幫你開車，我們幫你找路。」
          </p>

          {/* Founder block — larger, with stats row */}
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-10 border-l-[3px] border-gold pl-6 md:pl-8 py-3 max-w-[780px]">
            <div className="relative w-[128px] h-[128px] md:w-[148px] md:h-[148px] overflow-hidden shrink-0 shadow-xl shadow-gold/25 ring-[1.5px] ring-gold/60">
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
              <div className="font-sans text-[clamp(21px,2.2vw,26px)] leading-[1.3] font-semibold">Aaron Yu</div>
              <div className="text-[15.5px] md:text-[16.5px] text-gold font-medium mt-1">
                鹿飛 LUFÉ 創辦人・來自躍馬企業
              </div>
              <p className="text-[14.5px] md:text-[15px] text-white/55 font-normal mt-3 leading-[1.8] max-w-[480px]">
                看了很多年貨櫃出去，決定去接貨到了之後的事。
              </p>
            </div>
          </div>

          {/* Stats strip */}
          <div className="border-t border-white/10 pt-7 grid grid-cols-3 gap-5 md:gap-10 max-w-[780px]">
            {[
              { n: "42+", l: "躍馬企業 · 年國際物流實戰" },
              { n: "500+", l: "躍馬企業 · 出口實戰案件" },
              { n: "30+", l: "國家與地區覆蓋" },
            ].map((s) => (
              <div key={s.l}>
                <div data-lufe-counter className="font-sans text-[26px] md:text-[30px] font-semibold tracking-[-0.035em] text-gold leading-none tabular-nums">
                  {s.n}
                </div>
                <div className="text-[11px] md:text-[11.5px] text-white/50 mt-1.5 tracking-[0.5px]">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
        <ScrollCue />
      </section>

      {/* ─── Story: 3 flickable cards ─── */}
      <section className="overflow-hidden border-t border-white/5 bg-navy py-[80px] text-white md:py-[110px]">
        <div className="lufe-container">
          <Carousel
            label="鹿飛的故事"
            className=""
            itemClassName="basis-[min(82vw,380px)] md:basis-[calc((100%-2rem)/2)]"
          >
            {storyCards.map((card) => (
              <article key={card.num} className="overflow-hidden border border-white/15 bg-white/[0.04]">
                <div className="relative aspect-[4/5] overflow-hidden">
              <TieredImage
                src={card.image}
                alt={card.alt}
                sizes="(max-width: 768px) 82vw, 48vw"
                maxTierWidth={card.maxTierWidth}
                className={`absolute inset-0 h-full w-full ${card.imageClassName}`}
                  />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-navy/30 via-transparent to-navy/50" />
                </div>
                <div className="p-6 md:p-7">
                  <p className="text-[10px] font-semibold tracking-[2px] text-gold/90 mb-4">{card.num}</p>
                  <h2 className="font-sans text-[clamp(28px,3vw,40px)] leading-[1.14] font-[650] [text-wrap:balance] text-gold mb-4">{card.title}</h2>
                  <p className="text-[15px] text-white/75 leading-[1.9] font-normal">{card.copy}</p>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </section>

      {/* ─── Team Structure ─── */}
      <section
        id="team"
        className="border-t border-b border-bd/40 bg-cream py-[72px] scroll-mt-[80px]"
      >
        <div className="lufe-container">
          <h2 className="h2">
            不是 Aaron 一個人，
            <br />
            是一個<span className="text-gold-d font-[650]">小而精</span>的團隊 + 全球節點
          </h2>
          <p className="section-desc">
            我們刻意不做大型顧問公司。規模保持在能讓創辦人親自過目每一個案子，
            同時又有足夠的專業分工與在地夥伴支援。
          </p>

          <Reveal className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-10">
            {teamRoles.map((role) => (
              <div
                key={role.title}
                className="lufe-card group bg-white border border-bd p-6 hover:border-gold"
              >
                <div className="w-12 h-12 bg-[rgba(212,168,92,0.08)] border border-gold-d/25 flex items-center justify-center text-gold-d mb-4 group-hover:bg-[rgba(212,168,92,0.14)]">
                  {role.icon}
                </div>
                <h3 className="font-sans text-[clamp(21px,2.2vw,26px)] leading-[1.3] font-semibold mb-2">
                  {role.title}
                </h3>
                <p className="text-[14.5px] text-tx2 font-normal leading-[1.8]">
                  {role.desc}
                </p>
              </div>
            ))}
          </Reveal>

          <div className="mt-8 text-[14.5px] text-tx3 font-normal italic">
            * 我們的定位是「小型精品 + 全球網絡」——不是萬人顧問公司，也不是 solo freelancer。
          </div>
        </div>
      </section>

      {/* ─── How We Work ─── */}
      <section
        id="how-we-work"
        className="bg-white py-[80px] scroll-mt-[80px]"
      >
        <div className="lufe-container">
          <h2 className="h2">
            你會得到<span className="text-gold-d font-[650]">什麼樣的陪跑</span>
          </h2>
          <p className="section-desc">
            我們的流程很清楚——每一步你都知道接下來會發生什麼、要做什麼、需要多久。
          </p>

          <Carousel
            label="合作流程"
            className="mt-8"
            itemClassName="basis-[min(82vw,330px)] md:basis-[calc((100%-3rem)/3)]"
          >
            {howWeWorkSteps.map((step) => (
              <article key={step.num} className="min-h-full border border-bd bg-cream p-6 md:p-7">
                <p className="font-sans text-[28px] md:text-[32px] font-semibold tracking-[-0.035em] text-gold-d tabular-nums leading-none mb-7">
                  {step.num}
                </p>
                <h3 className="font-sans text-[clamp(21px,2.2vw,26px)] leading-[1.3] font-semibold mb-2">
                  {step.title}
                </h3>
                <p className="text-[15px] md:text-[16px] text-tx2 leading-[1.8] font-normal">
                  {step.desc}
                </p>
              </article>
            ))}
          </Carousel>
        </div>
      </section>

      {/* ─── Resource Network (with Saigon night overlay strip) ─── */}
      <section
        id="network"
        className="border-t border-bd/40 bg-white py-[80px] scroll-mt-[80px]"
      >
        <div className="lufe-container">
          {/* Hero strip — Saigon Bitexco night cityscape as a wide banner */}
          <div className="relative w-full h-[160px] md:h-[200px] mb-10 overflow-hidden">
            <TieredImage
              src="/images/about/network-saigon-night-1600.webp"
              alt="西貢金融塔 Bitexco 夜景 — LUFÉ 東南亞網絡的象徵"
              sizes="(max-width: 900px) 100vw, 900px"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-navy/75 via-navy/40 to-transparent flex items-center">
              <div className="pl-6 md:pl-10">
                <div className="text-white text-[17px] md:text-[21px] font-light tracking-[-0.3px] leading-tight">
                  30+ 國家 · 500+ 出口案件 · 42 年國際物流
                </div>
              </div>
            </div>
          </div>
          <h2 className="h2">
            你不只是找到一家公司
            <br />
            而是接上一整個網絡
          </h2>
          <p className="section-desc">
            通路關係、在地夥伴和科技工具，全部為你的跨境計畫服務。
          </p>

          <Reveal className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {networkCards.map((card) => {
              const c = colorMap[card.color];
              return (
                <div
                  key={card.title}
                  className={`lufe-card p-7 bg-white ${c.border}`}
                >
                  <div
                    className={`w-14 h-14 ${c.iconBg} flex items-center justify-center mb-4`}
                  >
                    {card.icon}
                  </div>
                  <h3 className="font-sans text-[clamp(21px,2.2vw,26px)] leading-[1.3] font-semibold mb-2">{card.title}</h3>
                  <p className="text-[15.5px] text-tx2 font-normal leading-[1.8]">
                    {card.desc}
                  </p>
                </div>
              );
            })}
          </Reveal>
        </div>
      </section>

      {/* ─── Brand Philosophy (with gold compass) ─── */}
      <section
        id="philosophy"
        className="relative overflow-hidden bg-navy py-[80px] text-white scroll-mt-[80px]"
      >
        {/* Compass bg - rich gold focal on dark */}
        <div className="absolute inset-0">
          <TieredImage
            src="/images/about/philosophy-compass-1600.webp"
            alt=""
            sizes="100vw"
            className="absolute inset-0 h-full w-full object-cover opacity-[0.22]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/65" />
        </div>

        <div className="lufe-container relative">
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] leading-[1.14] font-[650] tracking-[-0.4px] [text-wrap:balance] mb-10">
            我們相信的事
          </h2>

          <div className="space-y-6">
            {beliefs.map((item, i) => (
              <div
                key={item.desc}
                data-lufe-belief
                className="lufe-belief flex gap-5 items-start p-6 bg-white/[0.04] backdrop-blur-sm border border-white/[0.08]"
              >
                <div className="lufe-belief-number w-8 h-8 flex items-center justify-center text-[15.5px] font-sans font-semibold tracking-[-0.035em] tabular-nums shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  {item.title ? <h3 className="font-sans text-[clamp(21px,2.2vw,26px)] leading-[1.3] font-semibold text-white mb-1.5">{item.title}</h3> : null}
                  <p className="text-[15.5px] text-white/65 font-normal leading-[1.8]">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      <section id="what-we-dont-do" className="bg-cream py-[80px] scroll-mt-[80px]">
        <div className="lufe-container">
          <h2 className="h2">誠實的邊界</h2>
          <p className="section-desc">專業分工比萬能重要。我們誠實告訴你哪些事不該找我們——這樣你才知道什麼時候該找我們。</p>
          <div className="mt-10">{thingsWeDontDo.map((item) => <article key={item.title} className="border-t border-bd border-l-4 border-red-500/45 py-[26px] pl-[18px] pr-6 last:border-b"><h3 className="font-sans text-[clamp(21px,2.2vw,26px)] leading-[1.3] font-semibold mb-2 text-tx">{item.title}</h3><p className="text-[14.5px] text-tx2 leading-[1.8] font-normal">{item.desc}</p></article>)}</div>
        </div>
      </section>

      <section className="bg-navy py-[80px] text-white md:py-[96px]">
        <div className="lufe-container"><div className="mx-auto max-w-[720px] text-center">
          <div className="relative mx-auto mb-8 h-[180px] w-full max-w-[680px] overflow-hidden"><TieredImage src="/images/about/aaron-teaching-1600.webp" alt="Aaron 在工作坊現場陪學員操作 — 陪跑的日常" sizes="(max-width: 680px) 100vw, 680px" className="absolute inset-0 h-full w-full object-cover object-[center_35%]" /><div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/20 to-navy/75" /></div>
          <h2 className="h2 text-white">想認識我們？聊聊你的跨境計畫</h2>
          <p className="mt-4 text-[15.5px] leading-[1.8] text-white/60">不確定該不該跨境？先聊聊，不收費、不承諾、不賣課。</p>
          <button onClick={open} className="mt-7 cursor-pointer bg-gold px-8 py-3.5 text-[16.5px] font-semibold text-navy hover:bg-gold-l">聊聊你的產品 →</button>
        </div></div>
      </section>
    </>
  );
}
