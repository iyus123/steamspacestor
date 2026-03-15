import Link from "next/link";

export default function ContactPage() {
  const phone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890";

  return (
    <section className="container-app py-20">
      <div className="mx-auto max-w-3xl card p-8 sm:p-12">
        <h1 className="text-4xl font-black text-slate-950">Kontak</h1>
        <p className="mt-4 leading-8 text-slate-600">
          Hubungi admin untuk informasi katalog, kerja sama, atau pemesanan custom. Anda juga bisa mengarahkan semua order langsung ke WhatsApp utama toko.
        </p>
        <div className="mt-8 space-y-4 text-slate-700">
          <p>Email: admin@premiumapps.test</p>
          <p>WhatsApp: +{phone}</p>
          <p>Jam layanan: 08.00 - 22.00 WIB</p>
        </div>
        <Link href={`https://wa.me/${phone}`} target="_blank" className="btn-primary mt-8">
          Chat Admin Sekarang
        </Link>
      </div>
    </section>
  );
}
