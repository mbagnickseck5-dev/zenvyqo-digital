import localFont from "next/font/local";

/*
 * Polices auto-hébergées (sous-ensemble latin, suffisant pour le français et l'anglais).
 * next/font les précharge et génère une police de repli aux mêmes dimensions :
 * le texte s'affiche tout de suite et ne « saute » pas quand la police arrive.
 */
export const montserrat = localFont({
  src: "../app/fonts/montserrat-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-montserrat",
  adjustFontFallback: "Arial",
});

export const inter = localFont({
  src: "../app/fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-inter",
  adjustFontFallback: "Arial",
});
