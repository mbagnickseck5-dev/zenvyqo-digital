// Télécharge les visuels du site dans public/visuels/ avant la compilation.
// - Un fichier déjà présent n'est pas retéléchargé : pour figer un visuel,
//   il suffit de le déposer dans public/visuels/ et de le commiter.
// - Un échec n'arrête jamais la compilation : la section concernée affiche
//   alors son illustration de secours.
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = "https://d8j0ntlcm91z4.cloudfront.net/user_3EP23XARHDnn3najbGt0aJ02E5O";
const VISUALS = {
  // Héros : tablette, portable et téléphone affichant des sites de PME (18 nov. 2026)
  "hero-sites.png": `${BASE}/hf_20261118_014938_2425573c-f04c-4ea5-b996-77ccfb04dd3c.png`,
  // Réalisations : aperçus des modèles sur portable et téléphone (18 nov. 2026)
  "modele-restaurant.png": `${BASE}/hf_20261118_020740_9fa909c6-c908-4b49-98fb-ada738ab4a11.png`,
  "modele-salon.png": `${BASE}/hf_20261118_020740_34187649-3852-461c-81ec-64ef59b4fb38.png`,
  "modele-nettoyage.png": `${BASE}/hf_20261118_020740_8d66fe01-04c5-4b4d-99f1-1d5182cc9a52.png`,
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
