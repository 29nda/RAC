import type { Course } from '../lib/types';

export const courses: Course[] = [
  {
    slug: 'irata-level-1',
    code: 'IRATA-L1',
    scheme: 'IRATA',
    level: 'Level 1',
    order: 1,
    featured: true,
    published: true,
    title: {
      id: 'IRATA Level 1 — Teknisi Akses Tali',
      en: 'IRATA Level 1 — Rope Access Technician',
    },
    summary: {
      id: 'Pintu masuk resmi ke industri akses tali. Enam hari membangun fondasi manuver tali, pemeriksaan alat, dan penyelamatan dasar — diakhiri asesmen independen IRATA.',
      en: 'The formal entry point into the rope access industry. Six days building rope manoeuvres, equipment inspection, and basic rescue — closing with an independent IRATA assessment.',
    },
    duration: { id: '5 hari pelatihan + 1 hari asesmen', en: '5 training days + 1 assessment day' },
    price: { id: 'Hubungi kami untuk penawaran', en: 'Contact us for pricing' },
    prerequisites: {
      id: [
        'Usia minimum 18 tahun',
        'Sehat jasmani, dibuktikan surat keterangan sehat untuk bekerja di ketinggian',
        'Tidak memiliki riwayat vertigo, epilepsi, atau gangguan jantung yang tidak terkontrol',
        'Tidak diperlukan pengalaman akses tali sebelumnya',
      ],
      en: [
        'Minimum age 18',
        'Medically fit for work at height, supported by a doctor’s statement',
        'No history of vertigo, epilepsy, or uncontrolled cardiac conditions',
        'No prior rope access experience required',
      ],
    },
    outcomes: {
      id: [
        'Naik, turun, dan berpindah tali dengan dua titik pengaman independen',
        'Melewati deviasi, sambungan tali, simpul, dan halangan tepi (edge transition)',
        'Memeriksa dan mendokumentasikan kelayakan APD serta perangkat keras',
        'Melakukan penyelamatan korban sederhana dari posisi menuruni tali',
        'Memahami hierarki pengendalian risiko dan sistem kerja aman IRATA ICOP',
      ],
      en: [
        'Ascend, descend, and change ropes on two independent points of attachment',
        'Negotiate deviations, rope-to-rope transfers, knots, and edge transitions',
        'Inspect and document the serviceability of PPE and hardware',
        'Perform a straightforward casualty rescue from a descent',
        'Apply the hierarchy of control and the IRATA ICOP safe system of work',
      ],
    },
    syllabus: [
      {
        title: { id: 'Hari 1 — Fondasi & Perangkat', en: 'Day 1 — Foundations & Equipment' },
        detail: {
          id: 'Kerangka regulasi, IRATA ICOP, anatomi sistem dua tali, pengenalan dan pemeriksaan prapakai seluruh APD, simpul kerja dasar.',
          en: 'Regulatory framework, the IRATA ICOP, anatomy of a twin-rope system, familiarisation and pre-use inspection of all PPE, core working knots.',
        },
      },
      {
        title: { id: 'Hari 2 — Manuver Inti', en: 'Day 2 — Core Manoeuvres' },
        detail: {
          id: 'Naik-turun terkontrol, perpindahan naik ke turun, deviasi kecil, dan manajemen tali kerja di bawah beban.',
          en: 'Controlled ascent and descent, changeovers, small deviations, and managing the working line under load.',
        },
      },
      {
        title: { id: 'Hari 3 — Manuver Lanjutan', en: 'Day 3 — Advanced Manoeuvres' },
        detail: {
          id: 'Perpindahan antar tali, melewati simpul di tengah bentang, transisi tepi, penggunaan tali tambat ulang (re-anchor).',
          en: 'Rope-to-rope transfers, passing mid-line knots, edge transitions, and working from re-anchors.',
        },
      },
      {
        title: { id: 'Hari 4 — Penyelamatan', en: 'Day 4 — Rescue' },
        detail: {
          id: 'Penyelamatan menuruni tali, penyelamatan dari posisi menaiki tali, penggunaan perangkat penyelamat, dan simulasi skenario nyata.',
          en: 'Descent rescues, rescues from ascent, use of dedicated rescue devices, and realistic scenario simulations.',
        },
      },
      {
        title: { id: 'Hari 5 — Konsolidasi', en: 'Day 5 — Consolidation' },
        detail: {
          id: 'Latihan terpadu berbasis skenario, peninjauan dokumentasi logbook, dan uji coba internal sebelum asesmen.',
          en: 'Integrated scenario practice, logbook documentation review, and an internal mock assessment.',
        },
      },
      {
        title: { id: 'Hari 6 — Asesmen IRATA', en: 'Day 6 — IRATA Assessment' },
        detail: {
          id: 'Asesmen oleh IRATA Assessor independen: teori tertulis, pemeriksaan alat, manuver, dan penyelamatan.',
          en: 'Assessment by an independent IRATA Assessor: written theory, equipment inspection, manoeuvres, and rescue.',
        },
      },
    ],
    certificate: {
      id: 'Kartu dan sertifikat IRATA Level 1, berlaku 3 tahun, terdaftar di basis data IRATA International.',
      en: 'IRATA Level 1 card and certificate, valid for 3 years, registered in the IRATA International database.',
    },
    image: '/brand/logo-onLight-720.webp',
    imageAlt: {
      id: 'Peserta pelatihan IRATA Level 1 berlatih manuver tali di menara latih RAC',
      en: 'IRATA Level 1 trainees practising rope manoeuvres on the RAC training tower',
    },
    body: {
      id: '<h2>Untuk siapa kursus ini</h2><p>Level 1 ditujukan bagi teknisi yang belum pernah bekerja dengan sistem akses tali, atau bagi personel darat — welder, inspektur, teknisi mekanik, fotografer industri — yang perlu menjangkau area kerja yang tidak dapat dicapai perancah.</p><p>Setelah lulus, Anda dapat bekerja di bawah pengawasan langsung seorang IRATA Level 3 di lokasi kerja mana pun yang menerapkan skema IRATA.</p><h2>Cara kami mengajar</h2><p>Rasio instruktur terhadap peserta kami jaga maksimum 1:6, jauh di bawah batas IRATA. Artinya setiap manuver Anda diamati, dikoreksi, dan diulang sampai benar — bukan sekadar dicontohkan sekali di depan kelas.</p><p>Seluruh APD disediakan RAC dan diperiksa ulang setiap pagi. Peserta hanya perlu membawa sepatu keselamatan dan pakaian kerja.</p>',
      en: '<h2>Who this course is for</h2><p>Level 1 is designed for technicians who have never worked on rope, and for ground-based specialists — welders, inspectors, mechanical fitters, industrial photographers — who need to reach work areas that scaffolding cannot serve.</p><p>On passing, you may work under the direct supervision of an IRATA Level 3 on any site operating to the IRATA scheme.</p><h2>How we teach</h2><p>We hold our instructor-to-trainee ratio at a maximum of 1:6, well below the IRATA ceiling. Every manoeuvre you make is watched, corrected, and repeated until it is right — not demonstrated once at the front of the room.</p><p>All PPE is supplied by RAC and re-inspected each morning. Trainees need only bring safety boots and work clothing.</p>',
    },
  },
  {
    slug: 'irata-level-2',
    code: 'IRATA-L2',
    scheme: 'IRATA',
    level: 'Level 2',
    order: 2,
    featured: true,
    published: true,
    title: {
      id: 'IRATA Level 2 — Teknisi Akses Tali Senior',
      en: 'IRATA Level 2 — Lead Rope Access Technician',
    },
    summary: {
      id: 'Melangkah dari operator menjadi pemasang sistem. Fokus pada rigging, penyelamatan kompleks, dan tanggung jawab terhadap keselamatan rekan satu tim.',
      en: 'Step up from operator to rigger. Focused on rigging, complex rescues, and taking responsibility for a teammate’s safety.',
    },
    duration: { id: '5 hari pelatihan + 1 hari asesmen', en: '5 training days + 1 assessment day' },
    price: { id: 'Hubungi kami untuk penawaran', en: 'Contact us for pricing' },
    prerequisites: {
      id: [
        'Memegang sertifikat IRATA Level 1 yang masih berlaku',
        'Minimum 1.000 jam kerja terdokumentasi dan minimum 12 bulan sejak sertifikasi Level 1',
        'Logbook IRATA yang lengkap dan ditandatangani Level 3',
      ],
      en: [
        'Hold a valid IRATA Level 1 certificate',
        'Minimum 1,000 logged working hours and at least 12 months since Level 1 certification',
        'A complete IRATA logbook countersigned by a Level 3',
      ],
    },
    outcomes: {
      id: [
        'Memasang dan menguji sistem tambat (anchor) sederhana hingga menengah',
        'Membangun sistem katrol mekanis untuk mengangkat dan menurunkan beban',
        'Melakukan penyelamatan dari sistem tambat ulang, deviasi, dan traverse',
        'Mengevaluasi risiko rigging dan mengomunikasikannya kepada tim',
        'Mendukung Level 3 dalam pengawasan lokasi kerja',
      ],
      en: [
        'Rig and prove simple to intermediate anchor systems',
        'Build mechanical advantage hauling systems to raise and lower loads',
        'Perform rescues from re-anchors, deviations, and traverse lines',
        'Assess rigging risk and communicate it clearly to the team',
        'Support a Level 3 in supervising a worksite',
      ],
    },
    syllabus: [
      {
        title: { id: 'Hari 1 — Peninjauan & Teori Rigging', en: 'Day 1 — Review & Rigging Theory' },
        detail: {
          id: 'Penyegaran manuver Level 1, teori pembebanan, sudut tambat, faktor keamanan, dan pemilihan titik tambat struktural.',
          en: 'Level 1 manoeuvre refresh, load theory, anchor angles, safety factors, and selecting structural anchor points.',
        },
      },
      {
        title: { id: 'Hari 2 — Sistem Tambat', en: 'Day 2 — Anchor Systems' },
        detail: {
          id: 'Y-hang, tambat ulang, deviasi besar, aid climbing horizontal dan vertikal, serta pengujian beban sistem.',
          en: 'Y-hangs, re-anchors, large deviations, horizontal and vertical aid climbing, and proof-loading systems.',
        },
      },
      {
        title: { id: 'Hari 3 — Katrol & Pengangkatan', en: 'Day 3 — Hauling & Lowering' },
        detail: {
          id: 'Sistem 3:1 dan 5:1, penambat progresif, transfer beban, dan pengangkatan menggunakan tripod atau davit.',
          en: '3:1 and 5:1 systems, progress capture, load transfer, and lifting with tripods or davit arms.',
        },
      },
      {
        title: { id: 'Hari 4 — Penyelamatan Kompleks', en: 'Day 4 — Complex Rescue' },
        detail: {
          id: 'Penyelamatan melewati tambat ulang dan deviasi, penyelamatan dari traverse, penggunaan tandu (stretcher).',
          en: 'Rescues past re-anchors and deviations, rescues from traverse lines, and stretcher handling.',
        },
      },
      {
        title: { id: 'Hari 5 — Konsolidasi', en: 'Day 5 — Consolidation' },
        detail: {
          id: 'Skenario terpadu dengan tekanan waktu, dokumentasi rencana penyelamatan, dan uji coba internal.',
          en: 'Time-pressured integrated scenarios, rescue plan documentation, and an internal mock assessment.',
        },
      },
      {
        title: { id: 'Hari 6 — Asesmen IRATA', en: 'Day 6 — IRATA Assessment' },
        detail: {
          id: 'Asesmen independen mencakup rigging, manuver, penyelamatan kompleks, dan teori tertulis.',
          en: 'Independent assessment covering rigging, manoeuvres, complex rescue, and written theory.',
        },
      },
    ],
    certificate: {
      id: 'Kartu dan sertifikat IRATA Level 2, berlaku 3 tahun, terdaftar di basis data IRATA International.',
      en: 'IRATA Level 2 card and certificate, valid for 3 years, registered in the IRATA International database.',
    },
    image: '/brand/logo-onLight-720.webp',
    imageAlt: {
      id: 'Instruktur RAC mendampingi peserta Level 2 memasang sistem tambat ulang',
      en: 'A RAC instructor guiding a Level 2 trainee rigging a re-anchor',
    },
    body: {
      id: '<h2>Lompatan terbesar dalam karier akses tali</h2><p>Perbedaan Level 1 dan Level 2 bukan soal jumlah manuver, melainkan soal tanggung jawab. Di Level 2 Anda memasang sistem yang akan menahan orang lain, dan Anda harus mampu menjelaskan mengapa sistem itu aman.</p><h2>Persiapan sebelum datang</h2><p>Pastikan logbook Anda sudah lengkap dan ditandatangani sebelum hari pertama — asesor IRATA akan memeriksanya, dan logbook yang tidak memenuhi syarat akan menggugurkan kepesertaan asesmen. Tim kami siap membantu meninjau logbook Anda lebih awal, tanpa biaya.</p>',
      en: '<h2>The biggest step in a rope access career</h2><p>What separates Level 1 from Level 2 is not the number of manoeuvres — it is responsibility. At Level 2 you rig systems that will hold someone else, and you must be able to explain why those systems are sound.</p><h2>Before you arrive</h2><p>Make sure your logbook is complete and countersigned before day one — the IRATA Assessor will inspect it, and an inadequate logbook will disqualify you from assessment. Our team will review your logbook in advance at no charge.</p>',
    },
  },
  {
    slug: 'irata-level-3',
    code: 'IRATA-L3',
    scheme: 'IRATA',
    level: 'Level 3',
    order: 3,
    featured: true,
    published: true,
    title: {
      id: 'IRATA Level 3 — Supervisor Akses Tali',
      en: 'IRATA Level 3 — Rope Access Supervisor',
    },
    summary: {
      id: 'Tingkat tertinggi skema IRATA. Anda bertanggung jawab penuh atas lokasi kerja, rencana penyelamatan, dan setiap orang yang tergantung di tali.',
      en: 'The top of the IRATA scheme. You carry full responsibility for the worksite, the rescue plan, and every person on rope.',
    },
    duration: { id: '5 hari pelatihan + 1 hari asesmen', en: '5 training days + 1 assessment day' },
    price: { id: 'Hubungi kami untuk penawaran', en: 'Contact us for pricing' },
    prerequisites: {
      id: [
        'Memegang sertifikat IRATA Level 2 yang masih berlaku',
        'Minimum 1.000 jam kerja terdokumentasi dan minimum 12 bulan sejak sertifikasi Level 2',
        'Sertifikat P3K yang masih berlaku',
      ],
      en: [
        'Hold a valid IRATA Level 2 certificate',
        'Minimum 1,000 logged working hours and at least 12 months since Level 2 certification',
        'A current first aid certificate',
      ],
    },
    outcomes: {
      id: [
        'Menyusun dan memimpin rencana kerja serta rencana penyelamatan lokasi',
        'Memasang sistem rigging kompleks termasuk highline dan sistem pengangkatan berat',
        'Mengawasi dan menilai kompetensi teknisi Level 1 dan 2 di lapangan',
        'Menyelenggarakan pemeriksaan APD terperinci dan mencatat riwayatnya',
        'Menjalankan tanggung jawab hukum dan administratif sesuai IRATA ICOP',
      ],
      en: [
        'Author and lead the site work plan and rescue plan',
        'Rig complex systems including highlines and heavy hauling arrangements',
        'Supervise and appraise the competence of Level 1 and 2 technicians on site',
        'Carry out detailed PPE inspections and maintain their records',
        'Discharge the legal and administrative duties set out in the IRATA ICOP',
      ],
    },
    syllabus: [
      {
        title: { id: 'Hari 1 — Tanggung Jawab Supervisor', en: 'Day 1 — Supervisor Responsibilities' },
        detail: {
          id: 'IRATA ICOP secara menyeluruh, kewajiban hukum K3, penyusunan risk assessment dan method statement (RAMS).',
          en: 'The IRATA ICOP in depth, statutory HSE duties, and writing risk assessments and method statements (RAMS).',
        },
      },
      {
        title: { id: 'Hari 2 — Rigging Kompleks', en: 'Day 2 — Complex Rigging' },
        detail: {
          id: 'Highline, tyrolean, sistem tegangan tinggi, perhitungan gaya resultan, dan pengujian sistem.',
          en: 'Highlines, tyroleans, high-tension systems, resultant force calculations, and system proving.',
        },
      },
      {
        title: { id: 'Hari 3 — Penyelamatan Tingkat Lanjut', en: 'Day 3 — Advanced Rescue' },
        detail: {
          id: 'Penyelamatan dari highline dan aid climbing, penyelamatan ganda, penanganan korban dengan tandu di ruang terbatas.',
          en: 'Rescues from highlines and aid climbs, two-casualty rescues, and stretcher handling in confined spaces.',
        },
      },
      {
        title: { id: 'Hari 4 — Manajemen & Inspeksi', en: 'Day 4 — Management & Inspection' },
        detail: {
          id: 'Inspeksi terperinci APD, sistem pencatatan, audit lokasi kerja, dan penilaian kompetensi tim.',
          en: 'Detailed PPE inspection, record systems, worksite auditing, and team competence appraisal.',
        },
      },
      {
        title: { id: 'Hari 5 — Konsolidasi', en: 'Day 5 — Consolidation' },
        detail: {
          id: 'Simulasi supervisi penuh: memimpin tim, mengelola insiden, dan mempertahankan keputusan teknis.',
          en: 'Full supervision simulation: leading a team, managing an incident, and defending technical decisions.',
        },
      },
      {
        title: { id: 'Hari 6 — Asesmen IRATA', en: 'Day 6 — IRATA Assessment' },
        detail: {
          id: 'Asesmen independen mencakup supervisi, rigging kompleks, penyelamatan lanjutan, dan teori tertulis.',
          en: 'Independent assessment covering supervision, complex rigging, advanced rescue, and written theory.',
        },
      },
    ],
    certificate: {
      id: 'Kartu dan sertifikat IRATA Level 3, berlaku 3 tahun, terdaftar di basis data IRATA International.',
      en: 'IRATA Level 3 card and certificate, valid for 3 years, registered in the IRATA International database.',
    },
    image: '/brand/logo-onLight-720.webp',
    imageAlt: {
      id: 'Supervisor akses tali memimpin pengarahan keselamatan sebelum pekerjaan dimulai',
      en: 'A rope access supervisor leading a safety briefing before work begins',
    },
    body: {
      id: '<h2>Di Level 3, keselamatan orang lain ada di tangan Anda</h2><p>Sebagai Level 3, Anda adalah orang yang menandatangani rencana penyelamatan dan yang dicari lebih dulu ketika terjadi insiden. Kursus ini menuntut lebih dari sekadar kemampuan teknis — Anda harus mampu mengambil keputusan di bawah tekanan dan mempertanggungjawabkannya.</p><h2>Setelah lulus</h2><p>Banyak lulusan Level 3 kami melanjutkan ke jalur instruktur atau menjadi HSE lead di proyek migas dan energi terbarukan. Kami membuka jalur pendampingan karier bagi alumni yang menempuh arah tersebut.</p>',
      en: '<h2>At Level 3, other people’s safety sits with you</h2><p>As a Level 3 you are the person who signs the rescue plan and the first person called when something goes wrong. This course asks for more than technical skill — you must make decisions under pressure and be able to defend them.</p><h2>After you qualify</h2><p>Many of our Level 3 graduates move on to the instructor pathway or become HSE leads on oil, gas, and renewable energy projects. We offer career mentoring to alumni taking that route.</p>',
    },
  },
  {
    slug: 'sertifikasi-bnsp-tkpk',
    code: 'BNSP-TKPK',
    scheme: 'BNSP',
    level: 'TKPK 1 & 2',
    order: 4,
    featured: true,
    published: true,
    title: {
      id: 'Sertifikasi BNSP — TKPK Tingkat 1 & 2',
      en: 'BNSP Certification — Working at Height (TKPK) Levels 1 & 2',
    },
    summary: {
      id: 'Sertifikasi kompetensi nasional untuk Tenaga Kerja pada Ketinggian, sesuai Permenaker No. 9 Tahun 2016 — syarat wajib banyak proyek di Indonesia.',
      en: 'The Indonesian national competency certification for work at height, aligned with Ministry of Manpower Regulation 9/2016 — a mandatory requirement on many domestic projects.',
    },
    duration: { id: '4 hari termasuk uji kompetensi', en: '4 days including the competency assessment' },
    price: { id: 'Hubungi kami untuk penawaran', en: 'Contact us for pricing' },
    prerequisites: {
      id: [
        'Usia minimum 18 tahun dan sehat jasmani',
        'Pendidikan minimal SMA/SMK atau sederajat',
        'Untuk Tingkat 2: pengalaman kerja di ketinggian minimal 1 tahun',
        'Kartu identitas dan pas foto terbaru',
      ],
      en: [
        'Minimum age 18 and medically fit',
        'Senior high school education or equivalent',
        'For Level 2: at least one year of documented work-at-height experience',
        'National ID and a recent photograph',
      ],
    },
    outcomes: {
      id: [
        'Menerapkan peraturan K3 ketinggian yang berlaku di Indonesia',
        'Memilih, memeriksa, dan menggunakan APD pencegah jatuh secara benar',
        'Memasang sistem pembatas gerak dan sistem penahan jatuh',
        'Melakukan pertolongan dan evakuasi korban di ketinggian',
        'Menyusun dokumen izin kerja (work permit) untuk pekerjaan ketinggian',
      ],
      en: [
        'Apply Indonesian work-at-height HSE regulations',
        'Select, inspect, and correctly use fall-protection PPE',
        'Install work restraint and fall arrest systems',
        'Deliver rescue and evacuation of a casualty at height',
        'Prepare work permits for work-at-height activities',
      ],
    },
    syllabus: [
      {
        title: { id: 'Hari 1 — Regulasi & Identifikasi Bahaya', en: 'Day 1 — Regulation & Hazard Identification' },
        detail: {
          id: 'Permenaker 9/2016, UU No. 1 Tahun 1970, identifikasi bahaya, penilaian risiko, dan hierarki pengendalian.',
          en: 'Regulation 9/2016, Act 1/1970, hazard identification, risk assessment, and the hierarchy of control.',
        },
      },
      {
        title: { id: 'Hari 2 — APD & Sistem Pencegah Jatuh', en: 'Day 2 — PPE & Fall Protection Systems' },
        detail: {
          id: 'Full body harness, lanyard penyerap energi, anchorage, sistem pembatas gerak, dan perhitungan jarak jatuh bebas.',
          en: 'Full body harnesses, energy-absorbing lanyards, anchorage, restraint systems, and fall clearance calculation.',
        },
      },
      {
        title: { id: 'Hari 3 — Praktik & Penyelamatan', en: 'Day 3 — Practical & Rescue' },
        detail: {
          id: 'Praktik naik-turun tangga vertikal, bekerja di platform, penyelamatan korban tergantung, dan penanganan suspension trauma.',
          en: 'Vertical ladder practice, platform work, rescue of a suspended casualty, and managing suspension trauma.',
        },
      },
      {
        title: { id: 'Hari 4 — Uji Kompetensi BNSP', en: 'Day 4 — BNSP Competency Assessment' },
        detail: {
          id: 'Uji tulis, uji lisan, dan uji praktik oleh asesor kompetensi berlisensi BNSP di TUK terverifikasi.',
          en: 'Written, oral, and practical assessment by a BNSP-licensed assessor at a verified assessment venue.',
        },
      },
    ],
    certificate: {
      id: 'Sertifikat Kompetensi BNSP dan kartu kompetensi, berlaku 3 tahun, terdaftar nasional.',
      en: 'BNSP Certificate of Competency and competency card, valid for 3 years, nationally registered.',
    },
    image: '/brand/logo-onLight-720.webp',
    imageAlt: {
      id: 'Peserta uji kompetensi BNSP mempraktikkan penyelamatan korban di ketinggian',
      en: 'BNSP assessment candidates practising rescue of a casualty at height',
    },
    body: {
      id: '<h2>IRATA atau BNSP — mana yang Anda butuhkan?</h2><p>Keduanya sah, tetapi menjawab kebutuhan berbeda. BNSP adalah sertifikasi kompetensi nasional yang diakui regulator Indonesia dan sering menjadi syarat administratif proyek pemerintah dan kontraktor lokal. IRATA adalah skema industri internasional yang berlaku lintas negara dan umumnya diminta operator migas multinasional.</p><p>Banyak teknisi kami memegang keduanya. Jika Anda ragu, kirim detail proyek Anda melalui WhatsApp dan kami bantu petakan sertifikasi yang tepat.</p>',
      en: '<h2>IRATA or BNSP — which one do you need?</h2><p>Both are legitimate, but they answer different needs. BNSP is the national competency certification recognised by Indonesian regulators and is frequently an administrative requirement on government projects and for local contractors. IRATA is an international industry scheme that travels across borders and is typically demanded by multinational oil and gas operators.</p><p>Many of our technicians hold both. If you are unsure, send us your project details on WhatsApp and we will map the right certification with you.</p>',
    },
  },
  {
    slug: 'refresher-revalidasi',
    code: 'REV-01',
    scheme: 'IRATA',
    level: 'Refresher',
    order: 5,
    featured: false,
    published: true,
    title: {
      id: 'Refresher & Revalidasi Sertifikat',
      en: 'Refresher & Revalidation',
    },
    summary: {
      id: 'Sertifikat mendekati masa berakhir, atau sudah lama tidak menyentuh tali? Program singkat untuk mengembalikan ketajaman sebelum asesmen ulang.',
      en: 'Certificate nearing expiry, or been off the ropes for a while? A short programme to sharpen you up before reassessment.',
    },
    duration: { id: '2–4 hari, disesuaikan dengan level', en: '2–4 days, depending on level' },
    price: { id: 'Hubungi kami untuk penawaran', en: 'Contact us for pricing' },
    prerequisites: {
      id: [
        'Memegang sertifikat IRATA yang masih berlaku atau baru saja kedaluwarsa (maksimum 6 bulan)',
        'Logbook untuk ditinjau bersama instruktur',
      ],
      en: [
        'Hold an IRATA certificate that is current or recently expired (within 6 months)',
        'A logbook available for review with the instructor',
      ],
    },
    outcomes: {
      id: [
        'Memulihkan kecepatan dan ketepatan seluruh manuver sesuai level',
        'Memperbarui pengetahuan atas revisi terbaru IRATA ICOP',
        'Mengidentifikasi dan memperbaiki kebiasaan kerja yang tidak aman',
        'Siap menghadapi asesmen ulang dengan percaya diri',
      ],
      en: [
        'Restore speed and precision across every manoeuvre at your level',
        'Update your knowledge of the latest IRATA ICOP revisions',
        'Identify and correct unsafe habits that have crept in',
        'Walk into reassessment with confidence',
      ],
    },
    syllabus: [
      {
        title: { id: 'Sesi 1 — Diagnostik', en: 'Session 1 — Diagnostic' },
        detail: {
          id: 'Instruktur mengamati seluruh manuver Anda dan menyusun daftar perbaikan khusus untuk Anda.',
          en: 'An instructor observes your full manoeuvre set and builds a personalised correction list.',
        },
      },
      {
        title: { id: 'Sesi 2 — Perbaikan Terarah', en: 'Session 2 — Targeted Correction' },
        detail: {
          id: 'Latihan intensif hanya pada area yang lemah, bukan pengulangan seluruh silabus.',
          en: 'Intensive drilling on weak areas only — not a rerun of the entire syllabus.',
        },
      },
      {
        title: { id: 'Sesi 3 — Simulasi Asesmen', en: 'Session 3 — Mock Assessment' },
        detail: {
          id: 'Uji coba dengan standar dan tekanan waktu asesor IRATA yang sesungguhnya.',
          en: 'A dry run held to the standard and time pressure of a real IRATA Assessor.',
        },
      },
    ],
    certificate: {
      id: 'Pernyataan kehadiran RAC. Sertifikat IRATA baru diterbitkan setelah asesmen ulang berhasil.',
      en: 'A RAC statement of attendance. A new IRATA certificate is issued after a successful reassessment.',
    },
    image: '/brand/logo-onLight-720.webp',
    imageAlt: {
      id: 'Teknisi berpengalaman menyegarkan keterampilan manuver tali',
      en: 'An experienced technician refreshing rope manoeuvre skills',
    },
    body: {
      id: '<h2>Jangan biarkan sertifikat Anda hangus</h2><p>Sertifikat IRATA berlaku tiga tahun. Jika lewat masa berlaku lebih dari enam bulan, Anda wajib mengulang dari level sebelumnya — kerugian waktu dan biaya yang mudah dihindari.</p><p>Kami mengirim pengingat gratis kepada seluruh alumni RAC 90 hari sebelum sertifikat berakhir. Pastikan nomor WhatsApp Anda terdaftar pada kami.</p>',
      en: '<h2>Do not let your certificate lapse</h2><p>An IRATA certificate is valid for three years. Once it has been expired for more than six months you must requalify from the level below — an avoidable loss of both time and money.</p><p>We send every RAC alumnus a free reminder 90 days before their certificate expires. Make sure we have your current WhatsApp number.</p>',
    },
  },
  {
    slug: 'pelatihan-in-house',
    code: 'INH-01',
    scheme: 'IN-HOUSE',
    level: 'Custom',
    order: 6,
    featured: false,
    published: true,
    title: {
      id: 'Pelatihan In-House & Korporat',
      en: 'In-House & Corporate Training',
    },
    summary: {
      id: 'Kami membawa menara latih, instruktur, dan seluruh APD ke fasilitas Anda — silabus disusun mengikuti risiko nyata di lokasi kerja Anda.',
      en: 'We bring the training structure, instructors, and all PPE to your facility — with a syllabus built around the real hazards on your site.',
    },
    duration: { id: 'Fleksibel, 1–10 hari', en: 'Flexible, 1–10 days' },
    price: { id: 'Penawaran khusus per program', en: 'Quoted per programme' },
    prerequisites: {
      id: [
        'Minimum 6 peserta per angkatan',
        'Area latih dengan struktur tambat yang memadai, atau kami sediakan menara portabel',
        'Surat keterangan sehat untuk setiap peserta',
      ],
      en: [
        'Minimum of 6 participants per cohort',
        'A training area with adequate anchor structure, or we supply a portable tower',
        'A medical fitness statement for each participant',
      ],
    },
    outcomes: {
      id: [
        'Kompetensi yang langsung relevan dengan aset dan prosedur perusahaan Anda',
        'Rencana penyelamatan spesifik lokasi yang teruji di lapangan',
        'Matriks kompetensi tim dan rekomendasi jenjang pelatihan lanjutan',
        'Dokumentasi lengkap untuk keperluan audit klien dan regulator',
      ],
      en: [
        'Competency that maps directly to your assets and procedures',
        'A site-specific rescue plan, tested on the ground',
        'A team competency matrix and a recommended progression path',
        'Complete documentation for client and regulator audits',
      ],
    },
    syllabus: [
      {
        title: { id: 'Tahap 1 — Kunjungan & Analisis', en: 'Stage 1 — Site Visit & Analysis' },
        detail: {
          id: 'Instruktur senior meninjau lokasi, memetakan bahaya, dan menyepakati sasaran pembelajaran bersama tim HSE Anda.',
          en: 'A senior instructor surveys the site, maps the hazards, and agrees learning objectives with your HSE team.',
        },
      },
      {
        title: { id: 'Tahap 2 — Penyusunan Silabus', en: 'Stage 2 — Syllabus Design' },
        detail: {
          id: 'Silabus, skenario penyelamatan, dan bahan ajar disusun mengacu pada aset dan SOP Anda.',
          en: 'Syllabus, rescue scenarios, and teaching materials written around your assets and SOPs.',
        },
      },
      {
        title: { id: 'Tahap 3 — Pelaksanaan', en: 'Stage 3 — Delivery' },
        detail: {
          id: 'Pelatihan di lokasi Anda, termasuk seluruh APD, struktur latih, dan dokumentasi foto-video.',
          en: 'Training at your location, including all PPE, training structures, and photo-video documentation.',
        },
      },
      {
        title: { id: 'Tahap 4 — Laporan & Tindak Lanjut', en: 'Stage 4 — Report & Follow-up' },
        detail: {
          id: 'Laporan kompetensi per individu, rekomendasi perbaikan sistem kerja, dan kunjungan tinjauan 6 bulan.',
          en: 'Per-individual competency report, recommendations to improve the safe system of work, and a six-month review visit.',
        },
      },
    ],
    certificate: {
      id: 'Sertifikat RAC, dan sertifikat IRATA atau BNSP apabila program disertai skema asesmen resmi.',
      en: 'A RAC certificate, plus IRATA or BNSP certification where the programme includes a formal assessment.',
    },
    image: '/brand/logo-onLight-720.webp',
    imageAlt: {
      id: 'Instruktur RAC melatih tim perusahaan di fasilitas milik klien',
      en: 'A RAC instructor training a company team at the client’s own facility',
    },
    body: {
      id: '<h2>Pelatihan yang tidak generik</h2><p>Pelatihan kelas terbuka mengajarkan prinsip. Pelatihan in-house mengajarkan prinsip itu pada struktur yang benar-benar dipanjat tim Anda setiap hari — di menara pendingin Anda, di tangki Anda, di dermaga Anda.</p><h2>Nilai tambah bagi HSE</h2><p>Setiap program in-house menghasilkan rencana penyelamatan spesifik lokasi yang sudah diuji, bukan dokumen templat. Dokumen ini kerap menjadi bukti kuat saat audit klien maupun inspeksi Disnaker.</p>',
      en: '<h2>Training that is not generic</h2><p>An open course teaches principles. In-house training teaches those principles on the structures your team actually climbs every day — your cooling tower, your tanks, your jetty.</p><h2>What HSE gets out of it</h2><p>Every in-house programme produces a tested, site-specific rescue plan rather than a template document. That evidence carries real weight in client audits and Ministry of Manpower inspections.</p>',
    },
  },
];
