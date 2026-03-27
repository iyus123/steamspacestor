import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/types";

export function ProductCard({
  product,
  categoryName,
  whatsappLink,
}: {
  product: Product;
  categoryName: string;
  whatsappLink: string;
}) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900">
      <div className="relative aspect-[4/2.4] overflow-hidden bg-slate-100 dark:bg-slate-800">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition duration-500 hover:scale-105"
        />

        <div className="absolute left-2.5 top-2.5">
          <span
            className={`rounded-full px-2.5 py-1 text-[10px] font-semibold shadow-sm ${
              product.available
                ? "bg-emerald-500 text-white"
                : "bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-100"
            }`}
          >
            {product.available ? "Tersedia" : "Kosong"}
          </span>
        </div>
      </div>

      <div className="p-3">
        <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand">
          {categoryName}
        </p>

        <h3 className="line-clamp-2 text-base font-black leading-tight text-slate-950 dark:text-white sm:text-lg">
          {product.name}
        </h3>

        <p className="mt-1.5 text-sm font-bold text-slate-950 dark:text-white sm:text-base">
          {product.price}
        </p>

        {product.short_description ? (
          <p className="mt-2 line-clamp-2 text-[11px] leading-5 text-slate-500 dark:text-slate-400 sm:text-xs">
            {product.short_description}
          </p>
        ) : null}

        <div className="mt-3 grid grid-cols-2 gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex items-center justify-center rounded-xl border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 active:scale-[0.98] dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800 sm:text-sm"
          >
            Detail <ArrowUpRight size={14} className="ml-1" />
          </Link>

          <Link
            href={whatsappLink}
            target="_blank"
            className="inline-flex items-center justify-center rounded-xl bg-brand px-3 py-2 text-xs font-semibold text-white transition hover:bg-brand-dark active:scale-[0.98] sm:text-sm"
          >
            Order
          </Link>
        </div>
      </div>
    </div>
  );
}
