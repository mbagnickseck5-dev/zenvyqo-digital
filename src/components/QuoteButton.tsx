"use client";

import type { ReactNode } from "react";
import type { PlanId } from "@/lib/plans";
import { preloadLeadForm } from "./LazyLeadForm";
import { useQuote } from "./QuoteProvider";

/** Bouton qui ouvre le formulaire de devis, avec un forfait présélectionné ou non. */
export function QuoteButton({
  plan,
  className,
  children,
  ariaLabel,
}: {
  plan?: PlanId;
  className?: string;
  children: ReactNode;
  ariaLabel?: string;
}) {
  const { open } = useQuote();
  return (
    <button
      type="button"
      className={className}
      aria-label={ariaLabel}
      // Le formulaire commence à se télécharger dès l'intention de clic.
      onPointerEnter={preloadLeadForm}
      onFocus={preloadLeadForm}
      onTouchStart={preloadLeadForm}
      onClick={() => open(plan)}
    >
      {children}
    </button>
  );
}
