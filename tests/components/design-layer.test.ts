import { readFileSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

const root = process.cwd();
const read = (relativePath: string) => readFileSync(path.join(root, relativePath), "utf8");

const heroPhotos = [
  "product-testing",
  "consignment",
  "localization",
  "call-center",
  "north-america",
  "optimize",
  "methodology",
  "cases",
  "insights",
] as const;

describe("v5 design layer", () => {
  it("defines full-height heroes and all accessibility preference fallbacks", () => {
    const css = read("src/app/globals.css");

    expect(css).toContain("min-height: 100vh");
    expect(css).toContain("min-height: 100svh");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain("prefers-reduced-transparency: reduce");
    expect(css).toContain("prefers-contrast: more");
  });

  it("ships responsive v5 hero photos within their download budgets", () => {
    for (const name of heroPhotos) {
      const small = path.join(root, "public/images/v5", `${name}-1600.webp`);
      const large = path.join(root, "public/images/v5", `${name}-2400.webp`);
      expect(statSync(small).size).toBeLessThanOrEqual(250 * 1024);
      expect(statSync(large).size).toBeLessThanOrEqual(400 * 1024);
    }
  });

  it("uses the responsive hero source and keeps non-dot UI square", () => {
    const heroBackdrop = read("src/components/HeroBackdrop.tsx");
    const designSources = [
      "src/components/services/ChapterPage.tsx",
      "src/components/services/OptimizePage.tsx",
      "src/components/services/MethodologyPage.tsx",
      "src/components/cases/CasesPage.tsx",
      "src/components/insights/InsightsPage.tsx",
    ].map(read).join("\n");

    expect(heroBackdrop).toContain('media="(max-width: 767px)"');
    expect(heroBackdrop).toContain("srcSet={mobileSrc}");
    expect(designSources).toContain("/images/v5/");
    expect(designSources).not.toMatch(/\brounded-(?!full\b)/);
  });

  it("ships the v6 delight layer with accessible, reduced-motion-safe behavior", () => {
    const css = read("src/app/globals.css");
    const delightCss = css.slice(css.indexOf(".lufe-reading-progress"));
    const layer = read("src/components/DelightLayer.tsx");

    expect(layer).toContain('aria-label="回到頂端"');
    expect(layer).toContain('addEventListener("scroll", requestUpdate, { passive: true })');
    expect(layer).toContain("observer.unobserve(entry.target)");
    expect(css).not.toContain("lufe-mail");
    expect(css).toContain("[data-lufe-hero-photo], [data-lufe-hero-photo][data-lufe-hero-settled] { transform: none; }");
    expect(delightCss).not.toMatch(/transition:[^;]*(?:background|color|box-shadow)/);
  });
});
