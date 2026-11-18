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
import { getDictionary, isLocale } from "@/lib/i18n";
import { PLANS } from "@/lib/plans";
import { site } from "@/lib/site";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale);

  // Données structurées : service, coordonnées réelles et offres (aucune adresse physique).
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: site.name,
    url: `${site.url}/${locale}`,
    description: t.meta.description,
    slogan: t.slogan,
    telephone: site.phone,
    email: site.email,
    areaServed: [
      { "@type": "City", name: "Montréal" },
      { "@type": "AdministrativeArea", name: "Québec" },
      { "@type": "Country", name: "Canada" },
    ],
    makesOffer: PLANS.map((p) => ({
      "@type": "Offer",
      name: p.name,
      priceCurrency: "CAD",
      price: p.monthly,
      description: t.pricing.plans[p.id].tagline,
    })),
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
