import { StoreSettings } from "@/types";

export function StoreSettingsForm({ action, settings }: { action: (formData: FormData) => void | Promise<void>; settings: StoreSettings }) {
  return (
    <form action={action} className="grid gap-5 md:grid-cols-2">
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Nama toko</label>
        <input name="name" defaultValue={settings.name} className="input" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Slogan</label>
        <input name="slogan" defaultValue={settings.slogan} className="input" />
      </div>
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Hero text</label>
        <input name="hero" defaultValue={settings.hero} className="input" />
      </div>
      <div className="md:col-span-2">
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Deskripsi toko</label>
        <textarea name="description" defaultValue={settings.description} className="textarea" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">WhatsApp</label>
        <input name="whatsapp" defaultValue={settings.whatsapp} className="input" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
        <input name="email" defaultValue={settings.email} className="input" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Jam operasional</label>
        <input name="hours" defaultValue={settings.hours} className="input" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Accent color</label>
        <input name="accent" defaultValue={settings.accent} className="input" placeholder="#3B82F6" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Instagram</label>
        <input name="instagram" defaultValue={settings.instagram} className="input" />
      </div>
      <div>
        <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">TikTok</label>
        <input name="tiktok" defaultValue={settings.tiktok} className="input" />
      </div>
      <div className="md:col-span-2"><button className="btn-primary">Simpan Pengaturan</button></div>
    </form>
  );
}
