"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import type { LeadForm as LeadFormComponent } from "./LeadForm";

/*
 * Le formulaire (et sa validation) pèse lourd et ne sert qu'à ceux qui écrivent :
 * son code n'est plus chargé avec la page, mais à la demande.
 */

/** Lance le téléchargement du formulaire en avance (survol, focus ou toucher d'un bouton de devis). */
export const preloadLeadForm = () => import("./LeadForm");

function FormSkeleton() {
  return (
    <div aria-hidden="true" className="zq-skeleton grid grid-cols-1 gap-4 sm:grid-cols-2">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="h-19 rounded-lg bg-mist" />
      ))}
      <div className="h-36 rounded-lg bg-mist sm:col-span-2" />
      <div className="h-11 rounded-lg bg-mist sm:col-span-2" />
      <div className="h-12 rounded-xl bg-electric/15 sm:col-span-2" />
    </div>
  );
}

const LeadForm = dynamic(() => preloadLeadForm().then((mod) => mod.LeadForm), {
  ssr: false,
  loading: () => <FormSkeleton />,
});

type Props = ComponentProps<typeof LeadFormComponent>;

/** Formulaire chargé à l'ouverture (fenêtre de devis). */
export function LazyLeadForm(props: Props) {
  return <LeadForm {...props} />;
}

/** Formulaire chargé à l'approche de sa section (formulaire de contact en bas de page). */
export function DeferredLeadForm(props: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setNear(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "800px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return <div ref={ref}>{near ? <LeadForm {...props} /> : <FormSkeleton />}</div>;
}
