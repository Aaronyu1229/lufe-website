"use client";

import { Suspense, useEffect, useState, type MouseEvent as ReactMouseEvent } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { TieredImage } from "@/components/TieredImage";
import { CASES, CASE_CARD_META, getCase, type CaseStudy } from "@/data/cases";
import { HERO_VIDEOS } from "@/data/heroVideos";

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

const STAGE_SHORT: Record<Stage, string> = {
  idea: "起步期",
  tested: "試水期",
  scaling: "放大期",
};

const BLOCKER_SHORT: Record<Blocker, string> = {
  market: "找市場",
  channel: "找通路",
  cost: "算成本",
  execution: "缺執行",
  compliance: "搞法規",
};

const MARKET_SHORT: Record<AssessMarket, string> = {
  us: "北美",
  sea: "東南亞",
  japan: "日韓",
  europe: "歐洲",
  other: "多市場並行",
};

interface Option<T extends string> {
  readonly value: T;
  readonly label: string;
  readonly hint?: string;
}

const STAGE_OPTIONS: readonly Option<Stage>[] = [
  { value: "idea", label: "還在台灣賣，沒真的外銷過", hint: "訊號：產品在國內穩定，但從來沒真的把一批貨送到海外落地過" },
  { value: "tested", label: "少量試過外銷，但還沒穩定", hint: "訊號：跑過 1–3 次試單，有資料但抓不到節奏，下一步放不放大都不確定" },
  { value: "scaling", label: "已經在出海，想放大或修正", hint: "訊號：海外業務跑了超過一年，但成長停滯、或某一個環節開始卡住" },
];

const BLOCKER_OPTIONS: readonly Option<Blocker>[] = [
  { value: "market", label: "不知道該去哪個市場", hint: "訊號：手上有三個以上國家的代理聯絡，但沒有任何一個真的簽下去" },
  { value: "channel", label: "找不到對的通路或合作夥伴", hint: "訊號：進得去超商、卻進不了量販；或是上架了但產品沒有聲量" },
  { value: "cost", label: "成本算不清、毛利被吃掉", hint: "訊號：報價時覺得賺的，出貨後發現關稅、物流、匯率分掉一半" },
  { value: "execution", label: "方向知道，但沒人真的做執行", hint: "訊號：付過兩家顧問的策略 deck，但沒人真的幫你跑到落地" },
  { value: "compliance", label: "不確定法規、成分或標示過不過得了關", hint: "訊號：產品在台灣合法上架，但不知道目的地的主管機關、成分限制與標示格式" },
];

const MARKET_OPTIONS: readonly Option<AssessMarket>[] = [
  { value: "us", label: "美國 / 北美" },
  { value: "sea", label: "東南亞" },
  { value: "japan", label: "日韓" },
  { value: "europe", label: "歐洲" },
  { value: "other", label: "還沒決定 / 多市場並行" },
];

export const assessQuestions: readonly MatcherFlowQuestion[] = [
  { id: "stage", label: "你目前在出海這條路上的哪個位置？", options: STAGE_OPTIONS },
  { id: "blocker", label: "最讓你睡不著的是哪一件事？", options: BLOCKER_OPTIONS },
  { id: "market", label: "你主要在看哪個市場？", options: MARKET_OPTIONS },
];

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
  const primary = focused && focused.score >= 1 ? focused : ranked[0];
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

