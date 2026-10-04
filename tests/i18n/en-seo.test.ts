import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import { metadata as enLayoutMetadata } from "@/app/en/layout";
import { EN_PUBLIC } from "@/i18n/config";
import { createPageMetadata } from "@/lib/seo";

describe("English SEO on open day", () => {
  it("opens the whole /en tree to indexing", () => {
    expect(EN_PUBLIC).toBe(true);
    expect(enLayoutMetadata.robots).toEqual({ index: true, follow: true });
    expect(enLayoutMetadata.openGraph).toMatchObject({ locale: "en_US", siteName: "LUFÉ" });
    expect(JSON.stringify(enLayoutMetadata)).not.toMatch(/\p{Script=Han}/u);
  });

  it("does not block /en in robots.txt (Google must be able to see noindex)", () => {
    expect(JSON.stringify(robots())).not.toContain("/en");
  });

  it("keeps canonicals self-referencing and emits reciprocal hreflang", () => {
    const en = createPageMetadata({ path: "/services", title: "Services", locale: "en" });
    expect(en.alternates).toEqual({
      canonical: "/en/services",
      languages: {
        "zh-Hant": "/services",
        en: "/en/services",
        "x-default": "/services",
      },
    });
    const zh = createPageMetadata({ path: "/services", title: "服務" });
    expect(zh.alternates).toEqual({
      canonical: "/services",
      languages: {
        "zh-Hant": "/services",
        en: "/en/services",
        "x-default": "/services",
      },
    });
  });
});
