import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import axios from "axios";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";

import icArrowBack from "../../assets/images/icons/ic-arrow-back.svg";
import icArrowNext from "../../assets/images/icons/ic-arrow-next.svg";
import api from "../../api/axios";

const BlogSlider = () => {
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        getBlogs();
    }, []);

    const getBlogs = async () => {
        try {
            const response = await api.get("/blogs");
            setBlogs(response.data);
        } catch (error) {
            console.error("Gagal mengambil data blog:", error);
        }
    };

    return (
        <div className="relative w-full overflow-hidden">
            {/* CSS INJECTION: Memaksa Swiper Slide mengikuti tinggi container */}
            <style>
                {`
                .blogSwiper .swiper-wrapper {
                    display: flex;
                }
                .blogSwiper .swiper-slide {
                    height: auto !important;
                    display: flex;
                }
                `}
            </style>

            <Swiper
                modules={[Navigation]}
                loop={blogs.length > 3}
                navigation={{
                    nextEl: ".next-blog",
                    prevEl: ".prev-blog",
                }}
                breakpoints={{
                    0: { slidesPerView: 1 },
                    768: {
                        slidesPerView: "auto",
                        spaceBetween: 24
                    },
                }}
                className="blogSwiper"
            >
                {blogs.map((blog) => (
                    <SwiperSlide key={blog.uuid} className="p-3 md:!w-80">
                        {/* CARD UTAMA: 
                           h-full memaksanya mengisi ruang slide yang sudah ditarik 
                           flex-col membagi area gambar, teks, dan tombol
                        */}
                        <div className="bg-white shadow-lg rounded-lg overflow-hidden h-full flex flex-col w-full">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-48 object-cover shrink-0"
                            />
                            
                            {/* KONTEN: flex-1 akan mengambil semua sisa ruang kosong */}
                            <div className="flex flex-col p-4 flex-1">
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold line-clamp-2 text-slate-800 mb-2">
                                        {blog.title}
                                    </h2>
                                    <p className="line-clamp-3 text-sm text-slate-500">
                                       {blog.description}
                                    </p>
                                </div>

                                {/* FOOTER CARD: Akan selalu nempel di bawah karena flex-1 di atasnya */}
                                <div className="mt-4 pt-4 border-t border-slate-100 shrink-0">
                                    <Link
                                       to={`/blog/${blog.slug}`}
                                        className="text-sky-600 font-medium hover:underline inline-block"
                                    >
                                        Lihat Selengkapnya
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}

                {/* Navigation Buttons */}
                <button className="prev-blog absolute left-0 lg:left-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md p-2 rounded-full cursor-pointer transition-all">
                    <img src={icArrowBack} className="w-5 lg:w-6" alt="back" />
                </button>

                <button className="next-blog absolute right-0 lg:right-4 top-1/2 -translate-y-1/2 z-10 bg-white/90 hover:bg-white shadow-md p-2 rounded-full cursor-pointer transition-all">
                    <img src={icArrowNext} className="w-5 lg:w-6" alt="next" />
                </button>
            </Swiper>
        </div>
    );
};

export default BlogSlider;