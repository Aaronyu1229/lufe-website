"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useMessageBox } from "./MessageBox";
import { STAGE_ORDER, STAGES } from "@/data/services";
import { CASES } from "@/data/cases";
import { articles, getArticleImage } from "@/data/articles";

type MenuKey = "services" | "cases" | "about" | "insights" | null;

interface NavItem {
  readonly key: Exclude<MenuKey, null>;
  readonly label: string;
  readonly href: string;
}

const navItems: readonly NavItem[] = [
  { key: "services", label: "服務", href: "/services" },
  { key: "cases", label: "案例", href: "/cases" },
  { key: "insights", label: "洞察", href: "/insights" },
  { key: "about", label: "關於我們", href: "/about" },
];

/**
 * Does this pathname render a navy first-screen hero?
 *
 * When true: navbar starts transparent over the hero, turns white on
 * scroll (50px+), mouse-enter, or mega-menu open.
 *
 * Prefix matching on /services and /cases covers every nested page
 * (stage, optimize, methodology, case detail — all have bg-navy heroes).
 * Insights is exact-match: /insights list is dark, but /insights/[slug]
 * article detail uses a light hero.
 */
function pathnameHasDarkHero(pathname: string): boolean {
  if (
    pathname === "/" ||
    pathname === "/about" ||
    pathname === "/insights" ||
    pathname === "/field-notes" ||
    pathname === "/assess"
  ) {
    return true;
  }
  if (pathname === "/resources" || pathname === "/resources/subsidies") return true;
  if (pathname.startsWith("/services")) return true;
  if (pathname.startsWith("/cases")) return true;
  return false;
}

