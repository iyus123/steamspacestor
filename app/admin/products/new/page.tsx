import { createProductAction } from "@/app/admin/actions";
import { AdminProductForm } from "@/components/admin-product-form";
import { getCategories } from "@/lib/data-store";

export default async function AdminNewProductPage() {
  const categories = await getCategories();

  return (
    <div className="card p-8">
      <h1 className="text-3xl font-black text-slate-950">Tambah Produk Baru</h1>
      <p className="mt-2 text-slate-600">Form ini sudah aktif untuk menyimpan produk ke data lokal dan upload gambar ke folder public/uploads.</p>
      <AdminProductForm categories={categories} action={createProductAction} submitLabel="Simpan Produk" />
    </div>
  );
}
