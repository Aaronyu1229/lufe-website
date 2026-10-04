import type { Metadata } from "next";
import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/articles/repository", () => ({
  listPublishedArticles: async () => [],
}));

import { metadata as enAboutMetadata } from "@/app/en/about/page";
import { metadata as enAaronYuMetadata } from "@/app/en/about/aaron-yu/page";
import { metadata as enAssessMetadata } from "@/app/en/assess/page";
import { metadata as enAssessResultMetadata } from "@/app/en/assess/result/page";
import { generateMetadata as generateEnCaseMetadata } from "@/app/en/cases/[slug]/page";
import { metadata as enCasesMetadata } from "@/app/en/cases/page";
import { metadata as enContactMetadata } from "@/app/en/contact/page";
import { generateMetadata as generateEnArticleMetadata } from "@/app/en/insights/[slug]/page";
import { metadata as enInsightsMetadata } from "@/app/en/insights/page";
import { metadata as enLayoutMetadata } from "@/app/en/layout";
import { metadata as enHomeMetadata } from "@/app/en/page";
import { metadata as enResourcesMetadata } from "@/app/en/resources/page";
import { metadata as enSubsidiesMetadata } from "@/app/en/resources/subsidies/page";
import { metadata as enCallCenterMetadata } from "@/app/en/services/call-center/page";
import { metadata as enConsignmentMetadata } from "@/app/en/services/consignment/page";
import { metadata as enLocalizationMetadata } from "@/app/en/services/localization/page";
import { metadata as enMethodologyMetadata } from "@/app/en/services/methodology/page";
import { metadata as enNorthAmericaMetadata } from "@/app/en/services/north-america/page";
import { metadata as enOptimizeMetadata } from "@/app/en/services/optimize/page";
import { metadata as enProductTestingMetadata } from "@/app/en/services/product-testing/page";
import { metadata as enServicesMetadata } from "@/app/en/services/page";
import { CASES_EN } from "@/i18n/en/cases";
import { EN_ROUTES } from "@/i18n/config";
import { getPublishedEnglishArticles } from "@/lib/articles/english";

const HAN = /\p{Script=Han}/u;

type MetadataSource = Metadata | (() => Promise<Metadata>);

const metadataByRoute: Record<string, MetadataSource> = {
  "/": enHomeMetadata,
  "/services": enServicesMetadata,
  "/services/product-testing": enProductTestingMetadata,
  "/services/consignment": enConsignmentMetadata,
  "/services/localization": enLocalizationMetadata,
  "/services/call-center": enCallCenterMetadata,
  "/services/north-america": enNorthAmericaMetadata,
  "/services/methodology": enMethodologyMetadata,
  "/services/optimize": enOptimizeMetadata,
  "/about": enAboutMetadata,
  "/about/aaron-yu": enAaronYuMetadata,
  "/contact": enContactMetadata,
  "/cases": enCasesMetadata,
  "/cases/[slug]": () => generateEnCaseMetadata({ params: Promise.resolve({ slug: CASES_EN[0]!.slug }) }),
  "/assess": enAssessMetadata,
  "/assess/result": enAssessResultMetadata,
  "/resources": enResourcesMetadata,
  "/resources/subsidies": enSubsidiesMetadata,
  "/insights": enInsightsMetadata,
  "/insights/[slug]": () => generateEnArticleMetadata({
    params: Promise.resolve({ slug: getPublishedEnglishArticles()[0]!.slug }),
  }),
};

function titleValue(value: Metadata["title"]): string | undefined {
  if (typeof value === "string") return value;
  if (!value) return undefined;
  return "absolute" in value ? value.absolute : value.default;
}

function socialTitle(value: Metadata["openGraph"] | Metadata["twitter"]): string | undefined {
  if (!value || typeof value !== "object" || !("title" in value)) return undefined;
  return typeof value.title === "string" ? value.title : undefined;
}

async function collectMetadata(source: MetadataSource): Promise<Metadata> {
  return typeof source === "function" ? source() : source;
}

describe("English route metadata", () => {
  it("uses an absolute English layout title before child route metadata is applied", () => {
    expect(enLayoutMetadata.title).toMatchObject({
      absolute: "LUFÉ — Your first year in the Philippines, after the freight arrives",
      template: "%s | LUFÉ",
    });
  });

  it("collects English metadata for every finished route without Han characters", async () => {
    expect(Object.keys(metadataByRoute).sort()).toEqual([...EN_ROUTES].sort());

    for (const route of EN_ROUTES) {
      const metadata = await collectMetadata(metadataByRoute[route]!);
      const fields = [
        titleValue(metadata.title) ?? titleValue(enLayoutMetadata.title),
        socialTitle(metadata.openGraph) ?? socialTitle(enLayoutMetadata.openGraph),
        socialTitle(metadata.twitter) ?? socialTitle(enLayoutMetadata.twitter),
        metadata.description ?? enLayoutMetadata.description,
      ].filter((value): value is string => Boolean(value));

      expect(fields.join("\n"), `${route} metadata contains Han characters`).not.toMatch(HAN);
    }
  });
});
