"use client";

/**
 * AssessWizard — β 策略（案例後暖身轉化器）
 *
 * 舊版問題：
 *   - 4 題問卷 → 紅綠燈 + 免費諮詢，價值交換不對等
 *   - if/else 邏輯肉眼可見，TA 識破後信任反而下降
 *   - 「免費評估」框架被 B2B 決策者視為廉價
 *
 * 新版策略：
 *   - 定位為「比對你的處境跟哪個案例最像」，而非「幫你評估」
 *   - 3 題（階段 / 卡點 / 市場）直接對上案例簽章
 *   - 結果 = 真實案例 + 吻合度 X/3 + 誠實的 verdict
 *   - 入口可從 /cases 帶 ?case=slug 鎖定焦點案例
 *   - 反向高冷：首頁「請先別按——我們人手很有限」過濾閒逛者
 */

import { Suspense, useMemo, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useMessageBox } from "../MessageBox";
import { CASES, CASE_CARD_META, getCase, type CaseStudy } from "@/data/cases";

/* ────────── Types ────────── */

type Stage = "idea" | "tested" | "scaling";
type Blocker = "market" | "channel" | "cost" | "execution";
type AssessMarket = "us" | "sea" | "japan" | "europe" | "other";

interface Answers {
  readonly stage: Stage | null;
  readonly blocker: Blocker | null;
  readonly market: AssessMarket | null;
}

type Dim = "stage" | "blocker" | "market";

interface CaseSignature {
  readonly slug: string;
  readonly stage: Stage;
  readonly blocker: Blocker;
  readonly market: AssessMarket;
}

interface MatchResult {
  readonly slug: string;
  readonly score: number; // 0-3
  readonly matched: readonly Dim[];
  readonly missed: readonly Dim[];
}

type Step = 0 | 1 | 2 | 3 | 4;

/* ────────── Case signatures ──────────
 * 每個案例當初客戶找上門時的真實處境，用來跟用戶答案做 dim-by-dim 比對。
 */

const CASE_SIGNATURES: readonly CaseSignature[] = [
  // 保健品進 Costco：已經在國內穩定、想放大到北美、卡在通路不認識你
  { slug: "costco-health", stage: "scaling", blocker: "channel", market: "us" },
  // 電子廠關稅轉移：已經在出海、卡在成本被吃掉、美國客戶
  { slug: "electronics-tariff", stage: "scaling", blocker: "cost", market: "us" },
  // 皮鞋品牌轉襪子：少量試過但沒跑起來、卡在沒人做執行、北美
  { slug: "shoe-brand", stage: "tested", blocker: "execution", market: "us" },
  // 珍奶進菲律賓：已經在出海、卡在落地執行、東南亞
  { slug: "bubble-tea", stage: "scaling", blocker: "execution", market: "sea" },
];

/* ────────── Pure matching ────────── */

function computeMatch(answers: Answers, sig: CaseSignature): MatchResult {
  const matched: Dim[] = [];
  const missed: Dim[] = [];

  if (answers.stage === sig.stage) matched.push("stage");
  else missed.push("stage");

  if (answers.blocker === sig.blocker) matched.push("blocker");
  else missed.push("blocker");

  if (answers.market === sig.market) matched.push("market");
  else missed.push("market");

  return {
    slug: sig.slug,
    score: matched.length,
    matched,
    missed,
  };
}

function rankMatches(answers: Answers): readonly MatchResult[] {
  return [...CASE_SIGNATURES]
    .map((sig) => computeMatch(answers, sig))
    .sort((a, b) => b.score - a.score);
}

/* ────────── Verdict copy ────────── */

const DIM_LABEL: Record<Dim, string> = {
  stage: "階段",
  blocker: "卡點",
  market: "市場",
};

