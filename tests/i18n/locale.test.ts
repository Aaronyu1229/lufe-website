import { describe, expect, it } from "vitest";

import { EN_PUBLIC, EN_ROUTES, hasEnglishRoute } from "@/i18n/config";
import { localeFromPathname, localizedHref, stripLocale, switchLocalePath } from "@/i18n/locale";

describe("locale helpers", () => {
  it("detects locale from the /en prefix only", () => {
    expect(localeFromPathname("/en")).toBe("en");
    expect(localeFromPathname("/en/services")).toBe("en");
    expect(localeFromPathname("/english-guide")).toBe("zh");
    expect(localeFromPathname("/services")).toBe("zh");
    expect(localeFromPathname(null)).toBe("zh");
  });

  it("strips the /en prefix", () => {
    expect(stripLocale("/en")).toBe("/");
    expect(stripLocale("/en/services/consignment")).toBe("/services/consignment");
    expect(stripLocale("/services")).toBe("/services");
    expect(stripLocale("/english-guide")).toBe("/english-guide");
  });

  it("localizes internal page links and leaves everything else alone", () => {
    expect(localizedHref("zh", "/services")).toBe("/services");
    expect(localizedHref("en", "/")).toBe("/en");
    expect(localizedHref("en", "/services")).toBe("/en/services");
    expect(localizedHref("en", "/about#team")).toBe("/en/about#team");
    expect(localizedHref("en", "/insights?chapter=m1")).toBe("/en/insights?chapter=m1");
    expect(localizedHref("en", "/en/services")).toBe("/en/services");
    expect(localizedHref("en", "#chapters")).toBe("#chapters");
    expect(localizedHref("en", "/api/lead")).toBe("/api/lead");
    expect(localizedHref("en", "/images/a.webp")).toBe("/images/a.webp");
    expect(localizedHref("en", "https://jumping.group")).toBe("https://jumping.group");
    expect(localizedHref("en", "//cdn.example.com/x")).toBe("//cdn.example.com/x");
    expect(localizedHref("en", "mailto:aaron.yu@reborn.in")).toBe("mailto:aaron.yu@reborn.in");
  });

  it("switches to the same page, falling back when English is missing", () => {
    const has = (path: string) => path === "/services";
    expect(switchLocalePath("/services", "en", has)).toBe("/en/services");
    expect(switchLocalePath("/en/services", "zh", has)).toBe("/services");
    expect(switchLocalePath("/insights/some-article", "en", has)).toBe("/en/insights");
    expect(switchLocalePath("/contact", "en", has)).toBe("/en");
    expect(switchLocalePath("/en", "zh", has)).toBe("/");
  });

  it("keeps English closed and lists finished routes", () => {
    expect(EN_PUBLIC).toBe(false);
    expect(EN_ROUTES).toContain("/services");
    expect(hasEnglishRoute("/services")).toBe(true);
    expect(hasEnglishRoute("/contact")).toBe(true);
    expect(hasEnglishRoute("/cases/goat-milk-soap-global")).toBe(true);
  });
});
