import { createLead, updateLeadNotification, type LeadValues } from "@/lib/leads/repository";
import { leadErrorsEn } from "@/i18n/en/lead-errors";
import { type Locale } from "@/i18n/locale";
import { leadErrorsZh } from "@/i18n/zh/lead-errors";

type LeadForm = "quick" | "contact" | "waitlist";

type LeadInput = {
  form: LeadForm;
  name: string;
  contact: string;
  email: string;
  phone: string;
  company: string;
  product: string;
  stage: string;
  message: string;
  monthlyVolume: string;
  currentHandler: string;
  page: string;
  lang: Locale;
};

type LeadNotification = {
  kind: "inquiry";
  source: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  lang: Locale;
  page?: string;
  msg?: string;
};

type NotificationResult = {
  ok: boolean;
  error: string | null;
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const maxLengths = {
  name: 100,
  company: 100,
  contact: 100,
  email: 150,
  phone: 100,
  product: 200,
  stage: 60,
  message: 3000,
  currentHandler: 100,
} as const;

const monthlyVolumes = ["<100", "100～500", "500 以上"] as const;

const stringValue = (value: unknown): string => typeof value === "string" ? value.trim() : "";

const nullable = (value: string): string | null => value || null;

const cut = (value: string, length: number): string => Array.from(value).slice(0, length).join("");

const validationResponse = (errors: Record<string, string>): Response =>
  Response.json({ ok: false, errors }, { status: 400 });

const localeFromLead = (body: unknown): Locale =>
  body && typeof body === "object" && !Array.isArray(body) && (body as Record<string, unknown>).lang === "en"
    ? "en"
    : "zh";

const validateLead = (body: unknown): { input?: LeadInput; errors?: Record<string, string> } => {
  const messages = localeFromLead(body) === "en" ? leadErrorsEn : leadErrorsZh;
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { errors: { form: messages.invalidForm } };
  }

  const record = body as Record<string, unknown>;
  const form = stringValue(record.form);
  if (form !== "quick" && form !== "contact" && form !== "waitlist") {
    return { errors: { form: messages.invalidForm } };
  }

  const input: LeadInput = {
    form,
    name: stringValue(record.name),
    contact: stringValue(record.contact),
    email: stringValue(record.email),
    phone: stringValue(record.phone),
    company: stringValue(record.company),
    product: stringValue(record.product),
    stage: stringValue(record.stage),
    message: form === "waitlist" ? (localeFromLead(body) === "en" ? "Call Center waitlist" : "海外客服首批登記") : stringValue(record.message),
    monthlyVolume: stringValue(record.monthlyVolume),
    currentHandler: stringValue(record.currentHandler),
    page: stringValue(record.page),
    lang: localeFromLead(body),
  };
  const errors: Record<string, string> = {};

  if (input.form === "quick") {
    if (!input.name) errors.name = messages.quick.name;
    if (!input.contact) errors.contact = messages.quick.contact;
    if (!input.message) errors.message = messages.quick.message;
  } else if (input.form === "contact") {
    if (!input.name) errors.name = messages.contact.name;
    if (!input.email) errors.email = messages.contact.email;
    else if (!emailPattern.test(input.email)) errors.email = messages.contact.emailInvalid;
    if (!input.message) errors.message = messages.contact.message;
  } else {
    if (!input.name) errors.name = messages.waitlist.name;
    if (!input.email) errors.email = messages.waitlist.email;
    else if (!emailPattern.test(input.email)) errors.email = messages.waitlist.emailInvalid;
    if (!input.monthlyVolume) errors.monthlyVolume = messages.waitlist.monthlyVolume;
    else if (!monthlyVolumes.includes(input.monthlyVolume as (typeof monthlyVolumes)[number])) {
      errors.monthlyVolume = messages.waitlist.monthlyVolumeInvalid;
    }
  }

  if (!errors.name && input.name.length > maxLengths.name) errors.name = messages.maxLength.name;
  if (input.contact.length > maxLengths.contact) errors.contact = messages.maxLength.contact;
  if (!errors.email && input.email.length > maxLengths.email) errors.email = messages.maxLength.email;
  if (input.phone.length > maxLengths.phone) errors.phone = messages.maxLength.phone;
  if (input.company.length > maxLengths.company) errors.company = messages.maxLength.company;
  if (input.product.length > maxLengths.product) errors.product = messages.maxLength.product;
  if (input.stage.length > maxLengths.stage) errors.stage = messages.maxLength.stage;
  if (!errors.message && input.message.length > maxLengths.message) errors.message = messages.maxLength.message;
  if (input.currentHandler.length > maxLengths.currentHandler) {
    errors.currentHandler = messages.maxLength.currentHandler;
  }

  return Object.keys(errors).length > 0 ? { errors } : { input };
};

