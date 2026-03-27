import { ProductsCatalog } from "@/components/products-catalog";
import {
  getAvailableProducts,
  getCategories,
  getSettings,
} from "@/lib/data-store";

export default async function ProductsPage() {
  const [categories, products, settings] = await Promise.all([
    getCategories(),
    getAvailableProducts(),
    getSettings(),
  ]);

  return (
    <section className="container-app py-6 sm:py-10">
      <div className="mb-5 sm:mb-7">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand sm:text-sm">
          Produk
        </p>

        <h1 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
          Katalog SteamSpace
        </h1>

        <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500 dark:text-slate-400 sm:text-base">
          Temukan aplikasi premium, streaming, topup game, dan produk digital lainnya.
        </p>
      </div>

      <ProductsCatalog
        products={products}
        categories={categories}
        phone={settings.whatsapp}
      />
    </section>
  );
}
