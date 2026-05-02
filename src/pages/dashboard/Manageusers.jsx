import React, { useState, useEffect } from "react";
import axios from "axios";
import { Edit, Trash2, UserPlus } from "lucide-react";
import ModalUser from "../../components/dashboard/ModalUser";
import api from "../../api/axios";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [isUpdate, setIsUpdate] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [message, setMessage] = useState("");
    const [formData, setFormData] = useState({
        name: "", email: "", password: "", confPassword: "", role: "user"
    });

    const getUsers = async () => {
        const response = await api.get("/users");
        setUsers(response.data);
    };

    useEffect(() => { getUsers(); }, []);

    const openModal = (user = null) => {
        if (user) {
            setIsUpdate(true);
            setSelectedId(user.uuid);
            setFormData({ name: user.name, email: user.email, password: "", confPassword: "", role: user.role });
        } else {
            setIsUpdate(false);
            setFormData({ name: "", email: "", password: "", confPassword: "", role: "user" });
        }
        setShowModal(true);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isUpdate) {
                await api.patch(`/users/${selectedId}`, formData);
            } else {
                await api.post("/users", formData);
            }
            getUsers();
            setShowModal(false);
        } catch (error) {
            if (error.response) setMessage(error.response.data.msg);
        }
    };

    const deleteUser = async (uuid) => {
        if (window.confirm("Hapus user ini?")) {
            await api.delete(`/users/${uuid}`);
            getUsers();
        }
    };

    return (
        <div className="bg-white p-8 rounded-xl shadow-sm border border-slate-200">
            {/* Header tetap sama */}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Users</h2>
                <button onClick={() => openModal()} className="flex items-center gap-2 bg-slate-900 hover:bg-slate-700 duration-500 text-white px-5 py-2.5 rounded-lg cursor-pointer">
                    <UserPlus size={18} /> Tambah User
                </button>
            </div>

            {/* Table tetap sama */}
            <table className="w-full text-left">
                {/* ... Thead and Tbody as before ... */}
                <tbody>
                    {users.map((user) => (
                        <tr key={user.uuid} className="border-b">
                            <td className="px-6 py-4">{user.name}</td>
                            <td className="px-6 py-4">{user.email}</td>
                            <td className="px-6 py-4">{user.role}</td>
                            <td className="px-6 py-4 flex gap-2">
                                <button onClick={() => openModal(user)} className="text-amber-600 hover:bg-amber-100 duration-500 cursor-pointer"><Edit size={18} /></button>
                                <button onClick={() => deleteUser(user.uuid)} className="text-red-600 hover:bg-red-100 duration-500 cursor-pointer"><Trash2 size={18} /></button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Panggil Komponen Modal Di Sini */}
            <ModalUser
                showModal={showModal}
                closeModal={() => setShowModal(false)}
                isUpdate={isUpdate}
                formData={formData}
                setFormData={setFormData}
                handleSubmit={handleSubmit}
                message={message}
            />
        </div>
    );
};

export default Users;