import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, MessageCircleMore } from "lucide-react";
import { notFound } from "next/navigation";
import { products } from "@/lib/dummy-data";
import { createWhatsAppLink, formatCurrency } from "@/lib/utils";

export default async function ProductDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);

  if (!product) return notFound();

  const cover = product.product_images?.find((img) => img.is_cover) ?? product.product_images?.[0];
  const price = formatCurrency(product.promo_price ?? product.price);
  const whatsappLink = createWhatsAppLink({
    phone: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "6281234567890",
    productName: product.name,
    category: product.category?.name || "Lainnya",
    price
  });

  return (
    <section className="container-app py-20">
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="card relative min-h-[420px] overflow-hidden">
          <Image src={cover?.image_url || "/placeholder.png"} alt={cover?.alt_text || product.name} fill className="object-cover" />
        </div>
        <div>
          <span className="badge">{product.category?.name}</span>
          <h1 className="mt-4 text-4xl font-black text-slate-950">{product.name}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600">{product.description}</p>
          <div className="mt-6 flex items-center gap-3">
            <span className="text-3xl font-black text-slate-950">{price}</span>
            {product.promo_price ? <span className="text-base text-slate-400 line-through">{formatCurrency(product.price)}</span> : null}
          </div>
          <div className="mt-8 space-y-3">
            {product.features?.map((feature) => (
              <div key={feature} className="flex items-center gap-3 text-slate-700">
                <CheckCircle2 className="text-brand" size={18} />
                <span>{feature}</span>
              </div>
            ))}
          </div>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href={whatsappLink} target="_blank" className="btn-primary gap-2">
              <MessageCircleMore size={18} /> Order via WhatsApp
            </Link>
            <Link href="/products" className="btn-secondary">
              Kembali ke Produk
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
