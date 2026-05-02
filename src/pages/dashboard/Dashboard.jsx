import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Users, FileText, Layout } from 'lucide-react'; // Menggunakan Lucide untuk ikon
import api from '../../api/axios';

const Dashboard = () => {
    const { user } = useSelector((state) => state.auth);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalBlogs: 0,
        myBlogs: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                // Ambil data Blog
                const resBlogs = await api.get('/myblogs', {
                    withCredentials: true
                });
                const allBlogs = resBlogs.data;
                
                // Hitung blog milik user yang login saat ini
                const myBlogsCount = allBlogs.filter(blog => blog.author.email === user?.email).length;

                if (user?.role === "admin") {
                    // Jika admin, ambil juga data User
                    const resUsers = await api.get('/users');
                    setStats({
                        totalUsers: resUsers.data.length,
                        totalBlogs: allBlogs.length,
                        myBlogs: myBlogsCount
                    });
                } else {
                    setStats(prev => ({ ...prev, totalBlogs: allBlogs.length, myBlogs: myBlogsCount }));
                }
            } catch (error) {
                console.error("Gagal memuat statistik:", error);
            }
        };

        if (user) fetchStats();
    }, [user]);

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
                <Layout className="text-blue-600" /> Beranda
            </h1>
            <p className="text-slate-600 mt-2">
                Selamat datang kembali, <span className="font-bold text-blue-600">{user?.name}</span>
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                {/* KARTU DINAMIS BERDASARKAN ROLE */}
                {user?.role === "admin" ? (
                    <>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-blue-500 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Pengguna</h3>
                                    <p className="text-3xl font-bold text-slate-800">{stats.totalUsers}</p>
                                </div>
                                <Users size={40} className="text-blue-100" />
                            </div>
                        </div>
                        <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-green-500 hover:shadow-md transition-shadow">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Total Artikel</h3>
                                    <p className="text-3xl font-bold text-slate-800">{stats.totalBlogs}</p>
                                </div>
                                <FileText size={40} className="text-green-100" />
                            </div>
                        </div>
                    </>
                ) : (
                    <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-purple-500 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-center">
                            <div>
                                <h3 className="text-gray-500 text-sm font-medium uppercase tracking-wider">Artikel Saya</h3>
                                <p className="text-3xl font-bold text-slate-800">{stats.myBlogs}</p>
                            </div>
                            <FileText size={40} className="text-purple-100" />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;