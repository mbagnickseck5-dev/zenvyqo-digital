import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";

/**
 * Webhook Stripe : quand un paiement Checkout aboutit, le prospect
 * correspondant passe au statut « paid » dans Supabase.
 * Événement à activer côté Stripe : checkout.session.completed
 */
export async function POST(request: Request) {
  const state = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!state.ok || !secret) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const signature = request.headers.get("stripe-signature");
  if (!signature) return NextResponse.json({ error: "missing_signature" }, { status: 400 });

  let event;
  try {
    // La signature se vérifie sur le corps brut, d'où request.text().
    event = await state.stripe.webhooks.constructEventAsync(await request.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "invalid_signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const leadId = session.metadata?.lead_id;
    const supabase = getSupabaseAdmin();
    if (leadId && supabase) {
      const { error } = await supabase
        .from("leads")
        .update({
          status: "paid",
          stripe_session_id: session.id,
          stripe_customer_id: typeof session.customer === "string" ? session.customer : null,
        })
        .eq("id", leadId);
      if (error) console.error("[stripe webhook] Mise à jour du prospect :", error.message);
    }
  }

  return NextResponse.json({ received: true });
}
