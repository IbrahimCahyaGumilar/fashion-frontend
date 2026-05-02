import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ allowedRoles }) => {
    // Ambil data user, status loading, dan status error dari Redux
    const { user, isLoading, isError } = useSelector((state) => state.auth);
    const location = useLocation();

    /**
     * 1. JIKA MASIH LOADING
     * Karena di App.jsx kita sudah membungkus Routes dengan {!isGlobalLoading},
     * sebenarnya PrivateRoute ini tidak akan dieksekusi sampai loading selesai.
     * Tapi kita tetap tambahkan null check sebagai pengaman tambahan.
     */
    if (isLoading) {
        return null; 
    }

    /**
     * 2. CEK AUTENTIKASI
     * Jika setelah loading selesai ternyata:
     * - isError bernilai true (getMe gagal/401)
     * - Atau user bernilai null
     * Maka arahkan ke halaman login.
     */
    if (isError || !user) {
        // 'state={{ from: location }}' berguna agar setelah login, 
        // user bisa diarahkan kembali ke halaman yang tadinya ingin diakses.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    /**
     * 3. CEK OTORISASI (ROLE)
     * Jika user sudah login tapi rolenya tidak ada dalam daftar 'allowedRoles',
     * lempar kembali ke dashboard (atau halaman lain yang Anda inginkan).
     */
    if (allowedRoles && !allowedRoles.includes(user.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    /**
     * 4. AKSES DIIZINKAN
     * Jika semua pengecekan lewat, tampilkan komponen anak (halaman tujuan).
     */
    return <Outlet />;
};

export default PrivateRoute;