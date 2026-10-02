"use client";

import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { Carousel } from "@/components/ui/Carousel";
import { HERO_VIDEOS } from "@/data/heroVideos";

import { useMessageBox } from "../MessageBox";
import { NetworkGlobe } from "./NetworkGlobe";

export const storyCards = [
  {
    num: "01",
    title: "看到的問題",
    image: "/images/about/aaron-workshop-1600.webp",
    maxTierWidth: 2400,
    alt: "鹿飛工作坊現場，分享跨境實戰觀察",
    imageClassName: "object-cover object-[center_30%]",
    copy: "在躍馬企業看了很多年\n\n躍馬做的是把貨送出去——42 年，500 多個出口案件，30 多個國家。\n看的不是報表，是貨櫃出去以後的事：\n有的品牌在當地開了第二家店，\n更多的是幾個月後貨退回來，或者就沒有下文了",
  },
  {
    num: "02",
    title: "想通的事",
    image: "/images/about/story-belief-compass-1600.webp",
    maxTierWidth: 1600,
    alt: "羅盤放在世界地圖上 — 有計畫的探索",
    imageClassName: "object-cover",
    copy: "差別從來不在物流，貨都有送到。\n差別在抵達之後，有沒有人接著走：\n證照有沒有人辦、貨架上有沒有人推、第一封英文客訴有沒有人回",
  },
  {
    num: "03",
    title: "做了什麼",
    image: "/images/about/aaron-news-interview-1080.webp",
    maxTierWidth: 1080,
    alt: "台視新聞訪問躍馬企業市場經理",
    imageClassName: "object-cover object-[42%_center]",
    copy: "台灣市場不夠大，出海是遲早的事；出去有難度，但出得去。\n鹿飛把抵達之後最難的四件事，做成四個方案，\n讓第一步小到企業敢踏，後面的每一步都有人在",
  },
] as const;

const networkCards = [
  {
    title: "北美",
    desc: "北美團隊：研究、展覽、買家、談判",
    className: "text-gold-d",
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="4" y="8" width="24" height="16" stroke="currentColor" strokeWidth="1.5" /><path d="M4 13H28" stroke="currentColor" strokeWidth="1.5" /><circle cx="8" cy="20" r="1.5" stroke="currentColor" strokeWidth="1" /><rect x="18" y="18" width="6" height="3" stroke="currentColor" strokeWidth="1" /></svg>,
  },
  {
    title: "東南亞",
    desc: "菲律賓合作夥伴：教育機構、連鎖餐飲、客服團隊、律師行、持證進口商",
    className: "text-sky",
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" /><path d="M8 26C8 21.5817 11.5817 18 16 18C20.4183 18 24 21.5817 24 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="24" cy="10" r="2.5" stroke="currentColor" strokeWidth="1" /><circle cx="8" cy="10" r="2.5" stroke="currentColor" strokeWidth="1" /></svg>,
  },
  {
    title: "全球物流",
    desc: "躍馬企業 42 年國際貨運承攬：報關、倉儲、海空運、最後一哩",
    className: "text-gold-d",
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="6" y="14" width="10" height="12" stroke="currentColor" strokeWidth="1.5" /><rect x="16" y="8" width="10" height="18" stroke="currentColor" strokeWidth="1.5" /><path d="M9 18H13M9 21H13M19 12H23M19 15H23M19 18H23" stroke="currentColor" strokeWidth="1" strokeLinecap="round" /></svg>,
  },
  {
    title: "科技工具",
    desc: "自主開發的 TradePilot 關稅查詢工具，2,400+ 用戶使用中。用科技降低跨境的資訊門檻",
    className: "text-ember",
    icon: <svg width="32" height="32" viewBox="0 0 32 32" fill="none"><rect x="6" y="6" width="20" height="20" stroke="currentColor" strokeWidth="1.5" /><path d="M12 16L15 19L21 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>,
  },
] as const;

const beliefs = [
  "出海是遲早的事：早一點、小一點開始，成本最低",
  "先做最難的事：辦證、設公司、接客訴，做不到就直說",
  "有立場：建議能讓企業長大的選項，而非最省事的",
  "判斷有數據，做法有實績",
] as const;

