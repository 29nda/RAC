# Rope Access Center (RAC)

Situs resmi **Rope Access Center** — pusat pelatihan, sertifikasi, dan penyedia
jasa akses tali industri. Dwibahasa (Indonesia / English), berjalan sepenuhnya
di atas paket gratis Cloudflare, dengan dashboard admin yang dibuat khusus.

> Official website for Rope Access Center — a rope access training, certification,
> and industrial services provider. Bilingual (Indonesian / English), running
> entirely on Cloudflare's free tier, with a purpose-built admin dashboard.

---

## Ringkasan teknis

| | |
|---|---|
| **Framework** | Astro 5 (SSR) |
| **Runtime** | Cloudflare Workers |
| **Styling** | Tailwind CSS v4 |
| **Basis data** | Cloudflare D1 (SQLite) |
| **Cache** | Cloudflare KV + cache tepi (edge) |
| **Media** | Cloudflare R2 (opsional — lihat SETUP.md 2c) |
| **Bahasa** | Indonesia (`/`) dan Inggris (`/en/`) |
| **Dependensi runtime** | Tidak ada di luar Astro — tanpa React, tanpa CDN pihak ketiga |

Halaman beranda memuat **7 permintaan / ±193 KB** total, termasuk dua font
variabel yang di-*host* sendiri. Tidak ada skrip pihak ketiga sama sekali.

---

## Mulai cepat

```bash
npm install
cp .dev.vars.example .dev.vars      # lalu isi kredensial dashboard
npm run admin:hash -- "sandi-anda"  # salin hasilnya ke ADMIN_PASSWORD_HASH
npm run db:migrate:local            # siapkan D1 lokal
npm run dev                         # http://localhost:4321
```

Dashboard tersedia di `http://localhost:4321/admin`.

Panduan penyiapan Cloudflare lengkap — membuat D1, KV, R2, menyetel *secret*,
menghubungkan domain, dan mengaktifkan *deploy* otomatis dari GitHub — ada di
**[SETUP.md](./SETUP.md)**.

---

## Struktur proyek

```
src/
├─ data/            Konten bawaan (bilingual) — sumber kebenaran awal
├─ i18n/            Peta rute dwibahasa + string antarmuka
├─ lib/             Konten, keamanan, autentikasi, SEO, media, basis data
├─ components/      Komponen antarmuka publik
│  └─ admin/        Komponen khusus dashboard
├─ layouts/         BaseLayout (SEO head), SiteLayout, AdminLayout
├─ views/           Satu berkas per jenis halaman publik
├─ pages/
│  ├─ [...path].astro     Router dwibahasa (semua halaman publik)
│  ├─ admin/              Dashboard
│  ├─ api/                Endpoint formulir + dashboard
│  ├─ media/[...key].ts   Penyaji berkas R2
│  ├─ sitemap.xml.ts, robots.txt.ts, llms.txt.ts, rss.xml.ts
│  └─ 404.astro
├─ middleware.ts    Header keamanan, CSP, gerbang admin, kebijakan cache
└─ styles/          Token desain + komponen (Tailwind v4)
migrations/         Skema D1
```

### Cara konten diselesaikan

```
src/data/*.ts  ──►  penimpa dari D1  ──►  cache KV  ──►  halaman
   (bawaan)          (hasil edit)         (300 dtk)
```

Repositori memuat konten lengkap. Basis data hanya menyimpan **perubahan**.
Konsekuensinya:

- Situs tetap tayang penuh meski D1 belum dibuat — berguna saat pertama deploy.
- Basis data tetap kecil dan mudah dipahami.
- Setiap item dapat dikembalikan ke versi asli lewat tombol *Kembalikan ke Bawaan*.
- Menyimpan dari dashboard otomatis membersihkan cache KV, sehingga perubahan
  tampil dalam hitungan detik.

---

## Rute

