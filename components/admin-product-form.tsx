import { Category, Product } from "@/types";

type AdminProductFormProps = {
  categories: Category[];
  action: (formData: FormData) => void | Promise<void>;
  product?: Product;
  submitLabel: string;
};

export function AdminProductForm({ categories, action, product, submitLabel }: AdminProductFormProps) {
  const cover = product?.product_images?.find((image) => image.is_cover) ?? product?.product_images?.[0];

  return (
    <form action={action} encType="multipart/form-data" className="mt-8 grid gap-5 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Nama produk</label>
        <input name="name" defaultValue={product?.name} className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Nama produk" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Slug produk</label>
        <input name="slug" defaultValue={product?.slug} className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Otomatis dari nama jika dikosongkan" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Harga normal</label>
        <input name="price" type="number" min="0" defaultValue={product?.price} className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="75000" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Harga promo</label>
        <input name="promo_price" type="number" min="0" defaultValue={product?.promo_price ?? ""} className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Kosongkan jika tidak ada promo" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Kategori</label>
        <select name="category_id" defaultValue={product?.category_id} className="w-full rounded-2xl border border-slate-300 px-4 py-3">
          <option value="">Pilih kategori</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Status</label>
        <select name="status" defaultValue={product?.status ?? "available"} className="w-full rounded-2xl border border-slate-300 px-4 py-3">
          <option value="available">Tersedia</option>
          <option value="limited">Terbatas</option>
          <option value="sold_out">Habis</option>
        </select>
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700">Deskripsi singkat</label>
        <input name="short_description" defaultValue={product?.short_description} className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Ringkasan singkat yang muncul di kartu produk" />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700">Deskripsi lengkap</label>
        <textarea name="description" defaultValue={product?.description} className="min-h-36 w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Deskripsi produk" />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700">Fitur produk</label>
        <textarea name="features" defaultValue={product?.features?.join("\n")} className="min-h-36 w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder={'Satu fitur per baris\nAktivasi cepat\nSupport admin'} />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">URL gambar</label>
        <input name="image_url" defaultValue={cover?.image_url} className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="https://... atau biarkan jika upload file" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700">Upload gambar produk</label>
        <input name="image_file" type="file" accept="image/*" className="w-full rounded-2xl border border-slate-300 px-4 py-3" />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700">Alt text gambar</label>
        <input name="image_alt" defaultValue={cover?.alt_text ?? product?.name} className="w-full rounded-2xl border border-slate-300 px-4 py-3" placeholder="Contoh: Tampilan dashboard premium" />
      </div>

      <button className="btn-primary md:col-span-2">{submitLabel}</button>
    </form>
  );
}
