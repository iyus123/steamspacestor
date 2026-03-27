import { CategoryIcon } from "@/components/category-icon";
import { CategoryIcon as CategoryIconName } from "@/types";

const iconOptions: { value: CategoryIconName; label: string }[] = [
  { value: "app", label: "App" },
  { value: "gamepad", label: "Game" },
  { value: "box", label: "Box" },
  { value: "play", label: "Play" },
  { value: "sparkles", label: "Sparkles" },
  { value: "music", label: "Music" },
  { value: "cloud", label: "Cloud" }
];

type CategoryManagerProps = {
  action: (formData: FormData) => void | Promise<void>;
  submitLabel: string;
  defaultValues?: { id?: string; name?: string; slug?: string; description?: string | null; icon?: CategoryIconName };
};

export function CategoryManager({ action, submitLabel, defaultValues }: CategoryManagerProps) {
  return (
    <form action={action} className="grid gap-4 md:grid-cols-2">
      <input type="hidden" name="id" defaultValue={defaultValues?.id} />
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Nama kategori</label>
        <input name="name" defaultValue={defaultValues?.name} className="input" placeholder="Contoh: TOPUP DAN GAME" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Slug kategori</label>
        <input name="slug" defaultValue={defaultValues?.slug} className="input" placeholder="Otomatis dari nama jika dikosongkan" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Icon</label>
        <select name="icon" defaultValue={defaultValues?.icon ?? "app"} className="input">
          {iconOptions.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      </div>
      <div className="rounded-3xl border border-dashed border-slate-300 p-4 dark:border-slate-700">
        <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">Preview icon</p>
        <div className="inline-flex rounded-2xl bg-slate-100 p-3 dark:bg-slate-800">
          <CategoryIcon name={defaultValues?.icon ?? "app"} className="h-5 w-5 text-brand" />
        </div>
      </div>
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Deskripsi singkat</label>
        <input name="description" defaultValue={defaultValues?.description ?? ""} className="input" placeholder="Opsional" />
      </div>
      <div className="md:col-span-2"><button className="btn-primary">{submitLabel}</button></div>
    </form>
  );
}
