"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { buildProductPayload, getProductById, readStore, writeStore } from "@/lib/data-store";

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
  cookieStore.set(SESSION_COOKIE, "authenticated", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 8
  });

  redirect("/admin/dashboard");
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
  redirect("/admin/login");
}

function validateProductForm(formData: FormData) {
  const name = String(formData.get("name") ?? "").trim();
  const shortDescription = String(formData.get("short_description") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const categoryId = String(formData.get("category_id") ?? "").trim();

  if (!name || !shortDescription || !description || !categoryId) {
    throw new Error("Nama, deskripsi singkat, deskripsi lengkap, dan kategori wajib diisi.");
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
  if (!current) {
    redirect("/admin/products?error=Produk%20tidak%20ditemukan");
  }

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
