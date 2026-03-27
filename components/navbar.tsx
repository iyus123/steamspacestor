"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/theme-toggle";
import Logo from "@/components/logo";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastY && currentY > 80) {
        setHidden(true); // scroll turun
      } else {
        setHidden(false); // scroll naik
      }

      setLastY(currentY);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="border-b border-slate-200/70 bg-white/85 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/75">
        <div className="container-app flex items-center justify-between py-3">
          <div className="min-w-0 flex-1">
            <Logo />
          </div>

          <div className="ml-3 flex items-center gap-2 sm:gap-3">
            <ThemeToggle />
            <Link
              href="/products"
              className="rounded-2xl bg-brand px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark sm:px-5 sm:py-3"
            >
              Lihat Produk
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
