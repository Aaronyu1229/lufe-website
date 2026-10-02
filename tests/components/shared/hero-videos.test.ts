import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { HERO_VIDEOS } from "@/data/heroVideos";

const root = process.cwd();
const publicPath = (assetPath: string) => path.join(root, "public", assetPath.replace(/^\//, ""));

describe("HERO_VIDEOS", () => {
  it("uses the approved playback rate for every shared hero video", () => {
    expect(Object.fromEntries(Object.entries(HERO_VIDEOS).map(([key, video]) => [key, video.playbackRate]))).toMatchInlineSnapshot(`
      {
        "about": 1.25,
        "assess": 1.25,
        "author": 1.25,
        "case:bubble-tea": 1.25,
        "case:fish-floss-us-fda": 1.25,
        "case:goat-milk-soap-global": 0.75,
        "cases": 1.25,
        "chapter:after": 1.25,
        "chapter:m1": 0.75,
        "chapter:m3": 1.25,
        "chapter:m9": 1.25,
        "chapter:na": 1.25,
        "contact": 1.25,
        "insights": 1.25,
        "methodology": 0.8,
        "optimize": 1.05,
        "resources": 1.25,
        "services": 1.15,
        "subsidies": 1.25,
      }
    `);

    for (const video of Object.values(HERO_VIDEOS)) {
      expect(video.playbackRate).toBeGreaterThanOrEqual(0.6);
      expect(video.playbackRate).toBeLessThanOrEqual(1.25);
    }
  });

  it("references existing public assets, including the North America HD source", () => {
    for (const video of Object.values(HERO_VIDEOS)) {
      const srcHd = "srcHd" in video ? video.srcHd : undefined;
      const assets = [
        video.src,
        srcHd,
        video.poster,
        ...video.posterSrcSet.split(",").map((source) => source.trim().split(" ")[0]),
      ].filter((asset): asset is string => Boolean(asset));

      for (const asset of assets) expect(existsSync(publicPath(asset))).toBe(true);
      expect(statSync(publicPath(video.src)).size).toBeLessThanOrEqual(2_621_440);
      if (srcHd) expect(statSync(publicPath(srcHd)).size).toBeLessThanOrEqual(5_000_000);
    }

    expect(HERO_VIDEOS["chapter:na"].srcHd).toBe("/videos/hero/na-skyline-1080.mp4");
    expect(Object.keys(HERO_VIDEOS).some((key) => /costco|electronics|shoe|field[N]otes/i.test(key))).toBe(false);
  });
});
