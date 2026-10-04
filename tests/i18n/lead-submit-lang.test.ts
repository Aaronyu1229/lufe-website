import { describe, expect, it } from "vitest";

import { buildQuickLeadPayload } from "@/components/MessageBox";
import { buildLocalizedContactLeadPayload, type ContactFormFields } from "@/components/contact/ContactPage";
import { buildWaitlistLeadPayload, type WaitlistFields } from "@/components/services/WaitlistForm";

const contactFields: ContactFormFields = {
  name: "Jane Doe",
  email: "jane@example.com",
  company: "Acme",
  phone: "",
  product: "Sunscreen",
  stage: "準備出海，需要方向",
  message: "I would like to discuss North America.",
  website: "",
};

const waitlistFields: WaitlistFields = {
  name: "Acme",
  email: "jane@example.com",
  monthlyVolume: "100-500",
  currentHandler: "Founder",
  website: "",
};

describe("lead submissions", () => {
  it("adds the locale to quick-message payloads", () => {
    expect(buildQuickLeadPayload({ name: "Jane Doe", contact: "jane@example.com", message: "Hello", website: "" }, "/en/services", "en")).toMatchObject({ lang: "en" });
    expect(buildQuickLeadPayload({ name: "王小明", contact: "ming@example.com", message: "你好", website: "" }, "/services", "zh")).toMatchObject({ lang: "zh" });
  });

  it("adds the locale to contact-form payloads", () => {
    expect(buildLocalizedContactLeadPayload(contactFields, "/en/contact", "en")).toMatchObject({ lang: "en" });
    expect(buildLocalizedContactLeadPayload(contactFields, "/contact", "zh")).toMatchObject({ lang: "zh" });
  });

  it("adds the locale and keeps Chinese monthly-volume values in waitlist payloads", () => {
    expect(buildWaitlistLeadPayload(waitlistFields, "/en/services/call-center", "en")).toMatchObject({
      lang: "en",
      monthlyVolume: "100～500",
    });
    expect(buildWaitlistLeadPayload({ ...waitlistFields, monthlyVolume: "100～500" }, "/services/call-center", "zh")).toMatchObject({
      lang: "zh",
      monthlyVolume: "100～500",
    });
  });
});
