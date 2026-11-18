import { notFound } from "next/navigation";
import { About } from "@/components/sections/About";
import { Advantages } from "@/components/sections/Advantages";
import { Contact } from "@/components/sections/Contact";
import { CtaBand } from "@/components/sections/CtaBand";
import { Faq } from "@/components/sections/Faq";
import { Hero } from "@/components/sections/Hero";
import { Portfolio } from "@/components/sections/Portfolio";
import { Pricing } from "@/components/sections/Pricing";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { HTML_LANG, getDictionary, isLocale } from "@/lib/i18n";
import { FOUNDERS_OFFER, PLANS, offerText } from "@/lib/plans";
import { ogImage } from "@/lib/seo";
import { site } from "@/lib/site";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  // Données structurées : entreprise en ligne (aucune adresse physique), offres, site et FAQ.
  const url = `${site.url}/${locale}`;
  const orgId = `${site.url}/#organisation`;
  const faqAnswer = (item: (typeof t.faq.items)[number]) =>
    FOUNDERS_OFFER.active && item.offerNote ? `${item.a} ${offerText(item.offerNote)}` : item.a;
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "OnlineBusiness",
        "@id": orgId,
        name: site.name,
        url,
        logo: `${site.url}/logo-zenvyqo.png`,
        image: `${site.url}${ogImage(locale).url}`,
        description: t.meta.description,
        slogan: t.slogan,
        telephone: site.phone,
        email: site.email,
        knowsLanguage: ["fr-CA", "en-CA"],
        areaServed: [
          { "@type": "City", name: "Montréal" },
          { "@type": "AdministrativeArea", name: "Québec" },
          { "@type": "Country", name: "Canada" },
        ],
        contactPoint: {
          "@type": "ContactPoint",
          contactType: locale === "fr" ? "service à la clientèle" : "customer service",
          telephone: site.phone,
          email: site.email,
          availableLanguage: ["French", "English"],
          areaServed: "CA",
        },
        makesOffer: PLANS.map((p) => ({
          "@type": "Offer",
          name: p.name,
          description: t.pricing.plans[p.id].tagline,
          price: p.monthly,
          priceCurrency: "CAD",
          priceSpecification: {
            "@type": "UnitPriceSpecification",
            price: p.monthly,
            priceCurrency: "CAD",
            unitCode: "MON",
            unitText: locale === "fr" ? "mois" : "month",
          },
          itemOffered: { "@type": "Service", name: `${site.name} ${p.name}`, serviceType: t.services.items[0].title },
        })),
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#site`,
        url,
        name: site.name,
        inLanguage: HTML_LANG[locale],
        publisher: { "@id": orgId },
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        inLanguage: HTML_LANG[locale],
        mainEntity: t.faq.items.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: { "@type": "Answer", text: faqAnswer(item) },
        })),
      },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }} />
      <Hero locale={locale} t={t} />
      <Advantages t={t} />
      <Services t={t} />
      <Pricing locale={locale} t={t} />
      <Process t={t} />
      <Portfolio t={t} />
      <About t={t} />
      <Faq t={t} />
      <Contact locale={locale} t={t} />
      <CtaBand t={t} />
    </>
  );
}