export function Navbar() {
  const pathname = usePathname();
  const isDarkHero = pathnameHasDarkHero(pathname ?? "");
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimer = useRef<number | null>(null);

  const useDark = !isDarkHero || scrolled || hovered || activeMenu !== null;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mega menu on route change. Also reset `hovered` — when the user
  // clicks a nav link, their cursor is still physically over the navbar
  // on the new page, but React's onMouseEnter won't re-fire (no boundary
  // crossed). Without this reset, a dark-hero page would stay stuck on
  // the white navbar until the cursor leaves and re-enters the header.
  useEffect(() => {
    setActiveMenu(null);
    setMobileOpen(false);
    setHovered(false);
  }, [pathname]);

  const openMenu = (key: Exclude<MenuKey, null>) => {
    if (closeTimer.current) {
      window.clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setActiveMenu(key);
  };

  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => {
      setActiveMenu(null);
    }, 180);
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-100"
      onMouseEnter={() => {
        if (isDarkHero) setHovered(true);
      }}
      onMouseLeave={() => {
        if (isDarkHero) setHovered(false);
        scheduleClose();
      }}
    >
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200] focus:bg-gold focus:text-navy focus:px-4 focus:py-2 focus:text-[14.5px] focus:font-semibold"
      >
        跳到主要內容
      </a>

      {/* Utility bar — only on home, only when not scrolled */}
      <div
        className={`text-white/60 text-[11px] hidden md:block transition-all duration-300 ${
          scrolled || activeMenu !== null
            ? "opacity-0 h-0 overflow-hidden bg-transparent"
            : "opacity-100 h-[32px] bg-transparent border-b border-white/10"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between h-[32px]">
          <div className="flex items-center gap-5">
            <span className="hover:text-white transition-colors cursor-pointer">
              繁體中文
            </span>
            <span className="text-white/20">|</span>
            <span className="hover:text-white transition-colors cursor-pointer">
              English
            </span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href="mailto:hello@lufe.co"
              className="hover:text-white transition-colors"
            >
              hello@lufe.co
            </a>
            <span className="text-white/20">|</span>
            <a
              href="https://tradepiloter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              TradePilot 工具
            </a>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <nav
        className={`transition-all duration-300 ${
          useDark
            ? "bg-white/98 backdrop-blur-md shadow-sm"
            : "bg-transparent"
        }`}
        aria-label="主要導航"
      >
        <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between h-[64px]">
          <Link
            href="/"
            className={`flex items-center gap-2.5 font-sans font-bold text-[22px] tracking-[-0.5px] transition-colors duration-300 py-1.5 ${
              useDark ? "text-navy" : "text-white"
            }`}
          >
            <Image
              src={useDark ? "/images/logo/logo-mark-navy.png" : "/images/logo/logo-mark-white.png"}
              alt="鹿飛 LUFÉ"
              width={36}
              height={41}
              className="transition-opacity duration-300"
              priority
            />
            <span>鹿飛 LUF<span className={useDark ? "text-gold-d" : "text-gold"}>É</span></span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-[28px]">
            {navItems.map((item) => (
              <div
                key={item.key}
                onMouseEnter={() => openMenu(item.key)}
                onMouseLeave={scheduleClose}
                className="relative h-[64px] flex items-center"
              >
                <Link
                  href={item.href}
                  className={`text-[14.5px] font-medium transition-colors duration-300 py-2 ${
                    useDark
                      ? "text-tx hover:text-navy"
                      : "text-white/85 hover:text-white"
                  } ${activeMenu === item.key ? (useDark ? "text-gold-d" : "text-gold") : ""}`}
                >
                  {item.label}
                </Link>
              </div>
            ))}
          </div>

          <div className="hidden md:flex gap-2.5">
            <MessageBoxTrigger />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col items-center justify-center gap-1.5 w-11 h-11 -mr-2 cursor-pointer"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "關閉選單" : "開啟選單"}
            aria-expanded={mobileOpen}
          >
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                useDark ? "bg-navy" : "bg-white"
              } ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                useDark ? "bg-navy" : "bg-white"
              } ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-0.5 transition-all duration-300 ${
                useDark ? "bg-navy" : "bg-white"
              } ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
            />
          </button>
        </div>

        {/* Desktop mega-menu panel */}
        <AnimatePresence>
          {activeMenu && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="hidden md:block absolute top-full left-0 right-0 bg-white border-t border-bd shadow-xl"
              onMouseEnter={() => {
                if (closeTimer.current) window.clearTimeout(closeTimer.current);
              }}
              onMouseLeave={scheduleClose}
            >
              <div className="max-w-[1400px] mx-auto px-5 md:px-10 py-10">
                {activeMenu === "services" && <ServicesMenu />}
                {activeMenu === "cases" && <CasesMenu />}
                {activeMenu === "about" && <AboutMenu />}
                {activeMenu === "insights" && <InsightsMenu />}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="md:hidden fixed inset-0 top-[64px] bg-black/50 z-40"
                onClick={() => setMobileOpen(false)}
              />
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="md:hidden bg-white border-t border-bd px-5 pb-5 relative z-50 overflow-y-auto max-h-[calc(100vh-64px)]"
              >
                <MobileMenu onClose={() => setMobileOpen(false)} />
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}

/* ───────── Mega menu contents ───────── */

function MenuColumn({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-gold-d/80 mb-4">
        {label}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
}

function MenuLink({
  href,
  title,
  desc,
  external = false,
}: {
  href: string;
  title: string;
  desc?: string;
  external?: boolean;
}) {
  const content = (
    <>
      <div className="text-[15.5px] font-semibold text-tx group-hover:text-gold transition-colors">
        {title}
      </div>
      {desc && (
        <div className="text-[13px] text-tx3 font-normal mt-0.5 leading-[1.5]">
          {desc}
        </div>
      )}
    </>
  );
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block py-1"
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className="group block py-1">
      {content}
    </Link>
  );
}

function ServicesMenu() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-3">
        <MenuColumn label="01 · 產品適配性 · 勝率">
          <MenuLink
            href="/services#pillar-fit"
            title="支柱總覽"
            desc="這個市場真的要你嗎？"
          />
          <MenuLink
            href="/services/market-assessment"
            title="市場機會評估"
            desc="2–4 週搞清楚值不值得去"
          />
          <MenuLink
            href="/services/product-testing"
            title="小批量產品測試"
            desc="真實消費者用錢投票"
          />
          <MenuLink
            href="/services/methodology"
            title="MBCPR 決策框架"
            desc="Go / No-Go 五維矩陣"
          />
        </MenuColumn>
      </div>
      <div className="col-span-3">
        <MenuColumn label="02 · 通路銷售力 · 潛力">
          <MenuLink
            href="/services#pillar-channel"
            title="支柱總覽"
            desc="上得了架，還要賣得動"
          />
          <MenuLink
            href="/services/channel-entry"
            title="通路進入與媒合"
            desc="北美連鎖 + 東南亞通路"
          />
          <MenuLink
            href="/services#pillar-channel"
            title="展會與加盟佈局"
            desc="食品 / 電子 / 加盟展"
          />
          <MenuLink
            href="/services#pillar-channel"
            title="AI 集客引擎"
            desc="SEO + AI 搜尋佈局"
          />
        </MenuColumn>
      </div>
      <div className="col-span-3">
        <MenuColumn label="03 · 團隊體質 · 成功率">
          <MenuLink
            href="/services#pillar-team"
            title="支柱總覽"
            desc="進得去，還要留得下"
          />
          <MenuLink
            href="/services/localization"
            title="海外團隊建置"
            desc="當地人才、落地合規"
          />
          <MenuLink
            href="/services/optimize"
            title="運營優化方案"
            desc="已在海外的進階方案"
          />
          <MenuLink
            href="/services#pillar-team"
            title="海外營運系統五階"
            desc="Notion + AI 數位員工"
          />
        </MenuColumn>
      </div>
      <div className="col-span-3">
        <MenuColumn label="工具與入口">
          <MenuLink
            href="/assess"
            title="2 分鐘處境比對"
            desc="跟哪個案例最像"
          />
          <MenuLink
            href="/services"
            title="三支柱總覽"
            desc="一頁看完整方法論"
          />
          <MenuLink
            href="/resources"
            title="補助與活動"
            desc="政府補助 + 現場紀錄"
          />
          <MenuLink
            href="https://tradepiloter.com"
            title="TradePilot 關稅工具"
            desc="免費 HS code 查詢"
            external
          />
        </MenuColumn>
      </div>
    </div>
  );
}

function CasesMenu() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-8">
        <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-gold-d/80 mb-4">
          精選案例
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
          {CASES.map((c) => (
            <Link
              key={c.slug}
              href={`/cases/${c.slug}`}
              className="group flex items-start gap-3 py-2"
            >
              <div className="font-heading text-[21px] text-gold-d leading-none font-semibold shrink-0 min-w-[60px] tabular-nums">
                {c.num}
              </div>
              <div className="min-w-0">
                <div className="text-[15px] font-semibold text-tx group-hover:text-gold transition-colors leading-tight mb-0.5">
                  {c.title}
                </div>
                <div className="text-[11px] text-tx3">
                  {c.tags.map((t) => t.label).join(" · ")}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="col-span-4 border-l border-bd pl-8">
        <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-gold-d/80 mb-4">
          分類瀏覽
        </div>
        <div className="space-y-2 mb-5">
          <div className="text-[13px] text-tx3">按產業</div>
          <div className="text-[14.5px] text-tx2">
            食品 · 電子 · 服飾 · 餐飲
          </div>
        </div>
        <div className="space-y-2 mb-6">
          <div className="text-[13px] text-tx3">按市場</div>
          <div className="text-[14.5px] text-tx2">北美 · 東南亞</div>
        </div>
        <Link
          href="/cases"
          className="group inline-flex items-center gap-2 text-[14.5px] font-semibold text-gold-d"
        >
          <span className="border-b border-gold-d/40 pb-0.5 group-hover:border-gold-d transition-colors">
            看所有案例
          </span>
          <span className="transition-transform duration-300 group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}

function AboutMenu() {
  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-4">
        <MenuColumn label="認識鹿飛">
          <MenuLink
            href="/about#story"
            title="創辦故事"
            desc="我們為什麼做這件事"
          />
          <MenuLink
            href="/about#team"
            title="團隊組成"
            desc="台灣核心團隊 + 全球節點"
          />
          <MenuLink
            href="/about#how-we-work"
            title="我們怎麼合作"
            desc="你會得到什麼樣的陪跑"
          />
        </MenuColumn>
      </div>
      <div className="col-span-4">
        <MenuColumn label="立場與網絡">
          <MenuLink
            href="/about#network"
            title="合作夥伴網絡"
            desc="北美 / 東南亞 / 全球物流"
          />
          <MenuLink
            href="/about#philosophy"
            title="品牌理念"
            desc="我們相信的事"
          />
          <MenuLink
            href="/about#what-we-dont-do"
            title="我們不做什麼"
            desc="誠實的邊界"
          />
        </MenuColumn>
      </div>
      <div className="col-span-4 border-l border-bd pl-8">
        <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-gold-d/80 mb-4">
          創辦人
        </div>
        <div className="flex items-start gap-4">
          <div className="w-14 h-14 rounded-none bg-gradient-to-br from-gold to-[#C49545] flex items-center justify-center text-navy text-[19px] font-heading font-semibold shrink-0">
            AY
          </div>
          <div>
            <div className="text-[15.5px] font-semibold">Aaron Yu</div>
            <div className="text-[13px] text-gold-d font-medium">鹿飛 LUFÉ 創辦人</div>
            <div className="text-[11px] text-tx3 mt-1 leading-[1.5]">
              42+ 年國際物流實戰
              <br />
              500+ 出口案件 · 30+ 國家
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InsightsMenu() {
  const latestArticle = articles[0];
  const categoryGroups = [
    { label: "🇵🇭 菲律賓", cat: "菲律賓" },
    { label: "🇮🇩 印尼", cat: "印尼" },
    { label: "🌏 東南亞趨勢", cat: "東南亞趨勢" },
    { label: "🌎 北美市場", cat: "北美市場" },
    { label: "🎯 出海實戰", cat: "出海實戰" },
    { label: "🧠 企業體質", cat: "企業體質" },
  ] as const;

  return (
    <div className="grid grid-cols-12 gap-8">
      <div className="col-span-4">
        <MenuColumn label="主題分類">
          {categoryGroups.map((g) => (
            <MenuLink
              key={g.cat}
              href={`/insights?cat=${encodeURIComponent(g.cat)}`}
              title={g.label}
            />
          ))}
        </MenuColumn>
      </div>
      <div className="col-span-3">
        <MenuColumn label="其他內容">
          <MenuLink
            href="/resources"
            title="補助與活動"
            desc="政府補助 + 現場紀錄"
          />
          <MenuLink
            href="/field-notes"
            title="現場紀錄"
            desc="活動、演講、媒體露出"
          />
          <MenuLink
            href="https://tradepiloter.com"
            title="TradePilot 關稅工具"
            external
          />
          <MenuLink href="/services/methodology" title="鹿飛方法論" />
          <MenuLink href="/insights" title="看所有文章" />
        </MenuColumn>
      </div>
      <div className="col-span-5 border-l border-bd pl-8">
        <div className="text-[10.5px] font-semibold tracking-[2px] uppercase text-gold-d/80 mb-4">
          最新文章
        </div>
        {latestArticle && (
          <Link
            href={`/insights/${latestArticle.slug}`}
            className="group flex gap-4"
          >
            <div className="relative w-[120px] h-[80px] shrink-0 overflow-hidden">
              <Image
                src={getArticleImage(latestArticle)}
                alt={latestArticle.title}
                fill
                sizes="120px"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[10.5px] font-semibold tracking-wider uppercase text-gold-d mb-1">
                {latestArticle.category}
              </div>
              <div className="text-[15px] font-semibold text-tx group-hover:text-gold transition-colors leading-tight mb-1">
                {latestArticle.title}
              </div>
              <div className="text-[11px] text-tx3">
                {latestArticle.date} · {latestArticle.readTime}
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}

/* ───────── Mobile menu ───────── */

function MobileMenu({ onClose }: { onClose: () => void }) {
  const [expanded, setExpanded] = useState<MenuKey>(null);
  const { open: openMessageBox } = useMessageBox();

  const toggle = (key: Exclude<MenuKey, null>) => {
    setExpanded((cur) => (cur === key ? null : key));
  };

  return (
    <div className="py-2">
      {navItems.map((item) => (
        <div key={item.key} className="border-b border-bd last:border-b-0">
          <button
            onClick={() => toggle(item.key)}
            className="w-full flex items-center justify-between py-4 text-left cursor-pointer"
            aria-expanded={expanded === item.key}
          >
            <span className="text-[16.5px] font-semibold text-tx">
              {item.label}
            </span>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className={`transition-transform duration-300 text-tx3 ${
                expanded === item.key ? "rotate-180" : ""
              }`}
            >
              <path
                d="M4 6L8 10L12 6"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <AnimatePresence initial={false}>
            {expanded === item.key && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="pb-4 pl-3 space-y-2">
                  <MobileMenuContent itemKey={item.key} onClose={onClose} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}

      <div className="mt-5 flex gap-2.5">
        <button
          onClick={() => {
            openMessageBox();
            onClose();
          }}
          className="flex-1 bg-gold text-navy px-5 py-[11px] rounded-none text-[14.5px] font-semibold hover:bg-gold-l transition-all cursor-pointer"
        >
          聊聊你的產品 →
        </button>
      </div>
    </div>
  );
}

function MobileSubLink({
  href,
  title,
  onClose,
}: {
  href: string;
  title: string;
  onClose: () => void;
}) {
  return (
    <Link
      href={href}
      className="block py-2 text-[15px] text-tx2 hover:text-gold transition-colors"
      onClick={onClose}
    >
      {title}
    </Link>
  );
}

function MobileMenuContent({
  itemKey,
  onClose,
}: {
  itemKey: Exclude<MenuKey, null>;
  onClose: () => void;
}) {
  if (itemKey === "services") {
    return (
      <>
        <div className="text-[10px] font-semibold tracking-wider uppercase text-tx3 mt-1 mb-1">
          完整路徑
        </div>
        {STAGE_ORDER.map((slug) => {
          const stage = STAGES[slug];
          return (
            <MobileSubLink
              key={slug}
              href={`/services/${slug}`}
              title={stage.title}
              onClose={onClose}
            />
          );
        })}
        <div className="text-[10px] font-semibold tracking-wider uppercase text-tx3 mt-3 mb-1">
          進階方案
        </div>
        <MobileSubLink
          href="/services/optimize"
          title="運營優化方案"
          onClose={onClose}
        />
        <MobileSubLink
          href="/services/methodology"
          title="鹿飛方法論"
          onClose={onClose}
        />
        <MobileSubLink href="/services" title="服務總覽" onClose={onClose} />
      </>
    );
  }
  if (itemKey === "cases") {
    return (
      <>
        {CASES.map((c) => (
          <MobileSubLink
            key={c.slug}
            href={`/cases/${c.slug}`}
            title={`${c.num} ${c.title}`}
            onClose={onClose}
          />
        ))}
        <MobileSubLink href="/cases" title="看所有案例" onClose={onClose} />
      </>
    );
  }
  if (itemKey === "about") {
    return (
      <>
        <MobileSubLink href="/about#story" title="創辦故事" onClose={onClose} />
        <MobileSubLink href="/about#team" title="團隊組成" onClose={onClose} />
        <MobileSubLink
          href="/about#how-we-work"
          title="我們怎麼合作"
          onClose={onClose}
        />
        <MobileSubLink
          href="/about#network"
          title="合作夥伴網絡"
          onClose={onClose}
        />
        <MobileSubLink
          href="/about#what-we-dont-do"
          title="我們不做什麼"
          onClose={onClose}
        />
      </>
    );
  }
  if (itemKey === "insights") {
    return (
      <>
        <MobileSubLink href="/insights" title="所有文章" onClose={onClose} />
        <MobileSubLink
          href="/insights?cat=東南亞趨勢"
          title="🌏 東南亞趨勢"
          onClose={onClose}
        />
        <MobileSubLink
          href="/insights?cat=北美市場"
          title="🌎 北美市場"
          onClose={onClose}
        />
        <MobileSubLink
          href="/insights?cat=出海實戰"
          title="🎯 出海實戰"
          onClose={onClose}
        />
        <MobileSubLink
          href="/insights?cat=企業體質"
          title="🧠 企業體質"
          onClose={onClose}
        />
        <MobileSubLink href="/field-notes" title="現場紀錄" onClose={onClose} />
        <MobileSubLink href="/resources" title="補助與活動" onClose={onClose} />
      </>
    );
  }
  return null;
}

function MessageBoxTrigger({ className = "" }: { className?: string }) {
  const { open } = useMessageBox();
  return (
    <button
      className={`bg-gold text-navy px-5 py-[9px] rounded-none text-[14.5px] font-semibold hover:bg-gold-l transition-all cursor-pointer ${className}`}
      onClick={open}
    >
      聊聊你的產品 →
    </button>
  );
}
