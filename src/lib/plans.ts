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

/**
 * Forfaits sans engagement de durée (depuis le 18 nov. 2026) : résiliables en
 * tout temps avec ce préavis. Les frais de création ne sont pas remboursables.
 */
export const NOTICE_DAYS = 30;

export const PLANS: Plan[] = [
  { id: "business-pro", name: "Business Pro", monthly: 69, setup: 149, featured: true },
  { id: "business-plus", name: "Business Plus", monthly: 99, setup: 249, featured: false },
  { id: "boutique-pro", name: "Boutique Pro", monthly: 149, setup: 399, featured: false },
];

/** Mensualité la plus basse (« dès 69 $ ») */
export const MIN_MONTHLY = Math.min(...PLANS.map((p) => p.monthly));

export function getPlan(id: string | null | undefined): Plan | undefined {
  return PLANS.find((p) => p.id === id);
}

export function isPlanId(id: unknown): id is PlanId {
  return typeof id === "string" && (PLAN_IDS as readonly string[]).includes(id);
}
