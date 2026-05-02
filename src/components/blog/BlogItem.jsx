import React from 'react';
import { Link } from 'react-router-dom';

const BlogItem = ({ blog }) => {
    return (
        <div className="bg-white shadow-lg rounded-2xl flex flex-col h-full overflow-hidden hover:shadow-xl transition-shadow">
            <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-48 object-cover"
            />
            
            <div className="flex flex-col gap-4 px-6 py-6">
                <p className="text-gray-400 text-sm">
                    {new Date(blog.createdAt).toLocaleDateString('id-ID', {
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric'
                    })}
                </p>

                <Link 
                    to={`/blog/${blog.slug}`} 
                    className="text-xl font-bold line-clamp-2 hover:text-blue-600 duration-300 capitalize"
                >
                    {blog.title}
                </Link>

                <p className="text-gray-600 text-sm line-clamp-3 leading-relaxed">
                    {blog.description}
                </p>
            </div>
        </div>
    );
};

export default BlogItem;