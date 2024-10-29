This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/pages/api-reference/create-next-app).

# 🚊 LRT Jakarta x JakOne Pay - Integrasi Pembayaran

### 🚀 Cara Menjalankan Proyek

1. Clone Repository

```bash
git clone https://github.com/your-username/your-project.git

cd your-project
```
2. Install Package
```bash
npm install
# or
yarn install
# or
bun install
```
3. Jalankan Aplikasi
```bash
npm run dev
```
4. Akses Aplikasi
```bash 
http://localhost:3000
```

### 🔧 Teknologi yang Digunakan
1. Next.js – Framework React untuk SSR dan routing.
2. TailwindCSS – Untuk styling yang cepat dan responsif.
3. Local Storage – Penyimpanan data lokal di browser.
4. Context API – Pengelolaan state aplikasi.
5. Winston – Logging untuk kebutuhan debugging.

### 📱 Responsivitas
- Menggunakan TailwindCSS untuk membuat tampilan responsif.
- Mendukung berbagai ukuran layar dari mobile hingga desktop.

### 🛡️ Keamanan
- Menggunakan Local Storage hanya untuk penyimpanan sementara.
- PIN dan OTP dienkripsi sebelum dikirim (implementasi enkripsi dapat ditambahkan menggunakan library seperti crypto-js).
