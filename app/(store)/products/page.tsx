import { ProductsCatalog } from "@/components/products-catalog";
import { getAvailableProducts, getCategories, getSettings } from "@/lib/data-store";

export default async function ProductsPage() {
  const [categories, products, settings] = await Promise.all([getCategories(), getAvailableProducts(), getSettings()]);

  return (
    <section className="container-app py-10 sm:py-14">
      <div className="mb-7 sm:mb-8">
        <p className="text-sm font-semibold uppercase tracking-[0.28em] text-brand">Produk</p>
        <h1 className="mt-3 text-[2.5rem] font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:mt-2 sm:text-3xl sm:tracking-tight">Katalog SteamSpace</h1>
      </div>
      <ProductsCatalog products={products} categories={categories} phone={settings.whatsapp} />
    </section>
  );
}
