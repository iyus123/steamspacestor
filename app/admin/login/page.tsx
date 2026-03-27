import { loginAdmin } from "@/app/admin/actions";

export default async function AdminLoginPage({ searchParams }: { searchParams?: Promise<{ error?: string }> }) {
  const params = (await searchParams) ?? {};
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <div className="card w-full max-w-md p-8">
        <p className="badge">SteamSpace Admin</p>
        <h1 className="mt-4 text-3xl font-black text-slate-950 dark:text-white">Login Admin</h1>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Login khusus admin untuk mengatur produk, kategori, testimoni, dan pengaturan toko.</p>
        {params.error ? <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30">{params.error}</p> : null}
        <form action={loginAdmin} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Email</label>
            <input name="email" type="email" placeholder="admin@lokal.com" className="input" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">Password</label>
            <input name="password" type="password" placeholder="••••••••" className="input" />
          </div>
          <button type="submit" className="btn-primary w-full">Masuk Dashboard</button>
        </form>
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600 dark:bg-slate-800 dark:text-slate-300">
          <p className="font-semibold text-slate-800 dark:text-white">Default login lokal</p>
          <p>Email: admin@lokal.com</p>
          <p>Password: admin123</p>
        </div>
      </div>
    </div>
  );
}
