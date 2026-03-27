"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import ThemeToggle from "@/components/theme-toggle";

export default function Navbar() {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY;

      if (currentY > lastY && currentY > 80) {
        setHidden(true);
      } else {
        setHidden(false);
      }

      setLastY(currentY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastY]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-transform duration-300 ${
        hidden ? "-translate-y-full" : "translate-y-0"
      }`}
    >
      <div className="border-b border-slate-200/70 bg-white/90 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/85">
        <div className="container-app flex items-center justify-between gap-3 py-3">
          <Link href="/" className="flex min-w-0 flex-1 items-center gap-3">
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900 sm:h-14 sm:w-14">
              <Image
                src="/steamspace-logo-v6.png"
                alt="SteamSpace"
                fill
                className="object-contain p-1.5"
                priority
              />
            </div>

            <div className="min-w-0">
              <p className="truncate text-lg font-black leading-none text-slate-950 dark:text-white sm:text-2xl">
                SteamSpace
              </p>
              <p className="truncate text-xs text-slate-500 dark:text-slate-400 sm:text-sm">
                Portal produk digital
              </p>
            </div>
          </Link>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <ThemeToggle />

            <Link
              href="/products"
              className="inline-flex items-center justify-center rounded-2xl bg-brand px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-dark active:scale-[0.98] sm:px-5"
            >
              Lihat Produk
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
