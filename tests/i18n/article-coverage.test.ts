import { describe, it } from "vitest";

import { articles } from "@/data/articles";
import { EN_ARTICLES } from "@/data/en/articles";

describe("English article coverage", () => {
  it("gives every Chinese article an English version", () => {
    for (const article of articles) {
      if (!EN_ARTICLES[article.slug]) {
        throw new Error(
          `Article ${article.slug} has no English version. Add src/data/en/articles/${article.slug}.ts (see docs/blog-autopilot/RUNBOOK.md step 5b).`,
        );
      }
    }
  });
});
