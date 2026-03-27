import { updateHomepageAction } from "@/app/admin/actions";
import { HomepageSettingsForm } from "@/components/homepage-settings-form";
import { getHomepageContent, getProducts, getTestimonials } from "@/lib/data-store";

export default async function AdminHomepagePage({ searchParams }: { searchParams?: Promise<{ success?: string }> }) {
  const [homepage, products, testimonials, params] = await Promise.all([getHomepageContent(), getProducts(), getTestimonials(), searchParams]);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950 dark:text-white">Homepage</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Atur tampilan halaman awal SteamSpace, termasuk hero, keunggulan, produk populer, dan tombol bantuan.</p>
      </div>
      {params?.success ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/30">{params.success}</p> : null}
      <div className="card p-6">
        <HomepageSettingsForm action={updateHomepageAction} homepage={homepage} products={products} testimonials={testimonials} />
      </div>
    </div>
  );
}
