import { readFileSync } from "node:fs";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({ pathname: "/" }));

vi.mock("next/navigation", () => ({ usePathname: () => state.pathname }));

import { MessageBox } from "@/components/MessageBox";
import { expectEnglishMarkup } from "./helpers";

describe("MessageBox i18n", () => {
  it("keeps Chinese byte-identical", () => {
    state.pathname = "/";
    expect(renderToStaticMarkup(createElement(MessageBox))).toBe(
      readFileSync("tests/fixtures/message-box.zh.html", "utf8"),
    );
  });

  it("renders complete English on English routes", () => {
    state.pathname = "/en/services";
    const markup = renderToStaticMarkup(createElement(MessageBox));

    expectEnglishMarkup(markup);
    expect(markup).toContain("We reply within one business day");
  });
});
