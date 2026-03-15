export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
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
  product_images?: ProductImage[];
  features?: string[];
};

export type Testimonial = {
  id: string;
  customer_name: string;
  role: string;
  message: string;
  rating: number;
};
