/** Réglages généraux lus depuis les variables d'environnement publiques. */
export const site = {
  name: "Zenvyqo Digital",
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, ""),
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? "",
  stripeEnabled: process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true",
};

export function whatsappUrl(message?: string): string | null {
  if (!site.whatsapp) return null;
  const q = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsapp}${q}`;
}
