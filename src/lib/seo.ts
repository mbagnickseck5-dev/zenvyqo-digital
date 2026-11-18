import type { Metadata } from "next";
import { getDictionary, type Locale } from "./i18n";
import { site } from "./site";

interface PageSeo {
  title: string;
  description: string;
  /** Chemin de la page, ex. « /fr » */
  path: string;
}

/** Image d'aperçu (1200 × 630) affichée quand un lien est partagé (WhatsApp, Facebook, LinkedIn…). */
export function ogImage(locale: Locale) {
  return { url: `/og/zenvyqo-${locale}.jpg`, width: 1200, height: 630, alt: getDictionary(locale).meta.ogAlt };
}

/** Balises Open Graph et Twitter complètes : une page enfant remplace celles du parent, d'où ce gabarit commun. */
export function socialMetadata(locale: Locale, { title, description, path }: PageSeo): Pick<Metadata, "openGraph" | "twitter"> {
  const image = ogImage(locale);
  return {
    openGraph: {
      type: "website",
      siteName: site.name,
      title,
      description,
      url: path,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: locale === "fr" ? ["en_CA"] : ["fr_CA"],
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
