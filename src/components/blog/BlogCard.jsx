import React, { useState, useEffect } from 'react'; // Tambahkan useEffect
import { Link } from 'react-router-dom'; // Tambahkan Link
import axios from 'axios';
import api from '../../api/axios';

const BlogCard = () => {
    const [blogs, setBlogs] = useState([]); // State untuk menampung data dari backend
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;

    // 1. Ambil data dari Backend
    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await api.get("/blogs");
                setBlogs(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Gagal mengambil data blog:", error);
                setLoading(false);
            }
        };
        getBlogs();
    }, []);

    // 2. Logic Search
    const filteredBlogs = blogs.filter((blog) =>
        blog.title.toLowerCase().includes(search.toLowerCase())
    );

    // 3. Logic Pagination
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

    // 4. Ambil 5 berita terbaru untuk sidebar
    const latestBlogs = [...blogs].slice(0, 5);

    if (loading) return <div className="text-center py-20">Memuat artikel...</div>;

    return (
        <div className="bg-slate-50 py-28 lg:py-32">
            <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16">

                {/* LEFT CONTENT (MAIN BLOGS) */}
                <div className="w-full lg:w-2/3 flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        {currentBlogs.length > 0 ? (
                            currentBlogs.map((blog) => (
                                <div key={blog.uuid} className="bg-white shadow-lg rounded-2xl flex flex-col h-full overflow-hidden hover:shadow-xl transition-shadow">
                                    <img
                                        src={blog.image}
                                        alt={blog.title}
                                        className="w-full h-48 object-cover"
                                    />
                                    <div className="flex flex-col gap-4 px-6 py-6">
                                        <p className="text-gray-400 text-sm">
                                            {new Date(blog.createdAt).toLocaleDateString('id-ID', {
                                                year: 'numeric', month: 'long', day: 'numeric'
                                            })}
                                        </p>

                                        <Link to={`/blog/${blog.slug}`} className="text-xl font-bold line-clamp-2 hover:text-blue-600 duration-300">
                                            {blog.title}
                                        </Link>

                                        <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                                            {blog.description}
                                        </p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="text-center col-span-2 py-10 text-gray-500">Artikel tidak ditemukan.</p>
                        )}
                    </div>

                    {/* PAGINATION */}
                    {totalPages > 1 && (
                        <div className="flex justify-center items-center gap-2 mt-16 flex-wrap">
                            <button
                                onClick={() => setCurrentPage(1)}
                                disabled={currentPage === 1}
                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-30 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                First
                            </button>
                            {[...Array(totalPages)].map((_, i) => (
                                <button
                                    key={i}
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={`w-10 h-10 border rounded-lg cursor-pointer transition-colors
                                        ${currentPage === i + 1 ? "bg-black text-white border-black" : "border-gray-300 hover:bg-gray-100"}`}>
                                    {i + 1}
                                </button>
                            ))}
                            <button
                                onClick={() => setCurrentPage(totalPages)}
                                disabled={currentPage === totalPages}
                                className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-30 hover:bg-gray-100 transition-colors cursor-pointer"
                            >
                                Last
                            </button>
                        </div>
                    )}
                </div>

                {/* RIGHT SIDEBAR */}
                <aside className="w-full lg:w-1/3 flex flex-col gap-8">
                    {/* SEARCH BOX */}
                    <div className="bg-white border border-gray-200 p-8 flex flex-col gap-4 rounded-2xl shadow-sm">
                        <h2 className="text-xl font-bold border-b pb-3 text-slate-800">Cari Artikel</h2>
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Ketik judul..."
                                value={search}
                                onChange={(e) => {
                                    setSearch(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className="w-full bg-slate-50 border border-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>
                    </div>

                    {/* LATEST POSTS SIDEBAR */}
                    <div className="bg-white border border-gray-300 p-10 flex flex-col gap-4 rounded-lg">
                        <h2 className="text-2xl font-bold border-b pb-2">
                            Berita Terbaru
                        </h2>

                        <div className="flex flex-col gap-4">
                            {latestBlogs.length > 0 ? (
                                latestBlogs.map((item) => (
                                    <Link
                                        key={item.uuid}
                                        to={`/blog/${item.slug}`}
                                        className="line-clamp-2 text-gray-500 hover:text-black cursor-pointer duration-500 border-b">
                                        {item.title}
                                    </Link>
                                ))
                            ) : (
                                <p className="text-sm text-slate-400">Tidak ada berita lain.</p>
                            )}
                        </div>
                    </div>

                </aside>

            </div>
        </div>
    )
}

export default BlogCard