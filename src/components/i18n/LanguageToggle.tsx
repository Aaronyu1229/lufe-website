import { EN_PUBLIC, hasEnglishRoute } from "@/i18n/config";
import { localeFromPathname, switchLocalePath } from "@/i18n/locale";
import { hasEnglishArticle } from "@/lib/articles/english";

function hasEnglishTwin(path: string): boolean {
  if (path.startsWith("/insights/")) return hasEnglishArticle(path.slice("/insights/".length));
  return hasEnglishRoute(path);
}

export function LanguageToggle({ pathname, className = "", visible = EN_PUBLIC }: {
  readonly pathname: string;
  readonly className?: string;
  readonly visible?: boolean;
}) {
  if (!visible) return null;
  const target = localeFromPathname(pathname) === "en" ? "zh" : "en";
  const href = switchLocalePath(pathname, target, hasEnglishTwin);
  // Plain <a>: switching language is a full navigation, and the label is written in the target language.
  return target === "en"
    ? <a href={href} hrefLang="en" lang="en" className={className}>EN</a>
    : <a href={href} hrefLang="zh-Hant" lang="zh-Hant" className={className}>中文</a>;
}
