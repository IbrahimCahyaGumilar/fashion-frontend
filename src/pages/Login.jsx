import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { LoginUser, reset } from "../features/authSlice";
import { Eye, EyeOff } from "lucide-react";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { user, isError, isSuccess, isLoading, message } = useSelector(
        (state) => state.auth
    );

    // HANYA pindah ke dashboard jika user ada ATAU login sukses
    useEffect(() => {
        if (user || isSuccess) {
            navigate("/dashboard");
        }
        return () => {
        dispatch(reset());
    };
    }, [user, isSuccess, dispatch, navigate]);

    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(reset()); // Bersihkan error sebelumnya sebelum login baru
        dispatch(LoginUser({ email, password }));
    };

    return (
        <div className="bg-slate-50 w-full h-screen flex items-center justify-center p-4">
            <form onSubmit={handleLogin} className="bg-white px-8 py-10 shadow-xl rounded-2xl flex flex-col gap-5 w-full max-w-[450px]">
                <h1 className="text-4xl text-center font-bold border-b pb-2">Login</h1>

                {isError && (
                    <div className="bg-red-100 text-red-700 p-3 rounded text-center text-sm">
                        {message}
                    </div>
                )}

                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="border p-2.5 rounded-lg focus:ring-2 focus:ring-slate-400 outline-none"
                    required
                />

                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border p-2.5 rounded-lg w-full pr-10 focus:ring-2 focus:ring-slate-400 outline-none"
                        required
                    />
                    <span onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer text-gray-500">
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                </div>

                <button
                    type="submit"
                    className="bg-slate-900 text-white py-3 rounded-lg font-bold hover:bg-slate-800 disabled:bg-slate-400 transition"
                    disabled={isLoading}
                >
                    {isLoading ? "Memproses..." : "Masuk Ke Dashboard"}
                </button>
            </form>
        </div>
    );
};

export default Login;