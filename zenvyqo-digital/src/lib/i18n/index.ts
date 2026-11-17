import { fr, type Dictionary } from "./fr";
import { en } from "./en";

export const LOCALES = ["fr", "en"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "fr";

export const HTML_LANG: Record<Locale, string> = { fr: "fr-CA", en: "en-CA" };
export const LEGAL_SLUGS = ["mentions-legales", "confidentialite", "conditions"] as const;
export type LegalSlug = (typeof LEGAL_SLUGS)[number];

const dictionaries: Record<Locale, Dictionary> = { fr, en };

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}

export type { Dictionary };
