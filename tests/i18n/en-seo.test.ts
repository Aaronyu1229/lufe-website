import { describe, expect, it } from "vitest";

import robots from "@/app/robots";
import { metadata as enLayoutMetadata } from "@/app/en/layout";
import { createPageMetadata } from "@/lib/seo";

describe("English SEO while closed", () => {
  it("noindexes the whole /en tree", () => {
    expect(enLayoutMetadata.robots).toEqual({ index: false, follow: true });
    expect(enLayoutMetadata.openGraph).toMatchObject({ locale: "en_US", siteName: "LUFÉ" });
    expect(JSON.stringify(enLayoutMetadata)).not.toMatch(/\p{Script=Han}/u);
  });

  it("does not block /en in robots.txt (Google must be able to see noindex)", () => {
    expect(JSON.stringify(robots())).not.toContain("/en");
  });

  it("points English canonicals at /en and emits no hreflang yet", () => {
    const en = createPageMetadata({ path: "/services", title: "Services", locale: "en" });
    expect(en.alternates).toEqual({ canonical: "/en/services" });
    const zh = createPageMetadata({ path: "/services", title: "服務" });
    expect(zh.alternates).toEqual({ canonical: "/services" });
  });
});
