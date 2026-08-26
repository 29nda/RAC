import type { CollectionName } from './types';

/**
 * Field descriptors that drive the dashboard editor.
 *
 * Keeping the shape of every collection in one declarative table means adding
 * a field to a course is a one-line change here — the list view, the edit
 * form, and the save handler all read from this.
 */

export type FieldType =
  | 'text'        // single-line, one value
  | 'i18n'        // single-line, one value per language
  | 'i18nArea'    // multi-line, one value per language
  | 'i18nRich'    // rich text (sanitised HTML), one value per language
  | 'i18nList'    // list of lines, one list per language
  | 'list'        // list of lines, not translated (tags, credentials)
  | 'number'
  | 'boolean'
  | 'select'
  | 'date'
  | 'image'
  | 'syllabus';   // repeating {title, detail} pairs, both bilingual

export interface FieldDef {
  name: string;
  label: { id: string; en: string };
  type: FieldType;
  help?: { id: string; en: string };
  options?: string[];
  required?: boolean;
  /** Shown in the collection list view. */
  column?: boolean;
}

export interface CollectionDef {
  name: CollectionName | 'settings';
  label: { id: string; en: string };
  icon: string;
  /** Property that uniquely identifies an item. */
  keyField: string;
  singleton?: boolean;
  fields: FieldDef[];
}

const L = (id: string, en: string) => ({ id, en });

const PUBLISHED: FieldDef = {
  name: 'published', label: L('Tayang', 'Published'), type: 'boolean', column: true,
};
const ORDER: FieldDef = {
  name: 'order', label: L('Urutan', 'Order'), type: 'number', column: true,
};

