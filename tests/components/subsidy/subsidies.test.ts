import { createElement, Fragment } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import SubsidiesPage from "@/app/resources/subsidies/page";
import { SubsidyCompare } from "@/components/subsidy/SubsidyCompare";
import { SubsidyPlans } from "@/components/subsidy/SubsidyPlans";
import { subsidyStatus } from "@/components/subsidy/SubsidyStatus";
import { SUBSIDIES } from "@/data/subsidies";

const expectText = (markup: string, value: string) =>
  expect(markup).toContain(renderToStaticMarkup(createElement(Fragment, null, value)));
const markupText = (value: string) => renderToStaticMarkup(createElement(Fragment, null, value));

describe("subsidy SSR content", () => {
  it("uses revenue decline as the supply-chain support eligibility threshold", () => {
    const support = SUBSIDIES.find((subsidy) => subsidy.slug === "supply-chain-support")!;

    expect(support.whoFor).toContain("月平均營業額較基期衰退 10% 以上的製造業（輸美實績衝擊門檻）");
    expect(support.importantNotes).toContain("輸美實績衝擊門檻：月均營業額較基期（前一年同期 / 前一年下半年 / 當年 1-2 月，三者擇一）衰退 10% 以上");
  });

  it("keeps every plan specification in the server markup", () => {
    const markup = renderToStaticMarkup(createElement(SubsidyPlans, {
      subsidies: SUBSIDIES,
      now: new Date("2026-10-01T12:00:00+08:00"),
    }));

    expect(markup).toContain('id="plans"');
    for (const subsidy of SUBSIDIES) {
      expect(markup).toContain(`id="${subsidy.slug}"`);
      expectText(markup, subsidy.shortTitle);
      expectText(markup, subsidy.amount);
      expectText(markup, subsidy.oneLiner);
      expectText(markup, subsidy.lufeAngle);
      for (const item of subsidy.whoFor) expectText(markup, item);
      for (const item of subsidy.covers) expectText(markup, item);
      for (const item of subsidy.coversDetail ?? []) expectText(markup, item.title);
      for (const item of subsidy.processSteps ?? []) expectText(markup, item.title);
      for (const item of subsidy.importantNotes ?? []) expectText(markup, item);
    }

    expect(markup).not.toContain("rounded-");
  });

  it("reports open, pending, and closed plans from their deadlines", () => {
    const marketExpansion = SUBSIDIES.find((subsidy) => subsidy.slug === "market-expansion")!;
    const exhibition = SUBSIDIES.find((subsidy) => subsidy.slug === "overseas-exhibition")!;

    expect(subsidyStatus(marketExpansion, new Date("2026-10-30T17:59:59+08:00"))).toBe("open");
    expect(subsidyStatus(marketExpansion, new Date("2026-10-30T18:00:01+08:00"))).toBe("closed");
    expect(subsidyStatus(exhibition, new Date("2026-10-01T12:00:00+08:00"))).toBe("pending");
  });

  it("replaces the matcher with the stage map and plan anchors", () => {
    const markup = renderToStaticMarkup(createElement(SubsidiesPage));

    expect(markup).toContain('id="plans"');
    expect(markup).not.toContain('id="match"');
    expect(markup).not.toContain("算算你能拿");
    expect(markup).not.toContain("rounded-");
  });

  it("keeps every subsidy in the aligned compare grid and every detail in SSR", () => {
    const compareMarkup = renderToStaticMarkup(createElement(SubsidyCompare, {
      subsidies: SUBSIDIES,
      now: new Date("2026-10-01T12:00:00+08:00"),
      onSelect: () => {},
    }));
    const markup = renderToStaticMarkup(createElement(SubsidyPlans, {
      subsidies: SUBSIDIES,
      now: new Date("2026-10-01T12:00:00+08:00"),
    }));

    for (const subsidy of SUBSIDIES) {
      expect(compareMarkup.split(markupText(subsidy.shortTitle)).length - 1).toBe(1);
      for (const item of subsidy.coversDetail ?? []) expectText(markup, item.title);
      for (const item of subsidy.processSteps ?? []) expectText(markup, item.title);
      for (const item of subsidy.importantNotes ?? []) expectText(markup, item);
    }
    expect(compareMarkup.match(/看重點 ↓/g)).toHaveLength(4);
    expect(markup).not.toContain("SubsidyStageMap");
  });
});
