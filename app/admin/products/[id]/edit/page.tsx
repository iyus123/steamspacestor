import { notFound } from "next/navigation";
import { products } from "@/lib/dummy-data";

export default async function AdminEditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = products.find((item) => item.id === id);
  if (!product) return notFound();

  return (
    <div className="card p-8">
      <h1 className="text-3xl font-black text-slate-950">Edit Produk</h1>
      <p className="mt-2 text-slate-600">Silakan ubah data produk dan hubungkan tombol simpan ke update query Supabase.</p>
      <form className="mt-8 grid gap-5 md:grid-cols-2">
        <input defaultValue={product.name} className="rounded-2xl border border-slate-300 px-4 py-3" />
        <input defaultValue={product.slug} className="rounded-2xl border border-slate-300 px-4 py-3" />
        <input defaultValue={product.price} className="rounded-2xl border border-slate-300 px-4 py-3" />
        <input defaultValue={product.promo_price ?? ""} className="rounded-2xl border border-slate-300 px-4 py-3" />
        <input defaultValue={product.category?.name} className="rounded-2xl border border-slate-300 px-4 py-3" />
        <select defaultValue={product.status} className="rounded-2xl border border-slate-300 px-4 py-3">
          <option value="available">available</option>
          <option value="limited">limited</option>
          <option value="sold_out">sold_out</option>
        </select>
        <textarea defaultValue={product.description} className="min-h-36 rounded-2xl border border-slate-300 px-4 py-3 md:col-span-2" />
        <button className="btn-primary md:col-span-2">Update Produk</button>
      </form>
    </div>
  );
}
