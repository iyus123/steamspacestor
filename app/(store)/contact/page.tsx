import Link from "next/link";
import { getSettings } from "@/lib/data-store";

export default async function ContactPage() {
  const settings = await getSettings();

  return (
    <section className="container-app py-20">
      <div className="mx-auto max-w-4xl card p-8 sm:p-12">
        <h1 className="text-4xl font-black text-slate-950 dark:text-white">Kontak SteamSpace</h1>
        <p className="mt-4 leading-8 text-slate-600 dark:text-slate-400">Hubungi admin untuk order, pertanyaan produk, atau request produk digital lain. Proses utama tetap via WhatsApp agar lebih cepat dan mudah.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-800">
            <p className="text-sm text-slate-500">WhatsApp</p>
            <p className="mt-2 text-lg font-bold text-slate-950 dark:text-white">{settings.whatsapp}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-800">
            <p className="text-sm text-slate-500">Email</p>
            <p className="mt-2 text-lg font-bold text-slate-950 dark:text-white">{settings.email}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-800">
            <p className="text-sm text-slate-500">Jam layanan</p>
            <p className="mt-2 text-lg font-bold text-slate-950 dark:text-white">{settings.hours}</p>
          </div>
          <div className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-800">
            <p className="text-sm text-slate-500">Sosial media</p>
            <p className="mt-2 text-lg font-bold text-slate-950 dark:text-white">IG {settings.instagram} · TikTok {settings.tiktok}</p>
          </div>
        </div>
        <Link href={`https://wa.me/${settings.whatsapp}`} target="_blank" className="btn-primary mt-8">Chat Admin Sekarang</Link>
      </div>
    </section>
  );
}
