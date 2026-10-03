export function OpeningSection() {
  return (
    <section className="py-[80px] md:py-[104px]">
      <div className="lufe-container grid gap-8 md:grid-cols-[.9fr_1.1fr] md:gap-16">
        <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-tx [text-wrap:balance]">
          企業出海，前半段是把貨送到，
          <br />
          <span className="text-gold-d">後半段才是真正的考驗</span>
        </h2>
        <div className="max-w-[620px] text-[16px] leading-[1.9] text-tx2 md:text-[17px]">
          <p className="whitespace-pre-line">訂單、報關、運輸——前半段，多數企業都走得過去。{"\n"}後半段是：產品要被當地市場接受，通路要談得下來，{"\n"}證照、團隊與客服，要有人在當地接住。{"\n\n"}多數企業的出海，不是輸在運輸，而是輸在抵達之後沒有人接手。</p>
          <p className="mt-6 whitespace-pre-line font-semibold text-tx">我們陪台灣品牌走完在菲律賓的第一年：{"\n"}先花 1～2 萬問市場，過了，再一章一章往下走。</p>
        </div>
      </div>
    </section>
  );
}
