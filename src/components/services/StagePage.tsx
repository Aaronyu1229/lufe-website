"use client";

import Image from "next/image";
import Link from "next/link";

import { Carousel, Disclosure } from "@/components/ui";
import { ACCENT_CLASSES, STAGES, type Stage } from "@/data/services";
import { getCase } from "@/data/cases";

import { useMessageBox } from "../MessageBox";

interface Props {
  readonly stage: Stage;
}

export function StagePage({ stage }: Props) {
  const { open } = useMessageBox();
  const accent = ACCENT_CLASSES[stage.accent];
  const relatedCase = getCase(stage.relatedCaseSlug);
  const prevStage = stage.prevSlug ? STAGES[stage.prevSlug] : null;
  const nextStage = stage.nextSlug ? STAGES[stage.nextSlug] : null;

  return (
    <>
      <section className="relative overflow-hidden bg-navy px-5 pb-[72px] pt-[128px] text-white md:px-10 md:pb-[104px] md:pt-[160px]">
        <Image
          src={stage.image}
          alt={stage.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-[0.3]"
        />
        <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-b from-navy/75 via-navy/65 to-navy" />

        <div className="relative mx-auto max-w-[1100px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap items-center gap-2 text-[13px] text-white/50">
            <Link href="/services" className="hover:text-white">
              服務
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-white/80">階段 {stage.num}</span>
          </nav>
          <h1 className="h1 font-sans text-white">{stage.title}</h1>
          <p className="lead mt-5 max-w-[720px] !text-white/70">{stage.subtitle}</p>
          <p className={`mt-8 max-w-[700px] text-[17px] leading-[1.8] md:text-[18px] ${accent.text}`}>
            {stage.heroLine}
          </p>
        </div>
      </section>

      <section className="bg-white px-5 py-[80px] md:px-10 md:py-[110px]">
        <div className="mx-auto grid max-w-[960px] min-w-0 gap-4">
          <h2 className="h2 font-sans text-navy">
            為什麼要有<span className={accent.textOnLight}>這個階段</span>
          </h2>
          <div className="mt-5 grid min-w-0 grid-cols-1 items-start gap-6 md:grid-cols-[148px_1fr] md:gap-10">
            <div className={`relative grid h-[120px] w-[120px] shrink-0 place-items-center border ${accent.border} ${accent.softBg} md:h-[148px] md:w-[148px]`}>
              <span className={`num font-sans text-[56px] leading-none md:text-[72px] ${accent.textOnLight}`}>{stage.num}</span>
              <span aria-hidden="true" className={`absolute -top-px left-4 right-4 h-px ${accent.textOnLight}`} style={{ backgroundColor: "currentColor", opacity: 0.4 }} />
              <span aria-hidden="true" className={`absolute -bottom-px left-4 right-4 h-px ${accent.textOnLight}`} style={{ backgroundColor: "currentColor", opacity: 0.4 }} />
            </div>
            <p className="min-w-0 max-w-[720px] text-[17px] leading-[1.9] text-tx2">{stage.purpose}</p>
          </div>
        </div>
      </section>

      <section className={`overflow-hidden px-5 py-[80px] md:px-10 md:py-[110px] ${accent.softBg}`}>
        <div className="mx-auto max-w-[1100px]">
          <h2 className="h2 font-sans text-navy">
            這階段結束時，<span className={accent.textOnLight}>你會拿到什麼</span>
          </h2>
          <p className="lead mt-4 max-w-[680px]">
            不是抽象承諾，分成兩層：你會「知道」什麼，以及你會實際「拿到」什麼。
          </p>

          <div className="mt-[38px] grid min-w-0 grid-cols-1 gap-10 md:grid-cols-2">
            <div className="min-w-0">
              <h3 className={`h3 font-sans ${accent.textOnLight}`}>你會知道什麼</h3>
              <ul className="mt-4 grid gap-3">
                {stage.outcomes.map((outcome) => (
                  <li key={outcome} className="flex min-w-0 items-start gap-3 border border-bd bg-white p-4">
                    <span aria-hidden="true" className={`mt-[2px] grid size-6 shrink-0 place-items-center border text-[12px] font-bold ${accent.border} ${accent.softBg} ${accent.textOnLight}`}>
                      ✓
                    </span>
                    <span className="text-[15.5px] leading-[1.7] text-tx">{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="min-w-0">
              <h3 className="h3 font-sans text-gold-d">你會實際拿到</h3>
              <Carousel
                label="你會實際拿到"
                className="mt-2 min-w-0"
                itemClassName="basis-[clamp(280px,82vw,380px)]"
              >
                {stage.deliverables.map((deliverable) => (
                  <article key={deliverable.title} className="flex h-full min-w-0 flex-col border border-bd bg-white p-6">
                    <h4 className="h4 font-sans text-tx">{deliverable.title}</h4>
                    <p className="mt-3 text-[15px] leading-[1.8] text-tx2">{deliverable.desc}</p>
                  </article>
                ))}
              </Carousel>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy px-5 py-[80px] text-white md:px-10 md:py-[110px]">
        <div className="mx-auto max-w-[960px]">
          <h2 className="h2 font-sans text-white">
            <span className="text-gold">{stage.timeline}</span> 的實際節奏
          </h2>
          <p className="lead mt-4 max-w-[520px] !text-white/70">每個階段我們都有明確的週進度，不會讓你不知道現在在做什麼。</p>

          <div className="mt-8 border-b border-white/10">
            {stage.process.map((process) => (
              <Disclosure
                key={process.week}
                id={`${stage.slug}-${process.week}`}
                summary={
                  <span className="grid min-w-0 grid-cols-[auto_1fr] items-center gap-4">
                    <span className="num font-sans text-[13px] font-semibold text-gold">{process.week}</span>
                    <span className="h4 min-w-0 font-sans text-white">{process.title}</span>
                  </span>
                }
              >
                <ul className="grid gap-2">
                  {process.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[15.5px] leading-[1.8] text-white/70">
                      <span aria-hidden="true" className="mt-[10px] size-1 shrink-0 bg-gold/60" />
                      {item}
                    </li>
                  ))}
                </ul>
              </Disclosure>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-[80px] md:px-10 md:py-[110px]">
        <div className="mx-auto max-w-[960px]">
          <h2 className="h2 font-sans text-navy">
            你<span className={accent.textOnLight}>是不是該</span>進這個階段
          </h2>
          <p className="lead mt-4 max-w-[680px]">兩個自我檢視：第一個看你準備好了沒，第二個看有沒有該先喊停的訊號。</p>

          <div className="mt-[38px]">
            <h3 className="h3 font-sans text-emerald-700">準備好的訊號</h3>
            <ul className="mt-4 grid grid-cols-1 gap-3">
              {stage.readiness.map((readiness) => (
                <li
                  key={readiness.text}
                  className={`flex items-start gap-3 border border-bd bg-white p-4 ${
                    readiness.positive ? "border-l-4 border-l-emerald-500" : "border-l-4 border-l-amber-400"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`grid size-5 shrink-0 place-items-center text-[11px] font-bold text-white ${
                      readiness.positive ? "bg-emerald-500" : "bg-amber-400"
                    }`}
                  >
                    {readiness.positive ? "✓" : "!"}
                  </span>
                  <span className="text-[15px] leading-[1.65] text-tx">{readiness.text}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 border-t border-bd2 pt-10">
            <h3 className="h3 font-sans text-[#A32F29]">如果遇到這些，我們會喊停</h3>
            <div className="mt-4 border-t border-bd">
              {stage.redFlags.map((redFlag) => (
                <article key={redFlag.title} className="border-b border-bd border-l-4 border-l-[rgba(179,38,30,.7)] bg-white px-5 [&>div]:!border-0">
                  <Disclosure
                    id={`${stage.slug}-${redFlag.title}`}
                    summary={<span className="h4 min-w-0 font-sans text-[#A32F29]">{redFlag.title}</span>}
                  >
                    <p className="text-[14.5px] leading-[1.8] text-tx2">{redFlag.desc}</p>
                  </Disclosure>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-[80px] md:px-10 md:py-[110px]">
        <div className="mx-auto max-w-[760px]">
          <h2 className="h2 font-sans text-navy">這階段最常被問到的問題</h2>
          <div className="mt-8 border-b border-bd">
            {stage.faqs.map((faq, index) => (
              <Disclosure
                key={faq.q}
                id={`${stage.slug}-faq-${index + 1}`}
                defaultOpen={index === 0}
                summary={
                  <span className="grid min-w-0 grid-cols-[auto_1fr] items-center gap-4">
                    <span className="num font-sans text-[13px] text-gold-d">{String(index + 1).padStart(2, "0")}</span>
                    <span className="min-w-0 text-[17px] leading-[1.6] text-tx">{faq.q}</span>
                  </span>
                }
              >
                <p className="max-w-[700px] text-[16px] leading-[1.85] text-tx2">{faq.a}</p>
              </Disclosure>
            ))}
          </div>
        </div>
      </section>

      {relatedCase && (
        <section className="bg-cream px-5 py-[80px] md:px-10 md:py-[110px]">
          <div className="mx-auto max-w-[960px]">
            <h2 className="h2 font-sans text-navy">
              這階段在真實案子裡<span className={accent.textOnLight}>長什麼樣</span>
            </h2>
            <Link href={`/cases/${relatedCase.slug}`} className="mt-8 block overflow-hidden border border-bd bg-white hover:border-gold">
              <div className="grid min-w-0 grid-cols-1 md:grid-cols-[1.2fr_1fr]">
                <div className="relative h-[240px] overflow-hidden md:h-auto md:min-h-[280px]">
                  <Image src={relatedCase.heroImage} alt={relatedCase.title} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover" />
                </div>
                <div className="min-w-0 p-7 md:p-9">
                  <div className="flex flex-wrap gap-1.5">
                    {relatedCase.tags.map((tag) => (
                      <span
                        key={tag.label}
                        className={`px-2.5 py-[3px] text-[11px] font-medium ${
                          tag.variant === "sky" ? "bg-[rgba(91,143,168,0.08)] text-sky" : "bg-[rgba(212,168,92,0.12)] text-gold-d"
                        }`}
                      >
                        {tag.label}
                      </span>
                    ))}
                  </div>
                  <p className="num mt-4 font-sans text-[40px] leading-none text-gold-d md:text-[48px]">{relatedCase.num}</p>
                  <h3 className="h3 mt-3 font-sans text-tx">{relatedCase.title}</h3>
                  <p className="mt-3 text-[15px] leading-[1.8] text-tx2">{relatedCase.summary}</p>
                  <span className="mt-4 inline-block text-[14.5px] font-semibold text-gold-d">看完整案例 →</span>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="bg-navy px-5 py-[80px] text-white md:px-10 md:py-[110px]">
        <div className="mx-auto max-w-[720px] text-center">
          <h2 className="h2 font-sans text-white">
            準備好進入<span className="text-gold">{stage.title}</span>了嗎？
          </h2>
          <p className="lead mx-auto mt-4 max-w-[520px] !text-white/70">聊聊你的狀況，我們會告訴你這個階段對你是不是現在最該做的事。</p>
          <div className="mt-[34px] flex flex-wrap items-center justify-center gap-3">
            <button onClick={open} className="cursor-pointer bg-gold px-[26px] py-[14px] text-[16px] font-semibold text-navy hover:bg-gold-l">
              聊聊你的產品 →
            </button>
            <Link href="/assess" className="bg-white/15 px-[26px] py-[14px] text-[16px] font-semibold text-white hover:bg-white/25">
              先做 2 分鐘評估 →
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-bd bg-white px-5 py-[48px] md:px-10">
        <nav aria-label="服務階段" className="mx-auto grid max-w-[1100px] min-w-0 grid-cols-2 gap-4 md:gap-8">
          {prevStage ? (
            <Link href={`/services/${prevStage.slug}`} className="min-w-0 border border-bd p-5 hover:border-gold md:p-6">
              <p className="text-[13px] text-tx3">← 上一階段</p>
              <p className="mt-1.5 text-[16.5px] font-semibold text-tx">{prevStage.num} {prevStage.title}</p>
              <p className="mt-1 text-[13px] text-tx3">{prevStage.timeline}</p>
            </Link>
          ) : (
            <Link href="/services" className="min-w-0 border border-bd p-5 hover:border-gold md:p-6">
              <p className="text-[13px] text-tx3">← 回服務總覽</p>
              <p className="mt-1.5 text-[16.5px] font-semibold text-tx">看完整四階段路徑</p>
            </Link>
          )}
          {nextStage ? (
            <Link href={`/services/${nextStage.slug}`} className="min-w-0 border border-bd p-5 text-right hover:border-gold md:p-6">
              <p className="text-[13px] text-tx3">下一階段 →</p>
              <p className="mt-1.5 text-[16.5px] font-semibold text-tx">{nextStage.num} {nextStage.title}</p>
              <p className="mt-1 text-[13px] text-tx3">{nextStage.timeline}</p>
            </Link>
          ) : (
            <Link href="/services/optimize" className="min-w-0 border border-bd p-5 text-right hover:border-gold md:p-6">
              <p className="text-[13px] text-tx3">進階方案 →</p>
              <p className="mt-1.5 text-[16.5px] font-semibold text-tx">運營優化方案</p>
              <p className="mt-1 text-[13px] text-tx3">已經在海外，想做更好</p>
            </Link>
          )}
        </nav>
      </section>
    </>
  );
}
