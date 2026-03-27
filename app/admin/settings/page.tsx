import { updateStoreSettingsAction } from "@/app/admin/actions";
import { StoreSettingsForm } from "@/components/store-settings-form";
import { getSettings } from "@/lib/data-store";

export default async function AdminSettingsPage({ searchParams }: { searchParams?: Promise<{ success?: string }> }) {
  const [settings, params] = await Promise.all([getSettings(), searchParams]);
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-slate-950 dark:text-white">Pengaturan Toko</h1>
        <p className="mt-2 text-slate-600 dark:text-slate-400">Ubah identitas SteamSpace, kontak, hero text, dan sosial media langsung dari admin panel.</p>
      </div>
      {params?.success ? <p className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:bg-emerald-950/30">{params.success}</p> : null}
      <div className="card p-6"><StoreSettingsForm action={updateStoreSettingsAction} settings={settings} /></div>
    </div>
  );
}
