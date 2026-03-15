import { getCategories, getProducts } from "@/lib/data-store";

export default async function AdminCategoriesPage() {
  const [categories, products] = await Promise.all([getCategories(), getProducts()]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950">Kelola Kategori</h1>
        <p className="mt-2 text-slate-600">Kategori masih lokal, tetapi sudah dipakai penuh oleh produk dan katalog pembeli.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => {
          const totalProducts = products.filter((product) => product.category_id === category.id).length;
          return (
            <div key={category.id} className="card p-6">
              <h2 className="text-xl font-bold text-slate-950">{category.name}</h2>
              <p className="mt-2 text-sm leading-7 text-slate-600">{category.description}</p>
              <p className="mt-4 text-sm font-semibold text-brand">{totalProducts} produk</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
