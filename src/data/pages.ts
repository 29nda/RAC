import type { PageContent } from '../lib/types';

/**
 * Editorial copy per page. Everything here is overridable from the dashboard,
 * so marketing can rewrite a hero without touching a component.
 */
export const pages: Record<string, PageContent> = {
  home: {
    key: 'home',
    heroEyebrow: { id: 'Akses Aman. Standar Lebih Tinggi.', en: 'Safe Access. Higher Standard.' },
    heroTitle: {
      id: 'Kami Melatih.\nKami Menyertifikasi.\nKami Mengerjakan.',
      en: 'We Train.\nWe Certify.\nWe Deliver.',
    },
    heroSubtitle: {
      id: 'Pelatihan akses tali bersertifikat, sertifikasi kompetensi, dan layanan industri di ketinggian — untuk pekerjaan yang tidak memberi ruang bagi kesalahan.',
      en: 'Certified rope access training, competency certification, and industrial services at height — for work that leaves no room for error.',
    },
    metaTitle: {
      id: 'Pelatihan Akses Tali & Sertifikasi IRATA · Rope Access Center',
      en: 'Rope Access Training & IRATA Certification · Rope Access Center',
    },
    metaDescription: {
      id: 'Pusat pelatihan akses tali bersertifikat IRATA dan BNSP di Indonesia, sekaligus penyedia jasa inspeksi, perawatan, dan penyelamatan di ketinggian untuk industri berisiko tinggi.',
      en: 'An IRATA and BNSP certified rope access training centre in Indonesia, and a provider of inspection, maintenance, and rescue services at height for high-risk industry.',
    },
    blocks: {
      servicesEyebrow: { id: 'Apa yang Kami Kerjakan', en: 'What We Do' },
      servicesTitle: { id: 'Empat Pilar Layanan Kami', en: 'The Four Pillars of Our Work' },
      servicesIntro: {
        id: 'Satu disiplin, empat cara kami menerapkannya untuk klien di seluruh Indonesia.',
        en: 'One discipline, four ways we put it to work for clients across Indonesia.',
      },
      aboutEyebrow: { id: 'Tentang Kami', en: 'About Us' },
      aboutTitle: {
        id: 'Keselamatan Adalah Prioritas,\nKeunggulan Adalah Standar.',
        en: 'Safety Is the Priority,\nExcellence Is the Standard.',
      },
      aboutBody: {
        id: 'Rope Access Center adalah pusat pelatihan sekaligus penyedia jasa akses tali untuk industri berisiko tinggi. Sejak 2014 kami membangun kompetensi teknisi Indonesia dan mengerjakan proyek di ketinggian dengan satu prinsip yang tidak pernah kami tawar: setiap orang pulang dalam keadaan utuh.',
        en: 'Rope Access Center is both a training centre and a rope access service provider for high-risk industry. Since 2014 we have built the competence of Indonesian technicians and delivered work at height under a principle we have never traded away: everyone goes home whole.',
      },
      trustEyebrow: { id: 'Tersertifikasi & Diakui', en: 'Certified & Recognised' },
      trustTitle: { id: 'Kami Bekerja pada Standar Global', en: 'We Work to Global Standards' },
      testimonialEyebrow: { id: 'Kata Mereka', en: 'What They Say' },
      testimonialTitle: { id: 'Dipercaya oleh Para Profesional', en: 'Trusted by Professionals' },
      ctaTitle: {
        id: 'Mari Bangun Masa Depan\nyang Lebih Aman dan Lebih Kuat.',
        en: 'Let Us Build a Safer,\nStronger Future Together.',
      },
      ctaEyebrow: {
        id: 'Siap membawa tim Anda ke level berikutnya?',
        en: 'Ready to take your team to the next level?',
      },
    },
  },

  about: {
    key: 'about',
    heroEyebrow: { id: 'Tentang Kami', en: 'About Us' },
    heroTitle: {
      id: 'Sepuluh Tahun di Tali,\nSatu Standar yang Tidak Berubah',
      en: 'Ten Years on Rope,\nOne Standard That Has Not Moved',
    },
    heroSubtitle: {
      id: 'Kami dibangun oleh teknisi lapangan, untuk teknisi lapangan — dan untuk perusahaan yang menolak berkompromi soal keselamatan.',
      en: 'Built by field technicians, for field technicians — and for companies that refuse to compromise on safety.',
    },
    metaTitle: {
      id: 'Tentang Rope Access Center — Pusat Pelatihan Akses Tali Indonesia',
      en: 'About Rope Access Center — Indonesia’s Rope Access Training Centre',
    },
    metaDescription: {
      id: 'Profil Rope Access Center: sejarah, nilai, tim instruktur bersertifikat IRATA Level 3, dan pendekatan kami terhadap keselamatan kerja di ketinggian.',
      en: 'The Rope Access Center profile: our history, values, IRATA Level 3 certified instructor team, and our approach to safety at height.',
    },
    body: {
      id: '<h2>Bagaimana kami bermula</h2><p>RAC lahir pada 2014 dari keluhan yang berulang. Pendiri kami, saat itu supervisor akses tali di sebuah kilang, terus menerima teknisi baru yang memegang sertifikat tetapi tidak siap bekerja. Sertifikatnya sah; pelatihannya tergesa-gesa.</p><p>Kami memulai dengan satu menara latih dan tiga instruktur, dengan aturan yang sejak hari pertama tidak pernah dilonggarkan: kami tidak meluluskan orang yang belum siap, meskipun ia sudah membayar.</p><h2>Apa yang kami yakini</h2><h3>Keselamatan bukan slogan, melainkan keputusan berulang</h3><p>Keselamatan tidak diputuskan sekali dalam rapat kebijakan. Ia diputuskan setiap pagi ketika seseorang memilih memeriksa harness dengan teliti meskipun sedang terburu-buru. Kami melatih keputusan itu, bukan sekadar mengajarkan prosedurnya.</p><h3>Kompetensi harus dapat dibuktikan</h3><p>Kami memilih skema asesmen independen — IRATA dan BNSP — justru karena kami tidak menilai peserta kami sendiri. Penilaian dari pihak ketiga membuat sertifikat kami berarti di hadapan klien mana pun.</p><h3>Standar yang sama untuk pelatihan dan pekerjaan</h3><p>Tim jasa kami bekerja pada standar yang kami ajarkan di kelas. Jika kami mengajarkan pemeriksaan alat harian, tim proyek kami melakukannya — termasuk pada hari yang sibuk dan proyek yang tertinggal jadwal.</p><h2>Angka yang kami jaga</h2><p>Lebih dari 1.200 teknisi telah kami latih. Tingkat kelulusan asesmen pertama kami berada di kisaran 98 persen — angka yang kami capai dengan menolak meluluskan peserta yang belum siap menghadapi asesor, bukan dengan mempermudah pelatihan.</p><p>Lebih dari 250 proyek telah kami selesaikan, dari inspeksi flare stack hingga perawatan fasad gedung bertingkat.</p><h2>Ke mana kami menuju</h2><p>Industri akses tali Indonesia tumbuh lebih cepat daripada pasokan teknisi kompetennya. Fokus kami untuk lima tahun ke depan adalah memperluas kapasitas pelatihan ke luar Jawa — mendekatkan sertifikasi ke tempat pekerjaan itu berada, bukan sebaliknya.</p>',
      en: '<h2>How we began</h2><p>RAC was founded in 2014 out of a recurring frustration. Our founder, then a rope access supervisor at a refinery, kept receiving new technicians who held certificates but were not ready to work. The certificates were genuine; the training had been rushed.</p><p>We started with one training tower and three instructors, under a rule that has never been relaxed since day one: we do not pass someone who is not ready, no matter that they have already paid.</p><h2>What we believe</h2><h3>Safety is not a slogan — it is a repeated decision</h3><p>Safety is not settled once in a policy meeting. It is decided every morning when someone chooses to check a harness thoroughly despite being in a hurry. We train that decision, not merely the procedure around it.</p><h3>Competence must be provable</h3><p>We chose independent assessment schemes — IRATA and BNSP — precisely because we do not assess our own trainees. Third-party judgement is what makes our certificates mean something to any client.</p><h3>One standard for training and for work</h3><p>Our services teams work to the standard we teach in the classroom. If we teach daily equipment checks, our project teams perform them — including on busy days and on projects running behind schedule.</p><h2>The numbers we hold ourselves to</h2><p>We have trained more than 1,200 technicians. Our first-attempt assessment pass rate sits around 98 per cent — a figure we reach by refusing to send unready candidates to an assessor, not by making the training easier.</p><p>We have delivered more than 250 projects, from flare stack inspections to high-rise façade maintenance.</p><h2>Where we are heading</h2><p>Indonesia’s rope access industry is growing faster than its supply of competent technicians. Our focus for the next five years is expanding training capacity beyond Java — bringing certification closer to where the work is, rather than the other way around.</p>',
    },
  },

  training: {
    key: 'training',
    heroEyebrow: { id: 'Pelatihan', en: 'Training' },
    heroTitle: {
      id: 'Pelatihan yang Menyiapkan Anda\nuntuk Hari Kerja, Bukan Hanya Ujian',
      en: 'Training That Prepares You\nfor the Job, Not Just the Exam',
    },
    heroSubtitle: {
      id: 'Rasio instruktur maksimum 1 : 6, seluruh APD disediakan, dan asesmen oleh pihak independen. Dari nol pengalaman hingga supervisor.',
      en: 'A maximum 1 : 6 instructor ratio, all PPE supplied, and assessment by an independent body. From zero experience to supervisor.',
    },
    metaTitle: {
      id: 'Pelatihan Akses Tali IRATA & BNSP di Indonesia · RAC',
      en: 'IRATA & BNSP Rope Access Training in Indonesia · RAC',
    },
    metaDescription: {
      id: 'Program pelatihan akses tali RAC: IRATA Level 1, 2, 3, sertifikasi BNSP TKPK, refresher, dan pelatihan in-house di lokasi perusahaan Anda.',
      en: 'RAC rope access training programmes: IRATA Levels 1, 2, and 3, BNSP TKPK certification, refreshers, and in-house training at your own site.',
    },
    intro: {
      id: 'Setiap program di bawah ini mencakup instruktur, seluruh alat pelindung diri, penggunaan fasilitas latih, bahan ajar, dan biaya asesmen. Anda cukup membawa sepatu keselamatan.',
      en: 'Every programme below includes instructors, all personal protective equipment, use of the training facility, course materials, and assessment fees. You need only bring safety boots.',
    },
  },

  certification: {
    key: 'certification',
    heroEyebrow: { id: 'Sertifikasi', en: 'Certification' },
    heroTitle: {
      id: 'Sertifikat yang Dibaca\nSama di Mana Pun',
      en: 'Certificates That Read\nthe Same Way Everywhere',
    },
    heroSubtitle: {
      id: 'Kami tidak menilai peserta kami sendiri. Asesmen dilakukan pihak independen — itulah yang membuat sertifikat ini berarti.',
      en: 'We do not assess our own trainees. Assessment is independent — and that is what makes these certificates mean something.',
    },
    metaTitle: {
      id: 'Sertifikasi IRATA & BNSP untuk Akses Tali · Rope Access Center',
      en: 'IRATA & BNSP Rope Access Certification · Rope Access Center',
    },
    metaDescription: {
      id: 'Penjelasan skema sertifikasi akses tali: IRATA Level 1–3, BNSP TKPK, masa berlaku, persyaratan jam kerja, dan proses revalidasi.',
      en: 'How rope access certification works: IRATA Levels 1–3, BNSP TKPK, validity periods, logged-hour requirements, and the revalidation process.',
    },
    body: {
      id: '<h2>Mengapa asesmen independen penting</h2><p>Sebuah lembaga pelatihan yang menilai pesertanya sendiri menghadapi konflik kepentingan yang jelas: tingkat kelulusan tinggi baik untuk reputasi pemasaran. Skema IRATA dan BNSP memutus konflik itu dengan menempatkan asesor yang tidak terlibat dalam pelatihan.</p><p>Bagi Anda sebagai peserta, ini berarti sertifikat yang tidak dapat diragukan klien. Bagi kami, ini berarti satu-satunya cara meningkatkan tingkat kelulusan adalah dengan mengajar lebih baik.</p><h2>Skema IRATA International</h2><p>IRATA mengelola tiga tingkat kompetensi. <strong>Level 1</strong> bekerja di bawah pengawasan. <strong>Level 2</strong> memasang sistem tambat dan melakukan penyelamatan kompleks. <strong>Level 3</strong> memikul tanggung jawab penuh atas lokasi kerja, termasuk rencana penyelamatan dan pengawasan tim.</p><p>Setiap kenaikan level menuntut minimum 1.000 jam kerja tercatat dan minimum dua belas bulan sejak sertifikasi sebelumnya. Sertifikat berlaku tiga tahun.</p><h2>Skema BNSP</h2><p>Badan Nasional Sertifikasi Profesi menerbitkan sertifikat kompetensi melalui lembaga sertifikasi profesi berlisensi. Untuk pekerjaan ketinggian, skema yang relevan adalah TKPK — Tenaga Kerja pada Ketinggian — yang mengacu pada Permenaker No. 9 Tahun 2016.</p><p>Sertifikat BNSP berlaku tiga tahun dan diakui secara nasional, termasuk oleh pengawas ketenagakerjaan.</p><h2>Verifikasi sertifikat</h2><p>Seluruh sertifikat yang diterbitkan melalui RAC terdaftar pada basis data lembaga penerbitnya dan dapat diverifikasi langsung oleh calon pemberi kerja. Kami mendorong setiap klien untuk melakukan verifikasi itu — pada sertifikat kami maupun pada sertifikat penyedia mana pun.</p>',
      en: '<h2>Why independent assessment matters</h2><p>A training provider that assesses its own trainees faces an obvious conflict of interest: a high pass rate is good marketing. The IRATA and BNSP schemes break that conflict by placing an assessor who took no part in the training.</p><p>For you as a candidate, that means a certificate a client cannot reasonably question. For us, it means the only way to raise our pass rate is to teach better.</p><h2>The IRATA International scheme</h2><p>IRATA administers three competence grades. <strong>Level 1</strong> works under supervision. <strong>Level 2</strong> rigs anchor systems and performs complex rescues. <strong>Level 3</strong> carries full responsibility for the worksite, including the rescue plan and team supervision.</p><p>Each step up requires a minimum of 1,000 logged working hours and at least twelve months since the previous certification. Certificates are valid for three years.</p><h2>The BNSP scheme</h2><p>Indonesia’s National Professional Certification Agency issues competency certificates through licensed certification bodies. For work at height, the relevant scheme is TKPK — Tenaga Kerja pada Ketinggian — aligned with Ministry of Manpower Regulation 9/2016.</p><p>BNSP certificates are valid for three years and are recognised nationally, including by labour inspectors.</p><h2>Verifying a certificate</h2><p>Every certificate issued through RAC is registered in the issuing body’s database and can be verified directly by a prospective employer. We encourage every client to carry out that verification — on our certificates and on any provider’s.</p>',
    },
  },

  services: {
    key: 'services',
    heroEyebrow: { id: 'Layanan', en: 'Services' },
    heroTitle: {
      id: 'Pekerjaan di Ketinggian,\nDikerjakan dengan Benar',
      en: 'Work at Height,\nDone Properly',
    },
    heroSubtitle: {
      id: 'Inspeksi, perawatan, perbaikan, dan penyelamatan — tanpa perancah, tanpa menghentikan produksi, dengan dokumentasi yang lolos audit.',
      en: 'Inspection, maintenance, repair, and rescue — without scaffolding, without stopping production, with documentation that survives an audit.',
    },
    metaTitle: {
      id: 'Jasa Akses Tali Industri: Inspeksi, Perawatan & Rescue · RAC',
      en: 'Industrial Rope Access Services: Inspection, Maintenance & Rescue · RAC',
    },
    metaDescription: {
      id: 'Layanan akses tali RAC untuk industri: inspeksi NDT, perawatan dan perbaikan di ketinggian, perawatan fasad gedung, tim penyelamat siaga, audit K3, dan penyediaan teknisi.',
      en: 'RAC industrial rope access services: NDT inspection, maintenance and repair at height, façade services, standby rescue teams, HSE audits, and technician supply.',
    },
    intro: {
      id: 'Setiap penugasan dimulai dengan penilaian risiko tertulis dan rencana penyelamatan yang ditandatangani supervisor IRATA Level 3 — sebelum satu orang pun menyentuh tali.',
      en: 'Every deployment begins with a written risk assessment and a rescue plan signed by an IRATA Level 3 supervisor — before anyone touches a rope.',
    },
  },

  schedule: {
    key: 'schedule',
    heroEyebrow: { id: 'Jadwal Pelatihan', en: 'Training Schedule' },
    heroTitle: { id: 'Kelas Terbuka\nBerikutnya', en: 'Next Open\nCourses' },
    heroSubtitle: {
      id: 'Kelas reguler dibuka setiap bulan. Untuk enam peserta atau lebih, kami dapat membuka angkatan khusus pada tanggal yang Anda tentukan.',
      en: 'Open courses run monthly. For six participants or more, we can open a dedicated cohort on dates you choose.',
    },
    metaTitle: {
      id: 'Jadwal Pelatihan Akses Tali IRATA & BNSP · RAC',
      en: 'IRATA & BNSP Rope Access Training Schedule · RAC',
    },
    metaDescription: {
      id: 'Jadwal kelas terbuka pelatihan akses tali IRATA Level 1, 2, 3, dan sertifikasi BNSP TKPK, lengkap dengan lokasi dan sisa kuota.',
      en: 'Open course dates for IRATA Level 1, 2, and 3 rope access training and BNSP TKPK certification, with locations and remaining seats.',
    },
  },

  blog: {
    key: 'blog',
    heroEyebrow: { id: 'Artikel', en: 'Insights' },
    heroTitle: { id: 'Catatan dari\nLapangan', en: 'Notes from\nthe Field' },
    heroSubtitle: {
      id: 'Tulisan praktis tentang keselamatan, sertifikasi, peralatan, dan karier di industri akses tali — ditulis oleh instruktur dan teknisi kami sendiri.',
      en: 'Practical writing on safety, certification, equipment, and careers in rope access — written by our own instructors and technicians.',
    },
    metaTitle: {
      id: 'Artikel Akses Tali: Keselamatan, Sertifikasi & Karier · RAC',
      en: 'Rope Access Insights: Safety, Certification & Careers · RAC',
    },
    metaDescription: {
      id: 'Artikel dan panduan praktis seputar akses tali industri: pemilihan sertifikasi, inspeksi APD, rencana penyelamatan, dan jalur karier teknisi.',
      en: 'Articles and practical guides on industrial rope access: choosing a certification, PPE inspection, rescue planning, and technician career paths.',
    },
  },

  faq: {
    key: 'faq',
    heroEyebrow: { id: 'FAQ', en: 'FAQ' },
    heroTitle: { id: 'Pertanyaan yang\nSering Diajukan', en: 'Frequently Asked\nQuestions' },
    heroSubtitle: {
      id: 'Jawaban langsung atas pertanyaan yang paling sering sampai ke meja kami. Tidak menemukan jawaban Anda? Kirim pesan WhatsApp — kami balas di hari kerja yang sama.',
      en: 'Direct answers to the questions that reach our desk most often. Not finding yours? Send a WhatsApp message — we reply the same working day.',
    },
    metaTitle: {
      id: 'FAQ Pelatihan & Jasa Akses Tali · Rope Access Center',
      en: 'Rope Access Training & Services FAQ · Rope Access Center',
    },
    metaDescription: {
      id: 'Jawaban atas pertanyaan umum tentang pelatihan akses tali, perbedaan IRATA dan BNSP, biaya, masa berlaku sertifikat, dan jasa industri RAC.',
      en: 'Answers to common questions about rope access training, the difference between IRATA and BNSP, cost, certificate validity, and RAC industrial services.',
    },
  },

  contact: {
    key: 'contact',
    heroEyebrow: { id: 'Kontak', en: 'Contact' },
    heroTitle: { id: 'Mari Bicara\nTentang Pekerjaan Anda', en: 'Let Us Talk\nAbout Your Work' },
    heroSubtitle: {
      id: 'Ceritakan kebutuhan Anda — jenis pekerjaan, lokasi, dan target waktu. Kami balas dengan penawaran terperinci, umumnya pada hari kerja yang sama.',
      en: 'Tell us what you need — the work, the location, and your target dates. We reply with a detailed quotation, usually the same working day.',
    },
    metaTitle: {
      id: 'Hubungi Rope Access Center — Konsultasi & Penawaran',
      en: 'Contact Rope Access Center — Consultation & Quotations',
    },
    metaDescription: {
      id: 'Hubungi Rope Access Center melalui WhatsApp, telepon, atau formulir untuk konsultasi pelatihan akses tali dan penawaran jasa industri di ketinggian.',
      en: 'Contact Rope Access Center by WhatsApp, phone, or form for rope access training advice and quotations for industrial work at height.',
    },
  },

  privacy: {
    key: 'privacy',
    heroEyebrow: { id: 'Legal', en: 'Legal' },
    heroTitle: { id: 'Kebijakan Privasi', en: 'Privacy Policy' },
    metaTitle: { id: 'Kebijakan Privasi · Rope Access Center', en: 'Privacy Policy · Rope Access Center' },
    metaDescription: {
      id: 'Bagaimana Rope Access Center mengumpulkan, menggunakan, dan melindungi data pribadi pengunjung situs, peserta pelatihan, dan klien.',
      en: 'How Rope Access Center collects, uses, and protects the personal data of site visitors, trainees, and clients.',
    },
    body: {
      id: '<p><em>Terakhir diperbarui: 1 Agustus 2026</em></p><h2>Data yang kami kumpulkan</h2><p>Kami mengumpulkan data yang Anda kirimkan secara sukarela melalui formulir kontak: nama, alamat e-mail, nomor telepon, nama perusahaan, dan isi pesan. Kami juga mencatat data teknis terbatas berupa alamat IP dan jenis peramban untuk keperluan keamanan dan pencegahan penyalahgunaan.</p><p>Situs ini tidak menggunakan cookie pelacakan pihak ketiga dan tidak menjalankan skrip periklanan.</p><h2>Bagaimana kami menggunakannya</h2><p>Data Anda digunakan semata-mata untuk menjawab pertanyaan, menyusun penawaran, mengelola pendaftaran pelatihan, dan memenuhi kewajiban administratif terkait sertifikasi. Kami tidak menjual, menyewakan, atau membagikan data Anda kepada pihak ketiga untuk tujuan pemasaran.</p><h2>Data peserta pelatihan</h2><p>Untuk keperluan sertifikasi, kami wajib membagikan sebagian data peserta — nama, tanggal lahir, dan nomor identitas — kepada lembaga sertifikasi terkait seperti IRATA International atau lembaga sertifikasi profesi berlisensi BNSP. Pembagian ini merupakan syarat penerbitan sertifikat.</p><h2>Berapa lama kami menyimpannya</h2><p>Data pertanyaan umum disimpan maksimum 24 bulan. Data peserta pelatihan dan sertifikasi disimpan selama masa berlaku sertifikat ditambah lima tahun, sesuai persyaratan audit lembaga sertifikasi.</p><h2>Keamanan</h2><p>Situs ini dilayani sepenuhnya melalui koneksi terenkripsi. Akses ke data yang masuk dibatasi pada personel yang membutuhkannya, dilindungi autentikasi, dan dicatat aktivitasnya.</p><h2>Hak Anda</h2><p>Anda berhak meminta salinan data pribadi Anda, meminta koreksi atas data yang tidak akurat, dan meminta penghapusan data yang tidak lagi kami perlukan secara hukum. Kirim permintaan tersebut ke alamat e-mail kami dan kami tanggapi dalam 14 hari kerja.</p><h2>Perubahan kebijakan</h2><p>Perubahan atas kebijakan ini akan diumumkan pada halaman ini beserta tanggal pembaruannya.</p>',
      en: '<p><em>Last updated: 1 August 2026</em></p><h2>Data we collect</h2><p>We collect the data you submit voluntarily through our contact forms: name, e-mail address, telephone number, company name, and the content of your message. We also record limited technical data — IP address and browser type — for security and abuse prevention.</p><p>This site uses no third-party tracking cookies and runs no advertising scripts.</p><h2>How we use it</h2><p>Your data is used solely to answer enquiries, prepare quotations, administer training registrations, and meet the administrative obligations attached to certification. We do not sell, rent, or share your data with third parties for marketing purposes.</p><h2>Trainee data</h2><p>For certification purposes we are required to share certain trainee data — name, date of birth, and identity number — with the relevant certification bodies such as IRATA International or a BNSP-licensed certification body. This sharing is a condition of certificate issuance.</p><h2>How long we keep it</h2><p>General enquiry data is retained for a maximum of 24 months. Trainee and certification data is retained for the validity period of the certificate plus five years, in line with certification body audit requirements.</p><h2>Security</h2><p>This site is served entirely over encrypted connections. Access to submitted data is restricted to personnel who need it, protected by authentication, and logged.</p><h2>Your rights</h2><p>You may request a copy of your personal data, request correction of inaccurate data, and request deletion of data we no longer have a legal need to hold. Send such requests to our e-mail address and we will respond within 14 working days.</p><h2>Changes to this policy</h2><p>Any changes to this policy will be published on this page together with the revision date.</p>',
    },
  },

  terms: {
    key: 'terms',
    heroEyebrow: { id: 'Legal', en: 'Legal' },
    heroTitle: { id: 'Syarat & Ketentuan', en: 'Terms & Conditions' },
    metaTitle: { id: 'Syarat & Ketentuan · Rope Access Center', en: 'Terms & Conditions · Rope Access Center' },
    metaDescription: {
      id: 'Syarat dan ketentuan penggunaan situs, pendaftaran pelatihan, pembatalan, dan pelaksanaan jasa Rope Access Center.',
      en: 'Terms and conditions for use of this site, training registration, cancellation, and the delivery of Rope Access Center services.',
    },
    body: {
      id: '<p><em>Terakhir diperbarui: 1 Agustus 2026</em></p><h2>Penggunaan situs</h2><p>Informasi pada situs ini disediakan untuk keperluan umum. Kami berupaya menjaga keakuratannya, namun informasi mengenai regulasi, persyaratan sertifikasi, dan standar industri dapat berubah. Untuk keputusan yang mengikat, mohon konfirmasi langsung kepada kami.</p><h2>Pendaftaran pelatihan</h2><p>Kursi pelatihan diamankan setelah uang muka diterima. Pelunasan dilakukan selambat-lambatnya sebelum hari pertama pelatihan. Peserta wajib memenuhi seluruh prasyarat yang tercantum pada deskripsi program, termasuk persyaratan kesehatan dan, untuk level lanjutan, jam kerja tercatat yang memadai.</p><h2>Pembatalan dan penjadwalan ulang</h2><p>Pembatalan lebih dari 14 hari sebelum tanggal mulai: uang muka dapat dialihkan penuh ke angkatan berikutnya. Pembatalan 7 sampai 14 hari sebelum tanggal mulai: dikenakan biaya administrasi. Pembatalan kurang dari 7 hari atau ketidakhadiran tanpa pemberitahuan: uang muka tidak dapat dikembalikan atau dialihkan.</p><p>RAC berhak menunda atau menjadwalkan ulang kelas apabila jumlah peserta minimum tidak tercapai, atau karena keadaan di luar kendali kami. Dalam hal ini, peserta dapat memilih penjadwalan ulang tanpa biaya atau pengembalian penuh.</p><h2>Asesmen dan sertifikasi</h2><p>Asesmen dilaksanakan oleh pihak independen. RAC tidak dapat menjamin kelulusan peserta. Apabila peserta tidak lulus, biaya asesmen ulang mengikuti ketentuan lembaga sertifikasi yang berlaku.</p><h2>Pelaksanaan jasa</h2><p>Ruang lingkup, jadwal, dan harga pekerjaan ditetapkan dalam penawaran tertulis yang telah disetujui kedua pihak. Perubahan ruang lingkup di lapangan memerlukan persetujuan tertulis sebelum dilaksanakan.</p><p>Klien bertanggung jawab menyediakan akses lokasi, izin kerja, dan informasi bahaya yang relevan. RAC berhak menghentikan pekerjaan apabila kondisi lokasi tidak memenuhi standar keselamatan yang disepakati.</p><h2>Tanggung jawab</h2><p>RAC memelihara asuransi kecelakaan kerja bagi seluruh personel dan polis tanggung gugat publik untuk pekerjaan yang dilaksanakan. Salinan sertifikat asuransi tersedia atas permintaan.</p><h2>Hak kekayaan intelektual</h2><p>Seluruh materi pelatihan, dokumen, logo, dan konten situs merupakan milik Rope Access Center dan tidak boleh digandakan tanpa izin tertulis.</p><h2>Hukum yang berlaku</h2><p>Syarat dan ketentuan ini tunduk pada hukum Republik Indonesia.</p>',
      en: '<p><em>Last updated: 1 August 2026</em></p><h2>Use of this site</h2><p>Information on this site is provided for general purposes. We work to keep it accurate, but information about regulation, certification requirements, and industry standards can change. For binding decisions, please confirm directly with us.</p><h2>Training registration</h2><p>Training seats are secured once a deposit is received. The balance is payable no later than before the first day of training. Participants must meet every prerequisite stated in the programme description, including medical requirements and, for advanced levels, sufficient logged working hours.</p><h2>Cancellation and rescheduling</h2><p>Cancellation more than 14 days before the start date: the deposit transfers in full to a later cohort. Cancellation 7 to 14 days before the start date: an administration fee applies. Cancellation within 7 days, or non-attendance without notice: the deposit is neither refundable nor transferable.</p><p>RAC may postpone or reschedule a course if the minimum participant number is not met, or because of circumstances beyond our control. In that event, participants may choose rescheduling at no cost or a full refund.</p><h2>Assessment and certification</h2><p>Assessment is carried out by an independent body. RAC cannot guarantee that a participant will pass. Where a participant is unsuccessful, reassessment fees follow the prevailing rules of the certification body.</p><h2>Service delivery</h2><p>Scope, schedule, and price are set out in a written quotation agreed by both parties. Changes of scope on site require written agreement before being carried out.</p><p>The client is responsible for providing site access, work permits, and relevant hazard information. RAC may stop work where site conditions do not meet the agreed safety standard.</p><h2>Liability</h2><p>RAC maintains workplace accident insurance for all personnel and public liability cover for the work performed. Copies of insurance certificates are available on request.</p><h2>Intellectual property</h2><p>All training materials, documents, logos, and site content are the property of Rope Access Center and may not be reproduced without written permission.</p><h2>Governing law</h2><p>These terms are governed by the laws of the Republic of Indonesia.</p>',
    },
  },
};
