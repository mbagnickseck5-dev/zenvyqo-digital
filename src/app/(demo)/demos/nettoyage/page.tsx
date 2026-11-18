import type { Metadata } from "next";
import { AppWindow, Building2, CalendarCheck, CircleCheck, Clock3, HardHat, Layers, Leaf, Phone, ShieldCheck, Sparkles, Stethoscope, Store } from "lucide-react";
import { DemoBanner, DemoEndCta, DemoPhoto } from "@/components/demo/DemoChrome";
import { DemoForm, type DemoFormTheme } from "@/components/demo/DemoForm";

export const metadata: Metadata = {
  title: "Clarté Entretien · Démo de site d’entreprise de nettoyage | Zenvyqo Digital",
  description:
    "Exemple de site d’entreprise de nettoyage conçu par Zenvyqo Digital : services, méthode, zones desservies et demande de devis. Clarté Entretien est une entreprise fictive.",
};

const eyebrow = "text-xs font-bold uppercase tracking-[0.22em] text-[#0E6B73]";

const SERVICES = [
  { icon: Building2, name: "Bureaux", text: "Postes de travail, salles de réunion, cuisines et salles de bain, le soir après votre équipe." },
  { icon: Store, name: "Commerces", text: "Vitrines, planchers et surfaces de vente prêts avant l’ouverture." },
  { icon: Stethoscope, name: "Cliniques et cabinets", text: "Désinfection des surfaces de contact selon un protocole écrit." },
  { icon: HardHat, name: "Après-construction", text: "Poussière fine, résidus de peinture et vitres, avant la remise des clés." },
  { icon: AppWindow, name: "Vitres intérieures", text: "Cloisons vitrées, portes et miroirs sans traces." },
  { icon: Layers, name: "Planchers", text: "Lavage, décapage et cirage des planchers commerciaux." },
];

const STEPS = [
  { title: "Visite gratuite", text: "Nous visitons vos locaux pour comprendre vos besoins et vos horaires." },
  { title: "Devis clair", text: "Un prix fixe par passage, détaillé pièce par pièce." },
  { title: "Équipe attitrée", text: "Les mêmes personnes à chaque visite, qui connaissent vos lieux." },
  { title: "Contrôle qualité", text: "Une vérification chaque mois et un seul interlocuteur." },
];

const formTheme: DemoFormTheme = {
  label: "text-[#0F2530]",
  input:
    "w-full rounded-xl border border-[#0F2530]/15 bg-white px-4 py-3 text-base text-[#0F2530] placeholder:text-[#4B6470]/60 focus:border-[#0E6B73] focus:outline-none focus:ring-2 focus:ring-[#0E6B73]/25",
  chip: "border border-[#0F2530]/20 text-[#0F2530]",
  chipActive: "bg-[#0E6B73] text-white",
  button: "bg-[#0E6B73] text-white hover:bg-[#0A3D45]",
  success: "bg-[#E8F6F3] text-[#0A3D45]",
  link: "text-[#0E6B73]",
};