const teamRoles = [
  {
    title: "台灣核心",
    desc: "負責合約、進度與對口窗口。從第一次諮詢到每一章執行，都由同一位窗口負責到底",
    icon: <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" /><path d="M7 26C7 21.0294 11.0294 17 16 17C20.9706 17 25 21.0294 25 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="25" cy="9" r="2" stroke="currentColor" strokeWidth="1.2" /><circle cx="7" cy="9" r="2" stroke="currentColor" strokeWidth="1.2" /></svg>,
  },
  {
    title: "菲律賓合作夥伴",
    desc: "在當地經營英語教育機構與連鎖餐飲多年，市場探查面板、落地執行、客服團隊都從這裡來",
    icon: <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5" /><path d="M5 16H27M16 5C19 8 19 24 16 27M16 5C13 8 13 24 16 27" stroke="currentColor" strokeWidth="1.2" /><circle cx="22" cy="11" r="1.5" stroke="currentColor" strokeWidth="1" /></svg>,
  },
  {
    title: "北美團隊",
    desc: "在北美當地做研究、展覽、買家引進、談判。北美這條線由他們執行",
    icon: <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect x="4" y="10" width="24" height="14" stroke="currentColor" strokeWidth="1.5" /><path d="M4 15H28M10 6L10 10M22 6L22 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><rect x="18" y="18" width="6" height="3" stroke="currentColor" strokeWidth="1" /></svg>,
  },
] as const;

