const faqs = [
  {
    q: "Bagaimana cara order produk?",
    a: "Pilih produk yang diinginkan lalu klik tombol Order via WhatsApp. Pesan otomatis akan terisi dengan nama produk, kategori, dan harga."
  },
  {
    q: "Apakah admin bisa update harga sendiri?",
    a: "Bisa. Di dashboard admin tersedia fitur untuk mengelola harga, gambar, deskripsi, kategori, dan status ketersediaan produk."
  },
  {
    q: "Apakah website ini cocok untuk produk digital lain?",
    a: "Ya. Struktur produk fleksibel sehingga bisa dipakai untuk akun premium, tools AI, lisensi software, template, dan layanan digital lain."
  }
];

export default function FaqPage() {
  return (
    <section className="container-app py-20">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-center text-4xl font-black text-slate-950">FAQ</h1>
        <p className="mt-4 text-center text-slate-600">Pertanyaan yang sering ditanyakan pembeli dan pemilik toko.</p>
        <div className="mt-10 space-y-4">
          {faqs.map((item) => (
            <div key={item.q} className="card p-6">
              <h2 className="text-lg font-bold text-slate-950">{item.q}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-600">{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
