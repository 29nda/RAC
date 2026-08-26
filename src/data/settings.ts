import type { SiteSettings } from '../lib/types';

/**
 * Baseline company profile. Every field here is editable from the dashboard
 * (Settings) — values stored in D1 override these defaults at request time.
 */
export const settings: SiteSettings = {
  brandName: 'Rope Access Center',
  legalName: 'PT Rope Access Center Indonesia',
  tagline: {
    id: 'Training, Sertifikasi, & Layanan Korporat',
    en: 'Training, Certification, & Corporate Services',
  },
  description: {
    id: 'Rope Access Center (RAC) adalah pusat pelatihan dan penyedia jasa akses tali untuk industri berisiko tinggi di Indonesia — dari sertifikasi IRATA dan BNSP hingga inspeksi, perawatan, dan penyelamatan di ketinggian.',
    en: 'Rope Access Center (RAC) is a rope access training centre and industrial service provider for high-risk sectors in Indonesia — from IRATA and BNSP certification to inspection, maintenance, and rescue at height.',
  },

  whatsapp: '6281234567890',
  whatsappGreeting: {
    id: 'Halo RAC, saya ingin bertanya tentang',
    en: 'Hello RAC, I would like to ask about',
  },
  phoneDisplay: '+62 812 3456 7890',
  email: 'info@ropeaccesscenter.com',

  addressLine: {
    id: 'Jl. Industri Raya No. 10, Kawasan Industri',
    en: 'Jl. Industri Raya No. 10, Industrial Estate',
  },
  city: 'Jakarta',
  region: 'DKI Jakarta',
  postalCode: '14130',
  countryCode: 'ID',
  latitude: -6.1214,
  longitude: 106.8940,

  openingHours: {
    id: 'Senin – Jumat, 08.00 – 17.00 WIB · Sabtu dengan perjanjian',
    en: 'Monday – Friday, 08:00 – 17:00 WIB · Saturday by appointment',
  },
  mapEmbedQuery: 'Jl.+Industri+Raya+No.10,+Jakarta',

  social: {
    facebook: 'https://facebook.com/ropeaccesscenter',
    instagram: 'https://instagram.com/ropeaccesscenter',
    linkedin: 'https://linkedin.com/company/ropeaccesscenter',
    youtube: 'https://youtube.com/@ropeaccesscenter',
  },

  founded: '2014',

  stats: [
    {
      value: '1.200+',
      icon: 'users',
      label: { id: 'Teknisi Terlatih', en: 'Technicians Trained' },
    },
    {
      value: '98%',
      icon: 'shield',
      label: { id: 'Tingkat Kelulusan Sertifikasi', en: 'Certification Pass Rate' },
    },
    {
      value: '250+',
      icon: 'building',
      label: { id: 'Proyek Diselesaikan', en: 'Projects Delivered' },
    },
    {
      value: '10+',
      icon: 'calendar',
      label: { id: 'Tahun Pengalaman', en: 'Years of Experience' },
    },
  ],
};
