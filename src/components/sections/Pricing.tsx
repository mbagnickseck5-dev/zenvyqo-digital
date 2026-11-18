import Link from "next/link";
import { ArrowRight, Check, Monitor, Rocket, ShoppingCart } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { PLANS } from "@/lib/plans";
import { QuoteButton } from "../QuoteButton";
import { Reveal } from "../Reveal";
import { btn, container, eyebrow, h2 } from "@/lib/ui";

interface Props {
  locale: Locale;
  t: Dictionary;
}

const PLAN_ICONS = { "business-pro": Monitor, "business-plus": Rocket, "boutique-pro": ShoppingCart };

export function Pricing({ locale, t }: Props) {
  const p = t.pricing;
  return (
    <section id="forfaits" className="bg-mist py-20 sm:py-24">
      <div className={container}>
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className={eyebrow}>{p.eyebrow}</span>
          <h2 className={`${h2} mt-4`}>
            {p.titleStart} <span className="text-electric">{p.titleAccent}</span>
          </h2>
          <p className="mt-4 text-lg text-muted">{p.intro}</p>
        </Reveal>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => {
            const copy = p.plans[plan.id];
            const Icon = PLAN_ICONS[plan.id];
            const dark = plan.featured;
            return (
              <Reveal key={plan.id} delay={i * 0.08} className="h-full">
                <article
                  className={`relative flex h-full flex-col rounded-2xl p-7 transition duration-300 hover:-translate-y-1 ${
                    dark
                      ? "bg-linear-to-b from-night to-night-deep text-white shadow-2xl shadow-electric/25 ring-2 ring-electric"
                      : "border border-line bg-white hover:shadow-xl"
                  }`}
                >
                  {plan.featured && (
                    <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-electric px-4 py-1 text-sm font-semibold text-white shadow-lg">
                      {p.popular}
                    </span>
                  )}
                  <div className="flex items-start gap-4">
                    <Icon className={`size-9 shrink-0 ${dark ? "text-cyan" : "text-electric"}`} strokeWidth={1.6} aria-hidden="true" />
                    <div>
                      <h3 className="text-xl font-extrabold">{plan.name}</h3>
                      <p className={`mt-1 min-h-10 text-sm ${dark ? "text-white/75" : "text-muted"}`}>{copy.tagline}</p>
                    </div>
                  </div>

                  <p className="mt-6 flex items-baseline gap-2">
                    <span className={`font-display text-5xl font-extrabold tracking-tight tabular-nums ${dark ? "text-white" : "text-electric"}`}>
                      {plan.monthly}
                    </span>
                    <span className="font-display text-lg font-bold">{p.currency}</span>
                    <span className={dark ? "text-white/75" : "text-muted"}>{p.perMonth}</span>
                  </p>
                  <p className={`mt-1 text-sm font-medium ${dark ? "text-white/85" : "text-night"}`}>
                    {p.setupPrefix} {plan.setup} {p.setupSuffix}
                  </p>

                  <ul className={`mt-6 flex flex-col gap-3 border-t pt-6 text-[0.95rem] ${dark ? "border-white/15" : "border-line"}`}>
                    {copy.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className={`mt-0.5 size-5 shrink-0 ${dark ? "text-cyan" : "text-electric"}`} aria-hidden="true" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto pt-8">
                    <QuoteButton plan={plan.id} className={`${dark ? btn.primary : btn.outlineDark} w-full`}>
                      {p.choose}
                      <span className="sr-only"> : {plan.name}</span>
                      <ArrowRight className="size-5" aria-hidden="true" />
                    </QuoteButton>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <p className="mx-auto mt-8 max-w-2xl text-center text-sm text-muted">
          {p.commitment}{" "}
          <Link href={`/${locale}/legal/conditions`} className="font-semibold text-electric-dark underline">
            {p.termsLink}
          </Link>
          .
        </p>
      </div>
    </section>
  );
}
