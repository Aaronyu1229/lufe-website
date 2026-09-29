import { describe, expect, it } from "vitest";

import { project, rubberband, spring } from "@/lib/motion";

describe("motion primitives", () => {
  it("settles at a spring target and calls onRest once", () => {
    let rests = 0;
    const updates: number[] = [];
    const value = spring(0, (next) => updates.push(next), { reducedMotion: false, autoStart: false });

    value.to(100, { onRest: () => rests += 1 });
    for (let index = 0; index < 600; index += 1) value.advance(1 / 120);

    expect(value.value).toBe(100);
    expect(value.velocity).toBe(0);
    expect(rests).toBe(1);
    expect(updates.at(-1)).toBe(100);
  });

  it("keeps its velocity when re-targeted", () => {
    const value = spring(0, () => undefined, { reducedMotion: false, autoStart: false });

    value.to(100);
    for (let index = 0; index < 8; index += 1) value.advance(1 / 120);
    const before = value.velocity;
    value.to(200);
    value.advance(1 / 120);

    expect(before).toBeGreaterThan(0);
    expect(value.velocity).toBeGreaterThan(0);
  });

  it("uses Apple projection and progressive rubber-banding maths", () => {
    expect(project(1000)).toBeCloseTo(499, 6);
    expect(rubberband(100, 500)).toBeCloseTo(49.5495495, 6);
    expect(rubberband(-100, 500)).toBeCloseTo(-49.5495495, 6);
    expect(Math.abs(rubberband(1000, 500))).toBeLessThan(500);
  });
});
