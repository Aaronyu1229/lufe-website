"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { draggable, useSpring } from "@/lib/motion";

export type MatcherFlowQuestion = {
  readonly id: string;
  readonly eyebrow?: string;
  readonly label: string;
  readonly sublabel?: string;
  readonly options: readonly {
    readonly value: string;
    readonly label: string;
    readonly hint?: string;
  }[];
};

type MatcherFlowProps = {
  readonly questions: readonly MatcherFlowQuestion[];
  readonly onComplete: (answers: Readonly<Record<string, string>>) => ReactNode;
  readonly onRestartLabel?: string;
  readonly className?: string;
};

/**
 * A shared, SSR-safe question track for the assessment and subsidy matchers.
 * Every question stays mounted in the horizontal track, so its copy is present
 * in the server markup even while a different question is visible.
 */
export function MatcherFlow({
  questions,
  onComplete,
  onRestartLabel = "重新開始",
  className = "",
}: MatcherFlowProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [confirming, setConfirming] = useState<string | null>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const advanceTimer = useRef<number | undefined>(undefined);
  const track = useSpring(0, { precision: 0.001 });
  const progress = useSpring(questions.length ? 1 / questions.length : 0, { precision: 0.001 });

  const complete = step === questions.length;
  const answered = useMemo(
    () => questions.slice(0, step).filter((question) => answers[question.id]),
    [answers, questions, step],
  );

  useEffect(() => {
    track.to(step, { response: 0.42 });
    progress.to(complete ? 1 : (step + 1) / questions.length, { response: 0.42 });
  }, [complete, progress, questions.length, step, track]);

  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport || step === 0 || complete) return;

    let width = 1;
    const detach = draggable(viewport, "x", {
      start: () => {
        width = viewport.getBoundingClientRect().width || 1;
        track.stop();
      },
      move: (delta) => track.jump(Math.max(step - Math.max(delta, 0) / width, step - 1)),
      end: (velocity) => {
        const movedBack = track.value < step - 0.16 || velocity > 560;
        const nextStep = movedBack ? step - 1 : step;
        setStep(nextStep);
        track.to(nextStep, { response: 0.36, velocity: -velocity / width });
      },
    });

    return detach;
  }, [complete, step, track]);

  const choose = (question: MatcherFlowQuestion, value: string) => {
    if (confirming) return;
    setAnswers((current) => ({ ...current, [question.id]: value }));
    setConfirming(value);
    advanceTimer.current = window.setTimeout(() => {
      setConfirming(null);
      setStep((current) => Math.min(current + 1, questions.length));
    }, 240);
  };

  const restart = () => {
    window.clearTimeout(advanceTimer.current);
    setConfirming(null);
    setAnswers({});
    setStep(0);
    track.jump(0);
    progress.jump(questions.length ? 1 / questions.length : 0);
  };

  return (
    <div className={className}>
      {!complete && (
        <>
          <div className="flex items-center justify-between gap-4 text-[13px] text-white/55">
            <button
              type="button"
              onClick={() => setStep((current) => Math.max(0, current - 1))}
              className="cursor-pointer transition-colors hover:text-white disabled:pointer-events-none disabled:opacity-0"
              disabled={step === 0}
            >
              ← 上一步
            </button>
            <button type="button" onClick={restart} className="cursor-pointer transition-colors hover:text-white">
              {onRestartLabel}
            </button>
          </div>

          <div className="mt-8 md:mt-10">
            <div className="mb-3 flex items-end gap-3">
              <span className="num text-[48px] leading-[.82] text-gold md:text-[64px]">
                {String(step + 1).padStart(2, "0")}
              </span>
              <span className="pb-1 text-[15px] text-white/40">/ {String(questions.length).padStart(2, "0")}</span>
            </div>
            <div className="h-1 overflow-hidden bg-white/10">
              <div className="h-full origin-left bg-gradient-to-r from-gold/60 to-gold" style={{ transform: `scaleX(${progress.value})` }} />
            </div>
          </div>

          {answered.length > 0 && (
            <div className="mt-5 flex flex-wrap gap-2" aria-label="已回答的題目">
              {answered.map((question) => (
                <button
                  key={question.id}
                  type="button"
                  onClick={() => setStep(questions.indexOf(question))}
                  className="max-w-full cursor-pointer border border-gold/40 bg-gold/10 px-2.5 py-1 text-left text-[13px] leading-[1.35] text-gold transition-colors hover:bg-gold/20"
                >
                  <span className="mr-1 text-white/50">{question.label}</span>
                  {question.options.find((option) => option.value === answers[question.id])?.label}
                </button>
              ))}
            </div>
          )}
        </>
      )}

      <div ref={viewportRef} className="mt-8 overflow-hidden touch-pan-y">
        <div className="flex will-change-transform" style={{ transform: `translate3d(${-track.value * 100}%, 0, 0)` }}>
          {questions.map((question, questionIndex) => (
            <section key={question.id} className="w-full shrink-0 pr-px" aria-hidden={!complete && questionIndex !== step}>
              <div className="max-w-[760px]">
                {question.eyebrow && <p className="eyebrow mb-4 text-gold">{question.eyebrow}</p>}
                <h2 className="h2 max-w-[680px] text-white">{question.label}</h2>
                {question.sublabel && <p className="mt-3 text-[15px] leading-[1.8] text-white/55">{question.sublabel}</p>}
                <div className="mt-8 grid gap-3">
                  {question.options.map((option, optionIndex) => {
                    const selected = answers[question.id] === option.value;
                    const chosen = confirming === option.value;
                    return (
                      <button
                        key={option.value}
                        type="button"
                        onClick={() => choose(question, option.value)}
                        disabled={Boolean(confirming) && !selected}
                        aria-pressed={selected}
                        className={`group grid w-full cursor-pointer grid-cols-[30px_1fr_auto] gap-4 border p-5 text-left outline-none transition-colors focus-visible:ring-2 focus-visible:ring-gold md:p-6 ${
                          selected ? "border-gold bg-gold/[.16]" : confirming ? "border-white/10 bg-white/[.02] opacity-40" : "border-white/10 bg-white/[.03] hover:border-gold/55 hover:bg-white/[.06]"
                        }`}
                      >
                        <span className={`grid h-[30px] w-[30px] place-items-center border text-[12px] ${selected ? "border-gold bg-gold text-navy" : "border-white/25 text-white/60"}`}>
                          {chosen ? "✓" : optionIndex + 1}
                        </span>
                        <span className="min-w-0">
                          <span className="block text-[17px] font-medium leading-[1.5] text-white">{option.label}</span>
                          {option.hint && <span className="mt-1 block text-[13px] leading-[1.8] text-white/52">{option.hint}</span>}
                        </span>
                        <span aria-hidden="true" className={`pt-1 text-[17px] ${selected ? "text-gold" : "text-white/35"}`}>{selected ? "✓" : "→"}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </section>
          ))}
          <section className="w-full shrink-0 pr-px" aria-hidden={!complete}>
            {complete && onComplete(answers)}
          </section>
        </div>
      </div>
    </div>
  );
}
