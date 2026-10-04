"use client";

import Link from "next/link";
import { Suspense, useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { CASES, CASE_CARD_META, getCase, type CaseStudy } from "@/data/cases";
import { CTA_LINE, CTA_LINE_EN } from "@/data/cta";
import { HERO_VIDEOS } from "@/data/heroVideos";
import { CASES_EN, CASE_CARD_META_EN, getCaseEn } from "@/i18n/en/cases";
import { assessPageEn } from "@/i18n/en/assess-page";
import { localizedHref, type Locale } from "@/i18n/locale";
import { assessPageZh, type AssessPageCopy } from "@/i18n/zh/assess-page";

import { useMessageBox } from "../MessageBox";
import { MatcherFlow, type MatcherFlowQuestion } from "./MatcherFlow";

type Stage = "idea" | "tested" | "scaling";
type Blocker = "market" | "channel" | "cost" | "execution" | "compliance";
type AssessMarket = "us" | "sea" | "japan" | "europe" | "other";
type Dim = "stage" | "blocker" | "market";

interface Answers {
  readonly stage: Stage;
  readonly blocker: Blocker;
  readonly market: AssessMarket;
}

interface CaseSignature {
  readonly slug: string;
  readonly stage: Stage;
  readonly blocker: Blocker;
  readonly market: AssessMarket;
}

interface MatchResult {
  readonly slug: string;
  readonly score: number;
  readonly matched: readonly Dim[];
  readonly missed: readonly Dim[];
}

const CASE_SIGNATURES: readonly CaseSignature[] = [
  { slug: "goat-milk-soap-global", stage: "tested", blocker: "market", market: "other" },
  { slug: "fish-floss-us-fda", stage: "idea", blocker: "compliance", market: "us" },
  { slug: "bubble-tea", stage: "scaling", blocker: "execution", market: "sea" },
];

export const assessQuestions: readonly MatcherFlowQuestion[] = assessPageZh.questions;

function copyFor(locale: Locale): AssessPageCopy {
  return locale === "en" ? assessPageEn : assessPageZh;
}

function getCaseForLocale(locale: Locale, slug: string): CaseStudy | undefined {
  return locale === "en" ? getCaseEn(slug) : getCase(slug);
}

function interpolate(template: string, values: Readonly<Record<string, string | number>>): string {
  return Object.entries(values).reduce((text, [key, value]) => text.replaceAll(`{${key}}`, String(value)), template);
}

function computeMatch(answers: Answers, signature: CaseSignature): MatchResult {
  const matched: Dim[] = [];
  const missed: Dim[] = [];
  (["stage", "blocker", "market"] as const).forEach((dimension) => {
    if (answers[dimension] === signature[dimension]) matched.push(dimension);
    else missed.push(dimension);
  });
  return { slug: signature.slug, score: matched.length, matched, missed };
}

function rankMatches(answers: Answers): readonly MatchResult[] {
  return [...CASE_SIGNATURES].map((signature) => computeMatch(answers, signature)).sort((first, second) => second.score - first.score);
}

function getRankedCases(answers: Answers, focusCase?: CaseStudy) {
  const ranked = rankMatches(answers);
  const focused = focusCase ? ranked.find((result) => result.slug === focusCase.slug) : undefined;
  const primary = focused && focused.score >= 1 ? focused : ranked[0]!;
  const alternative = ranked.find((result) => result.slug !== primary.slug && result.score >= 1)
    ?? ranked.find((result) => result.slug !== primary.slug)
    ?? null;
  return { primary, alternative };
}

interface NarrativePiece {
  readonly label: string;
  readonly matched: boolean;
  readonly sentence: string;
}

function getChapterHint(answers: Answers, copy: AssessPageCopy) {
  return answers.market === "us" ? copy.northAmericaChapter : copy.chapterHints[answers.blocker]!;
}

function buildNarrative(result: MatchResult, answers: Answers, copy: AssessPageCopy) {
  const signature = CASE_SIGNATURES.find((item) => item.slug === result.slug);
  if (!signature) return { headline: copy.fallback.headline, pieces: [] as readonly NarrativePiece[], closing: "" };

  const pieces: readonly NarrativePiece[] = [
    {
      label: copy.narrative.dimensions.stage,
      matched: answers.stage === signature.stage,
      sentence: answers.stage === signature.stage
        ? interpolate(copy.narrative.stageMatched, { stage: copy.stageShort[answers.stage]! })
        : interpolate(copy.narrative.stageMissed, { answer: copy.stageShort[answers.stage]!, signature: copy.stageShort[signature.stage]! }),
    },
    {
      label: copy.narrative.dimensions.blocker,
      matched: answers.blocker === signature.blocker,
      sentence: answers.blocker === signature.blocker
        ? interpolate(copy.narrative.blockerMatched, { blocker: copy.blockerShort[answers.blocker]! })
        : interpolate(copy.narrative.blockerMissed, { answer: copy.blockerShort[answers.blocker]!, signature: copy.blockerShort[signature.blocker]! }),
    },
    {
      label: copy.narrative.dimensions.market,
      matched: answers.market === signature.market,
      sentence: answers.market === signature.market
        ? interpolate(copy.narrative.marketMatched, { market: copy.marketShort[answers.market]! })
        : interpolate(copy.narrative.marketMissed, { answer: copy.marketShort[answers.market]!, signature: copy.marketShort[signature.market]! }),
    },
  ];

  const narrative = result.score === 3 ? copy.narrative.exact
    : result.score === 2 ? copy.narrative.close
      : result.score === 1 ? copy.narrative.partial
        : copy.narrative.none;
  return { ...narrative, pieces };
}

export function AssessFallback({ locale = "zh" }: { readonly locale?: Locale } = {}) {
  return <section className="min-h-screen bg-navy pb-20 pt-[140px]"><div className="lufe-container text-center text-[15.5px] text-white/50">{copyFor(locale).fallback.loading}</div></section>;
}

export function AssessWizard({ locale = "zh" }: { readonly locale?: Locale } = {}) {
  return <Suspense fallback={<AssessFallback locale={locale} />}><AssessEntry locale={locale} /></Suspense>;
}

function AssessEntry({ locale }: { readonly locale: Locale }) {
  const searchParams = useSearchParams();
  const focusSlug = searchParams.get("case");
  const focusCase = focusSlug ? getCaseForLocale(locale, focusSlug) : undefined;
  return <EntryScreen focusCase={focusCase} locale={locale} />;
}

export function EntryScreen({ focusCase, locale = "zh" }: { readonly focusCase?: CaseStudy; readonly locale?: Locale }) {
  const copy = copyFor(locale);
  const cases = locale === "en" ? CASES_EN : CASES;
  const scrollToQuiz = (event: ReactMouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("assess-quiz")?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });
  };

  return (
    <>
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/cases/cases-hero-collab-1600.webp" video={HERO_VIDEOS.assess} />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href={localizedHref(locale, "/")} className="hover:text-white">{copy.entry.home}</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            {focusCase ? <><Link href={localizedHref(locale, "/cases")} className="hover:text-white">{copy.entry.cases}</Link><span aria-hidden="true" className="text-white/30">/</span><span className="text-white/75">{copy.entry.compare}</span></> : <span className="text-white/75">{copy.entry.breadcrumb}</span>}
          </nav>
          <h1 className="h1 mb-6 max-w-[880px] text-white">{copy.entry.headline[0]}<br /><span className="text-gold">{copy.entry.headline[1]}</span></h1>
          <p className="lead max-w-[640px] !text-white/75">{copy.entry.lead}</p>
          {focusCase && (
            <div className="mt-8 flex items-center gap-4 border border-gold/20 bg-white/[0.04] px-5 py-4">
              <div className="relative h-[50px] w-[68px] shrink-0 overflow-hidden"><TieredImage src={focusCase.heroImage} alt="" sizes="68px" className="absolute inset-0 h-full w-full object-cover" /></div>
              <div className="min-w-0 flex-1"><div className="mb-1 text-[10.5px] font-semibold tracking-[1.5px] text-gold/80">{copy.entry.comparing}</div><div className="truncate text-[15px] font-medium text-white/85">{focusCase.title}</div></div>
            </div>
          )}
          <a href="#assess-quiz" onClick={scrollToQuiz} className="mt-9 inline-flex border border-white/40 px-6 py-3.5 text-[15px] font-medium text-white">
            {copy.entry.start}
          </a>
        </div>
        <ScrollCue label={copy.entry.scrollCue} />
      </section>

      <section id="assess-quiz" className="scroll-mt-[74px] bg-white py-[80px] md:py-[112px]">
        <div className="mx-auto max-w-[860px] px-5 md:px-8">
          <MatcherFlow questions={copy.questions} previousLabel={copy.matcher.previous} onRestartLabel={copy.matcher.restart} answeredLabel={copy.matcher.answered} onComplete={(answers) => <AssessComplete answers={answers} focusCase={focusCase} locale={locale} />} />
          <AssessQuestionStaticCopy locale={locale} />
        </div>
      </section>

      <section className="bg-cream py-[56px] md:py-[72px]">
        <div className="lufe-container">
          <h2 className="text-[17px] font-[650] text-tx">{copy.entry.compareCases}</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {cases.map((caseItem) => (
              <Link key={caseItem.slug} href={localizedHref(locale, `/cases/${caseItem.slug}`)} className="group min-w-0">
                <div className="aspect-[4/3] overflow-hidden bg-navy">
                  <TieredImage src={caseItem.heroImage} alt={caseItem.title} loading="lazy" sizes="(min-width: 768px) 25vw, 50vw" className="h-full w-full object-cover transition-transform duration-[400ms] [@media(hover:hover)]:group-hover:scale-[1.03]" />
                </div>
                <p className="mt-3 text-[12px] text-gold-d">{caseItem.tags.map((tag) => tag.label).join(" · ")}</p>
                <h3 className="mt-1 line-clamp-2 text-[14.5px] font-semibold leading-[1.5] text-tx">{caseItem.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function AssessComplete({ answers, focusCase, locale }: { readonly answers: Readonly<Record<string, string>>; readonly focusCase?: CaseStudy; readonly locale: Locale }) {
  const router = useRouter();
  useEffect(() => {
    const query = new URLSearchParams({ stage: answers.stage, blocker: answers.blocker, market: answers.market });
    if (focusCase) query.set("case", focusCase.slug);
    router.push(`${localizedHref(locale, "/assess/result")}?${query.toString()}`);
  }, [answers.blocker, answers.market, answers.stage, focusCase, locale, router]);
  return <p className="py-10 text-[15px] text-tx2">{copyFor(locale).result.loading}</p>;
}

export function AssessQuestionStaticCopy({ locale = "zh" }: { readonly locale?: Locale } = {}) {
  const questions = copyFor(locale).questions;
  return <div className="sr-only">{questions.map((question) => <section key={question.id}><h2>{question.label}</h2><ul>{question.options.map((option) => <li key={option.value}>{option.label}{option.hint ? ` ${option.hint}` : ""}</li>)}</ul></section>)}</div>;
}

type SearchParamReader = Pick<URLSearchParams, "get">;

function hasOption(questionId: string, value: string | null): boolean {
  return Boolean(value && assessPageZh.questions.find((question) => question.id === questionId)?.options.some((option) => option.value === value));
}

export function parseAssessResultParams(searchParams: SearchParamReader, locale: Locale = "zh"): { readonly answers: Answers; readonly focusCase?: CaseStudy } | null {
  const stage = searchParams.get("stage");
  const blocker = searchParams.get("blocker");
  const market = searchParams.get("market");
  const focusSlug = searchParams.get("case");
  if (!hasOption("stage", stage) || !hasOption("blocker", blocker) || !(market && Object.hasOwn(assessPageZh.marketShort, market))) return null;
  const focusCase = focusSlug ? getCaseForLocale(locale, focusSlug) : undefined;
  if (focusSlug && (!focusCase || !CASE_SIGNATURES.some((signature) => signature.slug === focusCase.slug))) return null;
  return { answers: { stage: stage as Stage, blocker: blocker as Blocker, market: market as AssessMarket }, focusCase };
}

export function getAssessResult(searchParams: SearchParamReader, locale: Locale = "zh") {
  const parsed = parseAssessResultParams(searchParams, locale);
  if (!parsed) return null;
  return { ...parsed, ...getRankedCases(parsed.answers, parsed.focusCase) };
}

export function AssessResult({ locale = "zh" }: { readonly locale?: Locale } = {}) {
  const searchParams = useSearchParams();
  const result = getAssessResult(searchParams, locale);
  if (!result) return <InvalidAssessResult locale={locale} />;
  return <ResultScreen primary={result.primary} alternative={result.alternative} answers={result.answers} locale={locale} />;
}

export function InvalidAssessResult({ locale = "zh" }: { readonly locale?: Locale } = {}) {
  const copy = copyFor(locale);
  return <section className="min-h-screen bg-navy pb-20 pt-[140px] text-white"><div className="lufe-container max-w-[760px]"><h1 className="h1 text-white">{copy.result.invalid.headline}</h1><Link href={localizedHref(locale, "/assess")} className="mt-8 inline-flex bg-gold px-6 py-3 text-[15px] font-semibold text-navy active:scale-[.97]">{copy.result.invalid.restart}</Link></div></section>;
}

function ResultScreen({ primary, alternative, answers, locale }: { readonly primary: MatchResult; readonly alternative: MatchResult | null; readonly answers: Answers; readonly locale: Locale }) {
  const { open } = useMessageBox();
  const [copied, setCopied] = useState(false);
  const copy = copyFor(locale);
  const primaryCase = getCaseForLocale(locale, primary.slug);
  const alternativeCase = alternative ? getCaseForLocale(locale, alternative.slug) : null;
  if (!primaryCase) return null;
  const narrative = buildNarrative(primary, answers, copy);
  const meta = (locale === "en" ? CASE_CARD_META_EN : CASE_CARD_META)[primaryCase.slug];
  const chapter = getChapterHint(answers, copy);
  const ctaLine = locale === "en" ? CTA_LINE_EN : CTA_LINE;
  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // The button remains harmless in browsers without clipboard permission.
    }
  };

  return (
    <>
      <section className="relative overflow-hidden bg-navy pb-[70px] pt-[130px] text-white md:pb-[90px] md:pt-[160px]">
        <div className="lufe-container"><div className="max-w-[860px]">
          <div className="mb-8 flex justify-end"><Link href={localizedHref(locale, "/assess")} className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-white/50 hover:text-white"><span>↺</span><span>{copy.result.restart}</span></Link></div>
          <h1 className="h1 mb-8 text-white">{narrative.headline}</h1>
          <div className="mb-10 max-w-[740px] space-y-4">
            {narrative.pieces.map((piece) => <div key={piece.label} className="flex items-start gap-4"><span aria-label={piece.matched ? copy.result.matched : copy.result.different} className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[11px] font-bold ${piece.matched ? "border border-gold text-gold" : "border border-white/25 text-white/40"}`}>{piece.matched ? "✓" : "×"}</span><p className="text-[16.5px] leading-[1.8] text-white/80 md:text-[18px]"><span className="mr-2.5 inline-block min-w-[32px] text-[10.5px] font-semibold tracking-[2px] text-white/40">{piece.label}</span>{piece.sentence}</p></div>)}
          </div>
          <Link href={localizedHref(locale, chapter.href)} className="mb-10 -mt-4 inline-flex text-[15px] font-medium text-gold hover:text-white md:text-[16px]">{chapter.text}</Link>
          <p className="max-w-[700px] border-l-2 border-gold/50 pl-5 text-[15.5px] leading-[1.9] text-white/70 md:text-[17px]">{narrative.closing}</p>
        </div></div>
      </section>
      <section className="bg-navy pb-[60px] pt-[60px] md:pb-[80px] md:pt-[80px]">
        <div className="lufe-container"><div className="max-w-[860px]">
          <article className="mb-8 border border-gold/30 bg-white">
            <div className="relative h-[240px] overflow-hidden md:h-[320px]">
              <TieredImage src={primaryCase.heroImage} alt={primaryCase.title} sizes="(max-width: 860px) 100vw, 860px" className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/92 via-navy/40 to-transparent" />
              <div className="absolute left-6 top-6 flex items-center gap-2 md:left-10 md:top-8"><span className="h-px w-6 bg-gold/80" /><span className="text-[10.5px] font-semibold tracking-[2px] text-gold/90">{primaryCase.tags.map((tag) => tag.label).join(" · ")}</span></div>
              <div className="absolute bottom-6 left-6 right-6 md:bottom-9 md:left-10 md:right-10"><div className="num mb-2 text-[42px] leading-[.95] text-gold md:text-[60px]">{primaryCase.num}</div><div className="text-[15.5px] leading-snug text-white/85 md:text-[17px]">{meta?.headline ?? primaryCase.title}</div></div>
            </div>
            {meta && <div className="relative px-6 pb-10 pt-10 md:px-12 md:pb-14 md:pt-14"><blockquote className="h3 relative mb-8 text-tx"><span aria-hidden="true" className="absolute -left-3 -top-8 text-[80px] leading-none text-gold/20 md:-left-6 md:-top-12 md:text-[120px]">&ldquo;</span>{meta.painTitle}</blockquote><Link href={localizedHref(locale, `/cases/${primaryCase.slug}`)} className="inline-flex bg-navy px-6 py-3 text-[14.5px] font-semibold text-white hover:bg-gold hover:text-navy">{copy.result.fullCase}</Link></div>}
          </article>
          {alternativeCase && alternative && <article className="mb-10 border border-bd bg-white px-6 py-6 md:mb-12 md:px-8 md:py-7"><div className="flex items-start gap-5"><div className="relative h-[66px] w-[88px] shrink-0 overflow-hidden md:h-[88px] md:w-[120px]"><TieredImage src={alternativeCase.heroImage} alt="" sizes="120px" className="absolute inset-0 h-full w-full object-cover" /></div><div className="min-w-0 flex-1"><span className="text-[10.5px] font-semibold tracking-[0.5px] text-gold-d">{interpolate(copy.result.alternativeMatch, { score: alternative.score })}</span><h2 className="mt-2 text-[16.5px] font-semibold leading-[1.5] text-tx md:text-[17px]">{alternativeCase.title}</h2><Link href={localizedHref(locale, `/cases/${alternativeCase.slug}`)} className="mt-2 inline-flex text-[13.5px] font-medium text-tx2 hover:text-gold">{copy.result.otherPath}</Link></div></div></article>}
          <div className="flex flex-wrap items-start justify-between gap-6 border-t border-bd pt-8 md:pt-10"><div className="max-w-[420px]"><div className="mb-1.5 text-[16.5px] font-medium text-tx md:text-[17px]">{copy.result.ctaTitle}</div><div className="text-[14.5px] leading-[1.8] text-tx3">{ctaLine}</div></div><div className="flex flex-wrap items-center gap-6"><button type="button" onClick={copyShareLink} className="inline-flex cursor-pointer items-center gap-2 text-[14.5px] font-medium text-tx2 hover:text-gold" aria-live="polite"><span className="border-b border-tx3/40 pb-0.5">{copied ? copy.result.copied : copy.result.copy}</span>{!copied && <span>↗</span>}</button><button type="button" onClick={open} className="cursor-pointer bg-gold px-7 py-3.5 text-[15.5px] font-semibold text-navy active:scale-[.97]">{copy.result.book}</button></div></div>
        </div></div>
      </section>
    </>
  );
}
