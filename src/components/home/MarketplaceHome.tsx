// 'import': kata kunci JavaScript untuk memuat modul dan komponen
// 'React': library inti React untuk merender antarmuka pengguna
import React from "react";

// Mengimpor komponen slider banner utama (Hero) di bagian atas beranda
import Hero from "@/components/home/Hero";

// Mengimpor komponen navigasi kategori produk populer (Shop By Category)
import ShopByCategory from "@/components/home/ShopByCategory";

// Mengimpor komponen penawaran promo spesial dan banner diskon (Special Offers)
import SpecialOffers from "@/components/home/SpecialOffers";

// Mengimpor komponen grid daftar produk unggulan (Featured Products)
import FeaturedProducts from "@/components/layout/guest/Featured-Products";

// Mengimpor komponen produk terbaru yang baru saja diunggah ke pasar (New Arrivals)
import NewArrivals from "@/components/home/NewArrivals";

// Mengimpor section khusus produk pakaian beserta filter sub-kategori (Clothing Section)
import ClothingSection from "@/components/home/ClothingSection";

// Mengimpor carousel kategori perhiasan dan aksesoris (Jewelry Section)
import JewelrySection from "@/components/home/JewelrySection";

// Mengimpor section slider logo merek/brand terverifikasi (Brand Section)
import BrandSection from "@/components/home/BrandSection";

// Mengimpor section daftar artikel blog dan berita terbaru (Blog Section)
import BlogSection from "@/components/home/BlogSection";

// 'export': membagikan komponen ini agar dapat diimpor di halaman publik (/guest) maupun admin (/admin)
// 'default': ekspor utama untuk komponen MarketplaceHome
// 'function': kata kunci deklarasi fungsi komponen
// 'MarketplaceHome': nama fungsi komponen perakit beranda marketplace
export default function MarketplaceHome() {
  // 'return': mengembalikan elemen JSX yang menyusun struktur tampilan beranda
  return (
    // Tag <main>: wadah semantik utama dengan fleksibilitas lebar penuh (w-full), jarak vertikal antar bagian (space-y-6), dan padding bawah (pb-12)
    <main className="flex-1 w-full space-y-6 pb-12">
      {/* 1. Merender banner carousel hero slider di bagian paling atas */}
      <Hero />

      {/* Kontainer tengah dengan lebar maksimal (max-w-7xl), posisi tengah (mx-auto), padding horizontal (px-4), dan jarak antar section (space-y-8) */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* 2. Merender daftar kategori produk */}
        <ShopByCategory />

        {/* 3. Merender penawaran spesial dan banner promosi */}
        <SpecialOffers />

        {/* 4. Merender daftar produk unggulan */}
        <FeaturedProducts />

        {/* 5. Merender produk terbaru */}
        <NewArrivals />

        {/* 6. Merender section produk pakaian & busana */}
        <ClothingSection />

        {/* 7. Merender section produk perhiasan & aksesoris */}
        <JewelrySection />

        {/* 8. Merender deretan merek dagang / brand rekanan */}
        <BrandSection />

        {/* 9. Merender cuplikan artikel blog terbaru */}
        <BlogSection />
      </div>
    </main>
  );
}

