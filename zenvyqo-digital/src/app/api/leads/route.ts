import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";
import { leadSchema } from "@/lib/validation";

export const runtime = "nodejs";

/**
 * Reçoit une demande de devis ou un message de contact.
 * 1. Valide les données (même schéma que le formulaire).
 * 2. Enregistre le prospect dans Supabase (table `leads`).
 * 3. Optionnel : relaie la demande vers LEADS_WEBHOOK_URL (Make, Zapier, n8n…).
 * Sans Supabase configuré, répond en mode démo sans rien enregistrer.
 */
export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const parsed = leadSchema.safeParse(body);
  if (!parsed.success) {
    const fields: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      fields[key] ??= issue.message;
    }
    // Un pot de miel rempli signale un robot : on répond « ok » sans rien faire.
    if (fields.website) return NextResponse.json({ ok: true, id: null, demo: false });
    return NextResponse.json({ ok: false, error: "validation", fields }, { status: 422 });
  }

  const lead = parsed.data;
  const row = {
    source: lead.source,
    locale: lead.locale,
    plan: lead.plan ?? null,
    full_name: lead.fullName,
    company: lead.company || null,
    email: lead.email.toLowerCase(),
    phone: lead.phone || null,
    city: lead.city || null,
    province: lead.province || null,
    sector: lead.sector || null,
    description: lead.description,
    wants_call: lead.wantsCall,
  };

  const supabase = getSupabaseAdmin();
  if (!supabase) {
    console.info("[leads] MODE DÉMO, Supabase non configuré. Demande non enregistrée :", {
      source: row.source,
      plan: row.plan,
    });
    return NextResponse.json({ ok: true, id: null, demo: true });
  }

  const { data, error } = await supabase.from("leads").insert(row).select("id").single();
  if (error) {
    console.error("[leads] Échec de l'enregistrement Supabase :", error.message);
    return NextResponse.json({ ok: false, error: "storage" }, { status: 502 });
  }

  const webhook = process.env.LEADS_WEBHOOK_URL;
  if (webhook) {
    // Le relais ne doit jamais faire échouer la demande du visiteur.
    try {
      await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: data.id, ...row }),
        signal: AbortSignal.timeout(4000),
      });
    } catch (e) {
      console.error("[leads] Relais webhook en échec :", e instanceof Error ? e.message : e);
    }
  }

  return NextResponse.json({ ok: true, id: data.id as string, demo: false });
}