function buildNarrative(result: MatchResult, answers: Answers) {
  const signature = CASE_SIGNATURES.find((item) => item.slug === result.slug);
  if (!signature) return { headline: "處境比對", pieces: [] as readonly NarrativePiece[], closing: "" };

  const pieces: readonly NarrativePiece[] = [
    {
      label: "階段",
      matched: answers.stage === signature.stage,
      sentence: answers.stage === signature.stage
        ? `你和他們都在${STAGE_SHORT[answers.stage]} — 同樣的壓力點`
        : `你在${STAGE_SHORT[answers.stage]}，他們當時在${STAGE_SHORT[signature.stage]} — 節奏不同`,
    },
    {
      label: "卡點",
      matched: answers.blocker === signature.blocker,
      sentence: answers.blocker === signature.blocker
        ? `都卡在「${BLOCKER_SHORT[answers.blocker]}」這件事上`
        : `你卡在「${BLOCKER_SHORT[answers.blocker]}」，他們當時卡在「${BLOCKER_SHORT[signature.blocker]}」 — 不同的戰場`,
    },
    {
      label: "市場",
      matched: answers.market === signature.market,
      sentence: answers.market === signature.market
        ? `目標市場一致：${MARKET_SHORT[answers.market]}`
        : `你看${MARKET_SHORT[answers.market]}，他們做的是${MARKET_SHORT[signature.market]}`,
    },
  ];

  if (result.score === 3) return { headline: "你的處境，幾乎就是他們當時遇到的事", pieces, closing: "這份案例就是為你寫的。他們的判斷邏輯跟具體做法，都能直接放到你身上。讀到最後一個字" };
  if (result.score === 2) return { headline: "兩項對齊 — 同路但不同戰場", pieces, closing: "他們的判斷邏輯可以直接用，但具體做法要換成你的版本。這份案例值得讀到最後 — 學怎麼想，換怎麼做" };
  if (result.score === 1) return { headline: "一項對齊 — 可以當參考方向", pieces, closing: "學他們怎麼想事情、怎麼做決定，不要照抄他們做的事。如果你想看更貼近的案例，鹿飛還有幾個沒放上網的" };
  return { headline: "三個維度都不同 — 但方法仍然能用", pieces, closing: "顧問的價值不是模板，是判斷方法。這份案例你可以快速瀏覽 — 看他們當時的判斷邏輯，這部分對你仍然有用。想直接聊更貼近的狀況，鹿飛隨時可以安排" };
}

export function AssessFallback() {
  return <section className="min-h-screen bg-navy pb-20 pt-[140px]"><div className="lufe-container text-center text-[15.5px] text-white/50">載入中…</div></section>;
}

export function AssessWizard() {
  return <Suspense fallback={<AssessFallback />}><AssessEntry /></Suspense>;
}

function AssessEntry() {
  const searchParams = useSearchParams();
  const focusSlug = searchParams.get("case");
  const focusCase = focusSlug ? getCase(focusSlug) : undefined;
  return <EntryScreen focusCase={focusCase} />;
}

