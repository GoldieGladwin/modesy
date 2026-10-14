// '"use client"': direktif Next.js agar file ini dieksekusi di sisi klien (browser) untuk mendukung state dan localStorage
"use client";

// 'import React': mengimpor library inti React
// 'createContext': fungsi React untuk membuat Context global antar komponen
// 'useContext': hook React untuk membaca data dari Context
// 'useState': hook React untuk membuat dan mengelola state lokal
// 'useEffect': hook React untuk menjalankan efek samping (misal: inisialisasi data dari localStorage)
import React, { createContext, useContext, useState, useEffect } from "react";

// Mengimpor komponen pop-up modal login agar dapat dibuka secara global dari mana saja
import LoginModal from "@/components/auth/LoginModal";

// '{ useRouter }': hook Next.js App Router untuk navigasi dan redirect halaman secara programatis
import { useRouter } from "next/navigation";

// 'export interface User': mendefinisikan tipe data TypeScript untuk representasi objek pengguna (User)
export interface User {
  // 'name': nama tampilan pengguna bertipe string
  name: string;
  // 'email': alamat email pengguna bertipe string
  email: string;
  // 'role': peran pengguna, dibatasi hanya boleh bernilai "admin" atau "user" (union type)
  role: "admin" | "user";
  // 'avatar?': properti opsional (tanda ?) untuk URL gambar profil pengguna
  avatar?: string;
}

// 'interface AuthContextType': mendefinisikan struktur nilai dan fungsi yang disediakan oleh AuthContext
interface AuthContextType {
  // 'user': data pengguna yang sedang login, atau bernilai 'null' jika belum login
  user: User | null;
  // 'isLoggedIn': status boolean apakah pengguna sedang dalam kondisi login (true/false)
  isLoggedIn: boolean;
  // 'isLoginModalOpen': status boolean apakah pop-up modal login sedang terbuka
  isLoginModalOpen: boolean;
  // 'openLoginModal': fungsi untuk membuka jendela pop-up modal login
  openLoginModal: () => void;
  // 'closeLoginModal': fungsi untuk menutup jendela pop-up modal login
  closeLoginModal: () => void;
  // 'login': fungsi untuk melakukan login dengan data opsional pengguna
  login: (userData?: Partial<User>) => void;
  // 'logout': fungsi untuk mengeluarkan sesi pengguna saat ini
  logout: () => void;
}

// 'createContext': membuat instance konteks autentikasi dengan nilai awal undefined
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 'STORAGE_KEY': kunci string unik untuk menyimpan sesi login pengguna di browser localStorage
const STORAGE_KEY = "modesy_auth_user";

