import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom'; // Tambahkan Link
import axios from 'axios';
import Navbar from '../Navbar'
import Footer from '../Footer'
import api from '../../api/axios';

const BlogDetail = () => {
    const { slug } = useParams();
    const [blog, setBlog] = useState(null);
    const [latestBlogs, setLatestBlogs] = useState([]); // State untuk berita terbaru
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDetailAndLatest = async () => {
            try {
                // 1. Ambil detail blog yang sedang dibaca
                const detailRes = await api.get(`/blogs/${slug}`);
                setBlog(detailRes.data);

                // 2. Ambil semua blog untuk sidebar "Berita Terbaru"
                const latestRes = await api.get('/blogs');
                // Ambil 5 berita terbaru saja (kecuali yang sedang dibaca)
                const filteredLatest = latestRes.data
                    .filter(item => item.slug !== slug)
                    .slice(0, 5);
                setLatestBlogs(filteredLatest);

                setLoading(false);
            } catch (error) {
                console.error("Error fetching data:", error);
                setLoading(false);
            }
        };

        fetchDetailAndLatest();
        // Scroll ke atas otomatis saat ganti artikel
        window.scrollTo(0, 0);
    }, [slug]);

    if (loading) return <div className="text-center py-20">Memuat artikel...</div>;
    if (!blog) return <div className="text-center py-20">Artikel tidak ditemukan.</div>;

    return (
        <div className='bg-slate-50 min-h-screen'>
            <Navbar />

            <section className='container mx-auto px-6 md:px-12 py-28 md:py-32'>
                <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 items-start'>

                    {/* KOLOM KIRI: Detail Blog */}
                    <article className="lg:col-span-8 flex flex-col gap-4">
                        <div className='flex gap-2 text-gray-500 text-sm'>
                            <span className="font-bold text-slate-800">{blog.author?.name}</span>
                            <span>-</span>
                            <span>{new Date(blog.createdAt).toLocaleDateString('id-ID', {
                                year: 'numeric', month: 'long', day: 'numeric'
                            })}</span>
                        </div>

                        <h1 className='text-4xl md:text-5xl font-bold mb-6 text-slate-900 capitalize'>{blog.title}</h1>

                        <img
                            src={blog.image}
                            alt={blog.title}
                            className="w-full rounded-2xl mb-10 object-cover shadow-sm max-h-125"
                        />

                        <div
                            className="prose prose-slate prose-lg max-w-full text-slate-700 leading-relaxed 
                               prose-img:rounded-xl prose-headings:text-slate-900"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </article>

                    {/* KOLOM KANAN: Berita Terbaru Otomatis */}
                    

                    <aside className="lg:col-span-4 sticky top-32">
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
                                            className="line-clamp-2 text-gray-500 hover:text-black cursor-pointer duration-500 border-b capitalize">
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
            </section>

            <Footer />
        </div>
    )
}

export default BlogDetail;