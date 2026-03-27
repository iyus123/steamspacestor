import { createTestimonialAction, deleteTestimonialAction, updateTestimonialAction } from "@/app/admin/actions";
import { TestimonialManager } from "@/components/testimonial-manager";
import { getTestimonials } from "@/lib/data-store";

export default async function AdminTestimonialsPage({ searchParams }: { searchParams?: Promise<{ success?: string; error?: string }> }) {
  const [testimonials, params] = await Promise.all([getTestimonials(), searchParams]);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950 dark:text-white">Kelola Testimoni</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Tambahkan testimoni dummy atau testimoni asli pembeli untuk meningkatkan kepercayaan.</p>
      </div>
      {params?.success ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/30">{params.success}</p> : null}
      {params?.error ? <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700 dark:bg-red-950/30">{params.error}</p> : null}
      <div className="card p-6">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Tambah Testimoni</h2>
        <div className="mt-6"><TestimonialManager action={createTestimonialAction} submitLabel="Simpan Testimoni" /></div>
      </div>
      <div className="grid gap-4">
        {testimonials.map((item) => (
          <div key={item.id} className="card p-6">
            <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-xl font-bold text-slate-950 dark:text-white">{item.customer_name}</h2>
                <p className="mt-1 text-sm text-slate-500">{item.role} · Rating {item.rating}/5</p>
              </div>
              <form action={deleteTestimonialAction}><input type="hidden" name="id" value={item.id} /><button className="rounded-2xl border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30">Hapus</button></form>
            </div>
            <TestimonialManager action={updateTestimonialAction} submitLabel="Update Testimoni" defaultValues={item} />
          </div>
        ))}
      </div>
    </div>
  );
}
