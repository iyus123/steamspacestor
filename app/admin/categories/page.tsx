import { categories } from "@/lib/dummy-data";

export default function AdminCategoriesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950">Kelola Kategori</h1>
        <p className="mt-2 text-slate-600">Atur kategori untuk mempermudah pengelompokan produk digital.</p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {categories.map((category) => (
          <div key={category.id} className="card p-6">
            <h2 className="text-xl font-bold text-slate-950">{category.name}</h2>
            <p className="mt-2 text-sm leading-7 text-slate-600">{category.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
