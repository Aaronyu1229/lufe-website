"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface MessageBoxContextValue {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

const MessageBoxContext = createContext<MessageBoxContextValue>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export function useMessageBox() {
  return useContext(MessageBoxContext);
}

export function MessageBoxProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <MessageBoxContext.Provider value={{ isOpen, open, close }}>
      {children}
    </MessageBoxContext.Provider>
  );
}

export function MessageBox() {
  const { isOpen, close } = useMessageBox();
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", contact: "", message: "", website: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);

  const handleSubmit = async () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "請填姓名";
    if (!form.contact.trim()) errs.contact = "請留 Email 或電話";
    if (!form.message.trim()) errs.message = "請簡單說明一下";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitError(false);
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          form: "quick",
          ...form,
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

  const handleClose = () => {
    close();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", contact: "", message: "", website: "" });
      setSubmitError(false);
    }, 300);
  };

  const fallbackMailto = `mailto:aaron.yu@reborn.in?subject=${encodeURIComponent("LUFÉ 快速留言")}&body=${encodeURIComponent(
    `姓名：${form.name}\n聯絡方式：${form.contact}\n\n訊息：\n${form.message}`,
  )}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 14 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-[18px] right-[18px] z-200 w-[360px] max-w-[calc(100%-28px)] bg-white rounded-2xl shadow-[0_14px_50px_rgba(0,0,0,0.14)] overflow-hidden"
        >
          {/* Header */}
          <div className="px-5 py-4 bg-navy text-white flex justify-between items-center">
            <h3 className="text-[16px] font-medium">聊聊你的產品</h3>
            <button
              onClick={handleClose}
              className="text-white/50 text-[18px] cursor-pointer hover:text-white/80 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Form */}
          {!submitted ? (
            <div className="p-5">
              <div className="mb-3">
                <label className="block text-[11.5px] font-semibold text-tx mb-[5px]">
                  你的姓名 *
                </label>
                <input
                  required
                  aria-required="true"
                  className={`w-full px-[13px] py-2.5 border rounded-[9px] text-[15px] focus:outline-none focus:border-gold ${errors.name ? "border-red-400" : "border-bd"}`}
                  placeholder="怎麼稱呼你？"
                  value={form.name}
                  onChange={(e) => {
                    setForm({ ...form, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: "" });
                    setSubmitError(false);
                  }}
                />
                {errors.name && <p className="text-[12px] text-red-500 mt-1">{errors.name}</p>}
              </div>
              <div className="mb-3">
                <label className="block text-[11.5px] font-semibold text-tx mb-[5px]">
                  聯絡方式（Email 或電話）*
                </label>
                <input
                  required
                  aria-required="true"
                  className={`w-full px-[13px] py-2.5 border rounded-[9px] text-[15px] focus:outline-none focus:border-gold ${errors.contact ? "border-red-400" : "border-bd"}`}
                  placeholder="方便我們回覆你"
                  value={form.contact}
                  onChange={(e) => {
                    setForm({ ...form, contact: e.target.value });
                    if (errors.contact) setErrors({ ...errors, contact: "" });
                    setSubmitError(false);
                  }}
                />
                {errors.contact && <p className="text-[12px] text-red-500 mt-1">{errors.contact}</p>}
              </div>
              <div className="mb-3">
                <label className="block text-[11.5px] font-semibold text-tx mb-[5px]">
                  簡單說說你的產品跟想法 *
                </label>
                <textarea
                  required
                  aria-required="true"
                  className={`w-full px-[13px] py-2.5 border rounded-[9px] text-[15px] focus:outline-none focus:border-gold resize-y min-h-[68px] ${errors.message ? "border-red-400" : "border-bd"}`}
                  placeholder="例如：我們做鳳梨酥，想看看美國有沒有機會⋯⋯"
                  value={form.message}
                  onChange={(e) => {
                    setForm({ ...form, message: e.target.value });
                    if (errors.message) setErrors({ ...errors, message: "" });
                    setSubmitError(false);
                  }}
                />
                {errors.message && <p className="text-[12px] text-red-500 mt-1">{errors.message}</p>}
              </div>
              <input
                type="text"
                name="website"
                value={form.website}
                onChange={(e) => setForm({ ...form, website: e.target.value })}
                autoComplete="off"
                tabIndex={-1}
                aria-hidden="true"
                className="absolute h-px w-px overflow-hidden opacity-0 pointer-events-none"
              />
              {submitError && (
                <p className="text-[12px] text-red-500 mb-3">
                  送出失敗，請直接寄信給我們： <a href={fallbackMailto} className="underline">aaron.yu@reborn.in</a>
                </p>
              )}
              <button
                type="button"
                onClick={() => void handleSubmit()}
                disabled={isSubmitting}
                className="w-full py-3 bg-navy text-white rounded-[9px] text-[15px] font-semibold cursor-pointer hover:bg-navy-l transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "送出中…" : "送出，我們 24 小時內回覆"}
              </button>
            </div>
          ) : (
            <div className="px-5 py-8 text-center">
              <h3 className="text-[17px] font-semibold mb-1.5">收到了！</h3>
              <p className="text-[14.5px] text-tx2 font-light mb-4">
                我們會在 24 小時內回覆你。
              </p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
