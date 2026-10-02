"use client";

import { useState } from "react";
import Link from "next/link";

import { HeroBackdrop } from "@/components/HeroBackdrop";
import { ScrollCue } from "@/components/ScrollCue";
import { CalendarClockIcon, MailIcon, MapPinIcon, MessageIcon } from "@/components/icons/LineIcons";
import { ChoiceGroup } from "@/components/ui/ChoiceGroup";
import { HERO_VIDEOS } from "@/data/heroVideos";


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

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function ContactPage() {
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
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const next = { ...formState, [e.target.name]: e.target.value };
    setFormState(next);
    setSubmitError(false);
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
      <section className="lufe-hero bg-navy text-white">
        <HeroBackdrop src="/images/contact/hero-handshake-1600.webp" video={HERO_VIDEOS.contact} />
        <div className="lufe-container lufe-hero-content min-w-0 pb-[78px] pt-[148px] md:pb-[112px] md:pt-[170px]">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-white/60">
            <Link href="/" className="hover:text-white">首頁</Link>
            <span aria-hidden="true" className="text-white/30">/</span>
            <span className="text-white/75">聯絡鹿飛</span>
          </nav>
          <h1 className="h1 mb-6 max-w-[880px] text-white">聯絡鹿飛</h1>
          <p className="lead max-w-[640px] !text-white/75">出海規劃、合作洽談或媒體邀約，留下訊息，一個工作天內回覆</p>
        </div>
        <ScrollCue />
      </section>

      <section className="bg-white py-[72px] md:py-[96px]">
        <div className="lufe-container grid gap-12 lg:grid-cols-[5fr_7fr] lg:gap-16">
          <aside className="min-w-0">
            <dl>
              <div className="grid grid-cols-[24px_1fr] gap-4 border-t border-bd py-5">
                <MailIcon size={20} className="mt-1 text-gold-d" />
                <div><dt className="text-[13px] text-tx3">Email</dt><dd className="mt-1 text-[16px] text-tx"><a href="mailto:aaron.yu@reborn.in" className="hover:text-sky">aaron.yu@reborn.in</a></dd></div>
              </div>
              <div className="grid grid-cols-[24px_1fr] gap-4 border-t border-bd py-5">
                <MapPinIcon size={20} className="mt-1 text-gold-d" />
                <div><dt className="text-[13px] text-tx3">地點</dt><dd className="mt-1 text-[16px] text-tx">台北市｜線上會議為主</dd></div>
              </div>
              <div className="grid grid-cols-[24px_1fr] gap-4 border-t border-bd py-5">
                <CalendarClockIcon size={20} className="mt-1 text-gold-d" />
                <div><dt className="text-[13px] text-tx3">服務時間</dt><dd className="mt-1 text-[16px] text-tx">週一至週五 09:00–18:00</dd></div>
              </div>
              <div className="grid grid-cols-[24px_1fr] gap-4 border-y border-bd py-5">
                <MessageIcon size={20} className="mt-1 text-gold-d" />
                <div><dt className="text-[13px] text-tx3">回覆時間</dt><dd className="mt-1 text-[16px] text-tx">一個工作天內</dd></div>
              </div>
            </dl>
          </aside>

          <section className="min-w-0 bg-cream p-6 md:p-10">
            <h2 className="h3">留下你的需求</h2>
            <p className="mb-8 mt-3 text-[15px] text-tx2">資訊越完整，第一次回覆越精準</p>
            {submitted ? (
              <div className="py-12 text-center">
                <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center border border-sky text-sky">
                  <svg width="28" height="28" viewBox="0 0 28 28" fill="none"><path d="M7 14L12 19L21 10" stroke="currentColor" className="text-sky" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </div>
                <h3 className="h3 mb-2">收到了！</h3>
                <p className="text-[15.5px] leading-[1.8] text-tx2">我們會在 <span className="font-semibold text-tx">24 小時內</span>用你提供的 Email 回覆你。</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium tracking-[1px]">姓名 *</label>
                    <input type="text" name="name" required aria-required="true" value={formState.name} onChange={handleChange} onBlur={handleBlur} className={inputClass("name")} placeholder="你的姓名" />
                    {errors.name && touched.name && <p className="mt-1 text-[13px] text-red-500">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium tracking-[1px]">Email *</label>
                    <input type="email" name="email" required aria-required="true" value={formState.email} onChange={handleChange} onBlur={handleBlur} className={inputClass("email")} placeholder="you@company.com" />
                    {errors.email && touched.email && <p className="mt-1 text-[13px] text-red-500">{errors.email}</p>}
                  </div>
                </div>
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium tracking-[1px]">公司名稱</label>
                    <input type="text" name="company" value={formState.company} onChange={handleChange} className="w-full border border-[rgba(26,26,46,0.14)] bg-white px-4 py-3 text-[15.5px] outline-none focus:border-sky focus:shadow-[0_0_0_4px_rgba(58,107,132,0.15)]" placeholder="公司名稱" />
                  </div>
                  <div>
                    <label className="mb-1.5 block text-[13px] font-medium tracking-[1px]">電話</label>
                    <input type="tel" name="phone" value={formState.phone} onChange={handleChange} className="w-full border border-[rgba(26,26,46,0.14)] bg-white px-4 py-3 text-[15.5px] outline-none focus:border-sky focus:shadow-[0_0_0_4px_rgba(58,107,132,0.15)]" placeholder="09xx-xxx-xxx" />
                  </div>
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium tracking-[1px]">你的產品</label>
                  <input type="text" name="product" value={formState.product} onChange={handleChange} className="w-full border border-[rgba(26,26,46,0.14)] bg-white px-4 py-3 text-[15.5px] outline-none focus:border-sky focus:shadow-[0_0_0_4px_rgba(58,107,132,0.15)]" placeholder="簡單描述你的產品或品牌" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium tracking-[1px]">目前出海階段</label>
                  <ChoiceGroup label="目前出海階段" options={stageOptions.map((option) => ({ value: option, label: option }))} value={formState.stage} onChange={handleStageChange} className="w-auto" />
                </div>
                <div>
                  <label className="mb-1.5 block text-[13px] font-medium tracking-[1px]">你想問什麼？ *</label>
                  <textarea name="message" rows={4} required aria-required="true" value={formState.message} onChange={handleChange} onBlur={handleBlur} className={`${inputClass("message")} resize-none`} placeholder="任何問題都可以，不確定也沒關係" />
                  {errors.message && touched.message && <p className="mt-1 text-[13px] text-red-500">{errors.message}</p>}
                </div>
                <input type="text" name="website" value={formState.website} onChange={handleChange} autoComplete="off" tabIndex={-1} aria-hidden="true" className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" />
                <button type="submit" className="w-full cursor-pointer bg-gold py-3.5 text-[16.5px] font-semibold text-navy active:scale-[.97]">{isSubmitting ? "送出中…" : "送出表單"}</button>
                {submitError && <p className="text-center text-[13px] font-normal text-red-500">送出失敗，請直接寄信給我們： <a href={fallbackMailto} className="underline">aaron.yu@reborn.in</a></p>}
                <p className="text-center text-[13px] font-normal text-tx3">我們不會把你的資料分享給任何第三方。</p>
              </form>
            )}
          </section>
        </div>
      </section>
    </>
  );
}
