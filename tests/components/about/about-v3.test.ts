import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AboutPage } from "@/components/about/AboutPage";

describe("AboutPage v3 story", () => {
  const markup = renderToStaticMarkup(createElement(AboutPage));

  it("tells the 43-year story with the freight chart and sources", () => {
    for (const copy of [
      "43 年，把台灣的貨送到世界各地",
      "貨送到了，客戶的日子卻一年比一年難",
      "守住本業很安全，但客戶需要我們再往前走一步",
      "多一點把握",
      "10,377 美元",
      "1,420 美元",
      "躍馬是我們的後盾：躍馬把貨送到，鹿飛讓貨在當地被買走",
    ]) expect(markup).toContain(copy);
    for (const removed of ["資料來源", "退場", "認識躍馬企業", "jumping.group"]) expect(markup).not.toContain(removed);
    expect(markup).not.toMatch(/我(?!們)/);
    for (const retired of ["二代", "第二代", "接班人", "42 年", "四十二年", "全球在地節點", "三支柱方法論", "一群躍馬的人"]) expect(markup).not.toContain(retired);
  });

  it("marks every photo slot and keeps the current images as fallbacks", () => {
    for (const slot of ["PHOTO-SLOT-01", "CHART-SLOT-02", "PHOTO-SLOT-03", "PHOTO-SLOT-05A", "PHOTO-SLOT-05B", "PHOTO-SLOT-05C"]) expect(markup).toContain(`data-slot="${slot}"`);
    expect(markup).toContain("/images/about/about-port-1600.webp");
    expect(markup).toContain("/images/about/story-belief-compass-1600.webp");
    expect(markup).toContain("貨櫃碼頭——躍馬 43 年的日常");
  });

  it("shows an uploaded slot photo with its own caption", () => {
    const withPhoto = renderToStaticMarkup(createElement(AboutPage, { photoSources: { "PHOTO-SLOT-01": "/images/about/slot-01-jumping-early.webp" } }));
    expect(withPhoto).toContain("/images/about/slot-01-jumping-early.webp");
    expect(withPhoto).toContain("躍馬 43 年，從這裡開始");
  });
});