const notificationPayload = (input: LeadInput): LeadNotification => {
  const payload: LeadNotification = {
    kind: "inquiry",
    source: input.form === "quick"
      ? input.lang === "en" ? "Quick message" : "快速留言"
      : input.form === "contact"
        ? input.lang === "en" ? "Contact form" : "聯絡頁完整表單"
        : input.lang === "en" ? "Call Center waitlist" : "海外客服首批登記",
    lang: input.lang,
  };

  if (input.name) payload.name = cut(input.name, 100);
  if (input.page) payload.page = cut(input.page, 200);

  if (input.form === "quick") {
    if (input.contact.includes("@")) payload.email = cut(input.contact, 150);
    else payload.phone = cut(input.contact, 50);
  } else {
    if (input.company) payload.company = cut(input.company, 100);
    if (input.email) payload.email = cut(input.email, 150);
    if (input.phone) payload.phone = cut(input.phone, 50);
  }

  const message = input.form === "waitlist"
    ? [
      input.message,
      input.lang === "en" ? `Monthly messages: ${input.monthlyVolume}` : `每月客訊：${input.monthlyVolume}`,
      input.lang === "en"
        ? `Current handler: ${input.currentHandler || "Not provided"}`
        : `現在誰在接：${input.currentHandler || "未填寫"}`,
    ]
    : [
      input.message,
      ...(input.product ? [input.lang === "en" ? `Product: ${input.product}` : `產品：${input.product}`] : []),
      ...(input.stage ? [input.lang === "en" ? `Stage: ${input.stage}` : `出海階段：${input.stage}`] : []),
    ];
  payload.msg = cut(message.join("\n"), 3000);

  return payload;
};

const notifyLead = async (payload: LeadNotification): Promise<NotificationResult> => {
  const leadUrl = process.env.JP_LEAD_URL;
  const leadSecret = process.env.LUFE_LEAD_SECRET;
  const missing = [
    !leadUrl && "JP_LEAD_URL",
    !leadSecret && "LUFE_LEAD_SECRET",
  ].filter((value): value is string => Boolean(value));

  if (!leadUrl || !leadSecret) {
    const error = `Missing notification environment variables: ${missing.join(", ")}`;
    console.error(`[lead] notification was not sent: ${error}`);
    return { ok: false, error };
  }

  try {
    const response = await fetch(leadUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Hook-Secret": leadSecret,
      },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(5_000),
    });
    if (!response.ok) {
      const error = `Notification returned HTTP ${response.status}`;
      console.error(`[lead] notification failed: ${error}`);
      return { ok: false, error };
    }

    return { ok: true, error: null };
  } catch {
    const error = "Notification request failed";
    console.error(`[lead] notification failed: ${error}`);
    return { ok: false, error };
  }
};

export async function POST(request: Request): Promise<Response> {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return validationResponse({ form: leadErrorsZh.invalidForm });
  }

  if (body && typeof body === "object" && !Array.isArray(body)
    && stringValue((body as Record<string, unknown>).website)) {
    return Response.json({ ok: true });
  }

  const validation = validateLead(body);
  if (!validation.input) return validationResponse(validation.errors ?? { form: leadErrorsZh.invalidForm });

  const input = validation.input;
  const quickContactIsEmail = input.form === "quick" && input.contact.includes("@");
  const lead: LeadValues = {
    form: input.form,
    name: nullable(input.name),
    contact: input.form === "quick" ? nullable(input.contact) : null,
    email: input.form === "quick"
      ? (quickContactIsEmail ? nullable(input.contact) : null)
      : nullable(input.email),
    phone: input.form === "quick"
      ? (quickContactIsEmail ? null : nullable(input.contact))
      : nullable(input.phone),
    company: nullable(input.company),
    product: nullable(input.product),
    stage: nullable(input.stage),
    message: input.message,
    monthlyVolume: input.form === "waitlist" ? nullable(input.monthlyVolume) : null,
    currentHandler: input.form === "waitlist" ? nullable(input.currentHandler) : null,
    page: nullable(input.page),
    userAgent: nullable(request.headers.get("user-agent")?.trim() ?? ""),
  };

  let leadId: string | null = null;
  if (!process.env.LUFE_DATABASE_URL) {
    console.error("[lead] LUFE_DATABASE_URL is missing; lead was not saved to the database");
  } else {
    try {
      leadId = await createLead(lead);
      if (!leadId) console.error("[lead] database insert did not return a lead id");
    } catch {
      console.error("[lead] database insert failed");
    }
  }

  const notification = await notifyLead(notificationPayload(input));

  if (leadId) {
    try {
      await updateLeadNotification(leadId, notification.ok, notification.error);
    } catch {
      console.error("[lead] database notification status update failed");
    }
  }

  return Response.json(
    { ok: leadId !== null || notification.ok },
    { status: leadId !== null || notification.ok ? 200 : 502 },
  );
}
