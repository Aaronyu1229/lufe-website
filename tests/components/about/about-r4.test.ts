import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { AboutPage, storyChapters } from "@/components/about/AboutPage";

describe("AboutPage R4 story", () => {
  it("renders the new story structure and moves its counters out of the network", () => {
    const markup = renderToStaticMarkup(createElement(AboutPage));
    const storyStart = markup.indexOf('id="story"');
    const storyEnd = markup.indexOf('id="team"');
    const storyMarkup = markup.slice(storyStart, storyEnd);
    const networkMarkup = markup.slice(markup.indexOf('id="network"'), markup.indexOf('id="philosophy"'));

    expect(markup).toContain("躍馬企業官網");
    expect(markup).toContain('href="https://jumping.group"');
    expect(markup).toContain("關鍵洞察");
    for (const chapter of storyChapters) expect(storyMarkup).toContain(chapter.title);
    expect((markup.match(/id="story"/g) ?? [])).toHaveLength(1);
    expect(markup.slice(markup.indexOf('class="lufe-hero'), markup.indexOf("</section>") + "</section>".length)).not.toContain('id="story"');
    expect((storyMarkup.match(/data-lufe-counter/g) ?? [])).toHaveLength(3);
    expect(networkMarkup).not.toContain("data-lufe-counter");
    expect(markup).not.toContain("想通的事");
  });
});
