import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { HERO_VIDEOS } from "@/data/heroVideos";

const root = process.cwd();
const publicPath = (assetPath: string) => path.join(root, "public", assetPath.replace(/^\//, ""));

describe("HERO_VIDEOS", () => {
  it("uses the approved playback rate for every shared hero video", () => {
    expect(Object.fromEntries(Object.entries(HERO_VIDEOS).map(([key, video]) => [key, video.playbackRate]))).toEqual({
      about: 0.8,
      author: 1.25,
      cases: 1.25,
      "case:costco-health": 0.6,
      "case:electronics-tariff": 1.25,
      "case:shoe-brand": 1.25,
      "case:bubble-tea": 1.25,
      fieldNotes: 0.7,
      insights: 1.25,
      resources: 1,
      contact: 1.25,
      subsidies: 1.25,
      services: 1,
      "chapter:m1": 0.75,
      "chapter:m3": 1.25,
      "chapter:m9": 1.25,
      "chapter:after": 1.25,
      "chapter:na": 0.6,
      optimize: 1,
      methodology: 0.8,
    });

    for (const video of Object.values(HERO_VIDEOS)) {
      expect(video.playbackRate).toBeGreaterThanOrEqual(0.6);
      expect(video.playbackRate).toBeLessThanOrEqual(1.25);
    }
    expect(HERO_VIDEOS.services.playbackRate).toBe(1);
    expect(HERO_VIDEOS.optimize.playbackRate).toBe(1);
  });

  it("references only public assets and keeps MP4s within the shared budget", () => {
    for (const video of Object.values(HERO_VIDEOS)) {
      const assets = [
        video.src,
        video.poster,
        ...video.posterSrcSet.split(",").map((source) => source.trim().split(" ")[0]),
      ];

      for (const asset of assets) expect(existsSync(publicPath(asset))).toBe(true);
      expect(statSync(publicPath(video.src)).size).toBeLessThanOrEqual(2_621_440);
    }
  });
});
