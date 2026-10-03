"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMessageBox } from "./MessageBox";
import { DelightLayer } from "./DelightLayer";
import { TieredImage } from "./TieredImage";
import { useSpring } from "@/lib/motion";
import {
  BuildingIcon,
  ClockIcon,
  CompassIcon,
  HeadsetIcon,
  PenIcon,
  TargetIcon,
  TrendIcon,
} from "@/components/icons/LineIcons";
import { CASES } from "@/data/cases";
import type { InsightCard } from "@/lib/articles/presentation";
import {
  CHAPTER_ARTICLES,
  CHAPTER_ARTICLE_TAGS,
  type ArticleChapterKey,
} from "@/data/chapters";

type MenuKey = "services" | "advanced" | "cases" | "insights" | "about";

const NAV_HEIGHT = 64;

const navItems: ReadonlyArray<{ key: MenuKey; label: string }> = [
  { key: "services", label: "服務" },
  { key: "advanced", label: "進階" },
  { key: "cases", label: "案例" },
  { key: "insights", label: "洞察" },
  { key: "about", label: "關於我們" },
];

const INSIGHT_MENU_CHAPTERS = ["m1", "m3", "m9", "after", "na"] as const satisfies readonly ArticleChapterKey[];
const insightChapterHref = (chapter: ArticleChapterKey) => `/insights?cat=${chapter}#articles`;

/** On /insights itself a soft navigation keeps the page mounted, so swap the filter in place instead. */
function switchInsightChapterInPlace(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (window.location.pathname !== "/insights") return;
  event.preventDefault();
  window.history.pushState(null, "", href);
  window.dispatchEvent(new PopStateEvent("popstate"));
  document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" });
}
// Chapters without articles stay out of the menu (a "0 篇" row reads as an empty site); they appear once an article is mapped.
const ABOUT_MENU_ITEMS = [
  { href: "/about#story", title: "品牌故事", num: "01" },
  { href: "/about#team", title: "團隊組成", num: "02" },
  { href: "/about#network", title: "合作夥伴網絡", num: "03" },
  { href: "/about#philosophy", title: "品牌理念", num: "04" },
] as const;

export function normalizePathname(pathname: string | null | undefined): string {
  return !pathname || pathname === "/index" ? "/" : pathname;
}

export function pathnameHasDarkHero(pathname: string): boolean {
  if (["/", "/about", "/contact", "/insights", "/assess", "/assess/result"].includes(pathname)) return true;
  if (pathname === "/resources" || pathname === "/resources/subsidies") return true;
  return pathname.startsWith("/services") || pathname.startsWith("/cases") || pathname.startsWith("/about/");
}

type InsightsNavigation = {
  readonly latestArticle?: InsightCard;
  readonly publishedArticleSlugs: readonly string[];
};

