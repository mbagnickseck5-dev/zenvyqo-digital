"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { CircleCheck, LoaderCircle } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { PLANS, getPlan, type PlanId } from "@/lib/plans";
import { PROVINCES } from "@/lib/provinces";
import { site } from "@/lib/site";
import { btn } from "@/lib/ui";
import { leadSchema, type LeadErrorCode } from "@/lib/validation";

type FormText = Dictionary["form"];
type Variant = "plan" | "contact";
type FieldName =
  | "fullName"
  | "company"
  | "email"
  | "phone"
  | "city"
  | "province"
  | "sector"
  | "description"
  | "consent";
type Errors = Partial<Record<FieldName, LeadErrorCode>>;

const inputClass =
  "w-full rounded-lg border border-line bg-white px-3.5 py-3 text-base text-night placeholder:text-muted/70 transition focus:border-electric focus:outline-none focus:ring-2 focus:ring-electric/30 aria-[invalid=true]:border-red-600";

const empty = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  city: "",
  province: "QC",
  sector: "",
  description: "",
  wantsCall: false,
  consent: false,
  website: "",
};

export function LeadForm({
  variant,
  locale,
  t,
  initialPlan = null,
  onClose,
}: {
  variant: Variant;
  locale: Locale;
  t: FormText;
  initialPlan?: PlanId | null;
  onClose?: () => void;
}) {
  const uid = useId();
  const formRef = useRef<HTMLFormElement>(null);
  const [values, setValues] = useState(empty);
  const [plan, setPlan] = useState<PlanId | "">(initialPlan ?? "");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [result, setResult] = useState<{ id: string | null; demo: boolean }>({ id: null, demo: false });
  const [payState, setPayState] = useState<"idle" | "loading" | "error">("idle");

  const isPlan = variant === "plan";
  const id = (name: string) => `${uid}-${name}`;
  const set = <K extends keyof typeof empty>(key: K, value: (typeof empty)[K]) =>
    setValues((v) => ({ ...v, [key]: value }));

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const payload = { ...values, source: variant, locale, plan: isPlan && plan ? plan : null };
    const parsed = leadSchema.safeParse(payload);

    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const field = issue.path[0] as FieldName;
        const code = (["required", "email", "tooShort", "consent"] as const).find((c) => c === issue.message);
        if (field && !next[field]) next[field] = code ?? "required";
      }
      setErrors(next);
      // Place le curseur sur le premier champ en erreur.
      const first = Object.keys(next)[0];
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }

    setErrors({});
    setStatus("sending");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.ok) throw new Error("lead_failed");
      setResult({ id: data.id ?? null, demo: Boolean(data.demo) });
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  async function onPay() {
    if (!plan) return;
    setPayState("loading");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan, email: values.email, leadId: result.id, locale }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok || !data?.url) throw new Error("checkout_failed");
      window.location.assign(data.url);
    } catch {
      setPayState("error");
    }
  }

  if (status === "success") {
    const chosen = getPlan(plan);
    return (
      <div role="status" className="flex flex-col items-start gap-4">
        <CircleCheck className="size-12 text-electric" aria-hidden="true" />
        <h3 className="font-display text-2xl font-extrabold">{t.successTitle}</h3>
        <p className="text-muted">{t.successText}</p>
        {values.wantsCall && <p className="text-muted">{t.successCall}</p>}
        {chosen && (
          <p className="font-semibold">
            {t.successPlan} {chosen.name}
          </p>
        )}
        {result.demo && (
          <p className="rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">{t.demoNote}</p>
        )}
        {chosen && site.stripeEnabled && (
          <div className="mt-2 w-full rounded-xl border border-line bg-mist p-5">
            <h4 className="font-display text-lg font-bold">{t.payTitle}</h4>
            <p className="mt-1 text-sm text-muted">{t.payText}</p>
            <button type="button" className={`${btn.primary} mt-4`} onClick={onPay} disabled={payState === "loading"}>
              {payState === "loading" && <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />}
              {t.payButton}
            </button>
            <p className="mt-3 text-xs text-muted">{t.payTestNote}</p>
            {payState === "error" && (
              <p role="alert" className="mt-2 text-sm font-medium text-red-700">
                {t.payError}
              </p>
            )}
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-3">
          {onClose && (
            <button type="button" className={btn.outlineDark} onClick={onClose}>
              {t.done}
            </button>
          )}
          {!onClose && (
            <button
              type="button"
              className={btn.outlineDark}
              onClick={() => {
                setValues(empty);
                setStatus("idle");
              }}
            >
              {t.newRequest}
            </button>
          )}
        </div>
      </div>
    );
  }

  const field = (
    name: FieldName,
    label: string,
    control: (props: { id: string; name: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode,
    opts: { optional?: boolean; className?: string } = {},
  ) => {
    const err = errors[name];
    return (
      <div className={opts.className}>
        <label htmlFor={id(name)} className="mb-1.5 block text-sm font-semibold">
          {label}
          {opts.optional && <span className="font-normal text-muted"> ({t.optional})</span>}
        </label>
        {control({
          id: id(name),
          name,
          "aria-invalid": Boolean(err),
          "aria-describedby": err ? id(`${name}-err`) : undefined,
        })}
        {err && (
          <p id={id(`${name}-err`)} className="mt-1.5 text-sm font-medium text-red-700">
            {t.errors[err]}
          </p>
        )}
      </div>
    );
  };

  const hasErrors = Object.keys(errors).length > 0;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {isPlan && (
        <div className="sm:col-span-2">
          <label htmlFor={id("plan")} className="mb-1.5 block text-sm font-semibold">
            {t.plan}
          </label>
          <select
            id={id("plan")}
            name="plan"
            className={inputClass}
            value={plan}
            onChange={(e) => setPlan(e.target.value as PlanId | "")}
          >
            <option value="">{t.planNone}</option>
            {PLANS.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} · {p.monthly} $ CA {locale === "fr" ? "/ mois" : "/ month"}
              </option>
            ))}
          </select>
        </div>
      )}

      {field("fullName", t.fullName, (p) => (
        <input {...p} type="text" autoComplete="name" className={inputClass} value={values.fullName} onChange={(e) => set("fullName", e.target.value)} />
      ))}

      {isPlan &&
        field("company", t.company, (p) => (
          <input {...p} type="text" autoComplete="organization" className={inputClass} value={values.company} onChange={(e) => set("company", e.target.value)} />
        ))}

      {field("email", t.email, (p) => (
        <input {...p} type="email" autoComplete="email" inputMode="email" className={inputClass} value={values.email} onChange={(e) => set("email", e.target.value)} />
      ))}

      {field(
        "phone",
        t.phone,
        (p) => (
          <input {...p} type="tel" autoComplete="tel" inputMode="tel" className={inputClass} value={values.phone} onChange={(e) => set("phone", e.target.value)} />
        ),
        { optional: !isPlan },
      )}

      {isPlan && (
        <>
          {field("city", t.city, (p) => (
            <input {...p} type="text" autoComplete="address-level2" className={inputClass} value={values.city} onChange={(e) => set("city", e.target.value)} />
          ))}
          {field("province", t.province, (p) => (
            <select {...p} autoComplete="address-level1" className={inputClass} value={values.province} onChange={(e) => set("province", e.target.value)}>
              <option value="">{t.provincePlaceholder}</option>
              {PROVINCES.map((pr) => (
                <option key={pr.code} value={pr.code}>
                  {pr[locale]}
                </option>
              ))}
            </select>
          ))}
          {field(
            "sector",
            t.sector,
            (p) => (
              <input {...p} type="text" placeholder={t.sectorPlaceholder} className={inputClass} value={values.sector} onChange={(e) => set("sector", e.target.value)} />
            ),
            { className: "sm:col-span-2" },
          )}
        </>
      )}

      {field(
        "description",
        isPlan ? t.description : t.message,
        (p) => (
          <textarea
            {...p}
            rows={4}
            placeholder={isPlan ? t.descriptionPlaceholder : undefined}
            className={`${inputClass} resize-y`}
            value={values.description}
            onChange={(e) => set("description", e.target.value)}
          />
        ),
        { className: "sm:col-span-2" },
      )}

      {/* Pot de miel : invisible pour les humains, rempli par les robots. */}
      <div className="hidden" aria-hidden="true">
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={(e) => set("website", e.target.value)} />
        </label>
      </div>

      {isPlan && (
        <label className="flex min-h-11 items-center gap-3 sm:col-span-2">
          <input type="checkbox" name="wantsCall" className="size-5 accent-electric" checked={values.wantsCall} onChange={(e) => set("wantsCall", e.target.checked)} />
          <span>{t.wantsCall}</span>
        </label>
      )}

      <div className="sm:col-span-2">
        <label className="flex items-start gap-3">
          <input
            type="checkbox"
            name="consent"
            className="mt-0.5 size-5 shrink-0 accent-electric"
            checked={values.consent}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? id("consent-err") : undefined}
            onChange={(e) => set("consent", e.target.checked)}
          />
          <span className="text-sm text-muted">
            {t.consentStart}{" "}
            <Link href={`/${locale}/legal/confidentialite`} target="_blank" className="font-semibold text-electric-dark underline">
              {t.consentLink}
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id={id("consent-err")} className="mt-1.5 text-sm font-medium text-red-700">
            {t.errors.consent}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 sm:col-span-2">
        {hasErrors && (
          <p role="alert" className="text-sm font-medium text-red-700">
            {t.errorSummary}
          </p>
        )}
        {status === "error" && (
          <p role="alert" className="text-sm font-medium text-red-700">
            {t.serverError}
          </p>
        )}
        <button type="submit" className={`${btn.primary} w-full sm:w-auto sm:self-start`} disabled={status === "sending"}>
          {status === "sending" && <LoaderCircle className="size-5 animate-spin" aria-hidden="true" />}
          {status === "sending" ? t.sending : isPlan ? t.submitQuote : t.submitContact}
        </button>
      </div>
    </form>
  );
}
