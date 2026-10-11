import { expect, vi } from "vitest";

// The Chinese fixtures were captured before the 2026-10-06 scheduled article went live; pin the clock so later publications do not change them.
const FIXTURE_TIME = new Date("2026-10-05T12:00:00+08:00");

export async function atFixtureTime<T>(render: () => T | Promise<T>): Promise<T> {
  vi.useFakeTimers({ toFake: ["Date"] });
  vi.setSystemTime(FIXTURE_TIME);
  try {
    return await render();
  } finally {
    vi.useRealTimers();
  }
}

const isLocalizable = (href: string) => {
  if (!href.startsWith("/") || href.startsWith("//")) return false;
  const path = href.split(/[?#]/)[0] ?? href;
  return !path.startsWith("/api/") && !/\.[a-z0-9]+$/i.test(path);
};

export function expectEnglishMarkup(html: string): void {
  const withoutLanguageToggle = html.replace(/<a\b(?=[^>]*\bhrefLang="zh-Hant")(?=[^>]*\blang="zh-Hant")[^>]*>中文<\/a>/g, "");
  const han = withoutLanguageToggle.match(/\p{Script=Han}+/gu);
  expect(han, `English markup still contains Chinese: ${han?.slice(0, 10).join(" ")}`).toBeNull();
  const hrefs = [...withoutLanguageToggle.matchAll(/href="([^"]+)"/g)].map((match) => match[1]);
  const leaks = hrefs
    .filter(isLocalizable)
    .filter((href) => !(href === "/en" || href.startsWith("/en/") || href.startsWith("/en?") || href.startsWith("/en#")));
  expect(leaks, `English markup links back to Chinese pages: ${leaks.join(", ")}`).toEqual([]);
}
