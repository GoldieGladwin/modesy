// 'import': kata kunci JavaScript untuk memuat dependensi dari paket lain
// '{ redirect }': fungsi navigasi bawaan Next.js untuk pengalihan halaman secara instan
// 'from "next/navigation"': paket modul navigasi resmi dari Next.js App Router
import { redirect } from "next/navigation";

// 'export': mengekspor fungsi komponen agar dapat dideteksi oleh routing Next.js
// 'default': ekspor utama untuk menangani rute URL '/register'
// 'function': kata kunci untuk membuat fungsi JavaScript
// 'RegisterRedirect': nama fungsi komponen untuk menangani redirect pendaftaran
export default function RegisterRedirect() {
  // 'redirect': mengarahkan pengguna yang mengakses '/register' ke URL halaman pendaftaran '/guest/register'
  redirect("/guest/register");
}