export function Navbar({
  children,
  latestArticle,
  publishedArticleSlugs = [],
}: {
  readonly children?: ReactNode;
  readonly latestArticle?: InsightCard;
  readonly publishedArticleSlugs?: readonly string[];
}) {
  const pathname = normalizePathname(usePathname());
  const { open: openMessageBox } = useMessageBox();
  const darkHero = pathnameHasDarkHero(pathname);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<MenuKey | null>(null);
  const [megaOrigin, setMegaOrigin] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const megaMenuRef = useRef<HTMLDivElement>(null);
  const panelRefs = useRef<Partial<Record<MenuKey, HTMLDivElement>>>({});
  const closeTimer = useRef<number | undefined>(undefined);
  const megaReveal = useSpring(0, { precision: 0.002 });
  const megaHeight = useSpring(0, { response: 0.38, damping: 1 });
  const mobileReveal = useSpring(0, { precision: 0.002 });

  const transparentOverHero = darkHero && !scrolledPastHero;
  const lightGlass = !darkHero;

  function clearClose() {
    if (closeTimer.current !== undefined) window.clearTimeout(closeTimer.current);
    closeTimer.current = undefined;
  }

  function closeMega(delay = 120) {
    clearClose();
    if (!megaOpen) return;
    closeTimer.current = window.setTimeout(() => {
      setMegaOpen(false);
      megaReveal.to(0, { response: 0.3, onRest: () => setActiveMenu(null) });
    }, delay);
  }

  function closeMobile() {
    if (!mobileOpen) return;
    setMobileOpen(false);
    setMobileGroup(null);
  }

  function openMega(key: MenuKey, trigger: HTMLButtonElement) {
    clearClose();
    const rect = trigger.getBoundingClientRect();
    const panelWidth = Math.min(1120, window.innerWidth - 24);
    setMegaOrigin(rect.left + rect.width / 2 - (window.innerWidth - panelWidth) / 2);
    setActiveMenu(key);
    setMegaOpen(true);
    megaReveal.to(1, { response: 0.35 });
  }

  function toggleMobile() {
    if (mobileOpen) {
      closeMobile();
      return;
    }
    setMobileOpen(true);
  }

  useEffect(() => {
    if (!darkHero) return;

    const update = () => {
      const hero = document.querySelector("#main-content > section");
      setScrolledPastHero(hero ? hero.getBoundingClientRect().bottom <= NAV_HEIGHT : window.scrollY > 50);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [darkHero, pathname]);

  useEffect(() => {
    const reset = window.setTimeout(() => {
      setActiveMenu(null);
      setMegaOpen(false);
      setMobileOpen(false);
      setMobileGroup(null);
      megaReveal.jump(0);
      mobileReveal.jump(0);
    }, 0);
    return () => window.clearTimeout(reset);
  }, [mobileReveal, megaReveal, pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  useEffect(() => {
    mobileReveal.to(mobileOpen ? 1 : 0, { response: mobileOpen ? 0.35 : 0.3 });
  }, [mobileOpen, mobileReveal]);

  useEffect(() => {
    const closeOnScroll = () => closeMega(0);
    const closeOnPointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node) || megaMenuRef.current?.contains(event.target as Node)) return;
      closeMega(0);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      closeMega(0);
      closeMobile();
    };

    window.addEventListener("scroll", closeOnScroll, { passive: true });
    document.addEventListener("pointerdown", closeOnPointerDown);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      window.removeEventListener("scroll", closeOnScroll);
      document.removeEventListener("pointerdown", closeOnPointerDown);
      document.removeEventListener("keydown", closeOnEscape);
    };
  });

  useLayoutEffect(() => {
    if (!activeMenu || !megaOpen) return;
    const panel = panelRefs.current[activeMenu];
    if (!panel) return;
    megaHeight.to(panel.scrollHeight, { response: 0.38, damping: 1 });
  }, [activeMenu, megaOpen, megaHeight]);

  const menuOpacity = megaReveal.value;
  const menuScale = 0.92 + menuOpacity * 0.08;
  const mobileOpacity = mobileReveal.value;

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-[100]" onMouseLeave={() => closeMega()}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[200] focus:bg-gold focus:px-4 focus:py-2 focus:text-[14.5px] focus:font-semibold focus:text-navy">
        跳到主要內容
      </a>

      <nav className={`relative transition-colors duration-300 ${transparentOverHero ? "navbar-over-hero" : lightGlass ? "lufe-glass-light text-tx" : "lufe-glass-dark navbar-scrolled text-white"}`} aria-label="主要導航">
        <div className="lufe-container relative flex h-[64px] items-center justify-between gap-4">
          <Link href="/" className="lufe-deer-trigger flex items-center gap-2.5 text-[17px] font-semibold">
            <Image className="lufe-deer" src={lightGlass ? "/images/logo/logo-mark-navy.png" : "/images/logo/logo-mark-white.png"} alt="" width={26} height={26} priority />
            <span>鹿飛 LUF<span className={lightGlass ? "text-gold-d" : "text-gold"}>É</span></span>
          </Link>

          <div className="hidden min-[900px]:flex items-center gap-[6px] text-[14px]">
            {navItems.map((item) => (
              <button
                key={item.key}
                type="button"
                data-menu-trigger={item.key}
                aria-controls="desktop-mega-menu"
                aria-expanded={megaOpen && activeMenu === item.key}
                onMouseEnter={(event) => openMega(item.key, event.currentTarget)}
                onFocus={(event) => openMega(item.key, event.currentTarget)}
                onClick={(event) => openMega(item.key, event.currentTarget)}
                className={`cursor-pointer px-3 py-2 transition-colors hover:bg-black/10 ${activeMenu === item.key && megaOpen ? "bg-black/10 font-semibold" : "opacity-85"}`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <MessageBoxTrigger className="hidden min-[900px]:inline-flex" />
            <button type="button" onClick={toggleMobile} aria-label={mobileOpen ? "關閉選單" : "開啟選單"} aria-controls="mobile-navigation" aria-expanded={mobileOpen} className="flex h-10 w-10 cursor-pointer items-center justify-center min-[900px]:hidden">
              <span className="sr-only">{mobileOpen ? "關閉選單" : "開啟選單"}</span>
              <svg width="20" height="14" viewBox="0 0 20 14" fill="none" aria-hidden="true">
                <path d="M1 1H19M1 7H19M1 13H19" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className="fixed inset-0 top-[64px] z-[-1] bg-[#0B1322]/42 min-[900px]:hidden" style={{ opacity: mobileOpacity, pointerEvents: mobileOpen ? "auto" : "none", visibility: mobileOpacity > 0.01 ? "visible" : "hidden" }} onClick={closeMobile} />
      <div
        id="mobile-navigation"
        className="lufe-glass-panel fixed right-3 top-[60px] z-[101] w-[min(340px,calc(100vw-24px))] max-h-[calc(100svh-80px)] overflow-auto text-tx min-[900px]:hidden"
        style={{
          opacity: mobileOpacity,
          pointerEvents: mobileOpen ? "auto" : "none",
          transform: `scale(${0.6 + mobileOpacity * 0.4})`,
          transformOrigin: "calc(100% - 20px) -10px",
          visibility: mobileOpacity > 0.01 ? "visible" : "hidden",
        }}
      >
        {navItems.map((item) => (
          <MobileGroup key={item.key} item={item} open={mobileGroup === item.key} onToggle={() => setMobileGroup((current) => current === item.key ? null : item.key)} onClose={closeMobile} insightsNavigation={{ latestArticle, publishedArticleSlugs }} />
        ))}
        <MessageBoxTrigger className="m-3 flex w-[calc(100%-24px)] justify-center" onOpen={closeMobile} />
      </div>
      <button
        type="button"
        className={`lufe-mobile-cta ${scrolledPastHero ? "lufe-mobile-cta-visible" : ""}`}
        onClick={openMessageBox}
      >
        <span>第一次談不收費</span>
        <strong>聊聊你的產品 →</strong>
      </button>
      <DelightLayer />
      </header>
      {children}
      <div
        ref={megaMenuRef}
        id="desktop-mega-menu"
        className="lufe-glass-panel fixed left-1/2 top-[64px] z-[100] hidden min-h-[300px] w-[min(1120px,calc(100vw-24px))] overflow-hidden text-tx min-[900px]:block"
        style={{
          height: megaHeight.value,
          opacity: menuOpacity,
          pointerEvents: megaOpen ? "auto" : "none",
          transform: `translateX(-50%) scaleY(${menuScale})`,
          transformOrigin: `${megaOrigin}px top`,
          filter: `blur(${(1 - menuOpacity) * 4}px)`,
          visibility: menuOpacity > 0.01 ? "visible" : "hidden",
        }}
        onMouseEnter={clearClose}
        onMouseLeave={() => closeMega()}
        onClick={(event) => { if ((event.target as Element).closest("a")) closeMega(0); }}
      >
        {navItems.map((item) => (
          <MegaPane
            key={item.key}
            itemKey={item.key}
            active={activeMenu === item.key && megaOpen}
            onMessageOpen={openMessageBox}
            insightsNavigation={{ latestArticle, publishedArticleSlugs }}
            setRef={(node) => {
              if (node) panelRefs.current[item.key] = node;
            }}
          />
        ))}
      </div>
    </>
  );
}

function MegaPane({ itemKey, active, onMessageOpen, insightsNavigation, setRef }: { itemKey: MenuKey; active: boolean; onMessageOpen: () => void; insightsNavigation: InsightsNavigation; setRef: (node: HTMLDivElement | null) => void }) {
  return (
    <div ref={setRef} aria-hidden={!active} className={`${active ? "relative pointer-events-auto opacity-100 delay-[60ms]" : "absolute pointer-events-none opacity-0"} inset-x-0 top-0 grid min-h-[300px] grid-cols-[1fr_1fr_320px] transition-opacity duration-[180ms]`}>
      {itemKey === "services" && <ServicesMenu />}
      {itemKey === "advanced" && <AdvancedMenu onMessageOpen={onMessageOpen} />}
      {itemKey === "cases" && <CasesMenu />}
      {itemKey === "insights" && <InsightsMenu {...insightsNavigation} active={active} />}
      {itemKey === "about" && <AboutMenu />}
    </div>
  );
}

function MenuColumn({ bordered = false, children }: { bordered?: boolean; children: ReactNode }) {
  return <section className={`${bordered ? "border-l border-bd" : ""} min-w-0 px-[26px] pb-7 pt-[22px]`}>{children}</section>;
}

function MenuRail({ children }: { children: ReactNode }) {
  return <aside className="min-w-0 border-l border-bd bg-[rgba(245,242,236,.7)] px-[26px] pb-7 pt-[22px]">{children}</aside>;
}

function MenuMarker({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`grid h-7 w-7 shrink-0 place-items-center text-gold-d transition-[color,transform] duration-200 [@media(hover:hover)]:group-hover:translate-x-px ${className}`}>{children}</span>;
}

type MenuLinkProps = {
  href: string;
  title: ReactNode;
  marker: ReactNode;
  desc?: string;
  external?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
};

function MenuLink({ href, title, marker, desc, external = false, onClick }: MenuLinkProps) {
  const content = <><MenuMarker>{marker}</MenuMarker><span className="min-w-0"><b className="block text-[15.5px] font-[650] tracking-[-.005em] transition-colors [@media(hover:hover)]:group-hover:text-sky">{title}</b>{desc && <span className="mt-0.5 block truncate text-[12.5px] text-tx2">{desc}</span>}</span></>;
  const className = "group -mx-3 grid grid-cols-[28px_minmax(0,1fr)] items-center gap-3 px-3 py-3 transition-[background-color,transform] duration-150 [@media(hover:hover)]:hover:bg-[rgba(58,107,132,.07)] active:scale-[.985]";

  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
    : <Link href={href} onClick={onClick} className={className}>{content}</Link>;
}

function MenuMoreLink({ href, children }: { href: string; children: ReactNode }) {
  return <Link href={href} className="mt-2 inline-flex text-[13.5px] font-semibold text-sky hover:text-navy">{children}</Link>;
}

type FeatureTileProps = {
  icon: ReactNode;
  title: string;
  body: string;
  action: string;
} & ({ href: string; onClick?: never } | { href?: never; onClick: () => void });

function FeatureTile({ icon, title, body, action, ...props }: FeatureTileProps) {
  const content = <>
    <span aria-hidden="true" className="grid h-8 w-8 place-items-center border border-gold/40 text-gold-d">{icon}</span>
    <b className="mt-4 block text-[16px] font-[650] text-tx">{title}</b>
    <span className="mt-1.5 block text-[13.5px] leading-[1.7] text-tx2">{body}</span>
    <span className="mt-4 inline-block text-[14px] font-semibold text-sky">{action} <span aria-hidden="true" className="inline-block transition-transform [@media(hover:hover)]:group-hover:translate-x-[3px]">→</span></span>
  </>;
  const className = "group block border border-bd bg-white p-5 text-left transition-[transform,border-color] duration-200 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-gold/50 active:scale-[.985]";

  return "href" in props && props.href
    ? <Link href={props.href} className={className}>{content}</Link>
    : <button type="button" onClick={props.onClick} className={`${className} w-full cursor-pointer`}>{content}</button>;
}

function ListIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h10" /></svg>;
}

function BarsIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></svg>;
}

function FileIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M6 3h9l4 4v14H6z" /><path d="M14 3v5h5" /></svg>;
}

