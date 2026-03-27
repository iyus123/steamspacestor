import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency, statusLabel } from "@/lib/utils";

export function FeaturedProductCard({ product }: { product: Product }) {
  const cover = product.product_images?.find((img) => img.is_cover) ?? product.product_images?.[0];

  return (
    <div className="card interactive-card group overflow-hidden rounded-[26px] sm:rounded-[30px]">
      <div className="relative h-52 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 sm:h-52">
        <Image src={cover?.image_url || "/placeholder.png"} alt={cover?.alt_text || product.name} fill className="object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/15 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold text-slate-700 backdrop-blur dark:bg-slate-950/80 dark:text-slate-200">{statusLabel(product.status)}</div>
      </div>
      <div className="space-y-3 p-4 sm:space-y-4 sm:p-5">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand sm:text-xs sm:tracking-[0.18em]">{product.category?.name}</p>
          <h3 className="mt-2 line-clamp-2 text-[1.7rem] font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:text-xl sm:tracking-normal">{product.name}</h3>
          <p className="mt-2 text-lg font-bold text-slate-950 dark:text-white">{formatCurrency(product.promo_price ?? product.price)}</p>
        </div>
        <Link href={`/products/${product.slug}`} className="btn-secondary interactive-button w-full justify-between rounded-[18px] px-4 py-3 text-sm font-semibold sm:rounded-2xl sm:px-4 sm:py-3">
          Lihat Detail <ArrowUpRight size={16} />
        </Link>
      </div>
    </div>
  );
}
