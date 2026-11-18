// Télécharge les visuels du site dans public/visuels/ avant la compilation.
// - Un fichier déjà présent n'est pas retéléchargé : pour figer un visuel,
//   il suffit de le déposer dans public/visuels/ et de le commiter.
// - Un échec n'arrête jamais la compilation : la section concernée affiche
//   alors son illustration de secours.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://d8j0ntlcm91z4.cloudfront.net/user_3JnGPsykVkX5NKAMLdtAvoQSBx0";
const BASE_2 = "https://d8j0ntlcm91z4.cloudfront.net/user_3EP23XARHDnn3najbGt0aJ02E5O";
const VISUALS = {
  // Héros : tablette, portable et téléphone affichant des sites de PME (18 nov. 2026)
  "hero-sites.png": `${BASE_2}/hf_20261118_014938_2425573c-f04c-4ea5-b996-77ccfb04dd3c.png`,
  "restaurant.png": `${BASE}/hf_20261117_024302_5f03be60-fdc8-44a3-a892-c5f81a1522f4.png`,
  "salon.png": `${BASE}/hf_20261117_024301_80c171d0-751a-47ab-8f07-360cd933e3de.png`,
  "nettoyage.png": `${BASE}/hf_20261117_024301_149f523b-6da3-46d9-9773-6e287a03f36a.png`,
};

const dir = join(dirname(fileURLToPath(import.meta.url)), "..", "public", "visuels");
mkdirSync(dir, { recursive: true });

for (const [file, url] of Object.entries(VISUALS)) {
  const target = join(dir, file);
  if (existsSync(target)) {
    console.log(`[visuels] ${file} : déjà présent`);
    continue;
  }
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(30_000) });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const bytes = Buffer.from(await res.arrayBuffer());
    // Signature PNG : évite d'enregistrer une page d'erreur à la place d'une image.
    if (bytes.length < 10_000 || bytes.readUInt32BE(0) !== 0x89504e47) throw new Error("réponse inattendue");
    writeFileSync(target, bytes);
    console.log(`[visuels] ${file} : téléchargé (${Math.round(bytes.length / 1024)} Ko)`);
  } catch (e) {
    console.warn(`[visuels] ${file} : indisponible (${e.message}), illustration de secours utilisée`);
  }
}
