"use client";

import { useState } from "react";
import Image from "next/image";
import { ChoiceGroup } from "@/components/ui/ChoiceGroup";
import { useMessageBox } from "../MessageBox";

/* ───────── channel cards ───────── */

const channels = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="16" rx="0" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 8L14 15L25 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "快速留言",
    desc: "直接寫訊息給我們，通常一個工作天內回覆。",
    action: "open-message" as const,
    actionLabel: "開啟訊息框",
    color: "gold",
    recommended: true as const,
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="0" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 10H24" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="16" r="2" stroke="currentColor" strokeWidth="1" />
        <circle cx="18" cy="16" r="2" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    title: "預約諮詢",
    desc: "寫信告訴我們你方便的時間，30 分鐘免費聊聊。",
    action: "booking-email" as const,
    actionLabel: "寄信預約",
    color: "sky",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 8L14 14L22 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="6" width="20" height="16" rx="0" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    title: "Email",
    desc: "寫封信給我們，詳細說明你的需求。",
    action: "email" as const,
    actionLabel: "寄信",
    color: "ember",
  },
];

const cardColorMap: Record<string, { border: string; iconBg: string; iconText: string }> = {
  gold: { border: "hover:border-gold", iconBg: "bg-[rgba(212,168,92,0.08)]", iconText: "text-gold-d" },
  sky: { border: "hover:border-sky", iconBg: "bg-[rgba(91,143,168,0.08)]", iconText: "text-sky" },
  ember: { border: "hover:border-ember", iconBg: "bg-[rgba(217,139,74,0.08)]", iconText: "text-ember" },
};

export const stageOptions = [
  "還在觀望，想了解出海",
  "準備出海，需要方向",
  "已經在出海，想做更好",
  "其他",
];

export type ContactFormFields = {
  name: string;
  email: string;
  company: string;
  phone: string;
  product: string;
  stage: string;
  message: string;
  website: string;
};

export function buildContactLeadPayload(fields: ContactFormFields, page: string) {
  return {
    form: "contact",
    ...fields,
    page,
  };
}

/* ───────── validation helpers ───────── */

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ───────── component ───────── */

