"use client";

/**
 * AssessWizard — β3 策略（案例後暖身轉化器）
 *
 * 改動要點（相對 β2）：
 *   - Entry 頁加入 Aaron 權威 signal block（P0: 信任建立）
 *   - 反向高冷文案從「請先別按」改成正向「請給 2 分鐘的專注」（P0）
 *   - 消除 0/3 NoMatchScreen — 結果永遠走 narrative 比對（P0）
 *   - Question 點擊後 220ms 金色確認動畫才進下一題（P0）
 *   - 全程統一 navy 背景，消除 navy→cream→white 的氣場斷層（P1）
 *   - Progress bar 升級：h-4 + 大號「01 / 03」敘事頭（P1）
 *   - Result 的 3 維度從 ✓/× 表格改成敘事句式（P1）
 *   - Result 加 secondary CTA「複製這份比對」clipboard（P1）
 *   - Question 支援數字鍵 1–N 快捷選擇（P1）
 *   - 選項 hint 加入「訊號」語句，幫 TA 自我辨識（P2）
 *   - Result 客戶原話 blockquote 放大為 hero 級字體（P2）
 *   - Entry 加入「看過的人也讀這些」4 案例 chips（P2）
 */

import { Suspense, useEffect, useMemo, useState } from "react";
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

/* ────────── Narrative builder (was buildVerdict) ────────── */

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
};

const MARKET_SHORT: Record<AssessMarket, string> = {
  us: "北美",
  sea: "東南亞",
  japan: "日韓",
  europe: "歐洲",
  other: "多市場並行",
};

interface NarrativePiece {
  readonly label: string;
  readonly matched: boolean;
  readonly sentence: string;
}

interface Narrative {
  readonly headline: string;
  readonly pieces: readonly NarrativePiece[];
  readonly closing: string;
  readonly score: number;
}

function buildNarrative(result: MatchResult, answers: Answers): Narrative {
  const sig = CASE_SIGNATURES.find((s) => s.slug === result.slug);
  if (!sig || !answers.stage || !answers.blocker || !answers.market) {
    // Defensive fallback — should never hit in real flow.
    return {
      headline: "處境比對",
      pieces: [],
      closing: "",
      score: result.score,
    };
  }

  const stageMatch = answers.stage === sig.stage;
  const blockerMatch = answers.blocker === sig.blocker;
  const marketMatch = answers.market === sig.market;

  const pieces: NarrativePiece[] = [
    {
      label: "階段",
      matched: stageMatch,
      sentence: stageMatch
        ? `你和他們都在${STAGE_SHORT[answers.stage]} — 同樣的壓力點。`
        : `你在${STAGE_SHORT[answers.stage]}，他們當時在${STAGE_SHORT[sig.stage]} — 節奏不同。`,
    },
    {
      label: "卡點",
      matched: blockerMatch,
      sentence: blockerMatch
        ? `都卡在「${BLOCKER_SHORT[answers.blocker]}」這件事上。`
        : `你卡在「${BLOCKER_SHORT[answers.blocker]}」，他們當時卡在「${BLOCKER_SHORT[sig.blocker]}」 — 不同的戰場。`,
    },
    {
      label: "市場",
      matched: marketMatch,
      sentence: marketMatch
        ? `目標市場一致：${MARKET_SHORT[answers.market]}。`
        : `你看${MARKET_SHORT[answers.market]}，他們做的是${MARKET_SHORT[sig.market]}。`,
    },
  ];

  let headline: string;
  let closing: string;

  if (result.score === 3) {
    headline = "你的處境，幾乎就是他們當時遇到的事";
    closing =
      "這份案例就是為你寫的。他們的判斷邏輯跟具體做法，都能直接放到你身上。讀到最後一個字。";
  } else if (result.score === 2) {
    headline = "兩項對齊 — 同路但不同戰場";
    closing =
      "他們的判斷邏輯可以直接用，但具體做法要換成你的版本。這份案例值得讀到最後 — 學怎麼想，換怎麼做。";
  } else if (result.score === 1) {
    headline = "一項對齊 — 可以當參考方向";
    closing =
      "學他們怎麼想事情、怎麼做決定，不要照抄他們做的事。如果你想看更貼近的案例，我們手上還有幾個沒放上網的。";
  } else {
    headline = "三個維度都不同 — 但方法仍然能用";
    closing =
      "顧問的價值不是模板，是判斷方法。這份案例你可以快速瀏覽 — 看他們當時的判斷邏輯，這部分對你仍然有用。想直接聊更貼近的狀況，我們這邊隨時可以安排。";
  }

  return { headline, pieces, closing, score: result.score };
}

