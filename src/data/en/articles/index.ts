export type EnglishArticle = {
  readonly slug: string;
  readonly sourceFingerprint: string;
  readonly title: string;
  readonly summary: string;
  readonly readTime: string;
  readonly content: readonly string[];
  readonly faq?: readonly { readonly q: string; readonly a: string }[];
  readonly sources?: readonly {
    readonly id: number;
    readonly title: string;
    readonly publisher: string;
    readonly url: string;
    readonly note?: string;
  }[];
};

export const EN_ARTICLES: Readonly<Record<string, EnglishArticle>> = {
  [agentVsDistributorExclusive.slug]: agentVsDistributorExclusive,
  [fobCifDdpExplained.slug]: fobCifDdpExplained,
  [firstTimeExportChecklist.slug]: firstTimeExportChecklist,
  [manilaBeverageFirstStore90Days.slug]: manilaBeverageFirstStore90Days,
  [overseasExhibitionSubsidy115Upgrade.slug]: overseasExhibitionSubsidy115Upgrade,
  [philippinesEcommerceFirstYear.slug]: philippinesEcommerceFirstYear,
  [usFdaRegistrationGuide.slug]: usFdaRegistrationGuide,
  [tradepilotTariffTutorial.slug]: tradepilotTariffTutorial,
};
import { article as agentVsDistributorExclusive } from "./agent-vs-distributor-exclusive";
import { article as fobCifDdpExplained } from "./fob-cif-ddp-explained";
import { article as firstTimeExportChecklist } from "./first-time-export-checklist";
import { article as manilaBeverageFirstStore90Days } from "./manila-beverage-first-store-90-days";
import { article as overseasExhibitionSubsidy115Upgrade } from "./overseas-exhibition-subsidy-115-upgrade";
import { article as philippinesEcommerceFirstYear } from "./philippines-ecommerce-first-year";
import { article as usFdaRegistrationGuide } from "./us-fda-registration-guide";
import { article as tradepilotTariffTutorial } from "./tradepilot-tariff-tutorial";