function TradeIcon() {
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 7h16M4 12h10M4 17h7" /></svg>;
}

function ServicesMenu() {
  return <>
    <MenuColumn>
      <MenuLink href="/services/product-testing" title="市場探查" marker={<CompassIcon size={18} />} />
      <MenuLink href="/services/consignment" title="寄賣" marker={<TrendIcon size={18} />} />
      <MenuLink href="/services/localization" title="公司落地" marker={<BuildingIcon size={18} />} />
      <MenuLink href="/services/call-center" title="海外客服" marker={<HeadsetIcon size={18} />} />
    </MenuColumn>
    <MenuColumn bordered>
      <MenuLink href="/services/north-america" title="北美通路" marker={<span className="font-[var(--font-inter)] text-[12px] font-bold tracking-[-.01em]">US</span>} />
      <div className="mt-[18px]"><MenuLink href="/services" title="四章總覽" marker={<ListIcon />} /></div>
    </MenuColumn>
    <MenuRail>
      <FeatureTile href="/services/product-testing" icon={<CompassIcon size={16} />} title="不確定從哪裡開始？" body="先做市場探查，用當地真實消費者的反應決定下一步" action="看市場探查怎麼做" />
    </MenuRail>
  </>;
}

function AdvancedMenu({ onMessageOpen }: { onMessageOpen: () => void }) {
  return <>
    <MenuColumn>
      <MenuLink href="/services/optimize" title="運營優化" marker={<TrendIcon size={18} />} />
    </MenuColumn>
    <MenuColumn bordered>
      <MenuLink href="/services/methodology" title="鹿飛方法論" desc="小步出海法 · 先問市場，再投錢" marker={<BarsIcon />} />
      <MenuLink href="/assess" title="2 分鐘處境比對" marker={<ClockIcon size={18} />} />
    </MenuColumn>
    <MenuRail>
      <FeatureTile icon={<ClockIcon size={16} />} title="免費初步評估" body="30 分鐘，用鹿飛方法論的五個問題，初步檢視出海條件" action="預約 30 分鐘" onClick={onMessageOpen} />
    </MenuRail>
  </>;
}