function buildVerdict(result: MatchResult): { readonly headline: string; readonly body: string } {
  const m = result.matched.map((d) => DIM_LABEL[d]);
  const miss = result.missed.map((d) => DIM_LABEL[d]);

  if (result.score === 3) {
    return {
      headline: "你的處境幾乎就是他們當時遇到的事",
      body: "階段、卡點、市場三個都對上。這份案例值得你讀到最後一個字——他們當初的判斷過程，多半能直接用在你身上。",
    };
  }
  if (result.score === 2) {
    return {
      headline: `你們在${m.join("和")}上是同路人`,
      body: `一樣的${m.join("、")}，差在${miss.join("、")}不同——所以請把他們的「判斷邏輯」帶走，但「具體做法」要換成你的版本。這份案例可以看，但不要照抄。`,
    };
  }
  if (result.score === 1) {
    return {
      headline: `只有${m.join("")}這一點相通`,
      body: `其他兩個維度都不一樣。可以當背景故事讀，但如果你想看更接近的案例，建議直接聊聊——我們手上還有一些沒放上網的。`,
    };
  }
  return {
    headline: "這個案例跟你沒有重疊",
    body: "三個維度都不同。別浪費時間硬套——你的處境需要另外聊，我們直接幫你看有沒有接得起來的經驗。",
  };
}

/* ────────── Question definitions ────────── */

interface Option<T extends string> {
  readonly value: T;
  readonly label: string;
  readonly hint?: string;
}

const STAGE_OPTIONS: readonly Option<Stage>[] = [
  { value: "idea", label: "還在台灣賣，沒真的外銷過", hint: "產品成熟，想踏出第一步" },
  { value: "tested", label: "少量試過外銷，但還沒穩定", hint: "跑過單，但抓不到節奏" },
  { value: "scaling", label: "已經在出海，想放大或修正", hint: "在跑了，但卡住某處" },
];

const BLOCKER_OPTIONS: readonly Option<Blocker>[] = [
  { value: "market", label: "不知道該去哪個市場", hint: "方向還沒定" },
  { value: "channel", label: "找不到對的通路或合作夥伴", hint: "進不去、進得去也沒聲量" },
  { value: "cost", label: "成本算不清、毛利被吃掉", hint: "關稅、物流、匯率在咬" },
  { value: "execution", label: "方向知道，但沒人真的做執行", hint: "顧問給策略，貿易商只出貨" },
];

const MARKET_OPTIONS: readonly Option<AssessMarket>[] = [
  { value: "us", label: "美國 / 北美" },
  { value: "sea", label: "東南亞" },
  { value: "japan", label: "日韓" },
  { value: "europe", label: "歐洲" },
  { value: "other", label: "還沒決定 / 多市場並行" },
];

/* ────────── Main wrapper (Suspense for useSearchParams) ────────── */

export function AssessWizard() {
  return (
    <Suspense fallback={<AssessFallback />}>
      <AssessWizardInner />
    </Suspense>
  );
}

function AssessFallback() {
  return (
    <section className="min-h-screen bg-navy pt-[140px] pb-20 px-5 md:px-10">
      <div className="max-w-[720px] mx-auto text-center text-white/50 text-[14px]">
        載入中…
      </div>
    </section>
  );
}

/* ────────── Inner (has access to searchParams) ────────── */

