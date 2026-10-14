"use client";

// 'useRef': hook React untuk menyimpan referensi nilai mutable (koordinat drag) tanpa memicu re-render komponen
import React, { useState, useEffect, useRef } from "react";
// Mengimpor komponen Link Next.js untuk navigasi rute client-side yang cepat
import Link from "next/link";
// Mengimpor ikon navigasi panah kiri dan kanan dari library lucide-react
import { ChevronLeft, ChevronRight } from "lucide-react";

// Struktur data satu item brand (id angka, nama brand, dan elemen visual logo berupa ReactNode)
interface BrandItem {
  id: number;
  name: string;
  logo: React.ReactNode;
}

// Daftar array statis merek dagang (brands) yang berisi logo SVG dan ikon masing-masing merek
const brands: BrandItem[] = [

  {
    id: 1,
    name: "Armani",
    logo: (
      <div className="flex flex-col items-center justify-center pointer-events-none">
        <svg className="w-12 h-9 text-gray-900" viewBox="0 0 100 50" fill="currentColor">
          <path d="M50 8c-3 0-5 2-5 4 0 3 2 5 5 5s5-2 5-5c0-2-2-4-5-4zm-14 8c-6 0-14 3-20 6 3 3 8 7 14 7 3-3 5-8 6-13zm28 0c1 5 3 10 6 13 6 0 11-4 14-7-6-3-14-6-20-6zm-14 8c-3 0-6 3-6 7 2 6 5 11 6 15 1-4 4-9 6-15 0-4-3-7-6-7zm-12 1c-4 5-8 10-14 13 6 2 12 3 18 3-1-5-3-11-4-16zm24 0c-1 5-3 11-4 16 6 0 12-1 18-3-6-3-10-8-14-13z" />
        </svg>
      </div>
    ),
  },
  {
    id: 2,
    name: "Burberry",
    logo: (
      <div className="flex flex-col items-center justify-center text-[#1e3a8a] pointer-events-none">
        <svg className="w-11 h-8" viewBox="0 0 100 70" fill="currentColor">
          <path d="M30 15c2-4 8-8 15-5 3 2 6 6 8 10 3 2 8 2 12 0-2 4-5 8-8 10 3 3 7 4 11 3-3 4-7 7-12 8 4 5 10 7 16 8-8 4-17 5-25 3-4-1-8-3-11-6-2 3-5 5-9 6 3-4 5-9 6-14-5-1-10-3-14-6 5-1 9-3 13-6-4-4-7-9-8-15 4 1 8 3 11 5-1-4-1-8 0-12z" />
          <text x="25" y="65" fontSize="11" fontWeight="bold" letterSpacing="2">PRORSUM</text>
        </svg>
      </div>
    ),
  },
  {
    id: 3,
    name: "Diesel",
    logo: (
      <div className="bg-[#e11d48] text-white font-black px-3.5 py-1 text-sm tracking-wider uppercase border border-red-700 shadow-xs pointer-events-none">
        DIESEL
      </div>
    ),
  },
  {
    id: 4,
    name: "Dockers",
    logo: (
      <div className="flex flex-col items-center justify-center text-[#1e293b] pointer-events-none">
        <div className="flex items-center gap-1 font-black text-xs tracking-widest uppercase">
          <span className="text-[10px]">⚓</span>
          <span>DOCKERS</span>
          <span className="text-[10px]">⚓</span>
        </div>
      </div>
    ),
  },
  {
    id: 5,
    name: "Gucci",
    logo: (
      <div className="flex flex-col items-center justify-center text-gray-900 pointer-events-none">
        <span className="text-base font-serif font-black tracking-widest">GUCCI</span>
        <div className="flex -space-x-1.5 opacity-80 scale-75">
          <div className="w-5 h-5 rounded-full border-2 border-gray-900"></div>
          <div className="w-5 h-5 rounded-full border-2 border-gray-900"></div>
        </div>
      </div>
    ),
  },
  {
    id: 6,
    name: "H&M",
    logo: (
      <div className="text-[#dc2626] font-black italic text-2xl tracking-tighter pointer-events-none">
        H&amp;M
      </div>
    ),
  },
  {
    id: 7,
    name: "Hugo Boss",
    logo: (
      <div className="flex flex-col items-center justify-center text-gray-900 leading-none pointer-events-none">
        <span className="text-[11px] font-bold text-[#b91c1c] tracking-widest uppercase mb-0.5">HUGO</span>
        <span className="text-base font-extrabold tracking-widest uppercase">BOSS</span>
      </div>
    ),
  },
  {
    id: 8,
    name: "Lacoste",
    logo: (
      <div className="flex flex-col items-center justify-center text-gray-900 pointer-events-none">
        <svg className="w-8 h-4 text-[#15803d]" viewBox="0 0 100 40" fill="currentColor">
          <path d="M10 20c10-8 30-12 50-8 10 2 20 6 30 14-8-1-16-1-24 1-5 1-10 4-15 7-12-1-24-4-35-10-2-1-4-2-6-4z" />
        </svg>
        <span className="text-[11px] font-black tracking-widest uppercase text-gray-900 mt-0.5">
          LACOSTE
        </span>
      </div>
    ),
  },
];

