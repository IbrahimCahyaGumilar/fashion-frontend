import React from 'react'
import BlogSlider from './BlogSlider'

const BlogSection = () => {
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

                <BlogSlider />
            </div>
        </div>
    )
}

export default BlogSection