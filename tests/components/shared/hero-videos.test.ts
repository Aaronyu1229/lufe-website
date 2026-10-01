import { existsSync, statSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";

import { HERO_VIDEOS } from "@/data/heroVideos";

const root = process.cwd();
const publicPath = (assetPath: string) => path.join(root, "public", assetPath.replace(/^\//, ""));

describe("HERO_VIDEOS", () => {
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
