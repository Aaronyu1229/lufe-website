"use client";

import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { HERO_VIDEOS } from "@/data/heroVideos";

import type { AboutPhotoSources } from "@/data/aboutPhotoSlots";

import { useMessageBox } from "../MessageBox";
import { FreightRateChart } from "./FreightRateChart";
import { PhotoSlot } from "./PhotoSlot";
import { NetworkGlobe } from "./NetworkGlobe";
import { StoryChapters, type StoryChapter } from "../story/StoryChapters";

export const storyChapters = [
  {
    num: "01",
    label: "起點・躍馬企業",
    title: "43 年，把台灣的貨送到世界各地",
    paragraphs: [
      "躍馬做國際貨運承攬已經 43 年：報關、倉儲、海空運、最後一哩。",
      "在躍馬，我接手的不只是報關單和貨櫃，還有 43 年累積下來的客戶——和他們的處境。",
    ],
    stats: true,
    jumpingLink: true,
    image: { src: "/images/about/about-port-1600.webp", alt: "貨櫃碼頭——躍馬 43 年的日常", position: "center 40%" },
    photoSlot: "PHOTO-SLOT-01",
  },
  {
    num: "02",
    label: "市場觀察",
    title: "貨送到了，客戶的日子卻一年比一年難",
    paragraphs: [
      "每一批貨送完，我們會打電話關心。聽到的，越來越不是物流的事：產品要怎麼在當地註冊、證要掛在誰名下；有的客戶，訂單變成一單有、一單沒有。",
      "疫情那幾年最明顯。2021 年 9 月，一個 40 呎貨櫃的全球平均運價漲到 10,377 美元，是 2019 年的七倍多。很多客戶不是貨送不出去，是送出去已經不划算。",
      "疫情過了，壓力沒有走。台灣 171 萬家中小企業，2024 年賣出 31.1 兆元，賣到國外的只有 3.2 兆——十塊錢裡大約只有一塊。島內的人口，從 2024 年起每個月都在減少。",
    ],
    insert: { afterParagraph: 1, content: <FreightRateChart /> },
    note: "資料來源：Drewry World Container Index；經濟部《2025 中小企業白皮書》；內政部戶口統計",
  },
  {
    num: "03",
    label: "關鍵洞察",
    title: "差別不在物流，而在抵達之後有沒有人接手",
    paragraphs: [
      "我們的客戶，跟著市場一起面臨轉型與生存的壓力。一次一次聊下去，我看清楚一件事：貨都送得到。真正拉開差距的，是抵達之後有沒有人接著走——證照有沒有人辦、貨架上有沒有人推、第一封英文客訴有沒有人回。",
      "這些事不在任何一家貨代的服務範圍裡，也不在躍馬的。",
    ],
    image: { src: "/images/about/story-belief-compass-1600.webp", alt: "羅盤放在世界地圖上——有計畫的探索", maxTierWidth: 1600, position: "center" },
    photoSlot: "PHOTO-SLOT-03",
  },
  {
    num: "04",
    label: "鹿飛的成立",
    title: "守住本業很安全，但客戶需要我們再往前走一步",
    paragraphs: [
      "最穩的路，是把報關和運送做好，守住 43 年的本業。但客戶卡住的地方，已經不在港口了。",
      "所以我跳出躍馬既有的框架，成立了鹿飛：從那些痛點往前走——先看清海外市場，弄懂當地法規，找到通路，再陪你落地、接客服。四件最難的事，做成四個方案：市場探查、寄賣、公司落地、海外客服。",
      "躍馬沒有退場，它是我們的後盾：躍馬把貨送到，鹿飛讓貨在當地被買走。",
    ],
    servicesLink: true,
    image: { src: "/images/about/aaron-news-interview-1080.webp", alt: "台視新聞訪問躍馬企業市場經理", maxTierWidth: 1080, position: "42% center" },
  },
] as const satisfies readonly StoryChapter[];

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
    desc: "躍馬企業 43 年國際貨運承攬：報關、倉儲、海空運、最後一哩",
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
    desc: "合約、進度、對口窗口都在台灣，從第一次評估到最後一章，你只需要找同一個人。要出的貨，交給躍馬報關、運送——那是我們 43 年的本業。",
    photoSlot: "PHOTO-SLOT-05A",
    link: { label: "認識躍馬企業 →", href: "https://jumping.group" },
    icon: <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="11" r="4" stroke="currentColor" strokeWidth="1.5" /><path d="M7 26C7 21.0294 11.0294 17 16 17C20.9706 17 25 21.0294 25 26" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /><circle cx="25" cy="9" r="2" stroke="currentColor" strokeWidth="1.2" /><circle cx="7" cy="9" r="2" stroke="currentColor" strokeWidth="1.2" /></svg>,
  },
  {
    title: "菲律賓合作夥伴",
    desc: "貨到了馬尼拉，接手的是一群在當地做了多年的人：他們經營英語教育機構與連鎖餐飲，把一個台灣手搖飲品牌從一家做到十幾家。市場探查的面板、落地的文件與跑腿、海外客服的人手，都從這裡出來。",
    photoSlot: "PHOTO-SLOT-05B",
    icon: <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><circle cx="16" cy="16" r="11" stroke="currentColor" strokeWidth="1.5" /><path d="M5 16H27M16 5C19 8 19 24 16 27M16 5C13 8 13 24 16 27" stroke="currentColor" strokeWidth="1.2" /><circle cx="22" cy="11" r="1.5" stroke="currentColor" strokeWidth="1" /></svg>,
  },
  {
    title: "北美團隊",
    desc: "另一條路通往北美。當地團隊做研究、跑展覽、引進買家、上談判桌，正陪一個台灣魚鬆品牌走美國的第一關。北美通路由他們執行，台灣這邊的窗口不換。",
    photoSlot: "PHOTO-SLOT-05C",
    icon: <svg width="28" height="28" viewBox="0 0 32 32" fill="none"><rect x="4" y="10" width="24" height="14" stroke="currentColor" strokeWidth="1.5" /><path d="M4 15H28M10 6L10 10M22 6L22 10" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" /><rect x="18" y="18" width="6" height="3" stroke="currentColor" strokeWidth="1" /></svg>,
  },
] as const;

