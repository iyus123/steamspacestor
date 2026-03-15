import Link from "next/link";
import { products } from "@/lib/dummy-data";
import { formatCurrency } from "@/lib/utils";

export default function AdminProductsPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-950">Kelola Produk</h1>
          <p className="mt-2 text-slate-600">Tambah, edit, dan atur status setiap produk premium.</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          Tambah Produk
        </Link>
      </div>

      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500">
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
                <tr key={product.id} className="border-t border-slate-100">
                  <td className="px-6 py-4 font-medium text-slate-900">{product.name}</td>
                  <td className="px-6 py-4">{formatCurrency(product.promo_price ?? product.price)}</td>
                  <td className="px-6 py-4">{product.category?.name}</td>
                  <td className="px-6 py-4 capitalize">{product.status}</td>
                  <td className="px-6 py-4">
                    <Link href={`/admin/products/${product.id}/edit`} className="font-semibold text-brand">
                      Edit
                    </Link>
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
