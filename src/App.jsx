import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { useDispatch, useSelector } from "react-redux";
import { getMe } from "./features/authSlice";

// Import Pages
import Home from './pages/Home';
import About from './pages/About';
import Product from './pages/Product';
import Blog from './pages/Blog';
import BlogDetail from './components/blog/BlogDetail';
import Login from './pages/Login';
import Dashboard from './pages/dashboard/Dashboard';
import ManageBlog from './pages/dashboard/ManageBlog';
import ManageUsers from './pages/dashboard/Manageusers';
import Contact from './pages/Contact';
import Tes from './pages/Tes';

// Import Components & Routes
import PrivateRoute from './routes/PrivateRoute';
import Layout from './components/Layout';
import LoadingScreen from './components/common/LoadingScreen';

// 1. Komponen ini menangani Logika Loading setiap pindah halaman dan sinkronisasi auth
const AppContent = () => {
  const dispatch = useDispatch();
  
  // Ambil isLoading dari Redux Auth (digunakan untuk getMe)
  const { isLoading: authLoading } = useSelector((state) => state.auth);

  // State untuk loading animasi (visual)
  const [manualLoading, setManualLoading] = useState(true);
  const location = useLocation();

  // Jalankan pengecekan user saat aplikasi pertama kali dimuat
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // Efek loading visual setiap perpindahan rute
  useEffect(() => {
    setManualLoading(true);
    const timer = setTimeout(() => {
      setManualLoading(false);
    }, 1200); // Durasi animasi loading
    return () => clearTimeout(timer);
  }, [location.pathname]);

  /**
   * KUNCI PERBAIKAN:
   * Aplikasi dianggap loading total jika:
   * 1. Redux sedang mengambil data user (authLoading)
   * 2. Animasi perpindahan halaman sedang berjalan (manualLoading)
   */
  const isAppStillLoading = authLoading || manualLoading;

  return (
    <>
      {/* Tampilkan Loading Screen jika salah satu proses loading masih berjalan */}
      <AnimatePresence mode="wait">
        {isAppStillLoading && <LoadingScreen key="app-loading-screen" />}
      </AnimatePresence>

      {/* 
          HANYA render Routes jika loading sudah selesai. 
          Ini mencegah PrivateRoute melakukan redirect ke /login 
          saat data user dari getMe belum sampai.
      */}
      {!isAppStillLoading && (
        <Routes location={location}>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/tes" element={<Tes />} />
          <Route path="/blog/:slug" element={<BlogDetail />} />

          {/* Protected Routes (User & Admin) */}
          <Route element={<PrivateRoute allowedRoles={["admin", "user"]} />}>
            <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
            <Route path="/manage-blog" element={<Layout><ManageBlog /></Layout>} />
          </Route>

          {/* Admin Routes Only */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/manage-user" element={<Layout><ManageUsers /></Layout>} />
          </Route>
        </Routes>
      )}
    </>
  );
};

// 2. Komponen Utama App
function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;