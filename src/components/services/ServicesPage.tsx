"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { Disclosure, Segmented } from "@/components/ui";
import { useMessageBox } from "../MessageBox";
import { PILLARS, PILLAR_ORDER, ACCENT_CLASSES, type PillarSlug } from "@/data/services";

const PILLAR_IMAGES: Record<PillarSlug, { src: string; alt: string }> = {
  fit: {
    src: "/images/services/pillar-fit-analysis.jpg",
    alt: "專業團隊分析市場數據圖表 — 產品適配性的核心",
  },
  channel: {
    src: "/images/services/pillar-channel-aisle.jpg",
    alt: "超市貨架上琳琅滿目的商品 — 通路銷售力的現場",
  },
  team: {
    src: "/images/services/pillar-team-collab.jpg",
    alt: "亞洲青年專業團隊在現代辦公室協作 — 團隊體質的樣貌",
  },
};

export const SERVICE_FAQS = [
  {
    q: "我該走「出海探路」還是「通路落地」？",
    a: "如果你的產品還沒出過海、不確定海外市場反應，先走探路——用最小成本去東南亞測試。如果你的產品已經成熟、確定要打進北美通路，直接走落地。不確定的話，第一次聊天我們就能幫你判斷。",
  },
  {
    q: "兩條路的收費方式有什麼不同？",
    a: "探路是按階段收固定費用，每一步花多少錢事前講清楚，不會有意外的帳單。落地是前期收低服務費，主要靠成交抽成——我們幫你賣出去才真的賺錢。兩種模式的共同點：第一次聊天就給你明確數字。",
  },
  {
    q: "鹿飛跟傳統貿易商或顧問公司有什麼不同？",
    a: "傳統顧問只出報告、貿易商只做買賣、代操公司只賣工具。鹿飛做的是三個支柱全程自營：從勝率評估、通路進入到團隊體質，陪你走完全程。底層還有躍馬企業 42 年物流實戰，不會因為顧問不懂現場而卡在海上。",
  },
] as const;

const logisticsStats = [
  { n: "42+", l: "年" },
  { n: "30+", l: "國家" },
  { n: "500+", l: "出口案件" },
] as const;

