import { updateProductAction } from "@/app/admin/actions";
import { AdminProductForm } from "@/components/admin-product-form";
import { getCategories, getProductById } from "@/lib/data-store";
import { notFound } from "next/navigation";

export default async function AdminEditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [categories, product] = await Promise.all([getCategories(), getProductById(id)]);
  if (!product) return notFound();

  return (
    <div className="card p-8">
      <h1 className="text-3xl font-black text-slate-950 dark:text-white">Edit Produk</h1>
      <p className="mt-2 text-slate-600 dark:text-slate-400">Update nama, harga, kategori, deskripsi, dan gambar produk.</p>
      <AdminProductForm categories={categories} action={updateProductAction.bind(null, product.id)} product={product} submitLabel="Update Produk" />
    </div>
  );
}
