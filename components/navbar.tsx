import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { Logo } from "@/components/logo";

const menu = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Produk" },
  { href: "/faq", label: "FAQ" },
  { href: "/testimonials", label: "Testimoni" },
  { href: "/contact", label: "Kontak" }
];

export async function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/92 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/88">
      <div className="container-app flex h-24 items-center justify-between gap-3 sm:h-20 sm:gap-4">
        <Logo size="md" />
        <nav className="hidden items-center gap-2 lg:flex">
          {menu.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition duration-200 hover:bg-slate-100 hover:text-brand dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <Link href="/products" className="btn-primary interactive-button hidden min-h-12 rounded-[26px] px-5 py-3 text-sm font-bold shadow-[0_12px_26px_rgba(59,130,246,0.22)] sm:inline-flex sm:min-h-0 sm:px-4 sm:py-2.5 sm:text-sm sm:shadow-neon">
            <span className="max-w-[86px] text-center leading-5 sm:max-w-none sm:leading-normal">Lihat Produk</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
