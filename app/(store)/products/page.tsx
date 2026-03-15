import { ProductCard } from "@/components/product-card";
import { SectionTitle } from "@/components/section-title";
import { categories, products } from "@/lib/dummy-data";

export default function ProductsPage() {
  return (
    <section className="container-app py-20">
      <SectionTitle badge="Semua Produk" title="Katalog produk digital premium" description="Pembeli dapat memilih produk berdasarkan kategori dan langsung order via WhatsApp." />
      <div className="mb-8 flex flex-wrap gap-3">
        {categories.map((category) => (
          <span key={category.id} className="badge">
            {category.name}
          </span>
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
