import { existsSync, readdirSync } from "node:fs";
import { dirname, join, relative, sep } from "node:path";
import { describe, expect, it } from "vitest";

import { EN_ROUTES, EN_PUBLIC } from "@/i18n/config";
import { EN_EXCLUDED, EN_PENDING } from "@/i18n/coverage";

const APP_DIRECTORY = join(process.cwd(), "src", "app");
const OMITTED_TREES = new Set(["en", "api", "ghost"]);

function routeForPage(pagePath: string): string {
  const pageDirectory = dirname(relative(APP_DIRECTORY, pagePath));
  const segments = pageDirectory === "."
    ? []
    : pageDirectory.split(sep).filter((segment) => !(segment.startsWith("(") && segment.endsWith(")")));
  return segments.length === 0 ? "/" : `/${segments.join("/")}`;
}

function chineseRoutes(directory = APP_DIRECTORY): string[] {
  const routes: string[] = [];

  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const entryPath = join(directory, entry.name);
    const sourceSegments = relative(APP_DIRECTORY, entryPath).split(sep);
    if (OMITTED_TREES.has(sourceSegments[0])) continue;
    if (entry.isDirectory()) routes.push(...chineseRoutes(entryPath));
    if (entry.isFile() && entry.name === "page.tsx") routes.push(routeForPage(entryPath));
  }

  return routes.sort();
}

function pagePath(locale: "en", route: string): string {
  const segments = route === "/" ? [] : route.slice(1).split("/");
  return join(APP_DIRECTORY, locale, ...segments, "page.tsx");
}

const CHINESE_ROUTES = chineseRoutes();

describe("English route coverage", () => {
  it("gives every Chinese page exactly one English status", () => {
    for (const route of CHINESE_ROUTES) {
      const statuses = [EN_ROUTES.includes(route), route in EN_PENDING, route in EN_EXCLUDED].filter(Boolean);
      if (statuses.length === 0) {
        expect.fail(
          `New Chinese page ${route} has no English plan. Add an English page (see Plan 2 recipe) or list it in src/i18n/coverage.ts EN_PENDING/EN_EXCLUDED with a reason.`,
        );
      }
      expect(statuses).toHaveLength(1);
    }
  });

  it("removes finished English routes from pending", () => {
    for (const route of EN_ROUTES) {
      expect(route in EN_PENDING, `${route} now has English; remove it from EN_PENDING`).toBe(false);
    }
  });

  it("has an English page for every finished route", () => {
    for (const route of EN_ROUTES) {
      expect(existsSync(pagePath("en", route)), `Missing English page for ${route}`).toBe(true);
    }
  });

  it("keeps pending and excluded routes current", () => {
    for (const route of [...Object.keys(EN_PENDING), ...Object.keys(EN_EXCLUDED)]) {
      expect(CHINESE_ROUTES, `${route} is stale in src/i18n/coverage.ts`).toContain(route);
    }
  });

  it("has no pending English routes when English is public", () => {
    // TODO: EN_PENDING must be empty when EN_PUBLIC flips to true.
    if (EN_PUBLIC) expect(Object.keys(EN_PENDING)).toEqual([]);
  });
});
