import { Mail, MessageCircle, Phone } from "lucide-react";
import type { Dictionary, Locale } from "@/lib/i18n";
import { site, whatsappUrl } from "@/lib/site";
import { LeadForm } from "../LeadForm";
import { Reveal } from "../Reveal";
import { btn, container, eyebrow, h2 } from "@/lib/ui";

interface Props {
  locale: Locale;
  t: Dictionary;
}

export function Contact({ locale, t }: Props) {
  const c = t.contact;
  const wa = whatsappUrl(c.whatsappMessage);
  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className={`${container} grid gap-12 lg:grid-cols-[0.9fr_1.1fr]`}>
        <Reveal>
          <span className={eyebrow}>{c.eyebrow}</span>
          <h2 className={`${h2} mt-4`}>{c.title}</h2>
          <p className="mt-4 text-lg text-muted">{c.intro}</p>
          <div className="mt-8 flex flex-col items-start gap-4">
            <a href={`tel:${site.phone}`} className={btn.outlineDark} aria-label={`${c.phoneLabel} ${site.phoneDisplay}`}>
              <Phone className="size-5" aria-hidden="true" />
              {site.phoneDisplay}
            </a>
            {wa && (
              <a href={wa} target="_blank" rel="noopener noreferrer" className={btn.outlineDark}>
                <MessageCircle className="size-5" aria-hidden="true" />
                {c.whatsapp}
              </a>
            )}
            <a href={`mailto:${site.email}`} className="inline-flex min-h-11 items-center gap-2.5 font-semibold text-electric-dark underline" aria-label={`${c.emailLabel} ${site.email}`}>
              <Mail className="size-5" aria-hidden="true" />
              {site.email}
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="rounded-2xl border border-line bg-white p-6 shadow-lg shadow-night/5 sm:p-8">
            <LeadForm variant="contact" locale={locale} t={t.form} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
