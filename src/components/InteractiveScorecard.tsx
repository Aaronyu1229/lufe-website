"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/i18n/locale";
import { assessPageEn } from "@/i18n/en/assess-page";
import { assessPageZh } from "@/i18n/zh/assess-page";

type Dimension = {
  readonly name: string;
  readonly weight: string;
};

const initialScores = [82, 62, 71, 78, 80] as const;
const weights = [20, 20, 20, 25, 15] as const;

type Verdict = {
  readonly name: "Go" | "Conditional Go" | "Hold" | "No-Go";
};

function verdictFor(score: number): Verdict {
  if (score >= 75) return { name: "Go" };
  if (score >= 60) return { name: "Conditional Go" };
  if (score >= 45) return { name: "Hold" };
  return { name: "No-Go" };
}

export function InteractiveScorecard({ dimensions, locale = "zh" }: { readonly dimensions: readonly Dimension[]; readonly locale?: Locale }) {
  const [scores, setScores] = useState<readonly number[]>(initialScores);
  const total = useMemo(
    () => Math.floor(scores.reduce((sum, score, index) => sum + score * weights[index] / 100, 0)),
    [scores],
  );
  const verdict = verdictFor(total);

  useEffect(() => {
    document.querySelectorAll<HTMLElement>("[data-lufe-score-zone]").forEach((element) => {
      element.dataset.lufeScoreActive = String(element.dataset.lufeScoreZone === verdict.name);
    });
  }, [verdict.name]);

  const copy = locale === "en" ? assessPageEn.scorecard : assessPageZh.scorecard;
  const detail = verdict.name === "Go" ? copy.go : verdict.name === "Conditional Go" ? copy.conditional : verdict.name === "Hold" ? copy.hold : copy.noGo;

  return (
    <div className="lufe-scorecard mt-5 grid min-w-0 grid-cols-1 border border-bd bg-white md:grid-cols-[minmax(0,1fr)_260px]">
      <div className="grid gap-5 p-6 md:p-8">
        {dimensions.map((dimension, index) => (
          <label key={dimension.name} className="grid grid-cols-[minmax(0,1fr)_42px] gap-x-4 gap-y-2 text-[14px] text-tx">
            <span className="font-semibold">{dimension.name}<small className="ml-2 text-[12px] font-medium text-tx3">{dimension.weight}</small></span>
            <output className="num text-right text-[16px] text-gold-d">{scores[index]}</output>
            <input
              type="range"
              min="0"
              max="100"
              value={scores[index]}
              aria-label={dimension.name}
              onChange={(event) => {
                const next = [...scores];
                next[index] = Number(event.currentTarget.value);
                setScores(next);
              }}
              className="lufe-score-range col-span-full"
            />
          </label>
        ))}
      </div>
      <div className="bg-navy p-6 text-center text-white md:p-8">
        <p className="text-[14px] text-white/55">{copy.total}</p>
        <output data-lufe-score-total className="num mt-3 block text-[52px] leading-none text-gold">{total}</output>
        <p className="mt-5 text-[18px] font-semibold text-gold">{verdict.name}</p>
        <p className="mt-5 text-[14px] leading-[1.8] text-white/75">{detail}{total < 60 ? ` ${copy.minimum}` : ""}</p>
      </div>
    </div>
  );
}
