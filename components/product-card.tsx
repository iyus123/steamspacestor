import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Product } from "@/types";
import { createWhatsAppLink, formatCurrency, statusLabel } from "@/lib/utils";

export function ProductCard({ product, phone = "6295320724689" }: { product: Product; phone?: string }) {
  const cover = product.product_images?.find((img) => img.is_cover) ?? product.product_images?.[0];
  const price = formatCurrency(product.promo_price ?? product.price);
  const whatsappLink = createWhatsAppLink({
    phone,
    productName: product.name,
    category: product.category?.name || "Lainnya",
    price
  });

  return (
    <div className="card interactive-card group overflow-hidden rounded-[26px] sm:rounded-[28px]">
      <div className="relative h-56 w-full overflow-hidden bg-slate-100 dark:bg-slate-800 sm:h-52">
        <Image src={cover?.image_url || "/placeholder.png"} alt={cover?.alt_text || product.name} fill className="object-cover transition duration-700 group-hover:scale-110" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/20 via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />
        <div className="absolute left-4 top-4 rounded-full bg-white/92 px-3 py-1 text-[11px] font-semibold text-slate-700 backdrop-blur dark:bg-slate-950/80 dark:text-slate-200">{statusLabel(product.status)}</div>
      </div>
      <div className="space-y-3 p-4 sm:space-y-4 sm:p-5">
        <div className="space-y-1.5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand sm:hidden">{product.category?.name}</p>
          <h3 className="line-clamp-2 text-[1.7rem] font-black tracking-[-0.04em] text-slate-950 dark:text-white sm:line-clamp-1 sm:text-lg sm:tracking-normal">{product.name}</h3>
          <p className="text-lg font-black text-slate-950 dark:text-white sm:text-2xl">{price}</p>
        </div>
        <div className="grid grid-cols-1 gap-2 sm:flex sm:gap-3">
          <Link href={`/products/${product.slug}`} className="btn-secondary interactive-button flex-1 gap-2 rounded-[18px] px-4 py-3 text-sm font-semibold sm:rounded-2xl sm:px-4 sm:py-2.5">
            Detail <ArrowUpRight size={16} />
          </Link>
          <Link href={whatsappLink} target="_blank" className="btn-primary interactive-button flex-1 rounded-[18px] px-4 py-3 text-sm font-semibold sm:rounded-2xl sm:px-4 sm:py-2.5">
            Order
          </Link>
        </div>
      </div>
    </div>
  );
}
