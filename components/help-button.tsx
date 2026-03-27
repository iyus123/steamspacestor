import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { getHomepageContent, getSettings } from "@/lib/data-store";

export default function HelpButton() {
  return (
    <a
      href="https://wa.me/6295320724689"
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-4 right-4 z-40 rounded-full bg-brand px-3 py-2 text-xs font-semibold text-white shadow-lg sm:bottom-6 sm:right-6 sm:px-4 sm:py-3 sm:text-sm"
    >
      <span className="sm:hidden">Chat</span>
      <span className="hidden sm:inline">Butuh Bantuan? Chat Admin</span>
    </a>
  );
}
