// NusaStat views: one render function per page (hash route).
// Each page is plain HTML strings + the SVG charts from charts.js.
// Controls (search, sort, range toggles) are wired by bindPage()
// after the HTML is placed in the document.

import {
  COUNTRY, HEADLINES, RELEASES, POPULATION_SERIES, AGE_GROUPS,
  GDP_GROWTH, INFLATION_SERIES, UNEMPLOYMENT_SERIES, POVERTY_SERIES,
  GDP_SECTORS, TRADE_2024, HDI_SERIES, PEOPLE_FACTS, PROVINCES,
  INDICATORS, SOURCES, provinceDensity, provinceShare, formatThousands,
} from './data.js';
import { barChart, lineChart, donutChart, hbarChart, TEAL, AMBER } from './charts.js';

function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function num(n, decimals = 1) {
  return n.toLocaleString('id-ID', { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}

function kpiCard(h) {
  return `<a class="kpi" href="${h.route}">
    <span class="kpi-label">${esc(h.label)}</span>
    <span class="kpi-value">${esc(h.value)}</span>
    <span class="kpi-change">${esc(h.change)}</span>
    <span class="kpi-source">${esc(h.source)} · ${h.year}</span>
  </a>`;
}

function sectionHead(title, sub) {
  return `<div class="section-head"><h2>${esc(title)}</h2><p>${esc(sub)}</p></div>`;
}

function sourceNote(text) {
  return `<p class="source-note">Sumber: ${esc(text)}</p>`;
}

// ---- Home -------------------------------------------------------------
export function renderHome() {
  const top10 = [...PROVINCES].sort((a, b) => b.pop - a.pop).slice(0, 8);
  return `
  <section class="hero">
    <p class="eyebrow">Statistik Indonesia · Data resmi 2015–2025</p>
    <h1>Indonesia dalam angka, <span>jelas dan bisa dicek.</span></h1>
    <p class="lede">${esc(COUNTRY.tagline)} Penduduk, ekonomi, pembangunan manusia dan
    daerah — semua angka di sini berasal dari publikasi resmi dan dicantumkan sumber beserta tahunnya.</p>
    <div class="hero-stats">
      <div><strong>${num(COUNTRY.population2024, 1)} jt</strong><span>penduduk (2024)</span></div>
      <div><strong>${COUNTRY.provinces}</strong><span>provinsi</span></div>
      <div><strong>Rp 22.139 T</strong><span>PDB 2024</span></div>
      <div><strong>75,02</strong><span>IPM 2024</span></div>
    </div>
  </section>

  <section>
    ${sectionHead('Angka utama', 'Delapan indikator yang paling sering dicari — klik sebuah kartu untuk melihat halaman lengkapnya.')}
    <div class="kpi-grid">${HEADLINES.map(kpiCard).join('')}</div>
  </section>

  <section class="two-col">
    <article class="card">
      <h2>Pertumbuhan penduduk 2015–2024</h2>
      <p class="card-sub">Juta jiwa, proyeksi pertengahan tahun (BPS); 2020 adalah hasil Sensus Penduduk.</p>
      <div class="range-toggle" role="group" aria-label="Rentang tahun">
        <button type="button" data-range="all" class="active">2015–2024</button>
        <button type="button" data-range="recent">2020–2024</button>
        <button type="button" data-range="early">2015–2019</button>
      </div>
      <div id="pop-chart">${lineChart(POPULATION_SERIES.map((d) => ({ label: String(d.year), value: d.value })), { color: TEAL })}</div>
      ${sourceNote('BPS, Proyeksi Penduduk Indonesia 2015–2045 dan Sensus Penduduk 2020.')}
    </article>
    <article class="card">
      <h2>Provinsi terpadat</h2>
      <p class="card-sub">Juta jiwa, proyeksi BPS pertengahan 2024. Tiga provinsi di Jawa menampung lebih dari separuh penduduk Indonesia.</p>
      ${hbarChart(top10.map((p) => ({ label: p.name, value: p.pop / 1000, display: num(p.pop / 1000, 1) + ' jt' })), { labelWidth: 140 })}
      <p><a class="text-link" href="#/regions">Lihat semua 38 provinsi →</a></p>
      ${sourceNote('BPS, Proyeksi Penduduk 2024.')}
    </article>
  </section>

  <section>
    ${sectionHead('Rilis terbaru', 'Berita resmi terbaru dari BPS — angka yang baru keluar, beserta tanggal rilisnya.')}
    <ul class="release-list">
      ${RELEASES.map((r) => `<li><time>${esc(r.date)}</time><div><strong>${esc(r.title)}</strong><p>${esc(r.detail)}</p><span class="source-note">Sumber: ${esc(r.source)}</span></div></li>`).join('')}
    </ul>
  </section>

  <section class="cta-band">
    <h2>Mencari satu angka spesifik?</h2>
    <p>Semua 24 indikator utama ada di satu tabel yang bisa dicari dan diunduh sebagai CSV.</p>
    <p><a class="btn" href="#/data">Buka penjelajah data →</a></p>
  </section>`;
}

// ---- Population -------------------------------------------------------
export function renderPopulation() {
  const sorted = [...PROVINCES].sort((a, b) => b.pop - a.pop);
  return `
  <section class="page-head">
    <p class="eyebrow">Penduduk</p>
    <h1>Penduduk Indonesia: 281,6 juta jiwa</h1>
    <p class="lede">Proyeksi pertengahan 2024 (BPS). Indonesia adalah negara berpenduduk terbesar keempat di dunia, dengan
    usia median 30,4 tahun dan 68,8% penduduk berada di usia produktif (15–64 tahun).</p>
  </section>

  <section class="two-col">
    <article class="card">
      <h2>Tren penduduk 2015–2024</h2>
      <p class="card-sub">Juta jiwa. Pertumbuhan melambat dari 1,25% (2015) menjadi sekitar 1,0% per tahun.</p>
      ${lineChart(POPULATION_SERIES.map((d) => ({ label: String(d.year), value: d.value })), { color: TEAL })}
      ${sourceNote('BPS, Proyeksi Penduduk 2015–2045; Sensus Penduduk 2020.')}
    </article>
    <article class="card">
      <h2>Struktur usia 2024</h2>
      <p class="card-sub">Persen dari total penduduk. Bonus demografi: hampir tujuh dari sepuluh penduduk berusia produktif.</p>
      ${hbarChart(AGE_GROUPS.map((g) => ({ label: g.group, value: g.share, display: num(g.share, 1) + '%' })), { labelWidth: 120, color: AMBER })}
      <p class="fine">Kelompok 15–64 tahun: 68,8% · Rasio ketergantungan: 45,3 per 100 penduduk usia kerja.</p>
      ${sourceNote('BPS, Proyeksi Penduduk 2024.')}
    </article>
  </section>

  <section>
    ${sectionHead('Penduduk per provinsi', 'Cari provinsi, atau urutkan tabelnya. Kepadatan dihitung dari jumlah penduduk dibagi luas daratan.')}
    <div class="table-tools">
      <label>Cari provinsi <input id="prov-search" type="search" placeholder="mis. Jawa Barat" autocomplete="off"></label>
      <span class="sort-group" role="group" aria-label="Urutkan">
        <button type="button" data-sort="pop" class="active">Terpadat</button>
        <button type="button" data-sort="name">Nama A–Z</button>
        <button type="button" data-sort="density">Terpadat per km²</button>
      </span>
    </div>
    <div class="table-wrap"><table id="prov-table">
      <thead><tr><th>#</th><th>Provinsi</th><th class="num">Penduduk (ribu)</th><th class="num">Luas (km²)</th><th class="num">Kepadatan (jiwa/km²)</th><th class="num">Bagian dari Indonesia</th></tr></thead>
      <tbody>${provinceRows(sorted)}</tbody>
    </table></div>
    <p class="fine" id="prov-count">${sorted.length} provinsi · Jumlah penduduk provinsi (dalam ribuan) dibulatkan; totalnya sama dengan angka nasional dalam batas pembulatan.</p>
    ${sourceNote('BPS, Proyeksi Penduduk 2024 dan Luas Wilayah menurut Provinsi.')}
  </section>`;
}

export function provinceRows(list) {
  return list.map((p, i) => `<tr>
    <td>${i + 1}</td><td>${esc(p.name)}</td>
    <td class="num">${formatThousands(p.pop)}</td>
    <td class="num">${formatThousands(p.area)}</td>
    <td class="num">${num(provinceDensity(p), 0)}</td>
    <td class="num">${num(provinceShare(p), 2)}%</td>
  </tr>`).join('');
}

// ---- Economy ----------------------------------------------------------
export function renderEconomy() {
  return `
  <section class="page-head">
    <p class="eyebrow">Ekonomi</p>
    <h1>Ekonomi Indonesia: PDB Rp 22.139 triliun</h1>
    <p class="lede">Produk domestik bruto 2024 atas dasar harga berlaku (BPS). Ekonomi tumbuh 5,03% secara riil —
    laju yang bertahan di kisaran 5% selama tiga tahun berturut-turut setelah kontraksi pandemi 2020.</p>
  </section>

  <section class="two-col">
    <article class="card">
      <h2>Pertumbuhan PDB 2015–2024</h2>
      <p class="card-sub">Persen per tahun (yoy). Tahun 2020 mencatat kontraksi −2,07%, satu-satunya penurunan dalam satu dekade.</p>
      <div class="range-toggle" role="group" aria-label="Rentang tahun">
        <button type="button" data-range="all" class="active">2015–2024</button>
        <button type="button" data-range="recent">2020–2024</button>
      </div>
      <div id="gdp-chart">${barChart(GDP_GROWTH.map((d) => ({ label: String(d.year), value: d.value })), { highlightLast: true })}</div>
      ${sourceNote('BPS, PDB Indonesia 2015–2024.')}
    </article>
    <article class="card">
      <h2>Struktur PDB 2024</h2>
      <p class="card-sub">Persen dari PDB. Industri pengolahan tetap penyumbang terbesar, diikuti perdagangan dan pertanian.</p>
      ${donutChart(GDP_SECTORS.map((s) => ({ label: s.sector, value: s.share })))}
      ${sourceNote('BPS, PDB menurut Lapangan Usaha 2024.')}
    </article>
  </section>

  <section class="two-col">
    <article class="card">
      <h2>Inflasi 2015–2024</h2>
      <p class="card-sub">Persen yoy, Desember. Inflasi 2024 (1,57%) adalah yang terendah dalam satu dekade; lonjakan 2022 dipicu penyesuaian harga BBM.</p>
      ${lineChart(INFLATION_SERIES.map((d) => ({ label: String(d.year), value: d.value })), { color: AMBER })}
      ${sourceNote('BPS, Indeks Harga Konsumen 2015–2024.')}
    </article>
    <article class="card">
      <h2>Perdagangan luar negeri 2024</h2>
      <p class="card-sub">Miliar dolar AS (BPS). Surplus perdagangan berlanjut; lima komoditas teratas menyumbang sekitar 41% nilai ekspor.</p>
      <div class="trade-cards">
        <div><strong>US$ ${num(TRADE_2024.exports, 2)} M</strong><span>Ekspor</span></div>
        <div><strong>US$ ${num(TRADE_2024.imports, 2)} M</strong><span>Impor</span></div>
        <div><strong>US$ ${num(TRADE_2024.surplus, 2)} M</strong><span>Surplus</span></div>
      </div>
      ${hbarChart(TRADE_2024.topExports.map((t) => ({ label: t.good, value: t.share, display: num(t.share, 1) + '%' })), { labelWidth: 170, color: AMBER })}
      <p class="fine">Pangsa dari total nilai ekspor 2024.</p>
      ${sourceNote('BPS, Statistik Perdagangan Luar Negeri 2024.')}
    </article>
  </section>`;
}

// ---- People -----------------------------------------------------------
export function renderPeople() {
  return `
  <section class="page-head">
    <p class="eyebrow">Masyarakat</p>
    <h1>Manusia Indonesia: lebih sehat, lebih terdidik</h1>
    <p class="lede">Indeks Pembangunan Manusia 2024 mencapai 75,02 — naik 0,63 poin dari 2023 dan tertinggi sepanjang
    sejarah. Pengangguran 4,91% dan kemiskinan 9,03% adalah level terendah dalam satu dekade.</p>
  </section>

  <section class="two-col">
    <article class="card">
      <h2>IPM 2015–2024</h2>
      <p class="card-sub">Indeks Pembangunan Manusia (0–100). Indonesia masuk kategori “tinggi” sejak 2022 (di atas 70).</p>
      ${lineChart(HDI_SERIES.map((d) => ({ label: String(d.year), value: d.value })), { color: TEAL })}
      ${sourceNote('BPS, Indeks Pembangunan Manusia 2015–2024.')}
    </article>
    <article class="card">
      <h2>Pengangguran &amp; kemiskinan</h2>
      <p class="card-sub">Persen. Keduanya melonjak saat pandemi 2020, lalu turun konsisten selama empat tahun.</p>
      ${lineChart(UNEMPLOYMENT_SERIES.map((d) => ({ label: String(d.year), value: d.value })), { color: AMBER })}
      <p class="chart-caption">Tingkat pengangguran terbuka (Agustus), %</p>
      ${lineChart(POVERTY_SERIES.map((d) => ({ label: String(d.year), value: d.value })), { color: TEAL })}
      <p class="chart-caption">Tingkat kemiskinan (Maret), %</p>
      ${sourceNote('BPS, Sakernas Agustus dan Susenas Maret 2015–2024.')}
    </article>
  </section>

  <section>
    ${sectionHead('Pendidikan, kesehatan &amp; konektivitas', 'Angka-angka dasar kehidupan sehari-hari — masing-masing dengan sumber dan tahunnya.')}
    <div class="fact-grid">
      ${PEOPLE_FACTS.map((f) => `<article class="fact"><span class="fact-value">${esc(f.value)}</span><span class="fact-label">${esc(f.label)}</span><span class="fact-note">${esc(f.note)}</span><span class="kpi-source">${esc(f.source)} · ${f.year}</span></article>`).join('')}
    </div>
  </section>`;
}

// ---- Regions ----------------------------------------------------------
export function renderRegions() {
  const sorted = [...PROVINCES].sort((a, b) => b.pop - a.pop);
  return `
  <section class="page-head">
    <p class="eyebrow">Daerah</p>
    <h1>38 provinsi, satu Indonesia</h1>
    <p class="lede">Sejak pemekaran Papua pada 2022, Indonesia memiliki 38 provinsi. Pilih satu provinsi untuk melihat
    detailnya, atau urutkan tabel berdasarkan penduduk, luas, atau kepadatan.</p>
  </section>

  <section class="two-col regions-layout">
    <article class="card">
      <h2>Detail provinsi</h2>
      <p class="card-sub">Klik sebuah baris pada tabel untuk menampilkan provinsi di sini.</p>
      <div id="region-detail">${regionDetail(sorted[0], 1)}</div>
    </article>
    <article class="card">
      <h2>Provinsi terpadat per km²</h2>
      <p class="card-sub">DKI Jakarta jauh di atas yang lain: lebih dari 16 ribu jiwa per km².</p>
      ${hbarChart([...PROVINCES].sort((a, b) => provinceDensity(b) - provinceDensity(a)).slice(0, 8).map((p) => ({ label: p.name, value: Math.round(provinceDensity(p)), display: formatThousands(Math.round(provinceDensity(p))) + '/km²' })), { labelWidth: 150, color: TEAL })}
      ${sourceNote('BPS 2024; kepadatan = penduduk ÷ luas daratan.')}
    </article>
  </section>

  <section>
    ${sectionHead('Semua provinsi', 'Klik baris mana pun untuk melihat detail provinsi tersebut.')}
    <div class="table-tools">
      <label>Cari provinsi <input id="region-search" type="search" placeholder="mis. Papua" autocomplete="off"></label>
      <span class="sort-group" role="group" aria-label="Urutkan">
        <button type="button" data-sort="pop" class="active">Terpadat</button>
        <button type="button" data-sort="area">Terluas</button>
        <button type="button" data-sort="density">Terpadat per km²</button>
        <button type="button" data-sort="name">Nama A–Z</button>
      </span>
    </div>
    <div class="table-wrap"><table id="region-table">
      <thead><tr><th>Provinsi</th><th class="num">Penduduk (ribu)</th><th class="num">Luas (km²)</th><th class="num">Kepadatan (jiwa/km²)</th><th class="num">Bagian dari Indonesia</th></tr></thead>
      <tbody>${regionRows(sorted)}</tbody>
    </table></div>
    <p class="fine" id="region-count">${sorted.length} provinsi ditampilkan.</p>
    ${sourceNote('BPS, Proyeksi Penduduk dan Luas Wilayah menurut Provinsi 2024.')}
  </section>`;
}

export function regionRows(list) {
  return list.map((p) => `<tr data-prov="${esc(p.name)}" tabindex="0">
    <td>${esc(p.name)}</td>
    <td class="num">${formatThousands(p.pop)}</td>
    <td class="num">${formatThousands(p.area)}</td>
    <td class="num">${num(provinceDensity(p), 0)}</td>
    <td class="num">${num(provinceShare(p), 2)}%</td>
  </tr>`).join('');
}

export function regionDetail(p, rank) {
  const density = provinceDensity(p);
  const jakarta = density > 5000;
  return `<div class="region-detail">
    <h3>${esc(p.name)}</h3>
    <p class="region-rank">Provinsi terpadat ke-${rank} dari 38</p>
    <dl>
      <div><dt>Penduduk (2024)</dt><dd>${formatThousands(p.pop)} ribu jiwa (${num(p.pop / 1000, 1)} juta)</dd></div>
      <div><dt>Bagian dari Indonesia</dt><dd>${num(provinceShare(p), 2)}% dari total penduduk</dd></div>
      <div><dt>Luas daratan</dt><dd>${formatThousands(p.area)} km²</dd></div>
      <div><dt>Kepadatan</dt><dd>${num(density, 0)} jiwa per km²${jakarta ? ' — provinsi terpadat di Indonesia' : ''}</dd></div>
      <div><dt>Sumber</dt><dd>${esc(SOURCES.bps)}, 2024</dd></div>
    </dl>
  </div>`;
}

// ---- Data explorer ----------------------------------------------------
export function renderData() {
  const cats = ['Semua', ...new Set(INDICATORS.map((i) => i.category))];
  return `
  <section class="page-head">
    <p class="eyebrow">Data</p>
    <h1>Penjelajah data: semua indikator utama</h1>
    <p class="lede">Seluruh ${INDICATORS.length} indikator yang dipakai situs ini, dalam satu tabel yang bisa dicari,
    disaring per kategori, dan diunduh sebagai CSV untuk dipakai sendiri.</p>
  </section>

  <section>
    <div class="table-tools">
      <label>Cari indikator <input id="data-search" type="search" placeholder="mis. inflasi" autocomplete="off"></label>
      <span class="sort-group" role="group" aria-label="Kategori">
        ${cats.map((c) => `<button type="button" data-cat="${esc(c)}" class="${c === 'Semua' ? 'active' : ''}">${esc(c)}</button>`).join('')}
      </span>
      <button type="button" id="csv-download" class="btn small">Unduh CSV</button>
    </div>
    <div class="table-wrap"><table id="data-table">
      <thead><tr><th>Indikator</th><th>Nilai</th><th class="num">Tahun</th><th>Sumber</th><th>Kategori</th></tr></thead>
      <tbody>${dataRows(INDICATORS)}</tbody>
    </table></div>
    <p class="fine" id="data-count">${INDICATORS.length} indikator ditampilkan.</p>
    <p class="fine">CSV berisi kolom yang sama dengan tabel ini. Nilai memakai format Indonesia (koma sebagai pemisah desimal).</p>
    ${sourceNote('BPS, berbagai publikasi 2015–2024; APJII, Survei Penetrasi Internet 2024. Kolom Sumber pada tiap baris menyebut publikasi asalnya.')}
  </section>`;
}

export function dataRows(list) {
  return list.map((d) => `<tr><td>${esc(d.indicator)}</td><td>${esc(d.value)}</td><td class="num">${d.year}</td><td>${esc(d.source)}</td><td>${esc(d.category)}</td></tr>`).join('');
}

// ---- About ------------------------------------------------------------
export function renderAbout() {
  return `
  <section class="page-head">
    <p class="eyebrow">Tentang</p>
    <h1>Tentang NusaStat</h1>
    <p class="lede">NusaStat adalah portal statistik independen tentang Indonesia. Situs ini dibuat untuk lomba
    make.fun “best national statistics site” dan berjalan sepenuhnya dari file statis — tanpa permintaan jaringan.</p>
  </section>

  <section class="two-col">
    <article class="card">
      <h2>Sumber data</h2>
      <p>Setiap angka di situs ini berasal dari publikasi resmi berikut, dengan tahun yang dicantumkan pada tiap angka:</p>
      <ul class="source-list">
        <li><strong>Badan Pusat Statistik (BPS)</strong> — Proyeksi Penduduk 2015–2045, Sensus Penduduk 2020, PDB Indonesia, Indeks Harga Konsumen, Sakernas, Susenas, Statistik Perdagangan Luar Negeri.</li>
        <li><strong>Kementerian Kesehatan</strong> — Profil Kesehatan Indonesia 2023 (jumlah puskesmas dan rumah sakit).</li>
        <li><strong>APJII</strong> — Survei Penetrasi Internet Indonesia 2024.</li>
      </ul>
      <p class="fine">Angka provinsi dibulatkan ke ribuan terdekat; totalnya sama dengan angka nasional dalam batas pembulatan. Angka “rilis terbaru” mengikuti Berita Resmi Statistik BPS tahun 2025.</p>
    </article>
    <article class="card">
      <h2>Cara mengutip</h2>
      <p>Contoh kutipan untuk angka di situs ini:</p>
      <blockquote>“Jumlah penduduk Indonesia 281,6 juta jiwa (BPS, Proyeksi Penduduk, pertengahan 2024).”</blockquote>
      <h2>Bukan situs resmi</h2>
      <p>NusaStat <strong>bukan</strong> situs Badan Pusat Statistik dan tidak berafiliasi dengan BPS, pemerintah,
      atau instansi mana pun. Untuk data resmi terbaru, kunjungi <strong>bps.go.id</strong>. Situs ini adalah karya
      orisinal: nama, desain, teks, dan grafiknya dibuat untuk situs ini.</p>
      <h2>Teknis</h2>
      <p class="fine">Situs statis tanpa build step. Grafik digambar sebagai SVG oleh JavaScript situs sendiri (tanpa pustaka luar).
      Semua file dimuat dari server yang sama; tidak ada permintaan jaringan ke pihak lain.</p>
    </article>
  </section>`;
}

// ---- Routing ----------------------------------------------------------
export const ROUTES = {
  '/': { title: 'Beranda', render: renderHome },
  '/population': { title: 'Penduduk', render: renderPopulation },
  '/economy': { title: 'Ekonomi', render: renderEconomy },
  '/people': { title: 'Masyarakat', render: renderPeople },
  '/regions': { title: 'Daerah', render: renderRegions },
  '/data': { title: 'Data', render: renderData },
  '/about': { title: 'Tentang', render: renderAbout },
};

// Wire the interactive controls of the page that was just rendered.
export function bindPage(route) {
  if (route === '/') bindHome();
  if (route === '/population') bindProvinceTable('prov-search', 'prov-table', 'prov-count', 'pop');
  if (route === '/economy') bindEconomy();
  if (route === '/regions') bindRegions();
  if (route === '/data') bindData();
}

function bindHome() {
  const chart = document.querySelector('#pop-chart');
  if (!chart) return;
  const series = POPULATION_SERIES.map((d) => ({ label: String(d.year), value: d.value }));
  document.querySelectorAll('.range-toggle [data-range]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.range-toggle [data-range]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const r = btn.dataset.range;
      const slice = r === 'recent' ? series.slice(5) : r === 'early' ? series.slice(0, 5) : series;
      chart.innerHTML = lineChart(slice, { color: TEAL });
    });
  });
}

