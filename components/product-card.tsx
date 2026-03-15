import Image from "next/image";
import Link from "next/link";
import { MessageCircleMore } from "lucide-react";
import { Product } from "@/types";
import { createWhatsAppLink, formatCurrency } from "@/lib/utils";

export function ProductCard({ product }: { product: Product }) {
  const cover = product.product_images?.find((img) => img.is_cover) ?? product.product_images?.[0];
  const price = formatCurrency(product.promo_price ?? product.price);
  const whatsappLink = createWhatsAppLink({
    phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890",
    productName: product.name,
    category: product.category?.name || "Lainnya",
    price
  });

  return (
    <div className="card overflow-hidden">
      <div className="relative h-56 w-full">
        <Image src={cover?.image_url || "/placeholder.png"} alt={cover?.alt_text || product.name} fill className="object-cover" />
      </div>
      <div className="space-y-4 p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="badge">{product.category?.name}</span>
          <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold capitalize text-slate-700">{product.status}</span>
        </div>
        <div>
          <h3 className="text-xl font-bold text-slate-950">{product.name}</h3>
          <p className="mt-2 text-sm leading-6 text-slate-600">{product.short_description}</p>
        </div>
        <div className="flex items-center gap-3">
          {product.promo_price ? <span className="text-2xl font-bold text-slate-950">{price}</span> : <span className="text-2xl font-bold text-slate-950">{formatCurrency(product.price)}</span>}
          {product.promo_price ? <span className="text-sm text-slate-400 line-through">{formatCurrency(product.price)}</span> : null}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link href={`/products/${product.slug}`} className="btn-secondary flex-1 text-sm">
            Detail Produk
          </Link>
          <Link href={whatsappLink} target="_blank" className="btn-primary flex-1 gap-2 text-sm">
            <MessageCircleMore size={18} /> Order WA
          </Link>
        </div>
      </div>
    </div>
  );
}
