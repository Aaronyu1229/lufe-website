import { createLead, updateLeadNotification, type LeadValues } from "@/lib/leads/repository";

type LeadForm = "quick" | "contact";

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
  page: string;
};

type LeadNotification = {
  kind: "inquiry";
  source: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  lang: "zh";
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
} as const;

const stringValue = (value: unknown): string => typeof value === "string" ? value.trim() : "";

const nullable = (value: string): string | null => value || null;

const cut = (value: string, length: number): string => Array.from(value).slice(0, length).join("");

const validationResponse = (errors: Record<string, string>): Response =>
  Response.json({ ok: false, errors }, { status: 400 });

const validateLead = (body: unknown): { input?: LeadInput; errors?: Record<string, string> } => {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return { errors: { form: "表單格式不正確" } };
  }

  const record = body as Record<string, unknown>;
  const form = stringValue(record.form);
  if (form !== "quick" && form !== "contact") {
    return { errors: { form: "表單格式不正確" } };
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
    message: stringValue(record.message),
    page: stringValue(record.page),
  };
  const errors: Record<string, string> = {};

  if (input.form === "quick") {
    if (!input.name) errors.name = "請填姓名";
    if (!input.contact) errors.contact = "請留 Email 或電話";
    if (!input.message) errors.message = "請簡單說明一下";
  } else {
    if (!input.name) errors.name = "請填寫姓名";
    if (!input.email) errors.email = "請填寫 Email";
    else if (!emailPattern.test(input.email)) errors.email = "Email 格式不正確";
    if (!input.message) errors.message = "請填寫你的問題";
  }

  if (!errors.name && input.name.length > maxLengths.name) errors.name = "姓名不可超過 100 字";
  if (input.contact.length > maxLengths.contact) errors.contact = "聯絡方式不可超過 100 字";
  if (!errors.email && input.email.length > maxLengths.email) errors.email = "Email 不可超過 150 字";
  if (input.phone.length > maxLengths.phone) errors.phone = "電話不可超過 100 字";
  if (input.company.length > maxLengths.company) errors.company = "公司名稱不可超過 100 字";
  if (input.product.length > maxLengths.product) errors.product = "產品不可超過 200 字";
  if (input.stage.length > maxLengths.stage) errors.stage = "出海階段不可超過 60 字";
  if (!errors.message && input.message.length > maxLengths.message) errors.message = "訊息不可超過 3000 字";

  return Object.keys(errors).length > 0 ? { errors } : { input };
};

const notificationPayload = (input: LeadInput): LeadNotification => {
  const payload: LeadNotification = {
    kind: "inquiry",
    source: input.form === "quick" ? "快速留言" : "聯絡頁完整表單",
    lang: "zh",
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

  const message = [input.message];
  if (input.product) message.push(`產品：${input.product}`);
  if (input.stage) message.push(`出海階段：${input.stage}`);
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
    return validationResponse({ form: "表單格式不正確" });
  }

  if (body && typeof body === "object" && !Array.isArray(body)
    && stringValue((body as Record<string, unknown>).website)) {
    return Response.json({ ok: true });
  }

  const validation = validateLead(body);
  if (!validation.input) return validationResponse(validation.errors ?? { form: "表單格式不正確" });

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
