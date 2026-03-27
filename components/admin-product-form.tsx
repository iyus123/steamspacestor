"use client";

import Image from "next/image";
import { useMemo, useState } from "react";
import { Category, Product } from "@/types";

type AdminProductFormProps = {
  categories: Category[];
  action: (formData: FormData) => void | Promise<void>;
  product?: Product;
  submitLabel: string;
};

export function AdminProductForm({ categories, action, product, submitLabel }: AdminProductFormProps) {
  const cover = product?.product_images?.find((image) => image.is_cover) ?? product?.product_images?.[0];
  const [previewUrl, setPreviewUrl] = useState<string | null>(cover?.image_url ?? null);
  const priceHint = useMemo(() => (product?.promo_price ? `${product.promo_price}` : ""), [product]);

  return (
    <form action={action} encType="multipart/form-data" className="mt-8 grid gap-5 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Nama produk</label>
        <input name="name" defaultValue={product?.name} className="input" placeholder="Nama produk" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Slug produk</label>
        <input name="slug" defaultValue={product?.slug} className="input" placeholder="Otomatis dari nama jika dikosongkan" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Harga normal</label>
        <input name="price" type="number" min="0" defaultValue={product?.price} className="input" placeholder="25000" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Harga promo</label>
        <input name="promo_price" type="number" min="0" defaultValue={priceHint} className="input" placeholder="Kosongkan jika tidak ada promo" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Kategori</label>
        <select name="category_id" defaultValue={product?.category_id} className="input">
          <option value="">Pilih kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Status</label>
        <select name="status" defaultValue={product?.status ?? "available"} className="input">
          <option value="available">Tersedia</option>
          <option value="limited">Terbatas</option>
          <option value="sold_out">Habis</option>
        </select>
      </div>
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Deskripsi singkat</label>
        <input name="short_description" defaultValue={product?.short_description} className="input" placeholder="Ringkasan singkat yang muncul di kartu produk" />
      </div>
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Deskripsi lengkap</label>
        <textarea name="description" defaultValue={product?.description} className="textarea" placeholder="Deskripsi produk" />
      </div>
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Fitur produk</label>
        <textarea
          name="features"
          defaultValue={product?.features?.join("\n")}
          className="textarea"
          placeholder={`Satu fitur per baris
Proses cepat
Support admin
Harga reseller`}
        />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">URL gambar</label>
        <input name="image_url" defaultValue={cover?.image_url} className="input" placeholder="https://... atau biarkan jika upload file" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Upload gambar produk</label>
        <input
          name="image_file"
          type="file"
          accept="image/*"
          className="input"
          onChange={(event) => {
            const file = event.currentTarget.files?.[0];
            if (!file) return;
            setPreviewUrl(URL.createObjectURL(file));
          }}
        />
      </div>
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Alt text gambar</label>
        <input name="image_alt" defaultValue={cover?.alt_text ?? product?.name} className="input" placeholder="Contoh: Tampilan produk premium" />
      </div>
      <div className="md:col-span-2">
        <div className="relative h-64 overflow-hidden rounded-3xl border border-dashed border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-950">
          {previewUrl ? (
            <Image src={previewUrl} alt="Preview gambar produk" fill className="object-cover" unoptimized />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500">Preview gambar akan muncul di sini</div>
          )}
        </div>
      </div>
      <button className="btn-primary md:col-span-2">{submitLabel}</button>
    </form>
  );
}
