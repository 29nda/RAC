# Panduan Penyiapan — dari repositori kosong ke situs langsung

Panduan ini membawa Anda dari *clone* pertama sampai situs tayang di domain
sendiri. Seluruh langkah berada di dalam **paket gratis** Cloudflare dan GitHub.

Perkiraan waktu: 20–30 menit.

---

## 0. Prasyarat

- Node.js 20 atau lebih baru
- Akun Cloudflare (gratis)
- Akun GitHub (gratis)
- Nama domain (opsional — Cloudflare menyediakan subdomain `*.workers.dev` gratis)

---

## 1. Jalankan secara lokal

```bash
git clone <url-repositori-anda>
cd RAC
npm install
```

Buat kredensial dashboard:

```bash
npm run admin:hash -- "sandi-yang-kuat-dan-panjang"
```

Salin *hash* yang dihasilkan, lalu buat berkas `.dev.vars`:

```bash
cp .dev.vars.example .dev.vars
```

Isi ketiga nilainya:

```ini
ADMIN_EMAIL="admin@ropeaccesscenter.com"
ADMIN_PASSWORD_HASH="pbkdf2$210000$…"   # hasil perintah di atas
SESSION_SECRET="…"                       # openssl rand -hex 32
```

Siapkan basis data lokal, lalu jalankan:

```bash
npm run db:migrate:local
npm run dev
```

Buka `http://localhost:4321` untuk situs, dan `http://localhost:4321/admin`
untuk dashboard.

> Situs sudah tayang lengkap bahkan sebelum ada basis data. D1, KV, dan R2
> hanya dibutuhkan agar hasil edit dari dashboard tersimpan.

---

## 2. Layanan Cloudflare

D1 dan KV **sudah dibuat** dan ID-nya sudah tertulis di `wrangler.toml`:

| Layanan | Nama | Status |
|---|---|---|
| D1 | `rac-db` | dibuat di region APAC, migrasi sudah dijalankan |
| KV | `rac-cache` | dibuat, dipakai untuk cache dan rate limit |
| R2 | `rac-media` | **belum** — perlu diaktifkan lebih dulu (lihat 2c) |

Anda tidak perlu mengulang langkah 2a dan 2b kecuali membangun ulang dari nol.

### 2a. D1 — basis data konten (sudah ada)

```bash
npx wrangler d1 create rac-db
```

Perintah ini mencetak `database_id`; tempel ke `wrangler.toml` di bawah
`[[d1_databases]]`.

*Batas paket gratis: 5 GB penyimpanan, 5 juta baris dibaca per hari.*

### 2b. KV — cache dan pembatas laju (sudah ada)

```bash
npx wrangler kv namespace create rac-cache
```

Salin `id` yang dicetak ke **kedua** blok `kv_namespaces` di `wrangler.toml`
(`CACHE` dan `SESSION` menunjuk namespace yang sama).

*Batas paket gratis: 100.000 baca dan 1.000 tulis per hari.*

### 2c. R2 — pustaka media (opsional, belum aktif)

> **R2 harus diaktifkan lewat Dashboard lebih dulu.** Berbeda dari D1 dan KV,
> R2 tidak bisa dinyalakan lewat API atau CLI. Selama belum aktif, `wrangler`
> akan menolak seluruh *deploy* bila binding-nya tidak dinonaktifkan — itulah
> sebabnya blok `[[r2_buckets]]` di `wrangler.toml` sengaja dikomentari.

Situs berjalan normal tanpa R2. Yang belum tersedia hanyalah unggah berkas di
menu **Media**; halaman tersebut menampilkan pemberitahuan yang jelas, dan
kolom gambar tetap menerima URL dari sumber lain.

Untuk mengaktifkannya:

1. Cloudflare Dashboard → **R2** → **Enable** (paket gratis, tanpa kartu).
2. Buat bucket-nya:
   ```bash
   npx wrangler r2 bucket create rac-media
   ```
3. Hapus tanda `#` pada tiga baris `[[r2_buckets]]` di `wrangler.toml`.
4. *Deploy* ulang: `npm run deploy`.

*Batas paket gratis: 10 GB penyimpanan, tanpa biaya keluar (egress).*

## 3. Setel *secret* produksi

*Secret* tidak pernah masuk ke repositori. Setel satu per satu:

```bash
npx wrangler secret put ADMIN_EMAIL
npx wrangler secret put ADMIN_PASSWORD_HASH
npx wrangler secret put SESSION_SECRET
```

Gunakan `SESSION_SECRET` yang **berbeda** dari nilai pengembangan lokal.

### Opsional — Cloudflare Turnstile (anti-spam formulir)

1. Buka Cloudflare Dashboard → **Turnstile** → **Add site**.
2. Salin *site key* ke `wrangler.toml` di bawah `[vars]`:
   ```toml
   PUBLIC_TURNSTILE_SITE_KEY = "0x4AAA…"
   ```
3. Setel *secret key*-nya:
   ```bash
   npx wrangler secret put TURNSTILE_SECRET_KEY
   ```

Bila dilewati, formulir tetap terlindungi *honeypot*, token bertanda tangan,
dan pembatasan laju.

---

## 4. Terapkan migrasi dan *deploy*

Migrasi `0001_init.sql` **sudah dijalankan** pada `rac-db`, jadi perintah di
bawah akan melaporkan "no migrations to apply". Tetap jalankan — perintah ini
aman diulang dan menjadi kebiasaan yang benar untuk migrasi berikutnya.

```bash
npx wrangler d1 migrations apply rac-db --remote
npm run deploy
```

Wrangler akan mencetak URL `*.workers.dev`. Buka `/admin` di URL tersebut dan
masuk memakai kredensial dari langkah 3.

---

## 5. Hubungkan domain Anda