export default function BrandSection() {
  // Jumlah dasar brand asli (8 brand)
  const baseCount = brands.length;
  // Teknik infinite loop: menduplikasi array brand 3 kali agar transisi rotasi tampak tanpa batas (seamless)
  const extendedBrands = [...brands, ...brands, ...brands];

  // Indeks aktif dimulai dari set tengah (baseCount = 8) agar bisa digeser ke kiri maupun ke kanan
  const [currentIndex, setCurrentIndex] = useState(baseCount);
  // Mengontrol nyala/mati animasi transisi CSS saat posisi disetel ulang
  const [isTransitioning, setIsTransitioning] = useState(true);
  // Status pengunci (debounce) agar klik cepat tidak menumpuk animasi
  const [isMoving, setIsMoving] = useState(false);
  // Jumlah kartu brand yang ditampilkan per layar (responsif)
  const [itemsPerView, setItemsPerView] = useState(8);
  // Jarak pergeseran horizontal (dalam pixel) saat kartu digeser manual dengan kursor/jari
  const [dragOffset, setDragOffset] = useState(0);
  // Status apakah aksi drag sedang berlangsung
  const [isDragging, setIsDragging] = useState(false);
  // Menyimpan posisi X kursor saat awal klik tanpa memicu re-render komponen
  const startXRef = useRef<number | null>(null);

  // Efek samping untuk mendeteksi perubahan ukuran layar browser (responsive breakpoint)
  useEffect(() => {
    const updateItemsPerView = () => {
      const width = window.innerWidth;
      // Layar ponsel (<640px) menampilkan 3 brand
      if (width < 640) {
        setItemsPerView(3);
      // Layar tablet kecil (<768px) menampilkan 4 brand
      } else if (width < 768) {
        setItemsPerView(4);
      // Layar tablet besar/laptop (<1024px) menampilkan 6 brand
      } else if (width < 1024) {
        setItemsPerView(6);
      // Layar desktop besar menampilkan 8 brand
      } else {
        setItemsPerView(8);
      }
    };

    updateItemsPerView();
    // Memasang event listener resize jendela browser
    window.addEventListener("resize", updateItemsPerView);
    // Membersihkan listener saat komponen dilepas (unmount)
    return () => window.removeEventListener("resize", updateItemsPerView);
  }, []);

  // Handler tombol navigasi panah kanan: menggeser maju tepat 1 kartu brand
  const handleNext = () => {
    if (isMoving) return;
    setIsMoving(true);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev + 1);
  };

  // Handler tombol navigasi panah kiri: menggeser mundur tepat 1 kartu brand
  const handlePrev = () => {
    if (isMoving) return;
    setIsMoving(true);
    setIsTransitioning(true);
    setCurrentIndex((prev) => prev - 1);
  };

  // Mekanisme snapping melingkar: saat animasi selesai, reset posisi ke set tengah tanpa animasi agar mulus
  const handleTransitionEnd = () => {
    setIsMoving(false);
    // Jika mencapai akhir set ketiga, loncat kembali ke set kedua tanpa animasi
    if (currentIndex >= baseCount * 2) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev - baseCount);
    // Jika mencapai awal set pertama, loncat maju ke set kedua tanpa animasi
    } else if (currentIndex < baseCount) {
      setIsTransitioning(false);
      setCurrentIndex((prev) => prev + baseCount);
    }
  };

  // Mengaktifkan kembali animasi CSS setelah jeda singkat 50ms pasca reset posisi
  useEffect(() => {
    if (!isTransitioning) {
      const timer = setTimeout(() => {
        setIsTransitioning(true);
      }, 50);
      return () => clearTimeout(timer);
    }
  }, [isTransitioning]);

  // Logika interaksi drag mouse: mencatat koordinat awal saat tombol mouse ditekan
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    setDragOffset(0);
  };

  // Mengkalkulasi jarak pergeseran (dragOffset) saat mouse bergerak sambil ditekan
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || startXRef.current === null) return;
    setDragOffset(e.clientX - startXRef.current);
  };

  // Menyelesaikan drag saat klik mouse dilepas; memicu geser kartu jika jarak > 30px
  const handleMouseUp = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 30) {
      handlePrev();
    } else if (dragOffset < -30) {
      handleNext();
    }
    setDragOffset(0);
    startXRef.current = null;
  };

  // Membatalkan drag jika kursor keluar dari batas area carousel
  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
      startXRef.current = null;
    }
  };

  // Handler drag untuk layar sentuh (touchscreen ponsel/tablet)
  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    startXRef.current = e.touches[0].clientX;
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || startXRef.current === null) return;
    setDragOffset(e.touches[0].clientX - startXRef.current);
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset > 30) {
      handlePrev();
    } else if (dragOffset < -30) {
      handleNext();
    }
    setDragOffset(0);
    startXRef.current = null;
  };

  // Menghitung persentase lebar satu item brand berdasarkan jumlah item per layar
  const itemWidthPercentage = 100 / itemsPerView;

  return (
    <section className="w-full my-6 font-sans">
      {/* Judul section */}
      <h2 className="text-lg sm:text-xl font-bold text-gray-900 tracking-tight mb-3.5">
        Shop By Brand
      </h2>

      {/* Kontainer carousel dengan navigasi panah */}
      <div className="relative group select-none">
        {/* Tombol navigasi panah kiri */}
        <button
          type="button"
          onClick={handlePrev}
          className="absolute -left-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:text-[#00a99d] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Previous brand"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        {/* Kontainer track geser brand yang mendukung gesture drag */}
        <div
          className={`bg-white border border-gray-200 rounded-sm overflow-hidden shadow-2xs ${
            isDragging ? "cursor-grabbing" : "cursor-grab"
          }`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Rel slider (track) dengan kalkulasi transform translateX dinamis */}
          <div
            className="flex will-change-transform divide-x divide-gray-200"
            style={{
              transform: `translateX(calc(-${currentIndex * itemWidthPercentage}% + ${dragOffset}px))`,
              transition: isDragging
                ? "none"
                : isTransitioning
                ? "transform 450ms cubic-bezier(0.25, 1, 0.5, 1)"
                : "none",
            }}
            onTransitionEnd={handleTransitionEnd}
          >
            {/* Merender seluruh item brand hasil duplikasi */}
            {extendedBrands.map((brand, idx) => (
              <div
                key={`${brand.id}-${idx}`}
                className="shrink-0 h-20 sm:h-22 flex items-center justify-center p-3 hover:bg-gray-50/80 transition-colors group/item"
                style={{ width: `${itemWidthPercentage}%` }}
              >
                {/* Tautan ke halaman brand; cegah navigasi jika pengguna sedang melakukan swipe/drag */}
                <Link
                  href="/"
                  draggable={false}
                  onClick={(e) => {
                    if (isDragging) e.preventDefault();
                  }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <div className="transition-transform duration-200 group-hover/item:scale-105 pointer-events-none">
                    {brand.logo}
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Tombol navigasi panah kanan */}
        <button
          type="button"
          onClick={handleNext}
          className="absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-white border border-gray-200 shadow-md flex items-center justify-center text-gray-600 hover:text-[#00a99d] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Next brand"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </section>
  );
}
