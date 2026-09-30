const JUMPING_STATS = [
  ["42+", "躍馬企業 · 年國際物流實戰"],
  ["500+", "躍馬企業 · 出口實戰案件"],
  ["30+", "國家與地區覆蓋"],
] as const;

export function JumpingSection() {
  return (
    <section id="jumping" className="bg-navy px-5 py-[80px] text-white md:px-10 md:py-[104px]">
      <div className="mx-auto grid max-w-[1200px] gap-12 lg:grid-cols-[1.1fr_.9fr] lg:gap-20">
        <div>
          <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal [text-wrap:balance]">
            四十二年，
            <br />
            <span className="text-gold">看著貨櫃一個一個出去</span>
          </h2>
          <p className="mt-6 max-w-[660px] whitespace-pre-line text-[16px] leading-[1.9] text-white/70 md:text-[17px]">躍馬企業做國際物流 42 年，500 多個出口案件，30 多個國家。{"\n"}我在裡面看的不是報表，是貨櫃出去以後，後面的故事。{"\n\n"}有的品牌在當地開了第二家店。{"\n"}更多的，是幾個月後貨退回來，或者就沒有下文了。{"\n"}差別從來不在物流——貨都有送到。{"\n"}差別在到了之後，有沒有人接。{"\n\n"}鹿飛就是從這個觀察長出來的。</p>
        </div>
        <div className="self-end">
          <div className="grid grid-cols-3 gap-4 border-y border-white/15 py-6 md:gap-7">
            {JUMPING_STATS.map(([value, label]) => (
              <div key={label}>
                <strong className="block font-sans text-[clamp(30px,4vw,44px)] font-semibold leading-none tracking-[-.035em] text-gold">{value}</strong>
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
