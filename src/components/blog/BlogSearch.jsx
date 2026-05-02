import React from 'react'

const BlogSearch = ({ search, setSearch, setCurrentPage }) => {
    return (
        <div className="bg-white border border-gray-200 p-8 flex flex-col gap-4 rounded-2xl shadow-sm">
            <h2 className="text-xl font-bold border-b pb-3 text-slate-800">Cari Artikel</h2>

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
    )
}

export default BlogSearch