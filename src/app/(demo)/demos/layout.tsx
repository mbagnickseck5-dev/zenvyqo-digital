import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "../../globals.css";
import { inter, montserrat } from "@/lib/fonts";
import { site } from "@/lib/site";

/*
 * Gabarit des sites de démonstration (/demos/…) : ni en-tête ni pied de page
 * Zenvyqo, pour que chaque démo ressemble au vrai site d'un client.
 * Pages non indexées : ce sont des entreprises fictives.
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  robots: { index: false, follow: true },
  openGraph: {
    type: "website",
    siteName: site.name,
    locale: "fr_CA",
    images: [{ url: "/og/zenvyqo-fr.jpg", width: 1200, height: 630 }],
  },
};

export const viewport: Viewport = { themeColor: "#0B1E3D" };

export default function DemoLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="fr-CA" className={`${montserrat.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
