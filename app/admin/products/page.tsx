import Link from "next/link";
import { deleteProductAction, updateProductStatusAction } from "@/app/admin/actions";
import { getProducts } from "@/lib/data-store";
import { formatCurrency, statusLabel } from "@/lib/utils";

export default async function AdminProductsPage({ searchParams }: { searchParams?: Promise<{ success?: string; error?: string }> }) {
  const [products, params] = await Promise.all([getProducts(), searchParams]);
  const success = params?.success;
  const error = params?.error;

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950 dark:text-white">Kelola Produk</h1>
          <p className="mt-2 text-slate-600 dark:text-slate-400">Tambah, edit, hapus, dan atur status setiap produk SteamSpace.</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">Tambah Produk</Link>
      </div>
      {success ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/30">{success}</p> : null}
      {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30">{error}</p> : null}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 dark:bg-slate-900">
              <tr>
                <th className="px-6 py-4">Nama Produk</th>
                <th className="px-6 py-4">Harga</th>
                <th className="px-6 py-4">Kategori</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-t border-slate-100 dark:border-slate-800">
                  <td className="px-6 py-4 font-medium text-slate-900 dark:text-white">{product.name}</td>
                  <td className="px-6 py-4">{formatCurrency(product.promo_price ?? product.price)}</td>
                  <td className="px-6 py-4">{product.category?.name}</td>
                  <td className="px-6 py-4">
                    <form action={updateProductStatusAction} className="flex items-center gap-2">
                      <input type="hidden" name="id" value={product.id} />
                      <select name="status" defaultValue={product.status} className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-950">
                        <option value="available">Tersedia</option>
                        <option value="limited">Terbatas</option>
                        <option value="sold_out">Habis</option>
                      </select>
                      <button className="text-xs font-semibold text-brand">Simpan</button>
                    </form>
                    <span className="mt-1 inline-block text-xs text-slate-500">{statusLabel(product.status)}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <Link href={`/admin/products/${product.id}/edit`} className="font-semibold text-brand">Edit</Link>
                      <form action={deleteProductAction}>
                        <input type="hidden" name="id" value={product.id} />
                        <button className="font-semibold text-red-600">Hapus</button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
