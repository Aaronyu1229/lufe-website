import { describe, expect, it } from "vitest";

import { expectEnglishMarkup } from "./helpers";

describe("expectEnglishMarkup", () => {
  it("accepts clean English", () => {
    expect(() => expectEnglishMarkup('<a href="/en/services">Services</a><a href="#x">x</a><img alt="A team" src="/images/a.webp">')).not.toThrow();
  });

  it("allows the Chinese language-toggle label only", () => {
    expect(() => expectEnglishMarkup('<a href="/en/services" hrefLang="zh-Hant" lang="zh-Hant">中文</a>')).not.toThrow();
  });

  it("rejects Han anywhere, including attributes", () => {
    expect(() => expectEnglishMarkup('<img alt="團隊" src="/a.webp">')).toThrow();
  });

  it("rejects internal links outside /en", () => {
    expect(() => expectEnglishMarkup('<a href="/services">Services</a>')).toThrow();
  });

  it("allows api, static files, external, mailto", () => {
    expect(() => expectEnglishMarkup('<a href="/api/lead">a</a><a href="/files/x.pdf">b</a><a href="https://jumping.group">c</a><a href="mailto:aaron.yu@reborn.in">d</a>')).not.toThrow();
  });
});
