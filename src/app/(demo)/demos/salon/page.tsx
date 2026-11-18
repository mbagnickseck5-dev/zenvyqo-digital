import type { Metadata } from "next";
import { CalendarCheck, Clock3, Coffee, Droplets, Gem, Leaf, MapPin, Palette, Phone, Scissors, Sparkles, Sun, Wind } from "lucide-react";
import { DemoBanner, DemoEndCta, DemoPhoto } from "@/components/demo/DemoChrome";
import { DemoForm, type DemoFormTheme } from "@/components/demo/DemoForm";
import { fraunces } from "@/lib/demoFonts";

export const metadata: Metadata = {
  title: "Atelier Orphée · Démo de site de salon de coiffure | Zenvyqo Digital",
  description:
    "Exemple de site de salon de coiffure conçu par Zenvyqo Digital : services, tarifs et prise de rendez-vous en ligne. Atelier Orphée est une entreprise fictive.",
};

const serif = "font-[family-name:var(--font-fraunces)]";
const eyebrow = "text-xs font-semibold uppercase tracking-[0.25em]";

const SERVICES = [
  { icon: Scissors, name: "Coupe et mise en plis", desc: "Diagnostic, shampoing, coupe sur mesure et coiffage.", duration: "60 min", price: "dès 65 $" },
  { icon: Wind, name: "Coupe homme", desc: "Ciseaux ou tondeuse, finition soignée à la nuque.", duration: "30 min", price: "dès 38 $" },
  { icon: Palette, name: "Couleur racines", desc: "Couleur sans ammoniaque, choisie selon votre teint.", duration: "90 min", price: "dès 85 $" },
  { icon: Sparkles, name: "Balayage", desc: "Éclaircissement à main levée pour un effet naturel.", duration: "3 h", price: "dès 175 $" },
  { icon: Droplets, name: "Soin profond", desc: "Masque réparateur et massage du cuir chevelu.", duration: "20 min", price: "35 $" },
  { icon: Gem, name: "Coiffure d’événement", desc: "Chignon ou ondulations pour mariage et soirée.", duration: "60 min", price: "dès 80 $" },
];

const HOURS = [
  ["Mardi au vendredi", "10 h – 19 h"],
  ["Samedi", "9 h – 17 h"],
  ["Dimanche et lundi", "Fermé"],
];

const formTheme: DemoFormTheme = {
  label: "text-[#3A2232]",
  input:
    "w-full rounded-xl border border-[#4A2340]/15 bg-[#FFF8F6] px-4 py-3 text-base text-[#2D1227] placeholder:text-[#7A5D6C]/60 focus:border-[#A34E6E] focus:outline-none focus:ring-2 focus:ring-[#A34E6E]/25",
  chip: "border border-[#4A2340]/20 bg-white text-[#4A2340] hover:border-[#A34E6E]",
  chipActive: "border border-[#4A2340] bg-[#4A2340] text-white",
  button: "bg-[#4A2340] text-white hover:bg-[#2D1227]",
  success: "bg-[#F7E6E3] text-[#2D1227]",
  link: "text-[#A34E6E]",
};

