import type { MetadataRoute } from "next";
import { LEGAL_SLUGS, LOCALES } from "@/lib/i18n";
import { site } from "@/lib/site";

/** Plan du site, avec les équivalences français / anglais de chaque page (hreflang). */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const paths = ["", ...LEGAL_SLUGS.map((slug) => `/legal/${slug}`)];
  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: `${site.url}/${locale}${path}`,
      lastModified: now,
      priority: path === "" ? (locale === "fr" ? 1 : 0.8) : 0.2,
      alternates: {
        languages: {
          "fr-CA": `${site.url}/fr${path}`,
          "en-CA": `${site.url}/en${path}`,
          "x-default": `${site.url}/fr${path}`,
        },
      },
    })),
  );
}