function CasesMenu() {
  const caseColumns = [
    CASES.filter((_, index) => index === 0 || index === 2),
    CASES.filter((_, index) => index === 1 || index === 3),
  ] as const;

  return <>
    <MenuColumn>
      {caseColumns[0].map((caseItem) => <CaseMenuLink key={caseItem.slug} caseItem={caseItem} />)}
    </MenuColumn>
    <MenuColumn bordered>
      {caseColumns[1].map((caseItem) => <CaseMenuLink key={caseItem.slug} caseItem={caseItem} />)}
      <MenuMoreLink href="/cases">看所有案例 →</MenuMoreLink>
    </MenuColumn>
    <MenuRail>
      <div className="flex flex-wrap gap-[6px]">
        {["食品", "電子", "服飾", "飲品"].map((tag) => <CaseTagLink key={tag}>{tag}</CaseTagLink>)}
      </div>
      <div className="mt-[6px] flex flex-wrap gap-[6px]">
        {["北美", "東南亞"].map((tag) => <CaseTagLink key={tag}>{tag}</CaseTagLink>)}
      </div>
      <div className="mt-4"><FeatureTile href="/assess" icon={<TargetIcon size={16} />} title="不確定比較像哪一條？" body="2 分鐘處境比對，找出最接近的案例" action="開始比對" /></div>
    </MenuRail>
  </>;
}

