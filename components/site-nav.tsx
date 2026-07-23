"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { navItems, donate } from "@/lib/nav";
import Image from "next/image";
import { useNavTheme } from "./nav-theme";

export function SiteNav() {
  const pathname = usePathname();
  const { theme } = useNavTheme();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const light = theme === "light" && !scrolled;

  // solid bar after scrolling past the hero fold
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when mobile sheet is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
  }, [open]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-paper/95 backdrop-blur border-b border-ink/10"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        {/* logo = home */}
        {/* logo — swaps by treatment */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src={light ? "/logo/reversed.svg" : "/logo/primary.svg"}
            alt="Care Connect GH Foundation"
            width={130}
            height={130}
            priority
          />
        </Link>

        {/* desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => {
            const active = pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`type-caption transition-colors ${
                  light
                    ? "text-white/80 hover:text-white"
                    : "text-ink/80 hover:text-navy"
                } ${active ? "border-b-2 border-sky pb-0.5" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href={donate.href}
            className="type-label rounded-full bg-tally px-5 py-2 text-ink transition-transform hover:scale-105"
          >
            {donate.label}
          </Link>
        </div>

        {/* mobile: donate stays visible + hamburger */}
        <div className="flex items-center gap-3 md:hidden">
          <Link
            href={donate.href}
            className="rounded-full bg-tally px-4 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-widest text-ink"
          >
            {donate.label}
          </Link>
          <button
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            className={light ? "text-white" : "text-navy"}
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* mobile sheet */}
      {open && (
        <div className="fixed inset-0 z-50 bg-ink md:hidden">
          <div className="flex h-16 items-center justify-between px-5 mt-5">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo/reversed.svg" 
                alt="Care Connect GH Foundation"
                width={130}
                height={130}
                priority
              />
            </Link>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="text-white"
            >
              <X size={24} />
            </button>
          </div>
          <div className="flex flex-col gap-1 px-5 pt-4">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/10 py-4 font-display text-2xl text-white"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
