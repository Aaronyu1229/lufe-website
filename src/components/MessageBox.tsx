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
  const [form, setForm] = useState({ name: "", contact: "", message: "" });

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleClose = () => {
    close();
    setTimeout(() => {
      setSubmitted(false);
      setForm({ name: "", contact: "", message: "" });
    }, 300);
  };

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
            <h3 className="text-[14.5px] font-medium">聊聊你的產品</h3>
            <button
              onClick={handleClose}
              className="text-white/50 text-[17px] cursor-pointer hover:text-white/80 transition-colors"
            >
              ×
            </button>
          </div>

          {/* Form */}
          {!submitted ? (
            <div className="p-5">
              <div className="mb-3">
                <label className="block text-[11.5px] font-semibold text-tx mb-[5px]">
                  你的姓名
                </label>
                <input
                  className="w-full px-[13px] py-2.5 border border-bd rounded-[9px] text-[13.5px] focus:outline-none focus:border-gold"
                  placeholder="怎麼稱呼你？"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
              </div>
              <div className="mb-3">
                <label className="block text-[11.5px] font-semibold text-tx mb-[5px]">
                  聯絡方式（Email 或電話）
                </label>
                <input
                  className="w-full px-[13px] py-2.5 border border-bd rounded-[9px] text-[13.5px] focus:outline-none focus:border-gold"
                  placeholder="方便我們回覆你"
                  value={form.contact}
                  onChange={(e) =>
                    setForm({ ...form, contact: e.target.value })
                  }
                />
              </div>
              <div className="mb-3">
                <label className="block text-[11.5px] font-semibold text-tx mb-[5px]">
                  簡單說說你的產品跟想法
                </label>
                <textarea
                  className="w-full px-[13px] py-2.5 border border-bd rounded-[9px] text-[13.5px] focus:outline-none focus:border-gold resize-y min-h-[68px]"
                  placeholder="例如：我們做鳳梨酥，想看看美國有沒有機會⋯⋯"
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                />
              </div>
              <button
                onClick={handleSubmit}
                className="w-full py-3 bg-navy text-white rounded-[9px] text-[13.5px] font-semibold cursor-pointer hover:bg-navy-l transition-colors"
              >
                送出，我們 24 小時內回覆
              </button>
            </div>
          ) : (
            <div className="px-5 py-8 text-center">
              <h3 className="text-[16px] font-semibold mb-1.5">收到了！</h3>
              <p className="text-[13px] text-tx2 font-light mb-4">
                我們會在 24 小時內回覆你。
                <br />
                想更快得到回覆？
              </p>
              <a
                href="https://line.me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-[18px] py-[9px] bg-[#06C755] text-white rounded-full text-[13px] font-medium"
              >
                加我們 LINE 聊聊
              </a>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
