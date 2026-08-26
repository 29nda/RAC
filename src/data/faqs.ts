import type { Faq } from '../lib/types';

/**
 * FAQ entries feed both the on-page accordions and the FAQPage JSON-LD.
 * Answers are written to stand alone, so an AI assistant quoting a single
 * entry still gives the reader something complete and correct.
 */
export const faqs: Faq[] = [
  {
    id: 'faq-what-is-rope-access',
    group: 'general',
    order: 1,
    published: true,
    question: {
      id: 'Apa itu rope access dan kapan metode ini dipilih?',
      en: 'What is rope access, and when is it the right method?',
    },
    answer: {
      id: 'Rope access adalah metode kerja di ketinggian menggunakan dua sistem tali independen — satu tali kerja dan satu tali cadangan — sehingga kegagalan pada satu sistem tidak menyebabkan jatuh. Metode ini dipilih ketika area kerja sulit dijangkau perancah atau gondola, ketika waktu pemasangan akses harus singkat, atau ketika pekerjaan berlangsung di area produksi yang tidak boleh terhenti. Statistik keselamatan IRATA International secara konsisten menunjukkan tingkat kecelakaan akses tali yang jauh lebih rendah dibanding metode akses ketinggian lainnya.',
      en: 'Rope access is a method of working at height using two independent rope systems — a working line and a backup line — so that failure of one system does not result in a fall. It is chosen when the work area is difficult to reach with scaffolding or a gondola, when access must be established quickly, or when work takes place in a production area that cannot be shut down. IRATA International’s safety statistics consistently show a far lower incident rate for rope access than for other work-at-height methods.',
    },
  },
  {
    id: 'faq-irata-vs-bnsp',
    group: 'certification',
    order: 2,
    published: true,
    question: {
      id: 'Apa perbedaan sertifikasi IRATA dan BNSP?',
      en: 'What is the difference between IRATA and BNSP certification?',
    },
    answer: {
      id: 'IRATA International adalah skema sertifikasi industri berskala global dengan tiga tingkat (Level 1, 2, dan 3), diakui operator multinasional di lebih dari 60 negara, dan berlaku tiga tahun. BNSP adalah sertifikasi kompetensi nasional Indonesia — untuk pekerjaan ketinggian dikenal sebagai TKPK — yang diterbitkan lembaga sertifikasi profesi berlisensi dan sering menjadi syarat administratif proyek pemerintah maupun kontraktor lokal. Keduanya tidak saling menggantikan: banyak teknisi memegang keduanya agar dapat bekerja lintas jenis proyek.',
      en: 'IRATA International is a global industry certification scheme with three grades (Levels 1, 2, and 3), recognised by multinational operators in more than 60 countries, and valid for three years. BNSP is Indonesia’s national competency certification — known as TKPK for work at height — issued by licensed professional certification bodies, and frequently an administrative requirement on government projects and for local contractors. They do not substitute for each other: many technicians hold both so they can work across project types.',
    },
  },
  {
    id: 'faq-no-experience',
    group: 'training',
    order: 3,
    published: true,
    question: {
      id: 'Saya belum punya pengalaman sama sekali. Bisakah saya ikut pelatihan?',
      en: 'I have no experience at all. Can I still take the training?',
    },
    answer: {
      id: 'Bisa. IRATA Level 1 dan BNSP TKPK Tingkat 1 dirancang untuk peserta tanpa pengalaman akses tali sebelumnya. Syaratnya adalah usia minimal 18 tahun, kondisi jasmani yang sehat untuk bekerja di ketinggian, dan tidak memiliki kondisi medis seperti vertigo atau epilepsi yang tidak terkontrol. Kami menyediakan seluruh alat pelindung diri; peserta hanya perlu membawa sepatu keselamatan dan pakaian kerja.',
      en: 'Yes. IRATA Level 1 and BNSP TKPK Level 1 are designed for participants with no prior rope access experience. The requirements are a minimum age of 18, medical fitness for work at height, and no uncontrolled conditions such as vertigo or epilepsy. We supply all personal protective equipment; you need only bring safety boots and work clothing.',
    },
  },
  {
    id: 'faq-duration',
    group: 'training',
    order: 4,
    published: true,
    question: {
      id: 'Berapa lama pelatihan berlangsung dan bagaimana jadwalnya?',
      en: 'How long does training take, and how is it scheduled?',
    },
    answer: {
      id: 'Pelatihan IRATA setiap level berlangsung enam hari: lima hari pelatihan dan satu hari asesmen oleh asesor IRATA independen. Sertifikasi BNSP TKPK berlangsung empat hari termasuk uji kompetensi. Kelas reguler dibuka setiap bulan; jadwal terbaru dapat dilihat pada halaman Jadwal Pelatihan. Untuk perusahaan dengan minimal enam peserta, kami dapat membuka angkatan khusus pada tanggal yang Anda tentukan.',
      en: 'Each IRATA level runs for six days: five training days plus one assessment day with an independent IRATA Assessor. BNSP TKPK certification runs for four days including the competency assessment. Open courses run monthly; current dates are listed on the Training Schedule page. For companies with at least six participants, we can open a dedicated cohort on dates you choose.',
    },
  },
  {
    id: 'faq-certificate-validity',
    group: 'certification',
    order: 5,
    published: true,
    question: {
      id: 'Berapa lama sertifikat berlaku dan bagaimana memperpanjangnya?',
      en: 'How long is a certificate valid, and how do I renew it?',
    },
    answer: {
      id: 'Sertifikat IRATA dan BNSP sama-sama berlaku tiga tahun. Untuk IRATA, Anda harus mengikuti asesmen ulang sebelum masa berlaku berakhir. Apabila sertifikat telah kedaluwarsa lebih dari enam bulan, Anda wajib mengulang dari level di bawahnya. Kami menyarankan mengikuti program refresher dua hingga empat hari sebelum asesmen ulang, terutama jika Anda tidak rutin bekerja di tali. RAC mengirimkan pengingat gratis kepada seluruh alumni 90 hari sebelum sertifikat berakhir.',
      en: 'IRATA and BNSP certificates are both valid for three years. For IRATA you must be reassessed before the expiry date. If a certificate has been expired for more than six months, you must requalify from the level below. We recommend a two- to four-day refresher before reassessment, particularly if you have not been working on rope regularly. RAC sends every alumnus a free reminder 90 days before expiry.',
    },
  },
  {
    id: 'faq-cost',
    group: 'training',
    order: 6,
    published: true,
    question: {
      id: 'Berapa biaya pelatihan dan apa saja yang termasuk?',
      en: 'What does training cost, and what is included?',
    },
    answer: {
      id: 'Biaya bervariasi menurut level, jumlah peserta, dan lokasi pelaksanaan. Paket pelatihan reguler kami mencakup instruktur, seluruh APD dan peralatan, penggunaan fasilitas latih, bahan ajar, biaya asesmen, dan penerbitan sertifikat. Biaya akomodasi dan transportasi tidak termasuk kecuali dinyatakan lain. Kirimkan kebutuhan Anda melalui WhatsApp dan kami balas dengan penawaran terperinci pada hari kerja yang sama.',
      en: 'Cost varies with level, group size, and delivery location. Our open-course package covers instructors, all PPE and equipment, use of the training facility, course materials, assessment fees, and certificate issuance. Accommodation and travel are not included unless stated otherwise. Send us your requirements on WhatsApp and we will return a detailed quotation the same working day.',
    },
  },
  {
    id: 'faq-onsite-training',
    group: 'training',
    order: 7,
    published: true,
    question: {
      id: 'Bisakah pelatihan dilaksanakan di lokasi perusahaan kami?',
      en: 'Can training be delivered at our own site?',
    },
    answer: {
      id: 'Bisa. Program in-house kami mencakup kunjungan awal untuk memetakan bahaya di lokasi Anda, penyusunan silabus yang mengacu pada aset dan prosedur Anda, serta pelaksanaan pelatihan di fasilitas Anda sendiri. Kami membawa seluruh APD dan, apabila diperlukan, struktur latih portabel. Setiap program in-house menghasilkan rencana penyelamatan spesifik lokasi yang telah diuji — dokumen yang bernilai tinggi saat audit klien.',
      en: 'Yes. Our in-house programme includes an initial visit to map the hazards on your site, a syllabus written around your assets and procedures, and delivery at your own facility. We bring all PPE and, where needed, a portable training structure. Every in-house programme produces a tested site-specific rescue plan — a document that carries real weight in client audits.',
    },
  },
  {
    id: 'faq-service-area',
    group: 'services',
    order: 8,
    published: true,
    question: {
      id: 'Wilayah mana saja yang dilayani RAC?',
      en: 'Which areas does RAC serve?',
    },
    answer: {
      id: 'Kami melayani seluruh wilayah Indonesia, dengan konsentrasi pekerjaan di Jawa, Sumatera, Kalimantan, dan Sulawesi — termasuk lokasi lepas pantai dan pulau terpencil. Tim kami terbiasa dengan persyaratan mobilisasi offshore seperti BOSIET, sertifikat medis MIGAS, dan induksi keselamatan operator.',
      en: 'We work throughout Indonesia, with the greatest concentration of work in Java, Sumatra, Kalimantan, and Sulawesi — including offshore and remote island locations. Our teams are familiar with offshore mobilisation requirements such as BOSIET, MIGAS medical certificates, and operator safety inductions.',
    },
  },
  {
    id: 'faq-response-time',
    group: 'services',
    order: 9,
    published: true,
    question: {
      id: 'Seberapa cepat tim dapat dimobilisasi untuk pekerjaan mendesak?',
      en: 'How quickly can a team mobilise for urgent work?',
    },
    answer: {
      id: 'Untuk lokasi di Jabodetabek, tim survei dapat berada di lokasi dalam 24 jam dan tim kerja dalam 48 hingga 72 jam, bergantung pada persyaratan izin kerja klien. Untuk lokasi luar Jawa dan lepas pantai, waktu mobilisasi umumnya 5 hingga 7 hari kerja karena proses induksi dan pengurusan dokumen. Untuk kebutuhan darurat, hubungi kami melalui WhatsApp — nomor kami dipantau di luar jam kerja.',
      en: 'For sites in Greater Jakarta, a survey team can be on site within 24 hours and a working team within 48 to 72 hours, subject to the client’s permit-to-work requirements. For locations outside Java and offshore, mobilisation is typically 5 to 7 working days because of induction and documentation. For emergencies, reach us on WhatsApp — that number is monitored outside office hours.',
    },
  },
  {
    id: 'faq-insurance',
    group: 'services',
    order: 10,
    published: true,
    question: {
      id: 'Apakah pekerjaan RAC diasuransikan?',
      en: 'Is RAC’s work insured?',
    },
    answer: {
      id: 'Ya. Seluruh personel tercakup asuransi kecelakaan kerja dan BPJS Ketenagakerjaan, dan kami memegang polis tanggung gugat publik (public liability) untuk pekerjaan yang kami laksanakan. Salinan sertifikat asuransi diserahkan bersama paket dokumen K3 sebelum mobilisasi, dan nilai pertanggungan dapat disesuaikan apabila kontrak Anda mensyaratkan batas tertentu.',
      en: 'Yes. All personnel are covered by workplace accident insurance and BPJS Ketenagakerjaan, and we carry public liability cover for the work we perform. Copies of the insurance certificates are provided with the HSE document pack before mobilisation, and cover limits can be adjusted where your contract requires a specific threshold.',
    },
  },
  {
    id: 'faq-safety-record',
    group: 'general',
    order: 11,
    published: true,
    question: {
      id: 'Bagaimana RAC menjaga catatan keselamatannya?',
      en: 'How does RAC maintain its safety record?',
    },
    answer: {
      id: 'Setiap pekerjaan dimulai dengan penilaian risiko dan rencana penyelamatan tertulis yang ditandatangani supervisor Level 3. Seluruh APD diperiksa sebelum digunakan setiap hari dan diinspeksi terperinci setiap enam bulan dengan riwayat tercatat. Kami menerapkan kewenangan stop-work bagi setiap personel, tanpa memandang jabatan, dan setiap nyaris-celaka (near miss) dicatat serta ditinjau — karena pola yang tidak dicatat tidak dapat diperbaiki.',
      en: 'Every job starts with a written risk assessment and rescue plan signed off by a Level 3 supervisor. All PPE is inspected before use each day and given a detailed six-monthly inspection with a recorded history. Every member of our personnel holds stop-work authority regardless of rank, and every near miss is logged and reviewed — because a pattern you do not record is a pattern you cannot fix.',
    },
  },
  {
    id: 'faq-payment',
    group: 'general',
    order: 12,
    published: true,
    question: {
      id: 'Bagaimana proses pemesanan dan pembayaran?',
      en: 'How do booking and payment work?',
    },
    answer: {
      id: 'Hubungi kami melalui WhatsApp, formulir kontak, atau telepon dengan menyebutkan kebutuhan Anda. Kami mengirim penawaran terperinci, umumnya pada hari kerja yang sama. Setelah penawaran disetujui, kursi pelatihan diamankan dengan uang muka, dan pelunasan dilakukan sebelum hari pertama. Untuk klien korporat, kami melayani pembayaran termin sesuai kontrak dan menerbitkan faktur pajak sesuai ketentuan yang berlaku.',
      en: 'Contact us on WhatsApp, through the contact form, or by phone with your requirements. We send a detailed quotation, usually the same working day. Once the quotation is accepted, training seats are secured with a deposit and the balance is settled before day one. For corporate clients we accept staged payment under contract and issue tax invoices in line with prevailing regulations.',
    },
  },
];
