import Image from "next/image";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { visual, type VisualName } from "@/lib/visuals";

/** Bandeau du haut : rappelle que la page est une démo et ramène vers Zenvyqo. */
export function DemoBanner({ business }: { business: string }) {
  return (
    <div className="relative z-50 bg-[#0B1E3D] font-sans text-white">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-2 text-[0.8125rem] sm:text-sm">
        <a href="/fr#realisations" className="inline-flex min-h-9 items-center gap-1.5 font-semibold text-white/85 transition hover:text-white">
          <ArrowLeft className="size-4" aria-hidden="true" />
          <span className="sm:hidden">Retour</span>
          <span className="hidden sm:inline">Retour aux exemples</span>
        </a>
        <p className="text-center leading-snug text-white/75">
          <span className="md:hidden">Démo · </span>
          <span className="hidden md:inline">Site de démonstration conçu par </span>
          <strong className="font-semibold text-white">Zenvyqo Digital</strong>
          <span className="hidden md:inline"> · {business} est une entreprise fictive</span>
        </p>
        <a
          href="/fr#forfaits"
          className="inline-flex min-h-9 shrink-0 items-center rounded-lg bg-[#0066FF] px-3 font-semibold transition hover:bg-[#0052CC]"
        >
          Je veux ce site
        </a>
      </div>
    </div>
  );
}

/** Encadré de fin de démo : invite le visiteur à commander le même type de site. */
export function DemoEndCta({ tone = "light" }: { tone?: "light" | "dark" }) {
  const dark = tone === "dark";
  return (
    <section className={`font-sans ${dark ? "bg-[#0B1E3D] text-white" : "bg-[#F5F7FB] text-[#0B1E3D]"}`}>
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-5 px-5 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className={`text-sm font-semibold uppercase tracking-wider ${dark ? "text-[#00C2FF]" : "text-[#0052CC]"}`}>
            Démonstration Zenvyqo Digital
          </p>
          <p className="mt-2 max-w-xl font-[family-name:var(--font-montserrat)] text-xl font-bold sm:text-2xl">
            Le même niveau de site pour votre entreprise, dès 69&nbsp;$&nbsp;CA par mois.
          </p>
        </div>
        <a
          href="/fr#forfaits"
          className="inline-flex min-h-12 items-center gap-2 rounded-xl bg-[#0066FF] px-6 font-semibold text-white shadow-lg shadow-[#0066FF]/30 transition hover:bg-[#0052CC]"
        >
          Voir les forfaits
          <ArrowRight className="size-5" aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}

/** Photo d'une démo, avec un dégradé de secours si le fichier est indisponible. */
export function DemoPhoto({
  name,
  alt,
  sizes,
  className = "",
  priority = false,
  fallback,
}: {
  name: VisualName;
  alt: string;
  sizes: string;
  className?: string;
  priority?: boolean;
  fallback: string;
}) {
  const src = visual(name);
  // Le conteneur est positionné en relatif, sauf si l'appelant le place lui-même en absolu.
  const position = /\b(absolute|fixed)\b/.test(className) ? "" : "relative";
  return (
    <div className={`${position} overflow-hidden ${className}`}>
      {src ? (
        <Image src={src} alt={alt} fill sizes={sizes} priority={priority} className="object-cover" />
      ) : (
        <div role="img" aria-label={alt} className={`absolute inset-0 ${fallback}`} />
      )}
    </div>
  );
}
