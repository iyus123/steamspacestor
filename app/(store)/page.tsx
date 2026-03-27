import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MessageCircle, Sparkles } from "lucide-react";
import { CategoryIcon } from "@/components/category-icon";
import { FeaturedProductCard } from "@/components/featured-product-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { Reveal } from "@/components/reveal";
import {
  getCategories,
  getFeaturedProducts,
  getFeaturedTestimonials,
  getHomepageContent,
  getSettings,
} from "@/lib/data-store";

export default async function HomePage() {
  const [settings, homepage, products, testimonials, categories] = await Promise.all([
    getSettings(),
    getHomepageContent(),
    getFeaturedProducts(3),
    getFeaturedTestimonials(3),
    getCategories(),
  ]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-white dark:border-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
        <div className="absolute inset-x-0 top-0 h-56 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.16),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.24),transparent_55%)]" />
        <div className="absolute left-[-70px] top-10 h-36 w-36 rounded-full bg-brand/10 blur-3xl dark:bg-brand/20" />
        <div className="absolute right-[-50px] top-12 h-32 w-32 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-400/15" />

        <div className="container-app relative grid gap-8 py-6 sm:gap-10 sm:py-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-20">
          <Reveal>
            <div>
              <span className="badge">{settings.name}</span>

              <h1 className="mt-4 max-w-[280px] text-3xl font-black leading-tight tracking-tight text-slate-950 dark:text-white sm:max-w-none sm:text-5xl lg:text-6xl">
                {homepage.hero_title}
              </h1>

              <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 dark:text-slate-300 sm:max-w-xl sm:text-base sm:leading-7">
                {homepage.hero_subtitle}
              </p>

              <div className="mt-5 flex gap-3 sm:mt-6 sm:flex-wrap">
                <Link
                  href="/products"
                  className="btn-primary interactive-button inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold sm:rounded-2xl sm:px-5"
                >
                  Lihat Produk <ChevronRight size={16} />
                </Link>

                <Link
                  href="/contact"
                  className="btn-secondary interactive-button inline-flex min-h-11 items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold sm:rounded-2xl sm:px-5"
                >
                  Bantuan <MessageCircle size={16} />
                </Link>
              </div>

              <div className="mt-5 flex max-w-3xl flex-wrap gap-2 sm:mt-6 sm:gap-2.5">
                {homepage.advantages.slice(0, 6).map((item, index) => (
                  <Reveal key={item} delay={80 + index * 50}>
                    <div className="rounded-full border border-slate-200 bg-white/80 px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200 sm:px-4 sm:py-2 sm:text-xs">
                      {item}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative hidden min-h-[320px] items-center justify-center lg:flex lg:min-h-[420px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-56 w-56 rounded-full bg-brand/10 blur-3xl dark:bg-brand/20" />
              </div>

              <div className="float-soft relative aspect-square w-full max-w-[360px] lg:max-w-[410px]">
                <Image
                  src="/steamspace-logo-v6.png"
                  alt="SteamSpace logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="container-app py-8 sm:py-12">
        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr] lg:items-start sm:gap-6">
          <Reveal>
            <div className="card interactive-card p-5 sm:p-7">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand sm:text-sm">
                Profil Toko
              </p>

              <h2 className="mt-3 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                {homepage.about_title}
              </h2>

              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-8">
                {homepage.about_text}
              </p>
            </div>
          </Reveal>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 sm:gap-4">
            {homepage.advantages.slice(0, 6).map((item, index) => (
              <Reveal key={item} delay={70 * index}>
                <div className="card interactive-card flex min-h-[84px] items-center gap-3 p-4 sm:min-h-[112px] sm:flex-col sm:items-start sm:justify-between sm:p-5">
                  <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand dark:bg-brand/15">
                    <Sparkles size={17} />
                  </span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app py-2 sm:py-4">
        <Reveal className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand sm:text-sm">
              Produk Populer
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Pilihan singkat dari SteamSpace
            </h2>
          </div>

          <Link
            href="/products"
            className="hidden text-sm font-semibold text-brand transition hover:translate-x-0.5 sm:inline"
          >
            Lihat semua
          </Link>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 xl:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 100}>
              <FeaturedProductCard product={product} />
            </Reveal>
          ))}
        </div>

        <div className="mt-4 sm:hidden">
          <Link
            href="/products"
            className="btn-secondary interactive-button w-full justify-center rounded-xl px-4 py-3 text-sm font-semibold"
          >
            Lihat semua produk
          </Link>
        </div>
      </section>

      <section className="container-app py-8 sm:py-12">
        <Reveal className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand sm:text-sm">
              Kategori
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Temukan berdasarkan kategori
            </h2>
          </div>
        </Reveal>

        <div className="no-scrollbar -mx-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0 snap-x-mandatory">
          <div className="flex min-w-max gap-3">
            {categories.map((category, index) => (
              <Reveal key={category.id} delay={index * 70} className="snap-start">
                <Link
                  href="/products"
                  className={`interactive-card flex min-w-[180px] items-center gap-3 rounded-2xl border px-3 py-3 transition sm:min-w-[220px] sm:rounded-[28px] sm:px-5 sm:py-4 ${
                    index === 0
                      ? "border-brand bg-brand text-white shadow-neon"
                      : "border-slate-200 bg-white text-slate-700 hover:border-brand hover:text-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
                  }`}
                >
                  <div
                    className={`rounded-xl p-3 transition duration-300 sm:rounded-2xl sm:p-3.5 ${
                      index === 0 ? "bg-white/15" : "bg-slate-100 dark:bg-slate-800"
                    }`}
                  >
                    <CategoryIcon name={category.icon} className="h-5 w-5 sm:h-6 sm:w-6" />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold leading-5 sm:text-base">
                      {category.name}
                    </p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app py-8 sm:py-10">
        <Reveal className="mb-4 flex items-center justify-between gap-4 sm:mb-6">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand sm:text-sm">
              Testimoni
            </p>
            <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
              Ulasan singkat pelanggan
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.id} delay={index * 90}>
              <TestimonialCard testimonial={item} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-app py-8 sm:py-12">
        <Reveal>
          <div className="card interactive-card flex flex-col items-center justify-between gap-4 overflow-hidden p-5 text-center sm:gap-6 sm:p-8 lg:flex-row lg:text-left">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand sm:text-sm">
                Jelajahi
              </p>

              <h2 className="mt-2 text-2xl font-black tracking-tight text-slate-950 dark:text-white sm:text-3xl">
                {homepage.cta_title}
              </h2>
            </div>

            <Link
              href="/products"
              className="btn-primary interactive-button w-full justify-center rounded-xl px-4 py-3 text-sm font-semibold sm:w-auto sm:rounded-2xl"
            >
              {homepage.cta_button}
            </Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
