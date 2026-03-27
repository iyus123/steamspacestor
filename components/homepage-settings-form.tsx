import { HomepageContent, Product, Testimonial } from "@/types";

export function HomepageSettingsForm({
  action,
  homepage,
  products,
  testimonials
}: {
  action: (formData: FormData) => void | Promise<void>;
  homepage: HomepageContent;
  products: Product[];
  testimonials: Testimonial[];
}) {
  const featuredProducts = [...homepage.featured_product_ids, "", ""].slice(0, 3);
  const featuredTestimonials = [...homepage.featured_testimonial_ids, "", ""].slice(0, 3);

  return (
    <form action={action} className="grid gap-5 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Judul hero</label>
        <input name="hero_title" defaultValue={homepage.hero_title} className="input" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Subjudul hero</label>
        <input name="hero_subtitle" defaultValue={homepage.hero_subtitle} className="input" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Judul tentang toko</label>
        <input name="about_title" defaultValue={homepage.about_title} className="input" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Judul CTA penutup</label>
        <input name="cta_title" defaultValue={homepage.cta_title} className="input" />
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Deskripsi singkat toko</label>
        <textarea name="about_text" defaultValue={homepage.about_text} className="textarea min-h-[120px]" />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Tombol CTA</label>
        <input name="cta_button" defaultValue={homepage.cta_button} className="input" />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Label bantuan</label>
          <input name="help_badge" defaultValue={homepage.help_badge} className="input" />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Teks bantuan</label>
          <input name="help_text" defaultValue={homepage.help_text} className="input" />
        </div>
      </div>

      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Keunggulan (1 baris = 1 item)</label>
        <textarea
          name="advantages"
          defaultValue={homepage.advantages.join("\n")}
          className="textarea min-h-[140px]"
        />
      </div>

      {[1, 2, 3].map((index) => (
        <div key={`product-${index}`}>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Produk populer {index}
          </label>
          <select
            name={`featured_product_id_${index}`}
            defaultValue={featuredProducts[index - 1]}
            className="input"
          >
            <option value="">Pilih produk</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </div>
      ))}

      {[1, 2, 3].map((index) => (
        <div key={`testimonial-${index}`}>
          <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
            Testimoni homepage {index}
          </label>
          <select
            name={`featured_testimonial_id_${index}`}
            defaultValue={featuredTestimonials[index - 1]}
            className="input"
          >
            <option value="">Pilih testimoni</option>
            {testimonials.map((item) => (
              <option key={item.id} value={item.id}>
                {item.customer_name} — {item.role}
              </option>
            ))}
          </select>
        </div>
      ))}

      <div className="md:col-span-2">
        <button className="btn-primary">Simpan Homepage</button>
      </div>
    </form>
  );
}