function AssessWizardInner() {
  const searchParams = useSearchParams();
  const focusSlug = searchParams.get("case");
  const focusCase = focusSlug ? getCase(focusSlug) : undefined;

  const [step, setStep] = useState<Step>(0);
  const [answers, setAnswers] = useState<Answers>({
    stage: null,
    blocker: null,
    market: null,
  });

  const ranked = useMemo(() => {
    if (answers.stage && answers.blocker && answers.market) {
      return rankMatches(answers);
    }
    return [];
  }, [answers]);

  // 如果從 /cases?case=x 進來，結果頁優先拿那個案例當主比對
  const primaryResult = useMemo(() => {
    if (ranked.length === 0) return null;
    if (focusCase) {
      const focused = ranked.find((r) => r.slug === focusCase.slug);
      if (focused && focused.score >= 1) return focused;
    }
    return ranked[0];
  }, [ranked, focusCase]);

  const alternativeResult = useMemo(() => {
    if (!primaryResult || ranked.length < 2) return null;
    const alt = ranked.find((r) => r.slug !== primaryResult.slug && r.score >= 1);
    return alt ?? null;
  }, [ranked, primaryResult]);

  const setStage = (stage: Stage) => {
    setAnswers((prev) => ({ ...prev, stage }));
    setStep(2);
  };
  const setBlocker = (blocker: Blocker) => {
    setAnswers((prev) => ({ ...prev, blocker }));
    setStep(3);
  };
  const setMarket = (market: AssessMarket) => {
    setAnswers((prev) => ({ ...prev, market }));
    setStep(4);
  };

  const reset = () => {
    setStep(0);
    setAnswers({ stage: null, blocker: null, market: null });
  };

  if (step === 0) {
    return (
      <EntryScreen focusCase={focusCase} onStart={() => setStep(1)} />
    );
  }

  if (step >= 1 && step <= 3) {
    return (
      <QuestionScreen
        step={step}
        total={3}
        onBack={() => setStep((s) => (s > 1 ? ((s - 1) as Step) : 0))}
        onReset={reset}
      >
        {step === 1 && (
          <QuestionBody
            eyebrow="01 / 03 · 階段"
            question="你目前在出海這條路上的哪個位置？"
            options={STAGE_OPTIONS}
            onPick={setStage}
          />
        )}
        {step === 2 && (
          <QuestionBody
            eyebrow="02 / 03 · 卡點"
            question="最讓你睡不著的是哪一件事？"
            options={BLOCKER_OPTIONS}
            onPick={setBlocker}
          />
        )}
        {step === 3 && (
          <QuestionBody
            eyebrow="03 / 03 · 市場"
            question="你主要在看哪個市場？"
            options={MARKET_OPTIONS}
            onPick={setMarket}
          />
        )}
      </QuestionScreen>
    );
  }

  // step === 4
  if (!primaryResult) {
    return <NoMatchScreen onReset={reset} />;
  }

  return (
    <ResultScreen
      primary={primaryResult}
      alternative={alternativeResult}
      answers={answers}
      onReset={reset}
    />
  );
}

/* ────────── Entry screen ────────── */

