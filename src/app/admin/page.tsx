// 'import': kata kunci JavaScript untuk memuat modul atau pustaka luar
// 'React': library inti React untuk pembuatan komponen antarmuka pengguna
// 'from "react"': modul library react dari package.json
import React from "react";

// Mengimpor komponen tampilan beranda marketplace 'MarketplaceHome' untuk mode tampilan admin
import MarketplaceHome from "@/components/home/MarketplaceHome";

// 'export': mengekspor komponen agar bisa dikenali oleh Next.js App Router
// 'default': ekspor utama untuk URL '/admin'
// 'function': kata kunci untuk membuat fungsi JavaScript
// 'AdminHomePage': nama fungsi komponen halaman utama saat admin melihat tampilan beranda publik
export default function AdminHomePage() {
  // 'return': mengembalikan elemen JSX ke browser
  // '<MarketplaceHome />': merender tampilan beranda marketplace lengkap dengan header/navbar mode admin
  return <MarketplaceHome />;
}

