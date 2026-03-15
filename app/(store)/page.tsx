import Link from "next/link";
import { ShieldCheck, Sparkles, Store } from "lucide-react";
import { ProductCard } from "@/components/product-card";
import { SectionTitle } from "@/components/section-title";
import { TestimonialCard } from "@/components/testimonial-card";
import { getAvailableProducts, getTestimonials } from "@/lib/data-store";

export default async function HomePage() {
  const [products, testimonials] = await Promise.all([getAvailableProducts(), getTestimonials()]);

  return (
    <>
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-grid bg-[size:24px_24px] opacity-20" />
        <div className="container-app relative grid gap-10 py-20 md:grid-cols-2 md:items-center">
          <div>
            <span className="badge border-white/10 bg-white/10 text-white">Katalog Aplikasi Premium</span>
            <h1 className="mt-6 text-4xl font-black leading-tight sm:text-6xl">Jualan aplikasi premium dengan tampilan mewah dan order super cepat.</h1>
            <p className="mt-5 max-w-xl text-lg leading-8 text-slate-300">Bangun toko digital modern untuk menampilkan produk premium, mengelola katalog, dan menerima pesanan langsung via WhatsApp tanpa proses checkout yang rumit.</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/products" className="btn-primary">Lihat Katalog</Link>
              <Link href="/contact" className="btn-secondary border-white/15 bg-white/5 text-white hover:bg-white/10">Hubungi Admin</Link>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"><Store className="mb-3" /><h3 className="text-xl font-bold">Katalog Premium</h3><p className="mt-2 text-sm text-slate-300">Tampilkan produk digital dengan gambar, harga, detail, dan tombol order otomatis.</p></div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur"><ShieldCheck className="mb-3" /><h3 className="text-xl font-bold">Admin Mudah</h3><p className="mt-2 text-sm text-slate-300">Kelola kategori, stok, harga, gambar, dan deskripsi dalam dashboard modern.</p></div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur sm:col-span-2"><Sparkles className="mb-3" /><h3 className="text-xl font-bold">Fokus Konversi</h3><p className="mt-2 text-sm text-slate-300">Pembeli cukup pilih produk dan klik WhatsApp. Cocok untuk jualan akun premium, tools, dan lisensi digital.</p></div>
          </div>
        </div>
      </section>

      <section className="container-app py-20">
        <SectionTitle badge="Produk Unggulan" title="Produk digital yang tampil lebih profesional" description="Gunakan katalog ini untuk meningkatkan kepercayaan calon pembeli dan mempermudah pemesanan." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </section>

      <section className="container-app py-10">
        <SectionTitle badge="Testimoni" title="Dipercaya untuk jualan aplikasi premium" description="Desain modern bukan hanya cantik, tapi juga meningkatkan kredibilitas toko digital Anda." />
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((item) => <TestimonialCard key={item.id} testimonial={item} />)}
        </div>
      </section>
    </>
  );
}