// 'export function AuthProvider': komponen pembungkus (Provider) yang menyediakan data autentikasi ke seluruh aplikasi
export function AuthProvider({ children }: { children: React.ReactNode }) {
  // 'user': state untuk menyimpan objek user yang aktif, nilai awal null
  const [user, setUser] = useState<User | null>(null);

  // 'isLoginModalOpen': state untuk mengontrol visibilitas modal login, nilai awal false
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // 'router': instance router Next.js untuk berpindah halaman
  const router = useRouter();

  // 'useEffect': dijalankan sekali saat komponen pertama kali dimuat di browser
  useEffect(() => {
    // Blok try-catch untuk mengamankan proses pembacaan localStorage dari potensi error
    try {
      // Mengambil data user yang tersimpan di browser localStorage
      const stored = localStorage.getItem(STORAGE_KEY);
      // Jika data tersimpan ada di localStorage
      if (stored) {
        // Mengubah string JSON menjadi objek JavaScript dan menyimpannya ke state 'user'
        setUser(JSON.parse(stored));
      }
    } catch (e) {
      // Menampilkan pesan error di konsol jika parsing JSON gagal
      console.error("Failed to parse auth user", e);
    }

    // Memeriksa apakah kode sedang berjalan di lingkungan browser (window terdefinisi)
    if (typeof window !== "undefined") {
      // Membaca parameter query URL saat ini (contoh: ?login=true)
      const params = new URLSearchParams(window.location.search);
      // Jika URL memiliki parameter login=true atau action=login
      if (params.get("login") === "true" || params.get("action") === "login") {
        // Buka modal login secara otomatis
        setIsLoginModalOpen(true);
        // Mengambil path URL tanpa query parameter
        const newUrl = window.location.pathname;
        // Membersihkan query parameter dari URL browser tanpa me-refresh halaman
        window.history.replaceState({}, "", newUrl);
      }
    }
  }, []);

  // 'login': fungsi untuk memproses login pengguna
  const login = (userData?: Partial<User>) => {
    // Membuat objek user lengkap dengan nilai fallback default jika tidak disediakan
    const adminUser: User = {
      name: userData?.name || "Admin",
      email: userData?.email || "admin@codingest.net",
      role: (userData?.role as "admin" | "user") || "admin",
      avatar: userData?.avatar || "/assets/img/admin-avatar.jpg",
    };
    // Memperbarui state user dengan data login baru
    setUser(adminUser);
    // Menyimpan data login ke localStorage agar sesi tetap tersimpan saat halaman di-refresh
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminUser));
    } catch (e) {
      console.error("Failed to store user", e);
    }
  };

  // 'logout': fungsi untuk mengeluarkan sesi pengguna
  const logout = () => {
    // Mengosongkan data state user menjadi null
    setUser(null);
    // Menghapus data sesi dari localStorage browser
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error("Failed to clear user", e);
    }
    // Jika user sedang berada di halaman admin (/admin), arahkan kembali ke halaman publik /guest
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/admin")) {
      router.push("/guest");
    }
  };

  // 'openLoginModal': helper fungsi untuk mengubah state isLoginModalOpen menjadi true
  const openLoginModal = () => setIsLoginModalOpen(true);

  // 'closeLoginModal': helper fungsi untuk mengubah state isLoginModalOpen menjadi false
  const closeLoginModal = () => setIsLoginModalOpen(false);

  // 'return': merender Provider context beserta elemen anak (children) dan modal login
  return (
    // Tag <AuthContext.Provider>: mendistribusikan value state auth ke seluruh komponen anak di dalamnya
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoginModalOpen,
        openLoginModal,
        closeLoginModal,
        login,
        logout,
      }}
    >
      {/* Merender seluruh komponen anak aplikasi */}
      {children}

      {/* Komponen modal login popup global */}
      <LoginModal
        // Mengoper status buka/tutup modal
        isOpen={isLoginModalOpen}
        // Mengoper fungsi callback saat modal ditutup
        onClose={closeLoginModal}
        // Mengoper fungsi callback saat proses login di modal berhasil
        onSuccess={(loggedUser) => {
          // Memeriksa apakah user yang login memiliki hak akses admin
          const isAdmin =
            loggedUser.email.toLowerCase().includes("admin") ||
            loggedUser.email === "admin@codingest.net";
          // Menjalankan fungsi login dengan data akun
          login({
            email: loggedUser.email,
            name: isAdmin ? "Admin" : loggedUser.name || "User",
            role: isAdmin ? "admin" : "user",
            avatar: "/assets/img/admin-avatar.jpg",
          });
        }}
      />
    </AuthContext.Provider>
  );
}

// 'export function useAuth': custom hook untuk memudahkan pemanggilan data auth dari komponen lain
export function useAuth() {
  // Mengambil data context saat ini menggunakan hook useContext
  const context = useContext(AuthContext);
  // Jika hook dipanggil di luar cakupan AuthProvider, kembalikan objek default yang aman
  if (!context) {
    return {
      user: null,
      isLoggedIn: false,
      isLoginModalOpen: false,
      openLoginModal: () => {},
      closeLoginModal: () => {},
      login: () => {},
      logout: () => {},
    };
  }
  // Mengembalikan data dan fungsi-fungsi auth yang siap digunakan
  return context;
}

