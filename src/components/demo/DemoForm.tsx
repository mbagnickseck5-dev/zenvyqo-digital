"use client";

import { useId, useState, type FormEvent } from "react";
import { CircleCheck } from "lucide-react";

export interface DemoField {
  name: string;
  label: string;
  type?: "text" | "tel" | "email" | "date" | "select" | "textarea" | "chips";
  options?: string[];
  placeholder?: string;
  /** Occupe toute la largeur du formulaire */
  full?: boolean;
  required?: boolean;
  autoComplete?: string;
}

export interface DemoFormTheme {
  label: string;
  input: string;
  chip: string;
  chipActive: string;
  button: string;
  success: string;
  link: string;
}

/**
 * Formulaire de démonstration : rien n'est envoyé. Il montre au visiteur ce que
 * ses propres clients vivraient, puis explique ce qui se passerait sur un vrai site.
 */
export function DemoForm({ fields, submitLabel, theme }: { fields: DemoField[]; submitLabel: string; theme: DemoFormTheme }) {
  const uid = useId();
  const [sent, setSent] = useState(false);
  const [chips, setChips] = useState<Record<string, string>>({});

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  if (sent) {
    return (
      <div role="status" className={`rounded-2xl p-6 ${theme.success}`}>
        <CircleCheck className="size-8" aria-hidden="true" />
        <p className="mt-3 text-lg font-semibold">Demande reçue (démonstration)</p>
        <p className="mt-2 leading-relaxed opacity-85">
          Sur un vrai site conçu par Zenvyqo Digital, cette demande arriverait aussitôt sur le WhatsApp de l’entreprise, avec une copie par
          courriel.
        </p>
        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <a href="/fr#forfaits" className={`font-semibold underline underline-offset-4 ${theme.link}`}>
            Je veux ce site pour mon entreprise
          </a>
          <button type="button" onClick={() => setSent(false)} className="font-semibold underline underline-offset-4 opacity-80">
            Recommencer
          </button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {fields.map((f) => {
        const id = `${uid}-${f.name}`;
        const span = f.full || f.type === "textarea" || f.type === "chips" ? "sm:col-span-2" : "";
        if (f.type === "chips") {
          return (
            <fieldset key={f.name} className={span}>
              <legend className={`mb-2 text-sm font-semibold ${theme.label}`}>{f.label}</legend>
              <div className="flex flex-wrap gap-2">
                {f.options?.map((opt) => {
                  const active = chips[f.name] === opt;
                  return (
                    <button
                      key={opt}
                      type="button"
                      aria-pressed={active}
                      onClick={() => setChips((c) => ({ ...c, [f.name]: opt }))}
                      className={`min-h-11 rounded-full px-4 text-sm font-semibold transition ${active ? theme.chipActive : theme.chip}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </fieldset>
          );
        }
        return (
          <div key={f.name} className={span}>
            <label htmlFor={id} className={`mb-1.5 block text-sm font-semibold ${theme.label}`}>
              {f.label}
            </label>
            {f.type === "select" ? (
              <select id={id} name={f.name} required={f.required} defaultValue="" className={theme.input}>
                <option value="" disabled>
                  Choisir…
                </option>
                {f.options?.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            ) : f.type === "textarea" ? (
              <textarea id={id} name={f.name} rows={3} placeholder={f.placeholder} className={theme.input} />
            ) : (
              <input
                id={id}
                name={f.name}
                type={f.type ?? "text"}
                required={f.required}
                placeholder={f.placeholder}
                autoComplete={f.autoComplete}
                className={theme.input}
              />
            )}
          </div>
        );
      })}
      <div className="sm:col-span-2">
        <button type="submit" className={`inline-flex min-h-12 w-full items-center justify-center rounded-xl px-6 font-semibold transition sm:w-auto ${theme.button}`}>
          {submitLabel}
        </button>
        <p className={`mt-3 text-xs opacity-70 ${theme.label}`}>Formulaire de démonstration : aucune donnée n’est envoyée.</p>
      </div>
    </form>
  );
}
