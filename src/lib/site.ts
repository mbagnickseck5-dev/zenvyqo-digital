/** Réglages généraux du site. Les coordonnées ont des valeurs par défaut ;
 *  les variables d'environnement publiques, si elles sont définies, ont priorité. */
const DEFAULT_EMAIL = "contactzenvyqo@gmail.com";
const DEFAULT_PHONE = "+15145525923";
/** Numéro WhatsApp Business (même que le téléphone). */
const DEFAULT_WHATSAPP = DEFAULT_PHONE;

/** « +15145525923 » → « (514) 552-5923 » (numéros nord-américains) */
function formatPhone(raw: string): string {
  const d = raw.replace(/\D/g, "");
  const n = d.length === 11 && d.startsWith("1") ? d.slice(1) : d;
  return n.length === 10 ? `(${n.slice(0, 3)}) ${n.slice(3, 6)}-${n.slice(6)}` : raw;
}

const phone = (process.env.NEXT_PUBLIC_CONTACT_PHONE || DEFAULT_PHONE).replace(/[^\d+]/g, "");

export const site = {
  name: "Zenvyqo Digital",
  // Netlify fournit URL au moment de la compilation : sert de repli pour le SEO (canonique, sitemap).
  url: (process.env.NEXT_PUBLIC_SITE_URL || process.env.URL || "http://localhost:3000").replace(/\/$/, ""),
  whatsapp: (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || DEFAULT_WHATSAPP).replace(/\D/g, ""),
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || DEFAULT_EMAIL,
  /** Format international, pour les liens tel: */
  phone,
  /** Format d'affichage : (514) 552-5923 */
  phoneDisplay: formatPhone(phone),
  stripeEnabled: process.env.NEXT_PUBLIC_STRIPE_ENABLED === "true",
  /**
   * Immatriculation (mentions légales). Vide tant que l'entreprise n'est pas
   * immatriculée : la ligne correspondante n'est alors pas affichée.
   * Exemple : NEXT_PUBLIC_LEGAL_NAME="Zenvyqo Digital inc." et
   * NEXT_PUBLIC_BUSINESS_NUMBER="NEQ 1234567890".
   */
  legalName: process.env.NEXT_PUBLIC_LEGAL_NAME || "",
  businessNumber: process.env.NEXT_PUBLIC_BUSINESS_NUMBER || "",
};

export function whatsappUrl(message?: string): string | null {
  if (!site.whatsapp) return null;
  const q = message ? `?text=${encodeURIComponent(message)}` : "";
  return `https://wa.me/${site.whatsapp}${q}`;
}

/**
 * Prépare un paragraphe des pages légales : remplace {email}, {phone},
 * {legalName} et {businessNumber}. Renvoie null si le paragraphe dépend
 * d'une information d'immatriculation encore absente (il est alors masqué).
 */
export function fillContact(text: string): string | null {
  if (text.includes("{legalName}") && !site.legalName) return null;
  if (text.includes("{businessNumber}") && !site.businessNumber) return null;
  return text
    .replaceAll("{email}", site.email)
    .replaceAll("{phone}", site.phoneDisplay)
    .replaceAll("{legalName}", site.legalName)
    .replaceAll("{businessNumber}", site.businessNumber);
}