function bindEconomy() {
  const chart = document.querySelector('#gdp-chart');
  if (!chart) return;
  const series = GDP_GROWTH.map((d) => ({ label: String(d.year), value: d.value }));
  document.querySelectorAll('.range-toggle [data-range]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.range-toggle [data-range]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      const slice = btn.dataset.range === 'recent' ? series.slice(5) : series;
      chart.innerHTML = barChart(slice, { highlightLast: true });
    });
  });
}

function sortProvinces(list, key) {
  const copy = [...list];
  if (key === 'name') return copy.sort((a, b) => a.name.localeCompare(b.name, 'id'));
  if (key === 'density') return copy.sort((a, b) => provinceDensity(b) - provinceDensity(a));
  if (key === 'area') return copy.sort((a, b) => b.area - a.area);
  return copy.sort((a, b) => b.pop - a.pop);
}

function bindProvinceTable(inputId, tableId, countId, defaultSort) {
  const input = document.getElementById(inputId);
  const tbody = document.querySelector(`#${tableId} tbody`);
  const count = document.getElementById(countId);
  if (!input || !tbody) return;
  let sortKey = defaultSort;
  const apply = () => {
    const q = input.value.trim().toLowerCase();
    let list = sortProvinces(PROVINCES, sortKey);
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));
    tbody.innerHTML = provinceRows(list);
    count.textContent = `${list.length} provinsi · Jumlah penduduk provinsi (dalam ribuan) dibulatkan; totalnya sama dengan angka nasional dalam batas pembulatan.`;
  };
  input.addEventListener('input', apply);
  document.querySelectorAll('.sort-group [data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sort-group [data-sort]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      sortKey = btn.dataset.sort;
      apply();
    });
  });
}