export default function NettoyageDemo() {
  return (
    <div className="min-h-screen bg-white text-[#0F2530]">
      <DemoBanner business="Clarté Entretien" />

      <header className="sticky top-0 z-40 border-b border-[#0F2530]/10 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-3.5">
          <a href="#accueil" className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-[#0E6B73] text-white">
              <Sparkles className="size-5" aria-hidden="true" />
            </span>
            <span className="leading-none">
              <span className="block font-display text-lg font-extrabold tracking-tight">Clarté</span>
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.18em] text-[#4B6470]">Entretien commercial</span>
            </span>
          </a>
          <nav aria-label="Navigation de l’entreprise" className="hidden items-center gap-8 text-sm font-semibold text-[#0F2530]/75 md:flex">
            <a href="#services" className="transition hover:text-[#0E6B73]">Services</a>
            <a href="#methode" className="transition hover:text-[#0E6B73]">Notre méthode</a>
            <a href="#secteurs" className="transition hover:text-[#0E6B73]">Secteurs</a>
          </nav>
          <a href="#devis" className="inline-flex min-h-11 items-center rounded-xl bg-[#0E6B73] px-5 text-sm font-semibold text-white transition hover:bg-[#0A3D45]">
            Devis gratuit
          </a>
        </div>
      </header>

      <main>
        <section id="accueil" className="relative overflow-hidden">
          <div className="absolute -right-40 -top-40 size-[34rem] rounded-full bg-[#E8F6F3]" aria-hidden="true" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 py-16 lg:grid-cols-[1fr_1fr] lg:py-24">
            <div>
              <p className={eyebrow}>Entretien commercial · Montréal et Laval</p>
              <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-[3.4rem]">
                Des locaux impeccables, <span className="text-[#0E6B73]">sans y penser</span>
              </h1>
              <p className="mt-6 max-w-lg text-lg leading-relaxed text-[#4B6470]">
                Bureaux, commerces et cliniques entretenus le soir ou la fin de semaine, par une équipe attitrée qui connaît vos lieux.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <a href="#devis" className="inline-flex min-h-12 items-center rounded-xl bg-[#0E6B73] px-6 font-semibold text-white shadow-lg shadow-[#0E6B73]/25 transition hover:bg-[#0A3D45]">
                  Demander un devis gratuit
                </a>
                <a href="tel:+15145550163" className="inline-flex min-h-12 items-center gap-2 rounded-xl border border-[#0F2530]/15 px-6 font-semibold transition hover:border-[#0E6B73]">
                  <Phone className="size-4 text-[#0E6B73]" aria-hidden="true" />
                  (514) 555-0163
                </a>
              </div>
              <ul className="mt-10 flex flex-wrap gap-x-7 gap-y-3 text-sm font-medium text-[#0F2530]/85">
                {[
                  { icon: ShieldCheck, text: "Équipe assurée" },
                  { icon: Leaf, text: "Produits écologiques" },
                  { icon: Clock3, text: "Soir et fin de semaine" },
                ].map(({ icon: Icon, text }) => (
                  <li key={text} className="flex items-center gap-2">
                    <Icon className="size-5 text-[#0E6B73]" aria-hidden="true" />
                    {text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <DemoPhoto
                name="demo-nettoyage-hero"
                alt="Préposée à l’entretien en uniforme sarcelle qui nettoie une cloison vitrée dans un bureau moderne"
                sizes="(min-width: 1024px) 540px, 100vw"
                priority
                className="aspect-[4/3] rounded-[2rem] shadow-2xl shadow-[#0A3D45]/20"
                fallback="bg-linear-to-br from-[#BFE7E1] to-[#0E6B73]"
              />
              <div className="absolute -bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-xl shadow-[#0A3D45]/15">
                <span className="grid size-10 place-items-center rounded-full bg-[#E8F6F3] text-[#0E6B73]">
                  <CalendarCheck className="size-5" aria-hidden="true" />
                </span>
                <span className="text-sm leading-tight">
                  <span className="block text-[#4B6470]">Prochain passage</span>
                  <strong>Ce soir, 19 h · bureaux du 4e</strong>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section id="services" className="scroll-mt-20 bg-[#F6FAF9]">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <p className={eyebrow}>Services</p>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Un entretien adapté à chaque type de locaux</h2>
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map(({ icon: Icon, name, text }) => (
                <article key={name} className="rounded-2xl border border-[#0F2530]/8 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[#0A3D45]/10">
                  <span className="grid size-12 place-items-center rounded-xl bg-[#E8F6F3] text-[#0E6B73]">
                    <Icon className="size-6" strokeWidth={1.8} aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 font-display text-lg font-bold">{name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4B6470]">{text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="methode" className="scroll-mt-20">
          <div className="mx-auto max-w-6xl px-5 py-24">
            <p className={eyebrow}>Notre méthode</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Simple, du premier appel au premier passage</h2>
            <ol className="mt-14 grid gap-8 md:grid-cols-4">
              {STEPS.map((step, i) => (
                <li key={step.title} className="relative">
                  <span className="grid size-12 place-items-center rounded-full bg-[#0E6B73] font-display text-lg font-extrabold text-white">{i + 1}</span>
                  {i < STEPS.length - 1 && <span className="absolute left-14 right-0 top-6 hidden h-px bg-[#0E6B73]/25 md:block" aria-hidden="true" />}
                  <h3 className="mt-5 font-display text-lg font-bold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#4B6470]">{step.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section id="secteurs" className="scroll-mt-20 bg-[#E8F6F3]">
          <div className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-24 md:grid-cols-2">
            <DemoPhoto
              name="demo-nettoyage-materiel"
              alt="Chariot d’entretien, vadrouille et produits dans un bureau lumineux au plancher brillant"
              sizes="(min-width: 768px) 540px, 100vw"
              className="aspect-[4/3] rounded-[2rem]"
              fallback="bg-linear-to-br from-[#9AD9CF] to-[#0E6B73]"
            />
            <div>
              <p className={eyebrow}>Secteurs desservis</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Partout dans le Grand Montréal</h2>
              <p className="mt-5 leading-relaxed text-[#4B6470]">Contrats mensuels ou interventions ponctuelles, avec le même niveau d’exigence.</p>
              <ul className="mt-7 flex flex-wrap gap-2.5">
                {["Montréal", "Laval", "Longueuil", "Brossard"].map((city) => (
                  <li key={city} className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#0A3D45] shadow-sm">
                    {city}
                  </li>
                ))}
              </ul>
              <ul className="mt-8 space-y-3">
                {["Clés et codes d’alarme gérés de façon sécurisée", "Fournitures sanitaires incluses sur demande", "Rapport après chaque passage"].map((t) => (
                  <li key={t} className="flex items-start gap-3">
                    <CircleCheck className="mt-0.5 size-5 shrink-0 text-[#0E6B73]" aria-hidden="true" />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section id="devis" className="scroll-mt-20 bg-[#0A3D45] text-white">
          <div className="mx-auto grid max-w-6xl gap-12 px-5 py-24 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7FD8CC]">Devis gratuit</p>
              <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">Recevez votre prix en 24&nbsp;h</h2>
              <p className="mt-5 leading-relaxed text-white/80">
                Décrivez vos locaux en une minute. Nous vous rappelons pour planifier une visite, sans engagement.
              </p>
              <a href="tel:+15145550163" className="mt-8 inline-flex items-center gap-2 font-semibold text-[#7FD8CC] hover:text-white">
                <Phone className="size-5" aria-hidden="true" />
                (514) 555-0163
              </a>
            </div>
            <div className="rounded-[1.75rem] bg-white p-6 text-[#0F2530] shadow-2xl sm:p-9">
              <DemoForm
                theme={formTheme}
                submitLabel="Recevoir mon devis"
                fields={[
                  { name: "entreprise", label: "Entreprise", required: true, autoComplete: "organization", full: true },
                  {
                    name: "locaux",
                    label: "Type de locaux",
                    type: "select",
                    required: true,
                    options: ["Bureaux", "Commerce", "Clinique ou cabinet", "Après-construction", "Autre"],
                  },
                  {
                    name: "superficie",
                    label: "Superficie",
                    type: "select",
                    required: true,
                    options: ["Moins de 2 000 pi²", "2 000 à 5 000 pi²", "5 000 à 15 000 pi²", "Plus de 15 000 pi²"],
                  },
                  {
                    name: "frequence",
                    label: "Fréquence souhaitée",
                    type: "select",
                    required: true,
                    options: ["Une seule fois", "Chaque semaine", "2 à 3 fois par semaine", "Tous les jours"],
                    full: true,
                  },
                  { name: "nom", label: "Nom", required: true, autoComplete: "name" },
                  { name: "telephone", label: "Téléphone", type: "tel", required: true, autoComplete: "tel" },
                ]}
              />
            </div>
          </div>
        </section>
      </main>

      <DemoEndCta />
      <footer className="border-t border-[#0F2530]/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 text-sm text-[#4B6470] sm:flex-row sm:justify-between">
          <p>© 2026 Clarté Entretien · entreprise fictive</p>
          <p>
            Site de démonstration conçu par{" "}
            <a href="/fr" className="font-semibold text-[#0F2530] underline underline-offset-4">
              Zenvyqo Digital
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
