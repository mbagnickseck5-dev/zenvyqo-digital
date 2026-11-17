import { Headset, Search, ShieldCheck, Smartphone, Zap } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { container } from "@/lib/ui";

interface Props {
  t: Dictionary;
}

const ADVANTAGE_ICONS = [Zap, Smartphone, Search, Headset, ShieldCheck];

export function Advantages({ t }: Props) {
  return (
    <section aria-label={t.services.eyebrow} className="border-b border-line bg-mist">
      <ul className={`${container} grid grid-cols-2 gap-x-6 gap-y-5 py-7 sm:grid-cols-3 lg:grid-cols-5`}>
        {t.advantages.map((a, i) => {
          const Icon = ADVANTAGE_ICONS[i];
          return (
            <li key={a.title} className="flex items-center gap-3">
              <Icon className="size-8 shrink-0 text-electric" strokeWidth={1.75} aria-hidden="true" />
              <span className="text-sm leading-snug">
                <strong className="block font-semibold">{a.title}</strong>
                <span className="text-muted">{a.text}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
