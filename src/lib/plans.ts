/**
 * Les trois forfaits Zenvyqo Digital. Source unique de vérité pour les prix :
 * l'affichage, le formulaire et Stripe lisent tous ce fichier.
 * Montants en dollars canadiens, avant taxes.
 */
export const PLAN_IDS = ["business-pro", "business-plus", "boutique-pro"] as const;
export type PlanId = (typeof PLAN_IDS)[number];

export interface Plan {
  id: PlanId;
  name: string;
  /** Mensualité en $ CA */
  monthly: number;
  /** Frais de création uniques en $ CA */
  setup: number;
  featured: boolean;
}

export const COMMITMENT_MONTHS = 12;

/**
 * Offre de lancement « clients fondateurs » : frais de création offerts et
 * engagement réduit, pour les premières entreprises clientes.
 * Pour la retirer du site une fois les places attribuées : définir
 * NEXT_PUBLIC_FOUNDERS_OFFER=false sur Netlify, puis relancer un déploiement.
 */
export const FOUNDERS_OFFER = {
  active: process.env.NEXT_PUBLIC_FOUNDERS_OFFER !== "false",
  spots: 5,
  commitmentMonths: 3,
} as const;

/** Remplace {spots}, {months} (et les variables passées) dans un texte de l'offre. */
export function offerText(text: string, vars: Record<string, string | number> = {}): string {
  const all = { spots: FOUNDERS_OFFER.spots, months: FOUNDERS_OFFER.commitmentMonths, ...vars };
  return Object.entries(all).reduce((s, [k, v]) => s.replaceAll(`{${k}}`, String(v)), text);
}

export const PLANS: Plan[] = [
  { id: "business-pro", name: "Business Pro", monthly: 69, setup: 149, featured: true },
  { id: "business-plus", name: "Business Plus", monthly: 99, setup: 249, featured: false },
  { id: "boutique-pro", name: "Boutique Pro", monthly: 149, setup: 399, featured: false },
];

export function getPlan(id: string | null | undefined): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}

export function isPlanId(id: unknown): id is PlanId {
  return typeof id === "string" && (PLAN_IDS as readonly string[]).includes(id);
}
