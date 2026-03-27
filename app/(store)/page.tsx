import Image from "next/image";
import Link from "next/link";
import { ChevronRight, MessageCircle, Sparkles } from "lucide-react";
import { CategoryIcon } from "@/components/category-icon";
import { FeaturedProductCard } from "@/components/featured-product-card";
import { TestimonialCard } from "@/components/testimonial-card";
import { Reveal } from "@/components/reveal";
import { getCategories, getFeaturedProducts, getFeaturedTestimonials, getHomepageContent, getSettings } from "@/lib/data-store";

export default async function HomePage() {
  const [settings, homepage, products, testimonials, categories] = await Promise.all([
    getSettings(),
    getHomepageContent(),
    getFeaturedProducts(3),
    getFeaturedTestimonials(3),
    getCategories()
  ]);

  return (
    <>
      <section className="relative overflow-hidden border-b border-slate-200 bg-gradient-to-b from-white via-slate-50 to-white dark:border-slate-800 dark:from-slate-950 dark:via-slate-950 dark:to-slate-900">
        <div className="absolute inset-x-0 top-0 h-80 bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.28),transparent_55%)]" />
        <div className="absolute left-[-80px] top-16 h-52 w-52 rounded-full bg-brand/10 blur-3xl dark:bg-brand/20" />
        <div className="absolute right-[-60px] top-20 h-44 w-44 rounded-full bg-cyan-300/20 blur-3xl dark:bg-cyan-400/15" />

        <div className="container-app relative grid gap-8 py-10 sm:gap-10 sm:py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:py-24">
          <Reveal>
            <div>
              <span className="badge pulse-soft">{settings.name}</span>
              <h1 className="mt-5 text-[4rem] font-black tracking-[-0.07em] leading-[0.92] text-slate-950 dark:text-white sm:text-5xl sm:tracking-tight lg:text-7xl">
                {homepage.hero_title}
              </h1>
              <p className="mt-4 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300 sm:max-w-2xl sm:text-lg sm:font-medium sm:leading-normal">
                {homepage.hero_subtitle}
              </p>

              <div className="mt-7 grid grid-cols-2 gap-3 sm:mt-8 sm:flex sm:flex-wrap">
                <Link href="/products" className="btn-primary interactive-button min-h-14 rounded-[22px] gap-2 px-5 text-base font-bold shadow-[0_14px_28px_rgba(59,130,246,0.24)] sm:min-h-0 sm:rounded-2xl sm:text-base sm:shadow-neon">
                  Lihat Produk <ChevronRight size={18} />
                </Link>
                <Link href="/contact" className="btn-secondary interactive-button min-h-14 rounded-[22px] gap-2 px-5 text-base font-bold sm:min-h-0 sm:rounded-2xl sm:text-base">
                  Bantuan <MessageCircle size={18} />
                </Link>
              </div>

              <div className="mt-7 flex max-w-3xl flex-wrap gap-2.5 sm:mt-8 sm:gap-3">
                {homepage.advantages.slice(0, 6).map((item, index) => (
                  <Reveal key={item} delay={100 + index * 70}>
                    <div className="rounded-full border border-slate-200 bg-white/80 px-4 py-2.5 text-sm font-semibold text-slate-700 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-200 sm:px-4 sm:py-2">
                      {item}
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="relative hidden min-h-[380px] items-center justify-center lg:flex lg:min-h-[460px]">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-64 w-64 rounded-full bg-brand/10 blur-3xl dark:bg-brand/20" />
              </div>
              <div className="float-soft relative aspect-square w-full max-w-[420px]">
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

      <section className="container-app py-10 sm:py-14">
        <div className="grid gap-4 lg:grid-cols-[1fr_0.9fr] lg:items-start sm:gap-6">
          <Reveal>
            <div className="card interactive-card p-5 sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Profil Toko</p>
              <h2 className="mt-3 text-[2.1rem] font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-3xl sm:tracking-tight">{homepage.about_title}</h2>
              <p className="mt-4 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-400 sm:text-base sm:leading-8">{homepage.about_text}</p>
            </div>
          </Reveal>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3 sm:gap-4">
            {homepage.advantages.slice(0, 6).map((item, index) => (
              <Reveal key={item} delay={80 * index}>
                <div className="card interactive-card flex min-h-[92px] items-center gap-3 p-4 sm:min-h-[120px] sm:flex-col sm:items-start sm:justify-between sm:p-5">
                  <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand/10 text-brand dark:bg-brand/15">
                    <Sparkles size={18} />
                  </span>
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{item}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app py-2 sm:py-4">
        <Reveal className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Produk Populer</p>
            <h2 className="mt-2 text-[2rem] font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-3xl sm:tracking-tight">Pilihan singkat dari SteamSpace</h2>
          </div>
          <Link href="/products" className="hidden text-sm font-semibold text-brand transition hover:translate-x-0.5 sm:inline">Lihat semua</Link>
        </Reveal>
        <div className="grid gap-4 sm:gap-5 md:grid-cols-2 xl:grid-cols-3">
          {products.map((product, index) => (
            <Reveal key={product.id} delay={index * 120}>
              <FeaturedProductCard product={product} />
            </Reveal>
          ))}
        </div>
        <div className="mt-5 sm:hidden">
          <Link href="/products" className="btn-secondary interactive-button w-full justify-center rounded-[18px] px-4 py-3 text-sm font-semibold">Lihat semua produk</Link>
        </div>
      </section>

      <section className="container-app py-10 sm:py-14">
        <Reveal className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Kategori</p>
            <h2 className="mt-2 text-[2rem] font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-3xl sm:tracking-tight">Temukan berdasarkan kategori</h2>
          </div>
        </Reveal>
        <div className="-mx-4 overflow-x-auto px-4 pb-3 sm:mx-0 sm:px-0 snap-x-mandatory no-scrollbar">
          <div className="flex min-w-max gap-3">
            {categories.map((category, index) => (
              <Reveal key={category.id} delay={index * 90} className="snap-start">
                <Link href="/products" className={`interactive-card flex min-w-[220px] items-center gap-4 rounded-[28px] border px-5 py-4 transition sm:min-w-[240px] sm:rounded-[30px] sm:px-6 sm:py-5 ${index === 0 ? "border-brand bg-brand text-white shadow-neon" : "border-slate-200 bg-white text-slate-700 hover:border-brand hover:text-brand dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"}`}>
                  <div className={`rounded-[20px] p-3.5 transition duration-300 sm:rounded-[22px] sm:p-4 ${index === 0 ? "bg-white/15" : "bg-slate-100 dark:bg-slate-800"}`}>
                    <CategoryIcon name={category.icon} className="h-6 w-6 sm:h-7 sm:w-7" />
                  </div>
                  <div>
                    <p className="text-base font-bold leading-5 sm:text-sm sm:font-black">{category.name}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="container-app py-8 sm:py-10">
        <Reveal className="mb-5 flex items-center justify-between gap-4 sm:mb-6">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Testimoni</p>
            <h2 className="mt-2 text-[2rem] font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-3xl sm:tracking-tight">Ulasan singkat pelanggan</h2>
          </div>
        </Reveal>
        <div className="grid gap-4 sm:gap-5 md:grid-cols-3">
          {testimonials.map((item, index) => (
            <Reveal key={item.id} delay={index * 110}>
              <TestimonialCard testimonial={item} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="container-app py-12 sm:py-16">
        <Reveal>
          <div className="card interactive-card flex flex-col items-center justify-between gap-4 overflow-hidden p-6 text-center sm:gap-6 sm:p-8 lg:flex-row lg:text-left">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand">Jelajahi</p>
              <h2 className="mt-2 text-[2rem] font-black tracking-[-0.05em] text-slate-950 dark:text-white sm:text-3xl sm:tracking-tight">{homepage.cta_title}</h2>
            </div>
            <Link href="/products" className="btn-primary interactive-button w-full justify-center rounded-[18px] px-4 py-3 text-sm font-semibold sm:w-auto sm:rounded-2xl">{homepage.cta_button}</Link>
          </div>
        </Reveal>
      </section>
    </>
  );
}
