import { Testimonial } from "@/types";

type Props = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  defaultValues?: Partial<Testimonial>;
};

export function TestimonialManager({ action, submitLabel, defaultValues }: Props) {
  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <input type="hidden" name="id" defaultValue={defaultValues?.id} />
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Nama pelanggan</label>
        <input name="customer_name" defaultValue={defaultValues?.customer_name} className="input" placeholder="Rizky A" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Role / profesi</label>
        <input name="role" defaultValue={defaultValues?.role} className="input" placeholder="Mahasiswa" />
      </div>
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Pesan testimoni</label>
        <textarea name="message" defaultValue={defaultValues?.message} className="textarea" placeholder="Tulis testimoni pelanggan di sini" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Rating</label>
        <input name="rating" type="number" min="1" max="5" defaultValue={defaultValues?.rating ?? 5} className="input" />
      </div>
      <div className="md:col-span-2"><button className="btn-primary">{submitLabel}</button></div>
    </form>
  );
}
