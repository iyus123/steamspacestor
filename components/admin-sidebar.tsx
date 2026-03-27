import Link from "next/link";
import { LayoutDashboard, Package, Tags, Settings2, MessageSquareQuote, Home } from "lucide-react";
import { logoutAdmin } from "@/app/admin/actions";
import { Logo } from "@/components/logo";

const links = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products", label: "Produk", icon: Package },
  { href: "/admin/categories", label: "Kategori", icon: Tags },
  { href: "/admin/testimonials", label: "Testimoni", icon: MessageSquareQuote },
  { href: "/admin/homepage", label: "Homepage", icon: Home },
  { href: "/admin/settings", label: "Pengaturan Toko", icon: Settings2 }
];

export async function AdminSidebar() {
  return (
    <aside className="card p-5">
      <div className="mb-6"><Logo href="/admin/dashboard" size="md" /></div>
      <div className="space-y-2">
        {links.map((link) => {
          const Icon = link.icon;
          return (
            <Link key={link.href} href={link.href} className="flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800">
              <Icon size={18} /> {link.label}
            </Link>
          );
        })}
      </div>
      <form action={logoutAdmin} className="mt-6">
        <button className="btn-secondary w-full">Logout</button>
      </form>
    </aside>
  );
}
