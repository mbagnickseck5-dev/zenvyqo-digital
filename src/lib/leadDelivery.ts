/** Acheminement d'une demande : Netlify Forms (enregistrement + courriel de notification à l'équipe)
 *  et API /api/leads (Supabase si configuré). Le message WhatsApp prérempli est proposé en option. */
import type { Dictionary, Locale } from "./i18n";
import { getPlan } from "./plans";
import { PROVINCES } from "./provinces";
import { whatsappUrl } from "./site";

export interface LeadPayload {
  source: "plan" | "contact";
  locale: Locale;
  plan: string | null;
  fullName: string;
  company: string;
  email: string;
  phone: string;
  city: string;
  province: string;
  sector: string;
  description: string;
  wantsCall: boolean;
  consent: boolean;
  website: string;
}

const clip = (s: string, n: number) => (s.length > n ? `${s.slice(0, n).trimEnd()}…` : s);

/** Texte du message WhatsApp, dans la langue du visiteur (c'est lui qui l'envoie). */
export function leadMessage(p: LeadPayload, t: Dictionary["form"]): string {
  const isPlan = p.source === "plan";
  const plan = getPlan(p.plan);
  const province = PROVINCES.find((x) => x.code === p.province)?.[p.locale] ?? p.province;
  const line = (label: string, value: string | false | undefined) => (value ? `*${label}*${t.waSep}${value.trim()}` : null);
  const lines = [
    isPlan ? t.waIntroQuote : t.waIntroContact,
    "",
    isPlan ? line(t.waPlan, plan ? `${plan.name} (${plan.monthly} $ CA${t.waPerMonth})` : t.planNone) : null,
    line(t.waName, p.fullName),
    isPlan ? line(t.waCompany, p.company) : null,
    line(t.waEmail, p.email),
    line(t.waPhone, p.phone),
    isPlan ? line(t.waCity, [p.city.trim(), province].filter(Boolean).join(", ")) : null,
    isPlan ? line(t.waSector, p.sector) : null,
    line(isPlan ? t.waProject : t.waMessage, clip(p.description.trim(), 700)),
    isPlan ? line(t.waCall, p.wantsCall ? t.yes : t.no) : null,
  ];
  return lines.filter((l) => l !== null).join("\n");
}

export function leadWhatsAppUrl(p: LeadPayload, t: Dictionary["form"]): string | null {
  return whatsappUrl(leadMessage(p, t));
}

/** Objet du courriel de notification (toujours en français : il s'adresse à l'équipe). */
function notificationSubject(p: LeadPayload): string {
  if (p.source === "contact") return `Nouveau message du site : ${p.fullName.trim()}`;
  const plan = getPlan(p.plan);
  const who = p.company.trim() || p.fullName.trim();
  return `Nouvelle demande de devis : ${who}${plan ? ` (forfait ${plan.name})` : ""}`;
}

/**
 * Envoi à Netlify Forms (formulaire « demande » déclaré dans public/__forms.html).
 * Netlify enregistre la demande et l'envoie par courriel à l'adresse réglée dans
 * Project configuration → Notifications → Form submission notifications.
 * Le champ « subject » donne l'objet du courriel ; le champ « email » permet de
 * répondre directement au client depuis la boîte de réception.
 */
export async function sendToNetlifyForms(p: LeadPayload): Promise<boolean> {
  try {
    const body = new URLSearchParams({
      "form-name": "demande",
      subject: notificationSubject(p),
      source: p.source,
      locale: p.locale,
      plan: getPlan(p.plan)?.name ?? "",
      fullName: p.fullName,
      company: p.company,
      email: p.email,
      phone: p.phone,
      city: p.city,
      province: p.province,
      sector: p.sector,
      description: p.description,
      wantsCall: p.wantsCall ? "oui" : "non",
      website: p.website,
    });
    const res = await fetch("/__forms.html", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: body.toString() });
    return res.ok;
  } catch {
    return false;
  }
}

/** Enregistrement par l'API du site (Supabase et webhook, quand ils sont configurés). */
export async function sendToApi(p: LeadPayload): Promise<{ ok: boolean; id: string | null; stored: boolean }> {
  try {
    const res = await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(p) });
    const data = await res.json().catch(() => null);
    const ok = res.ok && Boolean(data?.ok);
    return { ok, id: data?.id ?? null, stored: ok && !data?.demo };
  } catch {
    return { ok: false, id: null, stored: false };
  }
}
