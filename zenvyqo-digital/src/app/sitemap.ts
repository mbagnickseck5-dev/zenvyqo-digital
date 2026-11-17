import type { MetadataRoute } from "next";
import { LEGAL_SLUGS, LOCALES } from "@/lib/i18n";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return LOCALES.flatMap((locale) => [
    { url: `${site.url}/${locale}`, lastModified: now, priority: locale === "fr" ? 1 : 0.8 },
    ...LEGAL_SLUGS.map((slug) => ({ url: `${site.url}/${locale}/legal/${slug}`, lastModified: now, priority: 0.2 })),
  ]);
}
