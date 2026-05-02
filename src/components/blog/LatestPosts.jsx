import React from 'react';
import { Link } from 'react-router-dom';

const LatestPosts = ({ blogs = [] }) => {
    return (
        <div className="bg-white border border-gray-300 p-10 flex flex-col gap-4 rounded-lg">
            <h2 className="text-2xl font-bold border-b pb-2">
                Berita Terbaru
            </h2>

            <div className="flex flex-col gap-4">
                {blogs.length > 0 ? (
                    blogs.map((item) => (
                        <Link
                            key={item.uuid}
                            to={`/blog/${item.slug}`}
                            className="line-clamp-2 text-gray-500 hover:text-black cursor-pointer duration-500 border-b"
                        >
                            {item.title}
                        </Link>
                    ))
                ) : (
                    <p className="text-sm text-slate-400">Tidak ada berita lain.</p>
                )}
            </div>
        </div>
    );
};

export default LatestPosts;