import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";

import { describe, expect, it } from "vitest";

const IMAGE_PATTERN = /\/images\/[A-Za-z0-9_./-]+\.(?:jpe?g|png)/gi;
const SOURCE_ROOT = resolve("src");
const PUBLIC_ROOT = resolve("public");
const MAX_DIRECT_SOURCE_BYTES = 500 * 1024;

function walk(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const file = join(directory, entry.name);
    return entry.isDirectory() ? walk(file) : [file];
  });
}

describe("large local images", () => {
  it("does not directly reference originals above 500KB outside metadata", () => {
    const offenders: string[] = [];

    for (const source of walk(SOURCE_ROOT).filter((file) => /\.(?:[cm]?[jt]sx?|css)$/.test(file))) {
      const lines = readFileSync(source, "utf8").split("\n");
      lines.forEach((line, index) => {
        const metadataUse = /(?:opengraph|metadata)/i.test(source) || /(?:opengraph|metadata)/i.test(line);
        for (const [image] of line.matchAll(IMAGE_PATTERN)) {
          const file = resolve(PUBLIC_ROOT, `.${image}`);
          if (!metadataUse && statSync(file).size > MAX_DIRECT_SOURCE_BYTES) offenders.push(`${source}:${index + 1} (${image})`);
        }
      });
    }

    expect(offenders).toEqual([]);
  });
});
