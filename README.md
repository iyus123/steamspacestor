# SteamSpace v5

SteamSpace v5 adalah starter project toko digital berbasis Next.js + Tailwind CSS dengan 2 sisi utama:

- buyer side untuk katalog produk digital
- admin side untuk login khusus dan mengelola produk, kategori, testimoni, serta pengaturan toko

Versi ini memakai penyimpanan **lokal** dulu supaya mudah dijalankan.

## Fitur utama

- branding penuh SteamSpace
- logo SteamSpace sudah dimasukkan
- light mode default + toggle dark mode
- home, produk, detail produk, FAQ, testimoni, kontak
- order via WhatsApp otomatis
- admin login lokal
- CRUD produk lokal
- CRUD kategori lokal
- CRUD testimoni lokal
- pengaturan toko via admin
- upload gambar produk ke `public/uploads`
- data toko tersimpan di `data/store.json`

## Login admin default

- Email: `admin@lokal.com`
- Password: `admin123`

## Jalankan di lokal

```bash
npm install
cp .env.example .env.local
npm run dev
```

Lalu buka:

- buyer: `http://localhost:3000`
- admin: `http://localhost:3000/admin/login`

## Catatan penting

Karena versi ini memakai file lokal:

- cocok untuk lokal atau server biasa
- **kurang cocok di Vercel** untuk upload file persisten

Kalau mau dipakai online serius, tahap berikutnya disarankan migrasi ke:

- Supabase Database
- Supabase Auth
- Supabase Storage

## Struktur penting

- `app/(store)` → halaman buyer
- `app/admin` → halaman admin
- `components` → komponen UI
- `data/store.json` → data lokal toko
- `public/uploads` → hasil upload gambar
- `public/steamspace-logo.svg` → logo SteamSpace


## SteamSpace v8

- Homepage fokus profil toko dan branding
- Logo hero lebih besar
- 3 produk populer bisa diatur dari admin
- Konten homepage bisa diedit di `/admin/homepage`
- Floating help button ke WhatsApp
