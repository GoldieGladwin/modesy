// '"use client"': direktif Next.js untuk menandai bahwa file ini adalah Client Component (dieksekusi di browser, mendukung hooks dan interaktivitas)
"use client";

// 'import': kata kunci JavaScript untuk memuat dependensi luar
// 'React': library inti React untuk merender komponen UI
import React from "react";

// '{ usePathname }': hook Next.js untuk membaca path URL halaman yang sedang dibuka saat ini
import { usePathname } from "next/navigation";

// Mengimpor komponen header khusus tampilan admin (navigasi bar, tombol panel admin, keranjang, profil admin)
import AdminHeader from "@/components/layout/admin/AdminHeader";

// Mengimpor komponen footer khusus admin yang berisi link navigasi bawah dan hak cipta
import AdminFooter from "@/components/layout/admin/AdminFooter";

// 'export': mengekspor fungsi komponen ke sistem layout Next.js
// 'default': ekspor utama untuk membungkus seluruh rute di bawah direktori '/admin'
// 'function': kata kunci untuk deklarasi fungsi komponen
// 'AdminLayout': nama fungsi komponen layout area admin
export default function AdminLayout({
  // '{ children }': properti bawaan React yang menampung komponen halaman yang sedang aktif di rute /admin/*
  children,
}: {
  // ': { children: React.ReactNode }': tipe TypeScript untuk memastikan properti children adalah elemen render React yang valid
  children: React.ReactNode;
}) {
  // 'const pathname = usePathname()': memanggil hook usePathname untuk mendapatkan path URL browser (misal: '/admin/admin-panel' atau '/admin')
  const pathname = usePathname();

  // Memeriksa apakah URL yang aktif dimulai dengan rute panel kontrol admin (/admin/admin-panel)
  const isAdminPanel = pathname?.startsWith("/admin/admin-panel");

  // Memeriksa apakah URL yang aktif dimulai dengan rute dashboard admin (/admin/dashboard)
  const isDashboard = pathname?.startsWith("/admin/dashboard");

  // Logika kondisi: jika sedang berada di dalam Admin Panel atau Dashboard internal
  if (isAdminPanel || isDashboard) {
    // Kembalikan children secara langsung di dalam React Fragment (<>...</>) tanpa membungkus dengan AdminHeader & AdminFooter publik, karena Admin Panel sudah memiliki sidebar dan topbar sendiri
    return <>{children}</>;
  }

  // Jika sedang berada di tampilan luar/beranda publik admin, terapkan layout lengkap dengan AdminHeader & AdminFooter
  return (
    // Tag <div>: elemen pembungkus utama dengan tinggi minimal layar penuh (min-h-screen), warna latar abu-abu muda (bg-[#f8f9fa]), susunan flexbox kolom, font sans, dan warna teks abu-abu gelap
    <div className="min-h-screen bg-[#f8f9fa] flex flex-col font-sans text-gray-800">
      {/* Merender navigasi header atas admin */}
      <AdminHeader />

      {/* Kontainer fleksibel pembungkus isi halaman (children) dengan lebar penuh (w-full) */}
      <div className="flex-1 w-full">{children}</div>

      {/* Merender footer bawah admin */}
      <AdminFooter />
    </div>
  );
}

