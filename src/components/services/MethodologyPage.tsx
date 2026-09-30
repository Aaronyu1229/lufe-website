import Image from "next/image";
import Link from "next/link";

import { Disclosure } from "@/components/ui";
import { PILLARS } from "@/data/services";

import { ContactButton } from "./ContactButton";

export const METHODOLOGY_DIMENSIONS = [
  {
    name: "Market 市場",
    question: "這個市場夠大嗎？",
    weight: "20%",
    criteria: "可觸達的市場規模、成長率、消費者願意付多少、市場在哪個階段。",
    redAt: "可觸達市場不到你預估年營收的 20 倍，建議換市場。",
  },
  {
    name: "Barrier 門檻",
    question: "進去要花多少力氣？",
    weight: "20%",
    criteria: "認證要求與成本、通路進入難度、在地化改造（包裝、配方、標示）、合規灰色地帶。",
    redAt: "合規認證成本超過首年毛利的一半，直接 No-Go。",
  },
  {
    name: "Competition 競爭",
    question: "你打得過嗎？",
    weight: "20%",
    criteria: "前十大品牌市佔集中度、競品護城河、競品弱點、會不會打價格戰。",
    redAt: "前三名市佔加起來超過 70%，不做正面競爭。",
  },
  {
    name: "Profitability 獲利",
    question: "做得動嗎？",
    weight: "25%",
    criteria: "到岸成本（FOB＋關稅＋物流＋保險）、通路佣金與行銷攤提、退換貨預估、匯率風險。",
    redAt: "悲觀情境淨利率低於 5%，建議調整。",
  },
  {
    name: "Regulatory 法規",
    question: "法規會不會突然變？",
    weight: "15%",
    criteria: "當地貿易政策穩定度、產品類別法規變動歷史、政治風險、退出成本。",
    redAt: "過去三年曾被禁或大幅加稅，風險加權。",
  },
] as const;

export const METHODOLOGY_DECISIONS = [
  { score: "≥ 75", verdict: "Go", advice: "可以進，照四章正常走。", color: "border-emerald-500" },
  { score: "60–74", verdict: "Conditional Go", advice: "可以進，先解決一到兩個弱項。", color: "border-amber-500" },
  { score: "45–59", verdict: "Hold", advice: "建議暫緩 6–12 個月，等關鍵變化。", color: "border-ember" },
  { score: "< 45", verdict: "No-Go", advice: "不建議，我們會寫清楚什麼條件改了可以再看。", color: "border-red-500" },
] as const;

export const WORKED_EXAMPLE = {
  caseName: "保健品 → 北美 Costco",
  scores: [
    { dim: "Market", score: 82, note: "北美保健品市場大、穩定成長" },
    { dim: "Barrier", score: 62, note: "FDA 註冊成本可控，Costco 關係是關鍵" },
    { dim: "Competition", score: 71, note: "前三名市佔中位集中" },
    { dim: "Profitability", score: 78, note: "毛利空間夠，要承受 Costco 條款" },
    { dim: "Regulatory", score: 80, note: "北美法規穩定" },
  ],
  weighted: 74,
  verdict: "Conditional Go",
  condition: "配方微調符合北美口感。",
  outcome: "實際結果：6 個月上架，首月銷量超標 40%。",
} as const;

export const METHODOLOGY_FAQS = [
  ["我一定要先被評分才能開始嗎？", "不用。第一次談我們會粗跑一遍，30 分鐘，不收費。多數人是談完才知道自己在哪一格。"],
  ["分數低就不能做嗎？", "60 分以下我們不接，這是對雙方的保護。但我們會寫清楚哪一題掉分、什麼條件改了可以再看。"],
  ["分數是誰打的？", "我們打，依據是公開數據、你給的成本、和我們在當地的經驗。品測跑完，Market 和 Competition 兩題會用真實反應重打一次。"],
] as const;

const CHAPTER_ANSWERS = [
  { question: "Market、Competition", href: "/services/product-testing", label: "第一個月的品測。", body: "一桌老師和家長拿起來看看，比報表準。" },
  { question: "Barrier、Profitability", href: "/services/consignment", label: "第三個月的寄賣。", body: "證要多久、到岸多少、平台抽多少，跑一輪就有真數字。" },
  { question: "Regulatory、Barrier", href: "/services/localization", label: "第九個月的公司落地。", body: "律師行、持證進口商、合規安排。" },
  { question: "海外客服", body: "不在五題裡。它不是「該不該去」的問題，是「去了之後」的問題。" },
] as const;

