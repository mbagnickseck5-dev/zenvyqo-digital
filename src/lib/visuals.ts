import { existsSync } from "node:fs";
import { join } from "node:path";

export type VisualName = "hero" | "restaurant" | "salon" | "nettoyage";

/**
 * Renvoie le chemin public d'un visuel s'il existe dans public/visuels/,
 * sinon null (la section affiche alors son illustration de secours).
 * Évalué à la compilation : à appeler uniquement dans un composant serveur.
 */
export function visual(name: VisualName): string | null {
  const file = `${name}.png`;
  return existsSync(join(process.cwd(), "public", "visuels", file)) ? `/visuels/${file}` : null;
}
