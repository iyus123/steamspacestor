import { notFound } from "next/navigation";
import { updateProductAction } from "@/app/admin/actions";
import { AdminProductForm } from "@/components/admin-product-form";
import { getCategories, getProductById } from "@/lib/data-store";

export default async function AdminEditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [categories, product] = await Promise.all([getCategories(), getProductById(id)]);

  if (!product) return notFound();

  const action = updateProductAction.bind(null, id);

  return (
    <div className="card p-8">
      <h1 className="text-3xl font-black text-slate-950">Edit Produk</h1>
      <p className="mt-2 text-slate-600">Silakan ubah data produk lalu simpan. Perubahan akan langsung tampil di katalog pembeli.</p>
      <AdminProductForm categories={categories} action={action} product={product} submitLabel="Update Produk" />
    </div>
  );
}
