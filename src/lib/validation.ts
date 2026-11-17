import { z } from "zod";
import { PLAN_IDS } from "./plans";

const text = (max: number) => z.string().trim().max(max);
const required = (max: number) => text(max).min(1, "required");

const common = {
  locale: z.enum(["fr", "en"]),
  fullName: text(120).min(2, "required"),
  email: z.string().trim().max(200).email("email"),
  description: text(4000).min(10, "tooShort"),
  consent: z.literal(true, "consent"),
  /** Pot de miel anti-robots : doit rester vide. */
  website: z.string().max(0).optional().default(""),
};

/**
 * Schéma partagé par le formulaire (client) et l'API (serveur).
 * Les messages d'erreur sont des codes, traduits à l'affichage.
 * - "plan"    : demande de devis complète (tous les champs requis)
 * - "contact" : message simple (nom, courriel, message)
 */
export const leadSchema = z.discriminatedUnion("source", [
  z.object({
    ...common,
    source: z.literal("plan"),
    plan: z.enum(PLAN_IDS).nullable().optional(),
    company: required(160),
    phone: required(40),
    city: required(120),
    province: required(60),
    sector: required(120),
    wantsCall: z.boolean().optional().default(false),
  }),
  z.object({
    ...common,
    source: z.literal("contact"),
    plan: z.null().optional(),
    company: text(160).optional().default(""),
    phone: text(40).optional().default(""),
    city: text(120).optional().default(""),
    province: text(60).optional().default(""),
    sector: text(120).optional().default(""),
    wantsCall: z.boolean().optional().default(false),
  }),
]);

export type Lead = z.output<typeof leadSchema>;
export type LeadErrorCode = "required" | "email" | "tooShort" | "consent";
