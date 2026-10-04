import type { LeadErrorsCopy } from "@/i18n/zh/lead-errors";

// Fingerprint of leadErrorsZh this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const LEAD_ERRORS_SOURCE_FINGERPRINT = "8fffeb5f6bd928b0";

export const leadErrorsEn: LeadErrorsCopy = {
  invalidForm: "The form format is invalid",
  quick: {
    name: "Please enter your name",
    contact: "Please provide an email address or phone number",
    message: "Please briefly tell us about your inquiry",
  },
  contact: {
    name: "Please enter your name",
    email: "Please enter your email address",
    emailInvalid: "Please enter a valid email address",
    message: "Please enter your question",
  },
  waitlist: {
    name: "Please enter your brand name",
    email: "Please enter your email address",
    emailInvalid: "Please enter a valid email address",
    monthlyVolume: "Please select your monthly customer-message volume",
    monthlyVolumeInvalid: "The monthly customer-message volume is invalid",
  },
  maxLength: {
    name: "Name must be 100 characters or fewer",
    contact: "Contact details must be 100 characters or fewer",
    email: "Email must be 150 characters or fewer",
    phone: "Phone number must be 100 characters or fewer",
    company: "Company name must be 100 characters or fewer",
    product: "Product must be 200 characters or fewer",
    stage: "Expansion stage must be 60 characters or fewer",
    message: "Message must be 3,000 characters or fewer",
    currentHandler: "Current handler must be 100 characters or fewer",
  },
};
