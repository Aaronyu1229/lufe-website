"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useMessageBox } from "./MessageBox";

const navLinks = [
  { label: "服務", href: "/services" },
  { label: "案例", href: "/cases" },
  { label: "關於我們", href: "/about" },
  { label: "洞察", href: "/insights" },
  { label: "聯絡", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-100 transition-all duration-300 ${
        scrolled
          ? "bg-white/92 backdrop-blur-[20px] border-b border-bd"
          : "bg-white/92 backdrop-blur-[20px] border-b border-bd"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-5 md:px-10 flex items-center justify-between h-[72px]">
        <Link
          href="/"
          className="font-sans font-bold text-[22px] text-navy tracking-[-0.5px]"
        >
          鹿飛 LUF<span className="text-gold">É</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-[26px]">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-[13px] text-tx2 font-medium hover:text-tx transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex gap-2.5">
          <button
            className="px-4 py-[9px] border border-bd rounded-sm text-[13px] font-medium text-tx2 hover:border-tx transition-colors cursor-pointer"
            onClick={() =>
              window.open("https://calendly.com", "_blank")
            }
          >
            預約諮詢
          </button>
          <MessageBoxTrigger />
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 cursor-pointer"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-5 h-0.5 bg-navy transition-transform ${mobileOpen ? "rotate-45 translate-y-2" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-navy transition-opacity ${mobileOpen ? "opacity-0" : ""}`}
          />
          <span
            className={`block w-5 h-0.5 bg-navy transition-transform ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-bd px-5 pb-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block py-3 text-[14px] text-tx2 font-medium"
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-2.5 mt-3">
            <button
              className="flex-1 py-2.5 border border-bd rounded-sm text-[13px] font-medium text-tx2 cursor-pointer"
              onClick={() => window.open("https://calendly.com", "_blank")}
            >
              預約諮詢
            </button>
            <MessageBoxTrigger className="flex-1" />
          </div>
        </div>
      )}
    </nav>
  );
}

function MessageBoxTrigger({ className = "" }: { className?: string }) {
  const { open } = useMessageBox();
  return (
    <button
      className={`bg-navy text-white px-5 py-[9px] rounded-sm text-[13px] font-medium hover:bg-navy-l transition-colors cursor-pointer ${className}`}
      onClick={open}
    >
      聊聊你的產品
    </button>
  );
}
