import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { FOUNDERS_OFFER, offerText } from "@/lib/plans";

/** Bandeau de l'offre de lancement, en haut de toutes les pages tant que l'offre est active. */
export function OfferBar({ locale, t }: { locale: Locale; t: Dictionary["offer"] }) {
  if (!FOUNDERS_OFFER.active) return null;
  return (
    <div className="bg-linear-to-r from-electric to-[#0A86FF] text-white">
      <p className="mx-auto max-w-7xl px-5 py-2 text-center text-[0.8125rem] leading-snug sm:px-8 sm:text-sm">
        <Sparkles className="mr-2 hidden size-4 align-[-3px] text-cyan sm:inline" aria-hidden="true" />
        {offerText(t.bar)}{" "}
        <Link
          href={`/${locale}#offre`}
          prefetch={false}
          className="whitespace-nowrap font-semibold underline decoration-2 underline-offset-2 hover:decoration-cyan"
        >
          {t.barCta}
        </Link>
      </p>
    </div>
  );
}
