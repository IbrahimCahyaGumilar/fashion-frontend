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

const AppContent = () => {
  const dispatch = useDispatch();
  const location = useLocation();

  // 1. Ambil status loading asli dari Redux Auth
  const { isLoading: authLoading } = useSelector((state) => state.auth);

  // 2. State untuk loading animasi visual (minimal loading)
  const [manualLoading, setManualLoading] = useState(true);

  // Jalankan pengecekan sesi (getMe) hanya saat pertama kali app dibuka
  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);

  // Handle loading visual setiap kali pindah halaman
  useEffect(() => {
    setManualLoading(true);
    const timer = setTimeout(() => {
      setManualLoading(false);
    }, 1500); // Durasi loading screen minimal
    return () => clearTimeout(timer);
  }, [location.pathname]);

  /** 
   * ANTI-FLICKER LOGIC:
   * Aplikasi dianggap loading jika:
   * - Sedang menunggu respon dari backend (authLoading)
   * - Sedang menjalankan animasi transisi (manualLoading)
   */
  const isGlobalLoading = authLoading || manualLoading;

  return (
    <>
      {/* Tampilkan LoadingScreen selama isGlobalLoading true */}
      <AnimatePresence mode="wait">
        {isGlobalLoading && <LoadingScreen key="global-loader" />}
      </AnimatePresence>

      {/* 
        PENTING: Jangan render Routes jika masih loading. 
        Ini mencegah PrivateRoute memantulkan user ke /login 
        saat data sesi dari backend belum diterima.
      */}
      {!isGlobalLoading && (
        <Routes location={location} key={location.pathname}>
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

          {/* Admin Only Routes */}
          <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
            <Route path="/manage-user" element={<Layout><ManageUsers /></Layout>} />
          </Route>
        </Routes>
      )}
    </>
  );
};

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;