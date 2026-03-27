import { createCategoryAction, deleteCategoryAction, updateCategoryAction } from "@/app/admin/actions";
import { CategoryManager } from "@/components/category-manager";
import { getCategories, getProducts } from "@/lib/data-store";

export default async function AdminCategoriesPage({ searchParams }: { searchParams?: Promise<{ success?: string; error?: string }> }) {
  const [categories, products, params] = await Promise.all([getCategories(), getProducts(), searchParams]);
  const success = params?.success;
  const error = params?.error;
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950 dark:text-white">Kelola Kategori</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Kategori sudah bisa ditambah, diubah, dan dihapus langsung dari panel admin.</p>
      </div>
      {success ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/30">{success}</p> : null}
      {error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30">{error}</p> : null}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Tambah Kategori Baru</h2>
        <div className="mt-6"><CategoryManager action={createCategoryAction} submitLabel="Simpan Kategori" /></div>
      </div>
      <div className="grid gap-4">
        {categories.map((category) => {
          const totalProducts = products.filter((product) => product.category_id === category.id).length;
          return (
            <div key={category.id} className="card p-6">
              <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-950 dark:text-white">{category.name}</h2>
                  <p className="mt-1 text-sm text-slate-500">Slug: {category.slug}</p>
                  <p className="mt-2 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 dark:bg-slate-800 dark:text-slate-200">{totalProducts} produk</p>
                </div>
                <form action={deleteCategoryAction}><input type="hidden" name="id" value={category.id} /><button className="rounded-2xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30">Hapus</button></form>
              </div>
              <CategoryManager action={updateCategoryAction} submitLabel="Update Kategori" defaultValues={{ id: category.id, name: category.name, slug: category.slug, description: category.description, icon: category.icon }} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
