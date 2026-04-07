"use client";

import { useState } from "react";
import { useMessageBox } from "../MessageBox";

/* ───────── channel cards ───────── */

const channels = [
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="3" y="5" width="22" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
        <path d="M3 8L14 15L25 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "快速留言",
    desc: "直接寫訊息給我們，通常一個工作天內回覆。",
    action: "open-message" as const,
    actionLabel: "開啟訊息框",
    color: "gold",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <rect x="4" y="4" width="20" height="20" rx="4" stroke="currentColor" strokeWidth="1.5" />
        <path d="M4 10H24" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="10" cy="16" r="2" stroke="currentColor" strokeWidth="1" />
        <circle cx="18" cy="16" r="2" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
    title: "預約諮詢",
    desc: "選一個你方便的時間，30 分鐘免費聊聊。",
    action: "calendly" as const,
    actionLabel: "選時間",
    color: "sky",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M14 4C8.48 4 4 8.04 4 13C4 15.87 5.67 18.37 8.2 19.85L7.5 24L12.1 21.7C12.72 21.8 13.35 21.86 14 21.86C19.52 21.86 24 17.82 24 12.86C24 8.04 19.52 4 14 4Z" stroke="#06C755" strokeWidth="1.5" strokeLinejoin="round" />
      </svg>
    ),
    title: "LINE 聊天",
    desc: "加入我們的 LINE 官方帳號，隨時對話。",
    action: "line" as const,
    actionLabel: "加好友",
    color: "line",
  },
  {
    icon: (
      <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
        <path d="M6 8L14 14L22 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="4" y="6" width="20" height="16" rx="3" stroke="currentColor" strokeWidth="1.5" />
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
  gold: { border: "hover:border-gold", iconBg: "bg-[rgba(212,168,92,0.08)]", iconText: "text-gold" },
  sky: { border: "hover:border-sky", iconBg: "bg-[rgba(91,143,168,0.08)]", iconText: "text-sky" },
  line: { border: "hover:border-[#06C755]", iconBg: "bg-[rgba(6,199,85,0.08)]", iconText: "text-[#06C755]" },
  ember: { border: "hover:border-ember", iconBg: "bg-[rgba(217,139,74,0.08)]", iconText: "text-ember" },
};

const stageOptions = [
  "還在觀望，想了解出海",
  "準備出海，需要方向",
  "已經在出海，想做更好",
  "其他",
];

/* ───────── component ───────── */

export function ContactPage() {
  const { open } = useMessageBox();
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    product: "",
    stage: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleChannelClick = (action: string) => {
    switch (action) {
      case "open-message":
        open();
        break;
      case "calendly":
        window.open("https://calendly.com", "_blank");
        break;
      case "line":
        window.open("https://line.me", "_blank");
        break;
      case "email":
        window.location.href = "mailto:hello@lufe.co";
        break;
    }
  };

  return (
    <>
      {/* ─── Hero + Channel Cards ─── */}
      <section className="bg-[#FAFAF8] pt-[120px] pb-[60px] px-5 md:px-10">
        <div className="max-w-[1000px] mx-auto">
          <div className="section-label">聯絡</div>
          <h1 className="section-heading">
            選一個你最方便的方式
            <br />
            <span className="font-bold text-gold">我們來聊聊</span>
          </h1>
          <p className="section-desc">
            不確定該不該出海？沒關係。聊聊你的產品，我們一起看看。
          </p>

          {/* 4 channel cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {channels.map((ch) => {
              const c = cardColorMap[ch.color];
              return (
                <button
                  key={ch.title}
                  onClick={() => handleChannelClick(ch.action)}
                  className={`p-5 bg-white rounded-none border border-bd text-left cursor-pointer transition-colors ${c.border}`}
                >
                  <div
                    className={`w-12 h-12 rounded-none ${c.iconBg} ${c.iconText} flex items-center justify-center mb-3`}
                  >
                    {ch.icon}
                  </div>
                  <h3 className="text-[15px] font-semibold mb-1">{ch.title}</h3>
                  <p className="text-[12px] text-tx2 font-normal leading-[1.5] mb-3">
                    {ch.desc}
                  </p>
                  <span className="text-[12px] font-semibold text-gold">
                    {ch.actionLabel} →
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─── Full Form ─── */}
      <section className="bg-white py-[80px] px-5 md:px-10">
        <div className="max-w-[640px] mx-auto">
          <h2 className="section-heading text-center">
            或者，填寫完整表單
          </h2>
          <p className="text-[14px] text-tx2 text-center font-normal mb-10">
            讓我們更了解你的需求，給你更精準的建議。
          </p>

          {submitted ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 rounded-full bg-[rgba(91,143,168,0.1)] flex items-center justify-center mx-auto mb-5">
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
              <h3 className="text-[20px] font-semibold mb-2">收到了！</h3>
              <p className="text-[14px] text-tx2 font-normal leading-[1.7]">
                我們會在一個工作天內回覆你。
                <br />
                如果比較急，可以直接加我們的{" "}
                <a
                  href="https://line.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#06C755] font-medium"
                >
                  LINE
                </a>{" "}
                聊。
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Row: Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[12px] font-medium tracking-[1px] mb-1.5">
                    姓名 *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formState.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-bd rounded-none text-[14px] outline-none focus:border-gold transition-colors"
                    placeholder="你的姓名"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium tracking-[1px] mb-1.5">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-bd rounded-none text-[14px] outline-none focus:border-gold transition-colors"
                    placeholder="you@company.com"
                  />
                </div>
              </div>

              {/* Row: Company + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-[12px] font-medium tracking-[1px] mb-1.5">
                    公司名稱
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formState.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-bd rounded-none text-[14px] outline-none focus:border-gold transition-colors"
                    placeholder="公司名稱"
                  />
                </div>
                <div>
                  <label className="block text-[12px] font-medium tracking-[1px] mb-1.5">
                    電話
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formState.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-bd rounded-none text-[14px] outline-none focus:border-gold transition-colors"
                    placeholder="09xx-xxx-xxx"
                  />
                </div>
              </div>

              {/* Product */}
              <div>
                <label className="block text-[12px] font-medium tracking-[1px] mb-1.5">
                  你的產品
                </label>
                <input
                  type="text"
                  name="product"
                  value={formState.product}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-bd rounded-none text-[14px] outline-none focus:border-gold transition-colors"
                  placeholder="簡單描述你的產品或品牌"
                />
              </div>

              {/* Stage */}
              <div>
                <label className="block text-[12px] font-medium tracking-[1px] mb-1.5">
                  目前出海階段
                </label>
                <select
                  name="stage"
                  value={formState.stage}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-bd rounded-none text-[14px] outline-none focus:border-gold transition-colors bg-white appearance-none"
                >
                  <option value="">請選擇</option>
                  {stageOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="block text-[12px] font-medium tracking-[1px] mb-1.5">
                  你想問什麼？ *
                </label>
                <textarea
                  name="message"
                  required
                  rows={4}
                  value={formState.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-bd rounded-none text-[14px] outline-none focus:border-gold transition-colors resize-none"
                  placeholder="任何問題都可以，不確定也沒關係。"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full bg-gold text-navy py-3.5 rounded-none text-[15px] font-semibold cursor-pointer transition-colors hover:border-gold"
              >
                送出表單
              </button>
              <p className="text-[12px] text-tx3 text-center font-normal">
                我們不會把你的資料分享給任何第三方。
              </p>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
