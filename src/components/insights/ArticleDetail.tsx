"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import { TieredImage } from "@/components/TieredImage";
import { ArticleFaq } from "@/components/insights/ArticleFaq";
import { StaticArticleContent, renderInlineMarkdown } from "@/components/insights/StaticArticleContent";
import { useSpring } from "@/lib/motion";
import type { Article } from "@/data/articles";
import type { DatabaseInsight } from "@/lib/articles/presentation";
import { useMessageBox } from "../MessageBox";

const colorMap: Record<string, string> = {
  sky: "bg-[rgba(91,143,168,0.08)] text-sky",
  gold: "bg-[rgba(212,168,92,0.12)] text-gold-d",
  ember: "bg-[rgba(217,139,74,0.08)] text-ember",
};

interface Props {
  readonly article: Article | DatabaseInsight;
  readonly image: string;
}

function isDatabaseArticle(article: Article | DatabaseInsight): article is DatabaseInsight {
  return !Array.isArray(article.content);
}

export function renderStaticBoldMarkup(text: string): ReactNode {
  return renderInlineMarkdown(text);
}

function ReadingProgress() {
  const progress = useSpring(0, { precision: 0.001 });

  useEffect(() => {
    const updateProgress = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      progress.to(maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0, { response: 0.24 });
    };

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, [progress]);

  return (
    <div
      aria-hidden="true"
      className="fixed left-0 right-0 top-[74px] z-[51] h-[2px] origin-left bg-gold will-change-transform"
      style={{ transform: `scaleX(${progress.value})` }}
    />
  );
}

export function ArticleDetail({ article, image }: Props) {
  const { open } = useMessageBox();
  const databaseContent = isDatabaseArticle(article) ? article.content : null;
  const staticContent: readonly string[] = databaseContent ? [] : article.content as readonly string[];
  const staticFaq = isDatabaseArticle(article) ? undefined : article.faq;
  const hasInlineImage = Boolean(databaseContent && /<img\b/i.test(databaseContent.html));
  const externalImage = /^https?:\/\//.test(image);

  return (
    <article className="min-h-screen bg-white pb-[80px] pt-[126px] md:pb-[110px] md:pt-[148px]">
      <ReadingProgress />
      <div className="lufe-container"><div className="max-w-[720px] min-w-0">
        <header className="mb-10">
          <nav aria-label="Breadcrumb" className="mb-7 flex flex-wrap gap-2 text-[13px] text-tx3">
            <Link href="/insights" className="hover:text-navy">洞察與資源</Link>
            <span aria-hidden="true">/</span>
            <span className="text-tx2">{article.category}</span>
          </nav>

          <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-[13px] text-tx3">
            <span className={`px-2.5 py-[3px] text-[11px] font-medium ${colorMap[article.color]}`}>{article.category}</span>
            <span>{article.date}</span>
            <span>{article.readTime}</span>
          </div>

          <h1 className="h1 mb-6 font-sans text-tx">{article.title}</h1>
          <div className="mb-6 flex items-center gap-3">
            <TieredImage src="/images/about/aaron-portrait-studio-640.webp" alt="" maxTierWidth={640} sizes="32px" loading="eager" className="h-8 w-8 rounded-full object-cover object-[center_18%]" />
            <div className="text-[13px] leading-[1.55] text-tx3">
              <Link href="/about/aaron-yu" className="font-medium text-tx2 hover:text-navy">Aaron Yu・鹿飛 LUFÉ 創辦人</Link>
              <p>發布：<time dateTime={article.date}>{article.date}</time></p>
            </div>
          </div>
          <p className="border-l-2 border-gold pl-4 text-[17px] leading-[1.8] text-tx2">{article.summary}</p>
        </header>

        {!hasInlineImage ? (
          <figure className="relative mb-10 h-[240px] w-full overflow-hidden md:h-[360px]">
            {externalImage ? (
              // Database article images are not known to Next's static image configuration.
              // eslint-disable-next-line @next/next/no-img-element
              <img src={image} alt={article.title} className="h-full w-full object-cover" />
            ) : (
              <TieredImage src={image} alt={article.title} sizes="100vw" className="absolute inset-0 h-full w-full object-cover" />
            )}
          </figure>
        ) : null}

        {databaseContent ? (
          <div
            className="text-[17px] leading-[1.95] text-tx [&_h2]:mb-3 [&_h2]:mt-10 [&_h2]:font-sans [&_h2]:text-[26px] [&_h2]:font-[650] [&_img]:h-auto [&_img]:max-w-full [&_p+_p]:mt-5"
            dangerouslySetInnerHTML={{ __html: databaseContent.html }}
          />
        ) : <StaticArticleContent content={staticContent} />}
        <ArticleFaq faq={staticFaq} />

        <div className="my-10 h-px w-full bg-bd md:my-14" />

        <section aria-labelledby="article-author" className="mb-10 border border-bd bg-cream p-5 md:mb-14 md:p-7">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
            <TieredImage src="/images/about/aaron-portrait-studio-1080.webp" alt="Aaron Yu" sizes="96px" className="h-24 w-24 shrink-0 rounded-full object-cover object-[center_18%]" />
            <div>
              <h2 id="article-author" className="h3 mb-1 text-tx"><Link href="/about/aaron-yu" className="hover:text-gold-d">Aaron Yu</Link></h2>
              <p className="mb-3 text-[14.5px] font-medium text-gold-d">鹿飛 LUFÉ 創辦人・來自躍馬企業</p>
              <p className="mb-4 max-w-[520px] text-[15px] leading-[1.8] text-tx2">看了很多年貨櫃出去，決定去接貨到了之後的事。</p>
              <div className="flex flex-wrap gap-x-5 gap-y-3 text-[14.5px] font-medium">
                <a href="https://www.linkedin.com/in/wibp/" target="_blank" rel="me noopener" className="border-b border-tx3/40 pb-0.5 text-tx2 hover:text-navy">LinkedIn ↗</a>
                <Link href="/about/aaron-yu" className="border-b border-gold pb-0.5 text-gold-d hover:text-navy">看更多 Aaron 的文章 →</Link>
              </div>
            </div>
          </div>
        </section>

        <div className="border border-bd bg-cream px-5 py-8 text-center md:px-8">
          <h2 className="h3 mb-2 text-tx">看完文章，想聊聊你的狀況？</h2>
          <p className="mx-auto mb-6 max-w-[440px] text-[15.5px] leading-[1.8] text-tx2">聊聊，不收費、不承諾。我們會老實告訴你值不值得一試。</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <button onClick={open} className="cursor-pointer bg-gold px-8 py-3.5 text-[16.5px] font-semibold text-navy hover:bg-gold-l">
              聊聊你的產品 →
            </button>
            <Link href="/assess" className="inline-flex items-center gap-2 text-[15.5px] font-medium text-tx2 hover:text-navy">
              <span className="border-b border-tx3/40 pb-0.5">先做 2 分鐘評估</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="mt-8 text-center">
          <Link href="/insights" className="text-[14.5px] font-medium text-tx3 hover:text-navy">
            ← 回到所有文章
          </Link>
        </div>
      </div></div>
    </article>
  );
}
