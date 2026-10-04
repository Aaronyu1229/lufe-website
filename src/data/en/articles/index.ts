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
};
import { article as agentVsDistributorExclusive } from "./agent-vs-distributor-exclusive";
