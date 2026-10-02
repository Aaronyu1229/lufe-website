import { describe, expect, it } from "vitest";

import { formatCounter } from "@/components/DelightLayer";

describe("formatCounter", () => {
  it("preserves signs, symbols, decimals, and grouping while counting from zero", () => {
    expect(formatCounter("4.7★", 0)).toBe("0.0★");
    expect(formatCounter("4.7★", 1)).toBe("4.7★");
    expect(formatCounter("1.2x", 0)).toBe("0.0x");
    expect(formatCounter("1.2x", 1)).toBe("1.2x");
    expect(formatCounter("-15%", 0)).toBe("0%");
    expect(formatCounter("-15%", 1)).toBe("-15%");
    expect(formatCounter("$200萬", 0)).toBe("$0萬");
    expect(formatCounter("$200萬", 1)).toBe("$200萬");
    expect(formatCounter("+40%", 0)).toBe("+0%");
    expect(formatCounter("+40%", 1)).toBe("+40%");
    expect(formatCounter("120+", 0)).toBe("0+");
    expect(formatCounter("120+", 1)).toBe("120+");
    expect(formatCounter("2,000", 0.5)).toBe("1,000");
    expect(formatCounter("6 個月", 1)).toBe("6 個月");
  });
});
