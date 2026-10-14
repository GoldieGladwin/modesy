// 'import': kata kunci JavaScript untuk memuat modul navigasi
// '{ redirect }': fungsi Next.js untuk mengalihkan rute pengguna ke halaman lain secara otomatis
// 'from "next/navigation"': paket resmi navigasi Next.js App Router
import { redirect } from "next/navigation";

// 'export': kata kunci untuk mengekspor fungsi komponen ke sistem rute Next.js
// 'default': menandakan ini adalah komponen halaman default untuk URL '/login'
// 'function': kata kunci untuk mendeklarasikan fungsi JavaScript
// 'LoginPage': nama fungsi komponen halaman login
export default function LoginPage() {
  // 'redirect': mengarahkan pengguna ke halaman guest dengan parameter query '?login=true' agar modal login langsung terbuka
  redirect("/guest?login=true");
}

