import { ArrowRight } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { QuoteButton } from "../QuoteButton";
import { btn, container, h2 } from "@/lib/ui";

interface Props {
  t: Dictionary;
}

export function CtaBand({ t }: Props) {
  return (
    <section className="pb-20">
      <div className={container}>
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-night-deep via-night to-electric px-7 py-10 text-white sm:px-12 sm:py-12">
          <div className="absolute -right-16 -top-20 size-64 rounded-full bg-cyan/30 blur-3xl" aria-hidden="true" />
          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-extrabold sm:text-3xl">{t.cta.title}</h2>
              <p className="mt-2 text-lg text-white/85">{t.cta.text}</p>
            </div>
            <QuoteButton className={`${btn.white} shrink-0`}>
              {t.cta.button}
              <ArrowRight className="size-5" aria-hidden="true" />
            </QuoteButton>
          </div>
        </div>
      </div>
    </section>
  );
}
