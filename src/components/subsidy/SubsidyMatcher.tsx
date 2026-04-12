"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  MATCHER_QUESTIONS,
  matchSubsidies,
  type MatcherAnswers,
  type SizeAnswer,
  type StageAnswer,
  type IndustryAnswer,
  type ProblemAnswer,
  type Subsidy,
} from "@/data/subsidies";
import { SubsidyIcon } from "./SubsidyIcons";
import { useMessageBox } from "../MessageBox";

/**
 * SubsidyMatcher — 4-step inline quiz on /resources/subsidies.
 * Drives the popup funnel: popup hook → click → deep link to #match → quiz
 * → personalized result → CTA.
 *
 * Keeps all state local (no backend). Answers determine which subsidies
 * to recommend via matchSubsidies().
 */

type PartialAnswers = Partial<MatcherAnswers>;

const accentToText: Record<Subsidy["accent"], string> = {
  sky: "text-sky",
  gold: "text-gold",
  ember: "text-ember",
};

const accentToBg: Record<Subsidy["accent"], string> = {
  sky: "bg-[rgba(91,143,168,0.08)]",
  gold: "bg-[rgba(212,168,92,0.1)]",
  ember: "bg-[rgba(217,139,74,0.08)]",
};

const accentToBorder: Record<Subsidy["accent"], string> = {
  sky: "border-sky",
  gold: "border-gold",
  ember: "border-ember",
};