function bindRegions() {
  const input = document.getElementById('region-search');
  const tbody = document.querySelector('#region-table tbody');
  const count = document.getElementById('region-count');
  const detail = document.getElementById('region-detail');
  if (!input || !tbody) return;
  let sortKey = 'pop';
  const apply = () => {
    const q = input.value.trim().toLowerCase();
    let list = sortProvinces(PROVINCES, sortKey);
    if (q) list = list.filter((p) => p.name.toLowerCase().includes(q));
    tbody.innerHTML = regionRows(list);
    count.textContent = `${list.length} provinsi ditampilkan.`;
  };
  input.addEventListener('input', apply);
  document.querySelectorAll('.sort-group [data-sort]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sort-group [data-sort]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      sortKey = btn.dataset.sort;
      apply();
    });
  });
  tbody.addEventListener('click', (ev) => {
    const row = ev.target.closest('tr[data-prov]');
    if (row) showRegion(row.dataset.prov);
  });
  tbody.addEventListener('keydown', (ev) => {
    if (ev.key !== 'Enter') return;
    const row = ev.target.closest('tr[data-prov]');
    if (row) showRegion(row.dataset.prov);
  });
  function showRegion(name) {
    const ranked = sortProvinces(PROVINCES, 'pop');
    const idx = ranked.findIndex((p) => p.name === name);
    const p = PROVINCES.find((x) => x.name === name);
    if (p && detail) detail.innerHTML = regionDetail(p, idx + 1);
  }
}

