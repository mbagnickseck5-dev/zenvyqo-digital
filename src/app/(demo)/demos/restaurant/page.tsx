import type { Metadata } from "next";
import { CircleCheck, Clock3, Flame, Leaf, MapPin, Phone, Wine } from "lucide-react";
import { DemoBanner, DemoEndCta, DemoPhoto } from "@/components/demo/DemoChrome";
import { DemoForm, type DemoFormTheme } from "@/components/demo/DemoForm";
import { playfair } from "@/lib/demoFonts";

export const metadata: Metadata = {
  title: "Bistro Vermeil · Démo de site de restaurant | Zenvyqo Digital",
  description:
    "Exemple de site de restaurant conçu par Zenvyqo Digital : menu, réservation en ligne et horaires. Bistro Vermeil est une entreprise fictive.",
};

const serif = "font-[family-name:var(--font-playfair)]";

const HIGHLIGHTS = [
  { icon: Leaf, title: "Produits du Québec", text: "Fermes de la région et poissons d’ici, selon les arrivages de la semaine." },
  { icon: Flame, title: "Carte de saison", text: "Le menu suit les saisons, la cuisine reste ouverte sur la salle." },
  { icon: Wine, title: "Vins nature", text: "Une cave d’importations privées et des cocktails maison." },
];

const MENU = [
  {
    title: "Entrées",
    items: [
      { name: "Tartare de bœuf", desc: "Câpres frites, jaune d’œuf confit, croûtons au levain", price: 19 },
      { name: "Betteraves rôties", desc: "Chèvre des Cantons, noix de Grenoble, miel de sarrasin", price: 16 },
      { name: "Huîtres du jour (6)", desc: "Mignonnette à l’érable et au poivre long", price: 21 },
    ],
  },
  {
    title: "Plats",
    items: [
      { name: "Magret de canard", desc: "Légumes racines, purée de panais, jus au cassis", price: 36 },
      { name: "Omble chevalier", desc: "Beurre blanc, poireaux grillés, pommes de terre fondantes", price: 34 },
      { name: "Risotto forestier", desc: "Champignons sauvages, parmesan vieilli, huile de truffe", price: 28 },
    ],
  },
  {
    title: "Desserts",
    items: [
      { name: "Crème brûlée à l’érable", desc: "Petits fruits de saison", price: 11 },
      { name: "Tarte au sucre revisitée", desc: "Crème fraîche, fleur de sel", price: 12 },
      { name: "Fromages d’ici", desc: "Trois fromages du Québec, confit d’oignons", price: 17 },
    ],
  },
];

const HOURS = [
  ["Mercredi au dimanche", "17 h – 22 h"],
  ["Brunch samedi et dimanche", "10 h – 14 h"],
  ["Lundi et mardi", "Fermé"],
];

const formTheme: DemoFormTheme = {
  label: "text-[#E7DCCB]",
  input:
    "w-full rounded-xl border border-[#F4EBDD]/15 bg-[#14100D] px-4 py-3 text-base text-[#F4EBDD] [color-scheme:dark] placeholder:text-[#F4EBDD]/35 focus:border-[#C9A26A] focus:outline-none focus:ring-2 focus:ring-[#C9A26A]/30",
  chip: "border border-[#F4EBDD]/20 text-[#F4EBDD]",
  chipActive: "bg-[#C9A26A] text-[#14100D]",
  button: "bg-[#C9A26A] text-[#14100D] hover:bg-[#D9B57E]",
  success: "border border-[#C9A26A]/30 bg-[#C9A26A]/10 text-[#F4EBDD]",
  link: "text-[#C9A26A]",
};

