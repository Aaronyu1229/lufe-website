"use client";

import { useState } from "react";

import { chapterPageEn } from "@/i18n/en/chapter-page";
import { type Locale } from "@/i18n/locale";
import { chapterPageZh } from "@/i18n/zh/chapter-page";

type MonthlyVolume = "<100" | "100～500" | "500 以上" | "under-100" | "100-500" | "500-or-more" | "";

type WaitlistFields = {
  name: string;
  email: string;
  monthlyVolume: MonthlyVolume;
  currentHandler: string;
  website: string;
};

const initialFields: WaitlistFields = {
  name: "",
  email: "",
  monthlyVolume: "",
  currentHandler: "",
  website: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const englishVolumeToSubmittedValue: Partial<Record<MonthlyVolume, string>> = {
  "under-100": "<100",
  "100-500": "100～500",
  "500-or-more": "500 以上",
};

export function WaitlistForm({ locale = "zh" }: { readonly locale?: Locale }) {
  const copy = locale === "en" ? chapterPageEn : chapterPageZh;
  const monthlyVolumeOptions = locale === "en"
    ? [
        { value: "under-100" as const, label: copy.waitlist.volumeOptions[0]! },
        { value: "100-500" as const, label: copy.waitlist.volumeOptions[1]! },
        { value: "500-or-more" as const, label: copy.waitlist.volumeOptions[2]! },
      ]
    : [
        { value: "<100" as const, label: copy.waitlist.volumeOptions[0]! },
        { value: "100～500" as const, label: copy.waitlist.volumeOptions[1]! },
        { value: "500 以上" as const, label: copy.waitlist.volumeOptions[2]! },
      ];
  const [fields, setFields] = useState(initialFields);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const validate = (values = fields) => {
    const next: Record<string, string> = {};
    if (!values.name.trim()) next.name = "請填寫品牌名稱";
    if (!values.email.trim()) next.email = "請填寫 Email";
    else if (!emailPattern.test(values.email)) next.email = "Email 格式不正確";
    if (!values.monthlyVolume) next.monthlyVolume = "請選擇每月客訊量";
    if (values.currentHandler.length > 100) next.currentHandler = "現在誰在接不可超過 100 字";
    return next;
  };

  const update = <Key extends keyof WaitlistFields>(key: Key, value: WaitlistFields[Key]) => {
    const next = { ...fields, [key]: value };
    setFields(next);
    setSubmitError(false);
    if (errors[key]) {
      const nextErrors = validate(next);
      setErrors((current) => ({ ...current, [key]: nextErrors[key] ?? "" }));
    }
  };

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSubmitError(false);
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "waitlist",
          ...fields,
          monthlyVolume: locale === "en" ? englishVolumeToSubmittedValue[fields.monthlyVolume] ?? "" : fields.monthlyVolume,
          page: window.location.pathname,
        }),
      });
      const result = await response.json().catch(() => null) as {
        ok?: boolean;
        errors?: Record<string, string>;
      } | null;

      if (response.ok && result?.ok) {
        setSubmitted(true);
      } else {
        setErrors(result?.errors ?? {});
        setSubmitError(true);
      }
    } catch {
      setSubmitError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submittedVolume = locale === "en" ? englishVolumeToSubmittedValue[fields.monthlyVolume] ?? "" : fields.monthlyVolume;
  const fallbackMailto = `mailto:aaron.yu@reborn.in?subject=${encodeURIComponent("LUFÉ 海外客服首批登記")}&body=${encodeURIComponent(
    `品牌名稱：${fields.name}\nEmail：${fields.email}\n每月客訊：${submittedVolume}\n現在誰在接：${fields.currentHandler}`,
  )}`;

  const inputClass = (name: string) =>
    `w-full border bg-white px-4 py-3 text-[15px] outline-none ${
      errors[name] ? "border-red-400 focus:border-red-500" : "border-bd focus:border-sky"
    }`;

  if (submitted) {
    return (
      <div className="py-8 text-center">
        <h3 className="h3 mb-2 text-tx">{copy.waitlist.submittedTitle}</h3>
        <p className="text-[15px] leading-[1.8] text-tx2">{copy.waitlist.submittedBody}</p>
      </div>
    );
  }

  return (
    <form noValidate onSubmit={submit} className="space-y-4">
      <div>
        <label htmlFor="waitlist-name" className="mb-1.5 block text-[13px] font-medium text-tx">{copy.waitlist.brandLabel}</label>
        <input id="waitlist-name" name="name" required aria-required="true" value={fields.name} onChange={(event) => update("name", event.target.value)} className={inputClass("name")} placeholder={copy.waitlist.brandPlaceholder} />
        {errors.name ? <p className="mt-1 text-[13px] text-red-500">{errors.name}</p> : null}
      </div>
      <div>
        <label htmlFor="waitlist-email" className="mb-1.5 block text-[13px] font-medium text-tx">{copy.waitlist.emailLabel}</label>
        <input id="waitlist-email" name="email" type="email" required aria-required="true" value={fields.email} onChange={(event) => update("email", event.target.value)} className={inputClass("email")} placeholder="you@brand.com" />
        {errors.email ? <p className="mt-1 text-[13px] text-red-500">{errors.email}</p> : null}
      </div>
      <fieldset>
        <legend className="mb-2 text-[13px] font-medium text-tx">{copy.waitlist.volumeLabel}</legend>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {monthlyVolumeOptions.map((option) => (
            <label key={option.value} className={`cursor-pointer border px-3 py-2.5 text-center text-[14px] ${fields.monthlyVolume === option.value ? "border-navy bg-navy text-white" : "border-bd bg-white text-tx2"}`}>
              <input type="radio" name="monthlyVolume" value={option.value} checked={fields.monthlyVolume === option.value} onChange={() => update("monthlyVolume", option.value)} className="sr-only" />
              {option.label}
            </label>
          ))}
        </div>
        {errors.monthlyVolume ? <p className="mt-1 text-[13px] text-red-500">{errors.monthlyVolume}</p> : null}
      </fieldset>
      <div>
        <label htmlFor="waitlist-current-handler" className="mb-1.5 block text-[13px] font-medium text-tx">{copy.waitlist.handlerLabel}</label>
        <input id="waitlist-current-handler" name="currentHandler" maxLength={100} value={fields.currentHandler} onChange={(event) => update("currentHandler", event.target.value)} className={inputClass("currentHandler")} placeholder={copy.waitlist.handlerPlaceholder} />
        {errors.currentHandler ? <p className="mt-1 text-[13px] text-red-500">{errors.currentHandler}</p> : null}
      </div>
      <input type="text" name="website" value={fields.website} onChange={(event) => update("website", event.target.value)} autoComplete="off" tabIndex={-1} aria-hidden="true" className="pointer-events-none absolute h-px w-px overflow-hidden opacity-0" />
      <button type="submit" disabled={isSubmitting} className="w-full cursor-pointer bg-gold py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l disabled:cursor-not-allowed disabled:opacity-50">
        {isSubmitting ? copy.waitlist.submitting : copy.waitlist.submit}
      </button>
      {submitError ? <p className="text-center text-[13px] text-red-500">送出失敗，請直接寄信給我們： <a href={fallbackMailto} className="underline">aaron.yu@reborn.in</a></p> : null}
    </form>
  );
}
