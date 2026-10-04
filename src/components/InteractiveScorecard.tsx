"use client";

import { useEffect, useMemo, useState } from "react";
import type { Locale } from "@/i18n/locale";

type Dimension = {
  readonly name: string;
  readonly weight: string;
};

const initialScores = [82, 62, 71, 78, 80] as const;
const weights = [20, 20, 20, 25, 15] as const;

type Verdict = {
  readonly name: "Go" | "Conditional Go" | "Hold" | "No-Go";
  readonly detail: string;
};

function verdictFor(score: number): Verdict {
  if (score >= 75) return { name: "Go", detail: "可以進，照四章正常走" };
  if (score >= 60) return { name: "Conditional Go", detail: "可以進，先解決一到兩個弱項" };
  if (score >= 45) return { name: "Hold", detail: "建議暫緩 6–12 個月，等關鍵變化" };
  return { name: "No-Go", detail: "不建議，鹿飛會寫清楚什麼條件改了可以再看" };
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

  const copy = locale === "en"
    ? { total: "Drag to try · weighted total", go: "Proceed through the four chapters", conditional: "Proceed after resolving one or two weak areas", hold: "Recommended to pause for 6–12 months until key conditions change", noGo: "Not recommended. LUFÉ will explain which conditions need to change before reviewing again", minimum: "LUFÉ's rule: below 60, we do not take the case" }
    : { total: "拖拖看 · 加權總分", go: "可以進，照四章正常走", conditional: "可以進，先解決一到兩個弱項", hold: "建議暫緩 6–12 個月，等關鍵變化", noGo: "不建議，鹿飛會寫清楚什麼條件改了可以再看", minimum: "鹿飛的規矩：不到 60 分，不接" };
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
