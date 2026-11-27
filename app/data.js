// NusaStat data: real Indonesian national statistics, compiled from the
// publications of Badan Pusat Statistik (BPS — Statistics Indonesia),
// the Ministry of Health (Kemenkes) and APJII. Every figure carries its
// source and year; see the About page for the full source list.
// Figures are rounded as published; provincial populations are BPS
// mid-2024 projections in thousands and sum to the national total
// within rounding.

export const SOURCES = {
  bps: 'BPS (Statistics Indonesia)',
  kemenkes: 'Ministry of Health (Kemenkes)',
  apjii: 'APJII (Indonesian Internet Service Providers Association)',
  bi: 'Bank Indonesia',
};

export const COUNTRY = {
  name: 'Indonesia',
  tagline: 'Portal statistik nasional — angka resmi, sumber jelas, tahun jelas.',
  population2024: 281.6, // million, BPS mid-2024 projection
  areaKm2: 1904569, // land area, BPS
  provinces: 38,
  capital: 'Jakarta',
  updated: 'November 2025',
};

// Headline indicators shown as cards on the home page.
export const HEADLINES = [
  { id: 'pop', label: 'Penduduk', value: '281,6 jt', change: '+1,0% per tahun', year: 2024, source: SOURCES.bps, route: '#/population', note: 'Proyeksi pertengahan tahun' },
  { id: 'gdp', label: 'PDB (harga berlaku)', value: 'Rp 22.139 T', change: '+5,03% (riil)', year: 2024, source: SOURCES.bps, route: '#/economy', note: 'Tumbuh 5,03% dari 2023' },
  { id: 'gdp-cap', label: 'PDB per kapita', value: 'Rp 78,6 jt', change: 'US$ 4.960', year: 2024, source: SOURCES.bps, route: '#/economy', note: 'Harga berlaku' },
  { id: 'inflation', label: 'Inflasi (yoy)', value: '1,57%', change: 'Des 2024', year: 2024, source: SOURCES.bps, route: '#/economy', note: 'Terendah dalam satu dekade' },
  { id: 'unemp', label: 'Pengangguran (TPT)', value: '4,91%', change: 'Agu 2024', year: 2024, source: SOURCES.bps, route: '#/people', note: 'Turun dari 5,32% (Agu 2023)' },
  { id: 'poverty', label: 'Kemiskinan', value: '9,03%', change: 'Mar 2024', year: 2024, source: SOURCES.bps, route: '#/people', note: '25,22 juta penduduk' },
  { id: 'hdi', label: 'Indeks Pembangunan Manusia', value: '75,02', change: '+0,63 poin', year: 2024, source: SOURCES.bps, route: '#/people', note: 'Kategori tinggi' },
  { id: 'life', label: 'Harapan hidup', value: '74,0 thn', change: 'Lahir 2024', year: 2024, source: SOURCES.bps, route: '#/people', note: 'Naik dari 73,9 (2023)' },
  { id: 'internet', label: 'Pengguna internet', value: '221,6 jt', change: '79,5% penduduk', year: 2024, source: SOURCES.apjii, route: '#/people', note: 'Survei APJII 2024' },
];

// Latest official releases (BPS news releases, 2025).
export const RELEASES = [
  { date: '5 Nov 2025', title: 'PDB triwulan III-2025 tumbuh 5,04% (yoy)', detail: 'Ekonomi Indonesia tumbuh 5,04% dibanding triwulan yang sama 2024, didorong konsumsi rumah tangga dan investasi.', source: SOURCES.bps },
  { date: '3 Nov 2025', title: 'Inflasi Oktober 2025 sebesar 2,86% (yoy)', detail: 'Inflasi tahunan naik dari 2,65% pada September, dipicu kelompok makanan dan transportasi.', source: SOURCES.bps },
  { date: '5 Nov 2025', title: 'Tingkat pengangguran Agustus 2025: 4,85%', detail: 'TPT turun dari 4,91% pada Agustus 2024; angkatan kerja mencapai 153,0 juta orang.', source: SOURCES.bps },
  { date: '15 Jul 2025', title: 'Kemiskinan Maret 2025 turun ke 8,47%', detail: 'Persentase penduduk miskin 8,47% (23,85 juta orang), terendah sepanjang sejarah pencatatan BPS.', source: SOURCES.bps },
  { date: '2 Jun 2025', title: 'Ekspor April 2025 US$ 20,74 miliar', detail: 'Neraca perdagangan surplus US$ 1,96 miliar pada April 2025; surplus berlanjut 60 bulan berturut-turut.', source: SOURCES.bps },
];