1. Tambahkan domain ke Cloudflare (Dashboard → **Add a site**) dan arahkan
   *nameserver*-nya sesuai instruksi.
2. Buka **Workers & Pages → rac-website → Settings → Domains & Routes**.
3. Klik **Add** → **Custom domain** → masukkan `ropeaccesscenter.com`.
4. Ulangi untuk `www.ropeaccesscenter.com` bila diperlukan.

Perbarui URL kanonik di `wrangler.toml`:

```toml
[vars]
PUBLIC_SITE_URL = "https://ropeaccesscenter.com"
```

Lalu *deploy* ulang: `npm run deploy`.

> Nilai ini menentukan seluruh URL kanonik, `hreflang`, sitemap, dan data
> terstruktur. Pastikan benar sebelum situs diindeks.

---

## 6. Aktifkan *deploy* otomatis dari GitHub

Repositori sudah menyertakan alur kerja di `.github/workflows/deploy.yml`.
Alur ini memeriksa tipe, membangun, menjalankan migrasi, lalu *deploy* pada
setiap dorongan (*push*) ke `main`.

Anda hanya perlu menambahkan dua *secret* di GitHub
(**Settings → Secrets and variables → Actions**):

| Nama | Dari mana |
|---|---|
| `CLOUDFLARE_API_TOKEN` | Cloudflare → My Profile → API Tokens → **Create Token** → templat *Edit Cloudflare Workers*, tambahkan izin **D1:Edit** |
| `CLOUDFLARE_ACCOUNT_ID` | Terlihat di beranda Cloudflare Dashboard, atau jalankan `npx wrangler whoami` |

Opsional, tambahkan *variable* (bukan secret) `PUBLIC_SITE_URL` bila domain
Anda berbeda dari nilai bawaan.

---

## 7. Kirim situs ke mesin pencari

1. **Google Search Console** → tambahkan properti domain → verifikasi lewat DNS.
   Kirimkan `https://ropeaccesscenter.com/sitemap.xml`.
2. **Bing Webmaster Tools** → impor langsung dari Search Console.
3. Periksa data terstruktur di
   [Rich Results Test](https://search.google.com/test/rich-results).

Berkas berikut sudah tersedia otomatis dan tidak perlu disiapkan manual:

- `/sitemap.xml` — seluruh URL dua bahasa beserta `hreflang`
- `/robots.txt` — termasuk izin bagi perayap mesin penjawab (AI)
- `/llms.txt` — ringkasan kurasi untuk model bahasa
- `/api/content.json` — seluruh konten publik dalam JSON
- `/rss.xml` dan `/en/rss.xml` — umpan artikel

---

## Penggunaan sehari-hari

### Mengubah konten

Masuk ke `/admin`. Setiap koleksi — program pelatihan, layanan, artikel,
jadwal, FAQ, testimoni, tim, akreditasi, halaman, dan pengaturan situs — dapat
diubah dari sana, dengan kolom Indonesia dan Inggris berdampingan.

Menyimpan akan membersihkan cache secara otomatis; perubahan tampil di situs
dalam hitungan detik.

### Mengunggah gambar

Buka **Media**, unggah berkas, lalu salin URL-nya. Tempelkan URL itu ke kolom
gambar mana pun. Berkas disajikan dari domain situs sendiri dengan cache satu
tahun.

Format yang diterima: WebP, JPEG, PNG, AVIF, SVG, PDF (maksimum 8 MB).
**WebP sangat disarankan** — ukurannya jauh lebih kecil pada mutu yang setara.

### Membalas pesan masuk

Buka **Pesan Masuk**. Setiap pengiriman formulir memiliki tombol balas cepat
lewat WhatsApp dengan pesan yang sudah terisi, serta penanda status
(*new* → *contacted* → *quoted* → *won* / *lost*).

### Mengembalikan konten ke versi asli

Pada halaman penyuntingan mana pun, tekan **Kembalikan ke Bawaan**. Item akan
kembali ke versi yang tersimpan di repositori.

---

## Pemecahan masalah

**Dashboard menolak masuk dengan "dashboard not configured"**
Ketiga *secret* (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `SESSION_SECRET`) harus
terpasang. Periksa dengan `npx wrangler secret list`.

**Menyimpan gagal dengan "no database is bound"**
`database_id` di `wrangler.toml` masih berisi teks contoh, atau migrasi belum
dijalankan. Jalankan `npx wrangler d1 migrations apply rac-db --remote`.

**Unggahan media gagal / halaman Media bilang "Bucket R2 belum terhubung"**
R2 belum diaktifkan untuk akun ini. Ikuti langkah 2c — aktifkan R2 lewat
Dashboard, buat bucket-nya, lalu hapus komentar pada blok `[[r2_buckets]]`.

**Deploy gagal dengan pesan soal binding atau UUID tidak valid**
Salah satu binding di `wrangler.toml` menunjuk sumber daya yang tidak ada.
Cocokkan `database_id`, `id` KV, dan `bucket_name` dengan apa yang benar-benar
ada di akun Anda (`npx wrangler d1 list`, `npx wrangler kv namespace list`).
Binding yang tidak dapat diselesaikan akan menggagalkan seluruh *deploy*, bukan
hanya fitur yang memakainya.

**Perubahan tidak muncul di situs**
Tekan **Bersihkan Cache** pada halaman Ringkasan dashboard. Bila memakai
Cloudflare *proxy*, bersihkan juga cache zona untuk URL terkait.

**Halaman menampilkan konten bawaan padahal sudah diedit**
Berarti D1 tidak terjangkau dan situs kembali memakai konten repositori — ini
perilaku yang disengaja agar situs tidak pernah mati. Periksa *binding* dan
status D1 di panel Cloudflare.
