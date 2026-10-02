import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { ResultView, SubsidyMatcher } from "@/components/subsidy/SubsidyMatcher";
import { SubsidyComparison, SubsidyPlanCard } from "@/components/subsidy/SubsidyPlanCard";
import { MATCHER_QUESTIONS, SUBSIDIES, matchSubsidies } from "@/data/subsidies";

const expectText = (markup: string, value: string) =>
  expect(markup).toContain(renderToStaticMarkup(createElement(Fragment, null, value)));

describe("subsidy SSR content", () => {
  it("uses revenue decline as the supply-chain support eligibility threshold", () => {
    const support = SUBSIDIES.find((subsidy) => subsidy.slug === "supply-chain-support")!;

    expect(support.whoFor).toContain("月平均營業額較基期衰退 10% 以上的製造業（輸美實績衝擊門檻）");
    expect(support.importantNotes).toContain("輸美實績衝擊門檻：月均營業額較基期（前一年同期 / 前一年下半年 / 當年 1-2 月，三者擇一）衰退 10% 以上");
  });

  it("keeps matcher questions and options in the static markup", () => {
    const markup = renderToStaticMarkup(createElement(SubsidyMatcher));

    for (const question of MATCHER_QUESTIONS) {
      expectText(markup, question.label);
      expectText(markup, question.sublabel);
      for (const option of question.options) {
        expectText(markup, option.label);
        expectText(markup, option.hint);
      }
    }

    expect(markup).not.toContain("rounded-");
  });

  it("keeps all comparison and collapsed plan content in the static markup", () => {
    const markup = renderToStaticMarkup(createElement("div", null,
      createElement(SubsidyComparison, { subsidies: SUBSIDIES }),
      ...SUBSIDIES.map((subsidy) => createElement(SubsidyPlanCard, { key: subsidy.slug, subsidy })),
    ));

    for (const subsidy of SUBSIDIES) {
      expectText(markup, subsidy.shortTitle);
      expectText(markup, subsidy.amount);
      expectText(markup, subsidy.deadline);
      expectText(markup, subsidy.oneLiner);
      expectText(markup, subsidy.lufeAngle);
      expectText(markup, `適合（${subsidy.whoFor.length} 項）`);
      expectText(markup, `補助涵蓋（${subsidy.covers.length} 項）`);
      expectText(markup, `可補助費用明細（${subsidy.coversDetail?.length ?? 0} 項）`);
      expectText(markup, `申請與核銷流程（${subsidy.processSteps?.length ?? 0} 步）`);
      expectText(markup, `容易踩雷的點（${subsidy.importantNotes?.length ?? 0} 點）`);
      for (const item of subsidy.whoFor) expectText(markup, item);
      for (const item of subsidy.covers) expectText(markup, item);
      for (const item of subsidy.coversDetail ?? []) {
        expectText(markup, item.title);
        expectText(markup, item.note);
        if (item.limit) expectText(markup, item.limit);
      }
      for (const item of subsidy.processSteps ?? []) {
        expectText(markup, item.title);
        expectText(markup, item.note);
      }
      for (const item of subsidy.importantNotes ?? []) expectText(markup, item);
    }

    expect(markup).toContain('aria-expanded="true"');
    expect(markup).not.toContain("rounded-");
  });

  it("shows the next-year pending status after the market-expansion deadline", () => {
    const marketExpansion = SUBSIDIES.find((subsidy) => subsidy.slug === "market-expansion")!;
    const markup = renderToStaticMarkup(createElement(SubsidyPlanCard, {
      subsidy: marketExpansion,
      now: new Date("2026-10-30T18:00:01+08:00"),
    }));

    expect(markup).toContain("116 年度待公告");
    expect(markup).toContain("後續以經濟部公告為準");
    expect(markup).not.toContain(marketExpansion.deadline);
  });

  it("renders the stacking label in the completed result view", () => {
    const result = matchSubsidies({ size: "medium", stage: "planning", industry: "food", problem: "need-channel" });
    const markup = renderToStaticMarkup(createElement(ResultView, { result, onRestart: () => {} }));

    expect(markup).toContain("同時可以疊加申請");
    expect(markup).toContain("重新測試");
  });
});
