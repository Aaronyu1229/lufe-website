import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { methodologyContentEn } from "@/i18n/en/methodology-content";
import { methodologyPageEn } from "@/i18n/en/methodology-page";
import { localizedHref, type Locale } from "@/i18n/locale";
import { methodologyContentZh } from "@/i18n/zh/methodology-content";
import { methodologyPageZh } from "@/i18n/zh/methodology-page";

import { ContactButton } from "./ContactButton";
import { MethodologyExamples } from "./methodology/MethodologyExamples";
import { RubricItem } from "./methodology/RubricItem";

export {
  BOUNDARIES_COPY,
  COMPANIONSHIP_COPY,
  DOUBLE_SCORE_COPY,
  EXAMPLES_CLOSING,
  EXAMPLES_INTRO,
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

export function MethodologyPage({ locale = "zh" }: { readonly locale?: Locale }) {
  const copy = locale === "en" ? methodologyPageEn : methodologyPageZh;
  const content = locale === "en" ? methodologyContentEn : methodologyContentZh;

  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop
          src="/images/v5/methodology-1600.webp"
          srcSet="/images/v5/methodology-1600.webp 1600w, /images/v5/methodology-2400.webp 2400w"
          video={HERO_VIDEOS.methodology}
        />
        <div className="lufe-container lufe-hero-content pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href={localizedHref(locale, "/")} className="hover:text-white">{copy.home}</Link>
            <span className="text-white/30">/</span>
            <Link href={localizedHref(locale, "/services")} className="hover:text-white">{copy.services}</Link>
            <span className="text-white/30">/</span>
            <span className="text-white/75">{copy.breadcrumb}</span>
          </nav>
          <h1 className="h1 mb-6 text-white">{copy.heroTitle}</h1>
          <p className="lead max-w-[620px] whitespace-pre-line !text-white/75">{copy.heroScene}</p>
        </div>
        <ScrollCue label={copy.scrollCueLabel} />
      </section>

      <section className="bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container grid min-w-0 gap-8 md:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] md:items-center md:gap-12">
          <div>
            <SectionHeading>{copy.originHeading}</SectionHeading>
            <p className="mt-6 whitespace-pre-line text-[16px] leading-[1.95] text-tx2">{content.originStory}</p>
          </div>
          <figure className="aspect-[4/5] overflow-hidden">
            <TieredImage
              src="/images/methodology/origin-product-review-1600.webp"
              alt={copy.originImageAlt}
              sizes="(min-width: 768px) 40vw, 100vw"
              className="h-full w-full object-cover object-[68%_center]"
            />
          </figure>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <SectionHeading>{copy.examplesHeading}</SectionHeading>
          <p className="mt-4 max-w-[640px] text-[17px] leading-[1.8] text-tx2">{content.examplesIntro}</p>
          <MethodologyExamples examples={content.examples} label={copy.examplesLabel} />
          <p className="mt-8 border-t border-bd pt-6 text-[18px] font-semibold leading-[1.7] text-tx">{content.examplesClosing}</p>
          <div className="mt-8 border-l-4 border-gold bg-white p-6 md:flex md:items-end md:justify-between md:gap-8">
            <p className="text-[18px] font-semibold leading-[1.7] text-tx">{copy.examplesQuestion}</p>
            <ContactButton className="mt-5 cursor-pointer bg-navy px-6 py-3 text-[16px] font-semibold text-white hover:bg-sky md:mt-0">{copy.assessmentAction}</ContactButton>
          </div>
        </div>
      </section>

      <section className="bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container grid min-w-0 gap-8 md:grid-cols-2 md:gap-12">
          <div>
            <SectionHeading>{copy.deliverablesHeading}</SectionHeading>
            <p className="mt-6 whitespace-pre-line text-[17px] leading-[1.9] text-tx2">{content.firstMonthCopy}</p>
          </div>
          <div className="border-l-4 border-gold bg-cream p-6 md:p-7">
            <p className="whitespace-pre-line text-[16px] leading-[1.85] text-tx2">{content.thirdMonthIntro}</p>
            <ol className="mt-5 grid grid-cols-2 gap-x-5 gap-y-3 text-[14px] leading-[1.6] text-tx md:grid-cols-4">
              {content.reportOutline.map((item, index) => (
                <li key={item} className="flex gap-2"><span className="font-sans font-semibold tabular-nums tracking-[-.035em] text-gold-d">{index}</span><span>{item}</span></li>
              ))}
            </ol>
            <p className="mt-6 whitespace-pre-line border-t border-bd pt-5 text-[15px] leading-[1.85] text-tx2">{content.reportDisclaimer}</p>
          </div>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container">
          <SectionHeading>{copy.scorecardHeading}</SectionHeading>
          <p className="mt-6 whitespace-pre-line text-[16px] leading-[1.9] text-tx2">{content.scaleIntro}</p>
          <div className="mt-8 bg-white px-5 md:px-8">
            {content.dimensions.map((dimension, index) => <RubricItem key={dimension.name} dimension={dimension} num={String(index + 1).padStart(2, "0")} defaultOpen={index === 0} locale={locale} seeLabel={copy.seeLabel} redLineLabel={copy.redLineLabel} />)}
          </div>

          <div className="mt-12 grid min-w-0 gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] md:gap-12">
            <div>
              <h3 className="h3 text-tx">{copy.scoreReadingHeading}</h3>
              <div aria-hidden="true" className="mt-5">
                <div className="flex h-[6px]"><span className="w-[45%] bg-ember/70" /><span className="w-[15%] bg-gold-l" /><span className="w-[15%] bg-gold" /><span className="w-[25%] bg-navy" /></div>
                <div className="relative mt-2 h-4 text-[11px] text-tx3"><span className="absolute left-0">0</span><span className="absolute left-[45%] -translate-x-1/2">45</span><span className="absolute left-[60%] -translate-x-1/2">60</span><span className="absolute left-[75%] -translate-x-1/2">75</span><span className="absolute right-0">100</span></div>
              </div>
              <div className="mt-5 border border-bd bg-white">
                {content.decisions.map((decision) => (
                  <div key={decision.verdict} className="grid grid-cols-[86px_minmax(0,1fr)] gap-x-4 border-b border-bd p-4 last:border-b-0 md:grid-cols-[96px_180px_minmax(0,1fr)]">
                    <span className="flex items-center gap-2 font-sans text-[16px] font-semibold tabular-nums tracking-[-.035em] text-gold-d"><span aria-hidden="true" className={`h-2 w-2 shrink-0 ${DECISION_COLORS[decision.verdict]}`} />{decision.score}</span>
                    <strong className="text-[15px] text-tx">{decision.verdict}</strong>
                    <span className="col-span-2 mt-2 text-[14px] leading-[1.7] text-tx2 md:col-span-1 md:mt-0">{decision.advice}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-l-4 border-sky bg-white p-6 md:p-7">
              <h3 className="h3 text-tx">{copy.doubleScoreHeading}</h3>
              <p className="mt-5 whitespace-pre-line text-[15px] leading-[1.9] text-tx2">{content.doubleScoreCopy}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy py-[72px] text-white md:py-[88px]">
        <div className="lufe-container max-w-[920px]">
          <h2 className="h2 text-white">{copy.rulesHeading}</h2>
          <p className="mt-7 whitespace-pre-line text-[20px] font-semibold leading-[1.8] text-white md:text-[24px] md:leading-[1.75]">{content.rulesCopy}</p>
        </div>
      </section>

      <section className="bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container max-w-[920px]">
          <SectionHeading>{copy.companionshipHeading}</SectionHeading>
          <p className="mt-6 whitespace-pre-line text-[16px] leading-[1.95] text-tx2">{content.companionshipCopy}</p>
        </div>
      </section>

      <section className="bg-cream py-[72px] md:py-[88px]">
        <div className="lufe-container max-w-[920px]">
          <SectionHeading>{copy.foundationsHeading}</SectionHeading>
          <p className="mt-6 text-[16px] leading-[1.9] text-tx2">{copy.foundationsIntro}</p>
          <div className="mt-7 grid gap-6 border-l-4 border-gold bg-white p-6 md:p-7">
            {content.foundations.map((foundation) => (
              <p key={foundation.footnote} className="whitespace-pre-line text-[16px] leading-[1.9] text-tx2">
                {foundation.lead}<sup className="ml-0.5 text-[11px]">{foundation.footnote}</sup>{foundation.body}
              </p>
            ))}
          </div>
          <p className="mt-7 text-[16px] leading-[1.9] text-tx2">{content.foundationsClosing}</p>
          <p className="mt-8 border-t border-bd pt-4 text-[12px] leading-[1.8] text-tx3">{content.foundationsFootnote}</p>
        </div>
      </section>

      <section className="bg-white py-[72px] md:py-[88px]">
        <div className="lufe-container max-w-[920px]">
          <SectionHeading>{copy.boundariesHeading}</SectionHeading>
          <p className="mt-6 whitespace-pre-line text-[16px] leading-[1.95] text-tx2">{content.boundariesCopy}</p>
        </div>
      </section>

      <section className="bg-cream py-[40px] md:py-[48px]">
        <div className="lufe-container">
          <Link href={localizedHref(locale, "/services")} className="flex items-center justify-between gap-5 border border-bd bg-white p-6 hover:border-gold">
            <div>
              <p className="text-[14px] font-semibold text-sky">{copy.returnServices.lead}</p>
              <h2 className="h3 mt-3 text-tx">{copy.returnServices.title}</h2>
            </div>
            <span aria-hidden="true" className="text-[28px] text-gold-d">→</span>
          </Link>
        </div>
      </section>

      <section className="bg-navy py-[78px] text-white md:py-[96px]">
        <div className="lufe-container">
          <div className="mx-auto max-w-[720px] text-center">
            <h2 className="h2 text-white">{copy.closing.title}</h2>
            <p className="mt-4 whitespace-pre-line text-[16px] leading-[1.85] text-white/70">{copy.closing.body}</p>
            <ContactButton className="mt-8 cursor-pointer bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l">{copy.closing.action}</ContactButton>
            <p className="mx-auto mt-6 max-w-[520px] whitespace-pre-line text-left text-[14px] leading-[1.8] text-white/60">{copy.closing.notes}</p>
          </div>
        </div>
      </section>
    </>
  );
}
