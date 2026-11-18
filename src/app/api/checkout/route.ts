import { NextResponse } from "next/server";
import { z } from "zod";
import { COMMITMENT_MONTHS, FOUNDERS_OFFER, PLAN_IDS, getPlan } from "@/lib/plans";
import { getStripe } from "@/lib/stripe";

export const runtime = "nodejs";

const bodySchema = z.object({
  plan: z.enum(PLAN_IDS),
  email: z.string().trim().email(),
  leadId: z.string().uuid().nullable().optional(),
  locale: z.enum(["fr", "en"]).default("fr"),
});

/**
 * Crée une session Stripe Checkout : abonnement mensuel + frais de création
 * (facturés une seule fois sur la première facture). Les montants viennent
 * de src/lib/plans.ts, jamais du navigateur. Pendant l'offre « clients
 * fondateurs », les frais de création ne sont pas facturés.
 */
export async function POST(request: Request) {
  const state = getStripe();
  if (!state.ok) {
    return NextResponse.json({ error: state.reason }, { status: 503 });
  }

  const parsed = bodySchema.safeParse(await request.json().catch(() => null));
  if (!parsed.success) return NextResponse.json({ error: "validation" }, { status: 422 });

  const { plan: planId, email, leadId, locale } = parsed.data;
  const plan = getPlan(planId)!;
  const origin = (process.env.NEXT_PUBLIC_SITE_URL ?? new URL(request.url).origin).replace(/\/$/, "");
  const fr = locale === "fr";
  const founders = FOUNDERS_OFFER.active;
  const metadata = {
    plan: plan.id,
    lead_id: leadId ?? "",
    commitment_months: String(founders ? FOUNDERS_OFFER.commitmentMonths : COMMITMENT_MONTHS),
    founders_offer: founders ? "true" : "false",
  };
  const setupFee = {
    quantity: 1,
    price_data: {
      currency: "cad",
      unit_amount: plan.setup * 100,
      product_data: { name: fr ? `${plan.name} : frais de création` : `${plan.name}: setup fee` },
    },
  };

  try {
    const session = await state.stripe.checkout.sessions.create({
      mode: "subscription",
      locale: fr ? "fr-CA" : "en",
      customer_email: email,
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "cad",
            unit_amount: plan.monthly * 100,
            recurring: { interval: "month" },
            product_data: { name: fr ? `${plan.name} : abonnement mensuel` : `${plan.name}: monthly subscription` },
          },
        },
        ...(founders ? [] : [setupFee]),
      ],
      metadata,
      subscription_data: { metadata },
      success_url: `${origin}/${locale}/merci?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/${locale}#forfaits`,
    });
    return NextResponse.json({ url: session.url, mode: state.mode });
  } catch (e) {
    console.error("[checkout] Stripe :", e instanceof Error ? e.message : e);
    return NextResponse.json({ error: "stripe_error" }, { status: 502 });
  }
}
