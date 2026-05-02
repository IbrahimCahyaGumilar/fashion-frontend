import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../features/authSlice';

const PrivateRoute = ({ allowedRoles }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const { user, isLoading, isError } = useSelector((state) => state.auth);

    useEffect(() => {
        // Hanya panggil getMe jika user kosong DAN tidak sedang loading DAN tidak sedang error
        if (!user && !isLoading && !isError) {
            dispatch(getMe());
        }
    }, [dispatch, user, isLoading, isError]);

    // 1. TAMPILKAN LOADING SELAMA PROSES PENGECEKAN
    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center bg-slate-50">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 mx-auto"></div>
                    <p className="mt-4 text-slate-600">Menyinkronkan Sesi...</p>
                </div>
            </div>
        );
    }

    // 2. JIKA ERROR ATAU TIDAK ADA USER (SETELAH LOADING SELESAI)
    // Gunakan pengecekan yang sangat ketat agar tidak salah lempar
    if (!isLoading && (isError || !user)) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 3. CEK ROLE
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;