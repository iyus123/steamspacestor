"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Category, Product } from "@/types";
import { ProductCard } from "@/components/product-card";
import { CategoryIcon } from "@/components/category-icon";
import { Reveal } from "@/components/reveal";

export function ProductsCatalog({
  products,
  categories,
  phone,
}: {
  products: Product[];
  categories: Category[];
  phone: string;
}) {
  const [keyword, setKeyword] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    const q = keyword.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "all" || product.category_id === activeCategory;

      const matchesKeyword =
        !q ||
        product.name.toLowerCase().includes(q) ||
        product.short_description.toLowerCase().includes(q) ||
        product.category?.name?.toLowerCase().includes(q);

      return matchesCategory && matchesKeyword;
    });
  }, [products, keyword, activeCategory]);

  return (
    <div className="space-y-4 sm:space-y-6">
      <Reveal>
        <div className="relative">
          <Search
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            size={17}
          />
          <input
            value={keyword}
            onChange={(event) => setKeyword(event.target.value)}
            placeholder="Cari produk..."
            className="input h-12 rounded-2xl border-slate-200 pl-11 text-sm placeholder:text-slate-400 focus:border-brand sm:h-14 sm:rounded-[22px] sm:text-base"
          />
        </div>
      </Reveal>

      <Reveal delay={80}>
        <div className="no-scrollbar -mx-4 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 snap-x-mandatory">
          <div className="flex min-w-max gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={() => setActiveCategory("all")}
              className={`interactive-card snap-start flex min-w-[150px] items-center gap-3 rounded-2xl border px-3 py-3 text-left transition sm:min-w-[160px] sm:rounded-[24px] sm:px-4 ${
                activeCategory === "all"
                  ? "border-brand bg-brand text-white shadow-neon"
                  : "border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
              }`}
            >
              <div
                className={`rounded-xl p-2.5 transition duration-300 ${
                  activeCategory === "all"
                    ? "bg-white/15"
                    : "bg-slate-100 dark:bg-slate-800"
                }`}
              >
                <Search className="h-4 w-4 sm:h-5 sm:w-5" />
              </div>

              <div className="min-w-0">
                <p className="text-[10px] opacity-80 sm:text-xs">Kategori</p>
                <p className="text-sm font-bold leading-5 sm:text-sm sm:font-semibold">
                  Semua
                </p>
              </div>
            </button>

            {categories.map((category) => {
              const active = activeCategory === category.id;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`interactive-card snap-start flex min-w-[190px] items-center gap-3 rounded-2xl border px-3 py-3 text-left transition sm:min-w-[220px] sm:rounded-[24px] sm:px-4 ${
                    active
                      ? "border-brand bg-brand text-white shadow-neon"
                      : "border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  }`}
                >
                  <div
                    className={`rounded-xl p-2.5 transition duration-300 ${
                      active ? "bg-white/15" : "bg-slate-100 dark:bg-slate-800"
                    }`}
                  >
                    <CategoryIcon
                      name={category.icon}
                      className="h-4 w-4 sm:h-5 sm:w-5"
                    />
                  </div>

                  <div className="min-w-0">
                    <p className="line-clamp-2 text-sm font-bold leading-5 sm:text-sm sm:font-semibold">
                      {category.name}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
        <p>{filteredProducts.length} produk</p>

        {keyword || activeCategory !== "all" ? (
          <button
            type="button"
            onClick={() => {
              setKeyword("");
              setActiveCategory("all");
            }}
            className="font-semibold text-brand transition hover:translate-x-0.5"
          >
            Reset
          </button>
        ) : null}
      </div>

      {filteredProducts.length ? (
        <div className="grid grid-cols-1 gap-3 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {filteredProducts.map((product, index) => (
            <Reveal key={product.id} delay={(index % 6) * 60}>
              <ProductCard product={product} phone={phone} />
            </Reveal>
          ))}
        </div>
      ) : (
        <div className="card p-6 text-center sm:p-10">
          <h3 className="text-lg font-bold text-slate-950 dark:text-white sm:text-xl">
            Produk tidak ditemukan
          </h3>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Coba kata kunci lain atau pilih kategori berbeda.
          </p>
        </div>
      )}
    </div>
  );
}
