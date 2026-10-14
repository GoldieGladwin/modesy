// Komponen optimasi gambar otomatis Next.js (lazy-loading, WebP/AVIF otomatis, pencegahan pergeseran tata letak)
import Image from "next/image";
import Link from "next/link";

// Struktur data model kategori (id string, nama kategori, path gambar, dan URL rute)
interface Category {
  id: string;
  name: string;
  image: string;
  href: string;
}

// Data daftar 12 kategori populer marketplace beserta tautan halaman tujuan masing-masing
const categories: Category[] = [
  {
    id: "1",
    name: "Clothing",
    image: "/categories/clothing.jpg",
    href: "/category/clothing",
  },
  {
    id: "2",
    name: "Home & Living",
    image: "/categories/home_living.jpg",
    href: "/category/home-living",
  },
  {
    id: "3",
    name: "Toys & Entertainment",
    image: "/categories/toys.jpg",
    href: "/category/toys",
  },
  {
    id: "4",
    name: "Women's Clothing",
    image: "/categories/womens_clothing.jpg",
    href: "/category/womens-clothing",
  },
  {
    id: "5",
    name: "Men's Clothing",
    image: "/categories/mens_clothing.jpg",
    href: "/category/mens-clothing",
  },
  {
    id: "6",
    name: "Furniture",
    image: "/categories/furniture.jpg",
    href: "/category/furniture",
  },
  {
    id: "7",
    name: "Necklaces & Accessories",
    image: "/categories/necklaces.jpg",
    href: "/category/accessories",
  },
  {
    id: "8",
    name: "Graphics",
    image: "/categories/graphics.jpg",
    href: "/category/graphics",
  },
  {
    id: "9",
    name: "Painting",
    image: "/categories/painting.jpg",
    href: "/category/painting",
  },
  {
    id: "10",
    name: "Boots",
    image: "/categories/boots.jpg",
    href: "/category/boots",
  },
  {
    id: "11",
    name: "Decorative Pillows",
    image: "/categories/pillows.jpg",
    href: "/category/pillows",
  },
  {
    id: "12",
    name: "Handbags",
    image: "/categories/handbags.jpg",
    href: "/category/handbags",
  },
];

export default function ShopByCategory() {
  return (
    // Wadah section beranda dengan latar putih, padding atas-bawah 64px, dan batas lebar maksimal 7xl
    <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 w-full max-w-7xl mx-auto">
      {/* Header section: judul "Shop By Category" di kiri dan link "View All" di kanan */}
      <div className="flex justify-between items-end mb-8">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
          Shop By Category
        </h2>
        {/* Tautan untuk melihat seluruh kategori marketplace */}
        <Link
          href="/categories"
          className="text-sm font-semibold text-gray-800 hover:text-[#00a99d] hover:underline transition-all pb-1 flex items-center gap-1 group"
        >
          View All 
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="transform transition-transform group-hover:translate-x-1" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
          </svg>
        </Link>
      </div>

      {/* Grid responsif: 2 kolom di ponsel, 3 kolom di tablet, dan 6 kolom di desktop */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-6 gap-y-10">
        {/* Iterasi setiap item kategori untuk dirender sebagai lingkaran gambar dan teks */}
        {categories.map((category) => (
          <div key={category.id} className="flex flex-col items-center">
            {/* Pembungkus gambar berbentuk lingkaran bulat (rounded-full) dengan efek hover zoom */}
            <Link 
              href={category.href}
              className="group relative w-full max-w-[160px] aspect-square mb-4 rounded-full overflow-hidden bg-[#fafafa] shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              {/* Gambar kategori; 'fill' mengisi penuh kontainer dan 'sizes' memandu browser mengunduh resolusi yang tepat */}
              <Image
                src={category.image}
                alt={category.name}
                fill
                className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-[1.2]"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
              />
              
              {/* Lapisan overlay gelap semi-transparan yang muncul saat kartu di-hover dengan teks "Shop Now" */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center pointer-events-none z-10">
                <span className="text-white text-xs sm:text-sm font-semibold flex items-center gap-1">
                  Shop Now
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
                  </svg>
                </span>
              </div>
            </Link>
            
            {/* Teks label nama kategori yang dapat diklik */}
            <Link 
              href={category.href}
              className="text-sm font-semibold text-gray-800 text-center px-2 hover:text-[#00a99d] hover:underline transition-all duration-200"
            >
              {category.name}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

