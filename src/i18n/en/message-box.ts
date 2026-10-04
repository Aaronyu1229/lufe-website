import type { MessageBoxCopy } from "@/i18n/zh/message-box";

// Fingerprint of messageBoxZh this English was translated from; registry.test.ts prints the new value when Chinese changes.
export const MESSAGE_BOX_SOURCE_FINGERPRINT = "a05ad56f298c1484";

export const messageBoxEn: MessageBoxCopy = {
  title: "Tell us about your product",
  close: "Close",
  fields: {
    name: { label: "Your name *", placeholder: "How should we address you?", error: "Please enter your name" },
    contact: { label: "How can we reach you? (email or phone) *", placeholder: "So we can reply to you", error: "Please provide an email address or phone number" },
    message: { label: "Briefly tell us about your product and what you have in mind *", placeholder: "For example: We make pineapple cakes and would like to see whether there is an opportunity in the United States…", error: "Please briefly tell us about your inquiry" },
  },
  submitError: "We could not send your message. Please email us directly: ",
  submit: "Send it — We reply within one business day",
  submitting: "Sending…",
  submittedTitle: "Received",
  submittedBody: "We will reply within one business day.",
  fallbackMailto: {
    subject: "LUFÉ quick message",
    name: "Name",
    contact: "Contact details",
    message: "Message",
  },
};