export function AboutPage() {
  const { open } = useMessageBox();

  return (
    <>
      <section id="story" className="lufe-hero scroll-mt-[80px] bg-navy text-white">
        <HeroBackdrop src="/images/about/about-hero-executive-1600.webp" position="65% center" video={HERO_VIDEOS.about} />
        <div className="lufe-container lufe-hero-content pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href="/" className="hover:text-gold">首頁</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-white/75">關於我們</span>
          </nav>
          <h1 className="h1 mb-6 max-w-[880px] text-white">
            協助台灣企業<br />在<span className="text-gold">北美</span>與<span className="text-gold">東南亞</span>落地
          </h1>
          <p className="max-w-[640px] text-[18px] leading-[1.8] text-white/80">「別人幫你開車，我們幫你找路。」</p>
          <p className="lead mb-0 mt-4 max-w-[640px] !text-white/75">鹿飛協助台灣企業規劃並執行海外落地，從市場驗證、通路進入到在地團隊與客服，一個窗口串起出海的每一段。以躍馬企業 42 年國際物流為基礎，讓每一步都有實際的執行力</p>
        </div>
        <ScrollCue />
      </section>

      <section className="overflow-hidden border-t border-white/5 bg-navy py-[80px] text-white md:py-[110px]">
        <div className="lufe-container">
          <Carousel tone="dark" label="鹿飛的故事" itemClassName="basis-[min(82vw,380px)] md:basis-[calc((100%-2rem)/2)]">
            {storyCards.map((card) => (
              <article key={card.num} className="overflow-hidden border border-white/15 bg-white/[0.04]">
                <div className="relative aspect-[4/5] overflow-hidden">
                  <TieredImage data-carousel-parallax src={card.image} alt={card.alt} sizes="(max-width: 768px) 82vw, 48vw" maxTierWidth={card.maxTierWidth} className={`absolute inset-0 h-full w-full ${card.imageClassName}`} />
                  <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-br from-navy/30 via-transparent to-navy/50" />
                </div>
                <div className="p-6 md:p-7">
                  <p className="mb-4 text-[10px] font-semibold tracking-[2px] text-gold/90">{card.num}</p>
                  <h2 className="h3 mb-4 text-gold">{card.title}</h2>
                  <p className="whitespace-pre-line text-[15px] leading-[1.9] text-white/75">{card.copy}</p>
                </div>
              </article>
            ))}
          </Carousel>
        </div>
      </section>

      <section id="team" className="scroll-mt-[80px] border-y border-bd/40 bg-cream py-[72px]">
        <div className="lufe-container">
          <h2 className="h2">小而精的核心團隊，<br /><span className="text-gold-d">連結全球在地節點</span></h2>
          <p className="lead mt-5 max-w-[720px]">鹿飛刻意維持精簡規模：每個案子由核心團隊親自把關，再由北美與東南亞的在地夥伴分工執行</p>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {teamRoles.map((role) => (
              <article key={role.title} className="border border-bd bg-white p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center border border-gold/40 text-gold-d">{role.icon}</div>
                <h3 className="h3 mb-2">{role.title}</h3>
                <p className="text-[14.5px] leading-[1.8] text-tx2">{role.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="network" className="scroll-mt-[80px] bg-navy py-[80px] text-white md:py-[96px]">
        <div className="lufe-container grid items-center gap-12 lg:grid-cols-[1fr_480px]">
          <div className="min-w-0">
            <h2 className="h2 text-white">跨越三地的資源網絡，<br /><span className="text-gold">支援每一個出海計畫</span></h2>
            <p className="lead !text-white/70 mt-5 max-w-[620px]">通路關係、在地夥伴與科技工具，整合為同一套跨境執行體系</p>
            <div className="mt-10 grid max-w-[560px] grid-cols-3 gap-5">
              {[
                { value: "30+", label: "國家與地區・躍馬物流網絡" },
                { value: "500+", label: "出口案件・躍馬企業" },
                { value: "42", label: "年國際物流・躍馬企業" },
              ].map((stat) => <div key={stat.label}><div data-lufe-counter className="num text-gold">{stat.value}</div><div className="mt-2 text-[13px] text-white/65">{stat.label}</div></div>)}
            </div>
            <p className="mt-8 text-[13px] text-white/55">台北・馬尼拉・洛杉磯・紐約・舊金山・拉斯維加斯</p>
            <div className="mt-4 grid gap-2 text-[13px] text-white/55">
              <div className="flex items-center gap-2"><span aria-hidden="true" className="h-2 w-2 bg-gold" />資源網絡城市</div>
              <div className="flex items-center gap-2"><span aria-hidden="true" className="h-2 w-2 bg-sky" />關注市場：新加坡・吉隆坡・曼谷・胡志明市・雅加達・宿霧</div>
            </div>
          </div>
          <NetworkGlobe />
        </div>
      </section>

      <section className="bg-white py-[72px] md:py-[96px]">
        <div className="lufe-container grid grid-cols-1 gap-5 md:grid-cols-2">
          {networkCards.map((card) => (
            <article key={card.title} className="border border-bd p-7">
              <div className={`mb-4 flex h-14 w-14 items-center justify-center bg-cream ${card.className}`}>{card.icon}</div>
              <h3 className="h3 mb-2">{card.title}</h3>
              <p className="text-[15.5px] leading-[1.8] text-tx2">{card.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="philosophy" className="scroll-mt-[80px] bg-navy py-[80px] text-white md:py-[96px]">
        <div className="lufe-container grid items-center gap-14 lg:grid-cols-[1fr_440px]">
          <div className="order-2 lg:order-1">
            <h2 className="h2 text-white">鹿飛相信的四件事</h2>
            <div className="mt-10 divide-y divide-white/15 border-y border-white/15">
              {beliefs.map((belief, index) => (
                <div key={belief} data-lufe-belief className="lufe-belief flex items-start gap-5 py-6">
                  <div className="lufe-belief-number num flex h-8 w-8 shrink-0 items-center justify-center text-[15.5px] text-gold">{index + 1}</div>
                  <p className="text-[15.5px] leading-[1.8] text-white/70">{belief}</p>
                </div>
              ))}
            </div>
          </div>
          <TieredImage src="/images/about/philosophy-compass-1600.webp" alt="羅盤與地圖" sizes="(max-width: 1024px) 100vw, 440px" className="order-1 aspect-[16/9] w-full object-cover lg:order-2 lg:aspect-[4/5]" />
        </div>
      </section>

      <section className="bg-navy py-[80px] text-white md:py-[96px]">
        <div className="lufe-container">
          <div className="mx-auto max-w-[720px] text-center">
            <div className="relative mx-auto mb-8 h-[180px] w-full max-w-[680px] overflow-hidden">
              <TieredImage src="/images/about/aaron-teaching-1600.webp" alt="工作坊現場，陪學員實際操作" sizes="(max-width: 680px) 100vw, 680px" className="absolute inset-0 h-full w-full object-cover object-[center_35%]" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/20 to-navy/75" />
            </div>
            <h2 className="h2 text-white">從一次對話，開始規劃出海</h2>
            <p className="mt-4 text-[15.5px] leading-[1.8] text-white/70">首次諮詢不收費，先釐清方向，再決定下一步</p>
            <button type="button" onClick={open} className="mt-7 cursor-pointer bg-gold px-8 py-3.5 text-[16.5px] font-semibold text-navy active:scale-[.97]">聊聊你的產品 →</button>
          </div>
        </div>
      </section>
    </>
  );
}
