"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";

import { useSpring } from "@/lib/motion";
import {
  MATCHER_QUESTIONS,
  matchSubsidies,
  type MatcherAnswers,
  type Subsidy,
} from "@/data/subsidies";
import { useMessageBox } from "@/components/MessageBox";
import { SubsidyIcon } from "./SubsidyIcons";

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
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<PartialAnswers>({});
  const [completed, setCompleted] = useState(false);
  const [pending, setPending] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  const total = MATCHER_QUESTIONS.length;
  const progress = completed ? 100 : (step / total) * 100;
  const progressSpring = useSpring(progress / 100, { precision: 0.001 });
  const result = completed && Object.keys(answers).length === total
    ? matchSubsidies(answers as MatcherAnswers)
    : null;

  useEffect(() => {
    progressSpring.to(progress / 100, { response: 0.35, damping: 1 });
  }, [progress, progressSpring]);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const choose = useCallback((questionIndex: number, value: string) => {
    if (pending || completed) return;
    const question = MATCHER_QUESTIONS[questionIndex];
    setAnswers((current) => ({ ...current, [question.id]: value }));
    setPending(true);
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      setPending(false);
      if (questionIndex === total - 1) setCompleted(true);
      else setStep(questionIndex + 1);
    }, 280);
  }, [completed, pending, total]);

  const previous = () => {
    window.clearTimeout(timer.current);
    setPending(false);
    setStep((current) => Math.max(0, current - 1));
  };

  const restart = () => {
    window.clearTimeout(timer.current);
    setPending(false);
    setAnswers({});
    setCompleted(false);
    setStep(0);
    progressSpring.jump(0);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (completed || pending) return;
      const optionIndex = Number(event.key) - 1;
      const option = MATCHER_QUESTIONS[step]?.options[optionIndex];
      if (!Number.isInteger(optionIndex) || !option) return;
      event.preventDefault();
      choose(step, option.value);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [choose, completed, pending, step]);

  return <section id="match" className="relative overflow-hidden bg-navy py-[80px] text-white scroll-mt-[80px] md:py-[104px]">
    <div aria-hidden="true" className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(212,168,92,0.09) 0%, transparent 70%)" }} />
    <div className="lufe-container relative max-w-[900px]">
      <div className="mb-10 md:mb-12"><h2 className="h2 text-white">算算你能拿<span className="text-gold">多少補助</span></h2><p className="lead mt-5 max-w-[560px] !text-white/70">回答 4 個問題，我們告訴你哪個補助最適合你的公司、<br className="hidden md:block" />以及為什麼。資料不會上傳——純客戶端運算</p></div>
      <div className="mb-8"><div className="flex justify-between text-[12px] font-medium text-white/55"><span>{completed ? "已完成" : `第 ${step + 1} / ${total} 題`}</span><span>{Math.round(progress)}%</span></div><div className="mt-2 h-[2px] overflow-hidden bg-white/10"><div className="h-full origin-left bg-gold" style={{ transform: `scaleX(${progressSpring.value})` }} /></div></div>
      <div className="border border-white/10 bg-white/[.03] p-6 md:p-10">
        <div className={completed ? "hidden" : ""}>
          {MATCHER_QUESTIONS.map((question, questionIndex) => {
            const current = questionIndex === step;
            return <section key={question.id} className={current ? "" : "hidden"} aria-hidden={!current}>
              <h3 className="text-[22px] font-semibold text-white md:text-[28px]">{question.label}</h3>
              <p className="mt-2 text-[15px] text-white/60">{question.sublabel}</p>
              <div className="mt-7 grid gap-3 md:grid-cols-2">
                {question.options.map((option) => {
                  const selected = answers[question.id] === option.value;
                  return <button key={option.value} type="button" onClick={() => choose(questionIndex, option.value)} disabled={pending && !selected} aria-pressed={selected} className={`group cursor-pointer border p-5 text-left transition-transform duration-100 active:scale-[.985] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${selected ? "border-gold bg-gold/[.08]" : "border-white/10 [@media(hover:hover)]:hover:border-gold/40"}`}>
                    <span className="flex items-start gap-3"><span aria-hidden="true" className={`mt-1 grid h-4 w-4 shrink-0 place-items-center border text-[10px] ${selected ? "border-gold bg-gold text-navy" : "border-white/30 text-transparent"}`}>✓</span><span><span className="block text-[17px] font-semibold text-white">{option.label}</span><span className="mt-1 block text-[13px] text-white/55">{option.hint}</span></span></span>
                  </button>;
                })}
              </div>
            </section>;
          })}
          {step > 0 ? <div className="mt-6 border-t border-white/10 pt-6"><button type="button" onClick={previous} className="cursor-pointer text-[13.5px] text-white/55 transition-colors hover:text-white">← 上一題</button></div> : null}
        </div>
        {result ? <ResultView result={result} onRestart={restart} /> : null}
      </div>
      <p className="mt-6 text-center text-[11px] text-white/35">問答內容全部在你的瀏覽器運算 · 我們不會儲存或上傳</p>
    </div>
  </section>;
}

