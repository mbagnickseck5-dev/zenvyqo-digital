import Link from "next/link";
import { Sparkles } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { MIN_MONTHLY } from "@/lib/plans";

/** Bandeau bleu en haut de toutes les pages : prix d'entrée et forfaits sans engagement. */
export function TopBar({ locale, t }: { locale: Locale; t: Dictionary["topBar"] }) {
  return (
    <div className="bg-linear-to-r from-electric to-[#0A86FF] text-white">
      <p className="mx-auto max-w-7xl px-5 py-2 text-center text-[0.8125rem] leading-snug sm:px-8 sm:text-sm">
        <Sparkles className="mr-2 hidden size-4 align-[-3px] text-cyan sm:inline" aria-hidden="true" />
        {t.text.replace("{price}", String(MIN_MONTHLY))}{" "}
        <Link
          href={`/${locale}#forfaits`}
          prefetch={false}
          className="whitespace-nowrap font-semibold underline decoration-2 underline-offset-2 hover:decoration-cyan"
        >
          {t.cta}
        </Link>
      </p>
    </div>
  );
}
