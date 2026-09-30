export function OpeningSection() {
  return (
    <section className="px-5 py-[80px] md:px-10 md:py-[104px]">
      <div className="mx-auto grid max-w-[1200px] gap-8 md:grid-cols-[.9fr_1.1fr] md:gap-16">
        <h2 className="font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-tx [text-wrap:balance]">
          很多品牌的出海故事，
          <br />
          <span className="text-gold-d">都在貨到的那一天結束</span>
        </h2>
        <div className="max-w-[620px] text-[16px] leading-[1.9] text-tx2 md:text-[17px]">
          <p className="whitespace-pre-line">我們聽過太多這個版本：{"\n\n"}貨代把貨送到馬尼拉，報關、清關、進倉，一切順利。{"\n"}然後——證還在申請，架上沒有人看見，{"\n"}第一封客訴信是英文的，沒有人回。{"\n"}三個月後貨還在倉庫，老闆說：算了，先回台灣。</p>
          <p className="mt-6 whitespace-pre-line font-semibold text-tx">貨都有送到，差別從來不在物流。{"\n"}差別在到了之後，有沒有人接著走。{"\n"}鹿飛做的，就是那一段。</p>
        </div>
      </div>
    </section>
  );
}
