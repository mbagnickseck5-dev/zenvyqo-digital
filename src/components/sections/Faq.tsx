import { ChevronDown } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { FOUNDERS_OFFER, offerText } from "@/lib/plans";
import { Reveal } from "../Reveal";
import { container, eyebrow, h2 } from "@/lib/ui";

interface Props {
  t: Dictionary;
}

export function Faq({ t }: Props) {
  const f = t.faq;
  return (
    <section id="faq" className="bg-mist py-20 sm:py-24">
      <div className={`${container} max-w-3xl`}>
        <Reveal className="text-center">
          <span className={eyebrow}>{f.eyebrow}</span>
          <h2 className={`${h2} mt-4`}>{f.title}</h2>
        </Reveal>
        <div className="mt-10 flex flex-col gap-3">
          {f.items.map((item) => (
            <details key={item.q} className="group rounded-xl border border-line bg-white open:shadow-md">
              <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-display text-base font-bold [&::-webkit-details-marker]:hidden">
                {item.q}
                <ChevronDown className="size-5 shrink-0 text-electric transition-transform duration-200 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="px-5 pb-5 leading-relaxed text-muted">
                {item.a}
                {FOUNDERS_OFFER.active && item.offerNote && (
                  <>
                    {" "}
                    <strong className="font-semibold text-night">{offerText(item.offerNote)}</strong>
                  </>
                )}
              </p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
