"use client";

import type { ReactNode } from "react";
import type { PlanId } from "@/lib/plans";
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
    <button type="button" className={className} aria-label={ariaLabel} onClick={() => open(plan)}>
      {children}
    </button>
  );
}
