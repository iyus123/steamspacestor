"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { buildProductPayload, getProductById, readStore, slugify, updateHomepageContent, updateSettings, writeStore } from "@/lib/data-store";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@lokal.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "admin123";
const SESSION_COOKIE = "admin-session";

export async function loginAdmin(formData: FormData) {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "").trim();

  if (email !== ADMIN_EMAIL || password !== ADMIN_PASSWORD) {
    redirect("/admin/login?error=Email%20atau%20password%20salah");
  }

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "authenticated", { httpOnly: true, secure: process.env.NODE_ENV === "production", sameSite: "lax", path: "/", maxAge: 60 * 60 * 8 });
  redirect("/admin/dashboard");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

function validateProductForm(formData: FormData) {
  const required = ["name", "short_description", "description", "category_id"];
  for (const item of required) {
    if (!String(formData.get(item) ?? "").trim()) throw new Error("Semua field utama produk wajib diisi.");
  }
}

export async function createProductAction(formData: FormData) {
  validateProductForm(formData);
  const store = await readStore();
  const payload = await buildProductPayload(formData);
  store.products.unshift(payload);
  await writeStore(store);
  redirect("/admin/products?success=Produk%20berhasil%20ditambahkan");
}

export async function updateProductAction(productId: string, formData: FormData) {
  validateProductForm(formData);
  const store = await readStore();
  const current = await getProductById(productId);
  if (!current) redirect("/admin/products?error=Produk%20tidak%20ditemukan");
  const payload = await buildProductPayload(formData, current);
  store.products = store.products.map((product) => (product.id === productId ? payload : product));
  await writeStore(store);
  redirect("/admin/products?success=Produk%20berhasil%20diupdate");
}

export async function deleteProductAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const store = await readStore();
  store.products = store.products.filter((product) => product.id !== id);
  await writeStore(store);
  redirect("/admin/products?success=Produk%20berhasil%20dihapus");
}

export async function updateProductStatusAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const status = String(formData.get("status") ?? "available").trim();
  const store = await readStore();
  store.products = store.products.map((product) => (product.id === id ? { ...product, status: status as never } : product));
  await writeStore(store);
  redirect("/admin/products?success=Status%20produk%20berhasil%20diubah");
}

function createId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function validateCategoryForm(formData: FormData) {
  if (!String(formData.get("name") ?? "").trim()) throw new Error("Nama kategori wajib diisi.");
}

export async function createCategoryAction(formData: FormData) {
  validateCategoryForm(formData);
  const store = await readStore();
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const slug = slugify(slugInput || name);
  if (store.categories.some((category) => category.slug === slug)) redirect("/admin/categories?error=Slug%20kategori%20sudah%20dipakai");
  const icon = String(formData.get("icon") ?? "app").trim() || "app";
  store.categories.unshift({ id: createId("cat"), name, slug, description: description || null, icon: icon as never });
  await writeStore(store);
  redirect("/admin/categories?success=Kategori%20berhasil%20ditambahkan");
}

export async function updateCategoryAction(formData: FormData) {
  validateCategoryForm(formData);
  const store = await readStore();
  const id = String(formData.get("id") ?? "").trim();
  const name = String(formData.get("name") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const slug = slugify(slugInput || name);
  const icon = String(formData.get("icon") ?? "app").trim() || "app";
  if (store.categories.some((category) => category.id !== id && category.slug === slug)) redirect("/admin/categories?error=Slug%20kategori%20sudah%20dipakai");
  store.categories = store.categories.map((category) => category.id === id ? { ...category, name, slug, description: description || null, icon: icon as never } : category);
  await writeStore(store);
  redirect("/admin/categories?success=Kategori%20berhasil%20diupdate");
}

export async function deleteCategoryAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const store = await readStore();
  const totalProducts = store.products.filter((product) => product.category_id === id).length;
  if (totalProducts > 0) redirect("/admin/categories?error=Kategori%20masih%20dipakai%20oleh%20produk");
  store.categories = store.categories.filter((category) => category.id !== id);
  store.homepage.featured_product_ids = store.homepage.featured_product_ids.filter((featuredId) => store.products.some((product) => product.id === featuredId));
  await writeStore(store);
  redirect("/admin/categories?success=Kategori%20berhasil%20dihapus");
}

