import React from "react";
import { X, User, Mail, Lock, ShieldCheck } from "lucide-react";

const ModalUser = ({ showModal, closeModal, isUpdate, formData, setFormData, handleSubmit }) => {
    const inputStyle = "w-full border border-slate-200 px-4 py-2.5 pl-10 rounded-lg focus:ring-2 focus:ring-slate-900 outline-none transition-all bg-white";
    const labelStyle = "block text-sm font-semibold text-slate-700 mb-1";

    return (
        <div className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300 ${showModal ? "visible" : "invisible"}`}>
            <div onClick={closeModal} className={`absolute inset-0 bg-slate-900/40 backdrop-blur-sm transition-opacity duration-300 ${showModal ? "opacity-100" : "opacity-0"}`} />

            <div className={`relative bg-white w-full max-w-lg rounded-2xl shadow-2xl p-8 transform transition-all duration-300 overflow-y-auto max-h-[90vh] ${showModal ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-8 opacity-0"}`}>
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-bold text-slate-800">{isUpdate ? "Edit Pengguna" : "Tambah Pengguna Baru"}</h3>
                    <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 duration-500 cursor-pointer"><X size={24} /></button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    {/* INPUT NAMA */}
                    <div>
                        <label className={labelStyle}>Nama Lengkap</label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input
                                type="text" className={inputStyle} placeholder="Nama Lengkap"
                                value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} required
                            />
                        </div>
                    </div>

                    {/* INPUT EMAIL */}
                    <div>
                        <label className={labelStyle}>Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 text-slate-400" size={18} />
                            <input
                                type="email" className={inputStyle} placeholder="email@example.com"
                                value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required
                            />
                        </div>
                    </div>

                    {/* INPUT ROLE */}
                    <div>
                        <label className={labelStyle}>Role</label>
                        <div className="relative">
                            <ShieldCheck className="absolute left-3 top-3 text-slate-400" size={18} />
                            <select
                                className={inputStyle}
                                value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })} required
                            >
                                <option value="">Pilih Role</option>
                                <option value="admin">Admin</option>
                                <option value="user">User</option>
                            </select>
                        </div>
                    </div>

                    {/* INPUT PASSWORD */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className={labelStyle}>{isUpdate ? "Password Baru" : "Password"}</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="password" className={inputStyle} placeholder="******"
                                    value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    required={!isUpdate} // Password wajib jika create, opsional jika update
                                />
                            </div>
                        </div>
                        <div>
                            <label className={labelStyle}>Konfirmasi Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 text-slate-400" size={18} />
                                <input
                                    type="password" className={inputStyle} placeholder="******"
                                    value={formData.confPassword} onChange={(e) => setFormData({ ...formData, confPassword: e.target.value })}
                                    required={!isUpdate}
                                />
                            </div>
                        </div>
                    </div>

                    {isUpdate && (
                        <p className="text-[10px] text-slate-400 italic">*Kosongkan password jika tidak ingin mengubahnya.</p>
                    )}

                    <div className="flex gap-3 pt-4 border-t">
                        <button type="button" onClick={closeModal} className="flex-1 px-4 py-2.5 border border-slate-200 text-slate-600 rounded-lg font-semibold hover:bg-slate-50 duration-500 cursor-pointer">Batal</button>
                        <button type="submit" className="flex-1 px-4 py-2.5 bg-slate-900 text-white rounded-lg font-semibold hover:bg-slate-700 duration-500 shadow-lg cursor-pointer">
                            {isUpdate ? "Simpan Perubahan" : "Simpan Pengguna"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ModalUser;