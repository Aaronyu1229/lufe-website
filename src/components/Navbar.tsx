"use client";

import {
  createContext,
  useEffect,
  useContext,
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
import { LanguageToggle } from "@/components/i18n/LanguageToggle";
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
  type ArticleChapterKey,
} from "@/data/chapters";
import { navbarCriticalEn } from "@/i18n/en/navbar-critical";
import { navbarMenuEn } from "@/i18n/en/navbar-menu";
import { navbarCriticalZh, type NavbarCriticalCopy, type NavbarMenuKey } from "@/i18n/zh/navbar-critical";
import { navbarMenuZh, type NavbarMenuCopy } from "@/i18n/zh/navbar-menu";
import { localeFromPathname, localizedHref, stripLocale, type Locale } from "@/i18n/locale";

type MenuKey = NavbarMenuKey;

const NAV_HEIGHT = 64;

const INSIGHT_MENU_CHAPTERS = ["m1", "m3", "m9", "after", "na"] as const satisfies readonly ArticleChapterKey[];
const insightChapterHref = (chapter: ArticleChapterKey) => `/insights?cat=${chapter}#articles`;

/** On /insights itself a soft navigation keeps the page mounted, so swap the filter in place instead. */
function switchInsightChapterInPlace(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (stripLocale(window.location.pathname) !== "/insights") return;
  event.preventDefault();
  window.history.pushState(null, "", href);
  window.dispatchEvent(new PopStateEvent("popstate"));
  document.getElementById("articles")?.scrollIntoView({ behavior: "smooth" });
}
// Until it has articles, the customer-service chapter points at its service page instead of an empty filter.
const INSIGHT_CHAPTER_FALLBACK_HREF: Partial<Record<ArticleChapterKey, string>> = { after: "/services/call-center" };
// Chapters without articles stay out of the menu (a "0 篇" row reads as an empty site); they appear once an article is mapped.
const ABOUT_MENU_ITEMS = [
  { href: "/about#story", num: "01" },
  { href: "/about#team", num: "02" },
  { href: "/about#network", num: "03" },
  { href: "/about#philosophy", num: "04" },
] as const;

type NavbarCopy = {
  readonly locale: Locale;
  readonly critical: NavbarCriticalCopy;
  readonly menu: NavbarMenuCopy;
};

const NavbarCopyContext = createContext<NavbarCopy>({
  locale: "zh",
  critical: navbarCriticalZh,
  menu: navbarMenuZh,
});

function useNavbarCopy() {
  return useContext(NavbarCopyContext);
}

export function normalizePathname(pathname: string | null | undefined): string {
  if (!pathname || pathname === "/index") return "/";
  return stripLocale(pathname);
}

export function pathnameHasDarkHero(pathname: string): boolean {
  if (["/", "/about", "/contact", "/insights", "/assess", "/assess/result"].includes(pathname)) return true;
  if (pathname === "/resources" || pathname === "/resources/subsidies") return true;
  return pathname.startsWith("/services") || pathname.startsWith("/cases") || pathname.startsWith("/about/");
}

type InsightsNavigation = {
  readonly latestArticle?: InsightCard;
  readonly latestArticleEn?: InsightCard;
  readonly publishedArticleSlugs: readonly string[];
};

