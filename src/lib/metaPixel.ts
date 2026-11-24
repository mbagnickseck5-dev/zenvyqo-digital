/**
 * Pixel Meta (Facebook) avec consentement préalable.
 *
 * Loi 25 (art. 8.1) : une technologie de profilage doit rester désactivée tant
 * que le visiteur ne l'a pas activée. Le pixel ne se charge donc qu'après un clic
 * sur « Accepter » dans la bannière (CookieConsent). Le choix est gardé dans le
 * stockage local du navigateur et peut être changé avec « Gérer les témoins ».
 *
 * Le fragment <noscript> fourni par Meta n'est volontairement pas installé :
 * il enverrait une visite à Meta sans demander l'accord du visiteur.
 */

const DEFAULT_PIXEL_ID = "1486753580061539";
const configured = (process.env.NEXT_PUBLIC_META_PIXEL_ID ?? "").trim();

/** Identifiant du pixel. NEXT_PUBLIC_META_PIXEL_ID le remplace ; la valeur « off » le désactive. */
export const META_PIXEL_ID = configured.toLowerCase() === "off" ? "" : configured || DEFAULT_PIXEL_ID;

export type Consent = "granted" | "denied";

const CONSENT_KEY = "zq-consent-ads";
/** Émis quand le visiteur accepte ou refuse. */
const CONSENT_EVENT = "zq:consent";
/** Émis pour rouvrir la bannière (lien « Gérer les témoins »). */
export const OPEN_CONSENT_EVENT = "zq:open-consent";

type Fbq = ((...args: unknown[]) => void) & {
  callMethod?: (...args: unknown[]) => void;
  queue: unknown[];
  push: Fbq;
  loaded: boolean;
  version: string;
};

declare global {
  interface Window {
    fbq?: Fbq;
    _fbq?: Fbq;
  }
}

/** Choix fait pendant la visite, si le stockage local est indisponible. */
let sessionConsent: Consent | null = null;
/** Vrai après un retrait d'accord : le pixel déjà chargé doit être réactivé si le visiteur accepte de nouveau. */
let revoked = false;

export function readConsent(): Consent | null {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    if (value === "granted" || value === "denied") return value;
  } catch {
    // Stockage indisponible (navigation privée stricte) : on garde le choix fait pendant la visite.
  }
  return sessionConsent;
}

/** Prévient les composants quand le choix change, dans cet onglet ou dans un autre. */
export function subscribeConsent(onChange: () => void) {
  window.addEventListener(CONSENT_EVENT, onChange);
  window.addEventListener("storage", onChange);
  return () => {
    window.removeEventListener(CONSENT_EVENT, onChange);
    window.removeEventListener("storage", onChange);
  };
}

export function saveConsent(value: Consent) {
  sessionConsent = value;
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    // Le choix vaut alors pour la visite en cours.
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Charge le pixel (code de base de Meta) et l'initialise. Sans effet s'il est déjà chargé. */
export function loadPixel() {
  if (!META_PIXEL_ID) return;
  if (window.fbq) {
    if (revoked) window.fbq("consent", "grant");
    revoked = false;
    return;
  }
  revoked = false;
  const n = function (...args: unknown[]) {
    if (n.callMethod) n.callMethod(...args);
    else n.queue.push(args);
  } as Fbq;
  window.fbq = n;
  if (!window._fbq) window._fbq = n;
  n.push = n;
  n.loaded = true;
  n.version = "2.0";
  n.queue = [];
  const script = document.createElement("script");
  script.async = true;
  script.src = "https://connect.facebook.net/en_US/fbevents.js";
  const first = document.getElementsByTagName("script")[0];
  if (first?.parentNode) first.parentNode.insertBefore(script, first);
  else document.head.appendChild(script);
  n("init", META_PIXEL_ID);
}

/** Refus ou retrait de l'accord : le pixel cesse d'envoyer des données et ses témoins sont effacés. */
export function revokePixel() {
  if (window.fbq && !revoked) window.fbq("consent", "revoke");
  revoked = true;
  const host = window.location.hostname;
  const domains = ["", host, `.${host.replace(/^www\./, "")}`];
  for (const name of ["_fbp", "_fbc"]) {
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${domain ? `; domain=${domain}` : ""}`;
    }
  }
}

/** Envoie un événement standard, seulement si le visiteur a accepté. */
export function trackPixel(event: "PageView" | "Lead" | "Contact") {
  if (!window.fbq || readConsent() !== "granted") return;
  window.fbq("track", event);
}
