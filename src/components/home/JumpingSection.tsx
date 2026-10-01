const JUMPING_STATS = [
  ["42+", "躍馬企業 · 年國際物流實戰"],
  ["500+", "躍馬企業 · 出口實戰案件"],
  ["30+", "國家與地區覆蓋"],
] as const;

export const JUMPING_COPY = {
  title: ["一只貨櫃的", "後半段旅程"],
  body: "一只貨櫃離開台灣，躍馬企業負責把它準時送達——\n這件事，已經做了 42 年、500 多個案件、30 多個國家。\n\n抵達之後，它的故事才開始分岔：\n有的品牌在當地開了第二家店；\n更多的，幾個月後原封不動地退回，或從此沒有下文。\n\n運輸從來不是分水嶺，貨都送到了。\n分水嶺在於，抵達之後有沒有人接手。\n\n鹿飛，是為了這後半段旅程而成立的。",
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
          <div className="grid grid-cols-3 gap-4 border-y border-white/15 py-6 md:gap-7">
            {JUMPING_STATS.map(([value, label]) => (
              <div key={label}>
                <strong data-lufe-counter className="block font-sans text-[clamp(30px,4vw,44px)] font-semibold leading-none tracking-[-.035em] text-gold">{value}</strong>
                <span className="mt-3 block text-[11px] leading-[1.5] text-white/65 md:text-[12px]">{label}</span>
              </div>
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
