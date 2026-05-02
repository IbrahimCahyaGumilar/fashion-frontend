import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import { useDispatch } from "react-redux";
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

// 1. Komponen ini menangani Logika Loading setiap pindah halaman
const AppContent = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMe());
  }, [dispatch]);


  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1800);
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading && <LoadingScreen key={location.pathname} />}
      </AnimatePresence>

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

        {/* Protected Routes */}
        <Route element={<PrivateRoute allowedRoles={["admin", "user"]} />}>
          <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
          <Route path="/manage-blog" element={<Layout><ManageBlog /></Layout>} />
        </Route>

        {/* Admin Routes */}
        <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
          <Route path="/manage-user" element={<Layout><ManageUsers /></Layout>} />
        </Route>
      </Routes>
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