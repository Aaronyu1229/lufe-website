export type Locale = "zh" | "en";

const EN_PREFIX = "/en";

export function localeFromPathname(pathname: string | null | undefined): Locale {
  if (!pathname) return "zh";
  return pathname === EN_PREFIX || pathname.startsWith(`${EN_PREFIX}/`) ? "en" : "zh";
}

export function stripLocale(pathname: string): string {
  if (pathname === EN_PREFIX) return "/";
  return pathname.startsWith(`${EN_PREFIX}/`) ? pathname.slice(EN_PREFIX.length) : pathname;
}

const isStaticFile = (path: string) => /\.[a-z0-9]+$/i.test(path);

export function localizedHref(locale: Locale, href: string): string {
  if (locale === "zh") return href;
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const path = href.split(/[?#]/)[0] ?? href;
  if (path.startsWith("/api/") || isStaticFile(path)) return href;
  if (localeFromPathname(path) === "en") return href;
  if (path === "/") return `${EN_PREFIX}${href.slice(1)}`;
  return `${EN_PREFIX}${href}`;
}

export function switchLocalePath(pathname: string, target: Locale, hasEnglish: (zhPath: string) => boolean): string {
  const base = stripLocale(pathname);
  if (target === "zh") return base;
  if (hasEnglish(base)) return localizedHref("en", base);
  return base.startsWith("/insights/") ? `${EN_PREFIX}/insights` : EN_PREFIX;
}
