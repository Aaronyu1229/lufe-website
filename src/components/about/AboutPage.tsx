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
  },
  {
    title: "東南亞在地夥伴",
    scale: "越南 / 菲律賓 / 泰國",
    desc: "長期合作的當地顧問與代理，熟悉當地法規、清關、通路生態。你不用自己飛一趟去找人。",
  },
  {
    title: "北美通路關係",
    scale: "Costco / Amazon / Walmart",
    desc: "十年累積的直接對接窗口。不是拿名片介紹，是能真的把你的產品推進買手會議的關係。",
  },
];

const howWeWorkSteps = [
  {
    num: "01",
    title: "第一次對話（免費）",
    desc: "30–60 分鐘，我們聽你講目前的狀況、疑問、顧慮。不推銷、不承諾。聊完後如果你覺得不適合，就直接結束；適合就進入下一步。",
  },
  {
    num: "02",
    title: "範圍確認與報價",
    desc: "我們根據你的需求，給你一份明確的服務範圍、時程、報價。所有數字都透明，沒有隱藏費用。你有 1 週時間考慮。",
  },
  {
    num: "03",
    title: "Kickoff 與執行",
    desc: "簽約後兩週內 kickoff。每週或雙週一次進度同步會，中間有問題隨時能直接 LINE 找到負責人——不用透過業務轉達。",
  },
  {
    num: "04",
    title: "交付與後續",
    desc: "階段結束時交付完整文件與結論。我們會告訴你是否需要進入下一階段，以及為什麼。如果不需要，我們會誠實地說「就到這」。",
  },
];

