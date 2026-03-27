import { promises as fs } from "fs";
import path from "path";
import { Category, FaqItem, HomepageContent, Product, ProductStatus, StoreSettings, Testimonial } from "@/types";

export type StoreData = {
  settings: StoreSettings;
  homepage: HomepageContent;
  categories: Category[];
  products: Product[];
  testimonials: Testimonial[];
  faqs: FaqItem[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "store.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

const fallbackData: StoreData = {
  settings: {
    name: "SteamSpace",
    slogan: "Portal Game, Aplikasi Premium, dan Produk Digital Terpercaya",
    hero: "Portal produk digital terpercaya, cepat, dan murah.",
    description: "SteamSpace adalah toko digital modern untuk produk digital.",
    whatsapp: "6295320724689",
    email: "admin@example.com",
    hours: "08.00 - 23.00",
    instagram: "@steamspacee",
    tiktok: "@steamspacee",
    accent: "#3B82F6"
  },
  homepage: {
    hero_title: "SteamSpace",
    hero_subtitle: "Portal Game, Aplikasi Premium, dan Produk Digital Terpercaya",
    about_title: "Tentang SteamSpace",
    about_text: "SteamSpace adalah portal produk digital yang menyediakan game, aplikasi premium, akun digital, dan berbagai layanan digital dengan harga terjangkau serta proses pembelian cepat melalui WhatsApp.",
    cta_title: "Temukan produk digital terbaik untuk kebutuhan harianmu.",
    cta_button: "Jelajahi Produk",
    help_badge: "Butuh Bantuan?",
    help_text: "Chat Admin",
    advantages: ["Proses Cepat", "Aman", "Support Cepat", "Harga Terjangkau", "Produk Lengkap"],
    featured_product_ids: [],
    featured_testimonial_ids: []
  },
  categories: [],
  products: [],
  testimonials: [],
  faqs: []
};

function normalizeStoreData(input: Partial<StoreData> | null | undefined): StoreData {
  const raw = input ?? {};
  return {
    settings: {
      ...fallbackData.settings,
      ...(raw.settings ?? {})
    },
    homepage: {
      ...fallbackData.homepage,
      ...(raw.homepage ?? {}),
      advantages: Array.isArray(raw.homepage?.advantages) ? raw.homepage!.advantages.filter(Boolean) : fallbackData.homepage.advantages,
      featured_product_ids: Array.isArray(raw.homepage?.featured_product_ids) ? raw.homepage!.featured_product_ids.filter(Boolean) : fallbackData.homepage.featured_product_ids,
      featured_testimonial_ids: Array.isArray(raw.homepage?.featured_testimonial_ids) ? raw.homepage!.featured_testimonial_ids.filter(Boolean) : fallbackData.homepage.featured_testimonial_ids
    },
    categories: Array.isArray(raw.categories) ? raw.categories : [],
    products: Array.isArray(raw.products) ? raw.products : [],
    testimonials: Array.isArray(raw.testimonials) ? raw.testimonials : [],
    faqs: Array.isArray(raw.faqs) ? raw.faqs : []
  };
}

export async function ensureStoreFile() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  try {
    await fs.access(DATA_FILE);
  } catch {
    await fs.writeFile(DATA_FILE, JSON.stringify(fallbackData, null, 2), "utf8");
  }
}

export async function readStore(): Promise<StoreData> {
  await ensureStoreFile();
  const raw = await fs.readFile(DATA_FILE, "utf8");
  return normalizeStoreData(JSON.parse(raw) as Partial<StoreData>);
}

export async function writeStore(data: StoreData) {
  await ensureStoreFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function getSettings() {
  const data = await readStore();
  return data.settings;
}

export async function updateSettings(settings: StoreSettings) {
  const data = await readStore();
  data.settings = settings;
  await writeStore(data);
}

export async function getHomepageContent() {
  const data = await readStore();
  return data.homepage;
}

export async function updateHomepageContent(homepage: HomepageContent) {
  const data = await readStore();
  data.homepage = homepage;
  await writeStore(data);
}

export async function getCategories() {
  const data = await readStore();
  return data.categories;
}

export async function getFaqs() {
  const data = await readStore();
  return data.faqs;
}

export async function getTestimonials() {
  const data = await readStore();
  return data.testimonials;
}

export async function getProducts() {
  const data = await readStore();
  return data.products.map((product) => ({
    ...product,
    category: data.categories.find((category) => category.id === product.category_id)
  }));
}

export async function getAvailableProducts() {
  const products = await getProducts();
  return products.filter((product) => product.status !== "sold_out");
}

export async function getFeaturedProducts(limit = 6) {
  const [products, homepage] = await Promise.all([getAvailableProducts(), getHomepageContent()]);
  const selected = homepage.featured_product_ids
    .map((id) => products.find((product) => product.id === id || product.slug === id))
    .filter(Boolean) as Product[];
  const fallback = products.filter((product) => !selected.some((item) => item.id === product.id));
  return [...selected, ...fallback].slice(0, limit);
}

export async function getFeaturedTestimonials(limit = 3) {
  const [testimonials, homepage] = await Promise.all([getTestimonials(), getHomepageContent()]);
  const selected = homepage.featured_testimonial_ids
    .map((id) => testimonials.find((testimonial) => testimonial.id === id))
    .filter(Boolean) as Testimonial[];
  const fallback = testimonials.filter((item) => !selected.some((picked) => picked.id === item.id));
  return [...selected, ...fallback].slice(0, limit);
}

export async function getProductById(id: string) {
  const products = await getProducts();
  return products.find((product) => product.id === id);
}

export async function getProductBySlug(slug: string) {
  const products = await getProducts();
  return products.find((product) => product.slug === slug);
}

export function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function parsePrice(value: FormDataEntryValue | null) {
  const raw = String(value ?? "").trim();
  if (!raw) return 0;
  const numeric = Number(raw.replace(/[^0-9]/g, ""));
  return Number.isFinite(numeric) ? numeric : 0;
}

function parseFeatures(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

async function saveUploadedFile(file: File) {
  const ext = file.name.includes(".") ? file.name.split(".").pop() : "png";
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  const filepath = path.join(UPLOADS_DIR, filename);
  const bytes = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(filepath, bytes);
  return `/uploads/${filename}`;
}

export async function buildProductPayload(formData: FormData, existing?: Product): Promise<Product> {
  const currentStore = await readStore();
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const slugBase = slugify(slugInput || name);
  const shortDescription = String(formData.get("short_description") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "").trim();
  const status = String(formData.get("status") ?? "available") as ProductStatus;
  const imageUrlInput = String(formData.get("image_url") ?? "").trim();
  const altText = String(formData.get("image_alt") ?? name).trim();
  const uploadFile = formData.get("image_file");

  let finalImageUrl = existing?.product_images?.[0]?.image_url || imageUrlInput;
  if (uploadFile instanceof File && uploadFile.size > 0) {
    finalImageUrl = await saveUploadedFile(uploadFile);
  } else if (imageUrlInput) {
    finalImageUrl = imageUrlInput;
  }

  const otherProducts = currentStore.products.filter((product) => product.id !== existing?.id);
  let finalSlug = slugBase;
  let counter = 1;
  while (otherProducts.some((product) => product.slug === finalSlug)) {
    finalSlug = `${slugBase}-${counter}`;
    counter += 1;
  }

  return {
    id: existing?.id || createId("prod"),
    name,
    slug: finalSlug,
    short_description: shortDescription,
    description,
    price: parsePrice(formData.get("price")),
    promo_price: parsePrice(formData.get("promo_price")) || null,
    status,
    category_id: categoryId,
    features: parseFeatures(formData.get("features")),
    product_images: finalImageUrl
      ? [{ id: existing?.product_images?.[0]?.id || createId("img"), image_url: finalImageUrl, alt_text: altText || name, is_cover: true }]
      : [],
    category: currentStore.categories.find((category) => category.id === categoryId)
  };
}
