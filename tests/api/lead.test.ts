import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const state = vi.hoisted(() => ({
  createLead: vi.fn(),
  updateLeadNotification: vi.fn(),
  fetch: vi.fn(),
}));

vi.mock("@/lib/leads/repository", () => ({
  createLead: state.createLead,
  updateLeadNotification: state.updateLeadNotification,
}));

import { POST } from "@/app/api/lead/route";

const environmentKeys = ["LUFE_DATABASE_URL", "JP_LEAD_URL", "LUFE_LEAD_SECRET"] as const;
const originalEnvironment = new Map(environmentKeys.map((key) => [key, process.env[key]]));
const consoleError = vi.fn();

const request = (body: unknown) => new Request("http://localhost/api/lead", {
  method: "POST",
  headers: { "content-type": "application/json", "user-agent": "vitest" },
  body: JSON.stringify(body),
});

const quickLead = (overrides: Record<string, unknown> = {}) => ({
  form: "quick",
  name: " 王小明 ",
  contact: " ming@example.com ",
  message: " 想了解合作方式 ",
  page: " /services ",
  website: "",
  ...overrides,
});

const contactLead = (overrides: Record<string, unknown> = {}) => ({
  form: "contact",
  name: " Ada ",
  email: " ada@example.com ",
  company: " Acme ",
  phone: " 0912-345-678 ",
  product: " 鳳梨酥 ",
  stage: " 準備出海，需要方向 ",
  message: " 想談日本市場 ",
  page: " /contact ",
  website: "",
  ...overrides,
});

const waitlistLead = (overrides: Record<string, unknown> = {}) => ({
  form: "waitlist",
  name: " 新品牌 ",
  email: " hello@brand.com ",
  monthlyVolume: " 100～500 ",
  currentHandler: " 台灣客服 ",
  page: " /services/call-center ",
  website: "",
  ...overrides,
});

