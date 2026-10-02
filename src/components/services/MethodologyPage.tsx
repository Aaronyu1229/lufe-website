import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { HERO_VIDEOS } from "@/data/heroVideos";

import { ContactButton } from "./ContactButton";
import { MethodologyExamples } from "./methodology/MethodologyExamples";
import { RubricItem } from "./methodology/RubricItem";
import {
  BOUNDARIES_COPY,
  COMPANIONSHIP_COPY,
  DOUBLE_SCORE_COPY,
  EXAMPLES_CLOSING,
  FIRST_MONTH_COPY,
  FOUNDATIONS_CLOSING,
  FOUNDATIONS_FOOTNOTE,
  METHODOLOGY_DECISIONS,
  METHODOLOGY_DIMENSIONS,
  METHODOLOGY_FOUNDATIONS,
  ORIGIN_STORY,
  REPORT_DISCLAIMER,
  REPORT_OUTLINE,
  RULES_COPY,
  SCALE_INTRO,
  THIRD_MONTH_INTRO,
} from "./methodology/content";

export {
  BOUNDARIES_COPY,
  COMPANIONSHIP_COPY,
  DOUBLE_SCORE_COPY,
  EXAMPLES_CLOSING,
  FIRST_MONTH_COPY,
  FOUNDATIONS_CLOSING,
  FOUNDATIONS_FOOTNOTE,
  METHODOLOGY_DECISIONS,
  METHODOLOGY_DIMENSIONS,
  METHODOLOGY_EXAMPLES,
  METHODOLOGY_FOUNDATIONS,
  ORIGIN_STORY,
  REPORT_DISCLAIMER,
  REPORT_OUTLINE,
  RULES_COPY,
  SCALE_INTRO,
  THIRD_MONTH_INTRO,
} from "./methodology/content";

function SectionHeading({ children }: { readonly children: React.ReactNode }) {
  return <h2 className="h2 text-tx">{children}</h2>;
}

const DECISION_COLORS = {
  Go: "bg-navy",
  "Conditional Go": "bg-gold",
  Hold: "bg-gold-l",
  "No-Go": "bg-ember/70",
} as const;

