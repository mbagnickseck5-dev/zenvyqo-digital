import Image from "next/image";
import { MapPin, MessageCircle } from "lucide-react";
import type { Dictionary } from "@/lib/i18n";

/*
 * Visuel du héros. Composant serveur : les animations d'entrée sont en CSS
 * (classes zq-* dans globals.css), sans JavaScript. La photo, élément le plus
 * grand de l'écran, s'affiche immédiatement : elle n'est jamais masquée au chargement.
 */

// Silhouette stylisée du centre-ville : [x, largeur, hauteur]
const BUILDINGS: [number, number, number][] = [
  [0, 40, 150], [44, 30, 205], [78, 44, 170], [126, 30, 120], [160, 44, 96],
  [208, 40, 84], [252, 56, 70], [312, 40, 88], [356, 48, 104], [408, 34, 132],
  [446, 46, 186], [496, 30, 222], [530, 38, 164], [572, 28, 120],
];

function Skyline() {
  return (
    <svg viewBox="0 0 600 240" preserveAspectRatio="xMidYMax slice" className="h-full w-full" aria-hidden="true">
      {/* Le mont Royal, derrière les tours */}
      <path d="M-20 240 C 90 120, 250 90, 360 130 S 560 190, 620 240 Z" fill="#0F2B55" />
      {BUILDINGS.map(([x, w, h], i) => (
        <g key={x}>
          <rect x={x} y={240 - h} width={w} height={h} fill={i % 2 ? "#16386C" : "#123061"} />
          {Array.from({ length: Math.floor(h / 16) }).map((_, row) =>
            Array.from({ length: Math.floor(w / 12) }).map((_, col) =>
              (row * 7 + col * 3 + i) % 3 === 0 ? (
                <rect key={`${row}-${col}`} x={x + 5 + col * 12} y={240 - h + 8 + row * 16} width="5" height="7" fill="#00C2FF" opacity="0.55" />
              ) : null,
            ),
          )}
        </g>
      ))}
    </svg>
  );
}

export function HeroVisual({ t, image }: { t: Dictionary["hero"]; image?: string | null }) {
  // Photo disponible : on l'affiche. Sinon, illustration de secours ci-dessous.
  if (image) {
    return (
      <div className="relative mx-auto w-full max-w-xl">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-2xl shadow-electric/30 ring-1 ring-white/15">
          <Image
            src={image}
            alt={t.photoAlt}
            fill
            priority
            fetchPriority="high"
            sizes="(min-width: 1280px) 560px, (min-width: 1024px) 45vw, (min-width: 640px) 576px, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-night-deep/70 via-transparent to-transparent" aria-hidden="true" />
        </div>
        <div className="zq-drop absolute -top-4 right-4 flex items-center gap-2.5 rounded-2xl bg-night-deep/95 px-4 py-2.5 text-white shadow-xl ring-1 ring-white/15">
          <MapPin className="size-5 text-cyan" aria-hidden="true" />
          <span className="text-sm leading-tight">
            <strong className="block font-semibold">{t.location}</strong>
            <span className="text-white/75">{t.locationSub}</span>
          </span>
        </div>
        <div
          aria-hidden="true"
          className="zq-slide absolute -bottom-4 left-4 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-night shadow-xl"
        >
          <span className="grid size-8 place-items-center rounded-full bg-electric text-white">
            <MessageCircle className="size-4" />
          </span>
          {t.previewChip}
        </div>
      </div>
    );
  }

  return (
    <div role="img" aria-label={t.previewLabel} className="relative mx-auto w-full max-w-xl pb-20 pt-10">
      <div className="absolute inset-x-0 bottom-0 top-0 overflow-hidden rounded-3xl bg-linear-to-b from-electric/20 via-night to-night-deep ring-1 ring-white/10">
        <div className="absolute -right-10 -top-16 size-64 rounded-full bg-cyan/25 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-4/5">
          <Skyline />
        </div>
      </div>

      {/* Pastille de localisation */}
      <div
        aria-hidden="true"
        className="zq-drop absolute right-4 top-4 z-10 flex items-center gap-2.5 rounded-2xl bg-night-deep/90 px-4 py-2.5 text-white shadow-xl ring-1 ring-white/15"
      >
        <MapPin className="size-5 text-cyan" />
        <span className="text-sm leading-tight">
          <strong className="block font-semibold">{t.location}</strong>
          <span className="text-white/75">{t.locationSub}</span>
        </span>
      </div>

      {/* Ordinateur portable avec aperçu de site */}
      <div aria-hidden="true" className="zq-laptop relative z-[1] mx-auto mt-16 w-[68%]">
        <div className="rounded-t-xl border-[7px] border-b-0 border-slate-800 bg-white">
          <div className="flex items-center justify-between border-b border-line px-3 py-2">
            <span className="font-display text-[0.7rem] font-extrabold text-night">{t.previewBrand}</span>
            <span className="flex gap-2">
              <span className="h-1.5 w-6 rounded-full bg-line" />
              <span className="h-1.5 w-6 rounded-full bg-line" />
              <span className="h-1.5 w-6 rounded-full bg-line" />
            </span>
          </div>
          <div className="bg-linear-to-br from-night to-electric px-4 py-5 text-white">
            <p className="font-display text-base font-extrabold leading-tight sm:text-lg">{t.previewTitle}</p>
            <span className="mt-3 inline-block rounded-md bg-cyan px-3 py-1 text-[0.7rem] font-bold text-night">{t.previewCta}</span>
          </div>
          <div className="grid grid-cols-3 gap-2 p-3">
            <span className="h-10 rounded-md bg-mist" />
            <span className="h-10 rounded-md bg-electric/15" />
            <span className="h-10 rounded-md bg-mist" />
          </div>
        </div>
        <div className="-mx-[7%] h-3 rounded-b-xl bg-linear-to-b from-slate-300 to-slate-400" />
      </div>

      {/* Notification de demande */}
      <div
        aria-hidden="true"
        className="zq-slide absolute bottom-5 left-4 z-10 flex items-center gap-2.5 rounded-xl bg-white px-3.5 py-2.5 text-sm font-semibold text-night shadow-xl"
      >
        <span className="grid size-8 place-items-center rounded-full bg-electric text-white">
          <MessageCircle className="size-4" />
        </span>
        {t.previewChip}
      </div>
    </div>
  );
}
