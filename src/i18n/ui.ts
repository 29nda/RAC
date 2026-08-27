import type { Locale } from './config';

/**
 * Interface copy. Content copy (headlines, service descriptions, articles)
 * lives in `src/data/*` and is editable from the dashboard; this file holds
 * only the strings that are part of the interface itself.
 */
export const UI = {
  'nav.home':          { id: 'Beranda',            en: 'Home' },
  'nav.about':         { id: 'Tentang Kami',       en: 'About Us' },
  'nav.training':      { id: 'Pelatihan',          en: 'Training' },
  'nav.certification': { id: 'Sertifikasi',        en: 'Certification' },
  'nav.services':      { id: 'Layanan',            en: 'Services' },
  'nav.schedule':      { id: 'Jadwal',             en: 'Schedule' },
  'nav.blog':          { id: 'Artikel',            en: 'Insights' },
  'nav.faq':           { id: 'FAQ',                en: 'FAQ' },
  'nav.contact':       { id: 'Kontak',             en: 'Contact' },
  'nav.menu':          { id: 'Menu',               en: 'Menu' },
  'nav.close':         { id: 'Tutup menu',         en: 'Close menu' },
  'nav.open':          { id: 'Buka menu',          en: 'Open menu' },
  'nav.primary':       { id: 'Navigasi utama',     en: 'Primary navigation' },

  'cta.header':        { id: 'Hubungi Kami',       en: 'Get in Touch' },
  'cta.whatsapp':      { id: 'Hubungi via WhatsApp',  en: 'Chat on WhatsApp' },
  'cta.whatsappShort': { id: 'WhatsApp',           en: 'WhatsApp' },
  'cta.consult':       { id: 'Konsultasi Gratis',  en: 'Free Consultation' },
  'cta.quote':         { id: 'Minta Penawaran',    en: 'Request a Quote' },
  'cta.brochure':      { id: 'Unduh Brosur',       en: 'Download Brochure' },
  'cta.enroll':        { id: 'Daftar Sekarang',    en: 'Enrol Now' },
  'cta.learnMore':     { id: 'Selengkapnya',       en: 'Learn More' },
  'cta.viewAll':       { id: 'Lihat Semua',        en: 'View All' },
  'cta.explore':       { id: 'Jelajahi Pelatihan', en: 'Explore Training' },
  'cta.ourServices':   { id: 'Layanan Kami',       en: 'Our Services' },
  'cta.backTo':        { id: 'Kembali ke',         en: 'Back to' },
  'cta.askSchedule':   { id: 'Tanya Jadwal',       en: 'Ask About Dates' },

  'label.duration':    { id: 'Durasi',             en: 'Duration' },
  'label.level':       { id: 'Level',              en: 'Level' },
  'label.prereq':      { id: 'Prasyarat',          en: 'Prerequisites' },
  'label.certificate': { id: 'Sertifikat',         en: 'Certificate' },
  'label.price':       { id: 'Investasi',          en: 'Investment' },
  'label.capacity':    { id: 'Kuota',              en: 'Capacity' },
  'label.location':    { id: 'Lokasi',             en: 'Location' },
  'label.date':        { id: 'Tanggal',            en: 'Date' },
  'label.status':      { id: 'Status',             en: 'Status' },
  'label.scope':       { id: 'Ruang Lingkup',      en: 'Scope of Work' },
  'label.industries':  { id: 'Industri',           en: 'Industries' },
  'label.published':   { id: 'Dipublikasikan',     en: 'Published' },
  'label.readTime':    { id: 'menit baca',         en: 'min read' },
  'label.share':       { id: 'Bagikan',            en: 'Share' },
  'label.category':    { id: 'Kategori',           en: 'Category' },
  'label.seats':       { id: 'kursi tersisa',      en: 'seats left' },
  'label.contactUs':   { id: 'Hubungi kami',       en: 'Contact us' },
  'label.optional':    { id: 'opsional',           en: 'optional' },
  'label.required':    { id: 'wajib diisi',        en: 'required' },

  'status.open':       { id: 'Kuota Tersedia',     en: 'Seats Available' },
  'status.limited':    { id: 'Hampir Penuh',       en: 'Almost Full' },
  'status.full':       { id: 'Kuota Penuh',        en: 'Fully Booked' },
  'status.request':    { id: 'Atas Permintaan',    en: 'On Request' },

  'form.name':         { id: 'Nama Lengkap',       en: 'Full Name' },
  'form.email':        { id: 'Alamat E-mail',      en: 'E-mail Address' },
  'form.phone':        { id: 'Nomor WhatsApp',     en: 'WhatsApp Number' },
  'form.company':      { id: 'Perusahaan',         en: 'Company' },
  'form.subject':      { id: 'Kebutuhan Anda',     en: 'What Do You Need?' },
  'form.message':      { id: 'Pesan',              en: 'Message' },
  'form.send':         { id: 'Kirim Pesan',        en: 'Send Message' },
  'form.sending':      { id: 'Mengirim…',          en: 'Sending…' },
  'form.success':      {
    id: 'Terima kasih. Pesan Anda sudah kami terima dan akan dibalas pada hari kerja berikutnya. Untuk respons lebih cepat, silakan hubungi kami melalui WhatsApp.',
    en: 'Thank you. We have received your message and will reply within one business day. For a faster response, reach us on WhatsApp.',
  },
  'form.error':        {
    id: 'Maaf, pesan gagal dikirim. Silakan coba lagi atau hubungi kami langsung melalui WhatsApp.',
    en: 'Sorry, your message could not be sent. Please try again or contact us directly on WhatsApp.',
  },
  'form.consent':      {
    id: 'Saya setuju data saya digunakan untuk menjawab pertanyaan ini sesuai Kebijakan Privasi.',
    en: 'I agree that my data may be used to respond to this enquiry, per the Privacy Policy.',
  },
  'form.placeholderMessage': {
    id: 'Ceritakan kebutuhan Anda — jenis pekerjaan, lokasi, jumlah personel, dan target waktu.',
    en: 'Tell us what you need — type of work, site location, headcount, and target dates.',
  },

  'section.faqTitle':  { id: 'Pertanyaan yang Sering Diajukan', en: 'Frequently Asked Questions' },
  'section.related':   { id: 'Lainnya untuk Anda',  en: 'More for You' },
  'section.contactTitle': { id: 'Mulai Percakapan', en: 'Start a Conversation' },

  'meta.breadcrumb':   { id: 'Remah roti',          en: 'Breadcrumb' },
  'meta.lang':         { id: 'Pilih bahasa',        en: 'Select language' },
  'meta.skip':         { id: 'Lompat ke konten utama', en: 'Skip to main content' },
  'meta.toTop':        { id: 'Kembali ke atas',     en: 'Back to top' },

  'error.404Title':    { id: 'Halaman Tidak Ditemukan', en: 'Page Not Found' },
  'error.404Body':     {
    id: 'Tautan yang Anda buka sudah dipindahkan atau tidak pernah ada. Mari kembali ke jalur yang aman.',
    en: 'The link you followed has moved or never existed. Let us get you back on a safe line.',
  },
  'error.home':        { id: 'Kembali ke Beranda',  en: 'Back to Home' },

  'footer.rights':     { id: 'Seluruh hak cipta dilindungi.', en: 'All rights reserved.' },
  'footer.company':    { id: 'Perusahaan',          en: 'Company' },
  'footer.training':   { id: 'Pelatihan',           en: 'Training' },
  'footer.services':   { id: 'Layanan',             en: 'Services' },
  'footer.contact':    { id: 'Hubungi Kami',        en: 'Contact Us' },
  'footer.legal':      { id: 'Legal',               en: 'Legal' },
  'footer.follow':     { id: 'Ikuti kami',          en: 'Follow us' },
  'footer.sitemap':    { id: 'Peta Situs',          en: 'Sitemap' },
  'footer.hours':      { id: 'Jam Operasional',     en: 'Office Hours' },
} as const;

export type UIKey = keyof typeof UI;

/** Returns a translator bound to `locale`. */
export function useTranslations(locale: Locale) {
  return function t(key: UIKey): string {
    return UI[key][locale];
  };
}

/** Pick the right side of a `{ id, en }` pair, falling back to the other. */
export function pick(
  value: Partial<Record<Locale, string>> | string | null | undefined,
  locale: Locale,
): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[locale] || value[locale === 'id' ? 'en' : 'id'] || '';
}

/** Locale-aware date formatting, safe on the Workers runtime. */
export function formatDate(input: string | Date, locale: Locale): string {
  const d = typeof input === 'string' ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return '';
  try {
    return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-GB', {
      day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Jakarta',
    }).format(d);
  } catch {
    return d.toISOString().slice(0, 10);
  }
}

export function formatDateShort(input: string | Date, locale: Locale): string {
  const d = typeof input === 'string' ? new Date(input) : input;
  if (Number.isNaN(d.getTime())) return '';
  try {
    return new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-GB', {
      day: '2-digit', month: 'short', year: 'numeric', timeZone: 'Asia/Jakarta',
    }).format(d);
  } catch {
    return d.toISOString().slice(0, 10);
  }
}
