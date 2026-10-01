import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import { buildContactLeadPayload, ContactPage, stageOptions, type ContactFormFields } from "@/components/contact/ContactPage";

describe("ContactPage", () => {
  it("keeps form fields and the compact contact layout in SSR markup", () => {
    const markup = renderToStaticMarkup(createElement(ContactPage));

    for (const option of stageOptions) expect(markup).toContain(option);
    for (const name of ["name", "email", "company", "phone", "product", "message", "website"]) expect(markup).toContain(`name=\"${name}\"`);

    expect(markup).toContain('id="partners"');
    expect(markup).toContain("合作洽談");
    expect(markup).toContain("aaron.yu@reborn.in");
    expect(markup).toContain("留下你的需求");
    expect(markup).not.toContain("選一個你最方便的方式");
    expect(markup).not.toContain("section-heading");
    expect(markup).not.toContain("hero-title");
    expect(markup).not.toContain("rounded-");
  });

  it("builds the unchanged contact lead payload", () => {
    const fields: ContactFormFields = {
      name: "王小明", email: "ming@example.com", company: "鹿飛測試公司", phone: "0912-345-678", product: "測試產品", stage: stageOptions[1], message: "想討論出海方向", website: "",
    };
    expect(buildContactLeadPayload(fields, "/contact")).toEqual({ form: "contact", ...fields, page: "/contact" });
  });
});
