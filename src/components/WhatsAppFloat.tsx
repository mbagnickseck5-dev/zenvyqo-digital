import { whatsappUrl } from "@/lib/site";
import { WhatsAppIcon } from "./WhatsAppIcon";

/** Bouton WhatsApp flottant, en bas à droite de toutes les pages. */
export function WhatsAppFloat({ label, message }: { label: string; message: string }) {
  const href = whatsappUrl(message);
  if (!href) return null;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="fixed right-4 bottom-4 z-30 inline-flex size-14 items-center justify-center gap-2 rounded-full bg-[#25D366] text-[#073B1F] shadow-xl shadow-black/25 ring-4 ring-white/70 transition duration-200 hover:-translate-y-0.5 hover:bg-[#1FBE5B] sm:right-6 sm:bottom-6 sm:h-14 sm:w-auto sm:px-5"
    >
      <WhatsAppIcon className="size-7 sm:size-6" />
      <span className="hidden text-base font-bold sm:inline">WhatsApp</span>
    </a>
  );
}
