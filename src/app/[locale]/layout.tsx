import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "@fontsource-variable/montserrat";
import "@fontsource-variable/inter";
import "../globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { QuoteProvider } from "@/components/QuoteProvider";
import { HTML_LANG, LOCALES, getDictionary, isLocale } from "@/lib/i18n";
import { site } from "@/lib/site";

interface Params {
  params: Promise<{ locale: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.map((locale) => ({ locale }));
}

export const viewport: Viewport = { themeColor: "#0B1E3D" };

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = getDictionary(locale);
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s | ${site.name}` },
    description: t.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { "fr-CA": "/fr", "en-CA": "/en", "x-default": "/fr" },
    },
    openGraph: {
      type: "website",
      siteName: site.name,
      title: t.meta.title,
      description: t.meta.description,
      url: `/${locale}`,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
    },
    twitter: { card: "summary_large_image", title: t.meta.title, description: t.meta.description },
  };
}

export default async function RootLayout({ children, params }: Params & { children: ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <html lang={HTML_LANG[locale]}>
      <body>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-night"
        >
          {t.nav.skip}
        </a>
        <QuoteProvider locale={locale} t={t.form}>
          <Header locale={locale} t={t.nav} />
          <main id="contenu">{children}</main>
          <Footer locale={locale} t={t} />
        </QuoteProvider>
      </body>
    </html>
  );
}
