import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Tambah useNavigate
import { useDispatch, useSelector } from 'react-redux'; // Tambah useDispatch
import { LogOut, reset } from '../features/authSlice'; // Import aksi logout
import { LayoutDashboard, Users, FileText, X, LogOut as LogoutIcon } from "lucide-react";

const Sidebar = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const logout = () => {
        dispatch(LogOut());
        dispatch(reset());
        navigate("/login");
    };

    const activeLink = "flex items-center gap-3 p-3 bg-blue-600 text-white rounded-lg shadow-md";
    const normalLink = "flex items-center gap-3 p-3 text-slate-400 hover:bg-slate-800 hover:text-white rounded-lg transition-all";

    return (
        <>
            {/* Overlay Mobile: Muncul hanya saat isOpen TRUE di layar kecil */}
            <div
                className={`fixed inset-0 bg-black/50 z-50 lg:hidden transition-opacity duration-300 ${isOpen ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                onClick={() => setIsOpen(false)}
            />

            {/* Sidebar */}
            <aside
                className={`
                    fixed lg:relative top-0 left-0 z-50
                    h-full bg-slate-900 text-white flex flex-col shrink-0
                    transition-all duration-300 ease-in-out
                    ${isOpen ? "w-64 translate-x-0" : "w-0 -translate-x-full lg:w-0 lg:translate-x-0"}
                    overflow-hidden
                `}
            >
                {/* Wrapper dengan lebar tetap agar konten tidak gepeng saat animasi */}
                <div className="w-64 p-5 flex flex-col h-full">
                    <div className="flex items-center justify-between mb-10">
                        <a href='/' className="text-2xl font-bold text-blue-400">CUTTING</a>
                        <button onClick={() => setIsOpen(false)} className="lg:hidden text-slate-400 cursor-pointer">
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex-1 flex flex-col gap-2 overflow-y-auto pr-2 custom-scrollbar">
                        <NavLink to="/dashboard" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                            <LayoutDashboard size={20} />
                            <span className="whitespace-nowrap">Beranda</span>
                        </NavLink>

                        <NavLink to="/manage-blog" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                            <FileText size={20} />
                            <span className="whitespace-nowrap">Blog</span>
                        </NavLink>

                        {user?.role === "admin" && (
                            <div className="mt-4">
                                <p className="text-[10px] font-bold text-slate-500 mb-2 ml-2 tracking-widest">ADMIN</p>
                                <NavLink to="/manage-user" className={({ isActive }) => (isActive ? activeLink : normalLink)}>
                                    <Users size={20} />
                                    <span className="whitespace-nowrap">Pengguna</span>
                                </NavLink>
                            </div>
                        )}
                    </nav>

                    <div className="mt-auto pt-5 border-t border-slate-800">
                        <button onClick={logout} className="cursor-pointer w-full flex items-center gap-3 p-3 text-red-400 hover:bg-red-500/10 rounded-lg group">
                            <LogoutIcon size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                            <span className="font-medium">Logout</span>
                        </button>
                    </div>
                </div>
            </aside>
        </>
    );
};

export default Sidebar;