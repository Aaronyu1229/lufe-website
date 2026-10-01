"use client";

import Image from "next/image";
import Link from "next/link";

import { Carousel } from "@/components/ui";
import { getRelatedCases, type CaseStudy } from "@/data/cases";

import { useMessageBox } from "../MessageBox";

interface Props {
  readonly caseItem: CaseStudy;
}

const tagStyles: Record<string, string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold",
};

const lightTagStyles: Record<string, string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold-d",
};

const CASE_STAGE_LINKS = {
  "market-assessment": { label: "第一個月", title: "市場探查", href: "/services/product-testing" },
  "product-testing": { label: "第一個月", title: "市場探查", href: "/services/product-testing" },
  "channel-entry": { label: "北美", title: "北美通路", href: "/services/north-america" },
  localization: { label: "第九個月", title: "公司落地", href: "/services/localization" },
} as const;

interface CaseDetailPageContentProps extends Props {
  readonly onMessageOpen?: () => void;
}

export function CaseDetailPageContent({ caseItem, onMessageOpen = () => {} }: CaseDetailPageContentProps) {
  const relatedCases = getRelatedCases(caseItem.slug);
  const stageLinks = Array.from(
    new Map(caseItem.stagesUsed.map((stageSlug) => {
      const stage = CASE_STAGE_LINKS[stageSlug];
      return [stage.href, stage] as const;
    })).values(),
  );

  return (
    <>
      <section className="relative overflow-hidden bg-navy pb-[60px] pt-[130px] text-white md:pb-[80px] md:pt-[170px]">
        <div className="absolute inset-0" aria-hidden="true">
          <Image
            src={caseItem.heroImage}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/60 to-navy" />
        </div>

        <div className="lufe-container relative min-w-0">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href="/cases" className="hover:text-white">案例</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-white/80">{caseItem.tags[0]?.label}</span>
          </nav>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {caseItem.tags.map((tag) => (
              <span key={tag.label} className={`px-2.5 py-[3px] text-[11px] font-medium ${tagStyles[tag.variant]}`}>
                {tag.label}
              </span>
            ))}
          </div>

          <h1 className="h1 mb-6 max-w-[840px] text-white">{caseItem.title}</h1>
          <p className="lead max-w-[720px] text-white/70">{caseItem.summary}</p>

          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-6 md:gap-x-12">
            {caseItem.stats.map((stat) => (
              <div key={stat.label} className="min-w-0">
                <div className="num text-[clamp(35px,4vw,44px)] leading-none text-gold">{stat.value}</div>
                <p className="mt-2 text-[11px] tracking-wide text-white/65 md:text-[13px]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[80px] md:py-[100px]">
        <div className="lufe-container">
          <div className="grid max-w-[820px] gap-12">
          <div>
            <h2 className="h3 mb-4 text-tx">起點：客戶遇到什麼問題？</h2>
            <p className="text-[17px] leading-[1.9] text-tx2">{caseItem.challenge}</p>
          </div>

          <div>
            <h2 className="h3 mb-4 text-tx">怎麼切入這個問題？</h2>
            <p className="text-[17px] leading-[1.9] text-tx2">{caseItem.approach}</p>

            {stageLinks.length > 0 && (
              <div className="mt-6 border-t border-bd pt-6">
                <div className="flex flex-wrap gap-2">
                  {stageLinks.map((stage) => {
                    return (
                      <Link key={stage.href} href={stage.href} className="inline-flex items-center gap-2 border border-bd px-3 py-2 text-[13.5px] text-tx2 hover:border-gold hover:text-tx">
                        <span className="num text-gold-d">{stage.label}</span>
                        <span>{stage.title}</span>
                        <span aria-hidden="true" className="text-tx3">→</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          <div>
            <h2 className="h3 mb-4 text-tx">最後發生了什麼？</h2>
            <p className="text-[17px] leading-[1.9] text-tx2">{caseItem.result}</p>
          </div>
          </div>
        </div>
      </section>

      {caseItem.keyDecisions.length > 0 && (
        <section className="bg-cream py-[80px] md:py-[100px]">
          <div className="lufe-container">
            <div className="max-w-[980px] min-w-0">
            <h2 className="h2 mb-4 text-tx">過程中<span className="text-gold-d">做過的判斷</span></h2>
            <p className="max-w-[720px] text-[17px] leading-[1.8] text-tx2">不只寫「發生了什麼」，把當時的選項和為什麼這樣選也攤出來——這才是經驗真正的價值。</p>

            <div className="mt-10 grid gap-5">
              {caseItem.keyDecisions.map((decision) => (
                <article key={decision.moment} className="border-l-4 border-gold bg-white p-6 md:p-8">
                  <h3 className="h3 mb-5 text-tx">{decision.moment}</h3>

                  <div className="mb-5">
                    <ul className="grid gap-1.5">
                      {decision.options.map((option) => {
                        const isChoice = option === decision.choice || decision.choice.includes(option.split("（")[0]?.trim() ?? option);
                        return (
                          <li key={option} className={`flex items-start gap-2.5 text-[15px] leading-[1.8] ${isChoice ? "font-medium text-tx" : "text-tx3"}`}>
                            <span aria-hidden="true" className={`mt-[7px] h-3 w-3 shrink-0 rounded-full border-2 ${isChoice ? "border-gold bg-gold" : "border-bd"}`} />
                            {option}
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <div className="border-t border-bd pt-4">
                    <p className="mb-2 text-[11px] font-semibold tracking-[0.08em] text-gold-d">我們選了：{decision.choice}</p>
                    <p className="text-[15px] leading-[1.8] text-tx2"><span className="font-medium text-tx">理由：</span>{decision.reasoning}</p>
                  </div>
                </article>
              ))}
            </div>
            </div>
          </div>
        </section>
      )}

      {caseItem.timeline.length > 0 && (
        <section className="overflow-hidden bg-white py-[80px] md:py-[100px]">
          <div className="lufe-container">
            <div className="max-w-[980px] min-w-0">
              <h2 className="h2 text-tx">從啟動到收尾的<span className="text-gold-d">時間節奏</span></h2>
            </div>
          </div>

          <div className="lufe-container">
            <Carousel
              label="時間軸"
              className="mt-8 overflow-hidden"
              itemClassName="basis-[min(78vw,330px)]"
            >
              {caseItem.timeline.map((item, index) => (
                <article key={`${item.when}-${item.title}`} className="flex min-h-[260px] min-w-0 flex-col border border-bd bg-cream p-7">
                  <span className="num mb-5 grid h-10 w-10 place-items-center bg-gold text-[15px] leading-none text-navy">{index + 1}</span>
                  <p className="mb-2 text-[13px] font-semibold text-gold-d">{item.when}</p>
                  <h3 className="h3 mb-2 text-tx">{item.title}</h3>
                  <p className="text-[15px] leading-[1.75] text-tx2">{item.desc}</p>
                </article>
              ))}
            </Carousel>
          </div>
        </section>
      )}

      {caseItem.quote && (
        <section className="bg-navy py-[72px] text-white md:py-[96px]">
          <div className="lufe-container"><blockquote className="mx-auto max-w-[760px]">
              <q className="block font-sans text-[clamp(24px,3vw,34px)] font-medium leading-[1.6] text-white/90">{caseItem.quote.text}</q>
              <cite className="mt-5 block text-[15px] font-medium not-italic text-gold">— {caseItem.quote.attribution}</cite>
            </blockquote></div>
        </section>
      )}

      <section className="bg-cream py-[72px] md:py-[96px]">
        <div className="lufe-container"><div className="mx-auto max-w-[720px] text-center">
          <h2 className="h2 mb-4 text-tx">你的產品也有<span className="text-gold-d">類似的機會</span>嗎？</h2>
          <p className="mx-auto mb-10 max-w-[520px] text-[16.5px] leading-[1.8] text-tx2">每個案子的起點都是一場對話。聊聊你的狀況，我們會告訴你這個故事裡哪一段跟你最相關。</p>
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <button onClick={onMessageOpen} className="cursor-pointer bg-gold px-9 py-[15px] text-[15.5px] font-semibold tracking-[0.5px] text-navy hover:bg-gold-l">
              聊聊你的產品 →
            </button>
            <Link href="/assess" className="inline-flex items-center gap-2 text-[15.5px] font-medium text-tx2 hover:text-navy">
              <span className="border-b border-tx3/40 pb-0.5">先做 2 分鐘評估</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div></div>
      </section>

      {relatedCases.length > 0 && (
        <section className="border-t border-bd bg-white py-[72px] md:py-[96px]">
          <div className="lufe-container"><div className="max-w-[1100px] min-w-0">
            <h2 className="h2 text-tx">更多成功的故事</h2>

            <div className="mt-10 grid min-w-0 grid-cols-1 gap-[18px] md:grid-cols-2">
              {relatedCases.map((relatedCase) => (
                <Link key={relatedCase.slug} href={`/cases/${relatedCase.slug}`} className="group min-w-0 overflow-hidden bg-cream hover:bg-white">
                  <div className="relative h-[180px] overflow-hidden bg-navy">
                    <Image src={relatedCase.heroImage} alt={relatedCase.title} fill sizes="(max-width: 767px) 100vw, 50vw" className="object-cover" />
                  </div>
                  <div className="min-w-0 p-6 md:p-7">
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {relatedCase.tags.map((tag) => (
                        <span key={tag.label} className={`px-2.5 py-[3px] text-[11px] font-medium ${lightTagStyles[tag.variant]}`}>{tag.label}</span>
                      ))}
                    </div>
                    <p className="num mb-2.5 text-[36px] leading-none text-gold-d">{relatedCase.num}</p>
                    <h3 className="h3 mb-2 text-tx">{relatedCase.title}</h3>
                    <p className="mb-3 text-[14.5px] leading-[1.65] text-tx2">{relatedCase.summary}</p>
                    <span className="text-[14.5px] font-semibold text-gold-d">看完整案例 →</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-[34px] text-center">
              <Link href="/cases" className="inline-flex items-center gap-2 text-[14.5px] font-medium text-tx2 hover:text-navy">
                <span aria-hidden="true">←</span>
                <span className="border-b border-tx3/40 pb-0.5">回到所有案例</span>
              </Link>
            </div>
          </div></div>
        </section>
      )}
    </>
  );
}

export function CaseDetailPage({ caseItem }: Props) {
  const { open } = useMessageBox();

  return <CaseDetailPageContent caseItem={caseItem} onMessageOpen={open} />;
}