function validateTestimonial(formData: FormData) {
  const required = ["customer_name", "role", "message"];
  for (const item of required) {
    if (!String(formData.get(item) ?? "").trim()) throw new Error("Field testimoni wajib diisi.");
  }
}

export async function createTestimonialAction(formData: FormData) {
  validateTestimonial(formData);
  const store = await readStore();
  store.testimonials.unshift({
    id: createId("ts"),
    customer_name: String(formData.get("customer_name") ?? "").trim(),
    role: String(formData.get("role") ?? "").trim(),
    message: String(formData.get("message") ?? "").trim(),
    rating: Number(formData.get("rating") ?? 5) || 5
  });
  await writeStore(store);
  redirect("/admin/testimonials?success=Testimoni%20berhasil%20ditambahkan");
}

export async function updateTestimonialAction(formData: FormData) {
  validateTestimonial(formData);
  const id = String(formData.get("id") ?? "").trim();
  const store = await readStore();
  store.testimonials = store.testimonials.map((item) =>
    item.id === id
      ? {
          ...item,
          customer_name: String(formData.get("customer_name") ?? "").trim(),
          role: String(formData.get("role") ?? "").trim(),
          message: String(formData.get("message") ?? "").trim(),
          rating: Number(formData.get("rating") ?? 5) || 5
        }
      : item
  );
  await writeStore(store);
  redirect("/admin/testimonials?success=Testimoni%20berhasil%20diupdate");
}

export async function deleteTestimonialAction(formData: FormData) {
  const id = String(formData.get("id") ?? "").trim();
  const store = await readStore();
  store.testimonials = store.testimonials.filter((item) => item.id !== id);
  store.homepage.featured_testimonial_ids = store.homepage.featured_testimonial_ids.filter((featuredId) => featuredId !== id);
  await writeStore(store);
  redirect("/admin/testimonials?success=Testimoni%20berhasil%20dihapus");
}

export async function updateStoreSettingsAction(formData: FormData) {
  await updateSettings({
    name: String(formData.get("name") ?? "").trim(),
    slogan: String(formData.get("slogan") ?? "").trim(),
    hero: String(formData.get("hero") ?? "").trim(),
    description: String(formData.get("description") ?? "").trim(),
    whatsapp: String(formData.get("whatsapp") ?? "").trim(),
    email: String(formData.get("email") ?? "").trim(),
    hours: String(formData.get("hours") ?? "").trim(),
    instagram: String(formData.get("instagram") ?? "").trim(),
    tiktok: String(formData.get("tiktok") ?? "").trim(),
    accent: String(formData.get("accent") ?? "").trim() || "#3B82F6"
  });
  redirect("/admin/settings?success=Pengaturan%20toko%20berhasil%20disimpan");
}

function parseLines(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(/\r?\n/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function pickValues(formData: FormData, baseName: string, limit: number) {
  const values: string[] = [];
  for (let index = 1; index <= limit; index += 1) {
    const value = String(formData.get(`${baseName}_${index}`) ?? "").trim();
    if (value && !values.includes(value)) values.push(value);
  }
  return values;
}

export async function updateHomepageAction(formData: FormData) {
  await updateHomepageContent({
    hero_title: String(formData.get("hero_title") ?? "").trim(),
    hero_subtitle: String(formData.get("hero_subtitle") ?? "").trim(),
    about_title: String(formData.get("about_title") ?? "").trim(),
    about_text: String(formData.get("about_text") ?? "").trim(),
    cta_title: String(formData.get("cta_title") ?? "").trim(),
    cta_button: String(formData.get("cta_button") ?? "").trim(),
    help_badge: String(formData.get("help_badge") ?? "").trim(),
    help_text: String(formData.get("help_text") ?? "").trim(),
    advantages: parseLines(formData.get("advantages")),
    featured_product_ids: pickValues(formData, "featured_product_id", 3),
    featured_testimonial_ids: pickValues(formData, "featured_testimonial_id", 3)
  });
  redirect("/admin/homepage?success=Konten%20homepage%20berhasil%20disimpan");
}
