import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";
import "../../globals.css";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { MotionProvider } from "@/components/MotionProvider";
import { OfferBar } from "@/components/OfferBar";
import { QuoteProvider } from "@/components/QuoteProvider";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
import { inter, montserrat } from "@/lib/fonts";
import { HTML_LANG, LOCALES, getDictionary, isLocale } from "@/lib/i18n";
import { socialMetadata } from "@/lib/seo";
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
  // Code de validation Google Search Console (balise HTML), à définir sur Netlify si besoin.
  const google = process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  return {
    metadataBase: new URL(site.url),
    title: { default: t.meta.title, template: `%s | ${site.name}` },
    description: t.meta.description,
    applicationName: site.name,
    alternates: {
      canonical: `/${locale}`,
      languages: { "fr-CA": "/fr", "en-CA": "/en", "x-default": "/fr" },
    },
    ...socialMetadata(locale, { title: t.meta.title, description: t.meta.description, path: `/${locale}` }),
    ...(google ? { verification: { google } } : {}),
  };
}

export default async function RootLayout({ children, params }: Params & { children: ReactNode }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  return (
    <html lang={HTML_LANG[locale]} className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        {/* Sans JavaScript, le contenu animé au défilement reste visible. */}
        <noscript>
          <style>{".zq-reveal{opacity:1!important;transform:none!important}"}</style>
        </noscript>
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-lg focus:bg-white focus:px-4 focus:py-3 focus:font-semibold focus:text-night"
        >
          {t.nav.skip}
        </a>
        <MotionProvider>
          <QuoteProvider locale={locale} t={t.form}>
            <OfferBar locale={locale} t={t.offer} />
            <Header locale={locale} t={t.nav} />
            <main id="contenu">{children}</main>
            <Footer locale={locale} t={t} />
            <WhatsAppFloat label={t.contact.whatsapp} message={t.contact.whatsappMessage} />
          </QuoteProvider>
        </MotionProvider>
      </body>
    </html>
  );
}