function bindData() {
  const input = document.getElementById('data-search');
  const tbody = document.querySelector('#data-table tbody');
  const count = document.getElementById('data-count');
  const dl = document.getElementById('csv-download');
  if (!input || !tbody) return;
  let cat = 'Semua';
  const apply = () => {
    const q = input.value.trim().toLowerCase();
    let list = INDICATORS.filter((d) => (cat === 'Semua' || d.category === cat));
    if (q) list = list.filter((d) => (d.indicator + ' ' + d.value + ' ' + d.source).toLowerCase().includes(q));
    tbody.innerHTML = dataRows(list);
    count.textContent = `${list.length} indikator ditampilkan.`;
  };
  input.addEventListener('input', apply);
  document.querySelectorAll('.sort-group [data-cat]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.sort-group [data-cat]').forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');
      cat = btn.dataset.cat;
      apply();
    });
  });
  if (dl) {
    dl.addEventListener('click', () => {
      const header = 'Indikator;Nilai;Tahun;Sumber;Kategori\n';
      const body = INDICATORS.map((d) => [d.indicator, d.value, d.year, d.source, d.category].map((v) => `"${String(v).replace(/"/g, '""')}"`).join(';')).join('\n');
      const blob = new Blob(['\ufeff' + header + body], { type: 'text/csv;charset=utf-8' });
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = 'nusastat-indikator-utama.csv';
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 1000);
    });
  }
}
