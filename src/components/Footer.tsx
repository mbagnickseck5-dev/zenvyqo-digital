import Link from "next/link";
import { Mail, Phone } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";
import { Logo } from "./Logo";

export function Footer({ locale, t }: { locale: Locale; t: Dictionary }) {
  const nav = [
    { href: `/${locale}#services`, label: t.nav.services },
    { href: `/${locale}#forfaits`, label: t.nav.plans },
    { href: `/${locale}#realisations`, label: t.nav.work },
    { href: `/${locale}#a-propos`, label: t.nav.about },
    { href: `/${locale}#contact`, label: t.nav.contact },
  ];
  const legal = [
    { href: `/${locale}/legal/mentions-legales`, label: t.footer.legal },
    { href: `/${locale}/legal/confidentialite`, label: t.footer.privacy },
    { href: `/${locale}/legal/conditions`, label: t.footer.terms },
  ];
  const linkClass = "inline-flex min-h-9 items-center text-white/75 transition hover:text-white";

  return (
    <footer className="bg-night-deep text-white">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-5 py-14 sm:px-8 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Logo />
          <p className="mt-5 font-display text-lg font-bold text-cyan">{t.slogan}</p>
          <p className="mt-2 max-w-xs text-sm text-white/70">{t.footer.serving}</p>
          <h2 className="sr-only">{t.footer.contactTitle}</h2>
          <ul className="mt-4 flex flex-col gap-1 text-sm">
            <li>
              <a href={`tel:${site.phone}`} className={`${linkClass} gap-2`}>
                <Phone className="size-4 text-cyan" aria-hidden="true" />
                {site.phoneDisplay}
              </a>
            </li>
            {whatsappUrl() && (
              <li>
                <a href={whatsappUrl(t.contact.whatsappMessage) ?? undefined} target="_blank" rel="noopener noreferrer" className={`${linkClass} gap-2`}>
                  <WhatsAppIcon className="size-4 text-[#25D366]" />
                  WhatsApp
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${site.email}`} className={`${linkClass} gap-2`}>
                <Mail className="size-4 text-cyan" aria-hidden="true" />
                {site.email}
              </a>
            </li>
          </ul>
        </div>
        <nav aria-label={t.footer.navTitle}>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-white/60">{t.footer.navTitle}</h2>
          <ul className="mt-4 flex flex-col gap-1 text-sm">
            {nav.map((l) => (
              <li key={l.href}>
                <Link href={l.href} prefetch={false} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label={t.footer.legalTitle}>
          <h2 className="font-display text-sm font-bold uppercase tracking-widest text-white/60">{t.footer.legalTitle}</h2>
          <ul className="mt-4 flex flex-col gap-1 text-sm">
            {legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} prefetch={false} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto w-full max-w-6xl px-5 py-5 text-sm text-white/60 sm:px-8">
          © {new Date().getFullYear()} {site.name}. {t.footer.rights}
        </p>
      </div>
    </footer>
  );
}
