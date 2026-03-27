import Link from "next/link";
import { Logo } from "@/components/logo";
import { getSettings } from "@/lib/data-store";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-8 dark:border-slate-800 dark:bg-slate-950">
      <div className="container-app">
        <p className="text-sm text-slate-500 dark:text-slate-400">
        <div>
          <Logo withText />
          <p className="mt-4 max-w-md text-sm leading-7 text-slate-600 dark:text-slate-400">{settings.slogan}</p>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Navigasi</p>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <Link href="/products" className="block hover:text-brand">Produk</Link>
            <Link href="/faq" className="block hover:text-brand">FAQ</Link>
            <Link href="/testimonials" className="block hover:text-brand">Testimoni</Link>
            <Link href="/contact" className="block hover:text-brand">Kontak</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-slate-400">Kontak</p>
          <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
            <p>WhatsApp: {settings.whatsapp}</p>
            <p>Email: {settings.email}</p>
            <p>Jam layanan: {settings.hours}</p>
            <p>IG: {settings.instagram}</p>
            <p>TikTok: {settings.tiktok}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200 py-5 text-center text-sm text-slate-500 dark:border-slate-800 dark:text-slate-400">
        © 2026 {settings.name}
      </div>
    </footer>
  );
}