// Population 2015-2024, millions (BPS mid-year projections; 2020 census).
export const POPULATION_SERIES = [
  { year: 2015, value: 255.5 }, { year: 2016, value: 258.7 },
  { year: 2017, value: 261.9 }, { year: 2018, value: 264.2 },
  { year: 2019, value: 267.0 }, { year: 2020, value: 270.2 },
  { year: 2021, value: 272.3 }, { year: 2022, value: 275.8 },
  { year: 2023, value: 278.7 }, { year: 2024, value: 281.6 },
];

// Age structure 2024, percent of population (BPS).
export const AGE_GROUPS = [
  { group: '0–14 tahun', share: 24.4, note: 'Anak-anak' },
  { group: '15–24 tahun', share: 16.6, note: 'Remaja & pemuda' },
  { group: '25–54 tahun', share: 42.9, note: 'Usia produktif inti' },
  { group: '55–64 tahun', share: 9.3, note: 'Pra-lansia' },
  { group: '65+ tahun', share: 6.8, note: 'Lansia' },
];

// Real GDP growth 2015-2024, percent year-on-year (BPS).
export const GDP_GROWTH = [
  { year: 2015, value: 4.88 }, { year: 2016, value: 5.03 },
  { year: 2017, value: 5.07 }, { year: 2018, value: 5.17 },
  { year: 2019, value: 5.02 }, { year: 2020, value: -2.07 },
  { year: 2021, value: 3.70 }, { year: 2022, value: 5.31 },
  { year: 2023, value: 5.05 }, { year: 2024, value: 5.03 },
];

// CPI inflation 2015-2024, percent year-on-year, December (BPS).
export const INFLATION_SERIES = [
  { year: 2015, value: 3.35 }, { year: 2016, value: 3.02 },
  { year: 2017, value: 3.61 }, { year: 2018, value: 3.13 },
  { year: 2019, value: 2.72 }, { year: 2020, value: 1.68 },
  { year: 2021, value: 1.87 }, { year: 2022, value: 5.51 },
  { year: 2023, value: 2.61 }, { year: 2024, value: 1.57 },
];

// Open unemployment rate (TPT) August, percent (BPS).
export const UNEMPLOYMENT_SERIES = [
  { year: 2015, value: 6.18 }, { year: 2016, value: 5.61 },
  { year: 2017, value: 5.50 }, { year: 2018, value: 5.34 },
  { year: 2019, value: 5.23 }, { year: 2020, value: 7.07 },
  { year: 2021, value: 6.49 }, { year: 2022, value: 5.86 },
  { year: 2023, value: 5.32 }, { year: 2024, value: 4.91 },
];

// Poverty rate March, percent (BPS).
export const POVERTY_SERIES = [
  { year: 2015, value: 11.13 }, { year: 2016, value: 10.70 },
  { year: 2017, value: 10.12 }, { year: 2018, value: 9.66 },
  { year: 2019, value: 9.22 }, { year: 2020, value: 9.78 },
  { year: 2021, value: 9.71 }, { year: 2022, value: 9.54 },
  { year: 2023, value: 9.36 }, { year: 2024, value: 9.03 },
];

// GDP by sector, share of GDP 2024, percent (BPS).
export const GDP_SECTORS = [
  { sector: 'Industri pengolahan', share: 18.7 },
  { sector: 'Perdagangan besar & eceran', share: 12.8 },
  { sector: 'Pertanian, kehutanan & perikanan', share: 12.5 },
  { sector: 'Konstruksi', share: 10.2 },
  { sector: 'Pertambangan & penggalian', share: 8.5 },
  { sector: 'Administrasi pemerintahan', share: 6.4 },
  { sector: 'Transportasi & pergudangan', share: 5.5 },
  { sector: 'Informasi & komunikasi', share: 4.1 },
  { sector: 'Jasa keuangan & asuransi', share: 4.0 },
  { sector: 'Jasa lainnya', share: 17.3 },
];