export function MethodologyPage() {
  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop
          src="/images/v5/methodology-1600.webp"
          srcSet="/images/v5/methodology-1600.webp 1600w, /images/v5/methodology-2400.webp 2400w"
          video={HERO_VIDEOS.methodology}
        />
        <div className="lufe-container lufe-hero-content pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 text-[13px] text-white/55">
            <Link href="/" className="hover:text-white">首頁</Link>
            <span className="mx-2 text-white/30">/</span>
            <Link href="/services" className="hover:text-white">服務</Link>
            <span className="mx-2 text-white/30">/</span>
            <span className="text-white/80">鹿飛方法論</span>
          </nav>
          <p className="mb-4 text-[14px] font-semibold text-gold">鹿飛方法論</p>
          <h1 className="h1 text-white">小步出海法</h1>
          <p className="lead mt-5 max-w-[620px] whitespace-pre-line !text-white/75">市場不會因為你準備好了就要你。{"\n"}所以我們先問它。</p>
        </div>
        <ScrollCue />
      </section>

      <section className="bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container grid min-w-0 gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center md:gap-12">
          <div>
            <SectionHeading>我們的初心</SectionHeading>
            <p className="mt-6 whitespace-pre-line text-[16px] leading-[1.95] text-tx2">{ORIGIN_STORY}</p>
          </div>
          <figure className="aspect-[4/5] overflow-hidden">
            <TieredImage
              src="/images/methodology/origin-product-review-1600.webp"
              alt="女性在貨架前檢視產品包裝"
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-full w-full object-cover object-[68%_center]"
            />
          </figure>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <SectionHeading>我們怎麼問市場</SectionHeading>
          <div className="mt-8">
            <MethodologyExamples />
          </div>
          <p className="mt-8 border-t border-bd pt-6 text-[18px] font-semibold leading-[1.7] text-tx">{EXAMPLES_CLOSING}</p>
          <div className="mt-8 border-l-4 border-gold bg-white p-6 md:flex md:items-end md:justify-between md:gap-8">
            <p className="text-[18px] font-semibold leading-[1.7] text-tx">想知道你的產品會被問到什麼？</p>
            <ContactButton className="mt-5 cursor-pointer bg-navy px-6 py-3 text-[16px] font-semibold text-white hover:bg-sky md:mt-0">聊聊你的產品 →</ContactButton>
          </div>
        </div>
      </section>

      <section className="bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container grid min-w-0 gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <SectionHeading>你會拿到什麼</SectionHeading>
            <p className="mt-6 whitespace-pre-line text-[17px] leading-[1.9] text-tx2">{FIRST_MONTH_COPY}</p>
          </div>
          <div className="border-l-4 border-gold bg-cream p-6 md:p-7">
            <p className="whitespace-pre-line text-[16px] leading-[1.85] text-tx2">{THIRD_MONTH_INTRO}</p>
            <ol className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-[14px] leading-[1.6] text-tx md:grid-cols-4">
              {REPORT_OUTLINE.map((item, index) => (
                <li key={item} className="flex gap-2"><span className="font-sans font-semibold tabular-nums tracking-[-.035em] text-gold-d">{index}</span><span>{item}</span></li>
              ))}
            </ol>
            <p className="mt-6 whitespace-pre-line border-t border-bd pt-5 text-[15px] leading-[1.85] text-tx2">{REPORT_DISCLAIMER}</p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <SectionHeading>量尺：五個問題，打兩次分</SectionHeading>
          <p className="mt-6 whitespace-pre-line text-[16px] leading-[1.9] text-tx2">{SCALE_INTRO}</p>
          <div className="mt-8 bg-white px-5 md:px-8">
            {METHODOLOGY_DIMENSIONS.map((dimension, index) => <RubricItem key={dimension.name} dimension={dimension} num={String(index + 1).padStart(2, "0")} defaultOpen={index === 0} />)}
          </div>

          <div className="mt-12 grid min-w-0 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-12">
            <div>
              <h3 className="h3 text-tx">分數怎麼讀</h3>
              <div aria-hidden="true" className="mt-5">
                <div className="flex h-[6px]"><span className="w-[45%] bg-ember/70" /><span className="w-[15%] bg-gold-l" /><span className="w-[15%] bg-gold" /><span className="w-[25%] bg-navy" /></div>
                <div className="relative mt-2 h-4 text-[11px] text-tx3"><span className="absolute left-0">0</span><span className="absolute left-[45%] -translate-x-1/2">45</span><span className="absolute left-[60%] -translate-x-1/2">60</span><span className="absolute left-[75%] -translate-x-1/2">75</span><span className="absolute right-0">100</span></div>
              </div>
              <div className="mt-5 border border-bd bg-white">
                {METHODOLOGY_DECISIONS.map((decision) => (
                  <div key={decision.verdict} className="grid grid-cols-[86px_minmax(0,1fr)] gap-x-4 border-b border-bd p-4 last:border-b-0 md:grid-cols-[96px_180px_minmax(0,1fr)]">
                    <span className="flex items-center gap-2 font-sans text-[16px] font-semibold tabular-nums tracking-[-.035em] text-gold-d"><span aria-hidden="true" className={`h-2 w-2 shrink-0 ${DECISION_COLORS[decision.verdict]}`} />{decision.score}</span>
                    <strong className="text-[15px] text-tx">{decision.verdict}</strong>
                    <span className="col-span-2 mt-2 text-[14px] leading-[1.7] text-tx2 md:col-span-1 md:mt-0">{decision.advice}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-l-4 border-sky bg-white p-6 md:p-7">
              <h3 className="h3 text-tx">打兩次分</h3>
              <p className="mt-5 whitespace-pre-line text-[15px] leading-[1.9] text-tx2">{DOUBLE_SCORE_COPY}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy py-[72px] text-white md:py-[88px]">
        <div className="lufe-container max-w-[920px]">
          <h2 className="h2 text-white">我們的規矩</h2>
          <p className="mt-7 whitespace-pre-line text-[20px] font-semibold leading-[1.8] text-white md:text-[24px] md:leading-[1.75]">{RULES_COPY}</p>
        </div>
      </section>

      <section className="bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container max-w-[920px]">
          <SectionHeading>陪跑是什麼意思</SectionHeading>
          <p className="mt-6 whitespace-pre-line text-[16px] leading-[1.95] text-tx2">{COMPANIONSHIP_COPY}</p>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container max-w-[920px]">
          <SectionHeading>這套方法站在誰的肩膀上</SectionHeading>
          <p className="mt-6 text-[16px] leading-[1.9] text-tx2">我們沒有發明這些。</p>
          <div className="mt-7 grid gap-6 border-l-4 border-gold bg-white p-6 md:p-7">
            {METHODOLOGY_FOUNDATIONS.map((foundation) => (
              <p key={foundation.footnote} className="whitespace-pre-line text-[16px] leading-[1.9] text-tx2">
                {foundation.lead}<sup className="ml-0.5 text-[11px]">{foundation.footnote}</sup>{foundation.body}
              </p>
            ))}
          </div>
          <p className="mt-7 text-[16px] leading-[1.9] text-tx2">{FOUNDATIONS_CLOSING}</p>
          <p className="mt-8 border-t border-bd pt-4 text-[12px] leading-[1.8] text-tx3">{FOUNDATIONS_FOOTNOTE}</p>
        </div>
      </section>

      <section className="bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container max-w-[920px]">
          <SectionHeading>邊界</SectionHeading>
          <p className="mt-6 whitespace-pre-line text-[16px] leading-[1.95] text-tx2">{BOUNDARIES_COPY}</p>
        </div>
      </section>

      <section className="bg-cream py-[40px] md:py-[48px]">
        <div className="lufe-container">
          <Link href="/services" className="flex items-center justify-between gap-5 border border-bd bg-white p-6 hover:border-gold">
            <div>
              <p className="text-[14px] font-semibold text-sky">看完量尺，回去看路 →</p>
              <h2 className="h3 mt-3 text-tx">一家品牌在馬尼拉的第一年：品測、通路、公司落地、海外客服</h2>
            </div>
            <span aria-hidden="true" className="text-[28px] text-gold-d">→</span>
          </Link>
        </div>
      </section>

      <section className="bg-navy py-[78px] text-white md:py-[96px]">
        <div className="lufe-container">
          <div className="mx-auto max-w-[720px] text-center">
            <h2 className="h2 text-white">免費初步評估</h2>
            <p className="mt-4 text-[16px] leading-[1.85] text-white/70">30 分鐘，粗跑五個問題，不收費。{"\n"}談完你會知道自己在哪一格、該不該試、該從哪一章開始。</p>
            <ContactButton className="mt-8 cursor-pointer bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l">預約 30 分鐘 →</ContactButton>
          </div>
        </div>
      </section>
    </>
  );
}