export function EntryScreen({ focusCase }: { readonly focusCase?: CaseStudy }) {
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
            <Link href="/" className="hover:text-white">首頁</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            {focusCase ? <><Link href="/cases" className="hover:text-white">案例</Link><span aria-hidden="true" className="text-white/30">/</span><span className="text-white/75">比對</span></> : <span className="text-white/75">處境比對</span>}
          </nav>
          <h1 className="h1 mb-6 max-w-[880px] text-white">看看你的處境，<br /><span className="text-gold">跟哪個案例最像</span></h1>
          <p className="lead max-w-[640px] !text-white/75">三個問題，約 2 分鐘。比對鹿飛做過的三個案例，找出最接近的一個，以及當時的判斷方法</p>
          {focusCase && (
            <div className="mt-8 flex items-center gap-4 border border-gold/20 bg-white/[0.04] px-5 py-4">
              <div className="relative h-[50px] w-[68px] shrink-0 overflow-hidden"><TieredImage src={focusCase.heroImage} alt="" sizes="68px" className="absolute inset-0 h-full w-full object-cover" /></div>
              <div className="min-w-0 flex-1"><div className="mb-1 text-[10.5px] font-semibold tracking-[1.5px] text-gold/80">正在比對</div><div className="truncate text-[15px] font-medium text-white/85">{focusCase.title}</div></div>
            </div>
          )}
          <a href="#assess-quiz" onClick={scrollToQuiz} className="mt-9 inline-flex border border-white/40 px-6 py-3.5 text-[15px] font-medium text-white">
            開始比對 ↓
          </a>
        </div>
        <ScrollCue />
      </section>

      <section id="assess-quiz" className="scroll-mt-[74px] bg-white py-[80px] md:py-[112px]">
        <div className="mx-auto max-w-[860px] px-5 md:px-8">
          <MatcherFlow questions={assessQuestions} onRestartLabel="重新開始" onComplete={(answers) => <AssessComplete answers={answers} focusCase={focusCase} />} />
          <AssessQuestionStaticCopy />
        </div>
      </section>

      <section className="bg-cream py-[56px] md:py-[72px]">
        <div className="lufe-container">
          <h2 className="text-[17px] font-[650] text-tx">會和這三個案例比對</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
            {CASES.map((caseItem) => (
              <Link key={caseItem.slug} href={`/cases/${caseItem.slug}`} className="group min-w-0">
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

function AssessComplete({ answers, focusCase }: { readonly answers: Readonly<Record<string, string>>; readonly focusCase?: CaseStudy }) {
  const router = useRouter();
  useEffect(() => {
    const query = new URLSearchParams({ stage: answers.stage, blocker: answers.blocker, market: answers.market });
    if (focusCase) query.set("case", focusCase.slug);
    router.push(`/assess/result?${query.toString()}`);
  }, [answers.blocker, answers.market, answers.stage, focusCase, router]);
  return <p className="py-10 text-[15px] text-tx2">載入結果…</p>;
}

export function AssessQuestionStaticCopy() {
  return <div className="sr-only">{assessQuestions.map((question) => <section key={question.id}><h2>{question.label}</h2><ul>{question.options.map((option) => <li key={option.value}>{option.label}{option.hint ? ` ${option.hint}` : ""}</li>)}</ul></section>)}</div>;
}

type SearchParamReader = Pick<URLSearchParams, "get">;

export function parseAssessResultParams(searchParams: SearchParamReader): { readonly answers: Answers; readonly focusCase?: CaseStudy } | null {
  const stage = searchParams.get("stage");
  const blocker = searchParams.get("blocker");
  const market = searchParams.get("market");
  const focusSlug = searchParams.get("case");
  if (!STAGE_OPTIONS.some((option) => option.value === stage) || !BLOCKER_OPTIONS.some((option) => option.value === blocker) || !MARKET_OPTIONS.some((option) => option.value === market)) return null;
  const focusCase = focusSlug ? getCase(focusSlug) : undefined;
  if (focusSlug && (!focusCase || !CASE_SIGNATURES.some((signature) => signature.slug === focusCase.slug))) return null;
  return { answers: { stage: stage as Stage, blocker: blocker as Blocker, market: market as AssessMarket }, focusCase };
}

export function getAssessResult(searchParams: SearchParamReader) {
  const parsed = parseAssessResultParams(searchParams);
  if (!parsed) return null;
  return { ...parsed, ...getRankedCases(parsed.answers, parsed.focusCase) };
}

export function AssessResult() {
  const searchParams = useSearchParams();
  const result = getAssessResult(searchParams);
  if (!result) return <InvalidAssessResult />;
  return <ResultScreen primary={result.primary} alternative={result.alternative} answers={result.answers} />;
}

export function InvalidAssessResult() {
  return <section className="min-h-screen bg-navy pb-20 pt-[140px] text-white"><div className="lufe-container max-w-[760px]"><h1 className="h1 text-white">這份比對連結不完整</h1><Link href="/assess" className="mt-8 inline-flex bg-gold px-6 py-3 text-[15px] font-semibold text-navy active:scale-[.97]">重新比對 →</Link></div></section>;
}

function ResultScreen({ primary, alternative, answers }: { readonly primary: MatchResult; readonly alternative: MatchResult | null; readonly answers: Answers }) {
  const { open } = useMessageBox();
  const [copied, setCopied] = useState(false);
  const primaryCase = getCase(primary.slug);
  const alternativeCase = alternative ? getCase(alternative.slug) : null;
  if (!primaryCase) return null;
  const narrative = buildNarrative(primary, answers);
  const meta = CASE_CARD_META[primaryCase.slug];
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
          <div className="mb-8 flex justify-end"><Link href="/assess" className="inline-flex items-center gap-1.5 text-[13.5px] font-medium text-white/50 hover:text-white"><span>↺</span><span>重新比對</span></Link></div>
          <h1 className="h1 mb-8 text-white">{narrative.headline}</h1>
          <div className="mb-10 max-w-[740px] space-y-4">
            {narrative.pieces.map((piece) => <div key={piece.label} className="flex items-start gap-4"><span aria-label={piece.matched ? "相同" : "不同"} className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center text-[11px] font-bold ${piece.matched ? "border border-gold text-gold" : "border border-white/25 text-white/40"}`}>{piece.matched ? "✓" : "×"}</span><p className="text-[16.5px] leading-[1.8] text-white/80 md:text-[18px]"><span className="mr-2.5 inline-block min-w-[32px] text-[10.5px] font-semibold tracking-[2px] text-white/40">{piece.label}</span>{piece.sentence}</p></div>)}
          </div>
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
            {meta && <div className="relative px-6 pb-10 pt-10 md:px-12 md:pb-14 md:pt-14"><blockquote className="h3 relative mb-8 text-tx"><span aria-hidden="true" className="absolute -left-3 -top-8 text-[80px] leading-none text-gold/20 md:-left-6 md:-top-12 md:text-[120px]">&ldquo;</span>{meta.painTitle}</blockquote><Link href={`/cases/${primaryCase.slug}`} className="inline-flex bg-navy px-6 py-3 text-[14.5px] font-semibold text-white hover:bg-gold hover:text-navy">讀完整案例 →</Link></div>}
          </article>
          {alternativeCase && alternative && <article className="mb-10 border border-bd bg-white px-6 py-6 md:mb-12 md:px-8 md:py-7"><div className="flex items-start gap-5"><div className="relative h-[66px] w-[88px] shrink-0 overflow-hidden md:h-[88px] md:w-[120px]"><TieredImage src={alternativeCase.heroImage} alt="" sizes="120px" className="absolute inset-0 h-full w-full object-cover" /></div><div className="min-w-0 flex-1"><span className="text-[10.5px] font-semibold tracking-[0.5px] text-gold-d">吻合 {alternative.score}/3</span><h2 className="mt-2 text-[16.5px] font-semibold leading-[1.5] text-tx md:text-[17px]">{alternativeCase.title}</h2><Link href={`/cases/${alternativeCase.slug}`} className="mt-2 inline-flex text-[13.5px] font-medium text-tx2 hover:text-gold">看另一條路 →</Link></div></div></article>}
          <div className="flex flex-wrap items-start justify-between gap-6 border-t border-bd pt-8 md:pt-10"><div className="max-w-[420px]"><div className="mb-1.5 text-[16.5px] font-medium text-tx md:text-[17px]">想知道這個方法放在你身上會長什麼樣？</div><div className="text-[14.5px] leading-[1.8] text-tx3">直接聊。不收費、不賣課、不承諾一定接</div></div><div className="flex flex-wrap items-center gap-6"><button type="button" onClick={copyShareLink} className="inline-flex cursor-pointer items-center gap-2 text-[14.5px] font-medium text-tx2 hover:text-gold" aria-live="polite"><span className="border-b border-tx3/40 pb-0.5">{copied ? "✓ 連結已複製" : "複製這份比對"}</span>{!copied && <span>↗</span>}</button><button type="button" onClick={open} className="cursor-pointer bg-gold px-7 py-3.5 text-[15.5px] font-semibold text-navy active:scale-[.97]">聊聊你的狀況 →</button></div></div>
        </div></div>
      </section>
    </>
  );
}
