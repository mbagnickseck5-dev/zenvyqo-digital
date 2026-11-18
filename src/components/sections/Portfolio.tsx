import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";
import { visual, type VisualName } from "@/lib/visuals";
import { Reveal } from "../Reveal";
import { container, eyebrow, h2 } from "@/lib/ui";

interface Props {
  t: Dictionary;
}

// Couleurs de l'aperçu de secours (affiché seulement si le visuel est indisponible).
const DEMO_THEMES = [
  { bg: "from-[#2B1408] to-[#7A2E0E]", accent: "bg-[#FFB347]", image: "modele-restaurant" },
  { bg: "from-[#1B1030] to-[#5B2A86]", accent: "bg-[#F4B6D8]", image: "modele-salon" },
  { bg: "from-[#062A33] to-[#0B6B7A]", accent: "bg-[#8CF0D2]", image: "modele-nettoyage" },
] satisfies { bg: string; accent: string; image: VisualName }[];

export function Portfolio({ t }: Props) {
  const p = t.portfolio;
  return (
    <section id="realisations" className="bg-mist py-20 sm:py-24">
      <div className={container}>
        <Reveal className="max-w-2xl">
          <span className={eyebrow}>{p.eyebrow}</span>
          <h2 className={`${h2} mt-4`}>{p.title}</h2>
          <p className="mt-4 text-muted">{p.intro}</p>
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {p.items.map((item, i) => {
            const theme = DEMO_THEMES[i];
            const photo = visual(theme.image);
            return (
              <Reveal key={item.name} delay={i * 0.08} className="h-full">
                <figure className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white transition duration-300 hover:-translate-y-1 hover:shadow-xl">
                  {/* Même format pour les trois aperçus : les cartes restent alignées. */}
                  <div className="relative aspect-[4/3] overflow-hidden bg-white">
                    {photo ? (
                      <Image
                        src={photo}
                        alt={item.alt}
                        fill
                        sizes="(min-width: 1280px) 370px, (min-width: 768px) 31vw, 100vw"
                        className="object-cover transition duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className={`absolute inset-0 bg-linear-to-br ${theme.bg} p-5 text-white`} aria-hidden="true">
                        <div className="flex items-center justify-between text-[0.7rem] font-semibold opacity-90">
                          <span>{item.name}</span>
                          <span className="flex gap-1.5">
                            <span className="h-1 w-5 rounded-full bg-white/60" />
                            <span className="h-1 w-5 rounded-full bg-white/60" />
                            <span className="h-1 w-5 rounded-full bg-white/60" />
                          </span>
                        </div>
                        <p className="mt-8 max-w-[14ch] font-display text-2xl font-extrabold leading-tight">{item.headline}</p>
                        <span className={`mt-4 inline-block h-7 w-24 rounded-md ${theme.accent}`} />
                      </div>
                    )}
                  </div>
                  <figcaption className="flex-1 border-t border-line p-5">
                    <span className="inline-block rounded-full bg-amber-100 px-3 py-1 text-xs font-semibold text-amber-900">{p.demoBadge}</span>
                    <h3 className="mt-3 text-lg font-bold">{item.name}</h3>
                    <p className="mt-1 text-sm text-muted">{item.type}</p>
                    {/* Lien étiré : toute la carte est cliquable, le nom accessible reste court. */}
                    <a
                      href={`/demos/${item.slug}`}
                      aria-label={`${p.cta} : ${item.name}`}
                      className="mt-4 inline-flex items-center gap-1.5 font-semibold text-electric-dark after:absolute after:inset-0 after:rounded-2xl after:content-[''] group-hover:underline"
                    >
                      {p.cta}
                      <ArrowUpRight className="size-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden="true" />
                    </a>
                  </figcaption>
                </figure>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
