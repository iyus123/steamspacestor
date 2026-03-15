import { loginAdmin } from "@/app/admin/actions";

export default async function AdminLoginPage({ searchParams }: { searchParams?: Promise<{ error?: string }> }) {
  const params = (await searchParams) ?? {};
  const error = params.error;

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="card w-full max-w-md p-8">
        <p className="badge">Admin Only</p>
        <h1 className="mt-4 text-3xl font-black text-slate-950">Login Admin</h1>
        <p className="mt-2 text-sm text-slate-600">Login khusus admin untuk mengatur produk, harga, gambar, dan status katalog.</p>
        {error ? <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p> : null}
        <form action={loginAdmin} className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input name="email" type="email" placeholder="admin@lokal.com" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-brand" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input name="password" type="password" placeholder="••••••••" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-brand" />
          </div>
          <button type="submit" className="btn-primary w-full">Masuk Dashboard</button>
        </form>
        <div className="mt-6 rounded-2xl bg-slate-50 p-4 text-sm text-slate-600">
          <p className="font-semibold text-slate-800">Default login lokal</p>
          <p>Email: admin@lokal.com</p>
          <p>Password: admin123</p>
          <p className="mt-2 text-xs text-slate-500">Bisa diganti lewat ADMIN_EMAIL dan ADMIN_PASSWORD di file .env.local.</p>
        </div>
      </div>
    </div>
  );
}
