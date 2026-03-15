import Link from "next/link";

const menu = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Produk" },
  { href: "/faq", label: "FAQ" },
  { href: "/testimonials", label: "Testimoni" },
  { href: "/contact", label: "Kontak" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/90 backdrop-blur-xl">
      <div className="container-app flex h-16 items-center justify-between">
        <Link href="/" className="text-lg font-bold text-white">
          Premium<span className="text-brand">Apps</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          {menu.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm font-medium text-slate-200 transition hover:text-white">
              {item.label}
            </Link>
          ))}
        </nav>
        <Link href="/products" className="btn-primary px-4 py-2 text-sm">
          Lihat Produk
        </Link>
      </div>
    </header>
  );
}