export function ServicesPage() {
  const { open } = useMessageBox();
  const [activePillar, setActivePillar] = useState<PillarSlug>("fit");

  const selectPillar = (value: string) => {
    const pillar = PILLAR_ORDER.find((slug) => slug === value);
    if (!pillar) return;

    setActivePillar(pillar);
    document.getElementById(`pillar-${pillar}`)?.scrollIntoView({ block: "start" });
  };

  return (
    <>
      <section className="relative overflow-hidden bg-navy px-5 pb-[70px] pt-[130px] md:px-10 md:pb-[90px] md:pt-[170px]">
        <div className="absolute inset-0">
          <Image
            src="/images/services/services-hero-dhl.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.28]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/75 to-navy/45" />
        </div>

        <div className="relative mx-auto max-w-[1200px]">
          <nav aria-label="Breadcrumb" className="mb-7 text-[11px] font-medium tracking-[1px] text-white/50">
            <Link href="/" className="hover:text-gold">首頁</Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/75">服務</span>
          </nav>

          <h1 className="mb-6 max-w-[920px] font-heading text-[clamp(34px,5vw,60px)] font-light leading-[1.08] tracking-[-0.8px] text-white">
            三個支柱，
            <br />
            <span className="font-normal text-gold">兩個主戰場</span>
          </h1>
          <p className="mb-7 max-w-[640px] text-[17px] font-light leading-[1.8] text-white/65 md:text-[18px]">
            產品適配性、通路銷售力、團隊體質——一個方法論，幫台灣企業在
            <span className="font-medium text-white">北美</span>與
            <span className="font-medium text-white">東南亞</span>落地。
            底下是躍馬企業 42 年的物流實戰當基礎。
          </p>
          <p className="mb-4 text-[10.5px] font-semibold tracking-[2px] text-white/40">三個支柱</p>

          <div className="grid grid-cols-2 gap-5 border-t border-white/10 pt-7 md:grid-cols-4 md:gap-8">
            {[
              { n: "42+", l: "年物流底層" },
              { n: "500+", l: "出口案件" },
              { n: "30+", l: "國家覆蓋" },
              { n: "2", l: "主戰場 · 北美 · 東南亞" },
            ].map((stat) => (
              <div key={stat.l}>
                <div className="font-heading text-[24px] font-light leading-none tabular-nums text-gold md:text-[28px]">
                  {stat.n}
                </div>
                <div className="mt-1.5 text-[11px] tracking-[0.5px] text-white/50 md:text-[11.5px]">{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="sticky top-[calc(var(--nav-h)+10px)] z-20 px-5 py-3 md:px-10">
        <div className="lufe-glass-panel mx-auto w-full max-w-[760px] border border-bd px-1 py-1 text-center shadow-[0_8px_24px_rgba(16,27,48,0.12)]">
          <Segmented
            label="三個支柱"
            value={activePillar}
            onChange={selectPillar}
            options={PILLAR_ORDER.map((slug) => ({ value: slug, label: PILLARS[slug].title }))}
            className="w-full justify-center bg-transparent"
          />
        </div>
      </div>

      {PILLAR_ORDER.map((slug, index) => {
        const pillar = PILLARS[slug];
        const accent = ACCENT_CLASSES[pillar.accent];
        const image = PILLAR_IMAGES[slug];
        return (
          <section
            key={slug}
            id={`pillar-${slug}`}
            className={`scroll-mt-[126px] px-5 py-[80px] md:px-10 md:py-[110px] ${
              index % 2 === 0 ? "bg-white" : "bg-cream"
            }`}
          >
            <div className="mx-auto max-w-[1200px]">
              <div className="relative mb-7 aspect-[16/10] w-full overflow-hidden md:mb-10 md:aspect-[21/9]">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover"
                />
              </div>

              <div className="grid min-w-0 grid-cols-1 gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:gap-16">
                <div className="min-w-0">
                  <div className="mb-4 flex items-end gap-3">
                    <span className={`font-heading text-[48px] font-light leading-none tabular-nums ${accent.textOnLight}`}>
                      {pillar.num}
                    </span>
                    <span className={`${accent.bg} ${accent.textOnLight} px-2 py-1 text-[11px] font-semibold tracking-[1.5px]`}>
                      {pillar.subtitle}
                    </span>
                  </div>
                  <h2 className="mb-4 font-sans text-[clamp(28px,3.6vw,44px)] font-light leading-[1.12] tracking-[-0.5px] text-navy">
                    {pillar.title}
                  </h2>
                  <p className={`mb-5 text-[17px] font-medium leading-[1.6] md:text-[18px] ${accent.textOnLight}`}>
                    「{pillar.tagline}」
                  </p>
                  <p className="text-[15.5px] font-normal leading-[1.85] text-tx2 md:text-[16.5px]">{pillar.description}</p>
                </div>

                <div className="min-w-0">
                  <div className="mb-5 text-[10.5px] font-semibold tracking-[2px] text-tx3">這個支柱底下能做的事</div>
                  <div className="space-y-3">
                    {pillar.services.map((service) => {
                      const content = (
                        <>
                          <h3 className="mb-2 text-[17px] font-semibold leading-tight text-tx md:text-[18px]">{service.title}</h3>
                          <p className="text-[14.5px] font-normal leading-[1.8] text-tx2 md:text-[15px]">{service.desc}</p>
                        </>
                      );

                      if (service.external) {
                        return (
                          <a
                            key={service.title}
                            href={service.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block border border-bd bg-white p-5 hover:shadow-[0_8px_28px_rgba(16,27,48,0.08)] md:p-6"
                          >
                            {content}
                          </a>
                        );
                      }

                      if (service.href) {
                        return (
                          <Link
                            key={service.title}
                            href={service.href}
                            className="block border border-bd bg-white p-5 hover:shadow-[0_8px_28px_rgba(16,27,48,0.08)] md:p-6"
                          >
                            {content}
                          </Link>
                        );
                      }

                      return (
                        <article key={service.title} className="border border-bd bg-white p-5 md:p-6">
                          {content}
                        </article>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>
        );
      })}

      <section className="border-t border-bd/40 bg-white px-5 py-[80px] md:px-10 md:py-[110px]">
        <div className="mx-auto max-w-[960px]">
          <div className="mb-3 text-[11.5px] font-semibold tracking-[2px] text-gold-d">你的狀況</div>
          <h2 className="mb-4 font-sans text-[clamp(26px,3.2vw,40px)] font-light leading-[1.15] tracking-[-0.5px]">
            同一套方法論，<span className="font-normal text-gold-d">兩種走法</span>
          </h2>
          <p className="mb-10 max-w-[620px] text-[16.5px] font-normal leading-[1.8] text-tx2 md:text-[17.5px]">
            三個支柱是骨架，但落地方式會因為你的市場和階段不同。
            看看哪條路比較像你現在的狀況。
          </p>

          <div className="grid min-w-0 grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
            <div className="flex min-w-0 flex-col border border-bd p-7 md:p-9">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center border border-sky/25 bg-[rgba(91,143,168,0.08)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <circle cx="12" cy="12" r="9" stroke="#5B8FA8" strokeWidth="1.5" />
                    <path d="M12 3C16 7 16 17 12 21M12 3C8 7 8 17 12 21M3 12H21" stroke="#5B8FA8" strokeWidth="1.2" />
                  </svg>
                </div>
                <div className="text-[10.5px] font-semibold tracking-[2px] text-sky">出海探路</div>
              </div>
              <h3 className="mb-3 text-[22px] font-semibold leading-tight md:text-[24px]">還不確定能不能賣</h3>
              <p className="mb-5 flex-1 text-[15px] font-normal leading-[1.8] text-tx2">
                幫你把產品送進東南亞市場測試——從出口合規、報關物流到找第一個通路對接。
                先用最小成本驗證，再決定要不要放大。
              </p>
              <div className="mb-6 space-y-2.5">
                {[
                  "產品證 + 出海證準備",
                  "報關、物流全程處理",
                  "在地通路對接與回饋",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 bg-sky" />
                    <span className="text-[14px] text-tx2">{item}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-bd/60 pt-4">
                <div className="mb-1 text-[11px] font-semibold tracking-[1.5px] text-tx3">適合你如果</div>
                <p className="text-[13.5px] leading-[1.7] text-tx2">有產品但還沒出過海，想先測試東南亞市場的反應再決定下一步。</p>
              </div>
              <div className="mt-5 border-t border-bd/60 pt-4">
                <div className="mb-1 text-[11px] font-semibold tracking-[1.5px] text-tx3">收費方式</div>
                <p className="text-[13.5px] leading-[1.7] text-tx2">按階段固定費用，每一步花多少錢事前講清楚。</p>
              </div>
            </div>

            <div className="flex min-w-0 flex-col border border-bd p-7 md:p-9">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex size-10 items-center justify-center border border-gold-d/25 bg-[rgba(212,168,92,0.08)]">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <rect x="3" y="8" width="18" height="12" stroke="#8F6A1F" strokeWidth="1.5" />
                    <path d="M3 12H21" stroke="#8F6A1F" strokeWidth="1.2" />
                    <path d="M8 5L8 8M16 5L16 8" stroke="#8F6A1F" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="text-[10.5px] font-semibold tracking-[2px] text-gold-d">通路落地</div>
              </div>
              <h3 className="mb-3 text-[22px] font-semibold leading-tight md:text-[24px]">產品準備好了，要進通路</h3>
              <p className="mb-5 flex-1 text-[15px] font-normal leading-[1.8] text-tx2">
                幫你打進北美主流通路——市場研究、展覽佈局、引進買家、上桌談判。
                我們出人、出策略，幫你把品牌帶到貨架上。
              </p>
              <div className="mb-6 space-y-2.5">
                {[
                  "北美市場研究與選品策略",
                  "展覽佈置、銷售、買家引進",
                  "通路談判與成交協助",
                ].map((item) => (
                  <div key={item} className="flex items-start gap-2.5">
                    <span aria-hidden="true" className="mt-1.5 size-1.5 shrink-0 bg-gold-d" />
                    <span className="text-[14px] text-tx2">{item}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-bd/60 pt-4">
                <div className="mb-1 text-[11px] font-semibold tracking-[1.5px] text-tx3">適合你如果</div>
                <p className="text-[13.5px] leading-[1.7] text-tx2">產品已經成熟，想進 Costco、Walmart、Amazon 等北美主流通路。</p>
              </div>
              <div className="mt-5 border-t border-bd/60 pt-4">
                <div className="mb-1 text-[11px] font-semibold tracking-[1.5px] text-tx3">收費方式</div>
                <p className="text-[13.5px] leading-[1.7] text-tx2">前期低服務費 + 成交抽成——我們幫你賣出去才真的賺錢。</p>
              </div>
            </div>
          </div>

          <p className="mt-8 text-center text-[14px] font-normal italic text-tx3">不確定自己該走哪條？先聊聊，我們幫你判斷。</p>
        </div>
      </section>

      <section className="bg-navy px-5 py-[72px] md:px-10 md:py-[96px]">
        <div className="mx-auto max-w-[900px]">
          <div className="mb-5 h-px w-12 bg-gold/60" />
          <h2 className="mb-5 font-sans text-[clamp(26px,3.6vw,40px)] font-light leading-[1.2] tracking-[-0.5px] text-white">
            三個支柱底下，是真正跑了 <span className="font-normal text-gold">42 年</span>的國際物流
          </h2>
          <p className="mb-8 max-w-[720px] text-[16.5px] font-normal leading-[1.85] text-white/65 md:text-[17.5px]">
            鹿飛不是新手上路的跨境顧問。我們底下有躍馬企業 42 年的國際貨運承攬實戰——報關、倉儲、海空運、最後一哩，每一段都是真正在做的事。
            顧問講策略的時候，我們知道現場會長什麼樣。這就是為什麼我們的「團隊體質」支柱永遠不會空談。
          </p>
          <div className="grid grid-cols-3 gap-4 border-t border-white/10 pt-6 md:gap-8">
            {logisticsStats.map((stat) => (
              <div key={stat.l} className="min-w-0">
                <div className="font-heading text-[clamp(34px,5vw,56px)] font-semibold leading-none tabular-nums text-gold">{stat.n}</div>
                <div className="mt-2 text-[12px] text-white/55 md:text-[14px]">{stat.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-[72px] md:px-10 md:py-[96px]">
        <div className="mx-auto max-w-[900px]">
          <Link href="/services/methodology" className="block border-l-4 border-gold bg-white p-7 md:p-10 hover:shadow-[0_8px_28px_rgba(16,27,48,0.08)]">
            <div className="flex flex-wrap items-start gap-6">
              <div className="min-w-0 flex-1">
                <div className="mb-3 text-[10.5px] font-semibold tracking-[2px] text-gold-d">決策框架</div>
                <h2 className="mb-3 text-[22px] font-semibold leading-tight text-navy md:text-[26px]">想看我們怎麼判斷 Go / No-Go？</h2>
                <p className="text-[15.5px] font-normal leading-[1.8] text-tx2 md:text-[16.5px]">
                  MBCPR 五維評分矩陣、紅燈判準、一個真實案例的完整評分過程——顧問報告背後的決策邏輯全部攤開。
                </p>
              </div>
              <span className="mt-2 text-[15.5px] font-semibold text-gold-d">看方法論 →</span>
            </div>
          </Link>
        </div>
      </section>

      <section className="bg-white px-5 py-[72px] md:px-10 md:py-[96px]">
        <div className="mx-auto grid max-w-[1200px] min-w-0 gap-10 md:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] md:gap-16">
          <div className="min-w-0 md:sticky md:top-[110px] md:self-start">
            <h2 className="section-heading">三個關鍵問題</h2>
            <p className="section-desc">更多細節在每個支柱的說明頁。這裡先回答最常見的三題。</p>
          </div>
          <div className="min-w-0 border-b border-bd">
            {SERVICE_FAQS.map((faq, index) => (
              <Disclosure key={faq.q} id={`services-faq-${index}`} summary={faq.q}>
                <p className="text-[16px] font-normal leading-[1.85]">{faq.a}</p>
              </Disclosure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy px-5 py-[80px] md:px-10 md:py-[100px]">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="mb-4 font-sans text-[clamp(26px,3.2vw,38px)] font-light leading-[1.2] tracking-[-0.4px] text-white">
            想知道你最該從<span className="font-normal text-gold">哪個支柱</span>開始？
          </h2>
          <p className="mx-auto mb-10 max-w-[540px] text-[16.5px] leading-[1.8] text-white/60">
            聊聊你的狀況，我們幫你判斷哪個支柱最該先動——不收費、不承諾、不賣課。
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
            <button onClick={open} className="cursor-pointer bg-gold px-9 py-[15px] text-[15.5px] font-semibold tracking-[0.5px] text-navy hover:bg-gold-l">
              聊聊你的狀況 →
            </button>
            <Link href="/assess" className="inline-flex items-center gap-2 border border-white/30 px-7 py-[14px] text-[15.5px] font-medium text-white/85 hover:border-white hover:text-white">
              <span>先比對案例</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
