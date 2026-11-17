import Stripe from "stripe";

export type StripeState =
  | { ok: true; stripe: Stripe; mode: "test" | "live" }
  | { ok: false; reason: "missing_key" | "live_not_allowed" };

/**
 * Stripe n'est actif qu'avec une clé de test. Une clé réelle (sk_live_…)
 * est refusée tant que STRIPE_ALLOW_LIVE n'est pas "true" : l'activation
 * réelle se fait volontairement, après validation des conditions commerciales.
 */
export function getStripe(): StripeState {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) return { ok: false, reason: "missing_key" };
  const live = !key.startsWith("sk_test_") && !key.startsWith("rk_test_");
  if (live && process.env.STRIPE_ALLOW_LIVE !== "true") {
    return { ok: false, reason: "live_not_allowed" };
  }
  return { ok: true, stripe: new Stripe(key), mode: live ? "live" : "test" };
}
