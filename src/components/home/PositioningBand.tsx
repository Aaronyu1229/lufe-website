import Link from "next/link";

import { PILLARS, type PillarSlug } from "@/data/services";

const CORE_PILLARS: readonly PillarSlug[] = ["fit", "channel"];

export function PositioningBand() {
  return (
    <section className="bg-cream px-5 py-[80px] md:px-10 md:py-[104px]">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 max-w-[820px] text-center md:mb-16">
          <h2 className="mb-5 font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-navy [text-wrap:balance] md:mb-6">
            真的跑過船的人，
            <br />
            <span className="text-gold-d">才懂出海的眉角</span>
          </h2>
          <p className="mx-auto max-w-[720px] text-[17px] font-normal leading-[1.8] text-tx2 md:text-[18px]">
            出海不是報告寫得出來的。鹿飛站在躍馬企業{" "}
            <span className="font-semibold text-tx">42 年</span>{" "}
            的國際物流實戰上，幫你把
            <span className="font-semibold text-tx">產品適配</span>跟
            <span className="font-semibold text-tx">通路銷售</span>兩件事跑通。
          </p>
        </div>

        <div className="mx-auto max-w-[1000px] bg-navy p-7 text-white shadow-[0_30px_60px_-20px_rgba(16,27,48,0.35)] md:grid md:grid-cols-[1.2fr_1fr] md:items-center md:gap-12 md:p-14">
          <div className="min-w-0">
            <h3 className="mb-4 font-sans text-[clamp(21px,2.2vw,26px)] font-semibold leading-[1.3] tracking-normal">
              出海不是報告寫得出來的，<span className="text-gold">是真的跑過船的人</span>
            </h3>
            <p className="mb-5 text-[15.5px] font-normal leading-[1.85] text-white/75 md:text-[16.5px]">
              從報關、倉儲到最後一哩——這套東西不是教科書讀來的，是 42 年在港口、海關、貨櫃場跑出來的。
              你的貨不會因為顧問不懂現場而卡在海上。
            </p>
            <a
              href="https://jumping.group"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[14px] font-semibold text-gold"
            >
              前往躍馬企業官網 <span aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="mt-8 grid min-w-0 grid-cols-3 gap-4 md:mt-0 md:gap-6">
            <div>
              <div className="mb-2 font-sans text-[36px] font-semibold leading-none tabular-nums tracking-[-0.035em] text-white md:text-[44px]">
                42<span className="text-[24px] text-gold md:text-[28px]">+</span>
              </div>
              <div className="text-[11px] leading-[1.4] text-white/70">年國際物流實戰</div>
            </div>
            <div>
              <div className="mb-2 font-sans text-[36px] font-semibold leading-none tabular-nums tracking-[-0.035em] text-white md:text-[44px]">
                500<span className="text-[24px] text-gold md:text-[28px]">+</span>
              </div>
              <div className="text-[11px] leading-[1.4] text-white/70">出口實戰案件</div>
            </div>
            <div>
              <div className="mb-2 font-sans text-[36px] font-semibold leading-none tabular-nums tracking-[-0.035em] text-white md:text-[44px]">
                30<span className="text-[24px] text-gold md:text-[28px]">+</span>
              </div>
              <div className="text-[11px] leading-[1.4] text-white/70">國家與地區覆蓋</div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-4 grid max-w-[1000px] grid-cols-1 gap-4 md:grid-cols-2">
          {CORE_PILLARS.map((slug) => {
            const pillar = PILLARS[slug];
            const accent = pillar.accent === "gold" ? "text-gold-d" : "text-sky";
            const dot = pillar.accent === "gold" ? "bg-gold-d" : "bg-sky";

            return (
              <Link
                key={slug}
                href={`/services#pillar-${slug}`}
                className="flex min-w-0 flex-col border border-bd bg-white p-7 md:p-9"
              >
                <div className="mb-5 flex items-baseline justify-between gap-4">
                  <span className={`font-sans text-[44px] font-semibold leading-none tabular-nums tracking-[-0.035em] ${accent}`}>
                    {pillar.num}
                  </span>
                  <span className={`text-[14px] font-semibold ${accent}`}>{pillar.subtitle}</span>
                </div>
                <h3 className="mb-2 font-sans text-[clamp(21px,2.2vw,26px)] font-semibold leading-[1.3] text-tx">
                  {pillar.title}
                </h3>
                <p className={`mb-5 text-[17px] font-medium leading-[1.6] ${accent}`}>
                  {pillar.tagline}
                </p>
                <ul className="mb-6 flex-1 space-y-2.5">
                  {pillar.services.map((service) => (
                    <li
                      key={service.title}
                      className="flex min-w-0 items-start gap-2 text-[15px] leading-[1.65] text-tx2"
                    >
                      <span aria-hidden="true" className={`mt-[9px] block h-[5px] w-[5px] shrink-0 ${dot}`} />
                      <span>{service.title}</span>
                    </li>
                  ))}
                </ul>
                <span className={`inline-flex items-center gap-1 text-[14px] font-semibold ${accent}`}>
                  看這個支柱的做法 →
                </span>
              </Link>
            );
          })}
        </div>

        <div className="mx-auto mt-9 max-w-[1000px] text-center">
          <Link href="/services#pillar-team" className="inline-flex items-center gap-2 text-[14px] font-semibold text-sky">
            想把海外團隊長大？看進階模組 <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
