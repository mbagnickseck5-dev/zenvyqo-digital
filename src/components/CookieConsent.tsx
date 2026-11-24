"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { META_PIXEL_ID, OPEN_CONSENT_EVENT, readConsent, saveConsent, subscribeConsent, type Consent } from "@/lib/metaPixel";
import { btn } from "@/lib/ui";

export interface ConsentText {
  label: string;
  text: string;
  more: string;
  accept: string;
  refuse: string;
  manage: string;
}

/**
 * Bannière de consentement aux témoins publicitaires (pixel Meta).
 * Elle s'affiche tant que le visiteur n'a pas choisi ; « Refuser » est aussi
 * simple qu'« Accepter », et rien n'est chargé avant le clic sur « Accepter ».
 * Côté serveur, le choix est inconnu (« pending ») : la bannière n'est pas
 * rendue, ce qui évite qu'elle clignote pour un visiteur qui a déjà choisi.
 */
export function CookieConsent({ t, privacyHref }: { t: ConsentText; privacyHref: string }) {
  const consent = useSyncExternalStore<Consent | null | "pending">(subscribeConsent, readConsent, () => "pending");
  const [reopened, setReopened] = useState(false);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(OPEN_CONSENT_EVENT, reopen);
    return () => window.removeEventListener(OPEN_CONSENT_EVENT, reopen);
  }, []);

  // Rouverte depuis « Gérer les témoins » : le focus passe à la bannière.
  useEffect(() => {
    if (reopened) panel.current?.focus();
  }, [reopened]);

  if (!META_PIXEL_ID || (consent !== null && !reopened)) return null;

  const choose = (value: Consent) => {
    saveConsent(value);
    setReopened(false);
  };

  return (
    <section
      ref={panel}
      tabIndex={-1}
      aria-labelledby="zq-consent-title"
      className="fixed inset-x-3 bottom-3 z-40 rounded-2xl bg-night p-5 text-white shadow-2xl shadow-black/40 ring-1 ring-white/15 focus:outline-none sm:inset-x-auto sm:bottom-6 sm:left-6 sm:max-w-md"
    >
      <h2 id="zq-consent-title" className="font-display text-base font-bold">
        {t.label}
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-white/80">
        {t.text}{" "}
        <a href={privacyHref} className="font-semibold text-cyan underline underline-offset-2 hover:text-white">
          {t.more}
        </a>
      </p>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <button type="button" onClick={() => choose("denied")} className={`${btn.outlineLight} min-h-11 cursor-pointer px-4 py-2 text-sm`}>
          {t.refuse}
        </button>
        <button type="button" onClick={() => choose("granted")} className={`${btn.white} min-h-11 cursor-pointer px-4 py-2 text-sm`}>
          {t.accept}
        </button>
      </div>
    </section>
  );
}

/** Lien « Gérer les témoins » : rouvre la bannière pour changer d'avis. */
export function ConsentSettingsButton({ label, className }: { label: string; className?: string }) {
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(OPEN_CONSENT_EVENT))} className={className}>
      {label}
    </button>
  );
}