const thingsWeDontDo = [
  {
    title: "不做純貿易買賣",
    desc: "我們不賺中間價差，也不替你採購。我們的收入來自服務費，而不是產品加價。這讓我們的建議可以完全站在你的角度。",
  },
  {
    title: "不做純物流運輸",
    desc: "物流執行我們會串接，但不是我們的主業。市面上有很多優秀的物流公司，我們不搶他們的飯碗——只會幫你找到對的那家。",
  },
  {
    title: "不拿股權、不投資",
    desc: "我們不參股、不當股東。這是為了避免利益綁定扭曲判斷——當我們拿股權，你就不會聽到我們說「這案子不該做」。",
  },
  {
    title: "不做行銷代操",
    desc: "行銷策略我們會一起規劃，但日常的廣告投放、社群運營、KOL 合作這些執行工作，建議交給專業的 marketing agency。",
  },
  {
    title: "不賣課、不收招生費",
    desc: "我們不辦「出海大師班」、不賣線上課、不做付費講座招生。我們的工作是陪你實戰，不是做知識付費。",
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

          {/* Eyebrow — bilingual */}
          <div className="flex items-center gap-3 mb-5">
            <span className="block w-8 h-px bg-gold" />
            <span className="text-[11.5px] font-semibold tracking-[2.5px] uppercase text-gold">
              關於我們 · ABOUT LUFÉ
            </span>
          </div>

          {/* Headline — 3 pillars · 2 战場 framing */}
          <h1 className="font-heading text-[clamp(34px,5vw,58px)] leading-[1.1] font-light tracking-[-0.8px] mb-7 max-w-[920px]">
            協助台灣企業
            <br />
            在<span className="font-normal text-gold">北美</span>與
            <span className="font-normal text-gold">東南亞</span>落地
          </h1>

          {/* Signature quote */}
          <p className="text-[15.5px] md:text-[17px] text-white/60 max-w-[640px] font-light leading-[1.8] italic mb-12">
            「別人幫你開車，我們幫你找路。」
          </p>

          {/* Founder block — larger, with stats row */}
          <div className="flex flex-col md:flex-row items-start gap-6 md:gap-8 mb-10 border-l-[3px] border-gold pl-6 md:pl-8 py-3 max-w-[780px]">
            <div className="w-[108px] h-[108px] md:w-[120px] md:h-[120px] rounded-none bg-gradient-to-br from-gold to-[#C49545] flex items-center justify-center text-navy text-[32px] md:text-[36px] font-heading font-semibold shrink-0 shadow-lg shadow-gold/20">
              AY
            </div>
            <div className="flex-1">
              <div className="text-[22px] md:text-[24px] font-semibold leading-tight">Aaron Yu</div>
              <div className="text-[14px] md:text-[15px] text-gold font-medium mt-1">
                鹿飛 LUFÉ 創辦人
              </div>
              <p className="text-[13px] md:text-[13.5px] text-white/55 font-normal mt-3 leading-[1.75] max-w-[480px]">
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
          <div className="text-[11px] font-semibold tracking-[2.5px] uppercase text-gold mb-10 md:mb-14">
            創辦人的話
          </div>

          <div className="space-y-14 md:space-y-20">
            {/* 看到問題 — 圖左文右 */}
            <div className="grid grid-cols-1 md:grid-cols-[5fr_7fr] gap-8 md:gap-12 items-center">
              <div className="relative aspect-[4/5] md:aspect-[3/4] overflow-hidden">
                <Image
                  src="/images/about/story-problem-warehouse.jpg"
                  alt="大型物流倉儲的卸貨月台 — 跨境現場的真實樣貌"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
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
                <h2 className="text-[13px] font-semibold tracking-wider text-gold uppercase mb-4">
                  看到的問題
                </h2>
                <p className="text-[15px] md:text-[16px] text-white/75 leading-[1.9] font-normal">
                  在國際物流業做了十多年，我看到太多好產品倒在跨境這條路上——不是產品不好，是沒人幫他們把路走通。
                  找顧問只做評估、找貿易商只管買賣、找物流公司只跑運輸、找代操公司只買工具。每一段都有人做，但沒有人幫你串起來。
                  企業自己得當專案經理，在三四家公司之間來回溝通，效率極低，成本極高。
                </p>
              </div>
            </div>

            {/* 相信什麼 — 圖右文左 */}
            <div className="grid grid-cols-1 md:grid-cols-[7fr_5fr] gap-8 md:gap-12 items-center">
              <div className="md:order-1">
                <h2 className="text-[13px] font-semibold tracking-wider text-gold uppercase mb-4">
                  相信的事
                </h2>
                <p className="text-[15px] md:text-[16px] text-white/75 leading-[1.9] font-normal">
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
                  src="/images/about/story-action-conversation.jpg"
                  alt="兩位亞洲專業人士在辦公室討論 — 我們在做的事"
                  fill
                  sizes="(max-width: 768px) 100vw, 40vw"
                  className="object-cover"
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
                <h2 className="text-[13px] font-semibold tracking-wider text-gold uppercase mb-4">
                  做了什麼
                </h2>
                <p className="text-[15px] md:text-[16px] text-white/75 leading-[1.9] font-normal">
                  所以我創立了鹿飛——一個用三支柱方法論幫台灣企業落地的跨境團隊。
                  從產品適配、通路銷售到團隊體質，三個支柱全程自營；底下還有躍馬國際 42 年的國際物流實戰當基礎。
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
          <div className="section-label">團隊組成</div>
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
                className="bg-white border border-bd p-6 rounded-none transition-colors hover:border-gold"
              >
                <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-gold-d mb-2">
                  {role.scale}
                </div>
                <h3 className="text-[16px] font-semibold mb-2 leading-tight">
                  {role.title}
                </h3>
                <p className="text-[13px] text-tx2 font-normal leading-[1.75]">
                  {role.desc}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 text-[13px] text-tx3 font-normal italic">
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
          <div className="section-label">我們怎麼合作</div>
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
                className="flex items-start gap-5 md:gap-7 p-5 md:p-7 bg-cream rounded-none border-l-4 border-gold/40"
              >
                <span className="font-sans text-[28px] md:text-[32px] font-light text-gold-d tabular-nums leading-none shrink-0">
                  {step.num}
                </span>
                <div>
                  <h3 className="text-[17px] md:text-[19px] font-semibold mb-2 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[13.5px] md:text-[14.5px] text-tx2 leading-[1.8] font-normal">
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
                <div className="text-white text-[16px] md:text-[20px] font-light tracking-[-0.3px] leading-tight">
                  30+ 國家 · 500+ 出口案件 · 10 年實戰
                </div>
              </div>
            </div>
          </div>
          <div className="section-label">資源網絡</div>
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
                  <h3 className="text-[17px] font-semibold mb-2">{card.title}</h3>
                  <p className="text-[14px] text-tx2 font-normal leading-[1.7]">
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
          <div className="section-label">我們的邊界</div>
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
                className="p-6 bg-white border-l-4 border-red-300/60 rounded-none"
              >
                <div className="flex items-start gap-3 mb-2">
                  <span className="text-red-400/80 text-[18px] font-bold leading-none mt-0.5">
                    ✗
                  </span>
                  <h3 className="text-[16px] font-semibold leading-tight">
                    {item.title}
                  </h3>
                </div>
                <p className="text-[13px] text-tx2 leading-[1.75] font-normal pl-7">
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
                <div className="w-8 h-8 rounded-none bg-gold flex items-center justify-center text-navy text-[14px] font-heading font-semibold shrink-0 mt-0.5">
                  {i + 1}
                </div>
                <div>
                  <h3 className="text-[16px] font-semibold text-white mb-1.5">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-white/65 font-normal leading-[1.7]">
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
                src="/images/about/cta-team.jpg"
                alt="年輕團隊協作"
                fill
                sizes="(max-width: 680px) 100vw, 680px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-navy/20 to-navy/75" />
            </div>
            <h3 className="text-[18px] text-white font-medium mb-2">
              想認識我們？聊聊你的跨境計畫
            </h3>
            <p className="text-[14px] text-white/60 font-normal mb-6">
              不確定該不該跨境？先聊聊，不收費、不承諾、不賣課。
            </p>
            <button
              onClick={open}
              className="bg-gold text-navy px-8 py-3.5 rounded-none text-[15px] font-semibold cursor-pointer transition-colors hover:bg-gold-l"
            >
              聊聊你的產品 →
            </button>
          </div>
        </div>
      </section>
    </>
  );
}
