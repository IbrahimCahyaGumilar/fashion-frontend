import React from "react";
import { Menu, User } from "lucide-react";
import { useSelector } from "react-redux";

const NavbarDashboard = ({ setSidebarOpen, isSidebarOpen }) => {
    const { user } = useSelector((state) => state.auth);

    return (
        <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center justify-between sticky top-0 z-40">
            <div className="flex items-center gap-4">
                {/* Tombol Hamburger */}
                <button
                    onClick={() => setSidebarOpen(!isSidebarOpen)}
                    className="p-2 hover:bg-slate-100 rounded-lg text-slate-600 transition-colors cursor-pointer"
                >
                    <Menu size={24} />
                </button>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                    <p className="text-sm font-bold text-slate-800 leading-none">{user?.name}</p>
                    <p className="text-[10px] text-slate-500 uppercase tracking-tighter">{user?.role}</p>
                </div>
                <div className="bg-slate-200 p-2 rounded-full text-slate-600">
                    <User size={20} />
                </div>
            </div>
        </nav>
    );
};

export default NavbarDashboard;