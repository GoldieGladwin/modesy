// 'import type': mengimpor hanya definisi tipe TypeScript dari modul Next.js tanpa memuat runtime kode
// '{ Metadata }': tipe bawaan Next.js untuk konfigurasi metadata SEO (title, description, icon, dll.)
import type { Metadata } from "next";

// Mengimpor font loader 'Open_Sans' dari Google Fonts yang dioptimasi secara otomatis oleh Next.js
import { Open_Sans } from "next/font/google";

// Mengimpor 'AuthProvider' dari context/AuthContext untuk menyediakan state autentikasi ke seluruh aplikasi
import { AuthProvider } from "@/context/AuthContext";

// Mengimpor file stylesheet global (CSS Tailwind dan styling kustom proyek)
import "./globals.css";

// Inisialisasi dan konfigurasi font Google 'Open Sans'
const openSans = Open_Sans({
  // Menentukan subset karakter yang didukung (alfabet latin)
  subsets: ["latin"],
  // Menentukan nama variabel CSS untuk font agar bisa digunakan di Tailwind CSS
  variable: "--font-open-sans",
  // Menentukan varian ketebalan font yang diunduh (light 300 hingga bold 700)
  weight: ["300", "400", "500", "600", "700"],
});

// 'export const metadata': mengekspor objek konfigurasi metadata halaman untuk tag <head> HTML secara global
export const metadata: Metadata = {
  // Menetapkan judul situs web yang muncul di tab browser
  title: "Modesy - Marketplace - Classified Ads Script",
  // Menetapkan deskripsi ringkas website untuk keperluan SEO mesin pencari
  description: "Modesy Marketplace",
};

// 'export default function RootLayout': komponen Root Layout utama yang membungkus semua halaman di Next.js App Router
export default function RootLayout({
  // '{ children }': properti bawaan yang berisi konten halaman anak (sub-halaman) yang sedang dibuka
  children,
}: {
  // ': React.ReactNode': tipe data TypeScript untuk elemen anak React (JSX, teks, fragmen, dll.)
  children: React.ReactNode;
}) {
  // 'return': mengembalikan struktur dasar dokumen HTML
  return (
    // Tag <html>: elemen akar halaman web dengan atribut bahasa Inggris (lang="en")
    // className: menyisipkan variabel CSS font Open Sans dan styling tinggi layar penuh serta anti-aliasing font
    <html lang="en" className={`${openSans.variable} h-full antialiased`}>
      {/* Tag <body>: badan dokumen dengan tinggi minimum 100%, tata letak flexbox vertikal, dan font standar sans */}
      <body className="min-h-full flex flex-col font-sans">
        {/* Membungkus seluruh aplikasi dengan AuthProvider agar semua halaman dapat mengakses data user & login */}
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}

