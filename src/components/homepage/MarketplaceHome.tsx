import React from "react";
import Hero from "./Hero";
import ShopByCategory from "./ShopByCategory";
import SpecialOffers from "./SpecialOffers";
import FeaturedProducts from "@/components/layout/guest/Featured-Products";
import NewArrivals from "./NewArrivals";
import ClothingSection from "./ClothingSection";
import JewelrySection from "./JewelrySection";
import BrandSection from "./BrandSection";
import BlogSection from "./BlogSection";

export default function MarketplaceHome() {
  return (
    <main className="flex-1 w-full space-y-6 pb-12">
      {/* 1. Hero Carousel Slider Banner */}
      <Hero />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-8">
        {/* 2. Shop By Category */}
        <ShopByCategory />

        {/* 3. Special Offers + Promo Banners */}
        <SpecialOffers />

        {/* 4. Featured Products */}
        <FeaturedProducts />

        {/* 5. New Arrivals + Promo Banners */}
        <NewArrivals />

        {/* 6. Clothing Section with Subcategory Filters */}
        <ClothingSection />

        {/* 7. Jewelry & Accessories Carousel */}
        <JewelrySection />

        {/* 8. Shop By Brand */}
        <BrandSection />

        {/* 9. Latest Blog Posts */}
        <BlogSection />
      </div>
    </main>
  );
}