// Trade 2024 (BPS).
export const TRADE_2024 = {
  exports: 264.7, imports: 233.66, surplus: 31.04,
  topExports: [
    { good: 'Batu bara', share: 13.1 },
    { good: 'Minyak kelapa sawit (CPO)', share: 10.2 },
    { good: 'Besi & baja', share: 8.4 },
    { good: 'Nikel & bijih logam', share: 5.6 },
    { good: 'Karet & barang dari karet', share: 3.9 },
  ],
};

// Human development 2015-2024 (BPS).
export const HDI_SERIES = [
  { year: 2015, value: 69.55 }, { year: 2016, value: 70.18 },
  { year: 2017, value: 70.81 }, { year: 2018, value: 71.39 },
  { year: 2019, value: 71.92 }, { year: 2020, value: 71.94 },
  { year: 2021, value: 72.29 }, { year: 2022, value: 73.37 },
  { year: 2023, value: 74.39 }, { year: 2024, value: 75.02 },
];

export const PEOPLE_FACTS = [
  { label: 'Rata-rata lama sekolah', value: '9,05 tahun', year: 2024, source: SOURCES.bps, note: 'Penduduk usia 25 tahun ke atas' },
  { label: 'Harapan lama sekolah', value: '13,28 tahun', year: 2024, source: SOURCES.bps, note: 'Untuk anak usia 7 tahun' },
  { label: 'Angka melek huruf (15+)', value: '96,7%', year: 2024, source: SOURCES.bps, note: 'Penduduk usia 15 tahun ke atas' },
  { label: 'Puskesmas', value: '10.373 unit', year: 2023, source: SOURCES.kemenkes, note: 'Seluruh Indonesia' },
  { label: 'Rumah sakit', value: '3.150 unit', year: 2023, source: SOURCES.kemenkes, note: 'Umum dan khusus' },
  { label: 'Pengguna internet', value: '221,6 juta', year: 2024, source: SOURCES.apjii, note: '79,5% dari penduduk' },
];

// Provinces: 2024 population (thousands, BPS mid-year projection,
// scaled to the national total) and land area (km2, BPS).
// Density is computed from these two columns.
export const PROVINCES = [
  { name: 'Jawa Barat', pop: 48982, area: 35378 },
  { name: 'Jawa Timur', pop: 42337, area: 47803 },
  { name: 'Jawa Tengah', pop: 38375, area: 32801 },
  { name: 'Sumatera Utara', pop: 15784, area: 72981 },
  { name: 'Banten', pop: 12223, area: 9663 },
  { name: 'DKI Jakarta', pop: 10818, area: 664 },
  { name: 'Sulawesi Selatan', pop: 9409, area: 46717 },
  { name: 'Lampung', pop: 9279, area: 34624 },
  { name: 'Sumatera Selatan', pop: 8947, area: 91592 },
  { name: 'Riau', pop: 6697, area: 87024 },
  { name: 'Sumatera Barat', pop: 5829, area: 42013 },
  { name: 'Kalimantan Barat', pop: 5784, area: 147307 },
  { name: 'Nusa Tenggara Timur', pop: 5735, area: 47931 },
  { name: 'Aceh', pop: 5584, area: 57956 },
  { name: 'Nusa Tenggara Barat', pop: 5518, area: 18572 },
  { name: 'Bali', pop: 4398, area: 5780 },
  { name: 'Kalimantan Selatan', pop: 4291, area: 38744 },
  { name: 'Kalimantan Timur', pop: 3958, area: 129066 },
  { name: 'DI Yogyakarta', pop: 3790, area: 3133 },
  { name: 'Jambi', pop: 3725, area: 50058 },
  { name: 'Sulawesi Tengah', pop: 3179, area: 61841 },
  { name: 'Kalimantan Tengah', pop: 2846, area: 153564 },
  { name: 'Sulawesi Tenggara', pop: 2852, area: 38140 },
  { name: 'Sulawesi Utara', pop: 2725, area: 13892 },
  { name: 'Kepulauan Riau', pop: 2159, area: 8202 },
  { name: 'Bengkulu', pop: 2095, area: 19919 },
  { name: 'Maluku', pop: 2029, area: 46914 },
  { name: 'Sulawesi Barat', pop: 1564, area: 16787 },
  { name: 'Kepulauan Bangka Belitung', pop: 1507, area: 16424 },
  { name: 'Papua Pegunungan', pop: 1465, area: 108476 },
  { name: 'Maluku Utara', pop: 1442, area: 31982 },
  { name: 'Papua Tengah', pop: 1368, area: 61073 },
  { name: 'Gorontalo', pop: 1253, area: 11257 },
  { name: 'Papua', pop: 1186, area: 82652 },
  { name: 'Kalimantan Utara', pop: 722, area: 75467 },
  { name: 'Papua Barat Daya', pop: 639, area: 38832 },
  { name: 'Papua Barat', pop: 580, area: 64134 },
  { name: 'Papua Selatan', pop: 541, area: 131140 },
];

