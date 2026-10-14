// 'import': kata kunci JavaScript untuk memuat/memasukkan modul atau library dari luar
// 'React': library utama React untuk membangun antarmuka pengguna (UI) berbasis komponen
// 'from "react"': lokasi paket 'react' di node_modules tempat React diimpor
import React from "react";

// Mengimpor komponen AbuseReportHeader dari file lokal "./AbuseReportHeader" untuk menampilkan judul/header kartu
import AbuseReportHeader from "./AbuseReportHeader";

// Mengimpor komponen AbuseReportTable dari file lokal "./AbuseReportTable" untuk menampilkan tabel data laporan
import AbuseReportTable from "./AbuseReportTable";

// Mengimpor komponen AbuseReportEntryCount dari file lokal "./AbuseReportEntryCount" untuk menampilkan jumlah entri/data
import AbuseReportEntryCount from "./AbuseReportEntryCount";

// Mengimpor tipe data khusus (interface) 'AbuseReport' dari file "./types" untuk validasi tipe data laporan
import { AbuseReport } from "./types";

// 'interface': kata kunci TypeScript untuk mendefinisikan kontrak/struktur tipe objek
// 'AbuseReportCardProps': nama tipe props yang wajib dipenuhi saat memanggil komponen AbuseReportCard
interface AbuseReportCardProps {
  // 'reports': properti berupa daftar/array objek bertipe AbuseReport (data laporan penyalahgunaan)
  reports: AbuseReport[];
  // 'onViewContent': fungsi callback untuk melihat konten laporan, menerima parameter 'report' dan tidak mengembalikan nilai (void)
  onViewContent: (report: AbuseReport) => void;
  // 'onDelete': fungsi callback untuk menghapus laporan, menerima parameter 'id' (angka) dan tidak mengembalikan nilai (void)
  onDelete: (id: number) => void;
}

// 'export': kata kunci untuk mengekspor fungsi/komponen ini agar bisa diimpor dan digunakan di file lain
// 'default': kata kunci yang menandakan bahwa fungsi ini adalah ekspor utama dari file ini
// 'function': kata kunci untuk mendeklarasikan fungsi dalam JavaScript/TypeScript
// 'AbuseReportCard': nama komponen fungsi React (komponen kartu laporan)
// '{ reports, onViewContent, onDelete }': teknik destructuring untuk mengambil properti langsung dari argumen props
// ': AbuseReportCardProps': tipe TypeScript yang memastikan props yang diterima sesuai dengan interface AbuseReportCardProps
export default function AbuseReportCard({
  reports,
  onViewContent,
  onDelete,
}: AbuseReportCardProps) {
  // 'return': mengembalikan elemen tampilan (JSX) yang akan dirender oleh React ke layar
  return (
    // Tag <div>: elemen kontainer pembungkus utama kartu
    // className: daftar kelas CSS Tailwind (latar putih, border abu-abu, sudut melengkung 3px, padding 20px, bayangan tipis)
    <div className="bg-white border border-[#d2d6de] rounded-[3px] p-5 shadow-xs">
      {/* Merender komponen header kartu dengan mengirimkan properti title bernilai "Abuse Reports" */}
      <AbuseReportHeader title="Abuse Reports" />

      {/* Merender komponen tabel laporan dengan meneruskan data dan fungsi-fungsi handler */}
      <AbuseReportTable
        // Mengirimkan array data laporan ke komponen tabel
        reports={reports}
        // Mengirimkan fungsi callback untuk menangani aksi melihat konten laporan
        onViewContent={onViewContent}
        // Mengirimkan fungsi callback untuk menangani aksi menghapus laporan
        onDelete={onDelete}
      />

      {/* Merender komponen informasi jumlah total data laporan dengan mengambil panjang array (reports.length) */}
      <AbuseReportEntryCount count={reports.length} />
    </div>
  );
}