export default function RestaurantDemo() {
  return (
    <div className={`${playfair.variable} min-h-screen bg-[#14100D] text-[#F4EBDD]`}>
      <DemoBanner business="Bistro Vermeil" />

      <header className="sticky top-0 z-40 border-b border-[#F4EBDD]/10 bg-[#14100D]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <a href="#accueil" className={`${serif} text-2xl italic tracking-wide`}>
            Vermeil
          </a>
          <nav aria-label="Navigation du restaurant" className="hidden items-center gap-8 text-[0.78rem] uppercase tracking-[0.2em] text-[#E7DCCB]/80 md:flex">
            <a href="#menu" className="transition hover:text-[#C9A26A]">Menu</a>
            <a href="#experience" className="transition hover:text-[#C9A26A]">L’expérience</a>
            <a href="#horaires" className="transition hover:text-[#C9A26A]">Horaires</a>
          </nav>
          <a
            href="#reserver"
            className="inline-flex min-h-11 items-center rounded-full border border-[#C9A26A] px-5 text-sm font-semibold text-[#C9A26A] transition hover:bg-[#C9A26A] hover:text-[#14100D]"
          >
            Réserver
          </a>
        </div>
      </header>

      <main>
        <section id="accueil" className="relative isolate flex min-h-[86svh] items-end overflow-hidden">
          <DemoPhoto
            name="demo-restaurant-hero"
            alt="Table du bistro : magret de canard, salade de betteraves, crème brûlée et deux verres de vin"
            sizes="100vw"
            priority
            className="absolute inset-0 -z-10"
            fallback="bg-linear-to-br from-[#4A2A18] via-[#2A1A10] to-[#14100D]"
          />
          <div className="absolute inset-0 -z-10 bg-linear-to-t from-[#14100D] via-[#14100D]/60 to-[#14100D]/10" aria-hidden="true" />
          <div className="mx-auto w-full max-w-6xl px-5 pb-16 pt-40 sm:pb-24">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A26A]">Bistro de quartier · Plateau-Mont-Royal</p>
            <h1 className={`${serif} mt-5 max-w-3xl text-5xl leading-[1.02] sm:text-7xl`}>Une table vous attend</h1>
            <p className="mt-6 max-w-xl text-lg text-[#F4EBDD]/85">
              Cuisine du marché, produits du Québec et vins nature, du mercredi au dimanche.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <a href="#reserver" className="inline-flex min-h-12 items-center rounded-full bg-[#C9A26A] px-7 font-semibold text-[#14100D] transition hover:bg-[#D9B57E]">
                Réserver une table
              </a>
              <a href="#menu" className="inline-flex min-h-12 items-center rounded-full border border-[#F4EBDD]/40 px-7 font-semibold transition hover:border-[#F4EBDD]">
                Voir le menu
              </a>
            </div>
          </div>
        </section>

        <section aria-label="Ce qui nous distingue" className="border-y border-[#F4EBDD]/10">
          <div className="mx-auto grid max-w-6xl gap-px bg-[#F4EBDD]/10 sm:grid-cols-3">
            {HIGHLIGHTS.map(({ icon: Icon, title, text }) => (
              <div key={title} className="bg-[#14100D] px-6 py-9 sm:px-8">
                <Icon className="size-6 text-[#C9A26A]" strokeWidth={1.6} aria-hidden="true" />
                <h2 className={`${serif} mt-4 text-xl`}>{title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-[#BFAF9A]">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="menu" className="mx-auto max-w-6xl scroll-mt-20 px-5 py-24">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A26A]">Carte d’automne</p>
            <h2 className={`${serif} mt-4 text-4xl sm:text-5xl`}>Le menu</h2>
            <p className="mt-3 text-sm text-[#BFAF9A]">Prix en dollars canadiens, taxes en sus. Options végétariennes à chaque service.</p>
          </div>
          <div className="mt-14 grid gap-12 md:grid-cols-3">
            {MENU.map((group) => (
              <div key={group.title}>
                <h3 className={`${serif} border-b border-[#C9A26A]/30 pb-3 text-2xl text-[#C9A26A]`}>{group.title}</h3>
                <ul className="mt-6 space-y-6">
                  {group.items.map((item) => (
                    <li key={item.name}>
                      <div className="flex items-baseline gap-3">
                        <span className="font-semibold">{item.name}</span>
                        <span className="flex-1 border-b border-dotted border-[#F4EBDD]/25" aria-hidden="true" />
                        <span className="tabular-nums text-[#C9A26A]">{item.price}&nbsp;$</span>
                      </div>
                      <p className="mt-1 text-sm text-[#BFAF9A]">{item.desc}</p>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="scroll-mt-20 bg-[#1C1612]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2">
            <DemoPhoto
              name="demo-restaurant-salle"
              alt="Salle du bistro éclairée aux chandelles, avec un plat de saumon et un verre de vin blanc"
              sizes="(min-width: 768px) 540px, 100vw"
              className="aspect-[4/3] rounded-[2rem]"
              fallback="bg-linear-to-br from-[#5A3A22] to-[#1C1612]"
            />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A26A]">L’expérience</p>
              <h2 className={`${serif} mt-4 text-4xl leading-tight`}>Une salle chaleureuse, une cuisine ouverte</h2>
              <p className="mt-5 leading-relaxed text-[#E7DCCB]/85">
                Quarante places, des chandelles sur chaque table et une équipe qui prend le temps de vous conseiller. L’été, la terrasse s’ouvre
                sur la rue.
              </p>
              <ul className="mt-7 space-y-3">
                {["Groupes et événements privés jusqu’à 40 personnes", "Menu dégustation sur réservation", "Terrasse de mai à septembre"].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-[#C9A26A]" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="reserver" className="mx-auto grid max-w-6xl scroll-mt-20 gap-10 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr]">
          <div id="horaires" className="scroll-mt-24">
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-[#C9A26A]">Nous trouver</p>
            <h2 className={`${serif} mt-4 text-4xl`}>Horaires</h2>
            <dl className="mt-8 divide-y divide-[#F4EBDD]/10 border-y border-[#F4EBDD]/10">
              {HOURS.map(([d, h]) => (
                <div key={d} className="flex justify-between gap-4 py-4">
                  <dt className="text-[#E7DCCB]/85">{d}</dt>
                  <dd className="font-semibold">{h}</dd>
                </div>
              ))}
            </dl>
            <ul className="mt-8 space-y-3 text-[#E7DCCB]/85">
              <li className="flex items-center gap-3">
                <MapPin className="size-5 text-[#C9A26A]" aria-hidden="true" />
                Plateau-Mont-Royal, Montréal
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-5 text-[#C9A26A]" aria-hidden="true" />
                <a href="tel:+15145550142" className="hover:text-[#C9A26A]">(514) 555-0142</a>
              </li>
              <li className="flex items-center gap-3">
                <Clock3 className="size-5 text-[#C9A26A]" aria-hidden="true" />
                Réservations jusqu’à 30 jours à l’avance
              </li>
            </ul>
          </div>
          <div className="rounded-[1.75rem] border border-[#F4EBDD]/10 bg-[#1C1612] p-6 sm:p-9">
            <h2 className={`${serif} text-3xl`}>Réserver une table</h2>
            <p className="mt-2 mb-7 text-sm text-[#BFAF9A]">Confirmation par texto dans l’heure, pendant les heures d’ouverture.</p>
            <DemoForm
              theme={formTheme}
              submitLabel="Demander ma réservation"
              fields={[
                { name: "date", label: "Date", type: "date", required: true },
                {
                  name: "heure",
                  label: "Heure",
                  type: "select",
                  required: true,
                  options: ["17 h 00", "17 h 30", "18 h 00", "18 h 30", "19 h 00", "19 h 30", "20 h 00", "20 h 30", "21 h 00"],
                },
                {
                  name: "personnes",
                  label: "Nombre de personnes",
                  type: "select",
                  required: true,
                  options: ["1 personne", "2 personnes", "3 personnes", "4 personnes", "5 personnes", "6 personnes", "7 personnes et plus"],
                },
                { name: "nom", label: "Nom", required: true, autoComplete: "name" },
                { name: "telephone", label: "Téléphone", type: "tel", required: true, autoComplete: "tel", full: true },
                { name: "note", label: "Allergies ou occasion spéciale (facultatif)", type: "textarea" },
              ]}
            />
          </div>
        </section>
      </main>

      <DemoEndCta tone="dark" />
      <footer className="border-t border-[#F4EBDD]/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-[#BFAF9A] sm:flex-row sm:justify-between">
          <p>© 2026 Bistro Vermeil · entreprise fictive</p>
          <p>
            Site de démonstration conçu par{" "}
            <a href="/fr" className="font-semibold text-[#F4EBDD] underline underline-offset-4">
              Zenvyqo Digital
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