beforeEach(() => {
  state.createLead.mockReset().mockResolvedValue("lead-1");
  state.updateLeadNotification.mockReset().mockResolvedValue(undefined);
  state.fetch.mockReset().mockResolvedValue(new Response(null, { status: 204 }));
  consoleError.mockReset();
  vi.spyOn(console, "error").mockImplementation(consoleError);
  vi.stubGlobal("fetch", state.fetch);
  process.env.LUFE_DATABASE_URL = "postgres://example";
  process.env.JP_LEAD_URL = "https://jp.example.test/lufe-lead";
  process.env.LUFE_LEAD_SECRET = "lead-secret";
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  for (const key of environmentKeys) {
    const value = originalEnvironment.get(key);
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
});

describe("POST /api/lead", () => {
  it("returns success without saving or notifying when the honeypot is filled", async () => {
    const response = await POST(request(quickLead({ website: "https://spam.example" })));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(state.createLead).not.toHaveBeenCalled();
    expect(state.fetch).not.toHaveBeenCalled();
  });

  it("returns the existing quick-form validation errors", async () => {
    const response = await POST(request(quickLead({ name: " ", contact: "", message: "" })));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      errors: {
        name: "請填姓名",
        contact: "請留 Email 或電話",
        message: "請簡單說明一下",
      },
    });
    expect(state.createLead).not.toHaveBeenCalled();
  });

  it("returns the existing full-form validation errors", async () => {
    const requiredResponse = await POST(request(contactLead({ name: "", email: "", message: "" })));
    const emailResponse = await POST(request(contactLead({ email: "not-an-email" })));

    expect(requiredResponse.status).toBe(400);
    await expect(requiredResponse.json()).resolves.toEqual({
      ok: false,
      errors: {
        name: "請填寫姓名",
        email: "請填寫 Email",
        message: "請填寫你的問題",
      },
    });
    await expect(emailResponse.json()).resolves.toEqual({
      ok: false,
      errors: { email: "Email 格式不正確" },
    });
  });

  it("saves the lead and sends the exact notification payload", async () => {
    const response = await POST(request(contactLead()));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(state.createLead).toHaveBeenCalledWith({
      form: "contact",
      name: "Ada",
      contact: null,
      email: "ada@example.com",
      phone: "0912-345-678",
      company: "Acme",
      product: "鳳梨酥",
      stage: "準備出海，需要方向",
      message: "想談日本市場",
      monthlyVolume: null,
      currentHandler: null,
      page: "/contact",
      userAgent: "vitest",
    });

    expect(state.fetch).toHaveBeenCalledTimes(1);
    const [url, options] = state.fetch.mock.calls[0] as [string, RequestInit];
    expect(url).toBe("https://jp.example.test/lufe-lead");
    expect(options).toMatchObject({
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Hook-Secret": "lead-secret",
      },
    });
    const payload = JSON.parse(options.body as string);
    expect(Object.keys(payload).sort()).toEqual([
      "company", "email", "kind", "lang", "msg", "name", "page", "phone", "source",
    ]);
    expect(payload).toEqual({
      kind: "inquiry",
      source: "聯絡頁完整表單",
      name: "Ada",
      company: "Acme",
      email: "ada@example.com",
      phone: "0912-345-678",
      lang: "zh",
      page: "/contact",
      msg: "想談日本市場\n產品：鳳梨酥\n出海階段：準備出海，需要方向",
    });
    expect(state.updateLeadNotification).toHaveBeenCalledWith("lead-1", true, null);
  });

  it("returns 200 and records the notification error when saving succeeds", async () => {
    state.fetch.mockResolvedValue(new Response(null, { status: 503 }));

    const response = await POST(request(quickLead()));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(state.updateLeadNotification).toHaveBeenCalledWith(
      "lead-1",
      false,
      "Notification returned HTTP 503",
    );
  });

  it("returns 200 when the database insert fails but notification succeeds", async () => {
    state.createLead.mockRejectedValue(new Error("database unavailable"));

    const response = await POST(request(quickLead({ contact: "0912-000-000" })));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(state.fetch).toHaveBeenCalledTimes(1);
    expect(state.updateLeadNotification).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalledWith("[lead] database insert failed");
  });

  it("returns 502 when both saving and notification fail", async () => {
    state.createLead.mockRejectedValue(new Error("database unavailable"));
    state.fetch.mockRejectedValue(new Error("notification unavailable"));

    const response = await POST(request(quickLead()));

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({ ok: false });
  });

  it("logs missing notification configuration and stores its error without sending a secret header", async () => {
    delete process.env.LUFE_LEAD_SECRET;

    const response = await POST(request(quickLead()));

    expect(response.status).toBe(200);
    expect(state.fetch).not.toHaveBeenCalled();
    expect(consoleError).toHaveBeenCalledWith(
      "[lead] notification was not sent: Missing notification environment variables: LUFE_LEAD_SECRET",
    );
    expect(state.updateLeadNotification).toHaveBeenCalledWith(
      "lead-1",
      false,
      "Missing notification environment variables: LUFE_LEAD_SECRET",
    );
  });

  it("saves a waitlist lead and sends its registration notification", async () => {
    const response = await POST(request(waitlistLead()));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(state.createLead).toHaveBeenCalledWith({
      form: "waitlist",
      name: "新品牌",
      contact: null,
      email: "hello@brand.com",
      phone: null,
      company: null,
      product: null,
      stage: null,
      message: "海外客服首批登記",
      monthlyVolume: "100～500",
      currentHandler: "台灣客服",
      page: "/services/call-center",
      userAgent: "vitest",
    });
    const [, options] = state.fetch.mock.calls[0] as [string, RequestInit];
    expect(JSON.parse(options.body as string)).toMatchObject({
      source: "海外客服首批登記",
      name: "新品牌",
      email: "hello@brand.com",
      page: "/services/call-center",
      msg: "海外客服首批登記\n每月客訊：100～500\n現在誰在接：台灣客服",
    });
  });

  it("returns waitlist required-field validation errors", async () => {
    const response = await POST(request(waitlistLead({ name: "", email: "", monthlyVolume: "" })));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      errors: {
        name: "請填寫品牌名稱",
        email: "請填寫 Email",
        monthlyVolume: "請選擇每月客訊量",
      },
    });
    expect(state.createLead).not.toHaveBeenCalled();
  });

  it("rejects an invalid waitlist monthly volume", async () => {
    const response = await POST(request(waitlistLead({ monthlyVolume: "1000" })));

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({
      ok: false,
      errors: { monthlyVolume: "每月客訊量不正確" },
    });
  });

  it("accepts a waitlist honeypot without saving or notifying", async () => {
    const response = await POST(request(waitlistLead({ website: "https://spam.example" })));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ ok: true });
    expect(state.createLead).not.toHaveBeenCalled();
    expect(state.fetch).not.toHaveBeenCalled();
  });
});
