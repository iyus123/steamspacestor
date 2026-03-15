import { getCategories, getProducts } from "@/lib/data-store";
import { formatCurrency } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);
  const availableProducts = products.filter((product) => product.status === "available").length;
  const estimatedCatalogValue = products.reduce((acc, item) => acc + (item.promo_price ?? item.price), 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950">Dashboard Admin</h1>
        <p className="mt-2 text-slate-600">Pantau katalog produk digital dan lakukan update dengan cepat.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="card p-6"><p className="text-sm text-slate-500">Total Produk</p><p className="mt-2 text-3xl font-black text-slate-950">{products.length}</p></div>
        <div className="card p-6"><p className="text-sm text-slate-500">Produk Tersedia</p><p className="mt-2 text-3xl font-black text-slate-950">{availableProducts}</p></div>
        <div className="card p-6"><p className="text-sm text-slate-500">Nilai Katalog</p><p className="mt-2 text-3xl font-black text-slate-950">{formatCurrency(estimatedCatalogValue)}</p></div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
        <div className="card overflow-hidden">
          <div className="border-b border-slate-200 p-6"><h2 className="text-xl font-bold text-slate-950">Produk Terbaru</h2></div>
          <div className="overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-500"><tr><th className="px-6 py-4">Produk</th><th className="px-6 py-4">Kategori</th><th className="px-6 py-4">Harga</th><th className="px-6 py-4">Status</th></tr></thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-t border-slate-100">
                    <td className="px-6 py-4 font-medium text-slate-900">{product.name}</td>
                    <td className="px-6 py-4">{product.category?.name}</td>
                    <td className="px-6 py-4">{formatCurrency(product.promo_price ?? product.price)}</td>
                    <td className="px-6 py-4 capitalize">{product.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card p-6">
          <h2 className="text-xl font-bold text-slate-950">Kategori</h2>
          <div className="mt-4 space-y-3">
            {categories.map((category) => (
              <div key={category.id} className="rounded-2xl bg-slate-50 p-4">
                <p className="font-semibold text-slate-900">{category.name}</p>
                <p className="mt-1 text-sm text-slate-600">{category.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
