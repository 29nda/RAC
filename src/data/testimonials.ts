import type { Testimonial } from '../lib/types';

export const testimonials: Testimonial[] = [
  {
    id: 't-1', order: 1, published: true,
    name: 'Budi Santoso', company: 'PT Energi Nusantara',
    role: { id: 'HSE Manager', en: 'HSE Manager' },
    quote: {
      id: 'Kami mengirim dua belas teknisi ke RAC dalam tiga angkatan. Yang membedakan bukan materi — melainkan rasio instruktur yang kecil, sehingga setiap kesalahan kecil langsung dikoreksi. Semua peserta lulus asesmen pada percobaan pertama.',
      en: 'We sent twelve technicians to RAC across three cohorts. What set it apart was not the syllabus — it was the small instructor ratio, so every small error was corrected on the spot. All of them passed on the first attempt.',
    },
  },
  {
    id: 't-2', order: 2, published: true,
    name: 'Andi Prasetyo', company: 'Kilang Cilacap',
    role: { id: 'Turnaround Coordinator', en: 'Turnaround Coordinator' },
    quote: {
      id: 'Inspeksi flare stack yang biasanya menuntut dua minggu perancah selesai dalam empat hari dengan tim akses tali RAC. Laporannya rapi, datanya dapat diaudit, dan tidak ada satu pun insiden selama pekerjaan.',
      en: 'A flare stack inspection that normally demanded two weeks of scaffolding was finished in four days with RAC’s rope access team. The report was clean, the data auditable, and there was not a single incident during the work.',
    },
  },
  {
    id: 't-3', order: 3, published: true,
    name: 'Sari Wijaya', company: 'Menara Sudirman',
    role: { id: 'Building Manager', en: 'Building Manager' },
    quote: {
      id: 'Kami beralih dari gondola ke akses tali untuk perawatan fasad, dan biaya tahunan turun signifikan. Yang paling saya hargai adalah paket dokumen K3 yang lengkap sejak awal — tidak perlu mengejar-ngejar berkas.',
      en: 'We moved from gondola to rope access for façade maintenance and our annual cost dropped considerably. What I value most is the complete HSE document pack up front — no chasing paperwork.',
    },
  },
  {
    id: 't-4', order: 4, published: true,
    name: 'Michael Tanuwijaya', company: 'PT Bumi Konstruksi',
    role: { id: 'Project Director', en: 'Project Director' },
    quote: {
      id: 'Tim standby rescue RAC menguji rencana penyelamatan kami di lokasi sesungguhnya, dan menemukan dua celah yang tidak pernah kami sadari. Itu saja sudah membayar seluruh biaya kontraknya.',
      en: 'RAC’s standby rescue team proved our rescue plan on the actual site and found two gaps we had never noticed. That alone paid for the whole contract.',
    },
  },
  {
    id: 't-5', order: 5, published: true,
    name: 'Rizky Hidayat', company: 'Alumni IRATA Level 3',
    role: { id: 'Rope Access Supervisor', en: 'Rope Access Supervisor' },
    quote: {
      id: 'Saya menempuh Level 1 sampai Level 3 di RAC selama lima tahun. Instrukturnya jujur — mereka akan mengatakan Anda belum siap kalau memang belum, dan itulah yang membuat sertifikat ini berarti.',
      en: 'I went from Level 1 to Level 3 at RAC over five years. The instructors are honest — they will tell you that you are not ready if you are not, and that is exactly what makes the certificate mean something.',
    },
  },
];
