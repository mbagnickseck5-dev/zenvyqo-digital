import { LayoutTemplate, Search, ShoppingCart, Wrench } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { Reveal } from "../Reveal";
import { container, eyebrow, h2 } from "@/lib/ui";

interface Props {
  t: Dictionary;
}

const SERVICE_ICONS = [LayoutTemplate, ShoppingCart, Search, Wrench];

export function Services({ t }: Props) {
  const s = t.services;
  return (
    <section id="services" className="py-20 sm:py-24">
      <div className={container}>
        <Reveal className="max-w-2xl">
          <span className={eyebrow}>{s.eyebrow}</span>
          <h2 className={`${h2} mt-4`}>{s.title}</h2>
          <p className="mt-4 text-lg text-muted">{s.intro}</p>
        </Reveal>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {s.items.map((item, i) => {
            const Icon = SERVICE_ICONS[i];
            return (
              <Reveal key={item.title} delay={i * 0.08}>
                <article className="group h-full rounded-2xl border border-line bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-electric/40 hover:shadow-xl hover:shadow-electric/10">
                  <span className="grid size-12 place-items-center rounded-xl bg-linear-to-br from-electric to-cyan text-white">
                    <Icon className="size-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-bold leading-snug">{item.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