export function SubsidyMatcher() {
  const [step, setStep] = useState<number>(0);
  const [answers, setAnswers] = useState<PartialAnswers>({});
  const [completed, setCompleted] = useState(false);

  const totalSteps = MATCHER_QUESTIONS.length;
  const progress = completed ? 100 : (step / totalSteps) * 100;

  const handleAnswer = (questionId: keyof MatcherAnswers, value: string) => {
    const nextAnswers: PartialAnswers = {
      ...answers,
      [questionId]: value,
    };
    setAnswers(nextAnswers);

    if (step < totalSteps - 1) {
      // Small delay so user sees the selection before transition
      setTimeout(() => setStep(step + 1), 280);
    } else {
      // Last question — complete
      setTimeout(() => setCompleted(true), 320);
    }
  };

  const handleRestart = () => {
    setStep(0);
    setAnswers({});
    setCompleted(false);
  };

  const currentQuestion = MATCHER_QUESTIONS[step];
  const currentAnswer = answers[currentQuestion.id];

  // Compute result only when completed and answers are full
  const result =
    completed &&
    answers.size &&
    answers.stage &&
    answers.industry &&
    answers.problem
      ? matchSubsidies(answers as MatcherAnswers)
      : null;

  return (
    <section
      id="match"
      className="py-[80px] md:py-[104px] px-5 md:px-10 lg:px-16 bg-navy text-white relative overflow-hidden scroll-mt-[80px]"
    >
      {/* Subtle gold glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(212,168,92,0.09) 0%, transparent 70%)",
        }}
      />

      <div className="relative max-w-[900px] mx-auto">
        <div className="text-center mb-10 md:mb-12">
          <div className="text-[11px] font-semibold tracking-[2.5px] uppercase text-gold mb-4">
            2 分鐘媒合器
          </div>
          <h2 className="font-sans text-[clamp(28px,4vw,46px)] leading-[1.1] font-extralight tracking-[-0.8px] text-white mb-5">
            算算你能拿<span className="text-gold font-normal">多少補助</span>
          </h2>
          <p className="text-[16.5px] md:text-[17px] text-white/65 max-w-[560px] mx-auto leading-[1.8]">
            回答 4 個問題，我們告訴你哪個補助最適合你的公司、
            <br className="hidden md:block" />
            以及為什麼。資料不會上傳——純客戶端運算。
          </p>
        </div>

        {/* Progress bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-[11px] font-medium tracking-[1px] uppercase text-white/50 mb-2">
            <span>
              {completed
                ? "已完成"
                : `第 ${step + 1} / ${totalSteps} 題`}
            </span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="h-[2px] bg-white/10 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-gold/60 to-gold"
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>
        </div>

        {/* Question / result container */}
        <div className="bg-white/[0.03] border border-white/10 p-6 md:p-10">
          <AnimatePresence mode="wait">
            {!completed ? (
              <motion.div
                key={`step-${step}`}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className="mb-6 md:mb-8">
                  <h3 className="font-sans text-[22px] md:text-[28px] font-light leading-[1.2] text-white mb-2">
                    {currentQuestion.label}
                  </h3>
                  <p className="text-[14.5px] md:text-[15.5px] text-white/55">
                    {currentQuestion.sublabel}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {currentQuestion.options.map((opt) => {
                    const isSelected = currentAnswer === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() =>
                          handleAnswer(
                            currentQuestion.id,
                            opt.value
                          )
                        }
                        className={`group text-left p-4 md:p-5 border transition-all cursor-pointer ${
                          isSelected
                            ? "border-gold bg-gold/[0.08]"
                            : "border-white/10 bg-white/[0.01] hover:border-gold/40 hover:bg-white/[0.04]"
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <span
                            className={`mt-1 shrink-0 w-4 h-4 rounded-full border-2 transition-colors ${
                              isSelected
                                ? "border-gold bg-gold"
                                : "border-white/30 group-hover:border-gold/60"
                            }`}
                          />
                          <div className="min-w-0">
                            <div
                              className={`text-[16.5px] md:text-[17px] font-semibold leading-tight mb-1 transition-colors ${
                                isSelected
                                  ? "text-white"
                                  : "text-white/90 group-hover:text-white"
                              }`}
                            >
                              {opt.label}
                            </div>
                            <div className="text-[13px] text-white/50">
                              {opt.hint}
                            </div>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Back button — only visible from step 2 onwards */}
                {step > 0 && (
                  <div className="mt-6 pt-6 border-t border-white/10">
                    <button
                      onClick={() => setStep(step - 1)}
                      className="text-[13.5px] text-white/55 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                    >
                      <span>←</span>
                      <span>上一題</span>
                    </button>
                  </div>
                )}
              </motion.div>
            ) : result ? (
              <motion.div
                key="result"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.36, ease: [0.22, 1, 0.36, 1] }}
              >
                <ResultView result={result} onRestart={handleRestart} />
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>

        {/* Privacy note */}
        <div className="mt-6 text-center text-[11px] text-white/35">
          問答內容全部在你的瀏覽器運算 · 我們不會儲存或上傳
        </div>
      </div>
    </section>
  );
}

/* ───────── Result view ───────── */

function ResultView({
  result,
  onRestart,
}: {
  readonly result: ReturnType<typeof matchSubsidies>;
  readonly onRestart: () => void;
}) {
  const { open } = useMessageBox();
  const primary = result.primary.subsidy;
  const primaryAccent = accentToText[primary.accent];
  const primaryBg = accentToBg[primary.accent];
  const primaryBorder = accentToBorder[primary.accent];

  return (
    <div>
      <div className="mb-8">
        <div className="text-[11px] font-semibold tracking-[2.5px] uppercase text-gold mb-3">
          媒合結果
        </div>
        <h3 className="font-sans text-[26px] md:text-[34px] font-light leading-[1.15] tracking-[-0.6px] text-white">
          {result.verdict}
        </h3>
      </div>

      {/* Primary match */}
      <div
        className={`bg-white/[0.05] border-l-4 ${primaryBorder} p-6 md:p-8 mb-5`}
      >
        <div className="flex items-start gap-5">
          <div
            className={`shrink-0 w-14 h-14 ${primaryBg} ${primaryAccent} flex items-center justify-center`}
          >
            <SubsidyIcon iconKey={primary.iconKey} size={28} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2.5 mb-1.5 flex-wrap">
              <span
                className={`text-[10.5px] font-semibold tracking-[1.5px] uppercase ${primaryAccent}`}
              >
                主推
              </span>
              <span className="text-[10.5px] text-white/40">
                {primary.agency}
              </span>
            </div>
            <h4 className="text-[20px] md:text-[21px] font-semibold text-white leading-tight mb-2">
              {primary.shortTitle}
            </h4>
            <div className={`text-[16.5px] font-light ${primaryAccent} mb-4`}>
              {primary.amount}
            </div>
            <p className="text-[15px] text-white/70 leading-[1.8] mb-4">
              <span className="font-semibold text-white">為什麼推薦：</span>
              {result.primary.reason}
            </p>
            <Link
              href={`/resources/subsidies#${primary.slug}`}
              className={`inline-flex items-center gap-2 text-[14.5px] font-semibold ${primaryAccent} hover:text-gold transition-colors`}
            >
              <span className="border-b border-current/40 pb-0.5">
                看這個補助的完整細節
              </span>
              <span>→</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Secondary matches */}
      {result.secondary.length > 0 && (
        <div className="mb-8">
          <div className="text-[10.5px] font-semibold tracking-[1.5px] uppercase text-white/50 mb-3">
            同時可以疊加申請
          </div>
          <div className="space-y-3">
            {result.secondary.map((s) => {
              const accent = accentToText[s.subsidy.accent];
              return (
                <div
                  key={s.subsidy.slug}
                  className="bg-white/[0.02] border border-white/10 p-5"
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`shrink-0 w-10 h-10 ${accentToBg[s.subsidy.accent]} ${accent} flex items-center justify-center`}
                    >
                      <SubsidyIcon iconKey={s.subsidy.iconKey} size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-baseline justify-between gap-3 flex-wrap mb-1">
                        <h5 className="text-[16.5px] font-semibold text-white leading-tight">
                          {s.subsidy.shortTitle}
                        </h5>
                        <span className={`text-[13px] font-medium ${accent}`}>
                          {s.subsidy.amount}
                        </span>
                      </div>
                      <p className="text-[13.5px] text-white/60 leading-[1.8]">
                        {s.reason}
                      </p>
                      <Link
                        href={`/resources/subsidies#${s.subsidy.slug}`}
                        className="inline-flex items-center gap-1.5 mt-2 text-[11.5px] text-white/60 hover:text-gold transition-colors"
                      >
                        看細節 →
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Bottom actions */}
      <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-5">
        <button
          onClick={onRestart}
          className="text-[13.5px] text-white/55 hover:text-white transition-colors inline-flex items-center gap-1.5 cursor-pointer"
        >
          <span>↺</span>
          <span>重新測試</span>
        </button>
        <div className="flex items-center gap-5 flex-wrap justify-center">
          <button
            onClick={open}
            className="bg-gold text-navy px-7 py-3 text-[15px] font-semibold tracking-[0.5px] hover:bg-gold-l transition-colors cursor-pointer"
          >
            聊聊這個結果 →
          </button>
          <Link
            href="/assess"
            className="group inline-flex items-center gap-1.5 text-[14.5px] text-white/70 font-medium hover:text-white transition-colors"
          >
            <span className="border-b border-white/30 pb-0.5 group-hover:border-white transition-colors">
              做完整產品評估
            </span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