// Full indicator table for the Data explorer page.
export const INDICATORS = [
  { indicator: 'Jumlah penduduk', value: '281,6 juta', year: 2024, source: SOURCES.bps, category: 'Penduduk' },
  { indicator: 'Laju pertumbuhan penduduk', value: '1,04% per tahun', year: 2024, source: SOURCES.bps, category: 'Penduduk' },
  { indicator: 'Kepadatan penduduk', value: '148 jiwa/km²', year: 2024, source: SOURCES.bps, category: 'Penduduk' },
  { indicator: 'Usia median', value: '30,4 tahun', year: 2024, source: SOURCES.bps, category: 'Penduduk' },
  { indicator: 'Penduduk usia 65+ tahun', value: '6,8%', year: 2024, source: SOURCES.bps, category: 'Penduduk' },
  { indicator: 'PDB harga berlaku', value: 'Rp 22.139 triliun', year: 2024, source: SOURCES.bps, category: 'Ekonomi' },
  { indicator: 'Pertumbuhan PDB (riil)', value: '5,03%', year: 2024, source: SOURCES.bps, category: 'Ekonomi' },
  { indicator: 'PDB per kapita', value: 'Rp 78,6 juta', year: 2024, source: SOURCES.bps, category: 'Ekonomi' },
  { indicator: 'Inflasi (yoy, Desember)', value: '1,57%', year: 2024, source: SOURCES.bps, category: 'Ekonomi' },
  { indicator: 'Ekspor', value: 'US$ 264,70 miliar', year: 2024, source: SOURCES.bps, category: 'Ekonomi' },
  { indicator: 'Impor', value: 'US$ 233,66 miliar', year: 2024, source: SOURCES.bps, category: 'Ekonomi' },
  { indicator: 'Surplus neraca perdagangan', value: 'US$ 31,04 miliar', year: 2024, source: SOURCES.bps, category: 'Ekonomi' },
  { indicator: 'Tingkat pengangguran terbuka', value: '4,91%', year: 2024, source: SOURCES.bps, category: 'Masyarakat' },
  { indicator: 'Tingkat kemiskinan', value: '9,03%', year: 2024, source: SOURCES.bps, category: 'Masyarakat' },
  { indicator: 'Indeks Pembangunan Manusia', value: '75,02', year: 2024, source: SOURCES.bps, category: 'Masyarakat' },
  { indicator: 'Harapan hidup saat lahir', value: '74,0 tahun', year: 2024, source: SOURCES.bps, category: 'Masyarakat' },
  { indicator: 'Rata-rata lama sekolah', value: '9,05 tahun', year: 2024, source: SOURCES.bps, category: 'Masyarakat' },
  { indicator: 'Harapan lama sekolah', value: '13,28 tahun', year: 2024, source: SOURCES.bps, category: 'Masyarakat' },
  { indicator: 'Angka melek huruf (15+)', value: '96,7%', year: 2024, source: SOURCES.bps, category: 'Masyarakat' },
  { indicator: 'Pengguna internet', value: '221,6 juta (79,5%)', year: 2024, source: SOURCES.apjii, category: 'Masyarakat' },
  { indicator: 'Jumlah provinsi', value: '38', year: 2024, source: SOURCES.bps, category: 'Daerah' },
  { indicator: 'Jumlah kabupaten/kota', value: '514', year: 2024, source: SOURCES.bps, category: 'Daerah' },
  { indicator: 'Luas daratan', value: '1.904.569 km²', year: 2024, source: SOURCES.bps, category: 'Daerah' },
  { indicator: 'Jumlah pulau (bernama)', value: '17.380', year: 2024, source: SOURCES.bps, category: 'Daerah' },
];

export function provinceDensity(p) {
  return p.pop * 1000 / p.area;
}

export function provinceShare(p) {
  return (p.pop / 281600) * 100;
}

export function formatThousands(n) {
  return n.toLocaleString('id-ID');
}
