export default function AdminNewProductPage() {
  return (
    <div className="card p-8">
      <h1 className="text-3xl font-black text-slate-950">Tambah Produk Baru</h1>
      <p className="mt-2 text-slate-600">Form ini bisa dihubungkan ke Supabase insert API atau server action.</p>
      <form className="mt-8 grid gap-5 md:grid-cols-2">
        <input className="rounded-2xl border border-slate-300 px-4 py-3" placeholder="Nama produk" />
        <input className="rounded-2xl border border-slate-300 px-4 py-3" placeholder="Slug produk" />
        <input className="rounded-2xl border border-slate-300 px-4 py-3" placeholder="Harga normal" />
        <input className="rounded-2xl border border-slate-300 px-4 py-3" placeholder="Harga promo" />
        <input className="rounded-2xl border border-slate-300 px-4 py-3" placeholder="Kategori" />
        <select className="rounded-2xl border border-slate-300 px-4 py-3">
          <option>Tersedia</option>
          <option>Terbatas</option>
          <option>Habis</option>
        </select>
        <textarea className="min-h-36 rounded-2xl border border-slate-300 px-4 py-3 md:col-span-2" placeholder="Deskripsi produk" />
        <input className="rounded-2xl border border-slate-300 px-4 py-3 md:col-span-2" placeholder="URL gambar cover" />
        <button className="btn-primary md:col-span-2">Simpan Produk</button>
      </form>
    </div>
  );
}
