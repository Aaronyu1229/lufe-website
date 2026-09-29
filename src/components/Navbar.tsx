"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { useMessageBox } from "./MessageBox";
import { useSpring } from "@/lib/motion";
import { articles, getArticleImage } from "@/data/articles";
import { CASES } from "@/data/cases";
import { STAGES, STAGE_ORDER } from "@/data/services";

type MenuKey = "services" | "cases" | "insights" | "about";

const NAV_HEIGHT = 64;

const navItems: ReadonlyArray<{ key: MenuKey; label: string }> = [
  { key: "services", label: "服務" },
  { key: "cases", label: "案例" },
  { key: "insights", label: "洞察" },
  { key: "about", label: "關於我們" },
];

function pathnameHasDarkHero(pathname: string): boolean {
  if (["/", "/about", "/insights", "/field-notes", "/assess"].includes(pathname)) return true;
  if (pathname === "/resources" || pathname === "/resources/subsidies") return true;
  return pathname.startsWith("/services") || pathname.startsWith("/cases");
}

export function Navbar() {
  const pathname = usePathname() ?? "";
  const darkHero = pathnameHasDarkHero(pathname);
  const [scrolledPastHero, setScrolledPastHero] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey | null>(null);
  const [megaOpen, setMegaOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<MenuKey | null>(null);
  const [megaOrigin, setMegaOrigin] = useState(0);
  const headerRef = useRef<HTMLElement>(null);
  const panelRefs = useRef<Partial<Record<MenuKey, HTMLDivElement>>>({});
  const closeTimer = useRef<number | undefined>(undefined);
  const megaReveal = useSpring(0, { precision: 0.002 });
  const megaHeight = useSpring(0);
  const mobileReveal = useSpring(0, { precision: 0.002 });

  const lightGlass = !darkHero || scrolledPastHero;

  function clearClose() {
    if (closeTimer.current !== undefined) window.clearTimeout(closeTimer.current);
    closeTimer.current = undefined;
  }

  function closeMega(delay = 180) {
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
    mobileReveal.to(0, { response: 0.3 });
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
    mobileReveal.to(1, { response: 0.35 });
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
    const closeOnScroll = () => closeMega(0);
    const closeOnPointerDown = (event: PointerEvent) => {
      if (headerRef.current?.contains(event.target as Node)) return;
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
    megaHeight.to(panel.scrollHeight, { response: 0.35 });
  }, [activeMenu, megaOpen, megaHeight]);

  const menuOpacity = megaReveal.value;
  const menuScale = 0.92 + menuOpacity * 0.08;
  const mobileOpacity = mobileReveal.value;

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-[100]" onMouseLeave={() => closeMega()}>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-[200] focus:bg-gold focus:px-4 focus:py-2 focus:text-[14.5px] focus:font-semibold focus:text-navy">
        跳到主要內容
      </a>

      <nav className={`relative transition-colors duration-300 ${lightGlass ? "lufe-glass-light text-tx" : "lufe-glass-dark text-white"}`} aria-label="主要導航">
        <div className="relative mx-auto flex h-[64px] max-w-[1200px] items-center justify-between gap-4 px-5 md:px-10">
          <Link href="/" className="flex items-center gap-2.5 text-[17px] font-semibold">
            <Image src={lightGlass ? "/images/logo/logo-mark-navy.png" : "/images/logo/logo-mark-white.png"} alt="鹿飛 LUFÉ" width={26} height={26} priority />
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

      <div
        id="desktop-mega-menu"
        className="lufe-glass-panel absolute left-1/2 top-[64px] hidden w-[min(1120px,calc(100vw-24px))] overflow-hidden text-tx min-[900px]:block"
        style={{
          height: megaHeight.value,
          opacity: menuOpacity,
          pointerEvents: megaOpen ? "auto" : "none",
          transform: `translateX(-50%) scaleY(${menuScale})`,
          transformOrigin: `${megaOrigin}px top`,
          visibility: menuOpacity > 0.01 ? "visible" : "hidden",
        }}
        onMouseEnter={clearClose}
        onMouseLeave={() => closeMega()}
      >
        {navItems.map((item) => (
          <MegaPane
            key={item.key}
            itemKey={item.key}
            active={activeMenu === item.key && megaOpen}
            setRef={(node) => {
              if (node) panelRefs.current[item.key] = node;
            }}
          />
        ))}
      </div>

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
          <MobileGroup key={item.key} item={item} open={mobileGroup === item.key} onToggle={() => setMobileGroup((current) => current === item.key ? null : item.key)} onClose={closeMobile} />
        ))}
        <MessageBoxTrigger className="m-3 flex w-[calc(100%-24px)] justify-center" onOpen={closeMobile} />
      </div>
    </header>
  );
}

