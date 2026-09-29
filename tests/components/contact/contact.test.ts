import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";

import {
  buildContactLeadPayload,
  ContactPage,
  stageOptions,
  type ContactFormFields,
} from "@/components/contact/ContactPage";

describe("ContactPage", () => {
  it("keeps every stage choice in the server markup without rounded classes", () => {
    const markup = renderToStaticMarkup(createElement(ContactPage));

    for (const option of stageOptions) {
      expect(markup).toContain(option);
    }

    expect(markup).not.toContain("rounded-");
  });

  it("builds the unchanged contact lead payload", () => {
    const fields: ContactFormFields = {
      name: "王小明",
      email: "ming@example.com",
      company: "鹿飛測試公司",
      phone: "0912-345-678",
      product: "測試產品",
      stage: stageOptions[1],
      message: "想討論出海方向",
      website: "",
    };

    expect(buildContactLeadPayload(fields, "/contact")).toEqual({
      form: "contact",
      name: "王小明",
      email: "ming@example.com",
      company: "鹿飛測試公司",
      phone: "0912-345-678",
      product: "測試產品",
      stage: stageOptions[1],
      message: "想討論出海方向",
      website: "",
      page: "/contact",
    });
  });
});