export const COLLECTIONS: CollectionDef[] = [
  {
    name: 'courses',
    label: L('Program Pelatihan', 'Training Programmes'),
    icon: 'graduation-cap',
    keyField: 'slug',
    fields: [
      { name: 'slug', label: L('Slug URL', 'URL slug'), type: 'text', required: true, column: true,
        help: L('Bagian akhir alamat halaman. Mengubahnya mengubah URL.',
                'The last part of the page address. Changing it changes the URL.') },
      { name: 'title', label: L('Judul', 'Title'), type: 'i18n', required: true, column: true },
      { name: 'code', label: L('Kode', 'Code'), type: 'text', column: true },
      { name: 'scheme', label: L('Skema', 'Scheme'), type: 'select',
        options: ['IRATA', 'SPRAT', 'BNSP', 'IN-HOUSE'], column: true },
      { name: 'level', label: L('Level', 'Level'), type: 'text', column: true },
      { name: 'summary', label: L('Ringkasan', 'Summary'), type: 'i18nArea', required: true },
      { name: 'duration', label: L('Durasi', 'Duration'), type: 'i18n' },
      { name: 'price', label: L('Investasi', 'Investment'), type: 'i18n' },
      { name: 'certificate', label: L('Sertifikat', 'Certificate'), type: 'i18nArea' },
      { name: 'prerequisites', label: L('Prasyarat', 'Prerequisites'), type: 'i18nList' },
      { name: 'outcomes', label: L('Hasil Belajar', 'Learning outcomes'), type: 'i18nList' },
      { name: 'syllabus', label: L('Silabus', 'Syllabus'), type: 'syllabus' },
      { name: 'body', label: L('Isi Halaman', 'Page body'), type: 'i18nRich' },
      { name: 'image', label: L('Gambar', 'Image'), type: 'image' },
      { name: 'imageAlt', label: L('Teks Alternatif Gambar', 'Image alt text'), type: 'i18n' },
      { name: 'featured', label: L('Unggulan', 'Featured'), type: 'boolean', column: true },
      ORDER,
      PUBLISHED,
      { name: 'metaTitle', label: L('SEO — Judul', 'SEO — Title'), type: 'i18n' },
      { name: 'metaDescription', label: L('SEO — Deskripsi', 'SEO — Description'), type: 'i18nArea' },
    ],
  },
  {
    name: 'services',
    label: L('Layanan', 'Services'),
    icon: 'briefcase',
    keyField: 'slug',
    fields: [
      { name: 'slug', label: L('Slug URL', 'URL slug'), type: 'text', required: true, column: true },
      { name: 'title', label: L('Judul', 'Title'), type: 'i18n', required: true, column: true },
      { name: 'icon', label: L('Ikon', 'Icon'), type: 'select',
        options: ['search', 'wrench', 'building', 'lifebuoy', 'clipboard', 'users', 'helmet', 'shield', 'briefcase'] },
      { name: 'summary', label: L('Ringkasan', 'Summary'), type: 'i18nArea', required: true },
      { name: 'scope', label: L('Ruang Lingkup', 'Scope of work'), type: 'i18nList' },
      { name: 'industries', label: L('Industri', 'Industries'), type: 'i18nList' },
      { name: 'deliverables', label: L('Hasil Kerja', 'Deliverables'), type: 'i18nList' },
      { name: 'body', label: L('Isi Halaman', 'Page body'), type: 'i18nRich' },
      { name: 'image', label: L('Gambar', 'Image'), type: 'image' },
      { name: 'imageAlt', label: L('Teks Alternatif Gambar', 'Image alt text'), type: 'i18n' },
      { name: 'featured', label: L('Unggulan', 'Featured'), type: 'boolean', column: true },
      ORDER,
      PUBLISHED,
      { name: 'metaTitle', label: L('SEO — Judul', 'SEO — Title'), type: 'i18n' },
      { name: 'metaDescription', label: L('SEO — Deskripsi', 'SEO — Description'), type: 'i18nArea' },
    ],
  },
  {
    name: 'posts',
    label: L('Artikel', 'Articles'),
    icon: 'edit',
    keyField: 'slug',
    fields: [
      { name: 'slug', label: L('Slug URL', 'URL slug'), type: 'text', required: true, column: true },
      { name: 'title', label: L('Judul', 'Title'), type: 'i18n', required: true, column: true },
      { name: 'category', label: L('Kategori', 'Category'), type: 'i18n', column: true },
      { name: 'excerpt', label: L('Kutipan', 'Excerpt'), type: 'i18nArea', required: true },
      { name: 'body', label: L('Isi Artikel', 'Article body'), type: 'i18nRich', required: true },
      { name: 'author', label: L('Penulis', 'Author'), type: 'text', column: true },
      { name: 'publishedAt', label: L('Tanggal Terbit', 'Published date'), type: 'date', column: true },
      { name: 'updatedAt', label: L('Tanggal Diperbarui', 'Updated date'), type: 'date' },
      { name: 'readingMinutes', label: L('Menit Baca', 'Reading minutes'), type: 'number' },
      { name: 'image', label: L('Gambar', 'Image'), type: 'image' },
      { name: 'imageAlt', label: L('Teks Alternatif Gambar', 'Image alt text'), type: 'i18n' },
      { name: 'tags', label: L('Tag (satu per baris)', 'Tags (one per line)'), type: 'list' },
      { name: 'featured', label: L('Unggulan', 'Featured'), type: 'boolean', column: true },
      PUBLISHED,
      { name: 'metaTitle', label: L('SEO — Judul', 'SEO — Title'), type: 'i18n' },
      { name: 'metaDescription', label: L('SEO — Deskripsi', 'SEO — Description'), type: 'i18nArea' },
    ],
  },
  {
    name: 'schedule',
    label: L('Jadwal Pelatihan', 'Training Schedule'),
    icon: 'calendar',
    keyField: 'id',
    fields: [
      { name: 'id', label: L('ID', 'ID'), type: 'text', required: true, column: true },
      { name: 'courseSlug', label: L('Slug Program', 'Course slug'), type: 'text', required: true, column: true,
        help: L('Harus sama persis dengan slug salah satu program pelatihan.',
                'Must match the slug of one of the training programmes exactly.') },
      { name: 'startDate', label: L('Tanggal Mulai', 'Start date'), type: 'date', required: true, column: true },
      { name: 'endDate', label: L('Tanggal Selesai', 'End date'), type: 'date', required: true, column: true },
      { name: 'location', label: L('Lokasi', 'Location'), type: 'i18n', column: true },
      { name: 'seatsTotal', label: L('Total Kuota', 'Total seats'), type: 'number' },
      { name: 'seatsLeft', label: L('Sisa Kuota', 'Seats left'), type: 'number', column: true },
      { name: 'status', label: L('Status', 'Status'), type: 'select',
        options: ['open', 'limited', 'full', 'request'], column: true },
      PUBLISHED,
    ],
  },
  {
    name: 'faqs',
    label: L('FAQ', 'FAQ'),
    icon: 'info',
    keyField: 'id',
    fields: [
      { name: 'id', label: L('ID', 'ID'), type: 'text', required: true, column: true },
      { name: 'group', label: L('Kelompok', 'Group'), type: 'select',
        options: ['general', 'training', 'certification', 'services'], column: true },
      { name: 'question', label: L('Pertanyaan', 'Question'), type: 'i18nArea', required: true, column: true },
      { name: 'answer', label: L('Jawaban', 'Answer'), type: 'i18nArea', required: true },
      ORDER,
      PUBLISHED,
    ],
  },
  {
    name: 'testimonials',
    label: L('Testimoni', 'Testimonials'),
    icon: 'quote',
    keyField: 'id',
    fields: [
      { name: 'id', label: L('ID', 'ID'), type: 'text', required: true, column: true },
      { name: 'name', label: L('Nama', 'Name'), type: 'text', required: true, column: true },
      { name: 'company', label: L('Perusahaan', 'Company'), type: 'text', column: true },
      { name: 'role', label: L('Jabatan', 'Role'), type: 'i18n' },
      { name: 'quote', label: L('Kutipan', 'Quote'), type: 'i18nArea', required: true },
      ORDER,
      PUBLISHED,
    ],
  },
  {
    name: 'team',
    label: L('Tim', 'Team'),
    icon: 'users',
    keyField: 'id',
    fields: [
      { name: 'id', label: L('ID', 'ID'), type: 'text', required: true, column: true },
      { name: 'name', label: L('Nama', 'Name'), type: 'text', required: true, column: true },
      { name: 'role', label: L('Jabatan', 'Role'), type: 'i18n', column: true },
      { name: 'bio', label: L('Profil Singkat', 'Short bio'), type: 'i18nArea' },
      { name: 'credentials', label: L('Sertifikasi (satu per baris)', 'Credentials (one per line)'), type: 'list' },
      { name: 'photo', label: L('Foto', 'Photo'), type: 'image' },
      ORDER,
      PUBLISHED,
    ],
  },
  {
    name: 'accreditations',
    label: L('Akreditasi', 'Accreditations'),
    icon: 'shield-check',
    keyField: 'id',
    fields: [
      { name: 'id', label: L('ID', 'ID'), type: 'text', required: true, column: true },
      { name: 'name', label: L('Nama', 'Name'), type: 'text', required: true, column: true },
      { name: 'note', label: L('Keterangan', 'Note'), type: 'i18nArea' },
      { name: 'logo', label: L('Logo', 'Logo'), type: 'image' },
      ORDER,
    ],
  },
  {
    name: 'pages',
    label: L('Halaman', 'Pages'),
    icon: 'layers',
    keyField: 'key',
    fields: [
      { name: 'key', label: L('Kunci Halaman', 'Page key'), type: 'text', required: true, column: true },
      { name: 'heroEyebrow', label: L('Hero — Label Atas', 'Hero — Eyebrow'), type: 'i18n' },
      { name: 'heroTitle', label: L('Hero — Judul', 'Hero — Title'), type: 'i18nArea', column: true,
        help: L('Tekan Enter untuk memaksa pindah baris.', 'Press Enter to force a line break.') },
      { name: 'heroSubtitle', label: L('Hero — Subjudul', 'Hero — Subtitle'), type: 'i18nArea' },
      { name: 'intro', label: L('Paragraf Pembuka', 'Intro paragraph'), type: 'i18nArea' },
      { name: 'body', label: L('Isi Halaman', 'Page body'), type: 'i18nRich' },
      { name: 'metaTitle', label: L('SEO — Judul', 'SEO — Title'), type: 'i18n', column: true },
      { name: 'metaDescription', label: L('SEO — Deskripsi', 'SEO — Description'), type: 'i18nArea' },
    ],
  },
  {
    name: 'settings',
    label: L('Pengaturan Situs', 'Site Settings'),
    icon: 'settings',
    keyField: 'brandName',
    singleton: true,
    fields: [
      { name: 'brandName', label: L('Nama Merek', 'Brand name'), type: 'text', required: true },
      { name: 'legalName', label: L('Nama Badan Hukum', 'Legal name'), type: 'text' },
      { name: 'tagline', label: L('Tagline', 'Tagline'), type: 'i18n' },
      { name: 'description', label: L('Deskripsi Situs', 'Site description'), type: 'i18nArea',
        help: L('Dipakai untuk meta description beranda dan data terstruktur.',
                'Used for the homepage meta description and structured data.') },
      { name: 'whatsapp', label: L('Nomor WhatsApp', 'WhatsApp number'), type: 'text', required: true,
        help: L('Format internasional tanpa tanda +, contoh: 6281234567890.',
                'International format without the + sign, e.g. 6281234567890.') },
      { name: 'whatsappGreeting', label: L('Sapaan WhatsApp', 'WhatsApp greeting'), type: 'i18n',
        help: L('Kalimat pembuka yang otomatis terisi di chat.',
                'The opening line pre-filled into the chat.') },
      { name: 'phoneDisplay', label: L('Telepon (tampilan)', 'Phone (display)'), type: 'text' },
      { name: 'email', label: L('E-mail', 'E-mail'), type: 'text' },
      { name: 'addressLine', label: L('Alamat', 'Street address'), type: 'i18n' },
      { name: 'city', label: L('Kota', 'City'), type: 'text' },
      { name: 'region', label: L('Provinsi', 'Region'), type: 'text' },
      { name: 'postalCode', label: L('Kode Pos', 'Postal code'), type: 'text' },
      { name: 'latitude', label: L('Lintang', 'Latitude'), type: 'number' },
      { name: 'longitude', label: L('Bujur', 'Longitude'), type: 'number' },
      { name: 'openingHours', label: L('Jam Operasional', 'Opening hours'), type: 'i18n' },
      { name: 'mapEmbedQuery', label: L('Kueri Peta', 'Map query'), type: 'text' },
      { name: 'founded', label: L('Tahun Berdiri', 'Founded'), type: 'text' },
    ],
  },
];

export function findCollection(name: string): CollectionDef | undefined {
  return COLLECTIONS.find((collection) => collection.name === name);
}

/** Fields shown as columns in a collection's list view. */
export function listColumns(collection: CollectionDef): FieldDef[] {
  return collection.fields.filter((field) => field.column);
}
