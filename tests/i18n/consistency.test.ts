import { describe, expect, it } from "vitest";

import { checkConsistency, extractNumbers, flattenStrings, hedgeCount } from "@/i18n/consistency";
import { fingerprint } from "@/i18n/fingerprint";

describe("fingerprint", () => {
  it("is stable and changes when any string changes", () => {
    const a = { title: "四個章節", items: ["一", "二"] };
    expect(fingerprint(a)).toBe(fingerprint({ title: "四個章節", items: ["一", "二"] }));
    expect(fingerprint(a)).not.toBe(fingerprint({ title: "四個章節", items: ["一", "三"] }));
    expect(fingerprint(a)).toMatch(/^[0-9a-f]{16}$/);
  });
});

describe("number extraction", () => {
  it("converts 萬 amounts and ranges in Chinese", () => {
    expect(extractNumbers("市場探查 1～2 萬，起手包 7 萬，前 10 家", "zh").sort((x, y) => x - y)).toEqual([10, 10000, 20000, 70000]);
  });
  it("reads comma-grouped English numbers", () => {
    expect(extractNumbers("NT$10,000–20,000 for the first 10 brands, Q1 2027", "en").sort((x, y) => x - y)).toEqual([1, 10, 2027, 10000, 20000]);
  });
});

describe("hedges", () => {
  it("counts 預計 and English equivalents", () => {
    expect(hedgeCount("預計 2027 Q1 開放", "zh")).toBe(1);
    expect(hedgeCount("Expected to open in Q1 2027; estimated timeline", "en")).toBe(2);
  });
});

describe("checkConsistency", () => {
  const zh = { a: "預計 2027 Q1 開放", b: ["市場探查 1～2 萬", "第三個月"] };

  it("passes a faithful translation", () => {
    const en = { a: "Expected to open in Q1 2027", b: ["Market Test NT$10,000–20,000", "Month 3"] };
    expect(checkConsistency(zh, en)).toEqual([]);
  });

  it("flags a dropped hedge", () => {
    const en = { a: "Opens in Q1 2027", b: ["Market Test NT$10,000–20,000", "Month 3"] };
    expect(checkConsistency(zh, en).join("\n")).toContain("hedge");
  });

  it("flags a number English invented", () => {
    const en = { a: "Expected to open in Q1 2027", b: ["Market Test NT$10,000–20,000, results in 14 days", "Month 3"] };
    expect(checkConsistency(zh, en).join("\n")).toContain("14");
  });

  it("flags a number English dropped", () => {
    const en = { a: "Expected to open in Q1", b: ["Market Test NT$10,000–20,000", "Month 3"] };
    expect(checkConsistency(zh, en).join("\n")).toContain("2027");
  });

  it("flags Han characters left in English", () => {
    const en = { a: "Expected to open in Q1 2027", b: ["市場探查 NT$10,000–20,000", "Month 3"] };
    expect(checkConsistency(zh, en).join("\n")).toContain("Han");
  });

  it("flattens nested strings in order", () => {
    expect(flattenStrings({ x: "a", y: [{ z: "b" }, ["c", 1]] })).toEqual(["a", "b", "c"]);
  });
});
