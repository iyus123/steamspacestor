import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { getHomepageContent, getSettings } from "@/lib/data-store";

export async function HelpButton() {
  const [settings, homepage] = await Promise.all([getSettings(), getHomepageContent()]);

  return (
    <Link
      href={`https://wa.me/${settings.whatsapp}`}
      target="_blank"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full border border-brand/15 bg-white px-3 py-3 shadow-[0_16px_30px_rgba(15,23,42,0.12)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_35px_rgba(59,130,246,0.18)] dark:bg-slate-900 sm:bottom-5 sm:right-5 sm:gap-3 sm:px-4"
    >
      <span className="pulse-soft inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white shadow-neon sm:h-11 sm:w-11">
        <MessageCircleMore size={18} />
      </span>
      <span className="hidden pr-2 sm:block">
        <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-brand">{homepage.help_badge}</span>
        <span className="block text-sm font-bold text-slate-950 dark:text-white">{homepage.help_text}</span>
      </span>
    </Link>
  );
}
