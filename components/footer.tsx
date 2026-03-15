export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      <div className="container-app flex flex-col gap-4 py-10 text-sm text-slate-600 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="font-semibold text-slate-900">PremiumApps Store</p>
          <p>Katalog aplikasi premium dengan pemesanan cepat via WhatsApp.</p>
        </div>
        <p>© 2026 PremiumApps. Dibangun dengan Next.js, Tailwind, dan Supabase.</p>
      </div>
    </footer>
  );
}
