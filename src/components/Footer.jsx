import React from 'react';
import { Link } from 'react-router-dom'; // Pastikan import ini ada

import icArrow from "../assets/icons/ic-right.png";
import icMail from "../assets/icons/ic-mail.png";
import icLocation from "../assets/icons/ic-location.png";


const Footer = () => {
    return (
        <footer className="bg-slate-900">
            <div className="container mx-auto px-6 md:px-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-white py-12">

                    <div className="flex flex-col gap-4 text-justify">
                        <h1 className="font-logo text-5xl font-bold">Cutting</h1>
                        <p className="max-w-48 text-white">
                            Penyedia jasa produksi pakaian berkualitas untuk berbagai kebutuhan
                        </p>
                    </div>

                    {/* MENU PAGE */}
                    <div className="flex flex-col gap-6">
                        <h2 className="blue-underline text-xl font-bold">Menu Page</h2>
                        <ul className="flex flex-col gap-3">
                            <li>
                                <Link to="/" className="flex items-center gap-2 font-semibold hover:text-cyan-500 transition-colors">
                                    <img src={icArrow} alt="icon arrow" />
                                    Beranda
                                </Link>
                            </li>
                            <li>
                                <Link to="/about" className="flex items-center gap-2 font-semibold hover:text-cyan-500 transition-colors">
                                    <img src={icArrow} alt="icon arrow" />
                                    Tentang
                                </Link>
                            </li>
                            <li>
                                <Link to="/product" className="flex items-center gap-2 font-semibold hover:text-cyan-500 transition-colors">
                                    <img src={icArrow} alt="icon arrow" />
                                    Produk
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* PRODUCT CATEGORY */}
                    <div className="flex flex-col gap-6">
                        <h2 className="blue-underline text-xl font-bold">Product</h2>
                        <ul className="flex flex-col gap-3">
                            {/* Tips: Arahkan ke halaman produk dengan state atau query filter */}
                            <li>
                                <Link to="/product" className="flex items-center gap-2 font-semibold hover:text-cyan-500 transition-colors">
                                    <img src={icArrow} alt="icon arrow" />
                                    All
                                </Link>
                            </li>
                            <li>
                                <Link to="/product" className="flex items-center gap-2 font-semibold hover:text-cyan-500 transition-colors">
                                    <img src={icArrow} alt="icon arrow" />
                                    Male
                                </Link>
                            </li>
                            <li>
                                <Link to="/product" className="flex items-center gap-2 font-semibold hover:text-cyan-500 transition-colors">
                                    <img src={icArrow} alt="icon arrow" />
                                    Female
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div className="flex flex-col gap-6">
                        <h2 className="blue-underline text-xl font-bold">Contact</h2>
                        <ul className="flex flex-col gap-6">
                            <li>
                                <p className="flex items-center gap-4 font-semibold">
                                    <img src={icMail} alt="icon mail" />
                                    cutting@gmail.com
                                </p>
                            </li>
                            <li>
                                <div className="flex items-start gap-4 font-semibold text-white">
                                    <img src={icLocation} alt="icon location" className="mt-1" />
                                    <p>Jl. Melati Indah No. 25, Blok B2
                                        Kecamatan Sukajadi
                                        Bandung 40162
                                        Jawa Barat, Indonesia</p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="text-center border-t border-gray-800 text-gray-400 py-6">
                    <p>&copy; 2026 Ibrahim Cahya Gumilar. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;