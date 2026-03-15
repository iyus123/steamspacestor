import Link from "next/link";

const links = [
  { href: "/admin/dashboard", label: "Dashboard" },
  { href: "/admin/products", label: "Produk" },
  { href: "/admin/categories", label: "Kategori" },
  { href: "/admin/products/new", label: "Tambah Produk" }
];

export function AdminSidebar() {
  return (
    <aside className="rounded-3xl border border-slate-200 bg-white p-5 shadow-premium">
      <p className="mb-4 text-lg font-bold text-slate-950">Admin Panel</p>
      <div className="space-y-2">
        {links.map((link) => (
          <Link key={link.href} href={link.href} className="block rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100">
            {link.label}
          </Link>
        ))}
      </div>
    </aside>
  );
}
