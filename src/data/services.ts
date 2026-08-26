import type { Service } from '../lib/types';

export const services: Service[] = [
  {
    slug: 'inspeksi-ndt',
    icon: 'search',
    order: 1,
    featured: true,
    published: true,
    title: {
      id: 'Inspeksi & Pengujian Tak Merusak (NDT)',
      en: 'Inspection & Non-Destructive Testing (NDT)',
    },
    summary: {
      id: 'Teknisi bersertifikat ganda — akses tali dan NDT — menjangkau titik inspeksi tanpa perancah, tanpa crane, dan tanpa menghentikan produksi.',
      en: 'Dual-certified technicians — rope access and NDT — reach inspection points without scaffolding, without cranes, and without stopping production.',
    },
    scope: {
      id: [
        'Pengukuran ketebalan ultrasonik (UT) pada bejana tekan, tangki, dan perpipaan',
        'Inspeksi visual jarak dekat (CVI) struktur baja dan sambungan las',
        'Magnetic Particle Inspection (MPI) dan Dye Penetrant Testing (PT)',
        'Pemetaan korosi dan penilaian sisa umur pakai aset',
        'Dokumentasi foto dan video resolusi tinggi per titik inspeksi',
      ],
      en: [
        'Ultrasonic thickness measurement (UT) on pressure vessels, tanks, and pipework',
        'Close visual inspection (CVI) of steel structures and welded joints',
        'Magnetic particle inspection (MPI) and dye penetrant testing (PT)',
        'Corrosion mapping and remaining-life assessment',
        'High-resolution photo and video documentation at every inspection point',
      ],
    },
    industries: {
      id: ['Minyak & Gas', 'Petrokimia', 'Pembangkit Listrik', 'Pelabuhan & Maritim', 'Pertambangan'],
      en: ['Oil & Gas', 'Petrochemical', 'Power Generation', 'Ports & Maritime', 'Mining'],
    },
    deliverables: {
      id: [
        'Laporan inspeksi bertanda tangan inspektor bersertifikat',
        'Data mentah pengukuran dalam format yang dapat diaudit',
        'Rekomendasi tindakan perbaikan dengan skala prioritas',
        'Berkas foto-video terindeks per lokasi',
      ],
      en: [
        'An inspection report signed by a certified inspector',
        'Raw measurement data in an auditable format',
        'Prioritised remedial action recommendations',
        'An indexed photo and video record per location',
      ],
    },
    image: '/brand/logo-onLight-720.webp',
    imageAlt: {
      id: 'Teknisi akses tali melakukan pengukuran ketebalan ultrasonik pada dinding tangki',
      en: 'A rope access technician taking ultrasonic thickness readings on a tank wall',
    },
    body: {
      id: '<h2>Mengapa akses tali untuk inspeksi</h2><p>Membangun perancah pada satu flare stack dapat memakan waktu dua minggu dan menghentikan sebagian operasi. Tim akses tali kami tiba pagi hari, memasang sistem dalam hitungan jam, dan menyerahkan data pada hari yang sama.</p><p>Perbedaannya bukan hanya kecepatan. Setiap jam perancah berdiri adalah jam paparan risiko tambahan bagi pekerja lain di sekitarnya.</p><h2>Kompetensi ganda, bukan dua tim</h2><p>Kami tidak menurunkan teknisi tali untuk menggendong inspektor. Personel kami memegang sertifikat IRATA sekaligus kualifikasi NDT Level II — orang yang menggantung di tali adalah orang yang membaca alat.</p>',
      en: '<h2>Why rope access for inspection</h2><p>Scaffolding a single flare stack can take two weeks and shut down part of your operation. Our rope access team arrives in the morning, rigs in a matter of hours, and hands over data the same day.</p><p>Speed is not the only difference. Every hour scaffolding stands is another hour of exposure for everyone else working around it.</p><h2>Dual competence, not two teams</h2><p>We do not send rope technicians to carry an inspector. Our personnel hold IRATA certification alongside NDT Level II qualifications — the person hanging on the rope is the person reading the instrument.</p>',
    },
  },
  {
    slug: 'perawatan-perbaikan',
    icon: 'wrench',
    order: 2,
    featured: true,
    published: true,
    title: {
      id: 'Perawatan & Perbaikan di Ketinggian',
      en: 'Maintenance & Repair at Height',
    },
    summary: {
      id: 'Pengecatan, blasting, pengelasan, penggantian komponen, dan perbaikan struktur — dikerjakan pada posisi menggantung dengan kendali mutu penuh.',
      en: 'Painting, blasting, welding, component replacement, and structural repair — delivered on rope with full quality control.',
    },
    scope: {
      id: [
        'Persiapan permukaan dan pengecatan ulang struktur baja',
        'Blasting terkendali dan aplikasi pelapis pelindung',
        'Pengelasan dan perbaikan struktural bersertifikat',
        'Penggantian anoda, klem, dan komponen mekanis',
        'Perbaikan beton, penambalan retak, dan injeksi',
      ],
      en: [
        'Surface preparation and recoating of steel structures',
        'Contained blasting and protective coating application',
        'Certified welding and structural repair',
        'Replacement of anodes, clamps, and mechanical components',
        'Concrete repair, crack stitching, and injection',
      ],
    },
    industries: {
      id: ['Minyak & Gas Lepas Pantai', 'Industri Berat', 'Jembatan & Infrastruktur', 'Telekomunikasi'],
      en: ['Offshore Oil & Gas', 'Heavy Industry', 'Bridges & Infrastructure', 'Telecommunications'],
    },
    deliverables: {
      id: [
        'Laporan harian pekerjaan dengan bukti foto sebelum dan sesudah',
        'Catatan kendali mutu pelapisan (DFT, adhesi, kondisi lingkungan)',
        'Sertifikat material dan prosedur pengelasan',
        'Serah terima pekerjaan lengkap dengan daftar simak',
      ],
      en: [
        'Daily work reports with before-and-after photographic evidence',
        'Coating QC records (DFT, adhesion, environmental conditions)',
        'Material certificates and welding procedure records',
        'Handover with a completed checklist',
      ],
    },
    image: '/brand/logo-onLight-720.webp',
    imageAlt: {
      id: 'Teknisi mengecat ulang struktur baja dari posisi menggantung di tali',
      en: 'A technician recoating a steel structure while suspended on rope',
    },
    body: {
      id: '<h2>Mutu tidak berkurang karena posisi</h2><p>Kekhawatiran paling umum terhadap pekerjaan akses tali adalah mutu. Jawaban kami sederhana: prosedur kendali mutu yang sama berlaku, apakah teknisi berdiri di perancah atau tergantung di tali. DFT diukur, adhesi diuji, kondisi lingkungan dicatat.</p><h2>Pengendalian tumpahan dan sisa material</h2><p>Kami memasang sistem penampung untuk blasting dan pengecatan sehingga limbah tidak jatuh ke area produksi, laut, atau lingkungan sekitar — persyaratan yang semakin ketat pada proyek dengan standar lingkungan internasional.</p>',
      en: '<h2>Position does not lower the standard</h2><p>The most common concern about rope access work is quality. Our answer is simple: the same QC procedures apply whether a technician is standing on a scaffold or hanging on a rope. DFT is measured, adhesion is tested, ambient conditions are logged.</p><h2>Containment and waste control</h2><p>We rig containment systems for blasting and coating so that debris does not fall into production areas, into the sea, or onto the surrounding environment — an increasingly firm requirement on projects held to international environmental standards.</p>',
    },
  },
  {
    slug: 'perawatan-gedung-fasad',
    icon: 'building',
    order: 3,
    featured: true,
    published: true,
    title: {
      id: 'Perawatan Gedung & Fasad',
      en: 'Building & Façade Services',
    },
    summary: {
      id: 'Pembersihan kaca, perawatan fasad, penggantian sealant, dan inspeksi selubung bangunan untuk gedung bertingkat tinggi.',
      en: 'Glass cleaning, façade maintenance, sealant replacement, and building envelope inspection for high-rise property.',
    },
    scope: {
      id: [
        'Pembersihan kaca dan panel fasad berkala',
        'Penggantian sealant dan perbaikan sambungan curtain wall',
        'Inspeksi selubung bangunan dan deteksi kebocoran',
        'Pemasangan dan perawatan signage ketinggian',
        'Pembersihan dan pengecatan ulang permukaan beton ekspos',
      ],
      en: [
        'Scheduled glass and façade panel cleaning',
        'Sealant replacement and curtain wall joint repair',
        'Building envelope inspection and leak detection',
        'Installation and maintenance of high-level signage',
        'Cleaning and recoating of exposed concrete surfaces',
      ],
    },
    industries: {
      id: ['Properti Komersial', 'Hotel & Perhotelan', 'Rumah Sakit', 'Apartemen & Kondominium'],
      en: ['Commercial Property', 'Hotels & Hospitality', 'Hospitals', 'Apartments & Condominiums'],
    },
    deliverables: {
      id: [
        'Jadwal perawatan tahunan yang dapat diprediksi anggarannya',
        'Laporan kondisi fasad dengan penandaan titik kerusakan',
        'Sertifikat asuransi dan dokumen K3 untuk manajemen gedung',
        'Koordinasi jadwal agar tidak mengganggu penghuni',
      ],
      en: [
        'An annual maintenance schedule you can budget against',
        'A façade condition report with defects marked up by location',
        'Insurance certificates and HSE documentation for building management',
        'Schedule coordination that keeps disruption to tenants minimal',
      ],
    },
    image: '/brand/logo-onLight-720.webp',
    imageAlt: {
      id: 'Teknisi membersihkan kaca fasad gedung bertingkat dari sistem akses tali',
      en: 'A technician cleaning high-rise façade glass from a rope access system',
    },
    body: {
      id: '<h2>Untuk pengelola gedung</h2><p>Gondola membutuhkan perawatan, sertifikasi, dan operator terlatih. Ketika gondola sedang tidak laik atau jangkauannya terbatas oleh bentuk bangunan, akses tali menjadi solusi yang jauh lebih lincah dan hemat.</p><h2>Kepatuhan yang lengkap</h2><p>Kami menyerahkan paket dokumen K3 lengkap sebelum mobilisasi: rencana kerja, penilaian risiko, rencana penyelamatan, sertifikat kompetensi personel, dan bukti asuransi. Manajemen gedung Anda cukup mengarsipkannya.</p>',
      en: '<h2>For building managers</h2><p>A gondola needs servicing, certification, and trained operators. When the gondola is out of service — or the building geometry puts areas beyond its reach — rope access is the far more agile and economical answer.</p><h2>Compliance, complete</h2><p>We hand over a full HSE document pack before mobilisation: work plan, risk assessment, rescue plan, personnel competency certificates, and proof of insurance. Your building management simply files it.</p>',
    },
  },
  {
    slug: 'penyelamatan-standby-rescue',
    icon: 'lifebuoy',
    order: 4,
    featured: true,
    published: true,
    title: {
      id: 'Tim Penyelamat Siaga (Standby Rescue)',
      en: 'Standby Rescue Teams',
    },
    summary: {
      id: 'Tim penyelamat bersertifikat siaga di lokasi selama pekerjaan berisiko tinggi — ketinggian, ruang terbatas, dan shutdown besar.',
      en: 'Certified rescue teams on station for the duration of high-risk work — at height, in confined spaces, and through major shutdowns.',
    },
    scope: {
      id: [
        'Penyelamatan ketinggian dan penyelamatan di ruang terbatas',
        'Penyusunan dan pengujian rencana penyelamatan spesifik lokasi',
        'Penyediaan peralatan penyelamat dan tandu evakuasi',
        'Personel dengan kualifikasi P3K dan penanganan awal korban',
        'Latihan simulasi bersama tim tanggap darurat klien',
      ],
      en: [
        'Rescue at height and confined space rescue',
        'Writing and proving site-specific rescue plans',
        'Provision of rescue equipment and evacuation stretchers',
        'Personnel qualified in first aid and initial casualty care',
        'Joint drills with the client’s emergency response team',
      ],
    },
    industries: {
      id: ['Turnaround Kilang', 'Konstruksi Besar', 'Pembangkit Listrik', 'Pertambangan'],
      en: ['Refinery Turnarounds', 'Major Construction', 'Power Generation', 'Mining'],
    },
    deliverables: {
      id: [
        'Rencana penyelamatan tertulis yang telah diuji di lokasi',
        'Log kehadiran dan kesiapan tim harian',
        'Laporan latihan simulasi dan waktu respons terukur',
        'Rekomendasi perbaikan akses dan titik tambat permanen',
      ],
      en: [
        'A written rescue plan proven on site',
        'A daily team attendance and readiness log',
        'Drill reports with measured response times',
        'Recommendations for improved access and permanent anchor points',
      ],
    },
    image: '/brand/logo-onLight-720.webp',
    imageAlt: {
      id: 'Tim penyelamat siaga melakukan simulasi evakuasi korban dari ruang terbatas',
      en: 'A standby rescue team running a confined space casualty evacuation drill',
    },
    body: {
      id: '<h2>Rencana penyelamatan yang belum pernah diuji bukanlah rencana</h2><p>Banyak lokasi kerja memiliki dokumen rencana penyelamatan yang tidak pernah dijalankan. Ketika insiden benar-benar terjadi, jarak antara dokumen dan kenyataan menjadi mahal.</p><p>Setiap penugasan standby rescue RAC dimulai dengan pengujian rencana di lokasi sesungguhnya, dengan waktu respons yang diukur dan dicatat.</p><h2>Waktu respons adalah segalanya</h2><p>Suspension trauma dapat menjadi fatal dalam hitungan belasan menit. Tim kami menetapkan target ekstraksi korban tergantung di bawah 15 menit sejak alarm — dan kami membuktikannya dalam latihan, bukan menjanjikannya dalam proposal.</p>',
      en: '<h2>An untested rescue plan is not a plan</h2><p>Many sites hold a rescue plan document that has never been run. When an incident actually happens, the distance between the document and reality becomes expensive.</p><p>Every RAC standby rescue deployment begins by proving the plan on the real site, with response times measured and recorded.</p><h2>Response time is everything</h2><p>Suspension trauma can turn fatal within tens of minutes. Our teams work to a target of under 15 minutes from alarm to extraction of a suspended casualty — and we demonstrate it in drills rather than promising it in a proposal.</p>',
    },
  },
  {
    slug: 'konsultasi-audit-k3',
    icon: 'clipboard',
    order: 5,
    featured: false,
    published: true,
    title: {
      id: 'Konsultasi & Audit K3 Ketinggian',
      en: 'Work-at-Height HSE Consulting & Audit',
    },
    summary: {
      id: 'Tinjauan independen atas sistem kerja di ketinggian Anda — dari kelayakan titik tambat sampai kesiapan dokumen menghadapi audit klien.',
      en: 'An independent review of your work-at-height system — from anchor point adequacy to readiness for a client audit.',
    },
    scope: {
      id: [
        'Audit sistem kerja aman dan dokumen K3 ketinggian',
        'Survei dan sertifikasi titik tambat permanen',
        'Peninjauan dan penyusunan ulang rencana penyelamatan',
        'Penilaian kompetensi personel dan pemetaan kebutuhan pelatihan',
        'Pendampingan menghadapi audit klien atau inspeksi Disnaker',
      ],
      en: [
        'Audit of the safe system of work and work-at-height documentation',
        'Survey and certification of permanent anchor points',
        'Review and rewriting of rescue plans',
        'Personnel competency assessment and training needs mapping',
        'Support through client audits or Ministry of Manpower inspections',
      ],
    },
    industries: {
      id: ['Manufaktur', 'Properti', 'Energi', 'Logistik & Pergudangan'],
      en: ['Manufacturing', 'Property', 'Energy', 'Logistics & Warehousing'],
    },
    deliverables: {
      id: [
        'Laporan audit dengan temuan berskala prioritas dan tenggat perbaikan',
        'Daftar titik tambat tersertifikasi beserta beban kerja aman',
        'Rencana penyelamatan yang siap pakai',
        'Matriks kompetensi dan peta jalan pelatihan 12 bulan',
      ],
      en: [
        'An audit report with prioritised findings and remediation deadlines',
        'A register of certified anchor points with safe working loads',
        'A ready-to-use rescue plan',
        'A competency matrix and a 12-month training roadmap',
      ],
    },
    image: '/brand/logo-onLight-720.webp',
    imageAlt: {
      id: 'Konsultan K3 meninjau titik tambat permanen di atap fasilitas industri',
      en: 'An HSE consultant reviewing permanent anchor points on an industrial roof',
    },
    body: {
      id: '<h2>Temuan sebelum insiden, bukan sesudah</h2><p>Audit yang baik terasa tidak nyaman. Kami tidak menyusun laporan untuk menyenangkan manajemen — kami menyusunnya agar tidak ada yang jatuh.</p><h2>Yang paling sering kami temukan</h2><p>Tiga temuan berulang di banyak fasilitas: titik tambat yang dipakai tanpa pernah dihitung bebannya, rencana penyelamatan yang menyalin template pihak lain, dan APD yang tercatat diperiksa tetapi tanpa bukti riwayat. Ketiganya dapat diperbaiki dengan cepat setelah teridentifikasi.</p>',
      en: '<h2>Findings before the incident, not after</h2><p>A good audit is uncomfortable. We do not write reports to reassure management — we write them so that nobody falls.</p><h2>What we find most often</h2><p>Three findings recur across many facilities: anchor points in use that were never load-assessed, rescue plans copied from someone else’s template, and PPE recorded as inspected with no supporting history. All three are quick to correct once they are identified.</p>',
    },
  },
  {
    slug: 'penyediaan-teknisi',
    icon: 'users',
    order: 6,
    featured: false,
    published: true,
    title: {
      id: 'Penyediaan Teknisi Akses Tali',
      en: 'Rope Access Technician Supply',
    },
    summary: {
      id: 'Tambahkan kapasitas tanpa menambah beban rekrutmen. Teknisi bersertifikat, terverifikasi, dan siap mobilisasi dalam hitungan hari.',
      en: 'Add capacity without adding a recruitment burden. Certified, vetted technicians ready to mobilise within days.',
    },
    scope: {
      id: [
        'Teknisi IRATA Level 1, 2, dan 3 untuk penugasan jangka pendek maupun panjang',
        'Teknisi dengan kompetensi ganda: NDT, welding, coating, mekanikal, elektrikal',
        'Supervisor akses tali untuk memimpin tim internal Anda',
        'Verifikasi sertifikat, riwayat medis, dan rekam jejak keselamatan',
      ],
      en: [
        'IRATA Level 1, 2, and 3 technicians for short- and long-term assignments',
        'Dual-skilled technicians: NDT, welding, coating, mechanical, electrical',
        'Rope access supervisors to lead your in-house team',
        'Verification of certificates, medical history, and safety record',
      ],
    },
    industries: {
      id: ['Kontraktor EPC', 'Operator Migas', 'Kontraktor Perawatan', 'Energi Terbarukan'],
      en: ['EPC Contractors', 'Oil & Gas Operators', 'Maintenance Contractors', 'Renewable Energy'],
    },
    deliverables: {
      id: [
        'Berkas kompetensi lengkap setiap personel sebelum mobilisasi',
        'Penggantian personel dalam 72 jam apabila terjadi kendala',
        'Laporan jam kerja dan kinerja keselamatan berkala',
        'Kontrak fleksibel harian, mingguan, atau berbasis proyek',
      ],
      en: [
        'A complete competency file for every technician before mobilisation',
        'Replacement personnel within 72 hours if an issue arises',
        'Regular timesheet and safety performance reporting',
        'Flexible daily, weekly, or project-based contracting',
      ],
    },
    image: '/brand/logo-onLight-720.webp',
    imageAlt: {
      id: 'Tim teknisi akses tali RAC bersiap sebelum mobilisasi ke lokasi proyek',
      en: 'A RAC rope access team preparing to mobilise to a project site',
    },
    body: {
      id: '<h2>Kami tahu siapa yang kami kirim</h2><p>Sebagian besar teknisi yang kami tempatkan adalah alumni pelatihan kami sendiri. Kami pernah melihat mereka bekerja di bawah tekanan, dan kami tahu kebiasaan kerja masing-masing — bukan sekadar membaca berkas lamaran.</p><h2>Verifikasi yang tidak bisa dinegosiasikan</h2><p>Setiap sertifikat diverifikasi langsung ke basis data penerbitnya. Sertifikat kedaluwarsa atau tidak terdaftar berarti personel tidak berangkat, tanpa pengecualian.</p>',
      en: '<h2>We know who we send</h2><p>Most technicians we place are graduates of our own training. We have watched them work under pressure and we know their habits — rather than reading a CV.</p><h2>Verification is non-negotiable</h2><p>Every certificate is verified directly against the issuing body’s database. An expired or unregistered certificate means the technician does not mobilise, with no exceptions.</p>',
    },
  },
];
