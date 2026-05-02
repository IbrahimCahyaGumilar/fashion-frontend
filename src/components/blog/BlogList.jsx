import React from 'react';
import BlogItem from './BlogItem';

const BlogList = ({ blogs, totalPages, currentPage, setCurrentPage }) => {
    
    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const renderPagination = () => {
        const pages = [];
        
        // Aturan: Tampilkan 1, 2, 3 jika di awal, lalu "...", lalu halaman terakhir
        // Kita batasi hanya menampilkan 3 halaman pertama yang aktif di sekitar currentPage
        for (let i = 1; i <= totalPages; i++) {
            if (
                i <= 3 || // Selalu tampilkan 1, 2, 3
                i === totalPages || // Selalu tampilkan halaman terakhir
                (i >= currentPage - 1 && i <= currentPage + 1) // Halaman di sekitar yang aktif
            ) {
                if (pages.length > 0 && i > pages[pages.length - 1] + 1) {
                    pages.push("...");
                }
                if (!pages.includes(i)) {
                    pages.push(i);
                }
            }
        }

        return pages.map((page, index) => {
            if (page === "...") {
                return <span key={`dots-${index}`} className="px-2 text-gray-400">...</span>;
            }
            return (
                <button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`w-10 h-10 border rounded-lg cursor-pointer transition-colors font-medium
                        ${currentPage === page ? "bg-black text-white border-black" : "border-gray-300 hover:bg-gray-100"}`}
                >
                    {page}
                </button>
            );
        });
    };

    return (
        <div className="w-full lg:w-2/3 flex flex-col">
            
            {/* GRID MENGGUNAKAN BLOGITEM */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {blogs.length > 0 ? (
                    blogs.map((blog) => (
                        <BlogItem key={blog.uuid} blog={blog} />
                    ))
                ) : (
                    <p className="text-center col-span-2 py-10 text-gray-500">
                        Artikel tidak ditemukan.
                    </p>
                )}
            </div>

            {/* PAGINATION */}
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-16 flex-wrap">
                    
                    {/* Tombol Prev: Hilang jika di halaman 1 */}
                    {currentPage > 1 && (
                        <button
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer font-medium"
                        >
                            Prev
                        </button>
                    )}

                    {/* Nomor Halaman (Logika 1, 2, 3 ... 10) */}
                    {renderPagination()}

                    {/* Tombol Next: Hilang jika di halaman terakhir */}
                    {currentPage < totalPages && (
                        <button
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer font-medium"
                        >
                            Next
                        </button>
                    )}
                </div>
            )}
        </div>
    );
};

export default BlogList;