import { cache } from "react";
import { supabase, supabaseAdmin } from "@/lib/supabase";
import type {
  Category,
  HomepageContent,
  Product,
  ProductImage,
  StoreSettings,
  Testimonial,
} from "@/types";

function mapProduct(row: any): Product {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    short_description: row.short_description,
    description: row.description,
    price: row.price,
    promo_price: row.promo_price,
    status: row.status,
    category_id: row.category_id,
    category: row.categories
      ? {
          id: row.categories.id,
          name: row.categories.name,
          slug: row.categories.slug,
          description: row.categories.description,
          icon: row.categories.icon,
        }
      : undefined,
    features: row.features ?? [],
    product_images: (row.product_images ?? []).map(
      (img: any): ProductImage => ({
        id: img.id,
        image_url: img.image_url,
        alt_text: img.alt_text,
        is_cover: img.is_cover,
      })
    ),
  };
}

export const getSettings = cache(async (): Promise<StoreSettings> => {
  const { data, error } = await supabase
    .from("store_settings")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (error || !data) {
    return {
      name: "SteamSpace",
      slogan: "Portal Game, Aplikasi Premium, dan Produk Digital Terpercaya",
      hero: "Portal produk digital terpercaya, cepat, dan murah.",
      description: "SteamSpace",
      whatsapp: "6295320724689",
      email: "fajrifairilhaq@gmail.com",
      hours: "08.00 - 23.00",
      instagram: "@steamspacee",
      tiktok: "@steamspacee",
      accent: "#3B82F6",
    };
  }

  return data;
});

export const getHomepageContent = cache(async (): Promise<HomepageContent> => {
  const { data, error } = await supabase
    .from("homepage_content")
    .select("*")
    .order("created_at", { ascending: true })
    .limit(1)
    .single();

  if (error || !data) {
    return {
      hero_title: "SteamSpace",
      hero_subtitle:
        "Portal Game, Aplikasi Premium, dan Produk Digital Terpercaya",
      about_title: "Tentang SteamSpace",
      about_text:
        "SteamSpace adalah portal produk digital yang menyediakan game, aplikasi premium, akun digital, dan berbagai layanan digital dengan harga terjangkau serta proses pembelian cepat melalui WhatsApp.",
      cta_title: "Temukan Produk Digital Terbaik",
      cta_button: "Jelajahi Produk",
      help_badge: "Butuh Bantuan?",
      help_text: "Chat Admin",
      advantages: [
        "Proses Cepat",
        "Anti Ribet",
        "Bergaransi",
        "Support 24 Jam",
        "Akun Fresh",
        "Harga Reseller",
      ],
      featured_product_ids: [],
      featured_testimonial_ids: [],
    };
  }

  return data;
});

export const getCategories = cache(async (): Promise<Category[]> => {
  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .order("created_at", { ascending: true });

  if (error || !data) return [];
  return data;
});

export const getTestimonials = cache(async (): Promise<Testimonial[]> => {
  const { data, error } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data;
});

export const getFeaturedTestimonials = cache(
  async (limit = 3): Promise<Testimonial[]> => {
    const homepage = await getHomepageContent();

    if (!homepage.featured_testimonial_ids?.length) {
      const all = await getTestimonials();
      return all.slice(0, limit);
    }

    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .in("id", homepage.featured_testimonial_ids);

    if (error || !data) return [];

    const sorted = homepage.featured_testimonial_ids
      .map((id) => data.find((item) => item.id === id))
      .filter(Boolean);

    return sorted.slice(0, limit) as Testimonial[];
  }
);

export const getAvailableProducts = cache(async (): Promise<Product[]> => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories (
        id, name, slug, description, icon
      ),
      product_images (
        id, image_url, alt_text, is_cover
      )
    `
    )
    .neq("status", "sold_out")
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map(mapProduct);
});

export const getFeaturedProducts = cache(async (limit = 3): Promise<Product[]> => {
  const homepage = await getHomepageContent();

  if (!homepage.featured_product_ids?.length) {
    const all = await getAvailableProducts();
    return all.slice(0, limit);
  }

  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories (
        id, name, slug, description, icon
      ),
      product_images (
        id, image_url, alt_text, is_cover
      )
    `
    )
    .in("id", homepage.featured_product_ids);

  if (error || !data) return [];

  const mapped = data.map(mapProduct);
  const sorted = homepage.featured_product_ids
    .map((id) => mapped.find((item) => item.id === id))
    .filter(Boolean);

  return sorted.slice(0, limit) as Product[];
});

export const getProductBySlug = cache(async (slug: string): Promise<Product | null> => {
  const { data, error } = await supabase
    .from("products")
    .select(
      `
      *,
      categories (
        id, name, slug, description, icon
      ),
      product_images (
        id, image_url, alt_text, is_cover
      )
    `
    )
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return mapProduct(data);
});
