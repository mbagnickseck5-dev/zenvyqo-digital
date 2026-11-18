import localFont from "next/font/local";

/*
 * Polices des sites de démonstration. Chaque démo importe seulement la sienne :
 * elle n'est préchargée que sur sa propre page, jamais sur le site Zenvyqo.
 */
export const playfair = localFont({
  src: [
    { path: "../app/fonts/playfair-display-latin-wght-normal.woff2", weight: "400 900", style: "normal" },
    { path: "../app/fonts/playfair-display-latin-wght-italic.woff2", weight: "400 900", style: "italic" },
  ],
  display: "swap",
  variable: "--font-playfair",
  adjustFontFallback: "Times New Roman",
});

export const fraunces = localFont({
  src: "../app/fonts/fraunces-latin-wght-normal.woff2",
  weight: "100 900",
  style: "normal",
  display: "swap",
  variable: "--font-fraunces",
  adjustFontFallback: "Times New Roman",
});
