// '"use client"': instruksi Next.js bahwa komponen ini berjalan di sisi browser (Client Component) untuk mendukung interaksi state dan event click
"use client";

// Mengimpor komponen navigasi atas (topbar/navbar) panel admin yang berisi tombol toggle sidebar, notifikasi, dan profil
import AdminPanelNavbar from "@/components/admin/AdminPanelNavbar";

// Mengimpor komponen menu samping (sidebar) panel admin yang berisi seluruh tautan menu navigasi manajemen
import AdminPanelSidebar from "@/components/admin/AdminPanelSidebar";

// Mengimpor React dan hook 'useState' untuk mengelola state lokal buka/tutup sidebar
import React, { useState } from "react";

// 'export': kata kunci untuk mengekspor fungsi komponen agar dikenali sistem layout Next.js
// 'default': ekspor utama yang membungkus semua rute di dalam folder '/admin/admin-panel/*'
// 'function': kata kunci untuk mendeklarasikan fungsi komponen
// 'AdminPanelLayout': nama fungsi komponen shell layout utama Admin Panel Modesy
export default function AdminPanelLayout({
  // '{ children }': properti bawaan React yang menampung komponen halaman aktif di bawah panel admin
  children,
}: {
  // ': { children: React.ReactNode }': tipe TypeScript untuk memastikan properti children adalah elemen render React
  children: React.ReactNode;
}) {
  // 'const [sidebarOpen, setSidebarOpen] = useState(true)': mendefinisikan state lokal 'sidebarOpen' dengan nilai default 'true' (terbuka di layar desktop)
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // 'toggleSidebar': fungsi arrow untuk membalikkan kondisi state sidebar (buka jika tutup, tutup jika buka)
  const toggleSidebar = () => {
    // 'setSidebarOpen((prev) => !prev)': memperbarui state dengan membalik nilai boolean sebelumnya
    setSidebarOpen((prev) => !prev);
  };

  // 'return': mengembalikan elemen JSX yang membentuk susunan tata letak panel admin
  return (
    // Tag <div> kontainer paling luar dengan tinggi layar penuh (min-h-screen), latar abu-abu (#f4f6f9), dan tata letak flex
    <div className="min-h-screen bg-[#f4f6f9] font-sans text-gray-800 flex overflow-x-hidden">
      {/* 1. Komponen Sidebar admin: mengoper status terbuka (isOpen) dan aksi menutup sidebar (onClose) */}
      <AdminPanelSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Layer backdrop transparan gelap untuk perangkat mobile/tablet saat sidebar sedang terbuka */}
      {sidebarOpen && (
        <div
          // className: styling posisi tetap menutupi seluruh layar (fixed inset-0), latar hitam 50% opacity, hanya tampil di layar kecil (lg:hidden)
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity"
          // onClick: menutup sidebar saat area backdrop di luar sidebar diklik oleh pengguna
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 2. Pembungkus konten utama (Main Content Wrapper) */}
      <div
        // className: tata letak kolom fleksibel dengan animasi transisi padding kiri (lg:pl-64 saat sidebar buka, lg:pl-0 saat sidebar tutup)
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          sidebarOpen ? "lg:pl-64" : "lg:pl-0"
        }`}
      >
        {/* Komponen Navbar atas panel admin dengan meneruskan callback toggleSidebar ke tombol hamburger */}
        <AdminPanelNavbar onToggleSidebar={toggleSidebar} />

        {/* Tag <main>: area utama tempat konten halaman spesifik ({children}) ditampilkan */}
        <main className="flex-1 p-4 sm:p-6 lg:p-7">
          {children}
        </main>

        {/* Tag <footer>: bilah footer bawah panel admin yang menampilkan hak cipta dan versi aplikasi */}
        <footer className="bg-white border-t border-gray-200 px-6 py-3.5 text-xs text-gray-600 flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0">
          {/* Teks informasi hak cipta Modesy */}
          <div>
            Copyright 2025 <strong>Modesy</strong> - All Rights Reserved.
          </div>
          {/* Informasi nomor versi rilis Modesy */}
          <div className="text-gray-500 font-medium">
            Version <strong>2.7</strong>
          </div>
        </footer>
      </div>
    </div>
  );
}


