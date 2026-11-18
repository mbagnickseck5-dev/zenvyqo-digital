import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { HeroVisual } from "../HeroVisual";
import { QuoteButton } from "../QuoteButton";
import { visual } from "@/lib/visuals";
import { btn, container } from "@/lib/ui";

interface Props {
  locale: Locale;
  t: Dictionary;
}

export function Hero({ locale, t }: Props) {
  const h = t.hero;
  return (
    <section id="accueil" className="relative overflow-hidden bg-night text-white">
      <div className="absolute inset-0 bg-linear-to-br from-night-deep via-night to-[#0A2A5E]" aria-hidden="true" />
      <div className="absolute -left-40 top-1/3 size-96 rounded-full bg-electric/20 blur-3xl" aria-hidden="true" />
      <div className={`${container} relative grid items-center gap-12 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:py-24`}>
        <div className="flex flex-col items-start gap-6">
          <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-1.5 text-sm font-medium">
            <span className="size-2 rounded-full bg-cyan" aria-hidden="true" />
            {h.badge}
          </span>
          <h1 className="font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-5xl lg:text-[3.4rem]">
            {h.titleStart} <span className="bg-linear-to-r from-cyan to-[#5AA2FF] bg-clip-text text-transparent">{h.titleAccent}</span>
          </h1>
          <p className="max-w-xl text-lg text-white/80">{h.subtitle}</p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Link href={`/${locale}#forfaits`} prefetch={false} className={btn.primary}>
              {h.ctaPlans}
              <ArrowRight className="size-5" aria-hidden="true" />
            </Link>
            <QuoteButton className={btn.outlineLight}>{h.ctaQuote}</QuoteButton>
          </div>
          <p className="text-sm font-medium tracking-wide text-white/60">{t.slogan}</p>
        </div>
        <HeroVisual t={h} image={visual("hero-sites")} />
      </div>
    </section>
  );
}
