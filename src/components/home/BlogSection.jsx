import React, { useState, useEffect } from 'react'
import BlogSlider from './BlogSlider'
import axios from "axios";

const BlogSection = () => {
    const [blogs, setBlogs] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const getBlogs = async () => {
            try {
                const response = await axios.get("http://localhost:5000/blogs");
                setBlogs(response.data);
            } catch (error) {
                console.error("Gagal mengambil data blog:", error);
            } finally {
                setIsLoaded(true);
            }
        };
        getBlogs();
    }, []);

    
    if (!isLoaded) return null;


    if (blogs.length === 0) return null;

    return (
        <div className="bg-slate-50 py-20 lg:py-24">
            <div className="container mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-5 lg:gap-10">
                <div className="flex flex-col gap-4 lg:gap-8 lg:max-w-56">
                    <h2 className="title-underline text-2xl md:text-3xl font-bold">
                        Blog
                    </h2>

                    <p className="text-slate-600 text-justify">
                        Artikel terbaru seputar industri pakaian dan tips produksi.
                    </p>
                </div>


                <BlogSlider blogs={blogs} />
            </div>
        </div>
    )
}

export default BlogSection