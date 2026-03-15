import { promises as fs } from "fs";
import path from "path";
import { Category, Product, ProductStatus, Testimonial } from "@/types";

export type StoreData = {
  categories: Category[];
  products: Product[];
  testimonials: Testimonial[];
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "store.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads");

const fallbackData: StoreData = {
  categories: [],
  products: [],
  testimonials: []
};

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
  return JSON.parse(raw) as StoreData;
}

export async function writeStore(data: StoreData) {
  await ensureStoreFile();
  await fs.writeFile(DATA_FILE, JSON.stringify(data, null, 2), "utf8");
}

export async function getCategories() {
  const data = await readStore();
  return data.categories;
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
    .split("\n")
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
