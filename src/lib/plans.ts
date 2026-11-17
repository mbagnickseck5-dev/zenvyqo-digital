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
