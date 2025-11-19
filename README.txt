# Website Ekspedisi Trucking – Paket Basic

File:
- `index.html` – struktur halaman
- `styles.css` – gaya/tampilan (ubah color brand di :root)
- `script.js` – logika form WhatsApp

## Kustomisasi
1) Ganti `BRANDNAME` (judul, teks), `WA_NUMBER` (format 62…), email & alamat.
2) Ubah warna brand di `styles.css` bagian `:root` (`--brand`, `--brand-dark`).
3) (Opsional) Ganti font Google Fonts sesuai kebutuhan.

## Deploy
- Upload ketiga file ke folder `public_html` (shared hosting) atau root web server.
- Pastikan file `index.html` berada di root agar dibuka otomatis saat akses domain.

## Apakah perlu PHP?
Tidak untuk versi Basic. Semua fitur berjalan statis (HTML/CSS/JS) dan mengarahkan form ke WhatsApp.
PHP/Backend baru diperlukan jika ingin:
- Cek ongkir dinamis dari database/API
- Tracking dengan login admin
- Simpan order ke server & kirim email otomatis
