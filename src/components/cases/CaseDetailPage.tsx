"use client";

import { useEffect, useRef, type CSSProperties } from "react";
import Link from "next/link";

import { Carousel } from "@/components/ui";
import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { CASES, isNumericValue, type CaseStageSlug, type CaseStudy } from "@/data/cases";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { CASES_EN } from "@/i18n/en/cases";
import { casesPageEn } from "@/i18n/en/cases-page";
import { localizedHref, type Locale } from "@/i18n/locale";
import { casesPageZh } from "@/i18n/zh/cases-page";

import { useMessageBox } from "../MessageBox";

interface Props {
  readonly caseItem: CaseStudy;
  readonly locale?: Locale;
}

const tagStyles: Record<string, string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold",
};

const lightTagStyles: Record<string, string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold-d",
};

const CASE_STAGE_HREFS: Record<CaseStageSlug, string> = {
  "market-assessment": "/services/product-testing",
  "product-testing": "/services/product-testing",
  "channel-entry": "/services/north-america",
  localization: "/services/localization",
};

interface CaseDetailPageContentProps extends Props {
  readonly onMessageOpen?: () => void;
}

export function CaseDetailPageContent({ caseItem, locale = "zh", onMessageOpen = () => {} }: CaseDetailPageContentProps) {
  const copy = locale === "en" ? casesPageEn : casesPageZh;
  const cases = locale === "en" ? CASES_EN : CASES;
  const relatedCases = caseItem.related
    .map((relatedSlug) => cases.find((relatedCase) => relatedCase.slug === relatedSlug))
    .filter((relatedCase): relatedCase is CaseStudy => relatedCase !== undefined);
  const heroVideo = HERO_VIDEOS[`case:${caseItem.slug}` as keyof typeof HERO_VIDEOS];
  const storyFigureRefs = useRef<HTMLElement[]>([]);
  const timelineHeading = caseItem.timelineHeading ?? copy.detail.defaultTimelineHeading;
  const titleBreakIndex = caseItem.titleBreakAfter ? caseItem.title.indexOf(caseItem.titleBreakAfter) : -1;
  const titleLines = titleBreakIndex >= 0
    ? [caseItem.title.slice(0, titleBreakIndex + caseItem.titleBreakAfter!.length), caseItem.title.slice(titleBreakIndex + caseItem.titleBreakAfter!.length)]
    : [caseItem.title];
  const stageLinks = Array.from(
    new Map(caseItem.stagesUsed.map((stageSlug) => {
      const href = CASE_STAGE_HREFS[stageSlug];
      return [href, { ...copy.detail.stages[stageSlug], href }] as const;
    })).values(),
  );

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame: number | undefined;
    const updateDrift = () => {
      frame = undefined;
      const viewportHeight = window.innerHeight;
      const viewportCenter = viewportHeight / 2;
      storyFigureRefs.current.forEach((figure) => {
        const rect = figure.getBoundingClientRect();
        if (rect.bottom <= 0 || rect.top >= viewportHeight) {
          figure.style.setProperty("--lufe-figure-drift", "0");
          return;
        }
        const figureCenter = rect.top + rect.height / 2;
        const drift = ((viewportCenter - figureCenter) / viewportHeight) * 4;
        figure.style.setProperty("--lufe-figure-drift", `${drift}%`);
      });
    };
    const scheduleDrift = () => {
      if (frame === undefined) frame = window.requestAnimationFrame(updateDrift);
    };

    scheduleDrift();
    window.addEventListener("scroll", scheduleDrift, { passive: true });
    window.addEventListener("resize", scheduleDrift);
    return () => {
      window.removeEventListener("scroll", scheduleDrift);
      window.removeEventListener("resize", scheduleDrift);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    };
  }, [caseItem.slug]);

  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src={caseItem.heroImage} video={heroVideo} />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href={localizedHref(locale, "/cases")} className="hover:text-white">{copy.detail.breadcrumb}</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-white/75">{caseItem.tags[0]?.label}</span>
          </nav>

          <div className="mb-4 flex flex-wrap gap-1.5">
            {caseItem.tags.map((tag) => (
              <span key={tag.label} className={`px-2.5 py-[3px] text-[11px] font-medium ${tagStyles[tag.variant]}`}>
                {tag.label}
              </span>
            ))}
          </div>

          <h1 className="h1 mb-6 max-w-[880px] text-white">{titleLines.length === 2 ? <>{titleLines[0]}<br />{titleLines[1]}</> : caseItem.title}</h1>
          <p className="lead max-w-[640px] !text-white/75">{caseItem.summary}</p>
        </div>
        <ScrollCue label={copy.scrollCue} />
      </section>

      <section className="border-b border-bd bg-white py-[64px] md:py-[88px]">
        <div className="lufe-container">
          <div className="mt-6 grid gap-8 md:grid-cols-3">
            {caseItem.stats.map((stat) => (
              <div key={stat.label} className="border-t border-bd pt-6">
                {isNumericValue(stat.value) ? (
                  <div data-lufe-counter className="font-sans text-[clamp(48px,7vw,88px)] font-[650] leading-none tracking-[-.03em] text-navy">{stat.value}</div>
                ) : (
                  <div className="font-sans text-[clamp(32px,4vw,48px)] font-[650] leading-[1.15] tracking-[-.02em] text-navy">{stat.value}</div>
                )}
                <p className="mt-3 text-[15px] text-tx2">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white py-[80px] md:py-[112px]">
        <div className="lufe-container">
          {caseItem.story.map((chapter, chapterIndex) => (
            <div key={chapter.heading}>
              <article className={`grid gap-8 py-14 md:py-20 lg:grid-cols-12 ${chapterIndex === 0 ? "" : "border-t border-bd"}`}>
                <div className="self-start lg:sticky lg:top-[112px] lg:col-span-4">
                  <h2 className="mt-2 text-[clamp(24px,2.6vw,34px)] font-[650] leading-[1.3] text-tx">{chapter.heading}</h2>
                </div>
                <div className="lg:col-span-7 lg:col-start-6">
                  {chapter.paragraphs.map((paragraph, paragraphIndex) => (
                    <p key={paragraph} className={`${paragraphIndex === 0 ? "mt-0" : "mt-6"} text-[18px] leading-[1.9] text-tx2`}>{paragraph}</p>
                  ))}

                  {chapter.link && (
                    <div className="mt-6 border-t border-bd pt-6">
                      <div className="flex flex-wrap gap-2">
                        <Link href={localizedHref(locale, chapter.link.href)} className="inline-flex items-center gap-2 border border-bd px-3 py-2 text-[13.5px] text-tx2 hover:border-gold hover:text-tx">
                          {chapter.link.text}
                        </Link>
                      </div>
                    </div>
                  )}

                  {!chapter.link && chapter.showStageLinks && stageLinks.length > 0 && (
                    <div className="mt-6 border-t border-bd pt-6">
                      <div className="flex flex-wrap gap-2">
                        {stageLinks.map((stage) => (
                          <Link key={stage.href} href={localizedHref(locale, stage.href)} className="inline-flex items-center gap-2 border border-bd px-3 py-2 text-[13.5px] text-tx2 hover:border-gold hover:text-tx">
                            <span className="num text-gold-d">{stage.label}</span>
                            <span>{stage.title}</span>
                            <span aria-hidden="true" className="text-tx3">→</span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </article>

              {chapter.image && (
                <figure ref={(element) => { if (element) storyFigureRefs.current[chapterIndex] = element; }} className="mx-auto max-w-[1180px]">
                  <div className={chapter.image.aspect === "16/9" ? "aspect-[4/3] overflow-hidden md:aspect-[16/9]" : "aspect-[4/3] overflow-hidden md:aspect-[21/9]"}>
                    <TieredImage
                      src={chapter.image.src}
                      alt={chapter.image.alt}
                      loading="lazy"
                      sizes="(max-width: 1180px) 100vw, 1180px"
                      className="h-full w-full object-cover"
                      style={{
                        transform: "translateY(var(--lufe-figure-drift,0)) scale(1.06)",
                        ...(chapter.image.position ? { objectPosition: chapter.image.position } : {}),
                      } as CSSProperties}
                    />
                  </div>
                  <figcaption className="mt-3 text-[13px] text-tx3">{chapter.image.alt}</figcaption>
                </figure>
              )}
            </div>
          ))}
        </div>
      </section>

      {caseItem.timeline.length > 0 && (
        <section className="overflow-hidden bg-cream py-[80px] md:py-[100px]">
          <div className="lufe-container">
            <div className="max-w-[980px] min-w-0">
              <h2 className="h2 text-tx">{timelineHeading[0]}<span className="text-gold-d">{timelineHeading[1]}</span></h2>
            </div>
          </div>

          <div className="lufe-container">
            <Carousel
              label={copy.detail.timelineLabel}
              previousLabel={copy.detail.previousLabel}
              nextLabel={copy.detail.nextLabel}
              className="mt-8 overflow-hidden"
              itemClassName="basis-[min(78vw,330px)]"
            >
              {caseItem.timeline.map((item, index) => (
                <article key={`${item.when}-${item.title}`} className="flex min-h-[260px] min-w-0 flex-col border border-bd bg-white p-7">
                  <span className="mb-5 grid h-10 w-10 place-items-center border border-gold/40 text-[15px] font-semibold leading-none text-gold-d tabular-nums">{index + 1}</span>
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
          {caseItem.cta?.heading ? (
            <h2 className="h2 mb-4 text-tx">{caseItem.cta.heading[0]}<span className="text-gold-d">{caseItem.cta.heading[1]}</span></h2>
          ) : (
            <h2 className="h2 mb-4 text-tx">{copy.detail.defaultCtaHeading[0]}<span className="text-gold-d">{copy.detail.defaultCtaHeading[1]}</span>{copy.detail.defaultCtaSuffix}</h2>
          )}
          <p className="mx-auto mb-10 max-w-[520px] whitespace-pre-line text-[16.5px] leading-[1.8] text-tx2">{caseItem.cta?.body ?? copy.detail.defaultCtaBody}</p>
          {caseItem.cta?.notes ? <p className="mx-auto -mt-4 mb-10 max-w-[520px] whitespace-pre-line text-[14px] leading-[1.8] text-tx3">{caseItem.cta.notes}</p> : null}
          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <button onClick={onMessageOpen} className="cursor-pointer bg-gold px-9 py-[15px] text-[15.5px] font-semibold tracking-[0.5px] text-navy hover:bg-gold-l">
              {copy.detail.button}
            </button>
            <Link href={localizedHref(locale, "/assess")} className="inline-flex items-center gap-2 text-[15.5px] font-medium text-tx2 hover:text-navy">
              <span className="border-b border-tx3/40 pb-0.5">{caseItem.cta?.secondary ?? copy.detail.defaultCtaSecondary}</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
          {caseItem.cta?.footnote ? <p className="mt-6 text-[13px] text-tx3">{caseItem.cta.footnote}</p> : null}
        </div></div>
      </section>

      {relatedCases.length > 0 && (
        <section className="border-t border-bd bg-white py-[72px] md:py-[96px]">
          <div className="lufe-container"><div className="max-w-[1100px] min-w-0">
            <h2 className="h2 text-tx">{copy.detail.relatedHeading}</h2>

            <div className="mt-10 grid min-w-0 grid-cols-1 gap-[18px] md:grid-cols-2">
              {relatedCases.map((relatedCase) => (
                <Link key={relatedCase.slug} href={localizedHref(locale, `/cases/${relatedCase.slug}`)} className="group min-w-0 overflow-hidden bg-cream hover:bg-white">
                  <div className="relative h-[180px] overflow-hidden bg-navy">
                    <TieredImage src={relatedCase.heroImage} alt={relatedCase.title} sizes="(max-width: 767px) 100vw, 50vw" className="absolute inset-0 h-full w-full object-cover" />
                  </div>
                  <div className="min-w-0 p-6 md:p-7">
                    <div className="mb-3 flex flex-wrap gap-1.5">
                      {relatedCase.tags.map((tag) => (
                        <span key={tag.label} className={`px-2.5 py-[3px] text-[11px] font-medium ${lightTagStyles[tag.variant]}`}>{tag.label}</span>
                      ))}
                    </div>
                    <p className={`${isNumericValue(relatedCase.num) ? "num text-[36px]" : "text-[28px]"} mb-2.5 leading-none text-gold-d`}>{relatedCase.num}</p>
                    <h3 className="h3 mb-2 text-tx">{relatedCase.title}</h3>
                    <p className="mb-3 text-[14.5px] leading-[1.65] text-tx2">{relatedCase.cardSummary ?? relatedCase.summary}</p>
                    <span className="text-[14.5px] font-semibold text-gold-d">{copy.detail.relatedReadCase}</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="mt-[34px] text-center">
              <Link href={localizedHref(locale, "/cases")} className="inline-flex items-center gap-2 text-[14.5px] font-medium text-tx2 hover:text-navy">
                <span aria-hidden="true">←</span>
                <span className="border-b border-tx3/40 pb-0.5">{copy.detail.backToCases}</span>
              </Link>
            </div>
          </div></div>
        </section>
      )}
    </>
  );
}

export function CaseDetailPage({ caseItem, locale = "zh" }: Props) {
  const { open } = useMessageBox();

  return <CaseDetailPageContent caseItem={caseItem} locale={locale} onMessageOpen={open} />;
}
