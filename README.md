# PremiumApps Store

Project fullstack katalog aplikasi premium menggunakan **Next.js + Tailwind CSS + Supabase/PostgreSQL**.

## Fitur utama

### Sisi pembeli
- Home premium dan responsif
- Halaman produk
- Detail produk
- FAQ
- Testimoni
- Kontak
- Tombol order via WhatsApp dengan pesan otomatis berisi **nama produk, kategori, dan harga**

### Sisi admin
- Login admin terpisah
- Dashboard admin
- Manajemen produk
- Manajemen kategori
- Form tambah/edit produk
- Status ketersediaan: `available`, `limited`, `sold_out`

## Stack
- Next.js App Router
- TypeScript
- Tailwind CSS
- Supabase / PostgreSQL
- Lucide React

## Struktur folder

```bash
premium-app-store/
├── app/
│   ├── (store)/
│   │   ├── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/page.tsx
│   │   ├── faq/page.tsx
│   │   ├── testimonials/page.tsx
│   │   ├── contact/page.tsx
│   │   └── layout.tsx
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── products/page.tsx
│   │   ├── products/new/page.tsx
│   │   ├── products/[id]/edit/page.tsx
│   │   ├── categories/page.tsx
│   │   └── layout.tsx
│   ├── globals.css
│   └── layout.tsx
├── components/
├── lib/
├── sql/schema.sql
├── middleware.ts
├── .env.example
└── README.md
```

## Instalasi lokal

```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka `http://localhost:3000`

## Konfigurasi environment

Isi `.env.local`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_WHATSAPP_NUMBER=6281234567890
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=supersecurepassword
```

## Setup database Supabase

1. Buat project baru di Supabase.
2. Buka SQL Editor.
3. Jalankan file `sql/schema.sql`.
4. Aktifkan storage jika ingin upload gambar langsung ke Supabase Storage.
5. Hubungkan query produk dan kategori ke komponen frontend atau server action.

## Integrasi WhatsApp

Link order otomatis dibentuk dari helper berikut:

```ts
createWhatsAppLink({
  phone: "6281234567890",
  productName: "ChatGPT Premium Shared",
  category: "AI Tools",
  price: "Rp59.000"
});
```

Output:

```text
https://wa.me/6281234567890?text=Halo admin, saya ingin order aplikasi premium...
```

## Saran lanjutan produksi

- Gunakan **Supabase Auth** untuk login admin.
- Tambahkan **Server Actions** untuk create/update/delete produk.
- Tambahkan **upload gambar** ke Supabase Storage.
- Pasang **Row Level Security** untuk proteksi data admin.
- Tambahkan **analytics** dan SEO metadata per produk.

## Deploy

### Vercel
1. Push project ke GitHub.
2. Import repository ke Vercel.
3. Tambahkan semua environment variables.
4. Deploy.

### Supabase
- Gunakan Supabase untuk PostgreSQL, Auth, dan Storage.
- Jalankan schema SQL sebelum deploy frontend.

## Catatan

Versi ini sudah berisi:
- UI buyer + admin
- dummy data
- schema database
- routing produk
- middleware admin sederhana

Untuk produksi, Anda tinggal menyambungkan form admin ke Supabase agar benar-benar CRUD.
