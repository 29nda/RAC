import type { TeamMember } from '../lib/types';

export const team: TeamMember[] = [
  {
    id: 'tm-1', order: 1, published: true,
    name: 'Agus Setiawan',
    role: { id: 'Kepala Instruktur & IRATA Level 3', en: 'Head Instructor & IRATA Level 3' },
    credentials: ['IRATA Level 3', 'IRATA Trainer', 'BNSP TKPK 3', 'First Aid at Work'],
    bio: {
      id: 'Lima belas tahun di tali, sebagian besar di fasilitas migas lepas pantai Kalimantan dan Natuna. Agus memimpin penyusunan silabus RAC dan memegang kewenangan akhir atas standar kelulusan.',
      en: 'Fifteen years on rope, most of it on offshore oil and gas facilities in Kalimantan and the Natuna Sea. Agus leads RAC’s syllabus design and holds final authority over the pass standard.',
    },
  },
  {
    id: 'tm-2', order: 2, published: true,
    name: 'Dimas Herlambang',
    role: { id: 'Instruktur Senior & Koordinator Penyelamatan', en: 'Senior Instructor & Rescue Coordinator' },
    credentials: ['IRATA Level 3', 'Confined Space Rescue', 'BNSP TKPK 3', 'HSE Officer'],
    bio: {
      id: 'Mantan anggota tim tanggap darurat kilang. Dimas menyusun dan menguji rencana penyelamatan untuk seluruh penugasan tim penyelamat siaga RAC.',
      en: 'A former refinery emergency response team member. Dimas writes and proves the rescue plans behind every RAC standby rescue deployment.',
    },
  },
  {
    id: 'tm-3', order: 3, published: true,
    name: 'Fitri Andayani',
    role: { id: 'Manajer Kepatuhan & Sertifikasi', en: 'Compliance & Certification Manager' },
    credentials: ['Asesor Kompetensi BNSP', 'Lead Auditor ISO 45001', 'IRATA Level 1'],
    bio: {
      id: 'Fitri mengelola hubungan RAC dengan lembaga sertifikasi, memverifikasi setiap berkas kompetensi, dan mendampingi klien menghadapi audit maupun inspeksi Disnaker.',
      en: 'Fitri manages RAC’s relationships with certification bodies, verifies every competency file, and supports clients through audits and Ministry of Manpower inspections.',
    },
  },
  {
    id: 'tm-4', order: 4, published: true,
    name: 'Reza Maulana',
    role: { id: 'Manajer Operasi Lapangan', en: 'Field Operations Manager' },
    credentials: ['IRATA Level 3', 'NDT Level II (UT, MPI, PT)', 'BOSIET', 'Rigging & Lifting'],
    bio: {
      id: 'Reza memimpin mobilisasi tim ke lokasi kerja di seluruh Indonesia, dari kilang di Jawa hingga anjungan lepas pantai. Ia memegang kualifikasi ganda akses tali dan NDT.',
      en: 'Reza runs team mobilisation to sites across Indonesia, from refineries in Java to offshore platforms. He holds dual rope access and NDT qualifications.',
    },
  },
];
