"use client";

import { m } from "framer-motion";
import type { ReactNode } from "react";

/** Apparition douce au défilement. Respecte « réduire les animations ». */
export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <m.div
      // zq-reveal : rend le contenu visible si JavaScript est désactivé (voir le <noscript> du gabarit).
      className={className ? `zq-reveal ${className}` : "zq-reveal"}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  );
}
