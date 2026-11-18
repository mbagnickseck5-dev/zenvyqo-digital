"use client";

import { X } from "lucide-react";
import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import type { Dictionary, Locale } from "@/lib/i18n";
import type { PlanId } from "@/lib/plans";
import { LazyLeadForm } from "./LazyLeadForm";

interface QuoteContextValue {
  /** Ouvre le formulaire de devis. Le forfait passé est présélectionné. */
  open: (plan?: PlanId) => void;
}

const QuoteContext = createContext<QuoteContextValue | null>(null);

export function useQuote(): QuoteContextValue {
  const ctx = useContext(QuoteContext);
  if (!ctx) throw new Error("useQuote doit être utilisé dans <QuoteProvider>");
  return ctx;
}

export function QuoteProvider({
  locale,
  t,
  children,
}: {
  locale: Locale;
  t: Dictionary["form"];
  children: ReactNode;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // `session` change à chaque ouverture pour repartir d'un formulaire vierge.
  const [session, setSession] = useState<{ key: number; plan: PlanId | null } | null>(null);

  const open = useCallback((plan?: PlanId) => {
    setSession((s) => ({ key: (s?.key ?? 0) + 1, plan: plan ?? null }));
    // <dialog> natif : piège le focus, se ferme avec Échap, rend le fond inerte.
    requestAnimationFrame(() => dialogRef.current?.showModal());
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);
  const value = useMemo(() => ({ open }), [open]);

  return (
    <QuoteContext.Provider value={value}>
        {children}
        <dialog
          ref={dialogRef}
          aria-labelledby="quote-dialog-title"
          className="m-auto w-[min(42rem,calc(100vw-1.5rem))] max-h-[calc(100dvh-1.5rem)] overflow-y-auto rounded-2xl bg-white p-0 text-night shadow-2xl"
          onClick={(e) => {
            // Clic sur le fond (hors du contenu) : fermeture.
            if (e.target === e.currentTarget) close();
          }}
        >
          <div className="p-6 sm:p-8">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 id="quote-dialog-title" className="font-display text-2xl font-extrabold">
                  {t.quoteTitle}
                </h2>
                <p className="mt-1 text-muted">{t.quoteIntro}</p>
              </div>
              <button
                type="button"
                onClick={close}
                aria-label={t.close}
                className="grid size-11 shrink-0 place-items-center rounded-full text-muted transition hover:bg-mist hover:text-night"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>
            {session && (
              <LazyLeadForm key={session.key} variant="plan" locale={locale} t={t} initialPlan={session.plan} onClose={close} />
            )}
          </div>
        </dialog>
    </QuoteContext.Provider>
  );
}
