export default function AdminLoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="card w-full max-w-md p-8">
        <p className="badge">Admin Only</p>
        <h1 className="mt-4 text-3xl font-black text-slate-950">Login Admin</h1>
        <p className="mt-2 text-sm text-slate-600">Gunakan Supabase Auth atau validasi server action untuk otentikasi admin.</p>
        <form className="mt-8 space-y-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
            <input type="email" placeholder="admin@example.com" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-brand" />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-700">Password</label>
            <input type="password" placeholder="••••••••" className="w-full rounded-2xl border border-slate-300 px-4 py-3 outline-none focus:border-brand" />
          </div>
          <button type="submit" className="btn-primary w-full">Masuk Dashboard</button>
        </form>
      </div>
    </div>
  );
}