export default function SalonDemo() {
  return (
    <div className={`${fraunces.variable} min-h-screen bg-[#FFF8F6] text-[#3A2232]`}>
      <DemoBanner business="Atelier Orphée" />

      <header className="sticky top-0 z-40 border-b border-[#4A2340]/10 bg-[#FFF8F6]/85 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <a href="#accueil" className={`${serif} flex items-center gap-2 text-xl font-semibold text-[#2D1227]`}>
            <span className="size-2.5 rounded-full bg-[#D79CAA]" aria-hidden="true" />
            Atelier Orphée
          </a>
          <nav aria-label="Navigation du salon" className="hidden items-center gap-8 text-sm font-medium text-[#3A2232]/80 md:flex">
            <a href="#services" className="transition hover:text-[#A34E6E]">Services</a>
            <a href="#salon" className="transition hover:text-[#A34E6E]">Le salon</a>
            <a href="#horaires" className="transition hover:text-[#A34E6E]">Horaires</a>
          </nav>
          <a href="#rendez-vous" className="inline-flex min-h-11 items-center rounded-full bg-[#4A2340] px-5 text-sm font-semibold text-white transition hover:bg-[#2D1227]">
            Rendez-vous
          </a>
        </div>
      </header>

      <main>
        <section id="accueil" className="overflow-hidden bg-linear-to-br from-[#FBEDEA] via-[#F7E6E3] to-[#F1DCE3]">
          <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-16 lg:grid-cols-[1fr_0.9fr] lg:py-24">
            <div>
              <p className={`${eyebrow} text-[#A34E6E]`}>Salon de coiffure · Mile End</p>
              <h1 className={`${serif} mt-5 text-5xl leading-[1.05] text-[#2D1227] sm:text-6xl`}>
                Votre style, <span className="text-[#A34E6E]">sur rendez-vous</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#3A2232]/85">
                Coupe, couleur et soins dans un salon lumineux du Mile End. Réservez en ligne en moins d’une minute.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#rendez-vous" className="inline-flex min-h-12 items-center rounded-full bg-[#4A2340] px-7 font-semibold text-white shadow-lg shadow-[#4A2340]/25 transition hover:bg-[#2D1227]">
                  Prendre rendez-vous
                </a>
                <a href="#services" className="inline-flex min-h-12 items-center rounded-full border border-[#4A2340]/30 px-7 font-semibold text-[#4A2340] transition hover:border-[#4A2340]">
                  Voir les tarifs
                </a>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-[#3A2232]/80">
                <li className="flex items-center gap-2">
                  <Clock3 className="size-4 text-[#A34E6E]" aria-hidden="true" />
                  Ouvert du mardi au samedi
                </li>
                <li className="flex items-center gap-2">
                  <Palette className="size-4 text-[#A34E6E]" aria-hidden="true" />
                  Consultation couleur offerte
                </li>
              </ul>
            </div>
            <div className="relative mx-auto w-full max-w-md lg:max-w-none">
              <DemoPhoto
                name="demo-salon-hero"
                alt="Coiffeuse qui termine des ondulations souples sur les cheveux d’une cliente"
                sizes="(min-width: 1024px) 500px, 100vw"
                priority
                className="aspect-[4/5] rounded-[2.5rem] shadow-2xl shadow-[#4A2340]/20"
                fallback="bg-linear-to-br from-[#E9C6CF] to-[#4A2340]"
              />
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-[#4A2340]/15">
                <span className="grid size-10 place-items-center rounded-full bg-[#F7E6E3] text-[#A34E6E]">
                  <CalendarCheck className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm leading-tight">
                  <span className="block text-[#7A5D6C]">Prochaine disponibilité</span>
                  <strong className="text-[#2D1227]">Demain, 10 h 30</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className={`${eyebrow} text-[#A34E6E]`}>Services et tarifs</p>
                <h2 className={`${serif} mt-4 max-w-lg text-4xl leading-tight text-[#2D1227]`}>Des soins pensés pour vos cheveux</h2>
              </div>
              <p className="max-w-sm text-[#7A5D6C]">Tarifs de départ, selon la longueur et l’épaisseur des cheveux. Prix avant taxes.</p>
            </div>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map(({ icon: Icon, name, desc, duration, price }) => (
                <article
                  key={name}
                  className="flex flex-col rounded-3xl border border-[#4A2340]/10 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#4A2340]/10"
                >
                  <Icon className="size-7 text-[#A34E6E]" strokeWidth={1.6} aria-hidden="true" />
                  <h3 className={`${serif} mt-5 text-xl text-[#2D1227]`}>{name}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-[#7A5D6C]">{desc}</p>
                  <p className="mt-6 flex items-baseline justify-between border-t border-[#4A2340]/10 pt-4">
                    <span className="text-sm text-[#7A5D6C]">{duration}</span>
                    <span className="font-semibold text-[#4A2340]">{price}</span>
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="salon" className="scroll-mt-20 bg-[#2D1227] text-[#FBEDEA]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2">
            <div>
              <p className={`${eyebrow} text-[#D79CAA]`}>Le salon</p>
              <h2 className={`${serif} mt-4 text-4xl leading-tight`}>Un espace pensé pour prendre son temps</h2>
              <p className="mt-5 leading-relaxed text-[#FBEDEA]/80">
                Trois fauteuils, des miroirs éclairés et une équipe qui vous écoute avant de prendre les ciseaux.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { icon: Leaf, text: "Produits professionnels sans sulfates" },
                  { icon: Coffee, text: "Café, thé ou kombucha pendant votre soin" },
                  { icon: Sun, text: "Ambiance calme, musique douce" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-3">
                    <span className="grid size-9 place-items-center rounded-full bg-[#FBEDEA]/10">
                      <Icon className="size-4 text-[#D79CAA]" aria-hidden="true" />
                    </span>
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <DemoPhoto
              name="demo-salon-espace"
              alt="Intérieur du salon : fauteuils, miroirs ronds éclairés et plantes"
              sizes="(min-width: 768px) 540px, 100vw"
              className="aspect-[4/3] rounded-[2rem]"
              fallback="bg-linear-to-br from-[#6B3A7A] to-[#2D1227]"
            />
          </div>
        </section>

        <section id="rendez-vous" className="scroll-mt-20">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[0.85fr_1.15fr]">
            <div>
              <p className={`${eyebrow} text-[#A34E6E]`}>Rendez-vous</p>
              <h2 className={`${serif} mt-4 text-4xl leading-tight text-[#2D1227]`}>Réservez en trois étapes</h2>
              <ol className="mt-8 space-y-5">
                {["Choisissez votre service", "Choisissez un créneau libre", "Recevez la confirmation par texto"].map((step, i) => (
                  <li key={step} className="flex items-center gap-4">
                    <span className={`${serif} grid size-10 shrink-0 place-items-center rounded-full bg-[#F7E6E3] text-lg text-[#A34E6E]`}>{i + 1}</span>
                    <span className="font-medium">{step}</span>
                  </li>
                ))}
              </ol>
              <div id="horaires" className="mt-12 scroll-mt-24">
                <h3 className={`${serif} text-2xl text-[#2D1227]`}>Horaires</h3>
                <dl className="mt-4 divide-y divide-[#4A2340]/10 border-y border-[#4A2340]/10">
                  {HOURS.map(([d, h]) => (
                    <div key={d} className="flex justify-between gap-4 py-3">
                      <dt className="text-[#7A5D6C]">{d}</dt>
                      <dd className="font-semibold text-[#2D1227]">{h}</dd>
                    </div>
                  ))}
                </dl>
                <ul className="mt-6 space-y-3 text-[#3A2232]/85">
                  <li className="flex items-center gap-3">
                    <MapPin className="size-5 text-[#A34E6E]" aria-hidden="true" />
                    Mile End, Montréal
                  </li>
                  <li className="flex items-center gap-3">
                    <Phone className="size-5 text-[#A34E6E]" aria-hidden="true" />
                    <a href="tel:+15145550187" className="hover:text-[#A34E6E]">(514) 555-0187</a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="h-fit rounded-[2rem] bg-white p-6 shadow-xl shadow-[#4A2340]/10 sm:p-9">
              <h3 className={`${serif} text-3xl text-[#2D1227]`}>Prendre rendez-vous</h3>
              <p className="mt-2 mb-7 text-sm text-[#7A5D6C]">Annulation gratuite jusqu’à 24 h avant votre rendez-vous.</p>
              <DemoForm
                theme={formTheme}
                submitLabel="Confirmer mon rendez-vous"
                fields={[
                  { name: "service", label: "Service", type: "select", required: true, options: SERVICES.map((s) => s.name), full: true },
                  { name: "date", label: "Date", type: "date", required: true, full: true },
                  { name: "creneau", label: "Créneau", type: "chips", options: ["10 h 00", "11 h 30", "13 h 00", "14 h 30", "16 h 00", "17 h 30"] },
                  { name: "nom", label: "Nom", required: true, autoComplete: "name" },
                  { name: "telephone", label: "Téléphone", type: "tel", required: true, autoComplete: "tel" },
                ]}
              />
            </div>
          </div>
        </section>
      </main>

      <DemoEndCta />
      <footer className="border-t border-[#4A2340]/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-[#7A5D6C] sm:flex-row sm:justify-between">
          <p>© 2026 Atelier Orphée · entreprise fictive</p>
          <p>
            Site de démonstration conçu par{" "}
            <a href="/fr" className="font-semibold text-[#2D1227] underline underline-offset-4">
              Zenvyqo Digital
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