export function ResultView({ result, onRestart }: { readonly result: ReturnType<typeof matchSubsidies>; readonly onRestart: () => void }) {
  const { open } = useMessageBox();
  const primary = result.primary.subsidy;
  const primaryAccent = accentToText[primary.accent];
  const primaryBg = accentToBg[primary.accent];
  const primaryBorder = accentToBorder[primary.accent];

  return <div className="max-w-[760px]">
    <h2 className="h2 text-white">{result.verdict}</h2>
    <div className={`mt-8 border-l-4 ${primaryBorder} bg-white/[.05] p-6 md:p-8`}><div className="flex items-start gap-5"><div className={`grid h-14 w-14 shrink-0 place-items-center ${primaryBg} ${primaryAccent}`}><SubsidyIcon iconKey={primary.iconKey} size={28} /></div><div className="min-w-0 flex-1"><div className="mb-1.5 flex flex-wrap items-baseline gap-2.5"><span className={`text-[10.5px] font-semibold tracking-[1.5px] ${primaryAccent}`}>主推</span><span className="text-[10.5px] text-white/40">{primary.agency}</span></div><h3 className="h3 text-white">{primary.shortTitle}</h3><p className={`num mt-3 text-[16.5px] ${primaryAccent}`}>{primary.amount}</p><p className="mt-4 text-[15px] leading-[1.8] text-white/70"><span className="font-semibold text-white">為什麼推薦：</span>{result.primary.reason}</p><Link href={`/resources/subsidies#${primary.slug}`} className={`mt-4 inline-flex items-center gap-2 text-[14.5px] font-semibold ${primaryAccent} hover:text-gold`}><span className="border-b border-current/40 pb-0.5">看這個補助的完整細節</span> →</Link></div></div></div>
    {result.secondary.length > 0 ? <div className="mt-5"><p className="mb-3 text-[12px] font-semibold text-white/50">同時可以疊加申請</p><div className="grid gap-3">{result.secondary.map((match) => { const accent = accentToText[match.subsidy.accent]; return <div key={match.subsidy.slug} className="border border-white/10 bg-white/[.02] p-5"><div className="flex items-start gap-4"><div className={`grid h-10 w-10 shrink-0 place-items-center ${accentToBg[match.subsidy.accent]} ${accent}`}><SubsidyIcon iconKey={match.subsidy.iconKey} size={20} /></div><div className="min-w-0 flex-1"><div className="flex flex-wrap items-baseline justify-between gap-3"><h3 className="h4 text-white">{match.subsidy.shortTitle}</h3><span className={`num text-[13px] ${accent}`}>{match.subsidy.amount}</span></div><p className="mt-2 text-[13.5px] leading-[1.8] text-white/70">{match.reason}</p><Link href={`/resources/subsidies#${match.subsidy.slug}`} className="mt-2 inline-flex text-[11.5px] text-white/60 hover:text-gold">看細節 →</Link></div></div></div>; })}</div></div> : null}
    <div className="mt-8 flex flex-col items-center justify-end gap-5 border-t border-white/10 pt-6 sm:flex-row"><button type="button" onClick={open} className="cursor-pointer bg-gold px-7 py-3 text-[15px] font-semibold text-navy hover:bg-gold-l">聊聊這個結果 →</button><button type="button" onClick={onRestart} className="cursor-pointer text-[14.5px] font-medium text-white/70 hover:text-white">重新測試</button><Link href="/assess" className="inline-flex items-center gap-1.5 text-[14.5px] font-medium text-white/70 hover:text-white"><span className="border-b border-white/30 pb-0.5">做完整產品評估</span> →</Link></div>
  </div>;
}