export function AboutPage({ photoSources = {} }: { readonly photoSources?: AboutPhotoSources }) {
  const { open } = useMessageBox();

  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/about/about-hero-executive-1600.webp" position="65% center" video={HERO_VIDEOS.about} />
        <div className="lufe-container lufe-hero-content pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href="/" className="hover:text-gold">首頁</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-white/75">關於我們</span>
          </nav>
          <h1 className="h1 mb-6 max-w-[880px] text-white">
            從貨櫃出發，<br /><span className="text-gold">陪台灣企業走完抵達之後</span>
          </h1>
          <p className="max-w-[640px] text-[18px] leading-[1.8] text-white/80">「別人幫你開車，我們幫你找路。」</p>
          <p className="lead mb-0 mt-4 max-w-[640px] !text-white/75">我們協助台灣企業在北美與東南亞落地：市場驗證、通路進入、在地團隊與客服，一個窗口串起出海的每一段。這個故事，要從躍馬企業說起</p>
        </div>
        <ScrollCue />
      </section>

      <section id="story" className="scroll-mt-[80px] bg-white py-[80px] md:py-[112px]">
        <div className="lufe-container">
          <p className="text-[13px] font-semibold text-gold-d">鹿飛的故事</p>
          <StoryChapters chapters={storyChapters} photoSources={photoSources} />
        </div>
      </section>

      <section id="team" className="scroll-mt-[80px] border-y border-bd/40 bg-cream py-[72px]">
        <div className="lufe-container">
          <p className="mb-4 text-[13px] font-semibold text-gold-d">05・今天的團隊</p>
          <h2 className="h2">讓台灣企業出海，少一點害怕，<br /><span className="text-gold-d">多一點把握</span></h2>
          <p className="lead mt-5 max-w-[720px]">這是我成立鹿飛的原因。做法是把出海拆成小步：先花 1～2 萬看市場反應，再決定要不要往下走。所以第一次談，我只問問題；有時候我會建議你再等等，那也是一種答案。</p>
          <div className="mt-10 grid grid-cols-1 gap-5 md:grid-cols-3">
            {teamRoles.map((role) => (
              <article key={role.title} className="border border-bd bg-white p-6">
                <PhotoSlot slotId={role.photoSlot} src={photoSources[role.photoSlot]} ratioClassName="aspect-[4/3]" className="-mx-6 -mt-6 mb-6" sizes="(max-width: 768px) 100vw, 360px" />
                <div className="mb-4 flex h-12 w-12 items-center justify-center border border-gold/40 text-gold-d">{role.icon}</div>
                <h3 className="h3 mb-2">{role.title}</h3>
                <p className="text-[14.5px] leading-[1.8] text-tx2">{role.desc}</p>
                {"link" in role ? <a href={role.link.href} target="_blank" rel="noopener noreferrer" className="group mt-4 inline-flex text-[15px] font-semibold text-gold-d"><span>{role.link.label}</span></a> : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="network" className="scroll-mt-[80px] bg-navy py-[80px] text-white md:py-[96px]">
        <div className="lufe-container grid items-center gap-12 lg:grid-cols-[1fr_480px]">
          <div className="min-w-0">
            <p className="mb-4 text-[13px] font-semibold text-gold">06・資源網絡</p>
            <h2 className="h2 text-white">跨越三地的資源網絡，<br /><span className="text-gold">支援每一個出海計畫</span></h2>
            <p className="lead !text-white/70 mt-5 max-w-[620px]">通路關係、在地夥伴與科技工具，整合為同一套跨境執行體系</p>
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
            <p className="mb-4 text-[13px] font-semibold text-gold">07・鹿飛的信念</p>
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
            <h2 className="h2 text-white">下一章，從你的產品開始</h2>
            <p className="mt-4 text-[15.5px] leading-[1.8] text-white/70">首次諮詢不收費，先釐清方向，再決定下一步</p>
            <button type="button" onClick={open} className="mt-7 cursor-pointer bg-gold px-8 py-3.5 text-[16.5px] font-semibold text-navy active:scale-[.97]">聊聊你的產品 →</button>
          </div>
        </div>
      </section>
    </>
  );
}
