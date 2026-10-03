"use client";

import { useEffect } from "react";

/** The root layout renders lang="zh-Hant"; English pages correct it after hydration. */
export function HtmlLang({ lang }: { readonly lang: string }) {
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => { document.documentElement.lang = previous; };
  }, [lang]);
  return null;
}