/* ────────── Question definitions ────────── */

interface Option<T extends string> {
  readonly value: T;
  readonly label: string;
  readonly hint?: string;
}

const STAGE_OPTIONS: readonly Option<Stage>[] = [
  {
    value: "idea",
    label: "還在台灣賣，沒真的外銷過",
    hint: "訊號：產品在國內穩定，但從來沒真的把一批貨送到海外落地過。",
  },
  {
    value: "tested",
    label: "少量試過外銷，但還沒穩定",
    hint: "訊號：跑過 1–3 次試單，有資料但抓不到節奏，下一步放不放大都不確定。",
  },
  {
    value: "scaling",
    label: "已經在出海，想放大或修正",
    hint: "訊號：海外業務跑了超過一年，但成長停滯、或某一個環節開始卡住。",
  },
];

const BLOCKER_OPTIONS: readonly Option<Blocker>[] = [
  {
    value: "market",
    label: "不知道該去哪個市場",
    hint: "訊號：手上有三個以上國家的代理聯絡，但沒有任何一個真的簽下去。",
  },
  {
    value: "channel",
    label: "找不到對的通路或合作夥伴",
    hint: "訊號：進得去超商、卻進不了量販；或是上架了但產品沒有聲量。",
  },
  {
    value: "cost",
    label: "成本算不清、毛利被吃掉",
    hint: "訊號：報價時覺得賺的，出貨後發現關稅、物流、匯率分掉一半。",
  },
  {
    value: "execution",
    label: "方向知道，但沒人真的做執行",
    hint: "訊號：付過兩家顧問的策略 deck，但沒人真的幫你跑到落地。",
  },
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
      <div className="max-w-[720px] mx-auto text-center text-white/50 text-[15.5px]">
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
    return alt ?? ranked.find((r) => r.slug !== primaryResult.slug) ?? null;
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
    return <EntryScreen focusCase={focusCase} onStart={() => setStep(1)} />;
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
            eyebrow="階段"
            question="你目前在出海這條路上的哪個位置？"
            options={STAGE_OPTIONS}
            onPick={setStage}
          />
        )}
        {step === 2 && (
          <QuestionBody
            eyebrow="卡點"
            question="最讓你睡不著的是哪一件事？"
            options={BLOCKER_OPTIONS}
            onPick={setBlocker}
          />
        )}
        {step === 3 && (
          <QuestionBody
            eyebrow="市場"
            question="你主要在看哪個市場？"
            options={MARKET_OPTIONS}
            onPick={setMarket}
          />
        )}
      </QuestionScreen>
    );
  }

  // step === 4 — always render, even if score 0
  if (!primaryResult) {
    return <EntryScreen focusCase={focusCase} onStart={() => setStep(1)} />;
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
      {/* Animated gold glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none animate-hero-glow-drift"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 25% 15%, rgba(212,168,92,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[760px] mx-auto">
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
              <div className="text-[15px] text-white/85 font-medium truncate">
                {focusCase.title}
              </div>
            </div>
          </div>
        )}

        {/* Headline — softer, less confrontational */}
        <h1 className="font-heading text-[clamp(32px,4.8vw,52px)] text-white leading-[1.12] font-light tracking-[-0.6px] mb-6">
          看看你的處境
          <br />
          <span className="font-normal text-gold">跟誰最像</span>
        </h1>

        <p className="text-[17px] md:text-[18px] text-white/65 max-w-[600px] font-light leading-[1.8] mb-10">
          三題問答，直接告訴你：你現在遇到的事、跟我們做過的四個案例，哪一個最接近 —
          <br className="hidden md:block" />
          以及那個案例的判斷方法，多少能放在你身上。
        </p>

        {/* Aaron authority signal block — P0 credibility */}
        <div className="mb-10 flex items-start gap-5 md:gap-6 px-5 py-5 md:px-6 md:py-6 bg-white/[0.03] border-l-2 border-gold">
          <div className="w-[72px] h-[72px] md:w-[88px] md:h-[88px] rounded-none bg-gradient-to-br from-gold to-[#C49545] flex items-center justify-center text-navy text-[24px] md:text-[30px] font-heading font-semibold shrink-0 shadow-lg shadow-gold/15">
            AY
          </div>
          <div className="flex-1 min-w-0 pt-1">
            <div className="text-[16.5px] md:text-[17px] font-semibold text-white leading-tight">
              Aaron Yu · 鹿飛創辦人
            </div>
            <div className="text-[11.5px] md:text-[13px] text-gold-l/90 font-medium mt-1.5 tracking-[0.3px]">
              42+ 年國際物流實戰 · 500+ 出口案件 · 30+ 國家
            </div>
            <p className="text-[13.5px] md:text-[14.5px] text-white/60 font-normal mt-3 leading-[1.8]">
              最近三個月我親自看過 47 家台灣公司的出海卡點。這三題是我每次開第一次會議前必問的問題
              — 兩分鐘後你會拿到的不是評分，而是「跟你最像的人當時的真實決策」。
            </p>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex items-center gap-8 flex-wrap mb-10">
          <button
            type="button"
            onClick={onStart}
            className="inline-block bg-gold text-navy px-8 py-[13px] rounded-none text-[15.5px] font-semibold tracking-[0.5px] transition-all hover:bg-gold-l cursor-pointer"
          >
            開始比對 →
          </button>
          <Link
            href="/cases"
            className="group inline-flex items-center gap-2 text-white/75 text-[15.5px] font-medium transition-colors hover:text-gold"
          >
            <span className="border-b border-white/20 pb-0.5 group-hover:border-gold transition-colors">
              先看案例再決定
            </span>
            <span className="transition-transform duration-300 group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>

        {/* Positive honesty — soft framing, no gatekeeping */}
        <p className="text-[13px] md:text-[13.5px] text-white/40 leading-[1.9] font-normal max-w-[600px] italic">
          我們不做 AI 評分、不給紅綠燈、不要你的 email。只要你願意給這三題 2
          分鐘的專注，我們就給你一份誠實的比對 —
          即使結論是「我們不是你需要的」，我們也會直說。
        </p>

        {/* People also viewed — horizontal case chips (P2) */}
        <div className="mt-14 pt-10 border-t border-white/10">
          <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-white/40 mb-5">
            看過的人也讀這些
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {CASES.map((c) => (
              <Link
                key={c.slug}
                href={`/cases/${c.slug}`}
                className="group block bg-white/[0.03] hover:bg-white/[0.06] border border-white/10 hover:border-gold/40 p-4 transition-all"
              >
                <div className="text-[10px] tracking-[1px] uppercase text-white/40 mb-1.5">
                  {c.tags.map((t) => t.label).join(" · ")}
                </div>
                <div className="text-[13.5px] font-semibold text-white leading-tight line-clamp-2 group-hover:text-gold transition-colors mb-1.5 min-h-[2.8em]">
                  {c.title}
                </div>
                <div className="font-heading text-[15.5px] text-gold/80 font-normal tabular-nums">
                  {c.num}
                </div>
              </Link>
            ))}
          </div>
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
  const progressPct = Math.max(0, Math.min(1, step / total)) * 100;
  const numStr = step.toString().padStart(2, "0");
  const totalStr = total.toString().padStart(2, "0");

  return (
    <section className="relative min-h-screen bg-navy pt-[130px] md:pt-[160px] pb-20 md:pb-24 px-5 md:px-10 overflow-hidden">
      {/* Animated gold glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none animate-hero-glow-drift"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 20% 5%, rgba(212,168,92,0.10) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[760px] mx-auto">
        {/* Top bar — back / reset */}
        <div className="flex items-center justify-between text-[11.5px] text-white/50 font-medium tracking-[0.5px] mb-8">
          <button
            type="button"
            onClick={onBack}
            className="hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
          >
            <span>←</span>
            <span>上一步</span>
          </button>
          <button
            type="button"
            onClick={onReset}
            className="hover:text-white transition-colors cursor-pointer"
          >
            重新開始
          </button>
        </div>

        {/* Big progress — number + bar */}
        <div className="mb-10 md:mb-14">
          <div className="flex items-end gap-3 mb-4">
            <div className="font-heading text-[48px] md:text-[64px] leading-[0.85] text-gold font-light tabular-nums">
              {numStr}
            </div>
            <div className="text-[15.5px] text-white/40 font-light pb-1.5 tabular-nums">
              / {totalStr}
            </div>
          </div>
          <div className="h-[4px] bg-white/10 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gold/60 to-gold transition-all duration-500 ease-out"
              style={{ width: `${progressPct}%` }}
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
  const [selected, setSelected] = useState<T | null>(null);

  const pick = (value: T) => {
    if (selected !== null) return;
    setSelected(value);
    window.setTimeout(() => onPick(value), 240);
  };

  // Number-key shortcuts (1..N)
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (selected !== null) return;
      // Ignore if user is typing in an input
      const target = e.target as HTMLElement | null;
      if (target?.tagName === "INPUT" || target?.tagName === "TEXTAREA") return;

      const num = parseInt(e.key, 10);
      if (!isNaN(num) && num >= 1 && num <= options.length) {
        pick(options[num - 1].value);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options, selected]);

  return (
    <div>
      <div className="text-[10.5px] md:text-[11px] font-semibold tracking-[2.5px] uppercase text-gold mb-4">
        {eyebrow}
      </div>
      <h2 className="font-heading text-[clamp(26px,3.6vw,40px)] leading-[1.22] text-white font-light tracking-[-0.4px] mb-10 md:mb-12">
        {question}
      </h2>

      <div className="space-y-3 md:space-y-4">
        {options.map((opt, i) => {
          const isSelected = selected === opt.value;
          const isDimmed = selected !== null && !isSelected;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => pick(opt.value)}
              disabled={selected !== null && !isSelected}
              aria-pressed={isSelected}
              className={`group w-full text-left px-5 py-5 md:px-6 md:py-6 border transition-all duration-200 cursor-pointer disabled:cursor-default focus:outline-none focus:ring-2 focus:ring-gold/60 ${
                isSelected
                  ? "bg-[rgba(212,168,92,0.12)] border-gold scale-[1.01] shadow-[0_8px_28px_rgba(212,168,92,0.15)]"
                  : isDimmed
                    ? "bg-white/[0.02] border-white/10 opacity-40"
                    : "bg-white/[0.03] border-white/10 hover:border-gold/50 hover:bg-white/[0.06]"
              }`}
            >
              <div className="flex items-start gap-4">
                {/* Number badge — doubles as keyboard shortcut hint */}
                <span
                  className={`shrink-0 w-8 h-8 flex items-center justify-center border text-[11px] font-semibold tabular-nums transition-colors ${
                    isSelected
                      ? "border-gold text-navy bg-gold"
                      : "border-white/20 text-white/50 group-hover:border-gold/60 group-hover:text-gold"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div
                    className={`text-[16.5px] md:text-[17.5px] font-medium leading-[1.5] transition-colors ${
                      isSelected ? "text-white" : "text-white/90"
                    }`}
                  >
                    {opt.label}
                  </div>
                  {opt.hint && (
                    <div className="mt-1.5 text-[13px] md:text-[13.5px] text-white/50 font-normal leading-[1.8]">
                      {opt.hint}
                    </div>
                  )}
                </div>
                <span
                  aria-hidden="true"
                  className={`shrink-0 mt-1 text-[16.5px] transition-all duration-300 ${
                    isSelected
                      ? "text-gold translate-x-1"
                      : "text-white/30 group-hover:text-gold group-hover:translate-x-0.5"
                  }`}
                >
                  →
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Keyboard hint */}
      <div className="mt-6 text-[11px] text-white/30 font-normal tracking-[0.3px]">
        也可以按數字鍵 {Array.from({ length: options.length }, (_, i) => i + 1).join(" / ")} 快速選擇
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
  const [copied, setCopied] = useState(false);

  if (!primaryCase) return null;

  const narrative = buildNarrative(primary, answers);
  const meta = CASE_CARD_META[primaryCase.slug];

  const copyShareLink = async () => {
    try {
      if (typeof window === "undefined") return;
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      // silently ignore — fallback browsers will see the button click do nothing
    }
  };

  return (
    <>
      {/* ─── Verdict hero (navy) ─── */}
      <section className="relative bg-navy pt-[130px] md:pt-[160px] pb-[70px] md:pb-[90px] px-5 md:px-10 overflow-hidden">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none animate-hero-glow-drift"
          style={{
            background:
              "radial-gradient(ellipse 60% 50% at 25% 15%, rgba(212,168,92,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-[860px] mx-auto">
          {/* Top row */}
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <span className="block w-8 h-px bg-gold" />
              <span className="text-[11.5px] font-semibold tracking-[2.5px] uppercase text-gold">
                比對結果 · 吻合 {primary.score} / 3
              </span>
            </div>
            <button
              type="button"
              onClick={onReset}
              className="text-[13.5px] text-white/50 font-medium hover:text-white transition-colors cursor-pointer inline-flex items-center gap-1.5"
            >
              <span>↺</span>
              <span>重新比對</span>
            </button>
          </div>

          {/* Verdict headline */}
          <h1 className="font-heading text-[clamp(28px,4.2vw,48px)] text-white leading-[1.15] font-light tracking-[-0.6px] mb-8 max-w-[820px]">
            {narrative.headline}
          </h1>

          {/* 3 narrative sentences with match/miss markers */}
          <div className="space-y-4 mb-10 max-w-[740px]">
            {narrative.pieces.map((p) => (
              <div key={p.label} className="flex items-start gap-4">
                <span
                  aria-label={p.matched ? "相同" : "不同"}
                  className={`mt-1 shrink-0 w-6 h-6 flex items-center justify-center text-[11px] font-bold transition-colors ${
                    p.matched
                      ? "bg-gold text-navy"
                      : "border border-white/25 text-white/40"
                  }`}
                >
                  {p.matched ? "✓" : "×"}
                </span>
                <p className="text-[16.5px] md:text-[18px] text-white/80 leading-[1.8] font-normal">
                  <span className="text-[10.5px] uppercase tracking-[2px] text-white/40 font-semibold mr-2.5 inline-block min-w-[32px]">
                    {p.label}
                  </span>
                  {p.sentence}
                </p>
              </div>
            ))}
          </div>

          {/* Closing paragraph */}
          <p className="text-[15.5px] md:text-[17px] text-white/70 leading-[1.9] font-normal italic max-w-[700px] border-l-2 border-gold/50 pl-5">
            {narrative.closing}
          </p>
        </div>
      </section>

      {/* ─── Case card + quote (cream bg for reading comfort) ─── */}
      <section className="bg-cream pt-[60px] md:pt-[80px] pb-[60px] md:pb-[80px] px-5 md:px-10">
        <div className="max-w-[860px] mx-auto">
          {/* Primary case card */}
          <article className="bg-white border border-gold/30 shadow-[0_12px_40px_rgba(18,38,63,0.08)] mb-8">
            <div className="relative h-[240px] md:h-[320px] overflow-hidden">
              <Image
                src={primaryCase.heroImage}
                alt={primaryCase.title}
                fill
                sizes="(max-width: 860px) 100vw, 860px"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy/92 via-navy/40 to-transparent" />

              {/* Tags eyebrow */}
              <div className="absolute left-6 md:left-10 top-6 md:top-8 flex items-center gap-2">
                <span className="block w-6 h-px bg-gold/80" />
                <span className="text-[10.5px] tracking-[2px] uppercase text-gold/90 font-semibold">
                  {primaryCase.tags.map((t) => t.label).join(" · ")}
                </span>
              </div>

              {/* Big outcome */}
              <div className="absolute left-6 md:left-10 right-6 md:right-10 bottom-6 md:bottom-9">
                <div className="font-heading text-[42px] md:text-[60px] text-gold font-light leading-[0.95] tabular-nums mb-2">
                  {primaryCase.num}
                </div>
                <div className="text-[15.5px] md:text-[17px] text-white/85 font-normal leading-snug">
                  {meta?.headline ?? primaryCase.title}
                </div>
              </div>
            </div>

            {/* Hero blockquote — the money sentence */}
            {meta && (
              <div className="px-6 md:px-12 pt-10 md:pt-14 pb-10 md:pb-14 relative">
                <div className="text-[11px] font-semibold tracking-[1.8px] uppercase text-tx3 mb-6">
                  客戶當時的原話
                </div>
                <blockquote className="relative font-heading text-[clamp(22px,3.2vw,34px)] text-tx font-normal leading-[1.45] tracking-[-0.3px] mb-8">
                  <span
                    aria-hidden="true"
                    className="absolute -left-3 md:-left-6 -top-8 md:-top-12 text-[80px] md:text-[120px] text-gold/20 font-heading leading-none select-none"
                  >
                    &ldquo;
                  </span>
                  {meta.painTitle}
                </blockquote>
                <Link
                  href={`/cases/${primaryCase.slug}`}
                  className="inline-flex items-center gap-2 bg-navy text-white px-6 py-3 rounded-none text-[14.5px] font-semibold tracking-[0.3px] hover:bg-gold hover:text-navy transition-colors"
                >
                  讀完整案例 →
                </Link>
              </div>
            )}
          </article>

          {/* Alternative case (secondary match) */}
          {altCase && alternative && (
            <div className="bg-white border border-bd px-6 md:px-8 py-6 md:py-7 mb-10 md:mb-12">
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
                    <span className="text-[10.5px] tracking-[0.5px] text-gold-d font-semibold">
                      吻合 {alternative.score}/3
                    </span>
                  </div>
                  <h2 className="text-[16.5px] md:text-[17px] text-tx font-semibold leading-[1.5] mb-2">
                    {altCase.title}
                  </h2>
                  <Link
                    href={`/cases/${altCase.slug}`}
                    className="text-[13.5px] text-tx2 font-medium hover:text-gold transition-colors inline-flex items-center gap-1"
                  >
                    看另一條路 →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* CTA row — primary (聊聊) + secondary (複製連結) */}
          <div className="border-t border-bd pt-8 md:pt-10 flex items-start justify-between flex-wrap gap-6">
            <div className="max-w-[420px]">
              <div className="text-[16.5px] md:text-[17px] text-tx font-medium mb-1.5">
                想知道這個方法放在你身上會長什麼樣？
              </div>
              <div className="text-[14.5px] text-tx3 font-normal leading-[1.8]">
                直接聊。不收費、不賣課、不承諾一定接。
              </div>
            </div>
            <div className="flex items-center gap-6 flex-wrap">
              <button
                type="button"
                onClick={copyShareLink}
                className="inline-flex items-center gap-2 text-[14.5px] text-tx2 font-medium hover:text-gold transition-colors cursor-pointer"
                aria-live="polite"
              >
                <span className="border-b border-tx3/40 pb-0.5 group-hover:border-gold transition-colors">
                  {copied ? "✓ 連結已複製" : "複製這份比對"}
                </span>
                {!copied && <span>↗</span>}
              </button>
              <button
                type="button"
                onClick={open}
                className="inline-block bg-gold text-navy px-7 py-3.5 rounded-none text-[15.5px] font-semibold tracking-[0.3px] hover:bg-gold-l transition-colors cursor-pointer"
              >
                聊聊你的狀況 →
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
