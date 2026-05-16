"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { dictionary, type Locale } from "@/lib/i18n";

const navItems = [
  { key: "home", href: "" },
  { key: "blog", href: "/blog" },
  { key: "software", href: "/software" },
  { key: "career", href: "/career" },
  { key: "papers", href: "/papers" },
  { key: "about", href: "/about" }
] as const;

export function Nav({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const otherLocale = locale === "zh" ? "en" : "zh";
  const labels = dictionary[locale].nav;
  const switchPath = pathname.replace(/^\/(zh|en)/, `/${otherLocale}`);

  return (
    <header className="sticky top-0 z-50 border-b border-cyan-300/10 bg-void/72 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href={`/${locale}`} className="group flex items-center gap-3">
          <span className="cyber-button grid h-9 w-9 place-items-center border border-cyan-300/35 bg-cyan-300/10 font-mono text-sm text-cyan-200 shadow-neon">
            N
          </span>
          <span className="font-mono text-sm uppercase tracking-[0.28em] text-cyan-100 group-hover:text-cyanNeon">
            Naoki.OS
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const href = `/${locale}${item.href}`;
            const active = pathname === href || (item.href && pathname.startsWith(href));
            return (
              <Link
                key={item.key}
                href={href}
                data-active={active ? "true" : "false"}
                className={`nav-link px-3 py-2 text-sm transition ${
                  active ? "text-cyanNeon" : "text-slate-300 hover:text-white"
                }`}
              >
                {labels[item.key]}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-2">
          <Link
            href={switchPath}
            className="cyber-button border border-fuchsia-300/30 px-3 py-2 font-mono text-xs uppercase text-fuchsia-100 transition hover:border-fuchsia-200 hover:text-white"
          >
            {otherLocale}
          </Link>
          <button
            type="button"
            className="cyber-button border border-cyan-300/30 px-3 py-2 font-mono text-xs text-cyan-100 lg:hidden"
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-label="Toggle navigation"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </nav>

      <div className={`mobile-menu border-t border-cyan-300/10 bg-void/94 px-4 lg:hidden ${open ? "is-open" : ""}`}>
        <div className="mx-auto grid max-w-7xl gap-2 py-4">
          {navItems.map((item, index) => (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              className="cyber-button mobile-menu-item border border-cyan-300/10 px-4 py-3 text-sm text-slate-200"
              onClick={() => setOpen(false)}
              style={{ transitionDelay: open ? `${index * 42}ms` : "0ms" }}
              tabIndex={open ? 0 : -1}
            >
              {labels[item.key]}
            </Link>
          ))}
        </div>
      </div>
    </header>
  );
}
