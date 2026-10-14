// 'import': kata kunci JavaScript untuk memuat dependensi atau fungsi dari modul eksternal
// '{ redirect }': fungsi navigasi bawaan Next.js untuk mengalihkan pengguna ke URL lain (server-side redirect)
// 'from "next/navigation"': modul resmi Next.js App Router untuk navigasi dan manipulasi rute
import { redirect } from "next/navigation";

// 'export': kata kunci untuk mengekspor fungsi ini agar dapat diakses oleh Next.js App Router
// 'default': menandakan fungsi ini adalah komponen halaman utama (default export) untuk rute root '/'
// 'function': kata kunci untuk mendeklarasikan fungsi JavaScript
// 'RootPage': nama fungsi komponen halaman utama aplikasi Modesy
export default function RootPage() {
  // 'redirect': memanggil fungsi pengalihan rute secara otomatis
  // '"/guest"': rute tujuan yang diarahkan, yaitu halaman utama untuk pengunjung/tamu (guest)
  redirect("/guest");
}