function CaseMenuLink({ caseItem }: { caseItem: (typeof CASES)[number] }) {
  return <MenuLink href={`/cases/${caseItem.slug}`} title={caseItem.title} marker={<span className="num whitespace-nowrap text-[13px] font-bold">{caseItem.num}</span>} />;
}

function CaseTagLink({ children }: { children: ReactNode }) {
  return <Link href="/cases" className="border border-bd bg-white px-2.5 py-[5px] text-[12.5px] text-tx2 hover:border-sky hover:text-sky">{children}</Link>;
}

const CHAPTER_ICON_PATHS: Record<Exclude<ArticleChapterKey, "na" | "sub">, ReactNode> = {
  m1: <><circle cx="12" cy="12" r="9" /><path d="M15.5 8.5l-2 5-5 2 2-5z" /></>,
  m3: <><path d="M3 17l6-6 4 4 8-8" /><path d="M15 7h6v6" /></>,
  m9: <><path d="M4 21V5a1 1 0 0 1 1-1h9a1 1 0 0 1 1 1v16" /><path d="M15 9h4a1 1 0 0 1 1 1v11" /><path d="M3 21h18" /><path d="M8 8h3M8 12h3M8 16h3" /></>,
  after: <><path d="M4 14a8 8 0 0 1 16 0" /><path d="M3 14h4v6H3zM17 14h4v6h-4z" /></>,
};

