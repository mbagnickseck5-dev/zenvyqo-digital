import { MessagesSquare, MonitorCheck, PencilRuler, Rocket } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { Reveal } from "../Reveal";
import { container, eyebrow, h2 } from "@/lib/ui";

interface Props {
  t: Dictionary;
}

const STEP_ICONS = [MessagesSquare, PencilRuler, MonitorCheck, Rocket];

export function Process({ t }: Props) {
  const p = t.process;
  return (
    <section id="processus" className="py-20 sm:py-24">
      <div className={container}>
        <Reveal>
          <span className={eyebrow}>{p.eyebrow}</span>
          <h2 className={`${h2} mt-4`}>{p.title}</h2>
        </Reveal>
        <ol className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {p.steps.map((step, i) => {
            const Icon = STEP_ICONS[i];
            return (
              <li key={step.title}>
                <Reveal delay={i * 0.1}>
                  <div className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-night font-display text-sm font-bold text-white">{i + 1}</span>
                    <Icon className="size-8 text-electric" strokeWidth={1.6} aria-hidden="true" />
                    {i < p.steps.length - 1 && <span className="hidden h-px flex-1 bg-linear-to-r from-electric/50 to-transparent lg:block" aria-hidden="true" />}
                  </div>
                  <h3 className="mt-4 text-lg font-bold leading-snug">{step.title}</h3>
                  <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">{step.text}</p>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
