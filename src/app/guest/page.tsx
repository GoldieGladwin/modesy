// 'import': kata kunci JavaScript untuk memuat modul atau library
// 'React': library inti React untuk mengelola siklus komponen dan antarmuka pengguna
// 'from "react"': modul library react dari dependencies
import React from "react";

// Mengimpor komponen utama 'MarketplaceHome' yang merangkum seluruh section beranda pasar (Hero, Kategori, Produk, Blog, dll.)
import MarketplaceHome from "@/components/home/MarketplaceHome";

// 'export': mengekspor fungsi agar dapat digunakan oleh sistem rute Next.js
// 'default': ekspor utama untuk halaman beranda pengunjung di rute '/guest'
// 'function': kata kunci untuk deklarasi fungsi JavaScript
// 'GuestHomePage': nama komponen halaman beranda khusus tamu/pengunjung
export default function GuestHomePage() {
  // 'return': mengembalikan elemen JSX yang akan dirender ke layar pengunjung
  // '<MarketplaceHome />': memanggil dan merender komponen komprehensif beranda marketplace
  return <MarketplaceHome />;
}

