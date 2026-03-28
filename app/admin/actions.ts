"use server";

import { revalidatePath } from "next/cache";
import slugify from "slugify";
import { supabaseAdmin } from "@/lib/supabase";

function toText(value: FormDataEntryValue | null) {
  return String(value ?? "").trim();
}

function toNumber(value: FormDataEntryValue | null) {
  const cleaned = String(value ?? "").replace(/[^\d]/g, "");
  return Number(cleaned || 0);
}

function parseLines(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseUuidListFromForm(formData: FormData, prefix: string, total: number) {
  const result: string[] = [];

  for (let i = 1; i <= total; i++) {
    const value = toText(formData.get(`${prefix}_${i}`));
    if (value) result.push(value);
  }

  return result;
}

function getCategorySlug(name: string) {
  return slugify(name, { lower: true, strict: true, trim: true });
}

function getProductSlug(name: string) {
  return slugify(name, { lower: true, strict: true, trim: true });
}

async function uploadProductImage(file: File, productId: string, altText: string) {
  if (!file || file.size === 0) return null;

  const ext = file.name.split(".").pop() || "jpg";
  const fileName = `${productId}-${Date.now()}.${ext}`;
  const filePath = `products/${fileName}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const { error: uploadError } = await supabaseAdmin.storage
    .from("product-images")
    .upload(filePath, buffer, {
      contentType: file.type || "image/jpeg",
      upsert: true,
    });

  if (uploadError) {
    throw new Error(`Gagal upload gambar: ${uploadError.message}`);
  }

  const { data: publicUrlData } = supabaseAdmin.storage
    .from("product-images")
    .getPublicUrl(filePath);

  return publicUrlData.publicUrl;
}

/* =========================
   PRODUCT
========================= */

export async function createProductAction(formData: FormData) {
  const name = toText(formData.get("name"));
  const shortDescription = toText(formData.get("short_description"));
  const description = toText(formData.get("description"));
  const categoryId = toText(formData.get("category_id"));
  const status = toText(formData.get("status")) || "available";
  const price = toNumber(formData.get("price"));
  const promoPriceRaw = toNumber(formData.get("promo_price"));
  const promoPrice = promoPriceRaw > 0 ? promoPriceRaw : null;
  const features = parseLines(formData.get("features"));
  const imageFile = formData.get("image") as File | null;

  if (!name) throw new Error("Nama produk wajib diisi.");
  if (!categoryId) throw new Error("Kategori wajib dipilih.");
  if (!price) throw new Error("Harga produk wajib diisi.");

  const slug = getProductSlug(name);

  const { data: product, error: productError } = await supabaseAdmin
    .from("products")
    .insert({
      name,
      slug,
      short_description: shortDescription,
      description,
      price,
      promo_price: promoPrice,
      status,
      category_id: categoryId,
      features,
    })
    .select("*")
    .single();

  if (productError || !product) {
    throw new Error(productError?.message || "Gagal membuat produk.");
  }

  if (imageFile && imageFile.size > 0) {
    const imageUrl = await uploadProductImage(imageFile, product.id, name);

    if (imageUrl) {
      const { error: imageInsertError } = await supabaseAdmin
        .from("product_images")
        .insert({
          product_id: product.id,
          image_url: imageUrl,
          alt_text: name,
          is_cover: true,
        });

      if (imageInsertError) {
        throw new Error(`Gagal menyimpan data gambar: ${imageInsertError.message}`);
      }
    }
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
}

export async function updateProductStatusAction(formData: FormData) {
  const productId = toText(formData.get("product_id"));
  const status = toText(formData.get("status"));

  if (!productId) throw new Error("ID produk tidak ditemukan.");
  if (!status) throw new Error("Status produk tidak ditemukan.");

  const { error } = await supabaseAdmin
    .from("products")
    .update({ status })
    .eq("id", productId);

  if (error) {
    throw new Error(`Gagal update status produk: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
}

export async function deleteProductAction(formData: FormData) {
  const productId = toText(formData.get("product_id"));

  if (!productId) throw new Error("ID produk tidak ditemukan.");

  const { data: images } = await supabaseAdmin
    .from("product_images")
    .select("id, image_url")
    .eq("product_id", productId);

  if (images?.length) {
    const filePaths = images
      .map((img) => {
        const marker = "/product-images/";
        const index = img.image_url.indexOf(marker);
        if (index === -1) return null;
        return img.image_url.slice(index + marker.length);
      })
      .filter(Boolean) as string[];

    if (filePaths.length) {
      await supabaseAdmin.storage.from("product-images").remove(filePaths);
    }
  }

  const { error } = await supabaseAdmin
    .from("products")
    .delete()
    .eq("id", productId);

  if (error) {
    throw new Error(`Gagal menghapus produk: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/products");
}

/* =========================
   CATEGORY
========================= */

export async function createCategoryAction(formData: FormData) {
  const name = toText(formData.get("name"));
  const description = toText(formData.get("description")) || null;
  const icon = toText(formData.get("icon")) || "app";

  if (!name) throw new Error("Nama kategori wajib diisi.");

  const slug = getCategorySlug(name);

  const { error } = await supabaseAdmin.from("categories").insert({
    name,
    slug,
    description,
    icon,
  });

  if (error) {
    throw new Error(`Gagal membuat kategori: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products/new");
}

export async function deleteCategoryAction(formData: FormData) {
  const categoryId = toText(formData.get("category_id"));

  if (!categoryId) throw new Error("ID kategori tidak ditemukan.");

  const { data: products, error: checkError } = await supabaseAdmin
    .from("products")
    .select("id")
    .eq("category_id", categoryId)
    .limit(1);

  if (checkError) {
    throw new Error(`Gagal memeriksa kategori: ${checkError.message}`);
  }

  if (products && products.length > 0) {
    throw new Error("Kategori masih dipakai oleh produk dan tidak bisa dihapus.");
  }

  const { error } = await supabaseAdmin
    .from("categories")
    .delete()
    .eq("id", categoryId);

  if (error) {
    throw new Error(`Gagal menghapus kategori: ${error.message}`);
  }

  revalidatePath("/");
  revalidatePath("/products");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products/new");
}

/* =========================
   HOMEPAGE
========================= */

export async function updateHomepageAction(formData: FormData) {
  const heroTitle = toText(formData.get("hero_title"));
  const heroSubtitle = toText(formData.get("hero_subtitle"));
  const aboutTitle = toText(formData.get("about_title"));
  const aboutText = toText(formData.get("about_text"));
  const ctaTitle = toText(formData.get("cta_title"));
  const ctaButton = toText(formData.get("cta_button"));
  const helpBadge = toText(formData.get("help_badge"));
  const helpText = toText(formData.get("help_text"));
  const advantages = parseLines(formData.get("advantages"));
  const featuredProductIds = parseUuidListFromForm(formData, "featured_product_id", 3);
  const featuredTestimonialIds = parseUuidListFromForm(formData, "featured_testimonial_id", 3);

  const { data: existing, error: findError } = await supabaseAdmin
    .from("homepage_content")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (findError) {
    throw new Error(`Gagal membaca data homepage: ${findError.message}`);
  }

  const payload = {
    hero_title: heroTitle,
    hero_subtitle: heroSubtitle,
    about_title: aboutTitle,
    about_text: aboutText,
    cta_title: ctaTitle,
    cta_button: ctaButton,
    help_badge: helpBadge,
    help_text: helpText,
    advantages,
    featured_product_ids: featuredProductIds,
    featured_testimonial_ids: featuredTestimonialIds,
  };

  if (existing?.id) {
    const { error } = await supabaseAdmin
      .from("homepage_content")
      .update(payload)
      .eq("id", existing.id);

    if (error) {
      throw new Error(`Gagal update homepage: ${error.message}`);
    }
  } else {
    const { error } = await supabaseAdmin
      .from("homepage_content")
      .insert(payload);

    if (error) {
      throw new Error(`Gagal membuat homepage content: ${error.message}`);
    }
  }

  revalidatePath("/");
  revalidatePath("/admin/homepage");
}

/* =========================
   STORE SETTINGS
========================= */

export async function updateStoreSettingsAction(formData: FormData) {
  const name = toText(formData.get("name"));
  const slogan = toText(formData.get("slogan"));
  const hero = toText(formData.get("hero"));
  const description = toText(formData.get("description"));
  const whatsapp = toText(formData.get("whatsapp"));
  const email = toText(formData.get("email"));
  const hours = toText(formData.get("hours"));
  const instagram = toText(formData.get("instagram"));
  const tiktok = toText(formData.get("tiktok"));
  const accent = toText(formData.get("accent")) || "#3B82F6";

  const { data: existing, error: findError } = await supabaseAdmin
    .from("store_settings")
    .select("id")
    .order("created_at", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (findError) {
    throw new Error(`Gagal membaca settings toko: ${findError.message}`);
  }

  const payload = {
    name,
    slogan,
    hero,
    description,
    whatsapp,
    email,
    hours,
    instagram,
    tiktok,
    accent,
  };

  if (existing?.id) {
    const { error } = await supabaseAdmin
      .from("store_settings")
      .update(payload)
      .eq("id", existing.id);

    if (error) {
      throw new Error(`Gagal update settings toko: ${error.message}`);
    }
  } else {
    const { error } = await supabaseAdmin
      .from("store_settings")
      .insert(payload);

    if (error) {
      throw new Error(`Gagal membuat settings toko: ${error.message}`);
    }
  }

  revalidatePath("/");
  revalidatePath("/contact");
  revalidatePath("/admin/settings");
}