export function ContactPage() {
  const { open } = useMessageBox();
  const [formState, setFormState] = useState<ContactFormFields>({
    name: "",
    email: "",
    company: "",
    phone: "",
    product: "",
    stage: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validate = (fields = formState) => {
    const errs: Record<string, string> = {};
    if (!fields.name.trim()) errs.name = "請填寫姓名";
    if (!fields.email.trim()) errs.email = "請填寫 Email";
    else if (!isValidEmail(fields.email)) errs.email = "Email 格式不正確";
    if (!fields.message.trim()) errs.message = "請填寫你的問題";
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const next = { ...formState, [e.target.name]: e.target.value };
    setFormState(next);
    setSubmitError(false);
    // Clear error on change if field was touched
    if (touched[e.target.name]) {
      const errs = validate(next);
      setErrors((prev) => {
        const updated = { ...prev };
        if (errs[e.target.name]) updated[e.target.name] = errs[e.target.name];
        else delete updated[e.target.name];
        return updated;
      });
    }
  };

  const handleStageChange = (stage: string) => {
    setFormState((previous) => ({ ...previous, stage }));
    setSubmitError(false);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const name = e.target.name;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const errs = validate();
    setErrors((prev) => {
      const updated = { ...prev };
      if (errs[name]) updated[name] = errs[name];
      else delete updated[name];
      return updated;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    const errs = validate();
    setErrors(errs);
    setTouched({ name: true, email: true, message: true });
    if (Object.keys(errs).length > 0) return;

    setSubmitError(false);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(buildContactLeadPayload(formState, window.location.pathname)),
      });
      const result = await response.json().catch(() => null) as {
        ok?: boolean;
        errors?: Record<string, string>;
      } | null;

      if (response.ok && result?.ok) {
        setSubmitted(true);
      } else {
        const serverErrors = result?.errors ?? {};
        setErrors(serverErrors);
        setTouched((previous) => ({
          ...previous,
          ...Object.fromEntries(Object.keys(serverErrors).map((name) => [name, true])),
        }));
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChannelClick = (action: string) => {
    switch (action) {
      case "open-message":
        open();
        break;
      case "booking-email":
        window.location.href =
          "mailto:aaron.yu@reborn.in?subject=%E9%A0%90%E7%B4%84%2030%20%E5%88%86%E9%90%98%E5%85%8D%E8%B2%BB%E8%AB%AE%E8%A9%A2&body=%E4%BD%A0%E5%A5%BD%EF%BC%8C%E6%88%91%E6%83%B3%E9%A0%90%E7%B4%84%2030%20%E5%88%86%E9%90%98%E5%85%8D%E8%B2%BB%E8%AB%AE%E8%A9%A2%E3%80%82%0A%0A%E6%96%B9%E4%BE%BF%E7%9A%84%E6%99%82%E9%96%93%EF%BC%9A%0A%E5%85%AC%E5%8F%B8%20%2F%20%E7%94%A2%E5%93%81%EF%BC%9A%0A%E6%83%B3%E8%81%8A%E7%9A%84%E5%95%8F%E9%A1%8C%EF%BC%9A%0A";
        break;
      case "email":
        window.location.href = "mailto:aaron.yu@reborn.in";
        break;
    }
  };

  const fallbackMailto = `mailto:aaron.yu@reborn.in?subject=${encodeURIComponent("LUFÉ 聯絡頁完整表單")}&body=${encodeURIComponent(
    `姓名：${formState.name}\nEmail：${formState.email}\n公司名稱：${formState.company}\n電話：${formState.phone}\n產品：${formState.product}\n出海階段：${formState.stage}\n\n訊息：\n${formState.message}`,
  )}`;

  const inputClass = (name: string) =>
    `w-full bg-white px-4 py-3 border text-[15.5px] outline-none ${
      errors[name] && touched[name]
        ? "border-red-400 focus:border-red-500"
        : "border-[rgba(26,26,46,0.14)] focus:border-sky focus:shadow-[0_0_0_4px_rgba(58,107,132,0.15)]"
    }`;

  return (
    <>
      {/* ─── Hero + Channel Cards ─── */}
      <section className="bg-white pt-[120px] pb-[60px] px-5 md:px-10">
        <div className="max-w-[1000px] mx-auto">
          <h1 className="section-heading font-sans text-[clamp(34px,5vw,60px)] leading-[1.12] font-[650] [text-wrap:balance]">
            選一個你最方便的方式
          </h1>
          <p className="section-desc">
            三個管道都會收到。訊息我們通常一個工作天內回覆。
          </p>

          {/* Business info strip — gives contact page a functional anchor */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mt-8 mb-12 pb-8 border-b border-bd text-[14.5px]">
            <div>
              <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-gold-d mb-1.5">
                公司
              </div>
              <div className="font-medium text-tx">鹿飛 LUFÉ</div>
              <div className="text-tx3 text-[13px] mt-0.5">Aaron Yu 創辦</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-gold-d mb-1.5">
                地點
              </div>
              <div className="font-medium text-tx">台北市</div>
              <div className="text-tx3 text-[13px] mt-0.5">線上為主</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-gold-d mb-1.5">
                回覆時間
              </div>
              <div className="font-medium text-tx">週一 – 週五</div>
              <div className="text-tx3 text-[13px] mt-0.5">09:00 – 18:00</div>
            </div>
            <div>
              <div className="text-[11px] font-semibold tracking-[1.5px] uppercase text-gold-d mb-1.5">
                一般回覆
              </div>
              <div className="font-medium text-tx">1 個工作天內</div>
              <div className="text-tx3 text-[13px] mt-0.5">快速留言最快</div>
            </div>
          </div>

          {/* Primary channel — 快速留言 (full width) */}
          {(() => {
            const primary = channels[0];
            const c = cardColorMap[primary.color];
            return (
              <button
                onClick={() => handleChannelClick(primary.action)}
                className={`relative w-full p-6 md:p-8 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] text-left cursor-pointer hover:shadow-lg border-2 border-gold/20 hover:border-gold mb-4 flex items-start gap-6`}
              >
                <div
                  className={`w-14 h-14 ${c.iconBg} ${c.iconText} flex items-center justify-center flex-shrink-0`}
                >
                  {primary.icon}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h2 className="font-sans text-[18px] leading-[1.3] font-semibold">{primary.title}</h2>
                    <span className="text-[10px] font-semibold bg-gold text-navy px-2 py-0.5">
                      最快回覆
                    </span>
                  </div>
                  <p className="text-[14.5px] text-tx2 font-normal leading-[1.5]">
                    {primary.desc}
                  </p>
                </div>
                <span className="text-[14.5px] font-semibold text-gold-d flex-shrink-0 hidden md:block">
                  {primary.actionLabel} →
                </span>
              </button>
            );
          })()}

          {/* Secondary channels — two columns */}
          <p className="text-[13px] text-tx3 font-normal mb-3">
            或者選擇其他方式聯繫我們：
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {channels.slice(1).map((ch) => {
              const c = cardColorMap[ch.color];
              return (
                <button
                  key={ch.title}
                  onClick={() => handleChannelClick(ch.action)}
                  className={`relative p-5 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] text-left cursor-pointer hover:shadow-lg ${c.border} flex items-start gap-4`}
                >
                  <div
                    className={`w-12 h-12 ${c.iconBg} ${c.iconText} flex items-center justify-center shrink-0`}
                  >
                    {ch.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-sans text-[18px] leading-[1.3] font-semibold mb-1">{ch.title}</h3>
                    <p className="text-[13px] text-tx2 font-normal leading-[1.5]">{ch.desc}</p>
                  </div>
                  <span className="hidden md:block text-[13px] font-semibold text-gold-d shrink-0">{ch.actionLabel} →</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Partners entry ─── */}
      <section
        id="partners"
        className="relative bg-navy py-[72px] md:py-[88px] px-5 md:px-10 scroll-mt-[100px] border-t border-b border-white/5 overflow-hidden"
      >
        {/* Handshake bg — subtle, conveys partnership */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/contact/partners-handshake.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[70%_center] opacity-[0.14]"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/85 to-navy/60" />
        </div>

        {/* Gold glow */}
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 55% 45% at 15% 25%, rgba(212,168,92,0.12) 0%, transparent 70%)",
          }}
        />

        <div className="relative max-w-[900px] mx-auto">
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] leading-[1.14] font-[650] tracking-[-0.4px] [text-wrap:balance] text-white mb-5">
            商會、顧問、服務商，
            <br />
            <span className="font-[650] text-gold">歡迎來談合作</span>
          </h2>
          <p className="text-[16px] md:text-[17px] text-white/65 leading-[1.85] font-normal max-w-[640px] mb-10">
            如果你是商會、同業顧問公司、在地服務商或物流夥伴，想跟鹿飛一起幫台灣企業把海外這條路走得更順——我們有專門的合作入口。
            不收介紹費、不綁獨家，純粹看有沒有把事情做好的機會。
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-5 mb-10">
            {[
              {
                label: "商會 / 公協會",
                desc: "台商會、工商協會、進出口公會",
              },
              {
                label: "同業顧問 / 事務所",
                desc: "跨境顧問、品牌、律師、會計事務所",
              },
              {
                label: "在地服務商 / 物流",
                desc: "北美、東南亞當地倉儲、通路、代理商",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="bg-white/[0.03] border border-white/10 p-5 md:p-6"
              >
                <h3 className="font-sans text-[clamp(21px,2.2vw,26px)] leading-[1.3] font-semibold text-white mb-2">
                  {item.label}
                </h3>
                <div className="text-[13px] md:text-[13.5px] text-white/55 leading-[1.8]">
                  {item.desc}
                </div>
              </div>
            ))}
          </div>

          <a
            href="mailto:aaron.yu@reborn.in?subject=%E5%90%88%E4%BD%9C%E5%A4%A5%E4%BC%B4%E6%B4%BD%E8%AB%87"
            className="inline-flex items-center gap-2 bg-gold text-navy px-7 py-[14px] text-[15.5px] font-semibold tracking-[0.3px] hover:bg-gold-l"
          >
            <span>寄信洽談合作</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* ─── Full Form (with subtle conversation bg) ─── */}
      <section className="relative bg-cream py-[80px] px-5 md:px-10 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/contact/form-bg-conversation.jpg"
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-[0.06]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream/92 to-cream" />
        </div>
        <div className="relative max-w-[640px] mx-auto">
          <div className="section-label text-center">完整表單</div>
          <h2 className="section-heading font-sans text-[clamp(30px,4.4vw,52px)] leading-[1.14] font-[650] [text-wrap:balance] text-center">
            想一次講完所有細節？
          </h2>
          <p className="text-[15.5px] text-tx2 text-center font-normal mb-10 max-w-[480px] mx-auto">
            填這份表單，我們能在第一次回覆時就給你比較精準的建議，省下幾輪來回。
          </p>

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-[rgba(91,143,168,0.1)] flex items-center justify-center mx-auto mb-5">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M7 14L12 19L21 10"
                    stroke="#5B8FA8"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="font-sans text-[clamp(21px,2.2vw,26px)] leading-[1.3] font-semibold mb-2">收到了！</h3>
              <p className="text-[15.5px] text-tx2 font-normal leading-[1.8]">
                我們會在 <span className="text-tx font-semibold">24 小時內</span>
                用你提供的 Email 回覆你。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              {/* Row: Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-medium tracking-[1px] mb-1.5">
                    姓名 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    aria-required="true"
                    value={formState.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("name")}
                    placeholder="你的姓名"
                  />
                  {errors.name && touched.name && (
                    <p className="text-[13px] text-red-500 mt-1">{errors.name}</p>
                  )}
                </div>
                <div>
                  <label className="block text-[13px] font-medium tracking-[1px] mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    aria-required="true"
                    value={formState.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    className={inputClass("email")}
                    placeholder="you@company.com"
                  />
                  {errors.email && touched.email && (
                    <p className="text-[13px] text-red-500 mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Row: Company + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[13px] font-medium tracking-[1px] mb-1.5">
                    公司名稱
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full bg-white px-4 py-3 border border-[rgba(26,26,46,0.14)] text-[15.5px] outline-none focus:border-sky focus:shadow-[0_0_0_4px_rgba(58,107,132,0.15)]"
                    placeholder="公司名稱"
                  />
                </div>
                <div>
                  <label className="block text-[13px] font-medium tracking-[1px] mb-1.5">
                    電話
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full bg-white px-4 py-3 border border-[rgba(26,26,46,0.14)] text-[15.5px] outline-none focus:border-sky focus:shadow-[0_0_0_4px_rgba(58,107,132,0.15)]"
                    placeholder="09xx-xxx-xxx"
                  />
                </div>
              </div>

              {/* Product */}
              <div>
                <label className="block text-[13px] font-medium tracking-[1px] mb-1.5">
                  你的產品
                </label>
                <input
                  type="text"
                  name="product"
                  value={formState.product}
                  onChange={handleChange}
                  className="w-full bg-white px-4 py-3 border border-[rgba(26,26,46,0.14)] text-[15.5px] outline-none focus:border-sky focus:shadow-[0_0_0_4px_rgba(58,107,132,0.15)]"
                  placeholder="簡單描述你的產品或品牌"
                />
              </div>

              {/* Stage */}
              <div>
                <label className="block text-[13px] font-medium tracking-[1px] mb-1.5">
                  目前出海階段
                </label>
                <ChoiceGroup
                  label="目前出海階段"
                  options={stageOptions.map((option) => ({ value: option, label: option }))}
                  value={formState.stage}
                  onChange={handleStageChange}
                  className="w-auto"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-[13px] font-medium tracking-[1px] mb-1.5">
                  你想問什麼？ *
                </label>
                <textarea
                  name="message"
                  rows={4}
                  required
                  aria-required="true"
                  value={formState.message}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`${inputClass("message")} resize-none`}
                  placeholder="任何問題都可以，不確定也沒關係。"
                />
                {errors.message && touched.message && (
                  <p className="text-[13px] text-red-500 mt-1">{errors.message}</p>
                )}
              </div>

              {/* Submit */}
              <input
                type="text"
                name="website"
                value={formState.website}
                onChange={handleChange}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="absolute h-px w-px overflow-hidden opacity-0 pointer-events-none"
              />
              <button
                type="submit"
                className="w-full bg-gold text-navy py-3.5 text-[16.5px] font-semibold cursor-pointer hover:bg-gold-l"
              >
                {isSubmitting ? "送出中…" : "送出表單"}
              </button>
              {submitError && (
                <p className="text-[13px] text-red-500 text-center font-normal">
                  送出失敗，請直接寄信給我們： <a href={fallbackMailto} className="underline">aaron.yu@reborn.in</a>
                </p>
              )}
              <p className="text-[13px] text-tx3 text-center font-normal">
                我們不會把你的資料分享給任何第三方。
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
