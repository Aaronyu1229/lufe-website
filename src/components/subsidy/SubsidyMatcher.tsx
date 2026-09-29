"use client";

import Link from "next/link";

import { MatcherFlow, type MatcherFlowQuestion } from "@/components/assess/MatcherFlow";
import {
  MATCHER_QUESTIONS,
  matchSubsidies,
  type MatcherAnswers,
  type Subsidy,
} from "@/data/subsidies";
import { useMessageBox } from "../MessageBox";
import { SubsidyIcon } from "./SubsidyIcons";

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

const matcherQuestions: readonly MatcherFlowQuestion[] = MATCHER_QUESTIONS;

/** The same spring-driven question system used by /assess. */
export function SubsidyMatcher() {
  return (
    <section id="match" className="relative overflow-hidden bg-navy px-5 py-[80px] text-white scroll-mt-[80px] md:px-10 md:py-[104px] lg:px-16">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 60% 50% at 50% 30%, rgba(212,168,92,0.09) 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-[900px]">
        <div className="mb-10 md:mb-12">
          <p className="eyebrow mb-4 text-gold">2 分鐘媒合器</p>
          <h2 className="h2 text-white">算算你能拿<span className="text-gold">多少補助</span></h2>
          <p className="lead mt-5 max-w-[560px] !text-white/70">
            回答 4 個問題，我們告訴你哪個補助最適合你的公司、
            <br className="hidden md:block" />
            以及為什麼。資料不會上傳——純客戶端運算。
          </p>
        </div>

        <MatcherFlow
          questions={matcherQuestions}
          onRestartLabel="重新測試"
          className="border border-white/10 bg-white/[.03] p-6 md:p-10"
          onComplete={(answers) => <ResultView result={matchSubsidies(answers as unknown as MatcherAnswers)} />}
        />

        <p className="mt-6 text-center text-[11px] text-white/35">問答內容全部在你的瀏覽器運算 · 我們不會儲存或上傳</p>
      </div>
    </section>
  );
}

function ResultView({ result }: { readonly result: ReturnType<typeof matchSubsidies> }) {
  const { open } = useMessageBox();
  const primary = result.primary.subsidy;
  const primaryAccent = accentToText[primary.accent];
  const primaryBg = accentToBg[primary.accent];
  const primaryBorder = accentToBorder[primary.accent];

  return (
    <div className="max-w-[760px]">
      <p className="eyebrow mb-3 text-gold">媒合結果</p>
      <h2 className="h2 text-white">{result.verdict}</h2>

      <div className={`mt-8 border-l-4 ${primaryBorder} bg-white/[.05] p-6 md:p-8`}>
        <div className="flex items-start gap-5">
          <div className={`grid h-14 w-14 shrink-0 place-items-center ${primaryBg} ${primaryAccent}`}>
            <SubsidyIcon iconKey={primary.iconKey} size={28} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-1.5 flex flex-wrap items-baseline gap-2.5">
              <span className={`text-[10.5px] font-semibold tracking-[1.5px] ${primaryAccent}`}>主推</span>
              <span className="text-[10.5px] text-white/40">{primary.agency}</span>
            </div>
            <h3 className="h3 text-white">{primary.shortTitle}</h3>
            <p className={`num mt-3 text-[16.5px] ${primaryAccent}`}>{primary.amount}</p>
            <p className="mt-4 text-[15px] leading-[1.8] text-white/70"><span className="font-semibold text-white">為什麼推薦：</span>{result.primary.reason}</p>
            <Link href={`/resources/subsidies#${primary.slug}`} className={`mt-4 inline-flex items-center gap-2 text-[14.5px] font-semibold ${primaryAccent} hover:text-gold`}>
              <span className="border-b border-current/40 pb-0.5">看這個補助的完整細節</span> →
            </Link>
          </div>
        </div>
      </div>

      {result.secondary.length > 0 && (
        <div className="mt-5">
          <p className="eyebrow mb-3 text-white/50">同時可以疊加申請</p>
          <div className="grid gap-3">
            {result.secondary.map((match) => {
              const accent = accentToText[match.subsidy.accent];
              return (
                <div key={match.subsidy.slug} className="border border-white/10 bg-white/[.02] p-5">
                  <div className="flex items-start gap-4">
                    <div className={`grid h-10 w-10 shrink-0 place-items-center ${accentToBg[match.subsidy.accent]} ${accent}`}>
                      <SubsidyIcon iconKey={match.subsidy.iconKey} size={20} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-baseline justify-between gap-3">
                        <h3 className="h4 text-white">{match.subsidy.shortTitle}</h3>
                        <span className={`num text-[13px] ${accent}`}>{match.subsidy.amount}</span>
                      </div>
                      <p className="mt-2 text-[13.5px] leading-[1.8] text-white/70">{match.reason}</p>
                      <Link href={`/resources/subsidies#${match.subsidy.slug}`} className="mt-2 inline-flex text-[11.5px] text-white/60 hover:text-gold">看細節 →</Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="mt-8 flex flex-col items-center justify-end gap-5 border-t border-white/10 pt-6 sm:flex-row">
        <button type="button" onClick={open} className="cursor-pointer bg-gold px-7 py-3 text-[15px] font-semibold tracking-[0.5px] text-navy transition-colors hover:bg-gold-l">
          聊聊這個結果 →
        </button>
        <Link href="/assess" className="inline-flex items-center gap-1.5 text-[14.5px] font-medium text-white/70 hover:text-white">
          <span className="border-b border-white/30 pb-0.5">做完整產品評估</span> →
        </Link>
      </div>
    </div>
  );
}
