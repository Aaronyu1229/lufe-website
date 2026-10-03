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
        "about": 0.8,
        "assess": 0.8,
        "author": 0.8,
        "case:bubble-tea": 0.8,
        "case:fish-floss-us-fda": 0.8,
        "case:goat-milk-soap-global": 0.8,
        "cases": 0.8,
        "chapter:after": 0.8,
        "chapter:m1": 0.8,
        "chapter:m3": 0.8,
        "chapter:m9": 0.8,
        "chapter:na": 0.8,
        "contact": 0.8,
        "insights": 0.8,
        "methodology": 0.8,
        "optimize": 0.8,
        "resources": 0.8,
        "services": 0.8,
        "subsidies": 0.8,
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
