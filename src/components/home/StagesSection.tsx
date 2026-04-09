"use client";

import Link from "next/link";

const stages = [
  {
    title: "還不確定\n能不能出海",
    desc: "不知道成本、不懂合規、不確定有沒有市場。你需要一個清楚的答案。",
    link: { label: "兩分鐘測一下", href: "/assess" },
    color: "sky",
    icon: (
      <svg className="w-14 h-14 transition-transform duration-400 group-hover:scale-110" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="27" fill="none" stroke="#5B8FA8" strokeWidth="1" opacity="0.3" />
        <circle cx="28" cy="20" r="3" fill="#5B8FA8" opacity="0.6" />
        <path d="M18,38 Q28,26 38,38" stroke="#5B8FA8" strokeWidth="1.5" fill="none" opacity="0.5" />
        <circle cx="28" cy="28" r="8" fill="none" stroke="#5B8FA8" strokeWidth="1.5" />
        <circle cx="28" cy="28" r="2" fill="#5B8FA8" />
        <path d="M28,20 L28,28" stroke="#5B8FA8" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "準備出海\n需要方向",
    desc: "知道想出去，但不知道該先做什麼。你需要一條清楚的路徑。",
    link: { label: "看完整出海路徑", href: "/services" },
    color: "gold",
    icon: (
      <svg className="w-14 h-14 transition-transform duration-400 group-hover:scale-110" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="27" fill="none" stroke="#D4A85C" strokeWidth="1" opacity="0.3" />
        <path d="M16,36 L24,28 L32,32 L42,18" stroke="#D4A85C" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="42" cy="18" r="3" fill="#D4A85C" />
        <path d="M14,42 L44,42" stroke="#D4A85C" strokeWidth="1" opacity="0.3" />
      </svg>
    ),
  },
  {
    title: "已經出海\n想做更好",
    desc: "貨已經在動，但成本太高、效率太低。你需要優化。",
    link: { label: "看進階優化方案", href: "/services#optimize" },
    color: "ember",
    icon: (
      <svg className="w-14 h-14 transition-transform duration-400 group-hover:scale-110" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r="27" fill="none" stroke="#D98B4A" strokeWidth="1" opacity="0.3" />
        <path d="M14,32 Q22,16 30,28 Q38,40 46,24" stroke="#D98B4A" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d="M40,20 L46,24 L42,30" stroke="#D98B4A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
];

const colorMap: Record<string, { hover: string; link: string; dot: string }> = {
  sky: { hover: "hover:border-sky", link: "text-sky", dot: "bg-sky" },
  gold: { hover: "hover:border-gold", link: "text-gold", dot: "bg-gold" },
  ember: { hover: "hover:border-ember", link: "text-ember", dot: "bg-ember" },
};

export function StagesSection() {
  return (
    <section className="py-[60px] md:py-[80px] px-5 md:px-10 bg-white">
      <div className="max-w-[1400px] mx-auto">
        <div className="text-[11.5px] font-semibold tracking-[2px] uppercase text-gold/60 mb-3">
          你的出海階段
        </div>
        <div className="flex items-center gap-6 mb-3">
          <h2 className="font-sans text-[clamp(28px,3.5vw,44px)] leading-[1.15] font-light tracking-[-0.5px] md:whitespace-nowrap">
            每條出海路的起點都不一樣
          </h2>
          <div className="hidden md:block flex-1 h-px bg-bd" />
        </div>
        <p className="text-[15px] text-tx2 max-w-[480px] leading-[1.7] mb-11 font-normal">
          找到你現在的位置，我們告訴你下一步。
        </p>

        {/* Connector line */}
        <div className="flex items-center justify-center mb-3 relative h-[3px]">
          <div className="absolute top-1/2 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-sky via-gold to-ember opacity-20 rounded" />
          <div className="flex justify-around w-4/5 relative z-1">
            {stages.map((s) => (
              <div
                key={s.color}
                className={`w-2.5 h-2.5 rounded-full ${colorMap[s.color].dot}`}
              />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
          {stages.map((stage) => {
            const colors = colorMap[stage.color];
            return (
              <Link
                key={stage.color}
                href={stage.link.href}
                className={`group p-[30px] rounded-none bg-white transition-all duration-400 cursor-pointer relative overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-lg hover:-translate-y-1 ${colors.hover}`}
              >
                <div className="mb-[18px]">{stage.icon}</div>
                <h3 className="text-[16px] font-semibold mb-2 leading-[1.3] whitespace-pre-line">
                  {stage.title}
                </h3>
                <p className="text-[13.5px] text-tx2 leading-[1.65] mb-[18px] font-normal">
                  {stage.desc}
                </p>
                <span
                  className={`text-[13px] font-semibold inline-flex items-center gap-[5px] transition-[gap] duration-300 group-hover:gap-2.5 ${colors.link}`}
                >
                  {stage.link.label} →
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
