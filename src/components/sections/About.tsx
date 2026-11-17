import { Check } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { Reveal } from "../Reveal";
import { container, eyebrow, h2 } from "@/lib/ui";

interface Props {
  t: Dictionary;
}

export function About({ t }: Props) {
  const a = t.about;
  return (
    <section id="a-propos" className="py-20 sm:py-24">
      <div className={`${container} grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center`}>
        <Reveal>
          <span className={eyebrow}>{a.eyebrow}</span>
          <h2 className={`${h2} mt-4`}>{a.title}</h2>
          {a.paragraphs.map((para) => (
            <p key={para} className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {para}
            </p>
          ))}
        </Reveal>
        <Reveal delay={0.1}>
          <ul className="flex flex-col gap-4 rounded-2xl bg-linear-to-br from-night to-night-deep p-8 text-white">
            {a.points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-lg font-medium">
                <Check className="mt-1 size-5 shrink-0 text-cyan" aria-hidden="true" />
                {point}
              </li>
            ))}
            <li className="mt-2 border-t border-white/15 pt-5 font-display text-xl font-bold text-cyan">{t.slogan}</li>
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
