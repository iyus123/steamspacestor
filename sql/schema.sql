create extension if not exists "pgcrypto";

create table categories (
  id uuid primary key default gen_random_uuid(),
  name varchar(100) not null,
  slug varchar(120) unique not null,
  description text,
  created_at timestamptz default now()
);

create table products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references categories(id) on delete cascade,
  name varchar(150) not null,
  slug varchar(180) unique not null,
  short_description text not null,
  description text not null,
  price numeric(12,2) not null,
  promo_price numeric(12,2),
  status varchar(20) not null default 'available' check (status in ('available','limited','sold_out')),
  is_featured boolean not null default false,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create table product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  image_url text not null,
  alt_text varchar(160),
  is_cover boolean not null default false,
  created_at timestamptz default now()
);

create table product_features (
  id uuid primary key default gen_random_uuid(),
  product_id uuid not null references products(id) on delete cascade,
  feature_text varchar(200) not null,
  created_at timestamptz default now()
);

create table testimonials (
  id uuid primary key default gen_random_uuid(),
  customer_name varchar(120) not null,
  role varchar(120) not null,
  message text not null,
  rating int not null check (rating between 1 and 5),
  is_published boolean not null default true,
  created_at timestamptz default now()
);

insert into categories (name, slug, description) values
('Streaming', 'streaming', 'Akun premium hiburan digital.'),
('Produktivitas', 'produktivitas', 'Tools kerja dan kolaborasi.'),
('AI Tools', 'ai-tools', 'Aplikasi AI premium untuk kerja cepat.');

insert into products (category_id, name, slug, short_description, description, price, promo_price, status, is_featured)
select id, 'ChatGPT Premium Shared', 'chatgpt-premium-shared', 'Akses AI premium untuk menulis, riset, dan coding.', 'Paket akun premium dengan aktivasi cepat dan support admin.', 75000, 59000, 'available', true
from categories where slug = 'ai-tools';

insert into products (category_id, name, slug, short_description, description, price, promo_price, status, is_featured)
select id, 'Canva Pro Team', 'canva-pro-team', 'Desain premium untuk kebutuhan bisnis.', 'Canva Pro Team untuk desain konten dan branding lebih profesional.', 45000, null, 'limited', true
from categories where slug = 'produktivitas';

insert into products (category_id, name, slug, short_description, description, price, promo_price, status, is_featured)
select id, 'Netflix Premium 1 Bulan', 'netflix-premium-1-bulan', 'Streaming film dan series premium.', 'Paket streaming bulanan untuk hiburan pribadi dan keluarga.', 65000, 55000, 'available', false
from categories where slug = 'streaming';

insert into product_images (product_id, image_url, alt_text, is_cover)
select id, 'https://images.unsplash.com/photo-1677442135136-760c813028c0?auto=format&fit=crop&w=1200&q=80', 'AI dashboard', true
from products where slug = 'chatgpt-premium-shared';

insert into product_images (product_id, image_url, alt_text, is_cover)
select id, 'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?auto=format&fit=crop&w=1200&q=80', 'Design workspace', true
from products where slug = 'canva-pro-team';

insert into product_images (product_id, image_url, alt_text, is_cover)
select id, 'https://images.unsplash.com/photo-1574375927938-d5a98e8ffe85?auto=format&fit=crop&w=1200&q=80', 'Streaming setup', true
from products where slug = 'netflix-premium-1-bulan';

insert into product_features (product_id, feature_text)
select id, unnest(array['Aktivasi cepat', 'Support admin', 'Panduan penggunaan', 'Cocok untuk kerja harian'])
from products where slug = 'chatgpt-premium-shared';

insert into testimonials (customer_name, role, message, rating) values
('Rina', 'Content Creator', 'Proses order cepat dan akun langsung aktif.', 5),
('Fajar', 'Mahasiswa', 'Tinggal klik WhatsApp, langsung terhubung ke admin.', 5),
('Nabila', 'UMKM Owner', 'Dashboard admin memudahkan saya update katalog sendiri.', 5);
