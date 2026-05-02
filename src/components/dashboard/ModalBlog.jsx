import React from "react";
import { X, Image as ImageIcon } from "lucide-react";
// Ganti import ini:
import ReactQuill from 'react-quill-new';
import 'react-quill-new/dist/quill.snow.css';

const ModalBlog = ({ showModal, closeModal, isUpdate, formData, setFormData, handleSubmit }) => {
    const inputStyle = "w-full border border-slate-200 px-4 py-2 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none transition-all text-slate-800";

    // Konfigurasi Toolbar Quill
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, false] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            ['link', 'clean']
        ],
    };

    // const formats = [
    //     'header',
    //     'bold', 'italic', 'underline', 'strike',
    //     'list', 'bullet',
    //     'link'
    // ];

    // Fungsi handle perubahan konten (mencegah bug kursor melompat di React 19)
    const handleContentChange = (content) => {
        setFormData(prev => ({ ...prev, content }));
    };

    return (
        <div className={`fixed inset-0 z-999 flex items-center justify-center p-4 transition-all duration-300 ${showModal ? "visible" : "invisible"}`}>
            {/* Overlay */}
            <div
                onClick={closeModal}
                className={`absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 ${showModal ? "opacity-100" : "opacity-0"}`}
            />

            {/* Kontainer Modal */}
            <div className={`relative bg-white w-full max-w-3xl rounded-2xl shadow-2xl transform transition-all duration-300 flex flex-col max-h-[95vh] ${showModal ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"}`}>

                {/* Header Modal - Tetap di atas */}
                <div className="flex justify-between items-center p-6 border-b border-slate-100">
                    <h3 className="text-xl font-bold text-slate-800">
                        {isUpdate ? "Edit Artikel" : "Tulis Artikel Baru"}
                    </h3>
                    <button onClick={closeModal} className="p-1 text-slate-400 hover:text-red-500 duration-500 transition-colors cursor-pointer">
                        <X size={24} />
                    </button>
                </div>

                {/* Form Body - Bisa di-scroll */}
                <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto custom-scrollbar">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Judul Blog</label>
                        <input
                            type="text" className={inputStyle} placeholder="Contoh: Tren Fashion 2026..."
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Deskripsi Singkat</label>
                        <textarea
                            className={`${inputStyle} h-20 resize-none`}
                            placeholder="Tulis ringkasan singkat untuk tampilan kartu blog..."
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Konten Lengkap</label>
                        <div className="rounded-lg border border-slate-200 overflow-hidden">
                            <ReactQuill
                                theme="snow"
                                value={formData.content}
                                onChange={handleContentChange}
                                modules={modules}
                                placeholder="Tulis cerita Anda di sini..."
                                className="h-72 mb-12" // Tambahkan tinggi manual dan margin bawah agar toolbar tidak menumpuk
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-1.5">Gambar Cover</label>
                        <label className="flex items-center justify-center gap-3 border-2 border-dashed border-slate-200 p-6 rounded-xl cursor-pointer hover:bg-slate-50 hover:border-slate-400 transition-all group">
                            <div className="flex flex-col items-center">
                                <ImageIcon size={28} className="text-slate-400 group-hover:text-slate-600 mb-1" />
                                <span className="text-sm text-slate-500 font-medium truncate max-w-xs">
                                    {formData.file ? formData.file.name : "Klik untuk upload gambar (JPG, PNG, WebP)"}
                                </span>
                            </div>
                            <input
                                type="file"
                                className="hidden"
                                accept="image/*"
                                onChange={(e) => setFormData({ ...formData, file: e.target.files[0] })} />
                        </label>
                    </div>
                    {/* Footer Modal - Tetap di bawah */}
                    <div className="p-6 border-t border-slate-100 flex gap-3 bg-slate-50 rounded-b-2xl">
                        <button type="button" onClick={closeModal} className="flex-1 px-4 py-3 border border-slate-200 text-slate-600 rounded-xl font-bold hover:bg-white transition-all duration-500 cursor-pointer">
                            Batal
                        </button>
                        <button type="submit" className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 shadow-lg shadow-slate-200 transition-all duration-500 cursor-pointer">
                            {isUpdate ? "Simpan Perubahan" : "Simpan Blog"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default ModalBlog;