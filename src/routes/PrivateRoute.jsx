import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getMe } from '../features/authSlice';

const PrivateRoute = ({ allowedRoles }) => {
    const dispatch = useDispatch();
    const { user, isLoading, isError } = useSelector((state) => state.auth);

    useEffect(() => {
        // Jika data user belum ada, coba ambil data session
        if (!user) {
            dispatch(getMe());
        }
    }, [dispatch, user]);

    // TAMPILKAN LOADING (SANGAT PENTING)
    // Supaya tidak langsung dilempar ke login saat refresh
    if (isLoading) {
        return (
            <div className="h-screen w-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900"></div>
            </div>
        );
    }

    // Jika sudah selesai loading dan tetap tidak ada user (atau error session)
    if (isError || (!user && !isLoading)) {
        return <Navigate to="/login" replace />;
    }

    // Cek Role
    if (allowedRoles && !allowedRoles.includes(user?.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return <Outlet />;
};

export default PrivateRoute;