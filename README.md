[![best national statistics site](https://make.fun/badge/best-national-statistics-site-20261126-0539.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![rank](https://make.fun/badge/best-national-statistics-site-20261126-0539/iryckcorp2-commits/best-national-statistics-site-20261126-0539/rank.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)
[![reward](https://make.fun/badge/best-national-statistics-site-20261126-0539/iryckcorp2-commits/best-national-statistics-site-20261126-0539/reward.svg)](https://make.fun/bounty/best-national-statistics-site-20261126-0539)

# NusaStat — Statistik Indonesia

Portal statistik nasional tentang Indonesia: penduduk, ekonomi, pembangunan
manusia dan daerah — dengan angka resmi, sumber dan tahun yang jelas pada
tiap angka. Dibuat untuk lomba make.fun
[best national statistics site](https://make.fun/bounty/best-national-statistics-site-20261126-0539).

Situs ini statis: file-file di `app/` disajikan apa adanya, tanpa build step
dan tanpa permintaan jaringan. Buka `app/index.html` di Chrome desktop atau
di ponsel dan semuanya berjalan — halaman, grafik SVG, pencarian, pengurutan,
dan unduh CSV.

## Isi situs

- **Beranda** — delapan indikator utama, tren penduduk 2015–2024 dengan
  pengalih rentang tahun, provinsi terpadat, dan rilis BPS terbaru.
- **Penduduk** — tren penduduk, struktur usia, dan tabel 38 provinsi yang bisa
  dicari dan diurutkan (penduduk, nama, kepadatan).
- **Ekonomi** — pertumbuhan PDB, struktur PDB menurut lapangan usaha, inflasi,
  dan perdagangan luar negeri 2024.
- **Masyarakat** — IPM 2015–2024, pengangguran dan kemiskinan, pendidikan,
  kesehatan, dan konektivitas.
- **Daerah** — detail tiap provinsi (klik baris tabel) dan peringkat kepadatan.
- **Data** — seluruh 24 indikator utama dalam satu tabel yang bisa dicari,
  disaring per kategori, dan diunduh sebagai CSV.
- **Tentang** — sumber data lengkap dan cara mengutip.

## Angka

Semua angka berasal dari publikasi resmi — Badan Pusat Statistik (BPS),
Kementerian Kesehatan, dan APJII — dengan sumber dan tahun dicantumkan pada
tiap angka. Contoh: penduduk 281,6 juta jiwa (BPS, proyeksi pertengahan
2024); PDB Rp 22.139 triliun dan tumbuh 5,03% (BPS, 2024); IPM 75,02
(BPS, 2024). NusaStat bukan situs resmi BPS dan tidak berafiliasi dengannya.

## Menjalankan

```sh
# layani app/ di http://localhost:8080
node serve.ts
```

atau gunakan server statis apa pun dengan `app/` sebagai root.

## Struktur repositori

- `app/` — situs: `index.html`, `style.css`, `main.js` (router hash),
  `views.js` (halaman), `charts.js` (grafik SVG), `data.js` (angka resmi).
- `main.ts` — program penyerahan (Node 22): menyalin `app/` dan
  `screenshots/` ke `/output` dan menulis `dossier.json` dengan
  `vendor/makefun-frontend.ts`.
- `screenshots/` — 3–4 tangkapan layar situs yang sedang berjalan.
- `vendor/makefun-frontend.ts` — pustaka make.fun dari kit, tanpa diubah.

## Lisensi

MIT — lihat [LICENSE](LICENSE).
