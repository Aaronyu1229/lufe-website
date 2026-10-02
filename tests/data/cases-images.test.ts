import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

import { CASES } from "@/data/cases";
import { imageTierSrcSet } from "@/lib/image-tiers";

const NEW_STORY_IMAGES = new Set([
  "/images/cases/story/bubble-tea-tasting-1600.webp",
  "/images/cases/story/goat-soap-1-1600.webp",
  "/images/cases/story/goat-soap-2-1600.webp",
  "/images/cases/story/fish-floss-1-1600.webp",
  "/images/cases/story/fish-floss-2-1600.webp",
]);

function imageUrls(src: string): readonly string[] {
  return imageTierSrcSet(src)?.split(", ").map((entry) => entry.split(" ")[0]) ?? [src];
}

function webpDimensions(path: string): { readonly width: number; readonly height: number } {
  const bytes = readFileSync(path);
  const chunk = bytes.subarray(12, 16).toString("ascii");

  if (chunk === "VP8X") {
    return {
      width: 1 + bytes[24] + (bytes[25] << 8) + (bytes[26] << 16),
      height: 1 + bytes[27] + (bytes[28] << 8) + (bytes[29] << 16),
    };
  }

  if (chunk === "VP8 ") {
    return {
      width: bytes.readUInt16LE(26) & 0x3fff,
      height: bytes.readUInt16LE(28) & 0x3fff,
    };
  }

  if (chunk === "VP8L") {
    return {
      width: 1 + bytes[21] + ((bytes[22] & 0x3f) << 8),
      height: 1 + (bytes[22] >> 6) + (bytes[23] << 2) + ((bytes[24] & 0x0f) << 10),
    };
  }

  throw new Error(`Unsupported WebP chunk ${chunk} in ${path}`);
}

describe("case image tiers", () => {
  it("keeps every hero and story tier available", () => {
    for (const caseItem of CASES) {
      for (const source of [caseItem.heroImage, ...caseItem.story.flatMap((chapter) => chapter.image ? [chapter.image.src] : [])]) {
        for (const url of imageUrls(source)) {
          expect(existsSync(join(process.cwd(), "public", url))).toBe(true);
        }
      }
    }
  });

  it("uses landscape story images", () => {
    for (const caseItem of CASES) {
      for (const chapter of caseItem.story) {
        if (!chapter.image || !NEW_STORY_IMAGES.has(chapter.image.src)) continue;
        const preview = chapter.image.src.replace(/-1600\.webp$/, "-640.webp");
        const { width, height } = webpDimensions(join(process.cwd(), "public", preview));
        expect(width).toBeGreaterThan(height);
      }
    }
  });
});