function EntryScreen({
  focusCase,
  onStart,
}: {
  focusCase: CaseStudy | undefined;
  onStart: () => void;
}) {
  return (
    <section className="relative min-h-screen bg-navy pt-[130px] md:pt-[160px] pb-20 md:pb-28 px-5 md:px-10 overflow-hidden">
      {/* Gold glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 25% 15%, rgba(212,168,92,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[720px] mx-auto">
        {/* Breadcrumb */}
        <nav
          aria-label="Breadcrumb"
          className="mb-8 text-[11px] font-medium tracking-[1px] text-white/50"
        >
          <Link href="/" className="hover:text-gold transition-colors">
            首頁
          </Link>
          <span className="mx-2 text-white/30">/</span>
          {focusCase ? (
            <>
              <Link href="/cases" className="hover:text-gold transition-colors">
                案例
              </Link>
              <span className="mx-2 text-white/30">/</span>
              <span className="text-white/75">比對</span>
            </>
          ) : (
            <span className="text-white/75">處境比對</span>
          )}
        </nav>

        {/* Eyebrow */}
        <div className="flex items-center gap-3 mb-6">
          <span className="block w-8 h-px bg-gold" />
          <span className="text-[11.5px] font-semibold tracking-[2.5px] uppercase text-gold">
            三題 · 兩分鐘 · 不問 email
          </span>
        </div>

        {/* Focus case strip (if arrived from a case page) */}
        {focusCase && (
          <div className="mb-6 flex items-center gap-4 px-5 py-4 bg-white/[0.04] border border-gold/20 rounded-none">
            <div className="relative w-[68px] h-[50px] flex-shrink-0 overflow-hidden">
              <Image
                src={focusCase.heroImage}
                alt=""
                fill
                sizes="68px"
                className="object-cover"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10.5px] tracking-[1.5px] uppercase text-gold/80 font-semibold mb-1">
                正在比對
              </div>
              <div className="text-[13.5px] text-white/85 font-medium truncate">
                {focusCase.title}
              </div>
            </div>
          </div>
        )}

        {/* Headline */}
        <h1 className="font-heading text-[clamp(32px,4.8vw,52px)] text-white leading-[1.12] font-light tracking-[-0.6px] mb-6">
          先確認你值不值得出海。
          <br />
          <span className="font-normal text-gold">我們會老實說。</span>
        </h1>

        <p className="text-[15.5px] md:text-[17px] text-white/65 max-w-[560px] font-light leading-[1.8] mb-10">
          三題、不問 email、不給紅綠燈。
          <br className="hidden md:block" />
          我們只告訴你：你的處境，跟我們做過的四個案例，哪一個最像。
        </p>

        {/* Honest warning box — reverse high-cold filter */}
        <div className="mb-10 border-l-2 border-gold/60 pl-5 py-1">
          <p className="text-[13px] md:text-[13.5px] text-white/55 leading-[1.85] font-normal">
            我們沒做 AI 評估、沒自動報價、沒「你的產品 87 分」那種東西。
            <br />
            按下去之後，會看到的是三題問答，跟一份「你跟哪個案例最像」的誠實比對。
            <br />
            如果你只是隨便逛逛，
            <span className="text-gold/80">請先別按</span>
            ——我們人手很有限，資源留給真的在卡點上的人。
          </p>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-8 flex-wrap">
          <button
            type="button"
            onClick={onStart}
            className="inline-block bg-gold text-navy px-8 py-[13px] rounded-none text-[14px] font-semibold tracking-[0.5px] transition-all hover:bg-gold-l cursor-pointer"
          >
            好，開始比對 →
          </button>
          <Link
            href="/cases"
            className="group inline-flex items-center gap-2 text-white/75 text-[14px] font-medium transition-colors hover:text-gold"
          >
            <span className="border-b border-white/20 pb-0.5 group-hover:border-gold transition-colors">
              先看案例再決定
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ────────── Question screen wrapper ────────── */

function QuestionScreen({
  step,
  total,
  onBack,
  onReset,
  children,
}: {
  step: Step;
  total: number;
  onBack: () => void;
  onReset: () => void;
  children: React.ReactNode;
}) {
  const progress = Math.max(0, Math.min(1, step / total));
  return (
    <section className="min-h-screen bg-cream pt-[120px] md:pt-[150px] pb-20 px-5 md:px-10">
      <div className="max-w-[680px] mx-auto">
        {/* Progress row */}
        <div className="mb-10 md:mb-12">
          <div className="flex items-center justify-between text-[11.5px] text-tx3 font-medium tracking-[0.5px] mb-3">
            <button
              type="button"
              onClick={onBack}
              className="hover:text-tx transition-colors cursor-pointer"
            >
              ← 上一步
            </button>
            <button
              type="button"
              onClick={onReset}
              className="hover:text-tx transition-colors cursor-pointer"
            >
              重新開始
            </button>
          </div>
          <div className="h-[2px] bg-bd overflow-hidden">
            <div
              className="h-full bg-gold transition-all duration-500 ease-out"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>

        <div className="animate-fade-in-up">{children}</div>
      </div>
    </section>
  );
}

/* ────────── Question body (options list) ────────── */

function QuestionBody<T extends string>({
  eyebrow,
  question,
  options,
  onPick,
}: {
  eyebrow: string;
  question: string;
  options: readonly Option<T>[];
  onPick: (value: T) => void;
}) {
  return (
    <div>
      <div className="text-[10.5px] md:text-[11px] font-semibold tracking-[2.5px] uppercase text-gold mb-4">
        {eyebrow}
      </div>
      <h2 className="font-heading text-[clamp(26px,3.4vw,38px)] leading-[1.25] text-tx font-normal tracking-[-0.3px] mb-10 md:mb-12">
        {question}
      </h2>

      <div className="space-y-3 md:space-y-4">
        {options.map((opt) => (
          <button
            key={opt.value}
            type="button"
            onClick={() => onPick(opt.value)}
            className="group w-full text-left px-6 py-5 md:px-7 md:py-6 bg-white border border-bd hover:border-gold hover:shadow-[0_6px_24px_rgba(18,38,63,0.08)] transition-all cursor-pointer"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="text-[15px] md:text-[16.5px] text-tx font-medium leading-[1.5]">
                  {opt.label}
                </div>
                {opt.hint && (
                  <div className="mt-1.5 text-[12.5px] md:text-[13px] text-tx3 font-normal leading-[1.6]">
                    {opt.hint}
                  </div>
                )}
              </div>
              <span
                aria-hidden="true"
                className="flex-shrink-0 mt-1 text-tx3 text-[16px] transition-all duration-300 group-hover:text-gold group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ────────── Result screen ────────── */

function ResultScreen({
  primary,
  alternative,
  answers,
  onReset,
}: {
  primary: MatchResult;
  alternative: MatchResult | null;
  answers: Answers;
  onReset: () => void;
}) {
  const { open } = useMessageBox();
  const primaryCase = getCase(primary.slug);
  const altCase = alternative ? getCase(alternative.slug) : null;

  if (!primaryCase) return <NoMatchScreen onReset={onReset} />;

  const verdict = buildVerdict(primary);
  const meta = CASE_CARD_META[primaryCase.slug];

  // Map answers back to human labels for the breakdown
  const stageLabel =
    STAGE_OPTIONS.find((o) => o.value === answers.stage)?.label ?? "—";
  const blockerLabel =
    BLOCKER_OPTIONS.find((o) => o.value === answers.blocker)?.label ?? "—";
  const marketLabel =
    MARKET_OPTIONS.find((o) => o.value === answers.market)?.label ?? "—";

  const sig = CASE_SIGNATURES.find((s) => s.slug === primaryCase.slug);
  const caseStageLabel = sig
    ? STAGE_OPTIONS.find((o) => o.value === sig.stage)?.label ?? "—"
    : "—";
  const caseBlockerLabel = sig
    ? BLOCKER_OPTIONS.find((o) => o.value === sig.blocker)?.label ?? "—"
    : "—";
  const caseMarketLabel = sig
    ? MARKET_OPTIONS.find((o) => o.value === sig.market)?.label ?? "—"
    : "—";

  return (
    <section className="min-h-screen bg-white pt-[120px] md:pt-[150px] pb-20 md:pb-28 px-5 md:px-10">
      <div className="max-w-[860px] mx-auto">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <span className="block w-8 h-px bg-gold" />
            <span className="text-[11px] font-semibold tracking-[2.5px] uppercase text-gold">
              比對結果
            </span>
          </div>
          <button
            type="button"
            onClick={onReset}
            className="text-[12.5px] text-tx3 font-medium hover:text-tx transition-colors cursor-pointer"
          >
            重新比對
          </button>
        </div>

        {/* Verdict */}
        <h1 className="font-heading text-[clamp(28px,4vw,44px)] text-tx leading-[1.2] font-normal tracking-[-0.4px] mb-5">
          {verdict.headline}
        </h1>
        <p className="text-[15px] md:text-[16.5px] text-tx2 leading-[1.85] font-normal max-w-[640px] mb-10 md:mb-12">
          {verdict.body}
        </p>

        {/* Primary case card */}
        <article className="bg-white border border-gold/40 shadow-[0_12px_40px_rgba(18,38,63,0.08)] mb-6">
          <div className="relative h-[240px] md:h-[300px] overflow-hidden">
            <Image
              src={primaryCase.heroImage}
              alt={primaryCase.title}
              fill
              sizes="(max-width: 860px) 100vw, 860px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/35 to-transparent" />

            {/* Score badge */}
            <div className="absolute right-6 md:right-8 top-6 md:top-8 flex items-center gap-2 px-3 py-1.5 bg-gold text-navy">
              <span className="text-[10.5px] tracking-[1.5px] uppercase font-bold">
                吻合
              </span>
              <span className="font-heading text-[15px] font-semibold tabular-nums">
                {primary.score}/3
              </span>
            </div>

            {/* Title overlay */}
            <div className="absolute left-6 md:left-10 right-6 md:right-10 bottom-6 md:bottom-8">
              <div className="font-heading text-[38px] md:text-[52px] text-gold font-light leading-[0.95] tabular-nums mb-2">
                {primaryCase.num}
              </div>
              <div className="text-[14px] md:text-[16px] text-white/85 font-normal leading-snug">
                {meta?.headline ?? primaryCase.title}
              </div>
            </div>
          </div>

          {/* Dim-by-dim breakdown */}
          <div className="px-6 md:px-10 pt-8 md:pt-10 pb-8 md:pb-9">
            <div className="text-[10.5px] font-semibold tracking-[1.8px] uppercase text-tx3 mb-5">
              三維度比對
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5">
              <DimCell
                label="階段"
                matched={primary.matched.includes("stage")}
                you={stageLabel}
                them={caseStageLabel}
              />
              <DimCell
                label="卡點"
                matched={primary.matched.includes("blocker")}
                you={blockerLabel}
                them={caseBlockerLabel}
              />
              <DimCell
                label="市場"
                matched={primary.matched.includes("market")}
                you={marketLabel}
                them={caseMarketLabel}
              />
            </div>

            {meta && (
              <div className="mt-8 pt-6 border-t border-bd">
                <div className="text-[11px] font-semibold tracking-[1.8px] uppercase text-tx3 mb-3">
                  客戶當時的原話
                </div>
                <blockquote className="font-heading text-[18px] md:text-[21px] text-tx font-normal leading-[1.55] mb-6">
                  「{meta.painTitle}」
                </blockquote>
                <Link
                  href={`/cases/${primaryCase.slug}`}
                  className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-none text-[13px] font-semibold tracking-[0.3px] hover:bg-gold hover:text-navy transition-colors"
                >
                  讀完整案例 →
                </Link>
              </div>
            )}
          </div>
        </article>

        {/* Alternative case */}
        {altCase && alternative && (
          <div className="bg-cream border border-bd px-6 md:px-8 py-6 md:py-7 mb-10 md:mb-12">
            <div className="flex items-start gap-5">
              <div className="relative w-[88px] h-[66px] md:w-[120px] md:h-[88px] flex-shrink-0 overflow-hidden">
                <Image
                  src={altCase.heroImage}
                  alt=""
                  fill
                  sizes="120px"
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10.5px] tracking-[1.5px] uppercase text-tx3 font-semibold">
                    也值得一看
                  </span>
                  <span className="text-[10.5px] tracking-[0.5px] text-gold font-semibold">
                    吻合 {alternative.score}/3
                  </span>
                </div>
                <h4 className="text-[15px] md:text-[16px] text-tx font-semibold leading-[1.5] mb-2">
                  {altCase.title}
                </h4>
                <Link
                  href={`/cases/${altCase.slug}`}
                  className="text-[12.5px] text-tx2 font-medium hover:text-gold transition-colors inline-flex items-center gap-1"
                >
                  看另一條路 →
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* CTA row */}
        <div className="border-t border-bd pt-8 md:pt-10 flex items-center justify-between flex-wrap gap-6">
          <div className="max-w-[420px]">
            <div className="text-[15px] text-tx font-medium mb-1.5">
              想知道這個方法放在你身上會長什麼樣？
            </div>
            <div className="text-[13px] text-tx3 font-normal leading-[1.7]">
              直接聊。不收費、不賣課、不承諾一定接。
            </div>
          </div>
          <button
            type="button"
            onClick={open}
            className="inline-block bg-gold text-navy px-7 py-3.5 rounded-none text-[14px] font-semibold tracking-[0.3px] hover:bg-gold-l transition-colors cursor-pointer"
          >
            聊聊你的狀況 →
          </button>
        </div>
      </div>
    </section>
  );
}

/* ────────── Dim cell ────────── */

function DimCell({
  label,
  matched,
  you,
  them,
}: {
  label: string;
  matched: boolean;
  you: string;
  them: string;
}) {
  return (
    <div
      className={`px-4 py-4 md:px-5 md:py-5 border ${
        matched ? "border-gold/40 bg-[rgba(212,168,92,0.06)]" : "border-bd bg-white"
      }`}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10.5px] font-semibold tracking-[1.5px] uppercase text-tx3">
          {label}
        </span>
        <span
          className={`text-[11px] font-semibold ${
            matched ? "text-gold" : "text-tx3/70"
          }`}
        >
          {matched ? "✓ 相同" : "× 不同"}
        </span>
      </div>
      <div className="text-[11px] text-tx3 uppercase tracking-[1px] mb-1">你</div>
      <div className="text-[13px] text-tx font-medium leading-snug mb-3">{you}</div>
      <div className="text-[11px] text-tx3 uppercase tracking-[1px] mb-1">他們</div>
      <div className="text-[13px] text-tx2 font-normal leading-snug">{them}</div>
    </div>
  );
}

/* ────────── No match fallback ────────── */

function NoMatchScreen({ onReset }: { onReset: () => void }) {
  const { open } = useMessageBox();
  return (
    <section className="min-h-screen bg-white pt-[140px] pb-20 px-5 md:px-10">
      <div className="max-w-[620px] mx-auto text-center">
        <div className="text-[11px] font-semibold tracking-[2.5px] uppercase text-tx3 mb-4">
          比對結果
        </div>
        <h1 className="font-heading text-[clamp(28px,4vw,40px)] text-tx leading-[1.2] font-normal mb-5">
          你的處境，不在我們公開過的案例裡
        </h1>
        <p className="text-[15px] text-tx2 leading-[1.8] font-normal mb-10">
          這不代表我們沒做過類似的事——只是沒寫進網站。直接聊比較快。
        </p>
        <div className="flex items-center justify-center gap-6 flex-wrap">
          <button
            type="button"
            onClick={open}
            className="inline-block bg-gold text-navy px-7 py-3.5 rounded-none text-[14px] font-semibold hover:bg-gold-l transition-colors cursor-pointer"
          >
            直接聊聊 →
          </button>
          <button
            type="button"
            onClick={onReset}
            className="text-[14px] text-tx2 font-medium hover:text-tx transition-colors cursor-pointer border-b border-bd pb-0.5"
          >
            重新比對
          </button>
        </div>
      </div>

      {/* List of cases as consolation */}
      <div className="max-w-[720px] mx-auto mt-16 pt-10 border-t border-bd">
        <div className="text-[11px] font-semibold tracking-[1.8px] uppercase text-tx3 mb-5 text-center">
          或者直接看四個案例
        </div>
        <div className="grid grid-cols-2 gap-3">
          {CASES.map((c) => (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}`}
              className="px-4 py-3 border border-bd hover:border-gold hover:bg-[rgba(212,168,92,0.04)] transition-all text-[13px] text-tx font-medium"
            >
              {c.title}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
