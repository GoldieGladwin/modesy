// 'import': kata kunci untuk memuat tipe dari library eksternal
// 'React': library React untuk mengakses tipe komponen UI seperti React.ComponentType
import React from "react";

// 'export interface AdminNavItem': mendefinisikan tipe data item navigasi pada sidebar admin
export interface AdminNavItem {
  // 'title': label teks nama menu yang ditampilkan pada navigasi
  title: string;
  // 'href': alamat URL tujuan saat menu navigasi diklik
  href: string;
  // 'icon': komponen ikon React yang menerima properti className opsional untuk styling
  icon: React.ComponentType<{ className?: string }>;
  // 'hasSubmenu?': penanda opsional boolean apakah menu ini memiliki anak menu (dropdown)
  hasSubmenu?: boolean;
  // 'badge?': label teks opsional untuk notifikasi atau badge angka pada menu
  badge?: string;
}

// 'export interface AdminNavSection': mendefinisikan kelompok/seksi menu pada sidebar admin
export interface AdminNavSection {
  // 'heading': judul seksi menu (contoh: "NAVIGATION", "MANAGEMENT")
  heading: string;
  // 'items': daftar item menu navigasi yang tergabung di dalam seksi ini bertipe AdminNavItem[]
  items: AdminNavItem[];
}

// 'export interface AdminUser': mendefinisikan struktur profil pengguna berstatus admin
export interface AdminUser {
  // 'name': nama lengkap admin
  name: string;
  // 'role': jabatan atau hak akses admin (contoh: "Super Admin", "Moderator")
  role: string;
  // 'email': alamat email akun admin
  email: string;
  // 'isOnline': status online/aktif admin saat ini (true/false)
  isOnline: boolean;
  // 'avatarUrl?': tautan gambar foto profil admin (opsional)
  avatarUrl?: string;
}

// 'export interface FeaturedCategoryItem': mendefinisikan kategori unggulan yang disorot di beranda
export interface FeaturedCategoryItem {
  // 'id': identitas unik kategori berupa string
  id: string;
  // 'name': nama tampilan kategori
  name: string;
  // 'order': urutan penampilan kategori (angka)
  order: number;
}

// 'export interface ProductByCategoryItem': mendefinisikan blok produk berdasarkan kategori tertentu
export interface ProductByCategoryItem {
  // 'id': identitas unik kategori
  id: string;
  // 'name': nama kategori yang ditampilkan
  name: string;
  // 'order': nomor urut penayangan blok produk
  order: number;
  // 'showSubcategories?': opsi boolean apakah sub-kategori juga ditampilkan sebagai filter tab
  showSubcategories?: boolean;
}

// 'export interface ModesyBannerItem': mendefinisikan data banner promosi/iklan pada Modesy
export interface ModesyBannerItem {
  // 'id': nomor identifikasi unik banner (angka)
  id: number;
  // 'imageUrl': alamat URL file gambar banner
  imageUrl: string;
  // 'url': alamat tautan eksternal/internal saat gambar banner diklik
  url: string;
  // 'language': bahasa target penayangan banner
  language: string;
  // 'order': prioritas urutan tampil banner
  order: number;
  // 'width': ukuran lebar banner (contoh: "full", "half")
  width: string;
  // 'location': posisi penempatan banner di halaman web
  location: string;
}

// 'export interface ModesyHomepageSettings': konfigurasi pengaturan tampilan tata letak beranda Modesy
export interface ModesyHomepageSettings {
  // 'featuredCategories': kontrol tampil/sembunyi kategori unggulan ("Show" atau "Hide")
  featuredCategories: "Show" | "Hide";
  // 'featuredProducts': kontrol tampil/sembunyi produk unggulan ("Show" atau "Hide")
  featuredProducts: "Show" | "Hide";
  // 'latestProducts': kontrol tampil/sembunyi produk terbaru ("Show" atau "Hide")
  latestProducts: "Show" | "Hide";
  // 'blogSlider': kontrol tampil/sembunyi slider postingan blog ("Show" atau "Hide")
  blogSlider: "Show" | "Hide";
  // 'productsPerRow': konfigurasi jumlah kolom produk per baris ("5 Products" atau "6 Products")
  productsPerRow: "5 Products" | "6 Products";
  // 'featuredProductsCount': jumlah maksimal produk unggulan yang ditampilkan
  featuredProductsCount: number;
  // 'latestProductsCount': jumlah maksimal produk terbaru yang ditampilkan
  latestProductsCount: number;
}

// 'export interface HomepageSection': mendefinisikan sebuah bagian/section yang dapat diatur urutannya di beranda
export interface HomepageSection {
  // 'id': kode identifikasi section
  id: string;
  // 'name': nama deskriptif section
  name: string;
  // 'description': penjelasan fungsi dari section tersebut
  description: string;
  // 'enabled': status aktif/tidaknya section (true untuk ditampilkan)
  enabled: boolean;
  // 'order': urutan posisi vertikal section pada beranda
  order: number;
  // 'itemCount?': jumlah maksimal item yang dimuat pada section ini (opsional)
  itemCount?: number;
}

// 'export interface HomepageBanner': mendefinisikan banner beranda yang dikelola di panel admin
export interface HomepageBanner {
  // 'id': nomor ID unik banner
  id: number;
  // 'title': judul banner
  title: string;
  // 'location': letak atau slot penayangan banner di beranda
  location: string;
  // 'url': tautan tujuan saat banner diklik
  url: string;
  // 'imageUrl': path lokasi gambar banner
  imageUrl: string;
  // 'order': nomor urut penayangan banner
  order: number;
  // 'enabled': status apakah banner sedang aktif ditayangkan
  enabled: boolean;
}

// 'export interface HomepageSettings': struktur pengaturan preferensi fitur-fitur beranda marketplace
export interface HomepageSettings {
  // 'featuredProductsCount': kuota jumlah produk unggulan
  featuredProductsCount: number;
  // 'specialOffersCount': kuota jumlah promo khusus
  specialOffersCount: number;
  // 'newArrivalsCount': kuota jumlah produk baru rilis
  newArrivalsCount: number;
  // 'blogPostsCount': kuota jumlah artikel blog
  blogPostsCount: number;
  // 'showBrandSlider': saklar boolean untuk menampilkan slider brand/merek
  showBrandSlider: boolean;
  // 'showCategoryGrid': saklar boolean untuk menampilkan grid kartu kategori
  showCategoryGrid: boolean;
  // 'enableInfiniteScroll': saklar boolean untuk mengaktifkan scroll tanpa batas
  enableInfiniteScroll: boolean;
  // 'selectedCategories': array ID kategori yang dipilih untuk ditampilkan di beranda
  selectedCategories: string[];
}