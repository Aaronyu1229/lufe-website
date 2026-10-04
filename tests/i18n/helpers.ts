import { expect } from "vitest";

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
