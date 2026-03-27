import { getCategories, getFeaturedProducts, getHomepageContent, getProducts, getSettings, getTestimonials } from "@/lib/data-store";
import { formatCurrency, statusLabel } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [categories, products, settings, testimonials, homepage, featuredProducts] = await Promise.all([
    getCategories(),
    getProducts(),
    getSettings(),
    getTestimonials(),
    getHomepageContent(),
    getFeaturedProducts(3)
  ]);
  const availableProducts = products.filter((product) => product.status === "available").length;
  const estimatedCatalogValue = products.reduce((acc, item) => acc + (item.promo_price ?? item.price), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950 dark:text-white">Dashboard SteamSpace</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Pantau katalog, konten homepage, kategori, testimoni, dan identitas toko dari satu dashboard.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-5">
        <div className="card p-6"><p className="text-sm text-slate-500">Total Produk</p><p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{products.length}</p></div>
        <div className="card p-6"><p className="text-sm text-slate-500">Produk Tersedia</p><p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{availableProducts}</p></div>
        <div className="card p-6"><p className="text-sm text-slate-500">Kategori</p><p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{categories.length}</p></div>
        <div className="card p-6"><p className="text-sm text-slate-500">Testimoni</p><p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{testimonials.length}</p></div>
        <div className="card p-6"><p className="text-sm text-slate-500">Produk Populer</p><p className="mt-2 text-3xl font-black text-slate-950 dark:text-white">{featuredProducts.length}</p></div>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <div className="card overflow-hidden">
          <div className="border-b border-slate-200 p-6 dark:border-slate-800"><h2 className="text-xl font-bold text-slate-950 dark:text-white">Produk Terbaru</h2></div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900"><tr><th className="px-6 py-4">Produk</th><th className="px-6 py-4">Kategori</th><th className="px-6 py-4">Harga</th><th className="px-6 py-4">Status</th></tr></thead>
              <tbody>
                {products.slice(0, 8).map((product) => (
                  <tr key={product.id} className="border-t border-slate-100 dark:border-slate-800">
                    <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{product.name}</td>
                    <td className="px-6 py-4">{product.category?.name}</td>
                    <td className="px-6 py-4">{formatCurrency(product.promo_price ?? product.price)}</td>
                    <td className="px-6 py-4">{statusLabel(product.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">Ringkasan Toko</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <p><span className="font-semibold text-slate-900 dark:text-white">Nama:</span> {settings.name}</p>
              <p><span className="font-semibold text-slate-900 dark:text-white">Slogan:</span> {settings.slogan}</p>
              <p><span className="font-semibold text-slate-900 dark:text-white">WhatsApp:</span> {settings.whatsapp}</p>
              <p><span className="font-semibold text-slate-900 dark:text-white">Email:</span> {settings.email}</p>
              <p><span className="font-semibold text-slate-900 dark:text-white">Nilai katalog:</span> {formatCurrency(estimatedCatalogValue)}</p>
            </div>
          </div>
          <div className="card p-6">
            <h2 className="text-xl font-bold text-slate-950 dark:text-white">Homepage Aktif</h2>
            <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <p><span className="font-semibold text-slate-900 dark:text-white">Hero:</span> {homepage.hero_title}</p>
              <p><span className="font-semibold text-slate-900 dark:text-white">CTA:</span> {homepage.cta_button}</p>
              <p><span className="font-semibold text-slate-900 dark:text-white">Keunggulan:</span> {homepage.advantages.length}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
