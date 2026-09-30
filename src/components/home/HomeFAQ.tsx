"use client";

import { Disclosure } from "@/components/ui";
import { HOME_FAQ_ITEMS } from "@/data/homeFaq";

export { HOME_FAQ_ITEMS } from "@/data/homeFaq";

export function HomeFAQ() {
  return (
    <section className="px-5 py-[62px] md:px-10 md:py-[96px] md:pb-[100px]">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-y-[43px] md:grid-cols-12 md:gap-x-16 md:gap-y-0">
        <div className="self-start md:col-span-4 md:sticky md:top-[96px]">
          <h2 className="max-w-[360px] font-sans text-[clamp(30px,4.4vw,52px)] font-[650] leading-[1.14] tracking-normal text-navy [text-wrap:balance]">
            你可能想先問的三件事
          </h2>
        </div>

        <div className="min-w-0 md:col-span-8">
          {HOME_FAQ_ITEMS.map((item, index) => (
            <Disclosure
              key={item.num}
              id={`home-faq-${item.num}`}
              defaultOpen={index === 0}
              summary={
                <span className="grid min-w-0 grid-cols-[38px_minmax(0,1fr)] items-baseline gap-[7px] md:grid-cols-[50px_minmax(0,1fr)] md:gap-[10px]">
                  <span className="text-[13px] font-medium tracking-[0.05em] text-[#7A5A1A] tabular-nums">{item.num}</span>
                  <span className="text-[18px] font-semibold leading-[1.5] tracking-normal text-tx md:text-[20px]">
                    {item.question}
                  </span>
                </span>
              }
            >
              <p className="mb-2 ml-[45px] max-w-[650px] text-[16px] font-medium leading-[1.65] text-tx md:ml-[60px] md:text-[17px]">
                {item.takeaway}
              </p>
              <p className="ml-[45px] max-w-[650px] whitespace-pre-line text-[15.5px] leading-[1.85] text-tx2 md:ml-[60px]">
                {item.answer}
              </p>
            </Disclosure>
          ))}
        </div>
      </div>
    </section>
  );
}