export function Navbar({
  children,
  latestArticle,
  latestArticleEn,
  publishedArticleSlugs = [],
}: {
  readonly children?: ReactNode;
  readonly latestArticle?: InsightCard;
  readonly latestArticleEn?: InsightCard;
  readonly publishedArticleSlugs?: readonly string[];
}) {
  const rawPathname = usePathname() ?? "/";
  const pathname = normalizePathname(rawPathname);
  const locale = localeFromPathname(rawPathname);
  const critical = locale === "en" ? navbarCriticalEn : navbarCriticalZh;
  const menu = locale === "en" ? navbarMenuEn : navbarMenuZh;
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
    <NavbarCopyContext.Provider value={{ locale, critical, menu }}>
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-[100]" onMouseLeave={() => closeMega()}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[200] focus:bg-gold focus:px-4 focus:py-2 focus:text-[14.5px] focus:font-semibold focus:text-navy">
        {menu.header.skipToContent}
      </a>

      <nav className={`relative transition-colors duration-300 ${transparentOverHero ? "navbar-over-hero" : lightGlass ? "lufe-glass-light text-tx" : "lufe-glass-dark navbar-scrolled text-white"}`} aria-label={menu.header.navAriaLabel}>
        <div className="lufe-container relative flex h-[64px] items-center justify-between gap-4">
          <Link href={localizedHref(locale, "/")} className="lufe-deer-trigger flex items-center gap-2.5 text-[17px] font-semibold">
            <Image className="lufe-deer" src={lightGlass ? "/images/logo/logo-mark-navy.png" : "/images/logo/logo-mark-white.png"} alt="" width={26} height={26} priority />
            <span>{critical.brandPrefix}<span className={lightGlass ? "text-gold-d" : "text-gold"}>É</span></span>
          </Link>

          <div className="hidden min-[900px]:flex items-center gap-[6px] text-[14px]">
            {critical.navItems.map((item) => (
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
            <LanguageToggle pathname={rawPathname} className="hidden px-2 text-[14px] font-semibold min-[900px]:inline-flex" />
            <MessageBoxTrigger className="hidden min-[900px]:inline-flex" />
            <button type="button" onClick={toggleMobile} aria-label={mobileOpen ? menu.header.mobileMenuClose : menu.header.mobileMenuOpen} aria-controls="mobile-navigation" aria-expanded={mobileOpen} className="flex h-10 w-10 cursor-pointer items-center justify-center min-[900px]:hidden">
              <span className="sr-only">{mobileOpen ? menu.header.mobileMenuClose : menu.header.mobileMenuOpen}</span>
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
        {critical.navItems.map((item) => (
          <MobileGroup key={item.key} item={item} open={mobileGroup === item.key} onToggle={() => setMobileGroup((current) => current === item.key ? null : item.key)} onClose={closeMobile} insightsNavigation={{ latestArticle, latestArticleEn, publishedArticleSlugs }} />
        ))}
        <LanguageToggle pathname={rawPathname} className="mx-3 mt-3 flex justify-center border border-bd py-2 text-[14px] font-semibold" />
        <MessageBoxTrigger className="m-3 flex w-[calc(100%-24px)] justify-center" onOpen={closeMobile} />
      </div>
      <button
        type="button"
        className={`lufe-mobile-cta ${scrolledPastHero ? "lufe-mobile-cta-visible" : ""}`}
        onClick={openMessageBox}
      >
        <span>{critical.mobileCtaLine}</span>
        <strong>{critical.mobileCtaAction}</strong>
      </button>
      <DelightLayer backToTopLabel={menu.header.backToTop} />
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
        {critical.navItems.map((item) => (
          <MegaPane
            key={item.key}
            itemKey={item.key}
            active={activeMenu === item.key && megaOpen}
            onMessageOpen={openMessageBox}
            insightsNavigation={{ latestArticle, latestArticleEn, publishedArticleSlugs }}
            setRef={(node) => {
              if (node) panelRefs.current[item.key] = node;
            }}
          />
        ))}
      </div>
    </>
    </NavbarCopyContext.Provider>
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

function MenuLabel({ children }: { children: ReactNode }) {
  return <p className="mb-1 text-[12px] font-semibold text-tx3">{children}</p>;
}

function chapterMenuParts(chapter: Exclude<ArticleChapterKey, "sub">, menu: NavbarMenuCopy): { readonly title: string; readonly month?: string } {
  return menu.insights.chapters[chapter];
}

function TradePilotMark() {
  return <Image src="/images/logo/partners/tradepilot-gold.png" alt="" width={20} height={20} />;
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
  const { locale } = useNavbarCopy();
  const content = <><MenuMarker>{marker}</MenuMarker><span className="min-w-0"><b className="block text-[15.5px] font-[650] tracking-[-.005em] transition-colors [@media(hover:hover)]:group-hover:text-sky">{title}</b>{desc && <span className="mt-0.5 block truncate text-[12.5px] text-tx2">{desc}</span>}</span></>;
  const className = "group -mx-3 grid grid-cols-[28px_minmax(0,1fr)] items-center gap-3 px-3 py-3 transition-[background-color,transform] duration-150 [@media(hover:hover)]:hover:bg-[rgba(58,107,132,.07)] active:scale-[.985]";

  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" className={className}>{content}</a>
    : <Link href={localizedHref(locale, href)} onClick={onClick} className={className}>{content}</Link>;
}

function MenuMoreLink({ href, children }: { href: string; children: ReactNode }) {
  const { locale } = useNavbarCopy();
  return <Link href={localizedHref(locale, href)} className="mt-2 inline-flex text-[13.5px] font-semibold text-sky hover:text-navy">{children}</Link>;
}

type FeatureTileProps = {
  icon: ReactNode;
  title: string;
  body: string;
  action: string;
} & ({ href: string; onClick?: never } | { href?: never; onClick: () => void });

function FeatureTile({ icon, title, body, action, ...props }: FeatureTileProps) {
  const { locale } = useNavbarCopy();
  const content = <>
    <span aria-hidden="true" className="grid h-8 w-8 place-items-center border border-gold/40 text-gold-d">{icon}</span>
    <b className="mt-4 block text-[16px] font-[650] text-tx">{title}</b>
    <span className="mt-1.5 block text-[13.5px] leading-[1.7] text-tx2">{body}</span>
    <span className="mt-4 inline-block text-[14px] font-semibold text-sky">{action} <span aria-hidden="true" className="inline-block transition-transform [@media(hover:hover)]:group-hover:translate-x-[3px]">→</span></span>
  </>;
  const className = "group block border border-bd bg-white p-5 text-left transition-[transform,border-color] duration-200 [@media(hover:hover)]:hover:-translate-y-0.5 [@media(hover:hover)]:hover:border-gold/50 active:scale-[.985]";

  return "href" in props && props.href
    ? <Link href={localizedHref(locale, props.href)} className={className}>{content}</Link>
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

function ServicesMenu() {
  const { menu } = useNavbarCopy();
  const copy = menu.services;

  return <>
    <MenuColumn>
      <MenuLink href="/services/product-testing" title={copy.marketTest} marker={<CompassIcon size={18} />} />
      <MenuLink href="/services/consignment" title={copy.consignment} marker={<TrendIcon size={18} />} />
      <MenuLink href="/services/localization" title={copy.companySetup} marker={<BuildingIcon size={18} />} />
      <MenuLink href="/services/call-center" title={copy.callCenter} marker={<HeadsetIcon size={18} />} />
    </MenuColumn>
    <MenuColumn bordered>
      <MenuLink href="/services/north-america" title={copy.northAmericaRetail} marker={<span className="font-[var(--font-inter)] text-[12px] font-bold tracking-[-.01em]">US</span>} />
      <div className="mt-[18px]"><MenuLink href="/services" title={copy.allFourChapters} marker={<ListIcon />} /></div>
    </MenuColumn>
    <MenuRail>
      <FeatureTile href="/services/product-testing" icon={<CompassIcon size={16} />} title={copy.featuredTitle} body={copy.featuredBody} action={copy.featuredAction} />
    </MenuRail>
  </>;
}

function AdvancedMenu({ onMessageOpen }: { onMessageOpen: () => void }) {
  const { menu } = useNavbarCopy();
  const copy = menu.advanced;

  return <>
    <MenuColumn>
      <MenuLink href="/services/optimize" title={copy.operationsOptimization} marker={<TrendIcon size={18} />} />
    </MenuColumn>
    <MenuColumn bordered>
      <MenuLink href="/services/methodology" title={copy.lufeMethod} desc={copy.methodDescription} marker={<BarsIcon />} />
      <MenuLink href="/assess" title={copy.situationCheck} marker={<ClockIcon size={18} />} />
    </MenuColumn>
    <MenuRail>
      <FeatureTile icon={<ClockIcon size={16} />} title={copy.featuredTitle} body={copy.featuredBody} action={copy.featuredAction} onClick={onMessageOpen} />
    </MenuRail>
  </>;
}

function CasesMenu() {
  const { menu } = useNavbarCopy();
  const copy = menu.cases;
  const caseColumns = [
    CASES.filter((_, index) => index === 0 || index === 2),
    CASES.filter((_, index) => index === 1 || index === 3),
  ] as const;

  return <>
    <MenuColumn>
      {caseColumns[0].map((caseItem) => <CaseMenuLink key={caseItem.slug} caseItem={caseItem} copy={copy.items[caseItem.slug]} />)}
    </MenuColumn>
    <MenuColumn bordered>
      {caseColumns[1].map((caseItem) => <CaseMenuLink key={caseItem.slug} caseItem={caseItem} copy={copy.items[caseItem.slug]} />)}
      <MenuMoreLink href="/cases">{copy.allCases}</MenuMoreLink>
    </MenuColumn>
    <MenuRail>
      <div className="flex flex-wrap gap-[6px]">
        {copy.tags.map((tag) => <CaseTagLink key={tag}>{tag}</CaseTagLink>)}
      </div>
      <div className="mt-[6px] flex flex-wrap gap-[6px]">
        {copy.markets.map((tag) => <CaseTagLink key={tag}>{tag}</CaseTagLink>)}
      </div>
      <div className="mt-4"><FeatureTile href="/assess" icon={<TargetIcon size={16} />} title={copy.featuredTitle} body={copy.featuredBody} action={copy.featuredAction} /></div>
    </MenuRail>
  </>;
}

function CaseMenuLink({ caseItem, copy }: { caseItem: (typeof CASES)[number]; copy: { readonly num: string; readonly title: string } }) {
  return <MenuLink href={`/cases/${caseItem.slug}`} title={copy.title} marker={<span className="num whitespace-nowrap text-[13px] font-bold">{copy.num}</span>} />;
}

function CaseTagLink({ children }: { children: ReactNode }) {
  const { locale } = useNavbarCopy();
  return <Link href={localizedHref(locale, "/cases")} className="border border-bd bg-white px-2.5 py-[5px] text-[12.5px] text-tx2 hover:border-sky hover:text-sky">{children}</Link>;
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

type InsightMenuChapter = { readonly chapter: (typeof INSIGHT_MENU_CHAPTERS)[number]; readonly fallbackHref?: string };

function insightMenuChapters(publishedArticleSlugSet: ReadonlySet<string>): readonly InsightMenuChapter[] {
  return INSIGHT_MENU_CHAPTERS.flatMap((chapter): InsightMenuChapter[] => {
    if (CHAPTER_ARTICLES[chapter].some((slug) => publishedArticleSlugSet.has(slug))) return [{ chapter, fallbackHref: undefined }];
    const fallbackHref = INSIGHT_CHAPTER_FALLBACK_HREF[chapter];
    return fallbackHref ? [{ chapter, fallbackHref }] : [];
  });
}

function InsightsMenu({ latestArticle, latestArticleEn, publishedArticleSlugs, active }: InsightsNavigation & { active: boolean }) {
  const { critical, locale, menu } = useNavbarCopy();
  const publishedArticleSlugSet = new Set(publishedArticleSlugs);
  const menuChapters = insightMenuChapters(publishedArticleSlugSet);
  const latest = locale === "en" ? latestArticleEn : latestArticle;

  return <>
    <MenuColumn>
      <MenuLabel>{critical.insightMenuLabels.byChapter}</MenuLabel>
      {menuChapters.map(({ chapter, fallbackHref }) => {
        const { title, month } = chapterMenuParts(chapter, menu);
        return fallbackHref
          ? <MenuLink key={chapter} href={fallbackHref} title={<>{title}{month && <span className="ml-2 text-[12.5px] font-normal text-tx3">{month}</span>}</>} desc={menu.insights.fallbackDescription} marker={<ChapterIcon chapter={chapter} />} />
          : <MenuLink key={chapter} href={insightChapterHref(chapter)} onClick={(event) => switchInsightChapterInPlace(event, localizedHref(locale, insightChapterHref(chapter)))} title={<>{title}{month && <span className="ml-2 text-[12.5px] font-normal text-tx3">{month}</span>}</>} marker={<ChapterIcon chapter={chapter} />} />;
      })}
      <MenuMoreLink href="/insights">{menu.insights.allArticles}</MenuMoreLink>
    </MenuColumn>
    <MenuColumn bordered>
      <MenuLabel>{critical.insightMenuLabels.toolsAndResources}</MenuLabel>
      <MenuLink href="/resources" title={menu.insights.subsidiesAndResources} desc={menu.insights.subsidyDescription} marker={<FileIcon />} />
      <MenuLink href="https://tradepiloter.com" title={<>TradePilot<span aria-hidden="true" className="ml-1 text-[12px] opacity-60">↗</span></>} desc={menu.insights.tradePilotDescription} marker={<TradePilotMark />} external />
    </MenuColumn>
    <MenuRail>
      <MenuLabel>{critical.insightMenuLabels.latestArticles}</MenuLabel>
      {latest && <Link href={localizedHref(locale, `/insights/${latest.slug}`)} className="group mt-2 block"><div className="relative mb-3 aspect-video overflow-hidden bg-[rgba(26,26,46,.06)]">{active && <TieredImage src={latest.image} alt={latest.title} sizes="268px" className="absolute inset-0 h-full w-full object-cover" />}</div><b className="block text-[15px] font-[650] leading-[1.5] transition-colors group-hover:text-sky">{latest.title}</b><span className="mt-[6px] block text-[12.5px] text-tx3">{latest.date} · {latest.readTime}</span></Link>}
    </MenuRail>
  </>;
}

function AboutMenu() {
  const { menu } = useNavbarCopy();
  const copy = menu.about;

  return <>
    <MenuColumn>
      {ABOUT_MENU_ITEMS.slice(0, 2).map((item, index) => <AboutMenuLink key={item.num} {...item} title={copy.items[index]} />)}
    </MenuColumn>
    <MenuColumn bordered>
      {ABOUT_MENU_ITEMS.slice(2).map((item, index) => <AboutMenuLink key={item.num} {...item} title={copy.items[index + 2]} />)}
    </MenuColumn>
    <MenuRail>
      <FeatureTile href="/about/aaron-yu" icon={<PenIcon size={16} />} title={copy.founderColumn} body={copy.founderDescription} action={copy.founderAction} />
    </MenuRail>
  </>;
}

function AboutMenuLink({ href, title, num }: (typeof ABOUT_MENU_ITEMS)[number] & { readonly title: string }) {
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
  const { locale } = useNavbarCopy();
  const content = <>{marker && <MenuMarker>{marker}</MenuMarker>}<span>{title}</span></>;
  const className = `group flex items-center ${marker ? "gap-2" : ""} border-b border-bd px-7 py-[10px] text-[14.5px] text-tx2 active:bg-black/[.07]`;
  return external
    ? <a href={href} target="_blank" rel="noopener noreferrer" onClick={onClose} className={className}>{content}</a>
    : <Link href={localizedHref(locale, href)} onClick={(event) => { onNavigate?.(event); onClose(); }} className={className}>{content}</Link>;
}

function MobileChapterTitle({ chapter }: { chapter: Exclude<ArticleChapterKey, "sub"> }) {
  const { menu } = useNavbarCopy();
  const { title, month } = chapterMenuParts(chapter, menu);
  return <>{title}{month && <span className="ml-1.5 text-[12.5px] text-tx3">{month}</span>}</>;
}

function MobileMenuContent({ itemKey, onClose, insightsNavigation }: { itemKey: MenuKey; onClose: () => void; insightsNavigation: InsightsNavigation }) {
  const { menu, locale } = useNavbarCopy();
  if (itemKey === "services") return <>
    <MobileSubLink href="/services/product-testing" title={menu.services.marketTest} marker={<CompassIcon />} onClose={onClose} />
    <MobileSubLink href="/services/consignment" title={menu.services.consignment} marker={<TrendIcon />} onClose={onClose} />
    <MobileSubLink href="/services/localization" title={menu.services.companySetup} marker={<BuildingIcon />} onClose={onClose} />
    <MobileSubLink href="/services/call-center" title={menu.services.callCenter} marker={<HeadsetIcon />} onClose={onClose} />
    <MobileSubLink href="/services/north-america" title={menu.services.northAmericaRetail} marker={<span className="font-[var(--font-inter)] text-[12px] font-bold tracking-[-.01em]">US</span>} onClose={onClose} />
    <MobileSubLink href="/services" title={menu.services.allFourChapters} marker={<ListIcon />} onClose={onClose} />
  </>;
  if (itemKey === "advanced") return <>
    <MobileSubLink href="/services/optimize" title={menu.advanced.operationsOptimization} onClose={onClose} />
    <MobileSubLink href="/services/methodology" title={menu.advanced.lufeMethod} onClose={onClose} />
    <MobileSubLink href="/assess" title={menu.advanced.situationCheck} onClose={onClose} />
  </>;
  if (itemKey === "cases") return <>{CASES.map((caseItem) => {
    const copy = menu.cases.items[caseItem.slug];
    return <MobileSubLink key={caseItem.slug} href={`/cases/${caseItem.slug}`} title={copy.title} marker={<span className="num whitespace-nowrap text-[13px] font-bold">{copy.num}</span>} onClose={onClose} />;
  })}<MobileSubLink href="/cases" title={menu.cases.allCases} onClose={onClose} /></>;
  if (itemKey === "about") return <>{ABOUT_MENU_ITEMS.map((item, index) => <MobileSubLink key={item.num} href={item.href} title={menu.about.items[index]} marker={<span className="num text-[13px] font-bold">{item.num}</span>} onClose={onClose} />)}</>;
  const publishedArticleSlugSet = new Set(insightsNavigation.publishedArticleSlugs);
  return <>
    {insightMenuChapters(publishedArticleSlugSet).map(({ chapter, fallbackHref }) => fallbackHref
      ? <MobileSubLink key={chapter} href={fallbackHref} title={<MobileChapterTitle chapter={chapter} />} marker={<ChapterIcon chapter={chapter} />} onClose={onClose} />
      : <MobileSubLink key={chapter} href={insightChapterHref(chapter)} title={<MobileChapterTitle chapter={chapter} />} marker={<ChapterIcon chapter={chapter} />} onClose={onClose} onNavigate={(event) => switchInsightChapterInPlace(event, localizedHref(locale, insightChapterHref(chapter)))} />)}
    <MobileSubLink href="/insights" title={menu.insights.allArticles} onClose={onClose} />
    <MobileSubLink href="/resources" title={menu.insights.subsidiesAndResources} marker={<FileIcon />} onClose={onClose} />
    <MobileSubLink href="https://tradepiloter.com" title={<>TradePilot<span className="ml-1.5 text-[12.5px] text-tx3">{menu.insights.tradePilotDescription}</span><span aria-hidden="true" className="ml-1 text-[12px] opacity-60">↗</span></>} marker={<TradePilotMark />} external onClose={onClose} />
  </>;
}

function MessageBoxTrigger({ className = "", onOpen }: { className?: string; onOpen?: () => void }) {
  const { critical } = useNavbarCopy();
  const { open } = useMessageBox();
  return <button type="button" className={`bg-gold px-4 py-[9px] text-[14px] font-semibold text-navy hover:bg-gold-l ${className}`} onClick={() => { open(); onOpen?.(); }}>{critical.messageBoxTrigger}</button>;
}
