import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { LEGAL_SLUGS, LOCALES, getDictionary, isLocale, type LegalSlug } from "@/lib/i18n";

interface Params {
  params: Promise<{ locale: string; slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return LOCALES.flatMap((locale) => LEGAL_SLUGS.map((slug) => ({ locale, slug })));
}

function isLegalSlug(slug: string): slug is LegalSlug {
  return (LEGAL_SLUGS as readonly string[]).includes(slug);
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isLegalSlug(slug)) return {};
  return {
    title: getDictionary(locale).legal.pages[slug].title,
    alternates: { canonical: `/${locale}/legal/${slug}` },
  };
}

export default async function LegalPage({ params }: Params) {
  const { locale, slug } = await params;
  if (!isLocale(locale) || !isLegalSlug(slug)) notFound();
  const t = getDictionary(locale).legal;
  const page = t.pages[slug];

  return (
    <article className="mx-auto w-full max-w-3xl px-5 py-14 sm:px-8 sm:py-20">
      <Link href={`/${locale}`} className="inline-flex min-h-11 items-center gap-2 font-semibold text-electric-dark">
        <ArrowLeft className="size-4" aria-hidden="true" />
        {t.back}
      </Link>
      <h1 className="mt-4 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{page.title}</h1>
      <p role="note" className="mt-6 rounded-xl border border-amber-300 bg-amber-50 px-5 py-4 text-sm text-amber-900">
        {t.notice}
      </p>
      {page.sections.map((section) => (
        <section key={section.heading} className="mt-10">
          <h2 className="font-display text-xl font-bold">{section.heading}</h2>
          {section.paragraphs.map((p) => (
            <p key={p} className="mt-3 leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </section>
      ))}
    </article>
  );
}
