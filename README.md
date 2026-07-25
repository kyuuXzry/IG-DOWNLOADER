# Instagram Downloader Plugin for WhatsApp Bot

> Plugin ini memungkinkan bot WhatsApp berbasis Baileys untuk mendownload video Instagram (Reels, Post, IGTV) menggunakan API publik `igexport.com`.  
> **Dukungan:** CommonJS (require) dan ESM (import).

---

## ✨ Fitur

- Download video Instagram dari link Reels, Post, atau IGTV.
- Menggunakan API `igexport.com` yang respons JSON polos (tidak perlu CookieJar/Puppeteer).
- Menampilkan judul video dan status download.
- Terintegrasi dengan sistem registrasi & limit harian bawaan bot.
- Ringan – hanya butuh `axios`.

---

## 📦 Persyaratan

- Bot WhatsApp menggunakan **Baileys**.
- Node.js versi **16+**.
- Plugin ini mendukung **CommonJS** dan **ESM**.

---

## 🔧 Instalasi

1. **Copy** file `insta.js` ke folder `plugins` bot Anda.
2. **Install** dependensi:
   ```bash
   npm install axios