"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ArrowRight, Menu, Phone, X } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site } from "@/lib/site";
import { preloadLeadForm } from "./LazyLeadForm";
import { Logo } from "./Logo";
import { useQuote } from "./QuoteProvider";

export function Header({ locale, t }: { locale: Locale; t: Dictionary["nav"] }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { open } = useQuote();

  const other: Locale = locale === "fr" ? "en" : "fr";
  // Même page dans l'autre langue : on remplace seulement le préfixe.
  const otherHref = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), `/${other}`) || `/${other}`;

  const links = [
    { href: `/${locale}#accueil`, label: t.home },
    { href: `/${locale}#services`, label: t.services },
    { href: `/${locale}#forfaits`, label: t.plans },
    { href: `/${locale}#realisations`, label: t.work },
    { href: `/${locale}#a-propos`, label: t.about },
    { href: `/${locale}#contact`, label: t.contact },
  ];

  const localeSwitch = (
    <Link
      href={otherHref}
      prefetch={false}
      hrefLang={other}
      className="inline-flex min-h-11 items-center gap-1.5 rounded-lg px-2 text-sm font-semibold text-white/80 transition hover:text-white"
    >
      <span className={locale === "fr" ? "text-cyan" : ""}>FR</span>
      <span aria-hidden="true" className="text-white/30">/</span>
      <span className={locale === "en" ? "text-cyan" : ""}>EN</span>
      {/* Nom accessible : le texte visible (FR EN) suivi de l'action. */}
      <span className="sr-only"> : {t.switchLabel}</span>
    </Link>
  );

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-night/95 text-white backdrop-blur">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-8">
        <Link href={`/${locale}`} prefetch={false} className="shrink-0">
          <Logo />
        </Link>

        <nav aria-label={t.main} className="hidden items-center gap-5 lg:flex xl:gap-6">
          {links.map((l) => (
            <Link key={l.href} href={l.href} prefetch={false} className="whitespace-nowrap py-3 text-sm font-medium text-white/80 transition hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">{localeSwitch}</span>
          <a
            href={`tel:${site.phone}`}
            className="hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-xl border border-white/30 px-4 text-sm font-semibold text-white transition hover:border-white hover:bg-white/10 xl:inline-flex"
          >
            <Phone className="size-4" aria-hidden="true" />
            {site.phoneDisplay}
          </a>
          <a
            href={`tel:${site.phone}`}
            aria-label={`${t.call} ${site.phoneDisplay}`}
            className="grid size-11 place-items-center rounded-lg text-white transition hover:bg-white/10 xl:hidden"
          >
            <Phone className="size-5" aria-hidden="true" />
          </a>
          <button
            type="button"
            onClick={() => open()}
            onPointerEnter={preloadLeadForm}
            onFocus={preloadLeadForm}
            onTouchStart={preloadLeadForm}
            className="hidden min-h-11 items-center gap-2 whitespace-nowrap rounded-xl bg-electric px-5 text-sm font-semibold text-white transition hover:bg-electric-dark sm:inline-flex"
          >
            {t.quote}
            <ArrowRight className="size-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-lg text-white lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            aria-label={menuOpen ? t.closeMenu : t.openMenu}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-6" aria-hidden="true" /> : <Menu className="size-6" aria-hidden="true" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="menu-mobile" aria-label={t.main} className="border-t border-white/10 px-5 pb-5 lg:hidden">
          <ul className="flex flex-col">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} prefetch={false} onClick={() => setMenuOpen(false)} className="flex min-h-12 items-center text-base font-medium text-white/90">
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <a href={`tel:${site.phone}`} className="flex min-h-12 items-center gap-2.5 text-base font-medium text-white/90">
                <Phone className="size-4" aria-hidden="true" />
                {site.phoneDisplay}
              </a>
            </li>
          </ul>
          <div className="mt-3 flex items-center justify-between gap-3">
            {localeSwitch}
            <button
              type="button"
              onClick={() => {
                setMenuOpen(false);
                open();
              }}
              onTouchStart={preloadLeadForm}
              onFocus={preloadLeadForm}
              className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-electric px-5 font-semibold text-white"
            >
              {t.quote}
              <ArrowRight className="size-4" aria-hidden="true" />
            </button>
          </div>
        </nav>
      )}
    </header>
  );
}
