import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, Edit, Trash2, ExternalLink, Calendar, User } from "lucide-react";
import ModalBlog from "../../components/dashboard/ModalBlog";
import { Link } from 'react-router-dom';
import api from '../../api/axios';

const ManageBlog = () => {
    const [blogs, setBlogs] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [formData, setFormData] = useState({ title: "", description: "", content: "", file: null });

    const getBlogs = async () => {
        try {
            const response = await api.get("/myblogs", {
                withCredentials: true
            });
            setBlogs(response.data);
        } catch (error) {
            console.error("Gagal memuat data:", error);
        }
    };

    useEffect(() => { getBlogs(); }, []);

    const getDaysAgo = (date) => {
        const diffTime = Math.abs(new Date() - new Date(date));
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        return diffDays === 0 ? "Baru saja" : `${diffDays} hari lalu`;
    };

    const openModal = (blog = null) => {
        if (blog) {
            setIsUpdate(true);
            setSelectedId(blog.uuid);
            setFormData({
                title: blog.title,
                description: blog.description,
                content: blog.content,
                file: null
            });
        } else {
            setIsUpdate(false);
            setFormData({ title: "", description: "", content: "", file: null });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("content", formData.content);
        if (formData.file) data.append("file", formData.file);

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true, // TAMBAHKAN INI agar session terdeteksi backend
            };

            if (isUpdate) {
                await api.patch(`/blogs/${selectedId}`, data, config);
            } else {
                await api.post("/blogs", data, config);
            }

            getBlogs();
            setShowModal(false);
            // Reset form setelah sukses
            setFormData({ title: "", description: "", content: "", file: null });
        } catch (error) {
            console.error(error); // Cek error di console browser
            alert(error.response?.data?.msg || "Terjadi kesalahan pada server");
        }
    };

    const deleteBlog = async (uuid) => {
        if (window.confirm("Apakah Anda yakin ingin menghapus artikel ini? Gambar akan dihapus permanen dari server.")) {
            try {
                await api.delete(`/blogs/${uuid}`);
                getBlogs();
            } catch (error) {
                alert(error.response?.data?.msg || "Gagal menghapus");
            }
        }
    };

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center bg-white p-8 rounded-xl shadow-sm border border-slate-200">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Blog</h2>
                </div>
                <button onClick={() => openModal()} className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-lg hover:bg-slate-700 duration-500 transition-all shadow-md cursor-pointer">
                    <Plus size={18} /> Tambah Blog
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {blogs.map((blog) => (
                    <div key={blog.uuid} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 group flex flex-col hover:shadow-md transition-shadow">
                        <div className="h-48 overflow-hidden relative bg-slate-100 border-b border-slate-100">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-500"
                            />
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center gap-3 text-[11px] text-slate-400 mb-3 font-semibold uppercase tracking-widest">
                                <span className="flex items-center gap-1"><User size={12} /> {blog.author?.name}</span>
                                <span className="flex items-center gap-1"><Calendar size={12} /> {getDaysAgo(blog.createdAt)}</span>
                            </div>
                            <h3 className="font-bold text-slate-800 mb-2 line-clamp-1 capitalize">{blog.title}</h3>
                            <p className="text-sm text-slate-500 line-clamp-2 mb-4 flex-1 italic">{blog.description}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                <div className="flex gap-1">
                                    <button onClick={() => openModal(blog)} className="p-2 text-amber-600 hover:bg-amber-100 duration-500 rounded-lg cursor-pointer"><Edit size={18} /></button>
                                    <button onClick={() => deleteBlog(blog.uuid)} className="p-2 text-red-600 hover:bg-red-100 duration-500 rounded-lg cursor-pointer"><Trash2 size={18} /></button>
                                </div>
                                <Link
                                    to={`/blog/${blog.slug}`}
                                    // Ganti ke path internal React
                                    className="flex items-center gap-2 text-[10px] font-black uppercase text-blue-600 bg-blue-50 px-3 py-2 rounded-md hover:bg-blue-600 duration-500 hover:text-white transition-all"
                                >
                                    Detail <ExternalLink size={12} />
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Jika tidak ada blog sama sekali */}
            {blogs.length === 0 && (
                <div className="text-center py-20 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                    <p className="text-slate-400">Belum ada artikel yang diterbitkan.</p>
                </div>
            )}

            <ModalBlog
                showModal={showModal} closeModal={() => setShowModal(false)}
                isUpdate={isUpdate} formData={formData} setFormData={setFormData}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default ManageBlog;