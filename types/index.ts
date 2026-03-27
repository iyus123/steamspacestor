export type CategoryIcon = "app" | "gamepad" | "box" | "play" | "sparkles" | "music" | "cloud";

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon?: CategoryIcon;
};

export type ProductImage = {
  id: string;
  image_url: string;
  alt_text: string | null;
  is_cover: boolean;
};

export type ProductStatus = "available" | "limited" | "sold_out";

export type Product = {
  id: string;
  name: string;
  slug: string;
  short_description: string;
  description: string;
  price: number;
  promo_price: number | null;
  status: ProductStatus;
  category_id: string;
  category?: Category;
  features?: string[];
  product_images?: ProductImage[];
};

export type Testimonial = {
  id: string;
  customer_name: string;
  role: string;
  message: string;
  rating: number;
};

export type StoreSettings = {
  name: string;
  slogan: string;
  hero: string;
  description: string;
  whatsapp: string;
  email: string;
  hours: string;
  instagram: string;
  tiktok: string;
  accent: string;
};

export type HomepageContent = {
  hero_title: string;
  hero_subtitle: string;
  about_title: string;
  about_text: string;
  cta_title: string;
  cta_button: string;
  help_badge: string;
  help_text: string;
  advantages: string[];
  featured_product_ids: string[];
  featured_testimonial_ids: string[];
};

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
};
