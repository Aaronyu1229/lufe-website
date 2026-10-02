import Link from "next/link";

import { isNumericValue } from "@/data/cases";

const JUMPING_STATS = [
  { value: "10", label: "家馬尼拉門市，一年內開出", href: "/cases/bubble-tea" },
  { value: "多個市場", label: "羊奶皂品牌調整後，銷往多個海外市場", href: "/cases/goat-milk-soap-global" },
  { value: "FDA", label: "魚鬆進美國，先過法規再談包裝", href: "/cases/fish-floss-us-fda" },
] as const;

export const JUMPING_COPY = {
  title: ["一家企業出海的", "後半段旅程"],
  body: "企業出海的前半段，是把產品送到海外——\n訂單、報關、運輸，多數企業都走得過去。\n\n後半段，才是真正的考驗：\n產品要被當地市場接受，通路要談得下來，\n證照、團隊與客服，要有人在當地接住。\n\n多數企業的出海，不是輸在運輸，\n而是輸在抵達之後沒有人接手。\n\n鹿飛，是為了這後半段旅程而成立的",
} as const;

export function JumpingSection() {
  return (
    <section id="jumping" className="bg-navy py-[80px] text-white md:py-[104px]">
      <div className="lufe-container grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
        <div>
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
            <h3 className="font-sans text-[21px] font-semibold leading-[1.3] text-white">鹿飛相信的事很簡單</h3>
            <p className="mt-3 whitespace-pre-line text-[15px] leading-[1.85] text-white/70">台灣市場不夠大，這件事做生意的人都知道。{"\n"}出去有難度，但出得去。{"\n"}鹿飛想做的，是讓第一步小到企業敢踏，{"\n"}後面的每一步，都有人在</p>
          </div>
        </div>
      </div>
    </section>
  );
}
