export function OpeningSection() {
  return (
    <section className="py-[80px] md:py-[104px]">
      <div className="lufe-container grid gap-8 md:grid-cols-[.9fr_1.1fr] md:gap-16">
        <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-tx [text-wrap:balance]">
          出海不是把貨送出去，
          <br />
          <span className="text-gold-d">是把生意做起來</span>
        </h2>
        <div className="max-w-[620px] text-[16px] leading-[1.9] text-tx2 md:text-[17px]">
          <p className="whitespace-pre-line">多數台灣企業的出海，是這樣開始的：{"\n\n"}拿到一張海外訂單、參加一次展會、找到一位代理商。{"\n"}產品上了架，當地消費者卻不知道它為什麼值得買；{"\n"}證照、通路、售後一件一件冒出來，每一件都要老闆親自處理。{"\n"}半年後，海外業務還停在「試試看」</p>
          <p className="mt-6 whitespace-pre-line font-semibold text-tx">出海的成敗，不在第一張訂單。{"\n"}在於市場、通路、團隊與服務，有沒有一套系統一起往前走。{"\n"}鹿飛做的，就是這套系統</p>
        </div>
      </div>
    </section>
  );
}
