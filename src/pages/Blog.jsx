import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import HeroSection from '../components/common/HeroSection';

import BlogList from '../components/blog/BlogList';
import BlogSearch from '../components/blog/BlogSearch';
import LatestPosts from '../components/blog/LatestPosts';
import api from '../api/axios';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 4;

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const res = await api.get("/blogs", {
                    withCredentials: true
                });
                setBlogs(res.data);
            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        getBlogs();
    }, []);

    const filteredBlogs = blogs.filter(blog =>
        blog.title.toLowerCase().includes(search.toLowerCase())
    );

    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

    const latestBlogs = [...blogs].slice(0, 5);

    // KUNCI: Jangan gunakan 'if (loading) return...' 
    // agar Navbar dan HeroSection tetap muncul saat data sedang diambil.
    
    return (
        <div className='bg-slate-50'>
            <Navbar />

            {/* Hero Section */}
            <HeroSection title='blog' />

            {/* Blog Section */}
            <div className="bg-slate-50 py-28 lg:py-32">
                <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16">

                    {/* LEFT - Tetap kirim blogs meskipun kosong dulu (loading ditangani di dalam atau dibiarkan kosong) */}
                    <BlogList
                        blogs={currentBlogs}
                        totalPages={totalPages}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />

                    {/* RIGHT */}
                    <aside className="w-full lg:w-1/3 flex flex-col gap-8">
                        <BlogSearch
                            search={search}
                            setSearch={setSearch}
                            setCurrentPage={setCurrentPage}
                        />
                        <LatestPosts blogs={latestBlogs} />
                    </aside>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Blog;