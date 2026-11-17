/** Styles de boutons partagés. */
const base =
  "inline-flex min-h-12 items-center justify-center gap-2 rounded-xl px-6 py-3 text-base font-semibold transition duration-200 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:translate-y-0";

export const btn = {
  primary: `${base} bg-electric text-white shadow-lg shadow-electric/30 hover:bg-electric-dark`,
  outlineLight: `${base} border border-white/40 text-white hover:border-white hover:bg-white/10`,
  outlineDark: `${base} border border-night/25 text-night hover:border-electric hover:text-electric`,
  white: `${base} bg-white text-night shadow-lg hover:bg-mist`,
};

export const container = "mx-auto w-full max-w-6xl px-5 sm:px-8";
export const eyebrow =
  "inline-block rounded-full bg-electric/10 px-3.5 py-1 text-sm font-semibold text-electric-dark";
export const h2 = "font-display text-3xl font-extrabold tracking-tight text-night sm:text-4xl";