function ChapterIcon({ chapter }: { chapter: (typeof INSIGHT_MENU_CHAPTERS)[number] }) {
  if (chapter === "na") return <span aria-hidden="true" className="font-[var(--font-inter)] text-[12px] font-bold tracking-[-.01em]">US</span>;
  return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{CHAPTER_ICON_PATHS[chapter]}</svg>;
}

function InsightsMenu({ latestArticle, publishedArticleSlugs, active }: InsightsNavigation & { active: boolean }) {
  const publishedArticleSlugSet = new Set(publishedArticleSlugs);
  const visibleInsightChapters = INSIGHT_MENU_CHAPTERS.filter((chapter) =>
    CHAPTER_ARTICLES[chapter].some((slug) => publishedArticleSlugSet.has(slug)),
  );

  return <>
    <MenuColumn>
      {visibleInsightChapters.map((chapter) => <MenuLink key={chapter} href={insightChapterHref(chapter)} onClick={(event) => switchInsightChapterInPlace(event, insightChapterHref(chapter))} title={CHAPTER_ARTICLE_TAGS[chapter]} marker={<ChapterIcon chapter={chapter} />} />)}
    </MenuColumn>
    <MenuColumn bordered>
      <MenuLink href="/resources" title="補助與資源" marker={<FileIcon />} />
      <MenuLink href="https://tradepiloter.com" title={<>TradePilot - 線上報關工具 <span aria-hidden="true" className="ml-1 text-[12px] opacity-60">↗</span></>} marker={<TradeIcon />} external />
      <MenuMoreLink href="/insights">看所有文章 →</MenuMoreLink>
    </MenuColumn>
    <MenuRail>
      {latestArticle && <Link href={`/insights/${latestArticle.slug}`} className="group block">{active && <div className="relative mb-3 aspect-video overflow-hidden"><TieredImage src={latestArticle.image} alt={latestArticle.title} sizes="268px" className="absolute inset-0 h-full w-full object-cover" /></div>}<b className="block text-[15px] font-[650] leading-[1.5] transition-colors group-hover:text-sky">{latestArticle.title}</b><span className="mt-[6px] block text-[12.5px] text-tx3">{latestArticle.date} · {latestArticle.readTime}</span></Link>}
    </MenuRail>
  </>;
}

function AboutMenu() {
  return <>
    <MenuColumn>
      {ABOUT_MENU_ITEMS.slice(0, 2).map((item) => <AboutMenuLink key={item.num} {...item} />)}
    </MenuColumn>
    <MenuColumn bordered>
      {ABOUT_MENU_ITEMS.slice(2).map((item) => <AboutMenuLink key={item.num} {...item} />)}
    </MenuColumn>
    <MenuRail>
      <FeatureTile href="/about/aaron-yu" icon={<PenIcon size={16} />} title="創辦人專欄" body="跨境市場、通路與法規的第一手觀察" action="閱讀專欄" />
    </MenuRail>
  </>;
}

function AboutMenuLink({ href, title, num }: (typeof ABOUT_MENU_ITEMS)[number]) {
  return <MenuLink href={href} title={title} marker={<span className="num text-[13px] font-bold">{num}</span>} />;
}

function MobileGroup({ item, open, onToggle, onClose, insightsNavigation }: { item: { key: MenuKey; label: string }; open: boolean; onToggle: () => void; onClose: () => void; insightsNavigation: InsightsNavigation }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const height = useSpring(0);

  useLayoutEffect(() => {
    height.to(open ? contentRef.current?.scrollHeight ?? 0 : 0, { response: 0.4 });
  }, [height, open]);

  return <div className="border-b border-bd">
    <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={`mobile-${item.key}`} className="flex w-full cursor-pointer items-center justify-between px-4 py-[14px] text-left text-[16px] font-semibold">
      {item.label}<svg className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" /></svg>
    </button>
    <div id={`mobile-${item.key}`} style={{ height: height.value }} className="overflow-hidden"><div ref={contentRef}><MobileMenuContent itemKey={item.key} onClose={onClose} insightsNavigation={insightsNavigation} /></div></div>
  </div>;
}