export function MethodologyPage() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy px-5 pb-[80px] pt-[130px] text-white md:px-10 md:pb-[110px] md:pt-[170px]">
        <div className="absolute inset-0" aria-hidden="true">
          <Image src="/images/hero/hero-compass.jpg" alt="" fill priority sizes="100vw" className="object-cover opacity-[0.28]" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy/80 via-navy/65 to-navy" />
        </div>
        <div className="relative mx-auto max-w-[1100px]">
          <nav aria-label="Breadcrumb" className="mb-7 text-[13px] text-white/55"><Link href="/" className="hover:text-white">首頁</Link><span className="mx-2 text-white/30">/</span><Link href="/services" className="hover:text-white">服務</Link><span className="mx-2 text-white/30">/</span><span className="text-white/80">方法論</span></nav>
          <p className="mb-4 text-[14px] font-semibold text-gold">方法論</p>
          <h1 className="h1 max-w-[760px] text-white">四個方案，是從這裡長出來的</h1>
          <p className="lead mt-5 max-w-[680px] whitespace-pre-line !text-white/75">這一頁是我們判斷「該不該去、該從哪一章開始」的底層。{"\n"}你不需要讀完才能開始；但如果你想知道我們怎麼想，都在這裡。</p>
        </div>
      </section>

      <div className="border-b border-bd bg-cream px-5 py-4 text-[14px] leading-[1.8] text-tx2 md:px-10"><p className="mx-auto max-w-[1100px]"><strong className="text-tx">不是第五章 ·</strong> 這不是第五章。這是我們第一次談的時候，腦子裡跑的那張表。</p></div>

      <section className="bg-white px-5 py-[72px] md:px-10 md:py-[88px]">
        <div className="mx-auto max-w-[900px]">
          <h2 className="h2 text-tx">為什麼要有一張表</h2>
          <p className="mt-5 whitespace-pre-line text-[16px] leading-[1.9] text-tx2">出海的決定太常靠感覺：朋友說好、展會上人很多、對方老闆很熱情。{"\n"}我們把它換成五個問題，每個問題有分數、有紅線。{"\n"}分數不是為了好看，是為了在花錢之前，先知道哪一題會出事。</p>
          <p className="mt-7 border-l-4 border-gold bg-cream px-5 py-5 text-[18px] font-semibold leading-[1.7] text-tx">我們自己的規矩：總分不到 60 分，我們不接。</p>
        </div>
      </section>

      <section className="bg-cream px-5 py-[72px] md:px-10 md:py-[88px]">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="h2 text-tx">五個問題</h2>
          <div className="mt-8 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-5">
            {METHODOLOGY_DIMENSIONS.map((dimension) => <article key={dimension.name} className="border border-bd bg-white p-5"><div className="flex items-baseline justify-between gap-3"><h3 className="text-[17px] font-semibold text-tx">{dimension.name}</h3><span className="text-[14px] font-semibold text-gold-d">{dimension.weight}</span></div><p className="mt-4 text-[16px] font-medium leading-[1.6] text-sky">「{dimension.question}」</p><p className="mt-5 text-[14px] leading-[1.8] text-tx2"><strong className="text-tx">看：</strong>{dimension.criteria}</p><p className="mt-5 border-t border-bd pt-4 text-[14px] leading-[1.8] text-tx2"><strong className="text-ember">紅線：</strong>{dimension.redAt}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-white px-5 py-[72px] md:px-10 md:py-[88px]">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="h2 text-tx">分數怎麼讀</h2>
          <div className="mt-8 grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
            {METHODOLOGY_DECISIONS.map((decision) => <article key={decision.verdict} className={`border border-bd border-l-4 bg-cream p-5 ${decision.color}`}><p className="num text-[28px] leading-none text-gold-d">{decision.score}</p><h3 className="mt-4 text-[18px] font-semibold text-tx">{decision.verdict}</h3><p className="mt-3 text-[14px] leading-[1.8] text-tx2">{decision.advice}</p></article>)}
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-[72px] md:px-10 md:py-[88px]">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="h2 text-tx">五個問題，<span className="text-gold-d">四章裡誰在回答</span></h2>
          <div className="mt-8 overflow-x-auto border border-bd"><table className="min-w-[680px] w-full border-collapse bg-white text-left"><thead className="border-b border-bd bg-navy text-white"><tr><th className="p-4 text-[14px]">問題</th><th className="p-4 text-[14px]">哪一章在回答</th></tr></thead><tbody>{CHAPTER_ANSWERS.map((answer) => <tr key={answer.question} className="border-b border-bd last:border-b-0"><td className="p-4 text-[15px] font-medium text-tx">{answer.question}</td><td className="p-4 text-[15px] leading-[1.8] text-tx2">{"href" in answer ? <><Link href={answer.href} className="font-semibold text-sky hover:text-navy">{answer.label}</Link>{answer.body}</> : answer.body}</td></tr>)}</tbody></table></div>
        </div>
      </section>

      <section className="bg-white px-5 py-[72px] md:px-10 md:py-[88px]">
        <div className="mx-auto max-w-[960px]">
          <h2 className="h2 text-tx">一個評分的例子：<span className="text-gold-d">{WORKED_EXAMPLE.caseName}</span></h2>
          <div className="mt-8 grid min-w-0 grid-cols-1 overflow-hidden border border-bd md:grid-cols-[minmax(0,1fr)_260px]">
            <div className="bg-cream p-6 md:p-8"><div className="grid gap-4">{WORKED_EXAMPLE.scores.map((score) => <div key={score.dim} className="grid grid-cols-[110px_minmax(0,1fr)_34px] items-center gap-3"><strong className="text-[14px] text-tx">{score.dim}</strong><div><div className="h-2 bg-white"><div className="h-full bg-gold" style={{ width: `${score.score}%` }} /></div><p className="mt-2 text-[13px] leading-[1.6] text-tx2">{score.note}</p></div><span className="num text-[18px] text-gold-d">{score.score}</span></div>)}</div></div>
            <div className="bg-navy p-6 text-white md:p-8"><p className="text-[14px] text-white/55">加權總分</p><p className="num mt-3 text-[52px] leading-none text-gold">{WORKED_EXAMPLE.weighted}</p><p className="mt-5 text-[18px] font-semibold text-amber-300">{WORKED_EXAMPLE.verdict}</p><p className="mt-5 text-[14px] leading-[1.8] text-white/75"><strong className="text-gold">條件：</strong>{WORKED_EXAMPLE.condition}</p><p className="mt-5 text-[14px] leading-[1.8] text-white/75">{WORKED_EXAMPLE.outcome}</p><Link href="/cases/costco-health" className="mt-6 inline-flex text-[14px] font-semibold text-gold hover:text-white">看這個案例的完整故事 →</Link></div>
          </div>
        </div>
      </section>

      <section className="bg-cream px-5 py-[72px] md:px-10 md:py-[88px]">
        <div className="mx-auto max-w-[1100px]">
          <h2 className="h2 text-tx">五個問題背後，<span className="text-gold-d">是三件事</span></h2>
          <p className="mt-5 max-w-[760px] text-[16px] leading-[1.9] text-tx2">產品適配性（這個市場真的要你嗎）、通路銷售力（上得了架，還要賣得動）、團隊體質（進得去，還要留得下）。<br />五個問題是量尺，三件事是量的東西。</p>
          <div className="mt-8 grid min-w-0 grid-cols-1 gap-5 md:grid-cols-3">{Object.values(PILLARS).map((pillar) => <article key={pillar.slug} className="border border-bd bg-white p-6"><h3 className="h3 text-tx">{pillar.title}</h3><p className="mt-3 text-[15px] font-medium text-sky">{pillar.tagline}</p><p className="mt-5 text-[14px] leading-[1.8] text-tx2">{pillar.description}</p></article>)}</div>
        </div>
      </section>

      <section className="bg-white px-5 py-[72px] md:px-10 md:py-[88px]">
        <div className="mx-auto max-w-[860px]">
          <h2 className="h2 text-tx">常見問題</h2>
          <div className="mt-6 border-b border-bd">{METHODOLOGY_FAQS.map(([question, answer], index) => <Disclosure key={question} id={`methodology-faq-${index + 1}`} defaultOpen={index === 0} summary={<span><span aria-hidden="true" className="mr-4 text-[13px] font-semibold text-gold-d">{String(index + 1).padStart(2, "0")}</span>{question}</span>}><p className="text-[15.5px] leading-[1.85] text-tx2">{answer}</p></Disclosure>)}</div>
          <Link href="/services" className="mt-10 flex items-center justify-between gap-5 border border-bd bg-cream p-6 hover:border-gold"><div><p className="text-[14px] font-semibold text-sky">看完量尺，回去看路 →</p><h3 className="h3 mt-3 text-tx">一家品牌在馬尼拉的第一年：品測、寄賣、公司落地、海外客服</h3></div><span aria-hidden="true" className="text-[28px] text-gold-d">→</span></Link>
        </div>
      </section>

      <section className="bg-navy px-5 py-[78px] text-white md:px-10 md:py-[96px]"><div className="mx-auto max-w-[720px] text-center"><h2 className="h2 text-white">免費初步評估</h2><p className="mt-4 text-[16px] leading-[1.85] text-white/70">30 分鐘，粗跑五個問題，不收費。談完你會知道自己在哪一格、該從哪一章開始。</p><ContactButton className="mt-8 cursor-pointer bg-gold px-7 py-3.5 text-[16px] font-semibold text-navy hover:bg-gold-l">預約 30 分鐘 →</ContactButton></div></section>
    </>
  );
}
