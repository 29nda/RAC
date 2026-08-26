import type { Accreditation } from '../lib/types';

export const accreditations: Accreditation[] = [
  {
    id: 'acc-irata', order: 1, name: 'IRATA International',
    note: {
      id: 'Skema pelatihan dan sertifikasi akses tali industri berskala global.',
      en: 'The global industrial rope access training and certification scheme.',
    },
  },
  {
    id: 'acc-bnsp', order: 2, name: 'BNSP',
    note: {
      id: 'Badan Nasional Sertifikasi Profesi — sertifikasi kompetensi nasional Indonesia.',
      en: 'Indonesia’s National Professional Certification Agency.',
    },
  },
  {
    id: 'acc-kemnaker', order: 3, name: 'Kemnaker RI',
    note: {
      id: 'Sesuai Permenaker No. 9 Tahun 2016 tentang K3 dalam pekerjaan pada ketinggian.',
      en: 'Aligned with Ministry of Manpower Regulation 9/2016 on work at height.',
    },
  },
  {
    id: 'acc-sprat', order: 4, name: 'SPRAT',
    note: {
      id: 'Society of Professional Rope Access Technicians — skema sertifikasi Amerika Utara.',
      en: 'Society of Professional Rope Access Technicians — the North American scheme.',
    },
  },
  {
    id: 'acc-iso', order: 5, name: 'ISO 45001',
    note: {
      id: 'Kerangka sistem manajemen keselamatan dan kesehatan kerja.',
      en: 'The occupational health and safety management system framework.',
    },
  },
];
