import type { ContactPageCopy } from "@/i18n/zh/contact-page";

// Fingerprint of contactPageZh this English was translated from; registry.test.ts prints the value after the first run.
export const CONTACT_PAGE_SOURCE_FINGERPRINT = "42a0702bf7e2d4ec";

export const contactPageEn: ContactPageCopy = {
  home: "Home", breadcrumb: "Contact LUFÉ", title: "Contact LUFÉ", lead: "For expansion planning, partnership discussions, or media inquiries, leave a message. We reply within one business day.", scrollCue: "Scroll down",
  contact: { email: "Email", location: "Location", locationValue: "Taipei | Primarily online meetings", hours: "Service hours", hoursValue: "Monday–Friday 09:00–18:00", replyTime: "Reply time", replyTimeValue: "We reply within one business day" },
  form: { title: "Tell us what you need", lead: "The more complete the information, the more precise our first reply can be", name: "Name *", namePlaceholder: "Your name", email: "Email *", company: "Company name", companyPlaceholder: "Company name", phone: "Phone", phonePlaceholder: "09xx-xxx-xxx", product: "Your product", productPlaceholder: "Briefly describe your product or brand", stage: "Your current expansion stage", message: "What would you like to ask? *", messagePlaceholder: "Any question is welcome; it is okay if you are not sure", submit: "Submit form", submitting: "Submitting…", privacy: "We will not share your information with any third party." },
  stageLabels: ["Still exploring overseas expansion", "Preparing to expand and need direction", "Already expanding and want to improve", "Other"],
};
