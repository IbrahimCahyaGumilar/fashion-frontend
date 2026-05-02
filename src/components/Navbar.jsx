import React, { useState } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { useSelector } from 'react-redux'; // 1. Impor useSelector

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    
    // 2. Ambil data user dari state auth
    const { user } = useSelector((state) => state.auth);

    return (
        <nav className='bg-white shadow-md py-4 fixed w-full z-60'>
            <div className='container mx-auto px-6 md:px-12 flex items-center justify-between'>
                <div className='flex gap-16 items-center w-full'>
                    <Link
                        to="/"
                        id="logo"
                        className={`${isOpen ? 'text-white' : 'text-black'} font-logo text-3xl z-50`}>
                        Cutting
                    </Link>

                    <ul className={`absolute top-0 ${isOpen ? 'left-0' : '-left-full'} bg-gray-900 text-white px-4 pt-20 w-full h-screen 
                    flex flex-col gap-4 transition-all ease-in-out duration-300
                    lg:static lg:bg-transparent lg:text-black lg:p-0 lg:w-auto lg:h-auto lg:flex-row lg:gap-8`}>
                        <li className='border-b border-white lg:border-none'>
                            <NavLink to='/' className={({ isActive }) => `font-navbar text-lg ${isActive ? 'text-cyan-600' : 'text-black'}`}>
                                Beranda
                            </NavLink>
                        </li>
                        <li className='border-b border-white lg:border-none'>
                            <NavLink to='/about' className={({ isActive }) => `font-navbar text-lg ${isActive ? 'text-cyan-600' : 'text-black'}`}>
                                Tentang
                            </NavLink>
                        </li>
                        <li className='border-b border-white lg:border-none'>
                            <NavLink to='/product' className={({ isActive }) => `font-navbar text-lg ${isActive ? 'text-cyan-600' : 'text-black'}`}>
                                Produk
                            </NavLink>
                        </li>
                        <li className='border-b border-white lg:border-none'>
                            <NavLink to='/blog' className={({ isActive }) => `font-navbar text-lg ${isActive ? 'text-cyan-600' : 'text-black'}`}>
                                Blog
                            </NavLink>
                        </li>
                        <li className='border-b border-white lg:border-none'>
                            <NavLink to='/contact' className={({ isActive }) => `font-navbar text-lg ${isActive ? 'text-cyan-600' : 'text-black'}`}>
                                Kontak
                            </NavLink>
                        </li>
                    </ul>
                </div>

                <button onClick={() => setIsOpen(!isOpen)} className='hamburger w-6 h-6 relative cursor-pointer lg:hidden'>
                    <span className={`${isOpen ? 'translate-y-2 rotate-45 bg-white' : 'bg-black'} top-0`}></span>
                    <span className={`${isOpen ? 'opacity-0 bg-white' : 'bg-black'} top-2`}></span>
                    <span className={`${isOpen ? '-translate-y-2 -rotate-45 bg-white' : 'bg-black'} top-4`}></span>
                </button>

                {/* 3. LOGIKA DINAMIS LOGIN / DASHBOARD */}
                {user ? (
                    <Link
                        to='/dashboard'
                        className='btn-primary hidden md:block cursor-pointer bg-cyan-600 text-white px-4 py-2 rounded-md hover:bg-cyan-700 transition-all'>
                        Dashboard
                    </Link>
                ) : (
                    <Link
                        to='/login'
                        className='btn-primary hidden md:block cursor-pointer'>
                        Login
                    </Link>
                )}
            </div>
        </nav>
    )
}

export default Navbar