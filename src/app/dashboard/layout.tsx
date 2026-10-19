"use client";

import React, { useState, useEffect } from "react";
import VendorDashboardSidebar from "@/components/vendor/dashboard/VendorDashboardSidebar";
import VendorDashboardNavbar from "@/components/vendor/dashboard/VendorDashboardNavbar";
import { useAuth } from "@/context/AuthContext";

const VENDOR_USER = {
  name: "Trendshop",
  email: "trendshop@gmail.com",
  role: "vendor" as const,
  avatar: "/assets/img/trendshop-avatar.jpg",
  is_vendor: true,
  wallet_balance: 793.52,
};

export default function RootDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, login } = useAuth();

  useEffect(() => {
    // In vendor dashboard, ensure vendor role
    if (user?.role !== "vendor") {
      const isExplicitLogout =
        typeof window !== "undefined" &&
        sessionStorage.getItem("modesy_explicit_logout") === "true";
      if (!isExplicitLogout) {
        login(VENDOR_USER);
      }
    }
  }, [user?.role, login]);

  return (
    <div className="min-h-screen bg-[#f4f6f9] flex font-sans text-gray-800 overflow-x-hidden">
      {/* 1. FIXED SIDEBAR */}
      <VendorDashboardSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Backdrop for mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden transition-opacity"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* 2. MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
        <VendorDashboardNavbar
          onToggleSidebar={() => setSidebarOpen((prev) => !prev)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-7">{children}</main>
      </div>
    </div>
  );
}
