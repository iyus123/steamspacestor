import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { getHomepageContent, getSettings } from "@/lib/data-store";

export default function HelpButton() {
  return (
    <a
      href="https://wa.me/6295320724689"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-40 inline-flex items-center gap-2 rounded-full bg-brand px-4 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-brand-dark active:scale-[0.98] sm:bottom-6 sm:right-6 sm:px-5 sm:py-3"
    >
      <span className="text-base leading-none">💬</span>
      <span className="sm:hidden">Chat Admin</span>
      <span className="hidden sm:inline">Butuh Bantuan? Chat Admin</span>
    </a>
  );
}