function MegaPane({ itemKey, active, setRef }: { itemKey: MenuKey; active: boolean; setRef: (node: HTMLDivElement | null) => void }) {
  return (
    <div ref={setRef} aria-hidden={!active} className={`absolute inset-x-0 top-0 grid gap-6 px-7 pb-6 pt-[26px] transition-opacity duration-150 ${active ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}>
      {itemKey === "services" && <ServicesMenu />}
      {itemKey === "cases" && <CasesMenu />}
      {itemKey === "insights" && <InsightsMenu />}
      {itemKey === "about" && <AboutMenu />}
    </div>
  );
}

function MenuColumn({ label, children }: { label: string; children: ReactNode }) {
  return <div><p className="mb-[10px] text-[11.5px] font-bold tracking-[.02em] text-gold-d">{label}</p>{children}</div>;
}

function MenuLink({ href, title, desc, external = false }: { href: string; title: string; desc?: string; external?: boolean }) {
  const content = <><b className="block text-[14.5px] font-semibold transition-colors group-hover:text-sky">{title}</b>{desc && <span className="text-[12.5px] text-tx3">{desc}</span>}</>;
  return external ? <a href={href} target="_blank" rel="noopener noreferrer" className="group block py-[6px]">{content}</a> : <Link href={href} className="group block py-[6px]">{content}</Link>;
}

function ServicesMenu() {
  return <div className="grid grid-cols-4 gap-6">
    <MenuColumn label="01 · 產品適配性 · 勝率"><MenuLink href="/services#pillar-fit" title="支柱總覽" desc="這個市場真的要你嗎？" /><MenuLink href="/services/market-assessment" title="市場機會評估" desc="2–4 週搞清楚值不值得去" /><MenuLink href="/services/product-testing" title="小批量產品測試" desc="真實消費者用錢投票" /><MenuLink href="/services/methodology" title="MBCPR 決策框架" desc="Go / No-Go 五維矩陣" /></MenuColumn>
    <MenuColumn label="02 · 通路銷售力 · 潛力"><MenuLink href="/services#pillar-channel" title="支柱總覽" desc="上得了架，還要賣得動" /><MenuLink href="/services/channel-entry" title="通路進入與媒合" desc="北美連鎖 + 東南亞通路" /><MenuLink href="/services#pillar-channel" title="展會與加盟佈局" desc="食品 / 電子 / 加盟展" /><MenuLink href="/services#pillar-channel" title="AI 集客引擎" desc="SEO + AI 搜尋佈局" /></MenuColumn>
    <MenuColumn label="03 · 團隊體質 · 成功率"><MenuLink href="/services#pillar-team" title="支柱總覽" desc="進得去，還要留得下" /><MenuLink href="/services/localization" title="海外團隊建置" desc="當地人才、落地合規" /><MenuLink href="/services/optimize" title="運營優化方案" desc="已在海外的進階方案" /><MenuLink href="/services#pillar-team" title="海外營運系統五階" desc="Notion + AI 數位員工" /></MenuColumn>
    <MenuColumn label="工具與入口"><MenuLink href="/assess" title="2 分鐘處境比對" desc="跟哪個案例最像" /><MenuLink href="/services" title="三支柱總覽" desc="一頁看完整方法論" /><MenuLink href="/resources" title="補助與活動" desc="政府補助 + 現場紀錄" /><MenuLink href="https://tradepiloter.com" title="TradePilot 關稅工具" desc="免費 HS code 查詢" external /></MenuColumn>
  </div>;
}

function CasesMenu() {
  return <div className="grid grid-cols-[2fr_1fr] gap-6">
    <div><p className="mb-[10px] text-[11.5px] font-bold tracking-[.02em] text-gold-d">精選案例</p><div className="grid grid-cols-2 gap-x-6 gap-y-1">
      {CASES.map((caseItem) => <Link key={caseItem.slug} href={`/cases/${caseItem.slug}`} className="group grid grid-cols-[70px_1fr] items-baseline gap-2 py-2"><span className="num text-[20px] text-gold-d">{caseItem.num}</span><span><b className="block text-[14px] font-semibold group-hover:text-sky">{caseItem.title}</b><span className="text-[12px] text-tx3">{caseItem.tags.map((tag) => tag.label).join(" · ")}</span></span></Link>)}
    </div></div>
    <div className="border-l border-bd pl-6"><p className="mb-[10px] text-[11.5px] font-bold tracking-[.02em] text-gold-d">分類瀏覽</p><p className="text-[13px] text-tx2">按產業</p><p className="mb-[10px] text-[14px] text-tx2">食品 · 電子 · 服飾 · 餐飲</p><p className="text-[13px] text-tx2">按市場</p><p className="mb-2 text-[14px] text-tx2">北美 · 東南亞</p><Link href="/cases" className="text-[13.5px] font-semibold text-sky">看所有案例 →</Link></div>
  </div>;
}

function InsightsMenu() {
  const latestArticle = articles[0];
  const categories = [["🇵🇭 菲律賓", "菲律賓"], ["🇮🇩 印尼", "印尼"], ["🌏 東南亞趨勢", "東南亞趨勢"], ["🌎 北美市場", "北美市場"], ["🎯 出海實戰", "出海實戰"], ["🧠 企業體質", "企業體質"]] as const;
  return <div className="grid grid-cols-[1fr_1fr_1.1fr] gap-6">
    <MenuColumn label="主題分類">{categories.map(([label, category]) => <MenuLink key={category} href={`/insights?cat=${encodeURIComponent(category)}`} title={label} />)}</MenuColumn>
    <MenuColumn label="其他內容"><MenuLink href="/resources" title="補助與活動" desc="政府補助 + 現場紀錄" /><MenuLink href="/field-notes" title="現場紀錄" desc="活動、演講、媒體露出" /><MenuLink href="https://tradepiloter.com" title="TradePilot 關稅工具" external /><MenuLink href="/services/methodology" title="鹿飛方法論" /><MenuLink href="/insights" title="看所有文章" /></MenuColumn>
    <div className="border-l border-bd pl-6"><p className="mb-[10px] text-[11.5px] font-bold tracking-[.02em] text-gold-d">最新文章</p>{latestArticle && <Link href={`/insights/${latestArticle.slug}`} className="group"><div className="relative mb-2 aspect-video overflow-hidden"><Image src={getArticleImage(latestArticle)} alt={latestArticle.title} fill sizes="360px" className="object-cover" /></div><b className="block text-[14px] font-semibold leading-[1.5] group-hover:text-sky">{latestArticle.title}</b><span className="text-[12px] text-tx3">{latestArticle.date} · {latestArticle.readTime}</span></Link>}</div>
  </div>;
}

function AboutMenu() {
  return <div className="grid grid-cols-[1fr_1fr_1.1fr] gap-6">
    <MenuColumn label="認識鹿飛"><MenuLink href="/about#story" title="創辦故事" desc="我們為什麼做這件事" /><MenuLink href="/about#team" title="團隊組成" desc="台灣核心團隊 + 全球節點" /><MenuLink href="/about#how-we-work" title="我們怎麼合作" desc="你會得到什麼樣的陪跑" /></MenuColumn>
    <MenuColumn label="立場與網絡"><MenuLink href="/about#network" title="合作夥伴網絡" desc="北美 / 東南亞 / 全球物流" /><MenuLink href="/about#philosophy" title="品牌理念" desc="我們相信的事" /><MenuLink href="/about#what-we-dont-do" title="我們不做什麼" desc="誠實的邊界" /></MenuColumn>
    <div className="border-l border-bd pl-6"><p className="mb-[10px] text-[11.5px] font-bold tracking-[.02em] text-gold-d">創辦人</p><Link href="/about" className="group grid grid-cols-[52px_1fr] items-center gap-3"><span className="grid h-[52px] w-[52px] place-items-center bg-gold font-bold text-navy">AY</span><span><b className="block text-[14px] font-semibold group-hover:text-sky">Aaron Yu</b><small className="block text-[12px] text-gold-d">鹿飛 LUFÉ 創辦人</small><small className="block text-[12px] text-tx3">42+ 年國際物流實戰<br />500+ 出口案件 · 30+ 國家</small></span></Link></div>
  </div>;
}

function MobileGroup({ item, open, onToggle, onClose }: { item: { key: MenuKey; label: string }; open: boolean; onToggle: () => void; onClose: () => void }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const height = useSpring(0);

  useLayoutEffect(() => {
    height.to(open ? contentRef.current?.scrollHeight ?? 0 : 0, { response: 0.4 });
  }, [height, open]);

  return <div className="border-b border-bd">
    <button type="button" onClick={onToggle} aria-expanded={open} aria-controls={`mobile-${item.key}`} className="flex w-full cursor-pointer items-center justify-between px-4 py-[14px] text-left text-[16px] font-semibold">
      {item.label}<svg className={`transition-transform duration-150 ${open ? "rotate-180" : ""}`} width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" /></svg>
    </button>
    <div id={`mobile-${item.key}`} style={{ height: height.value }} className="overflow-hidden"><div ref={contentRef}><MobileMenuContent itemKey={item.key} onClose={onClose} /></div></div>
  </div>;
}

function MobileSubLink({ href, title, onClose }: { href: string; title: string; onClose: () => void }) {
  return <Link href={href} onClick={onClose} className="block border-b border-bd px-7 py-[10px] text-[14.5px] text-tx2 active:bg-black/[.07]">{title}</Link>;
}

function MobileMenuContent({ itemKey, onClose }: { itemKey: MenuKey; onClose: () => void }) {
  if (itemKey === "services") return <><p className="mb-1 mt-1 px-7 text-[11px] font-semibold tracking-[.05em] text-tx2">完整路徑</p>{STAGE_ORDER.map((slug) => <MobileSubLink key={slug} href={`/services/${slug}`} title={STAGES[slug].title} onClose={onClose} />)}<p className="mb-1 mt-3 px-7 text-[11px] font-semibold tracking-[.05em] text-tx2">進階方案</p><MobileSubLink href="/services/optimize" title="運營優化方案" onClose={onClose} /><MobileSubLink href="/services/methodology" title="鹿飛方法論" onClose={onClose} /><MobileSubLink href="/services" title="服務總覽" onClose={onClose} /></>;
  if (itemKey === "cases") return <>{CASES.map((caseItem) => <MobileSubLink key={caseItem.slug} href={`/cases/${caseItem.slug}`} title={`${caseItem.num} ${caseItem.title}`} onClose={onClose} />)}<MobileSubLink href="/cases" title="看所有案例" onClose={onClose} /></>;
  if (itemKey === "about") return <><MobileSubLink href="/about#story" title="創辦故事" onClose={onClose} /><MobileSubLink href="/about#team" title="團隊組成" onClose={onClose} /><MobileSubLink href="/about#how-we-work" title="我們怎麼合作" onClose={onClose} /><MobileSubLink href="/about#network" title="合作夥伴網絡" onClose={onClose} /><MobileSubLink href="/about#what-we-dont-do" title="我們不做什麼" onClose={onClose} /></>;
  return <><MobileSubLink href="/insights" title="所有文章" onClose={onClose} /><MobileSubLink href="/insights?cat=東南亞趨勢" title="🌏 東南亞趨勢" onClose={onClose} /><MobileSubLink href="/insights?cat=北美市場" title="🌎 北美市場" onClose={onClose} /><MobileSubLink href="/insights?cat=出海實戰" title="🎯 出海實戰" onClose={onClose} /><MobileSubLink href="/insights?cat=企業體質" title="🧠 企業體質" onClose={onClose} /><MobileSubLink href="/field-notes" title="現場紀錄" onClose={onClose} /><MobileSubLink href="/resources" title="補助與活動" onClose={onClose} /></>;
}

function MessageBoxTrigger({ className = "", onOpen }: { className?: string; onOpen?: () => void }) {
  const { open } = useMessageBox();
  return <button type="button" className={`bg-gold px-4 py-[9px] text-[14px] font-semibold text-navy hover:bg-gold-l ${className}`} onClick={() => { open(); onOpen?.(); }}>聊聊你的產品 →</button>;
}
