import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import NavbarDashboard from './NavbarDashboard';

const Layout = ({ children }) => {
    const [isSidebarOpen, setSidebarOpen] = useState(window.innerWidth > 1024);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 1024) setSidebarOpen(false);
            else setSidebarOpen(true);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        /* h-screen mencegah seluruh halaman di-scroll */
        <div className="flex h-screen bg-slate-50 overflow-hidden"> 
            
            {/* Sidebar tetap di tempatnya */}
            <Sidebar isOpen={isSidebarOpen} setIsOpen={setSidebarOpen} />
            
            {/* Area Konten Kanan */}
            <div className="flex-1 flex flex-col min-w-0 h-full">
                <NavbarDashboard setSidebarOpen={setSidebarOpen} isSidebarOpen={isSidebarOpen} />
                
                {/* Main ini yang memegang kendali scroll */}
                <main className="flex-1 overflow-y-auto p-4 md:p-8 bg-slate-50 transition-all duration-300">
                    <div className="max-w-7xl mx-auto pb-10"> {/* Tambah padding bottom agar tidak nempel dasar */}
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Layout;