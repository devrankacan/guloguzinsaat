"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowUpRightIcon,
  ChevronDownIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  LocationIcon,
  MenuIcon,
  PhoneIcon,
  SearchIcon,
  XTwitterIcon,
} from "@/components/icons";
import { IMAGES, NAV_LINKS, SITE } from "@/lib/site-data";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header>
      {/* Top info bar */}
      <div
        className="hidden lg:block"
        style={{
          background:
            "linear-gradient(100deg, var(--color-navy) 0%, var(--color-navy) 58%, var(--color-gold) 60%, var(--color-gold) 100%)",
        }}
      >
        <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6">
          <ul className="flex items-center gap-8 py-3 text-[13px] font-semibold text-white/90">
            <li className="flex items-center gap-2">
              <LocationIcon className="h-3.5 w-3.5 text-gold" />
              <span>{SITE.location}</span>
            </li>
            <li className="flex items-center gap-2">
              <PhoneIcon className="h-3.5 w-3.5 text-gold" />
              <span>{SITE.phone}</span>
            </li>
          </ul>
          <ul className="flex items-center gap-4 py-3">
            {[FacebookIcon, XTwitterIcon, LinkedinIcon, InstagramIcon].map((Icon, i) => (
              <li key={i}>
                <a
                  href="#"
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-7 w-7 items-center justify-center rounded-full text-navy transition-opacity hover:opacity-70"
                  aria-label="social link"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main nav */}
      <div className="bg-cream">
        <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-6 px-6 py-4">
          <Link href="/" className="shrink-0">
            <Image
              src={IMAGES.logo}
              alt={SITE.name}
              className="h-14 w-auto object-contain"
              preload
            />
          </Link>

          <nav className="hidden lg:block">
            <ul className="flex items-center gap-9 text-sm font-bold tracking-wide text-ink">
              {NAV_LINKS.map((link) => (
                <li key={link.href} className="group relative">
                  <Link
                    href={link.href}
                    className="flex items-center gap-1 py-2 uppercase transition-colors hover:text-gold-dark"
                  >
                    {link.label}
                    {"children" in link && link.children && (
                      <ChevronDownIcon className="h-3 w-3" />
                    )}
                  </Link>
                  {"children" in link && link.children && (
                    <ul className="invisible absolute left-0 top-full min-w-[160px] translate-y-1 border-t-2 border-gold bg-white opacity-0 shadow-lg transition-all duration-150 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block px-5 py-3 text-xs font-bold uppercase text-ink hover:bg-cream hover:text-gold-dark"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-5">
            <button
              aria-label="Ara"
              className="hidden text-ink transition-colors hover:text-gold-dark sm:block"
            >
              <SearchIcon className="h-5 w-5" />
            </button>
            <a href="#iletisim" className="btn-gold hidden sm:inline-flex">
              Bize Ulaşın
              <ArrowUpRightIcon className="h-3.5 w-3.5" />
            </a>
            <button
              aria-label="Menü"
              className="text-ink lg:hidden"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <MenuIcon className="h-7 w-7" />
            </button>
          </div>
        </div>

        {/* Mobile nav */}
        {menuOpen && (
          <nav className="border-t border-ink/10 px-6 py-4 lg:hidden">
            <ul className="flex flex-col gap-1 text-sm font-bold uppercase text-ink">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="block py-2"
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                  {"children" in link && link.children && (
                    <ul className="ml-3 flex flex-col gap-1 border-l border-ink/10 pl-3 text-xs normal-case">
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            className="block py-1.5 text-ink/80"
                            onClick={() => setMenuOpen(false)}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
