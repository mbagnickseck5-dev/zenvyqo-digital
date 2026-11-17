import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CircleCheck } from "lucide-react";
import { getDictionary, isLocale } from "@/lib/i18n";
import { btn } from "@/lib/ui";

export const metadata: Metadata = { robots: { index: false } };

/** Page de retour après un paiement Stripe réussi. */
export default async function ThanksPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const t = getDictionary(locale).thanks;
  const testMode = !process.env.STRIPE_SECRET_KEY || process.env.STRIPE_SECRET_KEY.includes("_test_");

  return (
    <section className="mx-auto flex w-full max-w-2xl flex-col items-center px-5 py-24 text-center">
      <CircleCheck className="size-16 text-electric" aria-hidden="true" />
      <h1 className="mt-6 font-display text-3xl font-extrabold sm:text-4xl">{t.title}</h1>
      <p className="mt-4 text-lg text-muted">{t.text}</p>
      {testMode && <p className="mt-4 rounded-lg bg-amber-50 px-4 py-2 text-sm text-amber-900">{t.testNote}</p>}
      <Link href={`/${locale}`} className={`${btn.primary} mt-8`}>
        {t.back}
      </Link>
    </section>
  );
}