function MobileSubLink({ href, title, marker, external = false, onClose, onNavigate }: { href: string; title: ReactNode; marker?: ReactNode; external?: boolean; onClose: () => void; onNavigate?: (event: MouseEvent<HTMLAnchorElement>) => void }) {
  const content = <>{marker && <MenuMarker>{marker}</MenuMarker>}<span>{title}</span></>;
  const className = `group flex items-center ${marker ? "gap-2" : ""} border-b border-bd px-7 py-[10px] text-[14.5px] text-tx2 active:bg-black/[.07]`;
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClose} className={className}>{content}</a>
    : <Link href={href} onClick={(event) => { onNavigate?.(event); onClose(); }} className={className}>{content}</Link>;
}

function MobileMenuContent({ itemKey, onClose, insightsNavigation }: { itemKey: MenuKey; onClose: () => void; insightsNavigation: InsightsNavigation }) {
  if (itemKey === "services") return <>
    <MobileSubLink href="/services/product-testing" title="市場探查" marker={<CompassIcon />} onClose={onClose} />
    <MobileSubLink href="/services/consignment" title="寄賣" marker={<TrendIcon />} onClose={onClose} />
    <MobileSubLink href="/services/localization" title="公司落地" marker={<BuildingIcon />} onClose={onClose} />
    <MobileSubLink href="/services/call-center" title="海外客服" marker={<HeadsetIcon />} onClose={onClose} />
    <MobileSubLink href="/services/north-america" title="北美通路" marker={<span className="font-[var(--font-inter)] text-[12px] font-bold tracking-[-.01em]">US</span>} onClose={onClose} />
    <MobileSubLink href="/services" title="四章總覽" marker={<ListIcon />} onClose={onClose} />
  </>;
  if (itemKey === "advanced") return <>
    <MobileSubLink href="/services/optimize" title="運營優化" onClose={onClose} />
    <MobileSubLink href="/services/methodology" title="鹿飛方法論" onClose={onClose} />
    <MobileSubLink href="/assess" title="2 分鐘處境比對" onClose={onClose} />
  </>;
  if (itemKey === "cases") return <>{CASES.map((caseItem) => <MobileSubLink key={caseItem.slug} href={`/cases/${caseItem.slug}`} title={caseItem.title} marker={<span className="num whitespace-nowrap text-[13px] font-bold">{caseItem.num}</span>} onClose={onClose} />)}<MobileSubLink href="/cases" title="看所有案例 →" onClose={onClose} /></>;
  if (itemKey === "about") return <>{ABOUT_MENU_ITEMS.map((item) => <MobileSubLink key={item.num} href={item.href} title={item.title} marker={<span className="num text-[13px] font-bold">{item.num}</span>} onClose={onClose} />)}</>;
  const publishedArticleSlugSet = new Set(insightsNavigation.publishedArticleSlugs);
  const visibleInsightChapters = INSIGHT_MENU_CHAPTERS.filter((chapter) =>
    CHAPTER_ARTICLES[chapter].some((slug) => publishedArticleSlugSet.has(slug)),
  );
  return <>
    {visibleInsightChapters.map((chapter) => <MobileSubLink key={chapter} href={insightChapterHref(chapter)} title={CHAPTER_ARTICLE_TAGS[chapter]} marker={<ChapterIcon chapter={chapter} />} onClose={onClose} onNavigate={(event) => switchInsightChapterInPlace(event, insightChapterHref(chapter))} />)}
    <MobileSubLink href="/resources" title="補助與資源" marker={<FileIcon />} onClose={onClose} />
    <MobileSubLink href="https://tradepiloter.com" title={<>TradePilot - 線上報關工具 <span aria-hidden="true" className="ml-1 text-[12px] opacity-60">↗</span></>} marker={<TradeIcon />} external onClose={onClose} />
    <MobileSubLink href="/insights" title="看所有文章 →" onClose={onClose} />
  </>;
}

function MessageBoxTrigger({ className = "", onOpen }: { className?: string; onOpen?: () => void }) {
  const { open } = useMessageBox();
  return <button type="button" className={`bg-gold px-4 py-[9px] text-[14px] font-semibold text-navy hover:bg-gold-l ${className}`} onClick={() => { open(); onOpen?.(); }}>聊聊你的產品 →</button>;
}
