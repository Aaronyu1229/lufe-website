import Link from "next/link";

import { isNumericValue } from "@/data/cases";

const JUMPING_STATS = [
  { value: "十幾家", label: "合作夥伴在菲律賓從零做起的手搖飲品牌，已開放加盟", href: "/cases/bubble-tea" },
  { value: "多個市場", label: "台灣羊奶皂品牌重新定位後，銷往多個海外市場", href: "/cases/goat-milk-soap-global" },
  { value: "FDA", label: "台灣魚鬆進美國，先過法規，再談上市", href: "/cases/fish-floss-us-fda" },
] as const;

export const JUMPING_COPY = {
  eyebrow: "來自躍馬企業",
  title: ["四十二年，", "看著貨櫃一個一個出去"],
  body: "躍馬企業做國際物流 42 年，500 多個出口案件，30 多個國家。\n在躍馬看的不是報表，是貨櫃出去以後的事：\n有的品牌在當地開了第二家店；\n更多的，是幾個月後貨退回來，或者就沒有下文了。\n\n貨都有送到。差別在到了之後，有沒有人接。\n鹿飛就是從這個觀察長出來的。",
} as const;

export function JumpingSection() {
  return (
    <section id="jumping" className="bg-navy py-[80px] text-white md:py-[104px]">
      <div className="lufe-container grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
        <div>
          <p className="mb-4 text-[13px] font-semibold text-gold">{JUMPING_COPY.eyebrow}</p>
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal [text-wrap:balance]">
            {JUMPING_COPY.title[0]}
            <br />
            <span className="text-gold">{JUMPING_COPY.title[1]}</span>
          </h2>
          <p className="mt-6 max-w-[660px] whitespace-pre-line text-[16px] leading-[1.9] text-white/70 md:text-[17px]">{JUMPING_COPY.body}</p>
        </div>
        <div className="self-end">
          <p className="mb-4 text-[13px] font-semibold text-white/55">鹿飛案例成果</p>
          <div className="grid grid-cols-3 gap-4 border-y border-white/15 pb-2 pt-6 md:gap-7">
            {JUMPING_STATS.map(({ value, label, href }) => (
              <Link key={label} href={href} className="group block active:scale-[.985]">
                {isNumericValue(value) ? (
                  <strong data-lufe-counter className="block font-sans text-[clamp(30px,4vw,44px)] font-semibold leading-none tracking-[-.035em] text-gold">{value}</strong>
                ) : (
                  <strong className="block font-sans text-[clamp(26px,3.2vw,36px)] font-[650] leading-[1.15] tracking-[-.02em] text-gold">{value}</strong>
                )}
                <span className="mt-3 block text-[11px] leading-[1.5] text-white/65 transition-colors duration-200 [@media(hover:hover)]:group-hover:text-white/85 md:text-[12px]">{label}</span>
              </Link>
            ))}
          </div>
          <div className="mt-8 border-l-2 border-gold pl-5">
            <h3 className="font-sans text-[21px] font-semibold leading-[1.3] text-white">我們相信的事很簡單</h3>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-[1.85] text-white/70">台灣市場不夠大，這件事做生意的人都知道。{"\n"}出去有難度，但出得去。{"\n"}我們想做的，是讓第一步小到你敢踏，{"\n"}後面的每一步，都有人在。</p>
          </div>
        </div>
      </div>
    </section>
  );
}
