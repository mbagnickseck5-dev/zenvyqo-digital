"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import { META_PIXEL_ID, loadPixel, readConsent, revokePixel, subscribeConsent, trackPixel } from "@/lib/metaPixel";

/** Liens de prise de contact : WhatsApp, téléphone, courriel. */
const CONTACT_LINK = /^(https:\/\/wa\.me\/|tel:|mailto:)/;

/**
 * Pixel Meta, chargé seulement après l'accord du visiteur.
 * Événements : PageView à chaque page (y compris les navigations internes)
 * et Contact au clic sur un lien WhatsApp, téléphone ou courriel.
 * L'événement Lead est envoyé par le formulaire (LeadForm).
 */
export function MetaPixel() {
  const pathname = usePathname();
  const consent = useSyncExternalStore(subscribeConsent, readConsent, () => null);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    if (!META_PIXEL_ID) return;
    if (consent !== "granted") {
      if (consent === "denied") revokePixel();
      lastPath.current = null;
      return;
    }
    loadPixel();
    if (lastPath.current !== pathname) {
      lastPath.current = pathname;
      trackPixel("PageView");
    }
  }, [consent, pathname]);

  useEffect(() => {
    if (!META_PIXEL_ID || consent !== "granted") return;
    const onClick = (event: MouseEvent) => {
      const link = event.target instanceof Element ? event.target.closest("a[href]") : null;
      if (link && CONTACT_LINK.test(link.getAttribute("href") ?? "")) trackPixel("Contact");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [consent]);

  return null;
}