| Indonesia | English |
|---|---|
| `/` | `/en` |
| `/tentang-kami` | `/en/about-us` |
| `/pelatihan` · `/pelatihan/[slug]` | `/en/training` · `/en/training/[slug]` |
| `/sertifikasi` | `/en/certification` |
| `/layanan` · `/layanan/[slug]` | `/en/services` · `/en/services/[slug]` |
| `/jadwal-pelatihan` | `/en/training-schedule` |
| `/artikel` · `/artikel/[slug]` | `/en/insights` · `/en/insights/[slug]` |
| `/faq` | `/en/faq` |
| `/kontak` | `/en/contact` |
| `/kebijakan-privasi` · `/syarat-ketentuan` | `/en/privacy-policy` · `/en/terms-conditions` |

Semua rute dipetakan di `src/i18n/config.ts`. Menambah halaman berarti menambah
satu baris di sana, satu `view`, dan satu cabang di `src/pages/[...path].astro`.

### Endpoint mesin

| Rute | Isi |
|---|---|
| `/sitemap.xml` | Setiap URL dalam dua bahasa, lengkap dengan `xhtml:link` alternatif |
| `/robots.txt` | Termasuk izin eksplisit untuk perayap mesin penjawab (AI) |
| `/llms.txt` | Ringkasan situs dalam teks biasa, dikurasi untuk model bahasa |
| `/api/content.json` | Seluruh konten publik sebagai JSON dwibahasa |
| `/rss.xml`, `/en/rss.xml` | Umpan artikel per bahasa |

---

## Perintah

| Perintah | Kegunaan |
|---|---|
| `npm run dev` | Server pengembangan dengan *binding* Cloudflare lokal |
| `npm run build` | Membangun *worker* produksi ke `dist/` |
| `npm run preview` | Menjalankan hasil build lewat Wrangler |
| `npm run check` | Pemeriksaan tipe (`astro check`) |
| `npm run deploy` | Build lalu `wrangler deploy` |
| `npm run db:migrate:local` | Migrasi D1 lokal |
| `npm run db:migrate:remote` | Migrasi D1 produksi |
| `npm run admin:hash -- "sandi"` | Membuat `ADMIN_PASSWORD_HASH` |

---

## Keamanan

- **Content-Security-Policy** dengan *nonce* per permintaan. Tidak ada
  `'unsafe-inline'` untuk skrip; tidak ada skrip pihak ketiga selain widget
  Turnstile yang bersifat opsional.
- **Sesi admin** berupa cookie `HttpOnly` + `SameSite` yang ditandatangani HMAC,
  berumur delapan jam.
- **Kata sandi** disimpan sebagai PBKDF2-SHA256, 210.000 iterasi, bergaram.
- **CSRF** dijaga dengan token *double-submit* pada dashboard, dan pemeriksaan
  header `Origin` pada seluruh permintaan yang mengubah keadaan.
- **Pembatasan laju** berbasis KV: 5 percobaan masuk per IP per 15 menit,
  6 pengiriman formulir per IP per jam.
- **Sanitasi HTML** memakai daftar-izin pada setiap konten kaya dari dashboard —
  `<script>`, `<iframe>`, atribut `on*`, dan URL `javascript:` selalu dibuang.
- **Formulir publik** dilindungi *honeypot*, token bertanda tangan berbasis jam,
  pembatasan laju, dan Turnstile (opsional).
- **Jejak audit** mencatat setiap tindakan dashboard di tabel `audit_log`.

Seluruh primitif kriptografi memakai WebCrypto — tanpa dependensi tambahan,
berjalan apa adanya di Workers.

---

## Aksesibilitas & kinerja

- HTML semantik dengan *landmark*, `aria-current`, dan tautan lewati-navigasi.
- Cincin fokus yang jelas dan area sentuh minimum 44 px.
- `prefers-reduced-motion` dihormati — animasi masuk langsung selesai.
- Font variabel di-*host* sendiri dengan `font-display: swap` dan *preload*.
- Gambar memiliki `width`/`height` eksplisit untuk mencegah pergeseran tata letak.
- HTML dilayani `stale-while-revalidate`; aset dan media bersifat *immutable*
  selama satu tahun.

---

## Lisensi

Hak cipta Rope Access Center. Seluruh materi merek dan konten bersifat
kepemilikan.
