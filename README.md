# Premium App Store

Website katalog aplikasi premium dengan 2 sisi:
- sisi pembeli untuk melihat katalog dan order via WhatsApp
- sisi admin untuk login, tambah/edit/hapus produk, dan upload gambar produk secara lokal

## Fitur lokal yang sudah aktif
- Login admin dengan cookie session
- CRUD produk tersimpan ke `data/store.json`
- Upload gambar produk ke `public/uploads`
- Katalog pembeli otomatis membaca data terbaru
- Tombol WhatsApp otomatis mengikuti nama produk, kategori, dan harga

## Login admin default
- Email: `admin@lokal.com`
- Password: `admin123`

Bisa diganti lewat `.env.local`.

## Menjalankan project
```bash
npm install
cp .env.example .env.local
npm run dev
```

Buka:
- Store: `http://localhost:3000`
- Admin: `http://localhost:3000/admin/login`

## Catatan penting
Mode upload lokal ini cocok untuk development atau VPS biasa.
Kalau deploy ke Vercel, file yang diupload ke `public/uploads` tidak persisten. Untuk production sebaiknya pindah ke Supabase Storage atau Cloudinary.

## Struktur data lokal
- `data/store.json` → data kategori, produk, testimoni
- `public/uploads` → file gambar hasil upload admin

## Deploy
Untuk deploy production:
1. pindahkan penyimpanan produk ke database
2. pindahkan upload gambar ke cloud storage
3. pertahankan UI yang sama lalu ganti hanya layer datanya
